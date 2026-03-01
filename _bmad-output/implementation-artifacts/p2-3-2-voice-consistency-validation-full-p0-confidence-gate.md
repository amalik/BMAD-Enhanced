# Story p2-3.2: Voice Consistency Validation & Full P0 Confidence Gate

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a maintainer,
I want voice consistency checks across all 7 agents and a single command to run the complete P0 suite as a pre-publish gate,
So that I can verify every agent's output matches its documented communication style and have a one-step confidence check before publishing.

## Acceptance Criteria

1. **Given** P0 activation and workflow tests exist for all 7 agents (Stories 2.2, 2.3, 3.1), **When** the maintainer runs voice consistency tests, **Then** each agent's output is checked for terminology, framing, and tone markers consistent with its documented `communication_style` and `principles` (FR9)
2. **Given** voice consistency tests run, **When** results are reported, **Then** voice consistency results are clearly labeled as low-confidence checks requiring human spot-check (FR9)
3. **Given** all individual agent P0 suites are in place, **When** the maintainer runs the complete P0 suite, **Then** all 7 agents' activation, workflow, and voice tests execute as a single pre-publish confidence gate (FR11)
4. **Given** the full P0 suite runs, **When** it completes, **Then** the full suite completes in under 5 minutes (NFR3)
5. **Given** a P0 test fails, **When** the suite summary is reported, **Then** it reports pass/fail per agent with actionable diagnostics for any failures (NFR2)
6. **Given** the P0 suite discovers agents, **When** a new agent is added to the registry, **Then** the suite discovers agents dynamically — no hardcoded agent list in the runner (NFR5)

## Tasks / Subtasks

- [x] Task 1: Create `tests/p0/p0-voice-consistency.test.js` — voice consistency validation for all 7 agents (AC: 1, 2, 5, 6)
  - [x] 1.1: Create file with `'use strict'` + `node:test` + `node:assert/strict` imports
  - [x] 1.2: Import from `./helpers` (discoverAgents, loadAgentDefinition, STEP_PATTERN) — no agent-registry import needed (DRY: discoverAgents() provides all registry data)
  - [x] 1.3: Call `discoverAgents()` at module level to dynamically discover all 7 agents — NO hardcoded agent list (NFR5)
  - [x] 1.4: Describe suite "P0 Voice Consistency: Registry vs Agent Definition (Low-Confidence)" — iterate over all agents dynamically
  - [x] 1.5: Per-agent: test registry `persona.communication_style` shares at least 1 characteristic phrase with agent file `<communication_style>` (cross-validation — currently only Emma/Wade have this, extends to all 7)
  - [x] 1.6: Per-agent: test registry `persona.role` shares at least 1 significant keyword (3+ chars) with agent file `<role>`
  - [x] 1.7: Per-agent: test registry `persona.expertise` themes appear in agent file `<principles>` (at least 2 shared domain keywords)
  - [x] 1.8: Per-agent: test all 4 registry persona fields (role, identity, communication_style, expertise) are non-empty strings
  - [x] 1.9: Describe suite "P0 Voice Consistency: Workflow Step Voice Markers (Low-Confidence)" — iterate over all agents and their workflows dynamically
  - [x] 1.10: Per-agent/workflow: look up the agent's domain vocabulary from the `VOICE_MARKERS` map (defined in Task 2) — skip agents with no entry
  - [x] 1.11: Per-agent/workflow: read all step files for the workflow and concatenate content
  - [x] 1.12: Per-agent/workflow: assert that concatenated step content contains at least 2 of the agent's domain vocabulary words — this validates voice consistency in output (FR9)
  - [x] 1.13: Per-agent/workflow: assertion messages include "Low-Confidence" label and "human spot-check recommended" suffix (AC 2)
  - [x] 1.14: All assertion messages follow established pattern: "AgentName (agent-id): ..." with actionable diagnostics (NFR2)

- [x] Task 2: Define per-agent voice vocabulary constants (AC: 1, 2)
  - [x] 2.1: Create a `VOICE_MARKERS` map keyed by agent ID, each entry containing: `{ phrases: string[], vocabulary: string[] }`
  - [x] 2.2: `phrases` = 1-3 characteristic phrases extracted from `persona.communication_style` that appear in BOTH registry and agent file (e.g., Emma: ["really solving"], Isla: ["I noticed that", "asked them WHY"])
  - [x] 2.3: `vocabulary` = 4-6 domain-specific words extracted from `persona.communication_style` + `persona.expertise` (e.g., Emma: ["persona", "hypothesis", "assumption", "context", "problem"], Noah: ["signal", "pattern", "observe", "behavior", "metric"])
  - [x] 2.4: Verify markers against actual agent files and workflow step content before hardcoding — filesystem-verify that each marker actually appears where expected

- [x] Task 3: Add P0 confidence gate npm script and documentation (AC: 3, 4, 6)
  - [x] 3.1: Verify existing `npm run test:p0` auto-discovers the new `p0-voice-consistency.test.js` via glob pattern `tests/p0/*.test.js`
  - [x] 3.2: Add `test:p0:gate` npm script in package.json — runs P0 tests with strict exit code (fails build on any test failure)
  - [x] 3.3: Verify `node --test` output groups results by describe block (per-agent reporting) satisfying per-agent summary requirement (NFR2)
  - [x] 3.4: Verify dynamic discovery: `discoverAgents()` in voice tests + glob in npm script = no hardcoded agent lists (NFR5)

- [x] Task 4: Validation — run full test suite and verify (AC: all)
  - [x] 4.1: Run `npm run test:p0` — all P0 tests pass (393 existing + ~35-50 new voice tests = ~430-443 total)
  - [x] 4.2: Run `npm run test:p0:gate` — verify gate script works and returns correct exit code
  - [x] 4.3: Run `npm test` — existing unit tests pass (zero regressions)
  - [x] 4.4: Run `npm run lint` — zero errors, zero warnings
  - [x] 4.5: Verify full P0 suite completes in well under 5 minutes (NFR3) — current baseline: ~550ms for 393 tests
  - [x] 4.6: Verify all voice consistency assertion messages include "Low-Confidence" label (AC 2)
  - [x] 4.7: Verify all assertion messages include agent name and ID for diagnostic identification (NFR2)

## Dev Notes

### Scope & Split Assessment

This story has two distinct deliverables: (A) voice consistency tests and (B) P0 confidence gate. Analysis: **NO SPLIT NEEDED.** The confidence gate is largely already in place via `npm run test:p0`. The gate work is just adding an npm script alias and verifying per-agent reporting. The voice consistency tests are the bulk of the work (~1 new test file with ~35-50 tests). Both deliverables fit comfortably in one story.

**Expected test counts:**
- Registry vs Agent Definition cross-validation: ~7 agents x 4 tests = ~28
- Workflow Step Voice Markers: ~7 agents x 1 aggregated test per agent (checking across all workflows) = ~7
- **Total: ~35 new tests. P0 suite total: 393 + 35 = ~428.**

### Architecture Compliance

- **Language:** JavaScript ES2020+ — NO TypeScript
- **Test framework:** `node:test` + `node:assert/strict` — NOT Jest
- **Coverage:** c8 (`npm run test:coverage` includes P0 tests)
- **No new dependencies:** Use only existing deps
- **Linting:** Must pass `npm run lint` (ESLint)
- **File naming:** kebab-case for JS files, camelCase for variables

### Critical: Dynamic Agent Discovery (NFR5)

Voice consistency tests MUST use `discoverAgents()` from helpers.js — NOT hardcoded agent lists. When a new agent is added to `agent-registry.js`, voice tests should automatically include it. The only per-agent specifics are the `VOICE_MARKERS` map (vocabulary constants), which is acceptable since voice markers are inherently agent-specific.

**Pattern:** Use `discoverAgents()` to get the list, then look up `VOICE_MARKERS[agent.id]` for the vocabulary. If an agent has no VOICE_MARKERS entry, the test should SKIP (not fail) with a message like "No voice markers defined for {name} — add to VOICE_MARKERS".

### Critical: Low-Confidence Labeling (FR9)

The epic explicitly states: "Voice consistency tests (FR9) carry low confidence — human spot-check remains necessary." ALL voice consistency assertion messages MUST include a "Low-Confidence" label. This distinguishes them from the high-confidence structural tests.

**Pattern for assertion messages:**
```javascript
`[Low-Confidence] ${agent.name} (${agent.id}): communication_style cross-validation — registry and agent file should share characteristic phrase "${phrase}" (human spot-check recommended)`
```

### Voice Markers — Registry-Derived Reference

| Agent | ID | Characteristic Phrases (from communication_style) | Domain Vocabulary (from communication_style + expertise) |
|-------|----|--------------------------------------------------|--------------------------------------------------------|
| Emma | contextualization-expert | "really solving" | persona, hypothesis, assumption, context, problem, product, vision |
| Isla | discovery-empathy-expert | "I noticed that", "asked them WHY" | empathy, observe, discover, interview, user, research, feelings |
| Mila | research-convergence-specialist | "what the research is telling us", "Three patterns converge" | converge, synthesize, pattern, insight, evidence, research, finding |
| Liam | hypothesis-engineer | "What if?", "safe bet" | hypothesis, assumption, brainwriting, falsifiable, belief, experiment |
| Wade | lean-experiments-specialist | "validated learning", "MVPs" | experiment, assumption, measure, MVP, lean, learning, evidence |
| Noah | production-intelligence-specialist | "The signal indicates", "what we're seeing in context" | signal, pattern, observe, behavior, metric, anomaly, data |
| Max | learning-decision-expert | "The evidence suggests", "what we've learned" | evidence, decision, pivot, learning, data, action, experiment |

**CRITICAL:** These markers MUST be verified against actual filesystem content before hardcoding. Run grep on each agent's workflow step files to confirm vocabulary words actually appear.

### Existing Voice-Related Tests (DO NOT DUPLICATE)

The following per-agent tests already exist and MUST NOT be duplicated:

| Test | Location | What it checks |
|------|----------|---------------|
| `persona role contains "Keyword"` | p0-{agent}.test.js | Role keyword in agent file |
| `persona identity references stream` | p0-{agent}.test.js | Stream name in identity |
| `persona communication_style contains phrase` | p0-{agent}.test.js | 1 characteristic phrase |
| `registry persona has all 4 fields` | p0-emma.test.js, p0-wade.test.js | Non-empty persona fields (infrastructure only) |
| `registry and agent file roles share keyword` | p0-emma.test.js, p0-wade.test.js | Cross-validation (infrastructure only) |
| `communication styles share pattern` | p0-emma.test.js, p0-wade.test.js | Cross-validation (infrastructure only) |

**Story 3.2 EXTENDS these patterns to ALL 7 agents via dynamic discovery**, and ADDS:
1. Cross-validation for ALL 7 agents (not just Emma/Wade)
2. Expertise/principles cross-validation (new)
3. Workflow step voice marker checks (new — FR9 core)
4. Low-confidence labeling (new)

**Duplication note:** The voice consistency file tests all 7 agents including Emma/Wade. Some overlap with p0-emma.test.js/p0-wade.test.js cross-validation is acceptable since the voice file uses a different validation approach (VOICE_MARKERS vocabulary) and serves as the unified low-confidence gate.

### What the P0 Confidence Gate Actually Needs

The existing infrastructure already provides most of the gate:
- `npm run test:p0` → `node --test tests/p0/*.test.js` — auto-discovers all P0 tests via glob
- `node --test` exit code is non-zero on failure — suitable for CI
- `node --test` output groups by describe blocks — per-agent reporting

**Remaining work:**
1. Add `test:p0:gate` npm script — a semantic alias for `test:p0` intended as the CI pipeline entry point. Since `node --test` already returns non-zero on failure, the gate script can be identical to `test:p0`. If desired, add `--test-reporter spec` for CI-friendly output formatting.
2. Verify new voice test file is auto-discovered by the glob
3. Document the gate usage in a comment or README section

### Previous Story Learnings (p2-3-1)

- **Import STEP_PATTERN from helpers.js** — DO NOT redefine locally (M3 fix from code review)
- **Use `before()` hooks with directory guards** — assert directories exist before reading
- **Diagnostic assertion messages** — "AgentName (agent-id): message" prefix
- **M1 dynamic final step discovery** — don't hardcode step filenames
- **M2 vacuous pass guards** — assert minimum counts before loops
- **Dead require() imports** — DO NOT import from agent-registry unless using named exports
- **Code review found STEP_PATTERN duplication** — now exported from helpers.js, import it

### Code Review Fixes Applied Proactively from Epic 2-3

| Fix | Description | Application |
|-----|-------------|-------------|
| M1 | Dynamic final step discovery | Not directly applicable — voice tests check all steps, not just final |
| M2 | Vacuous pass guard | Apply: assert agent has workflows before iterating |
| M3 | STEP_PATTERN from helpers | Import from helpers.js, do not redefine |
| DRY | No dead imports | Only import what's actually used |
| Diagnostics | Agent name + ID in every assertion | Required by NFR2 |

### Edge Cases and Gotchas

1. **Vocabulary false positives:** Common words like "data", "learn", "pattern" appear across multiple agents. Use multi-word phrases for cross-validation, vocabulary words only for step content (where they're intentionally loose).
2. **Agent without VOICE_MARKERS:** If a new agent is added but no VOICE_MARKERS entry exists, the test should SKIP with a diagnostic message, not FAIL. Use `node:test`'s `skip()` or a conditional assertion.
3. **Short workflow steps:** Some step files may be very short (e.g., 10-20 lines). Vocabulary checks on individual steps would be fragile. Concatenate ALL steps per workflow before checking.
4. **Registry expertise vs agent file principles:** The registry field is called `expertise`, the agent file field is called `<principles>`. These are the same content with different field names. The `loadAgentDefinition()` helper returns `persona.principles`.
5. **Template placeholder text:** Template files (Isla, Max) contain `{variable-name}` placeholders, not agent voice. DO NOT include template files in voice marker checks — only check step files.
6. **Communication_style in registry is escaped:** Registry strings use `\'` for apostrophes. The agent file uses actual `'`. Phrase matching should handle this (use `.includes()` on the unescaped content from the agent file).

### Files to Create

- `tests/p0/p0-voice-consistency.test.js` (NEW — voice consistency + cross-validation tests for all 7 agents)

### Files to Modify

- `package.json` (MODIFY — add `test:p0:gate` script)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (MODIFY — story status transitions)

### Project Structure Notes

- 1 new test file in existing `tests/p0/` directory — no new directories needed
- New test file auto-discovered by existing `npm run test:p0` glob: `node --test tests/p0/*.test.js`
- Voice markers map is defined within the test file (not extracted to helpers) since it's test-specific, not reusable infrastructure
- Package.json gets a new script; no other config changes

### References

- [Source: _bmad-output/planning-artifacts/epics-phase2.md — Epic 3, Story 3.2]
- [Source: _bmad-output/planning-artifacts/prd-phase2.md — FR9, FR11, FR12, NFR1, NFR2, NFR3, NFR4, NFR5, NFR8]
- [Source: scripts/update/lib/agent-registry.js — 7 agents with persona.communication_style, persona.expertise fields]
- [Source: tests/p0/helpers.js — discoverAgents(), loadAgentDefinition(), STEP_PATTERN, AGENTS_DIR, WORKFLOWS_DIR]
- [Source: tests/p0/templates.js — CONTENT_ONLY_AGENTS, INFRASTRUCTURE_AGENTS]
- [Source: tests/p0/p0-activation.test.js — Dynamic agent discovery pattern using discoverAgents()]
- [Source: tests/p0/p0-emma.test.js — Infrastructure cross-validation pattern (lines 250-327)]
- [Source: tests/p0/p0-wade.test.js — Infrastructure cross-validation pattern]
- [Source: tests/p0/p0-isla.test.js — Content-only characteristic phrase test pattern]
- [Source: _bmad-output/implementation-artifacts/p2-3-1-p0-content-only-tests-for-remaining-5-agents.md — Previous story: code review fixes, STEP_PATTERN extraction, dead import removal]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (claude-opus-4-6)

### Debug Log References

### Completion Notes List

- Created `tests/p0/p0-voice-consistency.test.js` with 36 new tests (29 registry cross-validation + 7 workflow voice markers)
- P0 suite total: 429 tests (393 existing + 36 new), all passing in ~374ms
- VOICE_MARKERS verified against filesystem: Emma "truly for" phrase removed (not in agent file), Wade phrases changed to "validated learning"/"MVPs" (originals not in registry communication_style)
- Vocabulary words verified: replaced 6 absent words (Emma: strategic/framing, Isla: qualitative, Liam: ideation/creative, Max: systematize) with words confirmed present in step files
- Applied all code review learnings: STEP_PATTERN from helpers (M3), no dead imports (DRY), vacuous pass guards (M2), agent name+ID diagnostics (NFR2)
- No agent-registry import needed — discoverAgents() provides all registry persona data
- Added `test:p0:gate` npm script as semantic CI alias for `test:p0`
- Unit tests: 248 pass, 0 fail. Lint: 0 errors, 0 warnings.

### File List

- `tests/p0/p0-voice-consistency.test.js` (NEW)
- `package.json` (MODIFIED — added `test:p0:gate` script)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (MODIFIED — status transitions)
