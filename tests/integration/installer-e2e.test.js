const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const yaml = require('js-yaml');
const { runScript, PACKAGE_ROOT } = require('../helpers');

const installerScript = path.join(PACKAGE_ROOT, 'scripts/install-vortex-agents.js');

function runInstaller(cwd) {
  return runScript(installerScript, [], { cwd });
}

describe('install-vortex-agents CLI E2E', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-e2e-'));
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('completes without error on a fresh directory', async () => {
    const { exitCode, stdout } = await runInstaller(tmpDir);
    assert.equal(exitCode, 0, 'installer should exit cleanly');
    assert.ok(stdout.includes('Vortex Installer'), 'should show banner');
    assert.ok(stdout.includes('All Vortex Agents Installed'), 'should show success message');
  });

  it('creates all 4 agent files', async () => {
    const agents = [
      'contextualization-expert.md',
      'lean-experiments-specialist.md',
      'discovery-empathy-expert.md',
      'learning-decision-expert.md'
    ];
    for (const agent of agents) {
      const agentPath = path.join(tmpDir, '_bmad/bme/_vortex/agents', agent);
      assert.ok(fs.existsSync(agentPath), `${agent} should exist`);
      const stat = fs.statSync(agentPath);
      assert.ok(stat.size > 0, `${agent} should be non-empty`);
    }
  });

  it('creates config.yaml with correct version', async () => {
    const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
    assert.ok(fs.existsSync(configPath), 'config.yaml should exist');

    const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
    const pkg = require('../../package.json');
    assert.equal(config.version, pkg.version);
  });

  it('creates agent-manifest.csv', async () => {
    const manifestPath = path.join(tmpDir, '_bmad/_config/agent-manifest.csv');
    assert.ok(fs.existsSync(manifestPath), 'agent-manifest.csv should exist');

    const content = fs.readFileSync(manifestPath, 'utf8');
    assert.ok(content.includes('contextualization-expert'), 'manifest should list Emma');
    assert.ok(content.includes('discovery-empathy-expert'), 'manifest should list Isla');
    assert.ok(content.includes('learning-decision-expert'), 'manifest should list Max');
    assert.ok(content.includes('lean-experiments-specialist'), 'manifest should list Wade');
  });

  it('creates output directory', async () => {
    const outputDir = path.join(tmpDir, '_bmad-output/vortex-artifacts');
    assert.ok(fs.existsSync(outputDir), 'output directory should exist');
  });

  it('creates workflow directories', async () => {
    const workflowsDir = path.join(tmpDir, '_bmad/bme/_vortex/workflows');
    assert.ok(fs.existsSync(workflowsDir), 'workflows directory should exist');

    // Spot-check a few key workflows
    const expected = ['lean-persona', 'empathy-map', 'learning-card', 'mvp'];
    for (const wf of expected) {
      assert.ok(
        fs.existsSync(path.join(workflowsDir, wf)),
        `${wf} workflow directory should exist`
      );
    }
  });

  it('is idempotent (re-run succeeds)', async () => {
    const { exitCode } = await runInstaller(tmpDir);
    assert.equal(exitCode, 0, 'second run should also succeed');
  });
});
