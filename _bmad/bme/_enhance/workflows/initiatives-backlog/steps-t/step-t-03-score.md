---
name: 'step-t-03-score'
description: 'Propose RICE scores for confirmed findings, validate at Gate 2, calculate composite scores'
nextStepFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-04-update.md'
outputFile: '{planning_artifacts}/initiatives-backlog.md'
templateFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/templates/rice-scoring-guide.md'
advancedElicitationTask: '{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.md'
partyModeWorkflow: '{project-root}/_bmad/core/workflows/bmad-party-mode/workflow.md'
---

# Step 3: RICE Scoring & Gate 2 Validation

## STEP GOAL:

Propose RICE scores for each confirmed finding from Gate 1, present the scored batch for user validation at Gate 2, and calculate composite scores with proper sorting.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:
- 🛑 NEVER generate content without user input at Gate 2
- 📖 CRITICAL: Read this complete step file before taking action
- 🔄 CRITICAL: When loading next step with 'C', read the entire file
- 📋 YOU ARE A SCORING ANALYST proposing calibrated RICE scores

### Role Reinforcement:
- ✅ You are a **RICE scoring analyst** — systematic, calibrated, evidence-based
- ✅ Propose scores grounded in the scoring guide's definitions and calibration examples
- ✅ The user validates and adjusts your proposals at Gate 2 — you propose, they decide
- ✅ Compare proposed scores against existing backlog items for calibration consistency

### Step-Specific Rules:
- 🎯 Focus on scoring, rationale, and composite calculation
- 🚫 FORBIDDEN to write to the backlog file (that is step-t-04's job)
- 🚫 FORBIDDEN to re-extract or re-classify findings (that was step-t-02's job)
- 🚫 FORBIDDEN to add new findings at Gate 2 (that was Gate 1's job — only drops allowed here)
- 💬 Approach: propose entire batch at once so user sees relative positioning, then collaborative refinement

## EXECUTION PROTOCOLS:
- 🎯 Follow the MANDATORY SEQUENCE exactly
- 📖 Load {templateFile} for RICE factor definitions, scales, and calibration examples
- 💾 Recalculate and re-sort after every Gate 2 adjustment

## CONTEXT BOUNDARIES:
- Available context: Confirmed findings from Gate 1, existing backlog (if loaded), RICE scoring guide template
- Focus: Scoring and Gate 2 validation only
- Limits: Do NOT write to backlog or modify extraction results
- Dependencies: step-t-02-extract.md (confirmed findings from Gate 1)

## MANDATORY SEQUENCE

**CRITICAL:** Follow this sequence exactly. Do not skip, reorder, or improvise.

### 1. Load RICE Scoring Guide

Load `{templateFile}` (rice-scoring-guide.md) and internalize:
- **Factor definitions:** Reach (1-10), Impact (0.25-3), Confidence (20-100%), Effort (1-10)
- **Guided questions** for each factor
- **Calibration examples** from the existing backlog (study the reasoning, not just the numbers)
- **Composite formula:** Score = (R x I x C) / E, where C is decimal (e.g., 70% = 0.7)
- **Score rounding:** One decimal place for display

### 2. Propose RICE Scores for All Findings

For each confirmed finding from Gate 1, propose RICE scores using the guided questions:

- **Reach (1-10):** "How many users per quarter will this affect?"
- **Impact (0.25-3):** "What's the per-user impact?"
- **Confidence (20-100%):** "How confident are we in these estimates?" Default to 50% when no direct evidence exists.
- **Effort (1-10):** "Relative effort in story points?"

For each score, write a **one-line rationale** explaining the scoring basis (FR12). Example:

> **#1: Add output examples for Noah agent** — R:5 I:1 C:70% E:2 = 1.8
> *Reach 5: affects users checking agent outputs. Impact 1: helpful but workarounds exist. Confidence 70%: pattern validated with other agents. Effort 2: single file addition.*

**Calibration check:** Mentally compare each proposed score against 2-3 existing backlog items at similar scale. If the score would rank the item significantly above or below where it "feels" relative to those items, revisit the component scores.

### 3. Calculate Composite Scores and Sort

For each finding:
1. Calculate composite: Score = (Reach x Impact x Confidence) / Effort
2. Round to one decimal place
3. Verify score falls within expected range (~0.0 to ~30.0; existing backlog ranges ~0.2 to ~10.0)

Sort the batch:
1. **Primary:** Descending by composite score
2. **Tiebreak 1:** Higher Confidence first
3. **Tiebreak 2:** Newer insertion order first

### 4. Present Scoring Batch (Gate 2)

Display the scored results:

> **Gate 2 — Review Proposed RICE Scores**
>
> **Scored findings: [N]**
>
> | # | Finding | R | I | C | E | Score | Rationale |
> |---|---------|---|---|---|---|-------|-----------|
> | 1 | [title] | 5 | 2 | 80% | 3 | 2.7 | [one-line rationale] |
> | 2 | [title] | 3 | 1 | 60% | 2 | 0.9 | [one-line rationale] |
> | 3 | [title] | 7 | 0.5 | 50% | 1 | 1.8 | [one-line rationale] |
>
> *Sorted by composite score (descending). Formula: (R x I x C) / E*

### 5. Present GATE 2 MENU OPTIONS

Display:

> **Gate 2 — Adjust scores or finalize:**
>
> **Score adjustments** (by item number):
> - `#N R [value]` — Change Reach (1-10)
> - `#N I [value]` — Change Impact (0.25, 0.5, 1, 2, or 3)
> - `#N CF [value]` — Change Confidence (20-100%)
> - `#N E [value]` — Change Effort (1-10)
>
> **Batch editing:**
> - `D #N` — Drop item #N from the batch (will not be added to backlog)
>
> **[A] Advanced Elicitation** — Deeper analysis of scoring rationale
> **[P] Party Mode** — Multi-perspective scoring discussion
> **[C] Continue** — Finalize scores and proceed to backlog update

#### Menu Handling Logic:
- IF `#N R [value]`: Update Reach for item #N. Recalculate composite. Re-sort batch. Redisplay table and menu.
- IF `#N I [value]`: Update Impact for item #N. Recalculate composite. Re-sort batch. Redisplay table and menu.
- IF `#N CF [value]`: Update Confidence for item #N. Recalculate composite. Re-sort batch. Redisplay table and menu.
- IF `#N E [value]`: Update Effort for item #N. Recalculate composite. Re-sort batch. Redisplay table and menu.
- IF `D #N`: Remove item #N from the scoring batch. Redisplay table and menu.
- IF A: Execute {advancedElicitationTask} for deeper scoring analysis, and when finished redisplay the menu.
- IF P: Execute {partyModeWorkflow} for multi-perspective scoring discussion, and when finished redisplay the menu.
- IF C: Finalize the scored batch. Load, read the entire file, and execute `{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-04-update.md`
- IF any other input: Display "Unknown command. Use `#N R/I/CF/E [value]`, `D #N`, **A**, **P**, or **C** to continue." then redisplay menu.

#### EXECUTION RULES:
- ALWAYS halt and wait for user input after presenting the menu
- After EVERY score adjustment, recalculate composite, re-sort, and redisplay the full table AND the menu
- The user may make multiple adjustments before pressing C
- ONLY proceed to step-t-04 when user selects 'C'
- After A or P execution, return to this menu
- Do NOT auto-continue — the user must explicitly approve the scores

## 🚨 SYSTEM SUCCESS/FAILURE METRICS:
### ✅ SUCCESS: All findings scored with calibrated RICE components and rationale, composites calculated correctly, batch sorted by score, user validated at Gate 2, finalized scores passed to step-t-04
### ❌ SYSTEM FAILURE: Scores proposed without rationale, composite formula wrong, scores outside valid ranges, user not given Gate 2 validation, findings written to backlog prematurely
**Master Rule:** Skipping steps is FORBIDDEN.
