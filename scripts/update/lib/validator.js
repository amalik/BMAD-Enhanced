#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const configMerger = require('./config-merger');
const { countUserDataFiles } = require('./utils');
const { AGENT_FILES, AGENT_IDS, WORKFLOW_NAMES, WAVE3_WORKFLOW_NAMES } = require('./agent-registry');

/**
 * Validator for Convoke
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

  // 7. Workflow step structure validation (P17 count + P20 filenames)
  checks.push(await validateWorkflowStepStructure(projectRoot));

  // 8. Enhance module validation (optional — passes if not installed)
  checks.push(await validateEnhanceModule(projectRoot));

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
    const requiredAgents = AGENT_FILES;

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
    const requiredWorkflows = WORKFLOW_NAMES;

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

    // Check for all Convoke agents
    const missingFromManifest = AGENT_IDS.filter(id => !manifestContent.includes(id));

    if (missingFromManifest.length > 0) {
      check.error = `Agent manifest missing: ${missingFromManifest.join(', ')}`;
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

/**
 * Validate workflow step structure (P17 count + P20 filenames)
 * @param {string} projectRoot - Absolute path to project root
 * @returns {Promise<object>} Validation check result
 */
async function validateWorkflowStepStructure(projectRoot) {
  const check = {
    name: 'Workflow step structure',
    passed: true,
    error: null
  };

  try {
    const workflowsDir = path.join(projectRoot, '_bmad/bme/_vortex/workflows');
    const issues = [];

    for (const workflow of WORKFLOW_NAMES) {
      const stepsDir = path.join(workflowsDir, workflow, 'steps');

      if (!fs.existsSync(stepsDir)) {
        continue; // Placeholder workflows without steps/ are valid
      }

      const files = fs.readdirSync(stepsDir).filter(f => f.endsWith('.md'));

      // P17: step count must be 4-6
      if (files.length < 4 || files.length > 6) {
        issues.push(`${workflow}: ${files.length} step files (expected 4-6)`);
        continue;
      }

      // P20: standardized filenames (Wave 3 workflows only)
      if (WAVE3_WORKFLOW_NAMES.has(workflow)) {
        if (!files.includes('step-01-setup.md')) {
          issues.push(`${workflow}: missing step-01-setup.md`);
        }
        if (!files.includes('step-02-context.md')) {
          issues.push(`${workflow}: missing step-02-context.md`);
        }
        if (!files.some(f => f.endsWith('-synthesize.md'))) {
          issues.push(`${workflow}: missing *-synthesize.md final step`);
        }
      }
    }

    if (issues.length > 0) {
      check.passed = false;
      check.error = `Step structure issues: ${issues.join('; ')}`;
    }
  } catch (error) {
    check.error = error.message;
    check.passed = false;
  }

  return check;
}

/**
 * Validate Enhance module installation (optional — passes if not installed)
 * Performs 5-point verification: directory, entry point, menu patch, config, filesystem consistency
 * @param {string} projectRoot - Absolute path to project root
 * @returns {Promise<object>} Validation check result
 */
async function validateEnhanceModule(projectRoot) {
  const check = {
    name: 'Enhance module',
    passed: false,
    error: null
  };

  try {
    const enhanceDir = path.join(projectRoot, '_bmad/bme/_enhance');

    // Check 1: Directory exists — if not, Enhance is simply not installed (optional)
    if (!fs.existsSync(enhanceDir)) {
      check.passed = true;
      check.info = 'Enhance module not installed (optional)';
      return check;
    }

    const failures = [];

    // Check 4 (first — needed by checks 2, 3, 5): Config valid
    const configPath = path.join(enhanceDir, 'config.yaml');
    let config = null;

    if (!fs.existsSync(configPath)) {
      failures.push('config.yaml not found');
    } else {
      try {
        config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      } catch (err) {
        failures.push(`config.yaml parse error: ${err.message}`);
      }

      if (config) {
        const missing = [];
        if (!config.name) missing.push('name');
        if (!config.version) missing.push('version');
        if (!config.description) missing.push('description');
        if (!Array.isArray(config.workflows) || config.workflows.length === 0) {
          missing.push('workflows (must be non-empty array)');
        } else {
          config.workflows.forEach((wf, i) => {
            const wfMissing = [];
            if (!wf.name) wfMissing.push('name');
            if (!wf.entry) wfMissing.push('entry');
            if (!wf.target_agent) wfMissing.push('target_agent');
            if (!wf.menu_patch_name) wfMissing.push('menu_patch_name');
            if (wfMissing.length > 0) {
              missing.push(`workflows[${i}] missing: ${wfMissing.join(', ')}`);
            }
          });
        }
        if (missing.length > 0) {
          failures.push(`config missing fields: ${missing.join('; ')}`);
        }
      }
    }

    // Checks 2, 3, 5 require a valid config with workflows
    if (config && Array.isArray(config.workflows)) {
      for (const wf of config.workflows) {
        // Check 2: Workflow entry point resolves
        if (wf.entry) {
          const entryPath = path.join(enhanceDir, wf.entry);
          if (!fs.existsSync(entryPath)) {
            failures.push(`workflow entry point not found: ${wf.entry}`);
          }
        }

        // Check 3: Menu patch present in target agent
        if (wf.target_agent) {
          const agentPath = path.join(projectRoot, '_bmad', wf.target_agent);
          if (fs.existsSync(agentPath)) {
            const agentContent = fs.readFileSync(agentPath, 'utf8');
            const patchName = wf.menu_patch_name || wf.name;
            if (!agentContent.includes(patchName)) {
              failures.push(`menu patch "${patchName}" not found in ${wf.target_agent}`);
            }
          }
          // If agent file doesn't exist, that's already caught by agent validation — not an Enhance-specific failure
        }

        // Check 5: Config-to-filesystem consistency — workflow directory exists
        if (wf.name) {
          const wfDir = path.join(enhanceDir, 'workflows', wf.name);
          if (!fs.existsSync(wfDir)) {
            failures.push(`workflow directory not found for registered workflow: ${wf.name}`);
          }
        }

        // Check 6: Skill wrapper exists for workflow
        if (wf.name) {
          const skillWrapperPath = path.join(projectRoot, '.claude', 'skills', `bmad-enhance-${wf.name}`, 'SKILL.md');
          if (!fs.existsSync(skillWrapperPath)) {
            failures.push(`skill wrapper not found: .claude/skills/bmad-enhance-${wf.name}/SKILL.md`);
          }
        }
      }
    }

    if (failures.length > 0) {
      check.error = `Enhance: ${failures.join('; ')}`;
    } else {
      check.passed = true;
    }
  } catch (error) {
    check.error = error.message;
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
  validateDeprecatedWorkflows,
  validateWorkflowStepStructure,
  validateEnhanceModule
};
