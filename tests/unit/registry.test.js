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

describe('parseTargetVersion', () => {
  it('parses standard migration names', () => {
    assert.equal(registry.parseTargetVersion('1.0.x-to-1.3.0'), '1.3.0');
    assert.equal(registry.parseTargetVersion('1.5.x-to-1.6.0'), '1.6.0');
    assert.equal(registry.parseTargetVersion('1.7.x-to-2.0.0'), '2.0.0');
  });

  it('returns null for unparseable names', () => {
    assert.equal(registry.parseTargetVersion('no-version-here'), null);
    assert.equal(registry.parseTargetVersion(''), null);
  });
});

describe('getMigrationsFor', () => {
  it('returns correct entry point for each starting version', () => {
    assert.equal(registry.getMigrationsFor('1.0.5')[0].name, '1.0.x-to-1.3.0');
    assert.equal(registry.getMigrationsFor('1.1.3')[0].name, '1.1.x-to-1.3.0');
    assert.equal(registry.getMigrationsFor('1.2.0')[0].name, '1.2.x-to-1.3.0');
    assert.equal(registry.getMigrationsFor('1.3.8')[0].name, '1.3.x-to-1.5.0');
    assert.equal(registry.getMigrationsFor('1.4.1')[0].name, '1.4.x-to-1.5.0');
    assert.equal(registry.getMigrationsFor('1.5.2')[0].name, '1.5.x-to-1.6.0');
    assert.equal(registry.getMigrationsFor('1.6.0')[0].name, '1.6.x-to-1.7.0');
    assert.equal(registry.getMigrationsFor('1.7.1')[0].name, '1.7.x-to-2.0.0');
  });

  it('returns empty for unknown future version', () => {
    const migrations = registry.getMigrationsFor('99.0.0');
    assert.equal(migrations.length, 0);
  });

  it('returns empty for current version', () => {
    const migrations = registry.getMigrationsFor('2.3.1');
    assert.equal(migrations.length, 0);
  });
});

describe('getMigrationsFor - chain traversal', () => {
  it('chains from 1.0.5 through all 5 hops', () => {
    const migrations = registry.getMigrationsFor('1.0.5');
    const names = migrations.map(m => m.name);
    assert.deepEqual(names, [
      '1.0.x-to-1.3.0',
      '1.3.x-to-1.5.0',
      '1.5.x-to-1.6.0',
      '1.6.x-to-1.7.0',
      '1.7.x-to-2.0.0'
    ]);
  });

  it('chains from 1.1.3 through all 5 hops', () => {
    const migrations = registry.getMigrationsFor('1.1.3');
    const names = migrations.map(m => m.name);
    assert.deepEqual(names, [
      '1.1.x-to-1.3.0',
      '1.3.x-to-1.5.0',
      '1.5.x-to-1.6.0',
      '1.6.x-to-1.7.0',
      '1.7.x-to-2.0.0'
    ]);
  });

  it('chains from 1.3.7 through 4 hops', () => {
    const migrations = registry.getMigrationsFor('1.3.7');
    const names = migrations.map(m => m.name);
    assert.deepEqual(names, [
      '1.3.x-to-1.5.0',
      '1.5.x-to-1.6.0',
      '1.6.x-to-1.7.0',
      '1.7.x-to-2.0.0'
    ]);
  });

  it('chains from 1.5.2 through 3 hops', () => {
    const migrations = registry.getMigrationsFor('1.5.2');
    const names = migrations.map(m => m.name);
    assert.deepEqual(names, [
      '1.5.x-to-1.6.0',
      '1.6.x-to-1.7.0',
      '1.7.x-to-2.0.0'
    ]);
  });

  it('chains from 1.6.0 through 2 hops', () => {
    const migrations = registry.getMigrationsFor('1.6.0');
    const names = migrations.map(m => m.name);
    assert.deepEqual(names, [
      '1.6.x-to-1.7.0',
      '1.7.x-to-2.0.0'
    ]);
  });

  it('returns single hop from 1.7.1', () => {
    const migrations = registry.getMigrationsFor('1.7.1');
    const names = migrations.map(m => m.name);
    assert.deepEqual(names, ['1.7.x-to-2.0.0']);
  });
});

describe('getMigrationsFor - parallel entry exclusion', () => {
  it('1.1.3 does not include 1.0.x or 1.2.x parallel entries', () => {
    const migrations = registry.getMigrationsFor('1.1.3');
    const names = migrations.map(m => m.name);
    assert.ok(!names.includes('1.0.x-to-1.3.0'), 'should not include 1.0.x-to-1.3.0');
    assert.ok(!names.includes('1.2.x-to-1.3.0'), 'should not include 1.2.x-to-1.3.0');
  });

  it('1.0.5 does not include 1.1.x or 1.2.x parallel entries', () => {
    const migrations = registry.getMigrationsFor('1.0.5');
    const names = migrations.map(m => m.name);
    assert.ok(!names.includes('1.1.x-to-1.3.0'), 'should not include 1.1.x-to-1.3.0');
    assert.ok(!names.includes('1.2.x-to-1.3.0'), 'should not include 1.2.x-to-1.3.0');
  });

  it('1.4.1 does not include 1.3.x parallel entry', () => {
    const migrations = registry.getMigrationsFor('1.4.1');
    const names = migrations.map(m => m.name);
    assert.ok(!names.includes('1.3.x-to-1.5.0'), 'should not include 1.3.x-to-1.5.0');
    assert.equal(names[0], '1.4.x-to-1.5.0');
  });
});

describe('getBreakingChanges', () => {
  it('returns breaking changes for 1.0.x (chain includes 1.0.x and 1.7.x)', () => {
    const changes = registry.getBreakingChanges('1.0.5');
    assert.equal(changes.length, 2);
  });

  it('returns breaking change for 1.1.x (chain reaches 1.7.x-to-2.0.0)', () => {
    const changes = registry.getBreakingChanges('1.1.0');
    assert.equal(changes.length, 1);
    assert.ok(changes[0].includes('Product rename'));
  });

  it('returns breaking change for 1.5.x (chain reaches 1.7.x-to-2.0.0)', () => {
    const changes = registry.getBreakingChanges('1.5.2');
    assert.equal(changes.length, 1);
    assert.ok(changes[0].includes('Product rename'));
  });

  it('returns empty for current version', () => {
    const changes = registry.getBreakingChanges('2.3.1');
    assert.equal(changes.length, 0);
  });
});

describe('getAllMigrations', () => {
  it('returns a copy of all migrations', () => {
    const all = registry.getAllMigrations();
    assert.ok(Array.isArray(all));
    assert.ok(all.length >= 8);
    // Verify it is a copy
    all.push({ name: 'fake' });
    assert.ok(registry.getAllMigrations().length < all.length);
  });
});

describe('hasMigrationBeenApplied', () => {
  let tmpDir;
  let configPath;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'convoke-reg-'));
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
