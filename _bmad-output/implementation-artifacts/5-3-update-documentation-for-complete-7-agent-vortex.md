# Story 5.3: Update Documentation for Complete 7-Agent Vortex

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a product discovery practitioner,
I want the README and module documentation updated to reflect the complete 7-agent Vortex,
So that I understand the full framework and can navigate all available agents and workflows.

## Acceptance Criteria

1. **Given** existing README.md, **When** documentation is updated, **Then** README reflects all 7 agents with their streams, names, and icons
2. **Given** existing README.md, **When** documentation is updated, **Then** the Vortex visualization/description shows the complete non-linear framework (not the old linear 4-agent flow)
3. **Given** the PRD defines 7 user journeys, **When** documentation is updated, **Then** all 7 user journeys are documented with their agent sequences
4. **Given** 10 handoff contracts (HC1-HC10) exist, **When** documentation is updated, **Then** the handoff contract system is explained with all 10 contracts
5. **Given** the Compass routing concept exists across all workflows, **When** documentation is updated, **Then** the Compass routing concept is documented for users
6. **Given** NFR9/E4 extensibility requirement, **When** documentation is updated, **Then** documentation demonstrates extensibility: clearly shows where a new agent/workflow would be added (registry entry + agent file + workflows + guide)
7. **Given** `_bmad/bme/_vortex/` is the module directory, **When** documentation is updated, **Then** module README in `_bmad/bme/_vortex/` is created with complete agent and workflow inventory
8. **Given** CHANGELOG.md exists, **When** documentation is updated, **Then** CHANGELOG.md is updated with v1.6.0 entry covering all Wave 3 additions

*Covers: FR45, NFR9/E4*

## Tasks / Subtasks

- [x] Task 1: Update README.md — 7-agent content (AC: 1, 2, 5)
  - [x] 1.1 Update version badge from `agents-4` to `agents-7` and `workflows-13` to `workflows-22`
  - [x] 1.2 Update opening description from "four specialized agents" to "seven specialized agents"
  - [x] 1.3 Replace 4-agent linear Vortex diagram with 7-agent non-linear Vortex diagram (use compass-routing-reference.md Vortex Overview as source)
  - [x] 1.4 Expand agent table from 4 rows to 7 rows (add Mila, Liam, Noah with correct streams)
  - [x] 1.5 Update Quick Start counts: "All 7 agents with 22 workflows"
  - [x] 1.6 Update What Gets Installed: "7 agent definition files", "22 workflows"
  - [x] 1.7 Add Mila, Liam, Noah to "Activate an Agent" section with correct file paths
  - [x] 1.8 Expand "Using the Agents" section to 7 agents with Compass routing mention
  - [x] 1.9 Add Mila, Liam, Noah user guide links (note: guides are in `_bmad/bme/_vortex/guides/` not `_bmad-output/vortex-artifacts/`)
  - [x] 1.10 Update "How It Fits with BMAD Core" diagram to show 7-agent Vortex
  - [x] 1.11 Update Roadmap: v1.6.0 is NOW current (not upcoming), add v2.0.0+ future items
- [x] Task 2: Update docs/agents.md — complete 7-agent guide (AC: 1, 3, 4, 5)
  - [x] 2.1 Update title from "all four" to "all seven"
  - [x] 2.2 Add Mila section (Stream: Synthesize, workflows: research-convergence, pivot-resynthesis, pattern-mapping)
  - [x] 2.3 Add Liam section (Stream: Hypothesize, workflows: hypothesis-engineering, assumption-mapping, experiment-design)
  - [x] 2.4 Add Noah section (Stream: Sensitize, workflows: signal-interpretation, behavior-analysis, production-monitoring)
  - [x] 2.5 Replace linear Vortex Flow diagram with 7-agent non-linear Vortex diagram
  - [x] 2.6 Add "Handoff Contract System" section explaining HC1-HC10 (reference compass-routing-reference.md)
  - [x] 2.7 Add "Vortex Compass" section explaining evidence-driven routing concept
  - [x] 2.8 Add "7 User Journeys" section with EXPANDED WALKTHROUGHS (see Party Mode Decision below)
  - [x] 2.9 Update "All Artifacts" section with Mila/Liam/Noah user guide links
  - [x] 2.10 Update "Using Agents Independently" to 7 agents
- [x] Task 3: Create `_bmad/bme/_vortex/README.md` — module inventory (AC: 7)
  - [x] 3.1 Create new file with complete agent inventory (7 agents, files, streams)
  - [x] 3.2 Add complete workflow inventory (22 workflows organized by agent)
  - [x] 3.3 Add handoff contract inventory (10 contracts)
  - [x] 3.4 Add file structure overview of the _vortex module
- [x] Task 4: Update CHANGELOG.md — v1.6.0 entry (AC: 8)
  - [x] 4.1 Add v1.6.0 entry with Wave 3 agents (Mila, Liam, Noah)
  - [x] 4.2 Document new workflows (9 new: 3 per agent)
  - [x] 4.3 Document handoff contracts (HC1-HC10)
  - [x] 4.4 Document Compass routing and cross-agent integration (Epics 1-5)
  - [x] 4.5 Document extensibility validation (NFR9/E4)
- [x] Task 5: Add extensibility documentation (AC: 6)
  - [x] 5.1 Add "Adding a New Agent" section to docs/agents.md or _vortex/README.md showing the 4-step pattern: (1) registry entry, (2) agent file, (3) workflows, (4) user guide
  - [x] 5.2 Reference agent-registry.js as the single source of truth
- [x] Task 6: Verification (AC: all)
  - [x] 6.1 Verify all 7 agents mentioned in README.md
  - [x] 6.2 Verify all 7 agents documented in docs/agents.md
  - [x] 6.3 Verify _vortex/README.md lists all 22 workflows
  - [x] 6.4 Verify CHANGELOG.md v1.6.0 entry present
  - [x] 6.5 Run `npm run lint` — must pass
  - [x] 6.6 Run `npm test` — must pass (199/199 or current count)

## Dev Notes

### Current State Documentation (read-before-edit)

**README.md** (root, 182 lines):
- Line 6: Badge `agents-4` → needs `agents-7`
- Line 7: Badge `workflows-13` → needs `workflows-22`
- Line 10: "four specialized agents" → "seven specialized agents"
- Lines 12-22: 4-agent linear diagram → needs 7-agent non-linear diagram
- Lines 24-29: 4-row agent table → needs 7 rows (add Mila stream 3, Liam stream 4, Noah stream 6)
- Line 49: "All 4 agents with 13 workflows" → "All 7 agents with 22 workflows"
- Lines 66-73: What Gets Installed → "7 agent definition files", "22 workflows"
- Lines 55-59: Activate an Agent → add 3 new agents
- Lines 96-101: Using the Agents → expand to 7
- Lines 105-108: User guide links → add Mila, Liam, Noah (in `_bmad/bme/_vortex/guides/`)
- Lines 116-123: BMAD Core diagram → update to 7 agents
- Lines 143-145: Roadmap → v1.6.0 is current, not upcoming

**docs/agents.md** (180 lines):
- Line 1: "all four Vortex agents" → "all seven"
- Lines 7-125: Only 4 agent sections → need to add Mila, Liam, Noah between Isla (stream 2) and Wade (stream 5) with correct stream ordering
- Lines 128-149: "The Vortex Flow" 4-agent linear diagram → needs complete 7-agent non-linear version
- Lines 153-162: "All Artifacts" → add Mila/Liam/Noah guides
- Lines 166-175: "Using Agents Independently" → update to 7

**CHANGELOG.md** (803 lines):
- Newest entry: v1.5.2 (line 10)
- No v1.6.0 entry exists → needs to be inserted before v1.5.2

**`_bmad/bme/_vortex/README.md`:**
- Does NOT exist → needs to be created as new file

### Agent Data Reference

Source: `scripts/update/lib/agent-registry.js`

| # | Agent | ID | Icon | Stream | Workflows |
|---|-------|----|------|--------|-----------|
| 1 | Emma | contextualization-expert | 🎯 | Contextualize | lean-persona, product-vision, contextualize-scope |
| 2 | Isla | discovery-empathy-expert | 🔍 | Empathize | empathy-map, user-interview, user-discovery |
| 3 | Mila | research-convergence-specialist | 🔬 | Synthesize | research-convergence, pivot-resynthesis, pattern-mapping |
| 4 | Liam | hypothesis-engineer | 💡 | Hypothesize | hypothesis-engineering, assumption-mapping, experiment-design |
| 5 | Wade | lean-experiments-specialist | 🧪 | Externalize | mvp, lean-experiment, proof-of-concept, proof-of-value |
| 6 | Noah | production-intelligence-specialist | 📡 | Sensitize | signal-interpretation, behavior-analysis, production-monitoring |
| 7 | Max | learning-decision-expert | 🧭 | Systematize | learning-card, pivot-patch-persevere, vortex-navigation |

Total: 7 agents, 22 workflows (3 per agent except Wade who has 4)

### Handoff Contract Reference

Source: `_bmad/bme/_vortex/compass-routing-reference.md`

| Contract | Flow | Type |
|----------|------|------|
| HC1 | Isla → Mila | Artifact (empathy artifacts) |
| HC2 | Mila → Liam | Artifact (problem definition) |
| HC3 | Liam → Wade | Artifact (hypothesis contracts) |
| HC4 | Wade → Noah | Artifact (experiment context) |
| HC5 | Noah → Max | Artifact (signal report) |
| HC6 | Max → Mila | Decision-driven (pivot resynthesis) |
| HC7 | Max → Isla | Decision-driven (evidence gap) |
| HC8 | Max → Emma | Decision-driven (recontextualization) |
| HC9 | Liam → Isla | Flag-driven (unvalidated assumption) |
| HC10 | Noah → Isla | Flag-driven (anomalous behavior) |

### 7 User Journeys (from PRD) — EXPANDED WALKTHROUGH FORMAT

Source: `_bmad-output/planning-artifacts/prd.md`

**Party Mode Decision:** User requested expanded step-by-step walkthroughs (not just 1-line summaries). Each journey should be written as a numbered sequence a practitioner can follow: agent bold with icon, HC contract in parentheses, arrow showing handoff, ~100-150 words each.

**Format pattern:**
> 1. **Agent Icon** does X → produces Y
> 2. **Agent Icon** (HC#) receives Y → does Z → produces W
> 3. ...

**Journeys 1-5** are agent-sequence journeys (handoff chains):
1. **Mila convergence** — Isla artifacts → Mila synthesizes → problem definition
2. **Liam hypothesis engineering** — Mila problem def → Liam hypotheses → testable contracts
3. **Noah production intelligence** — Wade experiment → Noah signals → Max decisions
4. **Non-linear Vortex entry** — Max gap analysis → routes to any agent
5. **Backflow pivot routing** — Max pivot decision → Mila re-synthesis (HC6)

**Journeys 6-7** are capability demonstrations (NOT agent handoff chains — different format):
6. **Module developer extensibility** — "Here's how you add a new agent" walkthrough (registry entry → agent file → workflows → guide). This overlaps with AC 6 extensibility docs.
7. **Team lead artifact review** — "Here's how you review artifacts across streams" walkthrough

**Placement:** All 7 journeys go in `docs/agents.md` (practitioner-facing). The module README (`_vortex/README.md`) stays as technical inventory only.

### User Guide Locations

Wave 1-2 guides (Emma, Isla, Wade, Max): `_bmad-output/vortex-artifacts/`
Wave 3 guides (Mila, Liam, Noah): `_bmad/bme/_vortex/guides/`

Note: Guide locations differ between waves. Story should reference correct paths.

### Non-Linear Vortex Diagram

Use the diagram from compass-routing-reference.md as the authoritative visualization:

```
                    ┌─────────────────────────────────────────────┐
                    │            VORTEX PATTERN                  │
                    │         7 Streams · 7 Agents                │
                    └─────────────────────────────────────────────┘

  ┌──────────┐    HC1    ┌──────────┐    HC2    ┌──────────┐    HC3    ┌──────────┐
  │  Isla 🔍  │─────────▶│  Mila 🔬  │─────────▶│  Liam 💡  │─────────▶│  Wade 🧪  │
  │ Empathize │          │Synthesize│          │Hypothesiz│          │Externaliz│
  └──────────┘          └──────────┘          └──────────┘          └──────────┘
       ▲                      ▲                    │                      │
       │                      │                  HC9│                   HC4│
       │               HC6│                       │                      │
       │                      │                    ▼                      ▼
  ┌──────────┐          ┌──────────┐          ┌──────────┐          ┌──────────┐
  │ Emma 🎯  │◀── HC8 ──│  Max 🧭  │◀── HC5 ──│  Noah 📡  │◀─────────┘
  │Contextual│          │Systematiz│          │ Sensitize│
  └──────────┘          └──────────┘          └──────────┘
       │                      │                    │
       │               HC7│                  HC10│
       │                      │                    │
       └──────────────────────┴────────────────────┘
                         ▼ to Isla 🔍
```

### Scope-Creep Prevention (Story 5.1 L1)

- Do NOT modify any workflow step files, agent definitions, or compass routes
- Do NOT change any JavaScript source code (agent-registry.js, validator.js, etc.)
- This story is DOCUMENTATION ONLY: README.md, docs/agents.md, CHANGELOG.md, _vortex/README.md
- Only touch the 4 files listed in the file-touch map below

### File-Touch Map

| File | Action | ACs |
|------|--------|-----|
| `README.md` | EDIT — update to 7 agents, new diagram, new counts | 1, 2, 5 |
| `docs/agents.md` | EDIT — add 3 agents, new diagram, HC/Compass/Journeys sections | 1, 3, 4, 5 |
| `_bmad/bme/_vortex/README.md` | CREATE — new module inventory file | 7 |
| `CHANGELOG.md` | EDIT — add v1.6.0 entry | 8 |

Extensibility (AC 6) will be documented in docs/agents.md and/or _vortex/README.md.

### Project Structure Notes

- Alignment with unified project structure: all paths verified correct
- Wave 3 guides are in `_bmad/bme/_vortex/guides/` (installed with module), Wave 1-2 guides in `_bmad-output/vortex-artifacts/` (installed by npm postinstall)
- No conflicts or variances detected

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Epic 5, Story 5.3]
- [Source: _bmad-output/planning-artifacts/prd.md#User Journeys, #Functional Requirements FR45, #NFR9]
- [Source: _bmad-output/planning-artifacts/architecture.md#D1-D8, Project Structure]
- [Source: _bmad/bme/_vortex/compass-routing-reference.md#Vortex Overview, #Handoff Contract Reference]
- [Source: scripts/update/lib/agent-registry.js — 7 agents, 22 workflows]
- [Source: _bmad-output/implementation-artifacts/5-2-update-wades-maxs-compass-routes.md — previous story learnings]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

N/A — no errors encountered during implementation.

### Completion Notes List

- **Task 1 (README.md):** 11 targeted edits using Edit tool. Updated badges, description, diagram (4-agent linear → 7-agent non-linear with HC labels), agent table (4→7 rows), Quick Start counts, What Gets Installed tree, Activate section (7 cat commands), Using the Agents (7 entries + Compass mention), user guide links (correct Wave 1-2 and Wave 3 paths), BMAD Core diagram, and Roadmap (v1.6.0 current).
- **Task 2 (docs/agents.md):** Complete rewrite via Write tool (~180→~370 lines). Added Mila/Liam/Noah agent sections in correct stream order (2→3→4→5→6→7). Each section includes description, workflow table, When to Use, Positioning. Added 4 new major sections: non-linear Vortex diagram, Handoff Contract System (HC1-HC10 in 3 subsections), Vortex Compass routing concept, 7 User Journeys with expanded step-by-step walkthroughs per Party Mode decision (~100-150 words each). Journeys 1-5 as handoff chains, 6-7 as capability demos. Updated All Artifacts (7 guides) and Using Agents Independently (7 agents).
- **Task 3 (_vortex/README.md):** New file created via Write tool. Agent inventory table (7 agents), workflow inventory (22 workflows by agent), handoff contract inventory (HC1-HC10), file structure tree, Adding a New Agent extensibility section (4-step pattern).
- **Task 4 (CHANGELOG.md):** v1.6.0 entry added before v1.5.2. Added section: 3 agents, 9 workflows, 10 HC contracts, Compass routing, module README, extensibility docs. Changed section: README.md, docs/agents.md, agent registry, roadmap.
- **Task 5 (Extensibility):** Incorporated into docs/agents.md Journey 6 walkthrough and _vortex/README.md "Adding a New Agent" section. Both reference agent-registry.js as single source of truth.
- **Task 6 (Verification):** `npm run lint` clean, `npm test` 199/199 pass. Grep verified all 7 agents in README.md, all 7 `##` headings in docs/agents.md, 32 workflow references in _vortex/README.md, v1.6.0 entry in CHANGELOG.md.
- **Scope compliance:** Only 4 documentation files touched. No JS code, workflow steps, agent definitions, or compass routes modified.

### Change Log

| Date | Change | Details |
|------|--------|---------|
| 2026-02-26 | Story Created | Created by create-story workflow with comprehensive analysis |
| 2026-02-26 | Party Mode Update | Expanded journey walkthrough format per user decision; placement in docs/agents.md confirmed; Journeys 6-7 flagged as capability demos not handoff chains |
| 2026-02-26 | Implementation Complete | All 6 tasks (27 subtasks) implemented and verified. Lint clean, 199/199 tests pass. |
| 2026-02-26 | Code Review (AI) | Fixed H1: 9 incorrect step counts in docs/agents.md (new agents claimed 6, actual 4-5). Fixed M1: removed "(current)" from roadmap to resolve badge vs roadmap inconsistency. Fixed M2: Empathy Map step count 5→6. Fixed M3: extensibility guidance "4-6 step files". Fixed L1: sprint-status.yaml added to File List. Fixed L2: "How It Fits" diagram rewritten for left-to-right readability (Isla→...→Noah forward flow, Max backflow, Emma context). |

### File List

| File | Action |
|------|--------|
| `README.md` | EDITED — 11 targeted edits updating to 7-agent content; review fix: roadmap wording |
| `docs/agents.md` | REWRITTEN — complete rewrite from ~180 to ~370 lines; review fix: 10 step counts corrected |
| `_bmad/bme/_vortex/README.md` | CREATED — new module inventory file; review fix: extensibility step range |
| `CHANGELOG.md` | EDITED — v1.6.0 entry added |
| `_bmad-output/implementation-artifacts/sprint-status.yaml` | EDITED — status transitions (backlog → ready-for-dev → in-progress → review → done) |
