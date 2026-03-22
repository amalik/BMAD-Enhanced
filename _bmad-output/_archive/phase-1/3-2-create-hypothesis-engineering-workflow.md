# Story 3.2: Create Hypothesis Engineering Workflow

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Vortex user validating a problem definition,
I want to work with Liam through a structured hypothesis engineering workflow,
So that I can develop rigorous hypotheses with explicit assumptions and expected outcomes.

## Acceptance Criteria

1. **AC1: Step files follow micro-file architecture (RF1, P17, P20)**
   - **Given** the workflow directory `_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/`
   - **When** step files are created
   - **Then** there are 5 `.md` files in the `steps/` directory
   - **And** `step-01-setup.md` exists (standardized)
   - **And** `step-02-context.md` exists (standardized)
   - **And** steps 3-4 are workflow-specific core activities
   - **And** `step-05-synthesize.md` exists as the final Compass step (standardized)

2. **AC2: All step files follow canonical structure**
   - **Given** each step file
   - **When** parsed
   - **Then** it has YAML frontmatter with `step`, `workflow`, `title` fields
   - **And** it contains sections: `# Step N: {Title}`, `## Why This Matters`, `## Your Task`, `## Your Turn`, `## Next Step`
   - **And** the final step replaces `## Next Step` with `## Vortex Compass`

3. **AC3: Step-01-setup validates HC2 input**
   - **Given** step-01-setup.md
   - **When** a user runs the hypothesis-engineering workflow
   - **Then** it validates input against HC2 contract schema (frontmatter: 7 fields, body: 6 sections)
   - **And** it accepts non-conforming input with guidance on gaps (FR6)
   - **And** it references `_bmad/bme/_vortex/contracts/hc2-problem-definition.md` for full schema

4. **AC4: Step-02-context unpacks problem definition**
   - **Given** step-02-context.md
   - **When** the user proceeds from setup
   - **Then** it guides loading and analyzing the HC2 problem definition
   - **And** it extracts JTBD, pains, gains, assumptions, and evidence gaps
   - **And** it identifies the opportunity space for hypothesis generation

5. **AC5: Step-03 facilitates structured hypothesis generation**
   - **Given** the core hypothesis generation step
   - **When** the user proceeds from context analysis
   - **Then** it facilitates structured brainwriting/ideation (not unstructured brainstorming)
   - **And** it drafts 1-3 hypothesis contracts using the 4-field format: Expected Outcome, Target Behavior Change, Rationale, Riskiest Assumption
   - **And** each hypothesis includes a statement: "We believe that [target users] will [expected behavior] because [rationale]"

6. **AC6: Step-04 maps and prioritizes assumptions**
   - **Given** the assumption mapping step
   - **When** hypotheses are drafted
   - **Then** it extracts all assumptions across all hypotheses
   - **And** it classifies each by Lethality (High/Medium/Low) and Uncertainty (High/Medium/Low)
   - **And** it derives Priority from lethality × uncertainty (Test First / Test Soon / Monitor)
   - **And** it produces a recommended testing order

7. **AC7: Step-05-synthesize produces HC3 artifact and routes via Compass**
   - **Given** step-05-synthesize.md
   - **When** hypotheses and assumption maps are complete
   - **Then** it generates an HC3 artifact with all required sections (Problem Context, Hypothesis Contracts, Assumption Risk Map, Recommended Testing Order, optional Flagged Concerns)
   - **And** HC3 frontmatter conforms to contract schema (`contract: HC3`, `source_agent: liam`, `target_agents: [wade]`)
   - **And** it includes Compass routing table in D4 format
   - **And** it includes Insufficient Evidence block (FR18)

8. **AC8: Compass routing matches reference**
   - **Given** the Compass table in step-05-synthesize.md
   - **When** compared against `compass-routing-reference.md`
   - **Then** Route 1: → Wade `lean-experiment` — Hypothesis contracts ready for testing (HC3)
   - **And** Route 2: → Isla `user-interview` — ⚡ Unvalidated assumption flagged (HC9)
   - **And** includes user override note and Max VN reference

9. **AC9: Liam's voice is consistent across all files**
   - **Given** all workflow files
   - **When** reviewed for persona consistency
   - **Then** Liam's voice (energetic, challenging, creative peer) is present
   - **And** zero Isla phrases ("I noticed that...", "embrace ambiguity")
   - **And** zero Mila phrases ("Here's what the research is telling us...", "Three patterns converge")
   - **And** zero Wade phrases ("Let's test that assumption")

10. **AC10: workflow.md entry point is complete**
    - **Given** `_bmad/bme/_vortex/workflows/hypothesis-engineering/workflow.md`
    - **When** the placeholder is replaced
    - **Then** it follows Mila's workflow.md structure: frontmatter, title, description, "What is X?" section, Workflow Structure, Steps Overview, Output, Initialization
    - **And** frontmatter includes `workflow: hypothesis-engineering`, `author: Liam (hypothesis-engineer)`, `version: 1.6.0`
    - **And** Output section references HC3 artifact, save path, schema reference, and consumer (Wade)

11. **AC11: Lint passes**
    - **Given** all workflow files
    - **When** `npm run lint` runs
    - **Then** it passes clean
    - **Note:** Content-only story. Lint is a regression check only.

## Tasks / Subtasks

- [x] **Task 1: Replace workflow.md placeholder with full entry point** (AC: 10)
  - [x] 1.1 Open `_bmad/bme/_vortex/workflows/hypothesis-engineering/workflow.md`
  - [x] 1.2 Replace placeholder with full entry point following Mila's `research-convergence/workflow.md` structure (48 lines)
  - [x] 1.3 Update frontmatter: `workflow: hypothesis-engineering`, `description:` (Liam-specific), `author: Liam (hypothesis-engineer)`, `version: 1.6.0`
  - [x] 1.4 Write "What is Hypothesis Engineering?" section in Liam's voice
  - [x] 1.5 Write Steps Overview listing all 5 steps
  - [x] 1.6 Output section: HC3 artifact, save path `{output_folder}/vortex-artifacts/hc3-hypothesis-contract-{date}.md`, schema reference, consumer = Wade
  - [x] 1.7 Include `Template: None` (D8 — no template subdirectory)
  - [x] 1.8 Initialization block: load config, then load step-01-setup.md

- [x] **Task 2: Create steps/ directory and step-01-setup.md** (AC: 1, 2, 3)
  - [x] 2.1 Create `_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/` directory
  - [x] 2.2 Create `step-01-setup.md` with frontmatter: `step: 1`, `workflow: hypothesis-engineering`, `title: Setup & Input Validation`
  - [x] 2.3 Write HC2 frontmatter validation checklist (7 fields: contract, type, source_agent, source_workflow, target_agents, input_artifacts, created)
  - [x] 2.4 Write HC2 body section validation checklist (6 sections: Converged Problem Statement, Jobs-to-be-Done, Pains, Gains, Evidence Summary, Assumptions)
  - [x] 2.5 Include non-conforming input acceptance with gap guidance (FR6)
  - [x] 2.6 Reference `_bmad/bme/_vortex/contracts/hc2-problem-definition.md` for full schema
  - [x] 2.7 End with "Your Turn" and "Next Step" pointing to step-02-context.md

- [x] **Task 3: Create step-02-context.md** (AC: 1, 2, 4)
  - [x] 3.1 Create `step-02-context.md` with frontmatter: `step: 2`, `workflow: hypothesis-engineering`, `title: Problem Context & Opportunity Mapping`
  - [x] 3.2 Guide user to unpack HC2 content: JTBD, pains, gains, assumptions, evidence gaps
  - [x] 3.3 Identify the opportunity space: which pains are most severe? Which gains are most desired? Where do assumptions create hypothesis opportunities?
  - [x] 3.4 Produce a "hypothesis landscape" summary: strongest opportunities, riskiest areas, evidence strength
  - [x] 3.5 End with "Your Turn" and "Next Step" pointing to step-03

- [x] **Task 4: Create step-03 hypothesis generation step** (AC: 1, 2, 5)
  - [x] 4.1 Create `step-03-brainwriting.md` with frontmatter: `step: 3`, `workflow: hypothesis-engineering`, `title: Structured Brainwriting & Hypothesis Drafting`
  - [x] 4.2 Facilitate structured brainwriting (NOT unstructured brainstorming) — guide the user through systematic ideation
  - [x] 4.3 Draft 1-3 hypothesis contracts using the 4-field format from HC3: Expected Outcome, Target Behavior Change, Rationale, Riskiest Assumption
  - [x] 4.4 Include hypothesis statement template: "We believe that [target users] will [expected behavior] because [rationale]"
  - [x] 4.5 Include A/P/C decision point (Advanced Elicitation / Party Mode / Continue)
  - [x] 4.6 End with "Your Turn" and "Next Step" pointing to step-04

- [x] **Task 5: Create step-04 assumption mapping step** (AC: 1, 2, 6)
  - [x] 5.1 Create `step-04-assumption-mapping.md` with frontmatter: `step: 4`, `workflow: hypothesis-engineering`, `title: Assumption Extraction & Risk Mapping`
  - [x] 5.2 Extract all assumptions across all hypotheses
  - [x] 5.3 Guide classification: Lethality (High/Medium/Low) × Uncertainty (High/Medium/Low)
  - [x] 5.4 Derive Priority: Test First / Test Soon / Monitor
  - [x] 5.5 Produce Recommended Testing Order table
  - [x] 5.6 Include A/P/C decision point
  - [x] 5.7 End with "Your Turn" and "Next Step" pointing to step-05-synthesize.md

- [x] **Task 6: Create step-05-synthesize.md** (AC: 1, 2, 7, 8)
  - [x] 6.1 Create `step-05-synthesize.md` with frontmatter: `step: 5`, `workflow: hypothesis-engineering`, `title: Synthesize & Route`
  - [x] 6.2 Guide HC3 artifact generation with all required sections (Problem Context, Hypothesis Contracts 1-3, Assumption Risk Map, Recommended Testing Order, optional Flagged Concerns)
  - [x] 6.3 Include HC3 frontmatter template: `contract: HC3`, `type: artifact`, `source_agent: liam`, `source_workflow: hypothesis-engineering`, `target_agents: [wade]`, `input_artifacts`, `created`
  - [x] 6.4 Save path: `{output_folder}/vortex-artifacts/hc3-hypothesis-contract-{date}.md`
  - [x] 6.5 Include validation questions (evidence check, specificity check, falsifiability check)
  - [x] 6.6 Include A/P/C decision point before Compass
  - [x] 6.7 Add Compass routing table in D4 format (see Dev Notes — Compass Routes)
  - [x] 6.8 Add Insufficient Evidence block (FR18) with workflow-specific signals
  - [x] 6.9 Include user override note and Max VN reference

- [x] **Task 7: Verify and validate** (AC: 9, 11)
  - [x] 7.1 Voice check: scan all files for Isla/Mila/Wade phrases — must find zero
  - [x] 7.2 Verify all step files chain correctly: workflow.md → step-01 → step-02 → step-03 → step-04 → step-05 (Compass)
  - [x] 7.3 Verify all contract paths reference actual filesystem paths (Epic 2 learning: `contracts/` not `handoff-contracts/`)
  - [x] 7.4 Run `npm run lint` — expect clean pass
  - [x] 7.5 Verify step count: 5 steps (within 4-6 range per RF1)

## Dev Notes

### This is a Content-Only Story

No JavaScript files are modified. Deliverables are markdown files only. All tests should pass unchanged — run `npm run lint` as a regression check.

### Canonical Workflow Template: Mila's Research-Convergence

Use `_bmad/bme/_vortex/workflows/research-convergence/` as the exact structural template. Mila's workflow has:

```
workflow.md            — Entry point (51 lines): frontmatter, title, "What is X?", structure, steps overview, output, initialization
steps/
  step-01-setup.md     — Setup & Input Validation (70 lines)
  step-02-context.md   — Context Loading & Analysis (61 lines)
  step-03-jtbd-framing.md    — Core activity 1 (81 lines)
  step-04-pains-gains.md     — Core activity 2 (77 lines)
  step-05-synthesize.md      — Synthesis & Compass (148 lines)
```

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

**Final step (step-05-synthesize) adds:**
- Validation questions (checklists)
- A/P/C decision point (`[a]` Advanced Elicitation, `[p]` Party Mode, `[c]` Continue)
- `## Vortex Compass` section (replaces `## Next Step`)
- Insufficient Evidence block with ⚠️ heading
- User override note and Max VN reference

### HC2 Input Schema (What Liam Receives)

From `_bmad/bme/_vortex/contracts/hc2-problem-definition.md`:

**Required frontmatter:** `contract: HC2`, `type: artifact`, `source_agent: mila`, `source_workflow: research-convergence`, `target_agents: [liam]`, `input_artifacts`, `created`

**Required body sections:**
1. Converged Problem Statement — Problem Statement, Confidence, Scope
2. Jobs-to-be-Done — Primary JTBD + Functional/Emotional/Social Jobs
3. Pains — Pain Description, Priority, Frequency, Intensity, Evidence Sources, Current Coping
4. Gains — Gain Description, Priority, Expected Impact, Evidence Sources
5. Evidence Summary — Artifacts Analyzed, Total Evidence Points, Convergence Assessment, Contradictions, Evidence Gaps
6. Assumptions — Assumption, Basis, Risk if Wrong, Validation Status

**Step-01-setup must validate these sections exist** (FR17). Non-conforming input should be guided but accepted (FR6).

### HC3 Output Schema (What Liam Produces)

From `_bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md`:

**Required frontmatter:**
```yaml
---
contract: HC3
type: artifact
source_agent: liam
source_workflow: hypothesis-engineering
target_agents: [wade]
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/{hc2-filename}"
    contract: HC2
created: {{date}}
---
```

**Required body sections:**
1. **Problem Context** — Problem Statement (from HC2), JTBD Reference, Key Pains Targeted
2. **Hypothesis Contracts** (1-3 per artifact) — 4-field format: Expected Outcome, Target Behavior Change, Rationale, Riskiest Assumption + Hypothesis Statement
3. **Assumption Risk Map** — Assumption, Hypothesis, Lethality, Uncertainty, Priority, Validation Status
4. **Recommended Testing Order** — Priority, Assumption, Suggested Method, Minimum Evidence
5. **Flagged Concerns** (optional) — Concern, Impact, Recommended Action

### Compass Routing (Hypothesis-Engineering Routes)

From `_bmad/bme/_vortex/compass-routing-reference.md`:

| Route | Target | Condition |
|-------|--------|-----------|
| 1 | Wade 🧪 `lean-experiment` | Hypothesis contracts ready for testing (HC3) |
| 2 | Isla 🔍 `user-interview` | ⚡ Unvalidated assumption flagged (HC9) |

**D4 Compass table format (adapted for hypothesis-engineering):**
```markdown
## Vortex Compass

Based on what you just completed, here are your evidence-driven options:

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Hypotheses are solid with testable assumptions | lean-experiment | Wade 🧪 | Hypothesis contracts ready for testing (HC3) |
| ⚡ Critical assumption is unvalidated and too risky to test blind | user-interview | Isla 🔍 | Unvalidated assumption needs discovery before experimentation (HC9) |

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
| Wade 🧪 | 1-3 hypothesis contracts with explicit riskiest assumptions and testing order |
| Isla 🔍 | Specific unvalidated assumption identified with clear research question |

**Workflow-specific signals:**
- Cannot identify a riskiest assumption → consider revisiting **step-04** for deeper mapping
- Hypotheses feel vague or unfalsifiable → consider revisiting **step-03** for sharper brainwriting
- Problem definition itself seems shaky → consider routing back to **Mila** for re-synthesis

**Recommended:** Revisit earlier steps to strengthen your hypotheses, or run **Max's [VN] Vortex Navigation** for a full gap analysis.
```

### Liam's Voice Guidelines

All step files must use Liam's established voice:
- **Energetic and challenging** — pushes past obvious ideas
- **Key phrases:** "That's a safe bet — what's the bold version?", "Let's stress-test that assumption before we build anything", "What if?", "If you can't prove it wrong, it's not a hypothesis"
- **Tone:** Creative peer, not facilitator. Ideates alongside the user.
- **NEVER use Isla phrases:** "I noticed that...", "embrace ambiguity"
- **NEVER use Mila phrases:** "Here's what the research is telling us...", "Three patterns converge"
- **NEVER use Wade phrases:** "Let's test that assumption" (too close — Liam stress-tests ideas, Wade tests in the real world)

### A/P/C Decision Points

Include at contextually appropriate moments in steps 3-5 (following Mila's pattern from steps 3-4-5):
```markdown
**[a]** Advanced Elicitation — Deep dive into {step topic} with guided questioning
**[p]** Party Mode — Bring in other Vortex agents for collaborative discussion
**[c]** Continue — Proceed to {next step description}
```

### Learnings from Story 2.2 (Mila's Research-Convergence Workflow)

1. **Code review caught stale contract paths** — Story 2.2 had `handoff-contracts/` instead of `contracts/`. Always verify paths against actual filesystem.
2. **Insufficient Evidence heading needs ⚠️** — Code review M2 added this. Include from the start.
3. **Explicit save-to path in final step** — Code review M3 required this. Include `Save to:` with full path template.
4. **Cross-artifact analysis example helpful** — Code review L1 added an example to step-02. Consider including a "hypothesis landscape" example.
5. **`Template: None` in workflow.md** — Code review L2 added this per D8. Include from the start.
6. **A/P/C decision points at contextually appropriate moments** — Steps 3-5 in Mila's workflow. Same pattern for Liam's steps 3-5.
7. **Step files chain correctly** — workflow.md → step-01 → step-02 → ... → step-05 (Compass). Verify the chain.

### Files to Create/Modify

| File | Change | Why |
|------|--------|-----|
| `_bmad/bme/_vortex/workflows/hypothesis-engineering/workflow.md` | **REPLACE** placeholder | AC10 |
| `_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-01-setup.md` | **NEW** | AC1, AC2, AC3 |
| `_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-02-context.md` | **NEW** | AC1, AC2, AC4 |
| `_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-03-brainwriting.md` | **NEW** | AC1, AC2, AC5 |
| `_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-04-assumption-mapping.md` | **NEW** | AC1, AC2, AC6 |
| `_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-05-synthesize.md` | **NEW** | AC1, AC2, AC7, AC8 |

### Files NOT Changing

- `_bmad/bme/_vortex/agents/hypothesis-engineer.md` — Liam's agent definition (completed in Story 3.1)
- `_bmad/bme/_vortex/contracts/hc2-problem-definition.md` — input schema (read-only reference)
- `_bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md` — output schema (read-only reference)
- `_bmad/bme/_vortex/compass-routing-reference.md` — routing reference (read-only)
- All JavaScript files — no code changes
- All test files — no test changes needed

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 3.2]
- [Source: _bmad-output/planning-artifacts/architecture.md — RF1, P17, P20, D2, D4, D8, FR6, FR17, FR18, FM1]
- [Source: _bmad/bme/_vortex/workflows/research-convergence/ — Canonical workflow template (Mila)]
- [Source: _bmad/bme/_vortex/contracts/hc2-problem-definition.md — Input schema]
- [Source: _bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md — Output schema]
- [Source: _bmad/bme/_vortex/compass-routing-reference.md — Liam hypothesis-engineering routing]
- [Source: _bmad-output/implementation-artifacts/2-2-create-research-convergence-workflow.md — Analogous story learnings]
- [Source: _bmad-output/implementation-artifacts/3-1-design-liams-agent-definition-persona.md — Previous story context]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (claude-opus-4-6)

### Debug Log References

### Completion Notes List
- Replaced workflow.md placeholder (3 lines) with full 52-line entry point following Mila's canonical pattern
- Created steps/ directory and 5 step files (step-01 through step-05)
- All step files follow canonical structure: frontmatter (step/workflow/title), Step N heading, Why This Matters, Your Task, Your Turn, Next Step
- Step-01-setup includes HC2 frontmatter validation checklist (7 fields) and body section checklist (6 sections) with HC2 contract file reference
- Step-03-brainwriting includes structured 3-round brainwriting (obvious → bold → synthesis), 4-field hypothesis contract template, quality checklist, and A/P/C decision point
- Step-04-assumption-mapping includes assumption extraction guidance, lethality × uncertainty classification matrix, priority derivation table, recommended testing order, flagged concerns for HC9, and A/P/C decision point
- Step-05-synthesize includes HC3 artifact generation guidance with all 5 required body sections, validation questions (evidence/falsifiability/assumption checks), A/P/C decision point, Compass routing (D4 format), ⚠️ Insufficient Evidence block with workflow-specific signals, user override note, and Max VN reference
- Liam's voice verified across all files: signature phrases present ("That's a safe bet — what's the bold version?", "stress-test", "falsifiable"), zero Isla/Mila/Wade phrases detected
- All 5 step files chain correctly: workflow.md → step-01 → step-02 → step-03 → step-04 → step-05 (Compass)
- Contract paths verified against filesystem: `contracts/hc2-problem-definition.md`, `contracts/hc3-hypothesis-contract.md`
- npm run lint passes clean (content-only story, no JS changes)

### Change Log
- 2026-02-25: Story created by create-story workflow. Status: ready-for-dev.
- 2026-02-25: Implementation complete. Created workflow.md entry point + 5 step files. All 11 ACs satisfied. Status: review.

### File List
| File | Action | ACs |
|------|--------|-----|
| `_bmad/bme/_vortex/workflows/hypothesis-engineering/workflow.md` | REPLACED placeholder with full 52-line entry point | AC10 |
| `_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-01-setup.md` | NEW (66 lines) | AC1, AC2, AC3 |
| `_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-02-context.md` | NEW (80 lines) | AC1, AC2, AC4 |
| `_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-03-brainwriting.md` | NEW (79 lines) | AC1, AC2, AC5 |
| `_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-04-assumption-mapping.md` | NEW (102 lines) | AC1, AC2, AC6 |
| `_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-05-synthesize.md` | NEW (130 lines) | AC1, AC2, AC7, AC8 |
