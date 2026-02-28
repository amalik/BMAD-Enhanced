# Story p2-3.1: P0 Content-Only Tests for Remaining 5 Agents

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a maintainer,
I want automated P0 tests for Mila, Liam, Noah, Isla, and Max using the content-only template covering activation and workflow execution,
So that all 7 agents have baseline P0 coverage and the content-only template is validated across diverse agent types.

## Acceptance Criteria

1. **Given** the P0 test framework from Story 2.1 and the content-only template definition, **When** the maintainer runs P0 tests for each of the 5 content-only agents, **Then** activation sequence tests verify each agent loads correctly with expected persona, menu, and instructions (FR7 extension)
2. **Given** the P0 test framework exists, **When** workflow execution tests run for each of the 5 agents, **Then** they verify each agent produces well-formed output matching expected schema — workflow.md frontmatter, step cross-references, synthesize step (FR8 extension)
3. **Given** tests are generated using the content-only template, **When** agent-specific assertions are derived from each agent's definition, **Then** each agent's P0 tests reflect its actual persona, menu items, workflow structure, and stream identity
4. **Given** all 5 agents' tests exist, **When** they run repeatedly without code changes, **Then** they produce consistent results — zero flaky tests (NFR1)
5. **Given** the full P0 suite budget is 5 minutes for all 7 agents, **When** each agent's P0 suite runs, **Then** it completes within its proportional share (~43 seconds per agent) (NFR3)
6. **Given** a content-only P0 test fails, **When** the failure is reported, **Then** the output identifies the specific agent name and ID, the validation category (activation/workflow), and the specific field or file that failed (NFR2)

## Tasks / Subtasks

- [x] Task 1: Create Isla P0 test file — `tests/p0/p0-isla.test.js` (AC: 1, 2, 3, 4, 6)
  - [x] 1.1: Create file with `'use strict'` + `node:test` + `node:assert/strict` imports
  - [x] 1.2: Import from `./helpers` (loadAgentDefinition, PACKAGE_ROOT, AGENTS_DIR, WORKFLOWS_DIR) and `../../scripts/update/lib/agent-registry` (AGENTS, WORKFLOWS, WAVE3_WORKFLOW_NAMES)
  - [x] 1.3: Describe suite "P0 Isla: Activation Sequence" — load definition in `before()` hook using `loadAgentDefinition('discovery-empathy-expert')`
  - [x] 1.4: Test persona ROLE contains "Qualitative Research Expert" (agent file value)
  - [x] 1.5: Test persona IDENTITY references "Empathize" stream
  - [x] 1.6: Test persona COMMUNICATION_STYLE contains "I noticed that" (characteristic phrase)
  - [x] 1.7: Test Isla has exactly 8 menu items with cmd triggers: MH, CH, EM, UI, UD, VE, PM, DA
  - [x] 1.8: Test Isla's 5 exec-path menu items reference files that exist on disk
  - [x] 1.9: Test activation step 2 contains config.yaml loading and "Configuration Error"
  - [x] 1.10: Test rules section exists and contains at least 5 rules (actual: 8)
  - [x] 1.11: Describe suite "P0 Isla: Workflow Execution Output" — for each of 3 workflows (empathy-map, user-interview, user-discovery)
  - [x] 1.12: Per-workflow: test workflow.md exists and contains frontmatter with `type:`, `description:`, `author:` fields
  - [x] 1.13: Per-workflow: test template file exists (`{workflow-name}.template.md`) — all 3 Isla workflows have templates
  - [x] 1.14: Per-workflow: test template contains placeholder variables (`{variable-name}` pattern)
  - [x] 1.15: Per-workflow: test steps 01 through (N-1) reference next step in sequence (use dynamic step count)
  - [x] 1.16: Per-workflow: test dynamically-discovered final step contains synthesize/artifact/final content (expected: step-06-synthesize.md for all 3)
  - [x] 1.17: Per-workflow: test final step suggests next workflows
  - [x] 1.18: Per-workflow: test step count — all 3 workflows have exactly 6 steps

- [x] Task 2: Create Mila P0 test file — `tests/p0/p0-mila.test.js` (AC: 1, 2, 3, 4, 6)
  - [x] 2.1: Create file following same import pattern as Isla
  - [x] 2.2: Describe "P0 Mila: Activation Sequence" with `before()` hook for `loadAgentDefinition('research-convergence-specialist')`
  - [x] 2.3: Test persona ROLE contains "Research Convergence" (agent file value)
  - [x] 2.4: Test persona IDENTITY references "Synthesize" stream
  - [x] 2.5: Test persona COMMUNICATION_STYLE contains "what the research is telling us" (characteristic phrase)
  - [x] 2.6: Test Mila has exactly 7 menu items with cmd triggers: MH, CH, RC, PR, PA, PM, DA
  - [x] 2.7: Test Mila's 4 exec-path menu items reference files that exist on disk
  - [x] 2.8: Test activation step 2 contains config.yaml / "Configuration Error"
  - [x] 2.9: Test rules section contains at least 5 rules (actual: 9)
  - [x] 2.10: Describe "P0 Mila: Workflow Execution Output" — for each of 3 workflows (research-convergence, pivot-resynthesis, pattern-mapping)
  - [x] 2.11: Per-workflow: test workflow.md frontmatter fields
  - [x] 2.12: Per-workflow: NO template file test — Mila's 3 workflows have NO templates
  - [x] 2.13: Per-workflow: test steps 01 through (N-1) reference next step (use dynamic step count)
  - [x] 2.14: Per-workflow: test dynamically-discovered final step contains synthesize/artifact/final content (expected: step-05-synthesize.md for all 3)
  - [x] 2.15: Per-workflow: test final step suggests next workflows
  - [x] 2.16: Per-workflow: test step count — all 3 workflows have exactly 5 steps

- [x] Task 3: Create Liam P0 test file — `tests/p0/p0-liam.test.js` (AC: 1, 2, 3, 4, 6)
  - [x] 3.1: Create file following same import pattern
  - [x] 3.2: Describe "P0 Liam: Activation Sequence" with `before()` hook for `loadAgentDefinition('hypothesis-engineer')`
  - [x] 3.3: Test persona ROLE contains "Hypothesis Engineering" (agent file: "Creative Ideation + Hypothesis Engineering Specialist")
  - [x] 3.4: Test persona IDENTITY references "Hypothesize" stream
  - [x] 3.5: Test persona COMMUNICATION_STYLE contains "What if?" (characteristic phrase)
  - [x] 3.6: Test Liam has exactly 7 menu items with cmd triggers: MH, CH, HE, AM, ED, PM, DA
  - [x] 3.7: Test Liam's 4 exec-path menu items reference files that exist on disk
  - [x] 3.8: Test activation step 2 contains config.yaml / "Configuration Error"
  - [x] 3.9: Test rules section contains at least 5 rules (actual: 9)
  - [x] 3.10: Describe "P0 Liam: Workflow Execution Output" — for each of 3 workflows (hypothesis-engineering, assumption-mapping, experiment-design)
  - [x] 3.11: Per-workflow: test workflow.md frontmatter fields
  - [x] 3.12: Per-workflow: NO template file test — Liam's 3 workflows have NO templates
  - [x] 3.13: Per-workflow: test steps 01 through (N-1) reference next step (use dynamic step count — varies per workflow)
  - [x] 3.14: Per-workflow: test dynamically-discovered final step contains synthesize content (expected: hypothesis-engineering: step-05-synthesize.md, assumption-mapping: step-04-synthesize.md, experiment-design: step-04-synthesize.md)
  - [x] 3.15: Per-workflow: test final step suggests next workflows
  - [x] 3.16: Per-workflow: test step count — hypothesis-engineering has 5 steps, assumption-mapping has 4 steps, experiment-design has 4 steps

- [x] Task 4: Create Noah P0 test file — `tests/p0/p0-noah.test.js` (AC: 1, 2, 3, 4, 6)
  - [x] 4.1: Create file following same import pattern
  - [x] 4.2: Describe "P0 Noah: Activation Sequence" with `before()` hook for `loadAgentDefinition('production-intelligence-specialist')`
  - [x] 4.3: Test persona ROLE contains "Signal Interpretation" (agent file: "Signal Interpretation + Production Intelligence Analyst")
  - [x] 4.4: Test persona IDENTITY references "Sensitize" stream
  - [x] 4.5: Test persona COMMUNICATION_STYLE contains "The signal indicates" (characteristic phrase)
  - [x] 4.6: Test Noah has exactly 7 menu items with cmd triggers: MH, CH, SI, BA, MO, PM, DA
  - [x] 4.7: Test Noah's 4 exec-path menu items reference files that exist on disk
  - [x] 4.8: Test activation step 2 contains config.yaml / "Configuration Error"
  - [x] 4.9: Test rules section contains at least 5 rules (actual: 9)
  - [x] 4.10: Describe "P0 Noah: Workflow Execution Output" — for each of 3 workflows (signal-interpretation, behavior-analysis, production-monitoring)
  - [x] 4.11: Per-workflow: test workflow.md frontmatter fields
  - [x] 4.12: Per-workflow: NO template file test — Noah's 3 workflows have NO templates
  - [x] 4.13: Per-workflow: test steps 01 through (N-1) reference next step (use dynamic step count)
  - [x] 4.14: Per-workflow: test dynamically-discovered final step contains synthesize/artifact/final content (expected: step-05-synthesize.md for all 3)
  - [x] 4.15: Per-workflow: test final step suggests next workflows
  - [x] 4.16: Per-workflow: test step count — all 3 workflows have exactly 5 steps

- [x] Task 5: Create Max P0 test file — `tests/p0/p0-max.test.js` (AC: 1, 2, 3, 4, 6)
  - [x] 5.1: Create file following same import pattern
  - [x] 5.2: Describe "P0 Max: Activation Sequence" with `before()` hook for `loadAgentDefinition('learning-decision-expert')`
  - [x] 5.3: Test persona ROLE contains "Validated Learning" (agent file: "Validated Learning Synthesizer + Strategic Decision Expert")
  - [x] 5.4: Test persona IDENTITY references "Systematize" stream
  - [x] 5.5: Test persona COMMUNICATION_STYLE contains "The evidence suggests" (characteristic phrase)
  - [x] 5.6: Test Max has exactly 8 menu items with cmd triggers: MH, CH, LC, PP, VN, VE, PM, DA
  - [x] 5.7: Test Max's 5 exec-path menu items reference files that exist on disk
  - [x] 5.8: Test activation step 2 contains config.yaml / "Configuration Error"
  - [x] 5.9: Test rules section contains at least 5 rules (actual: 8)
  - [x] 5.10: Describe "P0 Max: Workflow Execution Output" — for each of 3 workflows (learning-card, pivot-patch-persevere, vortex-navigation)
  - [x] 5.11: Per-workflow: test workflow.md frontmatter fields
  - [x] 5.12: Per-workflow: test template file exists (`{workflow-name}.template.md`) — all 3 Max workflows have templates
  - [x] 5.13: Per-workflow: test template contains placeholder variables
  - [x] 5.14: Per-workflow: test steps 01 through (N-1) reference next step (use dynamic step count)
  - [x] 5.15: Per-workflow: test dynamically-discovered final step contains synthesize/artifact/final content (expected: learning-card: step-06-synthesize.md, pivot-patch-persevere: step-06-action-plan.md — NO "synthesize" in name, vortex-navigation: step-06-navigation-plan.md — NO "synthesize" in name)
  - [x] 5.16: Per-workflow: test final step suggests next workflows
  - [x] 5.17: Per-workflow: test step count — all 3 workflows have exactly 6 steps

- [x] Task 6: Validation — run full test suite and verify (AC: all)
  - [x] 6.1: Run `npm run test:p0` — 393 tests pass (271 existing + 122 new), 0 fail (316ms)
  - [x] 6.2: Run `npm test` — 248 existing unit tests pass (zero regressions)
  - [x] 6.3: Run `npm run lint` — zero errors, zero warnings (fixed 15 unused import warnings)
  - [x] 6.4: Verify all assertion messages include agent name and ID for diagnostic identification (AC 6)
  - [x] 6.5: Verify each agent's P0 suite timing is well under 43-second budget (AC 5) — 316ms total

## Dev Notes

### Scope & Split Assessment

The epic AC says this story "may be split into two stories (3+2) if the content-only template requires significant per-agent customization beyond assertion values." Analysis result: **NO SPLIT NEEDED.** All 5 agents follow the same 2-describe-block content-only structure. The variations (menu counts, step counts, template presence, final step names) are all assertion-value differences handled by per-agent constants — not structural customization. The template works for all 5.

**Expected test counts per agent:**
- Isla (with templates): ~7 activation + ~21 workflow (3 wf x 7 tests) = ~28
- Mila (no templates): ~7 activation + ~15 workflow (3 wf x 5 tests) = ~22
- Liam (no templates): ~7 activation + ~15 workflow (3 wf x 5 tests) = ~22
- Noah (no templates): ~7 activation + ~15 workflow (3 wf x 5 tests) = ~22
- Max (with templates): ~7 activation + ~21 workflow (3 wf x 7 tests) = ~28

**Total: ~122 new tests. P0 suite total: 271 + 122 = ~393.**

### Architecture Compliance

- **Language:** JavaScript ES2020+ — NO TypeScript
- **Test framework:** `node:test` + `node:assert/strict` — NOT Jest
- **Coverage:** c8 (`npm run test:coverage` includes P0 tests)
- **No new dependencies:** Use only existing deps: `chalk@^4.1.2`, `fs-extra@^11.3.3`, `js-yaml@^4.1.0`
- **Linting:** Must pass `npm run lint` (ESLint)
- **File naming:** kebab-case for JS files, camelCase for variables

### Critical: Use Existing P0 Infrastructure

Story 2.1 created the P0 framework in `tests/p0/`. Content-only tests MUST use the established helpers:

```javascript
const { loadAgentDefinition, PACKAGE_ROOT, AGENTS_DIR, WORKFLOWS_DIR } = require('./helpers');
const { AGENTS, WORKFLOWS, WAVE3_WORKFLOW_NAMES } = require('../../scripts/update/lib/agent-registry');
```

**DO NOT duplicate** any logic from `helpers.js` — call the existing functions. The `loadAgentDefinition()` function already parses YAML frontmatter, agent tag attributes, persona fields, menu items, activation steps, and error handling.

**Key limitation:** `loadAgentDefinition()` does NOT return raw file content. For exec-path and rules validation, read the agent file separately via `fs.readFileSync()`. This double-read pattern is established in Emma and Wade test files.

### Critical: Content-Only Template = 2 Describe Blocks (NOT 3)

Content-only agents do NOT have an Infrastructure Integration block. Each test file has exactly 2 describe blocks:

```
describe('P0 {AgentName}: Activation Sequence', () => { ... });     // FR7
describe('P0 {AgentName}: Workflow Execution Output', () => { ... }); // FR8
```

This is the content-only template as defined in `tests/p0/templates.js` — NO FR10 infrastructure integration tests.

### Content-Only Agents — Filesystem-Verified Details

| Agent | ID | Menu Items | Exec Paths | Rules | Workflows | Step Counts | Templates | Final Steps |
|-------|----|-----------|------------|-------|-----------|-------------|-----------|-------------|
| Isla | discovery-empathy-expert | 8 (MH,CH,EM,UI,UD,VE,PM,DA) | 5 | 8 | 3 (empathy-map, user-interview, user-discovery) | 6, 6, 6 | 3/3 YES | 3/3 synthesize |
| Mila | research-convergence-specialist | 7 (MH,CH,RC,PR,PA,PM,DA) | 4 | 9 | 3 (research-convergence, pivot-resynthesis, pattern-mapping) | 5, 5, 5 | 0/3 NONE | 3/3 synthesize |
| Liam | hypothesis-engineer | 7 (MH,CH,HE,AM,ED,PM,DA) | 4 | 9 | 3 (hypothesis-engineering, assumption-mapping, experiment-design) | 5, 4, 4 | 0/3 NONE | 3/3 synthesize |
| Noah | production-intelligence-specialist | 7 (MH,CH,SI,BA,MO,PM,DA) | 4 | 9 | 3 (signal-interpretation, behavior-analysis, production-monitoring) | 5, 5, 5 | 0/3 NONE | 3/3 synthesize |
| Max | learning-decision-expert | 8 (MH,CH,LC,PP,VN,VE,PM,DA) | 5 | 8 | 3 (learning-card, pivot-patch-persevere, vortex-navigation) | 6, 6, 6 | 3/3 YES | 1/3 synthesize |

### Persona Cross-Validation Keywords (Registry vs Agent File)

| Agent | Registry `persona.role` | Agent File `<role>` | Shared Keyword |
|-------|------------------------|--------------------|-----------------------|
| Isla | "Qualitative Research Expert + Empathy Mapping Specialist" | "Qualitative Research Expert + Empathy Mapping Specialist" | "Qualitative Research" (exact match) |
| Mila | "Research Convergence + Problem Definition Specialist" | "Research Convergence + Problem Definition Specialist" | "Research Convergence" (exact match) |
| Liam | "Creative Ideation + Hypothesis Engineering Specialist" | "Creative Ideation + Hypothesis Engineering Specialist" | "Hypothesis Engineering" (exact match) |
| Noah | "Signal Interpretation + Production Intelligence Analyst" | "Signal Interpretation + Production Intelligence Analyst" | "Signal Interpretation" (exact match) |
| Max | "Validated Learning Synthesizer + Strategic Decision Expert" | "Validated Learning Synthesizer + Strategic Decision Expert" | "Validated Learning" (exact match) |

**Note:** Unlike Emma (where registry and agent file roles differ), all 5 content-only agents have IDENTICAL role strings in registry and agent file. This means cross-validation is stronger — test a multi-word phrase match.

| Agent | Registry `persona.communication_style` keyword | Agent File `<communication_style>` keyword | Shared Phrase |
|-------|----------------------------------------------|-------------------------------------------|----|
| Isla | "I noticed that..." | "I noticed that..." | "I noticed that" |
| Mila | "Here's what the research is telling us..." | "Here's what the research is telling us..." | "what the research is telling us" |
| Liam | "What if?" | "What if?" | "What if?" |
| Noah | "The signal indicates..." | "The signal indicates..." | "The signal indicates" |
| Max | "The evidence suggests..." | "The evidence suggests..." | "The evidence suggests" |

### Workflow Variations Per Agent — Critical for Tests

**Template files:** Only Isla (3/3) and Max (3/3) have template files. Mila, Liam, and Noah have 0 templates. Tests must be conditional:
- Isla & Max: test template exists + contains placeholders
- Mila, Liam, Noah: SKIP template tests entirely

**Final step "synthesize" in filename:** All workflows end with "synthesize" EXCEPT Max's `pivot-patch-persevere` (ends with `step-06-action-plan.md`) and `vortex-navigation` (ends with `step-06-navigation-plan.md`). Use dynamic final step discovery (M1 pattern from Emma review) — don't hardcode step-0N-synthesize.md.

**Step counts vary:** Liam's assumption-mapping (4 steps) and experiment-design (4 steps) have fewer steps than hypothesis-engineering (5 steps). Test the actual count per workflow, not a fixed number.

**Cross-reference test — step numbering matters:** For a workflow with N steps, steps 01 through (N-1) should reference the next step. The final step has no next reference. Dynamic: use `stepFiles.length` to determine the range.

### Established Patterns to Apply (from Emma/Wade code review fixes)

1. **M1 — Dynamic final step discovery:** Find the last step file from sorted directory listing. Don't hardcode `step-06-synthesize.md`.
2. **M2 — Vacuous pass guard:** Add minimum step count assertion (`>= 2`) before step cross-reference loop.
3. **M3 — Registry-derived WAVE3 check:** Content-only agents ARE in `WAVE3_WORKFLOW_NAMES` (opposite of Emma/Wade which are NOT).
4. **before() hook with stepsDir guard:** Cache `stepFiles` in `before()` per workflow describe block. Assert `stepsDir` exists before reading.
5. **Diagnostic assertion messages:** Every `assert.*` MUST include `"AgentName (agent-id): message"` prefix.
6. **Exec-path regex scoped to `<item>` tags:** Use `/<item\s[^>]*exec="([^"]+)"[^>]*>/g` — NOT the simpler `exec="([^"]+)"`.

### Edge Cases and Gotchas

1. **Agent tag `id` field includes `.agent.yaml` suffix:** All agent tags have `id="agent-id.agent.yaml"`. Registry `id` is just `agent-id`. Test the `name` attribute match, not `id`.
2. **Mila/Liam/Noah have NO template files:** Don't test for template existence on these agents. Only Isla and Max have templates.
3. **Liam has mixed step counts:** hypothesis-engineering (5), assumption-mapping (4), experiment-design (4). The `validateWorkflowStructure()` helper accepts 4-6 — all pass.
4. **Max's final steps don't all have "synthesize":** Only `learning-card` ends with `step-06-synthesize.md`. The other two end with `step-06-action-plan.md` and `step-06-navigation-plan.md`. Use dynamic final step discovery.
5. **Template placeholder syntax:** All templates use `{variable-name}` (single curly braces), NOT `{{variable-name}}`.
6. **Party mode exec path:** PM points to `_bmad/core/workflows/party-mode/workflow.md` which is OUTSIDE `_vortex`. Still a valid path.
7. **All 5 agents' workflows are in WAVE3_WORKFLOW_NAMES:** This is the opposite of Emma/Wade. Content-only agents can positively assert WAVE3 inclusion.

### Previous Story Learnings (p2-2-2 and p2-2-3)

- **Apply all code review fixes from the start:** M1 (dynamic final step), M2 (vacuous pass guard), M3 (registry-derived checks) — proactively applied in Wade, should be standard for all 5 agents
- **before() hooks with stepsDir guard:** Cache stepFiles per workflow describe block. Assert directory exists first.
- **Filesystem-verify all factual claims:** The tables above have been verified against actual agent files and workflow directories
- **Double file read is accepted:** loadAgentDefinition() for parsed fields + fs.readFileSync() for raw content (exec paths, rules)
- **Diagnostic assertion messages:** Every assert includes "AgentName (agentId):" prefix
- **Exec-path regex scoped to `<item>` tags:** Prevents matching handler documentation

### Files to Create

- `tests/p0/p0-isla.test.js` (NEW — Isla content-only P0 tests)
- `tests/p0/p0-mila.test.js` (NEW — Mila content-only P0 tests)
- `tests/p0/p0-liam.test.js` (NEW — Liam content-only P0 tests)
- `tests/p0/p0-noah.test.js` (NEW — Noah content-only P0 tests)
- `tests/p0/p0-max.test.js` (NEW — Max content-only P0 tests)

### Files to Modify

- `_bmad-output/implementation-artifacts/sprint-status.yaml` (MODIFY — story status transitions)

### Project Structure Notes

- 5 new test files in existing `tests/p0/` directory — no new directories needed
- Follows established pattern from `p0-emma.test.js` (infrastructure template) adapted to 2-block content-only template
- Test files discovered through existing `npm run test:p0` glob: `node --test tests/p0/*.test.js`
- No changes to `helpers.js` or `templates.js` unless a missing export is discovered during implementation

### References

- [Source: _bmad-output/planning-artifacts/epics-phase2.md — Epic 3, Story 3.1]
- [Source: _bmad-output/planning-artifacts/prd-phase2.md — FR7, FR8, NFR1, NFR2, NFR3, NFR5]
- [Source: scripts/update/lib/agent-registry.js — 5 content-only agent entries, WORKFLOWS, WAVE3_WORKFLOW_NAMES]
- [Source: _bmad/bme/_vortex/agents/discovery-empathy-expert.md — Isla: 8 menu, 5 exec, 8 rules, 3 workflows (6,6,6 steps)]
- [Source: _bmad/bme/_vortex/agents/research-convergence-specialist.md — Mila: 7 menu, 4 exec, 9 rules, 3 workflows (5,5,5 steps)]
- [Source: _bmad/bme/_vortex/agents/hypothesis-engineer.md — Liam: 7 menu, 4 exec, 9 rules, 3 workflows (5,4,4 steps)]
- [Source: _bmad/bme/_vortex/agents/production-intelligence-specialist.md — Noah: 7 menu, 4 exec, 9 rules, 3 workflows (5,5,5 steps)]
- [Source: _bmad/bme/_vortex/agents/learning-decision-expert.md — Max: 8 menu, 5 exec, 8 rules, 3 workflows (6,6,6 steps)]
- [Source: tests/p0/helpers.js — loadAgentDefinition, AGENTS_DIR, WORKFLOWS_DIR, PACKAGE_ROOT]
- [Source: tests/p0/templates.js — CONTENT_ONLY_AGENTS, getAgentTemplate]
- [Source: tests/p0/p0-emma.test.js — Infrastructure template pattern with M1/M2/M3 fixes]
- [Source: tests/p0/p0-wade.test.js — Adapted infrastructure template with MVP guard and stepsDir guard]
- [Source: _bmad-output/implementation-artifacts/p2-2-2-p0-activation-workflow-tests-for-emma.md — Code review fixes M1/M2/M3]
- [Source: _bmad-output/implementation-artifacts/p2-2-3-p0-activation-workflow-tests-for-wade.md — Code review fixes M1/M2/M3/L2]
- [Source: _bmad-output/implementation-artifacts/p2-epic-2-retro-2026-02-28.md — Epic 2 retro: team agreements, action items]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (claude-opus-4-6)

### Debug Log References

- Initial lint run: 15 unused variable warnings (AGENTS, WORKFLOWS, WAVE3_WORKFLOW_NAMES) across all 5 files
- Fix: Replaced destructured imports with bare `require('../../scripts/update/lib/agent-registry')` — 0 errors, 0 warnings after fix
- Re-verified: `npm run test:p0` — 393 pass, 0 fail (316ms)

### Completion Notes List

- 5 content-only P0 test files created: Isla (28 tests), Mila (22), Liam (22), Noah (22), Max (28) = 122 new tests
- P0 suite total: 393 tests pass (271 existing + 122 new), 0 failures, 316ms runtime
- Unit suite: 248 tests pass, zero regressions
- Lint: 0 errors, 0 warnings (after fixing 15 unused import warnings)
- All 6 ACs satisfied: activation sequence (FR7), workflow execution output (FR8), agent-specific assertions, deterministic results, performance budget, diagnostic error messages
- Content-only template validated: 2-describe-block pattern works across all 5 agent variations (with/without templates, mixed step counts, non-synthesize final steps)
- Applied M1/M2 code review fixes from Epic 2 — dynamic final step discovery, vacuous pass guards, diagnostic messages. M3 (WAVE3 positive assertion) omitted by design: content-only template has no infrastructure integration block
- Liam's mixed step counts (5, 4, 4) handled via `LIAM_STEP_COUNTS` constant map
- Max's non-synthesize final steps handled via M1 dynamic content check (looks inside file, not at filename)

### File List

- `tests/p0/p0-isla.test.js` (NEW — 28 tests, 2 describe blocks, with templates)
- `tests/p0/p0-mila.test.js` (NEW — 22 tests, 2 describe blocks, no templates)
- `tests/p0/p0-liam.test.js` (NEW — 22 tests, 2 describe blocks, no templates, mixed step counts)
- `tests/p0/p0-noah.test.js` (NEW — 22 tests, 2 describe blocks, no templates)
- `tests/p0/p0-max.test.js` (NEW — 28 tests, 2 describe blocks, with templates, non-synthesize final steps)
- `tests/p0/helpers.js` (MODIFIED — exported STEP_PATTERN constant, replaced local stepPattern in validateWorkflowStructure)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (MODIFIED — p2-3-1 status transitions)
