#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Config Merger for BMAD-Enhanced
 * Smart YAML merging preserving user settings
 */

/**
 * Merge current config with new template while preserving user preferences
 * @param {string} currentConfigPath - Path to current config.yaml
 * @param {string} newVersion - New version to set
 * @param {object} updates - Updates to apply (agents, workflows, etc.)
 * @returns {Promise<object>} Merged config object
 */
async function mergeConfig(currentConfigPath, newVersion, updates = {}) {
  let current = {};

  // Read current config if it exists
  if (fs.existsSync(currentConfigPath)) {
    try {
      const currentContent = fs.readFileSync(currentConfigPath, 'utf8');
      current = yaml.load(currentContent);
    } catch (error) {
      console.warn('Warning: Could not parse current config.yaml, using defaults');
      current = {};
    }
  }

  // Extract user preferences
  const userPrefs = extractUserPreferences(current);

  // Start with current config
  const merged = { ...current };

  // Update version (system field)
  merged.version = newVersion;

  // Apply updates
  if (updates.agents) {
    merged.agents = updates.agents;
  }

  if (updates.workflows) {
    merged.workflows = updates.workflows;
  }

  // Preserve user preferences
  Object.assign(merged, userPrefs);

  // Ensure migration_history exists
  if (!merged.migration_history) {
    merged.migration_history = [];
  }

  return merged;
}

/**
 * Extract user-specific preferences from config
 * @param {object} config - Config object
 * @returns {object} User preferences
 */
function extractUserPreferences(config) {
  const prefs = {};

  // Preserve these fields if they exist and are not default placeholders
  if (config.user_name && config.user_name !== '{user}') {
    prefs.user_name = config.user_name;
  }

  if (config.communication_language && config.communication_language !== 'en') {
    prefs.communication_language = config.communication_language;
  }

  if (config.output_folder && config.output_folder !== '{project-root}/_bmad-output/vortex-artifacts') {
    prefs.output_folder = config.output_folder;
  }

  if (config.hasOwnProperty('party_mode_enabled')) {
    prefs.party_mode_enabled = config.party_mode_enabled;
  }

  if (config.migration_history) {
    prefs.migration_history = config.migration_history;
  }

  return prefs;
}

/**
 * Validate merged config structure
 * @param {object} config - Config to validate
 * @returns {object} Validation result { valid: boolean, errors: [] }
 */
function validateConfig(config) {
  const errors = [];

  // Required fields
  const requiredFields = [
    'submodule_name',
    'description',
    'module',
    'version',
    'output_folder',
    'agents',
    'workflows'
  ];

  for (const field of requiredFields) {
    if (!config.hasOwnProperty(field)) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Validate version format (x.x.x)
  if (config.version && !/^\d+\.\d+\.\d+$/.test(config.version)) {
    errors.push(`Invalid version format: ${config.version} (expected x.x.x)`);
  }

  // Validate agents is array
  if (config.agents && !Array.isArray(config.agents)) {
    errors.push('agents must be an array');
  }

  // Validate workflows is array
  if (config.workflows && !Array.isArray(config.workflows)) {
    errors.push('workflows must be an array');
  }

  // Validate migration_history structure
  if (config.migration_history) {
    if (!Array.isArray(config.migration_history)) {
      errors.push('migration_history must be an array');
    } else {
      config.migration_history.forEach((entry, index) => {
        if (!entry.timestamp || !entry.from_version || !entry.to_version) {
          errors.push(`migration_history[${index}] missing required fields`);
        }
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Write config to file
 * @param {string} configPath - Path to write config
 * @param {object} config - Config object
 * @returns {Promise<void>}
 */
async function writeConfig(configPath, config) {
  const yamlContent = yaml.dump(config, {
    indent: 2,
    lineWidth: -1, // Don't wrap long lines
    noRefs: true
  });

  await fs.writeFile(configPath, yamlContent, 'utf8');
}

/**
 * Add migration history entry
 * @param {object} config - Config object
 * @param {string} fromVersion - Version migrating from
 * @param {string} toVersion - Version migrating to
 * @param {Array<string>} migrationsApplied - List of migration names applied
 * @returns {object} Updated config
 */
function addMigrationHistory(config, fromVersion, toVersion, migrationsApplied) {
  if (!config.migration_history) {
    config.migration_history = [];
  }

  config.migration_history.push({
    timestamp: new Date().toISOString(),
    from_version: fromVersion,
    to_version: toVersion,
    migrations_applied: migrationsApplied
  });

  return config;
}

/**
 * Get default config template for a version
 * @param {string} version - Version to generate template for
 * @returns {object} Default config template
 */
function getDefaultConfig(version) {
  return {
    submodule_name: '_vortex',
    description: 'Contextualize and Externalize streams - Strategic framing and validated learning',
    module: 'bme',
    version,
    output_folder: '{project-root}/_bmad-output/vortex-artifacts',
    user_name: '{user}',
    communication_language: 'en',
    agents: [
      'contextualization-expert',
      'lean-experiments-specialist'
    ],
    workflows: [
      'lean-persona',
      'product-vision',
      'contextualize-scope',
      'mvp',
      'lean-experiment',
      'proof-of-concept',
      'proof-of-value'
    ],
    party_mode_enabled: true,
    core_module: 'bme',
    migration_history: []
  };
}

module.exports = {
  mergeConfig,
  extractUserPreferences,
  validateConfig,
  writeConfig,
  addMigrationHistory,
  getDefaultConfig
};
