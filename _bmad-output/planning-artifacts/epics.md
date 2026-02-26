---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
---

# BMAD-Enhanced v1.6.0 - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for BMAD-Enhanced v1.6.0, decomposing the requirements from the PRD and Architecture into implementable stories. Wave 3 completes the 7-stream Vortex Pattern by adding Mila (Synthesize), Liam (Hypothesize), and Noah (Sensitize).

## Requirements Inventory

### Functional Requirements

**Synthesis & Convergence — Mila (6):**

- FR1: User can invoke Mila with one or more Isla artifacts (empathy maps, interview syntheses, observation reports) as input
- FR2: Mila can guide the user through Jobs-to-be-Done framing based on provided artifacts
- FR3: Mila can facilitate Pains & Gains analysis across multiple input artifacts
- FR4: Mila can produce a single converged problem definition that synthesizes all input artifacts into the "problem definition" schema
- FR5: User can invoke Mila with prior evidence from failed experiments (pivot scenario) to re-synthesize a revised problem definition
- FR6: Mila can accept any well-formed input artifacts — not only Isla's output — preserving non-sequential Vortex entry

**Hypothesis Engineering — Liam (5):**

- FR7: User can invoke Liam with a problem definition conforming to the "problem definition" schema
- FR8: Liam can facilitate structured brainwriting/ideation as a creative peer alongside the user
- FR9: Liam can produce 1-3 hypothesis contracts in the 4-field format (expected outcome + target behavior change + rationale + riskiest assumption)
- FR10: Liam can flag unvalidated assumptions discovered during ideation and recommend routing back to Isla for validation
- FR11: Liam can accept problem definitions from any source (Mila, Emma, user-provided) — not coupled to a specific upstream agent

**Production Intelligence — Noah (5):**

- FR12: User can invoke Noah with Wade's experiment context (results, success criteria, metrics, confirmed hypotheses)
- FR13: Noah can interpret production signals by connecting them to their originating experiment context and Vortex history
- FR14: Noah can produce signals for Max in strict format: signal + context + trend — with no strategic recommendations
- FR15: Noah can detect unexpected user behavior patterns not covered by the original experiment hypothesis
- FR16: Noah can route anomalous findings to Isla for discovery research when unexpected behavior is detected

**Input Validation & Error Handling (2):**

- FR17: Each agent can detect non-conforming input and guide the user to provide schema-compliant artifacts
- FR18: Compass can present an "insufficient evidence" state with guidance on what evidence to gather when routing cannot be determined

**Vortex Compass Routing (6):**

- FR19: Every Wave 3 workflow's final step presents Compass routing with evidence-based recommendations for the next agent
- FR20: Compass can distinguish between three routing scenarios: new problem space (→ Emma), reframe within known space (→ Mila), zoom out (→ Emma's Contextualize Scope)
- FR21: Compass routing recommendations reference specific handoff contracts and declare what artifact the next agent expects
- FR22: User can override any Compass recommendation and navigate to any agent directly
- FR23: Max's Vortex Navigation workflow can analyze evidence gaps across all 7 agents and route to the agent that fills the most critical gap
- FR24: The Compass routing decision matrix exists as a maintained reference document accessible to all agents

**Handoff Contracts (5):**

- FR25: Each of the 10 handoff contracts has a defined artifact schema (fields, format, required sections) including a required `sourceArtifact` reference field
- FR26: Each agent's output artifact conforms to the declared contract schema for that handoff
- FR27: Each receiving agent can consume a schema-compliant artifact without manual reshaping
- FR28: Handoff contracts define artifact types generically (e.g., "problem definition") — any producer (agent or user) can create schema-compliant input
- FR29: Each agent's output artifact includes a `sourceArtifact` reference in frontmatter linking to its input artifact(s), enabling traceability across the Vortex

**Existing Agent Updates (4):**

- FR30: Isla's workflows include Compass routes to Mila (for convergence after discovery)
- FR31: Wade's workflows include Compass routes to Noah (for production signal interpretation after experiment graduation)
- FR32: Max's Pivot/Patch/Persevere analysis can route to Mila (not only Emma) when the problem definition is correct but the solution direction needs revision
- FR33: Existing Isla, Wade, Max workflows continue to function identically — new Compass routes are additive, not replacing existing routes

**Installation & Infrastructure (5):**

- FR34: The existing `npx bmad-install-agents` command installs all 7 Vortex agents without requiring a new command or flag
- FR35: Agent registry (`agent-registry.js`) contains entries for all 7 agents with complete persona data
- FR36: `bmad-doctor` validates all 7 agents, expanded workflow count, manifest integrity
- FR37: Agent manifest CSV contains rows for all 7 Vortex agents
- FR38: Party Mode includes all 7 agents in collaborative discussions from day one

**Migration & Compatibility (4):**

- FR39: Users upgrading from v1.5.x to v1.6.0 receive all 3 new agents through the migration system
- FR40: Migration appends new agents and workflows to existing config — preserving user customizations
- FR41: `mergeConfig` seeds all 7 agents and their workflows for fresh installs
- FR42: Validator accepts both 4-agent (pre-upgrade) and 7-agent (post-upgrade) configurations during migration

**Documentation & Guidance (3):**

- FR43: Each Wave 3 agent has a user guide (MILA-USER-GUIDE.md, LIAM-USER-GUIDE.md, NOAH-USER-GUIDE.md) with "when to use this agent" positioning
- FR44: Each Wave 3 agent has example artifacts committed to the repo showing expected output format
- FR45: `docs/agents.md` documents all 7 agents with workflows, positioning, and when-to-use guidance

**Content Quality Assurance (4):**

- FR46: Every workflow step file has valid frontmatter (name, description, nextStepFile)
- FR47: Every workflow's final step includes Compass routing referencing all declared handoff contracts for that agent
- FR48: CI pipeline includes automated dead-end detection (grep + registry cross-check) on every commit
- FR49: ~~Every workflow directory has a template subdirectory~~ **RELAXED (Architecture D8)** — no template dirs for Vortex workflows; artifacts produced via step-file guidance

**BMAD Core Architecture Compliance (3):**

- FR50: Each Wave 3 agent loads persona, communication style, and principles from its agent definition file at runtime per BMAD Core standards
- FR51: Each Wave 3 workflow uses micro-file step architecture where each step loads the next step file sequentially
- FR52: Each Wave 3 workflow step presents the standard A/P/C menu (Advanced Elicitation / Party Mode / Continue) at appropriate decision points

### NonFunctional Requirements

**Compatibility (5):**

- NFR1: All Wave 3 agents and workflows function on Node.js 18, 20, and 22 (existing CI matrix)
- NFR2: Fresh installs on any supported Node version produce a fully functional 7-agent Vortex with zero manual intervention
- NFR3: Upgrades from v1.5.x preserve all user-customized config values — no data loss during migration
- NFR4: All existing tests (184+) continue to pass after Wave 3 additions — zero regressions
- NFR5: Wave 3 content files use only CommonMark-compliant markdown — no IDE-specific extensions

**Installability (2):**

- NFR6: Install time does not degrade noticeably from v1.5.x with the addition of Wave 3 content
- NFR7: Running `npx bmad-install-agents` twice produces identical results — install is fully idempotent

**Maintainability (7):**

- NFR8: Each agent's behavior is fully defined by its `.md` definition file and workflow step files — no logic encoded outside content files
- NFR9: Adding a new workflow to an existing agent requires only: new step files + workflow directory + config entry + registry update — no code changes to core infrastructure
- NFR10: The Compass routing decision matrix is a single reference document — routing logic changes require updating one document, not scattered step files
- NFR11: Compass routing logic in step files is consistent with the routing decision matrix — no undocumented routing paths exist in step files
- NFR12: Handoff contract schemas are version-controlled and referenced by agents — schema changes are traceable through git history
- NFR13: Agent persona definitions are self-contained — modifying one agent's persona does not affect any other agent's behavior
- NFR14: All Wave 3 files follow established naming conventions: agent files as `{role-with-dashes}.md`, workflow dirs as `{workflow-name}/`, step files as `step-{nn}-{name}.md`

**Content Consistency (6):**

- NFR15: Agent persona definitions include sufficient detail (communication style, principles, identity) to enable consistent LLM behavior across step transitions
- NFR16: All output artifacts produced by Wave 3 agents conform to their declared handoff contract schema on every execution
- NFR17: Compass routing at the end of every workflow recommends at least one next agent — no dead ends
- NFR18: Every step file within a workflow follows identical structural conventions (frontmatter fields, execution protocols, menu system)
- NFR19: User guides follow a consistent format across all 7 agents — MILA/LIAM/NOAH guides are structurally identical to EMMA/ISLA/WADE/MAX guides
- NFR20: Individual step files remain concise enough to fit within a single LLM context load alongside conversation history

**Reliability (5):**

- NFR21: Every workflow can be completed from start to finish without encountering broken file references, missing step files, or undefined Compass routes
- NFR22: `bmad-doctor` detects all structural integrity issues (missing agents, missing workflows, broken manifest, invalid config) in a single diagnostic run
- NFR23: All `bmad-doctor` diagnostic messages include the specific issue and expected state, enabling resolution without additional investigation
- NFR24: The migration system either fully succeeds or fails cleanly with a diagnostic message — no partial migration states
- NFR25: Party Mode functions correctly with all 7 agents loaded — no agent loading failures when manifest expands to 7 Vortex entries

**Test Coverage (1):**

- NFR26: Wave 3 infrastructure code changes maintain or exceed the current 83% line coverage threshold. No new infrastructure code ships without unit test coverage.

### Additional Requirements

**From Architecture — Infrastructure:**

- Registry AGENTS array reordered by Vortex stream number (1-7): Emma, Isla, Mila, Liam, Wade, Noah, Max
- WORKFLOWS expand from 13→22 entries grouped by agent, ordered by stream number
- Single `1.5.x-to-1.6.0.js` migration delta — config update only, `refreshInstallation()` handles file copying
- Validator expectations: 7 agents, 22 workflows
- `config-merger.js` defaults seeded for 7 agents and 22 workflows

**From Architecture — Contract Architecture:**

- Artifact contracts (HC1-HC5): YAML frontmatter + markdown body with fields: `contract`, `type`, `source_agent`, `source_workflow`, `target_agents`, `input_artifacts` (optional), `created`
- Routing contracts (HC6-HC10): No artifact file — Compass table entries carry context in conversation
- `compass-routing-reference.md` created as living reference document (Epic 1 deliverable)

**From Architecture — Content Architecture:**

- 9 workflows with finalized names: research-convergence, pivot-resynthesis, pattern-mapping (Mila); hypothesis-engineering, assumption-mapping, experiment-design (Liam); signal-interpretation, behavior-analysis, production-monitoring (Noah)
- Step count rule (RF1): minimum 4, maximum 6 per workflow
- Standardized steps: `step-01-setup.md`, `step-02-context.md`, final `*-synthesize.md`
- Canonical template: Isla (`discovery-empathy-expert.md`) for agent definition structure
- No `template/` directories (D8 — FR49 relaxed)

**From Architecture — Quality Gates:**

- Epic 1 quality gate (P18): all tests + lint pass before content epics begin
- Handoff contract validation gate (P19): after each content epic, verify artifact → downstream agent compatibility
- Persona design prerequisite (RF3): finalize persona before step file authoring for each agent
- Smoke tests (P17, P20): step-file-count assertion (4-6 per workflow) and standardized filename verification

**From Architecture — Build Order:**

- Starter template: None (brownfield extension)
- First implementation: registry expansion + validator update (not project initialization)
- Build sequence: Contracts → Mila → Liam → Noah → Integration
- 5 epic structure with dependency chain: Epic 1 → Epics 2/3/4 (parallelizable) → Epic 5

### FR Coverage Map

| FR | Epic | Brief Description |
|----|------|-------------------|
| FR1 | Epic 2 | Invoke Mila with Isla artifacts |
| FR2 | Epic 2 | JTBD framing guidance |
| FR3 | Epic 2 | Pains & Gains analysis |
| FR4 | Epic 2 | Converged problem definition output |
| FR5 | Epic 2 | Pivot re-synthesis with failed experiment evidence |
| FR6 | Epic 2 | Accept any well-formed input (non-sequential entry) |
| FR7 | Epic 3 | Invoke Liam with problem definition |
| FR8 | Epic 3 | Structured brainwriting/ideation |
| FR9 | Epic 3 | 4-field hypothesis contract output |
| FR10 | Epic 3 | Flag unvalidated assumptions → Isla routing |
| FR11 | Epic 3 | Accept problem definitions from any source |
| FR12 | Epic 4 | Invoke Noah with experiment context |
| FR13 | Epic 4 | Interpret signals via experiment lineage |
| FR14 | Epic 4 | Signal + context + trend output for Max |
| FR15 | Epic 4 | Detect unexpected behavior patterns |
| FR16 | Epic 4 | Route anomalies to Isla |
| FR17 | Epics 2-4 | Input validation per agent |
| FR18 | Epics 2-4 | Compass "insufficient evidence" state |
| FR19 | Epics 2-4 | Final step Compass routing |
| FR20 | Epics 2-4 | Three-way routing distinction (Emma/Mila/Emma-scope) |
| FR21 | Epics 2-4 | Compass references specific contracts |
| FR22 | Epics 2-4 | User can override Compass |
| FR23 | Epic 5 | Max evidence gap analysis across 7 agents |
| FR24 | Epic 1 | Compass routing decision matrix document |
| FR25 | Epic 1 | 10 handoff contract schemas defined |
| FR26 | Epic 1 | Output conforms to contract schema |
| FR27 | Epic 1 | Receiving agent consumes without reshaping |
| FR28 | Epic 1 | Contracts define generic artifact types |
| FR29 | Epic 1 | `sourceArtifact` traceability reference |
| FR30 | Epic 5 | Isla Compass routes to Mila |
| FR31 | Epic 5 | Wade Compass routes to Noah |
| FR32 | Epic 5 | Max routes to Mila for pivot |
| FR33 | Epic 5 | Existing workflows unchanged — additive routes |
| FR34 | Epic 1 | Install all 7 agents |
| FR35 | Epic 1 | Registry contains 7 agents |
| FR36 | Epic 1 | bmad-doctor validates 7 agents |
| FR37 | Epic 1 | Manifest CSV has 7 rows |
| FR38 | Epic 1 | Party Mode includes all 7 agents |
| FR39 | Epic 1 | Migration delivers 3 new agents |
| FR40 | Epic 1 | Migration preserves customizations |
| FR41 | Epic 1 | mergeConfig seeds 7 agents |
| FR42 | Epic 1 | Validator accepts 4-agent and 7-agent configs |
| FR43 | Epics 2-4 | User guides per agent |
| FR44 | Epics 2-4 | Example artifacts per agent |
| FR45 | Epic 5 | docs/agents.md covers all 7 |
| FR46 | Epics 2-4 | Valid step file frontmatter |
| FR47 | Epics 2-4 | Final step includes Compass routing |
| FR48 | Epic 5 | CI dead-end detection |
| FR49 | — | **RELAXED (D8)** — no stories needed |
| FR50 | Epics 2-4 | Runtime persona loading |
| FR51 | Epics 2-4 | Micro-file step architecture |
| FR52 | Epics 2-4 | A/P/C menu at decision points |

**Coverage: 51/52 FRs mapped** (FR49 relaxed per Architecture D8). Zero gaps.

### Elicitation Findings (Step 2)

| # | Method | Finding | Impact |
|---|--------|---------|--------|
| E1 | Self-Consistency | 3 approaches converge on Epic 1 and Epic 5; middle structure validated via build-order rationale | Structure confirmed |
| E2 | Self-Consistency | HC2 (Mila→Liam) is most critical cross-epic handoff | Prioritize HC2 validation after Epic 2 |
| E3 | Stakeholder Round Table | Kara confirmed Epic 2 standalone via FR5 (pivot-resynthesis works without Max routing) | No change needed |
| E4 | Stakeholder Round Table | Alex identified NFR9 extensibility gap | Add extensibility AC to Epic 5 docs story |

## Epic List

### Epic 1: Vortex Foundation — Contracts, Routing & Infrastructure

Users can install the 7-agent Vortex pattern, see all agents in Party Mode and `bmad-doctor`, and rely on defined handoff contract schemas that guarantee artifact compatibility across the entire Vortex. The Compass routing reference document defines all navigation paths.

**FRs covered:** FR24, FR25, FR26, FR27, FR28, FR29, FR34, FR35, FR36, FR37, FR38, FR39, FR40, FR41, FR42
**NFRs addressed:** NFR1-7, NFR22-26
**Dependencies:** None — first in sequence.
**Quality Gate (P18):** All existing + new tests pass, lint clean, before content epics begin.

### Epic 2: Mila — Research Convergence & Problem Definition

Users can bring divergent Isla artifacts and leave with a single, actionable problem definition. Supports both forward convergence (Journey 1) and pivot re-synthesis (Journey 5). Mila produces schema-compliant problem definitions with Compass routing to Liam or back to Isla.

**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR17, FR18, FR19, FR20, FR21, FR22, FR43, FR44, FR46, FR47, FR50, FR51, FR52
**NFRs addressed:** NFR5, NFR8, NFR13-20
**Dependencies:** Epic 1 (contract schemas, registry, routing reference).
**Validation Gate (P19 + E2):** HC2 handoff test — Mila's output consumed by Liam without reshaping. Priority validation.
**Prerequisite (RF3):** Mila persona design finalized before step file authoring.

### Epic 3: Liam — Hypothesis Engineering & Experiment Design

Users can bring a problem definition and leave with 1-3 investment-grade hypothesis contracts ready for Wade. Liam flags unvalidated assumptions and routes back to Isla when needed. Produces 4-field hypothesis contracts with Compass routing to Wade or Isla.

**FRs covered:** FR7, FR8, FR9, FR10, FR11, FR17, FR18, FR19, FR20, FR21, FR22, FR43, FR44, FR46, FR47, FR50, FR51, FR52
**NFRs addressed:** NFR5, NFR8, NFR13-20
**Dependencies:** Epic 1 (contract schemas, registry, routing reference).
**Validation Gate (P19):** HC3 handoff test — Liam's output consumed by Wade without reshaping.
**Prerequisite (RF3):** Liam persona design finalized before step file authoring.

### Epic 4: Noah — Production Intelligence & Signal Interpretation

Users can bring Wade's experiment context and get production signals interpreted through Vortex history. Noah detects anomalies and routes to Isla for discovery. Produces signal reports for Max with Compass routing to Max or Isla.

**FRs covered:** FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20, FR21, FR22, FR43, FR44, FR46, FR47, FR50, FR51, FR52
**NFRs addressed:** NFR5, NFR8, NFR13-20
**Dependencies:** Epic 1 (contract schemas, registry, routing reference).
**Validation Gate (P19):** HC5 handoff test — Noah's output consumed by Max without reshaping.
**Prerequisite (RF3):** Noah persona design finalized before step file authoring.

### Epic 5: Vortex Integration — Cross-Agent Routing & Documentation

Users can navigate the complete 7-agent Vortex seamlessly. Existing agents route to new agents. Max can analyze evidence gaps across all 7 streams. Documentation reflects the complete framework. Framework extensibility validated (NFR9).

**FRs covered:** FR23, FR30, FR31, FR32, FR33, FR45, FR48
**NFRs addressed:** NFR9, NFR10, NFR11, NFR17, NFR21
**Dependencies:** Epics 2, 3, 4 (all agents must exist before cross-agent routing).
**Extensibility AC (E4):** Validate that a new workflow can be added following documented patterns without core code changes.

## Epic 1: Vortex Foundation — Contracts, Routing & Infrastructure

Users can install the 7-agent Vortex pattern, see all agents in Party Mode and `bmad-doctor`, and rely on defined handoff contract schemas that guarantee artifact compatibility across the entire Vortex.

### Story 1.1: Expand Agent Registry to 7 Agents

As a framework maintainer,
I want the agent registry to contain all 7 Vortex agents with complete persona data ordered by stream number,
So that all downstream systems (validator, installer, manifest, tests) can reference the complete agent set.

**Acceptance Criteria:**

**Given** the agent registry file (`agent-registry.js`)
**When** the AGENTS array is updated
**Then** it contains 7 entries ordered by Vortex stream: Emma (1), Isla (2), Mila (3), Liam (4), Wade (5), Noah (6), Max (7)
**And** each new entry (Mila, Liam, Noah) has the same shape: `{ id, name, icon, title, stream, persona }`
**And** the WORKFLOWS array contains 22 entries (13 existing + 9 new) grouped by agent
**And** all derived lists (`AGENT_IDS`, `AGENT_NAMES`, etc.) reflect 7 agents
**And** `npm test` passes with updated test expectations in `agent-registry.test.js`
**And** `npm run lint` passes clean

*Covers: FR35*

### Story 1.2: Update Validator, Config-Merger & Doctor for 7 Agents

As a user running `bmad-doctor`,
I want the validation system to expect and verify all 7 agents and 22 workflows,
So that installation health checks confirm my complete Vortex setup.

**Acceptance Criteria:**

**Given** the validator (`validator.js`)
**When** validation runs
**Then** it expects 7 agent files and 22 workflow directories
**And** `config-merger.js` seeds defaults for all 7 agents and 22 workflows on fresh installs
**And** `bmad-doctor` checks all 7 agents and reports status for each
**And** validator accepts both 4-agent (pre-migration) and 7-agent (post-migration) configurations
**And** step-file-count smoke test asserts 4-6 `.md` files per workflow `steps/` directory (P17)
**And** standardized filename verification checks `step-01-setup.md`, `step-02-context.md`, final `*-synthesize.md` (P20)
**And** all existing tests pass (184+) — zero regressions (NFR4)
**And** `npm run test:integration` passes

*Covers: FR36, FR41, FR42*

### Story 1.3: Create Migration Delta & Installer Updates

As a user upgrading from v1.5.x,
I want the migration system to add all 3 new agents and 9 workflows to my existing config without losing my customizations,
So that I get the complete 7-agent Vortex through `npx bmad-update`.

**Acceptance Criteria:**

**Given** a v1.5.x installation with user-customized config
**When** `1.5.x-to-1.6.0.js` migration runs
**Then** 3 new agents are appended to the config `agents` array
**And** 9 new workflows are appended to the config `workflows` array
**And** existing user customizations (communication_language, etc.) are preserved (NFR3)
**And** `refreshInstallation()` copies new agent files, workflow directories, and user guides
**And** `install-vortex-agents.js` generates manifest CSV with 7 agent rows
**And** `postinstall.js` displays all 7 agent names dynamically
**And** Party Mode includes all 7 agents (FR38)
**And** migration entry is registered in `migrations/registry.js`
**And** new `1.5.x-to-1.6.0.test.js` covers migration delta logic
**And** installer E2E test passes with 7 agents

*Covers: FR34, FR37, FR38, FR39, FR40*

### Story 1.4: Define Handoff Contract Schemas (HC1-HC5)

As a product discovery practitioner,
I want each artifact handoff contract to have a defined schema with exact fields and format,
So that every agent's output is guaranteed to be consumable by the next agent without reshaping.

**Acceptance Criteria:**

**Given** the 5 artifact contracts (HC1-HC5)
**When** schemas are created
**Then** each schema defines: YAML frontmatter fields (`contract`, `type`, `source_agent`, `source_workflow`, `target_agents`, `input_artifacts`, `created`) + markdown body structure
**And** HC1 (Isla→Mila): empathy artifacts schema with required sections
**And** HC2 (Mila→Liam): problem definition schema (JTBD + Pains & Gains format)
**And** HC3 (Liam→Wade): hypothesis contract schema (4-field: expected outcome, behavior change, rationale, riskiest assumption)
**And** HC4 (Wade→Noah): graduated experiment context schema (results, criteria, metrics)
**And** HC5 (Noah→Max): signal report schema (signal + context + trend)
**And** each schema includes required `sourceArtifact` reference field (FR29)
**And** schemas define artifact types generically — any producer can create compliant input (FR28)
**And** schemas are committed as reference files in `_bmad/bme/_vortex/`

*Covers: FR25, FR26, FR27, FR28, FR29*

### Story 1.5: Create Compass Routing Reference Document

As an agent workflow author,
I want a single Compass routing decision matrix documenting all navigation paths between all 7 agents,
So that every workflow's final Compass step can reference the authoritative routing table.

**Acceptance Criteria:**

**Given** the routing reference document (`compass-routing-reference.md`)
**When** created in `_bmad/bme/_vortex/`
**Then** it maps every workflow exit to every possible next agent with selection criteria
**And** it documents the three-way routing distinction: new problem space (→Emma), reframe within known space (→Mila), zoom out (→Emma Contextualize Scope)
**And** it covers all 10 handoff contracts (HC1-HC10) with trigger conditions
**And** HC6-HC10 (routing contracts) are documented as Compass table guidance entries
**And** each route references the specific contract and declares what artifact the next agent expects (FR21)
**And** the document includes the "insufficient evidence" guidance pattern (FR18)
**And** the document is marked as authoritative (P22) — architecture table is snapshot only

*Covers: FR24*

## Epic 2: Mila — Research Convergence & Problem Definition

Users can bring divergent Isla artifacts and leave with a single, actionable problem definition. Supports forward convergence (Journey 1) and pivot re-synthesis (Journey 5).

### Story 2.1: Design Mila's Agent Definition & Persona

As a product discovery practitioner,
I want Mila to have a distinct, well-defined persona as a Research Convergence Specialist,
So that she maintains consistent character across all workflow steps and is clearly distinguishable from Isla (discovery) and Emma (contextualization).

**Acceptance Criteria:**

**Given** Isla's agent definition (`discovery-empathy-expert.md`) as canonical template (FM1)
**When** Mila's agent definition is created as `research-convergence-specialist.md`
**Then** it follows the exact structure: Frontmatter → Activation block (XML) → Persona block → Menu block
**And** frontmatter has `name: "research convergence specialist"` (lowercase with spaces)
**And** persona includes: identity, communication style, principles, expertise — distinct from Isla and Emma
**And** persona fields match the registry persona fields in Story 1.1 exactly (enforcement guideline #6)
**And** the agent loads persona at runtime per BMAD Core standards (FR50)
**And** file is placed in `_bmad/bme/_vortex/agents/`
**And** `npm run lint` passes

*Covers: FR50 (Mila), prerequisite RF3*

### Story 2.2: Create Research-Convergence Workflow (Mila's Primary)

As a product manager with multiple Isla artifacts,
I want to run Mila's research-convergence workflow to synthesize divergent findings into a single problem definition,
So that I have one actionable, JTBD-grounded problem statement instead of scattered research outputs.

**Acceptance Criteria:**

**Given** the workflow directory `_bmad/bme/_vortex/workflows/research-convergence/steps/`
**When** a user invokes the workflow with Isla artifacts as input
**Then** step-01-setup validates input artifacts conform to expected format (FR17) and guides user if non-conforming
**And** step-02-context loads and analyzes all provided artifacts
**And** core steps guide JTBD framing (FR2) and Pains & Gains analysis (FR3) across all inputs
**And** the workflow produces a converged problem definition in HC2 schema format (FR4)
**And** the output artifact includes `sourceArtifact` references to all input artifacts (FR29)
**And** the final step presents Compass routing with three-way distinction (FR20): Liam for hypothesis, Isla for more discovery, Emma for new problem space
**And** Compass references HC2 contract and declares what Liam expects (FR21)
**And** user can override Compass recommendation (FR22)
**And** workflow accepts any well-formed input, not only Isla output (FR6)
**And** each step has valid frontmatter (FR46) and follows micro-file architecture (FR51)
**And** decision points present A/P/C menu (FR52)
**And** step count is 4-6, with standardized filenames (step-01-setup, step-02-context, final *-synthesize)
**And** "insufficient evidence" Compass state is handled when routing cannot be determined (FR18)

*Covers: FR1, FR2, FR3, FR4, FR6, FR17, FR18, FR19, FR20, FR21, FR22, FR46, FR47, FR51, FR52*

### Story 2.3: Create Pivot-Resynthesis Workflow

As a product manager whose experiment direction failed (Max says "pivot"),
I want to re-synthesize my problem definition using original Isla artifacts plus new evidence from failed experiments,
So that I iterate within the known problem space rather than starting over with Emma.

**Acceptance Criteria:**

**Given** the workflow directory `_bmad/bme/_vortex/workflows/pivot-resynthesis/steps/`
**When** a user invokes the workflow with prior evidence from failed experiments (FR5)
**Then** step-01-setup validates both original artifacts and new experiment evidence
**And** the workflow re-synthesizes a revised problem definition incorporating pivot evidence
**And** the output is in HC2 schema format, same as research-convergence
**And** Compass routing distinguishes: back to Liam with revised definition, or to Isla if assumptions need validation
**And** all step-file architecture requirements are met (FR46, FR51, FR52)
**And** step count is 4-6 with standardized filenames

*Covers: FR5, FR17, FR19, FR20, FR21, FR22, FR46, FR47, FR51, FR52*

### Story 2.4: Create Pattern-Mapping Workflow

As a product manager with multiple research streams,
I want to map patterns across different artifact types to identify convergent themes,
So that I can see cross-cutting insights that no single artifact reveals alone.

**Acceptance Criteria:**

**Given** the workflow directory `_bmad/bme/_vortex/workflows/pattern-mapping/steps/`
**When** a user invokes the workflow with multiple artifacts
**Then** step-01-setup validates input artifacts and guides on non-conforming input (FR17)
**And** the workflow facilitates pattern identification across artifacts
**And** the output can feed into research-convergence or stand alone as a pattern analysis
**And** Compass routing offers: Mila's research-convergence for full synthesis, Liam if patterns already point to clear problem, Isla if patterns reveal gaps
**And** all step-file architecture requirements are met (FR46, FR51, FR52)
**And** step count is 4-6 with standardized filenames

*Covers: FR6, FR17, FR19, FR20, FR21, FR22, FR46, FR47, FR51, FR52*

### Story 2.5: Create Mila User Guide & Example Artifacts

As a product discovery practitioner new to the Vortex,
I want a user guide explaining when and how to use Mila, plus example artifacts showing expected output format,
So that I understand Mila's role in the Vortex and what her output looks like.

**Acceptance Criteria:**

**Given** the existing user guide format (ISLA-USER-GUIDE.md as reference)
**When** MILA-USER-GUIDE.md is created in `_bmad/bme/_vortex/guides/`
**Then** it follows the same structure as existing guides (NFR19)
**And** it includes "when to use this agent" positioning — specifically the Mila vs. Emma distinction
**And** it documents all 3 workflows with descriptions
**And** it explains the pivot re-synthesis use case (Journey 5)
**And** example artifacts are committed to the repo showing: sample converged problem definition (JTBD + Pains & Gains output format) (FR44)
**And** examples demonstrate HC2 schema compliance

*Covers: FR43 (Mila), FR44 (Mila)*

## Epic 3: Liam — Hypothesis Engineering & Experiment Design

Users can bring a problem definition and leave with 1-3 investment-grade hypothesis contracts ready for Wade. Liam flags unvalidated assumptions and routes back to Isla when needed.

### Story 3.1: Design Liam's Agent Definition & Persona

As a product discovery practitioner,
I want Liam to have a distinct persona as a Hypothesis Engineer — a creative peer who challenges and sharpens ideas,
So that he maintains consistent character and is clearly distinguishable from Mila (convergence) and Wade (experimentation).

**Acceptance Criteria:**

**Given** Isla's agent definition as canonical template (FM1)
**When** Liam's agent definition is created as `hypothesis-engineer.md`
**Then** it follows the exact structure: Frontmatter → Activation block (XML) → Persona block → Menu block
**And** frontmatter has `name: "hypothesis engineer"` (lowercase with spaces)
**And** persona positions Liam as a creative peer who ideates alongside the user, not a facilitator who asks questions
**And** persona fields match the registry persona fields in Story 1.1 exactly
**And** the agent loads persona at runtime per BMAD Core standards (FR50)
**And** file is placed in `_bmad/bme/_vortex/agents/`

*Covers: FR50 (Liam), prerequisite RF3*

### Story 3.2: Create Hypothesis-Engineering Workflow (Liam's Primary)

As a solo founder with a problem definition,
I want to run Liam's hypothesis-engineering workflow to generate testable hypotheses with explicit riskiest assumptions,
So that I know exactly what to test first and why.

**Acceptance Criteria:**

**Given** the workflow directory `_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/`
**When** a user invokes the workflow with a problem definition (FR7)
**Then** step-01-setup validates input conforms to "problem definition" schema (FR17) and guides if non-conforming
**And** step-02-context loads the problem definition and analyzes its components
**And** core steps facilitate structured brainwriting/ideation as a creative peer (FR8) — generating and challenging ideas alongside the user
**And** the workflow produces 1-3 hypothesis contracts in 4-field format: expected outcome + target behavior change + rationale + riskiest assumption (FR9)
**And** the output artifact conforms to HC3 schema with `sourceArtifact` reference (FR29)
**And** Liam flags any unvalidated assumptions discovered during ideation (FR10) and recommends Isla routing
**And** the final step presents Compass routing: Wade for experiment execution (HC3), Isla for assumption validation (HC9 as guidance row)
**And** Compass references HC3 contract and declares what Wade expects (FR21)
**And** user can override Compass recommendation (FR22)
**And** accepts problem definitions from any source — Mila, Emma, or user-provided (FR11)
**And** each step has valid frontmatter (FR46), micro-file architecture (FR51), A/P/C menu (FR52)
**And** step count is 4-6 with standardized filenames
**And** "insufficient evidence" Compass state handled (FR18)

*Covers: FR7, FR8, FR9, FR10, FR11, FR17, FR18, FR19, FR20, FR21, FR22, FR46, FR47, FR51, FR52*

### Story 3.3: Create Assumption-Mapping Workflow

As a product manager who wants to understand risk before committing to experiments,
I want to map and prioritize assumptions across my hypothesis contracts,
So that I can identify which assumptions are most lethal and most uncertain — and test those first.

**Acceptance Criteria:**

**Given** the workflow directory `_bmad/bme/_vortex/workflows/assumption-mapping/steps/`
**When** a user invokes the workflow with one or more hypothesis contracts
**Then** step-01-setup validates input artifacts (FR17)
**And** the workflow extracts and catalogs assumptions from all hypothesis contracts
**And** assumptions are prioritized by lethality (if wrong, kills the idea) and uncertainty (how confident are we)
**And** output identifies the highest-priority assumptions to validate
**And** Compass routing offers: Isla for assumption validation, Wade if assumptions are acceptable, Liam's hypothesis-engineering to refine hypotheses
**And** all step-file architecture requirements are met (FR46, FR51, FR52)
**And** step count is 4-6 with standardized filenames

*Covers: FR10, FR17, FR19, FR20, FR21, FR22, FR46, FR47, FR51, FR52*

### Story 3.4: Create Experiment-Design Workflow

As a founder ready to test a hypothesis,
I want to design the experiment structure before handing off to Wade,
So that Wade receives a clear experiment brief with success criteria, metrics, and methodology.

**Acceptance Criteria:**

**Given** the workflow directory `_bmad/bme/_vortex/workflows/experiment-design/steps/`
**When** a user invokes the workflow with a hypothesis contract
**Then** step-01-setup validates input conforms to hypothesis contract schema (FR17)
**And** the workflow guides experiment design: methodology, success criteria, metrics, duration
**And** the output enriches the hypothesis contract with experiment parameters
**And** output conforms to a format Wade can consume (aligning with HC3 schema)
**And** Compass routing offers: Wade for experiment execution, Liam's hypothesis-engineering to revise hypothesis, Isla if pre-experiment validation needed
**And** all step-file architecture requirements are met (FR46, FR51, FR52)
**And** step count is 4-6 with standardized filenames

*Covers: FR9, FR17, FR19, FR21, FR22, FR46, FR47, FR51, FR52*

### Story 3.5: Create Liam User Guide & Example Artifacts

As a product discovery practitioner new to the Vortex,
I want a user guide explaining when and how to use Liam, plus example artifacts showing hypothesis contract format,
So that I understand Liam's role and what his output looks like.

**Acceptance Criteria:**

**Given** the existing user guide format (ISLA-USER-GUIDE.md as reference)
**When** LIAM-USER-GUIDE.md is created in `_bmad/bme/_vortex/guides/`
**Then** it follows the same structure as existing guides (NFR19)
**And** it includes "when to use this agent" positioning — specifically Liam vs. general brainstorming
**And** it documents all 3 workflows with descriptions
**And** it explains the assumption flagging → Isla backflow use case
**And** example artifacts are committed showing: sample 4-field hypothesis contract (FR44)
**And** examples demonstrate HC3 schema compliance

*Covers: FR43 (Liam), FR44 (Liam)*

## Epic 4: Noah — Production Intelligence & Signal Interpretation

Users can bring Wade's experiment context and get production signals interpreted through Vortex history. Noah detects anomalies and routes to Isla for discovery.

### Story 4.1: Design Noah's Agent Definition & Persona

As a product discovery practitioner,
I want Noah to have a distinct persona as a Production Intelligence Specialist — an analyst who connects signals to their experimental lineage,
So that he maintains consistent character and is clearly distinguishable from Wade (experimentation) and Max (decisions).

**Acceptance Criteria:**

**Given** Isla's agent definition as canonical template (FM1)
**When** Noah's agent definition is created as `production-intelligence-specialist.md`
**Then** it follows the exact structure: Frontmatter → Activation block (XML) → Persona block → Menu block
**And** frontmatter has `name: "production intelligence specialist"` (lowercase with spaces)
**And** persona positions Noah as an intelligence analyst who interprets data through context — not a dashboard or reporting tool
**And** Noah explicitly does NOT make strategic recommendations — he produces signals for Max to decide on
**And** persona fields match the registry persona fields in Story 1.1 exactly
**And** the agent loads persona at runtime per BMAD Core standards (FR50)
**And** file is placed in `_bmad/bme/_vortex/agents/`

*Covers: FR50 (Noah), prerequisite RF3*

### Story 4.2: Create Signal-Interpretation Workflow (Noah's Primary)

As a head of product with production metrics diverging from experiment expectations,
I want to run Noah's signal-interpretation workflow to understand what production signals mean in context of my experiment history,
So that I get contextualized intelligence for Max instead of raw dashboard numbers.

**Acceptance Criteria:**

**Given** the workflow directory `_bmad/bme/_vortex/workflows/signal-interpretation/steps/`
**When** a user invokes the workflow with Wade's experiment context (FR12)
**Then** step-01-setup validates input conforms to experiment context schema (FR17) and guides if non-conforming
**And** step-02-context loads experiment context and connects it to the production signal
**And** core steps interpret production signals by connecting them to originating experiment context and Vortex history (FR13)
**And** the workflow produces a signal report in strict format: signal + context + trend — with no strategic recommendations (FR14)
**And** the output artifact conforms to HC5 schema with `sourceArtifact` reference (FR29)
**And** Noah detects unexpected user behavior patterns not covered by the original hypothesis (FR15)
**And** if anomalous behavior detected, Compass routes to Isla for discovery research (FR16, HC10 as guidance row)
**And** the final step presents Compass routing: Max for decision-making (HC5), Isla for unexpected behavior discovery
**And** Compass references HC5 contract and declares what Max expects (FR21)
**And** user can override Compass recommendation (FR22)
**And** each step has valid frontmatter (FR46), micro-file architecture (FR51), A/P/C menu (FR52)
**And** step count is 4-6 with standardized filenames
**And** "insufficient evidence" Compass state handled (FR18)

*Covers: FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20, FR21, FR22, FR46, FR47, FR51, FR52*

### Story 4.3: Create Behavior-Analysis Workflow

As a product manager who noticed users behaving unexpectedly in production,
I want to analyze behavior patterns in the context of validated experiments,
So that I can understand whether this is normal variance, a regression, or a new discovery opportunity.

**Acceptance Criteria:**

**Given** the workflow directory `_bmad/bme/_vortex/workflows/behavior-analysis/steps/`
**When** a user invokes the workflow with production behavior data and experiment context
**Then** step-01-setup validates input artifacts (FR17)
**And** the workflow analyzes behavior patterns against experiment baselines
**And** the workflow classifies findings: expected variance, regression from validated performance, or novel behavior
**And** output includes behavior classification with supporting evidence
**And** Compass routing offers: Max if behavior indicates decision needed, Isla if novel behavior warrants discovery, Noah's signal-interpretation for deeper signal analysis
**And** all step-file architecture requirements are met (FR46, FR51, FR52)
**And** step count is 4-6 with standardized filenames

*Covers: FR15, FR17, FR19, FR20, FR21, FR22, FR46, FR47, FR51, FR52*

### Story 4.4: Create Production-Monitoring Workflow

As a head of product tracking multiple graduated experiments in production,
I want to monitor production signals across all active experiments simultaneously,
So that I can identify which experiments need attention and produce signals for Max's portfolio-level decisions.

**Acceptance Criteria:**

**Given** the workflow directory `_bmad/bme/_vortex/workflows/production-monitoring/steps/`
**When** a user invokes the workflow with multiple experiment contexts
**Then** step-01-setup validates input artifacts (FR17)
**And** the workflow guides monitoring of multiple production signals against their experiment baselines
**And** the workflow produces signal reports for each monitored experiment in HC5 schema format (FR14)
**And** signals are prioritized by divergence from validated performance
**And** anomalies across any experiment trigger Isla routing recommendation (FR16)
**And** Compass routing offers: Max for portfolio-level decisions, Isla for discovery on anomalies, Noah's signal-interpretation for deep dive on specific signals
**And** all step-file architecture requirements are met (FR46, FR51, FR52)
**And** step count is 4-6 with standardized filenames

*Covers: FR12, FR14, FR15, FR16, FR17, FR19, FR21, FR22, FR46, FR47, FR51, FR52*

### Story 4.5: Create Noah User Guide & Example Artifacts

As a product discovery practitioner new to the Vortex,
I want a user guide explaining when and how to use Noah, plus example artifacts showing signal report format,
So that I understand Noah's role and what his output looks like.

**Acceptance Criteria:**

**Given** the existing user guide format (ISLA-USER-GUIDE.md as reference)
**When** NOAH-USER-GUIDE.md is created in `_bmad/bme/_vortex/guides/`
**Then** it follows the same structure as existing guides (NFR19)
**And** it includes "when to use this agent" positioning — specifically Noah vs. raw dashboards/analytics
**And** it documents all 3 workflows with descriptions
**And** it explains the anomaly detection → Isla routing use case
**And** example artifacts are committed showing: sample signal report (signal + context + trend linked to experiment history) (FR44)
**And** examples demonstrate HC5 schema compliance

*Covers: FR43 (Noah), FR44 (Noah)*

## Epic 5: Vortex Integration — Cross-Agent Routing & Documentation

All 7 agents route correctly to each other, existing agents gain new Compass entries for the 3 new agents, and the complete Vortex is documented and validated.

### Story 5.1: Update Isla's Compass Routes to Mila

As a product discovery practitioner finishing Isla's discovery workflows,
I want the Compass routing to offer Mila as a destination when synthesis is appropriate,
So that I can flow naturally from divergent discovery to convergent problem definition.

**Acceptance Criteria:**

**Given** Isla's existing workflow final steps (Compass routing sections)
**When** routes are updated
**Then** Isla's Compass includes: Mila for convergence/synthesis (HC1 contract), Emma for new problem space, Wade for quick experiment
**And** HC1 (Isla→Mila) route is documented with trigger condition: "multiple artifacts ready for synthesis"
**And** the three-way distinction is present: new problem space (→Emma), synthesize within known space (→Mila), quick experiment (→Wade)
**And** all existing Isla routes remain functional (no regression)
**And** Compass routing reference document is updated with new Isla→Mila route
**And** route references HC1 contract and declares what Mila expects (FR21)
**And** user can override Compass recommendation (FR22)

*Covers: FR30, FR33*

### Story 5.2: Update Wade's & Max's Compass Routes

As a product discovery practitioner using Wade or Max,
I want their Compass routing to include the 3 new agents where appropriate,
So that the complete 7-agent routing network is active.

**Acceptance Criteria:**

**Given** Wade's and Max's existing workflow final steps (Compass routing sections)
**When** routes are updated
**Then** Wade's Compass includes: Noah for production signal interpretation (HC4 contract), Max for decision (existing), Liam to revise hypothesis
**And** Max's Compass includes: Mila for pivot re-synthesis (FR23), Isla for new discovery, Emma for recontextualization, Liam for hypothesis revision, Noah for more signal data
**And** Max's "pivot" decision routes to Mila (not just back to start)
**And** HC4 (Wade→Noah) and HC5 (Noah→Max) routes are documented with trigger conditions
**And** all existing Wade and Max routes remain functional (no regression)
**And** Compass routing reference document is updated with all new routes
**And** each route references its contract and declares what the target agent expects (FR21)

*Covers: FR23, FR31, FR32, FR33*

### Story 5.3: Update Documentation for Complete 7-Agent Vortex

As a product discovery practitioner,
I want the README and module documentation updated to reflect the complete 7-agent Vortex,
So that I understand the full framework and can navigate all available agents and workflows.

**Acceptance Criteria:**

**Given** existing README.md and module documentation
**When** documentation is updated
**Then** README reflects all 7 agents with their streams, names, and icons
**And** the Vortex visualization/description shows the complete non-linear framework
**And** all 7 user journeys from the PRD are documented with their agent sequences
**And** the handoff contract system is explained with all 10 contracts (HC1-HC10)
**And** the Compass routing concept is documented for users
**And** documentation demonstrates extensibility: clearly shows where a new agent/workflow would be added (registry entry + agent file + workflows + guide) to validate NFR9/E4
**And** module README in `_bmad/bme/_vortex/` is updated with complete agent and workflow inventory
**And** CHANGELOG.md is updated with v1.6.0 entry

*Covers: FR45, NFR9/E4*

### Story 5.4: Add CI Dead-End Detection & Final Version Bump

As a maintainer of the Vortex pattern,
I want CI to detect dead-end Compass routes and the version bumped to 1.6.0,
So that any broken routing is caught automatically and the release is properly versioned.

**Acceptance Criteria:**

**Given** the complete 7-agent routing network
**When** CI validation runs
**Then** a test scans all workflow final steps and verifies every Compass route references a valid agent
**And** the test verifies every agent has at least one inbound and one outbound route
**And** the test flags any "dead-end" routes (agent referenced but no workflow exists)
**And** `package.json` version is bumped to `1.6.0`
**And** `npm test` passes with all existing + new tests
**And** `npm run lint` passes with no new warnings
**And** `npm run test:integration` passes including installer E2E with 7 agents
**And** the validator is updated to check for 7 agents and all new workflows

*Covers: FR48*
