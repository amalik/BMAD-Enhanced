'use strict';

/**
 * Shared naming utilities for team factory modules.
 * Canonical source for toKebab() and deriveWorkflowName() — no duplication.
 */

/**
 * Convert a string to kebab-case.
 * @param {string} str
 * @returns {string}
 */
function toKebab(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Derive a workflow name for a single agent from spec data.
 * Uses workflow_names map if present, otherwise derives from first capability.
 * Falls back to role > agent.id when capabilities are absent.
 *
 * @param {Object} agent - Agent spec object with id, role, capabilities
 * @param {Object} [specData] - Full spec data (checked for workflow_names map)
 * @returns {string} kebab-case workflow name
 */
function deriveWorkflowName(agent, specData) {
  if (specData && specData.workflow_names && specData.workflow_names[agent.id]) {
    return specData.workflow_names[agent.id];
  }
  if (agent.capabilities && agent.capabilities.length > 0) {
    const cap = agent.capabilities[0];
    const wordCount = cap.trim().split(/\s+/).length;
    if (wordCount > 4 && agent.role) {
      return toKebab(agent.role);
    }
    return toKebab(cap);
  }
  return toKebab(agent.role || agent.id);
}

module.exports = { toKebab, deriveWorkflowName };
