# Story 4.4: Feedback Capture & Display

Status: done

## Story

As a user,
I want Coach to ask if Gyre missed anything and show me what my team previously reported,
So that the model improves over time and my team's knowledge is preserved.

## Acceptance Criteria

1. **Given** Coach reaches the feedback step
   **When** it prompts "Did Gyre miss anything you know about?" (FR28)
   **Then** user response is persisted to `.gyre/feedback.yaml` with timestamp (FR29)
   **And** Coach explains: "Commit feedback.yaml to share improvements with your team" (FR30)

2. **Given** `.gyre/feedback.yaml` has existing entries
   **When** a new analysis starts
   **Then** existing feedback entries are displayed at the start (FR53)

3. **Given** user deferred model review (FR55)
   **When** next analysis starts
   **Then** Coach displays reminder: "You deferred reviewing your capabilities manifest last time — would you like to review now?"

## Tasks / Subtasks

- [x] Task 1: Validate step-04-capture-feedback.md structure (AC: #1)
  - [x] 1.1 Verify frontmatter: step=4, workflow=model-review, title=Capture Feedback, implements=Story 4.4 (FR28, FR29, FR30) — confirmed lines 2-5
  - [x] 1.2 Verify mandatory execution rules: prompt FR28 (line 14), persist FR29 (line 15), explain commit FR30 (line 16), entry schema (line 17), append-only (line 18) — all 5 confirmed
  - [x] 1.3 Verify feedback prompt (FR28): "Did Gyre miss anything you know about?" with 3 examples (missing capability, undetected gap, wrong severity) — confirmed lines 24-33

- [x] Task 2: Validate step-04 feedback capture flow (AC: #1)
  - [x] 2.1 Verify entry creation: YAML template with timestamp (ISO-8601), reporter ({user_name}), type, description, domain — confirmed lines 39-45
  - [x] 2.2 Verify type classification: missed-capability, missed-gap, severity-adjustment, other — with inference rules for each — confirmed lines 47-51
  - [x] 2.3 Verify domain classification: ask user or infer from context — confirmed line 53
  - [x] 2.4 Verify iterative capture: "Anything else?" loop until "done"/"none" — confirmed lines 57-62
  - [x] 2.5 Verify feedback file write: create with GC4 header if new (lines 69-86), append + update frontmatter if existing (line 88) — confirmed
  - [x] 2.6 Verify team sharing explanation (FR30): commit tip mentioning Atlas incorporation — confirmed lines 90-96
  - [x] 2.7 Verify no-feedback handler: "No feedback to save — you can always provide feedback later" — confirmed lines 98-101
  - [x] 2.8 Verify Load step directive to step-05-summary.md — confirmed line 107

- [x] Task 3: Validate step-01-load-context.md feedback display (AC: #2, #3)
  - [x] 3.1 Verify frontmatter: step=1, workflow=model-review, title=Load Context, implements=Stories 4.4, 4.5 — confirmed lines 2-5
  - [x] 3.2 Verify GC2 prerequisite: load capabilities.yaml, STOP if missing with Atlas recommendation — confirmed lines 21-33
  - [x] 3.3 Verify GC3 optional load: note findings unavailable if missing, model review can proceed — confirmed lines 35-37
  - [x] 3.4 Verify existing feedback display (FR53): read feedback.yaml, present as table (Date/Reporter/Type/Description) — confirmed lines 39-53
  - [x] 3.5 Verify deferred review reminder (FR55): check review_deferred: true in capabilities.yaml frontmatter, display reminder — confirmed lines 55-61
  - [x] 3.6 Verify review mode selection: 3 options (Review Model, Review Findings, Both) plus "skip" to feedback — confirmed lines 63-75
  - [x] 3.7 Verify conditional next-step routing: Model/Both → step-02, Findings → present then step-04, Skip → step-04 — confirmed lines 83-86

- [x] Task 4: Validate step chain continuity
  - [x] 4.1 Verify step-04 Load directive points to step-05-summary.md — confirmed line 107
  - [x] 4.2 Verify step-01 conditional routing covers all 3 modes plus skip — confirmed lines 83-86
  - [x] 4.3 Verify workflow.md pipeline table lists step-01 (load context, line 23) and step-04 (capture feedback, line 26) with correct actions — confirmed
  - [x] 4.4 Verify both step files reference `workflow: model-review` in frontmatter — step-04 line 3, step-01 line 3 — confirmed

- [x] Task 5: Cross-reference with GC4 contract (Story 4.3)
  - [x] 5.1 Verify step-04 feedback entry schema matches GC4 body schema (timestamp/reporter/type/description/domain) — confirmed
  - [x] 5.2 Verify step-04 type enum matches GC4 (missed-capability, missed-gap, severity-adjustment, other) — confirmed
  - [x] 5.3 Verify step-04 file creation uses GC4 frontmatter (contract=GC4, type=artifact, source_agent=coach, target_agents=[atlas]) — confirmed lines 70-77

- [x] Task 6: Fix any discrepancies found in Tasks 1-5 — No discrepancies found

## Dev Notes

### Pre-existing Files — Validation Approach

Both files already exist from the 2026-03-21 architecture scaffolding:
- `_bmad/bme/_gyre/workflows/model-review/steps/step-04-capture-feedback.md` (108 lines)
- `_bmad/bme/_gyre/workflows/model-review/steps/step-01-load-context.md` (87 lines)

This story validates these against the Epic 4 ACs for feedback capture (step-04) and existing feedback display (step-01).

### Architecture Reference — Feedback Capture

From `architecture-gyre.md`:

**FR28:** Feedback prompt — "Did Gyre miss anything you know about?"
**FR29:** Persist to `.gyre/feedback.yaml` with timestamp
**FR30:** Explain commit workflow for team sharing
**FR53:** Display existing feedback entries at analysis start
**FR55:** Deferred review reminder on next run

### What NOT to Modify

- **Do NOT modify step-02-walkthrough.md** — Already validated in Story 4.2
- **Do NOT modify step-03-apply-amendments.md** — Already validated in Story 4.2
- **Do NOT modify step-05-summary.md** — Validated in Story 4.7
- **Do NOT modify Coach agent file** — Already validated in Story 4.1
- **Do NOT modify GC4 contract** — Already validated in Story 4.3

### Previous Story Intelligence

From Story 4.3 (GC4 contract) completion notes:
- All 25 validation subtasks passed — zero discrepancies
- GC4 feedback schema: timestamp, reporter, type (4 values), description, domain (5 values)
- GC4 frontmatter: contract=GC4, type=artifact, source_agent=coach, target_agents=[atlas], created, updated
- 7 feedback validation rules confirmed

From Story 4.2 (model review) completion notes:
- step-03 Load directive to step-04 confirmed
- workflow.md pipeline table verified

### Project Structure Notes

- step-04: `_bmad/bme/_gyre/workflows/model-review/steps/step-04-capture-feedback.md`
- step-01: `_bmad/bme/_gyre/workflows/model-review/steps/step-01-load-context.md`

### References

- [Source: _bmad-output/planning-artifacts/epic-gyre.md — Story 4.4 ACs]
- [Source: _bmad-output/planning-artifacts/architecture-gyre.md — feedback requirements]
- [Source: _bmad/bme/_gyre/workflows/model-review/steps/step-04-capture-feedback.md — Pre-existing file (108 lines)]
- [Source: _bmad/bme/_gyre/workflows/model-review/steps/step-01-load-context.md — Pre-existing file (87 lines)]
- [Source: _bmad-output/implementation-artifacts/gyre-4-3-gc4-feedback-loop-contract.md — Story 4.3 completion]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None — no errors encountered.

### Completion Notes List

- All 27 validation subtasks passed across 6 tasks and 2 files — zero discrepancies found
- Task 1 (step-04 structure, 108 lines): Frontmatter with FR28/FR29/FR30, 5 mandatory execution rules (prompt/persist/explain/schema/append-only), feedback prompt with 3 examples — all correct
- Task 2 (step-04 flow): Entry creation YAML template, 4-value type classification with inference rules, domain classification, iterative capture loop, file write (create/append), team sharing FR30, no-feedback handler, Load directive to step-05 — all correct
- Task 3 (step-01, 87 lines): Frontmatter with Stories 4.4/4.5, GC2 prerequisite with STOP, GC3 optional, existing feedback display FR53 (table format), deferred review reminder FR55, 3 review modes + skip, conditional routing (4 paths) — all correct
- Task 4 (step chain): step-04 → step-05 handoff confirmed, step-01 routing covers all 4 paths, workflow.md pipeline table correct, both files reference workflow: model-review — all correct
- Task 5 (GC4 cross-reference): Feedback entry schema matches GC4 body exactly, type enum matches, file creation frontmatter matches GC4 schema — all correct
- Task 6 (fix): No discrepancies found — fourth consecutive clean validation in Epic 4
- This is a validation-only story — no files were created or modified

### Change Log

- 2026-03-23: Full validation of step-04-capture-feedback.md (108 lines) and step-01-load-context.md (87 lines) — all checks passed, no changes needed

### File List

- `_bmad/bme/_gyre/workflows/model-review/steps/step-04-capture-feedback.md` (validated, no changes)
- `_bmad/bme/_gyre/workflows/model-review/steps/step-01-load-context.md` (validated, no changes)
