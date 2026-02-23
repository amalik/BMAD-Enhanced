---
stepsCompleted: [1, 2]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/product-brief-BMAD-Enhanced-2026-02-22.md
  - _bmad-output/planning-artifacts/implementation-readiness-report-2026-02-23.md
  - docs/agents.md
  - docs/development.md
  - docs/testing.md
workflowType: 'architecture'
project_name: 'BMAD-Enhanced'
user_name: 'Amalik'
date: '2026-02-23'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements (52)** across 12 capability areas:
- 3 new agents: Mila (Synthesize), Liam (Hypothesize), Noah (Sensitize)
- 10 handoff contracts (HC1-HC10) with schemas
- Compass routing in all 7 agents
- Agent registry as single source of truth
- Migration system updates (1.5.x → 1.6.0)
- Backward compatibility with 4 existing agents

**Non-Functional Requirements (26)** across 6 categories:
- Content quality, developer experience, infrastructure resilience, testing coverage, performance, maintainability

### Scale & Complexity

- **Primary domain:** Content platform + CLI tooling (Node.js)
- **Complexity level:** Medium-High
- **Estimated components:** 3 agents, ~8 workflows, 10 contract schemas, registry expansion, migration entries, validator updates

### Architectural Findings (17 items)

| # | Source | Finding | Implication |
|---|--------|---------|-------------|
| A1 | ADR | Contract taxonomy: artifact (HC1-5) vs routing (HC6-10) | Different schema complexity per type |
| A2 | ADR | Three routing mechanisms: schema/decision/flag-driven | Each needs distinct Compass UX |
| A3 | ADR | Modification surface: registry, validator, migration, postinstall | 4 infrastructure files change |
| A4 | ADR | Emma is read-only in Wave 3 | Three-way routing lives in other agents' Compass |
| R1 | Red Team | Infrastructure change surface understated in PRD | FR48 CI + registry + validator + migration = significant |
| R2 | Red Team | All 13 existing Compass instances verified in final steps | Consistent pattern to follow for new agents |
| R3 | Red Team | Mid-workflow routing (HC9, HC10) has no codebase precedent | New pattern needed — but can be phased (see P2) |
| R4 | Red Team | Workflow naming blocks migration entry design | Must resolve names before architecture Step 3 |
| G1 | Graph | Isla is gravity well: 3 inbound from 3 agents, 3 mechanisms | Needs re-entry mode and multi-shape intake |
| G2 | Graph | Max is pure decision hub: artifacts in, decisions out | Richest Compass decision criteria of any agent |
| G3 | Graph | Two feedback loops at different timescales | Strategic (end-of-workflow) vs tactical (mid-workflow) |
| G4 | Graph | Registry has 5 downstream dependents | Keep routing topology separate (see P1) |
| G5 | Graph | Wade is least integrated (linear pipeline) | Noah's HC10 provides indirect quality check |
| G6 | Graph | Contract types align with Diamond boundaries | Organize contracts by diamond, not by number |
| P1 | Party | Keep routing topology separate from agent registry | Different concerns, different change frequencies |
| P2 | Party | Phase mid-workflow routing for Wave 3.0 | Ship HC9/HC10 as Compass guidance; add interrupt pattern in 3.1 if needed |
| P3 | Party | Workflow naming is the only true blocker | Resolve before architecture Step 3 |

### Technical Constraints & Dependencies

- Must preserve all 4 existing agents without regression
- Node.js ecosystem, npm package distribution
- Migration system must handle 1.5.x → 1.6.0 upgrade path
- Registry schema expansion cascades to 5 dependents
- Workflow naming decision blocks migration entry design

### Cross-Cutting Concerns

- Mid-workflow routing pattern — phased: Compass guidance in 3.0, interrupt pattern in 3.1
- Separate routing manifest for contract topology (not in agent registry)
- Isla re-entry mode for flag-triggered re-investigation
- Workflow naming convention resolution (blocker)
