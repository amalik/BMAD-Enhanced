'use strict';

const { describe, it, before } = require('node:test');
const assert = require('node:assert/strict');

const path = require('path');
const { findProjectRoot } = require('../../scripts/update/lib/utils');
const { readManifest } = require('../../scripts/portability/manifest-csv');

// Story sp-1-2: Classify All Skills
//
// Validates that every skill in skill-manifest.csv has been classified with
// non-empty tier and intent values, and that spot-check classifications match
// the locked policy from sp-1-2's Dev Notes.

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

// Canonical meta-platform skills (AC #7, adjusted during sp-1-2 implementation).
//
// AC #7 originally listed 6 skills including `bmad-agent-bme-team-factory`,
// but that name lives in the AGENT manifest, not the skill manifest. The
// effective meta-platform skill set is 5: init, help, party-mode,
// builder-setup, agent-builder.
const META_PLATFORM_SKILLS = [
  'bmad-init',
  'bmad-help',
  'bmad-party-mode',
  'bmad-builder-setup',
  'bmad-agent-builder',
];

describe('Skill manifest classification (sp-1-2)', () => {
  let header;
  let rows;
  let nameIdx;
  let tierIdx;
  let intentIdx;
  let depsIdx;

  before(() => {
    const projectRoot = findProjectRoot();
    const manifestPath = path.join(projectRoot, '_bmad', '_config', 'skill-manifest.csv');
    const manifest = readManifest(manifestPath);
    header = manifest.header;
    rows = manifest.rows;
    nameIdx = header.indexOf('name');
    tierIdx = header.indexOf('tier');
    intentIdx = header.indexOf('intent');
    depsIdx = header.indexOf('dependencies');
  });

  // Helper: find a row by canonical name
  const findRow = (name) => rows.find((r) => r[nameIdx] === name);

  it('Test 1: every data row has non-empty tier and non-empty intent', () => {
    assert.ok(rows.length > 0);
    const unclassified = [];
    for (const row of rows) {
      const name = row[nameIdx];
      const tier = row[tierIdx];
      const intent = row[intentIdx];
      if (!tier || !intent) {
        unclassified.push({ name, tier, intent });
      }
    }
    if (unclassified.length > 0) {
      console.error('Unclassified skills:', unclassified);
    }
    assert.deepEqual(unclassified, []);
  });

  it('Test 1b: every tier value is canonical, every intent value is canonical', () => {
    for (const row of rows) {
      const name = row[nameIdx];
      const tier = row[tierIdx];
      const intent = row[intentIdx];
      assert.ok(VALID_TIERS.includes(tier));
      assert.ok(VALID_INTENTS.includes(intent));
      // Sanity message on failure
      if (!VALID_TIERS.includes(tier)) {
        throw new Error(`${name}: invalid tier "${tier}"`);
      }
      if (!VALID_INTENTS.includes(intent)) {
        throw new Error(`${name}: invalid intent "${intent}"`);
      }
    }
  });

  it('Test 2: CIS agent skills classified as standalone + think-through-problem', () => {
    const cisSamples = [
      'bmad-brainstorming',
      'bmad-cis-agent-storyteller',
      'bmad-cis-agent-creative-problem-solver',
    ];
    for (const name of cisSamples) {
      const row = findRow(name);
      assert.notStrictEqual(row, undefined);
      // Storyteller has a sidecar memory file → light-deps. Others should be standalone.
      // The point of this spot-check is intent, not tier.
      assert.equal(row[intentIdx], 'think-through-problem');
    }
    // Brainstorming and creative-problem-solver are standalone
    assert.equal(findRow('bmad-brainstorming')[tierIdx], 'standalone');
    assert.equal(findRow('bmad-cis-agent-creative-problem-solver')[tierIdx], 'standalone');
  });

  it('Test 3: at least 3 testarch skills classified with intent=test-your-code', () => {
    const testarchRows = rows.filter((r) => r[nameIdx].startsWith('bmad-testarch-'));
    assert.ok(testarchRows.length >= 3);
    for (const row of testarchRows) {
      assert.equal(row[intentIdx], 'test-your-code');
    }
  });

  it('Test 4: all 5 canonical meta-platform skills are pipeline + meta-platform', () => {
    for (const name of META_PLATFORM_SKILLS) {
      const row = findRow(name);
      assert.notStrictEqual(row, undefined);
      if (!row) continue;
      assert.equal(row[tierIdx], 'pipeline');
      assert.equal(row[intentIdx], 'meta-platform');
    }
  });

  it('Test 5: standalone utilities are NOT classified as meta-platform', () => {
    // Per AC #7, these are explicitly carved out from meta-platform
    const standaloneUtilities = {
      'bmad-distillator': 'write-documentation',
      'bmad-advanced-elicitation': 'think-through-problem',
      'bmad-shard-doc': 'write-documentation',
      'bmad-index-docs': 'write-documentation',
    };
    for (const [name, expectedIntent] of Object.entries(standaloneUtilities)) {
      const row = findRow(name);
      assert.notStrictEqual(row, undefined);
      if (!row) continue;
      assert.equal(row[intentIdx], expectedIntent);
      assert.notStrictEqual(row[intentIdx], 'meta-platform');
      assert.equal(row[tierIdx], 'standalone');
    }
  });

  it('Test 6: persona-only bmad-agent-* skills are standalone with empty deps', () => {
    // Per sp-1-2 Task 3 enumerated table — these are menu wrappers, not pipelines.
    // Their dependencies column should be empty (menu options are not exporter deps).
    const personaAgents = [
      'bmad-agent-analyst',
      'bmad-agent-pm',
      'bmad-agent-architect',
      'bmad-agent-ux-designer',
      'bmad-agent-tech-writer',
      'bmad-agent-sm',
      'bmad-agent-dev',
      'bmad-agent-quick-flow-solo-dev',
      'bmad-agent-qa',
    ];
    for (const name of personaAgents) {
      const row = findRow(name);
      assert.notStrictEqual(row, undefined);
      if (!row) continue;
      assert.equal(row[tierIdx], 'standalone');
      assert.equal(row[depsIdx], '');
    }
  });
});
