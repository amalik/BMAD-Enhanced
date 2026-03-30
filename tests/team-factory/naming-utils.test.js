const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const { toKebab, deriveWorkflowName } = require('../../_bmad/bme/_team-factory/lib/utils/naming-utils');

// === toKebab ===

describe('toKebab (canonical)', () => {
  it('converts spaces to hyphens', () => {
    assert.equal(toKebab('Data Analysis'), 'data-analysis');
  });

  it('handles special characters', () => {
    assert.equal(toKebab('Model & Review'), 'model-review');
  });

  it('trims leading/trailing hyphens', () => {
    assert.equal(toKebab(' Test '), 'test');
  });

  it('handles empty string', () => {
    assert.equal(toKebab(''), '');
  });

  it('handles null/undefined', () => {
    assert.equal(toKebab(null), '');
    assert.equal(toKebab(undefined), '');
  });

  it('preserves numbers', () => {
    assert.equal(toKebab('Phase 2 Analysis'), 'phase-2-analysis');
  });
});

// === deriveWorkflowName ===

describe('deriveWorkflowName', () => {
  it('uses workflow_names map when available', () => {
    const agent = { id: 'a', capabilities: ['something'] };
    const specData = { workflow_names: { a: 'custom-name' } };
    assert.equal(deriveWorkflowName(agent, specData), 'custom-name');
  });

  it('derives from first capability', () => {
    const agent = { id: 'a', capabilities: ['Data Analysis', 'Other'] };
    assert.equal(deriveWorkflowName(agent), 'data-analysis');
  });

  it('uses role when capability has more than 4 words', () => {
    const agent = { id: 'a', role: 'Stack Detective', capabilities: ['Analyze the entire production stack'] };
    assert.equal(deriveWorkflowName(agent), 'stack-detective');
  });

  it('uses first capability when 4 words or fewer even with role', () => {
    const agent = { id: 'a', role: 'Detective', capabilities: ['Stack Analysis'] };
    assert.equal(deriveWorkflowName(agent), 'stack-analysis');
  });

  it('uses role when no capabilities', () => {
    const agent = { id: 'a', role: 'Stack Detective', capabilities: [] };
    assert.equal(deriveWorkflowName(agent), 'stack-detective');
  });

  it('falls back to agent id when no role or capabilities', () => {
    const agent = { id: 'fallback-agent', capabilities: [] };
    assert.equal(deriveWorkflowName(agent), 'fallback-agent');
  });

  it('works without specData parameter', () => {
    const agent = { id: 'a', capabilities: ['Component Building'] };
    assert.equal(deriveWorkflowName(agent), 'component-building');
  });
});
