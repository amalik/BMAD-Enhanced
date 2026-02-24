const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const { AGENTS, AGENT_IDS, WAVE3_WORKFLOW_NAMES } = require('../lib/agent-registry');

/**
 * Migration: 1.5.x → current version (v1.6.0)
 * Appends Wave 3 agents and workflows to existing config.
 * refreshInstallation() handles file copying (agents, workflows, guides).
 *
 * Wave 3 agents: Mila (Synthesize), Liam (Hypothesize), Noah (Sensitize)
 * Wave 3 workflows: 9 new workflows (3 per agent)
 */

// Wave 1/2 agent IDs (pre-1.6.0)
const WAVE12_AGENT_IDS = new Set([
  'contextualization-expert',
  'discovery-empathy-expert',
  'lean-experiments-specialist',
  'learning-decision-expert'
]);

// Wave 3 agent IDs derived from registry; workflow names from WAVE3_WORKFLOW_NAMES set
const WAVE3_AGENT_IDS = AGENT_IDS.filter(id => !WAVE12_AGENT_IDS.has(id));
const WAVE3_WORKFLOWS = [...WAVE3_WORKFLOW_NAMES];

module.exports = {
  name: '1.5.x-to-1.6.0',
  fromVersion: '1.5.x',
  breaking: false,

  async preview() {
    const wave3Agents = AGENTS.filter(a => WAVE3_AGENT_IDS.includes(a.id));
    const agentDesc = wave3Agents.map(a => `${a.name} (${a.id})`).join(', ');
    return {
      actions: [
        `Append Wave 3 agents to config: ${agentDesc}`,
        `Append ${WAVE3_WORKFLOWS.length} Wave 3 workflows to config: ${WAVE3_WORKFLOWS.join(', ')}`,
        'File copying handled by refreshInstallation()'
      ]
    };
  },

  /**
   * Apply migration: append Wave 3 agents and workflows to config.
   * Idempotent — skips entries already present.
   * @param {string} projectRoot - Absolute path to project root
   * @returns {Promise<Array<string>>} List of changes made
   */
  async apply(projectRoot) {
    const changes = [];
    const configPath = path.join(projectRoot, '_bmad', 'bme', '_vortex', 'config.yaml');

    if (!await fs.pathExists(configPath)) {
      changes.push('No config.yaml found — refreshInstallation will create it');
      return changes;
    }

    const configContent = await fs.readFile(configPath, 'utf8');
    const config = yaml.load(configContent) || {};

    // Ensure arrays exist
    if (!Array.isArray(config.agents)) {
      config.agents = [];
    }
    if (!Array.isArray(config.workflows)) {
      config.workflows = [];
    }

    // Append missing Wave 3 agents (idempotent)
    const newAgents = WAVE3_AGENT_IDS.filter(id => !config.agents.includes(id));
    if (newAgents.length > 0) {
      config.agents.push(...newAgents);
      changes.push(`Appended ${newAgents.length} Wave 3 agent(s): ${newAgents.join(', ')}`);
    } else {
      changes.push('Wave 3 agents already present in config');
    }

    // Append missing Wave 3 workflows (idempotent)
    const newWorkflows = WAVE3_WORKFLOWS.filter(name => !config.workflows.includes(name));
    if (newWorkflows.length > 0) {
      config.workflows.push(...newWorkflows);
      changes.push(`Appended ${newWorkflows.length} Wave 3 workflow(s): ${newWorkflows.join(', ')}`);
    } else {
      changes.push('Wave 3 workflows already present in config');
    }

    // Write updated config back
    if (newAgents.length > 0 || newWorkflows.length > 0) {
      await fs.writeFile(configPath, yaml.dump(config, { indent: 2, lineWidth: -1, noRefs: true }), 'utf8');
    }

    return changes;
  }
};
