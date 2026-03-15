# Story 1.4: Triage Mode — Finding Extraction & Gate 1 Validation

Status: done

## Story

As a Product Owner,
I want to paste a review transcript and have the workflow extract, classify, and validate actionable findings,
So that I can convert review outputs into structured backlog candidates without manual parsing.

## Acceptance Criteria

1. **Given** the Product Owner selects Triage mode **When** they submit text input (review transcript, meeting notes, markdown) **Then** the workflow accepts and processes the complete input regardless of length (FR1, FR46)

2. **Given** text input is submitted **When** the workflow processes it **Then** it extracts actionable findings where actionable = proposes a change, identifies a gap, or flags a risk (FR2) **And** each finding is classified into a backlog category (FR3) **And** each finding includes a source reference identifying which part of the input it came from (FR4)

3. **Given** an existing backlog file is present **When** findings are extracted **Then** the workflow detects potential overlaps with existing backlog items, presenting them with the matching item's title and ID (FR5)

4. **Given** the extraction batch is presented (Gate 1) **When** the Product Owner reviews it **Then** they can resolve overlap flags by choosing merge, skip, or add-as-new for each flagged finding (FR6) **And** they can escalate observations to actionable status (FR7) **And** they can add findings the workflow missed (FR8) **And** they can remove findings from the batch (FR9)

5. **Given** the input text contains no actionable findings **When** extraction completes **Then** the workflow reports zero findings gracefully with an escape hatch for re-examination of specific passages (FR10)

## Tasks / Subtasks

- [x] Task 1: Author `step-t-01-ingest.md` — Text Input Ingestion (AC: 1)
  - [x] 1.1 Create step file with BMAD step frontmatter (name, description, nextStepFile, outputFile references)
  - [x] 1.2 MANDATORY EXECUTION RULES section with facilitator role
  - [x] 1.3 MANDATORY SEQUENCE: (1) Load config from workflow.md, (2) Check for existing backlog at `{planning_artifacts}/initiatives-backlog.md` and load if present, (3) Prompt user for text input, (4) Accept and preserve complete input
  - [x] 1.4 Menu: [C] Continue only (no A/P — this is data gathering, not content refinement)
  - [x] 1.5 On C: store input text, auto-proceed to step-t-02-extract.md

- [x] Task 2: Author `step-t-02-extract.md` — Finding Extraction & Gate 1 (AC: 2, 3, 4, 5)
  - [x] 2.1 Create step file with BMAD step frontmatter (name, description, nextStepFile, backlogFile, templateFile references)
  - [x] 2.2 MANDATORY EXECUTION RULES section with analyst role
  - [x] 2.3 MANDATORY SEQUENCE part 1 — Extraction: (1) Load backlog-format-spec.md template for category reference, (2) Process complete input text, (3) Extract actionable findings (change/gap/risk), (4) Classify each into a backlog category, (5) Add source reference for each finding
  - [x] 2.4 MANDATORY SEQUENCE part 2 — Overlap Detection: If existing backlog loaded, compare extracted findings against existing items, flag potential overlaps with matching item title and ID
  - [x] 2.5 MANDATORY SEQUENCE part 3 — Zero Findings: If no actionable findings extracted, report gracefully with escape hatch for re-examination of specific passages, then return to workflow.md
  - [x] 2.6 MANDATORY SEQUENCE part 4 — Gate 1 Presentation: Present extraction batch as numbered list with category, source ref, and overlap flags
  - [x] 2.7 Gate 1 Menu: command-based editing by item number (e.g., `merge 3`, `skip 5`, `new 2`), [E #N] Escalate observation to actionable, [+] Add a missed finding, [R #N] Remove a finding, [C] Continue to scoring
  - [x] 2.8 Gate 1 handling: process user edits, re-present updated batch, halt and wait after each action
  - [x] 2.9 On C: pass confirmed findings to step-t-03-score.md

## Dev Notes

### This Story is Content-Only — No JavaScript

Story 1.4 creates **two markdown step files** in `steps-t/`. No JavaScript, no tests, no installer changes.

### Files to Create

1. **`_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-01-ingest.md`** — Text input ingestion step
2. **`_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-02-extract.md`** — Finding extraction and Gate 1 validation step

Both files go in the `steps-t/` directory (already exists with `.gitkeep` from Story 1.1).

### Step File Frontmatter Pattern

Follow the BMAD step file convention from `_bmad/bmb/workflows/workflow/data/step-type-patterns.md`. Use `{project-root}` for all absolute paths.

**step-t-01-ingest.md frontmatter:**
```yaml
---
name: 'step-t-01-ingest'
description: 'Accept text input — review transcript, meeting notes, or any findings source'
nextStepFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-02-extract.md'
outputFile: '{planning_artifacts}/initiatives-backlog.md'
---
```
Note: No `templateFile` — step-t-01 only accepts input and loads existing backlog. The format spec template is needed by step-t-02 for category classification.

**step-t-02-extract.md frontmatter:**
```yaml
---
name: 'step-t-02-extract'
description: 'Extract actionable findings from input, classify, detect overlaps, and validate at Gate 1'
nextStepFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-03-score.md'
outputFile: '{planning_artifacts}/initiatives-backlog.md'
templateFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/templates/backlog-format-spec.md'
---
```

### Step Type Classification

- **step-t-01-ingest.md** = Type 5 "Middle Step (Simple)" — data gathering, C-only menu, no A/P refinement
- **step-t-02-extract.md** = Type 6 "Branch Step" with command-based editing — Gate 1 validation with per-item commands + E/+/R/C options

### Actionable Finding Definition (FR2)

A finding is "actionable" if it: **proposes a change**, **identifies a gap**, or **flags a risk**. Non-actionable observations (general comments, praise, questions without implied action) should be noted separately but not included in the extraction batch.

### Classification Categories (FR3)

Use categories from the existing backlog's `## Backlog` section headings. Current categories:
- Documentation & Onboarding
- Update & Migration System
- Testing & CI
- Infrastructure
- Agent Quality & Consistency
- Platform & Product Vision

New categories can be proposed if a finding doesn't fit existing ones.

### Overlap Detection (FR5)

Compare extracted findings against existing backlog items using semantic similarity (title + description). Flag potential overlaps with:
- The existing item's **ID** (e.g., D2, P4)
- The existing item's **title**
- A brief explanation of why it might overlap

### Gate 1 User Actions (FR6-FR9)

Gate 1 uses **command-based editing by item number**, not single-letter dispatch. The user can perform multiple actions before pressing C to continue.

**Overlap resolution commands (FR6)** — only shown for items flagged with overlaps:
- `merge #N` — Absorb finding #N into the existing overlapping item (not added as new)
- `skip #N` — Drop finding #N (existing item is sufficient)
- `new #N` — Override overlap flag on #N, add as separate new item

**Batch editing commands:**
- `E #N` — Escalate observation #N to actionable finding (FR7)
- `+ [description]` — Add a finding the workflow missed (FR8). Uses `+` instead of `A` to avoid conflict with BMAD reserved letter A (Advanced Elicitation)
- `R #N` — Remove finding #N from the batch (FR9)
- `C` — Finalize batch and continue to scoring (step-t-03)

After each command, redisplay the updated batch and halt for next input. The menu is iterative — the user can issue multiple commands before pressing C.

### Zero Findings Handling (FR10)

If extraction yields zero actionable findings:
1. Display "No actionable findings extracted from the input."
2. Offer escape hatch: "Would you like me to re-examine specific passages? Paste the passage or type X to return to the mode menu."
3. If user pastes text → re-examine that specific passage for findings
4. If user types X → return to T/R/C menu by re-loading `{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md`

### Input Processing (FR46)

The workflow must process the **complete** input text regardless of length. Do NOT truncate, summarize, or skip sections. If the input is very long, process it systematically section by section.

### Menu Handling Standards

Follow BMAD menu-handling-standards from `_bmad/bmb/workflows/workflow/data/menu-handling-standards.md`:
- Display menu with clear option descriptions
- Handler section immediately follows display
- EXECUTION RULES section with "halt and wait" instruction
- Unknown input → help → redisplay menu

### What NOT to Do

- Do NOT create `step-t-03-score.md` or `step-t-04-update.md` — those are Stories 1.5 and 1.6
- Do NOT modify `workflow.md` — the T dispatch already points to `step-t-01-ingest.md` (from Story 1.3)
- Do NOT modify any JavaScript files — this is pure markdown content
- Do NOT implement RICE scoring logic — that's Story 1.5
- Do NOT write to the backlog file — that's Story 1.6
- Do NOT add A/P (Advanced Elicitation / Party Mode) to step-t-01-ingest.md — it's a data gathering step

### PRD Deviations — Intentional

None. Story 1.4 follows the PRD and architecture exactly.

### Previous Story Intelligence (from Stories 1.2a and 1.3)

**Key learnings:**
- Skill canonical ID (`bmad-enhance-initiatives-backlog`) != workflow folder name (`initiatives-backlog`) — use folder paths in step files, not skill IDs
- The T dispatch in workflow.md (Story 1.3) points to `{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-01-ingest.md` — this file must exist with that exact name
- Return-to-menu pattern: the final Triage step (step-t-04-update.md, Story 1.6) will re-load workflow.md — Story 1.4 steps just chain forward via `nextStepFile`
- Templates `rice-scoring-guide.md` and `backlog-format-spec.md` already exist in `templates/` (from Story 1.1)
- Existing backlog at `{planning_artifacts}/initiatives-backlog.md` has 29 items across 6 categories — overlap detection must work against this real data

### Step Size Guidelines (from step-type-patterns.md)

| Type | Recommended | Maximum |
|------|-------------|---------|
| Middle (simple) — step-t-01 | < 150 lines | 200 |
| Middle (complex) — step-t-02 | < 200 lines | 250 |

If step-t-02-extract exceeds 250 lines, extract Gate 1 menu handling to a `data/` file.

### Project Structure Notes

- Step files: `_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/`
- Templates: `_bmad/bme/_enhance/workflows/initiatives-backlog/templates/`
- Output artifact: `{planning_artifacts}/initiatives-backlog.md`
- Workflow entry point: `_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md`
- Config: `_bmad/bme/_enhance/config.yaml`

### References

- [Source: _bmad-output/planning-artifacts/prd-p4-enhance-module.md — FR1-FR10, FR46]
- [Source: _bmad-output/planning-artifacts/epics-p4-enhance-module.md — Story 1.4 ACs]
- [Source: _bmad-output/planning-artifacts/P4-enhance-module-architecture.md — Triage step chain, RICE scoring engine]
- [Source: _bmad/bmb/workflows/workflow/data/step-type-patterns.md — step file frontmatter and structure patterns]
- [Source: _bmad/bmb/workflows/workflow/data/menu-handling-standards.md — menu pattern reference]
- [Source: _bmad/bme/_enhance/workflows/initiatives-backlog/templates/backlog-format-spec.md — category structure, table formats]
- [Source: _bmad/bme/_enhance/workflows/initiatives-backlog/templates/rice-scoring-guide.md — RICE factor definitions]
- [Source: _bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md — T dispatch target, return-to-menu convention]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Debug Log References
N/A — content-only story, no debugging required

### Completion Notes List
- Two step files created in `steps-t/` directory
- step-t-01-ingest.md (57 lines): Type 5 simple step — accepts text input, loads existing backlog, C-only menu
- step-t-02-extract.md (136 lines): Type 6 branch step — extracts findings, classifies into categories, detects overlaps, Gate 1 validation with command-based editing
- Both files follow BMAD step file conventions: frontmatter with {project-root} paths, MANDATORY EXECUTION RULES, MANDATORY SEQUENCE, menu handling, success/failure metrics
- Gate 1 uses command-based editing (merge/skip/new #N, E #N, + [text], R #N, C) — avoids BMAD reserved letter A
- Zero findings handling includes escape hatch for re-examination + return to T/R/C menu
- Overlap detection flags existing item ID and title
- No JavaScript, no tests — content-only as specified

### File List
- `_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-01-ingest.md` — Text input ingestion step (new)
- `_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-02-extract.md` — Finding extraction and Gate 1 validation step (new)

### Change Log
- Created step-t-01-ingest.md: BMAD Type 5 simple step for accepting review text input with C-only menu
- Created step-t-02-extract.md: BMAD Type 6 branch step for finding extraction, classification, overlap detection, and Gate 1 validation with command-based editing menu

### Senior Developer Review (AI)
- **Reviewer:** Claude Opus 4.6 (adversarial code review)
- **Date:** 2026-03-15
- **Outcome:** Clean review — no issues found
- **All 5 ACs verified against actual file content**
- **All 14 subtasks confirmed complete**
- **BMAD step file conventions verified (frontmatter, MANDATORY EXECUTION RULES, MANDATORY SEQUENCE, menu handling, success/failure metrics)**
- **Step chain integrity verified: workflow.md → step-t-01 → step-t-02 → step-t-03 (Story 1.5)**
- **Gate 1 command-based menu covers all FR6-FR9 actions, avoids BMAD reserved letter A**
