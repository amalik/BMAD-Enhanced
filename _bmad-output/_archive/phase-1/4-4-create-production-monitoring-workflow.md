# Story 4.4: Create Production-Monitoring Workflow

Status: done

## Story

As a head of product tracking multiple graduated experiments in production,
I want to monitor production signals across all active experiments simultaneously,
So that I can identify which experiments need attention and produce signals for Max's portfolio-level decisions.

## Acceptance Criteria

1. **AC1: Multi-Experiment Input Validation (FR17)**
   - **Given** a user invokes the production-monitoring workflow with multiple experiment contexts
   - **When** step-01-setup runs
   - **Then** it validates each input against the HC4 experiment context schema (7 frontmatter fields + 8 body sections)
   - **And** it accepts multiple HC4 artifacts (or equivalent experiment summaries) simultaneously
   - **And** if any input is non-conforming, it guides the user to provide schema-compliant artifacts (listing missing fields/sections per input)
   - **And** it accepts equivalent user-provided input when no formal HC4 artifacts exist
   - **And** it establishes the experiment portfolio for monitoring

2. **AC2: Portfolio Assembly & Baseline Mapping**
   - **Given** validated multi-experiment HC4 input (or equivalent)
   - **When** step-02-portfolio runs
   - **Then** it assembles a portfolio of all active experiments with their key baselines
   - **And** it extracts validated baseline metrics and expected production behavior from each experiment
   - **And** it maps each experiment's monitoring scope (metrics, segments, thresholds)
   - **And** it captures Vortex history connections for each experiment where available

3. **AC3: Signal Monitoring & Divergence Assessment (FR12, FR15)**
   - **Given** assembled experiment portfolio with baselines
   - **When** step-03-monitoring runs
   - **Then** it guides monitoring of production signals for each experiment against its baselines
   - **And** it assesses divergence between observed signals and experiment expectations for each experiment
   - **And** it identifies signal patterns across experiments (correlations, interactions, shared impacts)
   - **And** the analysis focuses on observable production signals, not self-reported data

4. **AC4: Signal Prioritization (FR14)**
   - **Given** divergence assessments for all monitored experiments
   - **When** step-04-prioritization runs
   - **Then** signals are prioritized by divergence from validated performance
   - **And** each signal is assigned a priority level based on severity and scope
   - **And** the prioritized list gives Max a clear picture of which experiments need attention first
   - **And** anomalies across any experiment are flagged for HC10 routing to Isla (FR16)

5. **AC5: Data Quality Assessment**
   - **Given** monitored signals across the portfolio
   - **When** step-04-prioritization completes data quality assessment
   - **Then** it evaluates data quality per experiment (sample size, data completeness, known biases, confidence)
   - **And** it flags experiments where data quality is insufficient for reliable signal assessment
   - **And** overall portfolio confidence is assessed

6. **AC6: HC5 Portfolio Signal Report (FR14)**
   - **Given** completed portfolio monitoring, prioritization, and data quality assessment
   - **When** step-05-synthesize runs
   - **Then** it produces a portfolio signal report artifact conforming to the HC5 schema
   - **And** the artifact has correct frontmatter: `contract: HC5`, `type: artifact`, `source_agent: noah`, `source_workflow: production-monitoring`, `target_agents: [max]`, `input_artifacts` with multiple HC4 references, `created` date
   - **And** the artifact includes per-experiment signal assessments organized within HC5 body sections
   - **And** the artifact includes a Portfolio Signal Summary addendum with prioritized signal list
   - **And** the artifact explicitly excludes strategic recommendations, pivot/patch/persevere decisions, and experiment design suggestions

7. **AC7: Compass Routing (FR19, FR21, FR22)**
   - **Given** the synthesize step completes
   - **When** the Vortex Compass is presented
   - **Then** it shows 3 evidence-based routing options matching compass-routing-reference.md:
     - → Max 🧭 `learning-card` — Portfolio signal report ready (HC5)
     - → Isla 🔍 `user-discovery` — Anomalies across experiments (HC10)
     - → Noah 📡 `signal-interpretation` — Deep dive on specific signal
   - **And** Compass references HC5 contract and declares what Max expects (FR21)
   - **And** user can override Compass recommendation (FR22)
   - **And** Max's Vortex Navigation is referenced as a fallback

8. **AC8: Insufficient Evidence Handling**
   - **Given** the Compass routing step
   - **When** evidence is insufficient to determine routing
   - **Then** the ⚠️ Insufficient Evidence block is presented with specific evidence needed for each of the 3 routes
   - **And** workflow-specific signals guide revisiting earlier steps

9. **AC9: Step File Architecture (FR46, FR51)**
   - **Given** the workflow implementation
   - **Then** each step file has valid frontmatter with `step`, `workflow: production-monitoring`, and `title` fields (FR46)
   - **And** the workflow uses micro-file step architecture where each step loads the next step file sequentially (FR51)
   - **And** step count is 5 (within 4-6 range)
   - **And** filenames follow the standardized pattern: `step-01-setup.md`, `step-02-portfolio.md`, `step-0N-name.md`, final `step-05-synthesize.md`

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

*Covers: FR12, FR14, FR15, FR16, FR17, FR19, FR21, FR22, FR46, FR47, FR51, FR52*

## Tasks / Subtasks

- [x] **Task 1: Replace workflow.md placeholder with full entry point** (AC: 9, 11)
  - [x] 1.1 Read Liam's canonical workflow.md and Noah's signal-interpretation + behavior-analysis workflow.md for structural reference
  - [x] 1.2 Read current production-monitoring placeholder (`_bmad/bme/_vortex/workflows/production-monitoring/workflow.md`) — 3 lines to replace
  - [x] 1.3 Build frontmatter: `workflow: production-monitoring`, `type: step-file`, `description: [production-monitoring-specific]`, `author: Noah (production-intelligence-specialist)`, `version: 1.6.0`
  - [x] 1.4 Write "What is Production Monitoring?" section in Noah's voice — monitoring multiple experiments simultaneously as portfolio intelligence
  - [x] 1.5 Write Workflow Structure section (step-file architecture)
  - [x] 1.6 Write Steps Overview (5 steps with descriptions)
  - [x] 1.7 Write Output section: artifact HC5, Template: None, Schema: `_bmad/bme/_vortex/contracts/hc5-signal-report.md`, Consumer: Max (learning-card)
  - [x] 1.8 Write INITIALIZATION block: load config.yaml then step-01-setup.md
  - [x] 1.9 Write complete file replacing the 3-line placeholder

- [x] **Task 2: Create step-01-setup.md — Setup & Multi-Experiment Input Validation** (AC: 1, 9, 11)
  - [x] 2.1 Read Noah's signal-interpretation and behavior-analysis step-01-setup.md for structural reference
  - [x] 2.2 Read HC4 contract schema for validation fields
  - [x] 2.3 Create `steps/` directory under production-monitoring workflow
  - [x] 2.4 Build frontmatter: `step: 1`, `workflow: production-monitoring`, `title: Setup & Multi-Experiment Input Validation`
  - [x] 2.5 Write opening paragraph in Noah's voice — receiving multiple experiment contexts for portfolio monitoring
  - [x] 2.6 Write "Why This Matters" section — portfolio monitoring requires simultaneous experiment awareness
  - [x] 2.7 Write multi-experiment HC4 validation guidance (validate each input against 7 frontmatter + 8 body sections)
  - [x] 2.8 Write portfolio assembly prompt — how many experiments, provide file paths or descriptions
  - [x] 2.9 Write non-conforming input guidance (per-input validation)
  - [x] 2.10 Write "Your Turn" and "Next Step" sections (chain to step-02-portfolio.md)

- [x] **Task 3: Create step-02-portfolio.md — Portfolio Assembly & Baseline Mapping** (AC: 2, 9, 11)
  - [x] 3.1 Build frontmatter: `step: 2`, `workflow: production-monitoring`, `title: Portfolio Assembly & Baseline Mapping`
  - [x] 3.2 Write opening paragraph in Noah's voice — assembling the portfolio view from validated experiment contexts
  - [x] 3.3 Write "Why This Matters" section — portfolio view reveals which experiments need attention
  - [x] 3.4 Write per-experiment baseline extraction guidance (validated metrics, expected behavior, thresholds)
  - [x] 3.5 Write portfolio summary table template (Experiment | Hypothesis | Key Metrics | Expected Behavior | Monitoring Scope)
  - [x] 3.6 Write Vortex history connections per experiment (HC2, HC3, prior HC5 references)
  - [x] 3.7 Write "Your Turn" and "Next Step" sections (chain to step-03-monitoring.md)

- [x] **Task 4: Create step-03-monitoring.md — Signal Monitoring & Divergence Assessment** (AC: 3, 10, 11)
  - [x] 4.1 Build frontmatter: `step: 3`, `workflow: production-monitoring`, `title: Signal Monitoring & Divergence Assessment`
  - [x] 4.2 Write opening paragraph in Noah's voice — monitoring production signals across the portfolio
  - [x] 4.3 Write "Why This Matters" section — divergence from baselines tells you which experiments need attention
  - [x] 4.4 Write per-experiment signal assessment guidance (observed signal, baseline comparison, divergence magnitude, signal direction)
  - [x] 4.5 Write per-experiment signal assessment table template
  - [x] 4.6 Write cross-experiment pattern analysis guidance (correlations, interactions, shared impacts)
  - [x] 4.7 Write A/P/C decision point tailored to signal monitoring
  - [x] 4.8 Write "Your Turn" and "Next Step" sections (chain to step-04-prioritization.md)

- [x] **Task 5: Create step-04-prioritization.md — Signal Prioritization & Anomaly Flagging** (AC: 4, 5, 10, 11)
  - [x] 5.1 Build frontmatter: `step: 4`, `workflow: production-monitoring`, `title: Signal Prioritization & Anomaly Flagging`
  - [x] 5.2 Write opening paragraph in Noah's voice — prioritizing which signals demand attention
  - [x] 5.3 Write "Why This Matters" section — prioritization converts monitoring data into portfolio intelligence
  - [x] 5.4 Write signal prioritization framework (divergence severity × scope × data quality)
  - [x] 5.5 Write prioritized signal summary table template (Priority | Experiment | Signal | Divergence | Severity)
  - [x] 5.6 Write HC10 anomaly flagging assessment — flag anomalies across any experiment for Isla routing
  - [x] 5.7 Write per-experiment data quality assessment (sample size, completeness, biases, confidence)
  - [x] 5.8 Write portfolio-level data quality summary
  - [x] 5.9 Write A/P/C decision point tailored to prioritization
  - [x] 5.10 Write "Your Turn" and "Next Step" sections (chain to step-05-synthesize.md)

- [x] **Task 6: Create step-05-synthesize.md — Synthesize & Route** (AC: 6, 7, 8, 10, 11)
  - [x] 6.1 Read Noah's signal-interpretation and behavior-analysis step-05-synthesize.md for canonical Compass/A/P/C pattern
  - [x] 6.2 Build frontmatter: `step: 5`, `workflow: production-monitoring`, `title: Synthesize & Route`
  - [x] 6.3 Write opening paragraph in Noah's voice — packaging portfolio intelligence for Max
  - [x] 6.4 Write "Why This Matters" section — portfolio-level intelligence enables cross-experiment decision-making
  - [x] 6.5 Write review/validation checklists for all HC5 sections adapted for portfolio monitoring
  - [x] 6.6 Write HC5 artifact generation guidance with frontmatter template (`contract: HC5`, `source_agent: noah`, `source_workflow: production-monitoring`, `target_agents: [max]`, `input_artifacts` with multiple HC4 references, `created`)
  - [x] 6.7 Write Portfolio Signal Summary addendum guidance — prioritized signal list beyond standard HC5 sections
  - [x] 6.8 Write explicit HC5 constraint reminder — no strategic recommendations, no pivot/patch/persevere, no experiment design suggestions
  - [x] 6.9 Write `Save to:` with path template `{output_folder}/vortex-artifacts/hc5-portfolio-report-{date}.md`
  - [x] 6.10 Write Validation Questions (evidence check, portfolio completeness check, prioritization check, intelligence-not-strategy check)
  - [x] 6.11 Write A/P/C decision point tailored to synthesis
  - [x] 6.12 Write Vortex Compass with 3 routing rows from compass-routing-reference.md:
    - → Max 🧭 `learning-card` — Portfolio signal report ready (HC5)
    - → Isla 🔍 `user-discovery` — Anomalies across experiments (HC10)
    - → Noah 📡 `signal-interpretation` — Deep dive on specific signal
  - [x] 6.13 Write ⚠️ Insufficient Evidence block with route-specific evidence needs (3 routes) and workflow-specific signals
  - [x] 6.14 Write user override note and Max VN reference

- [x] **Task 7: Verify implementation** (AC: 1-12)
  - [x] 7.1 Verify step file chain: workflow.md → step-01 → step-02 → step-03 → step-04 → step-05 (Compass). All `Next Step` references resolve correctly.
  - [x] 7.2 Verify all frontmatter is valid: every step file has `step`, `workflow: production-monitoring`, `title`
  - [x] 7.3 Verify HC4 validation in step-01 covers multi-experiment input with all 7 frontmatter fields and 8 body sections per experiment
  - [x] 7.4 Verify HC5 output in step-05 covers all 7 frontmatter fields (including multiple input_artifacts) and 5 body sections
  - [x] 7.5 Verify Compass routing matches compass-routing-reference.md exactly (3 rows: Max HC5 learning-card, Isla HC10, Noah signal-interpretation)
  - [x] 7.6 Verify ⚠️ Insufficient Evidence block present with 3 routes
  - [x] 7.7 Verify A/P/C decision points in steps 3, 4, 5 — each tailored, not copy-pasted
  - [x] 7.8 Voice bleed check — zero forbidden phrases:
    - No Isla: "I noticed that", "embrace ambiguity", "feelings are data"
    - No Mila: "Here's what the research is telling us", "Three patterns converge"
    - No Liam: "What if?", "stress-test", "falsifiable", "bold version"
    - No Wade: "Let's test that", "build-measure-learn"
    - No Max: "Evidence suggests", "pivot/patch/persevere"
  - [x] 7.9 Verify no strategic recommendations language anywhere in the workflow
  - [x] 7.10 Verify `input_artifacts` supports multiple HC4 references in HC5 artifact template
  - [x] 7.11 Verify signal prioritization framework present (divergence × severity × scope)
  - [x] 7.12 Run `npm run lint` — must pass clean (AC12)

## Dev Notes

### This is a Content-Only Story

All deliverables are markdown files. No JavaScript changes. `npm run lint` serves as a regression check only.

### Production-Monitoring vs Signal-Interpretation vs Behavior-Analysis: Key Distinctions

This is Noah's **third and final** workflow. It is NOT a copy of signal-interpretation or behavior-analysis — it operates at portfolio level across multiple experiments:

| Aspect | signal-interpretation (4-2) | behavior-analysis (4-3) | production-monitoring (4-4) |
|--------|---------------------------|------------------------|---------------------------|
| **Focus** | One production signal → contextualize through experiment lineage | Observed behavior pattern → classify against experiment baselines | Multiple experiments → monitor all production signals simultaneously |
| **Input** | Single HC4 + production signal | Single HC4 + behavior observation | Multiple HC4 artifacts (portfolio) |
| **Core analysis** | Signal description + trend analysis | Behavior pattern classification (3 categories) | Portfolio-level signal monitoring + divergence prioritization |
| **Unique step** | step-03 signal-analysis (signal + trend) | step-03 classification (variance/regression/novel) | step-03 monitoring (multi-signal divergence) + step-04 prioritization |
| **Compass routes** | 2 rows (Max `learning-card`, Isla HC10) | 3 rows (Max `pivot-patch-persevere`, Isla HC10, Noah `signal-interpretation`) | 3 rows (Max `learning-card`, Isla HC10, Noah `signal-interpretation`) |
| **Max target workflow** | `learning-card` | `pivot-patch-persevere` | `learning-card` |
| **Self-routing** | No | Yes — back to Noah `signal-interpretation` | Yes — to Noah `signal-interpretation` for deep dive |
| **HC5 source_workflow** | `signal-interpretation` | `behavior-analysis` | `production-monitoring` |
| **HC5 variant** | Single signal report | Behavioral signal report | Portfolio signal report |
| **HC5 addendum** | None | Behavior Classification Summary | Portfolio Signal Summary |

### Canonical Workflow Template: Liam + Noah's Signal-Interpretation + Behavior-Analysis

Follow the exact same structural patterns established in Stories 3-2, 4-2, and 4-3:

- **workflow.md**: ~53 lines. Frontmatter → Title → "What is X?" → Workflow Structure → Steps Overview → Output → INITIALIZATION
- **Step files**: Frontmatter (step/workflow/title) → Title → Opening paragraph in agent voice → "Why This Matters" → "Your Task" with numbered subsections → "Your Turn" → "Next Step" (or Compass for final step)
- **Final step (step-05-synthesize)**: Adds validation questions, A/P/C, Vortex Compass (D4 format), ⚠️ Insufficient Evidence, user override note, Max VN reference

### HC4 Multi-Input Schema (What Noah Receives)

**Source:** `_bmad/bme/_vortex/contracts/hc4-experiment-context.md`

Production-monitoring accepts **multiple** HC4 artifacts simultaneously — this is the key input difference from signal-interpretation and behavior-analysis which accept a single HC4.

**Per-input validation (same as signal-interpretation):**

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

### HC5 Portfolio Output Schema (What Noah Produces)

**Source:** `_bmad/bme/_vortex/contracts/hc5-signal-report.md`

**Frontmatter (7 fields):** `contract: HC5`, `type: artifact`, `source_agent: noah`, `source_workflow: production-monitoring`, `target_agents: [max]`, `input_artifacts` (multiple HC4 references), `created`

**Key difference:** `input_artifacts` contains **multiple** HC4 references — one per monitored experiment:

```yaml
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/hc4-experiment-alpha.md"
    contract: HC4
  - path: "_bmad-output/vortex-artifacts/hc4-experiment-beta.md"
    contract: HC4
```

**Body (5 sections) — same schema, portfolio-level content:**
1. Signal Description — Portfolio-level summary covering all monitored experiments. Signal Type will often be `Metric Deviation` or `Trend Shift` at portfolio level.
2. Context — Experiment Lineage per monitored experiment + Vortex History connections
3. Trend Analysis — Per-experiment trend direction, rate of change, baseline comparison, confidence
4. Anomaly Detection (when unexpected patterns detected across any experiment) — anomalies flagged per experiment
5. Data Quality — Per-experiment and portfolio-level data quality assessment

**Portfolio Signal Summary Addendum:**
In addition to the standard HC5 sections, include a Portfolio Signal Summary showing each monitored experiment with its signal status, divergence assessment, priority level, and recommended action context. This gives Max the portfolio-level view that distinguishes this report from a single-signal or behavioral report.

**HC5 explicitly excludes:** strategic recommendations, pivot/patch/persevere decisions, experiment design suggestions, resource allocation recommendations

**Save path:** `{output_folder}/vortex-artifacts/hc5-portfolio-report-{date}.md`

### Compass Routing (production-monitoring) — 3 Rows

**Source:** `_bmad/bme/_vortex/compass-routing-reference.md`

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Portfolio signal report ready | learning-card | Max 🧭 | Portfolio signal report ready (HC5) |
| Anomalies across experiments | user-discovery | Isla 🔍 | Anomalies across experiments (HC10) |
| Deep dive on specific signal | signal-interpretation | Noah 📡 | Deep dive on specific signal |

**Note:** 3 routing rows (not 2). This is correct per compass-routing-reference.md. Includes self-routing to Noah's signal-interpretation for cases where portfolio monitoring reveals a specific signal worth deeper investigation.

### Insufficient Evidence Template — 3 Routes

| To route to... | You need... |
|----------------|-------------|
| Max 🧭 | Complete HC5 portfolio signal report with per-experiment assessments and sufficient data quality confidence |
| Isla 🔍 | Specific anomaly identified across one or more experiments with clear deviation from expectations |
| Noah 📡 | Specific signal identified during monitoring that warrants focused signal-interpretation analysis |

**Workflow-specific signals:**
- Portfolio assembly incomplete → revisit **step-02** for complete baseline mapping
- Divergence assessment unclear → revisit **step-03** for sharper signal monitoring
- Prioritization criteria insufficient → revisit **step-04** for clearer severity/scope assessment
- Insufficient experiment contexts provided → gather more HC4 artifacts before proceeding

### Signal Prioritization Framework

The core differentiator of this workflow. Signals are prioritized by a combination of:

1. **Divergence Severity** — How far the signal has moved from the validated experiment baseline (Critical / Warning / Informational)
2. **Affected Scope** — How many users, segments, or features are impacted
3. **Data Confidence** — How reliable the underlying data is (High / Medium / Low)

Priority levels:
- **P1 (Immediate)** — Critical divergence + wide scope + high confidence
- **P2 (Attention)** — Warning-level divergence OR wide scope with medium confidence
- **P3 (Monitor)** — Informational divergence OR narrow scope OR low confidence

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
- **Step 3 (monitoring):** `[a]` Deep dive into signal monitoring with guided questioning | `[p]` Collaborative signal assessment | `[c]` Continue to prioritization
- **Step 4 (prioritization):** `[a]` Deep dive into signal prioritization with guided questioning | `[p]` Collaborative prioritization review | `[c]` Continue to synthesis
- **Step 5 (synthesize):** `[a]` Deep dive into HC5 refinement with guided questioning | `[p]` Collaborative artifact critique | `[c]` Generate HC5 artifact and proceed to routing

### Learnings from Stories 4-2 and 4-3

1. **L1 (LOW):** Compass "recommendations" word is standard boilerplate — not strategic recommendations
2. **L2 (LOW):** Noah signature phrases can be contextually adapted
3. **L3 (LOW):** Gather-then-formalize pattern is valid — earlier steps collect raw data, later steps formalize
4. **Template: None** in workflow.md — include from the start (D8 learning)
5. **Save-to path** in final step — include with full path template
6. **Voice bleed zero tolerance** — grep verification required (team agreement)
7. **Step file chain verification** — all Next Step references must resolve
8. **⚠️ emoji** on Insufficient Evidence heading — include from the start
9. **HC4 body section validation** can omit optional sub-fields — the full contract reference link covers detail
10. **No-recommendations guardrail** — Noah classifies and reports, strategic decisions belong to Max

### Files to Create/Modify

| File | Action | Est. Lines |
|------|--------|-----------|
| `_bmad/bme/_vortex/workflows/production-monitoring/workflow.md` | REPLACE placeholder | ~53 |
| `_bmad/bme/_vortex/workflows/production-monitoring/steps/step-01-setup.md` | NEW | ~90 |
| `_bmad/bme/_vortex/workflows/production-monitoring/steps/step-02-portfolio.md` | NEW | ~85 |
| `_bmad/bme/_vortex/workflows/production-monitoring/steps/step-03-monitoring.md` | NEW | ~100 |
| `_bmad/bme/_vortex/workflows/production-monitoring/steps/step-04-prioritization.md` | NEW | ~110 |
| `_bmad/bme/_vortex/workflows/production-monitoring/steps/step-05-synthesize.md` | NEW | ~180 |

**Total:** 6 files (~618 lines)

### Files NOT Changing

- `_bmad/bme/_vortex/agents/production-intelligence-specialist.md` — Noah's agent definition (done in Story 4-1)
- `_bmad/bme/_vortex/contracts/hc5-signal-report.md` — HC5 schema (already exists)
- `_bmad/bme/_vortex/contracts/hc4-experiment-context.md` — HC4 schema (already exists)
- `_bmad/bme/_vortex/compass-routing-reference.md` — routing reference (already exists)
- `_bmad/bme/_vortex/workflows/signal-interpretation/` — signal-interpretation workflow (done in Story 4-2)
- `_bmad/bme/_vortex/workflows/behavior-analysis/` — behavior-analysis workflow (done in Story 4-3)
- No JavaScript files change in this story

### Project Structure Notes

- All files placed under `_bmad/bme/_vortex/workflows/production-monitoring/`
- `steps/` subdirectory for step files (matching signal-interpretation and behavior-analysis pattern)
- No conflicts with existing files — only replaces 3-line placeholder workflow.md

### References

- [Source: _bmad/bme/_vortex/workflows/hypothesis-engineering/workflow.md] — Liam canonical workflow.md
- [Source: _bmad/bme/_vortex/workflows/signal-interpretation/workflow.md] — Noah signal-interpretation workflow.md (same agent, first workflow)
- [Source: _bmad/bme/_vortex/workflows/behavior-analysis/workflow.md] — Noah behavior-analysis workflow.md (same agent, second workflow)
- [Source: _bmad/bme/_vortex/workflows/signal-interpretation/steps/step-05-synthesize.md] — Noah Compass/A/P/C pattern
- [Source: _bmad/bme/_vortex/workflows/behavior-analysis/steps/step-05-synthesize.md] — Noah behavior-analysis Compass/A/P/C pattern
- [Source: _bmad/bme/_vortex/contracts/hc5-signal-report.md] — HC5 output schema
- [Source: _bmad/bme/_vortex/contracts/hc4-experiment-context.md] — HC4 input schema
- [Source: _bmad/bme/_vortex/compass-routing-reference.md] — Noah production-monitoring routing (3 rows)
- [Source: _bmad/bme/_vortex/agents/production-intelligence-specialist.md] — Noah agent definition (Story 4-1)
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 4, Story 4.4] — Story requirements
- [Source: _bmad-output/implementation-artifacts/4-2-create-signal-interpretation-workflow.md] — Story 4-2 learnings
- [Source: _bmad-output/implementation-artifacts/4-3-create-behavior-analysis-workflow.md] — Story 4-3 learnings

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

### Completion Notes List

- Replaced 3-line workflow.md placeholder with full 53-line entry point following canonical template exactly
- Created steps/ directory and 5 step files (step-01 through step-05)
- step-01-setup (84 lines): Multi-experiment HC4 input validation with per-experiment 7 frontmatter + 8 body sections, portfolio validation summary table, non-conforming guidance
- step-02-portfolio (66 lines): Per-experiment baseline extraction (5 fields) + portfolio summary table (6 columns) + Vortex history per experiment
- step-03-monitoring (74 lines): Per-experiment signal assessment (7 fields) + signal summary table (7 columns) + cross-experiment pattern analysis (4 patterns) + A/P/C
- step-04-prioritization (97 lines): P1/P2/P3 prioritization framework (severity × scope × confidence) + prioritized signal summary table + HC10 anomaly flagging per experiment + per-experiment data quality + portfolio-level data quality summary + A/P/C
- step-05-synthesize (183 lines): HC5 review checklists adapted for portfolio monitoring (5 sections) + artifact generation with multiple input_artifacts + Portfolio Signal Summary addendum + validation questions (4 categories) + A/P/C + Compass (3 rows) + Insufficient Evidence block (3 routes + 4 workflow-specific signals)
- Noah's voice consistent throughout: "The signal indicates...", "Here's what we're seeing in context", "Signal + context + trend", "Production data is the most honest user feedback", "Anomaly detection surfaces what dashboards hide"
- Zero voice bleed: no Isla/Mila/Liam/Wade/Max phrases detected (5 grep checks)
- No strategic recommendations anywhere — prioritized intelligence only, decisions belong to Max
- Compass routing matches compass-routing-reference.md: Max HC5 learning-card + Isla HC10 user-discovery + Noah signal-interpretation (3 rows)
- All step file chains verified: workflow.md → step-01 → step-02 → step-03 → step-04 → step-05
- All frontmatter valid: step, workflow: production-monitoring, title
- Multiple input_artifacts HC4 references included in HC5 frontmatter template
- Template: None included in workflow.md (D8 learning)
- Save to path included in step-05
- Lint passes clean (no JS changes — regression check only)

### Change Log

- 2026-02-26: Implementation complete. All 12 ACs satisfied. 6 files created (557 total lines)

### File List

- `_bmad/bme/_vortex/workflows/production-monitoring/workflow.md` (REPLACED — 3-line placeholder → 53-line full entry point)
- `_bmad/bme/_vortex/workflows/production-monitoring/steps/step-01-setup.md` (NEW — 84 lines)
- `_bmad/bme/_vortex/workflows/production-monitoring/steps/step-02-portfolio.md` (NEW — 66 lines)
- `_bmad/bme/_vortex/workflows/production-monitoring/steps/step-03-monitoring.md` (NEW — 74 lines)
- `_bmad/bme/_vortex/workflows/production-monitoring/steps/step-04-prioritization.md` (NEW — 97 lines)
- `_bmad/bme/_vortex/workflows/production-monitoring/steps/step-05-synthesize.md` (NEW — 183 lines)
