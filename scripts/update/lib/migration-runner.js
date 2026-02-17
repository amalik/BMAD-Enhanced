#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const backupManager = require('./backup-manager');
const versionDetector = require('./version-detector');
const configMerger = require('./config-merger');
const validator = require('./validator');
const registry = require('../migrations/registry');

/**
 * Migration Runner for BMAD-Enhanced
 * Core orchestration: executes migrations, handles backups, manages rollback
 */

/**
 * Run migrations from current version to target version
 * @param {string} fromVersion - Current version
 * @param {string} toVersion - Target version
 * @param {object} options - Options { dryRun, verbose }
 * @returns {Promise<object>} Migration result
 */
async function runMigrations(fromVersion, toVersion, options = {}) {
  const { dryRun = false, verbose = false } = options;

  console.log('');
  if (dryRun) {
    console.log(chalk.yellow.bold('═══ DRY RUN MODE ═══'));
    console.log(chalk.yellow('No changes will be made to your installation'));
    console.log('');
  }

  // 1. Get applicable migrations
  const migrations = registry.getMigrationsFor(fromVersion, toVersion);

  if (migrations.length === 0) {
    console.log(chalk.yellow('No migrations needed'));
    return { success: true, migrations: [], skipped: true };
  }

  console.log(chalk.cyan(`Found ${migrations.length} migration(s) to apply:`));
  migrations.forEach((m, i) => {
    const icon = m.breaking ? chalk.red('⚠') : chalk.green('✓');
    console.log(`  ${i + 1}. ${icon} ${m.name} - ${m.description}`);
  });
  console.log('');

  // If dry run, just preview
  if (dryRun) {
    return await previewMigrations(migrations);
  }

  // 2. Acquire migration lock
  await acquireMigrationLock();

  let backupMetadata = null;
  const results = [];

  try {
    // 3. Create backup
    console.log(chalk.cyan('[1/5] Creating backup...'));
    const userDataCount = await backupManager.countUserDataFiles();
    backupMetadata = await backupManager.createBackup(fromVersion);
    backupMetadata.userDataCount = userDataCount;
    console.log(chalk.green(`✓ Backup created: ${path.basename(backupMetadata.backup_dir)}`));
    console.log('');

    // 4. Execute migrations sequentially
    console.log(chalk.cyan('[2/5] Running migrations...'));
    for (let i = 0; i < migrations.length; i++) {
      const migration = migrations[i];
      console.log(chalk.cyan(`\nMigration ${i + 1}/${migrations.length}: ${migration.name}`));

      try {
        const changes = await executeMigration(migration, { verbose });
        results.push({
          name: migration.name,
          success: true,
          changes
        });

        console.log(chalk.green(`✓ ${migration.name} completed`));
      } catch (error) {
        console.error(chalk.red(`✗ ${migration.name} failed: ${error.message}`));
        throw new MigrationError(migration.name, error);
      }
    }
    console.log('');
    console.log(chalk.green('✓ All migrations completed'));
    console.log('');

    // 5. Update configuration and migration history
    console.log(chalk.cyan('[3/5] Updating configuration...'));
    await updateMigrationHistory(fromVersion, toVersion, results);
    console.log(chalk.green('✓ Migration history updated'));
    console.log('');

    // 6. Validate installation
    console.log(chalk.cyan('[4/5] Validating installation...'));
    const validationResult = await validator.validateInstallation(backupMetadata);

    // Display validation results
    validationResult.checks.forEach(check => {
      if (check.passed) {
        console.log(chalk.green(`  ✓ ${check.name}`));
        if (check.info || check.warning) {
          console.log(chalk.gray(`    ${check.info || check.warning}`));
        }
      } else {
        console.log(chalk.red(`  ✗ ${check.name}`));
        if (check.error) {
          console.log(chalk.red(`    Error: ${check.error}`));
        }
      }
    });
    console.log('');

    if (!validationResult.valid) {
      throw new Error('Installation validation failed');
    }

    console.log(chalk.green('✓ Installation validated'));
    console.log('');

    // 7. Cleanup old backups
    console.log(chalk.cyan('[5/5] Cleanup...'));
    const deletedCount = await backupManager.cleanupOldBackups(5);
    if (deletedCount > 0) {
      console.log(chalk.green(`✓ Cleaned up ${deletedCount} old backup(s)`));
    } else {
      console.log(chalk.green('✓ No old backups to clean up'));
    }
    console.log('');

    // Release lock
    await releaseMigrationLock();

    // Create migration log
    await createMigrationLog(fromVersion, toVersion, results, backupMetadata);

    return {
      success: true,
      fromVersion,
      toVersion,
      results,
      backupMetadata
    };

  } catch (error) {
    console.error('');
    console.error(chalk.red.bold('✗ Migration failed!'));
    console.error('');
    console.error(chalk.red(error.message));
    console.error('');

    // Rollback if we have a backup
    if (backupMetadata) {
      console.log(chalk.yellow('Restoring from backup...'));
      try {
        await backupManager.restoreBackup(backupMetadata);
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

    // Release lock
    await releaseMigrationLock();

    // Create error log
    await createErrorLog(fromVersion, toVersion, error, backupMetadata);

    throw error;
  }
}

/**
 * Preview migrations without applying
 * @param {Array} migrations - Migrations to preview
 * @returns {Promise<object>} Preview result
 */
async function previewMigrations(migrations) {
  const previews = [];

  for (const migration of migrations) {
    console.log(chalk.cyan(`\n${migration.name}:`));
    console.log(chalk.gray(migration.description));

    if (migration.module && migration.module.preview) {
      const preview = await migration.module.preview();
      console.log('');
      console.log(chalk.white('Actions:'));
      preview.actions.forEach(action => {
        console.log(chalk.gray(`  - ${action}`));
      });

      previews.push({
        name: migration.name,
        preview
      });
    }
  }

  console.log('');
  console.log(chalk.green('To apply these changes, run:'));
  console.log(chalk.cyan('  npx bmad-update'));
  console.log('');

  return {
    success: true,
    dryRun: true,
    previews
  };
}

/**
 * Execute a single migration
 * @param {object} migration - Migration to execute
 * @param {object} options - Options { verbose }
 * @returns {Promise<Array<string>>} Changes made
 */
async function executeMigration(migration, options = {}) {
  const { verbose = false } = options;

  if (!migration.module || !migration.module.apply) {
    throw new Error(`Migration ${migration.name} has no apply function`);
  }

  const changes = await migration.module.apply();

  if (verbose) {
    changes.forEach(change => {
      console.log(chalk.gray(`    - ${change}`));
    });
  }

  return changes;
}

/**
 * Update migration history in config.yaml
 * @param {string} fromVersion - Version migrated from
 * @param {string} toVersion - Version migrated to
 * @param {Array} results - Migration results
 */
async function updateMigrationHistory(fromVersion, toVersion, results) {
  const configPath = path.join(process.cwd(), '_bmad/bme/_vortex/config.yaml');

  if (!fs.existsSync(configPath)) {
    throw new Error('config.yaml not found');
  }

  const configContent = fs.readFileSync(configPath, 'utf8');
  const yaml = require('js-yaml');
  const config = yaml.load(configContent);

  // Add migration history entry
  const migrationsApplied = results.map(r => r.name);
  const updatedConfig = configMerger.addMigrationHistory(
    config,
    fromVersion,
    toVersion,
    migrationsApplied
  );

  // Write config
  await configMerger.writeConfig(configPath, updatedConfig);
}

/**
 * Acquire migration lock to prevent concurrent migrations
 */
async function acquireMigrationLock() {
  const lockFile = path.join(process.cwd(), '_bmad-output/.migration-lock');

  if (fs.existsSync(lockFile)) {
    const lock = await fs.readJson(lockFile);
    const age = Date.now() - lock.timestamp;

    // Stale lock (older than 5 minutes)
    if (age > 5 * 60 * 1000) {
      console.log(chalk.yellow('Removing stale migration lock'));
      await fs.remove(lockFile);
    } else {
      throw new Error('Migration already in progress. Please wait and try again.');
    }
  }

  // Create lock
  await fs.ensureDir(path.join(process.cwd(), '_bmad-output'));
  await fs.writeJson(lockFile, {
    timestamp: Date.now(),
    pid: process.pid
  });
}

/**
 * Release migration lock
 */
async function releaseMigrationLock() {
  const lockFile = path.join(process.cwd(), '_bmad-output/.migration-lock');

  if (fs.existsSync(lockFile)) {
    await fs.remove(lockFile);
  }
}

/**
 * Create migration log
 * @param {string} fromVersion - Version migrated from
 * @param {string} toVersion - Version migrated to
 * @param {Array} results - Migration results
 * @param {object} backupMetadata - Backup metadata
 */
async function createMigrationLog(fromVersion, toVersion, results, backupMetadata) {
  const logsDir = path.join(process.cwd(), '_bmad-output/.logs');
  await fs.ensureDir(logsDir);

  const timestamp = Date.now();
  const logFile = path.join(logsDir, `migration-${timestamp}.log`);

  const logContent = [
    `BMAD-Enhanced Migration Log`,
    `Date: ${new Date().toISOString()}`,
    `From Version: ${fromVersion}`,
    `To Version: ${toVersion}`,
    '',
    'Migrations Applied:',
    ...results.map(r => `  - ${r.name}`),
    '',
    'Changes:',
    ...results.flatMap(r => r.changes.map(c => `  - ${c}`)),
    '',
    `Backup: ${backupMetadata.backup_dir}`,
    '',
    'Status: SUCCESS'
  ].join('\n');

  await fs.writeFile(logFile, logContent, 'utf8');
}

/**
 * Create error log
 * @param {string} fromVersion - Version migrated from
 * @param {string} toVersion - Version migrated to
 * @param {Error} error - Error that occurred
 * @param {object} backupMetadata - Backup metadata (if exists)
 */
async function createErrorLog(fromVersion, toVersion, error, backupMetadata) {
  const logsDir = path.join(process.cwd(), '_bmad-output/.logs');
  await fs.ensureDir(logsDir);

  const timestamp = Date.now();
  const logFile = path.join(logsDir, `migration-error-${timestamp}.log`);

  const logContent = [
    `BMAD-Enhanced Migration Error Log`,
    `Date: ${new Date().toISOString()}`,
    `From Version: ${fromVersion}`,
    `To Version: ${toVersion}`,
    '',
    `Error: ${error.message}`,
    '',
    'Stack Trace:',
    error.stack,
    '',
    backupMetadata ? `Backup: ${backupMetadata.backup_dir}` : 'No backup created',
    backupMetadata ? 'Status: ROLLED BACK' : 'Status: FAILED (no backup)',
    '',
    'Please report this issue at: https://github.com/amalik/BMAD-Enhanced/issues',
    'Include this log file when reporting.'
  ].join('\n');

  await fs.writeFile(logFile, logContent, 'utf8');

  console.log(chalk.gray(`Migration log: ${logFile}`));
}

/**
 * Custom error for migration failures
 */
class MigrationError extends Error {
  constructor(migrationName, originalError) {
    super(`Migration ${migrationName} failed: ${originalError.message}`);
    this.name = 'MigrationError';
    this.migrationName = migrationName;
    this.originalError = originalError;
  }
}

module.exports = {
  runMigrations,
  previewMigrations,
  executeMigration,
  MigrationError
};
