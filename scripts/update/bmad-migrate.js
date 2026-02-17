#!/usr/bin/env node

const chalk = require('chalk');
const registry = require('./migrations/registry');

/**
 * BMAD-Enhanced Migrate CLI
 * Manual migration control for advanced users
 */

async function main() {
  const args = process.argv.slice(2);

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

  // Run migration
  console.log('');
  console.log(chalk.cyan.bold(`Running migration: ${migration.name}`));
  console.log(chalk.gray(migration.description));
  console.log('');

  try {
    const changes = await migration.module.apply();

    console.log('');
    console.log(chalk.green.bold('✓ Migration completed'));
    console.log('');
    console.log(chalk.cyan('Changes:'));
    changes.forEach(change => {
      console.log(chalk.gray(`  - ${change}`));
    });
    console.log('');

  } catch (error) {
    console.error('');
    console.error(chalk.red.bold('✗ Migration failed'));
    console.error(chalk.red(error.message));
    console.error('');
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
    console.log(`     ${chalk.gray(`${m.fromVersion} → ${m.toVersion}`)}`);
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
