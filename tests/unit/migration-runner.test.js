const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');

const { executeMigration, previewMigrations, MigrationError } = require('../../scripts/update/lib/migration-runner');

describe('MigrationError', () => {
  it('wraps original error with migration name', () => {
    const original = new Error('file not found');
    const err = new MigrationError('1.0.x-to-1.3.0', original);

    assert.equal(err.name, 'MigrationError');
    assert.ok(err.message.includes('1.0.x-to-1.3.0'));
    assert.ok(err.message.includes('file not found'));
    assert.equal(err.migrationName, '1.0.x-to-1.3.0');
    assert.equal(err.originalError, original);
  });

  it('is an instance of Error', () => {
    const err = new MigrationError('test', new Error('x'));
    assert.ok(err instanceof Error);
  });
});

describe('executeMigration', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-exec-'));
  });

  after(async () => {
    await fs.remove(tmpDir);
  });

  it('calls apply and returns changes', async () => {
    const fakeMigration = {
      name: 'test-migration',
      module: {
        async apply(_projectRoot) {
          return ['change 1', 'change 2'];
        }
      }
    };

    const changes = await executeMigration(fakeMigration, tmpDir);
    assert.deepEqual(changes, ['change 1', 'change 2']);
  });

  it('throws when migration has no apply function', async () => {
    const badMigration = {
      name: 'bad-migration',
      module: {}
    };

    await assert.rejects(
      () => executeMigration(badMigration, tmpDir),
      /has no apply function/
    );
  });

  it('throws when migration module is null', async () => {
    const nullMigration = {
      name: 'null-migration',
      module: null
    };

    await assert.rejects(
      () => executeMigration(nullMigration, tmpDir),
      /has no apply function/
    );
  });

  it('propagates errors from apply', async () => {
    const failMigration = {
      name: 'fail-migration',
      module: {
        async apply() {
          throw new Error('disk full');
        }
      }
    };

    await assert.rejects(
      () => executeMigration(failMigration, tmpDir),
      /disk full/
    );
  });

  it('logs changes in verbose mode', async () => {
    const fakeMigration = {
      name: 'verbose-test',
      module: {
        async apply() {
          return ['did something'];
        }
      }
    };

    // Should not throw with verbose=true
    const changes = await executeMigration(fakeMigration, tmpDir, { verbose: true });
    assert.deepEqual(changes, ['did something']);
  });
});

describe('previewMigrations', () => {
  it('returns dryRun result with previews', async () => {
    const migrations = [
      {
        name: 'test-migration',
        description: 'Test description',
        module: {
          async preview() {
            return { actions: ['action 1', 'action 2'] };
          }
        }
      }
    ];

    const result = await previewMigrations(migrations);
    assert.equal(result.success, true);
    assert.equal(result.dryRun, true);
    assert.equal(result.previews.length, 1);
    assert.equal(result.previews[0].name, 'test-migration');
    assert.deepEqual(result.previews[0].preview.actions, ['action 1', 'action 2']);
  });

  it('handles migrations without preview', async () => {
    const migrations = [
      {
        name: 'no-preview',
        description: 'No preview available',
        module: {}
      }
    ];

    const result = await previewMigrations(migrations);
    assert.equal(result.success, true);
    assert.equal(result.previews.length, 0);
  });

  it('handles multiple migrations', async () => {
    const migrations = [
      {
        name: 'first',
        description: 'First',
        module: { async preview() { return { actions: ['a'] }; } }
      },
      {
        name: 'second',
        description: 'Second',
        module: { async preview() { return { actions: ['b'] }; } }
      }
    ];

    const result = await previewMigrations(migrations);
    assert.equal(result.previews.length, 2);
  });
});
