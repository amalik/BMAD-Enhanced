# Story p2-2.2: P0 Activation & Workflow Tests for Emma (Infrastructure Template)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a maintainer,
I want automated P0 tests validating Emma's activation sequence, workflow execution output, and infrastructure-level integration,
So that I can catch Emma regressions before publishing and establish the infrastructure test template for Wade.

## Acceptance Criteria

1. **Given** the P0 test framework from Story 2.1 is in place, **When** the maintainer runs P0 tests for Emma, **Then** activation sequence tests verify Emma loads correctly with expected persona, menu, and instructions (FR7)
2. **Given** Emma's 3 workflows exist on disk, **When** workflow execution tests run, **Then** they verify Emma produces well-formed output matching expected schema — workflow.md frontmatter, template files, step cross-references, synthesize step (FR8)
3. **Given** Emma is an infrastructure agent with JS components, **When** infrastructure integration tests run, **Then** they validate the contract between Emma's registry entry and her agent definition file — persona field cross-validation, workflow assignment accuracy, derived array inclusion (FR10)
4. **Given** all Emma P0 tests are deterministic, **When** they run repeatedly without code changes, **Then** they produce consistent results — zero flaky tests (NFR1)
5. **Given** the full P0 suite budget is 5 minutes for all 7 agents, **When** Emma's P0 suite runs, **Then** it completes within its proportional share (~43 seconds) (NFR3)
6. **Given** an Emma P0 test fails, **When** the failure is reported, **Then** the output identifies: "Emma (contextualization-expert)" + the validation category (activation/workflow/infrastructure) + the specific field or file that failed (NFR2)

## Tasks / Subtasks

- [x] Task 1: Create Emma activation deep-dive tests (AC: 1, 4, 6)
  - [x] 1.1: Create `tests/p0/p0-emma.test.js` with `'use strict'` + `node:test` + `node:assert/strict` imports
  - [x] 1.2: Import from `./helpers` (loadAgentDefinition, AGENTS_DIR, WORKFLOWS_DIR) and `../../scripts/update/lib/agent-registry` (AGENTS, WORKFLOWS)
  - [x] 1.3: Describe suite "P0 Emma: Activation Sequence" — load Emma's definition once in `before()` hook using `loadAgentDefinition('contextualization-expert')`
  - [x] 1.4: Test Emma's persona ROLE contains "Product Context Architect" (agent file value verification)
  - [x] 1.5: Test Emma's persona IDENTITY contains "Contextualize" stream reference
  - [x] 1.6: Test Emma's persona COMMUNICATION_STYLE contains characteristic phrase (e.g., "Before we build" or "What problem")
  - [x] 1.7: Test Emma has exactly 8 menu items with specific cmd triggers: MH, CH, LP, PV, CS, VL, PM, DA
  - [x] 1.8: Test Emma's 5 exec-path menu items (LP, PV, CS, VL, PM) reference files that exist on disk — resolve `{project-root}` to actual path, verify with `fs.existsSync`
  - [x] 1.9: Test Emma's activation step 2 contains config.yaml loading and error handling (already validated generically, but verify specific "config.yaml" reference and "Configuration Error" or "STOP" text)
  - [x] 1.10: Test Emma's rules section exists and contains at least 5 rules

- [x] Task 2: Create Emma workflow execution output tests (AC: 2, 4, 6)
  - [x] 2.1: Describe suite "P0 Emma: Workflow Execution Output"
  - [x] 2.2: For each of Emma's 3 workflows (lean-persona, product-vision, contextualize-scope): test workflow.md exists and contains frontmatter with `type:`, `description:`, and `author:` fields
  - [x] 2.3: For each workflow: test template file exists (`{workflow-name}.template.md` or `{workflow-name}/{workflow-name}.template.md`)
  - [x] 2.4: For each workflow: test template file contains expected placeholder variables (at minimum `{{date}}` or `{date}` pattern)
  - [x] 2.5: For each workflow: test steps 01-05 reference the NEXT step — step-01 content should contain "step-02", etc. (steps use `## Next Step` section with full `{project-root}/...` path; step-06 is final and has no next reference)
  - [x] 2.6: For each workflow: test final step (step-06-synthesize.md) contains artifact generation guidance (e.g., "synthesize", "final", or "artifact")
  - [x] 2.7: For each workflow: test final step suggests next workflows (cross-agent handoff references)
  - [x] 2.8: Verify all 3 workflows have exactly 6 steps each (lean-persona: 6, product-vision: 6, contextualize-scope: 6)

- [x] Task 3: Create Emma infrastructure integration tests (AC: 3, 4, 6)
  - [x] 3.1: Describe suite "P0 Emma: Infrastructure Integration"
  - [x] 3.2: Test Emma's registry entry exists — find entry in AGENTS where `id === 'contextualization-expert'`, verify truthy
  - [x] 3.3: Test Emma's registry persona has all 4 fields: role, identity, communication_style, expertise — all non-empty strings
  - [x] 3.4: Test Emma's registry stream is "Contextualize"
  - [x] 3.5: Test WORKFLOWS contains exactly 3 entries with `agent === 'contextualization-expert'` — names match ['lean-persona', 'product-vision', 'contextualize-scope']
  - [x] 3.6: Test Emma's ID ('contextualization-expert') appears in derived AGENT_IDS array
  - [x] 3.7: Test Emma's file ('contextualization-expert.md') appears in derived AGENT_FILES array
  - [x] 3.8: Test Emma is NOT in WAVE3_WORKFLOW_NAMES (Wave 1 agent, not Wave 3)
  - [x] 3.9: Test persona cross-validation: registry `persona.role` keyword appears in agent file `<role>` content (shared keyword: "Product" — registry has "Problem-Product", agent file has "Product Context")
  - [x] 3.10: Test persona cross-validation: registry `persona.communication_style` keyword appears in agent file `<communication_style>` content
  - [x] 3.11: Test agent tag `name` attribute ("Emma") matches registry `name` field exactly
  - [x] 3.12: Test agent tag `icon` attribute matches registry `icon` field (both use target emoji)

- [x] Task 4: Run full validation and verify (AC: all)
  - [x] 4.1: Run `npm run test:p0` — all P0 tests pass (192 existing + 39 new Emma = 231 total)
  - [x] 4.2: Run `npm test` — 248 existing unit tests pass (zero regressions)
  - [x] 4.3: Run `npm run test:all` — 539 tests pass
  - [x] 4.4: Run `npm run lint` — zero errors, zero warnings
  - [x] 4.5: Verify Emma P0 suite timing — ~118ms (well under 43-second budget)
  - [x] 4.6: Verify all test names include "Emma (contextualization-expert)" for diagnostic identification (AC 6)

## Dev Notes

### Architecture Compliance

- **Language:** JavaScript ES2020+ — NO TypeScript
- **Test framework:** `node:test` + `node:assert/strict` — NOT Jest
- **Coverage:** c8 (`npm run test:coverage` includes P0 tests)
- **No new dependencies:** Use only existing deps
- **Linting:** Must pass `npm run lint` (ESLint)
- **File naming:** kebab-case for JS files, camelCase for variables

### Critical: Use Existing P0 Infrastructure

Story 2.1 created the P0 framework in `tests/p0/`. Emma's tests MUST use the established helpers:

```javascript
const { loadAgentDefinition, AGENTS_DIR, WORKFLOWS_DIR } = require('./helpers');
const { INFRASTRUCTURE_AGENTS, getAgentTemplate } = require('./templates');
const { AGENTS, WORKFLOWS, AGENT_IDS, AGENT_FILES, WAVE3_WORKFLOW_NAMES } = require('../../scripts/update/lib/agent-registry');
```

**DO NOT duplicate** any logic from `helpers.js` — call the existing functions. The `loadAgentDefinition()` function already parses YAML frontmatter, agent tag attributes, persona fields, menu items, activation steps, and error handling.

### Emma's Agent File Structure (Verified)

Agent definition at `_bmad/bme/_vortex/agents/contextualization-expert.md`:

- **YAML frontmatter:** `name: "contextualization expert"`, `description: "Contextualization Expert"`
- **Agent tag:** `<agent id="contextualization-expert.agent.yaml" name="Emma" title="Contextualization Expert" icon="🎯">`
- **Persona fields:** `<role>Product Context Architect + Lean Persona Specialist</role>`, `<identity>...Contextualize stream...</identity>`, `<communication_style>...Before we build...</communication_style>`, `<principles>6 bullet points</principles>`
- **Menu:** 8 items — MH (menu help), CH (chat), LP (lean-persona), PV (product-vision), CS (contextualize-scope), VL (validate), PM (party-mode), DA (dismiss)
- **Activation:** 7 mandatory steps + 1 {HELP_STEP}. Step 2 loads config.yaml with "Configuration Error" handling.
- **Menu exec paths:** LP → `_bmad/bme/_vortex/workflows/lean-persona/workflow.md`, PV → `product-vision/workflow.md`, CS → `contextualize-scope/workflow.md`, VL → `lean-persona/validate.md`, PM → `_bmad/core/workflows/party-mode/workflow.md`
- **Rules:** 8 rules including "Context before solutions", "Stay in character", language handling

### Emma's Workflows (Verified)

| Workflow | Steps | Template | Validate |
|----------|-------|----------|----------|
| lean-persona | 6 (step-01 through step-06) | lean-persona.template.md | validate.md (placeholder) |
| product-vision | 6 (step-01 through step-06) | product-vision.template.md | N/A |
| contextualize-scope | 6 (step-01 through step-06) | contextualize-scope.template.md | N/A |

All 3 workflows:
- Have 6 steps each (step-01 through step-06)
- Final step is `step-06-synthesize.md`
- Steps 01-05 have `## Next Step` sections with full `{project-root}/...` paths to the next step file
- Step-06 (final) has NO next step reference — instead suggests next workflows (cross-agent handoff)
- Template files use `{variable-name}` placeholder syntax (NOT `{{variable-name}}`)

### Emma's Registry Entry (Verified)

```javascript
{
  id: 'contextualization-expert',
  name: 'Emma',
  icon: '\u{1F3AF}',  // 🎯
  title: 'Contextualization Expert',
  stream: 'Contextualize',
  persona: {
    role: 'Strategic Framing + Problem-Product Space Navigator',
    identity: '...Lean Startup methodologies...Contextualize stream...',
    communication_style: '...Strategic yet approachable...What are we really solving...',
    expertise: '...Master of Lean Startup...Personas over demographics...',
  },
}
```

**Note:** Registry `persona.role` is "Strategic Framing + Problem-Product Space Navigator" while agent file `<role>` is "Product Context Architect + Lean Persona Specialist". These are DIFFERENT values — do NOT test exact match. The only shared keyword is "Product" (registry: "Problem-Product", agent: "Product Context"). Words like "Strategic" and "Framing" appear ONLY in the registry, not the agent file role.

### Persona Cross-Validation Strategy

The registry and agent definition describe the same persona but with different wording. P0 tests should verify the CONTRACT holds:

- **Role:** Both contain "Product" keyword (registry: "Problem-**Product** Space Navigator", agent: "**Product** Context Architect") → validates they describe the same domain. NOTE: "Strategic" and "Framing" appear ONLY in the registry role, NOT in the agent file role.
- **Communication style:** Both reference asking questions about "really solving" (registry: "What are we really solving?", agent: "What problem are we really solving here?") → validates they describe the same interaction pattern
- **DO NOT test exact string equality** between registry and agent file — they use different formats (single-line escaped vs multi-line XML)

### Infrastructure Template Pattern

This story establishes the **infrastructure P0 template** that Story 2.3 (Wade) will reuse. The test structure should be:

```
describe('P0 Emma: Activation Sequence', () => { ... });     // FR7
describe('P0 Emma: Workflow Execution Output', () => { ... }); // FR8
describe('P0 Emma: Infrastructure Integration', () => { ... }); // FR10
```

Wade's tests (Story 2.3) should follow this exact same 3-describe pattern with minimal adaptation — proving the template is reusable.

### Menu Item exec Path Resolution

Menu items use `{project-root}` placeholder in exec paths. To test that exec paths point to real files:

```javascript
const PACKAGE_ROOT = path.join(__dirname, '..', '..');
// Replace {project-root} with actual path
const resolvedPath = execPath.replace('{project-root}', PACKAGE_ROOT);
assert.ok(fs.existsSync(resolvedPath), `Exec path not found: ${resolvedPath}`);
```

Extract exec paths from the raw agent file content — `loadAgentDefinition()` doesn't return exec paths, so parse them directly from the file.

### Edge Cases and Gotchas

1. **Agent tag `id` field:** Emma's agent tag has `id="contextualization-expert.agent.yaml"` (includes `.agent.yaml` suffix), while the registry `id` is `contextualization-expert` (no suffix). Test the `name` attribute match, not `id`.
2. **Menu item cmd parsing:** The `cmd` attribute contains fuzzy match alternatives (e.g., `cmd="LP or fuzzy match on lean-persona"`). The existing `loadAgentDefinition()` only extracts the `cmd` string. To verify specific triggers, check if the cmd string starts with the expected shortcode (LP, PV, CS, etc.).
3. **Rules section parsing:** `loadAgentDefinition()` does NOT currently extract rules. Parse `<r>` tags directly from agent file content for rule count validation.
4. **Template placeholder syntax:** Emma's workflow templates use `{variable-name}` (single curly braces), NOT `{{variable-name}}` (double). The regex should match single-brace patterns.
5. **validate.md for lean-persona:** This file exists but contains placeholder content ("Coming in v1.2.0"). The exec path `VL` → `lean-persona/validate.md` still resolves to a real file — test file existence, not content completeness.
6. **Party mode exec path:** PM points to `_bmad/core/workflows/party-mode/workflow.md` which is OUTSIDE the `_vortex` directory. Still a valid path.

### Previous Story Learnings (p2-2-1)

- **before() hooks reduce file I/O:** Use `before()` to load agent definition once per describe block, not per test.
- **Filesystem-verify all factual claims:** Previous story's "synthesize final step" convention was wrong for 5/22 workflows. Verify every claim here.
- **Module-level constants for shared patterns:** Use `const STEP_PATTERN = /^step-\d{2}(-[^.]+)?\.md$/;` pattern for shared regex.
- **Diagnostic assertion messages:** Every `assert.*` call MUST include a message string with "Emma (contextualization-expert):" prefix for NFR2 compliance.
- **Review will find 3-7 issues:** Budget for a code review pass. Common findings: stale JSDoc, redundant calls, missing edge cases.

### Files to Create

- `tests/p0/p0-emma.test.js` (NEW — Emma-specific P0 activation, workflow, and infrastructure tests)

### Files to Modify

- `_bmad-output/implementation-artifacts/sprint-status.yaml` (MODIFY — story status transitions)

### Project Structure Notes

- Single test file `p0-emma.test.js` in existing `tests/p0/` directory — no new directories needed
- Follows established pattern from `p0-activation.test.js` and `p0-workflow-structure.test.js`
- Test file imported through existing `npm run test:p0` glob: `node --test tests/p0/*.test.js`
- No changes to `helpers.js` or `templates.js` unless a missing export is discovered during implementation

### References

- [Source: _bmad-output/planning-artifacts/epics-phase2.md — Epic 2, Story 2.2]
- [Source: _bmad-output/planning-artifacts/prd-phase2.md — FR7, FR8, FR10, NFR1, NFR2, NFR3]
- [Source: scripts/update/lib/agent-registry.js — Emma entry (lines 15-24), WORKFLOWS (lines 95-97), derived exports]
- [Source: _bmad/bme/_vortex/agents/contextualization-expert.md — Emma agent definition, persona, menu, activation]
- [Source: _bmad/bme/_vortex/workflows/lean-persona/ — 6 steps, template, validate.md]
- [Source: _bmad/bme/_vortex/workflows/product-vision/ — 6 steps, template]
- [Source: _bmad/bme/_vortex/workflows/contextualize-scope/ — 6 steps, template]
- [Source: tests/p0/helpers.js — loadAgentDefinition, AGENTS_DIR, WORKFLOWS_DIR]
- [Source: tests/p0/templates.js — INFRASTRUCTURE_AGENTS, getAgentTemplate]
- [Source: _bmad-output/implementation-artifacts/p2-2-1-build-registry-driven-p0-test-framework.md — Previous story learnings and completion notes]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Initial exec-path test failed: regex `exec="([^"]+)"` matched `exec="path/to/file.md"` from `<handler type="exec">` documentation section. Fixed by scoping regex to `<item>` tags: `/<item\s[^>]*exec="([^"]+)"[^>]*>/g`.

### Completion Notes List

- Created `tests/p0/p0-emma.test.js` with 39 tests across 3 describe blocks (7 activation + 21 workflow + 11 infrastructure)
- All tests use `before()` hooks: 2 `loadAgentDefinition` calls + 1 `AGENTS.find` call total (not per-test)
- Raw file content parsed separately for exec paths (`<item ... exec="...">`) and rules (`<r>` tags) since `loadAgentDefinition()` doesn't extract these
- Persona cross-validation uses "Product" keyword for role and "really solving" phrase for communication_style
- All 39 assertion messages include "Emma (contextualization-expert):" prefix for NFR2 diagnostic compliance
- P0 suite total: 231 tests (192 existing + 39 new), all passing
- Full suite total: 539 tests (248 unit + 60 integration + 231 P0), all passing
- Emma P0 timing: ~118ms (budget: 43 seconds)

### Code Review Fixes (3 MEDIUM issues)

- **M1**: Replaced hardcoded `step-06-synthesize.md` with dynamic last-step discovery — final step tests now find the last step file from sorted directory listing and include existence guard assertions
- **M2**: Added minimum step count assertion (`>= 2`) before step cross-reference loop to prevent vacuous pass on empty directories
- **M3**: WAVE3 exclusion test now derives Emma's workflow names from registry (`WORKFLOWS.filter(w => w.agent === EMMA_ID)`) instead of using the hardcoded `EMMA_WORKFLOW_NAMES` constant, catching any future workflow additions

### File List

- `tests/p0/p0-emma.test.js` (NEW) — Emma-specific P0 activation, workflow execution, and infrastructure integration tests
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (MODIFIED) — story status: ready-for-dev → in-progress → review
- `_bmad-output/implementation-artifacts/p2-2-2-p0-activation-workflow-tests-for-emma.md` (MODIFIED) — tasks checked, status transitions, dev agent record
