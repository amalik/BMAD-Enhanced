# Story 4.5: Create Noah User Guide & Example Artifacts

Status: done

## Story

As a product discovery practitioner new to the Vortex,
I want a user guide explaining when and how to use Noah, plus example artifacts showing signal report format,
So that I understand Noah's role and what his output looks like.

## Acceptance Criteria

1. **AC1: User guide follows established format (NFR19)**
   - **Given** the file `_bmad/bme/_vortex/guides/NOAH-USER-GUIDE.md`
   - **When** compared against `MILA-USER-GUIDE.md` and `LIAM-USER-GUIDE.md` structure
   - **Then** it contains all 9 structural sections: Quick Start, How to Invoke, Menu Options, Workflows, Philosophy, Chatting with Noah, Troubleshooting, Tips from Noah, Credits
   - **And** section ordering matches the established pattern

2. **AC2: Quick Start positions Noah vs. raw dashboards/analytics**
   - **Given** the Quick Start section
   - **When** read by a new practitioner
   - **Then** it includes a "Who is Noah?" paragraph with persona summary
   - **And** it includes "When to use Noah" bullet points (6-8)
   - **And** it includes a comparison table: Noah's signal interpretation vs. raw dashboards/analytics
   - **And** it includes a decision aid for choosing Noah vs. looking at dashboards directly
   - **And** it includes "What you'll get" output summary (HC5 artifacts)

3. **AC3: All 3 workflows documented with accurate details**
   - **Given** the Workflows section
   - **When** each workflow subsection is reviewed
   - **Then** signal-interpretation is documented with: description, 5 steps (matching actual step files: step-01-setup, step-02-context, step-03-signal-analysis, step-04-anomaly-detection, step-05-synthesize), output path (`{output_folder}/vortex-artifacts/hc5-signal-report-{date}.md`), estimated time
   - **And** behavior-analysis is documented with: description, 5 steps (matching actual step files: step-01-setup, step-02-context, step-03-classification, step-04-evidence, step-05-synthesize), output path (`{output_folder}/vortex-artifacts/hc5-behavioral-report-{date}.md`), estimated time
   - **And** production-monitoring is documented with: description, 5 steps (matching actual step files: step-01-setup, step-02-portfolio, step-03-monitoring, step-04-prioritization, step-05-synthesize), output path (`{output_folder}/vortex-artifacts/hc5-portfolio-report-{date}.md`), estimated time

4. **AC4: Anomaly detection → Isla routing explained**
   - **Given** the Workflows section or a dedicated subsection
   - **When** anomaly detection is described
   - **Then** it explains that all 3 Noah workflows can detect anomalous behavior during analysis
   - **And** it explains the HC10 Compass routing: Noah → Isla for discovery research when unexpected behavior is found
   - **And** it explains when and why this routing happens (behavior not covered by original experiment hypothesis)
   - **And** it distinguishes: signal-interpretation and production-monitoring route to Isla via Compass; behavior-analysis classifies novel behavior and routes to Isla

5. **AC5: Example HC5 artifact demonstrates full schema compliance (FR44)**
   - **Given** the file `_bmad/bme/_vortex/examples/hc5-example-signal-report.md`
   - **When** validated against `_bmad/bme/_vortex/contracts/hc5-signal-report.md`
   - **Then** frontmatter has all 7 required fields: contract (HC5), type (artifact), source_agent (noah), source_workflow (signal-interpretation), target_agents ([max]), input_artifacts (referencing HC4), created (date)
   - **And** body has all 5 sections: Signal Description (6 fields), Context (Experiment Lineage 5 fields + Vortex History 4 fields), Trend Analysis (5 fields), Anomaly Detection (5 fields), Data Quality (4 fields)
   - **And** content demonstrates signal + context + trend linked to experiment history
   - **And** the artifact explicitly excludes strategic recommendations

6. **AC6: Example artifact uses realistic domain with concrete data**
   - **Given** the HC5 example artifact
   - **When** reviewed for realism and domain continuity
   - **Then** it uses the "Busy Parents Meal Planning" domain (matching HC2 and HC3 examples for Vortex journey continuity)
   - **And** Experiment Lineage traces back to a hypothesis from the HC3 example
   - **And** Trend Analysis includes specific quantified metrics (not vague descriptions)
   - **And** the example is self-consistent — signals trace back to the experiment context

7. **AC7: Noah's voice is consistent across all files**
   - **Given** all deliverable files
   - **When** reviewed for persona consistency
   - **Then** Noah's voice (calm, observational, signal + context + trend) is present in the user guide
   - **And** zero Isla phrases ("I noticed that...", "embrace ambiguity", "feelings are data")
   - **And** zero Mila phrases ("Here's what the research is telling us...", "Three patterns converge")
   - **And** zero Liam phrases ("What if?", "stress-test", "falsifiable", "bold version")
   - **And** zero Wade phrases ("Let's test that", "build-measure-learn")
   - **And** zero Max phrases ("Evidence suggests", "pivot/patch/persevere")

8. **AC8: Lint passes**
   - **Given** all new files
   - **When** `npm run lint` runs
   - **Then** it passes clean
   - **Note:** Content-only story. Lint is a regression check only.

*Covers: FR43 (Noah), FR44 (Noah)*

## Tasks / Subtasks

- [x] **Task 1: Create NOAH-USER-GUIDE.md** (AC: 1, 2, 3, 4, 7)
  - [x] 1.1 Create `_bmad/bme/_vortex/guides/NOAH-USER-GUIDE.md`
  - [x] 1.2 Write Quick Start section: Who is Noah (Production Intelligence Specialist — Signal Interpretation + Behavioral Pattern Detection + Production Monitoring), When to use Noah (6-8 bullets covering signal interpretation, behavior classification, portfolio monitoring, anomaly detection, production-experiment bridging, cross-experiment patterns), What you'll get (HC5 signal reports)
  - [x] 1.3 Write "When to use Noah" with explicit Noah vs. raw dashboards/analytics distinction (AC2): Noah = interpret production signals through experiment lineage and Vortex history (Sensitize stream, post-experiment); Raw dashboards = see metrics without experiment context. Include decision aid: "If you have production data and need to understand what it means in context of your experiments → Noah. If you just need to see the numbers → dashboards."
  - [x] 1.4 Write How to Invoke section: Method 1 slash command (`/bmad-agent-bme-production-intelligence-specialist`), Method 2 direct file read (`_bmad/bme/_vortex/agents/production-intelligence-specialist.md`)
  - [x] 1.5 Write Menu Options section: list all menu items from `production-intelligence-specialist.md` agent definition ([MH], [CH], [SI], [BA], [MO], [PM], [DA])
  - [x] 1.6 Write Workflows section with all 3 workflows (AC3):
    - [SI] Signal Interpretation: 5 steps (Setup & Input Validation, Context Loading, Signal Analysis, Anomaly Detection, Synthesize & Route), output `{output_folder}/vortex-artifacts/hc5-signal-report-{date}.md`, 45-90 minutes
    - [BA] Behavior Analysis: 5 steps (Setup & Input Validation, Context & Baseline Extraction, Behavior Classification, Evidence Gathering, Synthesize & Route), output `{output_folder}/vortex-artifacts/hc5-behavioral-report-{date}.md`, 60-120 minutes
    - [MO] Production Monitoring: 5 steps (Setup & Multi-Experiment Input Validation, Portfolio Assembly & Baseline Mapping, Signal Monitoring & Divergence Assessment, Signal Prioritization & Anomaly Flagging, Synthesize & Route), output `{output_folder}/vortex-artifacts/hc5-portfolio-report-{date}.md`, 90-180 minutes
  - [x] 1.7 Write Anomaly Detection → Isla Routing subsection (AC4): explain HC10 Compass routing across all 3 workflows — when Noah detects unexpected behavior not covered by the original experiment hypothesis, the Compass suggests routing to Isla for discovery research
  - [x] 1.8 Write Noah's Philosophy section using principles from agent definition: "Signal + context + trend", "Behavioral patterns reveal intent that surveys miss", "Production data is the most honest user feedback — it can't lie", "Anomaly detection surfaces what dashboards hide", "Observe and report, don't prescribe — strategic decisions belong downstream"
  - [x] 1.9 Write Chatting with Noah section: topics and 6-8 example questions (e.g., "What does this production signal mean in context of my experiment?", "How do I classify this behavior pattern?", "When should I use signal-interpretation vs. behavior-analysis vs. production-monitoring?")
  - [x] 1.10 Write Troubleshooting section: common config/workflow errors (same patterns as Mila/Liam guides)
  - [x] 1.11 Write Tips from Noah section: 3-4 tips in Noah's calm, observational voice
  - [x] 1.12 Write Credits section: Agent: Noah (production-intelligence-specialist), Module: BMAD Enhanced (bme), Submodule: Vortex Framework (_vortex), Stream: Sensitize (Stream 6), Version: 1.6.0

- [x] **Task 2: Create HC5 example artifact** (AC: 5, 6, 7)
  - [x] 2.1 Create `_bmad/bme/_vortex/examples/hc5-example-signal-report.md`
  - [x] 2.2 Write HC5 frontmatter with all 7 required fields: `contract: HC5`, `type: artifact`, `source_agent: noah`, `source_workflow: signal-interpretation`, `target_agents: [max]`, `input_artifacts` (referencing HC4 for the "Busy Parents Meal Planning" experiment), `created: 2026-02-26`
  - [x] 2.3 Write Section 1: Signal Description — Summary, Type, Severity, Detection Method, Time Window, Affected Scope. Use the "5:30 PM Decision Eliminator" experiment (Hypothesis 1 from HC3 example) graduated to production.
  - [x] 2.4 Write Section 2: Context — Experiment Lineage (Originating Experiment, Original Hypothesis, Experiment Outcome, Expected Production Behavior, Actual vs Expected) + Vortex History (Problem Definition HC2 reference, Hypothesis Origin HC3 reference, Previous Signals if any, Related Experiments)
  - [x] 2.5 Write Section 3: Trend Analysis — Direction, Duration, Rate of Change, Baseline Comparison, Confidence. Include specific quantified metrics (e.g., "decision time dropped from 18 min to 4.2 min in first 2 weeks, now stable at 3.8 min")
  - [x] 2.6 Write Section 4: Anomaly Detection — describe an unexpected behavior pattern (e.g., users requesting the suggestion earlier than 5:30 PM, suggesting the intervention point was wrong). Include Discovery Needed = Yes with routing rationale.
  - [x] 2.7 Write Section 5: Data Quality — Sample Size, Completeness, Known Biases, Confidence Level
  - [x] 2.8 Include example notice at top: "This is an example artifact demonstrating the HC5 schema format"
  - [x] 2.9 Verify artifact traces back to HC2/HC3 examples for Vortex journey continuity

- [x] **Task 3: Verify implementation** (AC: 1-8)
  - [x] 3.1 Verify NOAH-USER-GUIDE.md has all 9 sections in correct order
  - [x] 3.2 Verify all 3 workflows documented with correct step file names matching actual step files
  - [x] 3.3 Verify HC5 example artifact has all 7 frontmatter fields and 5 body sections
  - [x] 3.4 Verify HC5 example traces back to HC2/HC3 "Busy Parents Meal Planning" domain
  - [x] 3.5 Voice bleed check — zero forbidden phrases:
    - No Isla: "I noticed that", "embrace ambiguity", "feelings are data"
    - No Mila: "Here's what the research is telling us", "Three patterns converge"
    - No Liam: "What if?", "stress-test", "falsifiable", "bold version"
    - No Wade: "Let's test that", "build-measure-learn"
    - No Max: "Evidence suggests", "pivot/patch/persevere"
  - [x] 3.6 Verify no strategic recommendations in HC5 example (intelligence only)
  - [x] 3.7 Run `npm run lint` — must pass clean (AC8)

## Dev Notes

### This is a Content-Only Story

All deliverables are markdown files. No JavaScript changes. `npm run lint` serves as a regression check only.

### Canonical Reference: MILA-USER-GUIDE.md and LIAM-USER-GUIDE.md

Both existing guides follow the same 9-section structure established by ISLA-USER-GUIDE.md. Noah's guide must follow the same sections in the same order:

**9 Structural Sections (in order):**
1. Quick Start (Who is Noah? / When to use Noah / What you'll get)
2. How to Invoke Noah (Method 1: Slash Command / Method 2: Direct Agent File Reading)
3. Noah's Menu Options (numbered list matching agent definition menu)
4. Workflows (one subsection per workflow with steps, output path, estimated time)
5. Philosophy section (principles from agent definition)
6. Chatting with Noah section with example questions
7. Troubleshooting (config error, workflow error)
8. Tips from Noah (3-4 tips in Noah's voice)
9. Credits (agent name, module, submodule, stream, version)

### Noah-Specific Content

- **Who is Noah:** Production Intelligence Specialist — Signal Interpretation + Behavioral Pattern Detection + Production Monitoring. Guides the "Sensitize" stream of the Vortex.
- **When to use Noah:** After experiments graduate to production. You have production data and need to understand what it means in context of your experiments. Noah interprets production signals through experiment lineage and Vortex history.
- **Noah vs. Raw Dashboards/Analytics distinction:**

| | Noah 📡 (Sensitize) | Raw Dashboards/Analytics |
|---|---|---|
| **When** | After experiments — you have production data to interpret through experiment context | Anytime — you need to see raw metrics |
| **Input** | HC4 experiment context + production data | Metrics / analytics tools |
| **Output** | HC5 signal reports (contextualized intelligence) | Numbers, charts, alerts |
| **Focus** | What does this signal mean given the experiment? (signal + context + trend) | What are the numbers? (raw metrics) |

- **Decision aid:** If you have production data and need to understand what it means in context of your experiments → **Noah**. If you just need to see the numbers → dashboards.

### Noah's 3 Workflows — Accurate Step Files

**Signal Interpretation (5 steps):**
1. step-01-setup.md — Setup & Input Validation
2. step-02-context.md — Context Loading
3. step-03-signal-analysis.md — Signal Analysis
4. step-04-anomaly-detection.md — Anomaly Detection
5. step-05-synthesize.md — Synthesize & Route

**Behavior Analysis (5 steps):**
1. step-01-setup.md — Setup & Input Validation
2. step-02-context.md — Context & Baseline Extraction
3. step-03-classification.md — Behavior Classification
4. step-04-evidence.md — Evidence Gathering
5. step-05-synthesize.md — Synthesize & Route

**Production Monitoring (5 steps):**
1. step-01-setup.md — Setup & Multi-Experiment Input Validation
2. step-02-portfolio.md — Portfolio Assembly & Baseline Mapping
3. step-03-monitoring.md — Signal Monitoring & Divergence Assessment
4. step-04-prioritization.md — Signal Prioritization & Anomaly Flagging
5. step-05-synthesize.md — Synthesize & Route

### Noah's 3 Workflows — Key Distinctions

| Aspect | Signal Interpretation | Behavior Analysis | Production Monitoring |
|--------|---------------------|-------------------|---------------------|
| **Focus** | One production signal → contextualize through experiment lineage | Observed behavior pattern → classify against experiment baselines | Multiple experiments → monitor all production signals simultaneously |
| **Input** | Single HC4 + production signal | Single HC4 + behavior observation | Multiple HC4 artifacts (portfolio) |
| **Core analysis** | Signal description + trend analysis | Behavior pattern classification (3 categories: expected variance / regression / novel) | Portfolio-level divergence + P1/P2/P3 prioritization |
| **Compass routes** | 2 rows (Max `learning-card`, Isla HC10) | 3 rows (Max `pivot-patch-persevere`, Isla HC10, Noah `signal-interpretation`) | 3 rows (Max `learning-card`, Isla HC10, Noah `signal-interpretation`) |
| **HC5 variant** | Single signal report | Behavioral signal report | Portfolio signal report |

### Anomaly Detection → Isla Routing

All 3 workflows can detect anomalous behavior and route to Isla via the Vortex Compass:
- **Signal interpretation:** Compass row → Isla 🔍 `user-discovery` — Anomalous behavior detected not covered by original hypothesis (HC10)
- **Behavior analysis:** When behavior is classified as "novel behavior" → Compass row → Isla 🔍 `user-discovery` — Novel behavior warrants discovery (HC10)
- **Production monitoring:** Anomaly flagging across experiments → Compass row → Isla 🔍 `user-discovery` — Anomalies across experiments (HC10)

HC10 is a Compass routing mechanism — it represents the decision to send anomalous behavior to Isla for discovery research. There is no standalone HC10 artifact file; it is invoked through Compass routing.

### HC5 Example Artifact — Domain Continuity

The example HC5 should use the **"Busy Parents Meal Planning" domain** to demonstrate Vortex journey continuity:
- HC2 example (Mila): Busy Parents Meal Planning problem definition
- HC3 example (Liam): 3 hypotheses including "The 5:30 PM Decision Eliminator"
- HC5 example (Noah): Signal report from the 5:30 PM Decision Eliminator experiment graduated to production

**The HC5 example shows:**
- The concierge test (from HC3's Recommended Testing Order) graduated
- Production monitoring reveals the signal is tracking positively against experiment baselines
- An anomaly: users are requesting suggestions earlier than 5:30 PM (suggesting the intervention point assumption was partially wrong)
- The anomaly warrants routing to Isla for discovery research on actual preferred timing

**HC5 Contract Schema (from `_bmad/bme/_vortex/contracts/hc5-signal-report.md`):**

**Frontmatter (7 fields):** `contract: HC5`, `type: artifact`, `source_agent: noah`, `source_workflow: signal-interpretation`, `target_agents: [max]`, `input_artifacts` (HC4 reference), `created`

**Body (5 sections):**
1. Signal Description — Summary, Type, Severity, Detection Method, Time Window, Affected Scope
2. Context — Experiment Lineage (5 fields) + Vortex History (4 fields)
3. Trend Analysis — Direction, Duration, Rate of Change, Baseline Comparison, Confidence
4. Anomaly Detection — Anomaly Description, Deviation from Expected, Potential Explanations, Discovery Needed, Discovery Focus
5. Data Quality — Sample Size, Completeness, Known Biases, Confidence Level

**HC5 explicitly excludes:** strategic recommendations, pivot/patch/persevere decisions, experiment design suggestions, resource allocation recommendations

### Noah Agent Definition Details

- **Agent ID:** production-intelligence-specialist
- **Agent Name:** Noah
- **Icon:** 📡
- **Slash command:** `/bmad-agent-bme-production-intelligence-specialist`
- **Agent file:** `_bmad/bme/_vortex/agents/production-intelligence-specialist.md`
- **Menu items:** [MH] Menu Help, [CH] Chat, [SI] Signal Interpretation, [BA] Behavior Analysis, [MO] Production Monitoring, [PM] Party Mode, [DA] Dismiss Agent
- **Stream:** Sensitize (Stream 6)

### Noah Voice Guidelines

**Use:** "The signal indicates...", "Here's what we're seeing in context", "Behavioral patterns reveal...", "Production data is the most honest user feedback — it can't lie", "Anomaly detection surfaces what dashboards hide", "Signal + context + trend"

**Never use:**
- Isla phrases: "I noticed that", "embrace ambiguity", "feelings are data"
- Mila phrases: "Here's what the research is telling us", "Three patterns converge"
- Liam phrases: "What if?", "stress-test", "falsifiable", "bold version"
- Wade phrases: "Let's test that", "build-measure-learn"
- Max phrases: "Evidence suggests", "pivot/patch/persevere"

### Learnings from Stories 4-2, 4-3, 4-4

1. **L1 (LOW):** Compass "recommendations" word is standard boilerplate — not strategic recommendations
2. **L2 (LOW):** Noah signature phrases can be contextually adapted
3. **L3 (LOW):** Gather-then-formalize pattern is valid — earlier steps collect raw data, later steps formalize
4. **Voice bleed zero tolerance** — grep verification required
5. **No-recommendations guardrail** — Noah classifies and reports, strategic decisions belong to Max
6. **HC5 constraint section** — "This artifact explicitly does NOT include" list present in every HC5 variant

### Learnings from Stories 2-5 and 3-5 (User Guide Patterns)

1. **Mila guide:** Quick Start includes "Mila vs. Emma" comparison table — Noah guide needs "Noah vs. Raw Dashboards" comparison table
2. **Liam guide:** Quick Start includes "Liam vs. General Brainstorming" comparison table — same pattern
3. **Both guides:** ~240-260 lines. Noah's may be slightly longer due to 3 distinct workflows each needing more detail
4. **Example artifacts:** Realistic, non-trivial domain. Both use "Busy Parents Meal Planning" — Noah's HC5 should continue this domain
5. **Example artifacts:** Include "This is an example artifact" notice at top
6. **Example artifacts:** ~100 lines. HC5 example should be similar length
7. **Credits section:** Includes stream number (Stream 3, Stream 4). Noah is Stream 6 (Sensitize)

### Files to Create

| File | Action | Est. Lines |
|------|--------|-----------|
| `_bmad/bme/_vortex/guides/NOAH-USER-GUIDE.md` | NEW | ~280 |
| `_bmad/bme/_vortex/examples/hc5-example-signal-report.md` | NEW | ~120 |

**Total:** 2 files (~400 lines)

### Files NOT Changing

- `_bmad/bme/_vortex/agents/production-intelligence-specialist.md` — Noah's agent definition (done in Story 4-1)
- `_bmad/bme/_vortex/contracts/hc5-signal-report.md` — HC5 schema (already exists)
- `_bmad/bme/_vortex/workflows/signal-interpretation/` — workflow files (done in Story 4-2)
- `_bmad/bme/_vortex/workflows/behavior-analysis/` — workflow files (done in Story 4-3)
- `_bmad/bme/_vortex/workflows/production-monitoring/` — workflow files (done in Story 4-4)
- `_bmad/bme/_vortex/guides/MILA-USER-GUIDE.md` — structural reference only
- `_bmad/bme/_vortex/guides/LIAM-USER-GUIDE.md` — structural reference only
- `_bmad/bme/_vortex/examples/hc2-example-problem-definition.md` — domain reference only
- `_bmad/bme/_vortex/examples/hc3-example-hypothesis-contract.md` — domain reference only
- No JavaScript files change in this story

### Project Structure Notes

- Guide placed in `_bmad/bme/_vortex/guides/` (directory already exists from Stories 2-5 and 3-5)
- Example placed in `_bmad/bme/_vortex/examples/` (directory already exists from Stories 2-5 and 3-5)
- No conflicts with existing files

### References

- [Source: _bmad/bme/_vortex/guides/MILA-USER-GUIDE.md] — Mila user guide (structural reference)
- [Source: _bmad/bme/_vortex/guides/LIAM-USER-GUIDE.md] — Liam user guide (structural reference)
- [Source: _bmad-output/vortex-artifacts/ISLA-USER-GUIDE.md] — Isla user guide (original template)
- [Source: _bmad/bme/_vortex/agents/production-intelligence-specialist.md] — Noah agent definition (menu items, voice, principles)
- [Source: _bmad/bme/_vortex/contracts/hc5-signal-report.md] — HC5 output schema (example artifact reference)
- [Source: _bmad/bme/_vortex/examples/hc2-example-problem-definition.md] — HC2 example (domain continuity)
- [Source: _bmad/bme/_vortex/examples/hc3-example-hypothesis-contract.md] — HC3 example (domain continuity)
- [Source: _bmad/bme/_vortex/workflows/signal-interpretation/] — signal-interpretation step files (workflow documentation)
- [Source: _bmad/bme/_vortex/workflows/behavior-analysis/] — behavior-analysis step files (workflow documentation)
- [Source: _bmad/bme/_vortex/workflows/production-monitoring/] — production-monitoring step files (workflow documentation)
- [Source: _bmad/bme/_vortex/compass-routing-reference.md] — Noah routing (anomaly detection → Isla)
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 4, Story 4.5] — Story requirements
- [Source: _bmad-output/implementation-artifacts/4-4-create-production-monitoring-workflow.md] — Story 4-4 learnings
- [Source: _bmad-output/implementation-artifacts/3-5-create-liam-user-guide-example-artifacts.md] — Story 3-5 patterns
- [Source: _bmad-output/implementation-artifacts/2-5-create-mila-user-guide-example-artifacts.md] — Story 2-5 patterns

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

### Completion Notes List

- Created NOAH-USER-GUIDE.md (263 lines) with all 9 canonical sections matching Mila/Liam guide structure
- Quick Start includes "Noah vs. Raw Dashboards/Analytics" comparison table and decision aid
- All 3 workflows documented with accurate step file names verified against filesystem
- Anomaly Detection → Isla Routing section explains HC10 Compass routing across all 3 workflows
- Noah's Philosophy section uses all 5 principles from agent definition
- Tips from Noah section: 4 tips in Noah's calm, observational voice
- Created hc5-example-signal-report.md (76 lines) — "5:30 PM Decision Eliminator" experiment graduated to production
- HC5 example traces back to HC2 (Busy Parents problem definition) and HC3 (Hypothesis 1) for Vortex journey continuity
- HC5 example includes anomaly: users requesting suggestions 45-90 minutes earlier than designed 5:30 PM trigger — routes to Isla
- All 7 HC5 frontmatter fields present, all 5 body sections complete with specific quantified metrics
- Zero voice bleed: 5 grep checks all returned 0 matches across both files
- Zero strategic recommendations in HC5 example — intelligence only
- Lint passes clean (no JS changes — regression check only)

### Change Log

- 2026-02-26: Implementation complete. All 8 ACs satisfied. 2 files created (339 total lines)

### File List

- `_bmad/bme/_vortex/guides/NOAH-USER-GUIDE.md` (NEW — 263 lines)
- `_bmad/bme/_vortex/examples/hc5-example-signal-report.md` (NEW — 76 lines)
