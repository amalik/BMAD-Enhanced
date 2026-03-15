---
name: 'step-r-03-update'
description: 'Apply rescores to backlog, regenerate prioritized view, present completion summary'
outputFile: '{planning_artifacts}/initiatives-backlog.md'
templateFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/templates/backlog-format-spec.md'
workflowFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md'
---

# Step 3: Backlog Update, Safety & Completion

## STEP GOAL:

Validate backlog structure, apply rescored items in-place, regenerate the prioritized view, and present a completion summary before returning to the T/R/C menu.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:
- 🛑 NEVER generate content without user input at validation mismatch prompt
- 📖 CRITICAL: Read this complete step file before taking action
- 🔄 CRITICAL: When returning to menu, read the entire workflow file
- 📋 YOU ARE A BACKLOG OPERATIONS SPECIALIST performing safe, structured writes

### Role Reinforcement:
- ✅ You are a **backlog operations specialist** — precise, non-destructive, in-place updates only
- ✅ Preserve all existing content — never delete, overwrite, or reorder existing rows
- ✅ The Prioritized View is the ONLY section regenerated from scratch
- ✅ All output must be standard markdown — no HTML, no proprietary syntax

### Step-Specific Rules:
- 🎯 Focus on validation, safe in-place updates, and completion reporting
- 🚫 FORBIDDEN to delete or reorder existing backlog items (FR18, NFR1)
- 🚫 FORBIDDEN to add new items (that is Triage mode's job)
- 🚫 FORBIDDEN to modify items that were confirmed or skipped — only rescored items are updated
- 🚫 FORBIDDEN to modify step-r-01 or step-r-02
- 💬 Approach: validate first, update safely, summarize clearly

## EXECUTION PROTOCOLS:
- 🎯 Follow the MANDATORY SEQUENCE exactly
- 📖 Load `{templateFile}` (backlog-format-spec.md) for structural validation rules and table formats
- 💾 Write to `{outputFile}` only after validation passes (or user overrides)

## CONTEXT BOUNDARIES:
- Available context: Rescored items from step-r-02, existing backlog file, backlog format spec template
- Focus: Structural validation, safe in-place update, prioritized view regeneration, completion summary
- Limits: Do NOT rescore, re-extract, or add items
- Dependencies: step-r-02-rescore.md (rescored/confirmed/skipped results)

## MANDATORY SEQUENCE

**CRITICAL:** Follow this sequence exactly. Do not skip, reorder, or improvise.

### 1. Pre-Write Validation

Load `{outputFile}` (existing backlog) and validate structural integrity:

1. **Section heading anchors** — All 7 required H2 sections exist in correct order:
   - `## RICE Scoring Guide`
   - `## Backlog`
   - `## Exploration Candidates`
   - `## Epic Groupings`
   - `## Prioritized View (by RICE Score)`
   - `## Completed`
   - `## Change Log`
2. **Prioritized view table** — Has exactly 6 columns (Rank, #, Initiative, Score, Track, Category)
3. **Category tables** — Each table under `## Backlog` has exactly 10 columns (#, Initiative, Source, R, I, C, E, Score, Track, Status)
4. **Change Log section** — The `## Change Log` H2 section exists with a table

If ALL checks pass, proceed directly to step 3 (Apply Rescores).

### 2. Mismatch Handling

If ANY validation check fails, present the specific mismatch(es):

> **Pre-Write Validation — Structural Mismatch Detected**
>
> [List each failed check with details]
>
> **[Y] Yes, proceed anyway**
> **[X] Abort and return to menu**

**ALWAYS halt and wait for user input.**

- IF Y: Continue to step 3 (Apply Rescores)
- IF X: Display "Aborting backlog update." then load, read the entire file, and execute `{workflowFile}` to return to mode selection
- IF any other input: Display "Please select **Y** or **X**." then redisplay the prompt

### 3. Apply Rescores

For each rescored item from step-r-02:

1. **Find the item** — Locate the row in its category table under `## Backlog` by matching the item ID
2. **Update RICE scores** — Replace R, I, C, E, and composite Score values in the row
3. **Add rescore provenance** — Append to the Initiative description cell: `Rescored [old]->[new], Review, [date]` where [old] and [new] are the composite scores and [date] is the current session date (FR22)
4. **Preserve everything else** — Do not modify the item's title, source, track, status, or any other content

**Important:**
- Only update items that were actually rescored (composite score changed)
- Confirmed and skipped items remain completely unchanged — no provenance added
- Do NOT reorder rows within category tables

### 4. Regenerate Prioritized View

Rebuild the `## Prioritized View (by RICE Score)` table from scratch:

1. Collect ALL active items from all category tables (existing + rescored)
2. Exclude items with Status "Done" or items in the `## Completed` section
3. Sort by composite RICE score descending
4. Tiebreak: (1) Higher Confidence first, (2) Newer insertion order first
5. Generate sequential rank numbers starting at 1

Table format (6 columns):
```
| Rank | # | Initiative | Score | Track | Category |
|------|---|-----------|-------|-------|----------|
```

### 5. Add Changelog Entry

Prepend a new row to the `## Change Log` table (newest first):

```
| YYYY-MM-DD | Review: Rescored [N] items, confirmed [N], skipped [N]. |
```

### 6. Update Last Updated Date

Set the metadata header `Last Updated` field to the current date (YYYY-MM-DD format).

### 7. Completion Summary & Return to Menu

After successful write, display:

> **Review Complete**
>
> **Items rescored:** [N]
> **Items confirmed:** [N]
> **Items skipped:** [N]
> [If early exit: **Items unvisited:** [N]]
>
> **New Top 3 Positions:**
> 1. [#ID] [title] — Score: [X.X]
> 2. [#ID] [title] — Score: [X.X]
> 3. [#ID] [title] — Score: [X.X]

Then return to the T/R/C menu:

> Loading `{workflowFile}` to return to mode selection...

Load, read the entire file, and execute `{workflowFile}`.

## 🚨 SYSTEM SUCCESS/FAILURE METRICS:
### ✅ SUCCESS: Pre-write validation performed, only rescored items updated in-place with correct provenance, confirmed/skipped items untouched, prioritized view regenerated with all items sorted correctly, changelog updated, completion summary displayed with top 3, T/R/C menu re-presented
### ❌ SYSTEM FAILURE: Existing backlog content deleted/overwritten/reordered, confirmed or skipped items modified, provenance added to non-rescored items, items written without validation, prioritized view not regenerated, no completion summary, no return to menu
**Master Rule:** Skipping steps is FORBIDDEN.
