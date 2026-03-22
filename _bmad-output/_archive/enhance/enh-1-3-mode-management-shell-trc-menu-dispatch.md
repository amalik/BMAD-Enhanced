# Story 1.3: Mode Management Shell — T/R/C Menu & Dispatch

Status: done

## Story

As a Product Owner,
I want to select between Triage, Review, and Create modes from a single entry point,
So that I can choose the right workflow for my current task.

## Acceptance Criteria

1. **Given** the Product Owner selects the initiatives-backlog menu item in John PM **When** workflow.md loads **Then** a tri-modal menu is displayed with descriptions: [T] Triage — ingest review findings, [R] Review — rescore existing items, [C] Create — build new backlog (FR26)

2. **Given** Triage mode is implemented (this epic) **When** the Product Owner selects T **Then** the Triage step chain loads (`steps-t/step-t-01-ingest.md`)

3. **Given** Review and Create modes are not yet implemented **When** the Product Owner selects R or C **Then** a "Coming soon — this mode will be available in a future update" message is displayed and the menu re-presents

4. **Given** any mode completes its step chain **When** the final step executes **Then** the T/R/C menu re-presents, allowing the Product Owner to run another mode or exit (FR28)

5. **Given** the T/R/C menu is displayed **When** the Product Owner selects Exit **Then** the workflow ends gracefully and returns to the John PM agent menu (FR29)

## Tasks / Subtasks

- [x] Task 1: Author the T/R/C dispatch section in workflow.md (AC: 1, 2, 3, 4, 5)
  - [x] 1.1 Replace the placeholder comment block (lines 49-52) with the tri-modal menu and dispatch logic
  - [x] 1.2 Menu format: `[T] Triage — ingest review findings`, `[R] Review — rescore existing items`, `[C] Create — build new backlog`, `[X] Exit`
  - [x] 1.3 T dispatch: instruction to load and execute `{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-01-ingest.md`
  - [x] 1.4 R and C dispatch: display "Coming soon — this mode will be available in a future update" and redisplay menu
  - [x] 1.5 X dispatch: end workflow gracefully, return to John PM agent menu
  - [x] 1.6 Unknown input: help message, redisplay menu
  - [x] 1.7 Add a return-to-menu instruction block at the end of the dispatch section — the final step of each mode will tell the LLM to re-load workflow.md to re-present the T/R/C menu (AC: 4)

## Dev Notes

### This Story is Content-Only — No JavaScript

Story 1.3 modifies **only markdown files**. No JavaScript, no tests, no installer changes. The entire deliverable is authoring the T/R/C dispatch logic in `workflow.md`.

### Naming: Skill vs Folder

The skill canonical ID is `bmad-enhance-initiatives-backlog` (with `bmad-enhance-` module prefix), but the workflow folder is simply `initiatives-backlog`. All file paths in workflow.md must use the **folder name** (`initiatives-backlog`), not the skill canonical ID. The skill is just a wrapper that loads workflow.md — the workflow itself knows nothing about the skill naming convention.

### File to Modify

**`_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md`** — The entry point loaded when the Product Owner selects the initiatives-backlog menu item in John PM or invokes the `bmad-enhance-initiatives-backlog` skill.

### Insertion Point

Replace the placeholder comment block at lines 49-52:
```markdown
<!-- Mode dispatch: Story 1.3 will replace this section with the T/R/C menu and dispatch logic -->
<!-- For now, this is a placeholder entry point. The mode management shell (tri-modal menu, -->
<!-- "coming soon" placeholders, exit handling, and return-to-menu after mode completion) -->
<!-- will be authored as part of Story 1.3: Mode Management Shell. -->
```

### T/R/C Menu Design (from ADR-3 in PRD)

ADR-3 mandates an **explicit user menu** for mode selection — no auto-detection. The menu must:
- Present all three modes from day one (even if R and C aren't implemented yet)
- Show clear descriptions so the user knows which mode to pick
- Include an exit option

ADR-4 mandates **no mode switching** — modes run independently. The backlog file is shared state, but each mode runs its full step chain without branching to another mode mid-execution.

### Menu Pattern to Follow

Use the BMAD workflow menu handling convention (from `_bmad/bmb/workflows/workflow/data/menu-handling-standards.md`):
- Present menu with clear option descriptions
- Handle each option in menu handling logic section
- ALWAYS halt and wait for user input after presenting menu
- Unknown input → help message → redisplay menu

**Reserved letters in BMAD:** A = Advanced Elicitation, P = Party Mode, C = Continue. For this workflow, `C` is repurposed for "Create mode" since this is a mode dispatcher, not a step with A/P/C refinement pattern.

### Step File Path Convention

The Triage dispatch must reference the step file using a **full `{project-root}` path**: `{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-01-ingest.md`. This matches the SKILL.md and `<item exec="...">` patterns that use `{project-root}` for absolute resolution.

Note: `step-t-01-ingest.md` does **not exist yet** (only `.gitkeep` is in the directory). It will be authored in Story 1.4. This is acceptable — Story 1.3 establishes the shell, Story 1.4 populates it.

### Return-to-Menu Pattern

The final step of each mode (e.g., `step-t-04-update.md` in Triage) needs a way to return to the T/R/C menu. The approach: the final step of any mode tells the LLM to **re-load workflow.md** (`{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md`). LLMs load entire files — they don't navigate to markdown anchors — so re-loading the full workflow.md is the correct pattern. The INITIALIZATION section and menu will re-present naturally.

The workflow.md dispatch section should include a note (visible to the LLM) documenting this convention so future step file authors know how to route back.

### What NOT to Do

- Do NOT create step files (`step-t-01-ingest.md`, etc.) — those are Stories 1.4-1.6
- Do NOT modify `config.yaml` — the workflow entry point path doesn't change
- Do NOT modify any JavaScript files — this is pure markdown content
- Do NOT add A/P (Advanced Elicitation / Party Mode) options to the T/R/C menu — this is a mode dispatcher, not a refinement step
- Do NOT implement any Triage/Review/Create logic — only the mode selection shell

### PRD Deviations — Intentional

None. Story 1.3 follows the PRD and architecture exactly.

### Previous Story Intelligence (from Stories 1.2 and 1.2a)

**Key learnings:**
- The SKILL.md at `.claude/skills/bmad-enhance-initiatives-backlog/SKILL.md` tells the LLM to "LOAD the FULL {project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md" — so workflow.md is loaded in its entirety when invoked
- The `<item>` tag in pm.md uses `exec="{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md"` — same entry point
- Both activation paths (menu and skill) load the same workflow.md file
- Skill canonical ID (`bmad-enhance-initiatives-backlog`) ≠ workflow folder name (`initiatives-backlog`) — the `bmad-enhance-` prefix is a module-level naming convention, not part of the folder structure
- Code review on 1.2a caught that SKILL.md source files should be shipped (not generated) to match skill-manifest.csv path convention

### Project Structure Notes

- Workflow entry point: `_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md`
- Step directories: `steps-t/` (Triage), `steps-r/` (Review), `steps-c/` (Create) — all empty except `.gitkeep`
- Templates: `templates/rice-scoring-guide.md`, `templates/backlog-format-spec.md` — already exist from Story 1.1
- Output artifact: `{planning_artifacts}/initiatives-backlog.md`

### References

- [Source: _bmad-output/planning-artifacts/prd-p4-enhance-module.md — FR26, FR28, FR29, ADR-3, ADR-4]
- [Source: _bmad-output/planning-artifacts/epics-p4-enhance-module.md — Story 1.3 ACs]
- [Source: _bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md — current entry point with placeholder]
- [Source: _bmad/bmb/workflows/workflow/data/menu-handling-standards.md — menu pattern reference]
- [Source: _bmad/bmb/workflows/workflow/data/step-type-patterns.md — step type 6 "Branch Step" pattern]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Debug Log References
N/A — content-only story, no debugging required

### Completion Notes List
- Single file modified: workflow.md — replaced 4-line placeholder with full T/R/C dispatch (41 lines)
- Menu follows BMAD menu-handling-standards: Display → Handler → Execution Rules
- T dispatch uses full `{project-root}` path to step-t-01-ingest.md
- R/C show "Coming soon" with bold formatting and redisplay menu
- X exits gracefully with message
- Unknown input provides help with valid options and redisplays
- Return-to-menu convention documented as HTML comment for step file authors
- ADR-3 (explicit user menu) and ADR-4 (no mode switching) referenced in execution rules
- No JavaScript, no tests — content-only as specified

### File List
- `_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md` — Replaced placeholder with T/R/C mode selection menu and dispatch logic

### Change Log
- workflow.md: Replaced lines 49-52 (placeholder comment) with MODE SELECTION section containing tri-modal menu, menu handling logic, execution rules, and return-to-menu convention comment

### Senior Developer Review (AI)
- **Reviewer:** Claude Opus 4.6 (adversarial code review)
- **Date:** 2026-03-15
- **Outcome:** Clean review — no issues found
- **All 5 ACs verified against actual file content**
- **All 7 subtasks confirmed complete**
- **BMAD menu-handling-standards compliance verified (Display → Handler → Execution Rules)**
- **ADR-3 (explicit menu) and ADR-4 (no mode switching) enforced in execution rules**
