# Story 2.3: Model Generation Workflow

Status: ready-for-dev

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

- [ ] Task 1: Validate workflow.md (AC: #1)
  - [ ] 1.1 Verify frontmatter: name=model-generation, agent=model-curator, steps=4
  - [ ] 1.2 Verify pipeline table lists all 4 steps with correct files and actions
  - [ ] 1.3 Verify prerequisites: GC1 must exist at `.gyre/stack-profile.yaml`
  - [ ] 1.4 Verify model ownership statement: team-owned, amendment preservation
  - [ ] 1.5 Verify Load step directive points to step-01-load-profile.md

- [ ] Task 2: Validate step-01-load-profile.md (AC: #2)
  - [ ] 2.1 Verify frontmatter: step=1, workflow=model-generation, title
  - [ ] 2.2 Verify GC1 loading from `.gyre/stack-profile.yaml`
  - [ ] 2.3 Verify extraction of key fields: primary_language, primary_framework, container_orchestration, ci_cd_platform, observability_tooling, cloud_provider, communication_protocol
  - [ ] 2.4 Verify GC4 amendment check: looks for existing feedback to respect on regeneration
  - [ ] 2.5 Verify profile summary output
  - [ ] 2.6 Verify Load step directive to step-02-generate-capabilities.md

- [ ] Task 3: Validate step-02-generate-capabilities.md (AC: #3)
  - [ ] 3.1 Verify frontmatter: step=2, workflow=model-generation, title
  - [ ] 3.2 Verify capability schema: id, category, name, description, source, relevance, amended, removed
  - [ ] 3.3 Verify 4 category coverage targets: observability (6-10), deployment (5-8), reliability (4-6), security (3-5)
  - [ ] 3.4 Verify industry standards incorporation: DORA, OpenTelemetry, Google PRR (FR10)
  - [ ] 3.5 Verify guard answer adjustments (FR12): stack-specific tuning examples
  - [ ] 3.6 Verify amendment respect: removed capabilities skip, amended capabilities preserve user versions
  - [ ] 3.7 Verify ≥20 capability target (FR14)
  - [ ] 3.8 Verify Load step directive to step-03-web-enrichment.md

- [ ] Task 4: Validate step-03-web-enrichment.md (AC: #4)
  - [ ] 4.1 Verify frontmatter: step=3, workflow=model-generation, title
  - [ ] 4.2 Verify web search is optional (graceful skip if WebSearch unavailable)
  - [ ] 4.3 Verify targeted search queries cover: production readiness, observability, deployment, reliability
  - [ ] 4.4 Verify current calendar year freshness requirement (NFR21)
  - [ ] 4.5 Verify conflict resolution: official docs > blogs, recent > old, transparency about disagreements
  - [ ] 4.6 Verify `web_search_performed` metadata tracking
  - [ ] 4.7 Verify Load step directive to step-04-write-manifest.md

- [ ] Task 5: Validate step-04-write-manifest.md (AC: #5)
  - [ ] 5.1 Verify frontmatter: step=4, workflow=model-generation, title
  - [ ] 5.2 Verify GC2 schema compliance: contract header + gyre_manifest body (version, generated_at, stack_summary, capability_count, limited_coverage, capabilities, provenance)
  - [ ] 5.3 Verify write path: `.gyre/capabilities.yaml`
  - [ ] 5.4 Verify limited coverage warning (FR15): if <20 capabilities, warn user
  - [ ] 5.5 Verify continue-or-abort option on limited coverage (FR52)
  - [ ] 5.6 Verify model summary presentation (FR31): capability distribution by domain
  - [ ] 5.7 Verify model caching statement (NFR10): capabilities.yaml IS the cache
  - [ ] 5.8 Verify Gyre compass routing table at end of step

- [ ] Task 6: Validate step-file chain
  - [ ] 6.1 Verify Load step directives chain: workflow → step-01 → step-02 → step-03 → step-04
  - [ ] 6.2 Verify all step files reference correct workflow name in frontmatter

- [ ] Task 7: Fix any discrepancies found in Tasks 1-6

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

### Debug Log References

### Completion Notes List

### Change Log

### File List
