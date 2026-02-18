#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const configMerger = require('./config-merger');
const { countUserDataFiles } = require('./utils');

/**
 * Validator for BMAD-Enhanced
 * Verifies installation integrity post-migration
 */

/**
 * Validate entire installation
 * @param {object} preMigrationData - Data from before migration for comparison
 * @param {string} projectRoot - Absolute path to project root
 * @returns {Promise<object>} Validation result
 */
async function validateInstallation(preMigrationData = {}, projectRoot) {
  const checks = [];

  // 1. Config structure validation
  checks.push(await validateConfigStructure(projectRoot));

  // 2. Agent files validation
  checks.push(await validateAgentFiles(projectRoot));

  // 3. Workflow files validation
  checks.push(await validateWorkflows(projectRoot));

  // 4. Manifest consistency validation
  checks.push(await validateManifest(projectRoot));

  // 5. User data integrity validation
  if (preMigrationData.user_data_count) {
    checks.push(await validateUserDataIntegrity(preMigrationData.user_data_count, projectRoot));
  }

  // 6. Deprecated workflows validation (if applicable)
  checks.push(await validateDeprecatedWorkflows(projectRoot));

  const allPassed = checks.every(c => c.passed);

  return {
    valid: allPassed,
    checks
  };
}

/**
 * Validate config.yaml structure
 * @param {string} projectRoot - Absolute path to project root
 * @returns {Promise<object>} Validation check result
 */
async function validateConfigStructure(projectRoot) {
  const check = {
    name: 'Config structure',
    passed: false,
    error: null
  };

  try {
    const configPath = path.join(projectRoot, '_bmad/bme/_vortex/config.yaml');

    if (!fs.existsSync(configPath)) {
      check.error = 'config.yaml not found';
      return check;
    }

    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(configContent);

    // Validate using config-merger
    const validation = configMerger.validateConfig(config);

    if (!validation.valid) {
      check.error = validation.errors.join(', ');
      return check;
    }

    check.passed = true;
  } catch (error) {
    check.error = error.message;
  }

  return check;
}

/**
 * Validate agent files exist
 * @param {string} projectRoot - Absolute path to project root
 * @returns {Promise<object>} Validation check result
 */
async function validateAgentFiles(projectRoot) {
  const check = {
    name: 'Agent files',
    passed: false,
    error: null
  };

  try {
    const agentsDir = path.join(projectRoot, '_bmad/bme/_vortex/agents');
    const requiredAgents = [
      'contextualization-expert.md',
      'lean-experiments-specialist.md'
    ];

    if (!fs.existsSync(agentsDir)) {
      check.error = 'agents/ directory not found';
      return check;
    }

    const missingAgents = [];
    for (const agent of requiredAgents) {
      const agentPath = path.join(agentsDir, agent);
      if (!fs.existsSync(agentPath)) {
        missingAgents.push(agent);
      }
    }

    if (missingAgents.length > 0) {
      check.error = `Missing agent files: ${missingAgents.join(', ')}`;
      return check;
    }

    check.passed = true;
  } catch (error) {
    check.error = error.message;
  }

  return check;
}

/**
 * Validate workflow files exist
 * @param {string} projectRoot - Absolute path to project root
 * @returns {Promise<object>} Validation check result
 */
async function validateWorkflows(projectRoot) {
  const check = {
    name: 'Workflow files',
    passed: false,
    error: null
  };

  try {
    const workflowsDir = path.join(projectRoot, '_bmad/bme/_vortex/workflows');
    const requiredWorkflows = [
      'lean-persona',
      'product-vision',
      'contextualize-scope',
      'mvp',
      'lean-experiment',
      'proof-of-concept',
      'proof-of-value'
    ];

    if (!fs.existsSync(workflowsDir)) {
      check.error = 'workflows/ directory not found';
      return check;
    }

    const missingWorkflows = [];
    for (const workflow of requiredWorkflows) {
      const workflowFile = path.join(workflowsDir, workflow, 'workflow.md');
      if (!fs.existsSync(workflowFile)) {
        missingWorkflows.push(workflow);
      }
    }

    if (missingWorkflows.length > 0) {
      check.error = `Missing workflows: ${missingWorkflows.join(', ')}`;
      return check;
    }

    check.passed = true;
  } catch (error) {
    check.error = error.message;
  }

  return check;
}

/**
 * Validate agent manifest consistency
 * @param {string} projectRoot - Absolute path to project root
 * @returns {Promise<object>} Validation check result
 */
async function validateManifest(projectRoot) {
  const check = {
    name: 'Agent manifest',
    passed: false,
    error: null
  };

  try {
    const manifestPath = path.join(projectRoot, '_bmad/_config/agent-manifest.csv');

    if (!fs.existsSync(manifestPath)) {
      // Manifest is optional, so this is not a failure
      check.passed = true;
      check.warning = 'agent-manifest.csv not found (optional)';
      return check;
    }

    const manifestContent = fs.readFileSync(manifestPath, 'utf8');

    // Check for BMAD-Enhanced agents
    const hasEmma = manifestContent.includes('contextualization-expert');
    const hasWade = manifestContent.includes('lean-experiments-specialist');

    if (!hasEmma || !hasWade) {
      check.error = 'Agent manifest missing BMAD-Enhanced agents';
      return check;
    }

    check.passed = true;
  } catch (error) {
    check.error = error.message;
  }

  return check;
}

/**
 * Validate user data integrity
 * @param {number} expectedCount - Expected file count
 * @param {string} projectRoot - Absolute path to project root
 * @returns {Promise<object>} Validation check result
 */
async function validateUserDataIntegrity(expectedCount, projectRoot) {
  const check = {
    name: 'User data preserved',
    passed: false,
    error: null
  };

  try {
    const outputDir = path.join(projectRoot, '_bmad-output');

    if (!fs.existsSync(outputDir)) {
      check.error = '_bmad-output/ directory not found';
      return check;
    }

    const currentCount = await countUserDataFiles(projectRoot);

    // Allow for slight variation (user guides may have been updated)
    if (currentCount >= expectedCount - 2) {
      check.passed = true;
      check.info = `Files: ${currentCount} (expected: ${expectedCount})`;
    } else {
      check.error = `User data count mismatch: ${currentCount} (expected: ${expectedCount})`;
    }
  } catch (error) {
    check.error = error.message;
  }

  return check;
}

/**
 * Validate deprecated workflows structure
 * @param {string} projectRoot - Absolute path to project root
 * @returns {Promise<object>} Validation check result
 */
async function validateDeprecatedWorkflows(projectRoot) {
  const check = {
    name: 'Deprecated workflows',
    passed: true, // Not required, so pass by default
    error: null
  };

  try {
    const deprecatedDir = path.join(projectRoot, '_bmad/bme/_vortex/workflows/_deprecated');

    if (!fs.existsSync(deprecatedDir)) {
      check.info = 'No deprecated workflows (fresh installation)';
      return check;
    }

    // If deprecated dir exists, check for expected workflows
    const empathyMapDir = path.join(deprecatedDir, 'empathy-map');
    const wireframeDir = path.join(deprecatedDir, 'wireframe');

    if (!fs.existsSync(empathyMapDir) && !fs.existsSync(wireframeDir)) {
      check.warning = '_deprecated/ directory exists but is empty';
    } else {
      check.info = 'Deprecated workflows preserved in _deprecated/';
    }

    check.passed = true;
  } catch (error) {
    check.error = error.message;
    check.passed = false;
  }

  return check;
}

module.exports = {
  validateInstallation,
  validateConfigStructure,
  validateAgentFiles,
  validateWorkflows,
  validateManifest,
  validateUserDataIntegrity,
  validateDeprecatedWorkflows
};
