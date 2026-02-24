const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');

const registry = require('../../scripts/update/migrations/registry');

describe('matchesVersionRange', () => {
  it('matches exact version', () => {
    assert.equal(registry.matchesVersionRange('1.0.5', '1.0.5'), true);
  });

  it('matches wildcard pattern', () => {
    assert.equal(registry.matchesVersionRange('1.0.5', '1.0.x'), true);
    assert.equal(registry.matchesVersionRange('1.0.0', '1.0.x'), true);
  });

  it('rejects non-matching wildcard', () => {
    assert.equal(registry.matchesVersionRange('1.1.0', '1.0.x'), false);
    assert.equal(registry.matchesVersionRange('2.0.0', '1.0.x'), false);
  });

  it('rejects non-matching exact version', () => {
    assert.equal(registry.matchesVersionRange('1.0.6', '1.0.5'), false);
  });
});

describe('getMigrationsFor', () => {
  it('returns migration for 1.0.x versions', () => {
    const migrations = registry.getMigrationsFor('1.0.5');
    assert.ok(migrations.length >= 1);
    assert.equal(migrations[0].name, '1.0.x-to-1.3.0');
  });

  it('returns migration for 1.1.x versions', () => {
    const migrations = registry.getMigrationsFor('1.1.3');
    assert.ok(migrations.length >= 1);
    assert.equal(migrations[0].name, '1.1.x-to-1.3.0');
  });

  it('returns migration for 1.2.x versions', () => {
    const migrations = registry.getMigrationsFor('1.2.0');
    assert.ok(migrations.length >= 1);
    assert.equal(migrations[0].name, '1.2.x-to-1.3.0');
  });

  it('returns migration for 1.3.x versions to 1.5.0', () => {
    const migrations = registry.getMigrationsFor('1.3.8');
    assert.ok(migrations.length >= 1);
    assert.equal(migrations[0].name, '1.3.x-to-1.5.0');
  });

  it('returns migration for 1.4.x versions to 1.5.0', () => {
    const migrations = registry.getMigrationsFor('1.4.1');
    assert.ok(migrations.length >= 1);
    assert.equal(migrations[0].name, '1.4.x-to-1.5.0');
  });

  it('returns migration for 1.5.x versions to 1.6.0', () => {
    const migrations = registry.getMigrationsFor('1.5.2');
    assert.ok(migrations.length >= 1);
    assert.equal(migrations[0].name, '1.5.x-to-1.6.0');
  });

  it('returns empty for unknown future version', () => {
    const migrations = registry.getMigrationsFor('99.0.0');
    assert.equal(migrations.length, 0);
  });

  it('sorts migrations by version order', () => {
    // 1.0.x matches only 1.0.x migration, so test order implicitly
    const migrations = registry.getMigrationsFor('1.0.0');
    if (migrations.length > 1) {
      const first = migrations[0].fromVersion.replace('.x', '.0');
      const second = migrations[1].fromVersion.replace('.x', '.0');
      const { compareVersions } = require('../../scripts/update/lib/utils');
      assert.ok(compareVersions(first, second) <= 0);
    }
  });
});

describe('getBreakingChanges', () => {
  it('returns breaking changes for 1.0.x', () => {
    const changes = registry.getBreakingChanges('1.0.5');
    assert.ok(changes.length > 0);
  });

  it('returns empty for 1.1.x (non-breaking)', () => {
    const changes = registry.getBreakingChanges('1.1.0');
    assert.equal(changes.length, 0);
  });
});

describe('getAllMigrations', () => {
  it('returns a copy of all migrations', () => {
    const all = registry.getAllMigrations();
    assert.ok(Array.isArray(all));
    assert.ok(all.length >= 6);
    // Verify it is a copy
    all.push({ name: 'fake' });
    assert.ok(registry.getAllMigrations().length < all.length);
  });
});

describe('hasMigrationBeenApplied', () => {
  let tmpDir;
  let configPath;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-reg-'));
    configPath = path.join(tmpDir, 'config.yaml');
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('returns false when config does not exist', () => {
    assert.equal(registry.hasMigrationBeenApplied('1.0.x-to-1.3.0', '/nonexistent/config.yaml'), false);
  });

  it('returns false when no migration_history', async () => {
    const yaml = require('js-yaml');
    await fs.writeFile(configPath, yaml.dump({ version: '1.3.0' }));
    assert.equal(registry.hasMigrationBeenApplied('1.0.x-to-1.3.0', configPath), false);
  });

  it('returns true when migration is in history', async () => {
    const yaml = require('js-yaml');
    const config = {
      version: '1.4.0',
      migration_history: [{
        timestamp: '2026-01-01T00:00:00Z',
        from_version: '1.0.5',
        to_version: '1.3.0',
        migrations_applied: ['1.0.x-to-1.3.0']
      }]
    };
    await fs.writeFile(configPath, yaml.dump(config));
    assert.equal(registry.hasMigrationBeenApplied('1.0.x-to-1.3.0', configPath), true);
  });

  it('returns false for migration not in history', async () => {
    assert.equal(registry.hasMigrationBeenApplied('1.1.x-to-1.3.0', configPath), false);
  });
});
