# Story 1.1: Expand Agent Registry to 7 Agents

Status: done

## Story

As a framework maintainer,
I want the agent registry to contain all 7 Vortex agents with complete persona data ordered by stream number,
So that all downstream systems (validator, installer, manifest, tests) can reference the complete agent set.

## Acceptance Criteria

1. **AC1: AGENTS array contains 7 entries ordered by Vortex stream**
   - **Given** the agent registry file (`scripts/update/lib/agent-registry.js`)
   - **When** the AGENTS array is updated
   - **Then** it contains 7 entries ordered: Emma (1-Contextualize), Isla (2-Empathize), Mila (3-Synthesize), Liam (4-Hypothesize), Wade (5-Externalize), Noah (6-Sensitize), Max (7-Systematize)

2. **AC2: Each new agent entry has the correct shape**
   - **Given** the 3 new entries (Mila, Liam, Noah)
   - **When** added to the AGENTS array
   - **Then** each has fields: `id`, `name`, `icon`, `title`, `stream`, and nested `persona` object with `role`, `identity`, `communication_style`, `expertise`

3. **AC3: WORKFLOWS array contains 22 entries**
   - **Given** the WORKFLOWS array
   - **When** updated with 9 new workflows
   - **Then** it contains 22 entries (13 existing + 9 new) grouped by agent, ordered by stream number
   - **And** new workflows: research-convergence, pivot-resynthesis, pattern-mapping (Mila); hypothesis-engineering, assumption-mapping, experiment-design (Liam); signal-interpretation, behavior-analysis, production-monitoring (Noah)

4. **AC4: All derived lists reflect 7 agents**
   - **Given** the derived constants (`AGENT_FILES`, `AGENT_IDS`, `WORKFLOW_NAMES`, `USER_GUIDES`)
   - **When** computed from updated arrays
   - **Then** `AGENT_FILES` has 7 entries, `AGENT_IDS` has 7 entries, `WORKFLOW_NAMES` has 22 entries, `USER_GUIDES` has 7 entries

5. **AC5: Tests pass with updated expectations**
   - **Given** the test file `tests/unit/agent-registry.test.js`
   - **When** `npm test` runs
   - **Then** all tests pass with updated count assertions (7 agents, 22 workflows)

6. **AC6: Lint passes clean**
   - **Given** the modified files
   - **When** `npm run lint` runs
   - **Then** zero errors, zero new warnings

## Tasks / Subtasks

- [x] **Task 1: Add 3 new agent entries to AGENTS array** (AC: 1, 2)
  - [x] 1.1 Reorder existing entries by stream number: Emma(1), Isla(2), [new], [new], Wade(5), [new], Max(7)
  - [x] 1.2 Add Mila entry with id `research-convergence-specialist`, stream `Synthesize`, complete persona
  - [x] 1.3 Add Liam entry with id `hypothesis-engineer`, stream `Hypothesize`, complete persona
  - [x] 1.4 Add Noah entry with id `production-intelligence-specialist`, stream `Sensitize`, complete persona
- [x] **Task 2: Add 9 new workflow entries to WORKFLOWS array** (AC: 3)
  - [x] 2.1 Add 3 Mila workflows: research-convergence, pivot-resynthesis, pattern-mapping
  - [x] 2.2 Add 3 Liam workflows: hypothesis-engineering, assumption-mapping, experiment-design
  - [x] 2.3 Add 3 Noah workflows: signal-interpretation, behavior-analysis, production-monitoring
  - [x] 2.4 Reorder all WORKFLOWS grouped by agent in stream order
- [x] **Task 3: Update test expectations** (AC: 5)
  - [x] 3.1 Update `assert.equal(AGENTS.length, 4)` → `7` in `tests/unit/agent-registry.test.js` line 16
  - [x] 3.2 Update `assert.equal(WORKFLOWS.length, 13)` → `22` in `tests/unit/agent-registry.test.js` line 41
- [x] **Task 4: Run validation** (AC: 5, 6)
  - [x] 4.1 Run `npm test` — all 172 tests pass
  - [x] 4.2 Run `npm run lint` — zero errors

## Dev Notes

### Critical: This is the SINGLE SOURCE OF TRUTH

The agent registry (`agent-registry.js`) drives **7 downstream consumers** — ALL of them consume it dynamically via imports. Changing the registry automatically updates:

| Consumer | What it uses | Auto-updates? |
|----------|-------------|--------------|
| `validator.js` | `AGENT_FILES`, `AGENT_IDS`, `WORKFLOW_NAMES` | Yes — fully data-driven |
| `refresh-installation.js` | `AGENT_FILES`, `AGENT_IDS`, `WORKFLOW_NAMES`, `USER_GUIDES` | Yes — fully data-driven |
| `install-vortex-agents.js` | `AGENTS` (banner, manifest, verify) | Yes — iterates AGENTS |
| `bmad-doctor.js` | `AGENT_FILES`, `WORKFLOW_NAMES` | Yes — fully data-driven |
| `postinstall.js` | Uses registry | Yes |
| `index.js` | `AGENTS` (prints agent list) | Yes — iterates AGENTS |
| `tests/unit/agent-registry.test.js` | All 6 exports | **NO — has 2 hardcoded counts** |

**ONLY the test file needs manual count updates.** Everything else auto-adapts.

### Agent Entry Shape (exact structure to follow)

```javascript
{
  id: 'research-convergence-specialist',    // kebab-case, matches .md filename
  name: 'Mila',                             // First name only
  icon: '🔬',                               // Unique emoji per agent
  title: 'Research Convergence Specialist',  // Title Case
  stream: 'Synthesize',                      // Vortex stream name
  persona: {
    role: '...',                             // 1-line role summary
    identity: '...',                         // Multi-sentence background
    communication_style: '...',              // How the agent communicates
    expertise: '...'                         // Multi-line bullet expertise list
  }
}
```

### Stream Order (Architecture D3 — MANDATORY)

The AGENTS array MUST be ordered by Vortex stream number:

| Position | Stream # | Agent | ID |
|----------|----------|-------|----|
| 0 | 1 | Emma | contextualization-expert |
| 1 | 2 | Isla | discovery-empathy-expert |
| 2 | 3 | Mila | research-convergence-specialist |
| 3 | 4 | Liam | hypothesis-engineer |
| 4 | 5 | Wade | lean-experiments-specialist |
| 5 | 6 | Noah | production-intelligence-specialist |
| 6 | 7 | Max | learning-decision-expert |

### Workflow Names (Architecture D1 — MANDATORY)

| Agent | Workflows |
|-------|-----------|
| Mila | research-convergence, pivot-resynthesis, pattern-mapping |
| Liam | hypothesis-engineering, assumption-mapping, experiment-design |
| Noah | signal-interpretation, behavior-analysis, production-monitoring |

### Agent Persona Design Guidelines

Each new agent persona must be:
- **Distinct** from all other agents — no overlapping communication styles
- **Consistent** with the Vortex stream's purpose
- **Specific enough** for LLM behavior consistency across step transitions (NFR15)
- **Aligned with PRD** agent descriptions:
  - **Mila** — Converges divergent research into actionable problem definitions. JTBD framing, Pains & Gains. Warm but analytically precise.
  - **Liam** — Creative peer who ideates alongside the user, not a facilitator. Structured brainwriting, 4-field hypothesis contracts. Energetic, challenges assumptions.
  - **Noah** — Intelligence analyst who interprets signals through context. Signal + context + trend format. Calm, observational, explicitly does NOT make strategic recommendations (that's Max's job).

### What NOT to Change

- `validator.js` — fully data-driven, no changes needed
- `config-merger.js` — agents/workflows injected from registry dynamically (description string update is Story 1.2 scope)
- `refresh-installation.js` — fully data-driven
- `install-vortex-agents.js` — iterates AGENTS, no changes needed
- `bmad-doctor.js` — fully data-driven
- Agent `.md` files — that's Story 2.1/3.1/4.1 (persona stories)
- Workflow directories — that's Stories 2.2-2.4, 3.2-3.4, 4.2-4.4
- User guide files — that's Stories 2.5, 3.5, 4.5

### Project Structure Notes

- Registry file: `scripts/update/lib/agent-registry.js`
- Test file: `tests/unit/agent-registry.test.js`
- Test helper: `tests/helpers.js`, `tests/unit/validator.test.js` (fixtures updated for 7 agents)
- 3 placeholder agent `.md` files created (Mila, Liam, Noah) for `refreshInstallation` compatibility
- 9 placeholder workflow directories with `workflow.md` stubs for validator compatibility
- All file paths are relative to project root

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.1]
- [Source: _bmad-output/planning-artifacts/architecture.md — Decision D1 (Workflow Naming), D3 (Registry Expansion)]
- [Source: _bmad-output/planning-artifacts/prd.md — FR35 (Registry contains 7 agents)]
- [Source: scripts/update/lib/agent-registry.js — Current AGENTS/WORKFLOWS arrays]
- [Source: tests/unit/agent-registry.test.js — Lines 16, 41 (hardcoded counts)]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

### Completion Notes List

- All 6 ACs met: 7 agents ordered by stream, correct entry shape, 22 workflows, derived lists auto-computed, 172 tests pass, lint clean
- Created placeholder `.md` files for 3 new agents (Mila, Liam, Noah) so `refreshInstallation` and validator work end-to-end
- Created placeholder workflow directories (9 new) with `workflow.md` stubs
- Updated `tests/helpers.js` `createValidInstallation()` to dynamically use `AGENT_IDS` from registry instead of hardcoded 4 agents
- Updated `tests/unit/validator.test.js` to use registry-driven agent lists in test fixtures

### Change Log
- 2026-02-23: Story created by create-story workflow. Status: ready-for-dev.
- 2026-02-23: Implementation complete. All tasks done. Status: review.

### File List
- `scripts/update/lib/agent-registry.js` — Added 3 agents (Mila, Liam, Noah), 9 workflows, reordered by stream
- `tests/unit/agent-registry.test.js` — Updated count assertions: 4→7 agents, 13→22 workflows
- `tests/helpers.js` — Updated `createValidInstallation()` to use registry-driven agent list
- `tests/unit/validator.test.js` — Updated test fixtures to use registry-driven agent/manifest data
- `_bmad/bme/_vortex/agents/research-convergence-specialist.md` — Placeholder for Mila
- `_bmad/bme/_vortex/agents/hypothesis-engineer.md` — Placeholder for Liam
- `_bmad/bme/_vortex/agents/production-intelligence-specialist.md` — Placeholder for Noah
- `_bmad/bme/_vortex/workflows/{research-convergence,pivot-resynthesis,pattern-mapping}/workflow.md` — Mila workflow placeholders
- `_bmad/bme/_vortex/workflows/{hypothesis-engineering,assumption-mapping,experiment-design}/workflow.md` — Liam workflow placeholders
- `_bmad/bme/_vortex/workflows/{signal-interpretation,behavior-analysis,production-monitoring}/workflow.md` — Noah workflow placeholders
