const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const yaml = require('js-yaml');

const { assessUpdate } = require('../../scripts/update/bmad-update');
const { createValidInstallation } = require('../helpers');

describe('assessUpdate', () => {
  it('returns no-project when projectRoot is null', () => {
    const result = assessUpdate(null);
    assert.equal(result.action, 'no-project');
  });

  it('returns fresh for empty directory', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-assess-'));
    try {
      const result = assessUpdate(tmpDir);
      assert.equal(result.action, 'fresh');
      assert.equal(result.scenario, 'fresh');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('returns broken for partial installation', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-assess-'));
    try {
      // Create _bmad dir with vortex but no config
      await fs.ensureDir(path.join(tmpDir, '_bmad/bme/_vortex'));
      const result = assessUpdate(tmpDir);
      assert.ok(
        result.action === 'broken' || result.action === 'no-version',
        `expected broken or no-version, got ${result.action}`
      );
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('returns up-to-date when versions match', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-assess-'));
    try {
      await createValidInstallation(tmpDir);

      // Set version to match current package
      const pkg = require('../../package.json');
      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      config.version = pkg.version;
      fs.writeFileSync(configPath, yaml.dump(config), 'utf8');

      const result = assessUpdate(tmpDir);
      assert.equal(result.action, 'up-to-date');
      assert.equal(result.currentVersion, pkg.version);
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('returns downgrade when installed > package', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-assess-'));
    try {
      await createValidInstallation(tmpDir);

      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      config.version = '99.99.99';
      fs.writeFileSync(configPath, yaml.dump(config), 'utf8');

      const result = assessUpdate(tmpDir);
      assert.equal(result.action, 'downgrade');
      assert.equal(result.currentVersion, '99.99.99');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('returns upgrade with migrations for v1.4.x', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-assess-'));
    try {
      await createValidInstallation(tmpDir);

      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      config.version = '1.4.1';
      fs.writeFileSync(configPath, yaml.dump(config), 'utf8');

      const result = assessUpdate(tmpDir);
      assert.equal(result.action, 'upgrade');
      assert.equal(result.currentVersion, '1.4.1');
      assert.ok(Array.isArray(result.migrations));
      assert.ok(result.migrations.length >= 1);
      assert.ok(Array.isArray(result.breakingChanges));
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('returns upgrade with breaking changes for v1.0.x', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-assess-'));
    try {
      await createValidInstallation(tmpDir);

      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      config.version = '1.0.5';
      fs.writeFileSync(configPath, yaml.dump(config), 'utf8');

      const result = assessUpdate(tmpDir);
      assert.equal(result.action, 'upgrade');
      assert.ok(result.breakingChanges.length > 0, 'v1.0.x should have breaking changes');
      assert.ok(result.migrations.some(m => m.breaking), 'should include breaking migration');
    } finally {
      await fs.remove(tmpDir);
    }
  });
});
