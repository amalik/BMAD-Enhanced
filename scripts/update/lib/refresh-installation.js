#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { getPackageVersion } = require('./utils');
const configMerger = require('./config-merger');

/**
 * Refresh Installation for BMAD-Enhanced
 *
 * Copies latest agent files, workflows, config, and user guides from the
 * package to the project. Called ONCE after all migration deltas have run,
 * or directly by the install script.
 */

const AGENT_FILES = [
  'contextualization-expert.md',
  'lean-experiments-specialist.md'
];

const WORKFLOWS = [
  'lean-persona',
  'product-vision',
  'contextualize-scope',
  'mvp',
  'lean-experiment',
  'proof-of-concept',
  'proof-of-value'
];

const USER_GUIDES = [
  'EMMA-USER-GUIDE.md',
  'WADE-USER-GUIDE.md'
];

/**
 * Refresh all installation files from the package to the project.
 *
 * @param {string} projectRoot - Absolute path to project root
 * @param {object} options
 * @param {boolean} options.backupGuides - Create .bak of user guides before overwriting (default: true)
 * @param {boolean} options.verbose - Log each action (default: true)
 * @returns {Promise<Array<string>>} List of changes made
 */
async function refreshInstallation(projectRoot, options = {}) {
  const { backupGuides = true, verbose = true } = options;
  const changes = [];
  const packageRoot = path.join(__dirname, '..', '..', '..');
  const packageVortex = path.join(packageRoot, '_bmad', 'bme', '_vortex');
  const targetVortex = path.join(projectRoot, '_bmad', 'bme', '_vortex');
  const version = getPackageVersion();

  // 1. Copy agent files
  const agentsSource = path.join(packageVortex, 'agents');
  const agentsTarget = path.join(targetVortex, 'agents');
  await fs.ensureDir(agentsTarget);

  for (const file of AGENT_FILES) {
    const src = path.join(agentsSource, file);
    if (fs.existsSync(src)) {
      await fs.copy(src, path.join(agentsTarget, file), { overwrite: true });
      changes.push(`Refreshed agent: ${file}`);
      if (verbose) console.log(`    Refreshed agent: ${file}`);
    }
  }

  // Remove deprecated agent files if still present
  const deprecatedAgents = ['empathy-mapper.md', 'wireframe-designer.md'];
  for (const file of deprecatedAgents) {
    const agentPath = path.join(agentsTarget, file);
    if (fs.existsSync(agentPath)) {
      await fs.remove(agentPath);
      changes.push(`Removed deprecated agent: ${file}`);
      if (verbose) console.log(`    Removed deprecated agent: ${file}`);
    }
  }

  // 2. Copy workflow directories
  const workflowsSource = path.join(packageVortex, 'workflows');
  const workflowsTarget = path.join(targetVortex, 'workflows');
  await fs.ensureDir(workflowsTarget);

  for (const wf of WORKFLOWS) {
    const src = path.join(workflowsSource, wf);
    if (fs.existsSync(src)) {
      await fs.copy(src, path.join(workflowsTarget, wf), { overwrite: true });
      changes.push(`Refreshed workflow: ${wf}`);
      if (verbose) console.log(`    Refreshed workflow: ${wf}`);
    }
  }

  // 3. Update config.yaml (merge, preserving user prefs)
  const configPath = path.join(targetVortex, 'config.yaml');
  await fs.ensureDir(path.dirname(configPath));

  const updates = {
    agents: ['contextualization-expert', 'lean-experiments-specialist'],
    workflows: WORKFLOWS
  };

  const merged = await configMerger.mergeConfig(configPath, version, updates);
  await configMerger.writeConfig(configPath, merged);
  changes.push(`Updated config.yaml to v${version}`);
  if (verbose) console.log(`    Updated config.yaml to v${version}`);

  // 4. Copy user guides (with optional backup)
  const guidesSource = path.join(packageRoot, '_bmad-output', 'vortex-artifacts');
  const guidesTarget = path.join(projectRoot, '_bmad-output', 'vortex-artifacts');
  await fs.ensureDir(guidesTarget);

  for (const guide of USER_GUIDES) {
    const src = path.join(guidesSource, guide);
    const dest = path.join(guidesTarget, guide);

    if (fs.existsSync(src)) {
      // Backup existing guide before overwriting
      if (backupGuides && fs.existsSync(dest)) {
        await fs.copy(dest, dest + '.bak', { overwrite: true });
        changes.push(`Backed up ${guide} → ${guide}.bak`);
        if (verbose) console.log(`    Backed up ${guide} → ${guide}.bak`);
      }

      await fs.copy(src, dest, { overwrite: true });
      changes.push(`Refreshed guide: ${guide}`);
      if (verbose) console.log(`    Refreshed guide: ${guide}`);
    }
  }

  return changes;
}

module.exports = { refreshInstallation };
