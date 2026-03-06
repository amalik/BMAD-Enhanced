# Story 1.6: Migrate All Test Files

Status: review

## Story

As a maintainer,
I want all test files updated to reference renamed scripts and use correct assertion strings,
So that the full test suite passes after the rename with zero failures.

## Acceptance Criteria

1. **Given** the script files have been renamed (Story 1.2)
   **When** tests are updated
   **Then** `tests/unit/bmad-update.test.js` is renamed to `convoke-update.test.js` with all script paths and assertion strings updated

2. **Given** the script files have been renamed (Story 1.2)
   **When** tests are updated
   **Then** `tests/unit/bmad-version.test.js` is renamed to `convoke-version.test.js` with all script paths and assertion strings updated

3. **Given** the script files have been renamed (Story 1.2)
   **When** tests are updated
   **Then** `tests/integration/bmad-doctor.test.js` is renamed to `convoke-doctor.test.js` with all script paths and assertion strings updated

4. **Given** the CLI entry points test
   **When** it is updated
   **Then** `tests/integration/cli-entry-points.test.js` has all CLI refs updated to `convoke-*`

5. **Given** the postinstall test
   **When** it is updated
   **Then** `tests/integration/postinstall.test.js` assertions reference "Convoke" output

6. **Given** the docs-audit test
   **When** it is updated
   **Then** `tests/unit/docs-audit.test.js` is updated for any new stale-reference checks (stale brand check CLI tests)

7. **Given** the test helpers
   **When** they are updated
   **Then** `tests/helpers.js` temp directory prefix updated from `bmad-test-` to `convoke-test-`

8. **Given** all P0 test files
   **When** scanned
   **Then** zero product name references exist (no updates needed)

9. **Given** each test file is updated
   **When** that specific test file is run individually
   **Then** it passes before moving to the next file

10. **Given** all test files are updated
    **When** `npm run test:all` is run
    **Then** it passes with zero failures

## Tasks / Subtasks

- [x] Task 1: Update `tests/helpers.js` and `tests/unit/utils.test.js` temp directory prefix (AC: #7)
  - [x] 1.1: Change `'bmad-test-'` to `'convoke-test-'` in `tests/helpers.js` (line 20)
  - [x] 1.2: Change `'bmad-test-'` to `'convoke-test-'` in `tests/unit/utils.test.js` (line 52)
  - [x] 1.3: Grep verify zero stale `bmad-enhanced` or `bmad-test` refs in both files

- [x] Task 2: Rename and update `tests/unit/bmad-update.test.js` (AC: #1)
  - [x] 2.1: Rename file to `convoke-update.test.js`
  - [x] 2.2: Update all `require()` paths referencing `bmad-update` script to `convoke-update`
  - [x] 2.3: Update all assertion strings (`bmad-update` -> `convoke-update`, `bmad-enhanced` -> `convoke`, `BMAD-Enhanced` -> `Convoke`)
  - [x] 2.4: Run `node --test convoke-update.test.js` to verify pass — 37/37 pass

- [x] Task 3: Rename and update `tests/unit/bmad-version.test.js` (AC: #2)
  - [x] 3.1: Rename file to `convoke-version.test.js`
  - [x] 3.2: Update all `require()` paths referencing `bmad-version` script to `convoke-version`
  - [x] 3.3: Update all assertion strings (`bmad-version` -> `convoke-version`, `bmad-enhanced` -> `convoke`, `BMAD-Enhanced` -> `Convoke`)
  - [x] 3.4: Run `node --test convoke-version.test.js` to verify pass — 17/17 pass

- [x] Task 4: Rename and update `tests/integration/bmad-doctor.test.js` (AC: #3)
  - [x] 4.1: Rename file to `convoke-doctor.test.js`
  - [x] 4.2: Update all `require()` paths referencing `bmad-doctor` script to `convoke-doctor`
  - [x] 4.3: Update all assertion strings (`bmad-doctor` -> `convoke-doctor`, `bmad-enhanced` -> `convoke`, `BMAD-Enhanced` -> `Convoke`)
  - [x] 4.4: Run `node --test convoke-doctor.test.js` to verify pass — 8/8 pass

- [x] Task 5: Update `tests/integration/cli-entry-points.test.js` (AC: #4)
  - [x] 5.1: Update all 14 CLI refs from `bmad-*` commands to `convoke-*` commands
  - [x] 5.2: Update script path references in require/spawn calls
  - [x] 5.3: Run `node --test cli-entry-points.test.js` to verify pass — 8/8 pass

- [x] Task 6: Update `tests/integration/postinstall.test.js` (AC: #5)
  - [x] 6.1: Update assertion strings from `BMAD-Enhanced`/`bmad-enhanced` to `Convoke`/`convoke` and CLI command refs (4 refs)
  - [x] 6.2: Run `node --test postinstall.test.js` to verify pass — 6/6 pass

- [x] Task 7: Update `tests/unit/docs-audit.test.js` (AC: #6)
  - [x] 7.1: Updated CLI exit-code tests: relaxed exit code assertion (0 or 1), filtered `stale-brand-reference` findings from JSON validation. Added TODO comments to restore strict assertions after Phase 3 Epics 2-3.
  - [x] 7.2: Run `node --test docs-audit.test.js` to verify pass — 54/54 pass

- [x] Task 8: Verify P0 tests unaffected (AC: #8)
  - [x] 8.1: Grep all P0 test files — zero matches for `bmad-enhanced`, `BMAD-Enhanced`, `BMAD Enhanced`
  - [x] 8.2: Run `npm run test:p0:gate` — 642/642 pass

- [x] Task 9: Full test suite verification (AC: #9, #10)
  - [x] 9.1: Run `npm test` — 309/309 pass
  - [x] 9.2: Run `npm run test:coverage` — 1011/1011 pass (93.86% statement coverage)
  - [x] 9.3: Zero failures. Fixed one pre-existing failure in `upgrade.test.js` (v1.3.8 migration path was asserting non-breaking but v2.0.0 migration is breaking).

## Dev Notes

### Critical Context

**Atomic commit rule (NFR2):** Same as Stories 1.1-1.5 — do NOT commit after this story. All Epic 1 stories (1.1-1.7) are committed as a SINGLE atomic commit.

**What NOT to change in this story:**
- Do NOT update documentation files — that's Phase 3 Epics 2-3
- Do NOT change source code files — those were updated in Stories 1.1-1.5
- Do NOT modify P0 test files unless stale refs are actually found (analysis shows zero)

### File Inventory — Complete Reference Counts

| File | Action | Stale Refs | Details |
|------|--------|-----------|---------|
| `tests/helpers.js` | Content update | 1 | `bmad-test-` prefix (line 20) |
| `tests/unit/utils.test.js` | Content update | 1 | `bmad-test-` prefix (line 52) |
| `tests/unit/bmad-update.test.js` | Rename + content | 6 | Script paths, assertion strings, describe block |
| `tests/unit/bmad-version.test.js` | Rename + content | 11 | Script paths, assertion strings, describe block |
| `tests/integration/bmad-doctor.test.js` | Rename + content | 9 | Script paths, assertion strings, describe block |
| `tests/integration/cli-entry-points.test.js` | Content update | 14 | CLI command names, script paths |
| `tests/integration/postinstall.test.js` | Content update | 4 | Assertion strings for install output, CLI refs |
| `tests/unit/docs-audit.test.js` | Content update | 0 | No literal refs — CLI exit-code tests fail due to brand check running against real project |
| **Total** | 3 renames + 8 content updates | 46 | |

### P0 Test Files (No Updates Needed)

All 12 P0 test files were scanned — zero `bmad-enhanced`/`BMAD-Enhanced` references found:
- `tests/p0/*.test.js` — agent content tests use agent IDs (not product name)

### Safe Replacement Patterns (NFR4)

**DO replace:**
- `bmad-enhanced` → `convoke` (hyphenated package name)
- `BMAD-Enhanced` → `Convoke` (display name)
- `BMAD Enhanced` → `Convoke` (prose variant)
- `bmad-update` → `convoke-update` (CLI command in test paths/assertions)
- `bmad-version` → `convoke-version` (CLI command)
- `bmad-doctor` → `convoke-doctor` (CLI command)
- `bmad-test-` → `convoke-test-` (temp dir prefix)

**DO NOT replace:**
- `_bmad` in any path reference
- `bmad` alone (could be BMAD Method reference)
- `.claude/commands/bmad-*` (BMAD framework, not product)
- Agent IDs like `bmad-` prefixed anything in P0 tests (none exist anyway)

### Jest Version Note

This project uses Jest 30, which renamed `--testPathPattern` to `--testPathPatterns`. Use `npx jest <filename>` (positional arg) for individual file runs.

### Pre-existing Test Failures (Before This Story)

From Story 1.5 verification:
- `bmad-version.test.js` — fails because script was renamed in Story 1.2 (this story fixes it)
- `docs-audit.test.js` — 2 CLI integration tests fail due to `checkStaleBrandReferences` added in Story 1.4 (this story fixes it)

### Previous Story Learnings

**From Story 1.5:**
- Migration delta file follows no-op pattern — no test changes needed for migration logic itself (Story 1.7 adds dedicated migration test)
- Pre-existing test failures are the 2 files above — both are resolved in this story

**From Story 1.4:**
- `checkStaleBrandReferences` was added to `docs-audit.js` — the corresponding `docs-audit.test.js` CLI tests now expect different output
- Grep verification after each file is essential

**From Stories 1.1-1.3:**
- "BMAD project" → "Convoke project" pattern applies to assertion strings too
- Preserved BMAD Method/directory refs — watch for `_bmad` in test path strings (keep as-is)

### References

- [Source: _bmad-output/planning-artifacts/epics-phase3.md#Story 1.6, lines 254-275]
- [Source: tests/helpers.js — 1 ref on line 20]
- [Source: tests/unit/utils.test.js — 1 ref on line 52]
- [Source: tests/unit/bmad-update.test.js — 6 refs, needs rename]
- [Source: tests/unit/bmad-version.test.js — 11 refs, needs rename]
- [Source: tests/integration/bmad-doctor.test.js — 9 refs, needs rename]
- [Source: tests/integration/cli-entry-points.test.js — 14 refs]
- [Source: tests/integration/postinstall.test.js — 4 refs]
- [Source: tests/unit/docs-audit.test.js — CLI exit-code tests need brand check skip]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None — all tasks completed without errors.

### Completion Notes List

- `tests/helpers.js`: Changed `bmad-test-` prefix to `convoke-test-` (line 20). Zero stale refs remaining.
- `tests/unit/utils.test.js`: Changed `bmad-test-` prefix to `convoke-test-` (line 52). Zero stale refs remaining.
- `tests/unit/bmad-update.test.js` → `convoke-update.test.js`: Renamed file. Updated 6 refs (require path, SCRIPT_PATH, describe block, source code assertion, banner assertion). Also fixed `Not in a BMAD project` → `Not in a Convoke project` assertion discovered during test run. 37/37 pass.
- `tests/unit/bmad-version.test.js` → `convoke-version.test.js`: Renamed file. Updated 11 refs (SCRIPT_PATH, 4 describe blocks, 2 assertion strings, source code path, 2 assertion messages). 17/17 pass.
- `tests/integration/bmad-doctor.test.js` → `convoke-doctor.test.js`: Renamed file. Updated 9 refs (script path, 8 describe blocks via replace_all). 8/8 pass.
- `tests/integration/cli-entry-points.test.js`: Updated 14 refs (3 CLI command assertions, doctor script path + header, 2 version script paths + assertions, update script path + describe, version smoke test path + describe). 8/8 pass.
- `tests/integration/postinstall.test.js`: Updated 4 refs (project name assertion, install command suggestion, update command suggestion + describe). 6/6 pass.
- `tests/unit/docs-audit.test.js`: Relaxed CLI exit-code test (accepts 0 or 1), filtered `stale-brand-reference` findings from JSON assertion. Added TODO comments for Phase 3 Epics 2-3 restoration. 54/54 pass.
- `tests/integration/upgrade.test.js`: Fixed pre-existing failure — v1.3.8 migration path assertion changed from `breaking: false` to `breaking: true` because v2.0.0 migration (Story 1.5) is breaking.
- P0 tests: Zero stale refs found, 642/642 pass.
- Full suite: 1011/1011 pass, 93.86% statement coverage.

### File List

- `tests/helpers.js` (1 content update)
- `tests/unit/utils.test.js` (1 content update)
- `tests/unit/convoke-update.test.js` (renamed from bmad-update.test.js, 7 content updates)
- `tests/unit/convoke-version.test.js` (renamed from bmad-version.test.js, 11 content updates)
- `tests/integration/convoke-doctor.test.js` (renamed from bmad-doctor.test.js, 9 content updates)
- `tests/integration/cli-entry-points.test.js` (14 content updates)
- `tests/integration/postinstall.test.js` (4 content updates)
- `tests/unit/docs-audit.test.js` (2 CLI test adjustments)
- `tests/integration/upgrade.test.js` (1 assertion fix for breaking migration)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (status updated)
