#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

/**
 * Migration: 1.0.x → current version
 * BREAKING CHANGES (delta only):
 * - Archive empathy-map and wireframe workflows to _deprecated/
 * - Remove legacy _designos directory
 * - Update agent manifest (rename empathy-mapper/wireframe-designer entries)
 *
 * Note: Agent files, workflows, config, and guides are handled by refreshInstallation().
 */

module.exports = {
  name: '1.0.x-to-1.3.0',
  fromVersion: '1.0.x',
  breaking: true,

  async preview() {
    return {
      actions: [
        'BREAKING: Move empathy-map workflow to _deprecated/',
        'BREAKING: Move wireframe workflow to _deprecated/',
        'Remove legacy _designos directory (pre-Vortex structure)',
        'Update agent-manifest.csv (rename empathy-mapper/wireframe-designer entries)'
      ]
    };
  },

  /**
   * Apply delta-only migration logic.
   * @param {string} projectRoot - Absolute path to project root
   * @returns {Promise<Array<string>>} List of changes made
   */
  async apply(projectRoot) {
    const changes = [];
    const targetDir = path.join(projectRoot, '_bmad/bme/_vortex');

    // 1. Archive old empathy-map workflow
    const archived1 = await moveToDeprecated(targetDir, 'empathy-map');
    if (archived1) changes.push('Archived empathy-map workflow to _deprecated/');

    // 2. Archive wireframe workflow
    const archived2 = await moveToDeprecated(targetDir, 'wireframe');
    if (archived2) changes.push('Archived wireframe workflow to _deprecated/');

    // 3. Remove legacy _designos directories
    await removeOldDesignosDirectory(projectRoot);
    changes.push('Cleaned up legacy _designos directory');

    // 4. Update agent manifest (rename old agent IDs)
    await updateAgentManifest(projectRoot);
    changes.push('Updated agent manifest');

    return changes;
  }
};

/**
 * Move workflow to _deprecated directory
 * @param {string} targetDir - Target vortex directory
 * @param {string} workflowName - Name of workflow to deprecate
 * @returns {Promise<boolean>} True if moved, false if not found
 */
async function moveToDeprecated(targetDir, workflowName) {
  const workflowsDir = path.join(targetDir, 'workflows');
  const workflowPath = path.join(workflowsDir, workflowName);
  const deprecatedPath = path.join(workflowsDir, '_deprecated', workflowName);

  if (fs.existsSync(workflowPath)) {
    await fs.ensureDir(path.join(workflowsDir, '_deprecated'));
    await fs.move(workflowPath, deprecatedPath, { overwrite: true });
    console.log(`    Moved ${workflowName} → _deprecated/`);
    return true;
  }

  console.log(`    ${workflowName} not found (may already be deprecated)`);
  return false;
}

/**
 * Update agent manifest CSV - rename old agent IDs
 * @param {string} projectRoot - Absolute path to project root
 */
async function updateAgentManifest(projectRoot) {
  const manifestPath = path.join(projectRoot, '_bmad/_config/agent-manifest.csv');

  if (!fs.existsSync(manifestPath)) {
    console.log('    Agent manifest not found, skipping update');
    return;
  }

  let manifestContent = await fs.readFile(manifestPath, 'utf8');

  manifestContent = manifestContent.replace(/empathy-mapper/g, 'contextualization-expert');
  manifestContent = manifestContent.replace(/Empathy Mapping Specialist/g, 'Contextualization Expert');
  manifestContent = manifestContent.replace(/wireframe-designer/g, 'lean-experiments-specialist');
  manifestContent = manifestContent.replace(/Wireframe Designer/g, 'Lean Experiments Specialist');

  await fs.writeFile(manifestPath, manifestContent, 'utf8');
  console.log('    Updated agent manifest');
}

/**
 * Remove old _designos directory (pre-Vortex structure)
 * @param {string} projectRoot - Absolute path to project root
 */
async function removeOldDesignosDirectory(projectRoot) {
  const legacyPaths = [
    path.join(projectRoot, '_bmad/bme/_designos'),
    path.join(projectRoot, '_bmad/_designos'),
  ];

  let removed = false;
  for (const designosPath of legacyPaths) {
    if (fs.existsSync(designosPath)) {
      await fs.remove(designosPath);
      console.log(`    Removed legacy directory: ${path.relative(projectRoot, designosPath)}`);
      removed = true;
    }
  }

  if (!removed) {
    console.log('    No legacy _designos directory found (OK)');
  }
}
