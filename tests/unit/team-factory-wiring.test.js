const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const {
  EXTRA_BME_AGENTS,
  EXTRA_BME_AGENT_IDS
} = require('../../scripts/update/lib/agent-registry');

const projectRoot = path.join(__dirname, '..', '..');

describe('team-factory wiring', () => {
  describe('EXTRA_BME_AGENTS registry entry', () => {
    it('exposes a non-empty EXTRA_BME_AGENTS array', () => {
      assert.ok(Array.isArray(EXTRA_BME_AGENTS));
      assert.ok(EXTRA_BME_AGENTS.length >= 1);
    });

    it('contains the team-factory agent', () => {
      const tf = EXTRA_BME_AGENTS.find(a => a.id === 'team-factory');
      assert.ok(tf, 'team-factory entry missing from EXTRA_BME_AGENTS');
    });

    it('team-factory entry has all required fields', () => {
      const tf = EXTRA_BME_AGENTS.find(a => a.id === 'team-factory');
      assert.equal(tf.id, 'team-factory');
      assert.equal(tf.submodule, '_team-factory');
      assert.equal(tf.name, 'Loom Master');
      assert.equal(tf.title, 'Team Factory');
      assert.equal(tf.icon, '🏭');
      assert.ok(tf.persona);
      assert.ok(tf.persona.role);
      assert.ok(tf.persona.identity);
      assert.ok(tf.persona.communication_style);
      assert.ok(tf.persona.expertise);
    });

    it('EXTRA_BME_AGENT_IDS mirrors EXTRA_BME_AGENTS ids', () => {
      assert.deepEqual(EXTRA_BME_AGENT_IDS, EXTRA_BME_AGENTS.map(a => a.id));
    });
  });

  describe('agent-manifest.csv', () => {
    const manifestPath = path.join(projectRoot, '_bmad', '_config', 'agent-manifest.csv');

    it('contains a row referencing bmad-agent-bme-team-factory', () => {
      const content = fs.readFileSync(manifestPath, 'utf8');
      assert.ok(content.includes('bmad-agent-bme-team-factory'),
        'agent-manifest.csv missing bmad-agent-bme-team-factory canonicalId');
    });

    it('team-factory row references the correct agent file path', () => {
      const content = fs.readFileSync(manifestPath, 'utf8');
      assert.ok(content.includes('_bmad/bme/_team-factory/agents/team-factory.md'),
        'agent-manifest.csv missing team-factory file path');
    });

    it('team-factory row uses bme module', () => {
      const content = fs.readFileSync(manifestPath, 'utf8');
      const tfLine = content.split('\n').find(l => l.includes('bmad-agent-bme-team-factory'));
      assert.ok(tfLine, 'team-factory row not found');
      assert.ok(tfLine.includes('"bme"'), 'team-factory row missing bme module field');
    });
  });

  describe('Claude Code skill wrapper', () => {
    const skillPath = path.join(projectRoot, '.claude', 'skills', 'bmad-agent-bme-team-factory', 'SKILL.md');

    it('SKILL.md exists at the expected path', () => {
      assert.ok(fs.existsSync(skillPath), `SKILL.md missing at ${skillPath}`);
    });

    it('SKILL.md frontmatter declares name and description', () => {
      const content = fs.readFileSync(skillPath, 'utf8');
      assert.ok(content.includes('name: bmad-agent-bme-team-factory'));
      assert.ok(/description:\s*\S/.test(content));
    });

    it('SKILL.md delegates to the team-factory agent file', () => {
      const content = fs.readFileSync(skillPath, 'utf8');
      assert.ok(content.includes('_bmad/bme/_team-factory/agents/team-factory.md'),
        'SKILL.md activation block does not reference the agent file');
    });

    it('SKILL.md follows the bmad-agent-bme-{id} naming convention', () => {
      const skillDir = path.basename(path.dirname(skillPath));
      assert.match(skillDir, /^bmad-agent-bme-[a-z][a-z0-9-]*$/);
    });
  });

  describe('underlying agent file', () => {
    it('team-factory agent file exists', () => {
      const agentFile = path.join(projectRoot, '_bmad', 'bme', '_team-factory', 'agents', 'team-factory.md');
      assert.ok(fs.existsSync(agentFile), `Agent file missing at ${agentFile}`);
    });
  });
});
