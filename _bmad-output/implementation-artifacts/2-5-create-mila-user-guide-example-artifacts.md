# Story 2.5: Create Mila User Guide & Example Artifacts

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a product discovery practitioner new to the Vortex,
I want a user guide explaining when and how to use Mila, plus example artifacts showing expected output format,
So that I understand Mila's role in the Vortex and what her output looks like.

## Acceptance Criteria

1. **AC1: User guide follows existing format (NFR19)**
   - **Given** the existing user guide format (ISLA-USER-GUIDE.md as structural reference)
   - **When** MILA-USER-GUIDE.md is created
   - **Then** it follows the same structural sections as ISLA-USER-GUIDE.md:
     - Quick Start (Who is Mila? / When to use Mila / What you'll get)
     - How to Invoke Mila (Method 1: Slash Command / Method 2: Direct Agent File Reading)
     - Mila's Menu Options (numbered list matching agent definition menu)
     - Workflows (one subsection per workflow with steps, output path, estimated time)
     - Mila's Philosophy section (principles from agent definition)
     - Chatting with Mila (CH) section with example questions
     - Troubleshooting (config error, workflow error)
     - Tips from Mila (3-4 tips in Mila's voice)
     - Credits (agent name, module, submodule, stream, version)

2. **AC2: "When to use this agent" positioning includes Mila vs. Emma distinction (FR43)**
   - **Given** the Quick Start section
   - **When** "When to use Mila" is documented
   - **Then** it includes a clear distinction: Mila synthesizes research into problem definitions (Synthesize stream); Emma contextualizes the strategic landscape (Contextualize stream)
   - **And** it explains: use Mila when you have research artifacts and need to define the problem; use Emma when you need to understand the broader context before research begins
   - **And** the positioning is clear enough that a practitioner new to Vortex can choose between them

3. **AC3: All 3 workflows documented with descriptions**
   - **Given** the Workflows section
   - **When** all workflows are listed
   - **Then** the following 3 workflows are documented:
     (a) [RC] Research Convergence — 5 steps, produces HC2 problem definition
     (b) [PR] Pivot Resynthesis — 5 steps, produces revised HC2 after failed experiments
     (c) [PA] Pattern Mapping — 5 steps, produces pattern analysis (NOT HC2)
   - **And** each workflow includes: step list (matching actual step file names), output path, estimated time
   - **And** step lists match the actual step files in `_bmad/bme/_vortex/workflows/{workflow-name}/steps/`

4. **AC4: Pivot re-synthesis use case explained (Journey 5)**
   - **Given** the user guide content
   - **When** the pivot re-synthesis workflow is documented
   - **Then** it explains the Journey 5 scenario: an experiment failed, Max says "pivot", and Mila re-synthesizes the problem definition incorporating new evidence from the failed experiment
   - **And** it explains how pivot-resynthesis differs from research-convergence: pivot-resynthesis revises an existing HC2 with new evidence; research-convergence creates a new HC2 from scratch

5. **AC5: Example HC2 artifact committed (FR44)**
   - **Given** the example artifacts requirement
   - **When** a sample HC2 problem definition is created
   - **Then** it is saved to `_bmad/bme/_vortex/examples/hc2-example-problem-definition.md`
   - **And** it has valid HC2 frontmatter: `contract: HC2`, `type: artifact`, `source_agent: mila`, `source_workflow: research-convergence`, `target_agents: [liam]`, `input_artifacts: [...]`, `created: YYYY-MM-DD`
   - **And** it has all 6 required HC2 body sections: Converged Problem Statement, Jobs-to-be-Done, Pains, Gains, Evidence Summary, Assumptions
   - **And** the content is a realistic, non-trivial example (not lorem ipsum) that demonstrates how a real HC2 artifact looks
   - **And** it demonstrates HC2 schema compliance per `_bmad/bme/_vortex/contracts/hc2-problem-definition.md`

6. **AC6: Guide saved to correct location**
   - **Given** the architecture specifies `_bmad/bme/_vortex/guides/` as the guide directory
   - **When** the user guide is created
   - **Then** it is saved to `_bmad/bme/_vortex/guides/MILA-USER-GUIDE.md`
   - **And** the `guides/` directory is created if it doesn't exist

7. **AC7: Lint passes**
   - **Given** all created files
   - **When** `npm run lint` runs
   - **Then** it passes clean
   - **Note:** Content-only story. Lint is a regression check.

## Tasks / Subtasks

- [x]**Task 1: Create guides/ directory and MILA-USER-GUIDE.md** (AC: 1, 2, 3, 4, 6)
  - [x]1.1 Create directory `_bmad/bme/_vortex/guides/` if it doesn't exist
  - [x]1.2 Create `MILA-USER-GUIDE.md` following ISLA-USER-GUIDE.md structure (NFR19)
  - [x]1.3 Write Quick Start section: Who is Mila (Research Convergence + Problem Definition Specialist), When to use Mila (6-8 bullet points covering synthesis, JTBD framing, Pains & Gains, pivot re-synthesis, pattern mapping, cross-source triangulation), What you'll get (problem definitions, pattern analyses)
  - [x]1.4 Write "When to use Mila" with explicit Mila vs. Emma distinction (AC2): Mila = synthesize research into problem definitions (Synthesize stream, post-research); Emma = contextualize strategic landscape (Contextualize stream, pre-research). Include decision aid: "If you have research artifacts → Mila. If you need to understand the broader context first → Emma."
  - [x]1.5 Write How to Invoke section: Method 1 slash command (`/bmad-agent-bme-research-convergence-specialist`), Method 2 direct file read (`_bmad/bme/_vortex/agents/research-convergence-specialist.md`)
  - [x]1.6 Write Menu Options section: list all menu items from `research-convergence-specialist.md` agent definition (MH, CH, RC, PR, PA, PM, DA)
  - [x]1.7 Write Workflows section with all 3 workflows (AC3):
    - [RC] Research Convergence: 5 steps (Setup & Input Validation, Context Loading & Analysis, Jobs-to-be-Done Framing, Pains & Gains Analysis, Synthesize & Route), output `{output_folder}/vortex-artifacts/hc2-problem-definition-{date}.md`, 60-120 minutes
    - [PR] Pivot Resynthesis: 5 steps (Setup & Input Validation, Context Loading & Analysis, JTBD Re-Framing, Pains & Gains Revision, Synthesize & Route), output `{output_folder}/vortex-artifacts/hc2-problem-definition-{date}.md`, 45-90 minutes
    - [PA] Pattern Mapping: 5 steps (Setup & Input Validation, Context Loading & Analysis, Pattern Identification, Theme Clustering, Synthesize & Route), output `{output_folder}/vortex-artifacts/pattern-analysis-{date}.md`, 30-60 minutes
  - [x]1.8 Include Journey 5 / Pivot Re-synthesis explanation (AC4): experiment failed → Max says "pivot" → Mila revises HC2 with new evidence from failed experiment → revised problem definition goes back to Liam
  - [x]1.9 Write Mila's Philosophy section using principles from agent definition: "Convergence over collection", "Jobs-to-be-Done framing turns observations into actionable problem statements", "Pains & Gains analysis reveals what users value vs. what they tolerate", "Cross-source triangulation — one data point is an anecdote, three are a pattern", "Problem definition is the highest-leverage activity in product discovery"
  - [x]1.10 Write Chatting with Mila section with example questions (e.g., "How do I frame a good JTBD statement?", "When should I use pattern mapping vs. full convergence?", "How many artifacts do I need for strong convergence?", "What if my research contradicts itself?")
  - [x]1.11 Write Troubleshooting section (config error, workflow error — same patterns as Isla guide)
  - [x]1.12 Write Tips from Mila section (3-4 tips in Mila's voice about synthesis, convergence, evidence-based problem definition)
  - [x]1.13 Write Credits section: Agent: Mila (research-convergence-specialist), Module: BMAD Enhanced (bme), Submodule: Vortex Pattern (_vortex), Stream: Synthesize (Stream 3), Version: 1.6.0

- [x]**Task 2: Create examples/ directory and HC2 example artifact** (AC: 5)
  - [x]2.1 Create directory `_bmad/bme/_vortex/examples/` if it doesn't exist
  - [x]2.2 Create `hc2-example-problem-definition.md` with valid HC2 frontmatter
  - [x]2.3 Write realistic Converged Problem Statement section (problem, confidence, scope)
  - [x]2.4 Write Jobs-to-be-Done section (primary JTBD with When/I want to/So I can, plus Functional/Emotional/Social jobs)
  - [x]2.5 Write Pains section with 3+ pains (description, priority, frequency, intensity, evidence sources, current coping)
  - [x]2.6 Write Gains section with 2+ gains (description, priority, expected impact, evidence sources)
  - [x]2.7 Write Evidence Summary section (artifacts analyzed, total evidence points, convergence assessment, contradictions, gaps)
  - [x]2.8 Write Assumptions section with 2+ assumptions (assumption, basis, risk if wrong, validation status)
  - [x]2.9 Verify all 6 body sections match HC2 contract schema at `_bmad/bme/_vortex/contracts/hc2-problem-definition.md`

- [x]**Task 3: Validate and lint** (AC: 7)
  - [x]3.1 Verify MILA-USER-GUIDE.md has all structural sections matching ISLA-USER-GUIDE.md (NFR19)
  - [x]3.2 Verify HC2 example frontmatter matches HC2 contract schema
  - [x]3.3 Verify HC2 example body sections match HC2 contract schema
  - [x]3.4 Verify workflow step lists in user guide match actual step file names
  - [x]3.5 Run `npm run lint` — expect clean pass (no JS changes)

## Dev Notes

### This is a Content-Only Story

No JavaScript files are modified. Deliverables are markdown files only:
- 1 user guide: `_bmad/bme/_vortex/guides/MILA-USER-GUIDE.md`
- 1 example artifact: `_bmad/bme/_vortex/examples/hc2-example-problem-definition.md`

All tests should pass unchanged. Run `npm run lint` as a regression check.

### Canonical Reference: ISLA-USER-GUIDE.md

Use `_bmad-output/vortex-artifacts/ISLA-USER-GUIDE.md` as the structural template. Follow the same sections in the same order. The key differences:
1. **Stream:** Synthesize (Stream 3), not Empathize (Stream 2)
2. **Workflows:** 3 workflows (RC, PR, PA) instead of 3 (EM, UI, UD)
3. **Philosophy:** Convergence principles instead of empathy principles
4. **Positioning:** Must explicitly distinguish Mila from Emma (both deal with "understanding the problem space" but from different angles)
5. **Invocation:** Different slash command and agent file path

### User Guide Location

The architecture (line 326) specifies `_bmad/bme/_vortex/guides/` as the target directory. This directory does not exist yet — it must be created. Existing user guides in `_bmad-output/vortex-artifacts/` are from v1.5.0 and serve as structural references only.

### Example Artifact Requirements

The HC2 example must be **realistic and non-trivial** — a product manager should be able to look at it and understand exactly what their research-convergence output should look like. Use a concrete domain (e.g., the "busy parents meal planning" theme used in step-file examples throughout Stories 2.2-2.4).

**HC2 Schema Reference:** `_bmad/bme/_vortex/contracts/hc2-problem-definition.md`

**Required frontmatter fields:** `contract: HC2`, `type: artifact`, `source_agent: mila`, `source_workflow: research-convergence`, `target_agents: [liam]`, `input_artifacts: [...]`, `created: YYYY-MM-DD`

**Required body sections (6):**
1. Converged Problem Statement (problem, confidence, scope)
2. Jobs-to-be-Done (primary JTBD + functional/emotional/social jobs)
3. Pains (prioritized table with evidence sources)
4. Gains (prioritized table with evidence sources)
5. Evidence Summary (artifacts, evidence points, convergence, contradictions, gaps)
6. Assumptions (table with basis, risk, validation status)

### Mila's Voice Guidelines

User guide tips and philosophy section must use Mila's established voice:
- **Warm but analytically precise** — convergence language
- **Key phrases:** "Here's what the research is telling us", "Three patterns converge on this insight", "One data point is an anecdote, three are a pattern", "The data shows...", "Problem definition is the highest-leverage activity in product discovery"
- **NEVER use Isla phrases:** "embrace ambiguity", "I noticed that..."
- **NEVER use Emma phrases:** "Let's frame this strategically"

### Mila vs. Emma Distinction (Critical for AC2)

| Aspect | Mila 🔬 (Synthesize) | Emma 🎯 (Contextualize) |
|--------|----------------------|------------------------|
| **Stream** | Synthesize (Stream 3) | Contextualize (Stream 1) |
| **When** | After research — you have artifacts to synthesize | Before research — you need strategic context |
| **Input** | HC1 empathy artifacts + any research | Business context, market landscape, strategic goals |
| **Output** | HC2 problem definition (JTBD + Pains & Gains) | Contextualization document (strategic framing) |
| **Focus** | What is the problem? (evidence-based) | What is the landscape? (strategy-based) |

### Pivot Re-Synthesis Explanation (Critical for AC4)

The Journey 5 flow:
1. Mila produces HC2 problem definition (research-convergence)
2. Liam generates hypotheses from HC2 → produces HC3 hypothesis contracts
3. Wade tests hypotheses → produces HC4 experiment context
4. Max evaluates results → says "pivot" (experiment failed, problem needs revision)
5. **Mila re-enters** via pivot-resynthesis: takes original HC1 artifacts + HC4 experiment evidence → produces revised HC2
6. Revised HC2 goes back to Liam for new hypotheses

### Learnings from Stories 2.2-2.4

1. **Contract paths:** Use `_bmad/bme/_vortex/contracts/` NOT `handoff-contracts/`
2. **Schema compliance:** Stay within HC2/HC1 defined enum values — don't invent new field values
3. **Voice consistency:** Mila's voice must be distinct from Isla and Emma
4. **Realistic examples:** Examples should use consistent domain themes across the Epic 2 deliverables

### Workflow Step File Verification

Before writing step lists in the user guide, verify actual step file names:

**Research Convergence steps:**
- `_bmad/bme/_vortex/workflows/research-convergence/steps/`

**Pivot Resynthesis steps:**
- `_bmad/bme/_vortex/workflows/pivot-resynthesis/steps/`

**Pattern Mapping steps:**
- `_bmad/bme/_vortex/workflows/pattern-mapping/steps/`

### Files to Create

| File | Change | Why |
|------|--------|-----|
| `_bmad/bme/_vortex/guides/MILA-USER-GUIDE.md` | **NEW** | AC1, AC2, AC3, AC4, AC6 |
| `_bmad/bme/_vortex/examples/hc2-example-problem-definition.md` | **NEW** | AC5 |

### Files NOT Changing

- `_bmad/bme/_vortex/agents/research-convergence-specialist.md` — Mila's agent definition (read-only reference)
- `_bmad/bme/_vortex/contracts/hc2-problem-definition.md` — HC2 schema (read-only reference)
- `_bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md` — HC1 schema (read-only reference)
- `_bmad/bme/_vortex/workflows/*/` — All workflow directories (read-only reference for step lists)
- `_bmad-output/vortex-artifacts/ISLA-USER-GUIDE.md` — Canonical structural reference (read-only)
- All JavaScript files — no code changes
- All test files — no test changes needed

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 2.5, lines 505-522]
- [Source: _bmad-output/planning-artifacts/architecture.md — FR43, FR44, NFR19, lines 326-328, 454-458]
- [Source: _bmad-output/vortex-artifacts/ISLA-USER-GUIDE.md — Canonical user guide structure]
- [Source: _bmad/bme/_vortex/agents/research-convergence-specialist.md — Mila's agent definition]
- [Source: _bmad/bme/_vortex/contracts/hc2-problem-definition.md — HC2 schema for example artifact]
- [Source: _bmad-output/implementation-artifacts/2-4-create-pattern-mapping-workflow.md — Previous story learnings]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (claude-opus-4-6)

### Debug Log References

### Completion Notes List

### Change Log
- 2026-02-25: Story created by create-story workflow. Status: ready-for-dev.
- 2026-02-25: Implementation complete — 2 files created (MILA-USER-GUIDE.md + hc2-example-problem-definition.md). All 3 tasks done. Status: review.
- 2026-02-25: Code review passed (0H/2M-downgraded/3L). All ACs verified. Status: done.

### File List
| File | Action | ACs |
|------|--------|-----|
| `_bmad/bme/_vortex/guides/MILA-USER-GUIDE.md` | NEW | AC1, AC2, AC3, AC4, AC6 |
| `_bmad/bme/_vortex/examples/hc2-example-problem-definition.md` | NEW | AC5 |
