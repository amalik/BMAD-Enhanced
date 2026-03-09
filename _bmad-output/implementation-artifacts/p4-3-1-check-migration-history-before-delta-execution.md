# Story 3.1: Check Migration History Before Delta Execution

Status: ready-for-dev

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

- [ ] Task 1: Add history filtering to `runMigrations()` (AC: #1, #2, #4)
  - [ ] 1.1: After `registry.getMigrationsFor(fromVersion)` returns (line 44), read `config.yaml` from `_bmad/bme/_vortex/config.yaml` and extract `migration_history`
  - [ ] 1.2: Use `registry.hasMigrationBeenApplied(name, configPath)` to filter the migrations array — this function already exists and checks `migration_history` entries
  - [ ] 1.3: If all migrations are already applied, log "No new migrations to apply", skip to refresh step (step [3/5]), then continue with validation and config update as normal
  - [ ] 1.4: If some migrations are filtered out, log which ones were skipped (e.g., "Skipping already-applied: 1.4.x-to-1.5.0")
  - [ ] 1.5: Pass only the unapplied migrations to the delta execution loop (step [2/5])
- [ ] Task 2: Add double-run safety test (AC: #3, #5)
  - [ ] 2.1: In `tests/unit/migration-runner-orchestration.test.js`, add a test that runs `runMigrations('1.4.1')` twice on the same installation
  - [ ] 2.2: After the second run, assert that no delta `apply()` functions were called (use a spy or check that `results` array contains only 'refresh-installation')
  - [ ] 2.3: Assert the second run still completes successfully (`result.success === true`)
  - [ ] 2.4: Assert the refresh step still runs on the second invocation
- [ ] Task 3: Add partial history test (AC: #4)
  - [ ] 3.1: Create a test where `config.yaml` has partial `migration_history` (e.g., only `1.4.x-to-1.5.0` applied)
  - [ ] 3.2: Run migrations and assert only unapplied deltas execute
  - [ ] 3.3: Assert skipped deltas are logged
- [ ] Task 4: Verify existing tests still pass (AC: all)
  - [ ] 4.1: Run `npm test` and confirm all 315+ tests pass
  - [ ] 4.2: Run `npm run test:integration` if available

## Dev Notes

- **Key insight: `hasMigrationBeenApplied()` already exists** in `scripts/update/migrations/registry.js:116-136`. It reads `config.yaml`, parses `migration_history`, and checks if a migration name appears in any entry's `migrations_applied` array. DO NOT reimplement this.
- **Config path:** `_bmad/bme/_vortex/config.yaml` (same path used in `updateMigrationHistory()` at `migration-runner.js:256`)
- **Where to insert the check:** In `runMigrations()`, between line 44 (`const migrations = registry.getMigrationsFor(fromVersion)`) and line 46 (`if (migrations.length === 0)`). The filtering must happen before the "Found X migration(s)" log message.
- **Refresh must always run:** Even if all deltas are skipped, the refresh step (step [3/5]) must still execute. The refresh copies latest files from the package and is idempotent.
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
→ NEW: Read config.yaml migration_history
→ NEW: Filter out already-applied migrations
→ NEW: If none remain, log + skip to refresh
2. Acquire lock
3. [1/5] Create backup
4. [2/5] Execute migration deltas (only unapplied)
5. [3/5] Refresh installation
6. [4/5] Validate installation
7. [5/5] Update migration history
8. Cleanup + release lock
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

### Debug Log References

### Completion Notes List

### File List
