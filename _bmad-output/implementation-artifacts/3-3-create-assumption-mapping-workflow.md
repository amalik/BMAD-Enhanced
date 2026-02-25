# Story 3.3: Create Assumption Mapping Workflow

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a product manager who wants to understand risk before committing to experiments,
I want to map and prioritize assumptions across my hypothesis contracts,
So that I can identify which assumptions are most lethal and most uncertain — and test those first.

## Acceptance Criteria

1. **AC1: Step files follow micro-file architecture (RF1, P17, P20)**
   - **Given** the workflow directory `_bmad/bme/_vortex/workflows/assumption-mapping/steps/`
   - **When** step files are created
   - **Then** there are 4-5 `.md` files in the `steps/` directory
   - **And** `step-01-setup.md` exists (standardized)
   - **And** `step-02-context.md` exists (standardized)
   - **And** step(s) 3-4 are workflow-specific core activities
   - **And** the final step is `*-synthesize.md` (standardized Compass step)

2. **AC2: All step files follow canonical structure**
   - **Given** each step file
   - **When** parsed
   - **Then** it has YAML frontmatter with `step`, `workflow`, `title` fields
   - **And** it contains sections: `# Step N: {Title}`, `## Why This Matters`, `## Your Task`, `## Your Turn`, `## Next Step`
   - **And** the final step replaces `## Next Step` with `## Vortex Compass`

3. **AC3: Step-01-setup validates HC3 input**
   - **Given** step-01-setup.md
   - **When** a user runs the assumption-mapping workflow
   - **Then** it validates input against HC3 contract schema (frontmatter: 7 fields, body: 5 sections)
   - **And** it accepts non-conforming input with guidance on gaps (FR6)
   - **And** it references `_bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md` for full schema
   - **And** it also accepts HC2 or user-provided hypothesis contracts not produced by Liam's other workflows

4. **AC4: Step-02-context loads and inventories assumptions**
   - **Given** step-02-context.md
   - **When** the user proceeds from setup
   - **Then** it guides loading the hypothesis contracts and inventorying all assumptions
   - **And** it extracts assumptions from all 4 fields of each hypothesis contract (Expected Outcome, Target Behavior Change, Rationale, Riskiest Assumption)
   - **And** it surfaces unstated/hidden assumptions not explicitly listed

5. **AC5: Core step(s) facilitate deep assumption classification and prioritization**
   - **Given** the core assumption mapping step(s)
   - **When** assumptions are inventoried
   - **Then** each assumption is classified by Lethality (High/Medium/Low) and Uncertainty (High/Medium/Low)
   - **And** Priority is derived from lethality × uncertainty (Test First / Test Soon / Monitor)
   - **And** the full Assumption Risk Map table is produced
   - **And** a Recommended Testing Order is produced with suggested methods and minimum evidence
   - **And** Flagged Concerns are surfaced for potential HC9 routing to Isla

6. **AC6: Final step synthesizes and routes via Compass**
   - **Given** the final synthesize step
   - **When** assumption mapping is complete
   - **Then** it reviews the assumption risk map for completeness
   - **And** it includes Compass routing table in D4 format
   - **And** it includes Insufficient Evidence block (FR18)

7. **AC7: Compass routing matches reference (3 routes)**
   - **Given** the Compass table in the final step
   - **When** compared against `compass-routing-reference.md`
   - **Then** Route 1: → Isla `user-discovery` — High-risk assumptions need validation
   - **And** Route 2: → Wade `lean-experiment` — Assumptions acceptable, proceed to test (HC3)
   - **And** Route 3: → Liam `hypothesis-engineering` — Refine hypotheses based on risk map
   - **And** includes user override note and Max VN reference

8. **AC8: Liam's voice is consistent across all files**
   - **Given** all workflow files
   - **When** reviewed for persona consistency
   - **Then** Liam's voice (energetic, challenging, creative peer) is present
   - **And** zero Isla phrases ("I noticed that...", "embrace ambiguity")
   - **And** zero Mila phrases ("Here's what the research is telling us...", "Three patterns converge")
   - **And** zero Wade phrases ("Let's test that assumption")

9. **AC9: workflow.md entry point is complete**
   - **Given** `_bmad/bme/_vortex/workflows/assumption-mapping/workflow.md`
   - **When** the placeholder is replaced
   - **Then** it follows Mila's workflow.md structure: frontmatter, title, description, "What is X?" section, Workflow Structure, Steps Overview, Output, Initialization
   - **And** frontmatter includes `workflow: assumption-mapping`, `author: Liam (hypothesis-engineer)`, `version: 1.6.0`
   - **And** Output section describes what the workflow produces (enriched assumption risk map), save path, and consumer context

10. **AC10: Lint passes**
    - **Given** all workflow files
    - **When** `npm run lint` runs
    - **Then** it passes clean
    - **Note:** Content-only story. Lint is a regression check only.

## Tasks / Subtasks

- [x] **Task 1: Replace workflow.md placeholder with full entry point** (AC: 9)
  - [x] 1.1 Open `_bmad/bme/_vortex/workflows/assumption-mapping/workflow.md`
  - [x] 1.2 Replace placeholder with full entry point following Mila's `research-convergence/workflow.md` structure
  - [x] 1.3 Update frontmatter: `workflow: assumption-mapping`, `description:` (Liam-specific), `author: Liam (hypothesis-engineer)`, `version: 1.6.0`
  - [x] 1.4 Write "What is Assumption Mapping?" section in Liam's voice
  - [x] 1.5 Write Steps Overview listing all steps
  - [x] 1.6 Output section: describe enriched risk map output, no formal HC artifact (this workflow deepens analysis, may feed back into hypothesis-engineering or forward to Wade)
  - [x] 1.7 Include `Template: None` (D8 — no template subdirectory)
  - [x] 1.8 Initialization block: load config, then load step-01-setup.md

- [x] **Task 2: Create steps/ directory and step-01-setup.md** (AC: 1, 2, 3)
  - [x] 2.1 Create `_bmad/bme/_vortex/workflows/assumption-mapping/steps/` directory
  - [x] 2.2 Create `step-01-setup.md` with frontmatter: `step: 1`, `workflow: assumption-mapping`, `title: Setup & Input Validation`
  - [x] 2.3 Write HC3 frontmatter validation checklist (7 fields: contract, type, source_agent, source_workflow, target_agents, input_artifacts, created)
  - [x] 2.4 Write HC3 body section validation checklist (5 sections: Problem Context, Hypothesis Contracts, Assumption Risk Map, Recommended Testing Order, Flagged Concerns)
  - [x] 2.5 Include non-conforming input acceptance with gap guidance (FR6) — also accept HC2 or user-provided hypothesis lists
  - [x] 2.6 Reference `_bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md` for full schema
  - [x] 2.7 End with "Your Turn" and "Next Step" pointing to step-02-context.md

- [x] **Task 3: Create step-02-context.md** (AC: 1, 2, 4)
  - [x] 3.1 Create `step-02-context.md` with frontmatter: `step: 2`, `workflow: assumption-mapping`, `title: Assumption Inventory & Extraction`
  - [x] 3.2 Guide user to load hypothesis contracts and extract ALL assumptions — stated and unstated
  - [x] 3.3 Extract from each 4-field contract: assumptions from Expected Outcome, Target Behavior Change, Rationale, Riskiest Assumption
  - [x] 3.4 Surface unstated/hidden assumptions (technology, market, user, timing)
  - [x] 3.5 Produce a full assumption inventory organized by hypothesis
  - [x] 3.6 End with "Your Turn" and "Next Step" pointing to step-03

- [x] **Task 4: Create step-03 classification and risk mapping step** (AC: 1, 2, 5)
  - [x] 4.1 Create `step-03-risk-mapping.md` with frontmatter: `step: 3`, `workflow: assumption-mapping`, `title: Classification & Risk Mapping`
  - [x] 4.2 Guide lethality (H/M/L) × uncertainty (H/M/L) classification for every assumption
  - [x] 4.3 Include priority derivation matrix (Test First / Test Soon / Monitor)
  - [x] 4.4 Build the full Assumption Risk Map table
  - [x] 4.5 Produce Recommended Testing Order with suggested methods and minimum evidence
  - [x] 4.6 Include flagged concerns for HC9 routing to Isla
  - [x] 4.7 Include A/P/C decision point
  - [x] 4.8 End with "Your Turn" and "Next Step" pointing to final synthesize step

- [x] **Task 5: Create final synthesize step** (AC: 1, 2, 6, 7)
  - [x] 5.1 Create `step-04-synthesize.md` with frontmatter: `step: 4`, `workflow: assumption-mapping`, `title: Synthesize & Route`
  - [x] 5.2 Review assumption risk map for completeness and quality
  - [x] 5.3 Include validation questions (completeness check, classification check, testing order check)
  - [x] 5.4 Include A/P/C decision point before Compass
  - [x] 5.5 Add Compass routing table in D4 format with 3 routes (see Dev Notes — Compass Routes)
  - [x] 5.6 Add Insufficient Evidence block (FR18) with workflow-specific signals
  - [x] 5.7 Include user override note and Max VN reference

- [x] **Task 6: Verify and validate** (AC: 8, 10)
  - [x] 6.1 Voice check: scan all files for Isla/Mila/Wade phrases — must find zero
  - [x] 6.2 Verify all step files chain correctly: workflow.md → step-01 → step-02 → step-03 → step-04 (Compass)
  - [x] 6.3 Verify all contract paths reference actual filesystem paths (`contracts/` not `handoff-contracts/`)
  - [x] 6.4 Run `npm run lint` — expect clean pass
  - [x] 6.5 Verify step count: 4 steps (within 4-6 range per RF1)

## Dev Notes

### This is a Content-Only Story

No JavaScript files are modified. Deliverables are markdown files only. All tests should pass unchanged — run `npm run lint` as a regression check.

### Assumption-Mapping vs. Hypothesis-Engineering Step-04

**Critical distinction:** The `assumption-mapping` workflow is a **standalone** workflow separate from the `hypothesis-engineering` workflow. The hypothesis-engineering workflow has its own step-04 (assumption extraction as part of hypothesis generation). The standalone assumption-mapping workflow goes **deeper** — it is designed for users who want to:
- Map assumptions across **multiple** hypothesis contracts (not just the ones from a single session)
- Do a more thorough risk analysis when stakes are high
- Re-map assumptions after new evidence arrives
- Analyze assumptions independently of hypothesis generation

The content in `hypothesis-engineering/steps/step-04-assumption-mapping.md` can serve as structural inspiration but the standalone workflow must be distinct and deeper.

### Canonical Workflow Template: Mila's Research-Convergence

Use `_bmad/bme/_vortex/workflows/research-convergence/` as the exact structural template. Same pattern as Story 3-2.

**Step file canonical structure:**
```
---
step: N
workflow: {workflow-name}
title: {Step Title}
---

# Step N: {Step Title}

{Opening paragraph in agent voice}

## Why This Matters

{Why this step matters — grounded in agent's principles}

## Your Task

### 1. {First task heading}
{Guidance, tables, examples}

### 2. {Second task heading}
...

---

## Your Turn

{Prompt for user to provide input}

## Next Step

When {condition}, I'll load:
{project-root}/_bmad/bme/_vortex/workflows/{workflow}/steps/step-0{N+1}-{name}.md
```

**Final step adds:**
- Validation questions (checklists)
- A/P/C decision point
- `## Vortex Compass` section (replaces `## Next Step`)
- Insufficient Evidence block with ⚠️ heading
- User override note and Max VN reference

### HC3 Input Schema (What Assumption-Mapping Receives)

From `_bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md`:

**Required frontmatter:** `contract: HC3`, `type: artifact`, `source_agent: liam`, `source_workflow: hypothesis-engineering`, `target_agents: [wade]`, `input_artifacts`, `created`

**Required body sections:**
1. Problem Context — Problem Statement, JTBD Reference, Key Pains Targeted
2. Hypothesis Contracts (1-3) — 4-field format: Expected Outcome, Target Behavior Change, Rationale, Riskiest Assumption + Hypothesis Statement
3. Assumption Risk Map — Assumption, Hypothesis, Lethality, Uncertainty, Priority, Validation Status
4. Recommended Testing Order — Priority, Assumption, Suggested Method, Minimum Evidence
5. Flagged Concerns (optional) — Concern, Impact, Recommended Action

**Step-01-setup must validate these sections exist** (FR17). Non-conforming input should be guided but accepted (FR6).

### Compass Routing (Assumption-Mapping Routes)

From `_bmad/bme/_vortex/compass-routing-reference.md`:

| Route | Target | Condition |
|-------|--------|-----------|
| 1 | Isla 🔍 `user-discovery` | High-risk assumptions need validation |
| 2 | Wade 🧪 `lean-experiment` | Assumptions acceptable, proceed to test (HC3) |
| 3 | Liam 💡 `hypothesis-engineering` | Refine hypotheses based on risk map |

**D4 Compass table format (adapted for assumption-mapping):**
```markdown
## Vortex Compass

Based on what you just completed, here are your evidence-driven options:

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| High-risk assumptions need validation before any experiment | user-discovery | Isla 🔍 | Unvalidated lethal assumptions need discovery research first |
| Assumptions are acceptable — riskiest are testable | lean-experiment | Wade 🧪 | Assumptions acceptable, proceed to test (HC3) |
| Hypotheses need refinement based on what the risk map revealed | hypothesis-engineering | Liam 💡 | Refine hypotheses based on risk map |

> **Note:** These are evidence-based recommendations. You can navigate to any Vortex agent
> at any time based on your judgment.

**Or run Max's [VN] Vortex Navigation** for a full gap analysis across all streams.
```

### Insufficient Evidence Template (FR18)

```markdown
### ⚠️ Insufficient Evidence for Routing

If the evidence gathered so far doesn't clearly point to a single next step:

| To route to... | You need... |
|----------------|-------------|
| Isla 🔍 | Specific high-risk assumption identified with clear research question |
| Wade 🧪 | Risk map complete with acceptable risk profile and testing order |
| Liam 💡 | Clear signal that hypothesis contracts need structural revision |

**Workflow-specific signals:**
- All assumptions scored low-risk → may not need this workflow; proceed to Wade
- Cannot classify assumptions due to vague hypotheses → revisit **Liam's hypothesis-engineering** for sharper contracts
- Multiple lethal assumptions with no clear priority → consider routing to **Isla** for targeted discovery

**Recommended:** Revisit earlier steps to strengthen your risk map, or run **Max's [VN] Vortex Navigation** for a full gap analysis.
```

### Step Count Design Decision

**4 steps** (within 4-6 range per RF1):
1. `step-01-setup.md` — Setup & Input Validation (HC3 validation)
2. `step-02-context.md` — Assumption Inventory & Extraction
3. `step-03-risk-mapping.md` — Classification & Risk Mapping
4. `step-04-synthesize.md` — Synthesize & Route (Compass)

**Rationale:** The assumption-mapping workflow is more focused than hypothesis-engineering (5 steps). It takes hypothesis contracts as input (already validated by hypothesis-engineering), so context loading and assumption extraction can be combined into step-02, and the core classification + risk mapping fits naturally into one step. 4 steps is the minimum per RF1 and appropriate for this workflow's scope.

### Liam's Voice Guidelines

All step files must use Liam's established voice:
- **Energetic and challenging** — pushes past obvious ideas
- **Key phrases:** "That's a safe bet — what's the bold version?", "Let's stress-test that assumption before we build anything", "What if?", "If you can't prove it wrong, it's not a hypothesis"
- **Tone:** Creative peer, not facilitator. Ideates alongside the user.
- **NEVER use Isla phrases:** "I noticed that...", "embrace ambiguity"
- **NEVER use Mila phrases:** "Here's what the research is telling us...", "Three patterns converge"
- **NEVER use Wade phrases:** "Let's test that assumption" (too close — Liam stress-tests ideas, Wade tests in the real world)

### A/P/C Decision Points

Include at contextually appropriate moments in steps 3-4 (the core activity and synthesize steps):
```markdown
**[a]** Advanced Elicitation — Deep dive into {step topic} with guided questioning
**[p]** Party Mode — Bring in other Vortex agents for collaborative discussion
**[c]** Continue — Proceed to {next step description}
```

### Learnings from Stories 2.2 and 3.2

1. **Always verify contract paths against actual filesystem** — use `contracts/` not `handoff-contracts/`
2. **Insufficient Evidence heading needs ⚠️** — include from the start
3. **Explicit save-to path in final step** if producing artifacts
4. **`Template: None` in workflow.md** — include per D8
5. **A/P/C decision points at contextually appropriate moments** — steps 3+ in workflows
6. **Step files chain correctly** — workflow.md → step-01 → step-02 → ... → final step (Compass). Verify the chain.
7. **Voice bleed check** — grep for forbidden phrases across all files before marking complete

### Files to Create/Modify

| File | Change | Why |
|------|--------|-----|
| `_bmad/bme/_vortex/workflows/assumption-mapping/workflow.md` | **REPLACE** placeholder | AC9 |
| `_bmad/bme/_vortex/workflows/assumption-mapping/steps/step-01-setup.md` | **NEW** | AC1, AC2, AC3 |
| `_bmad/bme/_vortex/workflows/assumption-mapping/steps/step-02-context.md` | **NEW** | AC1, AC2, AC4 |
| `_bmad/bme/_vortex/workflows/assumption-mapping/steps/step-03-risk-mapping.md` | **NEW** | AC1, AC2, AC5 |
| `_bmad/bme/_vortex/workflows/assumption-mapping/steps/step-04-synthesize.md` | **NEW** | AC1, AC2, AC6, AC7 |

### Files NOT Changing

- `_bmad/bme/_vortex/agents/hypothesis-engineer.md` — Liam's agent definition (completed in Story 3.1)
- `_bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md` — input schema (read-only reference)
- `_bmad/bme/_vortex/compass-routing-reference.md` — routing reference (read-only)
- All JavaScript files — no code changes
- All test files — no test changes needed

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 3.3]
- [Source: _bmad-output/planning-artifacts/architecture.md — RF1, P17, P20, D2, D4, D8, FR6, FR17, FR18]
- [Source: _bmad/bme/_vortex/workflows/research-convergence/ — Canonical workflow template (Mila)]
- [Source: _bmad/bme/_vortex/workflows/hypothesis-engineering/ — Sibling workflow (Story 3.2)]
- [Source: _bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md — Input schema]
- [Source: _bmad/bme/_vortex/compass-routing-reference.md — Liam assumption-mapping routing]
- [Source: _bmad-output/implementation-artifacts/3-2-create-hypothesis-engineering-workflow.md — Previous story learnings]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (claude-opus-4-6)

### Debug Log References

### Completion Notes List
- Replaced workflow.md placeholder (3 lines) with full 49-line entry point following canonical pattern
- Created steps/ directory and 4 step files (step-01 through step-04)
- All step files follow canonical structure: frontmatter (step/workflow/title), Step N heading, Why This Matters, Your Task, Your Turn, Next Step
- Step-01-setup includes HC3 frontmatter validation checklist (7 fields) and body section checklist (5 sections) with HC3 contract file reference
- Step-02-context includes 4-field assumption extraction guidance, unstated assumption categories (technology, market, user, measurement), and full assumption inventory table
- Step-03-risk-mapping includes lethality × uncertainty classification with tables, priority derivation matrix, Assumption Risk Map table, Recommended Testing Order with tiebreaker rules, flagged concerns for HC9, and A/P/C decision point
- Step-04-synthesize includes validation checklists (completeness, honesty), A/P/C decision point, Compass routing (3 routes in D4 format), ⚠️ Insufficient Evidence block with workflow-specific signals, user override note, and Max VN reference
- Liam's voice verified across all files: signature phrases present ("stress-test", "falsifiable", "what's the bold version"), zero Isla/Mila/Wade phrases detected
- All 4 step files chain correctly: workflow.md → step-01 → step-02 → step-03 → step-04 (Compass)
- Contract paths verified against filesystem: `contracts/hc3-hypothesis-contract.md`
- npm run lint passes clean (content-only story, no JS changes)
- Distinct from hypothesis-engineering step-04: standalone workflow goes deeper with multi-hypothesis analysis, unstated assumption categories, tiebreaker rules, and honesty checks

### Change Log
- 2026-02-25: Story created by create-story workflow. Status: ready-for-dev.
- 2026-02-25: Implementation complete. Created workflow.md entry point + 4 step files. All 10 ACs satisfied. Status: review.

### File List
| File | Action | ACs |
|------|--------|-----|
| `_bmad/bme/_vortex/workflows/assumption-mapping/workflow.md` | REPLACED placeholder with full 49-line entry point | AC9 |
| `_bmad/bme/_vortex/workflows/assumption-mapping/steps/step-01-setup.md` | NEW (66 lines) | AC1, AC2, AC3 |
| `_bmad/bme/_vortex/workflows/assumption-mapping/steps/step-02-context.md` | NEW (93 lines) | AC1, AC2, AC4 |
| `_bmad/bme/_vortex/workflows/assumption-mapping/steps/step-03-risk-mapping.md` | NEW (105 lines) | AC1, AC2, AC5 |
| `_bmad/bme/_vortex/workflows/assumption-mapping/steps/step-04-synthesize.md` | NEW (107 lines) | AC1, AC2, AC6, AC7 |
