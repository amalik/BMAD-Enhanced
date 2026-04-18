---
stepsCompleted:
  - step-01-init
  - step-02-context
inputDocuments:
  - _bmad-output/planning-artifacts/convoke-brief-initiative-lifecycle-engine.md
  - _bmad-output/planning-artifacts/convoke-brief-initiative-lifecycle-engine-distillate.md
  - _bmad-output/planning-artifacts/convoke-prd-initiative-lifecycle-engine.md
  - _bmad-output/planning-artifacts/convoke-report-implementation-readiness-initiative-lifecycle-engine.md
  - project-context.md
  - _bmad-output/planning-artifacts/convoke-note-initiative-lifecycle-backlog.md
  - _bmad-output/planning-artifacts/convoke-note-capability-evaluation-framework.md
workflowType: 'architecture'
initiative: convoke
artifact_type: arch
qualifier: initiative-lifecycle-engine
project_name: 'Convoke — Initiative Lifecycle Engine (ILE-1)'
user_name: 'Amalik'
date: '2026-04-18'
status: draft
schema_version: 1
---

# Architecture Decision Document — Initiative Lifecycle Engine (ILE-1)

**Author:** Winston (Architect)
**Date:** 2026-04-18
**Status:** Draft

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:** 63 FRs across 9 capability areas (from PRD):

1. Intake, Qualification & Lane Management (13 FRs) — data-layer writes with append-only semantics, role-based authorization
2. Portfolio Visibility & Navigation (9 FRs) — rendering layer, navigation continuity, consulting-scale performance
3. Reactive Behaviors & Trust Contract (7 FRs) — event detection, validity contracts, propose-before-commit (never silent commits)
4. Observability Signals (3 FRs) — S1–S4 computation from Change Log + backlog parsing
5. Shared Data Model, Integration & Governance (8 FRs) — the architectural spine; every other area depends on it
6. Onboarding, Help & Error Communication (8 FRs) — progressive disclosure, contextual help, error-category communication with seed registry
7. Interaction Safety & Recovery (4 FRs) — destructive-op confirmation, session undo, progress indication, error recovery
8. Schema Evolution, Migration & Lifecycle Completeness (7 FRs) — versioned frontmatter, breaking-change policy, migration on-invocation, uninstall
9. Developer Tooling & Debugging (4 FRs) — verbosity, daily-rotated decision logs, local-only transmission

**Non-Functional Requirements:** 36 NFRs. Load-bearing for architecture:

- NFR1/NFR2 — Performance SLO (end-to-end 5s/15s; ILE-1 code alone 2s/5s) with instrumented-fixture measurement
- NFR9 — Trust contract enforced against 4 TAC1 fixtures; zero silent state changes
- NFR13 — Atomic writes via write-to-tmp → verify → rename; static-analysis-enforceable
- NFR14 — `[INTERNAL]` error rate < 1% per 100-invocation window
- NFR19 — v6.2/v6.3 compatibility (conditional: build compat OR gate release)
- NFR21 — Portability via `bmad-validate-exports` with golden-file comparison
- NFR23 — Schema-version cross-skill match via `convoke-doctor` at install time
- NFR35 — Fixture-shipping CI check (orphan-reference detection)

### Scale & Complexity

- **Complexity:** High (per PRD classification)
- **Primary technical domain:** developer_tool + capability-layer; CLI + agent skills + markdown + Node.js
- **Architectural topology:** 8 first-class components + 4 extension/convention patterns + 1 shared utility module
- **Estimated execution:** 5–7 Convoke sprints baseline (3–10 range); sprint-level decomposition documented in PRD Scoping

### First-Class Components (8)

Each is independently buildable, testable, and replaceable:

1. **Shared data model library** — schema spec + validator + frontmatter I/O (3 internal modules, 1 library). Architectural spine; every other component depends on it.
2. **Event detection** *(reactive sub-1)* — detects lifecycle-state-change signals from the environment. Model choice (file-watch / git-hook / explicit / scheduled) is a cascading decision — see "Event model cascades" below.
3. **Validity contract evaluator** *(reactive sub-2)* — pure function: given an artifact + a validity contract from config, decide complete / uncertain / invalid. Deterministic, configurable, highly testable.
4. **Propose-before-commit orchestrator** *(reactive sub-3)* — given a should-advance signal + a validity result, produce a proposal (for `UNCERTAIN`) or commit (for `complete`). Never silent commits. Enforces the trust contract.
5. **Portfolio read surface** — kanban rendering + filtering + summary-first (>20 items) + drill-down. Renamed from "renderer" to reflect full read-layer scope.
6. **Observability library** — S1–S4 signal computation from Change Log + backlog parsing. Consumed by Portfolio read surface (explicit runtime coupling; see "Observability invocation contract" below).
7. **Migration engine** — schema-version detection + migration runner. Composes with Convoke's existing migration registry pattern; same discipline, distinct subject matter (data migrations vs. install migrations).
8. **Debug/log infrastructure** — rotation + verbosity + local-only. **Sprint 0 prerequisite, not parallel.** All other components depend on having a logger to emit into.

### Extension/Convention Patterns (4, not first-class components)

Architectural presence but not separate component surface:

- **Qualifying-gate workflow** — lives inside the initiatives-backlog skill's workflow steps (not a separate engine)
- **Contextual help convention** — per-skill help content + routing pattern (e.g., `explain <concept>` → registering skill's help registry)
- **Cross-skill integration contracts** — tests (TAC3 round-trip) + doctor checks (NFR23 version match). Quality gate, not new surface.
- **Extended `convoke-doctor` checks** — addition to existing infrastructure for ILE-1-specific schema validation, wrapper verification, version match

### Shared Utility Module

- **Error registry** (`scripts/lifecycle/lib/error-registry.js` or similar) — exports the 20 seed error codes as constants, category mappings (USER/CONFIG/INTERNAL/UNCERTAIN), `What to try:` remediation strings, `registerCode(category, code, message, remediation)` helper for FR48 registration rule. Precedent: `test-constants.js` + project-context.md `shared-test-constants` rule. Consumed by all ILE-1 skills via import. Not a first-class component (no behavior, just shape); not inside data model library (error contract is cross-cutting, not data-model-scoped).

### Technical Constraints & Dependencies

**Hard constraints (inherited):**

- Runs inside BMAD framework as Convoke skills — must pass BMAD's skill contract (SKILL.md activation, workflow.md orchestration, step-file architecture)
- Hosted by LLM coding agent (Claude Code primary; Copilot/Cursor via export pipeline)
- Filesystem-based state in a git repo; no database (data model decision pending — markdown-as-source vs. structured backing)
- Single-user-per-repo model; multi-user out of scope
- No external network dependencies beyond LLM provider

**Project-context.md rules that bind (13 rules):** test-fixture-isolation, no-hardcoded-versions, no-process-cwd-in-libs, path-safety-for-destructive-ops, namespace-decision-for-new-skills, slash-command-ux-for-user-facing-tools, no-code-in-party-mode, code-review-convergence, capability-form-factor-evaluation, derive-counts-from-source, shared-test-constants, catch-all-phase-review, spec-verify-referenced-files.

**Upstream BMAD (v6.3 direction):**

- BMAD v6.3 introduces direct-YAML loading, retires `bmad-init`, adds `marketplace.json`, introduces `bmm-dependencies.csv` for extensions
- ILE-1 is an "extension of BMM" — per v6.3 Adoption's WS4 (A9 extensions governance), ILE-1 should register entries in `bmm-dependencies.csv` for post-upgrade validation
- NFR19 decision pending: ILE-1 v1 supports v6.2 + v6.3, OR release gated behind v6.3 shipping

### Cross-Cutting Concerns (12 concerns in 3 layers)

Concerns are layered for pedagogical clarity — substrate concerns shape *what exists*, verification concerns shape *how we prove it works*, boundary concerns shape *who we talk to*.

**Layer 1 — Substrate (8 concerns):**

1. Shared data model schema (underlies all 9 capability areas)
2. Event model for reactive layer (file-watch / git-hook / explicit / scheduled; cascading decision)
3. Concurrency & locking (single-invocation-per-backlog via `.ile.lock`)
4. Error contract enforcement (4 categories × 20 seed codes × registration rule × `What to try:` format)
5. Logging/observability infrastructure (daily-rotated logs, local-only, verbosity flags)
6. Schema versioning & migration (versioned frontmatter, cross-version read, automatic migration)
7. Progressive-disclosure UX (bootstrap minimal, full on demand; contextual help; persona-matched calibration)
8. **Configuration layer** — team-level defaults + per-initiative overrides + artifact validity contracts + observability thresholds + help content; multi-level resolution + precedence rules

**Layer 2 — Verification (3 concerns):**

9. `convoke-doctor` integration (verification of schemas, wrapper presence, version match)
10. **Test infrastructure & fixture ownership** — TAC1 (4 uncertain-case fixtures), TAC3 (round-trip), TAC4 (consulting-scale + performance), error-code fixtures, uninstall partial states, git-workflow states, portability golden files per platform
11. Portability & export validation (`bmad-validate-exports` extensions; golden-file comparison)

**Layer 3 — Boundaries (1 concern):**

12. BMAD version compatibility (v6.2 + v6.3 conditional decision)

### Event Model Cascades

The event model choice (Architecture-phase open question) is not a localized decision. It touches components 1 (shared data model — detects what signals mean), 2 (event detection — how signals are captured), 3 (validity contract evaluator — what to do with a signal), 4 (propose-before-commit orchestrator — timing of proposal), 5 (portfolio read surface — when to render proposals), 6 (observability library — S1 acceptance-rate measurement window), 7 (migration engine — whether migrations trigger reactively or only on explicit invocation).

Options under consideration (to be decided in ADRs):

- **File-watch**: near-real-time, requires background daemon, OS-specific APIs, big posture shift (daemon vs. skill-only lifecycle)
- **Git-hook**: fires on commit, per-repo installation, bypassable (`--no-verify`), delayed detection
- **Explicit invocation only**: simplest, no daemon, no proactive surfacing — events only fire when user invokes a skill
- **Scheduled scan**: cron-like, assumes cron availability, polling interval trade-off

### Observability Invocation Contract

The Observability library is invoked by the Portfolio read surface on every render. At consulting scale (60+ initiatives × Change Log scanning for S1 + full-backlog scanning for S3 entropy), compute cost is non-trivial.

Architecture-phase decisions to make:

- What gets computed on every render vs. cached?
- Is caching in-scope for v1, or deferred to Growth?
- If deferred, does worst-case per-render compute fit within NFR1/NFR2 SLO (ILE-1 code < 2s median)?

NFR3 summary-first rendering (observability signals summary at top before listing items) is a partial mitigation; explicit computation strategy is pending.

### Architectural Posture (narrative summary)

ILE-1 is not a greenfield architecture. It's a **rework-plus-layering** architecture:

- **Rework**: three existing Convoke skills (initiatives-backlog v2.0.0, portfolio-status, migrate-artifacts) consolidated onto a shared data model (Components 1, 5, 6)
- **Layer**: new reactive-behaviors triad (Components 2–4) + observability library (Component 6 — partially new) + migration engine (Component 7) + debug/log infrastructure (Component 8)
- **Integrate**: cross-skill contracts, portability validation, doctor extension (verification layer concerns)
- **Constraint**: every architectural choice must preserve the propose-before-commit trust contract and comply with BMAD's skill contracts
