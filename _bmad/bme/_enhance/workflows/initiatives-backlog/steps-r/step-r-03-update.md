---
name: 'step-r-03-update'
description: 'Apply rescores in-place to lane tables, re-sort touched lanes, update Change Log, present completion summary'
outputFile: '{planning_artifacts}/convoke-note-initiative-lifecycle-backlog.md'
templateFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/templates/backlog-format-spec.md'
workflowFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md'
---

# Step 3: Backlog Update — Apply Rescores Lane-Aware

## STEP GOAL:

Validate backlog structure, apply rescored items in-place in their lane tables (§2.2 Bug / §2.3 Fast / §2.4 Initiative), re-sort only the lanes that were touched, update the Change Log, and present a completion summary before returning to the T/R/C menu.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:
- 🛑 NEVER generate content without user input at validation mismatch prompt
- 📖 CRITICAL: Read this complete step file before taking action
- 🔄 CRITICAL: When returning to menu, read the entire workflow file
- 📋 YOU ARE A BACKLOG OPERATIONS SPECIALIST performing safe, structured writes

### Role Reinforcement:
- ✅ You are a **backlog operations specialist** — precise, non-destructive, in-place updates only
- ✅ Preserve all existing content outside of the rescored rows and the sort order of their lanes
- ✅ **Part 1 (Lifecycle Process) must not be modified** — it's semi-static documentation
- ✅ **§2.1 Intakes and §2.5 Absorbed must not be modified** — Review does not touch them
- ✅ Re-sort only the touched lanes — untouched lanes keep their current row order

### Step-Specific Rules:
- 🎯 Focus on validation, safe in-place updates, lane-specific re-sort, and completion reporting
- 🚫 FORBIDDEN to delete or add rows (add = Triage, remove = Absorb via separate flow)
- 🚫 FORBIDDEN to modify items that were confirmed or skipped
- 🚫 FORBIDDEN to change items' lane / portfolio / stage / status (Review only rescores RICE)
- 🚫 FORBIDDEN to modify Part 1, §2.1, or §2.5
- 💬 Approach: validate first, update rescored rows in-place, re-sort touched lanes, summarize

## EXECUTION PROTOCOLS:
- 🎯 Follow the MANDATORY SEQUENCE exactly
- 📖 Load `{templateFile}` (backlog-format-spec.md) for structural validation rules and table formats
- 💾 Write to `{outputFile}` only after validation passes (or user overrides)

## CONTEXT BOUNDARIES:
- Available context: `rescored_items` from step-r-02 (with lane, ID, old+new scores), existing backlog, format spec
- Focus: Structural validation, in-place update, per-lane re-sort, Change Log, completion summary
- Limits: Do NOT rescore, re-extract, add items, or change lane metadata
- Dependencies: step-r-02-rescore.md (rescored + confirmed + skipped results)

## MANDATORY SEQUENCE

**CRITICAL:** Follow this sequence exactly. Do not skip, reorder, or improvise.

### 1. Pre-Write Validation

Load `{outputFile}` and validate per format spec:

1. **Frontmatter present**
2. **Part 1 anchor exists** (not inspected for content)
3. **Part 2 H3 anchors** — `### 2.1` through `### 2.5` in correct order
4. **Lane table column counts** — Bug (10), Fast (9), Initiative (10)
5. **Change Log section** — `## Change Log` H2 exists

If ALL checks pass, proceed to step 3.

### 2. Mismatch Handling

If ANY validation check fails:

> **Pre-Write Validation — Structural Mismatch Detected**
>
> [List each failed check]
>
> **[Y] Yes, proceed anyway**
> **[X] Abort and return to menu**

**ALWAYS halt and wait.**

- IF Y: Continue to step 3.
- IF X: Display "Aborting backlog update." then load, read, and execute `{workflowFile}`.
- IF any other input: Display "Please select **Y** or **X**." then redisplay.

### 3. Apply Rescores In-Place

For each item in `rescored_items`:

1. **Find the item** — Locate the row in the correct lane table (§2.2 / 2.3 / 2.4) by matching the item ID.
2. **Update RICE columns** — Replace R, I, C, E, and composite Score values in the row.
3. **Preserve everything else** — Do not modify Description, Portfolio, Status, Stage, Artifacts, Linked Follow-up, or any non-RICE column.
4. **Optional rescore provenance** — If the Description cell has capacity, append a subtle note: ` [rescored YYYY-MM-DD: X.X→Y.Y]`. Skip if the cell would exceed readable length.

**Important:**
- Only update items whose composite score actually changed.
- Confirmed and skipped items remain completely unchanged — no modification, no note.
- Do NOT modify rows not in `rescored_items`.

### 4. Re-Sort Touched Lanes

For each lane that had at least one rescored item:

1. Collect all rows in that lane's table.
2. Sort by composite RICE score **descending**.
3. Tiebreak: (1) Confidence higher first, (2) insertion order newer first.
4. Rewrite the lane's table body with the sorted rows.

**Do NOT re-sort lanes that were not touched** — preserve their current order. This keeps `git diff` minimal for lanes the session didn't review.

### 5. Add Change Log Entry

Prepend a new row to `## Change Log`:

```
| YYYY-MM-DD | Review: Rescored [N] items — Bug: [n], Fast: [n], Initiative: [n]. Confirmed: [N], skipped: [N][, unvisited: N]. Lanes re-sorted: [list]. |
```

### 6. Update Frontmatter

- Do NOT modify the `created` date.
- Frontmatter `status` stays as-is (typically `active`).

### 7. Completion Summary & Return to Menu

After successful write, display:

> **Review Complete**
>
> **Items rescored:** [N]
>   - §2.2 Bug Lane: [n]
>   - §2.3 Fast Lane: [n]
>   - §2.4 Initiative Lane: [n]
> **Confirmed:** [N]
> **Skipped:** [N]
> [If early exit: **Unvisited:** [N]]
>
> **Lanes re-sorted:** [list, e.g., "Fast Lane, Initiative Lane"]
>
> **Top 3 across touched lanes (post-sort):**
> 1. [#ID] [title] — Score: [X.X] — Lane: [lane]
> 2. [#ID] [title] — Score: [X.X] — Lane: [lane]
> 3. [#ID] [title] — Score: [X.X] — Lane: [lane]

Then return to the T/R/C menu:

> Loading `{workflowFile}` to return to mode selection...

Load, read the entire file, and execute `{workflowFile}`.

## 🚨 SYSTEM SUCCESS/FAILURE METRICS:
### ✅ SUCCESS: Validation performed, only rescored items updated in-place with RICE changes, confirmed/skipped items untouched, only touched lanes re-sorted (untouched lanes preserved), Part 1 / §2.1 / §2.5 untouched, Change Log updated with per-lane counts, completion summary displayed, menu re-presented
### ❌ SYSTEM FAILURE: Rows added or removed, items' lane/stage/status modified, Part 1 or §2.1 or §2.5 altered, untouched lanes re-sorted unnecessarily, Change Log missing lane breakdown, provenance added to confirmed/skipped items
**Master Rule:** Skipping steps is FORBIDDEN.
