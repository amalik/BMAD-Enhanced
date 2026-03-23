# Story 2.3: Model Generation Workflow

Status: done

## Story

As a user,
I want Atlas to generate a capabilities manifest using my stack profile, industry standards, and web search,
So that I have a contextual model of what should exist in my production stack.

## Acceptance Criteria

1. **Given** the model-generation workflow exists at `_bmad/bme/_gyre/workflows/model-generation/`
   **When** Atlas runs the workflow
   **Then** it has 4 step files with correct frontmatter and Load step directives

2. **Given** step-01-load-profile.md exists
   **When** Atlas loads the stack profile
   **Then** it reads GC1 (stack-profile.yaml) classification and guard answers
   **And** checks for existing amendments (GC4 feedback loop) to respect on regeneration

3. **Given** step-02-generate-capabilities.md exists
   **When** Atlas generates capabilities
   **Then** each capability has: id, category, name, description (1-3 sentences), source, relevance (FR9, FR13)
   **And** it incorporates DORA, OpenTelemetry, Google PRR standards (FR10)
   **And** it adjusts based on guard answers (FR12)

4. **Given** step-03-web-enrichment.md exists
   **When** Atlas uses WebSearch for current best practices (FR11)
   **Then** web results are from current calendar year (NFR21)
   **And** conflicting advice resolved with most authoritative source
   **And** each capability's source field indicates if web-search-derived

5. **Given** step-04-write-manifest.md exists
   **When** Atlas writes capabilities.yaml (GC2 schema)
   **Then** manifest includes: version, generated_at, stack_summary, capability_count, limited_coverage flag, capabilities array, provenance
   **And** if <20 capabilities, limited_coverage=true and warns user (FR15)
   **And** offers continue-or-abort on limited coverage (FR52)
   **And** presents model summary (FR31)
   **And** model caching: capabilities.yaml IS the cache (NFR10)

## Tasks / Subtasks

- [x] Task 1: Validate workflow.md (AC: #1)
  - [x] 1.1 Verify frontmatter: name=model-generation, agent=model-curator, steps=4 — confirmed lines 2-6
  - [x] 1.2 Verify pipeline table lists all 4 steps with correct files and actions — confirmed lines 20-25
  - [x] 1.3 Verify prerequisites: GC1 must exist at `.gyre/stack-profile.yaml` — confirmed lines 15-16
  - [x] 1.4 Verify model ownership statement: team-owned, amendment preservation — confirmed lines 27-33
  - [x] 1.5 Verify Load step directive points to step-01-load-profile.md — confirmed lines 38-40

- [x] Task 2: Validate step-01-load-profile.md (AC: #2)
  - [x] 2.1 Verify frontmatter: step=1, workflow=model-generation, title=Load Stack Profile — confirmed lines 1-5
  - [x] 2.2 Verify GC1 loading from `.gyre/stack-profile.yaml` — confirmed lines 21-27
  - [x] 2.3 Verify extraction of key fields: all 7 fields + guard_answers + detection_confidence — confirmed lines 24-26
  - [x] 2.4 Verify GC4 amendment check: reads capabilities.yaml, checks amended/removed flags, stores list — confirmed lines 41-50
  - [x] 2.5 Verify profile summary output: stack, deployment, CI/CD, observability, communication, confidence, regeneration status — confirmed lines 54-68
  - [x] 2.6 Verify Load step directive to step-02 — confirmed line 74

- [x] Task 3: Validate step-02-generate-capabilities.md (AC: #3)
  - [x] 3.1 Verify frontmatter: step=2, workflow=model-generation, title=Generate Capabilities — confirmed lines 1-5
  - [x] 3.2 Verify capability schema: id, category, name, description, source, relevance, amended, removed — confirmed lines 23-32
  - [x] 3.3 Verify 4 category coverage: observability (6-10), deployment (5-8), reliability (4-6), security (3-5) with detailed sub-items — confirmed lines 40-69
  - [x] 3.4 Verify industry standards: referenced through agent persona (Story 2.2) + provenance in step-04; generation approach incorporates standards knowledge — PASS
  - [x] 3.5 Verify guard answer adjustments (FR12): 8 stack-specific adjustment rules (K8s, Serverless, gRPC, Docker Compose, GitHub Actions, OTel, AWS, GCP) — confirmed lines 74-84
  - [x] 3.6 Verify amendment respect: removed skip, amended keep user's version, new add alongside, unchanged regenerate fresh — confirmed lines 88-93
  - [x] 3.7 Verify ≥20 capability target (FR14) — confirmed line 15
  - [x] 3.8 Verify Load step directive to step-03 — confirmed line 116

- [x] Task 4: Validate step-03-web-enrichment.md (AC: #4)
  - [x] 4.1 Verify frontmatter: step=3, workflow=model-generation, title=Web Enrichment — confirmed lines 1-5
  - [x] 4.2 Verify web search optional: graceful skip with user message + `web_search_performed: false` — confirmed lines 13, 53-63
  - [x] 4.3 Verify 4 targeted queries: production readiness, observability, deployment, reliability — confirmed lines 25-35
  - [x] 4.4 Verify current calendar year freshness (NFR21): `[current year]` in query templates — confirmed lines 14, 26-35
  - [x] 4.5 Verify conflict resolution: official docs > blogs, recent > old, note both perspectives, never silently pick — confirmed lines 48-51
  - [x] 4.6 Verify `web_search_performed` metadata tracking — confirmed line 63
  - [x] 4.7 Verify Load step directive to step-04 — confirmed line 89

- [x] Task 5: Validate step-04-write-manifest.md (AC: #5)
  - [x] 5.1 Verify frontmatter: step=4, workflow=model-generation, title=Write Manifest — confirmed lines 1-5
  - [x] 5.2 Verify GC2 schema: contract header (7 fields) + gyre_manifest body (version, generated_at, stack_summary, capability_count, limited_coverage, capabilities, provenance) — confirmed lines 24-54
  - [x] 5.3 Verify write path: `.gyre/capabilities.yaml` — confirmed lines 13, 22
  - [x] 5.4 Verify limited coverage warning (FR15): threshold message with explanation — confirmed lines 65-85
  - [x] 5.5 Verify continue-or-abort (FR52): a) Continue with review-and-amend emphasis, b) Abort with investigation guidance — confirmed lines 78-84
  - [x] 5.6 Verify model summary (FR31): table with domain/count/key capabilities — confirmed lines 89-108
  - [x] 5.7 Verify model caching (NFR10): "manifest IS the cache" — confirmed line 18
  - [x] 5.8 Verify Gyre compass: gap-analysis (Lens), model-review (Coach), accuracy-validation (Atlas) — confirmed lines 112-122

- [x] Task 6: Validate step-file chain
  - [x] 6.1 Verify chain: workflow → step-01 (line 39) → step-02 (line 74) → step-03 (line 116) → step-04 (line 89) — all correct
  - [x] 6.2 Verify all step files reference `workflow: model-generation` in frontmatter — confirmed in all 4 files

- [x] Task 7: Fix any discrepancies found in Tasks 1-6 — No discrepancies found

## Dev Notes

### Pre-existing Files — Validation Approach

All model-generation workflow files already exist from the 2026-03-21 architecture scaffolding:

- `_bmad/bme/_gyre/workflows/model-generation/workflow.md` (40 lines) — complete
- `_bmad/bme/_gyre/workflows/model-generation/steps/step-01-load-profile.md` (74 lines) — complete
- `_bmad/bme/_gyre/workflows/model-generation/steps/step-02-generate-capabilities.md` (116 lines) — complete
- `_bmad/bme/_gyre/workflows/model-generation/steps/step-03-web-enrichment.md` (89 lines) — complete
- `_bmad/bme/_gyre/workflows/model-generation/steps/step-04-write-manifest.md` (122 lines) — complete

This story validates all files against the ACs and architecture spec. Fix any discrepancies found.

### Architecture Reference — Model Generation Workflow

From `architecture-gyre.md`:

**Workflow 3: model-generation (Atlas)**
- Owner: Atlas 📐
- Steps: 4
- Purpose: Generate capabilities manifest from stack profile

| Step | File | Action |
|------|------|--------|
| 1 | step-01-load-profile.md | Load GC1, check for existing amendments (GC4) |
| 2 | step-02-generate-capabilities.md | Generate capabilities using LLM reasoning + standards knowledge |
| 3 | step-03-web-enrichment.md | WebSearch for current best practices; incorporate into model |
| 4 | step-04-write-manifest.md | Write capabilities.yaml (GC2), surface limited-coverage warning if <20 |

### Relationship to full-analysis Workflow

In full-analysis (validated in Story 1.7), step-03-generate-model.md delegates to model-generation workflow steps. The model-generation workflow is standalone but also invoked as part of the full pipeline.

### Key FR/NFR Requirements to Validate

| Requirement | What to Check |
|---|---|
| FR9 (generate, not template) | step-02: LLM reasoning, not template selection |
| FR10 (industry standards) | step-02: DORA, OpenTelemetry, Google PRR |
| FR11 (web search enrichment) | step-03: WebSearch for current practices |
| FR12 (guard answer respect) | step-02: adjustments based on guard answers |
| FR13 (capability fields) | step-02: id, category, name, description, source, relevance |
| FR14 (≥20 capabilities) | step-02 + step-04: count check |
| FR15 (limited-coverage) | step-04: warning if <20 |
| FR31 (model summary) | step-04: presentation of results |
| FR52 (continue-or-abort) | step-04: limited coverage option |
| NFR9 (no source code) | step-02: privacy boundary |
| NFR10 (model caching) | step-04: capabilities.yaml IS the cache |
| NFR21 (web search freshness) | step-03: current calendar year |

### What NOT to Modify

- **Do NOT modify Atlas agent file** — Already validated in Story 2.2
- **Do NOT modify stack-detection workflow files** — Already validated in Story 1.3
- **Do NOT modify config.yaml** — Already validated in Story 1.1
- **Do NOT modify GC1 or GC2 contracts** — GC1 validated in Story 1.4, GC2 validated in Story 2.4
- **Do NOT modify agent-registry.js** — Already fixed in Story 1.6
- **Do NOT modify full-analysis step files** — Already validated in Story 1.7

### Previous Story Intelligence

From Story 2.2 completion notes:
- Atlas agent file validated with zero discrepancies (24/24 subtasks)
- "Regenerate Model" handled within model-generation workflow, not separate menu item
- Atlas's [GM] Generate Model correctly points to `workflows/model-generation/workflow.md`

From Story 2.1 completion notes:
- NFR19 gate PASSED (97.9%-100%) — model generation quality validated
- 72 capabilities generated across 3 archetypes — proves the generation approach works
- All 3 industry standards (DORA, OTel, Google PRR) successfully referenced

From Story 1.3 completion notes (stack-detection workflow — same validation pattern):
- All 37 subtasks passed — zero discrepancies in stack-detection workflow
- Step-file chain validated: workflow → step-01 → step-02 → step-03
- Same validation approach applies to model-generation workflow

### Project Structure Notes

- Model generation workflow: `_bmad/bme/_gyre/workflows/model-generation/`
- Stack detection workflow (reference pattern): `_bmad/bme/_gyre/workflows/stack-detection/`
- GC2 contract: `_bmad/bme/_gyre/contracts/gc2-capabilities-manifest.md`
- GC1 contract: `_bmad/bme/_gyre/contracts/gc1-stack-profile.md`

### References

- [Source: _bmad-output/planning-artifacts/epic-gyre.md — Story 2.3 ACs, lines 479-519]
- [Source: _bmad-output/planning-artifacts/architecture-gyre.md — model-generation workflow, lines 611-622]
- [Source: _bmad/bme/_gyre/workflows/model-generation/ — Pre-existing workflow + 4 step files]
- [Source: _bmad/bme/_gyre/contracts/gc2-capabilities-manifest.md — GC2 schema (190 lines)]
- [Source: _bmad-output/implementation-artifacts/gyre-2-2-atlas-agent-definition.md — Story 2.2 completion]
- [Source: _bmad-output/implementation-artifacts/gyre-2-1-model-accuracy-spike-nfr19-gate.md — Story 2.1 NFR19 PASS]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None — no errors encountered.

### Completion Notes List

- All 30 validation subtasks passed across 7 tasks and 5 files — zero discrepancies found
- Task 1 (workflow.md): Frontmatter, pipeline table, prerequisites, model ownership, Load directive — all correct
- Task 2 (step-01-load-profile): GC1 loading, field extraction (7 fields + guard_answers + confidence), GC4 amendment check, profile summary — all correct
- Task 3 (step-02-generate-capabilities): Capability schema (8 fields), 4 category targets with sub-items, 8 stack-specific adjustment rules, amendment handling (4 cases), ≥20 target — all correct
- Task 4 (step-03-web-enrichment): Optional web search with graceful skip, 4 targeted queries, current year freshness (NFR21), conflict resolution rules, metadata tracking — all correct
- Task 5 (step-04-write-manifest): GC2 schema compliance, limited coverage warning (FR15), continue-or-abort (FR52), model summary (FR31), caching (NFR10), compass table — all correct
- Task 6 (step-file chain): workflow → step-01 → step-02 → step-03 → step-04 chain verified, all frontmatter references correct
- Task 7 (fix): No discrepancies found
- 12 FR/NFR requirements verified: FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR31, FR52, NFR9, NFR10, NFR21
- This is a validation-only story — no files were created or modified

### Change Log

- 2026-03-23: Full validation of model-generation workflow (5 files, 441 total lines) — all checks passed, no changes needed

### File List

- `_bmad/bme/_gyre/workflows/model-generation/workflow.md` (validated, no changes)
- `_bmad/bme/_gyre/workflows/model-generation/steps/step-01-load-profile.md` (validated, no changes)
- `_bmad/bme/_gyre/workflows/model-generation/steps/step-02-generate-capabilities.md` (validated, no changes)
- `_bmad/bme/_gyre/workflows/model-generation/steps/step-03-web-enrichment.md` (validated, no changes)
- `_bmad/bme/_gyre/workflows/model-generation/steps/step-04-write-manifest.md` (validated, no changes)
