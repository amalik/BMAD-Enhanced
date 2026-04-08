'use strict';

const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');

const { mockExecFileSync } = require('../mock-cp');

const { applyFrontmatterRule } = require('../../scripts/lib/portfolio/rules/frontmatter-rule');
const {
  applyArtifactChainRule,
  isEpicDone,
  detectHCChain,
  collectPhaseEvidence,
} = require('../../scripts/lib/portfolio/rules/artifact-chain-rule');
const {
  applyConflictResolver,
  deriveNextAction,
  comparePhasePriority,
} = require('../../scripts/lib/portfolio/rules/conflict-resolver');

// Helper: create empty InitiativeState
function makeState(initiative = 'test') {
  return {
    initiative,
    phase: { value: null, source: null, confidence: null },
    status: { value: null, source: null, confidence: null },
    lastArtifact: { file: null, date: null },
    nextAction: { value: null, source: null },
  };
}

// --- frontmatter-rule tests ---

describe('frontmatter-rule', () => {
  it('reads explicit status from frontmatter', () => {
    const state = makeState();
    const artifacts = [{ filename: 'gyre-prd.md', frontmatter: { status: 'validated' } }];
    const result = applyFrontmatterRule(state, artifacts);
    assert.equal(result.status.value, 'validated');
    assert.equal(result.status.source, 'frontmatter');
    assert.equal(result.status.confidence, 'explicit');
  });

  it('reads explicit phase from frontmatter (operator override)', () => {
    const state = makeState();
    const artifacts = [{ filename: 'gyre-prd.md', frontmatter: { phase: 'build' } }];
    const result = applyFrontmatterRule(state, artifacts);
    assert.equal(result.phase.value, 'build');
    assert.equal(result.phase.confidence, 'explicit');
  });

  it('no frontmatter status -> state unchanged', () => {
    const state = makeState();
    const artifacts = [{ filename: 'gyre-prd.md', frontmatter: { initiative: 'gyre' } }];
    const result = applyFrontmatterRule(state, artifacts);
    assert.equal(result.status.value, null);
    assert.equal(result.phase.value, null);
  });

  it('no frontmatter at all -> state unchanged', () => {
    const state = makeState();
    const artifacts = [{ filename: 'gyre-prd.md' }];
    const result = applyFrontmatterRule(state, artifacts);
    assert.equal(result.status.value, null);
  });

  it('first explicit value wins (most recent first)', () => {
    const state = makeState();
    const artifacts = [
      { filename: 'a.md', frontmatter: { status: 'validated' } },
      { filename: 'b.md', frontmatter: { status: 'draft' } },
    ];
    const result = applyFrontmatterRule(state, artifacts);
    assert.equal(result.status.value, 'validated');
  });

  it('empty-string status treated as absent (not explicit)', () => {
    const state = makeState();
    const artifacts = [{ filename: 'a.md', frontmatter: { status: '' } }];
    const result = applyFrontmatterRule(state, artifacts);
    assert.equal(result.status.value, null);
  });

  it('empty-string phase treated as absent', () => {
    const state = makeState();
    const artifacts = [{ filename: 'a.md', frontmatter: { phase: '' } }];
    const result = applyFrontmatterRule(state, artifacts);
    assert.equal(result.phase.value, null);
  });

  it('does not override existing explicit status', () => {
    const state = makeState();
    state.status = { value: 'active', source: 'frontmatter', confidence: 'explicit' };
    const artifacts = [{ filename: 'a.md', frontmatter: { status: 'draft' } }];
    const result = applyFrontmatterRule(state, artifacts);
    assert.equal(result.status.value, 'active');
  });
});

// --- artifact-chain-rule tests ---

describe('artifact-chain-rule', () => {
  it('epic with status-context done -> phase: complete', () => {
    const state = makeState();
    const artifacts = [
      { filename: 'gyre-epic.md', type: 'epic', content: 'epic-1: done\nepic-2: done' },
    ];
    const result = applyArtifactChainRule(state, artifacts);
    assert.equal(result.phase.value, 'complete');
    assert.equal(result.phase.source, 'artifact-chain');
  });

  it('epic with ✅ marker -> phase: complete', () => {
    const state = makeState();
    const artifacts = [
      { filename: 'gyre-epic.md', type: 'epic', content: '## Status: ✅ All stories delivered' },
    ];
    const result = applyArtifactChainRule(state, artifacts);
    assert.equal(result.phase.value, 'complete');
  });

  it('epic with [x] marker -> phase: complete', () => {
    const state = makeState();
    const artifacts = [
      { filename: 'gyre-epic.md', type: 'epic', content: '- [x] All stories' },
    ];
    const result = applyArtifactChainRule(state, artifacts);
    assert.equal(result.phase.value, 'complete');
  });

  it('epic with strikethrough -> phase: complete', () => {
    const state = makeState();
    const artifacts = [
      { filename: 'gyre-epic.md', type: 'epic', content: '~~This epic is finished~~' },
    ];
    const result = applyArtifactChainRule(state, artifacts);
    assert.equal(result.phase.value, 'complete');
  });

  it('epic with bold done marker -> phase: complete', () => {
    const state = makeState();
    const artifacts = [
      { filename: 'gyre-epic.md', type: 'epic', content: '**Status:** ** done**' },
    ];
    const result = applyArtifactChainRule(state, artifacts);
    assert.equal(result.phase.value, 'complete');
  });

  it('epic mentioning "done" in narrative context -> NOT complete (no false positive)', () => {
    const state = makeState();
    const artifacts = [
      { filename: 'gyre-epic.md', type: 'epic', content: 'We are not done yet. Story 1 is in progress.' },
    ];
    const result = applyArtifactChainRule(state, artifacts);
    assert.notStrictEqual(result.phase.value, 'complete');
  });

  it('epic + sprint -> phase: build', () => {
    const state = makeState();
    const artifacts = [
      { filename: 'gyre-epic.md', type: 'epic', content: '## Stories\n\n- story 1: in progress' },
      { filename: 'gyre-sprint.md', type: 'sprint' },
    ];
    const result = applyArtifactChainRule(state, artifacts);
    assert.equal(result.phase.value, 'build');
  });

  it('architecture doc -> phase: planning', () => {
    const state = makeState();
    const artifacts = [
      { filename: 'gyre-arch.md', type: 'arch' },
    ];
    const result = applyArtifactChainRule(state, artifacts);
    assert.equal(result.phase.value, 'planning');
  });

  it('HC artifacts -> phase: discovery', () => {
    const state = makeState();
    const artifacts = [
      { filename: 'gyre-problem-def-hc2.md', type: 'problem-def', hcPrefix: 'hc2' },
      { filename: 'gyre-hypothesis-hc3.md', type: 'hypothesis', hcPrefix: 'hc3' },
    ];
    const result = applyArtifactChainRule(state, artifacts);
    assert.equal(result.phase.value, 'discovery');
  });

  it('PRD only -> phase: planning', () => {
    const state = makeState();
    const artifacts = [{ filename: 'gyre-prd.md', type: 'prd' }];
    const result = applyArtifactChainRule(state, artifacts);
    assert.equal(result.phase.value, 'planning');
  });

  it('brief only -> phase: planning', () => {
    const state = makeState();
    const artifacts = [{ filename: 'gyre-brief.md', type: 'brief' }];
    const result = applyArtifactChainRule(state, artifacts);
    assert.equal(result.phase.value, 'planning');
  });

  it('no recognized artifacts -> phase: unknown', () => {
    const state = makeState();
    const artifacts = [{ filename: 'random.md', type: null }];
    const result = applyArtifactChainRule(state, artifacts);
    assert.equal(result.phase.value, 'unknown');
  });

  it('does not override explicit frontmatter phase', () => {
    const state = makeState();
    state.phase = { value: 'build', source: 'frontmatter', confidence: 'explicit' };
    const artifacts = [{ filename: 'gyre-prd.md', type: 'prd' }];
    const result = applyArtifactChainRule(state, artifacts);
    assert.equal(result.phase.value, 'build');
    assert.equal(result.phase.source, 'frontmatter');
  });

  it('multiple epics -> latest date used', () => {
    const state = makeState();
    const artifacts = [
      { filename: 'gyre-epic-old.md', type: 'epic', date: '2026-01-01', content: 'done' },
      { filename: 'gyre-epic-new.md', type: 'epic', date: '2026-04-01', content: 'in progress' },
    ];
    const result = applyArtifactChainRule(state, artifacts);
    // Latest epic (2026-04-01) has "in progress" — no done marker, so falls through
    // Has epic but no sprint -> doesn't match build. Falls to next check.
    assert.notStrictEqual(result.phase.value, 'complete');
  });

  it('tracks lastArtifact from dated files', () => {
    const state = makeState();
    const artifacts = [
      { filename: 'old.md', type: 'prd', date: '2026-01-01' },
      { filename: 'new.md', type: 'prd', date: '2026-04-01' },
    ];
    applyArtifactChainRule(state, artifacts);
    assert.equal(state.lastArtifact.file, 'new.md');
    assert.equal(state.lastArtifact.date, '2026-04-01');
  });
});

// --- isEpicDone ---
//
// Original used Jest's test.each([...]) data-driven syntax. node:test has no
// built-in equivalent, so we expand the cases into a for-loop generating
// individual it() calls. The test names match what test.each would have
// generated, so grepping for old test names still works.

describe('isEpicDone', () => {
  const cases = [
    ['epic-1: done', true],
    ['Status: complete', true],
    ['✅ Delivered', true],
    ['- [x] All tasks', true],
    ['~~Finished epic~~', true],
    ['** done', true],                     // bold marker
    ['epic-3: complete', true],
    ['In progress, not done yet', false], // narrative "done" is NOT a status context
    ['We are not complete', false],        // narrative "complete" is NOT a status context
    ['No status markers here', false],
    ['', false],
  ];
  for (const [content, expected] of cases) {
    it(`"${content}" -> ${expected}`, () => {
      assert.equal(isEpicDone(content), expected);
    });
  }
});

// --- detectHCChain ---

describe('detectHCChain', () => {
  it('complete HC chain -> nextAction says ready', () => {
    const state = makeState();
    detectHCChain(state, new Set(['hc2', 'hc3', 'hc4', 'hc5', 'hc6']));
    assert.ok(state.nextAction.value.includes('complete'));
  });

  it('partial chain -> nextAction shows first missing HC', () => {
    const state = makeState();
    detectHCChain(state, new Set(['hc2', 'hc3']));
    assert.ok(state.nextAction.value.includes('HC4'));
    assert.ok(state.nextAction.value.includes('Experiment'));
  });

  it('empty chain -> no nextAction set', () => {
    const state = makeState();
    detectHCChain(state, new Set());
    assert.equal(state.nextAction.value, null);
  });
});

// --- git-recency-rule tests (mocked) ---
//
// First production use of tests/mock-cp.js. The original used jest.spyOn
// against child_process.execFileSync; the helper provides the equivalent
// surface on top of node:test/mock plus the module-cache-reset semantic
// that the target module needs.
//
// Local variable named cpMock to avoid colliding with the imported helper
// function name (mockExecFileSync) and with the node:test mock namespace.

describe('git-recency-rule', () => {
  let cpMock;

  beforeEach(() => {
    cpMock = mockExecFileSync(
      '../../scripts/lib/portfolio/rules/git-recency-rule',
      __dirname,
    );
  });

  afterEach(() => {
    // Defensive optional-chain: if beforeEach threw before assigning cpMock,
    // afterEach must not secondary-throw on undefined and mask the root cause.
    cpMock?.restore();
  });

  it('recent activity -> status: ongoing', () => {
    // Fixed 15-days-ago offset (well inside the 30-day window) instead of
    // `new Date().toISOString()` to avoid UTC-midnight boundary flake.
    const recent = new Date();
    recent.setUTCDate(recent.getUTCDate() - 15);
    const recentDate = recent.toISOString().split('T')[0];
    cpMock.setReturnValue(recentDate + '\n');
    const { applyGitRecencyRule } = cpMock.module;
    const state = makeState();
    const artifacts = [{ filename: 'a.md', fullPath: '/project/a.md' }];
    const result = applyGitRecencyRule(state, artifacts, { staleDays: 30, projectRoot: '/project' });
    assert.equal(result.status.value, 'ongoing');
    assert.equal(result.status.source, 'git-recency');
  });

  it('old activity (>30 days) -> status: stale', () => {
    cpMock.setReturnValue('2020-01-01\n');
    const { applyGitRecencyRule } = cpMock.module;
    const state = makeState();
    const artifacts = [{ filename: 'a.md', fullPath: '/project/a.md' }];
    const result = applyGitRecencyRule(state, artifacts, { staleDays: 30, projectRoot: '/project' });
    assert.equal(result.status.value, 'stale');
  });

  it('custom staleDays threshold', () => {
    // 10 days ago
    const d = new Date();
    d.setDate(d.getDate() - 10);
    const dateStr = d.toISOString().split('T')[0];
    cpMock.setReturnValue(dateStr + '\n');
    const { applyGitRecencyRule } = cpMock.module;
    const state = makeState();
    const artifacts = [{ filename: 'a.md', fullPath: '/project/a.md' }];

    // 30 days threshold -> ongoing
    let result = applyGitRecencyRule(state, artifacts, { staleDays: 30, projectRoot: '/project' });
    assert.equal(result.status.value, 'ongoing');

    // 5 days threshold -> stale
    state.status = { value: null, source: null, confidence: null };
    result = applyGitRecencyRule(state, artifacts, { staleDays: 5, projectRoot: '/project' });
    assert.equal(result.status.value, 'stale');
  });

  it('does not override explicit frontmatter status', () => {
    cpMock.setReturnValue('2020-01-01\n');
    const { applyGitRecencyRule } = cpMock.module;
    const state = makeState();
    state.status = { value: 'active', source: 'frontmatter', confidence: 'explicit' };
    const artifacts = [{ filename: 'a.md', fullPath: '/project/a.md' }];
    const result = applyGitRecencyRule(state, artifacts, { staleDays: 30, projectRoot: '/project' });
    assert.equal(result.status.value, 'active');
    assert.equal(result.status.confidence, 'explicit');
  });

  it('no projectRoot -> state unchanged', () => {
    const { applyGitRecencyRule } = cpMock.module;
    const state = makeState();
    const artifacts = [{ filename: 'a.md', fullPath: '/project/a.md' }];
    const result = applyGitRecencyRule(state, artifacts, {});
    assert.equal(result.status.value, null);
  });

  it('multiple artifacts -> picks latest date', () => {
    // Fixed 15-days-ago offset for the recent artifact (inside 30-day window)
    // to avoid UTC-midnight boundary flake.
    const recent = new Date();
    recent.setUTCDate(recent.getUTCDate() - 15);
    const recentDate = recent.toISOString().split('T')[0];
    let callCount = 0;
    cpMock.setImpl(() => {
      callCount++;
      return callCount === 1 ? '2020-01-01\n' : recentDate + '\n';
    });
    const { applyGitRecencyRule } = cpMock.module;
    const state = makeState();
    const artifacts = [
      { filename: 'old.md', fullPath: '/project/old.md' },
      { filename: 'new.md', fullPath: '/project/new.md' },
    ];
    const result = applyGitRecencyRule(state, artifacts, { staleDays: 30, projectRoot: '/project' });
    assert.equal(result.status.value, 'ongoing');
    assert.equal(result.lastArtifact.file, 'new.md');
  });

  it('empty artifacts array -> state unchanged', () => {
    const { applyGitRecencyRule } = cpMock.module;
    const state = makeState();
    const result = applyGitRecencyRule(state, [], { staleDays: 30, projectRoot: '/project' });
    assert.equal(result.status.value, null);
  });

  it('git log fails -> state unchanged', () => {
    cpMock.setImpl(() => { throw new Error('not tracked'); });
    const { applyGitRecencyRule } = cpMock.module;
    const state = makeState();
    const artifacts = [{ filename: 'a.md', fullPath: '/project/a.md' }];
    const result = applyGitRecencyRule(state, artifacts, { staleDays: 30, projectRoot: '/project' });
    assert.equal(result.status.value, null);
  });
});

// --- conflict-resolver tests ---

describe('conflict-resolver', () => {
  it('ensures phase has a value when empty', () => {
    const state = makeState();
    const result = applyConflictResolver(state, []);
    assert.equal(result.phase.value, 'unknown');
  });

  it('ensures status has a value when empty', () => {
    const state = makeState();
    const result = applyConflictResolver(state, []);
    assert.equal(result.status.value, 'unknown');
  });

  it('derives nextAction from phase when not set', () => {
    const state = makeState();
    state.phase = { value: 'discovery', source: 'artifact-chain', confidence: 'inferred' };
    const result = applyConflictResolver(state, []);
    assert.ok(result.nextAction.value.includes('discovery'));
  });

  it('does not override existing nextAction', () => {
    const state = makeState();
    state.nextAction = { value: 'HC4 experiment', source: 'chain-gap' };
    state.phase = { value: 'discovery', source: 'artifact-chain', confidence: 'inferred' };
    const result = applyConflictResolver(state, []);
    assert.equal(result.nextAction.value, 'HC4 experiment');
  });

  it('populates lastArtifact from artifacts when missing', () => {
    const state = makeState();
    const artifacts = [{ filename: 'test.md', date: '2026-04-01' }];
    const result = applyConflictResolver(state, artifacts);
    assert.equal(result.lastArtifact.file, 'test.md');
  });

  it('preserves existing lastArtifact', () => {
    const state = makeState();
    state.lastArtifact = { file: 'existing.md', date: '2026-04-05' };
    const result = applyConflictResolver(state, [{ filename: 'other.md' }]);
    assert.equal(result.lastArtifact.file, 'existing.md');
  });
});

// --- deriveNextAction ---

describe('deriveNextAction', () => {
  const cases = [
    ['unknown', 'Create PRD'],
    ['discovery', 'discovery'],
    ['planning', 'architecture'],
    ['build', 'story execution'],
    ['complete', 'retrospective'],
  ];
  for (const [phase, expectedFragment] of cases) {
    it(`phase "${phase}" -> action contains "${expectedFragment}"`, () => {
      const state = makeState();
      state.phase = { value: phase, source: 'test', confidence: 'inferred' };
      const action = deriveNextAction(state);
      assert.ok(action.value.toLowerCase().includes(expectedFragment.toLowerCase()));
    });
  }
});

// --- comparePhasePriority ---

describe('comparePhasePriority', () => {
  it('complete > build > planning > discovery > unknown', () => {
    assert.ok(comparePhasePriority('complete', 'build') > 0);
    assert.ok(comparePhasePriority('build', 'planning') > 0);
    assert.ok(comparePhasePriority('planning', 'discovery') > 0);
    assert.ok(comparePhasePriority('discovery', 'unknown') > 0);
  });

  it('same phase -> 0', () => {
    assert.equal(comparePhasePriority('build', 'build'), 0);
  });
});

// --- Story 6.3: phase evidence collection ---

describe('collectPhaseEvidence (Story 6.3)', () => {
  it('K — initiative with 3 artifacts but no PRD/arch/HC/epic → full evidence list', () => {
    const artifacts = [
      { type: 'note' },
      { type: 'note' },
      { type: 'note' },
    ];
    const types = new Set(['note']);
    const hcPrefixes = new Set();
    const evidence = collectPhaseEvidence(artifacts, types, hcPrefixes);
    assert.equal(evidence[0], '3 artifacts found');
    assert.ok(evidence.includes('no PRD/brief'));
    assert.ok(evidence.includes('no architecture'));
    assert.ok(evidence.includes('no HC chain'));
    assert.ok(evidence.includes('no epic'));
  });

  it('L — initiative with only HC1 → incomplete HC chain marker', () => {
    const artifacts = [{ type: 'hc1', hcPrefix: 'hc1' }];
    const types = new Set(['hc1']);
    const hcPrefixes = new Set(['hc1']);
    const evidence = collectPhaseEvidence(artifacts, types, hcPrefixes);
    assert.equal(evidence[0], '1 artifact found');
    assert.ok(evidence.includes('incomplete HC chain (needs HC2-HC6)'));
  });

  it('Single artifact pluralization: "1 artifact found" not "1 artifacts found"', () => {
    const artifacts = [{ type: 'note' }];
    const evidence = collectPhaseEvidence(artifacts, new Set(['note']), new Set());
    assert.equal(evidence[0], '1 artifact found');
  });

  it('applyArtifactChainRule attaches evidence on unknown phase', () => {
    const state = {
      initiative: 'test',
      phase: { value: null, source: null, confidence: null },
      status: { value: null, source: null, confidence: null },
      lastArtifact: { file: null, date: null },
      nextAction: { value: null, source: null },
    };
    const artifacts = [
      { type: 'note', filename: 'note-1.md', date: '2026-01-01' },
      { type: 'note', filename: 'note-2.md', date: '2026-01-02' },
    ];
    const result = applyArtifactChainRule(state, artifacts);
    assert.equal(result.phase.value, 'unknown');
    assert.equal(result.phase.source, 'artifact-chain');
    assert.ok(Array.isArray(result.phase.evidence));
    assert.equal(result.phase.evidence[0], '2 artifacts found');
  });
});

// --- Story 6.3: conflict-resolver nextAction override ---

describe('applyConflictResolver Story 6.3 nextAction override', () => {
  it('M — initiative with zero artifacts keeps generic "Create PRD or brief" message', () => {
    const state = {
      initiative: 'empty',
      phase: { value: null, source: null, confidence: null },
      status: { value: null, source: null, confidence: null },
      lastArtifact: { file: null, date: null },
      nextAction: { value: null, source: null },
    };
    const result = applyConflictResolver(state, [], {});
    assert.equal(result.nextAction.value, 'Create PRD or brief to start planning');
  });

  it('N — initiative with recognized-type artifacts but unknown phase → context-aware nextAction', () => {
    const state = {
      initiative: 'busy',
      phase: {
        value: 'unknown',
        source: 'artifact-chain',
        confidence: 'inferred',
        evidence: ['3 artifacts found', 'no PRD/brief', 'no architecture'],
      },
      status: { value: null, source: null, confidence: null },
      lastArtifact: { file: null, date: null },
      nextAction: { value: null, source: null },
    };
    // At least one artifact must have a real (non-'unknown') type to trigger the override.
    // This guards against the design-intent inversion where a single fallback-attributed
    // 'unknown'-type artifact would override the legitimate "Create PRD or brief" message.
    const artifacts = [
      { filename: 'a.md', type: 'spec' },
      { filename: 'b.md', type: 'spec' },
      { filename: 'c.md', type: 'spec' },
    ];
    const result = applyConflictResolver(state, artifacts, {});
    assert.ok(result.nextAction.value.includes('Unknown phase:'));
    assert.ok(result.nextAction.value.includes('3 artifacts found'));
    assert.ok(result.nextAction.value.includes('no PRD/brief'));
    // Generic fallback NOT used
    assert.notStrictEqual(result.nextAction.value, 'Create PRD or brief to start planning');
  });

  it('Override does NOT trigger when only fallback-attributed (unknown-type) artifacts exist', () => {
    // Regression guard for the design-intent inversion: if all artifacts are
    // fallback-attributed with synthetic `type: 'unknown'`, the operator should
    // still see the generic "Create PRD or brief" message.
    const state = {
      initiative: 'fallback-only',
      phase: {
        value: 'unknown',
        source: 'artifact-chain',
        confidence: 'inferred',
        evidence: ['1 artifact found', 'no PRD/brief'],
      },
      status: { value: null, source: null, confidence: null },
      lastArtifact: { file: null, date: null },
      nextAction: { value: null, source: null },
    };
    const artifacts = [{ filename: 'fallback.md', type: 'unknown' }];
    const result = applyConflictResolver(state, artifacts, {});
    assert.equal(result.nextAction.value, 'Create PRD or brief to start planning');
  });

  it('Override does NOT trigger when phase is known (e.g. discovery)', () => {
    const state = {
      initiative: 'forge',
      phase: { value: 'discovery', source: 'artifact-chain', confidence: 'inferred' },
      status: { value: null, source: null, confidence: null },
      lastArtifact: { file: null, date: null },
      nextAction: { value: null, source: null },
    };
    const result = applyConflictResolver(state, [{ filename: 'foo.md' }], {});
    assert.ok(!result.nextAction.value.includes('Unknown phase:'));
  });
});
