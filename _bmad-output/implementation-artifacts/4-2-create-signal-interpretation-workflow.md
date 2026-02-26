# Story 4.2: Create Signal-Interpretation Workflow

Status: done

## Story

As a head of product with production metrics diverging from experiment expectations,
I want to run Noah's signal-interpretation workflow to understand what production signals mean in context of my experiment history,
So that I get contextualized intelligence for Max instead of raw dashboard numbers.

## Acceptance Criteria

1. **AC1: Input Validation (FR12, FR17)**
   - **Given** a user invokes the signal-interpretation workflow with Wade's experiment context
   - **When** step-01-setup runs
   - **Then** it validates the input conforms to the HC4 experiment context schema (7 frontmatter fields + 8 body sections)
   - **And** if the input is non-conforming, it guides the user to provide schema-compliant artifacts (listing missing fields/sections)
   - **And** it accepts equivalent user-provided input when no formal HC4 artifact exists

2. **AC2: Experiment Context Loading (FR13)**
   - **Given** validated HC4 input (or equivalent)
   - **When** step-02-context runs
   - **Then** it loads experiment context and connects it to the production signal
   - **And** it extracts experiment lineage: originating experiment, original hypothesis, experiment outcome, expected production behavior
   - **And** it extracts Vortex history: problem definition origin, hypothesis origin, previous signals, related experiments

3. **AC3: Signal Interpretation (FR13, FR14)**
   - **Given** loaded experiment context and a production signal
   - **When** step-03-signal-analysis runs
   - **Then** it interprets the production signal by connecting it to the originating experiment context and Vortex history
   - **And** it produces signal description (summary, type, severity, detection method, time window, affected scope)
   - **And** it produces trend analysis (direction, duration, rate of change, baseline comparison, confidence)
   - **And** the output contains NO strategic recommendations — intelligence only

4. **AC4: Anomaly Detection (FR15, FR16)**
   - **Given** signal analysis and experiment context
   - **When** step-04-anomaly-detection runs
   - **Then** it detects unexpected user behavior patterns not covered by the original hypothesis
   - **And** if anomalous behavior is detected, it flags for Compass routing to Isla for discovery research (HC10 guidance)
   - **And** it produces data quality assessment (sample size, data completeness, known biases, confidence level)

5. **AC5: HC5 Artifact Generation (FR14, FR29)**
   - **Given** completed signal analysis, anomaly detection, and data quality assessment
   - **When** step-05-synthesize runs
   - **Then** it produces a signal report artifact conforming to the HC5 schema
   - **And** the artifact has correct frontmatter: `contract: HC5`, `type: artifact`, `source_agent: noah`, `source_workflow: signal-interpretation`, `target_agents: [max]`, `input_artifacts` with HC4 reference, `created` date
   - **And** the artifact has all 5 body sections: Signal Description, Context (Experiment Lineage + Vortex History), Trend Analysis, Anomaly Detection (when applicable), Data Quality
   - **And** the artifact has `sourceArtifact` reference in frontmatter linking to HC4 input (FR29)
   - **And** the artifact explicitly excludes strategic recommendations, pivot/patch/persevere decisions, and experiment design suggestions

6. **AC6: Compass Routing (FR19, FR21, FR22)**
   - **Given** the synthesize step completes
   - **When** the Vortex Compass is presented
   - **Then** it shows 2 evidence-based routing options matching compass-routing-reference.md:
     - → Max `learning-card` — Signal report ready for decision (HC5)
     - → Isla `user-discovery` — ⚡ Anomalous behavior detected (HC10)
   - **And** Compass references HC5 contract and declares what Max expects (FR21)
   - **And** user can override Compass recommendation (FR22)
   - **And** Max's Vortex Navigation is referenced as a fallback

7. **AC7: Insufficient Evidence Handling (FR18)**
   - **Given** the Compass routing step
   - **When** evidence is insufficient to determine routing
   - **Then** the ⚠️ Insufficient Evidence block is presented with specific evidence needed for each route
   - **And** workflow-specific signals guide revisiting earlier steps

8. **AC8: Step File Architecture (FR46, FR51)**
   - **Given** the workflow implementation
   - **Then** each step file has valid frontmatter with `step`, `workflow: signal-interpretation`, and `title` fields (FR46)
   - **And** the workflow uses micro-file step architecture where each step loads the next step file sequentially (FR51)
   - **And** step count is 5 (within 4-6 range per RF1)
   - **And** filenames follow the standardized pattern: `step-01-setup.md`, `step-02-context.md`, `step-0N-name.md`, final `step-05-synthesize.md`

9. **AC9: A/P/C Decision Points (FR52)**
   - **Given** contextually appropriate moments in the workflow
   - **Then** steps 3-5 present the standard A/P/C menu: `[a]` Advanced Elicitation, `[p]` Party Mode, `[c]` Continue
   - **And** each A/P/C is tailored to the step's content (not copy-pasted)

10. **AC10: Noah's Voice Consistency**
    - **Given** all workflow content
    - **Then** Noah's voice is calm, observational, and uses signature phrases: "The signal indicates...", "Here's what we're seeing in context", "Behavioral patterns reveal..."
    - **And** zero voice bleed: no Isla phrases ("I noticed that", "embrace ambiguity", "feelings are data"), no Mila phrases ("Here's what the research is telling us", "Three patterns converge"), no Liam phrases ("What if?", "stress-test", "falsifiable", "bold version"), no Wade phrases ("Let's test that", "build-measure-learn"), no Max phrases ("Evidence suggests", "pivot/patch/persevere")

11. **AC11: Regression Check**
    - **Given** this is a content-only story (markdown files only)
    - **Then** `npm run lint` passes clean (regression check — no JS changes)

*Covers: FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR21, FR22, FR29, FR46, FR51, FR52*

## Tasks / Subtasks

- [x] **Task 1: Replace workflow.md placeholder with full entry point** (AC: 8, 10)
  - [x] 1.1 Read Liam's canonical workflow.md (`_bmad/bme/_vortex/workflows/hypothesis-engineering/workflow.md`) for exact structural reference (52 lines)
  - [x] 1.2 Read current signal-interpretation placeholder (`_bmad/bme/_vortex/workflows/signal-interpretation/workflow.md`) — 3 lines to replace
  - [x] 1.3 Build frontmatter: `workflow: signal-interpretation`, `type: step-file`, `description: [Noah-specific]`, `author: Noah (production-intelligence-specialist)`, `version: 1.6.0`
  - [x] 1.4 Write "What is Signal Interpretation?" section in Noah's voice — calm, observational, no recommendations language
  - [x] 1.5 Write Workflow Structure section (step-file architecture)
  - [x] 1.6 Write Steps Overview (5 steps with descriptions)
  - [x] 1.7 Write Output section: artifact HC5, Template: None, Schema: `_bmad/bme/_vortex/contracts/hc5-signal-report.md`, Consumer: Max (learning-card)
  - [x] 1.8 Write INITIALIZATION block: load config.yaml, load step-01-setup.md
  - [x] 1.9 Write complete file replacing the 3-line placeholder

- [x] **Task 2: Create step-01-setup.md — Setup & Input Validation** (AC: 1, 8, 10)
  - [x] 2.1 Read Liam's step-01-setup.md (`_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-01-setup.md`) for structural reference
  - [x] 2.2 Read HC4 contract schema (`_bmad/bme/_vortex/contracts/hc4-experiment-context.md`) for validation fields
  - [x] 2.3 Create `steps/` directory under signal-interpretation workflow
  - [x] 2.4 Build frontmatter: `step: 1`, `workflow: signal-interpretation`, `title: Setup & Input Validation`
  - [x] 2.5 Write opening paragraph in Noah's voice — receiving experiment context from Wade
  - [x] 2.6 Write "Why This Matters" section — grounded in Noah's principle: production data is the most honest user feedback
  - [x] 2.7 Write HC4 frontmatter validation table (7 fields: contract, type, source_agent, source_workflow, target_agents, input_artifacts, created)
  - [x] 2.8 Write HC4 body sections validation table (8 sections: Experiment Summary, Hypothesis Tested, Experiment Method, Pre-Defined Success Criteria, Additional Results, Confirmed/Rejected Hypotheses, Strategic Context, Production Readiness)
  - [x] 2.9 Write non-conforming input guidance — accept equivalent user-provided input when no formal HC4 artifact exists
  - [x] 2.10 Write "Your Turn" and "Next Step" sections (chain to step-02-context.md)

- [x] **Task 3: Create step-02-context.md — Experiment Context & Signal Connection** (AC: 2, 8, 10)
  - [x] 3.1 Read Liam's step-02-context.md (`_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-02-context.md`) for structural reference
  - [x] 3.2 Build frontmatter: `step: 2`, `workflow: signal-interpretation`, `title: Experiment Context & Signal Connection`
  - [x] 3.3 Write opening paragraph in Noah's voice — connecting production signals to experiment lineage
  - [x] 3.4 Write "Why This Matters" section — grounded in Noah's principle: raw metrics mean nothing without interpretation frames
  - [x] 3.5 Write Experiment Lineage extraction guidance (originating experiment, original hypothesis, experiment outcome, expected production behavior, actual vs expected)
  - [x] 3.6 Write Vortex History connection guidance (problem definition, hypothesis origin, previous signals, related experiments)
  - [x] 3.7 Write "Your Turn" and "Next Step" sections (chain to step-03-signal-analysis.md)

- [x] **Task 4: Create step-03-signal-analysis.md — Signal Description & Trend Analysis** (AC: 3, 9, 10)
  - [x] 4.1 Build frontmatter: `step: 3`, `workflow: signal-interpretation`, `title: Signal Description & Trend Analysis`
  - [x] 4.2 Write opening paragraph in Noah's voice — interpreting signals through contextual lenses
  - [x] 4.3 Write "Why This Matters" section — grounded in Noah's principle: signal + context + trend
  - [x] 4.4 Write Signal Description guidance with HC5 fields table (Signal Summary, Signal Type, Severity, Detection Method, Time Window, Affected Scope)
  - [x] 4.5 Write Trend Analysis guidance with HC5 fields table (Trend Direction, Trend Duration, Rate of Change, Baseline Comparison, Confidence)
  - [x] 4.6 Write explicit "no recommendations" guardrail — Noah observes and reports, strategic decisions belong downstream
  - [x] 4.7 Write A/P/C decision point tailored to signal analysis
  - [x] 4.8 Write "Your Turn" and "Next Step" sections (chain to step-04-anomaly-detection.md)

- [x] **Task 5: Create step-04-anomaly-detection.md — Anomaly Detection & Data Quality** (AC: 4, 9, 10)
  - [x] 5.1 Build frontmatter: `step: 4`, `workflow: signal-interpretation`, `title: Anomaly Detection & Data Quality`
  - [x] 5.2 Write opening paragraph in Noah's voice — surfacing what dashboards hide
  - [x] 5.3 Write "Why This Matters" section — grounded in Noah's principle: anomaly detection surfaces what dashboards hide
  - [x] 5.4 Write Anomaly Detection guidance with HC5 fields table (Anomaly Description, Deviation from Expected, Potential Explanations, Discovery Needed, Discovery Focus)
  - [x] 5.5 Write HC10 anomaly routing flag — if Discovery Needed = Yes, flag for Compass routing to Isla
  - [x] 5.6 Write Data Quality assessment guidance with HC5 fields table (Sample Size, Data Completeness, Known Biases, Confidence Level)
  - [x] 5.7 Write A/P/C decision point tailored to anomaly detection
  - [x] 5.8 Write "Your Turn" and "Next Step" sections (chain to step-05-synthesize.md)

- [x] **Task 6: Create step-05-synthesize.md — Synthesize & Route** (AC: 5, 6, 7, 9, 10)
  - [x] 6.1 Read Liam's step-05-synthesize.md (`_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-05-synthesize.md`) for canonical Compass/A/P/C pattern
  - [x] 6.2 Build frontmatter: `step: 5`, `workflow: signal-interpretation`, `title: Synthesize & Route`
  - [x] 6.3 Write opening paragraph in Noah's voice — packaging intelligence for Max
  - [x] 6.4 Write "Why This Matters" section — grounded in producing intelligence, not strategy
  - [x] 6.5 Write review/validation checklists for all HC5 sections (Signal Description, Context, Trend Analysis, Anomaly Detection, Data Quality)
  - [x] 6.6 Write HC5 artifact generation guidance with frontmatter template (`contract: HC5`, `source_agent: noah`, `source_workflow: signal-interpretation`, `target_agents: [max]`, `input_artifacts` with HC4 reference, `created`)
  - [x] 6.7 Write explicit HC5 constraint reminder — no strategic recommendations, no pivot/patch/persevere, no experiment design suggestions
  - [x] 6.8 Write `Save to:` with path template `{output_folder}/vortex-artifacts/hc5-signal-report-{date}.md`
  - [x] 6.9 Write Validation Questions (evidence check, completeness check, intelligence-not-strategy check)
  - [x] 6.10 Write A/P/C decision point tailored to synthesis
  - [x] 6.11 Write Vortex Compass with 2 routing rows from compass-routing-reference.md:
    - → Max 🧭 `learning-card` — Signal report ready for decision (HC5)
    - → Isla 🔍 `user-discovery` — ⚡ Anomalous behavior detected (HC10)
  - [x] 6.12 Write ⚠️ Insufficient Evidence block with route-specific evidence needs and workflow-specific signals for revisiting earlier steps
  - [x] 6.13 Write user override note and Max VN reference

- [x] **Task 7: Verify implementation** (AC: 1-11)
  - [x] 7.1 Verify step file chain: workflow.md → step-01 → step-02 → step-03 → step-04 → step-05 (Compass). All `Next Step` references resolve correctly.
  - [x] 7.2 Verify all frontmatter is valid: every step file has `step`, `workflow: signal-interpretation`, `title`
  - [x] 7.3 Verify HC4 validation in step-01 covers all 7 frontmatter fields and 8 body sections
  - [x] 7.4 Verify HC5 output in step-05 covers all 7 frontmatter fields and 5 body sections
  - [x] 7.5 Verify Compass routing matches compass-routing-reference.md exactly (2 rows: Max HC5, Isla HC10)
  - [x] 7.6 Verify ⚠️ Insufficient Evidence block present with FR18 format
  - [x] 7.7 Verify A/P/C decision points in steps 3, 4, 5 — each tailored, not copy-pasted
  - [x] 7.8 Voice bleed check — zero forbidden phrases:
    - No Isla: "I noticed that", "embrace ambiguity", "feelings are data"
    - No Mila: "Here's what the research is telling us", "Three patterns converge"
    - No Liam: "What if?", "stress-test", "falsifiable", "bold version"
    - No Wade: "Let's test that", "build-measure-learn"
    - No Max: "Evidence suggests", "pivot/patch/persevere"
  - [x] 7.9 Verify no strategic recommendations language anywhere in the workflow
  - [x] 7.10 Verify `sourceArtifact` / `input_artifacts` reference in HC5 artifact template (FR29)
  - [x] 7.11 Run `npm run lint` — must pass clean (AC11)

## Dev Notes

### This is a Content-Only Story

All deliverables are markdown files. No JavaScript changes. `npm run lint` serves as a regression check only.

### Canonical Workflow Template: Liam's Hypothesis-Engineering

The structural reference for this workflow is Liam's hypothesis-engineering workflow (Story 3-2). Follow the exact same patterns:

- **workflow.md**: ~52 lines. Frontmatter → Title → "What is X?" → Workflow Structure → Steps Overview → Output → INITIALIZATION
- **Step files**: Frontmatter (step/workflow/title) → Title → Opening paragraph in agent voice → "Why This Matters" → "Your Task" with numbered subsections → "Your Turn" → "Next Step" (or Compass for final step)
- **Final step (step-05-synthesize)**: Adds validation questions, A/P/C, Vortex Compass (D4 format), ⚠️ Insufficient Evidence, user override note, Max VN reference

### HC4 Input Schema (What Noah Receives)

**Source:** `_bmad/bme/_vortex/contracts/hc4-experiment-context.md`

**Frontmatter (7 fields):** `contract: HC4`, `type: artifact`, `source_agent`, `source_workflow`, `target_agents: [noah]`, `input_artifacts`, `created`

**Body (8 sections):**
1. Experiment Summary (required) — Name, Description, Type, Duration, Graduation Status
2. Hypothesis Tested (required) — Statement, Riskiest Assumption, Expected Outcome, Target Behavior Change
3. Experiment Method (required) — Method Type, Sample Size, Planned Duration, Recruitment, Controls
4. Pre-Defined Success Criteria (required) — Metric, Target Threshold, Actual Result, Met?
5. Additional Results (optional) — Quantitative Metrics, Qualitative Results
6. Confirmed/Rejected Hypotheses (required) — Status, Assumption Status, Core Learning, Conditions
7. Strategic Context (required) — Vortex Stream, Assumption Tested, Decision It Informs, Implications
8. Production Readiness (required for graduated) — Metrics to Monitor, Expected Behavior, Signal Thresholds, Monitoring Duration

### HC5 Output Schema (What Noah Produces)

**Source:** `_bmad/bme/_vortex/contracts/hc5-signal-report.md`

**Frontmatter (7 fields):** `contract: HC5`, `type: artifact`, `source_agent: noah`, `source_workflow: signal-interpretation`, `target_agents: [max]`, `input_artifacts` (HC4 reference), `created`

**Body (5 sections):**
1. Signal Description (required) — Summary, Type, Severity, Detection Method, Time Window, Affected Scope
2. Context (required) — Experiment Lineage (originating experiment, hypothesis, outcome, expected vs actual) + Vortex History (problem definition, hypothesis origin, previous signals, related experiments)
3. Trend Analysis (required) — Direction, Duration, Rate of Change, Baseline Comparison, Confidence
4. Anomaly Detection (optional, required when unexpected patterns) — Description, Deviation, Explanations, Discovery Needed, Discovery Focus
5. Data Quality (required) — Sample Size, Completeness, Known Biases, Confidence Level

**HC5 explicitly excludes:** strategic recommendations, pivot/patch/persevere decisions, experiment design suggestions, resource allocation recommendations

**Save path:** `{output_folder}/vortex-artifacts/hc5-signal-report-{date}.md`

### Compass Routing (signal-interpretation)

**Source:** `_bmad/bme/_vortex/compass-routing-reference.md`

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Signal report complete with contextualized intelligence | learning-card | Max 🧭 | Signal report ready for decision (HC5) |
| ⚡ Anomalous behavior detected not covered by original hypothesis | user-discovery | Isla 🔍 | Unexpected behavior warrants discovery research (HC10) |

**Note:** Only 2 routing rows for signal-interpretation (not 3). This is correct per compass-routing-reference.md.

### Insufficient Evidence Template (FR18)

| To route to... | You need... |
|----------------|-------------|
| Max 🧭 | Complete HC5 signal report with all required sections and sufficient data quality confidence |
| Isla 🔍 | Specific anomalous behavior identified with clear deviation from experiment expectations |

**Workflow-specific signals:**
- Signal description too vague → revisit **step-03** for sharper analysis
- Cannot connect signal to experiment context → revisit **step-02** for deeper context loading
- Data quality insufficient for any conclusion → gather more production data before proceeding

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
- **Step 3 (signal-analysis):** `[a]` Deep dive into signal patterns | `[p]` Collaborative signal interpretation | `[c]` Continue to anomaly detection
- **Step 4 (anomaly-detection):** `[a]` Deep dive into anomaly investigation | `[p]` Collaborative anomaly assessment | `[c]` Continue to synthesis
- **Step 5 (synthesize):** `[a]` Deep dive into HC5 refinement | `[p]` Collaborative artifact critique | `[c]` Generate HC5 artifact and proceed to routing

### Learnings from Stories 3-2 and 2-2

1. **Verify contract paths against filesystem** — use `_bmad/bme/_vortex/contracts/` not `handoff-contracts/` (Epic 2 learning)
2. **⚠️ Insufficient Evidence heading needs emoji** — include from the start (Code review M2 from Story 2-2)
3. **Explicit save-to path in final step** — include `Save to:` with full path template (Code review M3 from Story 2-2)
4. **`Template: None` in workflow.md** — include from the start per D8 (Code review L2 from Story 2-2)
5. **A/P/C at contextually appropriate moments** — steps 3-5, each tailored
6. **Step file chain verification** — workflow.md → step-01 → ... → step-05. Verify all chains resolve.
7. **Voice bleed check is mandatory** — zero tolerance (Epic 3 retro team agreement)

### Files to Create/Modify

| File | Action | Est. Lines |
|------|--------|-----------|
| `_bmad/bme/_vortex/workflows/signal-interpretation/workflow.md` | REPLACE placeholder | ~52 |
| `_bmad/bme/_vortex/workflows/signal-interpretation/steps/step-01-setup.md` | NEW | ~70 |
| `_bmad/bme/_vortex/workflows/signal-interpretation/steps/step-02-context.md` | NEW | ~80 |
| `_bmad/bme/_vortex/workflows/signal-interpretation/steps/step-03-signal-analysis.md` | NEW | ~85 |
| `_bmad/bme/_vortex/workflows/signal-interpretation/steps/step-04-anomaly-detection.md` | NEW | ~90 |
| `_bmad/bme/_vortex/workflows/signal-interpretation/steps/step-05-synthesize.md` | NEW | ~130 |

**Total:** 6 files (~507 lines)

### Files NOT Changing

- `_bmad/bme/_vortex/agents/production-intelligence-specialist.md` — Noah's agent definition (done in Story 4-1)
- `_bmad/bme/_vortex/contracts/hc5-signal-report.md` — HC5 schema (already exists)
- `_bmad/bme/_vortex/contracts/hc4-experiment-context.md` — HC4 schema (already exists)
- `_bmad/bme/_vortex/compass-routing-reference.md` — routing reference (already exists)
- `scripts/update/lib/agent-registry.js` — no code changes
- No JavaScript files change in this story

### References

- [Source: _bmad/bme/_vortex/workflows/hypothesis-engineering/workflow.md] — Liam canonical workflow.md (52 lines)
- [Source: _bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-01-setup.md] — Liam step-01 pattern
- [Source: _bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-05-synthesize.md] — Liam Compass/A/P/C pattern (130 lines)
- [Source: _bmad/bme/_vortex/contracts/hc5-signal-report.md] — HC5 output schema
- [Source: _bmad/bme/_vortex/contracts/hc4-experiment-context.md] — HC4 input schema
- [Source: _bmad/bme/_vortex/compass-routing-reference.md] — Noah signal-interpretation routing
- [Source: _bmad/bme/_vortex/agents/production-intelligence-specialist.md] — Noah agent definition (Story 4-1)
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 4, Story 4.2] — Story requirements
- [Source: _bmad-output/implementation-artifacts/epic-3-retro-2026-02-25.md] — Team agreements for Epic 4
- [Source: _bmad-output/implementation-artifacts/3-2-create-hypothesis-engineering-workflow.md] — Pattern reference story

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

### Completion Notes List

- Replaced 3-line workflow.md placeholder with full 53-line entry point following Liam's canonical template exactly
- Created steps/ directory and 5 step files (step-01 through step-05)
- step-01-setup (69 lines): HC4 input validation with 7 frontmatter fields + 8 body sections, non-conforming input guidance
- step-02-context (68 lines): Experiment lineage extraction (5 fields) + Vortex history mapping (4 fields) + production signal description
- step-03-signal-analysis (86 lines): Signal description (6 HC5 fields) + trend analysis (5 HC5 fields) + experiment expectations connection + A/P/C
- step-04-anomaly-detection (94 lines): Anomaly detection (5 HC5 fields) + HC10 routing assessment + data quality (4 HC5 fields) + A/P/C
- step-05-synthesize (164 lines): HC5 review checklists + artifact generation with frontmatter template + validation questions (3 categories) + A/P/C + Compass (2 rows) + Insufficient Evidence block
- Noah's voice consistent throughout: "The signal indicates...", "Here's what we're seeing in context", "Behavioral patterns reveal..."
- Zero voice bleed: no Isla/Mila/Liam/Wade/Max phrases detected
- No strategic recommendations anywhere — intelligence only, decisions belong to Max
- Compass routing matches compass-routing-reference.md: Max HC5 learning-card + Isla HC10 user-discovery
- All step file chains verified: workflow.md → step-01 → step-02 → step-03 → step-04 → step-05
- All frontmatter valid: step, workflow: signal-interpretation, title
- input_artifacts HC4 reference included in HC5 frontmatter template (FR29)
- Template: None included in workflow.md (D8 learning from Story 2-2)
- Save to path included in step-05 (learning from Story 2-2)
- Lint passes clean (no JS changes — regression check only)

### Change Log

- 2026-02-26: Story created
- 2026-02-26: Implementation complete. All 11 ACs satisfied. 6 files created (534 total lines)

### File List

- `_bmad/bme/_vortex/workflows/signal-interpretation/workflow.md` (REPLACED — 3-line placeholder → 53-line full entry point)
- `_bmad/bme/_vortex/workflows/signal-interpretation/steps/step-01-setup.md` (NEW — 69 lines)
- `_bmad/bme/_vortex/workflows/signal-interpretation/steps/step-02-context.md` (NEW — 68 lines)
- `_bmad/bme/_vortex/workflows/signal-interpretation/steps/step-03-signal-analysis.md` (NEW — 86 lines)
- `_bmad/bme/_vortex/workflows/signal-interpretation/steps/step-04-anomaly-detection.md` (NEW — 94 lines)
- `_bmad/bme/_vortex/workflows/signal-interpretation/steps/step-05-synthesize.md` (NEW — 164 lines)
