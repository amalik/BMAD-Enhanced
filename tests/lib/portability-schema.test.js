'use strict';

const { describe, it, before } = require('node:test');
const assert = require('node:assert/strict');

const fs = require('fs');
const path = require('path');
const { findProjectRoot } = require('../../scripts/update/lib/utils');
const { parseCsvRow, countCsvColumns } = require('../../scripts/portability/manifest-csv');

// Story sp-1-1: Define Portability Schema
//
// Validates the portability schema columns added to skill-manifest.csv.
// This story does NOT classify skills — Story 1.2 will do that. These tests
// only assert that the columns exist and that any non-empty values use the
// canonical vocabulary.

const VALID_TIERS = ['standalone', 'light-deps', 'pipeline'];
const VALID_INTENTS = [
  'think-through-problem',
  'define-what-to-build',
  'review-something',
  'write-documentation',
  'plan-your-work',
  'test-your-code',
  'discover-product-fit',
  'assess-readiness',
  'meta-platform',
];
const EXPECTED_HEADER_COLUMNS = [
  'canonicalId',
  'name',
  'description',
  'module',
  'path',
  'install_to_bmad',
  'tier',
  'intent',
  'dependencies',
];

// parseCsvRow and countCsvColumns are now imported from
// scripts/portability/manifest-csv.js (extracted in sp-1-2 Task 8).

describe('Skill manifest portability schema', () => {
  let lines;
  let header;
  let dataRows;

  before(() => {
    const projectRoot = findProjectRoot();
    const manifestPath = path.join(projectRoot, '_bmad', '_config', 'skill-manifest.csv');
    let content = fs.readFileSync(manifestPath, 'utf8');
    // Strip UTF-8 BOM if present (Excel round-trip protection)
    if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);
    // Split on \n and ignore lines that are blank or whitespace-only (handles
    // CRLF, CR-only legacy files, and accidental whitespace rows)
    lines = content.split('\n').filter((l) => /\S/.test(l));
    header = lines[0];
    dataRows = lines.slice(1);
  });

  it('Test 1: header contains tier, intent, and dependencies columns in correct order', () => {
    const headerCols = parseCsvRow(header);
    assert.deepEqual(headerCols, EXPECTED_HEADER_COLUMNS);
  });

  it('Test 2: every data row has exactly 9 columns (CSV-aware count)', () => {
    assert.ok(dataRows.length > 0);
    for (const row of dataRows) {
      const cols = countCsvColumns(row);
      assert.equal(cols, 9);
    }
  });

  it('Test 3: any non-empty tier value is one of the canonical tiers', () => {
    const headerCols = parseCsvRow(header);
    const tierIndex = headerCols.indexOf('tier');
    assert.ok(tierIndex >= 0);

    for (const row of dataRows) {
      const fields = parseCsvRow(row);
      const tier = fields[tierIndex];
      if (tier && tier.length > 0) {
        assert.ok(VALID_TIERS.includes(tier));
      }
    }
  });

  it('Test 4: any non-empty intent value is one of the 9 canonical categories', () => {
    const headerCols = parseCsvRow(header);
    const intentIndex = headerCols.indexOf('intent');
    assert.ok(intentIndex >= 0);

    for (const row of dataRows) {
      const fields = parseCsvRow(row);
      const intent = fields[intentIndex];
      if (intent && intent.length > 0) {
        assert.ok(VALID_INTENTS.includes(intent));
      }
    }
  });

  it('Schema doc exists at _bmad/_config/portability-schema.md', () => {
    const projectRoot = findProjectRoot();
    const schemaPath = path.join(projectRoot, '_bmad', '_config', 'portability-schema.md');
    assert.equal(fs.existsSync(schemaPath), true);
    const content = fs.readFileSync(schemaPath, 'utf8');
    // Spot-check that the doc covers the required sections
    assert.match(content, /## Tier/);
    assert.match(content, /## Intent/);
    assert.match(content, /## Dependencies/);
    assert.match(content, /## Examples/);
    // Verify all 9 intent categories appear in the doc
    for (const intent of VALID_INTENTS) {
      assert.ok(content.includes(intent));
    }
    // Verify all 3 tiers appear
    for (const tier of VALID_TIERS) {
      assert.ok(content.includes(tier));
    }
  });
});
