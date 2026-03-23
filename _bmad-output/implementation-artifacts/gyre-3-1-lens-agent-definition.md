# Story 3.1: Lens Agent Definition

Status: ready-for-dev

## Story

As a user,
I want to activate Lens and have it offer gap analysis options,
So that I can find what's missing from my production stack.

## Acceptance Criteria

1. **Given** the Lens agent file is created at `_bmad/bme/_gyre/agents/readiness-analyst.md`
   **When** the agent is activated
   **Then** it follows the XML activation protocol:
   - Step 1: Load persona from agent file
   - Step 2: Load `_bmad/bme/_gyre/config.yaml` — error handling if missing or invalid
   - Step 3: Store user_name from config
   - Step 4: Greet user by name, communicate in configured language, display numbered menu
   - HELP_STEP: Show `/bmad-help` tip
   - Step 5: Wait for user input (number, text, or fuzzy match)
   - Step 6: Process input via menu handlers
   - Step 7: Execute selected menu item

2. **And** Lens's menu includes: [AG] Analyze Gaps, [DR] Delta Report, [FA] Full Analysis
   **And** menu items use `exec` handler type pointing to workflow.md files

3. **And** Lens's persona is "thorough analyst" — finds gaps methodically, source-tags everything, never inflates severity

## Tasks / Subtasks

- [ ] Task 1: Validate existing Lens agent file structure (AC: #1)
  - [ ] 1.1 Verify frontmatter has `name: "readiness analyst"` and `description`
  - [ ] 1.2 Verify XML agent attributes: id=`readiness-analyst.agent.yaml`, name=`Lens`, title=`Readiness Analyst`, icon=`🔬`
  - [ ] 1.3 Verify XML activation protocol has all 7 steps plus HELP_STEP (between Step 4 and Step 5) in correct order
  - [ ] 1.4 Verify Step 2 loads `_bmad/bme/_gyre/config.yaml` with error handling for missing file AND missing fields (two distinct error cases)
  - [ ] 1.5 Verify Step 4 greets user by `{user_name}`, communicates in `{communication_language}`, displays numbered menu
  - [ ] 1.6 Verify Step 5 waits for user input (number, text, or fuzzy match)
  - [ ] 1.7 Verify menu handlers section includes exec, data, and workflow handler types (all three must be present)

- [ ] Task 2: Validate menu items (AC: #2)
  - [ ] 2.1 Verify menu includes [AG] Analyze Gaps pointing to `workflows/gap-analysis/workflow.md` via exec handler
  - [ ] 2.2 Verify menu includes [DR] Delta Report pointing to `workflows/delta-report/workflow.md` via exec handler
  - [ ] 2.3 Verify menu includes [FA] Full Analysis pointing to `workflows/full-analysis/workflow.md` via exec handler
  - [ ] 2.4 Verify standard menu items present: [MH] Menu Help, [CH] Chat, [PM] Party Mode (pointing to `_bmad/core/workflows/party-mode/workflow.md`), [DA] Dismiss Agent

- [ ] Task 3: Validate persona definition (AC: #3)
  - [ ] 3.1 Verify persona role is "Absence Detection + Cross-Domain Correlation Specialist"
  - [ ] 3.2 Verify identity describes "thorough analyst" who compares capabilities manifest against filesystem evidence, identifies absences
  - [ ] 3.3 Verify communication_style is thorough and honest — presents findings with evidence and confidence levels, never inflates severity
  - [ ] 3.4 Verify principles include: absence detection, source-tagging, cross-domain correlation, confidence accuracy, severity honesty

- [ ] Task 4: Validate Lens-specific rules (AC: #1, #3)
  - [ ] 4.1 Verify rules include: GC2 must be loaded before any analysis
  - [ ] 4.2 Verify rules include: absence detection finds what's MISSING, not just misconfigured
  - [ ] 4.3 Verify rules include: source-tag every finding (static-analysis vs contextual-model)
  - [ ] 4.4 Verify rules include: never inflate severity
  - [ ] 4.5 Verify rules include: cross-domain correlation only runs when both domain analyses succeed
  - [ ] 4.6 Verify rules include: confidence levels reflect actual evidence strength
  - [ ] 4.7 Verify rules include: communication language enforcement

- [ ] Task 5: Cross-reference with Story 2.2 (Atlas) validation pattern
  - [ ] 5.1 Verify Lens follows same XML activation protocol structure as Atlas/Scout
  - [ ] 5.2 Verify error handling messages reference "Lens" (not Atlas/Scout or generic agent names)
  - [ ] 5.3 Verify workflow error message references "Lens to run analysis activities" (agent-specific error context)

- [ ] Task 6: Fix any discrepancies found in Tasks 1-5

## Dev Notes

### Pre-existing File — Validation Approach

The file `_bmad/bme/_gyre/agents/readiness-analyst.md` already exists from the 2026-03-21 architecture scaffolding. This story validates the existing file against the ACs and architecture spec. Fix any discrepancies found.

### Architecture Reference — Lens Agent

From `architecture-gyre.md`:

- **Agent ID:** `readiness-analyst`
- **Name:** Lens
- **Icon:** 🔬
- **Role:** Compares capabilities manifest against what actually exists in the project. Identifies absences.
- **Persona:** Thorough analyst. Finds gaps methodically. Source-tags every finding. Never inflates severity.
- **Tools used:** Glob (find evidence files), Grep (search for evidence), Read (examine configs), Bash (check packages)

**Analysis process:**
1. Load GC2 (Capabilities Manifest)
2. For each capability: search filesystem for evidence of implementation
3. Evidence types: present, absent, partial
4. Tag findings: source (static-analysis/contextual-model), confidence (high/medium/low), severity (blocker/recommended/nice-to-have)
5. Run cross-domain correlation for compound findings
6. Validate compounds: exactly 2 findings from different domains

**Menu items (architecture spec):**
1. Analyze Gaps — workflow: gap-analysis
2. Full Analysis — workflow: full-analysis
3. Delta Report — workflow: delta-report

### XML Activation Protocol Pattern

Must follow exact Gyre agent pattern (validated in Story 1.2 for Scout, Story 2.2 for Atlas):

1. Step 1: Load persona
2. Step 2: MANDATORY config loading with error handling (file missing, fields missing)
3. Step 3: Store user_name
4. Step 4: Greet + display menu
5. HELP_STEP: `/bmad-help` tip
6. Step 5: STOP and wait
7. Step 6: Input routing (number, text, fuzzy, no match)
8. Step 7: Extract handler attributes and execute

**Menu handler types:** exec, data, workflow — all three in `<menu-handlers>`.

### Agent-Specific Rules (from architecture)

Lens rules must include:
- GC2 must be loaded before any analysis — never analyze without a model
- Absence detection finds what's MISSING, not just what's misconfigured
- Source-tag every finding: static-analysis (file evidence) or contextual-model (inferred)
- Never inflate severity — accuracy builds credibility
- Cross-domain correlation only runs when both domain analyses succeed
- Confidence levels must reflect actual evidence strength

### What NOT to Modify

- **Do NOT modify Atlas agent file** — Already validated in Story 2.2
- **Do NOT modify Scout agent file** — Already validated in Story 1.2
- **Do NOT modify model-generation workflow files** — Already validated in Story 2.3
- **Do NOT modify GC1 or GC2 contracts** — Validated in Stories 1.4 and 2.4
- **Do NOT modify config.yaml** — Already validated in Story 1.1

### Previous Story Intelligence

From Story 2.2 completion notes (Atlas agent validation — same pattern):
- All 24 validation subtasks passed across 6 tasks — zero discrepancies
- Exact XML activation protocol structure validated (7 steps + HELP_STEP)
- Menu items validated: exec handler type, correct workflow paths, standard items (MH/CH/PM/DA)
- Persona validated: role, identity, communication_style, principles
- Agent-specific rules validated
- Error handling messages must reference the correct agent name

From Epic 2 retrospective:
- Scaffolding-then-validate pattern proven across 2 epics — continue for Epic 3
- Third agent validation (Scout 1.2, Atlas 2.2, now Lens 3.1)

### Project Structure Notes

- Lens agent file: `_bmad/bme/_gyre/agents/readiness-analyst.md` (pre-existing)
- Atlas agent file (reference): `_bmad/bme/_gyre/agents/model-curator.md` (128 lines)
- Scout agent file (reference): `_bmad/bme/_gyre/agents/stack-detective.md` (126 lines)
- Gyre config: `_bmad/bme/_gyre/config.yaml`

### References

- [Source: _bmad-output/planning-artifacts/epic-gyre.md — Story 3.1 ACs]
- [Source: _bmad-output/planning-artifacts/architecture-gyre.md — Lens agent definition]
- [Source: _bmad/bme/_gyre/agents/readiness-analyst.md — Pre-existing Lens agent file]
- [Source: _bmad/bme/_gyre/agents/model-curator.md — Atlas reference pattern]
- [Source: _bmad-output/implementation-artifacts/gyre-2-2-atlas-agent-definition.md — Story 2.2 validation pattern]
- [Source: _bmad-output/implementation-artifacts/gyre-1-2-scout-agent-definition.md — Story 1.2 validation pattern]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### Change Log

### File List
