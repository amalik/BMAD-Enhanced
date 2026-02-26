# Story 4.3: Create Behavior-Analysis Workflow

Status: done

## Story

As a product manager who noticed users behaving unexpectedly in production,
I want to analyze behavior patterns in the context of validated experiments,
So that I can understand whether this is normal variance, a regression, or a new discovery opportunity.

## Acceptance Criteria

1. **AC1: Input Validation (FR17)**
   - **Given** a user invokes the behavior-analysis workflow with production behavior data and experiment context
   - **When** step-01-setup runs
   - **Then** it validates the input conforms to the HC4 experiment context schema (7 frontmatter fields + 8 body sections)
   - **And** if the input is non-conforming, it guides the user to provide schema-compliant artifacts (listing missing fields/sections)
   - **And** it accepts equivalent user-provided input when no formal HC4 artifact exists
   - **And** it collects the specific behavior observation the user wants to analyze

2. **AC2: Experiment Baseline Loading**
   - **Given** validated HC4 input (or equivalent)
   - **When** step-02-context runs
   - **Then** it loads experiment context and extracts validated experiment baselines
   - **And** it documents the baseline metrics and expected production behavior from the experiment
   - **And** it connects the observed behavior to the experiment's prediction model
   - **And** it captures the Vortex history for upstream context (HC2, HC3, prior HC5 if available)

3. **AC3: Behavior Pattern Analysis (FR15)**
   - **Given** loaded experiment baselines and observed behavior data
   - **When** step-03-classification runs
   - **Then** it analyzes behavior patterns against the experiment's validated baselines
   - **And** it examines user segments, usage patterns, timing, and edge cases
   - **And** the analysis focuses on observable behavior, not self-reported behavior ("Behavioral patterns reveal intent that surveys miss")

4. **AC4: Behavior Classification (FR15, FR20)**
   - **Given** behavior pattern analysis
   - **When** the classification step completes
   - **Then** findings are classified into exactly three categories:
     - **Expected Variance** — behavior falls within experiment-predicted tolerance
     - **Regression** — behavior diverges negatively from validated experiment performance
     - **Novel Behavior** — behavior not covered by the original experiment hypothesis
   - **And** each classification includes supporting evidence with specific metrics
   - **And** the classification provides sufficient context for Max's downstream decision-making (FR20)

5. **AC5: Evidence & Data Quality**
   - **Given** classified behavior patterns
   - **When** step-04-evidence runs
   - **Then** it gathers supporting evidence for each classification with quantified metrics
   - **And** it assesses data quality (sample size, data completeness, known biases, confidence level)
   - **And** confidence level reflects the strength of the classification evidence
   - **And** if novel behavior is detected, it flags for HC10 routing to Isla

6. **AC6: HC5 Artifact Generation**
   - **Given** completed behavior analysis, classification, and evidence gathering
   - **When** step-05-synthesize runs
   - **Then** it produces a behavioral signal report artifact conforming to the HC5 schema
   - **And** the artifact has correct frontmatter: `contract: HC5`, `type: artifact`, `source_agent: noah`, `source_workflow: behavior-analysis`, `target_agents: [max]`, `input_artifacts` with HC4 reference, `created` date
   - **And** the artifact has all 5 HC5 body sections (Signal Description, Context, Trend Analysis, Anomaly Detection, Data Quality)
   - **And** the Signal Description uses behavior classification context (variance/regression/novel) to inform signal type and severity
   - **And** the artifact explicitly excludes strategic recommendations, pivot/patch/persevere decisions, and experiment design suggestions

7. **AC7: Compass Routing (FR19, FR21, FR22)**
   - **Given** the synthesize step completes
   - **When** the Vortex Compass is presented
   - **Then** it shows 3 evidence-based routing options matching compass-routing-reference.md:
     - → Max 🧭 `pivot-patch-persevere` — Behavioral signal report triggers decision (HC5)
     - → Isla 🔍 `user-discovery` — Novel behavior warrants discovery (HC10)
     - → Noah 📡 `signal-interpretation` — Deeper signal analysis needed
   - **And** Compass references HC5 contract and declares what Max expects (FR21)
   - **And** user can override Compass recommendation (FR22)
   - **And** Max's Vortex Navigation is referenced as a fallback

8. **AC8: Insufficient Evidence Handling (FR18)**
   - **Given** the Compass routing step
   - **When** evidence is insufficient to determine routing
   - **Then** the ⚠️ Insufficient Evidence block is presented with specific evidence needed for each of the 3 routes
   - **And** workflow-specific signals guide revisiting earlier steps

9. **AC9: Step File Architecture (FR46, FR51)**
   - **Given** the workflow implementation
   - **Then** each step file has valid frontmatter with `step`, `workflow: behavior-analysis`, and `title` fields (FR46)
   - **And** the workflow uses micro-file step architecture where each step loads the next step file sequentially (FR51)
   - **And** step count is 5 (within 4-6 range)
   - **And** filenames follow the standardized pattern: `step-01-setup.md`, `step-02-context.md`, `step-0N-name.md`, final `step-05-synthesize.md`

10. **AC10: A/P/C Decision Points (FR52)**
    - **Given** contextually appropriate moments in the workflow
    - **Then** steps 3-5 present the standard A/P/C menu: `[a]` Advanced Elicitation, `[p]` Party Mode, `[c]` Continue
    - **And** each A/P/C is tailored to the step's content (not copy-pasted)

11. **AC11: Noah's Voice Consistency**
    - **Given** all workflow content
    - **Then** Noah's voice is calm, observational, and uses signature phrases: "The signal indicates...", "Here's what we're seeing in context", "Behavioral patterns reveal..."
    - **And** zero voice bleed: no Isla phrases ("I noticed that", "embrace ambiguity", "feelings are data"), no Mila phrases ("Here's what the research is telling us", "Three patterns converge"), no Liam phrases ("What if?", "stress-test", "falsifiable", "bold version"), no Wade phrases ("Let's test that", "build-measure-learn"), no Max phrases ("Evidence suggests", "pivot/patch/persevere")

12. **AC12: Regression Check**
    - **Given** this is a content-only story (markdown files only)
    - **Then** `npm run lint` passes clean (regression check — no JS changes)

*Covers: FR15, FR17, FR18, FR19, FR20, FR21, FR22, FR46, FR47, FR51, FR52*

## Tasks / Subtasks

- [x] **Task 1: Replace workflow.md placeholder with full entry point** (AC: 9, 11)
  - [x] 1.1 Read Liam's canonical workflow.md (`_bmad/bme/_vortex/workflows/hypothesis-engineering/workflow.md`) and Noah's signal-interpretation workflow.md for structural reference
  - [x] 1.2 Read current behavior-analysis placeholder (`_bmad/bme/_vortex/workflows/behavior-analysis/workflow.md`) — 3 lines to replace
  - [x] 1.3 Build frontmatter: `workflow: behavior-analysis`, `type: step-file`, `description: [behavior-analysis-specific]`, `author: Noah (production-intelligence-specialist)`, `version: 1.6.0`
  - [x] 1.4 Write "What is Behavior Analysis?" section in Noah's voice — behavioral patterns reveal intent that surveys miss
  - [x] 1.5 Write Workflow Structure section (step-file architecture)
  - [x] 1.6 Write Steps Overview (5 steps with descriptions)
  - [x] 1.7 Write Output section: artifact HC5, Template: None, Schema: `_bmad/bme/_vortex/contracts/hc5-signal-report.md`, Consumer: Max (pivot-patch-persevere)
  - [x] 1.8 Write INITIALIZATION block: load config.yaml, load step-01-setup.md
  - [x] 1.9 Write complete file replacing the 3-line placeholder

- [x] **Task 2: Create step-01-setup.md — Setup & Input Validation** (AC: 1, 9, 11)
  - [x] 2.1 Read Noah's signal-interpretation step-01-setup.md for structural reference (same agent, different workflow)
  - [x] 2.2 Read HC4 contract schema (`_bmad/bme/_vortex/contracts/hc4-experiment-context.md`) for validation fields
  - [x] 2.3 Create `steps/` directory under behavior-analysis workflow
  - [x] 2.4 Build frontmatter: `step: 1`, `workflow: behavior-analysis`, `title: Setup & Input Validation`
  - [x] 2.5 Write opening paragraph in Noah's voice — receiving experiment context and behavior observation
  - [x] 2.6 Write "Why This Matters" section — behavioral patterns only meaningful when measured against experiment baselines
  - [x] 2.7 Write HC4 frontmatter validation table (7 fields)
  - [x] 2.8 Write HC4 body sections validation table (8 sections)
  - [x] 2.9 Write behavior observation collection — what specific behavior has the user observed?
  - [x] 2.10 Write non-conforming input guidance
  - [x] 2.11 Write "Your Turn" and "Next Step" sections (chain to step-02-context.md)

- [x] **Task 3: Create step-02-context.md — Experiment Baselines & Behavior Observation** (AC: 2, 9, 11)
  - [x] 3.1 Read Noah's signal-interpretation step-02-context.md for structural reference
  - [x] 3.2 Build frontmatter: `step: 2`, `workflow: behavior-analysis`, `title: Experiment Baselines & Behavior Observation`
  - [x] 3.3 Write opening paragraph in Noah's voice — establishing baselines for behavior comparison
  - [x] 3.4 Write "Why This Matters" section — behavior only becomes meaningful when compared to what was expected
  - [x] 3.5 Write Experiment Baseline extraction guidance (validated metrics, expected production behavior, success criteria thresholds, monitoring targets)
  - [x] 3.6 Write Behavior Observation documentation (what, when, who, how detected — raw behavior data)
  - [x] 3.7 Write Vortex History connection (HC2, HC3, prior HC5, related experiments)
  - [x] 3.8 Write "Your Turn" and "Next Step" sections (chain to step-03-classification.md)

- [x] **Task 4: Create step-03-classification.md — Behavior Pattern Classification** (AC: 3, 4, 10, 11)
  - [x] 4.1 Build frontmatter: `step: 3`, `workflow: behavior-analysis`, `title: Behavior Pattern Classification`
  - [x] 4.2 Write opening paragraph in Noah's voice — classifying what the behavior means against experiment expectations
  - [x] 4.3 Write "Why This Matters" section — classification converts raw observation into actionable intelligence
  - [x] 4.4 Write Behavior Pattern Analysis guidance — compare observed behavior to experiment baselines across segments, timing, edge cases
  - [x] 4.5 Write Classification Taxonomy with 3 categories:
    - Expected Variance (within tolerance)
    - Regression (diverges from validated performance)
    - Novel Behavior (not covered by original hypothesis)
  - [x] 4.6 Write classification evidence table — each finding must have supporting metrics
  - [x] 4.7 Write explicit "no recommendations" guardrail — Noah classifies, Max decides
  - [x] 4.8 Write A/P/C decision point tailored to behavior classification
  - [x] 4.9 Write "Your Turn" and "Next Step" sections (chain to step-04-evidence.md)

- [x] **Task 5: Create step-04-evidence.md — Evidence Gathering & Data Quality** (AC: 5, 10, 11)
  - [x] 5.1 Build frontmatter: `step: 4`, `workflow: behavior-analysis`, `title: Evidence Gathering & Data Quality`
  - [x] 5.2 Write opening paragraph in Noah's voice — building the evidence base for each classification
  - [x] 5.3 Write "Why This Matters" section — evidence strength determines routing confidence
  - [x] 5.4 Write Evidence Gathering guidance per classification category (variance evidence, regression evidence, novel behavior evidence)
  - [x] 5.5 Write HC10 Novel Behavior Routing Assessment — if novel behavior detected, flag for Isla routing
  - [x] 5.6 Write Data Quality assessment guidance with HC5 fields (Sample Size, Data Completeness, Known Biases, Confidence Level)
  - [x] 5.7 Write A/P/C decision point tailored to evidence gathering
  - [x] 5.8 Write "Your Turn" and "Next Step" sections (chain to step-05-synthesize.md)

- [x] **Task 6: Create step-05-synthesize.md — Synthesize & Route** (AC: 6, 7, 8, 10, 11)
  - [x] 6.1 Read Liam's and Noah's signal-interpretation step-05-synthesize.md for canonical Compass/A/P/C pattern
  - [x] 6.2 Build frontmatter: `step: 5`, `workflow: behavior-analysis`, `title: Synthesize & Route`
  - [x] 6.3 Write opening paragraph in Noah's voice — packaging behavioral intelligence for Max
  - [x] 6.4 Write "Why This Matters" section — behavioral classification as intelligence, not strategy
  - [x] 6.5 Write review/validation checklists for all HC5 sections adapted for behavioral analysis
  - [x] 6.6 Write HC5 artifact generation guidance with frontmatter template (`contract: HC5`, `source_agent: noah`, `source_workflow: behavior-analysis`, `target_agents: [max]`, `input_artifacts` with HC4 reference, `created`)
  - [x] 6.7 Write explicit HC5 constraint reminder — no strategic recommendations, no pivot/patch/persevere, no experiment design suggestions
  - [x] 6.8 Write `Save to:` with path template `{output_folder}/vortex-artifacts/hc5-behavior-report-{date}.md`
  - [x] 6.9 Write Validation Questions (evidence check, completeness check, classification-not-strategy check)
  - [x] 6.10 Write A/P/C decision point tailored to synthesis
  - [x] 6.11 Write Vortex Compass with 3 routing rows from compass-routing-reference.md:
    - → Max 🧭 `pivot-patch-persevere` — Behavioral signal report triggers decision (HC5)
    - → Isla 🔍 `user-discovery` — Novel behavior warrants discovery (HC10)
    - → Noah 📡 `signal-interpretation` — Deeper signal analysis needed
  - [x] 6.12 Write ⚠️ Insufficient Evidence block with route-specific evidence needs (3 routes) and workflow-specific signals
  - [x] 6.13 Write user override note and Max VN reference

- [x] **Task 7: Verify implementation** (AC: 1-12)
  - [x] 7.1 Verify step file chain: workflow.md → step-01 → step-02 → step-03 → step-04 → step-05 (Compass). All `Next Step` references resolve correctly.
  - [x] 7.2 Verify all frontmatter is valid: every step file has `step`, `workflow: behavior-analysis`, `title`
  - [x] 7.3 Verify HC4 validation in step-01 covers all 7 frontmatter fields and 8 body sections
  - [x] 7.4 Verify HC5 output in step-05 covers all 7 frontmatter fields and 5 body sections
  - [x] 7.5 Verify Compass routing matches compass-routing-reference.md exactly (3 rows: Max HC5, Isla HC10, Noah self-route)
  - [x] 7.6 Verify ⚠️ Insufficient Evidence block present with FR18 format (3 routes)
  - [x] 7.7 Verify A/P/C decision points in steps 3, 4, 5 — each tailored, not copy-pasted
  - [x] 7.8 Voice bleed check — zero forbidden phrases:
    - No Isla: "I noticed that", "embrace ambiguity", "feelings are data"
    - No Mila: "Here's what the research is telling us", "Three patterns converge"
    - No Liam: "What if?", "stress-test", "falsifiable", "bold version"
    - No Wade: "Let's test that", "build-measure-learn"
    - No Max: "Evidence suggests", "pivot/patch/persevere"
  - [x] 7.9 Verify no strategic recommendations language anywhere in the workflow
  - [x] 7.10 Verify `input_artifacts` HC4 reference in HC5 artifact template (FR29)
  - [x] 7.11 Verify behavior classification taxonomy present (expected variance / regression / novel behavior)
  - [x] 7.12 Run `npm run lint` — must pass clean (AC12)

## Dev Notes

### This is a Content-Only Story

All deliverables are markdown files. No JavaScript changes. `npm run lint` serves as a regression check only.

### Behavior-Analysis vs Signal-Interpretation: Key Distinctions

This is Noah's **second** workflow. It is NOT a copy of signal-interpretation — it has a distinct analytical focus:

| Aspect | signal-interpretation (4-2) | behavior-analysis (4-3) |
|--------|---------------------------|------------------------|
| **Focus** | One production signal → contextualize through experiment lineage | Observed behavior pattern → classify against experiment baselines |
| **Core analysis** | Signal description + trend analysis | Behavior pattern classification (3 categories) |
| **Classification** | Signal type (metric deviation, behavior pattern, anomaly, trend shift, threshold breach) | Behavior category: expected variance, regression, novel behavior |
| **Compass routes** | 2 rows (Max `learning-card`, Isla HC10) | 3 rows (Max `pivot-patch-persevere`, Isla HC10, Noah `signal-interpretation`) |
| **Max target workflow** | `learning-card` | `pivot-patch-persevere` |
| **Self-routing** | No | Yes — back to Noah's `signal-interpretation` for deeper analysis |
| **HC5 source_workflow** | `signal-interpretation` | `behavior-analysis` |
| **Unique step** | step-03 signal-analysis (signal + trend) | step-03 classification (variance/regression/novel) |

### Canonical Workflow Template: Liam + Noah's Signal-Interpretation

Follow the exact same structural patterns established in Stories 3-2 and 4-2:

- **workflow.md**: ~53 lines. Frontmatter → Title → "What is X?" → Workflow Structure → Steps Overview → Output → INITIALIZATION
- **Step files**: Frontmatter (step/workflow/title) → Title → Opening paragraph in agent voice → "Why This Matters" → "Your Task" with numbered subsections → "Your Turn" → "Next Step" (or Compass for final step)
- **Final step (step-05-synthesize)**: Adds validation questions, A/P/C, Vortex Compass (D4 format), ⚠️ Insufficient Evidence, user override note, Max VN reference

### HC4 Input Schema (What Noah Receives)

**Source:** `_bmad/bme/_vortex/contracts/hc4-experiment-context.md`

**Frontmatter (7 fields):** `contract: HC4`, `type: artifact`, `source_agent`, `source_workflow`, `target_agents: [noah]`, `input_artifacts`, `created`

**Body (8 sections):**
1. Experiment Summary — Name, Description, Type, Duration, Graduation Status
2. Hypothesis Tested — Statement, Riskiest Assumption, Expected Outcome, Target Behavior Change
3. Experiment Method — Method Type, Sample Size, Planned Duration
4. Pre-Defined Success Criteria — Metric, Target Threshold, Actual Result, Met?
5. Additional Results (optional) — Quantitative Metrics, Qualitative Results
6. Confirmed/Rejected Hypotheses — Status, Assumption Status, Core Learning
7. Strategic Context — Vortex Stream, Assumption Tested, Decision It Informs, Implications
8. Production Readiness — Metrics to Monitor, Expected Behavior, Signal Thresholds

### HC5 Output Schema (What Noah Produces)

**Source:** `_bmad/bme/_vortex/contracts/hc5-signal-report.md`

**Frontmatter (7 fields):** `contract: HC5`, `type: artifact`, `source_agent: noah`, `source_workflow: behavior-analysis`, `target_agents: [max]`, `input_artifacts` (HC4 reference), `created`

**Body (5 sections) — same schema, behavioral content:**
1. Signal Description — Summary, Type, Severity, Detection Method, Time Window, Affected Scope (Type will often be `Behavior Pattern`)
2. Context — Experiment Lineage + Vortex History (same structure as signal-interpretation)
3. Trend Analysis — Direction, Duration, Rate of Change, Baseline Comparison, Confidence (focused on behavior trajectory)
4. Anomaly Detection (when novel behavior detected) — Description, Deviation, Explanations, Discovery Needed, Discovery Focus
5. Data Quality — Sample Size, Completeness, Known Biases, Confidence Level

**HC5 explicitly excludes:** strategic recommendations, pivot/patch/persevere decisions, experiment design suggestions, resource allocation recommendations

**Save path:** `{output_folder}/vortex-artifacts/hc5-behavior-report-{date}.md`

### Compass Routing (behavior-analysis) — 3 Rows

**Source:** `_bmad/bme/_vortex/compass-routing-reference.md`

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Behavioral signal report triggers decision | pivot-patch-persevere | Max 🧭 | Behavioral signal report triggers decision (HC5) |
| Novel behavior warrants discovery | user-discovery | Isla 🔍 | Novel behavior warrants discovery (HC10) |
| Deeper signal analysis needed | signal-interpretation | Noah 📡 | Deeper signal analysis needed |

**Note:** 3 routing rows (not 2). This is correct per compass-routing-reference.md. Includes self-routing to Noah's signal-interpretation for cases where behavior analysis reveals a specific signal worth deeper investigation.

### Insufficient Evidence Template (FR18) — 3 Routes

| To route to... | You need... |
|----------------|-------------|
| Max 🧭 | Complete HC5 behavioral signal report with classified behavior patterns and sufficient evidence |
| Isla 🔍 | Specific novel behavior identified with clear deviation from experiment expectations |
| Noah 📡 | Specific signal identified within behavior patterns that warrants focused signal-interpretation analysis |

**Workflow-specific signals:**
- Classification unclear → revisit **step-03** for sharper analysis against baselines
- Cannot establish experiment baselines → revisit **step-02** for deeper baseline extraction
- Evidence insufficient for classification → gather more production behavior data before proceeding
- Behavior observed but cannot connect to any experiment → consider whether this should be a signal-interpretation workflow instead

### Behavior Classification Taxonomy

The core differentiator of this workflow. Three mutually exclusive categories:

1. **Expected Variance** — Behavior falls within experiment-predicted tolerance. The experiment predicted this range of behavior and production is confirming it. This is a valid finding — confirms the experiment model.

2. **Regression** — Behavior diverges negatively from validated experiment performance. Something that was working in the experiment is not performing as expected in production. Warrants Max's attention for strategic decision.

3. **Novel Behavior** — Behavior not covered by the original experiment hypothesis. Users are doing something the experiment didn't predict or measure. This is often the most valuable finding — it reveals user intent the hypothesis didn't anticipate. Warrants Isla's discovery investigation.

### Noah Voice Guidelines

**Use:** "The signal indicates...", "Here's what we're seeing in context", "Behavioral patterns reveal...", "Production data is the most honest user feedback", "Anomaly detection surfaces what dashboards hide", "Signal + context + trend"

**Never use:**
- Isla phrases: "I noticed that", "embrace ambiguity", "feelings are data"
- Mila phrases: "Here's what the research is telling us", "Three patterns converge"
- Liam phrases: "What if?", "stress-test", "falsifiable", "bold version"
- Wade phrases: "Let's test that", "build-measure-learn"
- Max phrases: "Evidence suggests", "pivot/patch/persevere"

### A/P/C Decision Points

Steps 3, 4, and 5 include A/P/C menus. Each must be tailored:
- **Step 3 (classification):** `[a]` Deep dive into behavior classification with guided questioning | `[p]` Collaborative behavior pattern analysis | `[c]` Continue to evidence gathering
- **Step 4 (evidence):** `[a]` Deep dive into evidence strengthening with guided questioning | `[p]` Collaborative evidence assessment | `[c]` Continue to synthesis
- **Step 5 (synthesize):** `[a]` Deep dive into HC5 refinement with guided questioning | `[p]` Collaborative artifact critique | `[c]` Generate HC5 artifact and proceed to routing

### Learnings from Story 4-2

1. **L1 (LOW):** HC4 body section validation can omit optional sub-fields — the full contract reference link covers detail
2. **L2 (LOW):** Gather-then-formalize pattern is valid — step-02 collects raw data, step-03 formalizes it
3. **L3 (LOW):** Analytical bridge tables that don't map directly to HC5 sections are acceptable
4. **Template: None** in workflow.md — include from the start (D8 learning)
5. **Save-to path** in final step — include with full path template
6. **Voice bleed zero tolerance** — grep verification required (team agreement)
7. **Step file chain verification** — all Next Step references must resolve
8. **⚠️ emoji** on Insufficient Evidence heading — include from the start

### Files to Create/Modify

| File | Action | Est. Lines |
|------|--------|-----------|
| `_bmad/bme/_vortex/workflows/behavior-analysis/workflow.md` | REPLACE placeholder | ~53 |
| `_bmad/bme/_vortex/workflows/behavior-analysis/steps/step-01-setup.md` | NEW | ~75 |
| `_bmad/bme/_vortex/workflows/behavior-analysis/steps/step-02-context.md` | NEW | ~80 |
| `_bmad/bme/_vortex/workflows/behavior-analysis/steps/step-03-classification.md` | NEW | ~95 |
| `_bmad/bme/_vortex/workflows/behavior-analysis/steps/step-04-evidence.md` | NEW | ~90 |
| `_bmad/bme/_vortex/workflows/behavior-analysis/steps/step-05-synthesize.md` | NEW | ~175 |

**Total:** 6 files (~568 lines)

### Files NOT Changing

- `_bmad/bme/_vortex/agents/production-intelligence-specialist.md` — Noah's agent definition (done in Story 4-1)
- `_bmad/bme/_vortex/contracts/hc5-signal-report.md` — HC5 schema (already exists)
- `_bmad/bme/_vortex/contracts/hc4-experiment-context.md` — HC4 schema (already exists)
- `_bmad/bme/_vortex/compass-routing-reference.md` — routing reference (already exists)
- `_bmad/bme/_vortex/workflows/signal-interpretation/` — signal-interpretation workflow (done in Story 4-2)
- No JavaScript files change in this story

### Project Structure Notes

- All files placed under `_bmad/bme/_vortex/workflows/behavior-analysis/`
- `steps/` subdirectory for step files (matching signal-interpretation and hypothesis-engineering pattern)
- No conflicts with existing files — only replaces 3-line placeholder workflow.md

### References

- [Source: _bmad/bme/_vortex/workflows/hypothesis-engineering/workflow.md] — Liam canonical workflow.md
- [Source: _bmad/bme/_vortex/workflows/signal-interpretation/workflow.md] — Noah signal-interpretation workflow.md (same agent, different workflow)
- [Source: _bmad/bme/_vortex/workflows/signal-interpretation/steps/step-05-synthesize.md] — Noah Compass/A/P/C pattern
- [Source: _bmad/bme/_vortex/contracts/hc5-signal-report.md] — HC5 output schema
- [Source: _bmad/bme/_vortex/contracts/hc4-experiment-context.md] — HC4 input schema
- [Source: _bmad/bme/_vortex/compass-routing-reference.md] — Noah behavior-analysis routing (3 rows)
- [Source: _bmad/bme/_vortex/agents/production-intelligence-specialist.md] — Noah agent definition (Story 4-1)
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 4, Story 4.3] — Story requirements
- [Source: _bmad-output/implementation-artifacts/4-2-create-signal-interpretation-workflow.md] — Previous story learnings

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

### Completion Notes List

- Replaced 3-line workflow.md placeholder with full 52-line entry point following canonical template exactly
- Created steps/ directory and 5 step files (step-01 through step-05)
- step-01-setup (81 lines): HC4 input validation with 7 frontmatter fields + 8 body sections, behavior observation collection table, non-conforming input guidance
- step-02-context (67 lines): Experiment baseline extraction (5 fields) + behavior observation documentation (6 fields) + Vortex history mapping (4 fields)
- step-03-classification (98 lines): Behavior Pattern Analysis (6 dimensions) + Classification Taxonomy (3 categories: Expected Variance, Regression, Novel Behavior) + summary table + A/P/C
- step-04-evidence (100 lines): Evidence gathering per classification (variance/regression/novel) + HC10 Novel Behavior Routing Assessment + data quality (4 HC5 fields) + A/P/C
- step-05-synthesize (174 lines): HC5 review checklists adapted for behavioral analysis + artifact generation with frontmatter template + Behavior Classification Addendum + validation questions (4 categories) + A/P/C + Compass (3 rows) + Insufficient Evidence block (3 routes)
- Noah's voice consistent throughout: "Behavioral patterns reveal...", "The signal indicates...", "Here's what we're seeing in context"
- Zero voice bleed: no Isla/Mila/Liam/Wade/Max phrases detected (6 grep checks)
- No strategic recommendations anywhere — classifications only, decisions belong to Max
- Compass routing matches compass-routing-reference.md: Max HC5 pivot-patch-persevere + Isla HC10 user-discovery + Noah signal-interpretation (3 rows)
- All step file chains verified: workflow.md → step-01 → step-02 → step-03 → step-04 → step-05
- All frontmatter valid: step, workflow: behavior-analysis, title
- input_artifacts HC4 reference included in HC5 frontmatter template (FR29)
- Template: None included in workflow.md (D8 learning)
- Save to path included in step-05
- Lint passes clean (no JS changes — regression check only)

### Change Log

- 2026-02-26: Implementation complete. All 12 ACs satisfied. 6 files created (572 total lines)

### File List

- `_bmad/bme/_vortex/workflows/behavior-analysis/workflow.md` (REPLACED — 3-line placeholder → 52-line full entry point)
- `_bmad/bme/_vortex/workflows/behavior-analysis/steps/step-01-setup.md` (NEW — 81 lines)
- `_bmad/bme/_vortex/workflows/behavior-analysis/steps/step-02-context.md` (NEW — 67 lines)
- `_bmad/bme/_vortex/workflows/behavior-analysis/steps/step-03-classification.md` (NEW — 98 lines)
- `_bmad/bme/_vortex/workflows/behavior-analysis/steps/step-04-evidence.md` (NEW — 100 lines)
- `_bmad/bme/_vortex/workflows/behavior-analysis/steps/step-05-synthesize.md` (NEW — 174 lines)
