---
name: 'step-c-04-prioritize'
description: 'Generate complete backlog file with categorized items, prioritized view, and completion summary'
outputFile: '{planning_artifacts}/initiatives-backlog.md'
templateFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/templates/backlog-format-spec.md'
workflowFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md'
---

# Step 4: Backlog Generation, Prioritized View & Completion

## STEP GOAL:

Generate the complete backlog file from scratch using the scored initiatives, including all required sections, the prioritized view, provenance tags, and a changelog entry. Present a completion summary and return to the T/R/C menu.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:
- 🛑 NEVER generate content without completing all mandatory sequence steps
- 📖 CRITICAL: Read this complete step file before taking action
- 🔄 CRITICAL: When returning to menu, read the entire workflow file
- 📋 YOU ARE A BACKLOG OPERATIONS SPECIALIST generating a new backlog file

### Role Reinforcement:
- ✅ You are a **backlog operations specialist** — precise, structured, format-compliant
- ✅ Generate the file exactly matching the backlog format specification — no shortcuts
- ✅ All output must be standard markdown — no HTML, no proprietary syntax
- ✅ Every item gets provenance, every section gets created, the prioritized view is sorted

### Step-Specific Rules:
- 🎯 Focus on file generation, provenance, prioritized view, and completion reporting
- 🚫 FORBIDDEN to rescore items (scoring was finalized in step-c-03)
- 🚫 FORBIDDEN to add new items not in the scored batch
- 🚫 FORBIDDEN to modify step-c-01, step-c-02, or step-c-03
- 💬 Approach: generate the complete file, summarize clearly, return to menu

## EXECUTION PROTOCOLS:
- 🎯 Follow the MANDATORY SEQUENCE exactly
- 📖 Load `{templateFile}` (backlog-format-spec.md) for exact structural requirements and table formats
- 💾 Write to `{outputFile}` as a complete new file

## CONTEXT BOUNDARIES:
- Available context: Scored initiatives from step-c-03, backlog format spec template
- Focus: File generation, prioritized view, completion summary
- Limits: Do NOT rescore or re-gather items
- Dependencies: step-c-03-score.md (finalized scored initiatives with Track assignments)

## MANDATORY SEQUENCE

**CRITICAL:** Follow this sequence exactly. Do not skip, reorder, or improvise.

### 1. Load Format Specification

Load `{templateFile}` (backlog-format-spec.md) and reference:
- **Metadata header** format (title, Created, Method, Last Updated)
- **Section hierarchy** — all 7 H2 sections in exact order
- **Table formats** — Category table (10 columns), Prioritized View (6 columns), Exploration Candidates (4 columns)
- **Item ID format** — Category prefix letter + sequential number
- **Provenance format** — "Added from Create mode, [date]"

### 2. Generate Metadata Header

```markdown
# Convoke Initiatives Backlog

**Created:** [current date YYYY-MM-DD]
**Method:** RICE (Reach, Impact, Confidence, Effort)
**Last Updated:** [current date YYYY-MM-DD]
```

### 3. Generate RICE Scoring Guide Section

Create the `## RICE Scoring Guide` section with an inline summary of the methodology:
- Composite formula: Score = (R x I x C) / E
- Factor scales: Reach (1-10), Impact (0.25-3), Confidence (20-100%), Effort (1-10)
- Sort order: Descending by score, tiebreak by Confidence then insertion order

### 4. Generate Backlog Section with Category Tables

Create the `## Backlog` section. For each unique category in the scored items:

1. Create an H3 heading: `### [Category Name]`
2. Create a 10-column table:

```markdown
| # | Initiative | Source | R | I | C | E | Score | Track | Status |
|---|-----------|--------|---|---|---|---|-------|-------|--------|
```

3. For each item in this category:
   - **#:** Generate item ID using category prefix letter + sequential number within category (e.g., D1, D2, P1)
     - Category prefix mapping: D = Documentation & Onboarding, U = Update & Migration System, T = Testing & CI, I = Infrastructure, A = Agent Quality & Consistency, P = Platform & Product Vision
     - New categories: use the first uppercase letter of the category name that is not already in use (D, U, T, I, A, P are reserved)
   - **Initiative:** `**[Title]** — [description]. Added from Create mode, [date]`
   - **Source:** "Create mode"
   - **R, I, C, E:** Individual RICE component scores (C as percentage, e.g., 70%)
   - **Score:** Composite score, one decimal place
   - **Track:** "Keep the lights on" or "Move the needle"
   - **Status:** "Backlog"

### 5. Generate Empty Sections

Create the following sections with empty content:

**Exploration Candidates:**
```markdown
## Exploration Candidates

| # | Initiative | Source | Next Step |
|---|-----------|--------|-----------|
```

**Epic Groupings:**
```markdown
## Epic Groupings

*No epic groupings defined yet.*
```

**Completed:**
```markdown
## Completed

*No completed items yet.*
```

### 6. Generate Prioritized View

Create the `## Prioritized View (by RICE Score)` section:

1. Collect ALL items from all category tables
2. Sort by composite RICE score descending
3. Tiebreak: (1) Higher Confidence first, (2) Newer insertion order first
4. Generate sequential rank numbers starting at 1

```markdown
## Prioritized View (by RICE Score)

| Rank | # | Initiative | Score | Track | Category |
|------|---|-----------|-------|-------|----------|
```

### 7. Generate Change Log

Create the `## Change Log` section with the initial creation entry:

```markdown
## Change Log

| Date | Change |
|------|--------|
| [YYYY-MM-DD] | Create: Bootstrapped new backlog with [N] items ([list categories affected]). |
```

### 8. Write Complete File

Write the complete assembled backlog to `{outputFile}`. The file must contain all 7 H2 sections in the correct order as specified by the format spec.

### 9. Completion Summary & Return to Menu

After successful write, display:

> **Create Complete**
>
> **Items created:** [N]
> **Categories:** [list category names]
>
> **Top 3 Positions:**
> 1. [#ID] [title] — Score: [X.X]
> 2. [#ID] [title] — Score: [X.X]
> 3. [#ID] [title] — Score: [X.X]

Then return to the T/R/C menu:

> Loading `{workflowFile}` to return to mode selection...

Load, read the entire file, and execute `{workflowFile}`.

## 🚨 SYSTEM SUCCESS/FAILURE METRICS:
### ✅ SUCCESS: Complete backlog file generated with all 7 H2 sections in correct order, items placed in correct category tables with 10 columns, item IDs generated correctly, provenance tags added, prioritized view sorted and generated with 6 columns, changelog entry added, completion summary displayed with top 3, T/R/C menu re-presented
### ❌ SYSTEM FAILURE: Missing H2 sections, wrong section order, items without provenance, wrong column counts, item IDs not generated, prioritized view not sorted, no changelog entry, no completion summary, no return to menu
**Master Rule:** Skipping steps is FORBIDDEN.
