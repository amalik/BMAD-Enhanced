#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const configMerger = require('../lib/config-merger');

/**
 * Migration: 1.0.x → 1.2.0
 * BREAKING CHANGES:
 * - Workflow renamed: empathy-map → lean-persona
 * - Agent roles updated in manifest
 * - Template structure changed
 */

module.exports = {
  name: '1.0.x-to-1.2.0',
  fromVersion: '1.0.x',
  toVersion: '1.2.0',
  breaking: true,

  /**
   * Preview changes without applying
   * @returns {Promise<object>} Preview information
   */
  async preview() {
    return {
      actions: [
        'BREAKING: Move empathy-map workflow to _deprecated/',
        'Install new lean-persona workflow',
        'Install 6 new workflows (product-vision, contextualize-scope, mvp, lean-experiment, proof-of-concept, proof-of-value)',
        'Update config.yaml: agents and workflows lists',
        'Update agent-manifest.csv: agent names/roles',
        'Update agent files (Emma → Contextualization Expert, Wade → Lean Experiments Specialist)',
        'Preserve all user data in _bmad-output/'
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

    // 1. Archive old empathy-map workflow (if exists)
    await moveToDeprecated(targetDir, 'empathy-map');
    changes.push('Archived empathy-map workflow to _deprecated/');

    // 2. Archive wireframe workflow (if exists)
    await moveToDeprecated(targetDir, 'wireframe');
    changes.push('Archived wireframe workflow to _deprecated/');

    // 3. Install all new workflow files
    await copyAllWorkflows(sourceDir, targetDir);
    changes.push('Installed 7 new Vortex Framework workflows');

    // 4. Update config.yaml with new structure
    await updateConfig(targetDir, '1.2.0');
    changes.push('Updated config.yaml');

    // 5. Update agent files
    await copyAgentFiles(sourceDir, targetDir);
    changes.push('Updated agent files');

    // 6. Update agent manifest
    await updateAgentManifest();
    changes.push('Updated agent manifest');

    // 7. Update user guides
    await copyUserGuides();
    changes.push('Updated user guides');

    return changes;
  }
};

/**
 * Move workflow to _deprecated directory
 * @param {string} targetDir - Target vortex directory
 * @param {string} workflowName - Name of workflow to deprecate
 */
async function moveToDeprecated(targetDir, workflowName) {
  const workflowsDir = path.join(targetDir, 'workflows');
  const workflowPath = path.join(workflowsDir, workflowName);
  const deprecatedPath = path.join(workflowsDir, '_deprecated', workflowName);

  // If workflow exists and not already in _deprecated
  if (fs.existsSync(workflowPath)) {
    await fs.ensureDir(path.join(workflowsDir, '_deprecated'));
    await fs.move(workflowPath, deprecatedPath, { overwrite: true });
    console.log(`    Moved ${workflowName} → _deprecated/`);
  } else {
    console.log(`    ${workflowName} not found (may already be deprecated)`);
  }
}

/**
 * Copy all workflow files from package
 * @param {string} sourceDir - Package vortex directory
 * @param {string} targetDir - Installation vortex directory
 */
async function copyAllWorkflows(sourceDir, targetDir) {
  const workflows = [
    'lean-persona',
    'product-vision',
    'contextualize-scope',
    'mvp',
    'lean-experiment',
    'proof-of-concept',
    'proof-of-value'
  ];

  const workflowsSourceDir = path.join(sourceDir, 'workflows');
  const workflowsTargetDir = path.join(targetDir, 'workflows');

  await fs.ensureDir(workflowsTargetDir);

  for (const workflow of workflows) {
    const sourcePath = path.join(workflowsSourceDir, workflow);
    const targetPath = path.join(workflowsTargetDir, workflow);

    if (fs.existsSync(sourcePath)) {
      await fs.copy(sourcePath, targetPath, { overwrite: true });
      console.log(`    Installed: ${workflow}`);
    } else {
      console.warn(`    Warning: ${workflow} not found in package`);
    }
  }
}

/**
 * Update config.yaml with new structure
 * @param {string} targetDir - Target vortex directory
 * @param {string} newVersion - New version
 */
async function updateConfig(targetDir, newVersion) {
  const configPath = path.join(targetDir, 'config.yaml');

  const updates = {
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
    ]
  };

  const mergedConfig = await configMerger.mergeConfig(configPath, newVersion, updates);

  // Validate
  const validation = configMerger.validateConfig(mergedConfig);
  if (!validation.valid) {
    console.error('Config validation errors:', validation.errors);
    throw new Error('Config validation failed');
  }

  // Write
  await configMerger.writeConfig(configPath, mergedConfig);
}

/**
 * Copy agent files from package
 * @param {string} sourceDir - Package vortex directory
 * @param {string} targetDir - Installation vortex directory
 */
async function copyAgentFiles(sourceDir, targetDir) {
  const agentFiles = [
    'contextualization-expert.md',
    'lean-experiments-specialist.md'
  ];

  const agentsSourceDir = path.join(sourceDir, 'agents');
  const agentsTargetDir = path.join(targetDir, 'agents');

  await fs.ensureDir(agentsTargetDir);

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
 * Update agent manifest CSV
 */
async function updateAgentManifest() {
  const manifestPath = path.join(process.cwd(), '_bmad/_config/agent-manifest.csv');

  if (!fs.existsSync(manifestPath)) {
    console.log('    Agent manifest not found, skipping update');
    return;
  }

  let manifestContent = await fs.readFile(manifestPath, 'utf8');

  // Update Emma's entry (empathy-mapper → contextualization-expert)
  manifestContent = manifestContent.replace(
    /empathy-mapper/g,
    'contextualization-expert'
  );

  manifestContent = manifestContent.replace(
    /Empathy Mapping Specialist/g,
    'Contextualization Expert'
  );

  // Update Wade's entry if needed
  manifestContent = manifestContent.replace(
    /wireframe-designer/g,
    'lean-experiments-specialist'
  );

  manifestContent = manifestContent.replace(
    /Wireframe Designer/g,
    'Lean Experiments Specialist'
  );

  await fs.writeFile(manifestPath, manifestContent, 'utf8');
  console.log('    Updated agent manifest');
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
