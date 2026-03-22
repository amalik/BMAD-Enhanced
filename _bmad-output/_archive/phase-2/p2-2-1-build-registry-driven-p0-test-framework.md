# Story p2-2.1: Build Registry-Driven P0 Test Framework

Status: done

## Story

As a maintainer,
I want a P0 test framework that dynamically discovers agents from the registry and provides shared test harness, helpers, and assertion utilities,
So that adding a new agent to the registry automatically includes it in P0 validation without modifying test code.

## Acceptance Criteria

1. **Given** the agent registry at `scripts/update/lib/agent-registry.js` contains agent entries, **When** the P0 test framework initializes, **Then** it dynamically discovers all registered agents without hardcoded file lists (FR12)
2. **Given** the P0 test framework exists, **When** activation sequence tests run, **Then** the framework provides shared helpers for validating agent activation sequences — persona loading, config loading, menu display, error handling (FR7)
3. **Given** the P0 test framework exists, **When** workflow execution tests run, **Then** the framework provides shared helpers for validating workflow structure — step file existence, step count (4-6), standardized step names, workflow.md presence (FR8)
4. **Given** Emma and Wade are infrastructure agents with JS components, **When** their P0 tests are defined, **Then** the framework defines an infrastructure P0 template covering: activation validation + workflow structure validation + infrastructure-level integration checks (FR10)
5. **Given** Mila, Liam, Noah, Isla, Max are content-only agents, **When** their P0 tests are defined, **Then** the framework defines a content-only P0 template covering: activation validation + workflow structure validation (no infrastructure checks)
6. **Given** a contributor reads any P0 test file, **When** they examine the test code, **Then** they understand what each test validates without consulting external documentation — clear test names, descriptive assertion messages, no magic constants (NFR8)
7. **Given** a P0 test fails, **When** the failure is reported, **Then** the output identifies the specific agent name, the validation category (activation/workflow/integration), and the specific field or file that failed — not generic assertion errors (NFR2)
8. **Given** Phase 2 deliverables, **When** the P0 framework is implemented, **Then** it uses `node:test` + c8 with no additions to `package.json` dependencies or devDependencies (NFR7)
9. **Given** a new agent is added to the registry, **When** no test code is modified, **Then** the new agent is automatically discovered and included in P0 content-only validation (NFR5)
10. **Given** each agent produces workflow output, **When** tests validate structure, **Then** expected structural patterns are documented as part of framework setup — defining what workflow directories and step files must exist for each agent (FR8)

## Tasks / Subtasks

- [x] Task 1: Create P0 test helpers module — `tests/p0/helpers.js` (AC: 1, 2, 3, 7)
  - [x] 1.1: Create `tests/p0/` directory for P0-specific test infrastructure
  - [x] 1.2: Implement `discoverAgents()` — imports `AGENTS` from agent-registry.js, returns enriched agent objects with filesystem paths resolved (`agentFilePath`, `workflowNames`, `workflowDirs`)
  - [x] 1.3: Implement `loadAgentDefinition(agentId)` — reads agent `.md` file from `_bmad/bme/_vortex/agents/{agentId}.md`, parses YAML frontmatter (`name`, `description`), extracts XML activation block (persona fields, menu items, step count)
  - [x] 1.4: Implement `validateActivation(agent, agentDef)` — checks: persona fields match registry, menu items present (at least 5), activation steps present (7 mandatory), error handling steps exist
  - [x] 1.5: Implement `validateWorkflowStructure(workflowName)` — checks: workflow directory exists, `workflow.md` file exists, `steps/` subdirectory exists, step count is 4-6 files, step files follow `step-NN[-name].md` naming pattern
  - [x] 1.6: Implement assertion helpers — `assertAgentField`, `assertFileExists`, `assertDirExists` with diagnostic messages

- [x] Task 2: Create P0 framework test file — `tests/p0/p0-framework.test.js` (AC: 1, 6, 8, 9)
  - [x] 2.1: Test `discoverAgents()` returns exactly 7 agents matching registry (19 tests, 5 suites)
  - [x] 2.2: Test `discoverAgents()` returns no hardcoded values — introspects function source
  - [x] 2.3: Test `loadAgentDefinition()` for each agent — all 7 parse successfully
  - [x] 2.4: Test `validateActivation()` catches missing persona fields and insufficient menu items
  - [x] 2.5: Test `validateWorkflowStructure()` for lean-persona (6 steps) and research-convergence (5 steps)
  - [x] 2.6: Test `validateWorkflowStructure()` catches non-existent and invalid-step-count directories
  - [x] 2.7: Test assertion helpers produce diagnostic messages with agent name, id, field, and context

- [x] Task 3: Create P0 activation tests for all 7 agents — `tests/p0/p0-activation.test.js` (AC: 2, 4, 5, 10)
  - [x] 3.1: Uses `discoverAgents()` + `for...of` loop — zero hardcoded agent list (57 tests, 9 suites)
  - [x] 3.2: For each agent: verify agent definition file exists and loads without errors
  - [x] 3.3: For each agent: verify YAML frontmatter has `name` and `description` fields
  - [x] 3.4: For each agent: verify XML activation block contains `<agent>` tag with `id`, `name`, `title`, `icon` attributes
  - [x] 3.5: For each agent: verify `<persona>` section contains `role`, `identity`, `communication_style` fields
  - [x] 3.6: For each agent: verify `<menu>` section contains at least 5 items with `cmd` attributes
  - [x] 3.7: For each agent: verify activation has at least 7 numeric steps, including error handling in step 2
  - [x] 3.8: For each agent: verify agent `name` in XML matches registry `name`

- [x] Task 4: Create P0 workflow structure tests for all 22 workflows — `tests/p0/p0-workflow-structure.test.js` (AC: 3, 10)
  - [x] 4.1: Uses `WORKFLOWS` from registry + `for...of` loop — zero hardcoded workflow list (111 tests, 24 suites)
  - [x] 4.2: For each workflow: verify directory exists at `_bmad/bme/_vortex/workflows/{name}/`
  - [x] 4.3: For each workflow: verify `workflow.md` exists in workflow directory
  - [x] 4.4: For each workflow: verify `steps/` subdirectory exists
  - [x] 4.5: For each workflow: verify step count is between 4-6 (inclusive)
  - [x] 4.6: For each workflow: verify step files follow `step-NN[-name].md` naming pattern
  - [x] 4.7: ADJUSTED — "synthesize" final step convention not universal (5/22 don't follow it), removed as hard check

- [x] Task 5: Define infrastructure vs content-only template patterns (AC: 4, 5)
  - [x] 5.1: Created `tests/p0/templates.js` exporting `INFRASTRUCTURE_AGENTS`, `CONTENT_ONLY_AGENTS`, derived from registry
  - [x] 5.2: Documented infrastructure template pattern in JSDoc comments
  - [x] 5.3: Documented content-only template pattern in JSDoc comments
  - [x] 5.4: Exported `getAgentTemplate(agentId)` returning `'infrastructure'` or `'content-only'`

- [x] Task 6: Update package.json test scripts and verify (AC: 8)
  - [x] 6.1: Added `"test:p0": "node --test tests/p0/*.test.js"` to package.json scripts
  - [x] 6.2: `test:all` glob `tests/**/*.test.js` already includes P0 tests — no change needed
  - [x] 6.3: Verified `npm test` still runs only `tests/unit/*.test.js` (248 tests)
  - [x] 6.4: Verified `npm run test:p0` runs all P0 tests (187 tests)
  - [x] 6.5: Verified `npm run test:all` runs unit + integration + P0 tests (495 tests)
  - [x] 6.6: Verified `npm run lint` passes clean (0 errors, 0 warnings)
  - [x] 6.7: Verified no new dependencies added to package.json

- [x] Task 7: Validation — verify all ACs and run full test suite (AC: all)
  - [x] 7.1: `npm run test:p0` — 187 P0 tests pass (19 framework + 57 activation + 111 workflow structure)
  - [x] 7.2: `npm test` — 248 existing unit tests pass (zero regressions)
  - [x] 7.3: `npm run test:all` — 495 total tests pass (248 unit + 60 integration + 187 P0)
  - [x] 7.4: `npm run lint` — clean on all files including new tests/p0/ directory
  - [x] 7.5: `discoverAgents()` returns 7 agents dynamically from registry (AC 1, 9)
  - [x] 7.6: No new entries in package.json dependencies/devDependencies (AC 8)

## Dev Notes

### Architecture Compliance

- **Language:** JavaScript ES2020+ — NO TypeScript
- **Test framework:** `node:test` + `node:assert/strict` — NOT Jest
- **Coverage:** c8 (`npm run test:coverage`)
- **No new dependencies:** Use only existing deps: `chalk@^4.1.2`, `fs-extra@^11.3.3`, `js-yaml@^4.1.0`
- **Linting:** Must pass `npm run lint` (ESLint)
- **File naming:** kebab-case for JS files, camelCase for variables

### Critical: Registry-Driven Dynamic Discovery

The P0 framework MUST derive ALL agent and workflow lists from `scripts/update/lib/agent-registry.js`:

```javascript
const { AGENTS, WORKFLOWS, AGENT_IDS, WORKFLOW_NAMES } = require('../../scripts/update/lib/agent-registry');
```

**DO NOT hardcode** agent names, IDs, counts, or workflow names anywhere in test code. When an 8th agent is added to `AGENTS`, the P0 framework must discover and test it automatically.

**Proven pattern from Phase 2 Epic 1:** `scripts/docs-audit.js` uses this exact approach — zero hardcoded values, all expectations derived from registry. The P0 framework should follow the same import pattern.

### Agent Definition File Structure

Agent definitions live at `_bmad/bme/_vortex/agents/{agentId}.md`. Each file has:

1. **YAML frontmatter** (lines 1-4): `name` (lowercase), `description` (title case)
2. **Activation XML block** (inside markdown code fence): `<agent id="..." name="..." title="..." icon="...">`
3. **Key sections within XML:**
   - `<activation>` — 7 mandatory steps (step n="1" through n="7")
   - `<persona>` — `role`, `identity`, `communication_style`, `principles`
   - `<menu>` — 7-8 items with `cmd` attributes
   - `<menu-handlers>` — `exec`, `data`, `workflow` handlers
   - `<rules>` — agent-specific behavioral rules

**Parsing approach:** Use regex or simple string parsing — NOT a full XML parser. The XML is embedded in markdown code fences. Look for `<agent ` to find start, parse attributes. Look for `<persona>` block, `<menu>` items.

### Persona Field Mapping: Registry vs Agent Definition

The registry and agent definitions use slightly different persona field names:

| Registry (`agent-registry.js`) | Agent Definition (`.md`) |
|-------------------------------|--------------------------|
| `persona.role` | `<role>` |
| `persona.identity` | `<identity>` |
| `persona.communication_style` | `<communication_style>` |
| `persona.expertise` | `<principles>` |

**Note:** The 4th field is named differently (`expertise` in registry vs `principles` in agent file). P0 tests should verify the first 3 fields match. The 4th field (`expertise`/`principles`) contains similar but not identical content — verify presence, not exact match.

### Workflow Directory Structure

Each workflow lives at `_bmad/bme/_vortex/workflows/{workflow-name}/` with:

```
{workflow-name}/
├── steps/
│   ├── step-01-*.md     (first step)
│   ├── step-02-*.md     (second step)
│   ├── ...
│   └── step-0N-synthesize.md  (final step — always contains "synthesize")
├── workflow.md           (required — workflow definition)
├── {name}.template.md    (optional — output template)
└── validate.md           (optional — validation checklist)
```

**Verified step counts (filesystem):**
- lean-persona: 6 steps (Emma)
- research-convergence: 5 steps (Mila)
- mvp: 6 steps (Wade)
- Step naming: `step-01-define-job.md`, `step-02-current-solution.md`, etc.
- Final step always contains "synthesize" in filename

**Note:** Some workflows (e.g., `lean-persona`) have `{name}.template.md` and `validate.md`. Others (e.g., `research-convergence`) only have `workflow.md` and `steps/`. P0 tests should validate only the required elements: `workflow.md`, `steps/`, step count 4-6, step naming pattern.

### Infrastructure vs Content-Only Template

**Infrastructure agents (Emma, Wade):** These agents have JavaScript components in `scripts/` that perform installation, validation, and update operations. "Infrastructure-level integration" means testing:
- Config loading from `config.yaml` (error handling paths)
- Menu handler routing (workflow exec, data loading)
- Agent file and workflow file existence verification

**Content-only agents (Isla, Mila, Liam, Noah, Max):** These agents are pure markdown definitions with no JS components. Testing covers:
- Agent definition file parsing (YAML frontmatter, XML activation block)
- Workflow directory structure validation
- Persona field presence and consistency with registry

**Decision for Story 2.1:** Define the template patterns and helper functions. Stories 2.2 (Emma) and 2.3 (Wade) will implement the full infrastructure tests. Story 3.1 (Epic 3) will implement the content-only tests for the remaining 5 agents.

### Test File Organization

Place P0 tests in a dedicated `tests/p0/` directory to keep them separate from existing unit/integration tests:

```
tests/
├── helpers.js                    (UNCHANGED — existing test helpers)
├── p0/
│   ├── helpers.js                (NEW — P0-specific helpers: discoverAgents, loadAgentDefinition, etc.)
│   ├── templates.js              (NEW — infrastructure vs content-only classification)
│   ├── p0-framework.test.js      (NEW — tests for P0 framework itself)
│   ├── p0-activation.test.js     (NEW — activation tests for all 7 agents)
│   └── p0-workflow-structure.test.js (NEW — workflow structure tests for all 22 workflows)
├── unit/                         (UNCHANGED)
└── integration/                  (UNCHANGED)
```

**Why `tests/p0/` instead of `tests/unit/`?** P0 tests validate the installed Vortex content (agent definitions, workflow structures) — they're not unit tests of application code. Separating them gives the maintainer control over when to run P0 validation vs unit tests. The `npm run test:p0` script provides targeted execution.

### Existing Test Helpers to Leverage

From `tests/helpers.js` (DO NOT modify — create separate P0 helpers):

| Helper | Use in P0 |
|--------|-----------|
| `PACKAGE_ROOT` | Resolve paths to `_bmad/bme/_vortex/` |
| `createTempDir(prefix)` | Create isolated dirs for negative tests (wrong step counts, missing files) |
| `runScript(script, args, opts)` | Not needed for P0 framework story (no CLI scripts yet) |
| `fullConfig(overrides)` | May be useful for config loading tests in Stories 2.2/2.3 |

### Current Reality (from registry — verified against filesystem)

- **7 agents:** Emma (`contextualization-expert`), Isla (`discovery-empathy-expert`), Mila (`research-convergence-specialist`), Liam (`hypothesis-engineer`), Wade (`lean-experiments-specialist`), Noah (`production-intelligence-specialist`), Max (`learning-decision-expert`)
- **22 workflows:** lean-persona, product-vision, contextualize-scope, empathy-map, user-interview, user-discovery, research-convergence, pivot-resynthesis, pattern-mapping, hypothesis-engineering, assumption-mapping, experiment-design, mvp, lean-experiment, proof-of-concept, proof-of-value, signal-interpretation, behavior-analysis, production-monitoring, learning-card, pivot-patch-persevere, vortex-navigation
- **7 agent files:** All present at `_bmad/bme/_vortex/agents/*.md`
- **22 workflow dirs:** All present at `_bmad/bme/_vortex/workflows/*/` (plus `_deprecated/` which should be excluded)
- **Package version:** 1.6.4
- **Test count:** 248 (40 docs-audit + 208 existing)
- **Test framework:** `node:test` + `node:assert/strict` + c8

### Previous Story Learnings (p2-1-4 and Epic 1 Retrospective)

- **Registry-driven pattern is proven:** `scripts/docs-audit.js` imports from `agent-registry.js` and derives all expectations dynamically. P0 framework should follow the same pattern.
- **Filesystem-verify ALL factual claims:** Epic 1 retrospective action item — verify paths, file existence, and structural claims against actual filesystem before marking tasks complete. Do NOT write tests from memory.
- **Adversarial code review will follow:** Expect 3-7 findings. Common patterns: factual accuracy errors, missing file list entries, incomplete edge case handling.
- **sprint-status.yaml in File List:** Epic 1 retro identified this as a recurring blind spot — include it in File List when modified.
- **Zero "looks good" reviews expected:** Every story in Epic 1 had code review findings. Budget for revision time.

### Edge Cases and Gotchas

1. **`_deprecated` workflow directory:** The workflow directory contains `_bmad/bme/_vortex/workflows/_deprecated/` which is NOT a valid workflow. Filter it out using: `WORKFLOW_NAMES` from registry (only lists 22 valid workflows).
2. **Agent XML is inside markdown code fences:** The `<agent>` XML block is wrapped in triple-backtick code fences (` ```xml ... ``` `). When parsing, strip the code fence markers first.
3. **Step naming inconsistency:** Wave 1-2 workflows (Emma, Isla, Wade, Max) use domain-specific step names (e.g., `step-01-define-job.md`). Wave 3 workflows (Mila, Liam, Noah) use standardized names (e.g., `step-01-setup.md`). P0 tests should validate the common pattern (`step-NN-*.md`), not specific step names.
4. **Workflow step count varies:** lean-persona has 6, research-convergence has 5. Valid range is 4-6 per architecture decision D8. Test the range, not a fixed count.
5. **Final step name:** All workflows end with a step containing "synthesize" in the filename. This is a structural convention, not enforced by the system.

### Files to Create

- `tests/p0/helpers.js` (NEW — P0-specific helper functions)
- `tests/p0/templates.js` (NEW — infrastructure vs content-only classification)
- `tests/p0/p0-framework.test.js` (NEW — framework self-tests)
- `tests/p0/p0-activation.test.js` (NEW — activation validation for all 7 agents)
- `tests/p0/p0-workflow-structure.test.js` (NEW — workflow structure validation for all 22 workflows)

### Files to Modify

- `package.json` (MODIFY — add `test:p0` script, update `test:all` glob)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (MODIFY — story status transitions)

### Project Structure Notes

- P0 tests go in `tests/p0/` — new subdirectory alongside `tests/unit/` and `tests/integration/`
- P0 helpers are separate from `tests/helpers.js` to avoid polluting existing test infrastructure
- No changes to `scripts/`, `_bmad/`, `docs/`, or any existing source files
- Test scripts in package.json follow existing pattern: `node --test tests/p0/*.test.js`

### References

- [Source: _bmad-output/planning-artifacts/epics-phase2.md — Epic 2, Story 2.1, lines 299-322]
- [Source: _bmad-output/planning-artifacts/prd-phase2.md — FR7, FR8, FR10, FR12, NFR1-3, NFR5, NFR7-8]
- [Source: scripts/update/lib/agent-registry.js — AGENTS (7 entries), WORKFLOWS (22 entries), exports]
- [Source: _bmad/bme/_vortex/agents/contextualization-expert.md — Agent definition structure, activation XML]
- [Source: _bmad/bme/_vortex/workflows/lean-persona/steps/ — 6 step files, step-06-synthesize.md]
- [Source: _bmad/bme/_vortex/workflows/research-convergence/steps/ — 5 step files, step-05-synthesize.md]
- [Source: _bmad/bme/_vortex/workflows/mvp/steps/ — 6 step files, step-06-synthesize.md]
- [Source: tests/helpers.js — PACKAGE_ROOT, createTempDir, fullConfig, runScript (existing test utilities)]
- [Source: tests/unit/docs-audit.test.js — node:test pattern with describe/it/assert]
- [Source: _bmad-output/implementation-artifacts/p2-epic-1-retro-2026-02-28.md — Team agreements, action items carried to Epic 2]
- [Source: scripts/docs-audit.js — Registry-driven discovery pattern (zero hardcoded values)]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

### Completion Notes List

- Step file naming pattern updated from `step-NN-*.md` to `step-NN[-name].md` to support bare `step-NN.md` files (found in lean-experiment, proof-of-concept, proof-of-value workflows)
- "Synthesize" final step convention removed as hard check — 5/22 workflows don't follow it (lean-experiment, proof-of-concept, proof-of-value use bare `step-06.md`; pivot-patch-persevere uses `step-06-action-plan.md`; vortex-navigation uses `step-06-navigation-plan.md`)
- Subtask 4.7 adjusted: story dev notes claimed all final steps contain "synthesize" but filesystem verification showed this is only true for 17/22 workflows
- Unused `WORKFLOW_NAMES` import removed from helpers.js (only `AGENTS` and `WORKFLOWS` needed)
- Unused `PACKAGE_ROOT` import removed from p0-framework.test.js (lint clean)

**Code review fixes (7 findings — 3 MEDIUM, 4 LOW):**
- M1: Added 5 tests for templates.js (INFRASTRUCTURE_AGENTS, CONTENT_ONLY_AGENTS, getAgentTemplate, coverage completeness, unknown agent default)
- M2: Fixed stale JSDoc in loadAgentDefinition — removed phantom `xml` field from @returns
- M3: Added inline comment documenting why persona validation is presence-only (format differences between registry and XML)
- L1: Replaced 56 redundant loadAgentDefinition calls with `before()` hooks (1 load per agent)
- L2: Hoisted duplicated `stepPattern` regex to module-level `STEP_PATTERN` constant
- L3: Added `tests/p0/*.test.js` to `test:coverage` script
- L4: Changed inconsistent `valid: issues.length === 0` to explicit `valid: false` in validateWorkflowStructure early return

### Change Log

- Created tests/p0/ directory with 5 files (helpers.js, templates.js, 3 test files)
- Added `test:p0` npm script; added P0 tests to `test:coverage`; `test:all` glob already covered P0 tests
- Total P0 test count: 192 (24 framework + 57 activation + 111 workflow structure)
- Total project test count: 500 (248 unit + 60 integration + 192 P0)

### File List

- tests/p0/helpers.js (NEW — P0-specific helper functions: discoverAgents, loadAgentDefinition, validateActivation, validateWorkflowStructure, assertion helpers)
- tests/p0/templates.js (NEW — infrastructure vs content-only agent classification with getAgentTemplate)
- tests/p0/p0-framework.test.js (NEW — 24 framework self-tests across 6 suites)
- tests/p0/p0-activation.test.js (NEW — 57 activation validation tests for all 7 agents across 9 suites)
- tests/p0/p0-workflow-structure.test.js (NEW — 111 workflow structure tests for all 22 workflows across 24 suites)
- package.json (MODIFIED — added test:p0 script, updated test:coverage to include P0)
- _bmad-output/implementation-artifacts/sprint-status.yaml (MODIFIED — story status transitions)
