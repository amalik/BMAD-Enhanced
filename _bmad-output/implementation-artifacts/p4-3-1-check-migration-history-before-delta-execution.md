# Story 3.1: Check Migration History Before Delta Execution

Status: done

## Story

As a **Convoke maintainer running `convoke-update`**,
I want previously-applied migrations to be skipped automatically,
so that running the update command twice doesn't corrupt my installation by re-applying deltas.

## Acceptance Criteria

1. Given `runMigrations()` receives migrations from `registry.getMigrationsFor(fromVersion)`, when the runner is about to execute deltas, then it reads `migration_history` from `config.yaml` and filters out already-applied migrations
2. Given all migrations are already applied, then it logs "No new migrations to apply" and skips to the refresh step (refresh still runs)
3. Given a project where `convoke-update` has already run successfully, when `convoke-update` runs a second time with the same version, then no migration deltas are re-executed and the command completes successfully
4. Given a project with partial migration history (some deltas applied, some new), when `convoke-update` runs, then only unapplied deltas execute and previously-applied deltas are skipped with a log message
5. There is at least one test proving double-run safety: run migrations, then run again, assert no delta `apply()` functions are called the second time

## Tasks / Subtasks

- [x] Task 1: Add history filtering to `runMigrations()` (AC: #1, #2, #4)
  - [x] 1.1: AFTER the existing early-return (line 49), build `configPath` from `projectRoot + '/_bmad/bme/_vortex/config.yaml'`
  - [x] 1.2: Filter migrations using `registry.hasMigrationBeenApplied(m.name, configPath)` into a new `const unappliedMigrations` array — this function already exists in registry.js
  - [x] 1.3: Log skipped migrations (e.g., `chalk.yellow('Skipping already-applied: 1.4.x-to-1.5.0')`)
  - [x] 1.4: If `unappliedMigrations.length === 0`, log "No new migrations to apply" but do NOT return — let the flow continue to lock/backup/refresh/validate/history
  - [x] 1.5: Replace `migrations` with `unappliedMigrations` in the "Found N migration(s)" message and the delta execution loop ([2/5]) — all other steps (backup, refresh, validate, history) use their existing logic unchanged
- [x] Task 2: Add double-run safety test (AC: #3, #5)
  - [x] 2.1: In `tests/unit/migration-runner-orchestration.test.js`, add a test that runs `runMigrations('1.4.0')` twice on the same installation
  - [x] 2.2: After the second run, assert that no delta `apply()` functions were called (results filtered to exclude 'refresh-installation' is empty)
  - [x] 2.3: Assert the second run still completes successfully (`result.success === true`)
  - [x] 2.4: Assert the refresh step still runs on the second invocation
- [x] Task 3: Add partial history test (AC: #4)
  - [x] 3.1: Create a test where `config.yaml` has partial `migration_history` (only `1.3.x-to-1.5.0` applied)
  - [x] 3.2: Run migrations and assert pre-applied migration is skipped
  - [x] 3.3: Assert skipped deltas are filtered out of results
- [x] Task 4: Verify existing tests still pass (AC: all)
  - [x] 4.1: Run `npm test` — all 317 tests pass (was 315, +2 new)
  - [x] 4.2: No separate integration test suite configured

## Dev Notes

- **Key insight: `hasMigrationBeenApplied()` already exists** in `scripts/update/migrations/registry.js:116-136`. It reads `config.yaml`, parses `migration_history`, and checks if a migration name appears in any entry's `migrations_applied` array. DO NOT reimplement this.
- **Config path:** `_bmad/bme/_vortex/config.yaml` (same path used in `updateMigrationHistory()` at `migration-runner.js:256`)
- **Where to insert the check:** In `runMigrations()`, between line 44 (`const migrations = registry.getMigrationsFor(fromVersion)`) and line 46 (`if (migrations.length === 0)`). The filtering must happen before the "Found X migration(s)" log message.
- **Refresh must always run:** Even if all deltas are skipped, the refresh step (step [3/5]) must still execute. The refresh copies latest files from the package and is idempotent.
- **Design decision — "all skipped" path:** The existing early-return at line 46-48 fires when `getMigrationsFor()` returns zero migrations (version not in registry) and returns without refresh — that's correct for "no migrations exist." But when registry returns migrations that are ALL already applied, we still need refresh to run. **Solution:** Insert the history filter AFTER line 49 (after the early-return). Create a new `const unappliedMigrations = migrations.filter(...)`. Use `unappliedMigrations` for the "Found N" message, the delta loop, and the results — but keep the rest of the flow (lock, backup, refresh, validate, history) unchanged. If `unappliedMigrations.length === 0`, log "No new migrations to apply" but still proceed through the full flow (lock → backup → skip [2/5] → refresh → validate → history → cleanup).
- **Do NOT touch the early-return at line 46-48.** That path handles the legitimate "no migrations exist" case and is correct as-is.
- **Defense-in-depth context:** In production, `convoke-update.js` already prevents double-runs via version detection (`'up-to-date'` path returns before calling `runMigrations()`). The history check in `runMigrations()` is a safety net for: (a) direct `runMigrations()` calls, (b) partial failure recovery, (c) version detection bugs. Tests should call `runMigrations('1.4.1')` directly (bypassing version detection) to validate this layer independently.
- **Migration history structure** in `config.yaml`:
  ```yaml
  migration_history:
    - timestamp: "2026-03-07T..."
      from_version: "1.4.1"
      to_version: "2.0.0"
      migrations_applied:
        - "1.4.x-to-1.5.0"
        - "1.5.x-to-1.6.0"
  ```
- **Test helpers:** Use `createInstallation(tmpDir, version)` from `tests/helpers.js` to set up test installations. Use `silenceConsole()` / `restoreConsole()` from `tests/helpers.js` to suppress console output.
- **Test framework:** Node.js built-in test runner (`node:test`), assertions via `node:assert/strict`. No Jest, no Mocha.
- **Do NOT modify `registry.js`** — the `hasMigrationBeenApplied()` function is already correct. Only modify `migration-runner.js`.
- **Do NOT change the existing flow steps** ([1/5] through [5/5]) — the history check is a pre-filter that reduces the input to the existing loop.

### Current Flow (migration-runner.js `runMigrations()`)

```
1. Get applicable migrations from registry
2. Acquire lock
3. [1/5] Create backup
4. [2/5] Execute migration deltas (loop)
5. [3/5] Refresh installation
6. [4/5] Validate installation
7. [5/5] Update migration history
8. Cleanup + release lock
```

### Target Flow (after this story)

```
1. Get applicable migrations from registry
1b. If none exist → early return (existing, no refresh needed)
→ NEW: Filter out already-applied migrations → unappliedMigrations
→ NEW: Log skipped migrations
→ NEW: If unappliedMigrations empty, log "No new migrations to apply"
2. If dry run, preview and return
3. Acquire lock
4. [1/5] Create backup
5. [2/5] Execute unappliedMigrations (may be 0 iterations)
6. [3/5] Refresh installation (always runs)
7. [4/5] Validate installation
8. [5/5] Update migration history
9. Cleanup + release lock
```

### Project Structure Notes

- `scripts/update/lib/migration-runner.js` — main file to modify
- `scripts/update/migrations/registry.js` — has `hasMigrationBeenApplied()` (read-only)
- `scripts/update/lib/config-merger.js` — has `addMigrationHistory()` (read-only)
- `tests/unit/migration-runner-orchestration.test.js` — add new tests here
- `tests/helpers.js` — `createInstallation()`, `silenceConsole()`, `restoreConsole()`

### Previous Story Intelligence (Epics 1-2)

- Epic 1 retro: "Match process weight to risk level — logic changes need full gates"
- Epic 2 retro: "Verify task completion criteria literally before marking [x]"
- Epic 2 retro: "Keep commits scoped to their story"
- Test debt: `migration-runner.js` at 29% coverage — this story should improve it

### References

- [Source: _bmad-output/planning-artifacts/epics-top5.md — Story 3.1]
- [Source: _bmad-output/planning-artifacts/initiatives-backlog.md — Initiative U1 (score 3.2)]
- [Source: scripts/update/lib/migration-runner.js — `runMigrations()` function]
- [Source: scripts/update/migrations/registry.js — `hasMigrationBeenApplied()` function]
- [Source: tests/unit/migration-runner-orchestration.test.js — existing orchestration tests]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

### Completion Notes List

- All 5 acceptance criteria met
- History filtering inserted after early-return (line 51), preserving refresh path for "all skipped" case
- Used existing `hasMigrationBeenApplied()` from registry.js — no wheel reinvention
- Double-run test proves second invocation skips deltas but still runs refresh
- Partial history test proves selective filtering with pre-seeded migration_history
- 318 tests pass (315 existing + 3 new)
- Code review: fixed empty history write on double-run, renamed misleading test, added dry-run+history test

### File List

- `scripts/update/lib/migration-runner.js` — Added history filter block (lines 51-69), updated dry-run preview and delta loop to use `unappliedMigrations`, guarded history write against empty deltas
- `tests/unit/migration-runner-orchestration.test.js` — Added 3 test suites: "double-run safety", "partial history (selective filtering)", "dry-run respects history filter"
