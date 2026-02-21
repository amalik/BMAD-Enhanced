/**
 * Canonical agent and workflow registry.
 *
 * Single source of truth consumed by refresh-installation, validator,
 * bmad-doctor, installer, index.js, and migration-runner.
 *
 * To add a new agent:  push one entry to AGENTS + its workflows to WORKFLOWS.
 * Every consumer picks up the change automatically.
 */

'use strict';

const AGENTS = [
  { id: 'contextualization-expert', name: 'Emma', icon: '\u{1F3AF}', title: 'Contextualization Expert', stream: 'Contextualize' },
  { id: 'discovery-empathy-expert', name: 'Isla', icon: '\u{1F50D}', title: 'Discovery & Empathy Expert', stream: 'Empathize' },
  { id: 'lean-experiments-specialist', name: 'Wade', icon: '\u{1F9EA}', title: 'Lean Experiments Specialist', stream: 'Externalize' },
  { id: 'learning-decision-expert', name: 'Max', icon: '\u{1F9ED}', title: 'Learning & Decision Expert', stream: 'Systematize' },
];

const WORKFLOWS = [
  // Emma — Contextualize
  { name: 'lean-persona', agent: 'contextualization-expert' },
  { name: 'product-vision', agent: 'contextualization-expert' },
  { name: 'contextualize-scope', agent: 'contextualization-expert' },
  // Isla — Empathize
  { name: 'empathy-map', agent: 'discovery-empathy-expert' },
  { name: 'user-interview', agent: 'discovery-empathy-expert' },
  { name: 'user-discovery', agent: 'discovery-empathy-expert' },
  // Wade — Externalize
  { name: 'mvp', agent: 'lean-experiments-specialist' },
  { name: 'lean-experiment', agent: 'lean-experiments-specialist' },
  { name: 'proof-of-concept', agent: 'lean-experiments-specialist' },
  { name: 'proof-of-value', agent: 'lean-experiments-specialist' },
  // Max — Systematize
  { name: 'learning-card', agent: 'learning-decision-expert' },
  { name: 'pivot-patch-persevere', agent: 'learning-decision-expert' },
  { name: 'vortex-navigation', agent: 'learning-decision-expert' },
];

// Derived lists — computed from the canonical arrays above
const AGENT_FILES = AGENTS.map(a => `${a.id}.md`);
const AGENT_IDS = AGENTS.map(a => a.id);
const WORKFLOW_NAMES = WORKFLOWS.map(w => w.name);
const USER_GUIDES = AGENTS.map(a => `${a.name.toUpperCase()}-USER-GUIDE.md`);

module.exports = {
  AGENTS,
  WORKFLOWS,
  AGENT_FILES,
  AGENT_IDS,
  WORKFLOW_NAMES,
  USER_GUIDES,
};
