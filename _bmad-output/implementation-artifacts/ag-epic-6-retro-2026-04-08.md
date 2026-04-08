---
artifact_type: retrospective
initiative: convoke
created: 2026-04-08
schema_version: 1
status: active
---

# Epic 6 Retrospective — Operator Experience & Skill Wiring

**Date:** 2026-04-08
**Epic:** ag-epic-6 — Operator Experience & Skill Wiring
**Facilitator:** Bob (Scrum Master)
**Participants:** Amalik (Project Lead)

## Epic Summary

| Metric | Value |
|--------|-------|
| Stories completed | 6/6 (100%) |
| Total ACs satisfied | 62 |
| Tests added | ~80 (12 + 17 + 29 + 26 + 14) |
| Code reviews run | 6 |
| Reviews requiring patches | 5 (only Story 6.5 was clean first try) |
| Total review patches applied | ~25 |
| CI failures | 0 |
| Backlog items deferred | 15 (I17–I28 + 3 from Story 6.5) |
| Mid-epic architectural corrections | 1 (Story 6.4 namespace move) |

## Previous Retro Action Item Follow-Through

| # | Action Item (from Epic 5) | Status |
|---|---------------------------|--------|
| 1 | Maintain `convoke-check`-before-review discipline | ✅ Every story 6.2–6.6 ran convoke-check first; zero CI failures |
| 2 | Maintain story review + code review cycle | ✅ All 6 stories reviewed adversarially; 5 produced patches |
| 3 | Maintain push discipline | ✅ Zero force-pushes, zero broken main commits |

The three matured Epic 5 practices held under Epic 6's larger scope. Discipline scaled.

## Process Maturity Arc

| Epic | Stories | Patch Avg/Story | CI Failures | Key Change |
|------|---------|----------------|-------------|------------|
| 1 | 3 | — | — | Story review gate introduced |
| 2 | 3 | 3.0 | 0 | convoke-check built |
| 3 | 4 | 4.25 | 2 | Push timing fixed |
| 4 | 5 | 1.8 | 0 | Process stable |
| 5 | 3 | 0.67 | 0 | Process mature |
| **6** | **6** | **~4.2** | **0** | **Architectural correction tolerated mid-epic** |

The patch count regressed to Epic 3 levels — but this reflects 2× the stories, 4× the ACs, the first cross-cutting module wiring (touched refresh-installation, validator, doctor, manifest, package.json), and a mid-epic namespace correction. Patch count is a function of *surface area*, not regression. The reviewers also got sharper: every patch landed on a real load-bearing logic error, not stylistic noise.

## What Went Well

1. **Story 6.4's mid-flight architectural correction was caught and propagated cleanly.** When the misplaced `_bmad/bmm/4-implementation/bmad-migrate-artifacts/` location was discovered mid-implementation, the response was a 3-story chain: new `_bmad/bme/_artifacts/` submodule, `standalone: true` flag pattern, manifest correction, retroactive spec edit, *Story 6.5 spec updated pre-implementation*, then Story 6.6 closed the loop by wiring the new submodule into refresh-installation + validator. No half-corrections, no orphaned references.

2. **Code reviewers found load-bearing future-traps that tests couldn't.** Story 6.6's parallel review caught the validator/refresh contract gap on the `standalone: true` flag — adding any non-standalone workflow would have bricked `convoke-doctor` on the next install. Story 6.5's review caught the WIP radar sort-order inversion that would have recommended pausing the *freshest* initiative instead of the stalest. Story 6.4 caught a prototype-pollution vector in `loadResolutionMap`. None of these would have shipped because the parallel review layer found them.

3. **Convoke-check discipline matured into reflex.** Story 6.2 explicitly committed "always run `npm run check` before marking a story for review" after catching two latent integration test count regressions from Story 6.1. Stories 6.3–6.6 followed the rule without prompting. Zero CI failures across the entire epic, continuing the streak from Epic 5.

4. **Inference quality jumped on real metrics.** Story 6.2 dropped pure-ambiguous migration files from 31 → 6. Story 6.3 dropped unattributed portfolio files from 111 → 8 (71% → 5%). Both ACs hit cleanly first try; both numbers are measurable on the live repo.

5. **Cleanest review cycle in epic 6.5.** Zero AC violations from the Acceptance Auditor, only logic-review patches for the WIP radar inversion and empty-repo edge case. The pattern of writing the spec rigorously *and* running adversarial review caught what neither would alone.

## What Didn't Go Well

1. **Story 6.4's namespace placement was a planning failure.** The original spec called for `_bmad/bmm/4-implementation/bmad-migrate-artifacts/` — placing a Convoke-authored skill inside the BMAD upstream namespace, where future BMAD updates could conflict with it. This wasn't caught at story creation, only mid-implementation. The fix worked, but it cost: a new submodule, a retroactive spec edit, a Story 6.5 pre-implementation rewrite, and Story 6.6 had to be expanded to handle the new submodule's wiring. **Root cause: story creation didn't ask "whose namespace does this skill live in?"** Action item below.

2. **15 cross-cutting platform debt items got deferred.** Five of the deferred items (I17–I28 plus the 3 from Story 6.5) are *the same class of issue* shared between the Enhance and Artifacts modules: YAML comment preservation on version stamp, unguarded `acContent.version = version`, doctor doesn't validate skill wrappers, no orphan-skill cleanup loop, validator/refresh contract enforcement. Epic 6 made these visible by adding the second module that follows the Enhance pattern; it didn't create them. But they're real and they're not getting smaller. Action item below.

3. **Story 6.6 review revealed a future-trap that was inert until exercised.** The validator/refresh contract gap on `standalone: true` would have stayed dormant until someone added a non-standalone workflow to `_artifacts/config.yaml` — at which point `convoke-doctor` would silently fail. This is exactly the class of bug the parallel review layer is *for*, and it caught it. But it raises the question: how many similar latent contract gaps live in the other module pairs (Enhance, Gyre, team-factory)?

## Technical Debt

| # | Item | Priority | Source | Status |
|---|------|----------|--------|--------|
| 1 | Sequential I/O in `getCrossReferences` | Low | Epic 2 | Carried (5 epics) |
| 2 | `execSync` blocks event loop in `getContextClues` | Low | Epic 2 | Carried (5 epics) |
| 3 | YAML comment preservation on version stamp | Med | Epic 6 (cross-cut Enhance + Artifacts) | New — Epic 7 candidate |
| 4 | `acContent.version = version` unguarded against `undefined` | Med | Epic 6 (cross-cut) | New — Epic 7 candidate |
| 5 | `convoke-doctor` doesn't validate skill wrappers (only source tree) | Med | Epic 6 (cross-cut) | New — Epic 7 candidate |
| 6 | No orphan skill-wrapper cleanup loop | Med | Epic 6 (cross-cut) | New — Epic 7 candidate |
| 7 | Workflow-name namespace collision risk (verbatim names in `.claude/skills/`) | Low | Epic 6 (Artifacts only) | New — Epic 7 candidate |

The two long-carried Epic 2 items remain low-priority (`--verbose` mode only). The 5 new items are all platform-wide and warrant a single dedicated story rather than retrofitting into Artifacts alone.

## Action Items

1. **[High] Plan Epic 7 around the deferred cross-cutting platform debt.**
   - **Owner:** Amalik
   - **Scope:** Promote items I17–I28 and the 5 cross-cutting platform debt entries above (#3–#7) into a structured Epic 7 backlog. Group by surface (refresh-installation contract gaps, doctor validation gaps, skill-wrapper lifecycle, YAML safety) rather than by story-of-origin. Use `bmad-enhance-initiatives-backlog` to RICE-score them.
   - **Why now:** Five of the items are in the same code-path family (skill wrapper lifecycle across Enhance/Artifacts/team-factory). Fixing them in one PR is cheaper than retrofitting them piecemeal into the next feature epic.
   - **Acceptance:** Epic 7 stories created in `_bmad-output/planning-artifacts/` with explicit links back to the deferred-item IDs in this retro.

2. **[High] Add a "namespace audit" step to story creation for new skills/workflows.**
   - **Owner:** Story creation workflow (process change, not code)
   - **Trigger:** Any story that creates a new file under `_bmad/{module}/` or `.claude/skills/`
   - **Question to answer:** "Whose namespace does this artifact live in? Convoke (`_bmad/bme/`) or upstream BMAD (`_bmad/bmm/`, `_bmad/core/`, `_bmad/cis/`, etc.)?"
   - **Why:** Story 6.4 was the wake-up call. The fix worked but cost a 3-story propagation chain. A 30-second question at story creation would have prevented it.
   - **Acceptance:** Next time a skill-creation story is drafted, the spec contains a "Namespace decision" section with explicit rationale.

3. **[Med] Audit other module pairs for `standalone`-style contract gaps.**
   - **Owner:** Epic 7 (recommend folding into the platform debt epic)
   - **Scope:** Look for places where `refresh-installation.js` skips a workflow on a flag and the corresponding validator hard-checks the skipped artifact. Candidates: Enhance `target_agent` (does the validator require a menu patch even if the agent file is missing?), Gyre workflows (any flags gating refresh that the validator doesn't know about?), team-factory submodule wiring.
   - **Why:** Story 6.6's contract gap wasn't unique — it was caught because that's where we were looking. Other module pairs may have analogous latent gaps.
   - **Acceptance:** A single audit document listing every flag-gated refresh path and whether the validator respects the same gate.

## What Stays the Same

- **Parallel adversarial code review with 3 reviewers** (Blind Hunter, Edge Case Hunter, Acceptance Auditor) earns its cost. It found load-bearing logic errors in 5 of 6 stories that tests didn't catch. Continue.
- **`convoke-check`-before-review discipline.** Zero CI failures across 9 consecutive stories (Epics 5+6). Continue.
- **Spec rigor at story creation.** Story 6.6 had 16 ACs and 10 task groups; the implementation hit them cleanly because the spec was explicit about every decision the dev needed to make. Continue.
- **Story review gate.** Every story reviewed before merge. Continue.

## Initiative Status After Epic 6

The Artifact Governance & Portfolio initiative (I14 + P15) is **functionally complete**. All 6 epics done, 24 stories shipped (18 from Epics 1–5 + 6 from Epic 6). The migration pipeline, portfolio engine, platform integration, and operator experience layer are all in place. Loom Master is invocable. Both `bmad-migrate-artifacts` and `bmad-portfolio-status` skills ship via `convoke-update`.

**What remains** is the cross-cutting platform debt that Epic 6 surfaced. That's Epic 7's job, not Epic 6's failing.

## Closing Notes

Bob (Scrum Master): "This was the most ambitious epic yet — 2× the stories, 4× the ACs, and the first epic where we let an architectural correction land mid-flight without freezing the rest of the work. The patch count looks scary on paper, but every patch was real and every patch was caught before merge."

Charlie (Senior Dev): "The thing I'll remember from this epic is Story 6.6's contract gap. We had passing tests, passing code review on the dev side, a passing spec — and the parallel reviewer still found a load-bearing future-trap. That's what the review layer is for."

Alice (Product Owner): "And the 6.4 namespace correction. We caught it, fixed it, propagated it, and the next epic is going to start with a process change that prevents the same class of mistake. That's the loop working."

Amalik (Project Lead): Confirmed all three reads. Epic 7 will absorb the deferred debt.
