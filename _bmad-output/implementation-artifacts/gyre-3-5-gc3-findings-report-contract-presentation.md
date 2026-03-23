# Story 3.5: GC3 Findings Report Contract & Presentation

Status: done

## Story

As a Coach agent and user,
I want findings in a structured format with a clear conversational presentation,
So that I can understand what's missing and decide what to act on.

## Acceptance Criteria

1. **Given** the GC3 contract exists at `_bmad/bme/_gyre/contracts/gc3-findings-report.md`
   **When** Lens completes analysis
   **Then** it writes findings to `.gyre/findings.yaml` following the GC3 schema:
   - version, analyzed_at, mode, stack_summary, summary (counts), findings array, compound_findings array, sanity_check
   **And** contract frontmatter declares: source_agent: lens, target_agents: [coach]
   **And** every finding references a valid capability_ref from GC2

2. **Given** step-05-present-findings.md exists
   **When** Lens presents findings conversationally
   **Then** shows mode indicator: crisis or anticipation (FR37)
   **And** severity-first summary: "X blockers, Y recommended, Z nice-to-have" (FR33)
   **And** novelty ratio: "X of Y findings are contextual" (FR34)
   **And** detailed findings by severity (blockers first)
   **And** compound findings with reasoning chains (FR35)
   **And** output is copy-pasteable into Slack/Jira/docs (FR49)

3. **Given** analysis fails after model generation
   **When** Lens encounters a failure
   **Then** `.gyre/capabilities.yaml` is already saved (FR56)
   **And** Lens reports what it found and offers to retry the failed domain (NFR11)
   **And** partial results saved with incomplete labeling (FR57)

## Tasks / Subtasks

- [x] Task 1: Validate GC3 contract file (AC: #1)
  - [x] 1.1 Verify contract header: GC3, Artifact, Lens → Coach — confirmed line 3
  - [x] 1.2 Verify frontmatter schema: contract=GC3, type=artifact, source_agent=lens, source_workflow=gap-analysis, target_agents=[coach], input_artifacts=[GC2], created — confirmed lines 10-18
  - [x] 1.3 Verify frontmatter field reference table: 7 fields, all required — confirmed lines 23-31
  - [x] 1.4 Verify body schema: gyre_findings with version, analyzed_at, mode, stack_summary, summary, findings array, compound_findings array, sanity_check — confirmed lines 40-74
  - [x] 1.5 Verify findings field reference table: 9 required fields (id, domain, severity, source, confidence, capability_ref, description, evidence_summary, severity_rationale) — confirmed lines 79-89
  - [x] 1.6 Verify compound findings field reference table: 8 required fields (id, domain, severity, source, confidence, capability_ref array, related_findings array, combined_impact) — confirmed lines 93-102
  - [x] 1.7 Verify artifact location: `.gyre/findings.yaml`, overwritten each run, previous backed up to `.gyre/findings.previous.yaml` — confirmed lines 108-110
  - [x] 1.8 Verify downstream consumption: Coach (review-coach) for findings review and feedback — confirmed lines 117-118
  - [x] 1.9 Verify example YAML: complete GC3 artifact with frontmatter, findings, compound_findings, sanity_check — confirmed lines 124-179
  - [x] 1.10 Verify 11 validation rules: frontmatter (rule 1), body fields (rule 2), capability_ref from GC2 (rule 3), compound references 2 different domains (rule 4), compound confidence lower (rule 5), no low-confidence compounds (rule 6), unique IDs (rule 7), severity enum (rule 8), source enum (rule 9), confidence enum (rule 10), summary counts match (rule 11) — confirmed lines 186-197

- [x] Task 2: Validate step-05-present-findings.md structure (AC: #2)
  - [x] 2.1 Verify frontmatter: step=5, workflow=gap-analysis, title=Present Findings — confirmed lines 2-4
  - [x] 2.2 Verify mandatory execution rules: write GC3 first (line 13), severity-first FR33 (line 14), novelty ratio FR34 (line 15), compounds FR35 (line 16), copy-pasteable FR49 (line 17), error recovery NFR11 (line 18) — all 6 confirmed
  - [x] 2.3 Verify GC3 artifact write section: YAML template with frontmatter + gyre_findings structure — confirmed lines 22-53

- [x] Task 3: Validate conversational presentation format (AC: #2)
  - [x] 3.1 Verify mode indicator section (FR37): crisis/anticipation mode — confirmed lines 59-63
  - [x] 3.2 Verify severity-first summary (FR33): table with blockers/recommended/nice-to-have counts + novelty ratio — confirmed lines 65-78
  - [x] 3.3 Verify blocker findings presentation: finding ID, capability name, description, evidence, confidence, "Why blocker" severity_rationale — confirmed lines 80-90
  - [x] 3.4 Verify compound findings presentation (FR35): COMPOUND-NNN, combines OBS+DEP, impact reasoning chain, compound confidence — confirmed lines 92-101
  - [x] 3.5 Verify recommended findings presentation: table format with #/Finding/Capability/Confidence — confirmed lines 103-111
  - [x] 3.6 Verify nice-to-have findings presentation: table format — confirmed lines 113-121
  - [x] 3.7 Verify sanity check warnings section — confirmed lines 123-129
  - [x] 3.8 Verify summary footer: "Written to `.gyre/findings.yaml`" — confirmed lines 131-137

- [x] Task 4: Validate error recovery and compass (AC: #3)
  - [x] 4.1 Verify error recovery section: NFR11 (retry), FR56 (capabilities.yaml safe) — confirmed lines 139-158
  - [x] 4.2 Verify partial completion presentation: completed domain (checkmark) + failed domain (X) + 3 options (view/retry/exit) — confirmed lines 148-157
  - [x] 4.3 Verify Gyre Compass: 3 next-step recommendations — model-review/Coach, delta-report/Lens, model-generation/Atlas — confirmed lines 162-172

- [x] Task 5: Fix any discrepancies found in Tasks 1-4 — No discrepancies found

## Dev Notes

### Pre-existing Files — Validation Approach

Two files to validate:
- `_bmad/bme/_gyre/contracts/gc3-findings-report.md` — GC3 contract (198 lines)
- `_bmad/bme/_gyre/workflows/gap-analysis/steps/step-05-present-findings.md` — presentation step (173 lines)

Both exist from the 2026-03-21 architecture scaffolding.

### Architecture Reference — GC3 Contract

From `architecture-gyre.md`:

**GC3 Findings Report:**
- Contract: GC3 | Type: Artifact | Flow: Lens → Coach
- Output: `.gyre/findings.yaml`
- Contains: findings array (OBS-NNN/DEP-NNN), compound_findings array (COMPOUND-NNN), sanity_check
- Each finding has 9 required fields; each compound has 8 required fields
- 11 validation rules ensure data integrity

**Presentation requirements:**
- FR33: Severity-first summary
- FR34: Novelty ratio
- FR35: Compound findings with reasoning chains
- FR37: Mode indicator (crisis/anticipation)
- FR49: Copy-pasteable output
- FR56: Capabilities.yaml preserved on failure
- FR57: Partial results labeled incomplete
- NFR11: Retry on failed domain

### What NOT to Modify

- **Do NOT modify step-01 through step-04** — Already validated in Stories 3.2, 3.3, 3.4
- **Do NOT modify workflow.md** — Already validated in Story 3.2
- **Do NOT modify Lens agent file** — Already validated in Story 3.1
- **Do NOT modify GC2 contract** — Already validated in Story 2.4

### Previous Story Intelligence

From Story 3.4 completion notes:
- All 22 validation subtasks passed — zero discrepancies in step-04
- Compound finding schema validated: 10 fields, COMPOUND-NNN, contextual-model source
- Sanity check schema validated: passed (boolean), warnings (array)

From Story 3.2 completion notes:
- Finding schema validated: 9 fields per finding (OBS-NNN)
- Source tagging (FR19), confidence levels (FR20), severity guidelines (FR21) validated

### Project Structure Notes

- GC3 contract: `_bmad/bme/_gyre/contracts/gc3-findings-report.md`
- Step-05: `_bmad/bme/_gyre/workflows/gap-analysis/steps/step-05-present-findings.md`

### References

- [Source: _bmad-output/planning-artifacts/epic-gyre.md — Story 3.5 ACs]
- [Source: _bmad-output/planning-artifacts/architecture-gyre.md — GC3 contract, presentation requirements]
- [Source: _bmad/bme/_gyre/contracts/gc3-findings-report.md — Pre-existing GC3 contract]
- [Source: _bmad/bme/_gyre/workflows/gap-analysis/steps/step-05-present-findings.md — Pre-existing step file]
- [Source: _bmad-output/implementation-artifacts/gyre-3-4-cross-domain-correlation.md — Story 3.4 completion]
- [Source: _bmad-output/implementation-artifacts/gyre-3-2-observability-readiness-analysis.md — Story 3.2 finding schema]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None — no errors encountered.

### Completion Notes List

- All 24 validation subtasks passed across 5 tasks and 2 files — zero discrepancies found
- Task 1 (GC3 contract, 198 lines): Contract header (Lens → Coach), frontmatter schema (7 fields), body schema (gyre_findings with 8 top-level sections), findings field reference (9 required), compound field reference (8 required), artifact location (.gyre/findings.yaml with backup), downstream consumption (Coach), example YAML (complete), 11 validation rules — all correct
- Task 2 (step-05 structure): Frontmatter, 6 mandatory execution rules (FR33/FR34/FR35/FR49/NFR11 + write-first), GC3 YAML template — all correct
- Task 3 (presentation format): Mode indicator (FR37), severity-first summary table (FR33), blocker detail format, compound format with reasoning chains (FR35), recommended/nice-to-have tables, sanity warnings, summary footer — all 8 sections correct
- Task 4 (error recovery/compass): NFR11 retry + FR56 capabilities safe, partial completion with 3 options, Gyre Compass with 3 next-step recommendations — all correct
- Task 5 (fix): No discrepancies found — fifth consecutive clean validation in Epic 3
- This is a validation-only story — no files were created or modified

### Change Log

- 2026-03-23: Full validation of gc3-findings-report.md (198 lines) and step-05-present-findings.md (173 lines) — all checks passed, no changes needed

### File List

- `_bmad/bme/_gyre/contracts/gc3-findings-report.md` (validated, no changes)
- `_bmad/bme/_gyre/workflows/gap-analysis/steps/step-05-present-findings.md` (validated, no changes)
