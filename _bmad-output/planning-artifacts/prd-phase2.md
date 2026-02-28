---
stepsCompleted: [step-01-init, step-02-discovery, step-03-success]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/product-brief-BMAD-Enhanced-2026-02-22.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/epics.md
  - _bmad-output/implementation-artifacts/epic-1-retro-2026-02-24.md
  - _bmad-output/implementation-artifacts/epic-2-retro-2026-02-25.md
  - _bmad-output/implementation-artifacts/epic-3-retro-2026-02-25.md
  - _bmad-output/implementation-artifacts/epic-4-retro-2026-02-26.md
  - _bmad-output/implementation-artifacts/epic-5-retro-2026-02-26.md
  - docs/agents.md
  - docs/testing.md
  - docs/development.md
  - docs/faq.md
workflowType: 'prd'
documentCounts:
  briefs: 1
  research: 0
  projectDocs: 4
  existingPRD: 1
  architecture: 1
  epics: 1
  retrospectives: 5
classification:
  projectType: "Developer Tool + Content Platform (hybrid)"
  domain: "Product Discovery / Innovation Methodology"
  complexity: medium
  projectContext: brownfield
  phase2Shape: "Stabilize + Targeted Growth (Shape B)"
  guidingPrinciple: "Quality and usability before speculative features"
elicitation:
  methods_applied:
    - "First Principles Analysis — stripped speculative features, rebuilt from truths"
    - "Stakeholder Round Table — 5 perspectives converged on trust and usability"
    - "What If Scenarios — validated P0+journey combo, deferred Liam workflows"
    - "Pre-mortem Analysis — 6 failure modes with preventions"
  key_insights:
    - "Phase 2 feature list was written before the product existed — speculative"
    - "5 of 7 agents have no P0 validation — quality gap is the real risk"
    - "Docs are stale with live 404s — first thing new users hit"
    - "P0 testing process produces the journey example — two deliverables, one process"
    - "Test handoff chain compatibility, not just individual agents"
    - "Content correctness tests must validate semantics, not syntax"
    - "Scope freeze rule prevents creep back to full Phase 2"
    - "Phase 2 is quality, not growth. Growth is Phase 3."
  failure_preventions:
    - "FM1: Programmatic audit before docs fix (grep stale numbers, deleted paths)"
    - "FM2: Handoff compatibility tests in every P0 suite"
    - "FM3: Journey example captured from real run, not authored"
    - "FM4: Content tests validate semantics not syntax"
    - "FM5: Scope freeze rule — additions require explicit decision"
    - "FM6: PRD acknowledges Phase 2 ≠ growth"
version: "2.0.0"
---

# Product Requirements Document - BMAD-Enhanced Phase 2

**Author:** Amalik
**Date:** 2026-02-28

## Project Discovery

### Classification

| Field | Value |
|-------|-------|
| **Project Type** | Developer Tool + Content Platform (hybrid) |
| **Domain** | Product Discovery / Innovation Methodology |
| **Complexity** | Medium |
| **Project Context** | Brownfield (extending v1.6.0) |
| **Phase 2 Shape** | Stabilize + Targeted Growth (Shape B) |

### Phase 2 Guiding Principles

1. **Quality and usability before speculative features.** The Vortex shipped 2 days ago with zero user feedback. Phase 2 makes what we shipped trustworthy and usable.
2. **Phase 2 is quality, not growth.** Growth (marketing, community, discoverability) is Phase 3. Phase 2 makes the product *ready* for growth.
3. **Scope freeze rule.** Deliverable list is fixed at PRD approval. Any addition requires explicit scope change decision. Deferred items are commitments, not suggestions.

### Priority Stack

| # | Priority | Type | Prevention |
|---|----------|------|------------|
| 1 | **Fix stale docs** | Hygiene (URGENT) | Programmatic audit first — grep for stale numbers and deleted paths |
| 2 | **P0 test suites + journey example** | Quality + Usability | Run all 7 agents on busy parents domain. Validate handoff chain compatibility. Capture real artifacts as journey example. |
| 3 | **Expand content correctness testing** | Quality | Test semantics not syntax. Follow dead-end detection pattern. |
| 4 | **Close CLI coverage gaps** | Tech debt | bmad-update.js (29%), bmad-version.js (56%), legacy migration (37%) |

### Explicitly Deferred (until user demand proven)

- Agent enable/disable toggle
- Workflow template variants (quick/deep)
- Cross-agent orchestration ("full Vortex run")
- HC9/HC10 mid-workflow interrupt pattern
- Dedicated SCAMPER / worst-possible-idea workflows for Liam
- Deeper signal interpretation workflows for Noah

### Elicitation Methods Applied

4 advanced elicitation methods were applied during discovery:

1. **First Principles Analysis** — Stripped speculative features. Identified that the Phase 2 list was written before Wave 3 existed. Rebuilt scope from 6 fundamental truths. Selected Shape B over Shape C.
2. **Stakeholder Round Table** — 5 stakeholders (Solo Founder, New Adopter, Quinn, Murat, Max) independently converged on: make what we shipped trustworthy and usable. Nobody asked for toggles or orchestration.
3. **What If Scenarios** — 5 scenarios tested the plan. Key insight: P0 testing process produces the journey example (two deliverables, one process). SCAMPER works inside existing Liam workflow — no dedicated workflow needed.
4. **Pre-mortem Analysis** — 6 failure modes identified with specific preventions. Strongest: handoff compatibility tests in P0 suites prevent silently broken agent chains.

## Success Criteria

### User Trust

| Gate | Criteria | Measurement |
|------|----------|-------------|
| **Zero stale references** | Every user-facing doc reflects 7-agent, 22-workflow, 268-test reality | Programmatic grep audit returns zero hits for stale patterns |
| **Zero broken links** | All internal links in docs/ resolve to existing files | Link checker pass — zero 404s |
| **Accurate first impression** | New user from install to first agent invocation encounters no contradictions | Manual walkthrough captured during P0 |

### Product Correctness

| Gate | Criteria | Measurement |
|------|----------|-------------|
| **7/7 P0 validated** | Every agent has a P0 suite. Content-only agents (Mila, Liam, Noah, Isla, Max): activation, workflow execution, output quality, voice consistency. Infrastructure agents (Emma, Wade): same + integration checks. | P0 suite exists and passes for all 7 |
| **Handoff chain validated** | Each artifact contract (HC1-HC5) tested: Agent A's output contains all fields Agent B's step-02 requires | At least one handoff compatibility test per artifact contract |
| **Journey example captured + reviewed** | Complete 7-agent run on busy parents domain. Artifacts captured at every handoff. Editorial review confirms pedagogical quality. | Journey document exists with real artifacts + editorial sign-off |

### Engineering Confidence

| Gate | Criteria | Measurement |
|------|----------|-------------|
| **4 content correctness test categories in CI** | Compass table agent references, persona field matches, step file counts, HC schema field presence — all validated programmatically | 4 test categories pass in CI, following dead-end detection pattern |
| **CLI coverage matches project standard** | bmad-update.js, bmad-version.js, legacy migration coverage at 85%+ lines, or documented exception explaining why | Coverage report per module |
| **Zero bugs the test suite should have caught** | Post-release: no patches required for issues that existing or new tests should have detected. Patches for genuinely novel issues are acceptable. | Post-release review at 7 days |

### Measurable Outcomes

- **P0 pass rate:** 100% across all 7 agents
- **Docs accuracy:** Zero grep hits for stale patterns post-fix
- **Handoff coverage:** 5/5 artifact contracts (HC1-HC5) have downstream compatibility checks
- **Content correctness:** 4 test categories operational in CI
- **CLI coverage:** 85%+ per module or documented exception

## Product Scope

### MVP — Phase 2 Minimum

1. **Docs fix** — All user-facing pages reflect 7-agent reality. Zero stale references, zero broken links.
2. **P0 test suites for all 7 agents** — Content-only agents: activation + workflow + output + voice. Infrastructure agents: same + integration. Handoff chain compatibility for HC1-HC5.
3. **End-to-end journey example** — Captured from real runs on busy parents domain. Editorially reviewed for pedagogical quality.

### Growth (Post-MVP, still Phase 2)

4. **Content correctness testing** — 4 categories: Compass references, persona matches, step counts, HC schema fields.
5. **CLI coverage gaps** — Target 85%+ or documented exception for each module.

### Vision (Phase 3 — Future)

Deferred until user demand is proven:
- Agent enable/disable toggle
- Workflow template variants
- Cross-agent orchestration
- HC9/HC10 mid-workflow interrupt pattern
- New Liam/Noah workflows
- Growth & discoverability (marketing, community, tutorials)
