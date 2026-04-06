# Epic 2 Retrospective: Migration Inference & Planning

**Date:** 2026-04-06
**Epic:** ag-epic-2 — Migration Inference & Planning
**Facilitator:** Bob (Scrum Master)
**Participants:** Amalik (Project Lead), Winston (Architect), Amelia (Dev), Quinn (QA)

## Epic Summary

| Metric | Value |
|--------|-------|
| Stories completed | 3/3 (100%) |
| Tests added | 102 (38 + 36 + 28) |
| Total tests passing | 167 |
| Code reviews | 2 full adversarial + 1 re-review |
| Review findings resolved | 15 (9 + 6) |
| New files | 5 |
| Modified files | 4 |
| Security fixes | 2 (shell injection, path traversal) |
| Blockers | 0 |

## Previous Retro Action Item Follow-Through

| # | Action Item (from Epic 1) | Status | Impact |
|---|---------------------------|--------|--------|
| 1 | All stories get review before dev | ✅ Completed | HIGH — caught critical design flaws in all 3 stories (mapping error in 2-2, scope creep + wrong bin pattern + missing NFR22 in 2-3) |
| 2 | Calibrate code review depth | ✅ Completed | Full 3-layer for ag-2-2 and ag-2-3 (complex), lighter touch for ag-2-1 (pure functions + tests) |

## What Went Well

1. **Story review gate delivered massive value** — caught critical design flaws in every story. The governance-state-to-action mapping error (half-governed -> INJECT_ONLY was wrong for old-convention files like `prd-gyre.md`) would have been a fundamental logic bug. Story 2-3 review caught scope creep into Epic 3, wrong bin pattern, missing NFR22, and taxonomy bootstrap alias error.

2. **Adversarial code review caught real security issues** — shell injection via `execSync` string interpolation (ag-2-2, High severity) and path traversal via `--include ../../../etc` (ag-2-3, Med severity). Both found and fixed before merge.

3. **Previous retro commitments both completed and both paid off** — the retro process itself is working as a continuous improvement mechanism.

4. **Test discipline strong** — 102 new tests, zero regressions, all 15 code review findings resolved. NFR17 (100% inference rule coverage) achieved.

5. **Inference engine more robust than specced** — 5-step initiative lookup vs architecture's 3-step spec. Handles all known filename patterns including HC-prefixed, aliased, and suffix-position initiatives.

## What Didn't Go Well

1. **GitHub Actions failed twice due to lint errors** — code was correct and tests passed locally, but linter wasn't run before push. This also happened in prior releases with test failures (tests 18, 20, 22) and coverage drops.

2. **Root cause: local dev verifies a subset, CI verifies everything** — the dev-story workflow runs `npx jest tests/lib/` but CI runs lint + all test suites (unit, p0, integration) + coverage. The gap between local and CI verification causes all CI surprises.

## Root Causes

- No local equivalent of the CI pipeline exists. The dev agent runs lib tests and archive regression, but never runs lint, the full test suite, or coverage checks.
- This is a process gap, not a quality problem — the code is correct, the verification step runs too late.

## Action Items

| # | Action Item | Owner | Apply From | Status |
|---|-------------|-------|------------|--------|
| 1 | **Create `convoke-check` script** — mirrors CI locally: lint + all test suites + coverage. Single command. | Amelia (Dev) | Before Epic 3 | Committed |
| 2 | **Add `convoke-check` to dev-story step 9** — run full CI-equivalent before marking review. Closes local/CI gap permanently. | Bob (SM) | Epic 3 onwards | Committed |
| 3 | **Continue story review gate** — review before dev, no exceptions. | Bob + Amalik | Ongoing | Continuing |
| 4 | **Continue calibrated code review depth** — full 3-layer adversarial for all Epic 3 stories (git operations, security-sensitive). | Bob | Epic 3 | Committed |

## Technical Debt

| # | Item | Priority | Source |
|---|------|----------|--------|
| 1 | Sequential I/O in `getCrossReferences` | Low | Deferred from ag-2-2 review |
| 2 | `execSync` blocks event loop in `getContextClues` | Low | Deferred from ag-2-2 review |
| 3 | `ensureCleanTree` uses `execSync` with string interpolation | Med | Pre-existing, same class as shell injection fixed in ag-2-2 |

## Critical Path (Before Epic 3)

| # | Item | Owner |
|---|------|-------|
| 1 | Build and test `convoke-check` script | Amelia (Dev) |
| 2 | Fix `ensureCleanTree` shell injection (debt item 3) | Amelia (Dev) |
| 3 | Verify all CI suites pass locally via `convoke-check` | Quinn (QA) |

## Epic 3 Preview: Migration Execution & Safety

**4 stories:** Transactional renames (git mv + rollback), frontmatter injection + link updating, interactive flow + recovery, ADR supersession.

**Dependencies on Epic 2:**
- `generateManifest()` output feeds into rename execution
- `buildManifestEntry` action classification determines rename vs inject vs skip
- `ensureCleanTree()` is pre-flight guard before execution
- `injectFrontmatter()` + `buildSchemaFields()` from Epic 1 power commit 2

**No significant discoveries invalidating Epic 3 plan.** Architecture is sound, foundations are solid.

**New testing pattern needed:** Integration tests with real temp git repos for `git mv` + rollback cycles.

## Readiness Assessment

| Area | Status |
|------|--------|
| Testing & Quality | 167 tests, 2 code reviews, zero regressions |
| Deployment | N/A — internal infrastructure |
| Technical Health | Stable, clean architecture |
| Unresolved Blockers | None |
| Critical Path | 3 items before Epic 3 start |
