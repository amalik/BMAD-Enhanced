const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const { runScript, PACKAGE_ROOT } = require('../helpers');

const doctorScript = path.join(PACKAGE_ROOT, 'scripts/bmad-doctor.js');

function runDoctor(cwd) {
  return runScript(doctorScript, [], { cwd });
}

describe('bmad-doctor: no project root', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-doc-'));
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('fails when no _bmad directory exists', async () => {
    const { exitCode, stdout } = await runDoctor(tmpDir);
    assert.equal(exitCode, 1, 'should exit with code 1');
    assert.ok(stdout.includes('Project root'), 'should report project root check');
  });
});

describe('bmad-doctor: missing config', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-doc-'));
    // Create _bmad but no config
    await fs.ensureDir(path.join(tmpDir, '_bmad'));
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('fails when config.yaml is missing', async () => {
    const { exitCode, stdout } = await runDoctor(tmpDir);
    assert.equal(exitCode, 1, 'should exit with code 1');
    assert.ok(stdout.includes('Config file'), 'should check config');
    assert.ok(stdout.includes('not found') || stdout.includes('MISSING') || stdout.includes('issue'), 'should report config missing');
  });
});

describe('bmad-doctor: invalid config YAML', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-doc-'));
    await fs.ensureDir(path.join(tmpDir, '_bmad/bme/_vortex'));
    // Write invalid YAML
    await fs.writeFile(
      path.join(tmpDir, '_bmad/bme/_vortex/config.yaml'),
      '{ invalid yaml: [[[',
      'utf8'
    );
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('reports YAML parse error', async () => {
    const { exitCode, stdout } = await runDoctor(tmpDir);
    assert.equal(exitCode, 1, 'should exit with code 1');
    assert.ok(stdout.includes('Config file'), 'should check config');
  });
});

describe('bmad-doctor: missing agent files', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-doc-'));
    const vortexDir = path.join(tmpDir, '_bmad/bme/_vortex');
    await fs.ensureDir(path.join(vortexDir, 'agents'));
    // Write valid config but no agent files
    await fs.writeFile(
      path.join(vortexDir, 'config.yaml'),
      'version: "1.5.0"\nagents:\n  - contextualization-expert\n',
      'utf8'
    );
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('reports missing agent files', async () => {
    const { exitCode, stdout } = await runDoctor(tmpDir);
    assert.equal(exitCode, 1, 'should exit with code 1');
    assert.ok(stdout.includes('Agent files'), 'should check agents');
    assert.ok(stdout.includes('Missing') || stdout.includes('issue'), 'should report missing agents');
  });
});

describe('bmad-doctor: empty agent files', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-doc-'));
    const vortexDir = path.join(tmpDir, '_bmad/bme/_vortex');
    const agentsDir = path.join(vortexDir, 'agents');
    await fs.ensureDir(agentsDir);
    await fs.writeFile(
      path.join(vortexDir, 'config.yaml'),
      'version: "1.5.0"\nagents:\n  - contextualization-expert\n',
      'utf8'
    );
    // Create all 7 agent files, but make them empty (0 bytes)
    const { AGENT_FILES } = require('../../scripts/update/lib/agent-registry');
    for (const agent of AGENT_FILES) {
      await fs.writeFile(path.join(agentsDir, agent), '', 'utf8');
    }
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('reports empty agent files', async () => {
    const { exitCode, stdout } = await runDoctor(tmpDir);
    assert.equal(exitCode, 1, 'should exit with code 1');
    assert.ok(stdout.includes('Agent files'), 'should check agents');
    assert.ok(stdout.includes('Empty') || stdout.includes('empty'), 'should report empty agents');
  });
});

describe('bmad-doctor: stale migration lock', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-doc-'));
    const vortexDir = path.join(tmpDir, '_bmad/bme/_vortex');
    await fs.ensureDir(path.join(vortexDir, 'agents'));
    await fs.writeFile(
      path.join(vortexDir, 'config.yaml'),
      'version: "1.5.0"\nagents:\n  - contextualization-expert\n',
      'utf8'
    );
    // Create a stale lock file (10 minutes old)
    const outputDir = path.join(tmpDir, '_bmad-output');
    await fs.ensureDir(outputDir);
    await fs.writeJson(path.join(outputDir, '.migration-lock'), {
      timestamp: Date.now() - 10 * 60 * 1000,
      pid: 99999
    });
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('reports stale migration lock', async () => {
    const { exitCode, stdout } = await runDoctor(tmpDir);
    assert.equal(exitCode, 1, 'should exit with code 1');
    assert.ok(stdout.includes('Migration lock'), 'should check migration lock');
    assert.ok(stdout.includes('Stale') || stdout.includes('stale') || stdout.includes('issue'), 'should report stale lock');
  });
});

describe('bmad-doctor: version mismatch', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-doc-'));
    const vortexDir = path.join(tmpDir, '_bmad/bme/_vortex');
    await fs.ensureDir(path.join(vortexDir, 'agents'));
    await fs.ensureDir(path.join(vortexDir, 'workflows'));
    // Config with old version
    await fs.writeFile(
      path.join(vortexDir, 'config.yaml'),
      'version: "0.0.1"\nagents:\n  - contextualization-expert\n',
      'utf8'
    );
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('reports version inconsistency', async () => {
    const { exitCode, stdout } = await runDoctor(tmpDir);
    assert.equal(exitCode, 1, 'should exit with code 1');
    assert.ok(stdout.includes('Version consistency'), 'should check version consistency');
  });
});

describe('bmad-doctor: corrupt migration lock', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-doc-'));
    const vortexDir = path.join(tmpDir, '_bmad/bme/_vortex');
    await fs.ensureDir(path.join(vortexDir, 'agents'));
    await fs.writeFile(
      path.join(vortexDir, 'config.yaml'),
      'version: "1.5.0"\nagents:\n  - contextualization-expert\n',
      'utf8'
    );
    // Create a corrupt lock file
    const outputDir = path.join(tmpDir, '_bmad-output');
    await fs.ensureDir(outputDir);
    await fs.writeFile(path.join(outputDir, '.migration-lock'), 'not json at all', 'utf8');
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('reports corrupt lock file', async () => {
    const { exitCode, stdout } = await runDoctor(tmpDir);
    assert.equal(exitCode, 1, 'should exit with code 1');
    assert.ok(stdout.includes('Migration lock'), 'should check migration lock');
    assert.ok(stdout.includes('Corrupt') || stdout.includes('corrupt') || stdout.includes('issue'), 'should report corrupt lock');
  });
});
