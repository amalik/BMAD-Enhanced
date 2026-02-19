const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');

const { compareVersions, countUserDataFiles, findProjectRoot, getPackageVersion } = require('../../scripts/update/lib/utils');

describe('compareVersions', () => {
  it('returns 0 for equal versions', () => {
    assert.equal(compareVersions('1.0.0', '1.0.0'), 0);
  });

  it('returns -1 when v1 < v2 (patch)', () => {
    assert.equal(compareVersions('1.0.0', '1.0.1'), -1);
  });

  it('returns 1 when v1 > v2 (patch)', () => {
    assert.equal(compareVersions('1.0.2', '1.0.1'), 1);
  });

  it('returns -1 when v1 < v2 (minor)', () => {
    assert.equal(compareVersions('1.0.9', '1.1.0'), -1);
  });

  it('returns 1 when v1 > v2 (major)', () => {
    assert.equal(compareVersions('2.0.0', '1.9.9'), 1);
  });

  it('handles versions with different segment counts', () => {
    assert.equal(compareVersions('1.0', '1.0.0'), 0);
    assert.equal(compareVersions('1.0', '1.0.1'), -1);
  });
});

describe('getPackageVersion', () => {
  it('returns a valid semver string', () => {
    const version = getPackageVersion();
    assert.match(version, /^\d+\.\d+\.\d+/);
  });

  it('matches package.json version', () => {
    const pkg = require('../../package.json');
    assert.equal(getPackageVersion(), pkg.version);
  });
});

describe('countUserDataFiles', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-test-'));
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('returns 0 when _bmad-output does not exist', async () => {
    const count = await countUserDataFiles(tmpDir);
    assert.equal(count, 0);
  });

  it('counts files in _bmad-output', async () => {
    const outputDir = path.join(tmpDir, '_bmad-output');
    await fs.ensureDir(path.join(outputDir, 'sub'));
    await fs.writeFile(path.join(outputDir, 'a.md'), 'a');
    await fs.writeFile(path.join(outputDir, 'sub', 'b.md'), 'b');

    const count = await countUserDataFiles(tmpDir);
    assert.equal(count, 2);
  });

  it('excludes .backups and .logs directories', async () => {
    const outputDir = path.join(tmpDir, '_bmad-output');
    await fs.ensureDir(path.join(outputDir, '.backups'));
    await fs.ensureDir(path.join(outputDir, '.logs'));
    await fs.writeFile(path.join(outputDir, '.backups', 'old.md'), 'old');
    await fs.writeFile(path.join(outputDir, '.logs', 'log.txt'), 'log');

    // Should still be 2 from previous test (a.md + sub/b.md)
    const count = await countUserDataFiles(tmpDir);
    assert.equal(count, 2);
  });
});

describe('findProjectRoot', () => {
  it('returns a string when run from within the project', () => {
    const root = findProjectRoot();
    assert.equal(typeof root, 'string');
    // The root should contain _bmad directory
    assert.ok(fs.existsSync(path.join(root, '_bmad')));
  });
});
