---
stepsCompleted:
  - step-01-init
  - step-02-context
  - step-03-starter
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

## Starter Template Evaluation

### Decision: No starter template applies

ILE-1 does not match any starter, scaffold, or seed template we could clone wholesale. The initiative is a **rework-plus-layering** of existing Convoke skills on an in-house framework (BMAD), grounded in conventions already established in this repository. The most reusable artifacts are **internal reference implementations** (below), not external starters.

### Technology decisions inherited from Convoke stack

Decided at the framework level; carried into ILE-1 without re-litigation:

- **Language / runtime**: Node.js ≥ 18, no compile step (CommonJS); Python ≥ 3.9 for tooling scripts subject to T6 CI gate
- **Package**: `convoke-agents` (npm); ILE-1 ships as skills + libraries inside the same package
- **Test framework**: `node:test` (the C1 phantom-test resolution standardized this; Jest is forbidden)
- **Lint**: `ruff` for Python (`ruff.toml` governs), `eslint` for JavaScript
- **Markdown substrate**: all artifacts are `.md` files with YAML frontmatter; file paths are the primary identifiers
- **Skill contract**: BMAD `SKILL.md` + `workflow.md` + `steps/` architecture; activation is the only entry point
- **CLI pattern**: `convoke-*` scripts in `scripts/` with `bin` entries in `package.json`; slash-command wrappers mandatory for user-facing tools (feedback_slash_command_ux rule)
- **Filesystem state**: git repo, no database; atomic writes via write-to-tmp → verify → rename (NFR13)

No library or framework adoption decisions are open at this layer. Component-internal choices (e.g., watcher library if the event-model ADR picks file-watch) are deferred to ADRs.

### Reference implementations — named patterns to mirror

Six in-repo reference implementations. For each, the specific transferable pattern is named — the rest of the file's shape should not be assumed to transfer.

1. **`_bmad/bme/_enhance/workflows/initiatives-backlog/` (v2.0.0)** — mirror the **step-file orchestration pattern**: `workflow.md` as declarative orchestrator + numbered `steps/NN-*.md` files with checklist-style instructions + `templates/` for output shapes. Transferable to Components 3 (validity contract evaluator skill surface) and 4 (propose-before-commit orchestrator skill surface). Do NOT transfer the lane-specific domain logic.
2. **`scripts/convoke-doctor.js`** — mirror the **check-registration + summary-reporting pattern**: each check is a function returning `{ ok, messages[] }`; a top-level runner collects results and emits a unified report. Transferable to Component 7 (migration engine's per-version check loop) and to the "Extended `convoke-doctor` checks" extension pattern (NFR23 schema-version cross-skill match).
3. **`tests/lib/test-constants.js`** — mirror the **shared-constants module pattern**: one file exporting named constants consumed by all tests, enforced by the `shared-test-constants` project-context rule. Transferable to the Error registry shared utility (Component-adjacent); same discipline (import constants, never duplicate strings).
4. **`scripts/update/lib/registry.js`** — mirror the **append-only migration registry pattern**: array of `{ fromVersion, toVersion, apply }` entries, registered in order, never mutated. Transferable to Component 7 (migration engine data-migration registry). Note: data migrations are a distinct registry from install migrations; same shape, separate instance.
5. **`scripts/update/lib/utils.js`** — mirror the **no-process.cwd pattern**: helpers like `findProjectRoot()`, `getPackageVersion()`, `compareVersions()` accept paths/versions as arguments; never read `process.cwd()` internally (no-process-cwd-in-libs rule). Transferable to every library component (1–8); bake the discipline in from day one.
6. **`scripts/update/lib/refresh-installation.js`** — mirror the **thin-delta-over-bulk-copy pattern**: migration files contain only the logic specific to that migration; shared file-copying work lives in a refresh helper. Transferable to Component 7 (migration engine): per-version migrations stay small; shared I/O and atomic-rename machinery live in a shared helper.

### Scaffolding tools available during implementation

Four scaffolding categories. Each has a concrete trigger — do not invoke speculatively.

1. **`bmad-workflow-builder`** — *applicable only for user-invokable sub-skill wrappers ILE-1 may add*. The 8 first-class components are libraries and are NOT scaffolded via workflow-builder. **Trigger**: an ILE-1 story requires creating a new user-invokable skill wrapper (a command surface the user types, e.g., slash command or `convoke-*` CLI). **Example**: if we add a `convoke-ile-logs` query sub-command or an `explain <concept>` contextual-help skill, scaffold via workflow-builder. **Do not use** for Components 1–8 internal libraries, validator functions, or the event-detection engine.
2. **Clone-and-fork seed** — for components with close structural analogs in-repo. **Trigger**: a new component's shape closely matches an existing skill/module. **Examples**: (a) clone `_bmad/bme/_enhance/workflows/initiatives-backlog/v2.0.0/{workflow.md, steps/}` as the seed for any new user-invokable skill surface under Components 3 or 4; (b) clone `scripts/update/lib/registry.js` as the seed for Component 7's data-migration registry. Seeds are starting points, not scaffolds — expect to delete and rename extensively.
3. **Reference implementations** — in-place patterns to read and translate, not clone (six named above). **Trigger**: a component needs a shape but not a skeleton. Consult the reference, carry the *pattern*, rewrite from scratch.
4. **Technology decisions inherited** — the baked-in substrate (above). **Trigger**: any component. No decision required; reuse the stack.

### Considered and rejected

Explicitly evaluated and ruled out:

- **Team Factory** (Convoke's own factory workflow) — wrong shape. Team Factory scaffolds multi-agent teams + workflows for discovery domains. ILE-1 adds no new agents and is governance infrastructure, not a discovery stream.
- **`bmad-agent-builder`** — ILE-1 creates no new agents. Existing agents (John PM, Winston Architect, Vortex personas) are consumers of ILE-1, not products of it.
- **`oclif` / `commander` / other CLI frameworks** — containment violation. Convoke CLIs use hand-rolled argv parsing in `scripts/convoke-*.js`; adopting a framework here would be a framework-wide decision outside ILE-1's scope.
- **Code generators** (e.g., Yeoman, plop) — tooling overhead exceeds benefit at ILE-1's scale. Eight components do not justify a generator; the clone-and-fork seed pattern is lighter-weight.

### Deferred to ADRs (Step 4+)

These decisions were surfaced during context analysis and require first-class ADRs, not starter-template evaluation:

1. **Event model** — file-watch / git-hook / explicit-invocation-only / scheduled-scan (cascades through Components 1, 2, 3, 4, 5, 6, 7)
2. **Shared data model substrate** — markdown-as-source vs. structured backing (SQLite, JSON index, etc.)
3. **Observability caching strategy** — v1 in-scope or deferred to Growth; fit-to-SLO analysis
4. **BMAD version compatibility** — NFR19: v6.2 + v6.3 dual-support vs. release gated behind v6.3
5. **Concurrency model** — `.ile.lock` shape, scope (per-backlog vs. per-repo), failure semantics
6. **Schema-migration trigger model** — reactive-on-event vs. explicit-on-invocation-only (coupled to event-model decision)

---

### Step 3 menu

**[A] Advanced Elicitation** — further refine the Starter Template Evaluation section
**[P] Party Mode** — additional multi-perspective review
**[C] Continue** — save and proceed to Step 4 (architectural decisions — ADRs for the 6 deferred decisions)
