#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const configMerger = require('../lib/config-merger');

/**
 * Migration: 1.1.x → 1.3.0
 * Minor update - no breaking changes
 * - Update version number
 * - Verify deprecated workflow structure
 * - Refresh agent files (bug fixes)
 * - Update user guides
 */

module.exports = {
  name: '1.1.x-to-1.3.0',
  fromVersion: '1.1.x',
  toVersion: '1.3.0',
  breaking: false,

  /**
   * Preview changes without applying
   * @returns {Promise<object>} Preview information
   */
  async preview() {
    return {
      actions: [
        'Update version: 1.1.x → 1.3.0',
        'Verify deprecated workflows archived',
        'Remove legacy _designos directory (pre-Vortex structure)',
        'Remove deprecated agent files (empathy-mapper.md, wireframe-designer.md)',
        'Update agent files to latest (bug fixes/improvements)',
        'Refresh user guides (EMMA-USER-GUIDE.md, WADE-USER-GUIDE.md)'
      ]
    };
  },

  /**
   * Apply the migration
   * @returns {Promise<Array<string>>} List of changes made
   */
  async apply() {
    const changes = [];
    const sourceDir = path.join(__dirname, '../../../_bmad/bme/_vortex');
    const targetDir = path.join(process.cwd(), '_bmad/bme/_vortex');

    // 1. Update version in config.yaml
    await updateConfigVersion('1.3.0');
    changes.push('Updated version to 1.3.0');

    // 2. Verify deprecated structure exists
    await ensureDeprecatedStructure(targetDir);
    changes.push('Verified deprecated workflow structure');

    // 3. Remove old _designos directory (pre-Vortex structure)
    await removeOldDesignosDirectory();
    changes.push('Removed legacy _designos directory');

    // 4. Update agent files (in case of bug fixes or improvements)
    await copyAgentFiles(sourceDir, targetDir);
    changes.push('Refreshed agent files');

    // 5. Update user guides
    await copyUserGuides();
    changes.push('Updated user guides');

    return changes;
  }
};

/**
 * Update version in config.yaml
 * @param {string} newVersion - New version to set
 */
async function updateConfigVersion(newVersion) {
  const configPath = path.join(process.cwd(), '_bmad/bme/_vortex/config.yaml');

  if (!fs.existsSync(configPath)) {
    throw new Error('config.yaml not found');
  }

  const configContent = fs.readFileSync(configPath, 'utf8');
  const config = yaml.load(configContent);

  // Update version
  config.version = newVersion;

  // Write back
  await configMerger.writeConfig(configPath, config);
}

/**
 * Ensure deprecated workflow structure is correct
 * @param {string} targetDir - Target vortex directory
 */
async function ensureDeprecatedStructure(targetDir) {
  const deprecatedDir = path.join(targetDir, 'workflows/_deprecated');

  // Ensure _deprecated directory exists
  if (!fs.existsSync(deprecatedDir)) {
    await fs.ensureDir(deprecatedDir);
  }

  // Check if deprecated workflows are there
  const empathyMapDir = path.join(deprecatedDir, 'empathy-map');
  const wireframeDir = path.join(deprecatedDir, 'wireframe');

  // These should exist from v1.1.0, but verify
  if (fs.existsSync(empathyMapDir) || fs.existsSync(wireframeDir)) {
    console.log('  ✓ Deprecated workflows found in _deprecated/');
  } else {
    console.log('  Note: No deprecated workflows found (this is OK if starting fresh)');
  }
}

/**
 * Copy agent files from package to installation
 * @param {string} sourceDir - Package vortex directory
 * @param {string} targetDir - Installation vortex directory
 */
async function copyAgentFiles(sourceDir, targetDir) {
  const agentFiles = [
    'contextualization-expert.md',
    'lean-experiments-specialist.md'
  ];

  const deprecatedAgents = [
    'empathy-mapper.md',
    'wireframe-designer.md'
  ];

  const agentsSourceDir = path.join(sourceDir, 'agents');
  const agentsTargetDir = path.join(targetDir, 'agents');

  await fs.ensureDir(agentsTargetDir);

  // Remove deprecated agent files
  for (const file of deprecatedAgents) {
    const targetPath = path.join(agentsTargetDir, file);
    if (fs.existsSync(targetPath)) {
      await fs.remove(targetPath);
      console.log(`    Removed deprecated: ${file}`);
    }
  }

  // Copy new agent files
  for (const file of agentFiles) {
    const sourcePath = path.join(agentsSourceDir, file);
    const targetPath = path.join(agentsTargetDir, file);

    if (fs.existsSync(sourcePath)) {
      await fs.copy(sourcePath, targetPath, { overwrite: true });
      console.log(`    Updated: ${file}`);
    } else {
      console.warn(`    Warning: ${file} not found in package`);
    }
  }
}

/**
 * Copy user guides to output directory
 */
async function copyUserGuides() {
  const sourceDir = path.join(__dirname, '../../../_bmad-output/vortex-artifacts');
  const targetDir = path.join(process.cwd(), '_bmad-output/vortex-artifacts');

  await fs.ensureDir(targetDir);

  const guides = [
    'EMMA-USER-GUIDE.md',
    'WADE-USER-GUIDE.md'
  ];

  for (const guide of guides) {
    const sourcePath = path.join(sourceDir, guide);
    const targetPath = path.join(targetDir, guide);

    if (fs.existsSync(sourcePath)) {
      await fs.copy(sourcePath, targetPath, { overwrite: true });
      console.log(`    Updated: ${guide}`);
    } else {
      console.warn(`    Warning: ${guide} not found in package`);
    }
  }
}

/**
 * Remove old _designos directory (pre-Vortex structure)
 */
async function removeOldDesignosDirectory() {
  const designosPath = path.join(process.cwd(), '_bmad/bme/_designos');

  if (fs.existsSync(designosPath)) {
    await fs.remove(designosPath);
    console.log('    Removed legacy _designos directory');
  } else {
    console.log('    No legacy _designos directory found (OK)');
  }
}
