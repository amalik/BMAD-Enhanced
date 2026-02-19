const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const yaml = require('js-yaml');

const { refreshInstallation } = require('../../scripts/update/lib/refresh-installation');

describe('Fresh Install (refreshInstallation on empty project)', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-fresh-'));
    // Create minimal project structure
    await fs.ensureDir(path.join(tmpDir, '_bmad'));
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('creates agent files in the correct location', async () => {
    await refreshInstallation(tmpDir, { backupGuides: false, verbose: false });

    const emmaPath = path.join(tmpDir, '_bmad/bme/_vortex/agents/contextualization-expert.md');
    const wadePath = path.join(tmpDir, '_bmad/bme/_vortex/agents/lean-experiments-specialist.md');

    assert.ok(fs.existsSync(emmaPath), 'Emma agent file should exist');
    assert.ok(fs.existsSync(wadePath), 'Wade agent file should exist');
  });

  it('creates config.yaml with correct version', async () => {
    const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
    assert.ok(fs.existsSync(configPath), 'config.yaml should exist');

    const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
    const pkg = require('../../package.json');
    assert.equal(config.version, pkg.version);
  });

  it('populates agents and workflows in config', async () => {
    const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
    const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

    assert.ok(Array.isArray(config.agents), 'agents should be an array');
    assert.ok(config.agents.includes('contextualization-expert'));
    assert.ok(config.agents.includes('lean-experiments-specialist'));

    assert.ok(Array.isArray(config.workflows), 'workflows should be an array');
    assert.ok(config.workflows.length >= 1, 'should have at least 1 workflow');
  });

  it('creates workflow directories if source exists', async () => {
    const workflowsDir = path.join(tmpDir, '_bmad/bme/_vortex/workflows');
    assert.ok(fs.existsSync(workflowsDir), 'workflows directory should exist');
  });

  it('returns a list of changes made', async () => {
    // Run fresh on a new tmp dir to test return value
    const tmpDir2 = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-fresh2-'));
    await fs.ensureDir(path.join(tmpDir2, '_bmad'));

    const changes = await refreshInstallation(tmpDir2, { backupGuides: false, verbose: false });

    assert.ok(Array.isArray(changes));
    assert.ok(changes.length > 0, 'should report at least one change');
    assert.ok(changes.some(c => c.includes('config.yaml')), 'should mention config update');

    await fs.remove(tmpDir2);
  });
});

describe('Fresh Install agent content matches package source', () => {
  let tmpDir;
  const packageRoot = path.join(__dirname, '..', '..');

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-content-'));
    await fs.ensureDir(path.join(tmpDir, '_bmad'));
    await refreshInstallation(tmpDir, { backupGuides: false, verbose: false });
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('installed Emma matches package source', async () => {
    const srcPath = path.join(packageRoot, '_bmad/bme/_vortex/agents/contextualization-expert.md');
    const dstPath = path.join(tmpDir, '_bmad/bme/_vortex/agents/contextualization-expert.md');

    if (fs.existsSync(srcPath)) {
      const src = fs.readFileSync(srcPath, 'utf8');
      const dst = fs.readFileSync(dstPath, 'utf8');
      assert.equal(dst, src, 'Installed Emma should match package source');
    }
  });

  it('installed Wade matches package source', async () => {
    const srcPath = path.join(packageRoot, '_bmad/bme/_vortex/agents/lean-experiments-specialist.md');
    const dstPath = path.join(tmpDir, '_bmad/bme/_vortex/agents/lean-experiments-specialist.md');

    if (fs.existsSync(srcPath)) {
      const src = fs.readFileSync(srcPath, 'utf8');
      const dst = fs.readFileSync(dstPath, 'utf8');
      assert.equal(dst, src, 'Installed Wade should match package source');
    }
  });
});
