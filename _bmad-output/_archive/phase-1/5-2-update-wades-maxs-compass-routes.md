# Story 5.2: Update Wade's & Max's Compass Routes

Status: done

## Story

As a product discovery practitioner using Wade's experiment or Max's decision workflows,
I want Compass routing to include Noah and Mila where appropriate,
so that the complete 7-agent routing network is active across all Vortex streams.

## Acceptance Criteria

1. **Noah route added to lean-experiment** — Wade's lean-experiment final step includes a Compass route to Noah `signal-interpretation` with HC4 contract reference for graduated experiments
2. **Mila replaces Emma in pivot-patch-persevere Pivot row** — Max's Pivot decision routes to Mila `pivot-resynthesis` (HC6, FR32) instead of Emma `contextualize-scope`
3. **HC7 reference added to Persevere row** — Max's Persevere row in pivot-patch-persevere references HC7 (Max→Isla evidence gap routing)
4. **HC8 reference added to learning-card Emma row** — Max's learning-card Emma row references HC8 (Max→Emma recontextualization)
5. **FR22 user override note added** — All 6 step files with Compass tables receive the FR22 user override note (currently missing from all)
6. **No regression on existing routes** — All existing Wade and Max routes that are not being replaced remain functional with their original wording (FR33, Story 5.1 L1 learning)
7. **Compass routing reference updated** — Both Wade and Max implementation-pending notes removed, v1.0.3 version history entry added
8. **Regression check** — `npm run lint` passes clean after all modifications

## Tasks / Subtasks

- [x] **Task 1: Read and document current state of all files** (AC: #6, Retro: read-before-edit mandate)
  - [x] 1.1 Read `lean-experiment/steps/step-06.md` — document current Compass table
  - [x] 1.2 Read `proof-of-concept/steps/step-06.md` — document current Compass table
  - [x] 1.3 Read `proof-of-value/steps/step-06.md` — document current Compass table
  - [x] 1.4 Read `mvp/steps/step-06-synthesize.md` — document current Compass table
  - [x] 1.5 Read `learning-card/steps/step-06-synthesize.md` — document current Compass table
  - [x] 1.6 Read `pivot-patch-persevere/steps/step-06-action-plan.md` — document current Compass table
  - [x] 1.7 Confirm `vortex-navigation` has no Compass table (no changes needed)
  - [x] 1.8 Read compass-routing-reference.md Wade and Max sections — confirm target state

- [x] **Task 2: Update lean-experiment** (AC: #1, #5, #6)
  - [x] 2.1 Replace Emma row with Noah `signal-interpretation` row (HC4)
  - [x] 2.2 Preserve Max and Isla rows with original wording (no scope creep per 5.1 L1)
  - [x] 2.3 Add FR22 user override note (two-line wrapped format)

- [x] **Task 3: Update pivot-patch-persevere** (AC: #2, #3, #5, #6)
  - [x] 3.1 Replace Emma Pivot row with Mila `pivot-resynthesis` row (HC6, FR32)
  - [x] 3.2 Add HC7 reference to Isla Persevere row
  - [x] 3.3 Preserve Wade Patch row with original wording
  - [x] 3.4 Add FR22 user override note (two-line wrapped format)

- [x] **Task 4: Add FR22 note + HC8 to remaining 4 files** (AC: #4, #5, #6)
  - [x] 4.1 Add FR22 user override note to `proof-of-concept/steps/step-06.md` — DO NOT change any route wording
  - [x] 4.2 Add FR22 user override note to `proof-of-value/steps/step-06.md` — DO NOT change any route wording
  - [x] 4.3 Add FR22 user override note to `mvp/steps/step-06-synthesize.md` — DO NOT change any route wording
  - [x] 4.4 Add FR22 user override note to `learning-card/steps/step-06-synthesize.md` — DO NOT change any route wording EXCEPT add HC8 reference to Emma row
  - [x] 4.5 Verify HC8 reference added correctly to learning-card Emma row

- [x] **Task 5: Update compass-routing-reference.md** (AC: #7)
  - [x] 5.1 Remove Wade section implementation-pending note (line ~222)
  - [x] 5.2 Remove Max section implementation-pending note (line ~242)
  - [x] 5.3 Add v1.0.3 version history entry

- [x] **Task 6: Verification** (AC: #6, #8)
  - [x] 6.1 Run `npm run lint` to verify no regressions
  - [x] 6.2 Run `npm test` to verify all 199 tests pass
  - [x] 6.3 Verify lean-experiment and PPP Compass tables match compass-routing-reference.md target
  - [x] 6.4 Verify no wording changes on retained rows (5.1 L1 discipline)
  - [x] 6.5 Verify FR22 note present in all 6 files, two-line wrapped format
  - [x] 6.6 Verify existing routing guidance text around each Compass table is preserved

## Dev Notes

### CRITICAL: Read-before-edit mandate (Retro Action Item)

Epic 4 retro team agreement: document current state before making changes. Task 1 is mandatory.

### Current State of Wade's Compass Tables (READ-BEFORE-EDIT)

**lean-experiment/step-06.md:**
```
| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Experiment complete | learning-card | Max 🧭 | Capture validated learning before it fades |
| Results challenge assumptions | contextualize-scope | Emma 🎯 | Re-evaluate your problem space framing |
| User behavior surprising | empathy-map | Isla 🔍 | Understand why users behaved unexpectedly |
```

**proof-of-concept/step-06.md:**
```
| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Technically feasible | proof-of-value | Wade 🧪 | Now validate the business case |
| Feasibility uncertain | lean-experiment | Wade 🧪 | Run a focused technical experiment |
| Results available | learning-card | Max 🧭 | Document technical learnings |
```

**proof-of-value/step-06.md:**
```
| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Business value validated | learning-card | Max 🧭 | Capture the evidence for stakeholders |
| Value unclear, need user data | user-interview | Isla 🔍 | Understand willingness to pay |
| Pivot needed | pivot-patch-persevere | Max 🧭 | Make a structured pivot decision |
```

**mvp/step-06-synthesize.md:**
```
| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| MVP designed, ready to run | lean-experiment | Wade 🧪 | Execute the Build-Measure-Learn cycle |
| Unsure about user needs | user-interview | Isla 🔍 | Validate user need before building |
| MVP results available | learning-card | Max 🧭 | Capture what you learned from the MVP |
```

### Current State of Max's Compass Tables (READ-BEFORE-EDIT)

**learning-card/step-06-synthesize.md:**
```
| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Learning triggers strategic decision | pivot-patch-persevere | Max 🧭 | Decide: pivot, patch, or persevere |
| Need more data | lean-experiment | Wade 🧪 | Run follow-up experiments |
| Assumptions invalidated | contextualize-scope | Emma 🎯 | Re-frame the problem based on evidence |
```

**pivot-patch-persevere/step-06-action-plan.md:**
```
| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Pivoting — new direction | contextualize-scope | Emma 🎯 | Re-contextualize for the pivot |
| Patching — adjust approach | lean-experiment | Wade 🧪 | Test the adjusted approach |
| Persevering — need deeper insight | user-discovery | Isla 🔍 | Strengthen your understanding of users |
```

**vortex-navigation/step-06-navigation-plan.md:** No Compass table — this IS the terminal navigation tool. No changes needed.

### Target State from compass-routing-reference.md (AUTHORITATIVE — P22)

**lean-experiment target (line 217):**
```
| → Max 🧭 `learning-card` — Experiment complete, capture learning |
| → Noah 📡 `signal-interpretation` — Experiment graduated, monitor production (HC4) |
| → Isla 🔍 `empathy-map` — User behavior surprising, investigate |
```
Delta: Emma row REPLACED by Noah row (HC4). Max and Isla rows kept.

**pivot-patch-persevere target (line 239):**
```
| → Mila 🔬 `pivot-resynthesis` — **Pivot:** problem correct, solution wrong (HC6) |
| → Wade 🧪 `lean-experiment` — **Patch:** adjust approach and re-test |
| → Isla 🔍 `user-discovery` — **Persevere** but need deeper insight (HC7) |
```
Delta: Emma Pivot row REPLACED by Mila (HC6). Persevere gets HC7. Patch row kept.

**learning-card target (line 238):** Same 3 route targets — add HC8 to Emma row only.

**proof-of-concept, proof-of-value, mvp targets:** Same 3 route targets — FR22 note only.

### Scope-Creep Prevention (Story 5.1 L1 Learning)

Story 5.1 code review REJECTED wording changes on rows whose routing target was unchanged. **Rule: only modify a row if its route target or contract reference changes.** This means:
- lean-experiment: only modify the Emma→Noah row. Keep Max and Isla rows exactly as-is.
- pivot-patch-persevere: modify Pivot (Emma→Mila HC6) and Persevere (add HC7). Keep Patch row exactly as-is.
- learning-card: only add (HC8) to Emma row's Why column. Keep Max and Wade rows exactly as-is.
- proof-of-concept, proof-of-value, mvp: NO row modifications at all. Only add FR22 note.

### HC Contract References

**HC4** (Wade→Noah): `_bmad/bme/_vortex/contracts/hc4-experiment-context.md`
- Flow: Wade → Noah
- What Noah receives: Graduated experiment context (results, success criteria, metrics, confirmed/rejected hypotheses, production readiness)
- Trigger: Experiment graduated to production; results and baselines captured
- Only applies to lean-experiment (not PoC/PoV/MVP)

**HC6** (Max→Mila): Routing contract defined in compass-routing-reference.md line 116
- Flow: Max → Mila
- Trigger: Max's PPP decides "pivot" — problem correct, solution direction failed
- What Mila receives: Original Isla artifacts + new evidence from failed experiments

**HC7** (Max→Isla): Routing contract defined in compass-routing-reference.md line 117
- Flow: Max → Isla
- Trigger: Max identifies critical evidence gap needing discovery research
- What Isla receives: Specific questions to investigate + context

**HC8** (Max→Emma): Routing contract defined in compass-routing-reference.md line 118
- Flow: Max → Emma
- Trigger: Max determines fundamental problem space needs recontextualization
- Already in learning-card but missing contract reference

### File-Touch Map (Retro Action Item)

**Files modified by Story 5.2:**
- `_bmad/bme/_vortex/workflows/lean-experiment/steps/step-06.md` — Route change (Emma→Noah HC4) + FR22 note
- `_bmad/bme/_vortex/workflows/pivot-patch-persevere/steps/step-06-action-plan.md` — Route change (Emma→Mila HC6, add HC7) + FR22 note
- `_bmad/bme/_vortex/workflows/proof-of-concept/steps/step-06.md` — FR22 note only
- `_bmad/bme/_vortex/workflows/proof-of-value/steps/step-06.md` — FR22 note only
- `_bmad/bme/_vortex/workflows/mvp/steps/step-06-synthesize.md` — FR22 note only
- `_bmad/bme/_vortex/workflows/learning-card/steps/step-06-synthesize.md` — HC8 reference + FR22 note
- `_bmad/bme/_vortex/compass-routing-reference.md` — Remove 2 implementation notes + v1.0.3

**Overlap with Story 5.1:** Story 5.1 modified Isla's step files and compass-routing-reference.md. Only compass-routing-reference.md overlaps — different sections (Isla section already done, Wade/Max sections remain).
**Overlap with Story 5.3:** Story 5.3 updates documentation files. No file overlap with 5.2's workflow step files.

### Epics.md AC vs compass-routing-reference.md

The epics.md AC mentions "Liam to revise hypothesis" for Wade and "Noah for more signal data" for Max — but the compass-routing-reference.md (P22 authoritative) shows NO Liam route from Wade and NO Noah route from Max. These AC items describe the vortex-navigation gap analysis capability (FR23), not literal Compass table rows. compass-routing-reference.md is authoritative.

### FR22 Note Format (Established Pattern)

Two-line wrapped blockquote, matching other Wave 3 step files:
```
> **Note:** These are evidence-based recommendations. You can navigate to any Vortex agent
> at any time based on your judgment.
```

### References

- [Source: _bmad/bme/_vortex/compass-routing-reference.md — Wade section lines 213-224, Max section lines 234-244]
- [Source: _bmad/bme/_vortex/contracts/hc4-experiment-context.md — HC4 schema]
- [Source: _bmad/bme/_vortex/compass-routing-reference.md lines 116-118 — HC6, HC7, HC8 definitions]
- [Source: _bmad-output/planning-artifacts/epics.md — Epic 5, Story 5.2]
- [Source: _bmad-output/implementation-artifacts/5-1-update-islas-compass-routes-to-mila.md — Story 5.1 learnings]
- [Source: _bmad-output/implementation-artifacts/epic-4-retro-2026-02-26.md — Team agreements]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Completion Notes List

- Task 1: Read all 7 files + compass-routing-reference.md Wade/Max sections. All current states matched Dev Notes snapshots exactly.
- Task 2: lean-experiment — replaced Emma `contextualize-scope` row with Noah `signal-interpretation` (HC4). Max and Isla rows preserved with original wording. FR22 note added.
- Task 3: pivot-patch-persevere — replaced Emma Pivot row with Mila `pivot-resynthesis` (HC6). Added (HC7) to Isla Persevere row Why column. Wade Patch row preserved with original wording. FR22 note added.
- Task 4: Added FR22 two-line wrapped note to proof-of-concept, proof-of-value, mvp, and learning-card. No row wording changes on first 3 files. Added (HC8) to learning-card Emma row Why column only.
- Task 5: Removed Wade implementation-pending note (was line 222) and Max implementation-pending note (was line 242) from compass-routing-reference.md. Added v1.0.3 version history entry.
- Task 6: All verifications passed — lint clean, 199/199 tests pass, Compass tables match reference targets, no retained row wording changes, FR22 present in all 6 files.

### Change Log

- 2026-02-26: Implemented Story 5.2 — Updated Wade's and Max's Compass routes across 7 files. Added Noah HC4 route, Mila HC6 Pivot route, HC7/HC8 references, FR22 notes. Removed 2 implementation-pending notes from compass-routing-reference.md.
- 2026-02-26: Code review (0H, 0M, 3L) — all 3 LOWs auto-fixed: tightened Noah row wording to match reference (L1/L2), aligned Mila row Why with HC6 contract language (L3).

### Senior Developer Review (AI)

**Review Date:** 2026-02-26
**Review Outcome:** Approve (with 3 LOW auto-fixes)
**Findings:** 0 HIGH, 0 MEDIUM, 3 LOW (all resolved)

**Action Items:**
- [x] L1: Removed "and establish baselines" from lean-experiment Noah row Why — aligned with reference "monitor production (HC4)"
- [x] L2: Removed "to production" from lean-experiment Noah row trigger — aligned with reference "Experiment graduated"
- [x] L3: Changed PPP Mila row Why from "Re-synthesize with evidence from failed approach" to "Re-synthesize pains and gains for new direction" — aligned with HC6 contract language

**Post-fix verification:** Lint clean, 199/199 tests pass.

### File List

- `_bmad/bme/_vortex/workflows/lean-experiment/steps/step-06.md` — Route change (Emma→Noah HC4) + FR22 note
- `_bmad/bme/_vortex/workflows/pivot-patch-persevere/steps/step-06-action-plan.md` — Route change (Emma→Mila HC6, add HC7) + FR22 note
- `_bmad/bme/_vortex/workflows/proof-of-concept/steps/step-06.md` — FR22 note only
- `_bmad/bme/_vortex/workflows/proof-of-value/steps/step-06.md` — FR22 note only
- `_bmad/bme/_vortex/workflows/mvp/steps/step-06-synthesize.md` — FR22 note only
- `_bmad/bme/_vortex/workflows/learning-card/steps/step-06-synthesize.md` — HC8 reference + FR22 note
- `_bmad/bme/_vortex/compass-routing-reference.md` — Remove 2 implementation notes + v1.0.3
