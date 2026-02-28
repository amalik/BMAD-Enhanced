'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');
const os = require('os');

const { AGENTS, WORKFLOWS } = require('../../scripts/update/lib/agent-registry');
const {
  discoverAgents,
  loadAgentDefinition,
  validateActivation,
  validateWorkflowStructure,
  assertAgentField,
  assertFileExists,
  assertDirExists,
  VORTEX_DIR,
} = require('./helpers');
const {
  INFRASTRUCTURE_AGENTS,
  CONTENT_ONLY_AGENTS,
  getAgentTemplate,
} = require('./templates');

// ─── discoverAgents() Tests ─────────────────────────────────────

describe('P0 Framework: discoverAgents()', () => {
  const agents = discoverAgents();

  it('discovers exactly 7 agents from registry', () => {
    assert.equal(
      agents.length,
      AGENTS.length,
      `Expected ${AGENTS.length} agents, got ${agents.length}`
    );
  });

  it('each agent has required enriched fields', () => {
    for (const agent of agents) {
      assert.ok(agent.id, `Agent missing 'id' field`);
      assert.ok(agent.name, `Agent ${agent.id} missing 'name' field`);
      assert.ok(agent.stream, `Agent ${agent.id} missing 'stream' field`);
      assert.ok(agent.agentFilePath, `Agent ${agent.id} missing 'agentFilePath'`);
      assert.ok(Array.isArray(agent.workflowNames), `Agent ${agent.id} missing 'workflowNames' array`);
      assert.ok(Array.isArray(agent.workflowDirs), `Agent ${agent.id} missing 'workflowDirs' array`);
    }
  });

  it('agent IDs match registry exactly', () => {
    const discoveredIds = agents.map(a => a.id);
    const registryIds = AGENTS.map(a => a.id);
    assert.deepStrictEqual(discoveredIds, registryIds,
      'Discovered agent IDs do not match registry order'
    );
  });

  it('delegates to registry with zero hardcoded agent values', () => {
    // Verify discoverAgents() derives from AGENTS, not hardcoded values.
    // If registry has 7 agents, discover returns 7. If registry had 8, it would return 8.
    // We verify by checking the source function delegates to the imported AGENTS array.
    const fnSource = discoverAgents.toString();
    assert.ok(
      !fnSource.includes("'contextualization-expert'") &&
      !fnSource.includes("'Emma'"),
      'discoverAgents() should not contain hardcoded agent names or IDs'
    );
  });

  it('workflow names match registry for each agent', () => {
    for (const agent of agents) {
      const registryWorkflows = WORKFLOWS
        .filter(w => w.agent === agent.id)
        .map(w => w.name);
      assert.deepStrictEqual(
        agent.workflowNames,
        registryWorkflows,
        `${agent.name}: workflow names mismatch`
      );
    }
  });

  it('workflow directory paths are absolute and under VORTEX_DIR', () => {
    for (const agent of agents) {
      for (const dir of agent.workflowDirs) {
        assert.ok(
          path.isAbsolute(dir),
          `${agent.name}: workflow dir should be absolute: ${dir}`
        );
        assert.ok(
          dir.startsWith(VORTEX_DIR),
          `${agent.name}: workflow dir should be under VORTEX_DIR: ${dir}`
        );
      }
    }
  });
});

// ─── loadAgentDefinition() Tests ────────────────────────────────

describe('P0 Framework: loadAgentDefinition()', () => {
  it('loads all 7 agent definitions without errors', () => {
    for (const agent of AGENTS) {
      const def = loadAgentDefinition(agent.id);
      assert.ok(def, `${agent.name} (${agent.id}): loadAgentDefinition returned falsy`);
      assert.ok(def.frontmatter, `${agent.name}: missing frontmatter`);
      assert.ok(def.agentAttrs, `${agent.name}: missing agent attributes`);
      assert.ok(def.persona, `${agent.name}: missing persona`);
    }
  });

  it('extracts YAML frontmatter with name and description', () => {
    for (const agent of AGENTS) {
      const def = loadAgentDefinition(agent.id);
      assert.ok(
        def.frontmatter.name,
        `${agent.name} (${agent.id}): frontmatter missing 'name' field`
      );
      assert.ok(
        def.frontmatter.description,
        `${agent.name} (${agent.id}): frontmatter missing 'description' field`
      );
    }
  });

  it('extracts XML activation block with agent tag', () => {
    for (const agent of AGENTS) {
      const def = loadAgentDefinition(agent.id);
      assert.ok(
        def.agentAttrs.id || def.agentAttrs.name,
        `${agent.name} (${agent.id}): no agent tag attributes found in XML`
      );
    }
  });
});

// ─── validateActivation() Tests ─────────────────────────────────

describe('P0 Framework: validateActivation()', () => {
  it('returns zero issues for all 7 real agents', () => {
    for (const agent of AGENTS) {
      const def = loadAgentDefinition(agent.id);
      const issues = validateActivation(agent, def);
      assert.equal(
        issues.length,
        0,
        `${agent.name} (${agent.id}): expected 0 validation issues, got ${issues.length}: ${JSON.stringify(issues)}`
      );
    }
  });

  it('catches missing persona fields in mock agent definition', () => {
    const mockAgent = { id: 'test-agent', name: 'Test' };
    const mockDef = {
      frontmatter: { name: 'test', description: 'Test Agent' },
      agentAttrs: { id: 'test-agent', name: 'Test' },
      persona: { identity: 'A test agent' }, // missing role, communication_style, principles
      menuItems: [{ cmd: 'A' }, { cmd: 'B' }, { cmd: 'C' }, { cmd: 'D' }, { cmd: 'E' }],
      activationSteps: ['1', '2', '3', '4', '5', '6', '7'],
      hasErrorHandling: true,
    };
    const issues = validateActivation(mockAgent, mockDef);
    const missingRole = issues.find(i => i.field === 'persona.role');
    assert.ok(missingRole, 'Should detect missing persona.role');
    assert.equal(missingRole.actual, 'missing');
  });

  it('catches insufficient menu items', () => {
    const mockAgent = { id: 'test-agent', name: 'Test' };
    const mockDef = {
      frontmatter: {},
      agentAttrs: { name: 'Test' },
      persona: { role: 'r', identity: 'i', communication_style: 'c', principles: 'p' },
      menuItems: [{ cmd: 'A' }, { cmd: 'B' }], // Only 2, need at least 5
      activationSteps: ['1', '2', '3', '4', '5', '6', '7'],
      hasErrorHandling: true,
    };
    const issues = validateActivation(mockAgent, mockDef);
    const menuIssue = issues.find(i => i.field === 'menu items');
    assert.ok(menuIssue, 'Should detect insufficient menu items');
  });
});

// ─── validateWorkflowStructure() Tests ──────────────────────────

describe('P0 Framework: validateWorkflowStructure()', () => {
  it('validates lean-persona workflow (6 steps)', () => {
    const result = validateWorkflowStructure('lean-persona');
    assert.ok(result.valid, `lean-persona: expected valid, issues: ${JSON.stringify(result.issues)}`);
    assert.equal(result.stepCount, 6, `lean-persona: expected 6 steps, got ${result.stepCount}`);
  });

  it('validates research-convergence workflow (5 steps)', () => {
    const result = validateWorkflowStructure('research-convergence');
    assert.ok(result.valid, `research-convergence: expected valid, issues: ${JSON.stringify(result.issues)}`);
    assert.equal(result.stepCount, 5, `research-convergence: expected 5 steps, got ${result.stepCount}`);
  });

  it('catches non-existent workflow directory', () => {
    const result = validateWorkflowStructure('nonexistent-workflow-xyz');
    assert.equal(result.valid, false, 'Should be invalid for non-existent workflow');
    assert.ok(result.issues.length > 0, 'Should have at least one issue');
  });

  it('catches invalid step count in temp directory', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'p0-test-'));
    const wfDir = path.join(tmpDir, 'bad-workflow');
    const stepsDir = path.join(wfDir, 'steps');
    fs.mkdirSync(stepsDir, { recursive: true });
    fs.writeFileSync(path.join(wfDir, 'workflow.md'), '# Bad workflow');
    // Only 2 steps (below minimum of 4)
    fs.writeFileSync(path.join(stepsDir, 'step-01-setup.md'), '# Step 1');
    fs.writeFileSync(path.join(stepsDir, 'step-02-synthesize.md'), '# Step 2');

    const result = validateWorkflowStructure('bad-workflow', tmpDir);
    const stepCountIssue = result.issues.find(i => i.field === 'step count');
    assert.ok(stepCountIssue, 'Should detect step count below minimum');

    // Cleanup
    fs.rmSync(tmpDir, { recursive: true });
  });
});

// ─── Template Classification Tests ──────────────────────────────

describe('P0 Framework: Template Classification', () => {
  it('INFRASTRUCTURE_AGENTS contains exactly Emma and Wade', () => {
    assert.equal(INFRASTRUCTURE_AGENTS.length, 2, 'Expected 2 infrastructure agents');
    const ids = INFRASTRUCTURE_AGENTS.map(a => a.id);
    assert.ok(ids.includes('contextualization-expert'), 'Emma should be infrastructure');
    assert.ok(ids.includes('lean-experiments-specialist'), 'Wade should be infrastructure');
  });

  it('CONTENT_ONLY_AGENTS contains remaining 5 agents', () => {
    assert.equal(CONTENT_ONLY_AGENTS.length, AGENTS.length - 2,
      `Expected ${AGENTS.length - 2} content-only agents, got ${CONTENT_ONLY_AGENTS.length}`
    );
    const ids = CONTENT_ONLY_AGENTS.map(a => a.id);
    assert.ok(!ids.includes('contextualization-expert'), 'Emma should not be content-only');
    assert.ok(!ids.includes('lean-experiments-specialist'), 'Wade should not be content-only');
  });

  it('INFRASTRUCTURE + CONTENT_ONLY covers all agents', () => {
    const allIds = [...INFRASTRUCTURE_AGENTS, ...CONTENT_ONLY_AGENTS].map(a => a.id).sort();
    const registryIds = AGENTS.map(a => a.id).sort();
    assert.deepStrictEqual(allIds, registryIds, 'Template sets should cover all registry agents');
  });

  it('getAgentTemplate returns correct type for each agent', () => {
    assert.equal(getAgentTemplate('contextualization-expert'), 'infrastructure');
    assert.equal(getAgentTemplate('lean-experiments-specialist'), 'infrastructure');
    for (const agent of CONTENT_ONLY_AGENTS) {
      assert.equal(
        getAgentTemplate(agent.id),
        'content-only',
        `${agent.name} (${agent.id}): expected 'content-only' template`
      );
    }
  });

  it('getAgentTemplate returns content-only for unknown agent IDs', () => {
    assert.equal(getAgentTemplate('unknown-agent'), 'content-only',
      'Unknown agent should default to content-only'
    );
  });
});

// ─── Assertion Helpers Tests ────────────────────────────────────

describe('P0 Framework: Assertion Helpers', () => {
  it('assertAgentField produces diagnostic message with agent name', () => {
    const agent = { name: 'Emma', id: 'contextualization-expert' };
    try {
      assertAgentField(agent, 'stream', 'Contextualize', 'WrongValue');
      assert.fail('Should have thrown');
    } catch (err) {
      assert.ok(
        err.message.includes('Emma'),
        `Error message should include agent name: ${err.message}`
      );
      assert.ok(
        err.message.includes('contextualization-expert'),
        `Error message should include agent id: ${err.message}`
      );
      assert.ok(
        err.message.includes('stream'),
        `Error message should include field name: ${err.message}`
      );
    }
  });

  it('assertFileExists produces diagnostic message with context', () => {
    try {
      assertFileExists('/nonexistent/path/file.md', 'Emma activation test');
      assert.fail('Should have thrown');
    } catch (err) {
      assert.ok(
        err.message.includes('Emma activation test'),
        `Error message should include context: ${err.message}`
      );
      assert.ok(
        err.message.includes('/nonexistent/path/file.md'),
        `Error message should include file path: ${err.message}`
      );
    }
  });

  it('assertDirExists produces diagnostic message for missing directory', () => {
    try {
      assertDirExists('/nonexistent/dir', 'workflow steps');
      assert.fail('Should have thrown');
    } catch (err) {
      assert.ok(
        err.message.includes('workflow steps'),
        `Error message should include context: ${err.message}`
      );
    }
  });
});
