# Story 3.4: Cross-Domain Correlation

Status: done

## Story

As a user,
I want Lens to identify compound findings that span observability and deployment,
So that I can see interaction effects between domains.

## Acceptance Criteria

1. **Given** the gap-analysis workflow step-04-cross-domain-correlation.md exists
   **When** both domain analyses are complete
   **Then** Lens identifies causal or amplifying relationships between domains (FR22a)
   **And** each compound finding references exactly 2 existing findings from different domains
   **And** compound confidence = lower of the two component confidences
   **And** compounds suppressed when either component has confidence "low" (NFR22)
   **And** each compound includes: related_findings[], combined_impact reasoning chain (FR22b)
   **And** correlation only runs when both domains succeed — omitted (not partial) on domain failure

## Tasks / Subtasks

- [x] Task 1: Validate step-04 mandatory execution rules (AC: #1)
  - [x] 1.1 Verify frontmatter: step=4, workflow=gap-analysis, title=Cross-Domain Correlation — confirmed lines 2-4
  - [x] 1.2 Verify prerequisite: only runs if BOTH domain analyses (steps 2 and 3) completed successfully — confirmed line 13
  - [x] 1.3 Verify domain failure handling: skip correlation and note in report — confirmed line 14
  - [x] 1.4 Verify each compound references exactly 2 findings from DIFFERENT domains — confirmed line 15
  - [x] 1.5 Verify compound confidence = lower of two component confidences — confirmed line 16
  - [x] 1.6 Verify suppression: compounds suppressed when either component has confidence "low" (NFR22) — confirmed line 17

- [x] Task 2: Validate correlation patterns (AC: #1)
  - [x] 2.1 Verify high-priority compounds table: 5 rows (health checks+rollback, logging+deployment markers, tracing+circuit breakers, metrics+alerting, error tracking+graceful shutdown) — confirmed lines 25-31
  - [x] 2.2 Verify medium-priority compounds table: 3 rows (tracing+canary, metrics+autoscaling, log correlation+multiple services) — confirmed lines 35-39
  - [x] 2.3 Verify each compound has observability finding + deployment finding + compound impact description — confirmed all 8 rows

- [x] Task 3: Validate compound finding schema (AC: #1)
  - [x] 3.1 Verify schema fields: id (COMPOUND-NNN), domain (cross-domain), severity, source (contextual-model), confidence, capability_ref (array of 2), description, evidence_summary, related_findings (array of 2: OBS-NNN + DEP-NNN), combined_impact — all 10 fields confirmed lines 44-53
  - [x] 3.2 Verify source is always "contextual-model" for compounds — confirmed line 47
  - [x] 3.3 Verify related_findings references OBS-NNN and DEP-NNN (different domains) — confirmed line 52

- [x] Task 4: Validate correlation process and sanity check (AC: #1)
  - [x] 4.1 Verify 4-step correlation process: match findings (line 58), verify different domains (line 60), verify not low confidence (line 61), verify genuine amplification (line 62) — confirmed
  - [x] 4.2 Verify compound severity can be higher than either component — confirmed line 63
  - [x] 4.3 Verify reasoning chain requirement: WHY two gaps together are worse — confirmed line 64
  - [x] 4.4 Verify sanity check schema: passed (boolean), warnings (array) — confirmed lines 70-74
  - [x] 4.5 Verify sanity warnings: >80% missing (wrong archetype, line 77), >5 compounds (over-correlation, line 78), one-domain-only (correlation skipped, line 79) — confirmed

- [x] Task 5: Validate output format and step chain (AC: #1)
  - [x] 5.1 Verify output: amplification patterns checked count, compound findings count — confirmed lines 87-88
  - [x] 5.2 Verify output handles both cases: compounds found (list with IDs, lines 90-93) and no compounds (independence message, lines 95-96) — confirmed
  - [x] 5.3 Verify Load step directive to step-05-present-findings.md — confirmed line 105

- [x] Task 6: Fix any discrepancies found in Tasks 1-5 — No discrepancies found

## Dev Notes

### Pre-existing File — Validation Approach

The file `_bmad/bme/_gyre/workflows/gap-analysis/steps/step-04-cross-domain-correlation.md` already exists from the 2026-03-21 architecture scaffolding (106 lines). This story validates it against the ACs.

### Architecture Reference — Cross-Domain Correlation

From `architecture-gyre.md`:

**Compound finding rules:**
- Each compound references exactly 2 existing findings from DIFFERENT domains
- Compound confidence = lower of the two component confidences
- Suppress when either component has confidence "low" (NFR22)
- Source is always "contextual-model" (inferred relationship, not file evidence)
- Compound severity may be higher than either component (amplification effect)

**High-priority correlation patterns (5):**
1. No health checks + No rollback = Deployment risk amplifier
2. No structured logging + No deployment markers = Incident blindness
3. No distributed tracing + No circuit breakers = Cascade risk
4. No metrics + No alerting = Silent failure
5. No error tracking + No graceful shutdown = Data loss risk

**Medium-priority patterns (3):**
1. No tracing + No canary = Regression detection gap
2. No metrics + No autoscaling = Capacity blindness
3. No log correlation IDs + Multiple services = Debug difficulty

### Key FR/NFR Requirements to Validate

| Requirement | What to Check |
|---|---|
| FR22a (cross-domain compounds) | causal or amplifying relationships between domains |
| FR22b (compound relationships) | reasoning chain in combined_impact field |
| NFR22 (low-confidence suppression) | suppress compounds when either component is "low" |

### What NOT to Modify

- **Do NOT modify step-01, step-02, or step-03** — Already validated in Stories 3.2, 3.3
- **Do NOT modify step-05** — Validated in Story 3.5
- **Do NOT modify workflow.md** — Already validated in Story 3.2
- **Do NOT modify Lens agent file** — Already validated in Story 3.1

### Previous Story Intelligence

From Story 3.3 completion notes:
- All 17 validation subtasks passed — zero discrepancies in step-03-deployment-analysis.md
- 16 search pattern capabilities across 3 tables (deployment/reliability/security)

From Story 3.2 completion notes:
- All 22 validation subtasks passed — zero discrepancies across workflow.md, step-01, step-02
- 6 observability search patterns validated

### Project Structure Notes

- Target file: `_bmad/bme/_gyre/workflows/gap-analysis/steps/step-04-cross-domain-correlation.md`

### References

- [Source: _bmad-output/planning-artifacts/epic-gyre.md — Story 3.4 ACs]
- [Source: _bmad-output/planning-artifacts/architecture-gyre.md — compound finding rules]
- [Source: _bmad/bme/_gyre/workflows/gap-analysis/steps/step-04-cross-domain-correlation.md — Pre-existing file]
- [Source: _bmad-output/implementation-artifacts/gyre-3-3-deployment-readiness-analysis.md — Story 3.3 completion]
- [Source: _bmad-output/implementation-artifacts/gyre-3-2-observability-readiness-analysis.md — Story 3.2 completion]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None — no errors encountered.

### Completion Notes List

- All 22 validation subtasks passed across 6 tasks and 1 file — zero discrepancies found
- Task 1 (execution rules): Frontmatter, both-domains prerequisite, domain failure skip, exactly-2-findings constraint, lower-confidence rule, NFR22 low-confidence suppression — all correct
- Task 2 (correlation patterns): High-priority table (5 rows) and medium-priority table (3 rows) — 8 total compound patterns, each with observability + deployment finding + compound impact — all correct
- Task 3 (compound schema): 10-field schema (COMPOUND-NNN, cross-domain, contextual-model source, capability_ref array, related_findings OBS+DEP, combined_impact) — all correct
- Task 4 (process/sanity): 4-step correlation process, severity amplification, reasoning chain requirement, sanity check schema (passed/warnings), 3 warning conditions — all correct
- Task 5 (output/chain): Dual-case output (compounds found vs none), Load directive to step-05 — all correct
- Task 6 (fix): No discrepancies found — fourth consecutive clean validation in Epic 3
- This is a validation-only story — no files were created or modified

### Change Log

- 2026-03-23: Full validation of step-04-cross-domain-correlation.md (106 lines) — all checks passed, no changes needed

### File List

- `_bmad/bme/_gyre/workflows/gap-analysis/steps/step-04-cross-domain-correlation.md` (validated, no changes)
