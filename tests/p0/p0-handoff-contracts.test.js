'use strict';

const { describe, it, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const { discoverAgents, VORTEX_DIR } = require('./helpers');

// ─── Constants ───────────────────────────────────────────────────
const CONTRACTS_DIR = path.join(VORTEX_DIR, 'contracts');

// ─── Parsing Utilities (Task 1) ─────────────────────────────────

/**
 * Extract the first ```yaml code block from HC schema file content.
 * HC files embed their frontmatter schema inside a fenced code block,
 * NOT as actual YAML frontmatter.
 */
function extractYamlBlock(content) {
  const match = content.match(/```yaml\n([\s\S]*?)```/);
  return match ? match[1] : '';
}

/**
 * Parse the "Frontmatter Field Reference" markdown table.
 * Returns array of { field, required, type } objects.
 * Field names are in backtick-delimited cells (e.g., `contract`).
 */
function extractFrontmatterFieldTable(content) {
  const sectionMatch = content.match(
    /### Frontmatter Field Reference\n\n([\s\S]*?)(?=\n###|\n---\n|\n## )/
  );
  if (!sectionMatch) return [];

  const lines = sectionMatch[1].split('\n').filter(
    line => line.startsWith('|') && !/^\|[\s-|]+$/.test(line)
  );

  // Skip header row
  return lines.slice(1).map(row => {
    const cells = row.split('|').map(c => c.trim()).filter(c => c);
    return {
      field: cells[0] ? cells[0].replace(/`/g, '') : '',
      required: cells[1]?.toLowerCase() === 'yes',
      type: cells[2] || '',
    };
  }).filter(r => r.field);
}

/**
 * Extract body section headers from "## Body Structure" section.
 * Handles non-standard annotations:
 *   *(required, 1-3 per artifact)* → required
 *   *(required for graduated experiments)* → required
 *   *(optional, required when unexpected patterns detected)* → optional
 */
function extractBodySections(content) {
  const bodyMatch = content.match(/## Body Structure\n([\s\S]*?)(?=\n## [^#]|$)/);
  if (!bodyMatch) return [];

  const sectionRegex = /^###\s+\d+\.\s+(.+?)\s+\*\((required[^)]*|optional[^)]*)\)\*/gm;
  const sections = [];
  let match;
  while ((match = sectionRegex.exec(bodyMatch[1])) !== null) {
    sections.push({
      name: match[1].trim(),
      annotation: match[2],
      required: match[2].startsWith('required'),
    });
  }
  return sections;
}

// ─── HC_SCHEMAS — Per-Contract Expected Metadata (Task 2) ───────
// Verified against actual HC schema files. sourceAgent uses short
// names as they appear in HC files (e.g., "isla", not registry ID).

const HC_SCHEMAS = {
  hc1: {
    file: 'hc1-empathy-artifacts.md',
    contract: 'HC1',
    sourceAgent: 'isla',
    sourceWorkflows: ['user-interview', 'user-discovery', 'empathy-map'],
    targetAgents: ['mila'],
    inputContract: null,
    requiredSections: [
      'Executive Summary', 'Research Context', 'Synthesized Insights',
      'Key Themes', 'Pain Points', 'Desired Gains', 'Recommendations',
    ],
  },
  hc2: {
    file: 'hc2-problem-definition.md',
    contract: 'HC2',
    sourceAgent: 'mila',
    sourceWorkflows: ['research-convergence', 'pivot-resynthesis'],
    targetAgents: ['liam'],
    inputContract: 'HC1',
    requiredSections: [
      'Converged Problem Statement', 'Jobs-to-be-Done (JTBD)',
      'Pains', 'Gains', 'Evidence Summary', 'Assumptions',
    ],
  },
  hc3: {
    file: 'hc3-hypothesis-contract.md',
    contract: 'HC3',
    sourceAgent: 'liam',
    sourceWorkflows: ['hypothesis-engineering', 'experiment-design'],
    targetAgents: ['wade'],
    inputContract: 'HC2',
    requiredSections: [
      'Problem Context', 'Hypothesis Contracts',
      'Assumption Risk Map', 'Recommended Testing Order',
    ],
  },
  hc4: {
    file: 'hc4-experiment-context.md',
    contract: 'HC4',
    sourceAgent: 'wade',
    sourceWorkflows: ['lean-experiment', 'proof-of-concept', 'proof-of-value', 'mvp'],
    targetAgents: ['noah'],
    inputContract: 'HC3',
    requiredSections: [
      'Experiment Summary', 'Hypothesis Tested', 'Experiment Method',
      'Pre-Defined Success Criteria', 'Confirmed/Rejected Hypotheses',
      'Strategic Context', 'Production Readiness',
    ],
  },
  hc5: {
    file: 'hc5-signal-report.md',
    contract: 'HC5',
    sourceAgent: 'noah',
    sourceWorkflows: ['signal-interpretation', 'behavior-analysis', 'production-monitoring'],
    targetAgents: ['max'],
    inputContract: 'HC4',
    requiredSections: [
      'Signal Description', 'Context', 'Trend Analysis', 'Data Quality',
    ],
  },
};

// ─── Dynamic Agent Discovery (NFR5) ─────────────────────────────
const agents = discoverAgents();

// Build short-name-to-agent map for cross-validation.
// HC files use lowercase agent names (e.g., "isla", "mila").
const agentNameMap = new Map();
for (const agent of agents) {
  agentNameMap.set(agent.name.toLowerCase(), agent);
}

// Ordered HC IDs for chain validation
const HC_ORDER = ['hc1', 'hc2', 'hc3', 'hc4', 'hc5'];

// ─── Suite 1: Schema File Existence & Frontmatter Structure ─────

describe('P0 Handoff Contracts: Schema Structure', () => {
  // M2: Vacuous pass guard
  it('discovered at least 5 handoff contract schemas and contracts directory exists', () => {
    assert.ok(
      Object.keys(HC_SCHEMAS).length >= 5,
      `Expected at least 5 HC schemas, found ${Object.keys(HC_SCHEMAS).length}`
    );
    assert.ok(
      fs.existsSync(CONTRACTS_DIR),
      `Contracts directory not found at ${CONTRACTS_DIR}`
    );
  });

  for (const [, schema] of Object.entries(HC_SCHEMAS)) {
    const label = `${schema.contract} (${schema.sourceAgent}\u2192${schema.targetAgents.join(',')})`;

    describe(label, () => {
      let content;
      let yamlBlock;
      let fieldTable;

      before(() => {
        const filePath = path.join(CONTRACTS_DIR, schema.file);
        assert.ok(
          fs.existsSync(filePath),
          `${label}: schema file not found at ${filePath}`
        );
        content = fs.readFileSync(filePath, 'utf8');
        yamlBlock = extractYamlBlock(content);
        fieldTable = extractFrontmatterFieldTable(content);
      });

      it('schema file exists and is readable', () => {
        assert.ok(
          content.length > 0,
          `${label}: schema file is empty`
        );
      });

      it('YAML block contains all 7 required frontmatter fields', () => {
        const requiredFields = [
          'contract', 'type', 'source_agent', 'source_workflow',
          'target_agents', 'input_artifacts', 'created',
        ];
        assert.ok(
          yamlBlock.length > 0,
          `${label}: no YAML code block found in schema file`
        );
        for (const field of requiredFields) {
          assert.ok(
            yamlBlock.includes(`${field}:`),
            `${label}: YAML block missing required field "${field}"`
          );
        }
      });

      it('Frontmatter Field Reference table documents all 7 fields as Required', () => {
        const requiredFieldNames = [
          'contract', 'type', 'source_agent', 'source_workflow',
          'target_agents', 'input_artifacts', 'created',
        ];
        assert.ok(
          fieldTable.length >= 7,
          `${label}: Frontmatter Field Reference table has ${fieldTable.length} entries, expected at least 7`
        );
        const tableFieldNames = fieldTable.map(f => f.field);
        for (const field of requiredFieldNames) {
          assert.ok(
            tableFieldNames.includes(field),
            `${label}: Frontmatter Field Reference table missing field "${field}" \u2014 found: [${tableFieldNames.join(', ')}]`
          );
          const entry = fieldTable.find(f => f.field === field);
          assert.ok(
            entry && entry.required,
            `${label}: field "${field}" should be Required=Yes in Frontmatter Field Reference table`
          );
        }
      });

      it('contract value and source_agent match expected schema definition', () => {
        const contractMatch = yamlBlock.match(/^\s*contract:\s*(\S+)/m);
        assert.ok(
          contractMatch,
          `${label}: could not extract contract value from YAML block`
        );
        assert.strictEqual(
          contractMatch[1],
          schema.contract,
          `${label}: YAML contract value "${contractMatch[1]}" does not match expected "${schema.contract}"`
        );

        const agentMatch = yamlBlock.match(/^\s*source_agent:\s*(\S+)/m);
        assert.ok(
          agentMatch,
          `${label}: could not extract source_agent from YAML block`
        );
        assert.strictEqual(
          agentMatch[1],
          schema.sourceAgent,
          `${label}: YAML source_agent "${agentMatch[1]}" does not match expected "${schema.sourceAgent}"`
        );
      });
    });
  }
});

// ─── Suite 2: Required Body Sections Validation ─────────────────

describe('P0 Handoff Contracts: Required Body Sections', () => {
  for (const [, schema] of Object.entries(HC_SCHEMAS)) {
    const label = `${schema.contract} (${schema.sourceAgent}\u2192${schema.targetAgents.join(',')})`;

    describe(label, () => {
      it('all required body sections present', () => {
        const filePath = path.join(CONTRACTS_DIR, schema.file);
        const content = fs.readFileSync(filePath, 'utf8');
        const sections = extractBodySections(content);

        assert.ok(
          sections.length >= 1,
          `${label}: no body sections found in schema file`
        );

        // Normalize for case-insensitive comparison (NFR4)
        const extractedRequired = sections
          .filter(s => s.required)
          .map(s => s.name.toLowerCase().trim());

        for (const expectedSection of schema.requiredSections) {
          const normalized = expectedSection.toLowerCase().trim();
          assert.ok(
            extractedRequired.includes(normalized),
            `${label}: missing required body section "${expectedSection}" \u2014 found required sections: [${sections.filter(s => s.required).map(s => s.name).join(', ')}]`
          );
        }

        // Bidirectional check: detect new required sections not tracked in HC_SCHEMAS
        assert.strictEqual(
          extractedRequired.length,
          schema.requiredSections.length,
          `${label}: found ${extractedRequired.length} required body sections but expected ${schema.requiredSections.length} \u2014 HC file may have new required sections not tracked in HC_SCHEMAS`
        );
      });
    });
  }
});

// ─── Suite 3: Agent-Contract Cross-Validation ───────────────────

describe('P0 Handoff Contracts: Agent-Contract Cross-Validation', () => {
  for (const [, schema] of Object.entries(HC_SCHEMAS)) {
    const label = `${schema.contract} (${schema.sourceAgent}\u2192${schema.targetAgents.join(',')})`;

    describe(label, () => {
      it('source and target agents are registered in agent registry', () => {
        const sourceAgent = agentNameMap.get(schema.sourceAgent);
        assert.ok(
          sourceAgent,
          `${label}: source_agent "${schema.sourceAgent}" not found in agent registry \u2014 registered: [${[...agentNameMap.keys()].join(', ')}]`
        );

        for (const targetName of schema.targetAgents) {
          const targetAgent = agentNameMap.get(targetName);
          assert.ok(
            targetAgent,
            `${label}: target_agent "${targetName}" not found in agent registry \u2014 registered: [${[...agentNameMap.keys()].join(', ')}]`
          );
        }
      });

      it('source workflows are valid for the producing agent', () => {
        const sourceAgent = agentNameMap.get(schema.sourceAgent);
        assert.ok(
          sourceAgent,
          `${label}: source_agent "${schema.sourceAgent}" not found (prerequisite for workflow check)`
        );

        for (const wf of schema.sourceWorkflows) {
          assert.ok(
            sourceAgent.workflowNames.includes(wf),
            `${label}: source_workflow "${wf}" is not a valid workflow for ${schema.sourceAgent} (${sourceAgent.id}) \u2014 valid: [${sourceAgent.workflowNames.join(', ')}]`
          );
        }
      });
    });
  }
});

// ─── Suite 4: Vortex Chain Integrity ────────────────────────────

describe('P0 Handoff Contracts: Vortex Chain Integrity', () => {
  it('Vortex chain is connected: target of HCn matches source of HCn+1', () => {
    for (let i = 0; i < HC_ORDER.length - 1; i++) {
      const current = HC_SCHEMAS[HC_ORDER[i]];
      const next = HC_SCHEMAS[HC_ORDER[i + 1]];
      assert.ok(
        current.targetAgents.includes(next.sourceAgent),
        `Chain break: ${current.contract} target [${current.targetAgents.join(', ')}] does not include ${next.contract} source "${next.sourceAgent}" \u2014 expected ${current.contract}\u2192${next.contract} link`
      );
    }
  });

  it('each contract references correct upstream input contract', () => {
    for (let i = 1; i < HC_ORDER.length; i++) {
      const schema = HC_SCHEMAS[HC_ORDER[i]];
      const prevSchema = HC_SCHEMAS[HC_ORDER[i - 1]];
      const filePath = path.join(CONTRACTS_DIR, schema.file);
      const content = fs.readFileSync(filePath, 'utf8');
      const yamlBlock = extractYamlBlock(content);

      const inputSection = yamlBlock.split('input_artifacts:')[1] || '';
      assert.ok(
        inputSection.includes(`contract: ${prevSchema.contract}`),
        `${schema.contract}: input_artifacts section should reference ${prevSchema.contract} but does not contain "contract: ${prevSchema.contract}"`
      );
    }
  });

  it('HC1 has no upstream contract dependency', () => {
    const filePath = path.join(CONTRACTS_DIR, HC_SCHEMAS.hc1.file);
    const content = fs.readFileSync(filePath, 'utf8');
    const yamlBlock = extractYamlBlock(content);

    assert.ok(
      yamlBlock.includes('input_artifacts: []'),
      'HC1: expected input_artifacts: [] (first in chain) but not found in YAML block'
    );
  });
});
