# Story 5.4: Add CI Dead-End Detection & Final Version Bump

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a maintainer of the Vortex pattern,
I want CI to detect dead-end Compass routes and the version bumped to 1.6.0,
So that any broken routing is caught automatically and the release is properly versioned.

## Acceptance Criteria

1. **Given** the complete 7-agent routing network, **When** CI validation runs, **Then** a test scans all workflow final steps and verifies every Compass route references a valid agent
2. **Given** the complete 7-agent routing network, **When** CI validation runs, **Then** the test verifies every agent has at least one inbound and one outbound route
3. **Given** the complete 7-agent routing network, **When** CI validation runs, **Then** the test flags any "dead-end" routes (agent referenced but no workflow exists)
4. **Given** the current version is 1.5.2, **When** the version bump is applied, **Then** `package.json` version is bumped to `1.6.0`
5. **Given** all changes are applied, **When** `npm test` runs, **Then** all existing + new tests pass
6. **Given** all changes are applied, **When** `npm run lint` runs, **Then** no new warnings
7. **Given** all changes are applied, **When** `npm run test:integration` runs, **Then** integration tests pass including installer E2E with 7 agents
8. **Given** the validator module, **When** updated, **Then** the validator is updated to check for 7 agents and all new workflows

*Covers: FR48*

## Tasks / Subtasks

- [x] Task 1: Create dead-end route detection test (AC: 1, 2, 3)
  - [x] 1.1 Create `tests/unit/dead-end-detection.test.js` with `node:test` + `node:assert/strict` pattern
  - [x] 1.2 Import `AGENTS`, `WORKFLOWS`, `WORKFLOW_NAMES` from `scripts/update/lib/agent-registry.js`
  - [x] 1.3 Test: every workflow in `WORKFLOWS` has a directory on disk + no orphaned dirs (3 tests in registry-to-filesystem consistency)
  - [x] 1.4 Test: scan all workflow final step files for Compass route references and verify each referenced agent/workflow exists in registry (3 tests in Compass route validation)
  - [x] 1.5 Test: verify every agent has at least one inbound route and at least one outbound route (2 tests in bidirectional reachability)
  - [x] 1.6 Test: flag any agent referenced in Compass routes that has no corresponding workflows (1 test: no dead-end agent references)
  - [x] 1.7 Test: verify no orphaned workflow directories exist outside the registry

- [x] Task 2: Bump package.json version to 1.6.0 (AC: 4)
  - [x] 2.1 Edit `package.json` version field from `"1.5.2"` to `"1.6.0"`
  - [x] 2.2 README.md version badge updated from 1.5.2 to 1.6.0 (was NOT updated in Story 5-3 — version hadn't been bumped yet)

- [x] Task 3: Update validator for 7 agents (AC: 8)
  - [x] 3.1 Review `scripts/update/lib/validator.js` — all counts are registry-derived, no hardcoded values
  - [x] 3.2 N/A — not hardcoded; validator imports AGENT_FILES, AGENT_IDS, WORKFLOW_NAMES, WAVE3_WORKFLOW_NAMES from agent-registry.js
  - [x] 3.3 Confirmed: validator references registry arrays directly (Epic 1 already set up correctly)
  - [x] 3.4 Verified: `validateAgentFiles` uses AGENT_FILES (7 entries) from registry
  - [x] 3.5 Verified: `validateWorkflows` uses WORKFLOW_NAMES (22 entries) from registry
  - [x] 3.6 Verified: `validateWorkflowStepStructure` enforces 4-6 step range (lines 320-323)

- [x] Task 4: Run full test suite and fix any failures (AC: 5, 6, 7)
  - [x] 4.1 `npm test` — 208/208 unit tests pass (199 existing + 9 new dead-end detection)
  - [x] 4.2 `npm run lint` — 0 warnings
  - [x] 4.3 `npm run test:integration` — 60/60 integration tests pass
  - [x] 4.4 `npm run test:coverage` — 88.45% line coverage (threshold: 83%)
  - [x] 4.5 No failures to fix

## Dev Notes

### Architecture & Technical Constraints

- **Test runner**: Node 18+ built-in `node:test` — do NOT use Jest, Mocha, or Vitest
- **Assertions**: `node:assert/strict` — use `assert.equal`, `assert.ok`, `assert.deepEqual`, `assert.match`
- **Coverage**: `c8` tool, 83% line coverage threshold (NFR26)
- **Linting**: ESLint with `@eslint/js` — run `npm run lint` after changes
- **Dependencies**: Only `chalk`, `fs-extra`, `js-yaml` in production deps; `@eslint/js`, `c8`, `eslint` in devDeps

### Dead-End Detection Implementation Approach

**FR48 reconciliation**: Architecture document defers FR48 to Wave 3.1 (line 604), but PRD mandates it as P4 priority for Wave 3.0 and the epics file includes it in Epic 5. **Follow the epics file** — the story is in scope.

**Approach**: Create a new test file that performs filesystem-level scanning of Vortex workflow step files combined with agent-registry cross-referencing. This is NOT a runtime CI script — it's a test that runs as part of `npm test`.

**What "dead-end detection" means concretely:**
1. Read the final step file of each workflow (the highest-numbered `step-*.md` file in each workflow's `steps/` directory)
2. Parse for Compass routing sections (look for patterns like agent names, "→ Emma", "→ Isla", etc.)
3. Cross-reference every mentioned agent against `AGENT_IDS` from agent-registry
4. Verify bidirectional reachability: every agent is both a source (has outbound routes) and a target (has inbound routes)
5. Detect orphaned references: workflow dirs that exist on disk but aren't in the registry

**Key paths to scan:**
- Workflow step files: `_bmad/bme/_vortex/workflows/*/steps/step-*.md`
- Agent definitions: `_bmad/bme/_vortex/agents/*.md`
- Agent registry (source of truth): `scripts/update/lib/agent-registry.js`

**Agent name → ID mapping** (for parsing Compass routes in markdown):
| Name | ID | Stream |
|------|-----|--------|
| Emma | contextualization-expert | Contextualize |
| Isla | discovery-empathy-expert | Empathize |
| Mila | research-convergence-specialist | Synthesize |
| Liam | hypothesis-engineer | Hypothesize |
| Wade | lean-experiments-specialist | Operationalize |
| Noah | production-intelligence-specialist | Sensitize |
| Max  | learning-decision-expert | Strategize |

### Test Pattern Reference

Follow the exact patterns from existing tests:

```javascript
const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('fs-extra');

// Use PACKAGE_ROOT from helpers for reliable path resolution
const { PACKAGE_ROOT } = require('../helpers');

// Import registry exports
const {
  AGENTS, WORKFLOWS, AGENT_IDS, WORKFLOW_NAMES
} = require('../../scripts/update/lib/agent-registry');
```

### Version Bump Notes

- `package.json` version: `1.5.2` → `1.6.0`
- README badge was updated in Story 5-3 (verify, don't re-edit)
- CHANGELOG v1.6.0 entry was added in Story 5-3 (verify, don't re-edit)
- **Anti-pattern**: Do NOT hardcode version strings in test assertions — use `getPackageVersion()` or read from package.json dynamically if version comparison is needed

### Validator Notes

- `scripts/update/lib/validator.js` contains `validateAgentFiles`, `validateWorkflows`, `validateWorkflowStepStructure`, etc.
- Agent count validation likely derives from `AGENT_IDS.length` (7) and `WORKFLOW_NAMES.length` (22) from agent-registry — verify this is the case
- Step structure validation already enforces 4-6 step range (confirmed during Story 5-3 code review)
- If validator uses hardcoded counts, update them; if derived from registry, no changes needed

### File-Touch Map

| File | Action | Reason |
|------|--------|--------|
| `tests/unit/dead-end-detection.test.js` | CREATE | New dead-end route detection test (AC: 1,2,3) |
| `package.json` | EDIT | Version bump 1.5.2 → 1.6.0 (AC: 4) |
| `scripts/update/lib/validator.js` | VERIFY/EDIT | Confirm 7-agent validation (AC: 8) |
| `tests/unit/validator.test.js` | VERIFY | Confirm tests pass with 7 agents |

**DO NOT TOUCH** (already updated in previous stories):
- `README.md` — already updated in Story 5-3
- `CHANGELOG.md` — already has v1.6.0 entry from Story 5-3
- `docs/agents.md` — already updated in Story 5-3
- `_bmad/bme/_vortex/README.md` — already updated in Story 5-3
- `scripts/update/lib/agent-registry.js` — already has all 7 agents from Epic 1

### Project Structure Notes

- Alignment with unified project structure: test file goes in `tests/unit/` alongside existing test files
- Naming convention: `dead-end-detection.test.js` follows existing pattern (`validator.test.js`, `agent-registry.test.js`)
- No new directories needed
- No new dependencies needed

### Previous Story Intelligence (Story 5-3)

**Learnings to apply:**
- Use Edit tool for targeted changes, Write tool for complete new files
- Use Grep for verification after changes
- **Step counts are a common error source** — always verify actual file counts against documented counts
- File-touch map pattern prevents scope creep — do NOT modify files outside the map
- Code review found 9 wrong step counts in Story 5-3 — be precise with numeric claims

**Code review patterns that worked:**
- Cross-referencing documentation claims against actual filesystem state
- Running full test suite after every infrastructure change
- Checking for version consistency across all files

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 5.4] — Story ACs and FR48 coverage
- [Source: _bmad-output/planning-artifacts/prd.md#FR48] — "CI pipeline includes automated dead-end detection (grep + registry cross-check) on every commit"
- [Source: _bmad-output/planning-artifacts/prd.md#NFR4] — All existing tests continue to pass
- [Source: _bmad-output/planning-artifacts/prd.md#NFR26] — 83% line coverage threshold maintained
- [Source: _bmad-output/planning-artifacts/architecture.md#Wave 3 Test Expectations] — 7 agents, 22 workflows, step-file-count smoke test
- [Source: scripts/update/lib/agent-registry.js] — Single source of truth for agents/workflows
- [Source: tests/unit/agent-registry.test.js] — Existing registry validation patterns
- [Source: tests/unit/validator.test.js] — Existing validator test patterns (31 cases)
- [Source: tests/helpers.js] — Shared test utilities (PACKAGE_ROOT, config factories)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Node v25.5.0 had broken simdjson library link (libsimdjson.29 vs .30 installed); resolved by upgrading to Node v25.6.1 via `brew upgrade node`

### Completion Notes List

- **Task 1**: Created `tests/unit/dead-end-detection.test.js` with 9 tests across 3 describe blocks: registry-to-filesystem consistency (3 tests), Compass route validation (3 tests), bidirectional reachability (3 tests). Parses actual Compass routing tables from workflow final step files and cross-references against agent-registry.js. Exempts `vortex-navigation` from Compass section requirement (it IS the meta-routing workflow).
- **Task 2**: Bumped `package.json` version 1.5.2 → 1.6.0. Also updated README.md version badge (1.5.2 → 1.6.0) which Story 5-3 didn't update because version hadn't been bumped yet.
- **Task 3**: Verified validator.js is fully registry-driven — no hardcoded counts. All validation functions import from agent-registry.js (AGENT_FILES, AGENT_IDS, WORKFLOW_NAMES, WAVE3_WORKFLOW_NAMES). No code changes needed.
- **Task 4**: Full test suite green — 208 unit tests (199 + 9 new), 60 integration tests, lint clean, 88.45% line coverage (above 83% threshold).

### Change Log

- 2026-02-26: Story implementation complete — dead-end detection test created, version bumped to 1.6.0, validator verified, all tests pass
- 2026-02-26: Code review fixes — package-lock.json regenerated for 1.6.0, docs/development.md version+test counts updated, sprint-status.yaml added to File List

### File List

- `tests/unit/dead-end-detection.test.js` — CREATED: 9 Compass route integrity tests (FR48)
- `package.json` — MODIFIED: version 1.5.2 → 1.6.0
- `package-lock.json` — MODIFIED: regenerated for 1.6.0 (code review fix)
- `README.md` — MODIFIED: version badge 1.5.2 → 1.6.0
- `docs/development.md` — MODIFIED: version 1.5.2→1.6.0, test counts 130→208 unit / 54→60 integration (code review fix)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — MODIFIED: story status transitions
