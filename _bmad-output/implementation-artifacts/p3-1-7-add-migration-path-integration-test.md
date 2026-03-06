# Story 1.7: Add Migration Path Integration Test

Status: done

## Story

As a maintainer,
I want an integration test that validates the upgrade path from bmad-enhanced 1.7.x to Convoke 2.0.0,
So that I have confidence the migration system correctly handles the breaking rename for existing users.

## Acceptance Criteria

1. **Given** a simulated project at version 1.7.x
   **When** the migration system is invoked
   **Then** the `1.7.x-to-2.0.0` migration entry is detected and flagged as applicable

2. **Given** a simulated project at version 1.7.x
   **When** the migration is examined
   **Then** it is identified as a breaking change with correct metadata (name, fromVersion, breaking: true)

3. **Given** the migration's `preview()` method
   **When** called
   **Then** it returns expected change descriptions (product rename, CLI renames, _bmad/ preservation)

4. **Given** the migration's `apply()` method
   **When** called with a valid project root
   **Then** it executes without errors and returns a result array

5. **Given** a simulated project at version 1.7.x with existing `_bmad/` structure
   **When** the full migration path is exercised (via `assessUpdate` or `convoke-update --dry-run`)
   **Then** the existing `_bmad/` directory structure is preserved (FR8)
   **And** the migration is flagged as breaking in the upgrade assessment

6. **Given** each test
   **When** run individually
   **Then** it passes before moving to the next

7. **Given** all tests are complete
   **When** `npm run test:all` is run
   **Then** it passes with zero failures

## Tasks / Subtasks

- [x] Task 1: Create migration delta unit tests (AC: #1, #2, #3, #4)
  - [x] 1.1: Create `tests/unit/1.7.x-to-2.0.0.test.js` following the pattern in `1.5.x-to-1.6.0.test.js`
  - [x] 1.2: Test module shape — exports `name`, `fromVersion`, `breaking`, `preview`, `apply`
  - [x] 1.3: Test `preview()` — returns actions array mentioning product rename, CLI commands, _bmad/ preservation
  - [x] 1.4: Test `apply()` — executes on a temp dir with valid installation, returns result array, no errors
  - [x] 1.5: Test `apply()` idempotency — running twice produces same result (no-op delta, so trivial)
  - [x] 1.6: Run `node --test tests/unit/1.7.x-to-2.0.0.test.js` to verify pass — 4/4 pass

- [x] Task 2: Add v1.7.x upgrade path tests to `tests/integration/upgrade.test.js` (AC: #1, #2, #5)
  - [x] 2.1: Add `describe('Upgrade from v1.7.x (simulated)')` block following v1.4.x pattern
  - [x] 2.2: Test version detection — `versionDetector.getCurrentVersion()` returns `'1.7.1'`
  - [x] 2.3: Test migration lookup — `registry.getMigrationsFor('1.7.1')` finds `1.7.x-to-2.0.0` with `breaking: true`
  - [x] 2.4: Test `refreshInstallation` preserves `_bmad/` structure and user preferences
  - [x] 2.5: Test config version updated to current package version after refresh
  - [x] 2.6: Test breaking changes — `registry.getBreakingChanges('1.7.1')` returns the rename description
  - [x] 2.7: Run `node --test tests/integration/upgrade.test.js` to verify pass — 29/29 pass

- [x] Task 3: Add CLI-level migration test (AC: #5)
  - [x] 3.1: In `convoke-update.test.js`, add test that `assessUpdate` returns `action: 'upgrade'` with breaking migration for v1.7.1 installation
  - [x] 3.2: Add test that `--dry-run` from a v1.7.1 installation shows `BREAKING CHANGES` and `DRY RUN`
  - [x] 3.3: Run `node --test tests/unit/convoke-update.test.js` to verify pass — 39/39 pass

- [x] Task 4: Full test suite verification (AC: #6, #7)
  - [x] 4.1: Run `npm test` — 315/315 pass
  - [x] 4.2: Run `npm run test:coverage` — 315/315 pass, 93.9% statements (1.7.x-to-2.0.0.js at 100%)

## Dev Notes

### Critical Context

**Atomic commit rule (NFR2):** Same as Stories 1.1-1.6 — do NOT commit after this story. All Epic 1 stories (1.1-1.7) are committed as a SINGLE atomic commit.

**What NOT to change in this story:**
- Do NOT update documentation files — that's Phase 3 Epics 2-3
- Do NOT change source code files — those were updated in Stories 1.1-1.5
- Do NOT change existing test assertions — those were updated in Story 1.6

### Test File Patterns to Follow

**Unit test for migration delta** — follow `tests/unit/1.5.x-to-1.6.0.test.js`:
- Import migration module directly: `require('../../scripts/update/migrations/1.7.x-to-2.0.0')`
- Test module shape (name, fromVersion, breaking, preview, apply)
- Test `preview()` returns meaningful actions array
- Test `apply()` on a temp dir — for this no-op delta, just verify it returns an array without errors
- Test idempotency — call `apply()` twice, verify no errors

**Integration upgrade test** — follow `tests/integration/upgrade.test.js` (v1.4.x block, lines 226-300):
- Create temp dir with `fs.mkdtemp(path.join(os.tmpdir(), 'bmad-upgrade-1.7-'))`
- Simulate v1.7.x installation: `_bmad/bme/_vortex/` with valid config at version `1.7.1`, 7 agents, 22 workflows
- Use `versionDetector.getCurrentVersion()`, `registry.getMigrationsFor()`, `registry.getBreakingChanges()`
- Use `refreshInstallation()` to verify file preservation

**CLI-level test** — follow `tests/unit/convoke-update.test.js` (v1.0.x breaking test, line 497):
- Use `createInstallation(tmpDir, '1.7.1')` helper then `assessUpdate(tmpDir)` to verify upgrade detection
- Use `runScriptWithInput(SCRIPT_PATH, [], 'n\n', { cwd: tmpDir })` to verify breaking changes display

### Migration Delta File (Story 1.5)

The `1.7.x-to-2.0.0.js` delta is a **no-op** — `apply()` returns a single-element array, `preview()` returns 5 descriptive actions. Key assertions:
- `migration.name === '1.7.x-to-2.0.0'`
- `migration.fromVersion === '1.7.x'`
- `migration.breaking === true`
- `preview().actions.length >= 3` (avoid exact count — use minimum threshold like `1.5.x-to-1.6.0.test.js` pattern)
- `preview().actions` mentions "BMAD-Enhanced" or "Convoke", CLI rename, "_bmad/" preservation
- `apply(projectRoot)` returns an array (single element: no-op message)

### Registry Behavior for v1.7.x

`getMigrationsFor('1.7.1')` returns exactly 1 migration: `1.7.x-to-2.0.0`.
`getBreakingChanges('1.7.1')` returns exactly 1 description string.
`matchesVersionRange('1.7.1', '1.7.x')` returns `true`.

### v1.7.x Installation Structure

A realistic v1.7.x installation has:
- 7 agents: `contextualization-expert`, `lean-experiments-specialist`, `discovery-empathy-expert`, `learning-decision-expert`, `research-convergence-specialist`, `hypothesis-engineer`, `production-intelligence-specialist`
- 22 workflows (all current workflows)
- Config with `version: '1.7.1'`, full `submodule_name`, `description`, `module`, `output_folder` fields

Use `createInstallation(tmpDir, '1.7.1')` helper (from `tests/helpers.js`) which calls `refreshInstallation` then overrides the version — this produces a valid installation with all current files at version 1.7.1.

### Test Runner Note

This project uses `node:test` module (NOT Jest). Run individual files with `node --test <file>`. Run full suite with `npm test` or `npm run test:coverage`.

### Previous Story Learnings

**From Story 1.6:**
- `upgrade.test.js` already has a test at line 133 that validates the v1.3.8 migration path is breaking (due to the 2.0.0 migration). The v1.7.x tests will be a NEW describe block, not modifying existing tests.
- The `createInstallation` helper is the cleanest way to set up a versioned installation.
- `assessUpdate` from `convoke-update.js` is the CLI-level entry point — it returns `{ action, migrations, breakingChanges }`.
- The breaking changes display test pattern: `runScriptWithInput(SCRIPT_PATH, [], 'n\n', ...)` then assert `stdout.includes('BREAKING CHANGES')`.

**From Story 1.5:**
- The migration delta file is a pure no-op — `apply()` just returns a message. No filesystem changes to verify beyond "it didn't crash."
- `preview()` is the more interesting function — it returns the 5-action list describing the rename.

### References

- [Source: _bmad-output/planning-artifacts/epics-phase3.md#Story 1.7, lines 277-295]
- [Source: scripts/update/migrations/1.7.x-to-2.0.0.js — no-op delta, 31 lines]
- [Source: scripts/update/migrations/registry.js — entry at line 65-70]
- [Source: tests/unit/1.5.x-to-1.6.0.test.js — migration delta test pattern]
- [Source: tests/integration/upgrade.test.js — upgrade simulation pattern (v1.4.x block, lines 226-300)]
- [Source: tests/unit/convoke-update.test.js — assessUpdate + CLI breaking changes tests]
- [Source: tests/helpers.js — createInstallation helper, line 119-128]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None — all tests passed on first run.

### Completion Notes List

- Task 1: Created `tests/unit/1.7.x-to-2.0.0.test.js` with 4 tests (module shape, preview, apply, idempotency). All pass.
- Task 2: Added 7 tests to `tests/integration/upgrade.test.js` in new `Upgrade from v1.7.x (simulated)` describe block. Total 29/29 pass.
- Task 3: Added 2 tests to `tests/unit/convoke-update.test.js` for CLI-level v1.7.x migration path (assessUpdate + breaking changes display). Total 39/39 pass.
- Task 4: Full suite `npm test` 315/315 pass. Coverage 93.9% statements, `1.7.x-to-2.0.0.js` at 100%.
- No source code changes — this story is test-only as specified.

### File List

- `tests/unit/1.7.x-to-2.0.0.test.js` — NEW (64 lines, 4 tests)
- `tests/integration/upgrade.test.js` — MODIFIED (added v1.7.x describe block, ~80 lines, 7 tests)
- `tests/unit/convoke-update.test.js` — MODIFIED (added 2 tests for v1.7.x migration path)
