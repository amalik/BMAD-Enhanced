# Story 3.1: Transactional Rename Execution (Commit 1)

Status: done

## Story

As a Convoke operator,
I want all artifact renames to execute as a single atomic git commit,
so that my repository is never left in a partial rename state and git history is fully preserved.

## Acceptance Criteria

1. **Given** the operator has reviewed the dry-run manifest and confirmed via interactive prompt (or --force), **When** the migration executes the rename phase, **Then** `ensureCleanTree()` verifies no tracked diffs AND no untracked files in scope directories before proceeding
2. All renames execute via `git mv` (never `fs.renameSync`)
3. If any `git mv` fails, all renames are rolled back via `git reset --hard HEAD` -- repository returns to pre-migration state
4. On success, a single commit is created: `chore: rename artifacts to governance convention`
5. The commit contains only renames -- zero content changes (100% git similarity for rename detection)
6. `git log --follow` works on a sample of up to 5 renamed files, verifying history chain (FR17)
7. Migration execution (rename phase) completes in under 60 seconds for up to 100 files, excluding git commit time (NFR3)
8. Integration tests validate the full rename -> rollback -> re-run cycle using a real temp git repo

## Tasks / Subtasks

- [x] Task 1: Implement `executeRenames(manifest, projectRoot)` in artifact-utils.js (AC: #2, #3, #4, #5)
  - [x] Add to `scripts/lib/artifact-utils.js` in a new `// --- Migration Execution ---` section
  - [x] Input: `manifest` from `generateManifest()` -- filter to only entries with `action === 'RENAME'`
  - [x] Pre-flight: if any RENAME entry has `collisionWith !== null`, throw `ArtifactMigrationError` with message listing colliding files -- do NOT proceed with any `git mv`
  - [x] For each RENAME entry: run `execFileSync('git', ['mv', oldFullPath, newFullPath])` with `{ cwd: projectRoot }`
  - [x] If any `git mv` fails: immediately run `execFileSync('git', ['reset', '--hard', 'HEAD'])` and throw `ArtifactMigrationError` with `{ file, phase: 'rename', recoverable: true }`
  - [x] On success (all renames complete): run `execFileSync('git', ['commit', '-m', 'chore: rename artifacts to governance convention'])` with `{ cwd: projectRoot }`
  - [x] Return `{ renamedCount: number, commitSha: string }` -- get SHA from `execFileSync('git', ['rev-parse', 'HEAD'])`
  - [x] Use `execFileSync` for ALL git operations (never `execSync` -- shell injection fix from retro)
  - [x] Export function

- [x] Task 2: Implement `ArtifactMigrationError` class (AC: #3)
  - [x] Add to `scripts/lib/artifact-utils.js` before the execution section
  - [x] `class ArtifactMigrationError extends Error` with `{ file, phase, recoverable }` properties
  - [x] `phase` is `'rename'` or `'inject'` -- drives programmatic rollback decisions
  - [x] Named `ArtifactMigrationError` (NOT `MigrationError`) to avoid collision with existing `MigrationError` in `scripts/update/lib/migration-runner.js` which has a different signature (`migrationName`, `originalError`)
  - [x] Export class

- [x] Task 3: Implement `verifyHistoryChain(renamedEntries, projectRoot)` (AC: #6)
  - [x] Sample up to 5 RENAME entries from the manifest
  - [x] For each: run `execFileSync('git', ['log', '--follow', '--oneline', '-3', '--', newPath])` with `{ cwd: projectRoot }`
  - [x] Verify output contains at least 2 commits (the rename commit + at least one prior commit)
  - [x] Return `{ verified: number, failed: string[] }` -- list any files where history chain broke
  - [x] If verification fails, log warning but do NOT rollback (renames are committed, this is informational)
  - [x] Export function

- [x] Task 4: Wire `--apply` flow in migrate-artifacts.js (AC: #1, #2, #3, #4)
  - [x] Replace the "Not yet implemented" stub for `--apply`
  - [x] Implement `confirmApply()` as an exported async function that returns boolean:
    - Uses `readline.createInterface` internally, closes after answer
    - Prompts "Apply migration? [y/n] " and returns `true` for 'y'/'Y', `false` otherwise
    - Exported separately for mocking in tests (tests NEVER interact with real readline)
  - [x] Flow when `--apply` is set:
    1. Generate manifest + print formatted output (same as dry-run)
    2. Print pre-apply summary: "X files will be renamed. Y files skipped (ambiguous/conflict)."
    3. If manifest has collisions, print error and exit 1 (do NOT prompt)
    4. If `--force`: skip prompt, proceed directly
    5. If not `--force`: call `confirmApply()` -- on false, print "Migration aborted." and exit 0
    6. Call `ensureCleanTree(filteredIncludeDirs, projectRoot)`
    7. Call `executeRenames(manifest, projectRoot)`
    8. Call `verifyHistoryChain(renamedEntries, projectRoot)` -- print warning if failures
    9. Print: "Rename phase complete. X files renamed. Commit: <sha>"
  - [x] Wrap execution in try/catch: if `ArtifactMigrationError` with phase 'rename', print "Rollback complete. No changes made." and exit 1
  - [x] Import `executeRenames`, `ArtifactMigrationError`, `verifyHistoryChain` from artifact-utils
  - [x] Import `ensureCleanTree` from artifact-utils (add to existing import)

- [x] Task 5: Write unit tests for executeRenames (AC: #2, #3, #4, #5, #7)
  - [x] Create `tests/lib/migration-execution.test.js`
  - [x] Test `executeRenames` with mocked `execFileSync`:
    - All renames succeed -> commit created, returns count + sha
    - One `git mv` fails -> `git reset --hard HEAD` called, ArtifactMigrationError thrown with phase: 'rename'
    - Only RENAME entries are processed (SKIP, INJECT, AMBIGUOUS, CONFLICT ignored)
    - Empty rename list -> no git operations, returns count 0
    - RENAME entries with collisions -> throws ArtifactMigrationError before any git mv (no partial execution)
  - [x] Test `ArtifactMigrationError` class:
    - Has correct `name`, `file`, `phase`, `recoverable` properties
    - `name` is 'ArtifactMigrationError' (not 'MigrationError')
  - [x] Test `verifyHistoryChain`:
    - Samples up to 5 entries
    - Returns verified count for files with history
    - Reports failures for files without history chain

- [x] Task 6: Write integration tests with real temp git repo (AC: #8, #7)
  - [x] Create a temp directory with `fs.mkdtemp`
  - [x] Initialize git repo: `git init`, `git add .`, `git commit`
  - [x] Create sample .md files matching governance naming patterns
  - [x] Commit the files so they have git history
  - [x] Generate a manifest against the temp repo
  - [x] Execute renames and verify:
    - Files are renamed on disk
    - Git commit exists with correct message
    - `git log --follow` works on renamed files
  - [x] Test rollback: mock one `git mv` to fail, verify `git reset --hard` restores original state
  - [x] Test re-run idempotency: after successful rename, re-generate manifest, verify RENAME count drops (files now have new names)
  - [x] Performance: assert rename phase < 60 seconds for test files
  - [x] Clean up temp dir in afterAll

- [x] Task 7: Run convoke-check and regression suite
  - [x] Run `node scripts/convoke-check.js --skip-coverage` -- all steps pass
  - [x] Run `node scripts/migrate-artifacts.js` -- dry-run still works
  - [x] Run `node scripts/archive.js --rename` -- regression check

## Dev Notes

### Previous Story (ag-2-3) Intelligence

- `migrate-artifacts.js` is the CLI entry point. The `--apply` flow currently prints "Not yet implemented" and returns (line 150-153). This story replaces that stub.
- `generateManifest()` returns `{ entries, collisions, summary }` -- entries with `action === 'RENAME'` have `oldPath` and `newPath` fields (relative to `_bmad-output/`).
- `ensureCleanTree(scopeDirs, projectRoot)` already exists and uses `execFileSync` (fixed in retro critical path). It checks tracked diffs + staged changes + untracked files in scope dirs.
- `formatManifest(manifest, { verbose })` formats the dry-run output.
- `parseArgs()` already handles `--apply`, `--force`, `--verbose`, `--include`.
- `convoke-check.js` exists for local CI verification -- run after implementation.

### Architecture Compliance

**Pipeline position**: This story implements Phase 2 (Rename / Commit 1) of the transactional migration pipeline. Phase 3 (Inject / Commit 2) is story 3.2.

**Two-commit strategy (ADR-2)**:
- Commit 1 (this story): All `git mv` operations. Rollback: `git reset --hard HEAD`.
- Commit 2 (story 3.2): Frontmatter injection + link updates. Rollback: `git reset --hard HEAD~1`.

**ArtifactMigrationError class** (from architecture, renamed to avoid collision with `MigrationError` in `scripts/update/lib/migration-runner.js`):
```javascript
class ArtifactMigrationError extends Error {
  constructor(message, { file, phase, recoverable }) {
    super(message);
    this.name = 'ArtifactMigrationError';
    this.file = file;       // which file caused the error
    this.phase = phase;     // 'rename' or 'inject'
    this.recoverable = recoverable; // can re-run fix this?
  }
}
```
`phase` drives rollback: 'rename' -> `git reset --hard HEAD`, 'inject' -> `git reset --hard HEAD~1`.

**Collision guard**: `executeRenames` must refuse to proceed if any RENAME entry has `collisionWith !== null`. Two files renaming to the same target = data loss. Check before first `git mv`.

**Path construction**: `oldPath`/`newPath` in manifest entries are relative to `_bmad-output/` (e.g., `planning-artifacts/prd-gyre.md`). For `git mv`, construct full paths: `path.join(projectRoot, '_bmad-output', entry.oldPath)`.

**NFR3**: < 60 seconds for 100 files. The hot path is sequential `git mv` calls. `execFileSync` per file is the bottleneck but acceptable for 100 files.

**NFR5**: Rollback via `git reset --hard HEAD`. This is safe because `ensureCleanTree` verified clean state before execution. The operator's uncommitted work is never at risk.

**FR17**: `git log --follow` verification is informational, not a gate. If history chain breaks (shouldn't happen with `git mv`), warn but don't rollback.

**FR46**: Idempotent recovery is partially addressed here. After successful commit 1, re-running the manifest generation will see renamed files and produce fewer RENAME entries (renamed files now match or are ambiguous under new names). Full idempotent detection (renames done, frontmatter pending -> skip to commit 2) is story 3.3.

### Interactive Prompt Pattern

Extract `confirmApply()` as a standalone exported async function. Tests mock this function directly -- never interact with real readline.

```javascript
async function confirmApply() {
  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question('Apply migration? [y/n] ', answer => {
      rl.close();
      resolve(answer.toLowerCase() === 'y');
    });
  });
}
```

In `main()`: `if (!args.force) { const confirmed = await confirmApply(); if (!confirmed) { ... exit } }`
In tests: `jest.spyOn(migrateModule, 'confirmApply').mockResolvedValue(true)`

### Anti-Patterns to AVOID

- Do NOT use `execSync` -- always `execFileSync` with argument arrays (shell injection prevention)
- Do NOT use `fs.renameSync` -- always `git mv` (preserves git history)
- Do NOT commit partial renames -- if any `git mv` fails, rollback ALL before throwing
- Do NOT modify `artifact-utils.js` functions from previous stories (inference, manifest, etc.)
- Do NOT implement frontmatter injection in this story -- that's 3.2
- Do NOT implement interactive ambiguous file resolution -- that's 3.3
- Do NOT run `git reset --hard` without `ensureCleanTree` having verified clean state first
- Do NOT block tests with interactive prompts -- mock `confirmApply()`, never use real readline in tests
- Do NOT proceed with renames if collisions exist -- check `collisionWith` before first `git mv`
- Do NOT name the error class `MigrationError` -- use `ArtifactMigrationError` to avoid collision with `scripts/update/lib/migration-runner.js`

### File Structure

```
scripts/
├── migrate-artifacts.js     # MODIFIED -- replace --apply stub with execution flow
└── lib/
    └── artifact-utils.js    # MODIFIED -- add executeRenames, ArtifactMigrationError, verifyHistoryChain

tests/
└── lib/
    └── migration-execution.test.js  # NEW -- unit + integration tests
```

### Testing Standards

- Jest test framework
- File: `tests/lib/migration-execution.test.js`
- Unit tests: mock `execFileSync` for git operations (same pattern as ensureCleanTree tests)
- Integration tests: real temp git repo with `fs.mkdtemp` + `git init` + `git add` + `git commit`
- Performance assertion: `expect(duration).toBeLessThan(60000)` for rename phase
- After all tests: run `node scripts/convoke-check.js --skip-coverage` to verify full CI suite
- Run full `tests/lib/` suite: 167 existing + new must all pass

### References

- [Source: arch-artifact-governance-portfolio.md -- ADR-2: Two-Commit Transaction, Phase 2 Rename]
- [Source: arch-artifact-governance-portfolio.md -- ArtifactMigrationError class, NFR3, NFR5, FR17, FR46]
- [Source: prd-artifact-governance-portfolio.md -- FR8, FR12, FR13, FR17, FR46]
- [Source: scripts/lib/artifact-utils.js -- ensureCleanTree, generateManifest, ManifestEntry]
- [Source: scripts/migrate-artifacts.js -- parseArgs, --apply stub at line 150]
- [Source: ag-epic-2-retro-2026-04-06.md -- ensureCleanTree shell injection fix, convoke-check]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- 184/184 tests pass (167 existing + 17 new)
- convoke-check: all 5 steps pass (lint, unit, integration, jest lib, coverage skipped)
- Integration tests: real temp git repo with git init, add, commit, git mv, rollback cycle
- 1 test failure during dev: mock leak from unit tests into integration tests — fixed with `jest.restoreAllMocks()` + `jest.resetModules()` in `beforeAll`
- `execFileSync` returns Buffer when encoding not propagated — added defensive `typeof` check for SHA parsing

### Completion Notes List

- Implemented `ArtifactMigrationError` class with `file`, `phase`, `recoverable` properties. Named to avoid collision with existing `MigrationError` in migration-runner.js.
- Implemented `executeRenames(manifest, projectRoot)` — filters RENAME entries, pre-flight collision check, sequential `git mv` via `execFileSync`, atomic rollback on failure (`git reset --hard HEAD`), single commit on success.
- Implemented `verifyHistoryChain(renamedEntries, projectRoot)` — samples up to 5 files, runs `git log --follow`, returns verified count + failures list. Informational only.
- Wired `--apply` flow in `migrate-artifacts.js` — replaces stub with: manifest generation -> pre-apply summary -> collision block -> `confirmApply()` prompt (unless `--force`) -> `ensureCleanTree` -> `executeRenames` -> `verifyHistoryChain` -> summary output.
- Implemented `confirmApply()` as exported async function using readline — mockable in tests, tests never interact with real readline.
- Pre-apply summary shows "X files will be renamed. Y files skipped (ambiguous/conflict)."
- Collisions block execution with exit 1 before any prompt.
- 17 new tests: ArtifactMigrationError (4), executeRenames mocked (5), verifyHistoryChain mocked (4), integration with real git repo (4).

### File List

- `scripts/lib/artifact-utils.js` — MODIFIED (added ArtifactMigrationError, executeRenames, verifyHistoryChain + exports)
- `scripts/migrate-artifacts.js` — MODIFIED (replaced --apply stub with execution flow, added confirmApply, updated imports/exports)
- `tests/lib/migration-execution.test.js` — NEW (17 tests)
