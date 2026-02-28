# Story p2-2.3: P0 Activation & Workflow Tests for Wade (Infrastructure Template Reuse)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a maintainer,
I want automated P0 tests validating Wade's activation sequence, workflow execution output, and infrastructure-level integration,
So that both infrastructure agents are validated and the infrastructure P0 template is proven reusable with minimal adaptation.

## Acceptance Criteria

1. **Given** the infrastructure P0 template from Story 2.2 (Emma), **When** the maintainer runs P0 tests for Wade, **Then** activation sequence tests verify Wade loads correctly with expected persona, menu, and instructions (FR7)
2. **Given** Wade's 4 workflows exist on disk (mvp, lean-experiment, proof-of-concept, proof-of-value), **When** workflow execution tests run, **Then** they verify Wade produces well-formed output matching expected schema — workflow.md frontmatter, template files, step cross-references (MVP only), synthesize step (MVP only), navigation (all) (FR8)
3. **Given** Wade is an infrastructure agent with JS components, **When** infrastructure integration tests run, **Then** they validate the contract between Wade's registry entry and his agent definition file — persona field cross-validation, workflow assignment accuracy, derived array inclusion (FR10)
4. **Given** all Wade P0 tests are deterministic, **When** they run repeatedly without code changes, **Then** they produce consistent results — zero flaky tests (NFR1)
5. **Given** the full P0 suite budget is 5 minutes for all 7 agents, **When** Wade's P0 suite runs, **Then** it completes within its proportional share (~43 seconds) (NFR3)
6. **Given** a Wade P0 test fails, **When** the failure is reported, **Then** the output identifies: "Wade (lean-experiments-specialist)" + the validation category (activation/workflow/infrastructure) + the specific field or file that failed (NFR2)

## Tasks / Subtasks

- [x] Task 1: Create Wade activation deep-dive tests (AC: 1, 4, 6)
  - [x] 1.1: Create `tests/p0/p0-wade.test.js` with `'use strict'` + `node:test` + `node:assert/strict` imports
  - [x] 1.2: Import from `./helpers` (loadAgentDefinition, PACKAGE_ROOT, AGENTS_DIR, WORKFLOWS_DIR) and `../../scripts/update/lib/agent-registry` (AGENTS, WORKFLOWS, AGENT_IDS, AGENT_FILES, WAVE3_WORKFLOW_NAMES)
  - [x] 1.3: Describe suite "P0 Wade: Activation Sequence" — load Wade's definition once in `before()` hook using `loadAgentDefinition('lean-experiments-specialist')`
  - [x] 1.4: Test Wade's persona ROLE contains "Validated Learning Expert" (agent file value verification)
  - [x] 1.5: Test Wade's persona IDENTITY contains "Externalize" stream reference
  - [x] 1.6: Test Wade's persona COMMUNICATION_STYLE contains characteristic phrase (e.g., "riskiest assumption" or "smallest experiment")
  - [x] 1.7: Test Wade has exactly 9 menu items with specific cmd triggers: MH, CH, ME, LE, PC, PV, VE, PM, DA
  - [x] 1.8: Test Wade's 6 exec-path menu items (ME, LE, PC, PV, VE, PM) reference files that exist on disk — resolve `{project-root}` to actual path, verify with `fs.existsSync`
  - [x] 1.9: Test Wade's activation step 2 contains config.yaml loading and error handling (verify specific "config.yaml" reference and "Configuration Error" or "STOP" text)
  - [x] 1.10: Test Wade's rules section exists and contains at least 5 rules

- [x] Task 2: Create Wade workflow execution output tests (AC: 2, 4, 6)
  - [x] 2.1: Describe suite "P0 Wade: Workflow Execution Output"
  - [x] 2.2: For each of Wade's 4 workflows (mvp, lean-experiment, proof-of-concept, proof-of-value): test workflow.md exists and contains frontmatter with `type:`, `description:`, and `author:` fields
  - [x] 2.3: For each workflow: test template file exists (`{workflow-name}.template.md`)
  - [x] 2.4: For each workflow: test template file contains expected placeholder variables (`{variable-name}` single-brace pattern)
  - [x] 2.5: For MVP workflow ONLY: test steps 01-05 reference the NEXT step (steps use `## Next Step` section with full `{project-root}/...` path). Skip for stub workflows (lean-experiment, proof-of-concept, proof-of-value have placeholder step content that lacks cross-references).
  - [x] 2.6: For MVP workflow ONLY: test final step contains artifact generation guidance ("synthesize", "final", or "artifact"). Skip for stub workflows (their step-06 files contain "[Content for step 6]" placeholder text).
  - [x] 2.7: For each workflow: test final step suggests next workflows (Vortex Compass section — all 4 workflows have this with "next" references)
  - [x] 2.8: Verify all 4 workflows have exactly 6 steps each

- [x] Task 3: Create Wade infrastructure integration tests (AC: 3, 4, 6)
  - [x] 3.1: Describe suite "P0 Wade: Infrastructure Integration"
  - [x] 3.2: Test Wade's registry entry exists — find entry in AGENTS where `id === 'lean-experiments-specialist'`, verify truthy
  - [x] 3.3: Test Wade's registry persona has all 4 fields: role, identity, communication_style, expertise — all non-empty strings
  - [x] 3.4: Test Wade's registry stream is "Externalize"
  - [x] 3.5: Test WORKFLOWS contains exactly 4 entries with `agent === 'lean-experiments-specialist'` — names match ['mvp', 'lean-experiment', 'proof-of-concept', 'proof-of-value']
  - [x] 3.6: Test Wade's ID ('lean-experiments-specialist') appears in derived AGENT_IDS array
  - [x] 3.7: Test Wade's file ('lean-experiments-specialist.md') appears in derived AGENT_FILES array
  - [x] 3.8: Test Wade is NOT in WAVE3_WORKFLOW_NAMES (Wave 1 agent, not Wave 3) — derive workflow names from registry, not hardcoded constant (M3 fix from Emma review)
  - [x] 3.9: Test persona cross-validation: registry `persona.role` keyword appears in agent file `<role>` content (shared keyword: "Validated Learning" — registry has "Validated Learning Expert", agent file has "Validated Learning Expert")
  - [x] 3.10: Test persona cross-validation: registry `persona.communication_style` keyword appears in agent file `<communication_style>` content (shared keyword: "validated learning" — both contain this exact phrase)
  - [x] 3.11: Test agent tag `name` attribute ("Wade") matches registry `name` field exactly
  - [x] 3.12: Test agent tag `icon` attribute matches registry `icon` field (both use test tube emoji)

- [x] Task 4: Run full validation and verify (AC: all)
  - [x] 4.1: Run `npm run test:p0` — 271 P0 tests pass (231 existing + 40 new Wade tests)
  - [x] 4.2: Run `npm test` — 248 existing unit tests pass (zero regressions)
  - [x] 4.3: Run `npm run test:all` — all tests pass
  - [x] 4.4: Run `npm run lint` — zero errors, zero warnings
  - [x] 4.5: Verify Wade P0 suite timing — ~21ms (well under 43-second budget)
  - [x] 4.6: Verify all assertion messages include "Wade (lean-experiments-specialist)" for diagnostic identification (AC 6)

## Dev Notes

### Architecture Compliance

- **Language:** JavaScript ES2020+ — NO TypeScript
- **Test framework:** `node:test` + `node:assert/strict` — NOT Jest
- **Coverage:** c8 (`npm run test:coverage` includes P0 tests)
- **No new dependencies:** Use only existing deps
- **Linting:** Must pass `npm run lint` (ESLint)
- **File naming:** kebab-case for JS files, camelCase for variables

### Critical: Use Existing P0 Infrastructure

Story 2.1 created the P0 framework in `tests/p0/`. Wade's tests MUST use the established helpers:

```javascript
const { loadAgentDefinition, PACKAGE_ROOT, AGENTS_DIR, WORKFLOWS_DIR } = require('./helpers');
const { AGENTS, WORKFLOWS, AGENT_IDS, AGENT_FILES, WAVE3_WORKFLOW_NAMES } = require('../../scripts/update/lib/agent-registry');
```

**DO NOT duplicate** any logic from `helpers.js` — call the existing functions. The `loadAgentDefinition()` function already parses YAML frontmatter, agent tag attributes, persona fields, menu items, activation steps, and error handling.

### Critical: Wade Has Mixed Workflow Implementation Status

This is the KEY adaptation from Emma's template. Wade's 4 workflows have different implementation levels:

| Workflow | Step Content | Cross-Refs | Synthesize | Vortex Compass |
|----------|-------------|------------|------------|----------------|
| **mvp** | Fully implemented (descriptive step names) | YES | YES (step-06-synthesize.md) | YES |
| lean-experiment | Placeholder stubs ("[Content for step N]") | NO | NO (just placeholder text) | YES |
| proof-of-concept | Placeholder stubs ("[PoC step N content]") | NO | NO (just placeholder text) | YES |
| proof-of-value | Placeholder stubs ("[PoV step N content]") | NO | NO (just placeholder text) | YES |

**Consequence for tests:**
- **5 common tests** run for ALL 4 workflows: workflow.md fields, template exists, template placeholders, final step navigation (Vortex Compass), step count
- **2 content tests** run ONLY for MVP: step cross-references, synthesize/artifact content
- Total workflow tests: 5 × 4 + 2 × 1 = 22

**Implementation approach:** Use a constant to distinguish:
```javascript
const WADE_WORKFLOW_NAMES = ['mvp', 'lean-experiment', 'proof-of-concept', 'proof-of-value'];
const MVP_WORKFLOW = 'mvp'; // Only fully-implemented workflow
```

Run the for-loop over all 4 workflows with common tests inside the loop. Add the 2 MVP-only tests either as conditional checks inside the loop (`if (wfName === MVP_WORKFLOW)`) or as a separate describe block for MVP content validation.

### Wade's Agent File Structure (Verified)

Agent definition at `_bmad/bme/_vortex/agents/lean-experiments-specialist.md`:

- **YAML frontmatter:** `name: "lean experiments specialist"`, `description: "Lean Experiments Specialist"`
- **Agent tag:** `<agent id="lean-experiments-specialist.agent.yaml" name="Wade" title="Lean Experiments Specialist" icon="🧪">`
- **Persona fields:** `<role>Validated Learning Expert + First Externalization Designer</role>`, `<identity>...Externalize stream...</identity>`, `<communication_style>...What's the riskiest assumption?...</communication_style>`, `<principles>7 bullet points</principles>`
- **Menu:** 9 items — MH (menu help), CH (chat), ME (mvp), LE (lean-experiment), PC (proof-of-concept), PV (proof-of-value), VE (validate), PM (party-mode), DA (dismiss)
- **Activation:** 7 mandatory steps + 1 {HELP_STEP}. Step 2 loads config.yaml with "Configuration Error" handling.
- **Menu exec paths:** ME → `_bmad/bme/_vortex/workflows/mvp/workflow.md`, LE → `lean-experiment/workflow.md`, PC → `proof-of-concept/workflow.md`, PV → `proof-of-value/workflow.md`, VE → `mvp/validate.md`, PM → `_bmad/core/workflows/party-mode/workflow.md`
- **Rules:** 8 rules including "Build the smallest thing", "Stay in character", language handling

### Wade's Workflows (Verified)

| Workflow | Steps | Step Naming | Template | Final Step |
|----------|-------|-------------|----------|------------|
| mvp | 6 (step-01-riskiest-assumption through step-06-synthesize) | Descriptive | mvp.template.md | step-06-synthesize.md |
| lean-experiment | 6 (step-01 through step-06) | Generic | lean-experiment.template.md | step-06.md |
| proof-of-concept | 6 (step-01 through step-06) | Generic | proof-of-concept.template.md | step-06.md |
| proof-of-value | 6 (step-01 through step-06) | Generic | proof-of-value.template.md | step-06.md |

All 4 workflows:
- Have 6 steps each
- Template files use `{variable-name}` placeholder syntax (single curly braces)
- Final steps have Vortex Compass navigation sections with "Consider next..." tables
- Only MVP has fully-implemented step content with cross-references and synthesize guidance

### Wade's Registry Entry (Verified)

```javascript
{
  id: 'lean-experiments-specialist',
  name: 'Wade',
  icon: '\u{1F9EA}',  // 🧪
  title: 'Lean Experiments Specialist',
  stream: 'Externalize',
  persona: {
    role: 'Lean Startup + Validated Learning Expert',
    identity: '...Lean Startup practitioner...Externalize stream...',
    communication_style: '...Let\'s test that assumption...validated learning...',
    expertise: '...Master of Lean Startup...Build the smallest thing...',
  },
}
```

**Note:** Registry `persona.role` is "Lean Startup + Validated Learning Expert" and agent file `<role>` is "Validated Learning Expert + First Externalization Designer". Both contain the exact phrase "Validated Learning" — this is a stronger match than Emma's shared keyword ("Product"), since it's a 2-word exact phrase.

### Persona Cross-Validation Strategy

The registry and agent definition describe the same persona but with different wording. P0 tests should verify the CONTRACT holds:

- **Role:** Both contain "Validated Learning" phrase (registry: "**Validated Learning** Expert", agent: "**Validated Learning** Expert + First Externalization Designer") — validates they describe the same domain
- **Communication style:** Both reference "validated learning" lowercase (registry: "MVPs, pivots, **validated learning**", agent: "MVPs, pivot-or-persevere decisions, and **validated learning**") — validates they describe the same interaction pattern
- **DO NOT test exact string equality** between registry and agent file — they use different formats (single-line escaped vs multi-line XML)

### Infrastructure Template Reusability

This story validates that Emma's 3-describe-block infrastructure P0 template is reusable for Wade with minimal adaptation:

```
describe('P0 Wade: Activation Sequence', () => { ... });     // FR7
describe('P0 Wade: Workflow Execution Output', () => { ... }); // FR8
describe('P0 Wade: Infrastructure Integration', () => { ... }); // FR10
```

**Minimal adaptations required:**
1. Agent ID, workflow names, persona keywords — expected per-agent differences
2. Menu item count (9 vs Emma's 8) and exec path count (6 vs 5) — Wade has 4 workflows vs 3
3. Workflow content-level tests limited to MVP — only adaptation due to stub workflows
4. Stream value ("Externalize" vs "Contextualize") — expected per-agent difference

### Menu Item exec Path Resolution

Menu items use `{project-root}` placeholder in exec paths. To test that exec paths point to real files:

```javascript
const execRegex = /<item\s[^>]*exec="([^"]+)"[^>]*>/g;
// Replace {project-root} with actual path
const resolved = execPath.replace(/\{project-root\}/g, PACKAGE_ROOT);
assert.ok(fs.existsSync(resolved), `Exec path not found: ${resolved}`);
```

Extract exec paths from the raw agent file content — `loadAgentDefinition()` doesn't return exec paths, so parse them directly from the file.

### Edge Cases and Gotchas

1. **Agent tag `id` field:** Wade's agent tag has `id="lean-experiments-specialist.agent.yaml"` (includes `.agent.yaml` suffix), while the registry `id` is `lean-experiments-specialist` (no suffix). Test the `name` attribute match, not `id`.
2. **Menu item cmd parsing:** The `cmd` attribute contains fuzzy match alternatives (e.g., `cmd="ME or fuzzy match on mvp"`). The existing `loadAgentDefinition()` only extracts the `cmd` string. To verify specific triggers, check if the cmd string starts with the expected shortcode (ME, LE, PC, etc.).
3. **Rules section parsing:** `loadAgentDefinition()` does NOT extract rules. Parse `<r>` tags directly from agent file content for rule count validation.
4. **Template placeholder syntax:** Wade's workflow templates use `{variable-name}` (single curly braces), NOT `{{variable-name}}`. The regex should match single-brace patterns: `/\{[a-z][-a-z]*\}/`
5. **validate.md for mvp:** This file exists for the VE menu item exec path. Test file existence, not content completeness.
6. **Party mode exec path:** PM points to `_bmad/core/workflows/party-mode/workflow.md` which is OUTSIDE the `_vortex` directory. Still a valid path.
7. **Step naming inconsistency:** MVP uses descriptive names (`step-01-riskiest-assumption.md`), other 3 use generic names (`step-01.md`). The `STEP_PATTERN = /^step-\d{2}(-[^.]+)?\.md$/` handles both patterns.
8. **Dynamic final step discovery:** Use the M1 fix from Emma's review — find the last step file dynamically from sorted directory listing. This correctly finds `step-06-synthesize.md` for MVP and `step-06.md` for others.

### Previous Story Learnings (p2-2-2)

- **Apply all 3 code review fixes from the start:** M1 (dynamic final step), M2 (vacuous pass guard), M3 (registry-derived WAVE3 check) — these are already in Emma's final test file, copy the patterns
- **before() hooks reduce file I/O:** Use `before()` to load agent definition once per describe block, not per test
- **Filesystem-verify all factual claims:** The story Dev Notes above have been verified against the actual filesystem
- **Module-level constants for shared patterns:** Use `const STEP_PATTERN` pattern
- **Diagnostic assertion messages:** Every `assert.*` call MUST include "Wade (lean-experiments-specialist):" prefix
- **Exec-path regex scoped to `<item>` tags:** The regex `/<item\s[^>]*exec="([^"]+)"[^>]*>/g` prevents matching handler documentation. DO NOT use the simpler `exec="([^"]+)"` regex.
- **Double agent file read is necessary:** `loadAgentDefinition()` doesn't return raw content. Raw content needed for exec paths and rules. This is an accepted limitation.

### Files to Create

- `tests/p0/p0-wade.test.js` (NEW — Wade-specific P0 activation, workflow, and infrastructure tests)

### Files to Modify

- `_bmad-output/implementation-artifacts/sprint-status.yaml` (MODIFY — story status transitions)

### Project Structure Notes

- Single test file `p0-wade.test.js` in existing `tests/p0/` directory — no new directories needed
- Follows established pattern from `p0-emma.test.js` (infrastructure template)
- Test file imported through existing `npm run test:p0` glob: `node --test tests/p0/*.test.js`
- No changes to `helpers.js` or `templates.js` unless a missing export is discovered during implementation

### References

- [Source: _bmad-output/planning-artifacts/epics-phase2.md — Epic 2, Story 2.3]
- [Source: _bmad-output/planning-artifacts/prd-phase2.md — FR7, FR8, FR10, NFR1, NFR2, NFR3]
- [Source: scripts/update/lib/agent-registry.js — Wade entry (lines 58-68), WORKFLOWS (lines 111-114), derived exports]
- [Source: _bmad/bme/_vortex/agents/lean-experiments-specialist.md — Wade agent definition, persona, menu, activation]
- [Source: _bmad/bme/_vortex/workflows/mvp/ — 6 steps (descriptive names), template, validate.md]
- [Source: _bmad/bme/_vortex/workflows/lean-experiment/ — 6 steps (stub), template]
- [Source: _bmad/bme/_vortex/workflows/proof-of-concept/ — 6 steps (stub), template]
- [Source: _bmad/bme/_vortex/workflows/proof-of-value/ — 6 steps (stub), template]
- [Source: tests/p0/p0-emma.test.js — Infrastructure template pattern with M1/M2/M3 fixes]
- [Source: tests/p0/helpers.js — loadAgentDefinition, AGENTS_DIR, WORKFLOWS_DIR, PACKAGE_ROOT]
- [Source: tests/p0/templates.js — INFRASTRUCTURE_AGENTS, getAgentTemplate]
- [Source: _bmad-output/implementation-artifacts/p2-2-2-p0-activation-workflow-tests-for-emma.md — Previous story learnings and code review fixes]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (claude-opus-4-6)

### Debug Log References

None — clean implementation with zero failures.

### Completion Notes List

1. Created `tests/p0/p0-wade.test.js` — 40 tests across 3 describe blocks following Emma's infrastructure template
2. Activation Sequence (7 tests): persona role/identity/communication_style, 9 menu items, 6 exec paths, step 2 config loading, 8 rules
3. Workflow Execution Output (22 tests): 5 common tests × 4 workflows + 2 MVP-only content tests (cross-references, synthesize)
4. Infrastructure Integration (11 tests): registry entry, persona fields, stream, workflow assignments, derived arrays, WAVE3 exclusion, persona cross-validation (2), agent tag name/icon match
5. All 3 Emma code review fixes (M1/M2/M3) applied from the start — dynamic final step, vacuous pass guard, registry-derived WAVE3 check
6. Mixed workflow status handled correctly — content tests (cross-references, synthesize) run only for MVP; common tests run for all 4
7. Test results: 271 P0 pass, 248 unit pass, lint clean, ~21ms total Wade suite time

### Code Review Fixes (3 MEDIUM issues)

8. **M1 (story meta):** Fixed File List line count from "267 lines" to "350 lines"
9. **M2 (test code):** Added `before()` hook per workflow describe block to cache `stepFiles` — eliminates 4 redundant `fs.readdirSync` calls per MVP workflow and 2 per stub workflow
10. **M3 (test code):** Added `stepsDir` existence guard in `before()` hook with diagnostic assertion message — prevents raw `ENOENT` errors, satisfies NFR2 diagnostic messaging requirement
11. **L2 (test code):** Added explanatory comment above `if (wfName === MVP_WORKFLOW)` guard documenting why stub workflows skip cross-reference and synthesize tests

### File List

- `tests/p0/p0-wade.test.js` (NEW — 350 lines, 40 tests)
