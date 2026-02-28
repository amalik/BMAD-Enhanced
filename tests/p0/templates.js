'use strict';

/**
 * P0 template classification for agents.
 *
 * Infrastructure agents (Emma, Wade) have JavaScript components in scripts/
 * that perform installation, validation, and update operations. Their P0 tests
 * include activation + workflow structure + infrastructure integration checks.
 *
 * Content-only agents (Isla, Mila, Liam, Noah, Max) are pure markdown
 * definitions. Their P0 tests cover activation + workflow structure only.
 *
 * Stories 2.2 and 2.3 implement full infrastructure tests for Emma and Wade.
 * Story 3.1 implements content-only tests for the remaining 5 agents.
 */

const { AGENTS } = require('../../scripts/update/lib/agent-registry');

// Infrastructure agents have JS components in scripts/ (config loading,
// menu handler routing, file existence verification)
const INFRASTRUCTURE_AGENT_IDS = new Set([
  'contextualization-expert',   // Emma
  'lean-experiments-specialist', // Wade
]);

const INFRASTRUCTURE_AGENTS = AGENTS.filter(a => INFRASTRUCTURE_AGENT_IDS.has(a.id));
const CONTENT_ONLY_AGENTS = AGENTS.filter(a => !INFRASTRUCTURE_AGENT_IDS.has(a.id));

/**
 * Determine the P0 template type for an agent.
 *
 * @param {string} agentId - Agent ID from registry
 * @returns {'infrastructure' | 'content-only'} Template type
 */
function getAgentTemplate(agentId) {
  return INFRASTRUCTURE_AGENT_IDS.has(agentId) ? 'infrastructure' : 'content-only';
}

module.exports = {
  INFRASTRUCTURE_AGENT_IDS,
  INFRASTRUCTURE_AGENTS,
  CONTENT_ONLY_AGENTS,
  getAgentTemplate,
};
