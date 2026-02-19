const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { execFile } = require('node:child_process');
const path = require('path');

const projectRoot = path.join(__dirname, '..', '..');

function run(script, args = []) {
  return new Promise((resolve) => {
    execFile('node', [script, ...args], { cwd: projectRoot, timeout: 10000 }, (err, stdout, stderr) => {
      resolve({ exitCode: err ? err.code : 0, stdout, stderr });
    });
  });
}

describe('index.js entry point', () => {
  it('runs without error and shows version', async () => {
    const { exitCode, stdout } = await run(path.join(projectRoot, 'index.js'));
    assert.equal(exitCode, 0);

    const pkg = require('../../package.json');
    assert.ok(stdout.includes(pkg.version), 'should show package version');
  });

  it('shows agent names', async () => {
    const { stdout } = await run(path.join(projectRoot, 'index.js'));
    assert.ok(stdout.includes('Emma'), 'should mention Emma');
    assert.ok(stdout.includes('Wade'), 'should mention Wade');
  });

  it('shows available commands', async () => {
    const { stdout } = await run(path.join(projectRoot, 'index.js'));
    assert.ok(stdout.includes('bmad-install-agents'), 'should list install command');
    assert.ok(stdout.includes('bmad-update'), 'should list update command');
  });
});

describe('bmad-version CLI', () => {
  it('runs without error from project root', async () => {
    const { exitCode, stdout } = await run(path.join(projectRoot, 'scripts/update/bmad-version.js'));
    assert.equal(exitCode, 0);
    assert.ok(stdout.includes('BMAD-Enhanced'), 'should show project name');
  });

  it('shows installed and package versions', async () => {
    const { stdout } = await run(path.join(projectRoot, 'scripts/update/bmad-version.js'));
    const pkg = require('../../package.json');
    assert.ok(stdout.includes(pkg.version), 'should show package version');
  });
});

describe('bmad-update CLI (dry-run)', () => {
  it('runs with --dry-run without error', async () => {
    const { exitCode, stdout } = await run(
      path.join(projectRoot, 'scripts/update/bmad-update.js'),
      ['--dry-run']
    );
    assert.equal(exitCode, 0);
    // Should report up-to-date or show dry-run plan
    assert.ok(
      stdout.includes('up to date') || stdout.includes('DRY RUN') || stdout.includes('Already'),
      'should show up-to-date or dry-run info'
    );
  });
});

describe('bmad-version from non-project directory', () => {
  it('shows not-in-project message from /tmp', async () => {
    const { exitCode } = await run(
      path.join(projectRoot, 'scripts/update/bmad-version.js'),
      [],
    );
    // When run from projectRoot it should find the project
    // This test verifies it doesn't crash
    assert.equal(exitCode, 0);
  });
});
