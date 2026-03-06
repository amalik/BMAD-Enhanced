const { describe, it, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');

const migration = require('../../scripts/update/migrations/1.7.x-to-2.0.0');

describe('1.7.x-to-2.0.0 migration', () => {
  describe('module shape', () => {
    it('exports required fields', () => {
      assert.equal(migration.name, '1.7.x-to-2.0.0');
      assert.equal(migration.fromVersion, '1.7.x');
      assert.equal(migration.breaking, true);
      assert.equal(typeof migration.preview, 'function');
      assert.equal(typeof migration.apply, 'function');
    });
  });

  describe('preview()', () => {
    it('returns action list describing the rename', async () => {
      const result = await migration.preview();
      assert.ok(result.actions);
      assert.ok(Array.isArray(result.actions));
      assert.ok(result.actions.length >= 3, 'should have at least 3 actions');
      const joined = result.actions.join(' ');
      assert.ok(joined.includes('Convoke') || joined.includes('BMAD-Enhanced'), 'should mention product rename');
      assert.ok(joined.includes('convoke-') || joined.includes('CLI'), 'should mention CLI command renames');
      assert.ok(joined.includes('_bmad'), 'should mention _bmad/ directory preservation');
    });
  });

  describe('apply()', () => {
    const tmpDirs = [];

    after(async () => {
      await Promise.all(tmpDirs.map(d => fs.remove(d)));
    });

    it('executes without errors on a valid project root', async () => {
      const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-mig-2.0-'));
      tmpDirs.push(dir);

      const vortexDir = path.join(dir, '_bmad/bme/_vortex');
      await fs.ensureDir(path.join(vortexDir, 'agents'));

      const result = await migration.apply(dir);
      assert.ok(Array.isArray(result), 'apply() should return an array');
      assert.ok(result.length >= 1, 'should return at least one message');
    });

    it('is idempotent — running twice produces same result', async () => {
      const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-mig-2.0-'));
      tmpDirs.push(dir);

      const vortexDir = path.join(dir, '_bmad/bme/_vortex');
      await fs.ensureDir(path.join(vortexDir, 'agents'));

      const result1 = await migration.apply(dir);
      const result2 = await migration.apply(dir);
      assert.deepEqual(result1, result2, 'second apply should produce identical result');
    });
  });
});
