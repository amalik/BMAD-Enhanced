'use strict';

const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const yaml = require('js-yaml');
const { execFile } = require('node:child_process');

const { AGENT_IDS, WORKFLOW_NAMES } = require('../scripts/update/lib/agent-registry');

const PACKAGE_ROOT = path.join(__dirname, '..');

// ─── Temp Directory ──────────────────────────────────────────────

/**
 * Create an isolated temp directory for a test suite.
 * @param {string} prefix - Short prefix (e.g. 'bmad-val-')
 * @returns {Promise<string>} Absolute path to temp dir
 */
async function createTempDir(prefix = 'bmad-test-') {
  return fs.mkdtemp(path.join(os.tmpdir(), prefix));
}

// ─── Config Factories ────────────────────────────────────────────

/**
 * Build a complete, valid Vortex config.
 * All agents + workflows are sourced from the registry.
 */
function fullConfig(overrides = {}) {
  return {
    submodule_name: '_vortex',
    description: 'Vortex Framework',
    module: 'bme',
    version: '1.5.0',
    output_folder: '{project-root}/_bmad-output/vortex-artifacts',
    agents: [...AGENT_IDS],
    workflows: [...WORKFLOW_NAMES],
    ...overrides
  };
}

/** v1.0.x installation config (deprecated agent names). */
function v1_0_x_config(overrides = {}) {
  return {
    version: '1.0.5',
    agents: ['empathy-mapper', 'wireframe-designer'],
    workflows: ['empathy-map', 'wireframe'],
    ...overrides
  };
}

/** v1.3.x installation config (Emma + Wade only). */
function v1_3_x_config(overrides = {}) {
  return {
    version: '1.3.8',
    submodule_name: 'vortex',
    description: 'test',
    module: 'bme',
    output_folder: '_bmad-output/vortex-artifacts',
    agents: ['contextualization-expert', 'lean-experiments-specialist'],
    workflows: ['lean-persona'],
    ...overrides
  };
}

/** v1.4.x installation config (Emma + Wade, 7 workflows). */
function v1_4_x_config(overrides = {}) {
  return {
    version: '1.4.1',
    submodule_name: 'vortex',
    description: 'test',
    module: 'bme',
    output_folder: '_bmad-output/vortex-artifacts',
    agents: ['contextualization-expert', 'lean-experiments-specialist'],
    workflows: [
      'lean-persona', 'product-vision', 'contextualize-scope',
      'mvp', 'lean-experiment', 'proof-of-concept', 'proof-of-value'
    ],
    ...overrides
  };
}

// ─── Installation Builders ───────────────────────────────────────

/**
 * Create a fully valid current-version installation in a temp dir.
 * All agents, workflows, and config sourced from registry.
 */
async function createValidInstallation(tmpDir) {
  const vortexDir = path.join(tmpDir, '_bmad/bme/_vortex');
  const agentsDir = path.join(vortexDir, 'agents');
  const workflowsDir = path.join(vortexDir, 'workflows');

  await fs.ensureDir(agentsDir);

  const config = fullConfig();
  await fs.writeFile(path.join(vortexDir, 'config.yaml'), yaml.dump(config), 'utf8');

  // Agent files (all from registry)
  for (const agentId of AGENT_IDS) {
    await fs.writeFile(path.join(agentsDir, `${agentId}.md`), `# ${agentId}`, 'utf8');
  }

  // Workflow dirs with workflow.md
  for (const wf of config.workflows) {
    const wfDir = path.join(workflowsDir, wf);
    await fs.ensureDir(wfDir);
    await fs.writeFile(path.join(wfDir, 'workflow.md'), `# ${wf}`, 'utf8');
  }

  return vortexDir;
}

/**
 * Create a valid installation, then override its version.
 * Useful for simulating an older installation for migration tests.
 */
async function createInstallation(tmpDir, version) {
  const { refreshInstallation } = require('../scripts/update/lib/refresh-installation');
  await fs.ensureDir(path.join(tmpDir, '_bmad'));
  await refreshInstallation(tmpDir, { backupGuides: false, verbose: false });

  const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
  const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
  config.version = version;
  fs.writeFileSync(configPath, yaml.dump(config), 'utf8');
}

// ─── CLI Runner ──────────────────────────────────────────────────

/**
 * Run a Node script as a child process and capture output.
 * @param {string} script - Absolute path to script
 * @param {string[]} [args=[]] - CLI arguments
 * @param {object} [opts={}] - Options: cwd, timeout
 * @returns {Promise<{exitCode: number, stdout: string, stderr: string}>}
 */
function runScript(script, args = [], opts = {}) {
  const cwd = opts.cwd || PACKAGE_ROOT;
  const timeout = opts.timeout || 15000;

  return new Promise((resolve) => {
    execFile('node', [script, ...args], { cwd, timeout }, (err, stdout, stderr) => {
      resolve({ exitCode: err ? err.code : 0, stdout, stderr });
    });
  });
}

// ─── Console Silencing ───────────────────────────────────────────

const _origLog = console.log;
const _origWarn = console.warn;
const _origError = console.error;

function silenceConsole() {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

function restoreConsole() {
  console.log = _origLog;
  console.warn = _origWarn;
  console.error = _origError;
}

// ─── Exports ─────────────────────────────────────────────────────

module.exports = {
  PACKAGE_ROOT,
  createTempDir,
  fullConfig,
  v1_0_x_config,
  v1_3_x_config,
  v1_4_x_config,
  createValidInstallation,
  createInstallation,
  runScript,
  silenceConsole,
  restoreConsole
};
