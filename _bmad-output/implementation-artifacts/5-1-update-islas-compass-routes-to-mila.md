# Story 5.1: Update Isla's Compass Routes to Mila

Status: ready-for-dev

## Story

As a product discovery practitioner finishing Isla's discovery workflows,
I want the Compass routing to offer Mila as a destination when synthesis is appropriate,
so that I can flow naturally from divergent discovery to convergent problem definition.

## Acceptance Criteria

1. **Mila route added to all 3 Isla workflows** — Each of Isla's 3 workflow final steps (empathy-map, user-interview, user-discovery) includes a Compass route to Mila 🔬 `research-convergence` with HC1 contract reference
2. **HC1 trigger condition documented** — Each Mila route includes the trigger condition: evidence that discovery artifacts are ready for convergence/synthesis (HC1 contract)
3. **Three-way distinction present** — The Compass routing clearly distinguishes between: new problem space (→Emma), synthesize within known space (→Mila), quick experiment (→Wade)
4. **No regression on existing routes** — All existing Isla routes (Wade, Emma/Isla self-routing) remain functional after modification
5. **Compass routing reference updated** — The note in `compass-routing-reference.md` indicating Isla's step files need updating is removed or updated to reflect implementation
6. **Route references HC1 contract** — Each Mila route declares what Mila expects to receive (HC1 empathy artifacts) per FR21
7. **User override preserved** — Each Compass section retains the user override note per FR22
8. **Regression check** — `npm run lint` passes clean after all modifications

## Tasks / Subtasks

- [ ] **Task 1: Read and document current state of all 3 step files** (AC: #4, Retro Action Item: read-before-edit mandate)
  - [ ] 1.1 Read `_bmad/bme/_vortex/workflows/empathy-map/steps/step-06-synthesize.md` — document current Compass table (lines ~98-102)
  - [ ] 1.2 Read `_bmad/bme/_vortex/workflows/user-interview/steps/step-06-synthesize.md` — document current Compass table (lines ~162-166)
  - [ ] 1.3 Read `_bmad/bme/_vortex/workflows/user-discovery/steps/step-06-synthesize.md` — document current Compass table (lines ~150-154)
  - [ ] 1.4 Read `_bmad/bme/_vortex/compass-routing-reference.md` — confirm target state for Isla's section (lines ~189-197)
  - [ ] 1.5 Document current vs. target state in Dev Notes

- [ ] **Task 2: Update Isla's 3 workflow step files** (AC: #1, #2, #3, #6, #7)
  - [ ] 2.1 Update `empathy-map/steps/step-06-synthesize.md` Compass table — replace Emma row with Mila row per compass-routing-reference target state
  - [ ] 2.2 Update `user-interview/steps/step-06-synthesize.md` Compass table — replace Emma row with Mila row per compass-routing-reference target state
  - [ ] 2.3 Update `user-discovery/steps/step-06-synthesize.md` Compass table — replace Emma row with Mila row per compass-routing-reference target state
  - [ ] 2.4 Verify each Mila row references HC1 contract and declares trigger condition
  - [ ] 2.5 Verify user override note is present in each file (add if missing)

- [ ] **Task 3: Update compass-routing-reference.md** (AC: #5)
  - [ ] 3.1 Remove or update the "Note:" at line ~197 that says "Isla's existing step-06 files currently route to Emma/Wade/Isla. The Mila route (HC1) is added by Epic 5 Story 5.1 (FR30)"
  - [ ] 3.2 Verify Isla section target state matches what was implemented in the step files

- [ ] **Task 4: Verification** (AC: #4, #8)
  - [ ] 4.1 Run `npm run lint` to verify no regressions
  - [ ] 4.2 Verify all 3 updated Compass tables match compass-routing-reference.md target
  - [ ] 4.3 Verify no voice bleed (Isla's voice in her step files, no agent crossover)
  - [ ] 4.4 Verify existing routing guidance text around each Compass table is preserved

## Dev Notes

### CRITICAL: This is the first story modifying EXISTING files

Epic 4 retro team agreement: **Read-before-edit mandate** — document current state before making changes. Task 1 exists specifically for this purpose.

### Current State of Isla's Compass Tables (READ-BEFORE-EDIT)

**empathy-map/step-06-synthesize.md** (lines 98-102):
```
| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Pain points need validation | lean-experiment | Wade 🧪 | Test if pain points drive real behavior |
| New user segment discovered | lean-persona | Emma 🎯 | Re-contextualize for the new segment |
| Deeper understanding needed | user-interview | Isla 🔍 | Follow up with targeted interviews |
```

**user-interview/step-06-synthesize.md** (lines 162-166):
```
| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Insights suggest different problem | contextualize-scope | Emma 🎯 | Re-scope based on what users actually said |
| Riskiest insights identified | lean-experiment | Wade 🧪 | Test your riskiest insight with an experiment |
| Want to synthesize across users | empathy-map | Isla 🔍 | Map patterns across all interview subjects |
```

**user-discovery/step-06-synthesize.md** (lines 150-154):
```
| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Problem space needs reframing | contextualize-scope | Emma 🎯 | Re-scope based on discovery findings |
| Ready to test hypotheses | lean-experiment | Wade 🧪 | Design experiments from discovery insights |
| Need deeper empathy for key users | empathy-map | Isla 🔍 | Map the users you discovered in depth |
```

### Target State from compass-routing-reference.md (AUTHORITATIVE — P22)

The compass-routing-reference.md already documents the target state for Isla's routes. This document is authoritative (P22). The target state REPLACES the Emma row with a Mila row in each workflow:

**empathy-map target:**
```
| → Mila 🔬 `research-convergence` — Multiple artifacts ready for synthesis (HC1) |
| → Wade 🧪 `lean-experiment` — Pain points need behavioral validation |
| → Isla 🔍 `user-interview` — Deeper understanding needed |
```

**user-discovery target:**
```
| → Mila 🔬 `research-convergence` — Discovery findings ready for convergence (HC1) |
| → Wade 🧪 `lean-experiment` — Ready to test hypotheses from discovery |
| → Isla 🔍 `empathy-map` — Map key users discovered in depth |
```

**user-interview target:**
```
| → Mila 🔬 `research-convergence` — Interview insights ready for synthesis (HC1) |
| → Wade 🧪 `lean-experiment` — Riskiest insight ready for testing |
| → Isla 🔍 `empathy-map` — Synthesize patterns across interview subjects |
```

### Why Emma is REPLACED (not retained alongside Mila)

The compass-routing-reference.md (authoritative) shows 3 routes per workflow, with Mila replacing Emma. The architectural reasoning:

1. **Emma is still reachable** — through Max's HC8 routing, and through Mila's own routing (Mila → Emma when "problem space itself is wrong")
2. **Isla's Compass serves the immediate next step** — after discovery, the most natural next step for synthesis is Mila, not Emma
3. **The three-way distinction** (Mila/Emma/Wade) is documented at the routing-reference level and in Mila's own workflows, not in every individual Compass table
4. **3 rows per table is the established pattern** — all Vortex workflow Compass tables use 2-3 rows

### HC1 Contract Reference (What Mila Expects)

**Contract:** `_bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md`
**Flow:** Isla → Mila
**What Mila receives:** Empathy artifacts (maps, interviews, observations) with synthesized insights, key themes, pain points, desired gains
**Trigger condition:** Discovery research complete; one or more artifacts ready for convergence

### Compass Table Format (Must Match)

All Isla step files use the same 4-column Compass table format:
```
| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
```

The Mila row must follow this format. The "If you learned..." column is the trigger condition. The "Consider next..." column is the workflow name. The "Agent" column is the agent name with icon. The "Why" column is the evidence-based reasoning.

### Voice Consistency

Isla's step files are written in Isla's discovery-oriented voice. The Compass table entries are factual routing guidance — not agent-voiced content. No voice bleed risk in table rows themselves, but verify surrounding text remains in Isla's voice.

### User Override Note (FR22)

Each step-06-synthesize.md should have a note after the Compass table:
```
> Note: These are evidence-based recommendations. You can navigate to any Vortex agent at any time based on your judgment.
```

Verify this exists in each file. Add if missing.

### File-Touch Map (Retro Action Item)

**Files modified by Story 5.1:**
- `_bmad/bme/_vortex/workflows/empathy-map/steps/step-06-synthesize.md` — Compass table update
- `_bmad/bme/_vortex/workflows/user-interview/steps/step-06-synthesize.md` — Compass table update
- `_bmad/bme/_vortex/workflows/user-discovery/steps/step-06-synthesize.md` — Compass table update
- `_bmad/bme/_vortex/compass-routing-reference.md` — Remove/update implementation note

**Overlap with Story 5.2:** Story 5.2 modifies Wade's and Max's step files, NOT Isla's. No file overlap.

### Learnings from Epic 4 (Stories 4-2, 4-3, 4-4)

- Compass table format is strict — follow the exact 4-column format
- Each row must have a clear trigger condition in the "If you learned..." column
- Contract references (HC1) go in the "Why" column or trigger text
- All existing routing guidance text AROUND the Compass table must be preserved
- Verify changes match compass-routing-reference.md after implementation

### References

- [Source: _bmad/bme/_vortex/compass-routing-reference.md — Isla section lines 189-197]
- [Source: _bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md — HC1 schema]
- [Source: _bmad-output/planning-artifacts/epics.md — Epic 5, Story 5.1]
- [Source: _bmad-output/implementation-artifacts/epic-4-retro-2026-02-26.md — Team agreements]

## Dev Agent Record

### Agent Model Used

### Completion Notes List

### Change Log

### File List
