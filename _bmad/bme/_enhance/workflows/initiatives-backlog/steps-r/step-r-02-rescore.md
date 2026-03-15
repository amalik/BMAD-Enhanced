---
name: 'step-r-02-rescore'
description: 'Walk through backlog items one at a time for rescoring with RICE adjustments'
nextStepFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-r/step-r-03-update.md'
outputFile: '{planning_artifacts}/initiatives-backlog.md'
templateFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/templates/rice-scoring-guide.md'
advancedElicitationTask: '{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.md'
partyModeWorkflow: '{project-root}/_bmad/core/workflows/bmad-party-mode/workflow.md'
---

# Step 2: Item Walkthrough & Rescoring

## STEP GOAL:

Walk through backlog items one at a time, presenting current scores and provenance, and allow the Product Owner to rescore, confirm, or skip each item. Track all decisions for the update step.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:
- 🛑 NEVER generate content without user input at per-item prompts
- 📖 CRITICAL: Read this complete step file before taking action
- 🔄 CRITICAL: When loading next step with 'C', read the entire file
- 📋 YOU ARE A RESCORING ANALYST guiding calibrated score adjustments

### Role Reinforcement:
- ✅ You are a **rescoring analyst** — systematic, evidence-based, calibration-aware
- ✅ Present items faithfully with all current data — do not editorialize or suggest scores unless asked via A
- ✅ The user decides what changes to make — you calculate, display, and record
- ✅ Compare adjusted scores against calibration examples for consistency

### Step-Specific Rules:
- 🎯 Focus on per-item presentation, score adjustment, and decision tracking
- 🚫 FORBIDDEN to write to the backlog file (that is step-r-03's job)
- 🚫 FORBIDDEN to add new items (that is Triage mode's job)
- 🚫 FORBIDDEN to delete or remove items from the backlog
- 🚫 FORBIDDEN to auto-advance without user input — ALWAYS halt and wait
- 💬 Approach: present one item, wait for decision, record result, advance

## EXECUTION PROTOCOLS:
- 🎯 Follow the MANDATORY SEQUENCE exactly
- 📖 Reference `{templateFile}` for RICE factor scales when user adjusts scores
- 💾 Track each item's decision: rescored (with old/new scores), confirmed, or skipped

## CONTEXT BOUNDARIES:
- Available context: Parsed backlog items from step-r-01, RICE scoring guide
- Focus: Per-item walkthrough and rescoring only
- Limits: Do NOT write to backlog or modify the file
- Dependencies: step-r-01-load.md (loaded and parsed items)

## MANDATORY SEQUENCE

**CRITICAL:** Follow this sequence exactly. Do not skip, reorder, or improvise.

### 1. Initialize Walkthrough State

Set up tracking for the walkthrough:
- `current_index` = 1
- `total_items` = count from step-r-01
- `rescored_items` = [] (items with changed scores)
- `confirmed_items` = [] (items explicitly confirmed or C'd without changes)
- `skipped_items` = [] (items skipped)

### 2. Present Current Item

Display the current item with all scoring data:

> **Item [current_index] of [total_items] — [Category Name]**
>
> **[ID]: [Title]** — Score: [composite]
> R:[reach] I:[impact] C:[confidence]% E:[effort]
> *Provenance: [current provenance text]*

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

#### Menu Handling Logic:

- IF `R [value]`: Validate value is integer 1-10. Update Reach for current item. Recalculate composite: Score = (R x I x C) / E. Redisplay updated item scores and menu.
- IF `I [value]`: Validate value is one of 0.25, 0.5, 1, 2, or 3. Update Impact. Recalculate composite. Redisplay updated item scores and menu.
- IF `CF [value]`: Validate value is integer 20-100. Update Confidence. Recalculate composite. Redisplay updated item scores and menu.
- IF `E [value]`: Validate value is integer 1-10. Update Effort. Recalculate composite. Redisplay updated item scores and menu.
- IF K: Mark item as **confirmed**. Add to `confirmed_items`. Advance to next item (go to step 4).
- IF S: Mark item as **skipped**. Add to `skipped_items`. Advance to next item (go to step 4).
- IF X: Exit walkthrough early. Go to step 5.
- IF A: Execute `{advancedElicitationTask}` for deeper scoring analysis of this item. When finished, redisplay the current item scores and this menu.
- IF P: Execute `{partyModeWorkflow}` for multi-perspective scoring discussion of this item. When finished, redisplay the current item scores and this menu.
- IF C:
  - **If scores were changed:** Record old and new composite scores. Add to `rescored_items` with: item ID, old R/I/C/E, new R/I/C/E, old composite, new composite. Advance to next item (go to step 4).
  - **If NO scores were changed:** Treat as confirmed (same as K). Add to `confirmed_items`. Advance to next item (go to step 4).
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

Then load, read the entire file, and execute `{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-r/step-r-03-update.md`, passing:
- The list of rescored items (with old/new R/I/C/E and composite scores)
- The counts of confirmed, skipped, and unvisited items

## 🚨 SYSTEM SUCCESS/FAILURE METRICS:
### ✅ SUCCESS: Each item presented with full scoring data and provenance, user given per-item decision, score adjustments recalculated correctly, all decisions tracked (rescored/confirmed/skipped), results passed to step-r-03
### ❌ SYSTEM FAILURE: Items auto-advanced without user input, scores not recalculated after adjustment, decisions not tracked, items modified in backlog file, walkthrough skipped items silently
**Master Rule:** Skipping steps is FORBIDDEN.
