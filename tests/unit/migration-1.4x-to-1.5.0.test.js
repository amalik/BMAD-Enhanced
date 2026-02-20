const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const os = require('os');
const fs = require('fs-extra');

describe('Migration 1.3.x-to-1.5.0', () => {
  const migration = require('../../scripts/update/migrations/1.3.x-to-1.5.0');

  it('has correct metadata', () => {
    assert.equal(migration.name, '1.3.x-to-1.5.0');
    assert.equal(migration.fromVersion, '1.3.x');
    assert.equal(migration.breaking, false);
  });

  it('preview lists Wave 2 additions', async () => {
    const result = await migration.preview();
    assert.ok(Array.isArray(result.actions));
    assert.ok(result.actions.some(a => a.includes('Isla')));
    assert.ok(result.actions.some(a => a.includes('Max')));
  });

  it('apply is a no-op delta', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-mig-'));
    const result = await migration.apply(tmpDir);
    assert.ok(Array.isArray(result));
    assert.ok(result[0].includes('No version-specific delta'));
    await fs.remove(tmpDir);
  });
});

describe('Migration 1.4.x-to-1.5.0', () => {
  const migration = require('../../scripts/update/migrations/1.4.x-to-1.5.0');

  it('has correct metadata', () => {
    assert.equal(migration.name, '1.4.x-to-1.5.0');
    assert.equal(migration.fromVersion, '1.4.x');
    assert.equal(migration.breaking, false);
  });

  it('preview lists Wave 2 additions', async () => {
    const result = await migration.preview();
    assert.ok(Array.isArray(result.actions));
    assert.ok(result.actions.some(a => a.includes('Isla')));
    assert.ok(result.actions.some(a => a.includes('Max')));
    assert.ok(result.actions.some(a => a.includes('empathy-map')));
    assert.ok(result.actions.some(a => a.includes('vortex-navigation')));
  });

  it('apply is a no-op delta', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-mig2-'));
    const result = await migration.apply(tmpDir);
    assert.ok(Array.isArray(result));
    assert.ok(result[0].includes('No version-specific delta'));
    await fs.remove(tmpDir);
  });
});
