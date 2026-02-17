#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Migration Registry for BMAD-Enhanced
 * Tracks available migrations and determines execution order
 */

// Registry of all available migrations
const MIGRATIONS = [
  {
    name: '1.0.x-to-1.3.0',
    fromVersion: '1.0.x',
    toVersion: '1.3.0',
    breaking: true,
    description: 'Migrate empathy-map workflow to lean-persona',
    module: null // Loaded on demand
  },
  {
    name: '1.1.x-to-1.3.0',
    fromVersion: '1.1.x',
    toVersion: '1.3.0',
    breaking: false,
    description: 'Archive deprecated workflows, update agents',
    module: null // Loaded on demand
  },
  {
    name: '1.2.x-to-1.3.0',
    fromVersion: '1.2.x',
    toVersion: '1.3.0',
    breaking: false,
    description: 'Update to v1.3.0 with migration system',
    module: null // Loaded on demand
  }
];

/**
 * Get migrations applicable for version upgrade
 * @param {string} fromVersion - Current version
 * @param {string} toVersion - Target version
 * @returns {Array} List of applicable migrations
 */
function getMigrationsFor(fromVersion, toVersion) {
  const applicable = [];

  for (const migration of MIGRATIONS) {
    if (matchesVersionRange(fromVersion, migration.fromVersion) &&
        matchesVersionRange(toVersion, migration.toVersion)) {

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

  // Sort by version order (oldest to newest)
  applicable.sort((a, b) => {
    const aVersion = a.fromVersion.replace('.x', '.0');
    const bVersion = b.fromVersion.replace('.x', '.0');
    return compareVersions(aVersion, bVersion);
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
 * Get breaking changes for version upgrade
 * @param {string} fromVersion - Current version
 * @param {string} toVersion - Target version
 * @returns {Array<string>} List of breaking change descriptions
 */
function getBreakingChanges(fromVersion, toVersion) {
  const migrations = getMigrationsFor(fromVersion, toVersion);
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

    // Match major.minor, ignore patch
    return patternParts[0] === versionParts[0] &&
           patternParts[1] === versionParts[1];
  }

  return false;
}

/**
 * Compare two semantic versions
 * @param {string} v1 - First version
 * @param {string} v2 - Second version
 * @returns {number} -1 if v1 < v2, 0 if equal, 1 if v1 > v2
 */
function compareVersions(v1, v2) {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;

    if (part1 < part2) return -1;
    if (part1 > part2) return 1;
  }

  return 0;
}

/**
 * Get all registered migrations
 * @returns {Array} All migrations
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
  compareVersions,
  getAllMigrations
};
