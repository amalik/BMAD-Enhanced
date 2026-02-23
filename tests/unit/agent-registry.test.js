const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const {
  AGENTS,
  WORKFLOWS,
  AGENT_FILES,
  AGENT_IDS,
  WORKFLOW_NAMES,
  USER_GUIDES
} = require('../../scripts/update/lib/agent-registry');

describe('agent-registry', () => {
  describe('AGENTS', () => {
    it('contains 7 agents', () => {
      assert.equal(AGENTS.length, 7);
    });

    it('each agent has required fields', () => {
      for (const agent of AGENTS) {
        assert.ok(agent.id, `agent missing id`);
        assert.ok(agent.name, `agent ${agent.id} missing name`);
        assert.ok(agent.icon, `agent ${agent.id} missing icon`);
        assert.ok(agent.title, `agent ${agent.id} missing title`);
        assert.ok(agent.stream, `agent ${agent.id} missing stream`);
      }
    });

    it('has unique agent IDs', () => {
      const ids = AGENTS.map(a => a.id);
      assert.equal(new Set(ids).size, ids.length);
    });

    it('has unique agent names', () => {
      const names = AGENTS.map(a => a.name);
      assert.equal(new Set(names).size, names.length);
    });

    it('is ordered by Vortex stream number (Architecture D3)', () => {
      const expectedOrder = [
        'Contextualize', 'Empathize', 'Synthesize', 'Hypothesize',
        'Externalize', 'Sensitize', 'Systematize'
      ];
      assert.deepEqual(AGENTS.map(a => a.stream), expectedOrder);
    });

    it('each agent has persona with required sub-fields', () => {
      for (const agent of AGENTS) {
        assert.ok(agent.persona, `agent ${agent.id} missing persona`);
        assert.ok(agent.persona.role, `agent ${agent.id} missing persona.role`);
        assert.ok(agent.persona.identity, `agent ${agent.id} missing persona.identity`);
        assert.ok(agent.persona.communication_style, `agent ${agent.id} missing persona.communication_style`);
        assert.ok(agent.persona.expertise, `agent ${agent.id} missing persona.expertise`);
      }
    });
  });

  describe('WORKFLOWS', () => {
    it('contains 22 workflows', () => {
      assert.equal(WORKFLOWS.length, 22);
    });

    it('each workflow has name and agent', () => {
      for (const wf of WORKFLOWS) {
        assert.ok(wf.name, 'workflow missing name');
        assert.ok(wf.agent, `workflow ${wf.name} missing agent`);
      }
    });

    it('all workflow agents reference valid agent IDs', () => {
      const validIds = new Set(AGENTS.map(a => a.id));
      for (const wf of WORKFLOWS) {
        assert.ok(validIds.has(wf.agent), `workflow ${wf.name} references unknown agent ${wf.agent}`);
      }
    });

    it('has unique workflow names', () => {
      const names = WORKFLOWS.map(w => w.name);
      assert.equal(new Set(names).size, names.length);
    });
  });

  describe('derived lists', () => {
    it('AGENT_FILES matches AGENTS with .md extension', () => {
      assert.deepEqual(AGENT_FILES, AGENTS.map(a => `${a.id}.md`));
    });

    it('AGENT_IDS matches AGENTS ids', () => {
      assert.deepEqual(AGENT_IDS, AGENTS.map(a => a.id));
    });

    it('WORKFLOW_NAMES matches WORKFLOWS names', () => {
      assert.deepEqual(WORKFLOW_NAMES, WORKFLOWS.map(w => w.name));
    });

    it('USER_GUIDES follows NAME-USER-GUIDE.md pattern', () => {
      for (const guide of USER_GUIDES) {
        assert.match(guide, /^[A-Z]+-USER-GUIDE\.md$/);
      }
      assert.equal(USER_GUIDES.length, AGENTS.length);
    });
  });
});
