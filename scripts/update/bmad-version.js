#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const yaml = require('js-yaml');
const versionDetector = require('./lib/version-detector');

/**
 * BMAD-Enhanced Version CLI
 * Show version information and migration history
 */

async function main() {
  const currentVersion = versionDetector.getCurrentVersion();
  const targetVersion = versionDetector.getTargetVersion();
  const scenario = versionDetector.detectInstallationScenario();

  console.log('');
  console.log(chalk.bold('BMAD-Enhanced Version Information'));
  console.log('');

  // Fresh install - not installed yet
  if (scenario === 'fresh' || !currentVersion) {
    console.log(chalk.yellow('Status:           Not installed'));
    console.log(`Package version:  ${chalk.cyan(targetVersion)}`);
    console.log('');
    console.log('Run: ' + chalk.cyan('npx bmad-install-agents'));
    console.log('');
    return;
  }

  // Installed
  console.log(`Installed version: ${chalk.cyan(currentVersion)}`);
  console.log(`Package version:   ${chalk.cyan(targetVersion)}`);
  console.log('');

  // Status
  if (currentVersion === targetVersion) {
    console.log(chalk.green('Status: ✓ Up to date'));
  } else if (versionDetector.compareVersions(currentVersion, targetVersion) < 0) {
    console.log(chalk.yellow('Status: ⚠ Update available'));
    console.log('');
    console.log('Run: ' + chalk.cyan('npx bmad-update --dry-run') + ' (to preview)');
    console.log('     ' + chalk.cyan('npx bmad-update') + ' (to apply)');
  } else {
    console.log(chalk.yellow(`Status: Package version (${targetVersion}) is older than installed (${currentVersion})`));
  }

  // Show migration history
  const migrationHistory = await getMigrationHistory();
  if (migrationHistory && migrationHistory.length > 0) {
    console.log('');
    console.log(chalk.cyan('Migration History:'));
    migrationHistory.forEach((entry, index) => {
      const timestamp = new Date(entry.timestamp).toLocaleDateString();
      console.log(chalk.gray(`  ${index + 1}. ${entry.from_version} → ${entry.to_version} (${timestamp})`));
      if (entry.migrations_applied && entry.migrations_applied.length > 0) {
        entry.migrations_applied.forEach(m => {
          console.log(chalk.gray(`     - ${m}`));
        });
      }
    });
  }

  console.log('');
}

/**
 * Get migration history from config.yaml
 * @returns {Promise<Array|null>} Migration history or null
 */
async function getMigrationHistory() {
  const configPath = path.join(process.cwd(), '_bmad/bme/_vortex/config.yaml');

  if (!fs.existsSync(configPath)) {
    return null;
  }

  try {
    const configContent = await fs.readFile(configPath, 'utf8');
    const config = yaml.load(configContent);

    return config.migration_history || null;
  } catch (error) {
    return null;
  }
}

// Run main
main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
