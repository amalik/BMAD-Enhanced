'use strict';

const { describe, it, before, after, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');

const fs = require('fs');
const path = require('path');
const os = require('os');

const { readChangelogEntries, DEFAULT_CHANGELOG_PATH } = require('../../scripts/update/lib/changelog-reader');

describe('readChangelogEntries', () => {
  let tmpDir;
  let changelogPath;

  before(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'convoke-changelog-'));
    changelogPath = path.join(tmpDir, 'CHANGELOG.md');
  });

  after(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  beforeEach(() => {
    fs.writeFileSync(changelogPath, '', 'utf8');
  });

  it('returns entries strictly above fromVersion and up to toVersion, newest-first', () => {
    fs.writeFileSync(
      changelogPath,
      [
        '# Changelog',
        '',
        '## [3.2.0] - 2026-04-11',
        '',
        '### Added',
        '- portability',
        '',
        '## [3.1.0] - 2026-04-06',
        '',
        '### Added',
        '- governance',
        '',
        '## [3.0.0] - 2026-03-01',
        '',
        '### Changed',
        '- rename',
        '',
      ].join('\n'),
      'utf8'
    );

    const entries = readChangelogEntries('3.0.0', '3.2.0', changelogPath);

    assert.equal(entries.length, 2);
    assert.equal(entries[0].version, '3.2.0');
    assert.equal(entries[0].date, '2026-04-11');
    assert.ok(entries[0].body.includes('- portability'));
    assert.equal(entries[1].version, '3.1.0');
    assert.ok(entries[1].body.includes('- governance'));
  });

  it('excludes the fromVersion entry (already installed) and includes the toVersion entry', () => {
    fs.writeFileSync(
      changelogPath,
      [
        '## [2.0.0] - 2026-01-01',
        '- two',
        '',
        '## [1.0.0] - 2025-12-01',
        '- one',
      ].join('\n'),
      'utf8'
    );

    const entries = readChangelogEntries('1.0.0', '2.0.0', changelogPath);
    assert.equal(entries.length, 1);
    assert.equal(entries[0].version, '2.0.0');
  });

  it('returns empty array when fromVersion equals toVersion (already current)', () => {
    fs.writeFileSync(changelogPath, '## [3.2.0] - 2026-04-11\n- stuff\n', 'utf8');
    assert.deepEqual(readChangelogEntries('3.2.0', '3.2.0', changelogPath), []);
  });

  it('treats null fromVersion as "include everything up to toVersion"', () => {
    fs.writeFileSync(
      changelogPath,
      [
        '## [2.0.0] - 2026-01-01',
        '- two',
        '',
        '## [1.0.0] - 2025-12-01',
        '- one',
      ].join('\n'),
      'utf8'
    );

    const entries = readChangelogEntries(null, '2.0.0', changelogPath);
    assert.equal(entries.length, 2);
    assert.equal(entries[0].version, '2.0.0');
    assert.equal(entries[1].version, '1.0.0');
  });

  it('returns empty array when file does not exist', () => {
    const missingPath = path.join(tmpDir, 'does-not-exist.md');
    assert.deepEqual(readChangelogEntries('1.0.0', '2.0.0', missingPath), []);
  });

  it('returns empty array when toVersion is falsy', () => {
    fs.writeFileSync(changelogPath, '## [1.0.0] - 2025-12-01\n- one\n', 'utf8');
    assert.deepEqual(readChangelogEntries('0.9.0', '', changelogPath), []);
    assert.deepEqual(readChangelogEntries('0.9.0', null, changelogPath), []);
  });

  it('ignores malformed or non-version headers and "Unreleased" sections', () => {
    fs.writeFileSync(
      changelogPath,
      [
        '## [Unreleased]',
        '- wip',
        '',
        '## Not a version header',
        '- garbage',
        '',
        '## [1.0.0] - 2025-12-01',
        '- real',
      ].join('\n'),
      'utf8'
    );

    const entries = readChangelogEntries(null, '1.0.0', changelogPath);
    assert.equal(entries.length, 1);
    assert.equal(entries[0].version, '1.0.0');
    assert.ok(entries[0].body.includes('- real'));
  });

  it('accepts version headers without a date', () => {
    fs.writeFileSync(changelogPath, '## [1.2.3]\n- undated\n', 'utf8');
    const entries = readChangelogEntries(null, '1.2.3', changelogPath);
    assert.equal(entries.length, 1);
    assert.equal(entries[0].version, '1.2.3');
    assert.equal(entries[0].date, null);
    assert.ok(entries[0].body.includes('- undated'));
  });

  it('excludes horizontal-rule separators from body content', () => {
    fs.writeFileSync(
      changelogPath,
      [
        '## [1.1.0] - 2025-12-10',
        '',
        '### Added',
        '- a thing',
        '',
        '---',
        '',
        '## [1.0.0] - 2025-12-01',
        '',
        '### Added',
        '- initial',
      ].join('\n'),
      'utf8'
    );

    const entries = readChangelogEntries('1.0.0', '1.1.0', changelogPath);
    assert.equal(entries.length, 1);
    assert.equal(entries[0].version, '1.1.0');
    assert.ok(!entries[0].body.includes('---'));
  });

  it('uses the packaged CHANGELOG.md by default and can parse the real file', () => {
    assert.ok(fs.existsSync(DEFAULT_CHANGELOG_PATH), 'packaged CHANGELOG.md should exist');
    const entries = readChangelogEntries(null, '99.99.99');
    assert.ok(entries.length > 0, 'real CHANGELOG should yield at least one entry');
    for (const e of entries) {
      assert.match(e.version, /^\d+\.\d+\.\d+(?:[-+][\w.-]+)?$/);
    }
  });

  it('includes pre-release version headers without body leakage', () => {
    fs.writeFileSync(
      changelogPath,
      [
        '## [1.1.0] - 2026-02-16',
        '',
        '### Added',
        '- stable feature',
        '',
        '## [1.0.4-alpha] - 2026-02-16',
        '',
        '### Added',
        '- alpha feature',
        '',
        '## [1.0.3-alpha] - 2026-02-15',
        '',
        '- another alpha',
      ].join('\n'),
      'utf8'
    );

    const entries = readChangelogEntries(null, '1.1.0', changelogPath);
    const versions = entries.map((e) => e.version);
    assert.deepEqual(versions, ['1.1.0', '1.0.4-alpha', '1.0.3-alpha']);
    const stable = entries.find((e) => e.version === '1.1.0');
    assert.ok(stable.body.includes('- stable feature'));
    assert.ok(!stable.body.includes('- alpha feature'), 'pre-release body must not leak into stable entry');
    assert.ok(!stable.body.includes('- another alpha'));
  });

  it('does not parse version headers inside fenced code blocks', () => {
    fs.writeFileSync(
      changelogPath,
      [
        '## [2.0.0] - 2026-03-01',
        '',
        '### Changed',
        '- bumped from the previous format',
        '',
        'Example of the old format:',
        '',
        '```markdown',
        '## [1.0.0] - 2025-01-01',
        '- ancient',
        '```',
        '',
        'End of example.',
      ].join('\n'),
      'utf8'
    );

    const entries = readChangelogEntries(null, '2.0.0', changelogPath);
    assert.equal(entries.length, 1, 'fenced header must not create a second entry');
    assert.equal(entries[0].version, '2.0.0');
    assert.ok(entries[0].body.includes('## [1.0.0] - 2025-01-01'), 'fenced header preserved in body');
    assert.ok(entries[0].body.includes('End of example.'));
  });

  it('drops non-semver labels like Unreleased and TBD while preserving surrounding flow', () => {
    fs.writeFileSync(
      changelogPath,
      [
        '## [Unreleased]',
        '- wip',
        '',
        '## [1.1.0] - 2026-02-16',
        '- real',
        '',
        '## [TBD] - soon',
        '- placeholder',
        '',
        '## [1.0.0] - 2025-12-01',
        '- also real',
      ].join('\n'),
      'utf8'
    );

    const entries = readChangelogEntries(null, '1.1.0', changelogPath);
    const versions = entries.map((e) => e.version);
    assert.deepEqual(versions, ['1.1.0', '1.0.0']);
    const onezero = entries.find((e) => e.version === '1.0.0');
    assert.ok(!onezero.body.includes('- placeholder'), 'TBD body must not leak into 1.0.0');
  });
});

describe('printChangelog (convoke-update integration)', () => {
  let originalLog;
  let captured;
  let printChangelog;

  before(() => {
    printChangelog = require('../../scripts/update/convoke-update').printChangelog;
  });

  beforeEach(() => {
    captured = [];
    originalLog = console.log;
    console.log = (...args) => {
      captured.push(args.join(' '));
    };
  });

  afterEach(() => {
    console.log = originalLog;
  });

  it('is silent when no entries fall within the requested range', () => {
    printChangelog('3.2.0', '3.2.0');
    assert.equal(captured.length, 0);
  });

  it('does not throw when rendering against the real packaged CHANGELOG', () => {
    assert.doesNotThrow(() => printChangelog(null, '99.99.99'));
    assert.ok(captured.length > 0, 'real CHANGELOG should produce visible output');
    assert.ok(captured.some((l) => l.includes("What's New")));
  });
});
