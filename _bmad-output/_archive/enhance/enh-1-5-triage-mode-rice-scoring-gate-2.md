# Story 1.5: Triage Mode — RICE Scoring & Gate 2 Validation

Status: done

## Story

As a Product Owner,
I want the workflow to propose RICE scores for confirmed findings and let me adjust them,
So that every new backlog item has a calibrated priority score before being added.

## Acceptance Criteria

1. **Given** Gate 1 validation is complete with confirmed findings **When** the workflow enters the scoring phase **Then** it loads the RICE scoring guide template for calibration reference (FR16) **And** proposes RICE scores (Reach, Impact, Confidence, Effort) for each confirmed finding in batch (FR11) **And** presents each score with a one-line rationale explaining the scoring basis (FR12)

2. **Given** the scoring batch is presented (Gate 2) **When** the Product Owner reviews it **Then** they can adjust individual RICE component scores by item number (e.g., "change #4's Confidence from 3 to 2") without re-reviewing the full batch (FR13) **And** they can drop items from the scoring batch without returning to Gate 1 (FR14)

3. **Given** scores are finalized **When** composite scores are calculated **Then** they use the formula R x I x C / E, sorted descending, ties broken by Confidence (higher first) then insertion order (newer first) (FR15) **And** scores conform to the range derived from the scoring guide's defined scales (FR17)

## Tasks / Subtasks

- [x] Task 1: Author `step-t-03-score.md` — RICE Scoring & Gate 2 Validation (AC: 1, 2, 3)
  - [x] 1.1 Create step file with BMAD step frontmatter (name, description, nextStepFile, outputFile, templateFile for rice-scoring-guide.md)
  - [x] 1.2 MANDATORY EXECUTION RULES section with scoring analyst role
  - [x] 1.3 MANDATORY SEQUENCE part 1 — Load RICE Scoring Guide: Load rice-scoring-guide.md template for factor definitions, scales, guided questions, and calibration examples
  - [x] 1.4 MANDATORY SEQUENCE part 2 — Propose Scores: For each confirmed finding from Gate 1, propose R/I/C/E scores using guided questions, include one-line rationale per score
  - [x] 1.5 MANDATORY SEQUENCE part 3 — Calculate Composites: Compute composite score = (R x I x C) / E, sort descending, tiebreak by Confidence then insertion order
  - [x] 1.6 MANDATORY SEQUENCE part 4 — Gate 2 Presentation: Present scoring batch as table with item number, title, R, I, C, E, composite score, and rationale
  - [x] 1.7 Gate 2 Menu: command-based editing by item number for score adjustments, [D #N] Drop item from batch, [C] Continue to backlog update
  - [x] 1.8 Gate 2 handling: process adjustments, recalculate composites, re-sort, redisplay updated batch, halt and wait after each action
  - [x] 1.9 On C: pass scored findings to step-t-04-update.md

## Dev Notes

### This Story is Content-Only — No JavaScript

Story 1.5 creates **one markdown step file** in `steps-t/`. No JavaScript, no tests, no installer changes.

### File to Create

**`_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-03-score.md`** — RICE scoring and Gate 2 validation step

### Step File Frontmatter Pattern

```yaml
---
name: 'step-t-03-score'
description: 'Propose RICE scores for confirmed findings, validate at Gate 2, calculate composite scores'
nextStepFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-04-update.md'
outputFile: '{planning_artifacts}/initiatives-backlog.md'
templateFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/templates/rice-scoring-guide.md'
advancedElicitationTask: '{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.md'
partyModeWorkflow: '{project-root}/_bmad/core/workflows/bmad-party-mode/workflow.md'
---
```

Note: `templateFile` points to `rice-scoring-guide.md` (not `backlog-format-spec.md` which was used by step-t-02). The scoring guide contains factor definitions, scales, guided questions, and calibration examples. `advancedElicitationTask` and `partyModeWorkflow` are required for A/P menu routing (Type 4 step pattern).

### Step Type Classification

- **step-t-03-score.md** = Type 4 "Middle Step (Standard)" with A/P menu — collaborative content refinement with Gate 2 validation

This step **should include A/P options** because scoring is a collaborative refinement activity where the user might want alternatives or deeper analysis (per menu-handling-standards "DO Include A/P" criteria: collaborative content creation, user might want alternatives, quality gate before proceeding).

### RICE Scoring Engine (from Architecture)

| Factor | Scale | Guided Question |
|--------|-------|-----------------|
| **Reach** | 1-10 | "How many users per quarter will this affect? (10 = all users, 1 = edge case)" |
| **Impact** | 0.25-3 | "What's the per-user impact? (3 = massive, 2 = high, 1 = medium, 0.5 = low, 0.25 = minimal)" |
| **Confidence** | 20-100% | "How confident are we in these estimates? (100% = measured data, 50% = educated guess, 20% = speculation)" |
| **Effort** | 1-10 | "Relative effort in story points? (1 = trivial, 10 = multi-epic)" |

**Formula:** Score = (Reach x Impact x Confidence) / Effort
- Confidence expressed as decimal (e.g., 70% = 0.7)
- Composite rounded to one decimal place

**Sort order:** Descending by composite score.
**Tiebreak:** (1) Higher Confidence first, (2) Newer insertion order first.

### Score Range Conformance (FR17)

Scores must land within the range derivable from the defined scales:
- Minimum possible: (1 x 0.25 x 0.2) / 10 = 0.005 (~0.0)
- Maximum possible: (10 x 3 x 1.0) / 1 = 30.0
- Existing backlog scores range from ~0.2 to ~10.0

The scoring guide's calibration examples provide anchoring points — the LLM should mentally compare proposed scores against 2-3 existing items at similar scale.

### Gate 2 User Actions (FR13-FR14)

Gate 2 uses **command-based editing by item number**, matching the Gate 1 pattern from Story 1.4.

**Score adjustment commands (FR13):**
- `#N R [value]` — Change Reach score for item #N
- `#N I [value]` — Change Impact score for item #N
- `#N CF [value]` — Change Confidence score for item #N (as percentage, e.g., `#3 CF 80%`). Uses `CF` (not `C`) to avoid ambiguity with the `C` Continue command.
- `#N E [value]` — Change Effort score for item #N

**Batch editing commands:**
- `D #N` — Drop item #N from the scoring batch without returning to Gate 1 (FR14)
- `A` — Advanced Elicitation: deeper analysis of scoring rationale for specific items
- `P` — Party Mode: multi-perspective scoring discussion
- `C` — Finalize scores and continue to backlog update (step-t-04)

After each adjustment:
1. Recalculate composite score for the affected item
2. Re-sort the batch by composite score (descending)
3. Redisplay the updated scoring table
4. Halt and wait for next input

### One-Line Rationale (FR12)

Each proposed score must include a brief rationale explaining the scoring basis. Format:

> **#1: Add output examples for Noah agent** — R:5 I:1 C:70% E:2 = 1.8
> *Reach 5: affects users checking agent outputs. Impact 1: helpful but workarounds exist. Confidence 70%: pattern validated with other agents. Effort 2: single file addition.*

### Scoring Approach

The LLM proposes scores for the **entire batch at once** (not one item at a time). This lets the user see relative positioning across all items before making adjustments. The batch presentation includes all items sorted by composite score.

### What NOT to Do

- Do NOT create `step-t-04-update.md` — that's Story 1.6
- Do NOT write to the backlog file — that's Story 1.6
- Do NOT modify `step-t-02-extract.md` — it already chains to step-t-03 correctly
- Do NOT modify any JavaScript files — this is pure markdown content
- Do NOT re-implement Gate 1 logic — findings are already confirmed
- Do NOT use `+` for adding items at Gate 2 — items can only be dropped (FR14), not added (that was Gate 1's job)

### PRD Deviations — Intentional

None. Story 1.5 follows the PRD and architecture exactly.

### Previous Story Intelligence (from Stories 1.3 and 1.4)

**Key learnings:**
- step-t-02-extract.md chains to step-t-03-score.md via `nextStepFile` — the file must exist at exactly `{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-03-score.md`
- Gate 1 used command-based editing (merge/skip/new #N, E #N, + text, R #N, C) — Gate 2 should follow the same command-based pattern for consistency
- BMAD reserved letter A is used for Advanced Elicitation — at Gate 2 this is appropriate (unlike Gate 1 which is pure validation, Gate 2 is collaborative refinement)
- Step files follow BMAD convention: frontmatter → STEP GOAL → MANDATORY EXECUTION RULES → EXECUTION PROTOCOLS → CONTEXT BOUNDARIES → MANDATORY SEQUENCE → SUCCESS/FAILURE METRICS
- Templates `rice-scoring-guide.md` and `backlog-format-spec.md` exist in `templates/` (from Story 1.1)
- Confirmed findings from Gate 1 include: number, title, category, source ref, type — step-t-03 adds RICE scores to this data
- Zero findings case is handled in step-t-02 (never reaches step-t-03)

### Step Size Guidelines (from step-type-patterns.md)

| Type | Recommended | Maximum |
|------|-------------|---------|
| Middle (complex) — step-t-03 | < 200 lines | 250 |

If step-t-03-score exceeds 250 lines, extract scoring engine details to a `data/` file.

### Project Structure Notes

- Step files: `_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/`
- Templates: `_bmad/bme/_enhance/workflows/initiatives-backlog/templates/`
- Output artifact: `{planning_artifacts}/initiatives-backlog.md`
- RICE scoring guide: `templates/rice-scoring-guide.md`
- Backlog format spec: `templates/backlog-format-spec.md`

### References

- [Source: _bmad-output/planning-artifacts/prd-p4-enhance-module.md — FR11-FR17]
- [Source: _bmad-output/planning-artifacts/epics-p4-enhance-module.md — Story 1.5 ACs]
- [Source: _bmad-output/planning-artifacts/P4-enhance-module-architecture.md — RICE scoring engine, Triage step chain]
- [Source: _bmad/bme/_enhance/workflows/initiatives-backlog/templates/rice-scoring-guide.md — factor definitions, scales, calibration examples]
- [Source: _bmad/bme/_enhance/workflows/initiatives-backlog/templates/backlog-format-spec.md — composite formula, sort order, tiebreaking]
- [Source: _bmad/bmb/workflows/workflow/data/step-type-patterns.md — step file structure patterns]
- [Source: _bmad/bmb/workflows/workflow/data/menu-handling-standards.md — A/P/C menu pattern]
- [Source: _bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-02-extract.md — Gate 1 output format, nextStepFile chain]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Debug Log References
N/A — content-only story, no debugging required

### Completion Notes List
- One step file created in `steps-t/` directory
- step-t-03-score.md (131 lines): Type 4 standard step with A/P — RICE scoring with guided questions, composite calculation, Gate 2 validation
- Frontmatter includes advancedElicitationTask and partyModeWorkflow for A/P routing
- Gate 2 uses command-based score adjustments (#N R/I/CF/E [value]) — CF for Confidence avoids ambiguity with C Continue
- D #N for dropping items at Gate 2 without returning to Gate 1 (FR14)
- One-line rationale for each proposed score (FR12)
- Calibration check against existing backlog items included in scoring guidance
- Composite formula, rounding, sort order, and tiebreaking all match rice-scoring-guide.md
- No JavaScript, no tests — content-only as specified

### File List
- `_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-03-score.md` — RICE scoring and Gate 2 validation step (new)

### Change Log
- Created step-t-03-score.md: BMAD Type 4 standard step with A/P menu for RICE scoring, composite calculation, and Gate 2 validation with command-based adjustments

### Senior Developer Review (AI)
- **Reviewer:** Claude Opus 4.6 (adversarial code review)
- **Date:** 2026-03-15
- **Outcome:** Clean review — no issues found
- **All 3 ACs verified against actual file content**
- **All 9 subtasks confirmed complete**
- **BMAD Type 4 conventions verified (frontmatter with A/P refs, MANDATORY EXECUTION RULES, MANDATORY SEQUENCE, menu handling)**
- **CF disambiguation for Confidence vs Continue confirmed**
- **Step chain integrity verified: step-t-02 → step-t-03 → step-t-04 (Story 1.6)**
