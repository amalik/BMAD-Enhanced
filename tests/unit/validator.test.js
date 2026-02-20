const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const yaml = require('js-yaml');

const {
  validateInstallation,
  validateConfigStructure,
  validateAgentFiles,
  validateWorkflows,
  validateManifest,
  validateUserDataIntegrity,
  validateDeprecatedWorkflows
} = require('../../scripts/update/lib/validator');

// Full config matching real installations (all required fields)
function fullConfig(overrides = {}) {
  return {
    submodule_name: '_vortex',
    description: 'Vortex Framework',
    module: 'bme',
    version: '1.5.0',
    output_folder: '{project-root}/_bmad-output/vortex-artifacts',
    agents: ['contextualization-expert', 'lean-experiments-specialist'],
    workflows: ['lean-persona', 'product-vision', 'contextualize-scope', 'mvp', 'lean-experiment', 'proof-of-concept', 'proof-of-value'],
    ...overrides
  };
}

// Helper: create a minimal valid installation in a temp dir
async function createValidInstallation(tmpDir) {
  const vortexDir = path.join(tmpDir, '_bmad/bme/_vortex');
  const agentsDir = path.join(vortexDir, 'agents');
  const workflowsDir = path.join(vortexDir, 'workflows');

  await fs.ensureDir(agentsDir);

  // Config with all required fields
  const config = fullConfig();
  await fs.writeFile(path.join(vortexDir, 'config.yaml'), yaml.dump(config), 'utf8');

  // Agent files (all 4 required)
  await fs.writeFile(path.join(agentsDir, 'contextualization-expert.md'), '# Emma', 'utf8');
  await fs.writeFile(path.join(agentsDir, 'lean-experiments-specialist.md'), '# Wade', 'utf8');
  await fs.writeFile(path.join(agentsDir, 'discovery-empathy-expert.md'), '# Isla', 'utf8');
  await fs.writeFile(path.join(agentsDir, 'learning-decision-expert.md'), '# Max', 'utf8');

  // Workflow dirs with workflow.md
  for (const wf of config.workflows) {
    const wfDir = path.join(workflowsDir, wf);
    await fs.ensureDir(wfDir);
    await fs.writeFile(path.join(wfDir, 'workflow.md'), `# ${wf}`, 'utf8');
  }

  return vortexDir;
}

// === validateConfigStructure ===

describe('validateConfigStructure', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-val-'));
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('fails when config.yaml is missing', async () => {
    const result = await validateConfigStructure(tmpDir);
    assert.equal(result.passed, false);
    assert.ok(result.error.includes('not found'));
  });

  it('fails for invalid YAML', async () => {
    const vortexDir = path.join(tmpDir, '_bmad/bme/_vortex');
    await fs.ensureDir(vortexDir);
    await fs.writeFile(path.join(vortexDir, 'config.yaml'), '{{{invalid', 'utf8');

    const result = await validateConfigStructure(tmpDir);
    assert.equal(result.passed, false);
    assert.ok(result.error);
  });

  it('fails for config missing required fields', async () => {
    const vortexDir = path.join(tmpDir, '_bmad/bme/_vortex');
    // Write config without version
    await fs.writeFile(path.join(vortexDir, 'config.yaml'), yaml.dump({ agents: [] }), 'utf8');

    const result = await validateConfigStructure(tmpDir);
    assert.equal(result.passed, false);
    assert.ok(result.error);
  });

  it('passes for valid config', async () => {
    const vortexDir = path.join(tmpDir, '_bmad/bme/_vortex');
    await fs.writeFile(path.join(vortexDir, 'config.yaml'), yaml.dump(fullConfig()), 'utf8');

    const result = await validateConfigStructure(tmpDir);
    assert.equal(result.passed, true);
    assert.equal(result.error, null);
  });
});

// === validateAgentFiles ===

describe('validateAgentFiles', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-val-'));
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('fails when agents/ directory is missing', async () => {
    const result = await validateAgentFiles(tmpDir);
    assert.equal(result.passed, false);
    assert.ok(result.error.includes('not found'));
  });

  it('fails when agent files are missing', async () => {
    const agentsDir = path.join(tmpDir, '_bmad/bme/_vortex/agents');
    await fs.ensureDir(agentsDir);
    // Only create one agent
    await fs.writeFile(path.join(agentsDir, 'contextualization-expert.md'), '# Emma', 'utf8');

    const result = await validateAgentFiles(tmpDir);
    assert.equal(result.passed, false);
    assert.ok(result.error.includes('lean-experiments-specialist'));
  });

  it('passes when all required agents exist', async () => {
    const agentsDir = path.join(tmpDir, '_bmad/bme/_vortex/agents');
    await fs.writeFile(path.join(agentsDir, 'lean-experiments-specialist.md'), '# Wade', 'utf8');
    await fs.writeFile(path.join(agentsDir, 'discovery-empathy-expert.md'), '# Isla', 'utf8');
    await fs.writeFile(path.join(agentsDir, 'learning-decision-expert.md'), '# Max', 'utf8');

    const result = await validateAgentFiles(tmpDir);
    assert.equal(result.passed, true);
  });
});

// === validateWorkflows ===

describe('validateWorkflows', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-val-'));
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('fails when workflows/ directory is missing', async () => {
    const result = await validateWorkflows(tmpDir);
    assert.equal(result.passed, false);
    assert.ok(result.error.includes('not found'));
  });

  it('fails when workflow files are missing', async () => {
    const workflowsDir = path.join(tmpDir, '_bmad/bme/_vortex/workflows');
    await fs.ensureDir(workflowsDir);
    // Create only one workflow
    const wfDir = path.join(workflowsDir, 'lean-persona');
    await fs.ensureDir(wfDir);
    await fs.writeFile(path.join(wfDir, 'workflow.md'), '# lean-persona', 'utf8');

    const result = await validateWorkflows(tmpDir);
    assert.equal(result.passed, false);
    assert.ok(result.error.includes('Missing'));
  });

  it('passes when all required workflows exist', async () => {
    const workflowsDir = path.join(tmpDir, '_bmad/bme/_vortex/workflows');
    const required = [
      'product-vision', 'contextualize-scope', 'mvp',
      'lean-experiment', 'proof-of-concept', 'proof-of-value'
    ];
    for (const wf of required) {
      const wfDir = path.join(workflowsDir, wf);
      await fs.ensureDir(wfDir);
      await fs.writeFile(path.join(wfDir, 'workflow.md'), `# ${wf}`, 'utf8');
    }

    const result = await validateWorkflows(tmpDir);
    assert.equal(result.passed, true);
  });
});

// === validateManifest ===

describe('validateManifest', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-val-'));
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('passes when manifest is missing (optional)', async () => {
    const result = await validateManifest(tmpDir);
    assert.equal(result.passed, true);
    assert.ok(result.warning);
  });

  it('fails when manifest is missing required agents', async () => {
    const manifestDir = path.join(tmpDir, '_bmad/_config');
    await fs.ensureDir(manifestDir);
    await fs.writeFile(
      path.join(manifestDir, 'agent-manifest.csv'),
      '"agent_id"\n"some-other-agent"\n',
      'utf8'
    );

    const result = await validateManifest(tmpDir);
    assert.equal(result.passed, false);
    assert.ok(result.error.includes('missing'));
  });

  it('passes when manifest contains both agents', async () => {
    const manifestPath = path.join(tmpDir, '_bmad/_config/agent-manifest.csv');
    await fs.writeFile(
      manifestPath,
      '"agent_id"\n"contextualization-expert"\n"lean-experiments-specialist"\n',
      'utf8'
    );

    const result = await validateManifest(tmpDir);
    assert.equal(result.passed, true);
  });
});

// === validateUserDataIntegrity ===

describe('validateUserDataIntegrity', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-val-'));
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('fails when _bmad-output/ does not exist', async () => {
    const result = await validateUserDataIntegrity(5, tmpDir);
    assert.equal(result.passed, false);
    assert.ok(result.error.includes('not found'));
  });

  it('fails when file count is significantly lower than expected', async () => {
    const outputDir = path.join(tmpDir, '_bmad-output');
    await fs.ensureDir(outputDir);
    // Create only 1 file but expect 10
    await fs.writeFile(path.join(outputDir, 'artifact.md'), 'test', 'utf8');

    const result = await validateUserDataIntegrity(10, tmpDir);
    assert.equal(result.passed, false);
    assert.ok(result.error.includes('mismatch'));
  });

  it('passes when file count matches expected', async () => {
    const outputDir = path.join(tmpDir, '_bmad-output');
    // Create files to match
    for (let i = 0; i < 5; i++) {
      await fs.writeFile(path.join(outputDir, `file-${i}.md`), 'test', 'utf8');
    }

    const result = await validateUserDataIntegrity(5, tmpDir);
    assert.equal(result.passed, true);
    assert.ok(result.info);
  });

  it('allows slight variation (within 2 files)', async () => {
    const result = await validateUserDataIntegrity(8, tmpDir);
    assert.equal(result.passed, true);
  });
});

// === validateDeprecatedWorkflows ===

describe('validateDeprecatedWorkflows', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-val-'));
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('passes when no _deprecated/ directory exists', async () => {
    const result = await validateDeprecatedWorkflows(tmpDir);
    assert.equal(result.passed, true);
    assert.ok(result.info);
  });

  it('warns when _deprecated/ exists but is empty', async () => {
    const deprecatedDir = path.join(tmpDir, '_bmad/bme/_vortex/workflows/_deprecated');
    await fs.ensureDir(deprecatedDir);

    const result = await validateDeprecatedWorkflows(tmpDir);
    assert.equal(result.passed, true);
    assert.ok(result.warning);
  });

  it('passes when deprecated workflows are present', async () => {
    const wireframeDir = path.join(tmpDir, '_bmad/bme/_vortex/workflows/_deprecated/wireframe');
    await fs.ensureDir(wireframeDir);

    const result = await validateDeprecatedWorkflows(tmpDir);
    assert.equal(result.passed, true);
    assert.ok(result.info);
  });
});

// === validateInstallation (orchestrator) ===

describe('validateInstallation', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-val-'));
    await createValidInstallation(tmpDir);
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('returns valid:true for a complete installation', async () => {
    const result = await validateInstallation({}, tmpDir);
    assert.equal(result.valid, true);
    assert.ok(Array.isArray(result.checks));
    assert.ok(result.checks.length >= 5);
    assert.ok(result.checks.every(c => c.passed));
  });

  it('includes user data check when preMigrationData has user_data_count', async () => {
    const outputDir = path.join(tmpDir, '_bmad-output');
    await fs.ensureDir(outputDir);
    await fs.writeFile(path.join(outputDir, 'test.md'), 'data', 'utf8');

    const result = await validateInstallation({ user_data_count: 1 }, tmpDir);
    assert.ok(result.checks.some(c => c.name === 'User data preserved'));
  });

  it('returns valid:false when installation is broken', async () => {
    const brokenDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-broken-'));
    await fs.ensureDir(path.join(brokenDir, '_bmad'));

    const result = await validateInstallation({}, brokenDir);
    assert.equal(result.valid, false);
    assert.ok(result.checks.some(c => !c.passed));

    await fs.remove(brokenDir);
  });
});
