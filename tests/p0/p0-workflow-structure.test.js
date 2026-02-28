'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');

const { WORKFLOWS } = require('../../scripts/update/lib/agent-registry');
const {
  validateWorkflowStructure,
  assertDirExists,
  assertFileExists,
  WORKFLOWS_DIR,
} = require('./helpers');

// ─── Dynamic Workflow Structure Tests ───────────────────────────
// All workflows discovered from registry — zero hardcoded values.
// Step naming accepts both step-NN-name.md and step-NN.md patterns.

const STEP_PATTERN = /^step-\d{2}(-[^.]+)?\.md$/;

describe('P0 Workflow Structure: All Registered Workflows', () => {
  for (const workflow of WORKFLOWS) {
    describe(`${workflow.name} (agent: ${workflow.agent})`, () => {
      const wfDir = path.join(WORKFLOWS_DIR, workflow.name);

      it('workflow directory exists', () => {
        assertDirExists(wfDir, `${workflow.name} workflow directory`);
      });

      it('workflow.md exists', () => {
        assertFileExists(
          path.join(wfDir, 'workflow.md'),
          `${workflow.name} workflow definition`
        );
      });

      it('steps/ subdirectory exists', () => {
        assertDirExists(
          path.join(wfDir, 'steps'),
          `${workflow.name} steps directory`
        );
      });

      it('step count is between 4 and 6', () => {
        const stepsDir = path.join(wfDir, 'steps');
        const stepFiles = fs.readdirSync(stepsDir).filter(f => STEP_PATTERN.test(f));
        assert.ok(
          stepFiles.length >= 4 && stepFiles.length <= 6,
          `${workflow.name}: expected 4-6 steps, got ${stepFiles.length}`
        );
      });

      it('step files follow step-NN naming pattern', () => {
        const stepsDir = path.join(wfDir, 'steps');
        const allMdFiles = fs.readdirSync(stepsDir).filter(f => f.endsWith('.md'));
        for (const file of allMdFiles) {
          assert.ok(
            STEP_PATTERN.test(file),
            `${workflow.name}: step file '${file}' does not match step-NN[-name].md pattern`
          );
        }
      });
    });
  }
});

describe('P0 Workflow Structure: validateWorkflowStructure()', () => {
  it('all registered workflows pass structure validation', () => {
    for (const workflow of WORKFLOWS) {
      const result = validateWorkflowStructure(workflow.name);
      assert.ok(
        result.valid,
        `${workflow.name}: expected valid, issues: ${JSON.stringify(result.issues)}`
      );
    }
  });
});
