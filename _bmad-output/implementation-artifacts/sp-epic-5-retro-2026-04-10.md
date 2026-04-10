# Retrospective — SP Epic 5: Tier 2 Export & Platform Adapters

**Date:** 2026-04-10
**Epic:** sp-epic-5 (Skill Portability & Distribution Initiative, Epic 5 — final)
**Stories:** sp-5-1, sp-5-2, sp-5-3 (3/3 done)
**Facilitator:** Bob (Scrum Master)
**Implementation:** Amelia (dev agent)
**Code review:** parallel adversarial layers (Blind Hunter, Edge Case Hunter, Acceptance Auditor)

---

## Epic outcome

**Result:** Full Tier 1 + Tier 2 export pipeline complete. 49 skills exportable with adapters for 3 platforms. Initiative done.

| Metric | Value |
|---|---|
| Stories shipped | 3 / 3 |
| ACs satisfied | 27 / 27 (9 + 9 + 9) |
| Tests added | 15 (6 + 5 + 4) — total portability suite now 86 |
| Files created | 4 (generate-adapters, test-constants, 2 test files) |
| Files modified | 7 (export-engine, convoke-export, readme-template, seed-catalog-repo, validate-exports, catalog test, CLI test) |
| Code-review patches applied | 3 for sp-5-1, 0 for sp-5-2, 0 for sp-5-3 |
| Spec-review patches applied | 3 for sp-5-1, 1 for sp-5-2, 2 for sp-5-3 |
| Pre-existing test regressions | 0 |

---

## Epic 4 retro action item follow-through

| # | Action | Status | Evidence |
|---|---|---|---|
| A1 | **CRITICAL:** Extract FORBIDDEN_STRINGS to shared module | ✅ Done | Extracted to `scripts/portability/test-constants.js` before Epic 5 started. All 5 consumers updated. Catalog test upgraded from 8→17 entries. |
| A2 | Specs must include path-safety analysis for user-provided cleanup paths | ✅ Applied | Saved to memory. No new path-safety issues in Epic 5 (no user-provided cleanup paths). |
| A3 | Carry forward deferred items | ⏳ Open | `--quiet` flag, manifest dupes, CRLF, basename collision — all still deferred, none triggered |

**Score: 2/3 applied.** The critical A1 (FORBIDDEN_STRINGS) was closed before Epic 5 started — first time a retro debt item was proactively addressed rather than growing.

---

## What went well

### 1. Last two stories had zero code-review patches — consecutive clean passes

sp-5-2 and sp-5-3 both passed code review with zero patches. This is a first for the initiative. Contributing factors:
- The adapter module (sp-5-2) was genuinely simple — 3 adapters, ~80 lines, no edge cases
- sp-5-3 was pure integration — widened a filter, added one function call, added 3 verification checks
- The spec reviews caught the issues before dev (C1 double-brace in sp-5-1, C1 Test 1 filter in sp-5-3)

### 2. Spec review continued to catch critical issues early

- **sp-5-1 C1:** `{{double-brace}}` placeholders would have been stripped by Phase 6's catch-all. Caught in spec review → `skipPhase6` option designed before dev started.
- **sp-5-1 C2:** `--all` behavior change would have broken sp-2-3 Test 6. Caught in spec review → test update documented in the story.
- **sp-5-2 M2:** Seed script missing `generateAdapters()` call. Caught in spec review → flagged for sp-5-3.
- **sp-5-3 C1:** sp-4-1 Test 1 filter would fail after tier expansion. Caught in spec review → update documented.

### 3. FORBIDDEN_STRINGS extraction (A1) was the right pre-Epic-5 action

Done between retro and first story. Immediately paid off: the catalog-generator test went from 8 to 17 entries, closing a real coverage gap. No more "which copy has how many entries" confusion.

### 4. Progressive complexity worked across the whole initiative

Each epic built cleanly on the prior:
- Epic 1: classify → Epic 2: export engine → Epic 3: catalog + README → Epic 4: seed + validate → Epic 5: Tier 2 + adapters
- No epic required rework of prior epics' code (only additive changes — relaxed tier checks, added adapter calls)

---

## What didn't go well

### 1. The `[your context](none found)` false-positive in sp-5-3 was a latent interaction bug

Engine Phase 6 creates `[your context]` from `{variable}`. When followed by `(none found)` in the source text, this becomes a valid markdown link pattern `[text](url)` that the validator flags as broken. Neither the engine nor the validator is wrong individually — the bug only surfaces when they interact on Tier 2 skills with conditional blocks. Fixed with a space-in-target heuristic, but this class of interaction bug is hard to predict.

### 2. Process consistency across initiatives is a real concern

**User feedback:** "We cannot keep the same level of best practices compliance through different initiatives. We strongly need to uniform our processes to gain in consistency."

This is the most important insight from the initiative. Looking at the evidence:

**What drifted across initiatives:**
- **Test constant duplication:** FORBIDDEN_STRINGS started as 1 copy (sp-2-1), grew to 6 copies before extraction. Each initiative's dev agent independently duplicated the list instead of importing.
- **Hardcoded counts in tests:** Appeared in sp-2-4 (44), sp-4-1 (44), sp-5-3 (49). Each time caught in review, but the pattern kept recurring because the dev agent defaults to hardcoded values.
- **Error handling patterns:** `rmSync` cleanup of user paths was unsafe in sp-4-1 (caught in review), but the lesson wasn't encoded as a reusable constraint — just a memory note.
- **Phase 6 catch-all side effects:** Created problems in sp-3-2 (placeholder cleanup), sp-5-1 (double-brace stripping), sp-5-3 (false-positive links). Each was fixed independently without a systemic resolution.

**What stayed consistent:**
- Story-review-before-dispatch cadence (every story across all 5 epics)
- Adversarial 3-layer code review (every story)
- CommonJS convention, no new dependencies, `findProjectRoot()` pattern
- Out-of-scope sections preventing scope creep

**The gap:** best practices that are documented in retro action items or memory notes are applied inconsistently because each dev session starts fresh. The dev agent doesn't read prior retros. Lessons learned in one initiative evaporate by the next.

### 3. The `--quiet` flag has been deferred through 4 retros

Epic 2 A3 → Epic 3 A2 → Epic 4 A3 → Epic 5 carry-forward. Still 400+ warnings in batch mode. Not blocking, but the persistent deferral suggests it's not painful enough to fix but annoying enough to keep flagging. Should either be done or formally dropped.

---

## Action items (post-initiative)

| # | Action | Owner | When |
|---|---|---|---|
| **A1** | **CRITICAL — Process uniformity:** Create a `project-context.md` or `CONVENTIONS.md` file that encodes the reusable constraints discovered across this initiative: (1) derive test counts from source data, never hardcode, (2) cleanup of user-provided paths requires `dirCreatedByUs` guard, (3) shared test constants go in `test-constants.js`, (4) Phase 6 catch-all produces `[your context]` which can create false markdown links — validators must skip space-containing link targets, (5) spec review must verify referenced file existence for AC canonical sets. This file should be loaded by both the story-creation and dev-story workflows so the dev agent inherits the constraints. | Amalik + story author | Next initiative |
| **A2** | **Decide on `--quiet`:** Either implement it in a debt sprint or formally drop it from the backlog. Four retros is enough — make a call. | Amalik | Next sprint planning |
| **A3** | Carry forward: manifest dupes (Epic 2 A2), CRLF writeManifest (Epic 1 A6), basename collision (Epic 1 A7) — all still open, none triggered in 14 stories | deferred | as needed |

---

## Key lessons (initiative-level)

1. **Process consistency requires encoded constraints, not just retro notes.** Lessons in retro action items are read by the facilitator but not by the dev agent. To close the loop, constraints must live in a file the dev agent loads (project-context.md or equivalent).
2. **Spec review is the highest-leverage process step in the entire initiative.** It caught fixture mismatches (Sophia→Winston), tier-check side effects (Test 6 breakage), Phase 6 double-brace stripping, seed script adapter gap, and test filter regressions. None of these would have been caught by code review alone.
3. **Adversarial code review had a 100% signal rate on HIGH-severity findings.** Every HIGH finding across 14 stories was either a real bug or a verified false alarm. Zero noise at the HIGH level.
4. **Progressive complexity is the right approach for platform initiatives.** Each epic added one capability layer without reworking prior layers. The engine (sp-2-2) was written once and extended twice (sp-2-4 Strategy 5, sp-5-1 template inlining) — never rewritten.
5. **Stub-then-polish works.** README stubs in sp-2-3, polished in sp-3-2. Platform instructions in sp-3-2, adapter-based in sp-5-2. Each iteration improved the artifact without starting over.
6. **Clean reviews are possible and indicate maturity.** The last 2 stories had zero patches — the spec review + accumulated patterns produced correct code on the first pass.

---

## Initiative final scorecard

| Metric | Value |
|---|---|
| Epics | 5 / 5 |
| Stories | 14 / 14 |
| Acceptance Criteria | 152 / 152 |
| Tests | 86 |
| Code-review patches | 34 total (decreasing trend: 16→4→1→7→3) |
| Spec-review patches | 28 total |
| Clean code reviews | 2 (sp-5-2, sp-5-3) |
| Exportable skills | 49 (44 standalone + 5 light-deps) |
| Platform adapters | 3 (Claude Code, Copilot, Cursor) |
| Retros | 5 |
| Pre-existing test regressions | 0 across all 14 stories |

**The Skill Portability & Distribution Initiative is complete.**
