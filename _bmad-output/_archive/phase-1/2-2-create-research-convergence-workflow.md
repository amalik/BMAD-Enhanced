# Story 2.2: Create Research-Convergence Workflow (Mila's Primary)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a product manager with multiple Isla artifacts,
I want to run Mila's research-convergence workflow to synthesize divergent findings into a single problem definition,
So that I have one actionable, JTBD-grounded problem statement instead of scattered research outputs.

## Acceptance Criteria

1. **AC1: Step files follow micro-file architecture (FR51, P17, P20)**
   - **Given** the workflow directory `_bmad/bme/_vortex/workflows/research-convergence/steps/`
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
   - **And** follows Isla's established frontmatter pattern

3. **AC3: Step-01-setup validates input artifacts (FR17, FR1, FR6)**
   - **Given** a user invokes the workflow
   - **When** step-01-setup runs
   - **Then** it validates that input artifacts conform to HC1 schema format
   - **And** it guides the user if artifacts are non-conforming (FR17)
   - **And** it accepts any well-formed input, not only Isla's output (FR6)
   - **And** it describes what artifacts Mila expects (empathy maps, interview syntheses, observation reports per FR1)

4. **AC4: Step-02-context loads and analyzes artifacts**
   - **Given** validated input artifacts
   - **When** step-02-context runs
   - **Then** it loads and analyzes all provided artifacts
   - **And** it identifies themes, patterns, and contradictions across inputs

5. **AC5: Core steps guide JTBD framing and Pains & Gains (FR2, FR3)**
   - **Given** analyzed artifacts from step-02
   - **When** core activity steps run
   - **Then** they guide Jobs-to-be-Done framing based on provided artifacts (FR2)
   - **And** they facilitate Pains & Gains analysis across multiple input artifacts (FR3)

6. **AC6: Workflow produces HC2-compliant problem definition (FR4, FR29)**
   - **Given** completed JTBD and Pains & Gains analysis
   - **When** the synthesis step produces output
   - **Then** the output artifact follows HC2 schema format (FR4)
   - **And** HC2 frontmatter includes: `contract: HC2`, `source_agent: mila`, `source_workflow: research-convergence`, `target_agents: [liam]`, `input_artifacts` referencing all HC1 inputs
   - **And** HC2 body includes required sections: Converged Problem Statement, JTBD, Pains, Gains, Evidence Summary, Assumptions
   - **And** HC2 frontmatter `input_artifacts` array references every HC1 input artifact used (FR29 traceability), and the Evidence Summary body section notes which pains/gains originated from which input artifact

7. **AC7: Final step presents Compass routing with three-way distinction (FR19, FR20, FR21)**
   - **Given** the final `*-synthesize.md` step
   - **When** routing is presented
   - **Then** Compass table uses D4 format: `| If you learned... | Consider next... | Agent | Why |`
   - **And** it presents three routes: Liam for hypothesis (HC2), Isla for more discovery, Emma for new problem space (FR20)
   - **And** Compass references HC2 contract and declares what Liam expects (FR21)

8. **AC8: Insufficient evidence state handled (FR18)**
   - **Given** the Compass routing section
   - **When** evidence is insufficient to route confidently
   - **Then** an "Insufficient Evidence" guidance block is presented
   - **And** it specifies what evidence is needed for each route

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
    - **Given** `_bmad/bme/_vortex/workflows/research-convergence/workflow.md`
    - **When** it replaces the current placeholder
    - **Then** it follows Isla's empathy-map `workflow.md` pattern: frontmatter, description, steps overview, output description, initialization block
    - **And** initialization loads config and then loads `step-01-setup.md`

12. **AC12: Mila's voice is consistent throughout**
    - **Given** all step files
    - **When** language and tone are reviewed
    - **Then** they use Mila's communication style: warm but analytically precise, convergence language
    - **And** uses phrases like "Here's what the research is telling us..." and "Three patterns converge on this insight"
    - **And** uses conclusion-drawing language: "The data shows...", "These three pain points converge on a single root cause...", "Across all our research, the core problem is..."
    - **And** is distinct from Isla's ambiguity-embracing style (Isla explores tensions; Mila resolves them) and Emma's strategic-framing style

13. **AC13: Lint passes**
    - **Given** all created files
    - **When** `npm run lint` runs
    - **Then** it passes clean
    - **Note:** Content-only story. Lint is a regression check.

## Tasks / Subtasks

- [x]**Task 1: Replace workflow.md placeholder** (AC: 11)
  - [x]1.1 Replace `_bmad/bme/_vortex/workflows/research-convergence/workflow.md` placeholder with full workflow entry point
  - [x]1.2 Include YAML frontmatter: `workflow: research-convergence`, `type: step-file`, `description`, `author: Mila (research-convergence-specialist)`, `version: 1.6.0`
  - [x]1.3 Include workflow description with a "What is Research Convergence?" section (matching Isla's "What is an Empathy Map?" pattern) explaining purpose: synthesize divergent findings into a single JTBD-grounded problem definition
  - [x]1.4 Include steps overview listing all step files with brief descriptions
  - [x]1.5 Include output section describing HC2 artifact output to `{output_folder}/`
  - [x]1.6 Include initialization block: load config from `{project-root}/_bmad/bme/_vortex/config.yaml`, then load `step-01-setup.md`

- [x]**Task 2: Create steps/ directory and step-01-setup.md** (AC: 1, 2, 3)
  - [x]2.1 Create directory `_bmad/bme/_vortex/workflows/research-convergence/steps/`
  - [x]2.2 Create `step-01-setup.md` with frontmatter: `step: 1`, `workflow: research-convergence`, `title: Setup & Input Validation`
  - [x]2.3 Describe what artifacts Mila expects: HC1 empathy artifacts (empathy maps, interview syntheses, observation reports) OR any well-formed research input (FR6)
  - [x]2.4 Include input validation guidance (FR17). Specific checks: (a) Frontmatter fields: `contract`, `type`, `source_agent`, `source_workflow`, `target_agents`, `input_artifacts`, `created`; (b) Body sections: Executive Summary, Research Context, Synthesized Insights, Key Themes, Pain Points, Desired Gains, Recommendations. If non-conforming, guide user to provide needed sections rather than rejecting input. Reference HC1 contract: `{project-root}/_bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md`
  - [x]2.5 Ask user to provide/list their input artifacts
  - [x]2.6 End with next-step loading: `{project-root}/_bmad/bme/_vortex/workflows/research-convergence/steps/step-02-context.md`

- [x]**Task 3: Create step-02-context.md** (AC: 1, 2, 4)
  - [x]3.1 Create `step-02-context.md` with frontmatter: `step: 2`, `workflow: research-convergence`, `title: Context Loading & Analysis`
  - [x]3.2 Guide user to load and review all input artifacts
  - [x]3.3 Facilitate cross-artifact analysis: identify themes, patterns, contradictions, evidence gaps
  - [x]3.4 Guide the user through an initial synthesis inventory — a structured mental model of what the artifacts collectively tell us (no formal artifact produced at this stage; the HC2 artifact is produced in step-05)
  - [x]3.5 End with next-step loading to step-03

- [x]**Task 4: Create step-03-jtbd-framing.md** (AC: 1, 2, 5)
  - [x]4.1 Create `step-03-jtbd-framing.md` with frontmatter: `step: 3`, `workflow: research-convergence`, `title: Jobs-to-be-Done Framing`
  - [x]4.2 Guide JTBD framing: `When [situation], I want to [motivation], so I can [expected outcome]` (FR2)
  - [x]4.3 Help extract: Functional Job, Emotional Job, Social Job from the artifact evidence
  - [x]4.4 Include A/P/C decision point (FR52) after the user has drafted their JTBD statement — offering to deepen JTBD understanding (Advanced Elicitation), bring in other agents (Party Mode), or continue to Pains & Gains
  - [x]4.5 End with next-step loading to step-04

- [x]**Task 5: Create step-04-pains-gains.md** (AC: 1, 2, 5)
  - [x]5.1 Create `step-04-pains-gains.md` with frontmatter: `step: 4`, `workflow: research-convergence`, `title: Pains & Gains Analysis`
  - [x]5.2 Guide Pains analysis: Pain Description, Priority, Frequency, Intensity, Evidence Sources, Current Coping (FR3, HC2 schema)
  - [x]5.3 Guide Gains analysis: Gain Description, Priority, Expected Impact, Evidence Sources (FR3, HC2 schema)
  - [x]5.4 Cross-reference pains and gains against JTBD from step-03
  - [x]5.5 Include A/P/C decision point (FR52) after the user completes Pains & Gains tables — offering to refine analysis (Advanced Elicitation), bring in other agents (Party Mode), or continue to synthesis
  - [x]5.6 End with next-step loading to step-05

- [x]**Task 6: Create step-05-synthesize.md (final step)** (AC: 1, 2, 6, 7, 8, 9, 10)
  - [x]6.1 Create `step-05-synthesize.md` with frontmatter: `step: 5`, `workflow: research-convergence`, `title: Synthesize & Route`
  - [x]6.2 Guide convergence of all prior steps into a single Converged Problem Statement with confidence level
  - [x]6.3 Guide Evidence Summary creation with sub-prompts per field: (a) Artifacts Analyzed — count HC1 artifacts used; (b) Total Evidence Points — count discrete quotes, observations, data points across all artifacts; (c) Convergence Assessment — how strongly do pain points converge on a root cause and gains on a desired outcome; (d) Contradictions — where artifacts disagree; (e) Evidence Gaps — what's missing that would strengthen the problem definition
  - [x]6.4 Guide Assumptions listing: Assumption, Basis, Risk if Wrong, Validation Status
  - [x]6.5 Produce the HC2 artifact with correct frontmatter (`contract: HC2`, `source_agent: mila`, `source_workflow: research-convergence`, `target_agents: [liam]`, `input_artifacts` referencing all inputs, `created` in YYYY-MM-DD ISO format)
  - [x]6.6 Include all HC2 required body sections: Converged Problem Statement, JTBD, Pains, Gains, Evidence Summary, Assumptions
  - [x]6.7 Ensure HC2 frontmatter `input_artifacts` array lists every HC1 artifact used (FR29 traceability), and within the Evidence Summary body section, note which pains/gains originated from which input artifact for provenance
  - [x]6.8 Add Compass routing table with D4 format and three routes per routing reference:
    - Route 1: Problem converged → Liam `hypothesis-engineering` (HC2)
    - Route 2: Gaps found → Isla `user-discovery` (more discovery needed)
    - Route 3: Problem space wrong → Emma `contextualize-scope` (new problem)
  - [x]6.9 Add Insufficient Evidence block (FR18) specifying evidence needed for each route. Workflow-specific triggers: (a) cannot converge on a single JTBD from multiple artifacts → needs Isla for more discovery; (b) pain points from different artifacts contradict irreconcilably → needs Emma for re-scoping; (c) converged problem statement is vague or low-confidence → needs Isla for more evidence
  - [x]6.10 Add user override note (FR22) and Max [VN] reference
  - [x]6.11 Include A/P/C decision point before routing (FR52)

- [x]**Task 7: Verify Mila's voice and consistency** (AC: 12)
  - [x]7.1 Review all step files for Mila's communication style: warm but analytically precise, convergence language
  - [x]7.2 Verify language is distinct from Isla (no ambiguity-embracing phrases) and Emma (no strategic-framing phrases)
  - [x]7.3 Verify key phrases are present: "Here's what the research is telling us...", evidence-based convergence language

- [x]**Task 8: Validate and lint** (AC: 1, 13)
  - [x]8.1 Verify step count is 4-6 (P17) — expecting 5 steps
  - [x]8.2 Verify standardized filenames: `step-01-setup.md`, `step-02-context.md`, final `step-05-synthesize.md` (P20)
  - [x]8.3 Verify all frontmatter has `step`, `workflow`, `title` fields (FR46)
  - [x]8.4 Verify each step ends with next-step loading path (FR51) — final step has Compass instead
  - [x]8.5 Content validation: verify all step files have canonical structure (Step N heading, "Why This Matters", "Your Task", "Your Turn", "Next Step" sections) and spot-check for Isla/Emma phrases that shouldn't appear
  - [x]8.6 Run `npm run lint` — expect clean pass (no JS changes)

## Dev Notes

### This is a Content-Only Story

No JavaScript files are modified. Deliverables are markdown files only:
- 1 replacement `workflow.md` (entry point)
- 5 new step files in `steps/` directory
- No template directory needed (D8: FR49 relaxed)

All tests should pass unchanged. Run `npm run lint` as a regression check.

### Step Architecture Design (5 Steps)

Based on architecture constraints (P17: 4-6 steps, P20: standardized names) and the scope of this workflow:

| Step | File | Purpose | Architecture Role |
|------|------|---------|-------------------|
| 1 | `step-01-setup.md` | Input validation, artifact listing | Standardized (P20) |
| 2 | `step-02-context.md` | Load artifacts, cross-artifact analysis | Standardized (P20) |
| 3 | `step-03-jtbd-framing.md` | Jobs-to-be-Done framing (FR2) | Core activity |
| 4 | `step-04-pains-gains.md` | Pains & Gains analysis (FR3) | Core activity |
| 5 | `step-05-synthesize.md` | Converge into HC2 + Compass routing | Standardized (P20: `*-synthesize.md`) |

**Why 5 steps (not 6):** Isla's empathy-map has 6 steps because it covers 4 separate quadrants (Says/Thinks/Does/Feels) plus a define step. Mila's research-convergence has 2 core activities (JTBD + Pains & Gains) which map cleanly to 2 core steps between the standardized setup/context and synthesize steps. Adding a 6th step would split content that belongs together.

**Step naming deviation from Isla:** Isla uses activity-based names throughout (`step-01-define-user`, `step-02-says-thinks`, etc.). Research-convergence follows the P20 standardization pattern for steps 1, 2, and 5 (`step-01-setup`, `step-02-context`, `step-05-synthesize`) because Mila's workflow accepts diverse input types (not only Isla artifacts), requiring a generic input validation and context-loading phase before activity-specific core steps (03, 04).

### Canonical Template: Isla's Empathy-Map Workflow

Use `_bmad/bme/_vortex/workflows/empathy-map/` as the structural reference:

**workflow.md pattern:**
```yaml
---
workflow: empathy-map
type: step-file
description: Create user empathy maps through structured 6-step process
author: Isla (discovery-empathy-expert)
version: 1.5.0
---
```
Followed by: description section, workflow structure explanation, steps overview, output section, initialization block loading config then step-01.

**Step file frontmatter pattern:**
```yaml
---
step: 1
workflow: empathy-map
title: Define Target User
---
```

**Step file body pattern:**
1. `# Step N: Title` heading
2. "Why This Matters" section explaining the step's purpose
3. "Your Task" section with structured guidance and questions
4. Examples where helpful
5. "Your Turn" prompt for user input
6. "Next Step" section with path to next file

**Final step pattern (step-06-synthesize.md):**
- Same structure as above
- Adds validation questions (evidence check, specificity, actionability, completeness)
- Generates the output artifact
- Ends with Vortex Compass table

### HC1 Input Schema (What Mila Receives)

From `_bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md`:

**Required frontmatter:** `contract: HC1`, `type: artifact`, `source_agent`, `source_workflow`, `target_agents: [mila]`, `input_artifacts`, `created`

**Required body sections:** Executive Summary, Research Context, Synthesized Insights, Key Themes, Pain Points, Desired Gains, Recommendations

**Step-01-setup must validate these sections exist** (FR17). Non-conforming input should be guided but accepted (FR6).

### HC2 Output Schema (What Mila Produces)

From `_bmad/bme/_vortex/contracts/hc2-problem-definition.md`:

**Required frontmatter:**
```yaml
---
contract: HC2
type: artifact
source_agent: mila
source_workflow: research-convergence
target_agents: [liam]
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/{hc1-filename}"
    contract: HC1
created: {{date}}
---
```

**Required body sections:**
1. **Converged Problem Statement** — Problem Statement, Confidence (High/Medium/Low), Scope
2. **Jobs-to-be-Done** — Primary JTBD: `When [situation], I want to [motivation], so I can [expected outcome]`; Functional/Emotional/Social Jobs
3. **Pains** — Pain Description, Priority, Frequency, Intensity, Evidence Sources, Current Coping
4. **Gains** — Gain Description, Priority, Expected Impact, Evidence Sources
5. **Evidence Summary** — Artifacts Analyzed, Total Evidence Points, Convergence Assessment, Contradictions, Evidence Gaps
6. **Assumptions** — Assumption, Basis, Risk if Wrong, Validation Status

The synthesis step (step-05) must guide the user through creating all these sections and produce the artifact file.

### Compass Routing Reference (Research-Convergence Routes)

From `_bmad/bme/_vortex/compass-routing-reference.md`:

| Route | Target | Condition |
|-------|--------|-----------|
| 1 | Liam 💡 `hypothesis-engineering` | Problem converged, ready for hypothesis (HC2) |
| 2 | Isla 🔍 `user-discovery` | Gaps found, more discovery needed |
| 3 | Emma 🎯 `contextualize-scope` | Problem space itself is wrong (three-way: new problem) |

**D4 Compass table format (copy verbatim from routing reference, adapted for research-convergence):**
```markdown
## Vortex Compass

Based on what you just completed, here are your evidence-driven options:

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Problem is clearly defined with strong evidence | hypothesis-engineering | Liam 💡 | Converged problem ready for hypothesis generation (HC2) |
| Research gaps or unvalidated assumptions remain | user-discovery | Isla 🔍 | More discovery needed before convergence is reliable |
| The problem space itself seems wrong or too narrow | contextualize-scope | Emma 🎯 | Need to re-examine the broader problem context |

> **Note:** These are evidence-based recommendations. You can navigate to any Vortex agent
> at any time based on your judgment.

**Or run Max's [VN] Vortex Navigation** for a full gap analysis across all streams.
```

### Insufficient Evidence Template (FR18)

```markdown
### Insufficient Evidence for Routing

The evidence gathered so far doesn't clearly point to a single next step.

| To route to... | You need... |
|----------------|-------------|
| Liam 💡 | Converged problem definition with clear JTBD, pains, and gains |
| Isla 🔍 | Identified knowledge gap, unvalidated assumption, or anomalous behavior |
| Emma 🎯 | Clear signal that the problem space or scope needs fundamental change |

**Recommended:** Revisit earlier steps to strengthen your evidence, or run **Max's [VN] Vortex Navigation** for a full gap analysis.
```

### A/P/C Menu Pattern (FR52)

At decision points in core steps (step-03, step-04, and before Compass in step-05):
```markdown
---
**[a]** Advanced Elicitation — Deep dive into this topic with guided questioning
**[p]** Party Mode — Bring in other Vortex agents for collaborative discussion
**[c]** Continue — Move to the next step
---
```

### Mila's Voice Guidelines

All step content must use Mila's established persona (from Story 2.1):
- **Warm but analytically precise** — not Isla's nurturing warmth, not Emma's professional distance
- **Convergence language:** "Here's what the research is telling us...", "Three patterns converge on this insight", "Across all our research, the core problem is..."
- **Evidence-grounded:** Always link findings back to specific artifacts and user language
- **NEVER use Isla phrases:** "I noticed that...", "The messier the research, the richer the insights", "embrace ambiguity"
- **NEVER use Emma phrases:** "Let's frame this strategically"
- Mila **resolves** ambiguity (convergent) where Isla **embraces** it (divergent)

### Current Placeholder Content (What Gets Replaced)

`_bmad/bme/_vortex/workflows/research-convergence/workflow.md` currently contains only:
```markdown
# research-convergence

<!-- Placeholder: Full workflow content will be added in subsequent stories -->
```

No `steps/` directory exists. Everything must be created from scratch.

### Learnings from Story 2.1

1. **Content stories aren't risk-free** — even with zero JS changes, code review found convention observations
2. **Error messages should be customized** — Story 2.1 customized error text for Mila (not copy-pasting Isla's)
3. **Help examples should match the agent's domain** — Story 2.1 changed the help example to Mila's context
4. **Quote convention:** Mila's persona uses single quotes `'` (from registry) vs Isla's double quotes `"` — known, not a defect

### Files to Create/Modify

| File | Change | Why |
|------|--------|-----|
| `_bmad/bme/_vortex/workflows/research-convergence/workflow.md` | **REPLACE** placeholder with full entry point | AC11 |
| `_bmad/bme/_vortex/workflows/research-convergence/steps/step-01-setup.md` | **NEW** | AC1, AC2, AC3 |
| `_bmad/bme/_vortex/workflows/research-convergence/steps/step-02-context.md` | **NEW** | AC1, AC2, AC4 |
| `_bmad/bme/_vortex/workflows/research-convergence/steps/step-03-jtbd-framing.md` | **NEW** | AC1, AC2, AC5 |
| `_bmad/bme/_vortex/workflows/research-convergence/steps/step-04-pains-gains.md` | **NEW** | AC1, AC2, AC5 |
| `_bmad/bme/_vortex/workflows/research-convergence/steps/step-05-synthesize.md` | **NEW** | AC1, AC2, AC6-AC10 |

### Files NOT Changing

- `_bmad/bme/_vortex/agents/research-convergence-specialist.md` — Mila's agent definition (completed in Story 2.1)
- `_bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md` — input schema (read-only reference)
- `_bmad/bme/_vortex/contracts/hc2-problem-definition.md` — output schema (read-only reference)
- `_bmad/bme/_vortex/compass-routing-reference.md` — routing reference (read-only)
- All JavaScript files — no code changes
- All test files — no test changes needed

### Project Structure Notes

- Workflow directory: `_bmad/bme/_vortex/workflows/research-convergence/`
- Steps directory: `_bmad/bme/_vortex/workflows/research-convergence/steps/`
- Output artifacts go to: `{output_folder}/vortex-artifacts/`
- Config file: `_bmad/bme/_vortex/config.yaml`
- All paths in step files use `{project-root}` variable

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 2.2, lines 441-465]
- [Source: _bmad-output/planning-artifacts/architecture.md — P17, P20, D2, D4, D8, FR17-FR22, FR46, FR51, FR52]
- [Source: _bmad/bme/_vortex/workflows/empathy-map/ — Canonical workflow template (Isla)]
- [Source: _bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md — Input schema]
- [Source: _bmad/bme/_vortex/contracts/hc2-problem-definition.md — Output schema]
- [Source: _bmad/bme/_vortex/compass-routing-reference.md — Mila routing table]
- [Source: _bmad-output/implementation-artifacts/2-1-design-milas-agent-definition-persona.md — Previous story learnings]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (claude-opus-4-6)

### Debug Log References

### Completion Notes List

- Replaced workflow.md placeholder (3 lines) with full 48-line entry point following Isla's canonical pattern
- Created steps/ directory and 5 step files (step-01 through step-05)
- All step files follow canonical structure: frontmatter (step/workflow/title), Step N heading, Why This Matters, Your Task, Your Turn, Next Step
- Step-01-setup includes HC1 frontmatter validation checklist (7 fields) and body section checklist (7 sections) with HC1 contract file reference
- Step-03-jtbd-framing and step-04-pains-gains include A/P/C decision points at contextually appropriate moments
- Step-05-synthesize includes HC2 artifact generation guidance, all 6 required body sections, Compass routing (D4 format), Insufficient Evidence block with workflow-specific triggers, user override note, and A/P/C menu
- Mila's voice verified across all files: signature phrases present, zero Isla/Emma phrases detected
- All 5 step files chain correctly: workflow.md → step-01 → step-02 → step-03 → step-04 → step-05 (Compass)
- npm run lint passes clean (content-only story, no JS changes)

### Change Log
- 2026-02-24: Story created by create-story workflow. Status: ready-for-dev.
- 2026-02-24: Quality review applied 13 fixes (1C, 6E, 6O): clarified HC2 sourceArtifact→input_artifacts (C1), enumerated HC1 validation checklist (E1), specified A/P/C decision contexts (E2), added Mila voice examples (E3), added evidence triggers for insufficient evidence (E4), added "What is Research Convergence?" section guidance (E5), clarified date format (E6), added step naming rationale (O3), expanded Evidence Summary guidance (O2), added content validation task (O5), clarified synthesis inventory is mental model (O6).
- 2026-02-24: Implementation complete. All 8 tasks done. Status: review.
- 2026-02-24: Code review (0H, 3M, 2L). Fixed: story Dev Notes contract paths handoff-contracts→contracts (M1), added ⚠️ to Insufficient Evidence heading (M2), added explicit save-to path in step-05 (M3), added cross-artifact analysis example to step-02 (L1), added "Template: None" to workflow.md (L2). Status: done.

### File List
- `_bmad/bme/_vortex/workflows/research-convergence/workflow.md` — REPLACED placeholder with full entry point (48 lines)
- `_bmad/bme/_vortex/workflows/research-convergence/steps/step-01-setup.md` — NEW (69 lines)
- `_bmad/bme/_vortex/workflows/research-convergence/steps/step-02-context.md` — NEW (61 lines)
- `_bmad/bme/_vortex/workflows/research-convergence/steps/step-03-jtbd-framing.md` — NEW (81 lines)
- `_bmad/bme/_vortex/workflows/research-convergence/steps/step-04-pains-gains.md` — NEW (77 lines)
- `_bmad/bme/_vortex/workflows/research-convergence/steps/step-05-synthesize.md` — NEW (145 lines)
