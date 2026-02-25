# Story 2.4: Create Pattern-Mapping Workflow

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a product manager with multiple research streams,
I want to map patterns across different artifact types to identify convergent themes,
So that I can see cross-cutting insights that no single artifact reveals alone.

## Acceptance Criteria

1. **AC1: Step files follow micro-file architecture (FR51, P17, P20)**
   - **Given** the workflow directory `_bmad/bme/_vortex/workflows/pattern-mapping/steps/`
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
   - **And** `workflow` value is `pattern-mapping` (not `research-convergence` or `pivot-resynthesis`)

3. **AC3: Step-01-setup validates multi-source input artifacts (FR6, FR17)**
   - **Given** a user invokes the workflow with multiple research artifacts
   - **When** step-01-setup runs
   - **Then** it performs two-mode input assessment: (a) For HC1-conforming artifacts — validates frontmatter fields and body sections per HC1 schema, flagging missing sections; (b) For non-HC1 research (informal notes, external reports) — assesses structural clarity (who/what/evidence) and asks clarification questions without rejection
   - **And** it explains what pattern mapping does: identify cross-cutting themes and convergent patterns across multiple research artifacts before full synthesis
   - **And** it distinguishes pattern mapping from research convergence: pattern mapping identifies patterns (reconnaissance); research convergence produces the full problem definition (commitment)
   - **And** it includes a "When Pattern Mapping Helps" section: (a) you have 2+ artifacts but haven't synthesized them yet; (b) you suspect convergence but want to map patterns before full synthesis; (c) you want to validate that research streams agree before investing in full problem definition. References research-convergence as the next step once patterns are clear.
   - **And** it guides the user if artifacts are non-conforming (FR17) without rejecting them
   - **And** it lists expected input types: (a) HC1 empathy artifacts from Isla; (b) Any other structured research — informal notes, external reports, prior pattern analyses (FR6); (c) Minimum 2 artifacts recommended for meaningful cross-source pattern identification
   - **And** for non-HC1 research, defines "well-formed" minimally: (a) source identification (author, date, method if known); (b) scope/context (who was researched, what was studied); (c) findings (key discoveries); (d) evidence summary (how strong is the data)

4. **AC4: Step-02-context loads and prepares artifacts for pattern analysis**
   - **Given** validated input artifacts from step-01
   - **When** step-02-context runs
   - **Then** it loads and reviews all provided artifacts
   - **And** it guides the user to note for each artifact: who was researched, what was discovered, evidence strength, themes identified, and contradictions with other artifacts (if any)
   - **And** it prepares the ground for pattern identification by establishing what each artifact individually reveals
   - **And** it includes a worked example of per-artifact analysis using a 2-artifact case (e.g., empathy map + interview synthesis) showing the per-artifact note structure

5. **AC5: Core steps guide pattern identification and theme mapping**
   - **Given** loaded artifacts from step-02
   - **When** core activity steps run
   - **Then** they guide systematic pattern identification across artifacts: recurring themes, convergent behaviors, contradictions, and evidence gaps
   - **And** step-03 guides users to produce a pattern inventory table with columns: Pattern Name, Source Artifacts, Strength (Single/Multi-source/Universal), Pattern Type (Theme/Behavior/Contradiction/Gap), Evidence Count — including a worked example with 3-4 patterns
   - **And** they facilitate theme clustering: grouping related patterns into coherent themes with confidence levels — **Strong** (3+ artifacts converge with consistent evidence), **Moderate** (2 artifacts converge or 1 with multiple data points), **Emerging** (single-source or contradictions exist)
   - **And** they help the user assess pattern strength: how many artifacts converge on each pattern (one data point is an anecdote, three are a pattern)
   - **And** they identify which patterns are strong enough to inform a problem definition vs. which need more research

6. **AC6: Workflow produces a pattern analysis output (not HC2)**
   - **Given** completed pattern identification and theme mapping
   - **When** the synthesis step produces output
   - **Then** the output is a pattern analysis document — NOT an HC2 problem definition (frontmatter must NOT include `contract: HC2`)
   - **And** the output artifact frontmatter includes: `source_agent: mila`, `source_workflow: pattern-mapping`, `target_agents: [mila, liam, isla]` (flexible routing), `input_artifacts: [...]` (array of all inputs used), `created: YYYY-MM-DD`. The `contract` field is omitted (not a handoff contract — this is a working document for internal Vortex use)
   - **And** the output body includes 6 sections: Pattern Summary, Theme Clusters, Convergence Assessment, Contradictions, Evidence Gaps, Recommendations
   - **And** each pattern in the body includes evidence sources linking back to specific input artifacts (traceability)
   - **And** the output can feed into research-convergence for full synthesis OR stand alone as a pattern analysis reference
   - **And** the output artifact is saved to `{output_folder}/vortex-artifacts/pattern-analysis-{date}.md`

7. **AC7: Final step presents Compass routing with three-route distinction (FR19, FR20, FR21)**
   - **Given** the final `*-synthesize.md` step
   - **When** routing is presented
   - **Then** Compass table uses D4 format: `| If you learned... | Consider next... | Agent | Why |`
   - **And** it presents three routes per compass-routing-reference.md line 205:
     (1) Mila 🔬 research-convergence — Patterns identified, proceed to full synthesis
     (2) Liam 💡 hypothesis-engineering — Patterns already point to clear problem (HC2)
     (3) Isla 🔍 user-discovery — Patterns reveal knowledge gaps
   - **And** Route 1 (self-routing back to Mila's research-convergence) is the expected successful completion path — pattern mapping is reconnaissance, research-convergence is commitment. This self-routing is unique to pattern-mapping and is NOT a failure state.
   - **And** Compass references what each downstream agent expects (FR21)

8. **AC8: Insufficient evidence state handled (FR18)**
   - **Given** the Compass routing section
   - **When** evidence is insufficient to route confidently
   - **Then** an "⚠️ Insufficient Evidence for Routing" guidance block is presented
   - **And** it specifies what evidence is needed for each route
   - **And** it includes workflow-specific triggers: (a) patterns don't converge on any clear theme → more artifacts needed; (b) contradictions dominate over convergence → Isla for focused investigation; (c) strong patterns but unclear which job they serve → proceed to research-convergence for JTBD framing
   - **And** if analysis shows fewer than 2 artifacts with converging insights, step-05 includes guidance: "Patterns emerge from cross-artifact convergence. Consider collecting more artifacts or using Isla's workflows to deepen existing research before proceeding."

9. **AC9: User can override Compass recommendation (FR22)**
   - **Given** the Compass section
   - **When** displayed
   - **Then** it includes the override note: "You can navigate to any Vortex agent at any time based on your judgment"
   - **And** references Max's [VN] Vortex Navigation

10. **AC10: Decision points present A/P/C menu (FR52)**
    - **Given** any step with a decision point
    - **When** the user reaches a decision
    - **Then** the A/P/C menu is available (Advanced Elicitation / Party Mode / Continue)
    - **And** A/P/C appears: (a) step-03 after pattern identification is complete; (b) step-04 after theme clustering is complete; (c) step-05 after pattern-analysis artifact is generated but before Compass routing (mandatory)

11. **AC11: Workflow entry point (workflow.md) is complete**
    - **Given** `_bmad/bme/_vortex/workflows/pattern-mapping/workflow.md`
    - **When** it replaces the current placeholder
    - **Then** it follows Mila's research-convergence `workflow.md` pattern: frontmatter, description, steps overview, output description, initialization block
    - **And** the "What is Pattern Mapping?" section explains the distinction: identify cross-cutting patterns before synthesis vs. produce a full problem definition
    - **And** initialization loads config and then loads `step-01-setup.md`
    - **And** includes `Template: None` line in output section

12. **AC12: Mila's voice is consistent throughout**
    - **Given** all step files
    - **When** language and tone are reviewed
    - **Then** they use Mila's communication style: warm but analytically precise, convergence language
    - **And** uses pattern-mapping-specific phrases grounded in Mila's voice: "Three patterns converge on this insight", "One data point is an anecdote, three are a pattern", "Here's what the research is telling us — the patterns point to..."
    - **And** uses conclusion-drawing language: "The data shows...", "Across these artifacts, the evidence clusters around..."
    - **And** is distinct from Isla's ambiguity-embracing style and Emma's strategic-framing style

13. **AC13: Lint passes**
    - **Given** all created files
    - **When** `npm run lint` runs
    - **Then** it passes clean
    - **Note:** Content-only story. Lint is a regression check.

## Tasks / Subtasks

- [x]**Task 1: Create workflow.md entry point** (AC: 11)
  - [x]1.1 Replace placeholder in `_bmad/bme/_vortex/workflows/pattern-mapping/workflow.md` with full entry point
  - [x]1.2 Add YAML frontmatter: `workflow: pattern-mapping`, `type: step-file`, `description`, `author: Mila (research-convergence-specialist)`, `version: 1.6.0`
  - [x]1.3 Include "What is Pattern Mapping?" section explaining: identify cross-cutting patterns across multiple research artifacts before committing to full synthesis; this is the reconnaissance before convergence
  - [x]1.4 Include steps overview listing all step files with brief descriptions
  - [x]1.5 Include output section describing pattern analysis output to `{output_folder}/vortex-artifacts/`, with `Template: None` line
  - [x]1.6 Include initialization block: load config from `{project-root}/_bmad/bme/_vortex/config.yaml`, then load step-01-setup.md

- [x]**Task 2: Create steps/ directory and step-01-setup.md** (AC: 1, 2, 3)
  - [x]2.1 Create directory `_bmad/bme/_vortex/workflows/pattern-mapping/steps/`
  - [x]2.2 Create `step-01-setup.md` with frontmatter: `step: 1`, `workflow: pattern-mapping`, `title: Setup & Input Validation`
  - [x]2.3 Explain what pattern mapping does and how it differs from research-convergence: pattern mapping identifies cross-source patterns and themes (reconnaissance); research-convergence produces the full HC2 problem definition with JTBD + Pains & Gains (commitment)
  - [x]2.4 Include "When Pattern Mapping Helps" section: (a) 2+ artifacts but not ready for full synthesis; (b) want to validate convergence before investing in problem definition; (c) identifying gaps before committing. Reference research-convergence as next step once patterns are clear.
  - [x]2.5 List expected inputs: (a) HC1 empathy artifacts from Isla (primary); (b) Any well-formed research input — informal notes, external reports, prior analyses (FR6); (c) Recommend minimum 2 artifacts for meaningful cross-source analysis
  - [x]2.6 Include two-mode input assessment: (a) HC1-conforming → validate frontmatter fields (`contract: HC1`, `type: artifact`, `source_agent`, `source_workflow`, `target_agents` should include `mila`, `input_artifacts`, `created`) and body sections (Executive Summary, Research Context, Synthesized Insights, Key Themes, Pain Points, Desired Gains, Recommendations); (b) Non-HC1 research → assess minimal structure (source identification, scope/context, findings, evidence summary) and ask clarification questions without rejection. Reference HC1 contract: `{project-root}/_bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md`
  - [x]2.7 Non-conforming input guidance (FR17): accept and guide, don't reject — note which sections are present/missing and work with what's available
  - [x]2.8 End with next-step loading: `{project-root}/_bmad/bme/_vortex/workflows/pattern-mapping/steps/step-02-context.md`

- [x]**Task 3: Create step-02-context.md** (AC: 1, 2, 4)
  - [x]3.1 Create `step-02-context.md` with frontmatter: `step: 2`, `workflow: pattern-mapping`, `title: Context Loading & Analysis`
  - [x]3.2 Guide user to load and review all input artifacts — note who/what/evidence-strength for each
  - [x]3.3 Guide initial per-artifact analysis: what does each artifact independently reveal? What are its strongest findings?
  - [x]3.4 Prepare for cross-artifact pattern work by establishing the individual artifact landscape
  - [x]3.5 Include example of per-artifact analysis notes
  - [x]3.6 End with next-step loading to step-03

- [x]**Task 4: Create step-03-pattern-identification.md** (AC: 1, 2, 5)
  - [x]4.1 Create `step-03-pattern-identification.md` with frontmatter: `step: 3`, `workflow: pattern-mapping`, `title: Pattern Identification`
  - [x]4.2 Guide systematic cross-artifact pattern identification: (a) Recurring themes — what topics appear in 2+ artifacts? (b) Convergent behaviors — what user behaviors show up repeatedly? (c) Contradictions — where do artifacts disagree? (d) Evidence gaps — what questions remain unanswered?
  - [x]4.3 Guide pattern strength assessment: Single (1 artifact — anecdote), Multi-source (2 artifacts — pattern), Universal (all artifacts — strong signal)
  - [x]4.4 Include pattern inventory table: `| Pattern | Source Artifacts | Strength | Type | Evidence Count |` with a worked example of 3-4 patterns across 2-3 hypothetical artifacts
  - [x]4.5 Emphasize Mila's cross-source triangulation principle: "One data point is an anecdote, three are a pattern"
  - [x]4.6 Include A/P/C decision point (FR52) after pattern identification
  - [x]4.7 End with next-step loading to step-04

- [x]**Task 5: Create step-04-theme-clustering.md** (AC: 1, 2, 5)
  - [x]5.1 Create `step-04-theme-clustering.md` with frontmatter: `step: 4`, `workflow: pattern-mapping`, `title: Theme Clustering`
  - [x]5.2 Guide theme clustering: group related patterns into coherent themes that tell a bigger story
  - [x]5.3 Guide theme assessment: (a) Which themes are strongly supported? (b) Which themes need more evidence? (c) Which themes contradict each other? (d) What's the emerging picture?
  - [x]5.4 Include theme summary format: theme name, contributing patterns, evidence count, confidence (Strong = 3+ artifacts converge / Moderate = 2 artifacts or 1 with multiple data points / Emerging = single-source or contradictions exist), implications
  - [x]5.5 Guide cross-theme synthesis: do the themes collectively point toward a problem definition, or do they reveal gaps?
  - [x]5.6 Include A/P/C decision point (FR52)
  - [x]5.7 End with next-step loading to step-05

- [x]**Task 6: Create step-05-synthesize.md (final step)** (AC: 1, 2, 6, 7, 8, 9, 10)
  - [x]6.1 Create `step-05-synthesize.md` with frontmatter: `step: 5`, `workflow: pattern-mapping`, `title: Synthesize & Route`
  - [x]6.2 Guide convergence into pattern analysis summary: strongest patterns, theme clusters, convergence assessment, contradictions, gaps
  - [x]6.3 Guide output artifact generation with recommended structure: (a) Pattern Summary — strongest cross-artifact patterns with evidence; (b) Theme Clusters — grouped patterns with confidence levels; (c) Convergence Assessment — how strongly patterns point toward a unified picture; (d) Contradictions — conflicting evidence and possible explanations; (e) Evidence Gaps — what's missing; (f) Recommendations — suggested next steps based on pattern strength
  - [x]6.4 Include pattern-analysis artifact frontmatter template: `source_agent: mila`, `source_workflow: pattern-mapping`, `target_agents: [mila, liam, isla]`, `input_artifacts: [...]`, `created: YYYY-MM-DD`. No `contract` field (not a handoff contract). Include `input_artifacts` array listing every input artifact used for traceability.
  - [x]6.5 Include explicit save-to path: `{output_folder}/vortex-artifacts/pattern-analysis-{date}.md`
  - [x]6.6 Clarify output is NOT HC2 — it's a pattern analysis working document. Frontmatter must NOT include `contract: HC2`. It can feed into research-convergence for full problem definition OR stand alone as a reference
  - [x]6.7 Include A/P/C decision point after output generation but before Compass routing (FR52)
  - [x]6.8 Add Compass routing table with D4 format and three routes per compass-routing-reference.md line 205:
    - Route 1: Patterns identified → Mila 🔬 `research-convergence` — proceed to full synthesis
    - Route 2: Patterns already point to clear problem → Liam 💡 `hypothesis-engineering` (HC2)
    - Route 3: Patterns reveal knowledge gaps → Isla 🔍 `user-discovery`
  - [x]6.9 Add ⚠️ Insufficient Evidence for Routing block (FR18) with workflow-specific triggers: (a) patterns don't converge on any clear theme → more artifacts needed, consider Isla; (b) contradictions dominate over convergence → Isla for focused investigation; (c) strong patterns but unclear which job they serve → proceed to research-convergence for JTBD framing; (d) fewer than 2 artifacts with converging insights → guidance to collect more artifacts or deepen existing research
  - [x]6.10 Add user override note (FR22): `> **Note:** These are evidence-based recommendations. You can navigate to any Vortex agent at any time based on your judgment.` followed by `**Or run Max's [VN] Vortex Navigation** for a full gap analysis across all streams.`

- [x]**Task 7: Verify Mila's voice and consistency** (AC: 12)
  - [x]7.1 Review all step files for Mila's communication style: warm but analytically precise, convergence language
  - [x]7.2 Verify pattern-mapping Mila phrases: "Three patterns converge on this insight", "One data point is an anecdote, three are a pattern", "Here's what the research is telling us", "The data shows..."
  - [x]7.3 Verify language is distinct from Isla (no ambiguity-embracing phrases) and Emma (no strategic-framing phrases)

- [x]**Task 8: Validate and lint** (AC: 1, 13)
  - [x]8.1 Verify step count is 4-6 (P17) — expecting 5 steps
  - [x]8.2 Verify standardized filenames: `step-01-setup.md`, `step-02-context.md`, final `step-05-synthesize.md` (P20)
  - [x]8.3 Verify all frontmatter has `step`, `workflow: pattern-mapping`, `title` fields (FR46)
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

### Critical Distinction: Pattern Mapping vs. Research Convergence vs. Pivot Resynthesis

| Aspect | Research Convergence (2.2) | Pivot Resynthesis (2.3) | Pattern Mapping (2.4) |
|--------|---------------------------|------------------------|-----------------------|
| **Trigger** | Multiple HC1 artifacts ready for synthesis | Max says "pivot" — experiment failed | Multiple artifacts need cross-source analysis |
| **Input** | HC1 empathy artifacts | HC1 originals + HC4 experiment evidence | HC1 artifacts + any well-formed research (FR6) |
| **Core activity** | JTBD framing + Pains & Gains | JTBD re-framing + Pains & Gains revision | Pattern identification + Theme clustering |
| **Output** | HC2 (new problem definition) | HC2 (revised problem definition) | Pattern analysis (NOT HC2) |
| **Compass routes** | 3 routes (Liam/Isla/Emma) | 2 routes (Liam/Isla) | 3 routes (Mila-RC/Liam/Isla) |
| **Key principle** | Convergence from divergent research | Iteration within known problem space | Cross-source reconnaissance before synthesis |

Pattern mapping is the **lightest-weight** of Mila's three workflows. It identifies patterns without committing to a full problem definition. This makes it ideal for: (a) early-stage exploration when you have multiple artifacts but aren't ready for full synthesis; (b) sanity-checking whether artifacts converge enough to warrant research-convergence; (c) identifying gaps that need more Isla research before synthesis.

### Step Architecture Design (5 Steps)

Based on architecture constraints (P17: 4-6 steps, P20: standardized names) and the scope of this workflow:

| Step | File | Purpose | Architecture Role |
|------|------|---------|-------------------|
| 1 | `step-01-setup.md` | Input validation, workflow explanation | Standardized (P20) |
| 2 | `step-02-context.md` | Load artifacts, per-artifact analysis | Standardized (P20) |
| 3 | `step-03-pattern-identification.md` | Cross-artifact pattern identification | Core activity |
| 4 | `step-04-theme-clustering.md` | Group patterns into themes, assess strength | Core activity |
| 5 | `step-05-synthesize.md` | Pattern analysis output + Compass routing | Standardized (P20: `*-synthesize.md`) |

**Why 5 steps (matching sibling workflows):** Same 2-core-activity structure: pattern identification + theme clustering. The distinction from research-convergence is that core activities focus on finding patterns (reconnaissance) rather than producing a formal problem definition (commitment).

**Core step naming (steps 3-4):** Uses `-pattern-identification` and `-theme-clustering` to distinguish from research-convergence's `-jtbd-framing` and `-pains-gains`, reflecting that pattern mapping is about finding patterns (exploratory) rather than framing a problem (definitive).

### Canonical Template: Mila's Research-Convergence Workflow

Use `_bmad/bme/_vortex/workflows/research-convergence/` as the structural reference. Story 2.4 follows the same step-file architecture, frontmatter pattern, body structure, and Mila voice guidelines established in Story 2.2.

**Key differences from research-convergence:**
1. **Broader input acceptance** in step-01: any well-formed research (FR6), not just HC1
2. **Per-artifact analysis** in step-02: individual artifact summaries before cross-analysis
3. **Pattern identification** in step-03: systematic cross-artifact pattern finding (not JTBD framing)
4. **Theme clustering** in step-04: grouping patterns into themes (not Pains & Gains)
5. **Pattern analysis output** in step-05: NOT HC2 — lighter-weight output that can feed into research-convergence
6. **Three Compass routes** in step-05: Mila-RC / Liam / Isla (self-routing back to Mila's own research-convergence is unique to this workflow)

### Output: Pattern Analysis (Not HC2)

Pattern mapping does NOT produce an HC2 problem definition. The output is a **pattern analysis working document** — not a handoff contract.

**Frontmatter:**
```yaml
---
source_agent: mila
source_workflow: pattern-mapping
target_agents: [mila, liam, isla]
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/{hc1-artifact-1}"
    contract: HC1
  - path: "{path-to-non-hc1-research}"
    contract: null
created: YYYY-MM-DD
---
```

Note: No `contract` field — this is a working document for internal Vortex use, not a handoff contract. The `target_agents` array includes all three possible routing targets.

**Required body sections (6):**
- Pattern Summary — strongest cross-artifact patterns with evidence
- Theme Clusters — grouped patterns with confidence levels (Strong/Moderate/Emerging)
- Convergence Assessment — do patterns point to a unified picture?
- Contradictions — conflicting evidence
- Evidence Gaps — what's missing
- Recommendations — suggested next steps

This output can:
- **Feed into research-convergence** — Mila uses pattern analysis as input alongside HC1 artifacts for full synthesis
- **Stand alone** — a useful reference document for the team even without further synthesis
- **Route to Liam directly** — if patterns already clearly define a problem, skip synthesis and go to hypothesis engineering

**Save to:** `{output_folder}/vortex-artifacts/pattern-analysis-{date}.md`

### Input Schema: What Pattern-Mapping Accepts

**Primary input — HC1 Empathy Artifacts:**
From `_bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md`:
- Required frontmatter: `contract: HC1`, `type: artifact`, `source_agent`, `source_workflow`, `target_agents`, `input_artifacts`, `created`
- Required body: Executive Summary, Research Context, Synthesized Insights, Key Themes, Pain Points, Desired Gains, Recommendations

**Any well-formed research (FR6):**
- Pattern mapping explicitly accepts non-HC1 input: informal notes, external research reports, prior analyses
- Non-conforming input is guided, not rejected (FR17)
- Minimum 2 artifacts recommended for meaningful cross-source analysis
- **Non-HC1 minimal structure:** source identification (author, date, method), scope/context (who/what/boundaries), findings (key discoveries), evidence summary (data strength)

### Integration Note (Epic 5 Awareness)

Pattern-mapping is an optional intermediate workflow between Isla and research-convergence. Epic 5 Story 5.1 (FR30) will update Isla's Compass tables to route to research-convergence (direct synthesis) by default. Pattern-mapping remains available as an alternative if users want reconnaissance before synthesis. No changes needed in this story, but developers should be aware of the downstream routing decision.

### Compass Routing Reference (Pattern-Mapping Routes)

From `_bmad/bme/_vortex/compass-routing-reference.md` line 205:

| Route | Target | Condition |
|-------|--------|-----------|
| 1 | Mila 🔬 `research-convergence` | Patterns identified, proceed to full synthesis |
| 2 | Liam 💡 `hypothesis-engineering` | Patterns already point to clear problem (HC2) |
| 3 | Isla 🔍 `user-discovery` | Patterns reveal knowledge gaps |

**Self-routing note:** Route 1 routes back to Mila's own research-convergence workflow. This is unique to pattern-mapping — it's the only Mila workflow that can route back to another Mila workflow. This makes sense: pattern mapping is reconnaissance; research-convergence is commitment.

### Mila's Voice Guidelines (Pattern-Mapping-Specific)

All step content must use Mila's established persona with pattern-mapping-specific phrases:
- **Warm but analytically precise** — convergence language with pattern-finding framing
- **Pattern phrases:** "Three patterns converge on this insight", "One data point is an anecdote, three are a pattern", "Here's what the research is telling us"
- **Evidence-grounded:** Always link patterns back to specific artifacts and evidence counts
- **Reconnaissance language:** "Let's see what the artifacts collectively reveal", "The patterns are starting to emerge", "This is reconnaissance — we're identifying what's there before committing to a problem definition"
- **NEVER use Isla phrases:** "I noticed that...", "embrace ambiguity", "The messier the research, the richer the insights"
- **NEVER use Emma phrases:** "Let's frame this strategically"

### Learnings from Stories 2.2 and 2.3

1. **Contract paths:** Use `_bmad/bme/_vortex/contracts/` NOT `handoff-contracts/` (Story 2.2 code review M1)
2. **Insufficient Evidence heading:** Must include ⚠️ emoji: `### ⚠️ Insufficient Evidence for Routing` (Story 2.2 code review M2)
3. **Explicit save-to path:** Final step must include explicit output file path (Story 2.2 code review M3)
4. **Cross-artifact analysis example:** Include examples in step-02 (Story 2.2 code review L1)
5. **Template: None line:** Include in workflow.md output section (Story 2.2 code review L2)
6. **Consistent revision vocabulary:** Use same status vocabulary across steps — step-02 and step-04 should agree (Story 2.3 code review M1)
7. **Schema compliance:** Don't add values to contract schemas that aren't defined — stay within HC2/HC1 enum values (Story 2.3 code review H1)

### Files to Create

| File | Change | Why |
|------|--------|-----|
| `_bmad/bme/_vortex/workflows/pattern-mapping/workflow.md` | **REPLACE** placeholder | AC11 |
| `_bmad/bme/_vortex/workflows/pattern-mapping/steps/step-01-setup.md` | **NEW** | AC1, AC2, AC3 |
| `_bmad/bme/_vortex/workflows/pattern-mapping/steps/step-02-context.md` | **NEW** | AC1, AC2, AC4 |
| `_bmad/bme/_vortex/workflows/pattern-mapping/steps/step-03-pattern-identification.md` | **NEW** | AC1, AC2, AC5 |
| `_bmad/bme/_vortex/workflows/pattern-mapping/steps/step-04-theme-clustering.md` | **NEW** | AC1, AC2, AC5 |
| `_bmad/bme/_vortex/workflows/pattern-mapping/steps/step-05-synthesize.md` | **NEW** | AC1, AC2, AC6-AC10 |

### Files NOT Changing

- `_bmad/bme/_vortex/agents/research-convergence-specialist.md` — Mila's agent definition (completed in Story 2.1)
- `_bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md` — input schema (read-only reference)
- `_bmad/bme/_vortex/contracts/hc2-problem-definition.md` — NOT used for output (pattern analysis is not HC2)
- `_bmad/bme/_vortex/compass-routing-reference.md` — routing reference (read-only)
- `_bmad/bme/_vortex/workflows/research-convergence/` — sibling workflow (read-only reference)
- `_bmad/bme/_vortex/workflows/pivot-resynthesis/` — sibling workflow (read-only reference)
- All JavaScript files — no code changes
- All test files — no test changes needed

### Project Structure Notes

- Workflow directory: `_bmad/bme/_vortex/workflows/pattern-mapping/`
- Steps directory: `_bmad/bme/_vortex/workflows/pattern-mapping/steps/`
- Output artifacts go to: `{output_folder}/vortex-artifacts/`
- Config file: `_bmad/bme/_vortex/config.yaml`
- All paths in step files use `{project-root}` variable

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 2.4, lines 486-503]
- [Source: _bmad-output/planning-artifacts/architecture.md — P17, P20, D4, D8, FR6, FR17-FR22, FR46, FR51, FR52]
- [Source: _bmad/bme/_vortex/workflows/research-convergence/ — Canonical sibling workflow (Story 2.2)]
- [Source: _bmad/bme/_vortex/workflows/pivot-resynthesis/ — Sibling workflow (Story 2.3)]
- [Source: _bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md — Primary input schema]
- [Source: _bmad/bme/_vortex/compass-routing-reference.md — Pattern-mapping routing table, line 205]
- [Source: _bmad-output/implementation-artifacts/2-2-create-research-convergence-workflow.md — Story 2.2 learnings]
- [Source: _bmad-output/implementation-artifacts/2-3-create-pivot-resynthesis-workflow.md — Story 2.3 learnings]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (claude-opus-4-6)

### Debug Log References

### Completion Notes List

### Change Log
- 2026-02-25: Story created by create-story workflow. Status: ready-for-dev.
- 2026-02-25: Quality review applied 13 fixes (4C, 3E, 5O, 1S): defined output artifact frontmatter schema (C3/S5/O2), operationalized two-mode input assessment for HC1 vs. non-HC1 (C2/C4/E2), added self-routing AC enforcement (C1/E1), added "When Pattern Mapping Helps" guidance (O1), added per-artifact analysis example requirement (O4), defined confidence levels numerically (O5/E3), specified A/P/C placement per step (O7), added minimum evidence guidance (O3), added integration note for Epic 5 awareness.
- 2026-02-25: Implementation complete — all 6 files created (1 workflow.md + 5 step files). All 8 tasks done. Status: review.
- 2026-02-25: Code review (adversarial) found 1H/4M/3L. Fixed H1 (tasks/file list not marked), M4 (Mila voice missing from step-05). M1 (cross-story git pollution) noted — not fixable in this story. M2 downgraded (top-level section name correct). Status: done.

### File List
| File | Action | ACs |
|------|--------|-----|
| `_bmad/bme/_vortex/workflows/pattern-mapping/workflow.md` | REPLACED placeholder | AC11 |
| `_bmad/bme/_vortex/workflows/pattern-mapping/steps/step-01-setup.md` | NEW | AC1, AC2, AC3 |
| `_bmad/bme/_vortex/workflows/pattern-mapping/steps/step-02-context.md` | NEW | AC1, AC2, AC4 |
| `_bmad/bme/_vortex/workflows/pattern-mapping/steps/step-03-pattern-identification.md` | NEW | AC1, AC2, AC5 |
| `_bmad/bme/_vortex/workflows/pattern-mapping/steps/step-04-theme-clustering.md` | NEW | AC1, AC2, AC5 |
| `_bmad/bme/_vortex/workflows/pattern-mapping/steps/step-05-synthesize.md` | NEW | AC1, AC2, AC6-AC10 |
