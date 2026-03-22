# Story 3.1: Create Mode — Bootstrap New RICE Backlog

Status: done

## Story

As a Product Owner starting a new project,
I want to build a RICE-scored initiatives backlog from scratch through guided interaction,
So that I have a prioritized backlog without needing to manually create the file structure.

## Acceptance Criteria

1. **Given** the PO selects Create mode from the T/R/C menu **When** the workflow loads **Then** it initializes a new backlog file using the backlog format spec template (FR32) and loads the RICE scoring guide template for calibration reference
2. **Given** a backlog file already exists at the output location **When** the PO selects Create mode **Then** the workflow warns that a file exists and asks whether to overwrite or cancel
3. **Given** a new backlog is initialized **When** the gathering phase begins **Then** the PO can provide initiatives interactively — title, description, and category (FR33) — and the workflow prompts for additional initiatives until the PO indicates they are done
4. **Given** initiatives have been gathered **When** the scoring phase begins **Then** the workflow proposes RICE scores in batch with one-line rationales (FR11, FR12) and the PO can adjust scores by item number (FR13)
5. **Given** scoring is finalized **When** the backlog is written **Then** items are placed in correct category sections (FR19), the prioritized view table is generated sorted by composite score (FR20), provenance tags "Added from Create mode, [date]" are added (FR21), a changelog entry marks initial creation (FR23), and all output is standard markdown (NFR6)
6. **Given** backlog creation completes **When** the completion summary is presented **Then** it shows total items created and the top 3 positions (FR27), and the T/R/C menu re-presents (FR28)
7. **Given** workflow.md currently shows "Coming soon" for Create **When** this story is deployed **Then** the placeholder is replaced with the Create step chain dispatch

## Tasks / Subtasks

- [x] Task 1: Create `step-c-01-init.md` — Initialization & Existing File Guard (AC: 1, 2)
  - [x] 1.1 Frontmatter: name, description, nextStepFile → step-c-02, outputFile, templateFile (backlog-format-spec), workflowFile (for cancel return-to-menu)
  - [x] 1.2 Check if `{outputFile}` exists. If found: warn with overwrite/cancel prompt (Y/X). If X: return to menu via `{workflowFile}`. If Y: proceed
  - [x] 1.3 If no existing file (or overwrite confirmed): load `{templateFile}` (backlog-format-spec.md), display "New backlog initialized. Ready to gather initiatives."
  - [x] 1.4 Menu: [C] Continue to initiative gathering
  - [x] 1.5 Step type: Type 5 (Simple, C-only)
- [x] Task 2: Create `step-c-02-gather.md` — Interactive Initiative Gathering (AC: 3)
  - [x] 2.1 Frontmatter: name, description, nextStepFile → step-c-03, outputFile, templateFile (backlog-format-spec), advancedElicitationTask, partyModeWorkflow
  - [x] 2.2 Prompt PO to describe an initiative: title, description, category (offer existing category names from backlog-format-spec as suggestions, allow new categories)
  - [x] 2.3 After each initiative: display captured summary, ask for next initiative or done
  - [x] 2.4 Track gathered_items list with: title, description, category, source ("Create mode")
  - [x] 2.5 "Done" triggers move to scoring. Must have at least 1 initiative to proceed
  - [x] 2.6 Menu per-initiative: [N] Next initiative, [D] Done gathering, [A] Advanced Elicitation, [P] Party Mode
  - [x] 2.7 Step type: Type 4 (Standard with A/P)
- [x] Task 3: Create `step-c-03-score.md` — Batch RICE Scoring (AC: 4)
  - [x] 3.1 Frontmatter: name, description, nextStepFile → step-c-04, outputFile, templateFile (rice-scoring-guide), advancedElicitationTask, partyModeWorkflow
  - [x] 3.2 Load rice-scoring-guide.md, internalize factor definitions, scales, calibration examples, composite formula
  - [x] 3.3 Propose RICE scores for ALL gathered initiatives in a batch table with one-line rationales (reuse step-t-03 scoring pattern)
  - [x] 3.4 Present scored batch sorted by composite score descending
  - [x] 3.5 Gate menu (reuse step-t-03 Gate 2 pattern): `#N R/I/CF/E [value]`, `D #N` (drop), [A], [P], [C]
  - [x] 3.6 Recalculate composite and re-sort after every adjustment
  - [x] 3.7 Propose Track assignment for each item: "Keep the lights on" or "Move the needle" — displayed in batch table alongside RICE scores, adjustable by user
  - [x] 3.8 Step type: Type 4 (Standard with A/P) — reuses step-t-03 scoring pattern
- [x] Task 4: Create `step-c-04-prioritize.md` — Backlog Write, Prioritized View & Completion (AC: 5, 6)
  - [x] 4.1 Frontmatter: name, description, outputFile, templateFile (backlog-format-spec), workflowFile (return-to-menu). No nextStepFile (final step)
  - [x] 4.2 Generate full backlog file from scratch using backlog-format-spec.md structure: metadata header, RICE Scoring Guide (inline summary), all 7 H2 sections in correct order
  - [x] 4.3 Place items in correct category H3 sections under `## Backlog` with 10-column table format
  - [x] 4.4 Generate item IDs: category prefix letter (D/U/T/I/A/P) + sequential number starting at 1
  - [x] 4.5 Add provenance: "Added from Create mode, [date]" in Initiative cell
  - [x] 4.6 Generate `## Prioritized View` table (6 columns) sorted by composite score descending, tiebreak by Confidence then insertion order
  - [x] 4.7 Initialize empty `## Exploration Candidates`, `## Epic Groupings`, `## Completed` sections
  - [x] 4.8 Add changelog entry: `Create: Bootstrapped new backlog with [N] items ([categories]).`
  - [x] 4.9 Set `Last Updated` to current date
  - [x] 4.10 Write to `{outputFile}`
  - [x] 4.11 Display completion summary: items created, top 3 positions
  - [x] 4.12 Return to T/R/C menu via `{workflowFile}`
  - [x] 4.13 Step type: Type 10 (Final Step)
- [x] Task 5: Update `workflow.md` — Replace "Coming soon" for C (AC: 7)
  - [x] 5.1 Line 70: Replace `Display "**Coming soon** — Create mode will be available in a future update." then redisplay the Mode Selection menu above` with `Load, read the entire file, and execute \`{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-c/step-c-01-init.md\``
  - [x] 5.2 Line 79: Remove "After C (coming soon), redisplay this menu immediately" (C now dispatches to step chain, same as T and R)

## Dev Notes

### Content-Only Story

This is a **content-only** story — no JavaScript, no tests. Deliverables: 4 new step files + 1 workflow.md edit. Test suite unchanged (361 tests, 0 regressions expected).

### Step File Architecture — BMAD Standard

Every step file follows the canonical structure:
```
frontmatter → STEP GOAL → MANDATORY EXECUTION RULES (Universal + Role + Step-Specific) → EXECUTION PROTOCOLS → CONTEXT BOUNDARIES → MANDATORY SEQUENCE → SUCCESS/FAILURE METRICS
```

### Pattern Reuse Map

| Create Step | Reuses Pattern From | Key Differences |
|---|---|---|
| step-c-01-init | step-r-01-load | Init checks for **existing file to overwrite** (not missing file). Uses backlog-format-spec template (not rice-scoring-guide). No backlog parsing needed. |
| step-c-02-gather | (new pattern) | No direct Triage/Review counterpart. Interactive multi-item gathering with N/D/A/P menu. |
| step-c-03-score | step-t-03-score | Same RICE scoring engine, batch table, Gate 2 menu pattern. Input: gathered items (not extracted findings). No Gate 1 reference. |
| step-c-04-prioritize | step-t-04-update | Same prioritized view generation and completion summary. **Creates file from scratch** (not append to existing). Generates all 7 H2 sections. No pre-write validation needed (new file). Changelog format: "Create:" prefix. |

### Frontmatter Patterns

**Standard fields (all steps):**
```yaml
name: 'step-c-0N-[name]'
description: '[one-line description]'
outputFile: '{planning_artifacts}/initiatives-backlog.md'
```

**Navigation fields:**
- Steps 1-3: `nextStepFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-c/step-c-0[N+1]-[name].md'`
- Step 4 (final): No `nextStepFile`. Has `workflowFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md'`
- Step 1: Also has `workflowFile` (for cancel/return-to-menu on overwrite prompt)

**Template fields:**
- Steps 1, 2, 4: `templateFile` → backlog-format-spec.md (step 1 for initialization, step 2 for category name suggestions, step 4 for file generation)
- Step 3: `templateFile` → rice-scoring-guide.md (RICE factor definitions, calibration examples, composite formula)

**Interactive fields (steps 2, 3 only):**
```yaml
advancedElicitationTask: '{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.md'
partyModeWorkflow: '{project-root}/_bmad/core/workflows/bmad-party-mode/workflow.md'
```

### BMAD Reserved Letters

| Letter | Meaning | Used In |
|---|---|---|
| A | Advanced Elicitation | step-c-02, step-c-03 |
| P | Party Mode | step-c-02, step-c-03 |
| C | Continue (to next step) | step-c-01, step-c-03 |
| X | Exit / Cancel | step-c-01 (overwrite cancel) |
| N | Next initiative (custom) | step-c-02 |
| D | Done gathering / Drop item | step-c-02, step-c-03 |

### Create Mode Provenance

Format: `"Added from Create mode, [date]"` — uses ASCII characters only, consistent with backlog-format-spec.md provenance conventions.

### Backlog File Generation (step-c-04)

Step-c-04 creates the **entire file from scratch** — no append, no validation of existing structure. The file must contain all 7 H2 sections in correct order per backlog-format-spec.md:

1. `## RICE Scoring Guide` — inline summary of methodology
2. `## Backlog` — category H3 sections with 10-column tables
3. `## Exploration Candidates` — empty table (4 columns)
4. `## Epic Groupings` — empty section
5. `## Prioritized View (by RICE Score)` — 6-column table, sorted
6. `## Completed` — empty section
7. `## Change Log` — initial creation entry

### Item ID Generation

Category prefix letters from existing convention:
- D = Documentation & Onboarding
- U = Update & Migration System
- T = Testing & CI
- I = Infrastructure
- A = Agent Quality & Consistency
- P = Platform & Product Vision

New categories use first available uppercase letter not already in use. IDs sequential within category starting at 1 (e.g., D1, D2, P1).

### Workflow.md Edit

Two changes required:
1. **Line 70** — C handler: dispatch to step-c-01-init.md (same pattern as T on line 68 and R on line 69)
2. **Line 79** — Remove stale execution rule about C coming soon (per "check all references" retro action item from Epic 2)

### Previous Epic Lessons (Carry Forward)

1. **"Check all references"** — When modifying behavior in a file, grep for other sections/files that describe that behavior (Epic 2 retro)
2. **Pre-implementation review** — 60% catch rate across Epics 1 and 2. Continue for this story
3. **Pattern reuse documented in Dev Notes** — Key velocity driver (Epic 2 retro)
4. **Documentation drift** — Primary risk in content-only epics. Watch for format specs, PRD, step files, and execution rules saying different things

### Project Structure Notes

- Step files: `_bmad/bme/_enhance/workflows/initiatives-backlog/steps-c/` (4 files)
- Workflow: `_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md` (1 edit)
- Templates referenced: `templates/backlog-format-spec.md`, `templates/rice-scoring-guide.md` (no modifications)
- Output location: `{planning_artifacts}/initiatives-backlog.md` (runtime resolved)

### References

- [Source: epics-p4-enhance-module.md#Story 3.1] — ACs, FR coverage
- [Source: prd-p4-enhance-module.md#Create Mode] — Phase requirements, provenance conventions
- [Source: P4-enhance-module-architecture.md#Phased Delivery] — 4-step chain (init → gather → score → prioritize)
- [Source: backlog-format-spec.md] — Canonical file structure, table formats, provenance tags, insertion rules
- [Source: rice-scoring-guide.md] — RICE factor definitions, calibration examples
- [Source: step-t-03-score.md] — Batch RICE scoring pattern (reused by step-c-03)
- [Source: step-t-04-update.md] — Prioritized view generation, completion summary, return-to-menu (reused by step-c-04)
- [Source: step-r-01-load.md] — Existing file guard pattern (adapted for step-c-01 overwrite warning)
- [Source: enh-epic-2-retro-2026-03-15.md] — "Check all references" action item, pattern reuse lessons

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None — clean implementation.

### Completion Notes List

- Task 1: Created step-c-01-init.md — Type 5 (C-only) with existing file guard (Y/X overwrite prompt), backlog-format-spec template loading, return-to-menu via workflowFile on cancel
- Task 2: Created step-c-02-gather.md — Type 4 (A/P) with per-initiative interactive loop (N/D/A/P menu), category suggestions from backlog-format-spec, minimum 1 initiative guard
- Task 3: Created step-c-03-score.md — Type 4 (A/P) reusing step-t-03 batch scoring pattern with Track assignment column, #N T [value] adjustment command added
- Task 4: Created step-c-04-prioritize.md — Type 10 (final step) generating complete backlog file from scratch with all 7 H2 sections, item ID generation, provenance, prioritized view, changelog, completion summary
- Task 5: Updated workflow.md — C handler dispatches to step-c-01-init.md, removed stale "coming soon" execution rule
- "Check all references" applied — grepped for remaining "Coming soon" references, none found
- Tests: 359 pass, 0 fail, 0 regressions (content-only story, no new tests)

### Change Log

- 2026-03-15: Implemented Story 3.1 — 4 Create mode step files + workflow.md edit (5 tasks, 22 subtasks)

### File List

- _bmad/bme/_enhance/workflows/initiatives-backlog/steps-c/step-c-01-init.md (created)
- _bmad/bme/_enhance/workflows/initiatives-backlog/steps-c/step-c-02-gather.md (created)
- _bmad/bme/_enhance/workflows/initiatives-backlog/steps-c/step-c-03-score.md (created)
- _bmad/bme/_enhance/workflows/initiatives-backlog/steps-c/step-c-04-prioritize.md (created)
- _bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md (modified)
