#!/usr/bin/env node

const fs = require('fs-extra');
const yaml = require('js-yaml');
const { compareVersions } = require('../lib/utils');

/**
 * Migration Registry for BMAD-Enhanced
 *
 * APPEND-ONLY: Add new migrations at the bottom. Never edit old entries.
 * No toVersion needed - target is always the current package version at runtime.
 */

const MIGRATIONS = [
  {
    name: '1.0.x-to-1.3.0',
    fromVersion: '1.0.x',
    breaking: true,
    description: 'Archive deprecated empathy-map/wireframe workflows, rename agents in manifest',
    module: null
  },
  {
    name: '1.1.x-to-1.3.0',
    fromVersion: '1.1.x',
    breaking: false,
    description: 'No-op delta (refresh handles all file updates)',
    module: null
  },
  {
    name: '1.2.x-to-1.3.0',
    fromVersion: '1.2.x',
    breaking: false,
    description: 'No-op delta (refresh handles all file updates)',
    module: null
  },
  {
    name: '1.3.x-to-1.5.0',
    fromVersion: '1.3.x',
    breaking: false,
    description: 'No-op delta (refresh handles Wave 2 agents and workflows)',
    module: null
  },
  {
    name: '1.4.x-to-1.5.0',
    fromVersion: '1.4.x',
    breaking: false,
    description: 'No-op delta (refresh handles Wave 2 agents and workflows)',
    module: null
  }
  // Future migrations: append here. Only add delta logic for version-specific changes.
];

/**
 * Get migrations applicable for upgrading from a given version.
 * Target version is always the current package version (read at runtime).
 *
 * @param {string} fromVersion - Current installed version (e.g., "1.0.5")
 * @returns {Array} List of applicable migrations with loaded modules
 */
function getMigrationsFor(fromVersion) {
  const applicable = [];

  for (const migration of MIGRATIONS) {
    if (matchesVersionRange(fromVersion, migration.fromVersion)) {
      // Lazy load the migration module
      if (!migration.module) {
        try {
          migration.module = require(`./${migration.name}`);
        } catch (error) {
          console.error(`Failed to load migration ${migration.name}:`, error.message);
          continue;
        }
      }

      applicable.push(migration);
    }
  }

  // Sort by version order (oldest fromVersion first)
  applicable.sort((a, b) => {
    const aV = a.fromVersion.replace('.x', '.0');
    const bV = b.fromVersion.replace('.x', '.0');
    return compareVersions(aV, bV);
  });

  return applicable;
}

/**
 * Check if migration has already been applied
 * @param {string} migrationName - Name of migration
 * @param {string} configPath - Path to config.yaml
 * @returns {boolean} True if already applied
 */
function hasMigrationBeenApplied(migrationName, configPath) {
  if (!fs.existsSync(configPath)) {
    return false;
  }

  try {
    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(configContent);

    if (!config.migration_history || !Array.isArray(config.migration_history)) {
      return false;
    }

    return config.migration_history.some(entry =>
      entry.migrations_applied && entry.migrations_applied.includes(migrationName)
    );
  } catch (error) {
    console.warn('Could not check migration history:', error.message);
    return false;
  }
}

/**
 * Get breaking changes for upgrading from a given version.
 * @param {string} fromVersion - Current installed version
 * @returns {Array<string>} List of breaking change descriptions
 */
function getBreakingChanges(fromVersion) {
  const migrations = getMigrationsFor(fromVersion);
  const breakingChanges = [];

  for (const migration of migrations) {
    if (migration.breaking) {
      breakingChanges.push(migration.description);
    }
  }

  return breakingChanges;
}

/**
 * Match version against version range pattern
 * @param {string} version - Version to check (e.g., "1.0.5")
 * @param {string} pattern - Pattern to match (e.g., "1.0.x")
 * @returns {boolean} True if matches
 */
function matchesVersionRange(version, pattern) {
  if (pattern === version) {
    return true;
  }

  // Handle wildcard patterns (e.g., "1.0.x")
  if (pattern.endsWith('.x')) {
    const patternParts = pattern.split('.');
    const versionParts = version.split('.');

    return patternParts[0] === versionParts[0] &&
           patternParts[1] === versionParts[1];
  }

  return false;
}

/**
 * Get all registered migrations
 * @returns {Array} All migrations (shallow copy)
 */
function getAllMigrations() {
  return [...MIGRATIONS];
}

module.exports = {
  MIGRATIONS,
  getMigrationsFor,
  hasMigrationBeenApplied,
  getBreakingChanges,
  matchesVersionRange,
  getAllMigrations
};
