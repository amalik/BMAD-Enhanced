# Story 4.1: Design Noah's Agent Definition & Persona

Status: done

## Story

As a product discovery practitioner,
I want Noah to have a distinct persona as a Production Intelligence Specialist — an analyst who connects signals to their experimental lineage,
So that he maintains consistent character and is clearly distinguishable from Wade (experimentation) and Max (decisions).

## Acceptance Criteria

1. **Given** Isla's agent definition as canonical template (FM1), **When** Noah's agent definition is created as `production-intelligence-specialist.md`, **Then** it follows the exact structure: Frontmatter → Activation block (XML) → Persona block → Menu block, **And** frontmatter has `name: "production intelligence specialist"` (lowercase with spaces), **And** inside `<agent>`: `<activation>` contains steps 1-7, `<menu-handlers>`, `<rules>`, **And** `<persona>` and `<menu>` are SIBLINGS of `<activation>` inside `<agent>` (NOT nested)
2. **Given** the agent definition, **Then** persona positions Noah as an intelligence analyst who interprets data through context — NOT a dashboard or reporting tool
3. **Given** Noah's role in the Vortex, **Then** Noah explicitly does NOT make strategic recommendations — he produces signals for Max to decide on
4. **Given** the agent-registry.js persona fields, **Then** `<role>`, `<identity>`, `<communication_style>`, `<principles>` match the registry persona fields character-for-character (enforcement guideline #6)
5. **Given** the agent definition, **Then** the agent loads persona at runtime per BMAD Core standards (FR50) — Step 1 loads persona from current agent file
6. **Given** the menu block, **Then** it references Noah's 3 workflow exec paths (signal-interpretation, behavior-analysis, production-monitoring) plus standard items (MH, CH, PM, DA)
7. **Given** the implementation is content-only, **Then** `npm run lint` passes clean (regression check — no JS changes)

*Covers: FR50 (Noah), prerequisite RF3*

## Tasks / Subtasks

- [x] Task 1: Replace placeholder with full agent definition (AC: 1, 2, 3, 4, 5, 6)
  - [x] 1.1 Read Isla's canonical template (`_bmad/bme/_vortex/agents/discovery-empathy-expert.md`) for exact structural reference
  - [x] 1.2 Read Noah's current placeholder (`_bmad/bme/_vortex/agents/production-intelligence-specialist.md`) — 17 lines to replace
  - [x] 1.3 Read Noah's registry persona from `scripts/update/lib/agent-registry.js` — extract ALL 4 persona fields verbatim
  - [x] 1.4 Build full activation block (7 steps) following Isla's exact pattern:
    - Step 1: Load persona from current agent file
    - Step 2: Load config.yaml with full error handling (config path, missing fields)
    - Step 3: Store user_name
    - Step 4: Show greeting + display menu (use {communication_language})
    - Step {HELP_STEP}: `/bmad-help` example reflecting Noah's domain
    - Step 5: WAIT for user input
    - Step 6: Input processing (number/text/fuzzy match)
    - Step 7: Menu item processing via menu-handlers
  - [x] 1.5 Build `<menu-handlers>` section (exec/data/workflow handlers — framework-standard, copy pattern from Isla)
  - [x] 1.6 Build `<rules>` section: 4 generic rules + 4-5 Noah-specific rules derived from registry expertise:
    - Signal + context + trend interpretation
    - Behavioral patterns reveal intent that surveys miss
    - Production data as honest feedback
    - Anomaly detection surfaces what dashboards hide
    - Observe and report, don't prescribe
  - [x] 1.7 Build `<persona>` block with 4 sub-elements matching registry EXACTLY (un-escape JS `\'` to `'`):
    - `<role>`: "Signal Interpretation + Production Intelligence Analyst"
    - `<identity>`: Full registry identity
    - `<communication_style>`: Full registry communication_style
    - `<principles>`: Registry expertise field content
  - [x] 1.8 Build `<menu>` block with 7 items:
    - [MH] Redisplay Menu Help
    - [CH] Chat with Noah about signal interpretation, anomaly detection, or production monitoring
    - [SI] Signal Interpretation (exec: signal-interpretation/workflow.md)
    - [BA] Behavior Analysis (exec: behavior-analysis/workflow.md)
    - [MO] Production Monitoring (exec: production-monitoring/workflow.md)
    - [PM] Start Party Mode (exec: party-mode/workflow.md)
    - [DA] Dismiss Agent
  - [x] 1.9 Customize error messages for Noah (NOT copy-pasted from Isla/Mila/Liam):
    - Config error: "This file is required for Noah to operate"
    - Workflow error: "This workflow is required for Noah to run signal interpretation activities"
  - [x] 1.10 Write complete file replacing the 17-line placeholder

- [x] Task 2: Verify implementation (AC: 1, 2, 3, 4, 5, 6, 7)
  - [x] 2.1 Verify XML structure matches Isla's canonical template exactly (activation → menu-handlers → rules inside activation; persona and menu as siblings outside activation)
  - [x] 2.2 Verify registry persona match — compare `<role>`, `<identity>`, `<communication_style>`, `<principles>` against agent-registry.js character-for-character
  - [x] 2.3 Verify 3 workflow exec paths exist on filesystem:
    - `_bmad/bme/_vortex/workflows/signal-interpretation/workflow.md`
    - `_bmad/bme/_vortex/workflows/behavior-analysis/workflow.md`
    - `_bmad/bme/_vortex/workflows/production-monitoring/workflow.md`
  - [x] 2.4 Voice bleed check — zero forbidden phrases:
    - No Isla: "I noticed that", "embrace ambiguity", "feelings are data"
    - No Mila: "Here's what the research is telling us", "Three patterns converge"
    - No Liam: "What if?", "stress-test", "falsifiable", "bold version"
    - No Wade: "Let's test that", "build-measure-learn"
    - No Max: "Evidence suggests", "pivot/patch/persevere"
  - [x] 2.5 Verify Noah's distinction from Wade and Max:
    - NOT a dashboard or reporting tool (AC2)
    - NOT making strategic recommendations — signals for Max only (AC3)
    - Distinct from Wade (experimentation) and Max (decisions)
  - [x] 2.6 Run `npm run lint` — must pass clean (AC7)

## Dev Notes

### Canonical Template Reference
- **Source of truth for structure:** `_bmad/bme/_vortex/agents/discovery-empathy-expert.md` (Isla — 117 lines)
- **Source of truth for persona fields:** `scripts/update/lib/agent-registry.js` (Noah entry)
- **Recent pattern reference:** `_bmad/bme/_vortex/agents/hypothesis-engineer.md` (Liam — created in Story 3-1)

### Noah's Registry Persona (EXACT VALUES — un-escape JS `\'` → `'`)

```
role: "Signal Interpretation + Production Intelligence Analyst"

identity: "Intelligence analyst who interprets production signals through contextual lenses. Specializes in signal-context-trend analysis, behavioral pattern detection, and feedback loop interpretation. Guides teams through the 'Sensitize' stream — reading what real-world usage reveals about product-market fit. Explicitly does NOT make strategic recommendations — that is Max's domain."

communication_style: "Calm and observational — reports what the data shows without jumping to conclusions. Says things like 'The signal indicates...' and 'Here's what we're seeing in context.' Presents findings in signal + context + trend format, leaving strategic interpretation to the decision-maker."

expertise (→ <principles>): "- Signal + context + trend — raw metrics mean nothing without interpretation frames - Behavioral patterns reveal intent that surveys miss - Production data is the most honest user feedback — it can't lie - Anomaly detection surfaces what dashboards hide - Observe and report, don't prescribe — strategic decisions belong downstream"
```

### Agent XML Attributes (PRESERVE from placeholder)
```xml
<agent id="production-intelligence-specialist.agent.yaml" name="Noah" title="Production Intelligence Specialist" icon="📡">
```

### Noah's 3 Workflows (exec paths — verified to exist as placeholders)
1. `{project-root}/_bmad/bme/_vortex/workflows/signal-interpretation/workflow.md`
2. `{project-root}/_bmad/bme/_vortex/workflows/behavior-analysis/workflow.md`
3. `{project-root}/_bmad/bme/_vortex/workflows/production-monitoring/workflow.md`

### Persona Distinctiveness (FM5 — Three-Way Comparison)

| Dimension | Wade (Externalize) | **Noah (Sensitize)** | Max (Systematize) |
|-----------|-------------------|---------------------|------------------|
| Core function | Rapid experimentation | Signal interpretation through context | Strategic decisions |
| Output | HC4 (experiment results) | HC5 (signal reports — intelligence only) | Decisions (no artifact) |
| Communication | "Let's test that assumption" | "The signal indicates...", "Here's what we're seeing in context" | "The evidence suggests...", "Based on what we've learned..." |
| Makes recommendations? | No — tests | **No — reports** | Yes — decides |

### Voice Guidelines
- **Use:** "The signal indicates...", "Here's what we're seeing in context", "Behavioral patterns reveal...", "Production data is the most honest user feedback", "Anomaly detection surfaces what dashboards hide"
- **Never use:** Isla phrases (embrace ambiguity, feelings are data), Mila phrases (research is telling us, patterns converge), Liam phrases (What if?, stress-test, falsifiable), Wade phrases (Let's test that, build-measure-learn), Max phrases (Evidence suggests, pivot/patch/persevere)

### Key Constraints
- Noah does NOT make strategic recommendations — that is Max's domain
- Noah is NOT a dashboard or reporting tool — he is an intelligence analyst
- Noah produces HC5 (signal + context + trend), consumes HC4 (experiment context from Wade)
- HC10 anomaly routing: Noah → Isla when unexpected behavior detected (flag-driven, not artifact)
- No validate menu item — no validate.md exists yet (defer to Stories 4.2-4.4)

### Learnings from Previous Agent Definition Stories (3-1, 2-1)
- **Registry match is THE enforcement gate** — compare un-escaped values character-for-character
- **Error messages MUST be Noah-specific** — not copy-pasted from Isla/Mila/Liam
- **Help step example must reflect Noah's domain** — e.g., "I need to understand what this production signal means in context of my experiment"
- **Filesystem verification** — verify all workflow exec paths exist before referencing (Epic 2 learning, carried forward)
- **No voice bleed** — zero tolerance for cross-agent contamination (team agreement from Epic 3 retro)

### HC5 Contract Reference
- Schema: `_bmad/bme/_vortex/contracts/hc5-signal-report.md`
- Noah's output format: Signal Description + Context (experiment lineage + Vortex history) + Trend Analysis + Anomaly Detection + Data Quality
- HC5 explicitly excludes: strategic recommendations, pivot/patch/persevere decisions, experiment design suggestions

### HC4 Contract Reference (Noah's Input)
- Schema: `_bmad/bme/_vortex/contracts/hc4-experiment-context.md`
- Wade's output that Noah consumes: Experiment Summary, Hypothesis Tested, Method, Success Criteria, Confirmed/Rejected Hypotheses, Production Readiness

### Compass Routing Reference (Noah's Routes)
- signal-interpretation: → Max (HC5), → Isla (HC10 anomalous behavior)
- behavior-analysis: → Max (HC5), → Isla (HC10 novel behavior), → Noah signal-interpretation (deeper analysis)
- production-monitoring: → Max (HC5), → Isla (HC10 anomalies), → Noah signal-interpretation (deep dive)

### References

- [Source: _bmad/bme/_vortex/agents/discovery-empathy-expert.md] — Isla canonical template (FM1)
- [Source: scripts/update/lib/agent-registry.js] — Noah registry persona fields
- [Source: _bmad/bme/_vortex/agents/hypothesis-engineer.md] — Liam pattern reference (Story 3-1)
- [Source: _bmad/bme/_vortex/contracts/hc5-signal-report.md] — HC5 output schema
- [Source: _bmad/bme/_vortex/contracts/hc4-experiment-context.md] — HC4 input schema
- [Source: _bmad/bme/_vortex/compass-routing-reference.md] — Noah routing entries
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 4, Story 4.1] — Story requirements
- [Source: _bmad-output/implementation-artifacts/epic-3-retro-2026-02-25.md] — Team agreements for Epic 4

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

### Completion Notes List

- Replaced 17-line placeholder with full 118-line agent definition following Isla's canonical template exactly
- All 4 persona fields match agent-registry.js character-for-character (enforcement guideline #6 verified)
- 4 generic rules + 5 Noah-specific persona rules (signal+context+trend, behavioral patterns, production data honesty, anomaly detection, observe-don't-prescribe)
- 3 workflow menu items with verified exec paths (signal-interpretation, behavior-analysis, production-monitoring)
- Error messages customized for Noah (not copy-pasted from Isla/Mila/Liam)
- Help step example reflects Noah's domain: "I need to understand what this production signal means in context of my experiment"
- No validate menu item (no validate.md exists yet — deferred to Stories 4.2-4.4)
- No voice bleed: zero Isla/Mila/Liam/Wade/Max phrases detected
- Lint passes clean (no JS changes — regression check only)

### Change Log

- 2026-02-26: Story created
- 2026-02-26: Implementation complete. All 7 ACs satisfied
- 2026-02-26: Code review passed (0H, 0M, 3L — all acceptable)

### File List

- `_bmad/bme/_vortex/agents/production-intelligence-specialist.md` (REPLACED — 17-line placeholder → 118-line full agent definition)
