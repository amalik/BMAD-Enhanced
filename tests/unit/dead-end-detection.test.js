'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('fs-extra');

const { PACKAGE_ROOT } = require('../helpers');
const {
  AGENTS,
  WORKFLOWS,
  WORKFLOW_NAMES
} = require('../../scripts/update/lib/agent-registry');

const VORTEX_WORKFLOWS_DIR = path.join(PACKAGE_ROOT, '_bmad/bme/_vortex/workflows');

// Build agent name → id mapping for parsing Compass tables
const AGENT_NAME_TO_ID = new Map(AGENTS.map(a => [a.name, a.id]));

/**
 * Find the final (highest-numbered) step file in a workflow's steps/ directory.
 * Returns null if no steps directory or no step files exist.
 */
function findFinalStepFile(workflowName) {
  const stepsDir = path.join(VORTEX_WORKFLOWS_DIR, workflowName, 'steps');
  if (!fs.existsSync(stepsDir)) return null;

  const stepFiles = fs.readdirSync(stepsDir)
    .filter(f => /^step-\d+.*\.md$/.test(f))
    .sort();

  if (stepFiles.length === 0) return null;
  return path.join(stepsDir, stepFiles[stepFiles.length - 1]);
}

/**
 * Parse a step file's Compass section and extract referenced agent names
 * and workflow names from routing tables.
 *
 * Looks for:
 * - Agent column entries like "Wade 🧪", "Isla 🔍", etc.
 * - Consider-next column entries like "lean-experiment", "user-discovery", etc.
 */
function parseCompassRoutes(content) {
  const agentNames = new Set();
  const workflowNames = new Set();

  // Find the Vortex Compass section
  const compassIdx = content.indexOf('## Vortex Compass');
  if (compassIdx === -1) return { agentNames, workflowNames };

  const compassSection = content.slice(compassIdx);

  // Parse table rows — look for lines starting with |
  const tableRows = compassSection.split('\n').filter(line =>
    line.startsWith('|') && !line.includes('---') && !line.includes('If you learned') && !line.includes('To route to')
  );

  for (const row of tableRows) {
    const cells = row.split('|').map(c => c.trim()).filter(c => c.length > 0);

    // Check each cell for known agent names
    for (const cell of cells) {
      for (const [agentName] of AGENT_NAME_TO_ID) {
        if (cell.includes(agentName)) {
          agentNames.add(agentName);
        }
      }
      // Check for workflow name references (kebab-case slug)
      for (const wfName of WORKFLOW_NAMES) {
        if (cell === wfName || cell.includes(wfName)) {
          workflowNames.add(wfName);
        }
      }
    }
  }

  // Also check the boilerplate "Or run Max's [VN] Vortex Navigation" line
  if (compassSection.includes('Max')) {
    agentNames.add('Max');
  }

  return { agentNames, workflowNames };
}

describe('dead-end detection — Compass route integrity (FR48)', () => {

  describe('registry-to-filesystem consistency', () => {

    it('every registered workflow has a directory on disk', () => {
      const missing = [];
      for (const wfName of WORKFLOW_NAMES) {
        const wfDir = path.join(VORTEX_WORKFLOWS_DIR, wfName);
        if (!fs.existsSync(wfDir)) {
          missing.push(wfName);
        }
      }
      assert.deepEqual(missing, [],
        `Registered workflows missing directories: ${missing.join(', ')}`);
    });

    it('no orphaned workflow directories exist outside the registry', () => {
      const dirsOnDisk = fs.readdirSync(VORTEX_WORKFLOWS_DIR)
        .filter(d => fs.statSync(path.join(VORTEX_WORKFLOWS_DIR, d)).isDirectory())
        .filter(d => d !== '_deprecated');

      const registeredNames = new Set(WORKFLOW_NAMES);
      const orphaned = dirsOnDisk.filter(d => !registeredNames.has(d));

      assert.deepEqual(orphaned, [],
        `Orphaned workflow directories not in registry: ${orphaned.join(', ')}`);
    });

    it('every registered workflow has a steps/ directory with step files', () => {
      const missing = [];
      for (const wfName of WORKFLOW_NAMES) {
        const stepsDir = path.join(VORTEX_WORKFLOWS_DIR, wfName, 'steps');
        if (!fs.existsSync(stepsDir)) {
          missing.push(`${wfName}: no steps/ directory`);
          continue;
        }
        const stepFiles = fs.readdirSync(stepsDir).filter(f => /^step-\d+.*\.md$/.test(f));
        if (stepFiles.length === 0) {
          missing.push(`${wfName}: steps/ directory is empty`);
        }
      }
      assert.deepEqual(missing, [],
        `Workflows with missing step files:\n${missing.join('\n')}`);
    });
  });

  describe('Compass route validation', () => {

    it('every workflow final step has a Vortex Compass section', () => {
      // vortex-navigation IS the meta-routing workflow — it produces a navigation
      // plan rather than routing to a single next agent, so it is exempt.
      const COMPASS_EXEMPT = new Set(['vortex-navigation']);

      const missingCompass = [];
      for (const wfName of WORKFLOW_NAMES) {
        if (COMPASS_EXEMPT.has(wfName)) continue;
        const finalStep = findFinalStepFile(wfName);
        if (!finalStep) {
          missingCompass.push(`${wfName}: no final step file found`);
          continue;
        }
        const content = fs.readFileSync(finalStep, 'utf8');
        if (!content.includes('## Vortex Compass')) {
          missingCompass.push(`${wfName}: ${path.basename(finalStep)}`);
        }
      }
      assert.deepEqual(missingCompass, [],
        `Workflows missing Vortex Compass in final step:\n${missingCompass.join('\n')}`);
    });

    it('every Compass route references a valid agent name', () => {
      const invalidRefs = [];
      for (const wfName of WORKFLOW_NAMES) {
        const finalStep = findFinalStepFile(wfName);
        if (!finalStep) continue;
        const content = fs.readFileSync(finalStep, 'utf8');
        const { agentNames } = parseCompassRoutes(content);

        for (const name of agentNames) {
          if (!AGENT_NAME_TO_ID.has(name)) {
            invalidRefs.push(`${wfName} → unknown agent "${name}"`);
          }
        }
      }
      assert.deepEqual(invalidRefs, [],
        `Compass routes reference unknown agents:\n${invalidRefs.join('\n')}`);
    });

    it('every Compass route workflow reference exists in the registry', () => {
      const invalidWfRefs = [];
      const registeredNames = new Set(WORKFLOW_NAMES);
      for (const wfName of WORKFLOW_NAMES) {
        const finalStep = findFinalStepFile(wfName);
        if (!finalStep) continue;
        const content = fs.readFileSync(finalStep, 'utf8');
        const { workflowNames } = parseCompassRoutes(content);

        for (const refWf of workflowNames) {
          if (!registeredNames.has(refWf)) {
            invalidWfRefs.push(`${wfName} → unknown workflow "${refWf}"`);
          }
        }
      }
      assert.deepEqual(invalidWfRefs, [],
        `Compass routes reference unregistered workflows:\n${invalidWfRefs.join('\n')}`);
    });
  });

  describe('bidirectional reachability', () => {

    // Build the full routing graph: for each agent, which other agents does it route to?
    const outboundRoutes = new Map(); // agent name → Set of target agent names
    const inboundRoutes = new Map();  // agent name → Set of source agent names

    // Initialize maps for all agents
    for (const agent of AGENTS) {
      outboundRoutes.set(agent.name, new Set());
      inboundRoutes.set(agent.name, new Set());
    }

    // Populate from Compass routes
    for (const wf of WORKFLOWS) {
      const sourceAgent = AGENTS.find(a => a.id === wf.agent);
      if (!sourceAgent) continue;

      const finalStep = findFinalStepFile(wf.name);
      if (!finalStep) continue;

      const content = fs.readFileSync(finalStep, 'utf8');
      const { agentNames } = parseCompassRoutes(content);

      for (const targetName of agentNames) {
        if (targetName === sourceAgent.name) continue; // skip self-references
        outboundRoutes.get(sourceAgent.name).add(targetName);
        if (inboundRoutes.has(targetName)) {
          inboundRoutes.get(targetName).add(sourceAgent.name);
        }
      }
    }

    it('every agent has at least one outbound Compass route', () => {
      const noOutbound = [];
      for (const agent of AGENTS) {
        if (outboundRoutes.get(agent.name).size === 0) {
          noOutbound.push(`${agent.name} (${agent.id})`);
        }
      }
      assert.deepEqual(noOutbound, [],
        `Agents with no outbound Compass routes (dead ends):\n${noOutbound.join('\n')}`);
    });

    it('every agent has at least one inbound Compass route', () => {
      const noInbound = [];
      for (const agent of AGENTS) {
        if (inboundRoutes.get(agent.name).size === 0) {
          noInbound.push(`${agent.name} (${agent.id})`);
        }
      }
      assert.deepEqual(noInbound, [],
        `Agents with no inbound Compass routes (unreachable):\n${noInbound.join('\n')}`);
    });

    it('no dead-end agent references exist (agent referenced but has no workflows)', () => {
      // Collect all agent names referenced across all Compass routes
      const allReferencedNames = new Set();
      for (const wfName of WORKFLOW_NAMES) {
        const finalStep = findFinalStepFile(wfName);
        if (!finalStep) continue;
        const content = fs.readFileSync(finalStep, 'utf8');
        const { agentNames } = parseCompassRoutes(content);
        for (const name of agentNames) {
          allReferencedNames.add(name);
        }
      }

      // Verify each referenced agent has at least one workflow
      const agentWorkflowCount = new Map();
      for (const wf of WORKFLOWS) {
        const agent = AGENTS.find(a => a.id === wf.agent);
        if (!agent) continue;
        agentWorkflowCount.set(agent.name, (agentWorkflowCount.get(agent.name) || 0) + 1);
      }

      const deadEnds = [];
      for (const name of allReferencedNames) {
        if (!agentWorkflowCount.has(name) || agentWorkflowCount.get(name) === 0) {
          deadEnds.push(name);
        }
      }
      assert.deepEqual(deadEnds, [],
        `Dead-end agents (referenced in Compass but have no workflows):\n${deadEnds.join('\n')}`);
    });
  });
});
