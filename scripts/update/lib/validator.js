#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const configMerger = require('./config-merger');

/**
 * Validator for BMAD-Enhanced
 * Verifies installation integrity post-migration
 */

/**
 * Validate entire installation
 * @param {object} preM

igrationData - Data from before migration for comparison
 * @returns {Promise<object>} Validation result
 */
async function validateInstallation(preMigrationData = {}) {
  const checks = [];

  // 1. Config structure validation
  checks.push(await validateConfigStructure());

  // 2. Agent files validation
  checks.push(await validateAgentFiles());

  // 3. Workflow files validation
  checks.push(await validateWorkflows());

  // 4. Manifest consistency validation
  checks.push(await validateManifest());

  // 5. User data integrity validation
  if (preMigrationData.userDataCount) {
    checks.push(await validateUserDataIntegrity(preMigrationData.userDataCount));
  }

  // 6. Deprecated workflows validation (if applicable)
  checks.push(await validateDeprecatedWorkflows());

  const allPassed = checks.every(c => c.passed);

  return {
    valid: allPassed,
    checks
  };
}

/**
 * Validate config.yaml structure
 * @returns {Promise<object>} Validation check result
 */
async function validateConfigStructure() {
  const check = {
    name: 'Config structure',
    passed: false,
    error: null
  };

  try {
    const configPath = path.join(process.cwd(), '_bmad/bme/_vortex/config.yaml');

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
 * @returns {Promise<object>} Validation check result
 */
async function validateAgentFiles() {
  const check = {
    name: 'Agent files',
    passed: false,
    error: null
  };

  try {
    const agentsDir = path.join(process.cwd(), '_bmad/bme/_vortex/agents');
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
 * @returns {Promise<object>} Validation check result
 */
async function validateWorkflows() {
  const check = {
    name: 'Workflow files',
    passed: false,
    error: null
  };

  try {
    const workflowsDir = path.join(process.cwd(), '_bmad/bme/_vortex/workflows');
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
 * @returns {Promise<object>} Validation check result
 */
async function validateManifest() {
  const check = {
    name: 'Agent manifest',
    passed: false,
    error: null
  };

  try {
    const manifestPath = path.join(process.cwd(), '_bmad/_config/agent-manifest.csv');

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
 * @returns {Promise<object>} Validation check result
 */
async function validateUserDataIntegrity(expectedCount) {
  const check = {
    name: 'User data preserved',
    passed: false,
    error: null
  };

  try {
    const outputDir = path.join(process.cwd(), '_bmad-output');

    if (!fs.existsSync(outputDir)) {
      check.error = '_bmad-output/ directory not found';
      return check;
    }

    const currentCount = await countUserDataFiles(outputDir);

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
 * @returns {Promise<object>} Validation check result
 */
async function validateDeprecatedWorkflows() {
  const check = {
    name: 'Deprecated workflows',
    passed: true, // Not required, so pass by default
    error: null
  };

  try {
    const deprecatedDir = path.join(process.cwd(), '_bmad/bme/_vortex/workflows/_deprecated');

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

/**
 * Count user data files in _bmad-output
 * @param {string} outputDir - Output directory path
 * @returns {Promise<number>} File count
 */
async function countUserDataFiles(outputDir) {
  let count = 0;

  async function countRecursive(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      // Skip .backups and .logs directories
      if (entry.name === '.backups' || entry.name === '.logs') {
        continue;
      }

      if (entry.isDirectory()) {
        await countRecursive(fullPath);
      } else if (entry.isFile()) {
        count++;
      }
    }
  }

  await countRecursive(outputDir);
  return count;
}

/**
 * Run smoke tests after migration
 * @returns {Promise<object>} Smoke test result
 */
async function runSmokeTests() {
  const tests = [];

  // Test 1: Can read Emma agent file
  tests.push(await testReadAgentFile('contextualization-expert.md', 'Emma'));

  // Test 2: Can read Wade agent file
  tests.push(await testReadAgentFile('lean-experiments-specialist.md', 'Wade'));

  // Test 3: Can read a workflow template
  tests.push(await testReadWorkflowTemplate('lean-persona'));

  // Test 4: Config.yaml is parseable
  tests.push(await testConfigParseable());

  const allPassed = tests.every(t => t.passed);

  return {
    passed: allPassed,
    tests
  };
}

/**
 * Test reading an agent file
 */
async function testReadAgentFile(filename, agentName) {
  const test = { name: `Read ${agentName} agent file`, passed: false };

  try {
    const agentPath = path.join(process.cwd(), '_bmad/bme/_vortex/agents', filename);
    const content = await fs.readFile(agentPath, 'utf8');

    if (content.length > 0) {
      test.passed = true;
    }
  } catch (error) {
    test.error = error.message;
  }

  return test;
}

/**
 * Test reading a workflow template
 */
async function testReadWorkflowTemplate(workflowName) {
  const test = { name: `Read ${workflowName} template`, passed: false };

  try {
    const templatePath = path.join(
      process.cwd(),
      '_bmad/bme/_vortex/workflows',
      workflowName,
      `${workflowName}.template.md`
    );

    const content = await fs.readFile(templatePath, 'utf8');

    if (content.length > 0) {
      test.passed = true;
    }
  } catch (error) {
    test.error = error.message;
  }

  return test;
}

/**
 * Test config.yaml parseability
 */
async function testConfigParseable() {
  const test = { name: 'Parse config.yaml', passed: false };

  try {
    const configPath = path.join(process.cwd(), '_bmad/bme/_vortex/config.yaml');
    const content = await fs.readFile(configPath, 'utf8');
    const config = yaml.load(content);

    if (config && config.version) {
      test.passed = true;
    }
  } catch (error) {
    test.error = error.message;
  }

  return test;
}

module.exports = {
  validateInstallation,
  validateConfigStructure,
  validateAgentFiles,
  validateWorkflows,
  validateManifest,
  validateUserDataIntegrity,
  validateDeprecatedWorkflows,
  runSmokeTests
};
