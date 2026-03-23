# Story 3.6: Full-Analysis Steps 4-5 Integration

Status: ready-for-dev

## Story

As a user running full-analysis,
I want the pipeline to flow from model generation through gap analysis,
So that the complete pipeline works end-to-end.

## Acceptance Criteria

1. **Given** full-analysis workflow has step-04-analyze-gaps and step-05-review-findings
   **When** Atlas completes model generation (step 3)
   **Then** control passes to Lens for gap analysis (step 4)
   **And** Lens runs all 5 gap-analysis workflow steps sequentially
   **And** GC3 is written to `.gyre/findings.yaml`
   **And** step-05-review-findings hands off to Coach (Epic 4 integration point)
   **And** error recovery preserves GC2 and offers retry on domain failure

2. **Given** step-05-review-findings.md exists
   **When** gap analysis completes
   **Then** presents findings summary (severity counts from GC3)
   **And** prompts user to review capabilities (FR43): walk through now / later / skip (FR55)
   **And** ends with full Gyre Compass routing table (NFR18)

## Tasks / Subtasks

- [ ] Task 1: Validate step-04-analyze-gaps.md (AC: #1)
  - [ ] 1.1 Verify frontmatter: step=4, workflow=full-analysis, title=Analyze Gaps
  - [ ] 1.2 Verify GC2 prerequisite: must have been written in step 3, STOP if missing
  - [ ] 1.3 Verify gap-analysis workflow delegation: all 5 steps referenced in sequence (step-01 through step-05)
  - [ ] 1.4 Verify time target: first finding <2 minutes from workflow start (NFR1)
  - [ ] 1.5 Verify GC3 write: `.gyre/findings.yaml` on completion
  - [ ] 1.6 Verify error recovery: GC2 safe, report partial, offer retry
  - [ ] 1.7 Verify Load step directive to step-05-review-findings.md

- [ ] Task 2: Validate step-05-review-findings.md (AC: #2)
  - [ ] 2.1 Verify frontmatter: step=5, workflow=full-analysis, title=Review Findings, implements=Epic 4
  - [ ] 2.2 Verify GC3 prerequisite: must have been written in step 4, STOP if missing
  - [ ] 2.3 Verify findings summary display: severity table (blockers/recommended/nice-to-have counts)
  - [ ] 2.4 Verify existing feedback check: `.gyre/feedback.yaml` (FR53)
  - [ ] 2.5 Verify review prompt (FR43, FR55): walk through now / later / skip
  - [ ] 2.6 Verify "walk through" handler: executes model-review workflow steps inline (step-02, step-03, step-04)
  - [ ] 2.7 Verify "later" handler: sets review_deferred=true, proceeds to feedback capture
  - [ ] 2.8 Verify "skip" handler: proceeds directly to feedback capture

- [ ] Task 3: Validate Gyre Compass and completion (AC: #2)
  - [ ] 3.1 Verify full-analysis complete section: lists all 4 GC artifacts (GC1-GC4)
  - [ ] 3.2 Verify Gyre Compass routing table: 8 rows covering all workflows and agents
  - [ ] 3.3 Verify cross-module recommendation: Vortex agents (Emma/Isla) for production readiness impact on discovery

- [ ] Task 4: Validate step chain continuity
  - [ ] 4.1 Verify step-04 Load directive points to step-05 (step 4 → step 5 handoff)
  - [ ] 4.2 Verify workflow.md pipeline table lists step-04 (Lens) and step-05 (Coach) with correct agents
  - [ ] 4.3 Verify both step files reference `workflow: full-analysis` in frontmatter

- [ ] Task 5: Fix any discrepancies found in Tasks 1-4

## Dev Notes

### Pre-existing Files — Validation Approach

Both step files already exist from the 2026-03-21 architecture scaffolding:
- `_bmad/bme/_gyre/workflows/full-analysis/steps/step-04-analyze-gaps.md` (43 lines)
- `_bmad/bme/_gyre/workflows/full-analysis/steps/step-05-review-findings.md` (129 lines)

This story validates these against the Epic 3 ACs for the gap-analysis → review-findings handoff. Same pattern as Story 2.5 (steps 2-3 integration).

### Architecture Reference — Full-Analysis Steps 4-5

From `architecture-gyre.md`:

**Workflow 1: full-analysis (Orchestrator)**

| Step | File | Agent | Action |
|------|------|-------|--------|
| 4 | step-04-analyze-gaps.md | Lens | Run gap-analysis inline, write GC3 |
| 5 | step-05-review-findings.md | Coach | Present findings, offer review, Gyre Compass |

**Step 4:** Delegates to gap-analysis workflow (5 steps, validated in Stories 3.2-3.5)
**Step 5:** Integration point for Epic 4 (Coach agent) — presents findings summary, offers model review, captures feedback

### What NOT to Modify

- **Do NOT modify step-02 or step-03** — Already validated in Story 2.5
- **Do NOT modify workflow.md** — Already validated in Story 1.7
- **Do NOT modify gap-analysis workflow files** — Already validated in Stories 3.2-3.5
- **Do NOT modify Lens agent file** — Already validated in Story 3.1

### Previous Story Intelligence

From Story 3.5 completion notes:
- All 24 validation subtasks passed — zero discrepancies in GC3 contract + step-05-present-findings
- GC3 schema fully validated: findings (9 fields), compounds (8 fields), 11 validation rules

From Story 2.5 completion notes (same integration pattern):
- All 16 subtasks passed across step-02/step-03 integration
- Same approach: frontmatter, prerequisite, workflow delegation, mode detection, step chain

### Project Structure Notes

- Full-analysis workflow: `_bmad/bme/_gyre/workflows/full-analysis/`
- Gap-analysis workflow: `_bmad/bme/_gyre/workflows/gap-analysis/`
- Model-review workflow: `_bmad/bme/_gyre/workflows/model-review/`

### References

- [Source: _bmad-output/planning-artifacts/epic-gyre.md — Story 3.6 ACs]
- [Source: _bmad-output/planning-artifacts/architecture-gyre.md — full-analysis steps 4-5]
- [Source: _bmad/bme/_gyre/workflows/full-analysis/steps/step-04-analyze-gaps.md — Pre-existing file]
- [Source: _bmad/bme/_gyre/workflows/full-analysis/steps/step-05-review-findings.md — Pre-existing file]
- [Source: _bmad-output/implementation-artifacts/gyre-3-5-gc3-findings-report-contract-presentation.md — Story 3.5 completion]
- [Source: _bmad-output/implementation-artifacts/gyre-2-5-full-analysis-steps-2-3-integration.md — Story 2.5 pattern]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### Change Log

### File List
