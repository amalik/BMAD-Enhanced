#!/usr/bin/env node

const chalk = require('chalk');
const registry = require('./migrations/registry');
const backupManager = require('./lib/backup-manager');
const { refreshInstallation } = require('./lib/refresh-installation');
const { findProjectRoot } = require('./lib/utils');

/**
 * BMAD-Enhanced Migrate CLI
 * Manual migration control for advanced users
 */

async function main() {
  const args = process.argv.slice(2);

  // Validate project root
  const projectRoot = findProjectRoot();
  if (!projectRoot) {
    console.error('');
    console.error(chalk.red('Not in a BMAD project. Could not find _bmad/ directory.'));
    console.error('');
    process.exit(1);
  }

  // No args - show available migrations
  if (args.length === 0) {
    showAvailableMigrations();
    return;
  }

  const migrationName = args[0];

  // Find migration
  const migrations = registry.getAllMigrations();
  const migration = migrations.find(m => m.name === migrationName);

  if (!migration) {
    console.error('');
    console.error(chalk.red(`Migration '${migrationName}' not found.`));
    console.error('');
    console.error('Run ' + chalk.cyan('npx bmad-migrate') + ' to see available migrations.');
    console.error('');
    process.exit(1);
  }

  // Check if already applied
  const configPath = require('path').join(projectRoot, '_bmad/bme/_vortex/config.yaml');
  if (registry.hasMigrationBeenApplied(migrationName, configPath)) {
    console.log('');
    console.log(chalk.yellow(`Migration '${migrationName}' has already been applied.`));
    console.log('');
    process.exit(0);
  }

  // Load migration module
  if (!migration.module) {
    try {
      migration.module = require(`./migrations/${migration.name}`);
    } catch (error) {
      console.error('');
      console.error(chalk.red(`Failed to load migration: ${error.message}`));
      console.error('');
      process.exit(1);
    }
  }

  // Run migration with backup and refresh
  console.log('');
  console.log(chalk.cyan.bold(`Running migration: ${migration.name}`));
  console.log(chalk.gray(migration.description));
  console.log('');

  let backupMetadata = null;

  try {
    // Create backup before running delta
    console.log(chalk.cyan('Creating backup...'));
    backupMetadata = await backupManager.createBackup('manual', projectRoot);
    console.log(chalk.green(`✓ Backup created: ${require('path').basename(backupMetadata.backup_dir)}`));
    console.log('');

    // Run the delta
    const changes = await migration.module.apply(projectRoot);

    console.log('');
    console.log(chalk.green.bold('✓ Migration delta completed'));
    console.log('');
    console.log(chalk.cyan('Delta changes:'));
    changes.forEach(change => {
      console.log(chalk.gray(`  - ${change}`));
    });
    console.log('');

    // Refresh installation after delta
    console.log(chalk.cyan('Refreshing installation files...'));
    const refreshChanges = await refreshInstallation(projectRoot);
    console.log(chalk.green('✓ Installation refreshed'));
    console.log('');

  } catch (error) {
    console.error('');
    console.error(chalk.red.bold('✗ Migration failed'));
    console.error(chalk.red(error.message));
    console.error('');

    // Rollback if we have a backup
    if (backupMetadata) {
      console.log(chalk.yellow('Restoring from backup...'));
      try {
        await backupManager.restoreBackup(backupMetadata, projectRoot);
        console.log(chalk.green('✓ Installation restored from backup'));
        console.log('');
      } catch (restoreError) {
        console.error(chalk.red('✗ Restore failed!'));
        console.error(chalk.red(restoreError.message));
        console.error('');
        console.error(chalk.yellow(`Manual restore may be needed from: ${backupMetadata.backup_dir}`));
        console.error('');
      }
    }

    if (error.stack) {
      console.error(chalk.gray(error.stack));
      console.error('');
    }
    process.exit(1);
  }
}

/**
 * Show available migrations
 */
function showAvailableMigrations() {
  const migrations = registry.getAllMigrations();

  console.log('');
  console.log(chalk.bold('Available Migrations'));
  console.log('');

  if (migrations.length === 0) {
    console.log(chalk.yellow('No migrations available'));
    console.log('');
    return;
  }

  migrations.forEach((m, index) => {
    const breaking = m.breaking ? chalk.red('[BREAKING]') : chalk.green('[SAFE]');
    console.log(`  ${index + 1}. ${chalk.cyan(m.name)} ${breaking}`);
    console.log(`     ${chalk.gray(m.description)}`);
    console.log(`     ${chalk.gray(`From: ${m.fromVersion}`)}`);
    console.log('');
  });

  console.log('Usage: ' + chalk.cyan('npx bmad-migrate <migration-name>'));
  console.log('');
  console.log(chalk.yellow('Warning: Manual migrations bypass safety checks.'));
  console.log(chalk.yellow('         Use ' + chalk.cyan('npx bmad-update') + ' for normal updates.'));
  console.log('');
}

// Run main
main().catch(error => {
  console.error('');
  console.error(chalk.red('Unexpected error:'));
  console.error(chalk.red(error.message));
  console.error('');
  process.exit(1);
});
