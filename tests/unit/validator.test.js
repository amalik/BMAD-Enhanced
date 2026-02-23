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
  validateDeprecatedWorkflows,
  validateWorkflowStepStructure
} = require('../../scripts/update/lib/validator');
const { fullConfig, createValidInstallation } = require('../helpers');

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
    const { AGENT_IDS } = require('../../scripts/update/lib/agent-registry');
    for (const id of AGENT_IDS) {
      await fs.writeFile(path.join(agentsDir, `${id}.md`), `# ${id}`, 'utf8');
    }

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
    const { WORKFLOW_NAMES } = require('../../scripts/update/lib/agent-registry');
    for (const wf of WORKFLOW_NAMES) {
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

  it('passes when manifest contains all agents', async () => {
    const manifestPath = path.join(tmpDir, '_bmad/_config/agent-manifest.csv');
    const { AGENT_IDS } = require('../../scripts/update/lib/agent-registry');
    const csvRows = ['"agent_id"', ...AGENT_IDS.map(id => `"${id}"`)].join('\n') + '\n';
    await fs.writeFile(manifestPath, csvRows, 'utf8');

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

// === validateWorkflowStepStructure ===

describe('validateWorkflowStepStructure', () => {
  // Helper: create an isolated tmpDir with a single workflow + steps
  async function createStepFixture(workflowName, stepFiles) {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-steps-'));
    const workflowsDir = path.join(tmpDir, '_bmad/bme/_vortex/workflows');
    const wfDir = path.join(workflowsDir, workflowName);
    await fs.ensureDir(wfDir);
    await fs.writeFile(path.join(wfDir, 'workflow.md'), `# ${workflowName}`, 'utf8');

    if (stepFiles && stepFiles.length > 0) {
      const stepsDir = path.join(wfDir, 'steps');
      await fs.ensureDir(stepsDir);
      for (const f of stepFiles) {
        await fs.writeFile(path.join(stepsDir, f), `# ${f}`, 'utf8');
      }
    }
    return tmpDir;
  }

  it('passes for workflows without steps/ directory (placeholder)', async () => {
    const tmpDir = await createStepFixture('lean-persona', null);
    const result = await validateWorkflowStepStructure(tmpDir);
    assert.equal(result.passed, true);
    await fs.remove(tmpDir);
  });

  it('passes with 4 step files (minimum)', async () => {
    const tmpDir = await createStepFixture('lean-persona', [
      'step-01-setup.md', 'step-02-context.md', 'step-03-work.md', 'step-04-synthesize.md'
    ]);
    const result = await validateWorkflowStepStructure(tmpDir);
    assert.equal(result.passed, true);
    await fs.remove(tmpDir);
  });

  it('passes with 6 step files (maximum)', async () => {
    const tmpDir = await createStepFixture('lean-persona', [
      'step-01-setup.md', 'step-02-context.md', 'step-03-work.md',
      'step-04-deep.md', 'step-05-extra.md', 'step-06-synthesize.md'
    ]);
    const result = await validateWorkflowStepStructure(tmpDir);
    assert.equal(result.passed, true);
    await fs.remove(tmpDir);
  });

  it('fails with 3 step files (below minimum)', async () => {
    const tmpDir = await createStepFixture('contextualize-scope', [
      'step-01-setup.md', 'step-02-context.md', 'step-03-synthesize.md'
    ]);
    const result = await validateWorkflowStepStructure(tmpDir);
    assert.equal(result.passed, false);
    assert.ok(result.error.includes('contextualize-scope'));
    assert.ok(result.error.includes('3'));
    await fs.remove(tmpDir);
  });

  it('fails with 7 step files (above maximum)', async () => {
    const tmpDir = await createStepFixture('contextualize-scope', [
      'step-01-setup.md', 'step-02-context.md', 'step-03-work.md',
      'step-04-work.md', 'step-05-work.md', 'step-06-work.md', 'step-07-synthesize.md'
    ]);
    const result = await validateWorkflowStepStructure(tmpDir);
    assert.equal(result.passed, false);
    assert.ok(result.error.includes('contextualize-scope'));
    assert.ok(result.error.includes('7'));
    await fs.remove(tmpDir);
  });

  it('fails when step-01-setup.md is missing (Wave 3 workflow)', async () => {
    // research-convergence belongs to Mila/Synthesize (Wave 3)
    const tmpDir = await createStepFixture('research-convergence', [
      'step-01-intro.md', 'step-02-context.md', 'step-03-work.md', 'step-04-synthesize.md'
    ]);
    const result = await validateWorkflowStepStructure(tmpDir);
    assert.equal(result.passed, false);
    assert.ok(result.error.includes('step-01-setup.md'));
    await fs.remove(tmpDir);
  });

  it('fails when step-02-context.md is missing (Wave 3 workflow)', async () => {
    // hypothesis-engineering belongs to Liam/Hypothesize (Wave 3)
    const tmpDir = await createStepFixture('hypothesis-engineering', [
      'step-01-setup.md', 'step-02-gather.md', 'step-03-work.md', 'step-04-synthesize.md'
    ]);
    const result = await validateWorkflowStepStructure(tmpDir);
    assert.equal(result.passed, false);
    assert.ok(result.error.includes('step-02-context.md'));
    await fs.remove(tmpDir);
  });

  it('fails when no *-synthesize.md file exists (Wave 3 workflow)', async () => {
    // signal-interpretation belongs to Noah/Sensitize (Wave 3)
    const tmpDir = await createStepFixture('signal-interpretation', [
      'step-01-setup.md', 'step-02-context.md', 'step-03-work.md', 'step-04-wrap.md'
    ]);
    const result = await validateWorkflowStepStructure(tmpDir);
    assert.equal(result.passed, false);
    assert.ok(result.error.includes('synthesize'));
    await fs.remove(tmpDir);
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
