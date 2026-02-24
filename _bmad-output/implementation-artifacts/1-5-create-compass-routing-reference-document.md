# Story 1.5: Create Compass Routing Reference Document

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an agent workflow author,
I want a single Compass routing decision matrix documenting all navigation paths between all 7 agents,
so that every workflow's final Compass step can reference the authoritative routing table.

## Acceptance Criteria

1. **AC1: Document maps every workflow exit to every possible next agent**
   - **Given** the routing reference document (`compass-routing-reference.md`)
   - **When** created in `_bmad/bme/_vortex/`
   - **Then** it maps every workflow exit to every possible next agent with selection criteria
   - **And** every workflow across all 7 agents has at least one routing entry

2. **AC2: Three-way routing distinction documented**
   - **Given** the routing reference document
   - **When** reviewed
   - **Then** it documents the three-way routing distinction:
     - New problem space → Emma (`contextualize-scope`)
     - Reframe within known space → Mila (`research-convergence`)
     - Zoom out → Emma (`contextualize-scope`)
   - **And** selection criteria make the distinction unambiguous for step-file authors

3. **AC3: All 10 handoff contracts covered with trigger conditions**
   - **Given** the routing reference document
   - **When** reviewed
   - **Then** it covers all 10 handoff contracts (HC1-HC10)
   - **And** each route includes trigger condition, target agent, contract reference, and expected artifact

4. **AC4: HC6-HC10 routing contracts documented as Compass table guidance**
   - **Given** HC6-HC10 (routing contracts, no artifact files)
   - **When** documented
   - **Then** HC6 (Max→Mila): pivot decision + original evidence
   - **And** HC7 (Max→Isla): evidence gap routing
   - **And** HC8 (Max→Emma): recontextualize routing (new problem space)
   - **And** HC9 (Liam→Isla): unvalidated assumption for validation
   - **And** HC10 (Noah→Isla): anomalous behavior for discovery research
   - **And** HC9/HC10 are marked as "Compass guidance rows" per phased approach (P2, D5)

5. **AC5: Each route references specific contract and declares expected artifact (FR21)**
   - **Given** any routing entry
   - **When** reviewed
   - **Then** it references the specific handoff contract (HC1-HC10)
   - **And** it declares what artifact the target agent expects to receive

6. **AC6: Insufficient evidence guidance pattern included (FR18)**
   - **Given** the routing reference document
   - **When** a workflow author needs to handle ambiguous routing
   - **Then** the document includes an "insufficient evidence" guidance pattern
   - **And** it provides guidance on what evidence to gather when routing cannot be determined

7. **AC7: Document marked as authoritative (P22)**
   - **Given** the routing reference document
   - **When** reviewed
   - **Then** it is marked as the authoritative routing reference
   - **And** the architecture table (architecture.md) is identified as a snapshot only
   - **And** the document includes versioning metadata for future updates

## Tasks / Subtasks

- [x] **Task 1: Create compass-routing-reference.md with header and overview** (AC: 7)
  - [x] 1.1 Create `_bmad/bme/_vortex/compass-routing-reference.md`
  - [x] 1.2 Add document header marking it as authoritative (P22)
  - [x] 1.3 Include Vortex overview diagram showing 7-agent flow and contract chain

- [x] **Task 2: Document the complete routing decision matrix (compact reference)** (AC: 1, 5)
  - [x] 2.1 Create master routing table: Source Agent → Workflow → Target Agent → Contract → Trigger Condition → Expected Artifact
  - [x] 2.2 Cover all 22 workflows (13 existing + 9 new Wave 3)
  - [x] 2.3 Ensure every workflow has at least one routing entry
  - [x] 2.4 Note: This is the compact lookup table; Task 7 expands each agent with decision criteria for step-file authors

- [x] **Task 3: Document artifact contracts (HC1-HC5) routing entries** (AC: 3, 5)
  - [x] 3.1 HC1 (Isla→Mila): empathy artifacts → research convergence
  - [x] 3.2 HC2 (Mila→Liam): problem definition → hypothesis engineering
  - [x] 3.3 HC3 (Liam→Wade): hypothesis contracts → experiment execution
  - [x] 3.4 HC4 (Wade→Noah): experiment context → signal interpretation
  - [x] 3.5 HC5 (Noah→Max): signal report → learning & decisions
  - [x] 3.6 Each entry references the schema file in `_bmad/bme/_vortex/contracts/`

- [x] **Task 4: Document routing contracts (HC6-HC10) as Compass guidance** (AC: 4, 5)
  - [x] 4.1 HC6 (Max→Mila): pivot decision routing
  - [x] 4.2 HC7 (Max→Isla): evidence gap routing
  - [x] 4.3 HC8 (Max→Emma): recontextualize routing (new problem space)
  - [x] 4.4 HC9 (Liam→Isla): unvalidated assumption flag routing
  - [x] 4.5 HC10 (Noah→Isla): anomalous behavior discovery routing
  - [x] 4.6 Mark HC9/HC10 as phased (Compass guidance in Wave 3.0, interrupt pattern in 3.1)

- [x] **Task 5: Document the three-way routing distinction** (AC: 2)
  - [x] 5.1 Define the three scenarios with unambiguous selection criteria
  - [x] 5.2 Include decision flowchart logic for step-file authors
  - [x] 5.3 Provide concrete examples for each routing scenario

- [x] **Task 6: Add insufficient evidence guidance pattern** (AC: 6)
  - [x] 6.1 Define the "insufficient evidence" Compass state
  - [x] 6.2 Document what evidence to gather for each agent transition
  - [x] 6.3 Provide template text for step-file authors to use

- [x] **Task 7: Add per-agent Compass reference sections (expanded decision criteria)** (AC: 1, 3, 4)
  - [x] 7.1 Emma section: all outbound routes from her 3 workflows
  - [x] 7.2 Isla section: all outbound routes from her 3 workflows (includes new Mila route per FR30 — contract is HC1)
  - [x] 7.3 Mila section: all outbound routes from her 3 workflows
  - [x] 7.4 Liam section: all outbound routes from his 3 workflows (includes HC9 Isla flag)
  - [x] 7.5 Wade section: all outbound routes from his 4 workflows (includes new Noah route per FR31)
  - [x] 7.6 Noah section: all outbound routes from his 3 workflows (includes HC10 Isla flag)
  - [x] 7.7 Max section: all outbound routes from his 3 workflows (includes Mila pivot per FR32)

- [x] **Task 8: Cross-validation and consistency check** (AC: 1, 3, 5, 7)
  - [x] 8.1 Verify every agent has at least one inbound and one outbound route
  - [x] 8.2 Verify all 10 HC contracts are covered
  - [x] 8.3 Verify routing entries are consistent with existing step-06 Compass tables
  - [x] 8.4 Verify HC1-HC5 references point to actual schema files in `contracts/`
  - [x] 8.5 Run existing tests to confirm no regressions

## Dev Notes

### This is a Content-Only Story

**No JavaScript code changes.** This story creates a single markdown reference document (`compass-routing-reference.md`) that serves as the authoritative routing matrix for the entire Vortex. Similar to Story 1.4 (HC1-HC5 schemas), this is a content artifact shipped in the npm package.

### File Location and Purpose

- **File:** `_bmad/bme/_vortex/compass-routing-reference.md`
- **Purpose:** Living reference document — the single source of truth for all Compass routing decisions
- **Consumers:** Step-file authors (Epics 2-4), integration story authors (Epic 5), any agent needing to know "where do I route the user next?"
- **Authoritative status (P22):** This file is authoritative. The architecture.md routing table is a snapshot only.

### Compass Table Format (D4)

All Compass tables use the uniform format defined in architecture decision D4:

```markdown
| If you learned... | Consider next... | Agent | Why |
```

Routing type distinction (schema-driven, decision-driven, flag-driven) lives in row content, not table structure. The routing reference document should use this same format consistently.

### Existing Compass Table Pattern

All 13 existing Compass instances (12 step-06 files + `vortex-navigation/steps/step-05-recommendation.md`) follow this exact structure:

```markdown
## Vortex Compass

Based on what you just completed, here are your evidence-driven options:

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| [condition] | [workflow] | [Agent Icon] | [rationale] |
| [condition] | [workflow] | [Agent Icon] | [rationale] |
| [condition] | [workflow] | [Agent Icon] | [rationale] |

**Or run Max's [VN] Vortex Navigation** for a full gap analysis across all streams.
```

**Key observations:**
- Every table has exactly **3 rows** in current implementations
- Agent format: `AgentName Icon` (e.g., `Emma 🎯`, `Isla 🔍`, `Wade 🧪`, `Max 🧭`)
- New agents: `Mila 🔬`, `Liam 💡`, `Noah 📡`
- Footer always references Max's Vortex Navigation
- `vortex-navigation` has NO Compass table (it's the terminal navigation tool)

### The 10 Handoff Contracts

| Contract | Flow | Type | Trigger | Schema File |
|----------|------|------|---------|-------------|
| HC1 | Isla → Mila | Artifact | Discovery complete, artifacts ready for synthesis | `contracts/hc1-empathy-artifacts.md` |
| HC2 | Mila → Liam | Artifact | Problem definition converged | `contracts/hc2-problem-definition.md` |
| HC3 | Liam → Wade | Artifact | Hypothesis contracts ready for testing | `contracts/hc3-hypothesis-contract.md` |
| HC4 | Wade → Noah | Artifact | Experiment graduated to production | `contracts/hc4-experiment-context.md` |
| HC5 | Noah → Max | Artifact | Signal report ready for decision | `contracts/hc5-signal-report.md` |
| HC6 | Max → Mila | Routing | Pivot decision — problem correct, solution wrong | _No artifact file_ |
| HC7 | Max → Isla | Routing | Evidence gap — need more discovery | _No artifact file_ |
| HC8 | Max → Emma | Routing | New problem space — need recontextualization | _No artifact file_ |
| HC9 | Liam → Isla | Routing | Unvalidated assumption flagged during ideation | _No artifact file_ |
| HC10 | Noah → Isla | Routing | Anomalous behavior detected in production | _No artifact file_ |

**Important:** HC6-HC10 are **routing contracts** — they have no artifact schema file. They are Compass table guidance entries that carry decision context in conversation (architecture D2). The routing reference document is where HC6-HC10 are authoritatively defined.

### Three-Way Routing Distinction (FR20)

This is the central design challenge. The document must make these three scenarios unambiguous:

1. **New problem space → Emma** (`contextualize-scope`): Evidence reveals the problem itself is wrong. Need to reframe from scratch. _Example: "We thought users wanted faster checkout but they actually want fewer returns."_
2. **Reframe within known space → Mila** (`research-convergence`): Problem is correct but needs re-synthesis. The JTBD stays the same, but pains/gains need revision based on new evidence. _Example: "Users still want X but our assumed pain points were wrong."_
3. **Zoom out → Emma** (`contextualize-scope`): Need to widen the context lens. Not a new problem, but the current scope is too narrow. _Example: "Our scope missed a key user segment."_

**Architecture note (A4):** Emma is read-only in Wave 3 — the three-way routing lives in _other agents'_ Compass steps, not in Emma's workflows.

### Current Compass Routes (Pre-Wave 3)

These are the existing routes that the routing reference document must capture and extend:

| Agent | Workflow | Current Routes |
|-------|----------|---------------|
| Emma | contextualize-scope | → Emma (lean-persona), Isla (user-interview), Wade (mvp) |
| Emma | lean-persona | → Wade (lean-experiment), Isla (user-interview, empathy-map) |
| Emma | product-vision | → Emma (lean-persona), Wade (lean-experiment), Isla (user-discovery) |
| Isla | empathy-map | → Wade (lean-experiment), Emma (lean-persona), Isla (user-interview) |
| Isla | user-discovery | → Emma (contextualize-scope), Wade (lean-experiment), Isla (empathy-map) |
| Isla | user-interview | → Emma (contextualize-scope), Wade (lean-experiment), Isla (empathy-map) |
| Wade | lean-experiment | → Max (learning-card), Emma (contextualize-scope), Isla (empathy-map) |
| Wade | mvp | → Wade (lean-experiment), Isla (user-interview), Max (learning-card) |
| Wade | proof-of-concept | → Wade (proof-of-value, lean-experiment), Max (learning-card) |
| Wade | proof-of-value | → Max (learning-card), Isla (user-interview), Max (pivot-patch-persevere) |
| Max | learning-card | → Max (pivot-patch-persevere), Wade (lean-experiment), Emma (contextualize-scope) |
| Max | pivot-patch-persevere | → Emma (contextualize-scope), Wade (lean-experiment), Isla (user-discovery) |

**Note:** `vortex-navigation` has no Compass table — it IS the terminal navigation tool.

**Wave 3 additions needed (Epic 5 stories 5.1/5.2, not this story):**
- Isla's workflows: add Mila route for convergence (FR30)
- Wade's workflows: add Noah route for signal interpretation (FR31)
- Max's pivot-patch-persevere: add Mila route for pivot (FR32, replacing current Emma route)

### Wave 3 Agent Routes (New — Must Be Defined in This Document)

These are the routes for Mila, Liam, and Noah that don't exist yet in any step files. **This document defines them authoritatively — Epic 2-4 step-file authors MUST follow these routing definitions when authoring their Compass sections:**

**Mila's workflows:**
- `research-convergence` → Liam (HC2), Isla (more discovery needed), Emma (new problem space)
- `pivot-resynthesis` → Liam (HC2), Isla (assumption validation needed)
- `pattern-mapping` → Mila (research-convergence for full synthesis), Liam (clear problem), Isla (gaps found)

**Liam's workflows:**
- `hypothesis-engineering` → Wade (HC3), Isla (HC9 — unvalidated assumption flag)
- `assumption-mapping` → Isla (assumption validation), Wade (acceptable assumptions), Liam (hypothesis-engineering)
- `experiment-design` → Wade (HC3 enriched), Liam (revise hypothesis), Isla (pre-experiment validation)

**Noah's workflows:**
- `signal-interpretation` → Max (HC5), Isla (HC10 — anomalous behavior)
- `behavior-analysis` → Max (decision needed), Isla (novel behavior), Noah (signal-interpretation)
- `production-monitoring` → Max (portfolio decisions), Isla (anomalies), Noah (signal-interpretation)

### Routing Contract Mechanisms (Architecture A2)

Three distinct mechanisms — the routing reference should categorize each route:

| Mechanism | Description | Contracts | Compass UX |
|-----------|-------------|-----------|------------|
| Schema-driven | Artifact produced, schema declares target | HC1-HC5 | "Your artifact is ready for [Agent]" |
| Decision-driven | Max makes strategic routing decision | HC6, HC7, HC8 | "Based on evidence, route to [Agent]" |
| Flag-driven | Mid-workflow flag triggers routing | HC9, HC10 | "Flagged issue → consider [Agent]" |

### User Override Capability (FR22)

FR22 requires that users can override any Compass recommendation and navigate to any agent directly. The routing reference document should include a standard user override note that step-file authors can include in their Compass sections. The routing matrix defines recommended paths, not mandatory ones.

### Phased Mid-Workflow Routing (P2, D5)

HC9 and HC10 represent mid-workflow routing (Liam flags an assumption, Noah flags anomalous behavior). In Wave 3.0, these ship as **Compass guidance rows** in the source agent's final step. A full mid-workflow interrupt pattern is deferred to Wave 3.1.

### Learnings from Previous Stories (1.1-1.4)

- **Story 1.4 (HC1-HC5 schemas):** Established the D2 contract format. The routing reference should be consistent with contract schema frontmatter fields. HC5 already references HC10 in its downstream consumption section.
- **Content-only stories work well:** Stories 1.4 proved that content-only markdown creation is clean and regression-free. Follow the same pattern.
- **Consistency is king:** All schemas followed D2 exactly. All routing entries should follow D4 exactly.
- **Cross-references matter:** Each HC schema references its upstream and downstream consumers. The routing reference should cross-reference both the contract schemas and the step-06 files.

### Quality Gate Context

This is the **final story in Epic 1** (Vortex Foundation). After this story is complete:
- Epic 1 quality gate (P18) can be assessed
- Content epics (2-4) can begin — they need this routing reference to author their step-06 Compass tables
- The routing reference is THE document that step-file authors reference when writing Compass sections

### Project Structure Notes

- New file: `_bmad/bme/_vortex/compass-routing-reference.md`
- No changes to existing files
- No JavaScript code changes
- No test changes (content-only)

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.5 ACs]
- [Source: _bmad-output/planning-artifacts/architecture.md — D4 Compass Table Format]
- [Source: _bmad-output/planning-artifacts/architecture.md — Compass Routing Reference table]
- [Source: _bmad-output/planning-artifacts/architecture.md — D2 Contract Schema Format (routing contracts)]
- [Source: _bmad-output/planning-artifacts/architecture.md — D5 Isla Re-entry Mode (deferred)]
- [Source: _bmad-output/planning-artifacts/architecture.md — P2 Phased mid-workflow routing]
- [Source: _bmad-output/planning-artifacts/architecture.md — P22 Authoritative routing reference]
- [Source: _bmad-output/planning-artifacts/architecture.md — A2 Three routing mechanisms]
- [Source: _bmad-output/planning-artifacts/architecture.md — A4 Emma read-only in Wave 3]
- [Source: _bmad-output/planning-artifacts/prd.md — FR18 Insufficient evidence, FR20 Three-way distinction, FR21 Contract references, FR24 Compass routing document]
- [Source: _bmad-output/planning-artifacts/prd.md — HC6-HC10 contract inventory table]
- [Source: _bmad/bme/_vortex/contracts/ — HC1-HC5 schema files (Story 1.4 deliverables)]
- [Source: _bmad/bme/_vortex/workflows/*/steps/step-06*.md — 12 existing Compass tables]
- [Source: _bmad-output/implementation-artifacts/1-4-define-handoff-contract-schemas-hc1-hc5.md — Previous story learnings]
- [Source: scripts/update/lib/agent-registry.js — 7 agents with IDs, names, icons, streams, 22 workflows]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

### Completion Notes List

- All 7 ACs met: complete routing matrix covering 22 workflows (AC1), three-way routing distinction with decision flowchart and examples (AC2), all 10 HC contracts with trigger conditions and expected artifacts (AC3), HC6-HC10 routing contracts defined as Compass guidance with phasing note (AC4), each route references specific contract and declares expected artifact (AC5), insufficient evidence guidance pattern with per-agent evidence requirements and template (AC6), document marked authoritative with version history (AC7)
- ASCII diagram of 7-agent Vortex with contract flow
- Per-agent routing sections: Emma (3 workflows), Isla (3 workflows + Mila HC1 route), Mila (3 workflows), Liam (3 workflows + HC9 flag), Wade (4 workflows + Noah HC4 route), Noah (3 workflows + HC10 flag), Max (3 workflows + Mila HC6 pivot)
- Inbound route summary verifying all 7 agents reachable
- Routing mechanisms taxonomy: schema-driven (HC1-5), decision-driven (HC6-8), flag-driven (HC9-10)
- User override note (FR22) with template for step-file authors
- Compass table format reference (D4) with agent display format table
- Notes on target state vs current state for Epic 5 integration work (FR30, FR31, FR32)
- 259 existing tests pass (199 unit + 60 integration) — zero regressions
- Content-only story — no JavaScript code changes

### Change Log
- 2026-02-24: Story created by create-story workflow. Status: ready-for-dev.
- 2026-02-24: Implementation complete. All 8 tasks done. Compass routing reference document created, cross-validated. Status: review.

### File List
- `_bmad/bme/_vortex/compass-routing-reference.md` — **NEW** Authoritative Compass routing reference document
