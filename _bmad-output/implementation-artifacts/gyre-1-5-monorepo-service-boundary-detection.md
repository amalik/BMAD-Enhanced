# Story 1.5: Monorepo Service Boundary Detection

Status: review

## Story

As a user with a monorepo,
I want Scout to detect multiple services and ask me which one to analyze,
So that each service gets its own contextual model.

## Acceptance Criteria

1. **Given** Scout detects multiple directories with their own package manifest AND deployment config
   **When** ≥2 service roots are detected
   **Then** Scout lists them conversationally and asks user to select one (FR51)
   **And** the selection prompt includes a table with Service Root, Language, and Deployment Config columns

2. **Given** the detection criteria
   **When** Scout identifies service boundaries
   **Then** system does NOT attempt implicit boundary detection (directory naming conventions)
   **And** only flags directories with BOTH a manifest AND deployment config

3. **Given** a service is selected
   **When** Scout proceeds with analysis
   **Then** each selected service gets its own `.gyre/` directory at its service root (not the project root)
   **And** all subsequent workflow steps target the selected service root as analysis scope

## Tasks / Subtasks

- [x] Task 1: Validate monorepo detection in step-01-scan-filesystem.md (AC: #1, #2, #3)
  - [x] 1.1 Verify section 7 "Monorepo / Multi-Service Detection" exists with FR1b and FR51 references
  - [x] 1.2 Verify detection criteria: service root = directory with BOTH package manifest AND deployment config
  - [x] 1.3 Verify Glob patterns for manifests at depth 1-2: `*/package.json`, `*/go.mod`, `*/requirements.txt`, `*/Cargo.toml`, `*/pom.xml` (and depth 2 variants)
  - [x] 1.4 Verify deployment config check: "check if a deployment config exists in the same directory or its parent"
  - [x] 1.5 Verify ≥2 service roots triggers conversational selection prompt with table (Service Root, Language, Has Deployment Config)
  - [x] 1.6 Verify rule: do NOT attempt implicit boundary detection from directory naming conventions
  - [x] 1.7 Verify rule: only flag directories with BOTH a manifest AND deployment config
  - [x] 1.8 Verify rule: selected service root becomes analysis scope for all subsequent steps
  - [x] 1.9 Verify rule: `.gyre/` directory is created at selected service root, not project root
  - [x] 1.10 Verify single service fallback: project root as analysis scope, `.gyre/` at project root

- [x] Task 2: Validate monorepo handling in step-02-classify-stack.md (AC: #1, #2)
  - [x] 2.1 Verify section 2 "Multi-Stack Detection (FR1b)" exists
  - [x] 2.2 Verify rule: list each detected service root with its stack
  - [x] 2.3 Verify rule: do NOT attempt implicit boundary detection from directory naming
  - [x] 2.4 Verify secondary stack warning format includes path and description

- [x] Task 3: Validate GC1 contract supports monorepo (AC: #3)
  - [x] 3.1 Verify `secondary_stacks` field in body schema (string array, empty if single-stack)
  - [x] 3.2 Verify artifact location states: "relative to project root, or service root in monorepo"

- [x] Task 4: Fix any discrepancies found in Tasks 1-3 — No discrepancies found

## Dev Notes

### Implementation Already Exists

The monorepo detection logic is already fully implemented across three pre-existing files that were validated in previous stories:

1. **step-01-scan-filesystem.md** (section 7, lines 106-146) — Primary implementation: detection criteria, Glob patterns, selection prompt, rules, fallback. Validated in Story 1.3 (subtask 2.9).
2. **step-02-classify-stack.md** (section 2, lines 39-46) — Multi-stack classification and secondary stack warning. Validated in Story 1.3 (subtask 3.4).
3. **gc1-stack-profile.md** (lines 59, 79, 96) — `secondary_stacks` field and monorepo-aware artifact location. Validated in Story 1.4.

This story provides a focused cross-cutting validation that the monorepo detection feature (FR51) is coherently implemented across all three files. Previous stories validated each file independently; this story validates the feature as a whole.

### FR51 Definition (from PRD)

> **FR51:** System can detect service boundaries in monorepos using explicit signals: directories containing their own package manifest (package.json, go.mod, requirements.txt, Cargo.toml) AND their own Dockerfile or deployment config. If ≥2 service roots are detected, Scout lists them conversationally and asks the user to select one. System does NOT attempt implicit boundary detection (e.g., directory naming conventions).

### What NOT to Modify

- **Do NOT modify step-01-scan-filesystem.md** — Already validated in Story 1.3
- **Do NOT modify step-02-classify-stack.md** — Already validated in Story 1.3
- **Do NOT modify gc1-stack-profile.md** — Already validated in Story 1.4
- **Do NOT create new files** — This is a cross-cutting validation story

### Previous Story Intelligence

From Story 1.3 completion notes:
- step-01 section 7 (monorepo detection) validated with all rules present
- step-02 section 2 (multi-stack detection FR1b) validated with implicit boundary detection prohibition
- All validation passed with zero discrepancies

From Story 1.4 completion notes:
- GC1 `secondary_stacks` field validated as string array
- Artifact location notes monorepo service root placement

### Project Structure Notes

- step-01 monorepo section: `_bmad/bme/_gyre/workflows/stack-detection/steps/step-01-scan-filesystem.md` lines 106-146
- step-02 multi-stack section: `_bmad/bme/_gyre/workflows/stack-detection/steps/step-02-classify-stack.md` lines 39-46
- GC1 contract: `_bmad/bme/_gyre/contracts/gc1-stack-profile.md`

### References

- [Source: _bmad-output/planning-artifacts/epic-gyre.md — Story 1.5 ACs, lines 371-383]
- [Source: _bmad-output/planning-artifacts/prd-gyre.md — FR51 definition, line 676]
- [Source: _bmad/bme/_gyre/workflows/stack-detection/steps/step-01-scan-filesystem.md — Monorepo detection, lines 106-146]
- [Source: _bmad/bme/_gyre/workflows/stack-detection/steps/step-02-classify-stack.md — Multi-stack classification, lines 39-46]
- [Source: _bmad/bme/_gyre/contracts/gc1-stack-profile.md — secondary_stacks field, artifact location]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None — no errors encountered.

### Completion Notes List

- All 16 validation subtasks passed — zero discrepancies found
- FR51 monorepo detection coherently implemented across all 3 files
- step-01 section 7: detection criteria, Glob patterns, selection prompt, 4 rules, single-service fallback — all correct
- step-02 section 2: multi-stack classification with implicit boundary detection prohibition — correct
- GC1 contract: `secondary_stacks` field (string array) and monorepo-aware artifact location — correct
- Cross-cutting feature validation confirms no gaps between independently validated files
- This is a validation-only story — no files were created or modified

### Change Log

- 2026-03-23: Cross-cutting FR51 validation — all checks passed, no changes needed

### File List

- `_bmad/bme/_gyre/workflows/stack-detection/steps/step-01-scan-filesystem.md` (validated, no changes)
- `_bmad/bme/_gyre/workflows/stack-detection/steps/step-02-classify-stack.md` (validated, no changes)
- `_bmad/bme/_gyre/contracts/gc1-stack-profile.md` (validated, no changes)
