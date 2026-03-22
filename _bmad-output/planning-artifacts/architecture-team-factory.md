---
stepsCompleted: [1, 2, 3]
inputDocuments:
  - _bmad-output/planning-artifacts/prd-team-factory.md
  - _bmad-output/vortex-artifacts/vision-team-factory-2026-03-21.md
  - _bmad-output/vortex-artifacts/decision-scope-team-factory-2026-03-21.md
  - _bmad-output/vortex-artifacts/adr-assumption-map-team-factory-2026-03-22.md
  - _bmad-output/planning-artifacts/brief-gyre-2026-03-19.md
  - _bmad-output/planning-artifacts/report-prd-validation-team-factory.md
workflowType: 'architecture'
project_name: 'Team Factory'
user_name: 'Amalik'
date: '2026-03-22'
---

# Architecture Decision Document — Team Factory

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

---

## Project Context Analysis

_Enhanced through 4 elicitation rounds (Architecture Decision Records, Pre-mortem Analysis, Self-Consistency Validation, Graph of Thoughts) and 3 party mode sessions._

### Requirements Overview

**Functional Requirements:** 26 FRs across three progressive phases:
- **Phase 1 (7 FRs):** Architecture Reference — machine-consumable checklist organized around four quality properties, validated bidirectionally against Gyre
- **Phase 2 (17 FRs):** Add Team workflow — forced decision points, BMB delegation, integration wiring, overlap detection, spec file persistence, end-to-end validation
- **Phase 3 (2 FRs):** Extension workflows — Add Agent, Add Skill to existing teams

**Non-Functional Requirements:** 18 NFRs with architectural impact:

| NFR Cluster | Impact on Architecture |
|-------------|----------------------|
| Usability (NFR1-2) | Progressive disclosure drives step decomposition and concept budget per step (≤3) |
| Reliability (NFR3-4) | First-run validation and idempotency require deterministic generation paths. NFR3 scope bounded by validator coverage — structural pass ≠ semantic correctness (see Q3). NFR4 idempotency scoped to within-version — cross-version behavior is Q5. |
| Maintainability (NFR5-6) | Reference as runtime dependency; factory-authored code limited to 4 wiring formats |
| Compatibility (NFR7-8) | Output indistinguishable from native teams; fully local, Claude Code interaction model |
| Write Safety (NFR12-13, 15, 17) | Unified protocol: stage → validate → check (dirty-tree) → apply → verify. Per-write, not per-workflow. Additive only. No partial writes. |
| Discoverability (NFR10) | Entry point wired into 4 enumerated surfaces + intent-based routing via LLM reasoning |
| Recoverability (NFR9, 11) | Spec file resume; pinpointed error messages with step name + decision ID |
| Auditability (NFR16) | File manifest of created + modified files per factory run |
| Performance (NFR18) | Sequential per-agent, JIT loading, micro-file architecture |
| Security (NFR14) | Safe templating — no raw interpolation of user input into executable files |

### Scale & Complexity

Complexity varies by phase — separating prevents over-engineering early work:

| Dimension | Phase 1 | Phase 2 |
|-----------|---------|---------|
| Complexity Level | **Low** — single reference document | **Medium** — workflow + JS utilities + file writers |
| Primary Domain | Technical writing + structural analysis | BMAD workflow + JS utilities |
| Components | 1 (Architecture Reference) | ~6 (workflow steps, spec file, JS validators, format-aware writers, BMB templates, validation pipeline) |
| JS Utilities Needed | None | Directory validation, naming enforcement, cascade logic, config collision check, registration format, file manifest |
| Integration Surfaces | 0 (document only) | 8 (registry, config, refresh, validator, contracts, help CSV, activation XML, naming) |

### Technical Constraints & Dependencies

**Closed Constraints (settled in PRD — not open for debate):**

| # | Constraint | Source |
|---|-----------|--------|
| C1 | Factory runtime = BMAD workflow (step files + frontmatter) | PRD §10 |
| C2 | BMB integration = Template embedding (Option C) — factory loads shared templates directly | PRD §10 |
| C4 | Claude Code interaction model — fully local, no external tooling | NFR8 |
| C6 | Micro-file architecture, JIT loading, sequential per-agent processing | NFR18 |
| C7 | Additive-only shared file operations | NFR17 |
| C8 | BMB template externalization is a prerequisite gate (P1/P6), not an architecture choice | PRD §11 |

**Note:** C1-C8 are genuinely closed. However, FR3 (four quality properties) and FR17 (cascade by composition pattern) are **hypothesis-dependent** — they derive from A5' and A6' respectively, both "Test First / High lethality" in the assumption map. They will ship in v1 but the architecture should allow revision without rebuilding. See cross-cutting concern #8.

**Open Architectural Questions (to resolve in subsequent steps):**

| # | Question | Drives |
|---|---------|--------|
| Q1 | Architecture Reference format — how to make it consumable by three audiences: humans (reading), factory (parsing at runtime), and validator (checking compliance)? Minimum machine-extractable fields: required files per pattern, naming rules per entity type, registration entry format per wiring target, validation criteria per quality property. These fields become P2b acceptance criteria. | Phase 2 feasibility |
| Q2 | Format-aware writer design — four specialized writers (JS/YAML/CSV/XML), each ~30 lines with own validation. Generic abstraction adds indirection without shared logic. | Component architecture |
| Q3 | Validation layering — how do per-step, per-agent, and end-to-end validation compose? Must distinguish **structural validation** (files exist, names match, entries registered) from **semantic validation** (contracts are compatible, agent inputs match predecessor outputs, handoff artifact types align). NFR3's "first-run pass" is only as strong as what the validator checks. Semantic contract compatibility may exceed validator.js's current capability — architecture must decide where that validation lives. | Reliability architecture |
| Q4 | Spec file schema evolution — how does the schema handle future phase additions without breaking express mode? | Extensibility |
| Q5 | Factory evolution — how do reference changes affect teams created by prior factory versions? NFR4 idempotency is scoped within-version. When the reference changes (inevitable — A5' may fail, new patterns may emerge), do old spec files still produce valid output? Shapes whether versioned validation rules are built in from the start or retrofitted. | Long-term maintainability |

**Dependencies:**

| # | Dependency | Risk | Mitigation |
|---|-----------|------|------------|
| D1 | **Architecture Reference (HIGHEST RISK)** — Phase 2 is blocked if reference format fails machine consumption. Three consumers: human, factory workflow, validator. Format must be validated for triple consumption before Phase 2 begins. | High | P2 (human consumability test) + **P2b: factory-consumability spike** — write one reference section, then write a mock factory step that parses it. Acceptance criteria: factory can extract required files, naming rules, registration format, and validation criteria from the section without prose parsing. |
| D2 | BMB template externalization (P1/P6) — generation knowledge must be extracted as shared templates | Medium | Technical spike per PRD prerequisites |
| D4 | Existing validator.js — factory extends, does not replace | Low | — |
| D5 | agent-manifest.csv — overlap detection reads this at runtime | Low | — |
| D6 | config.yaml — field collision detection reads existing fields | Low | — |

### Cross-Cutting Concerns

**1. LLM/JS Boundary + Visibility** — The central design principle. Every factory operation must be classified: LLM reasoning (overlap detection, contract design, BMB curation, **Step 0 intent classification**) vs. JS deterministic (naming enforcement, cascade logic, config collision, file manifest). Step 0 is explicitly LLM-heavy — a colleague saying "I want to automate onboarding" requires reasoning about whether that's a team, an agent, or a skill. This cannot be keyword-routed. Misclassification in either direction degrades quality or reliability. Additionally, every operation carries a **visibility classification**: visible (shown to colleague for decision or approval) vs. silent (executed transparently). The concept budget (NFR2: ≤3 new concepts per step) constrains what crosses the visibility boundary. Example: Write Safety Protocol has 5 internal stages — the colleague sees only "Here's what will be added to agent-registry.js — approve?" The architecture must define the visibility boundary per step, not just the LLM/JS boundary.

**2. Write Safety Protocol** — NFR12, NFR13, NFR15, NFR17 together define a single pattern for all shared file operations:
```
Stage (prepare write in isolation)
  → Validate (check no collisions, format-correct, additive)
  → Check (dirty-tree detection IMMEDIATELY before write — not once at workflow start)
  → Apply (write to target)
  → Verify (re-read + re-parse full target file to confirm structural integrity post-write)
```
Dirty-tree check must run per-write, not per-workflow. The time gap between Step 0 and Step 5 (~40+ minutes) makes a startup-only check insufficient — the working tree can change between factory start and file write.

**3. Format Heterogeneity** — The 4 wiring formats have different atomicity and validation characteristics:

| Format | Target File | Atomicity | Validation Approach |
|--------|-------------|-----------|-------------------|
| JS | agent-registry.js | Structural — AST-parseable | Parse, validate export, append entry |
| YAML | config.yaml | Indentation-sensitive | Parse full file, validate no collision, serialize |
| CSV | module-help.csv | Positional — row-based | Validate header match, append row |
| XML | activation blocks (embedded in agent .md files) | Structured — but lives inside markdown, not standalone | Locate agent file, find activation section, parse XML fragment, validate schema, insert node |

**4. Context Window Pressure** — Micro-file architecture (NFR18) means each step loads only what it needs. Spec file is ground truth re-read at every step. Sequential per-agent processing avoids loading multiple agent contexts simultaneously. Architecture Reference sections must be individually addressable, not monolithic.

**5. Triple-Audience Reference** — The Architecture Reference must serve three consumers: humans (framework contributors reading it), the factory (parsing it at runtime for decision rules and validation criteria), and the validator (checking compliance against the same rules). This is D1's core tension — format choices that optimize for one consumer may degrade another. The factory-consumability spike (P2b) tests this before full commitment. Reference section granularity is constrained from both sides: small enough for JIT loading (concern #4) but large enough for meaningful machine extraction. This defines a **section size budget** — an explicit design parameter to resolve during Phase 1, not an emergent property.

**6. Mode Parity** — Any validation that runs in Guided Mode must also run in Express Mode, triggered differently but functionally equivalent. Key risk: Express Mode skips to Step 4 (Review), bypassing discovery-phase conversation — but FR12 (overlap detection), FR22 (naming enforcement), and FR16 (pattern-aware validation) must still execute against the spec file input. The architecture must ensure no validation is conversation-dependent — all checks must be runnable from spec file data alone.

**7. Intent-Based Discoverability** — NFR10 wires the factory into 4 surfaces (agent menu, module-help.csv, BMad Master, README). But discoverability is a natural language routing problem, not just a wiring problem. Step 0 is a **micro-discovery session** — colleagues don't know the word "team" in the BMAD sense. They describe problems ("I want to automate onboarding"), not solutions ("create a Sequential team"). Step 0 must classify intent through LLM reasoning, determine whether the need is a team, agent addition, or skill addition, and route accordingly. Colleagues who don't know what category their need falls into represent the majority case, not the edge case.

**8. Hypothesis Sensitivity** — Two core architectural choices are hypothesis-dependent, not PRD-settled:

| Component | Hypothesis | If Falsified |
|-----------|-----------|-------------|
| FR3 — Reference organized by four quality properties (Discoverable, Installable, Configurable, Composable) | A5' (High lethality, Medium uncertainty) | Reference structure, factory validation categories, and quality gate definitions need revision |
| FR17 — Cascade logic eliminates decisions by composition pattern (Independent, Sequential) | A6' (High lethality, Medium uncertainty) | Cascade tree, pattern-aware validation rules, and spec file schema need a third branch |
| Gyre bidirectional validation (FR6, P2) | A5', A6' | If reference organized by four properties can't predict Gyre's structure, the properties or patterns are wrong |

The Architecture Reference IS the test for A5'. Gyre validation IS the test for A6'. Both are "Test First" priority. The architecture should **isolate hypothesis-coupled components** so that revising four properties → three properties or adding a third composition pattern doesn't require rebuilding the factory's core workflow. Design for replaceability of these specific elements.

**Phase 1 instrumentation:** Self-instrumentation (#9) only produces data in Phase 2+. During Phase 1, Gyre validation is the hypothesis signal — it's the Phase 1 equivalent of the learning loop. Architecture should treat FR6/P2 results as formal A5'/A6' evidence, not just a prerequisite checkbox.

**9. Self-Instrumentation** — The spec file is not just state persistence — it's the factory's learning loop. Per-decision `default_accepted` flags reveal bad defaults. `pattern_fit` flags reveal model gaps (A6' validation). `hardest_step` and `would_use_again` reveal UX bottlenecks. Architecture must ensure: (a) metrics collection is non-intrusive — 2 post-completion questions + automatic fields captured throughout, (b) metrics don't disrupt the concept budget, (c) spec files are queryable across runs for trend analysis (decision override rates, pattern-fit distribution, step difficulty patterns). This is also the post-launch mechanism that validates A5' and A6' — if `pattern_fit: partial` accumulates, the composition model needs revision.

**Discovery tracking:** Add "How did you find the factory?" as a first-interaction question (before the 2 post-completion questions). This closes the observability gap on concern #7 — spec file metrics only exist for colleagues who found the factory. Discovery path data reveals whether intent-based routing works or whether colleagues arrive through other channels.

### Concern Activation by Phase

| Concern | Phase 1 (Reference) | Phase 2 (Factory) | Rationale |
|---------|:---:|:---:|-----------|
| #1 LLM/JS Boundary + Visibility | ◐ | ● | Phase 1: reference format decisions only. Phase 2: full boundary active. |
| #2 Write Safety Protocol | — | ● | No file writes in Phase 1. |
| #3 Format Heterogeneity | — | ● | No wiring in Phase 1. |
| #4 Context Window Pressure | ● | ● | Phase 1: section size budget. Phase 2: step loading. |
| #5 Triple-Audience Reference | ● | ◐ | Phase 1: format design. Phase 2: consumption only. |
| #6 Mode Parity | — | ● | No modes in Phase 1. |
| #7 Intent-Based Discoverability | ◐ | ● | Phase 1: reference organization for findability. Phase 2: Step 0 routing. |
| #8 Hypothesis Sensitivity | ● | ◐ | Phase 1: reference IS the A5'/A6' test. Phase 2: monitor only. |
| #9 Self-Instrumentation | — | ● | Phase 1: Gyre validation is the proxy signal (see #8). Phase 2: spec file metrics. |

● = primary · ◐ = secondary · — = not active

### Decision Routing: Q → Concerns

| Question | Primary Concerns | Secondary |
|----------|-----------------|-----------|
| Q1 — Reference format (triple-audience) | #5, #4, #8 | #1 |
| Q2 — Format-aware writer design | #3, #2 | #6 |
| Q3 — Validation layering (structural vs. semantic) | #6, #9 | #8 |
| Q4 — Spec file schema evolution | #9, #6 | #8 |
| Q5 — Factory evolution (cross-version) | #8, #9 | #5 |

_The architect loads only the primary concerns per decision. Secondary concerns are consulted if the primary analysis surfaces ambiguity._

### Structural Dependencies Between Concerns

**Reference Chain (#8 → #5 → #3 → #2):** Longest dependency chain — 4 nodes. If A5' fails, all 4 components cascade. Mitigate by decoupling: format-aware writers (#3) should consume a **format contract** (structured objects), not parse the reference directly. A reference parser translates reference format into the contract. If the reference restructures, only the parser changes.

**Visibility Funnel (#2 → #1 → #6):** The architectural seam between factory engine and factory UX. The visibility boundary (what the colleague sees vs. what runs silently) should be defined per step as a Phase 2 design artifact — not retrofitted after the engine is built. The ≤3 concept budget (NFR2) is enforced at this seam.

---

## Starter Template Evaluation

_Enhanced through 2 elicitation rounds (Critical Perspective Challenge, Self-Consistency Validation) and 2 party mode sessions._

### Primary Technology Domain

**BMAD Workflow + JS Utilities** — not a traditional software project requiring a starter template.

### Starter Assessment: Not Applicable (Framework Selection)

The Team Factory's runtime model is fully constrained by closed architectural decisions:

| Traditional Starter Decision | Team Factory Equivalent | Status |
|------------------------------|------------------------|--------|
| Language/Framework | BMAD workflow (markdown step files) + JS utilities | Settled (C1) |
| Build tooling | None — workflow files loaded at runtime by Claude Code | Settled (C4) |
| State management | Team spec file (YAML) | Settled (PRD §9) |
| Deployment | Local-only, installed via existing BMAD infrastructure | Settled (C4, NFR8) |
| Project structure | `_bmad/bme/` module structure with workflow steps | Settled (BMAD conventions) |

### Technical Foundation Decisions

#### 1. Factory JS Module Organization — RESOLVED

**Decision:** Option A — Module-internal at `_bmad/bme/_team-factory/lib/`

Every BMAD module keeps its code inside its module directory. The factory is a module, not framework infrastructure.

```
_bmad/bme/_team-factory/
  agents/
  workflows/
  schemas/
  lib/
    naming-enforcer.js
    cascade-logic.js
    collision-detector.js
    manifest-tracker.js
    writers/
      registry-writer.js
      config-writer.js
      csv-writer.js
      activation-writer.js
```

**Template location:** Not resolved here. Shared BMB templates cannot live inside the factory module (NFR6 requires shared templates; R-drift risk if duplicated). Template location depends on the shared-vs-factory-owned decision — resolve in Step 4 alongside BMB integration (C2).

**Hypothesis coupling note:** `lib/cascade-logic.js` and `schemas/team-spec-v1.schema.json` are a coupled pair — both A6'-dependent (composition patterns). If a third pattern emerges, both must be revised together. Track as a single revision unit.

#### 2. Spec File Architecture — FLAGGED FOR STEP 4

The spec file is the factory's central stateful component — read, written, validated, resumed from, consumed by Express Mode. It has four access patterns (audit trail, resume state, express mode input, metrics store) and is more complex than a simple config file.

**Key decisions deferred to Step 4** (where Q3 validation layering and Q4 schema evolution provide full context):
- Schema definition approach (JSON Schema file vs. inline validation)
- Parser/writer/differ module design
- Write safety for resume integrity
- Version evolution strategy for forward compatibility

#### 3. Factory-Specific Testing Strategy — RESOLVED

**Decision:** Split golden file testing by authorship. Explicit test boundary.

**Test boundary:** JS utilities and Express Mode pipeline are automated. Conversation flow (Guided Mode) is manual — tested via P2, P3 prerequisites and first real factory run.

| Test Layer | What It Tests | Approach |
|-----------|--------------|---------|
| Golden file — wiring | Factory-authored integration wiring (registry entries, config fields, CSV rows, activation blocks) | Exact match against golden files. Factory owns this output — stable across template changes. |
| Structural validation — generated content | Template-generated artifacts (agent files, workflow files) | Validator.js structural correctness. NOT golden file exact match — avoids breakage when shared templates change upstream. |
| Unit tests | Individual JS utilities (naming, cascade, collision, manifest) | Jest, reuse existing BMAD config |
| Regression | Factory operations don't break existing teams | Existing validator.js run against all teams post-factory-run |
| Conversation quality | Guided Mode UX | Manual: P2 (reference consumability), P3 (colleague test) |

**Fixture spec files (minimum 4):**

| Fixture | Tests |
|---------|-------|
| `fixtures/independent-single-agent.yaml` | Simplest path — 1 agent, no contracts, minimal config |
| `fixtures/sequential-three-agents.yaml` | Full path — 3 agents, 2 contracts, config fields, orchestration |
| `fixtures/malformed-missing-fields.yaml` | Error handling — missing required fields, invalid pattern, naming violations |
| `fixtures/collision-existing-agent.yaml` | Safety path — agent name collides with existing manifest entry. Tests collision detection, error messaging (NFR11), and graceful handling. |

#### 4. Template Substitution — RESOLVED

**Decision:** Hand-rolled safe replacer. No library dependency.

~20 lines of code. Whitelist-only variable names. Pattern: `template.replace(/\{\{(\w+)\}\}/g, (_, key) => safeVars[key] ?? throwUnknown(key))`. Variables validated against allowed set before substitution. No eval, no dynamic require, no template-generated code execution. NFR14 satisfied.

#### 5. File Types the Factory Produces/Consumes

| Type | Role |
|------|------|
| `.md` | Workflow step files, agent files, Architecture Reference |
| `.yaml` | Team spec file, config.yaml modifications |
| `.js` | Utility functions, agent-registry.js modifications, validator.js extensions |
| `.csv` | module-help.csv modifications |
| `.xml` | Activation blocks (embedded in agent .md files) |
| `.json` | Spec file schema definitions |

#### 6. Existing Infrastructure the Factory Extends

| File | How Factory Uses It |
|------|-------------------|
| `scripts/update/lib/validator.js` | Extends with pattern-aware rules |
| `scripts/update/lib/refresh-installation.js` | Extends with new module paths |
| `_bmad/_config/agent-manifest.csv` | Read for overlap detection |
| `_bmad/bmb/` | Shared templates consumed via Option C embedding |
