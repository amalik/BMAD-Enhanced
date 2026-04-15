---
name: 'step-r-02-rescore'
description: 'Walk lane items one at a time for RICE rescoring, lane-aware (Bug / Fast / Initiative)'
nextStepFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-r/step-r-03-update.md'
outputFile: '{planning_artifacts}/convoke-note-initiative-lifecycle-backlog.md'
templateFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/templates/rice-scoring-guide.md'
advancedElicitationTask: '{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.md'
partyModeWorkflow: '{project-root}/_bmad/core/workflows/bmad-party-mode/workflow.md'
---

# Step 2: Lane Walkthrough & Rescoring

## STEP GOAL:

Walk through the selected lane items one at a time, presenting current scores and lane-specific context (Bug status, Fast Lane RICE, Initiative stage + artifacts), and allow the user to rescore, confirm, or skip each item. Track all decisions for the update step.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:
- 🛑 NEVER generate content without user input at per-item prompts
- 📖 CRITICAL: Read this complete step file before taking action
- 🔄 CRITICAL: When loading next step with 'C', read the entire file
- 📋 YOU ARE A RESCORING ANALYST guiding calibrated score adjustments

### Role Reinforcement:
- ✅ You are a **rescoring analyst** — systematic, evidence-based, calibration-aware
- ✅ Present items faithfully with all current data — do not editorialize unless user invokes A
- ✅ The user decides what changes to make — you calculate, display, and record
- ✅ Lane-aware: bugs emphasize risk-vs-cost, Fast Lane emphasizes effort, Initiative Lane includes Stage + Artifacts context

### Step-Specific Rules:
- 🎯 Focus on per-item presentation, score adjustment, and decision tracking
- 🚫 FORBIDDEN to write to the backlog file (that is step-r-03's job)
- 🚫 FORBIDDEN to add new items (that is Triage mode's job)
- 🚫 FORBIDDEN to delete or promote/demote items between lanes (lane changes require separate qualification — noted for future item)
- 🚫 FORBIDDEN to auto-advance without user input — ALWAYS halt and wait
- 💬 Approach: present one item with its lane context, wait for decision, record result, advance

## EXECUTION PROTOCOLS:
- 🎯 Follow the MANDATORY SEQUENCE exactly
- 📖 Reference `{templateFile}` for RICE factor scales when user adjusts scores
- 💾 Track each item's decision: rescored (with old/new scores), confirmed, or skipped

## CONTEXT BOUNDARIES:
- Available context: `walk_scope` from step-r-01 (ordered list of lane items), RICE scoring guide
- Focus: Per-item walkthrough and rescoring only
- Limits: Do NOT write to backlog, do NOT change item lanes
- Dependencies: step-r-01-load.md (loaded items + scope)

## MANDATORY SEQUENCE

**CRITICAL:** Follow this sequence exactly. Do not skip, reorder, or improvise.

### 1. Initialize Walkthrough State

Set up tracking:
- `current_index` = 1
- `total_items` = count from `walk_scope`
- `rescored_items` = [] — items with changed composite score
- `confirmed_items` = [] — items explicitly confirmed or C'd without changes
- `skipped_items` = [] — items skipped

### 2. Present Current Item (Lane-Aware)

Display the current item with lane-specific context:

**If Bug Lane item:**

> **Item [current_index] of [total_items] — §2.2 Bug Lane**
>
> **[ID]: [Description]** — Score: [composite]
> R:[reach] I:[impact] C:[confidence]% E:[effort]
> *Status: [Open/In Fix/In Review/Shipped]*
> *Portfolio: [portfolio]*
> *Linked Follow-up: [fastLaneID or initiativeID, if any]*

**If Fast Lane item:**

> **Item [current_index] of [total_items] — §2.3 Fast Lane**
>
> **[ID]: [Description]** — Score: [composite]
> R:[reach] I:[impact] C:[confidence]% E:[effort]
> *Status: [Backlog/In Story/In Sprint/Shipped]*
> *Portfolio: [portfolio]*

**If Initiative Lane item:**

> **Item [current_index] of [total_items] — §2.4 Initiative Lane**
>
> **[ID]: [Description]** — Score: [composite]
> R:[reach] I:[impact] C:[confidence]% E:[effort]
> *Stage: [Qualified / In Pipeline / Ready / In Sprint / Done]*
> *Portfolio: [portfolio]*
> *Artifacts: [artifacts indicator, e.g., "D, P✓, A, IR, E" or "ADR only" or "—"]*

### 3. Present Per-Item Menu

Display:

> **Review this item:**
>
> **Score adjustments:**
> - `R [value]` — Change Reach (1-10)
> - `I [value]` — Change Impact (0.25, 0.5, 1, 2, or 3)
> - `CF [value]` — Change Confidence (20-100%)
> - `E [value]` — Change Effort (1-10)
>
> **Decisions:**
> - `K` — Keep/confirm current score
> - `S` — Skip this item (no review)
> - `X` — Exit walkthrough early
>
> **[A] Advanced Elicitation** — Deeper scoring analysis
> **[P] Party Mode** — Multi-perspective discussion
> **[C] Continue** — Apply changes and advance to next item
>
> *Note: Changing an item's lane, stage, portfolio, or status is NOT done in Review mode. If this item's lane no longer fits, raise a new intake via Triage mode.*

#### Menu Handling Logic:

- IF `R [value]`: Validate value is integer 1-10. Update Reach for current item. Recalculate composite: Score = (R × I × C) / E. Redisplay updated item scores and menu.
- IF `I [value]`: Validate value is one of 0.25, 0.5, 1, 2, or 3. Update Impact. Recalculate composite. Redisplay updated item scores and menu.
- IF `CF [value]`: Validate value is integer 20-100. Update Confidence. Recalculate composite. Redisplay updated item scores and menu.
- IF `E [value]`: Validate value is integer 1-10. Update Effort. Recalculate composite. Redisplay updated item scores and menu.
- IF K: Mark item as **confirmed**. Add to `confirmed_items`. Advance to next item (go to step 4).
- IF S: Mark item as **skipped**. Add to `skipped_items`. Advance to next item (go to step 4).
- IF X: Exit walkthrough early. Go to step 5.
- IF A: Execute `{advancedElicitationTask}` for deeper scoring analysis of this item. When finished, redisplay.
- IF P: Execute `{partyModeWorkflow}` for multi-perspective discussion. When finished, redisplay.
- IF C:
  - **If scores were changed:** Record old and new composite scores. Add to `rescored_items` with lane name, item ID, old R/I/C/E, new R/I/C/E, old composite, new composite. Advance.
  - **If NO scores were changed:** Treat as confirmed (same as K). Advance.
- IF any other input: Display "Unknown command. Use `R/I/CF/E [value]`, `K`, `S`, `X`, `A`, `P`, or `C`." then redisplay menu.

#### EXECUTION RULES:
- ALWAYS halt and wait for user input after presenting the menu
- After EVERY score adjustment, recalculate composite, redisplay the updated item scores AND the menu
- The user may make multiple adjustments before pressing C, K, S, or X
- Do NOT auto-advance — every item requires explicit user input

### 4. Advance to Next Item

Increment `current_index`.

- **If `current_index` <= `total_items`:** Go to step 2 (present next item).
- **If `current_index` > `total_items`:** All items reviewed. Go to step 5.

### 5. Walkthrough Complete — Pass Results to Update Step

Display walkthrough summary:

> **Walkthrough Complete**
>
> **Rescored:** [N] items
> **Confirmed:** [N] items
> **Skipped:** [N] items
> [If early exit: **Unvisited:** [N] items]
>
> **Rescored breakdown by lane:**
> - §2.2 Bug Lane: [n]
> - §2.3 Fast Lane: [n]
> - §2.4 Initiative Lane: [n]

Then load, read the entire file, and execute `{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-r/step-r-03-update.md`, passing:
- `rescored_items` (each with lane name, ID, old and new R/I/C/E, old and new composites)
- Counts of confirmed, skipped, and unvisited items

## 🚨 SYSTEM SUCCESS/FAILURE METRICS:
### ✅ SUCCESS: Each lane item presented with lane-specific context (status / stage / artifacts), user given per-item decision, score adjustments recalculated correctly, all decisions tracked by lane, results passed to step-r-03
### ❌ SYSTEM FAILURE: Items auto-advanced without input, lane context missing, scores not recalculated after adjustment, decisions not tracked, lane changes attempted, items modified in backlog file
**Master Rule:** Skipping steps is FORBIDDEN.
