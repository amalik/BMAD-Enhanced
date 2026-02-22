const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const yaml = require('js-yaml');
const { runScript, PACKAGE_ROOT } = require('../helpers');

const postinstallScript = path.join(PACKAGE_ROOT, 'scripts/postinstall.js');

describe('postinstall smoke test', () => {
  it('runs without error from project root', async () => {
    const { exitCode, stderr } = await runScript(postinstallScript);
    assert.equal(exitCode, 0, `postinstall should exit 0, stderr: ${stderr}`);
  });

  it('shows output when run from project root', async () => {
    const { stdout } = await runScript(postinstallScript);
    assert.ok(stdout.includes('BMAD-Enhanced'), 'should show project name');
  });
});

describe('postinstall: fresh project (no _bmad)', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-post-fresh-'));
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('does not crash on fresh project', async () => {
    const { exitCode } = await runScript(postinstallScript, [], { cwd: tmpDir });
    assert.equal(exitCode, 0, 'postinstall should not crash on fresh project');
  });

  it('suggests install command on fresh project', async () => {
    const { stdout } = await runScript(postinstallScript, [], { cwd: tmpDir });
    assert.ok(
      stdout.includes('bmad-install-agents') || stdout.includes('install'),
      'should suggest install command'
    );
  });
});

describe('postinstall: up-to-date installation', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-post-current-'));
    const vortexDir = path.join(tmpDir, '_bmad/bme/_vortex');
    await fs.ensureDir(path.join(vortexDir, 'agents'));

    const pkg = require('../../package.json');
    await fs.writeFile(path.join(vortexDir, 'config.yaml'), yaml.dump({
      version: pkg.version,
      submodule_name: '_vortex',
      description: 'test',
      module: 'bme',
      output_folder: '_bmad-output',
      agents: ['contextualization-expert'],
      workflows: []
    }));
    await fs.writeFile(path.join(vortexDir, 'agents/contextualization-expert.md'), '# Emma');
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('reports up to date when versions match', async () => {
    const { exitCode, stdout } = await runScript(postinstallScript, [], { cwd: tmpDir });
    assert.equal(exitCode, 0);
    assert.ok(stdout.includes('up to date'), 'should indicate up-to-date status');
  });
});

describe('postinstall: older installation detected', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-post-old-'));
    const vortexDir = path.join(tmpDir, '_bmad/bme/_vortex');
    await fs.ensureDir(path.join(vortexDir, 'agents'));

    await fs.writeFile(path.join(vortexDir, 'config.yaml'), yaml.dump({
      version: '1.0.5',
      submodule_name: '_vortex',
      description: 'test',
      module: 'bme',
      output_folder: '_bmad-output',
      agents: ['contextualization-expert'],
      workflows: []
    }));
    await fs.writeFile(path.join(vortexDir, 'agents/contextualization-expert.md'), '# Emma');
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('detects upgrade and suggests bmad-update', async () => {
    const { exitCode, stdout } = await runScript(postinstallScript, [], { cwd: tmpDir });
    assert.equal(exitCode, 0);
    assert.ok(stdout.includes('UPGRADE') || stdout.includes('upgrade'), 'should detect upgrade');
    assert.ok(stdout.includes('bmad-update'), 'should suggest bmad-update');
  });
});
