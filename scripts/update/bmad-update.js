#!/usr/bin/env node

const readline = require('readline');
const chalk = require('chalk');
const versionDetector = require('./lib/version-detector');
const migrationRunner = require('./lib/migration-runner');
const registry = require('./migrations/registry');

/**
 * BMAD-Enhanced Update CLI
 * Main update command for users
 */

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const yes = args.includes('--yes') || args.includes('-y');
  const force = args.includes('--force');
  const verbose = args.includes('--verbose') || args.includes('-v');

  // Header
  console.log('');
  console.log(chalk.bold.magenta('╔════════════════════════════════════════╗'));
  console.log(chalk.bold.magenta('║   BMAD-Enhanced Update Manager         ║'));
  console.log(chalk.bold.magenta('╚════════════════════════════════════════╝'));
  console.log('');

  // 1. Detect current state
  const currentVersion = versionDetector.getCurrentVersion();
  const targetVersion = versionDetector.getTargetVersion();
  const scenario = versionDetector.detectInstallationScenario();

  // Handle different scenarios
  if (scenario === 'fresh') {
    console.log(chalk.yellow('No previous installation detected.'));
    console.log('');
    console.log('Run: ' + chalk.cyan('npx bmad-install-agents'));
    console.log('');
    process.exit(0);
  }

  if (scenario === 'partial' || scenario === 'corrupted') {
    console.log(chalk.red('Installation appears incomplete or corrupted.'));
    console.log('');
    console.log('Recommend running: ' + chalk.cyan('npx bmad-install-agents'));
    console.log('');
    process.exit(1);
  }

  if (!currentVersion) {
    console.log(chalk.yellow('Could not detect current version.'));
    console.log('');
    console.log('Run: ' + chalk.cyan('npx bmad-install-agents'));
    console.log('');
    process.exit(0);
  }

  // Get migration path
  const migrationPath = versionDetector.getMigrationPath(currentVersion, targetVersion);

  // Already up to date
  if (migrationPath.type === 'up-to-date') {
    console.log(chalk.green(`✓ Already up to date! (v${currentVersion})`));
    console.log('');
    process.exit(0);
  }

  // Downgrade attempt
  if (migrationPath.type === 'downgrade') {
    console.log(chalk.red.bold('⚠ DOWNGRADE DETECTED'));
    console.log('');
    console.log(`  Current version: ${currentVersion}`);
    console.log(`  Package version: ${targetVersion}`);
    console.log('');
    console.log(chalk.yellow('Downgrades are not officially supported.'));
    console.log('');
    console.log('If you want to downgrade, please:');
    console.log('  1. Backup your installation');
    console.log('  2. Uninstall current version');
    console.log('  3. Install desired version');
    console.log('');
    process.exit(1);
  }

  // 2. Show migration plan
  console.log(chalk.cyan('Migration Plan:'));
  console.log(`  From: ${chalk.red(currentVersion)}`);
  console.log(`  To:   ${chalk.green(targetVersion)}`);
  console.log('');

  const migrations = registry.getMigrationsFor(currentVersion, targetVersion);

  if (migrations.length === 0) {
    console.log(chalk.yellow('No migrations needed (versions compatible)'));
    console.log('');
    process.exit(0);
  }

  console.log(chalk.cyan('Migrations to apply:'));
  migrations.forEach((m, i) => {
    const icon = m.breaking ? chalk.red('⚠') : chalk.green('✓');
    console.log(`  ${i + 1}. ${icon} ${m.description}`);
  });
  console.log('');

  // 3. Show breaking changes warning
  const breakingChanges = registry.getBreakingChanges(currentVersion, targetVersion);
  if (breakingChanges.length > 0) {
    console.log(chalk.red.bold('⚠ BREAKING CHANGES:'));
    breakingChanges.forEach(change => {
      console.log(chalk.yellow(`  - ${change}`));
    });
    console.log('');
  }

  // 4. Dry run - preview only
  if (dryRun) {
    console.log(chalk.yellow.bold('DRY RUN - Previewing changes'));
    console.log('');

    try {
      await migrationRunner.runMigrations(currentVersion, targetVersion, { dryRun: true, verbose });
    } catch (error) {
      console.error(chalk.red('Error during preview:'), error.message);
      process.exit(1);
    }

    process.exit(0);
  }

  // 5. Confirm with user (unless --yes)
  if (!yes) {
    console.log(chalk.cyan('Your data will be backed up automatically before migration.'));
    console.log('');

    const confirmed = await confirm('Proceed with migration?');

    if (!confirmed) {
      console.log('');
      console.log(chalk.yellow('Migration cancelled.'));
      console.log('');
      process.exit(0);
    }
  }

  // 6. Run migrations
  console.log('');
  console.log(chalk.cyan.bold('Starting migration...'));

  try {
    const result = await migrationRunner.runMigrations(currentVersion, targetVersion, { verbose });

    // 7. Show success report
    console.log('');
    console.log(chalk.green.bold('✓ Migration completed successfully!'));
    console.log('');
    console.log(chalk.cyan('Changes applied:'));
    result.results.forEach(r => {
      console.log(chalk.green(`  ✓ ${r.name}`));
      if (verbose) {
        r.changes.forEach(change => {
          console.log(chalk.gray(`    - ${change}`));
        });
      }
    });
    console.log('');
    console.log(chalk.gray(`Backup location: ${result.backupMetadata.backup_dir}`));
    console.log('');

  } catch (error) {
    // Error already logged by migration-runner
    process.exit(1);
  }
}

/**
 * Confirm action with user
 * @param {string} message - Confirmation message
 * @returns {Promise<boolean>} True if user confirms
 */
async function confirm(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(chalk.yellow(`${message} [y/N]: `), answer => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// Run main
main().catch(error => {
  console.error('');
  console.error(chalk.red.bold('Unexpected error:'));
  console.error(chalk.red(error.message));
  console.error('');
  if (error.stack) {
    console.error(chalk.gray(error.stack));
    console.error('');
  }
  process.exit(1);
});
