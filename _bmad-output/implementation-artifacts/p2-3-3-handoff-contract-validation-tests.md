# Story p2-3.3: Handoff Contract Validation Tests

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a maintainer,
I want automated tests that independently validate each handoff contract (HC1-HC5) by confirming the schema definitions contain all fields the consuming agent requires,
So that I can detect handoff contract violations before users encounter silent chain breaks.

## Acceptance Criteria

1. **Given** the HC1-HC5 schema files exist in `_bmad/bme/_vortex/contracts/`, **When** the maintainer runs handoff contract validation tests, **Then** each contract (HC1-HC5) is validated independently — confirming the schema defines all required frontmatter fields and body sections (FR13)
2. **Given** field checks run, **When** validating contract schemas, **Then** checks validate presence and non-emptiness without requiring exact string matching (FR14)
3. **Given** contract validation tests run, **When** schema content has cosmetic changes (whitespace, formatting), **Then** tests tolerate cosmetic differences — validating semantics, not syntax (NFR4)
4. **Given** a contract violation is detected, **When** the test report is generated, **Then** clear diagnostics identify the specific contract, missing field/section, producing agent, and consuming agent (FR15)
5. **Given** a test fails, **When** the failure message is displayed, **Then** it surfaces actionable messages — not generic assertion errors (NFR2)
6. **Given** the contract schemas exist, **When** validated, **Then** schemas are validated against PRD-defined Vortex chain data flow — confirming contracts reflect designed agent handoff behavior, not reverse-engineered from current output (AC7)

## Tasks / Subtasks

- [x] Task 1: Create `tests/p0/p0-handoff-contracts.test.js` — file setup and parsing utilities (AC: 1, 2, 3)
  - [x] 1.1: Create file with `'use strict'` + `node:test` + `node:assert/strict` + `fs` + `path` imports
  - [x] 1.2: Import from `./helpers`: `discoverAgents`, `VORTEX_DIR` — no other helpers needed (DRY: no agent-registry import)
  - [x] 1.3: Define `CONTRACTS_DIR = path.join(VORTEX_DIR, 'contracts')`
  - [x] 1.4: Create `extractYamlBlock(content)` utility — extracts first ```yaml code block from file content, returns raw YAML string (the HC files embed their frontmatter schema inside a code block, NOT as actual YAML frontmatter)
  - [x] 1.5: Create `extractFrontmatterFieldTable(content)` utility — parses the "Frontmatter Field Reference" markdown table, returns array of `{ field, required, type }` objects (field names are in backtick-delimited cells like `` `contract` ``)
  - [x] 1.6: Create `extractBodySections(content)` utility — extracts section headers matching pattern `### \d+\. (.+?) \*\((required|optional)\)\*`, returns array of `{ name, required: boolean }` objects
  - [x] 1.7: Call `discoverAgents()` at module level for agent cross-validation — NO hardcoded agent list (NFR5)

- [x] Task 2: Define HC_SCHEMAS constant — per-contract expected metadata (AC: 1, 6)
  - [x] 2.1: Create `HC_SCHEMAS` map keyed by contract ID (hc1-hc5), each entry containing: `{ file, contract, sourceAgent, sourceWorkflows, targetAgents, inputContract, requiredSections, optionalSections }`
  - [x] 2.2: Populate HC1: file `hc1-empathy-artifacts.md`, sourceAgent `isla`, sourceWorkflows `['user-interview', 'user-discovery', 'empathy-map']`, targetAgents `['mila']`, inputContract `null`, requiredSections `['Executive Summary', 'Research Context', 'Synthesized Insights', 'Key Themes', 'Pain Points', 'Desired Gains', 'Recommendations']`, optionalSections `['Empathy Map', 'Research Quality Assessment']`
  - [x] 2.3: Populate HC2: file `hc2-problem-definition.md`, sourceAgent `mila`, sourceWorkflows `['research-convergence', 'pivot-resynthesis']`, targetAgents `['liam']`, inputContract `HC1`, requiredSections `['Converged Problem Statement', 'Jobs-to-be-Done (JTBD)', 'Pains', 'Gains', 'Evidence Summary', 'Assumptions']`
  - [x] 2.4: Populate HC3: file `hc3-hypothesis-contract.md`, sourceAgent `liam`, sourceWorkflows `['hypothesis-engineering', 'experiment-design']`, targetAgents `['wade']`, inputContract `HC2`, requiredSections `['Problem Context', 'Hypothesis Contracts', 'Assumption Risk Map', 'Recommended Testing Order']`, optionalSections `['Flagged Concerns']`
  - [x] 2.5: Populate HC4: file `hc4-experiment-context.md`, sourceAgent `wade`, sourceWorkflows `['lean-experiment', 'proof-of-concept', 'proof-of-value', 'mvp']`, targetAgents `['noah']`, inputContract `HC3`, requiredSections — verify by reading full file body (expected: `['Experiment Summary', 'Hypothesis Tested', 'Experiment Method', 'Pre-Defined Success Criteria', 'Confirmed/Rejected Hypotheses', 'Strategic Context', 'Production Readiness']`), optionalSections `['Additional Results']`
  - [x] 2.6: Populate HC5: file `hc5-signal-report.md`, sourceAgent `noah`, sourceWorkflows `['signal-interpretation', 'behavior-analysis', 'production-monitoring']`, targetAgents `['max']`, inputContract `HC4`, requiredSections `['Signal Description', 'Context', 'Trend Analysis', 'Data Quality']`, optionalSections `['Anomaly Detection']`
  - [x] 2.7: **CRITICAL:** Verify all requiredSections and optionalSections by reading each HC file's full body and confirming section headers match — DO NOT trust this list blindly

- [x] Task 3: Test Suite — Schema File Existence & Frontmatter Structure (AC: 1, 2, 5)
  - [x] 3.1: Vacuous pass guard — assert HC_SCHEMAS has at least 5 entries and CONTRACTS_DIR exists
  - [x] 3.2: Per HC: assert schema file exists at `${CONTRACTS_DIR}/${schema.file}`
  - [x] 3.3: Per HC: extract YAML code block and assert it contains all 7 required frontmatter field names: `contract`, `type`, `source_agent`, `source_workflow`, `target_agents`, `input_artifacts`, `created`
  - [x] 3.4: Per HC: extract Frontmatter Field Reference table and assert all 7 fields are documented as Required=Yes
  - [x] 3.5: Per HC: assert `contract` value in YAML block matches expected contract ID (e.g., "HC1")
  - [x] 3.6: Per HC: assert `source_agent` value in YAML block matches expected short agent name
  - [x] 3.7: All assertion messages follow pattern: `HC{n} ({sourceAgent}→{targetAgent}): field — expected X, got Y` (NFR2)

- [x] Task 4: Test Suite — Required Body Sections Validation (AC: 1, 2, 3, 5)
  - [x] 4.1: Per HC: extract body sections using `extractBodySections()`
  - [x] 4.2: Per HC: assert all requiredSections from HC_SCHEMAS are present in extracted sections
  - [x] 4.3: Section name matching should be case-insensitive and trim whitespace (NFR4 cosmetic tolerance)
  - [x] 4.4: Assertion messages identify contract, missing section name, and producing agent (FR15, NFR2)

- [x] Task 5: Test Suite — Agent-Contract Cross-Validation (AC: 1, 4, 6)
  - [x] 5.1: Build agent short-name-to-ID map from `discoverAgents()`: `agent.name.toLowerCase()` → `agent.id` (e.g., "isla" → "discovery-empathy-expert")
  - [x] 5.2: Per HC: assert source_agent short name maps to a valid registry agent ID
  - [x] 5.3: Per HC: assert ALL target_agent short names map to valid registry agent IDs
  - [x] 5.4: Per HC: assert source_workflow names are valid workflows for the source agent (cross-reference against `agent.workflowNames` from discoverAgents)
  - [x] 5.5: Assertion messages include contract ID, short name, and resolved agent ID (NFR2)

- [x] Task 6: Test Suite — Vortex Chain Integrity (AC: 1, 6)
  - [x] 6.1: Assert chain connectivity: for each adjacent pair (HC1→HC2, HC2→HC3, HC3→HC4, HC4→HC5), the target agent of HCn matches the source agent of HCn+1
  - [x] 6.2: Assert input_artifacts chain: HC2's YAML block references HC1, HC3 references HC2, HC4 references HC3, HC5 references HC4 — verify `contract: HC{n-1}` appears in the input_artifacts of HC{n}
  - [x] 6.3: Assert first contract (HC1) has `input_artifacts: []` (empty — first in chain)
  - [x] 6.4: Diagnostic messages identify the specific broken chain link (FR15)

- [x] Task 7: Validation — run full test suite and verify (AC: all)
  - [x] 7.1: Run `npm run test:p0` — all P0 tests pass (429 existing + ~25-30 new = ~455-460 total)
  - [x] 7.2: Run `npm run test:p0:gate` — verify gate passes
  - [x] 7.3: Run `npm test` — existing unit tests pass (zero regressions)
  - [x] 7.4: Run `npm run lint` — zero errors, zero warnings
  - [x] 7.5: Verify all assertion messages include contract ID, agent names, and specific field/section for diagnostics (NFR2, FR15)
  - [x] 7.6: Verify new test file is auto-discovered by `npm run test:p0` glob pattern `tests/p0/*.test.js`

## Dev Notes

### Scope & Split Assessment

This story has one deliverable: a single P0 test file validating the 5 handoff contract schema definitions. Analysis: **NO SPLIT NEEDED.** The test file validates schema structure (frontmatter + body sections), agent cross-references, and chain integrity. All tests operate on the same 5 contract files. Expected: ~25-30 tests in 1 new file.

**Expected test counts:**
- Vacuous pass guards: 1
- Schema existence & frontmatter structure: 5 HCs × 3-4 tests = ~15-20
- Body sections validation: 5 HCs × 1 test = ~5
- Agent-contract cross-validation: 5 HCs × 1 test = ~5
- Chain integrity: ~3-5
- **Total: ~29-35 new tests. P0 suite total: 429 + ~30 = ~460.**

### Architecture Compliance

- **Language:** JavaScript ES2020+ — NO TypeScript
- **Test framework:** `node:test` + `node:assert/strict` — NOT Jest
- **Coverage:** c8 (`npm run test:coverage` includes P0 tests)
- **No new dependencies:** Use only existing deps — NO YAML parsing library, parse with regex
- **Linting:** Must pass `npm run lint` (ESLint)
- **File naming:** kebab-case for JS files, camelCase for variables

### Critical: HC Schema Files Are NOT YAML Frontmatter

The HC files (`_bmad/bme/_vortex/contracts/hc*.md`) are **markdown schema documentation**, NOT files with actual YAML frontmatter. The YAML frontmatter example is embedded inside a fenced code block:

```markdown
## Frontmatter Schema

\`\`\`yaml
---
contract: HC1
type: artifact
source_agent: isla
...
---
\`\`\`
```

**Parsing approach:** Extract the YAML content from between the `` ```yaml `` and `` ``` `` markers. Do NOT attempt to parse the file as a YAML-frontmatter document.

### Critical: Short Agent Names in HC Files

HC schema files use **short lowercase agent names** (not full registry IDs):

| HC File Short Name | Registry Agent ID | Display Name |
|---|---|---|
| `isla` | `discovery-empathy-expert` | Isla |
| `mila` | `research-convergence-specialist` | Mila |
| `liam` | `hypothesis-engineer` | Liam |
| `wade` | `lean-experiments-specialist` | Wade |
| `noah` | `production-intelligence-specialist` | Noah |
| `max` | `learning-decision-expert` | Max |

**Build the mapping dynamically** from `discoverAgents()` using `agent.name.toLowerCase()` → `agent.id`. Do NOT hardcode this mapping in the test file.

### Critical: Body Section Header Format

HC schema body sections follow this pattern:

```markdown
### 1. Executive Summary *(required)*
### 7. Empathy Map *(optional)*
```

**Regex pattern:** `/^###\s+\d+\.\s+(.+?)\s+\*\((required[^)]*|optional[^)]*)\)\*/gm`

This extracts the section name and its annotation (which may contain extra text beyond just "required"/"optional"). Classify as required if the annotation starts with "required", optional if it starts with "optional". Three HC sections have non-standard annotations that the simpler `(required|optional)` pattern would miss — see Edge Case #3.

### Critical: Vortex Chain — PRD-Defined Data Flow (AC7)

The tests must validate that the HC chain matches the **designed** Vortex data flow, not just what happens to work today. The designed chain per PRD:

```
Isla → [HC1] → Mila → [HC2] → Liam → [HC3] → Wade → [HC4] → Noah → [HC5] → Max
```

Each HC's `target_agents` must include the source of the next HC. Each HC (except HC1) must reference the previous HC in its `input_artifacts` example. This validates the architecture's intended agent handoff flow.

### Critical: Source Workflow Validation

Each HC's `source_workflow` field lists valid workflow names for the producing agent. Cross-validate against the producing agent's `workflowNames` array from `discoverAgents()`. For example:

| HC | Source Agent | Valid Workflows (from registry) |
|---|---|---|
| HC1 | isla (discovery-empathy-expert) | empathy-map, user-interview, user-discovery |
| HC2 | mila (research-convergence-specialist) | research-convergence, pivot-resynthesis, pattern-mapping |
| HC3 | liam (hypothesis-engineer) | hypothesis-engineering, assumption-mapping, experiment-design |
| HC4 | wade (lean-experiments-specialist) | mvp, lean-experiment, proof-of-concept, proof-of-value |
| HC5 | noah (production-intelligence-specialist) | signal-interpretation, behavior-analysis, production-monitoring |

Note: Not all of an agent's workflows are listed in the HC `source_workflow` field — the HC lists only the workflows that can produce that particular contract type. The test should verify that each workflow listed in the HC is a valid workflow for that agent (subset check), not that the HC lists ALL agent workflows.

### Previous Story Learnings (p2-3-2)

- **Import from helpers.js** — Use `VORTEX_DIR` from helpers (do not redefine paths locally)
- **No dead imports** — Only import what's actually used (DRY)
- **Vacuous pass guards (M2)** — Assert minimum counts before iterating (e.g., assert HC_SCHEMAS has ≥5 entries, assert CONTRACTS_DIR exists)
- **Diagnostic assertion messages (NFR2)** — Every assertion includes contract ID + agent names + specific field
- **No hardcoded agent lists (NFR5)** — Use `discoverAgents()` for all agent lookups; HC_SCHEMAS is acceptable since contract schemas are architecture-specific constants, not agent discovery
- **STEP_PATTERN from helpers (M3)** — Not needed for this story (no step file validation)
- **Cosmetic tolerance (NFR4)** — Section name matching should be case-insensitive and whitespace-tolerant

### Edge Cases and Gotchas

1. **YAML code block parsing:** The HC files have `## Frontmatter Schema` followed by a ```yaml block. There may be other YAML/code blocks in the file. Always target the FIRST ```yaml block after "Frontmatter Schema" heading, or simply the first ```yaml block in the file.
2. **Frontmatter Field Reference table parsing:** Field names are in backtick-delimited cells (`` `contract` ``). Extract field names by stripping backticks. The "Required" column values are "Yes" or "No".
3. **Three non-standard section header annotations:** The regex must use `(required[^)]*|optional[^)]*)` instead of `(required|optional)` to capture these variants:
   - HC3 Section 2: `*(required, 1-3 per artifact)*` — classify as **required**
   - HC4 Section 8: `*(required for graduated experiments)*` — classify as **required** (conditional)
   - HC5 Section 4: `*(optional, required when unexpected patterns detected)*` — classify as **optional** (conditional)
   All three should be treated as their base type (required or optional) for validation purposes.
4. **HC2 "Jobs-to-be-Done (JTBD)" section name:** The exact header is `### 2. Jobs-to-be-Done (JTBD) *(required)*` — the "(JTBD)" suffix is part of the section name. The HC_SCHEMAS entry must use `'Jobs-to-be-Done (JTBD)'`, not `'Jobs-to-be-Done'`.
5. **Agent not in HC chain:** Emma (contextualization-expert) is NOT a source or target in any HC1-HC5 contract. The cross-validation only covers Isla, Mila, Liam, Wade, Noah, Max. Do NOT assert that all 7 agents appear in contracts.
6. **HC1 input_artifacts:** Shown as `[]` (empty array). The YAML block text should contain `input_artifacts: []`. Other HCs have multi-line input_artifacts blocks. Parse accordingly.
7. **Multiple source_workflow values:** The HC frontmatter field reference table lists multiple valid values (e.g., HC1: "user-interview, user-discovery, empathy-map"). The example YAML block shows only one. Test should check the table description, not just the example.

### Files to Create

- `tests/p0/p0-handoff-contracts.test.js` (NEW — handoff contract schema validation tests for HC1-HC5)

### Files to Modify

- `_bmad-output/implementation-artifacts/sprint-status.yaml` (MODIFY — story status transitions)

### Project Structure Notes

- 1 new test file in existing `tests/p0/` directory — no new directories needed
- New test file auto-discovered by existing `npm run test:p0` glob: `node --test tests/p0/*.test.js`
- HC_SCHEMAS constant defined within the test file (not extracted to helpers) since it's test-specific architecture knowledge
- Parsing utilities defined within the test file — they parse HC schema documentation format, not general-purpose infrastructure
- No changes to helpers.js or package.json needed

### References

- [Source: _bmad-output/planning-artifacts/epics-phase2.md — Epic 3, Story 3.3]
- [Source: _bmad-output/planning-artifacts/prd-phase2.md — FR13, FR14, FR15, NFR2, NFR4, NFR5]
- [Source: _bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md — HC1 schema: Isla → Mila]
- [Source: _bmad/bme/_vortex/contracts/hc2-problem-definition.md — HC2 schema: Mila → Liam]
- [Source: _bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md — HC3 schema: Liam → Wade]
- [Source: _bmad/bme/_vortex/contracts/hc4-experiment-context.md — HC4 schema: Wade → Noah]
- [Source: _bmad/bme/_vortex/contracts/hc5-signal-report.md — HC5 schema: Noah → Max]
- [Source: tests/p0/helpers.js — discoverAgents(), VORTEX_DIR, STEP_PATTERN exports]
- [Source: scripts/update/lib/agent-registry.js — 7 agents with persona, workflow metadata]
- [Source: tests/p0/p0-voice-consistency.test.js — Dynamic agent discovery pattern, VOICE_MARKERS approach]
- [Source: _bmad-output/implementation-artifacts/p2-3-2-voice-consistency-validation-full-p0-confidence-gate.md — Previous story learnings, code review fixes]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (claude-opus-4-6)

### Debug Log References

### Completion Notes List

- Created `tests/p0/p0-handoff-contracts.test.js` with 39 new tests across 4 suites (21 schema structure + 5 body sections + 10 agent cross-validation + 3 chain integrity)
- P0 suite total: 468 tests (429 existing + 39 new), all passing in ~342ms
- 3 parsing utilities: `extractYamlBlock()`, `extractFrontmatterFieldTable()`, `extractBodySections()` — all handle non-standard section annotations (HC3 "required, 1-3 per artifact", HC4 "required for graduated experiments", HC5 "optional, required when unexpected patterns detected")
- HC_SCHEMAS verified against all 5 HC files: HC2 uses "Jobs-to-be-Done (JTBD)" not "Jobs-to-be-Done"
- Agent short-name-to-ID mapping built dynamically from `discoverAgents()` using `agent.name.toLowerCase()` — no hardcoded mapping
- Applied all previous story learnings: VORTEX_DIR from helpers (DRY), no dead imports, vacuous pass guards (M2), diagnostic assertion messages with contract ID + agent names (NFR2)
- No new dependencies, no helpers.js or package.json changes needed
- Unit tests: 248 pass, 0 fail. Lint: 0 errors, 0 warnings.
- **Code Review Fixes (3M fixed):** M1: Added bidirectional body section count assertion to detect drift. M2: Chain integrity input_artifacts test now searches only after `input_artifacts:` key, not entire YAML block. M3: Frontmatter Required field check now case-insensitive (`cells[1]?.toLowerCase() === 'yes'`) for NFR4 consistency.

### File List

- `tests/p0/p0-handoff-contracts.test.js` (NEW)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (MODIFIED — status transitions)
