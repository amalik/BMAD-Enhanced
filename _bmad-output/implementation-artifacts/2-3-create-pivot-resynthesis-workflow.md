# Story 2.3: Create Pivot-Resynthesis Workflow

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a product manager whose experiment direction failed (Max says "pivot"),
I want to re-synthesize my problem definition using original Isla artifacts plus new evidence from failed experiments,
So that I iterate within the known problem space rather than starting over with Emma.

## Acceptance Criteria

1. **AC1: Step files follow micro-file architecture (FR51, P17, P20)**
   - **Given** the workflow directory `_bmad/bme/_vortex/workflows/pivot-resynthesis/steps/`
   - **When** step files are created
   - **Then** there are 4-6 `.md` files in the `steps/` directory (P17)
   - **And** `step-01-setup.md` exists (P20 standardized)
   - **And** `step-02-context.md` exists (P20 standardized)
   - **And** the final step matches `*-synthesize.md` (P20 standardized)
   - **And** each step loads the next step file sequentially via `{project-root}/...` path at the bottom (FR51)

2. **AC2: Each step has valid frontmatter (FR46)**
   - **Given** any step file in the workflow
   - **When** frontmatter is parsed
   - **Then** it contains at minimum: `step` (number), `workflow` (name), `title` (description)
   - **And** `workflow` value is `pivot-resynthesis` (not `research-convergence`)

3. **AC3: Step-01-setup validates dual input types (FR5, FR17)**
   - **Given** a user invokes the workflow after Max's pivot decision
   - **When** step-01-setup runs
   - **Then** it validates both original HC1 empathy artifacts AND new experiment evidence
   - **And** it clearly explains the pivot scenario: Max decided "pivot" — the solution direction failed but the problem definition is sound; Mila re-synthesizes revisions to pains/gains/JTBD rather than restarting discovery
   - **And** it accepts HC4 experiment context as legitimate input alongside HC1 artifacts
   - **And** it guides the user if artifacts are non-conforming (FR17) without rejecting them
   - **And** it lists expected input types: (a) Original Isla artifacts (HC1) — empathy maps, interview syntheses, observation reports; (b) Experiment evidence (HC4 or informal) — results showing failure/pivot decision from Wade's experiments; (c) Prior HC2 problem definition (optional) — the original converged problem that preceded the failed experiment

4. **AC4: Step-02-context analyzes both original and pivot evidence**
   - **Given** validated input artifacts from step-01
   - **When** step-02-context runs
   - **Then** it loads and analyzes all provided artifacts (HC1 originals + HC4 experiment results)
   - **And** it establishes pivot context: what the original problem was, what the experiment tested, what the experiment revealed
   - **And** it identifies what parts of the original problem definition remain valid vs. what needs revision
   - **And** it extracts unexpected findings and learnings from the failed experiment
   - **And** it includes a worked example showing how to assess which parts of the original problem remain valid (e.g., "Experiment invalidated Pain A but confirmed Pain B; JTBD core remains sound")

5. **AC5: Core steps guide JTBD re-framing and Pains & Gains revision (FR2, FR3, FR5)**
   - **Given** analyzed artifacts from step-02 with pivot context established
   - **When** core activity steps run
   - **Then** they guide JTBD re-framing incorporating pivot evidence — preserving what's still valid, revising what experiments disproved (FR2)
   - **And** they facilitate Pains & Gains revision: updating priorities, adding new pains revealed by experiment failure, removing pains invalidated by evidence (FR3)
   - **And** they explicitly distinguish "revise" from "restart" — the JTBD core should remain stable if Max's pivot decision was "problem correct, solution wrong" (FR5)

6. **AC6: Workflow produces HC2-compliant problem definition (FR4, FR29)**
   - **Given** completed JTBD re-framing and Pains & Gains revision
   - **When** the synthesis step produces output
   - **Then** the output artifact follows HC2 schema format (FR4) — same schema as research-convergence
   - **And** HC2 frontmatter includes: `contract: HC2`, `source_agent: mila`, `source_workflow: pivot-resynthesis`, `target_agents: [liam]`, `input_artifacts` referencing both HC1 and HC4 inputs
   - **And** HC2 body includes all 6 required sections: Converged Problem Statement, JTBD, Pains, Gains, Evidence Summary, Assumptions
   - **And** HC2 frontmatter `input_artifacts` array references every input artifact used — both original HC1 and experiment HC4 (FR29 traceability)
   - **And** the Evidence Summary body section notes which pains/gains were revised vs. retained from the original problem definition, with explicit links to HC4 experiment evidence triggering each revision, plus original HC1 sources for retained items

7. **AC7: Final step presents Compass routing with two-route distinction (FR19, FR20, FR21)**
   - **Given** the final `*-synthesize.md` step
   - **When** routing is presented
   - **Then** Compass table uses D4 format: `| If you learned... | Consider next... | Agent | Why |`
   - **And** it presents two routes per routing reference: (1) Liam for revised hypothesis (HC2), (2) Isla for assumption validation
   - **And** no Emma route appears because Max's pivot decision already ruled out "wrong problem space" — the problem is correct, only the solution direction failed (if the problem space were wrong, Max would have routed to Emma via HC8 instead)
   - **And** Compass references HC2 contract and declares what Liam expects (FR21)

8. **AC8: Insufficient evidence state handled (FR18)**
   - **Given** the Compass routing section
   - **When** evidence is insufficient to route confidently
   - **Then** an "⚠️ Insufficient Evidence for Routing" guidance block is presented
   - **And** it specifies what evidence is needed for each route
   - **And** it includes workflow-specific triggers: (a) revised problem statement is low-confidence → Isla for more evidence; (b) experiment evidence contradicts all original pains → more discovery needed; (c) JTBD itself is questioned → consider Emma for re-scoping

9. **AC9: User can override Compass recommendation (FR22)**
   - **Given** the Compass section
   - **When** displayed
   - **Then** it includes the override note: "You can navigate to any Vortex agent at any time based on your judgment"
   - **And** references Max's [VN] Vortex Navigation

10. **AC10: Decision points present A/P/C menu (FR52)**
    - **Given** any step with a decision point
    - **When** the user reaches a decision
    - **Then** the A/P/C menu is available (Advanced Elicitation / Party Mode / Continue)

11. **AC11: Workflow entry point (workflow.md) is complete**
    - **Given** `_bmad/bme/_vortex/workflows/pivot-resynthesis/workflow.md`
    - **When** it replaces the current placeholder
    - **Then** it follows Mila's research-convergence `workflow.md` pattern: frontmatter, description, steps overview, output description, initialization block
    - **And** the "What is Pivot Resynthesis?" section explains the distinction: iterate within known problem space vs. restart discovery
    - **And** initialization loads config and then loads `step-01-setup.md`
    - **And** includes `Template: None` line in output section

12. **AC12: Mila's voice is consistent throughout**
    - **Given** all step files
    - **When** language and tone are reviewed
    - **Then** they use Mila's communication style: warm but analytically precise, convergence language
    - **And** uses pivot-specific phrases grounded in Mila's voice: "The experiment told us something important...", "The original research still holds — here's what we're revising...", "Three patterns converge on this insight"
    - **And** uses conclusion-drawing language: "The data shows...", "Across the original research and the pivot evidence, the revised problem is..."
    - **And** is distinct from Isla's ambiguity-embracing style and Emma's strategic-framing style

13. **AC13: Lint passes**
    - **Given** all created files
    - **When** `npm run lint` runs
    - **Then** it passes clean
    - **Note:** Content-only story. Lint is a regression check.

## Tasks / Subtasks

- [ ] **Task 1: Create workflow directory and workflow.md** (AC: 11)
  - [ ] 1.1 Create directory `_bmad/bme/_vortex/workflows/pivot-resynthesis/`
  - [ ] 1.2 Create `workflow.md` with YAML frontmatter: `workflow: pivot-resynthesis`, `type: step-file`, `description`, `author: Mila (research-convergence-specialist)`, `version: 1.6.0`
  - [ ] 1.3 Include "What is Pivot Resynthesis?" section explaining: re-synthesis after failed experiments — iterate within known problem space, not restart; the JTBD is right but the pains/gains framing needs revision based on what experiments revealed
  - [ ] 1.4 Include steps overview listing all step files with brief descriptions
  - [ ] 1.5 Include output section describing HC2 artifact output to `{output_folder}/vortex-artifacts/`, with `Template: None` line
  - [ ] 1.6 Include initialization block: load config from `{project-root}/_bmad/bme/_vortex/config.yaml`, then load step-01-setup.md

- [ ] **Task 2: Create steps/ directory and step-01-setup.md** (AC: 1, 2, 3)
  - [ ] 2.1 Create directory `_bmad/bme/_vortex/workflows/pivot-resynthesis/steps/`
  - [ ] 2.2 Create `step-01-setup.md` with frontmatter: `step: 1`, `workflow: pivot-resynthesis`, `title: Setup & Input Validation`
  - [ ] 2.3 Explain the pivot context: Max decided "pivot" — the solution direction failed, but the problem definition is right. Mila re-synthesizes, not restarts
  - [ ] 2.4 List expected dual inputs: (a) Original HC1 artifacts (empathy maps, interview syntheses, observation reports); (b) Experiment evidence — HC4 experiment context from Wade or informal experiment results; (c) Prior HC2 problem definition (optional) — original converged problem that preceded the failed experiment
  - [ ] 2.5 Include HC4 validation guidance: HC4 frontmatter fields to check (`contract: HC4`, `type: artifact`, `source_agent`, `source_workflow`, `target_agents`, `input_artifacts`, `created`) and HC4 body sections (Experiment Summary, Hypothesis Tested, Experiment Method, Pre-Defined Success Criteria, Confirmed/Rejected Hypotheses, Strategic Context, and Production Readiness — conditional, required only for graduated experiments). Reference HC4 contract: `{project-root}/_bmad/bme/_vortex/contracts/hc4-experiment-context.md`
  - [ ] 2.6 Include HC1 validation guidance: same as research-convergence step-01, including check that HC1 `target_agents` field contains `mila` (confirming artifacts are intended for synthesis). Reference HC1 contract: `{project-root}/_bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md`
  - [ ] 2.7 Non-conforming input guidance (FR17): accept and guide, don't reject
  - [ ] 2.8 End with next-step loading: `{project-root}/_bmad/bme/_vortex/workflows/pivot-resynthesis/steps/step-02-context.md`

- [ ] **Task 3: Create step-02-context.md** (AC: 1, 2, 4)
  - [ ] 3.1 Create `step-02-context.md` with frontmatter: `step: 2`, `workflow: pivot-resynthesis`, `title: Context Loading & Analysis`
  - [ ] 3.2 Guide user to load and review all input artifacts — both original HC1 and experiment HC4
  - [ ] 3.3 Facilitate pivot context analysis: (a) What was the original problem definition? (b) What hypothesis was tested? (c) What did the experiment reveal — what failed and why? (d) What unexpected findings emerged?
  - [ ] 3.4 Guide the "What Still Holds?" assessment: identify which parts of the original problem definition remain valid (JTBD core, validated pains) vs. which need revision (invalidated pains, new pains revealed by experiment, gain priority shifts)
  - [ ] 3.5 Include example of pivot context analysis
  - [ ] 3.6 End with next-step loading to step-03

- [ ] **Task 4: Create step-03-jtbd-reframing.md** (AC: 1, 2, 5)
  - [ ] 4.1 Create `step-03-jtbd-reframing.md` with frontmatter: `step: 3`, `workflow: pivot-resynthesis`, `title: JTBD Re-Framing`
  - [ ] 4.2 Guide JTBD re-framing — NOT from scratch: start from the original JTBD and assess whether situation/motivation/outcome need revision based on experiment evidence
  - [ ] 4.3 Help user assess: Does the Functional Job change? Did the experiment reveal a different Emotional Job? Did Social Job assumptions fail?
  - [ ] 4.4 Emphasize the "revise, don't restart" principle: the JTBD core should remain stable when Max's pivot was "problem correct, solution wrong"
  - [ ] 4.5 Include A/P/C decision point (FR52) after the user has drafted their revised JTBD
  - [ ] 4.6 End with next-step loading to step-04

- [ ] **Task 5: Create step-04-pains-gains-revision.md** (AC: 1, 2, 5)
  - [ ] 5.1 Create `step-04-pains-gains-revision.md` with frontmatter: `step: 4`, `workflow: pivot-resynthesis`, `title: Pains & Gains Revision`
  - [ ] 5.2 Guide Pains revision: (a) Retain pains validated by experiment; (b) Remove or deprioritize pains invalidated by evidence; (c) Add new pains revealed by experiment failure; (d) Update frequency/intensity based on what experiments showed
  - [ ] 5.3 Guide Gains revision: (a) Revise expected impact based on experiment results; (b) Reprioritize gains based on new evidence; (c) Add new gains suggested by pivot direction
  - [ ] 5.4 Cross-reference revised pains and gains against JTBD from step-03: verify each revised pain/gain still connects logically to the refined JTBD — if a pain no longer applies to the job, remove it
  - [ ] 5.5 Include A/P/C decision point (FR52)
  - [ ] 5.6 End with next-step loading to step-05

- [ ] **Task 6: Create step-05-synthesize.md (final step)** (AC: 1, 2, 6, 7, 8, 9, 10)
  - [ ] 6.1 Create `step-05-synthesize.md` with frontmatter: `step: 5`, `workflow: pivot-resynthesis`, `title: Synthesize & Route`
  - [ ] 6.2 Guide convergence into revised Converged Problem Statement with confidence level — explicitly noting what changed from the original and why. Confidence may increase (we eliminated wrong directions) or decrease (experiment revealed we misunderstood pains) — the HC2 output should reflect actual confidence based on total evidence (original + experiment)
  - [ ] 6.3 Guide Evidence Summary with sub-prompts: (a) Artifacts Analyzed — count both HC1 and HC4 inputs; (b) Total Evidence Points — across original artifacts AND experiment results; (c) Convergence Assessment — how strongly does the revised evidence converge; (d) Contradictions — where original research and experiment evidence conflict (how resolved); (e) Evidence Gaps — what's still missing
  - [ ] 6.4 Guide Assumptions listing — note which assumptions were validated/invalidated by the experiment, and which new assumptions emerged from the pivot
  - [ ] 6.5 Produce the HC2 artifact with correct frontmatter: `contract: HC2`, `source_agent: mila`, `source_workflow: pivot-resynthesis`, `target_agents: [liam]`, `input_artifacts` referencing both HC1 and HC4 inputs, `created` in YYYY-MM-DD format
  - [ ] 6.6 Include all 6 HC2 required body sections: Converged Problem Statement, JTBD, Pains, Gains, Evidence Summary, Assumptions
  - [ ] 6.7 Ensure HC2 frontmatter `input_artifacts` lists every artifact used (FR29), and Evidence Summary notes which pains/gains were revised vs. retained with provenance
  - [ ] 6.8 Explicit save-to path: `{output_folder}/vortex-artifacts/hc2-problem-definition-{date}.md`
  - [ ] 6.9 Add Compass routing table with D4 format and two routes per routing reference:
    - Route 1: Revised problem ready → Liam 💡 `hypothesis-engineering` (HC2)
    - Route 2: Assumptions from pivot need validation → Isla 🔍 `user-interview`
  - [ ] 6.10 Add ⚠️ Insufficient Evidence for Routing block (FR18) with workflow-specific triggers: (a) revised problem statement is low-confidence → Isla for more evidence; (b) experiment evidence contradicts all original pains → more discovery needed; (c) JTBD itself is questioned → consider Emma for re-scoping
  - [ ] 6.11 Add user override note (FR22): `> **Note:** These are evidence-based recommendations. You can navigate to any Vortex agent at any time based on your judgment.` followed by `**Or run Max's [VN] Vortex Navigation** for a full gap analysis across all streams.`
  - [ ] 6.12 Include A/P/C decision point after Evidence Summary and Assumptions sections but before Compass routing table (FR52)

- [ ] **Task 7: Verify Mila's voice and consistency** (AC: 12)
  - [ ] 7.1 Review all step files for Mila's communication style: warm but analytically precise, convergence language
  - [ ] 7.2 Verify pivot-specific Mila phrases: "The experiment told us something important...", "The original research still holds — here's what we're revising...", evidence-grounded revision language
  - [ ] 7.3 Verify language is distinct from Isla (no ambiguity-embracing phrases) and Emma (no strategic-framing phrases)

- [ ] **Task 8: Validate and lint** (AC: 1, 13)
  - [ ] 8.1 Verify step count is 4-6 (P17) — expecting 5 steps
  - [ ] 8.2 Verify standardized filenames: `step-01-setup.md`, `step-02-context.md`, final `step-05-synthesize.md` (P20)
  - [ ] 8.3 Verify all frontmatter has `step`, `workflow: pivot-resynthesis`, `title` fields (FR46)
  - [ ] 8.4 Verify each step ends with next-step loading path (FR51) — final step has Compass instead
  - [ ] 8.5 Content validation: verify all step files have canonical structure (Step N heading, "Why This Matters", "Your Task", "Your Turn", "Next Step" sections) and spot-check for Isla/Emma phrases that shouldn't appear
  - [ ] 8.6 Run `npm run lint` — expect clean pass (no JS changes)

## Dev Notes

### This is a Content-Only Story

No JavaScript files are modified. Deliverables are markdown files only:
- 1 new `workflow.md` (entry point)
- 5 new step files in `steps/` directory
- No template directory needed (D8: FR49 relaxed)

All tests should pass unchanged. Run `npm run lint` as a regression check.

### Critical Distinction: Pivot Resynthesis vs. Research Convergence

| Aspect | Research Convergence (2.2) | Pivot Resynthesis (2.3) |
|--------|---------------------------|------------------------|
| **Trigger** | Multiple HC1 artifacts ready for synthesis | Max says "pivot" — experiment failed |
| **Input** | HC1 empathy artifacts only | HC1 originals + HC4 experiment evidence |
| **JTBD approach** | Frame from scratch | Re-frame: start from existing, revise |
| **Pains/Gains** | Synthesize from research | Revise: retain valid, update invalidated, add new |
| **Output** | HC2 (new problem definition) | HC2 (revised problem definition) |
| **Compass routes** | 3 routes (Liam/Isla/Emma) | 2 routes (Liam/Isla) |
| **Key principle** | Convergence from divergent research | Iteration within known problem space |

This distinction is the **critical differentiation** between the old 4-agent Vortex (where Max always routed back to Emma) and the new 7-agent Vortex (where Max can intelligently route to Mila for iterative problem refinement). See Journey 5 in PRD.

### Step Architecture Design (5 Steps)

Based on architecture constraints (P17: 4-6 steps, P20: standardized names) and the scope of this workflow:

| Step | File | Purpose | Architecture Role |
|------|------|---------|-------------------|
| 1 | `step-01-setup.md` | Dual input validation (HC1 + HC4), pivot context | Standardized (P20) |
| 2 | `step-02-context.md` | Load artifacts, pivot context analysis, "What Still Holds?" | Standardized (P20) |
| 3 | `step-03-jtbd-reframing.md` | JTBD re-framing (revise, don't restart) | Core activity |
| 4 | `step-04-pains-gains-revision.md` | Pains & Gains revision (retain/remove/add) | Core activity |
| 5 | `step-05-synthesize.md` | Converge into revised HC2 + Compass routing | Standardized (P20: `*-synthesize.md`) |

**Why 5 steps (matching research-convergence):** Same 2-core-activity structure as research-convergence: JTBD + Pains & Gains. The pivot-specific difference is in content (re-frame vs. frame-fresh), not in step count.

**Core step naming (steps 3-4):** Uses `-reframing` and `-revision` suffixes to distinguish from research-convergence's `-framing` and raw analysis — reflecting that pivot resynthesis revises existing work rather than creating from scratch.

### Canonical Template: Story 2.2's Research-Convergence Workflow

Use `_bmad/bme/_vortex/workflows/research-convergence/` as the structural reference. Story 2.3 follows the same step-file architecture, frontmatter pattern, body structure, and Mila voice guidelines established in Story 2.2.

**Key differences from research-convergence:**
1. **Dual input validation** in step-01: HC1 + HC4 (not HC1 only)
2. **Pivot context analysis** in step-02: "What Still Holds?" assessment
3. **Re-framing language** in step-03: start from existing JTBD, revise
4. **Revision language** in step-04: retain/remove/add pains and gains
5. **Two Compass routes** in step-05 (not three): Liam or Isla per routing reference

### Input Schema: What Pivot-Resynthesis Accepts

**Primary input — HC1 Empathy Artifacts:**
From `_bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md`:
- Required frontmatter: `contract: HC1`, `type: artifact`, `source_agent`, `source_workflow`, `target_agents`, `input_artifacts`, `created`
- Required body: Executive Summary, Research Context, Synthesized Insights, Key Themes, Pain Points, Desired Gains, Recommendations

**Secondary input — HC4 Experiment Context:**
From `_bmad/bme/_vortex/contracts/hc4-experiment-context.md`:
- Required frontmatter: `contract: HC4`, `type: artifact`, `source_agent`, `source_workflow`, `target_agents`, `input_artifacts`, `created`
- Required body: Experiment Summary, Hypothesis Tested, Experiment Method, Pre-Defined Success Criteria, Confirmed/Rejected Hypotheses, Strategic Context, Production Readiness
- Key fields for pivot: Hypothesis Status (`Rejected`/`Partially Confirmed`), Core Learning, Assumption Status

**Optional input — Prior HC2 Problem Definition:**
From `_bmad/bme/_vortex/contracts/hc2-problem-definition.md`:
- The original converged problem definition that preceded the failed experiment
- Provides the JTBD baseline for re-framing

### HC2 Output Schema (What Pivot-Resynthesis Produces)

Same schema as research-convergence — from `_bmad/bme/_vortex/contracts/hc2-problem-definition.md`:

**Frontmatter:**
```yaml
---
contract: HC2
type: artifact
source_agent: mila
source_workflow: pivot-resynthesis
target_agents: [liam]
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/{hc1-filename}"
    contract: HC1
  - path: "_bmad-output/vortex-artifacts/{hc4-filename}"
    contract: HC4
created: {{date}}
---
```

**Required body sections:** Converged Problem Statement, JTBD, Pains, Gains, Evidence Summary, Assumptions

### Compass Routing Reference (Pivot-Resynthesis Routes)

From `_bmad/bme/_vortex/compass-routing-reference.md` line 204:

| Route | Target | Condition |
|-------|--------|-----------|
| 1 | Liam 💡 `hypothesis-engineering` | Revised problem definition ready (HC2) |
| 2 | Isla 🔍 `user-interview` | Assumptions from pivot need validation |

**Why 2 routes instead of 3:** Max's pivot decision already determined "problem correct, solution wrong." If the problem space itself were wrong, Max would have routed to Emma (HC8) instead of Mila (HC6). Therefore, pivot-resynthesis only routes to: Liam (revised problem ready for new hypotheses) or Isla (assumptions from pivot need validation before proceeding). Emma's re-contextualization route doesn't apply in pivot scenarios — it was already ruled out by Max's routing decision.

### HC6 Contract Context (Max → Mila Routing)

From compass-routing-reference.md:
- **Contract:** HC6 | **Type:** Decision-driven routing | **Flow:** Max → Mila
- **Trigger:** Max's pivot-patch-persevere decides "pivot": problem is correct but solution direction failed
- **What Mila receives:** Original Isla artifacts + new evidence from failed experiments. Re-synthesizes pains/gains while preserving the JTBD.
- **No artifact file:** HC6 is a routing contract. Decision context travels in conversation, not as a schema-compliant file.

### Mila's Voice Guidelines (Pivot-Specific)

All step content must use Mila's established persona with pivot-specific extensions:
- **Warm but analytically precise** — convergence language with revision framing
- **Pivot phrases:** "The experiment told us something important...", "The original research still holds — here's what we're revising...", "Based on the experiment evidence, three things changed..."
- **Evidence-grounded revision:** Always link revisions back to specific experiment results and original artifact evidence
- **"Revise, don't restart" language:** "We're not starting over — we're sharpening", "The JTBD core is sound. What changed is..."
- **NEVER use Isla phrases:** "I noticed that...", "embrace ambiguity", "The messier the research, the richer the insights"
- **NEVER use Emma phrases:** "Let's frame this strategically"

### Learnings from Story 2.2

1. **Contract paths:** Use `_bmad/bme/_vortex/contracts/` NOT `handoff-contracts/` (Story 2.2 code review M1)
2. **Insufficient Evidence heading:** Must include ⚠️ emoji: `### ⚠️ Insufficient Evidence for Routing` (Story 2.2 code review M2)
3. **Explicit save-to path:** Final step must include explicit output file path: `{output_folder}/vortex-artifacts/hc2-problem-definition-{date}.md` (Story 2.2 code review M3)
4. **Cross-artifact analysis example:** Include examples in step-02 (Story 2.2 code review L1)
5. **Template: None line:** Include in workflow.md output section (Story 2.2 code review L2)
6. **Step naming rationale (critical for pivot):** Step naming with `-reframing` and `-revision` suffixes (not research-convergence's `-framing` and `-pains-gains`) explicitly signals to users that Mila is refining existing work, not starting fresh. This is the primary point of differentiation from research-convergence.

### Files to Create

| File | Change | Why |
|------|--------|-----|
| `_bmad/bme/_vortex/workflows/pivot-resynthesis/workflow.md` | **NEW** | AC11 |
| `_bmad/bme/_vortex/workflows/pivot-resynthesis/steps/step-01-setup.md` | **NEW** | AC1, AC2, AC3 |
| `_bmad/bme/_vortex/workflows/pivot-resynthesis/steps/step-02-context.md` | **NEW** | AC1, AC2, AC4 |
| `_bmad/bme/_vortex/workflows/pivot-resynthesis/steps/step-03-jtbd-reframing.md` | **NEW** | AC1, AC2, AC5 |
| `_bmad/bme/_vortex/workflows/pivot-resynthesis/steps/step-04-pains-gains-revision.md` | **NEW** | AC1, AC2, AC5 |
| `_bmad/bme/_vortex/workflows/pivot-resynthesis/steps/step-05-synthesize.md` | **NEW** | AC1, AC2, AC6-AC10 |

### Files NOT Changing

- `_bmad/bme/_vortex/agents/research-convergence-specialist.md` — Mila's agent definition (completed in Story 2.1)
- `_bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md` — input schema (read-only reference)
- `_bmad/bme/_vortex/contracts/hc2-problem-definition.md` — output schema (read-only reference)
- `_bmad/bme/_vortex/contracts/hc4-experiment-context.md` — input schema (read-only reference)
- `_bmad/bme/_vortex/compass-routing-reference.md` — routing reference (read-only)
- `_bmad/bme/_vortex/workflows/research-convergence/` — sibling workflow (read-only reference)
- All JavaScript files — no code changes
- All test files — no test changes needed

### Project Structure Notes

- Workflow directory: `_bmad/bme/_vortex/workflows/pivot-resynthesis/`
- Steps directory: `_bmad/bme/_vortex/workflows/pivot-resynthesis/steps/`
- Output artifacts go to: `{output_folder}/vortex-artifacts/`
- Config file: `_bmad/bme/_vortex/config.yaml`
- All paths in step files use `{project-root}` variable

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 2.3]
- [Source: _bmad-output/planning-artifacts/architecture.md — P17, P20, D2, D4, D8, FR2-FR5, FR17-FR22, FR46, FR51, FR52]
- [Source: _bmad/bme/_vortex/workflows/research-convergence/ — Canonical sibling workflow (Story 2.2)]
- [Source: _bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md — Primary input schema]
- [Source: _bmad/bme/_vortex/contracts/hc4-experiment-context.md — Secondary input schema]
- [Source: _bmad/bme/_vortex/contracts/hc2-problem-definition.md — Output schema]
- [Source: _bmad/bme/_vortex/compass-routing-reference.md — Pivot-resynthesis routing table, line 204]
- [Source: _bmad-output/implementation-artifacts/2-2-create-research-convergence-workflow.md — Previous story learnings]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### Change Log
- 2026-02-25: Story created by create-story workflow. Status: ready-for-dev.
- 2026-02-25: Quality review applied 12 fixes (1C, 4E, 5O, 2S): explained WHY no Emma route in AC7 (C1), added HC4 evidence links to AC6 Evidence Summary (E2), added worked example requirement to AC4 (E3), clarified pivot context explanation in AC3 (E5), added operational clarity to Task 5.4 cross-reference (E6), clarified A/P/C placement in Task 6.12 (O3), highlighted Learning #6 as critical for pivot (O5), explained 2-route rationale in Dev Notes (O7), added confidence guidance to Task 6.2 (O8), added exact override note template to Task 6.11 (O9), noted HC4 Production Readiness is conditional (S1), added HC1 target_agents validation (S2).

### File List
