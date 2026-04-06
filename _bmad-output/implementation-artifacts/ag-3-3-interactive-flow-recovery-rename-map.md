# Story 3.3: Interactive Flow, Recovery & Rename Map

Status: ready-for-dev

## Story

As a Convoke operator,
I want a safe interactive migration flow with idempotent recovery and a rename map for reference,
so that I can control the process, recover from failures, and trace old filenames to new ones.

## Acceptance Criteria

1. **Given** the migration script is invoked, **When** the operator runs the migration, **Then** it follows the single interactive flow: dry-run manifest -> operator review -> confirmation prompt ("Apply migration? [y/n]") -> execute
2. `--force` bypasses the confirmation prompt for automation
3. Ambiguous files prompt the operator interactively: `Assign initiative for prd.md [convoke/gyre/skip]: `
4. Skipped files are excluded from migration and noted in summary
5. `artifact-rename-map.md` is generated mapping every old filename -> new filename, committed with the migration
6. Idempotent recovery works: re-running after commit 1 success + commit 2 failure detects "renames done, frontmatter pending" and resumes from commit 2 without re-executing commit 1
7. Re-running after full success detects all files as fully-governed and reports "Nothing to migrate -- all files governed"
8. Summary report shows: X files renamed, Y frontmatter injected, Z links updated, W skipped

## Tasks / Subtasks

- [ ] Task 1: Implement interactive ambiguous file resolution (AC: #3, #4)
  - [ ] Create `resolveAmbiguous(manifest, projectRoot)` in artifact-utils.js
  - [ ] For each AMBIGUOUS entry in manifest with candidates: prompt operator `Assign initiative for {filename} [{candidates}/skip]: `
  - [ ] If operator selects a valid candidate: update the entry's initiative, set action to RENAME, generate newPath via `generateNewFilename`
  - [ ] If operator types "skip": mark entry as SKIP, note in summary
  - [ ] If `--force` is set: skip all ambiguous files automatically (no interactive prompts in automation)
  - [ ] Return updated manifest with resolved entries + skip count
  - [ ] Extract prompt logic into a mockable function (same pattern as `confirmApply`)
  - [ ] Export function

- [ ] Task 2: Implement `generateRenameMap(renamedEntries)` (AC: #5)
  - [ ] Create helper function that returns markdown string
  - [ ] Format: `# Artifact Rename Map` header with date, then `| Old Path | New Path |` table
  - [ ] Include total count in header
  - [ ] Write to `_bmad-output/planning-artifacts/artifact-rename-map.md`
  - [ ] Call from `executeInjections` (add to commit 2) -- modify executeInjections to call this before staging
  - [ ] Export function

- [ ] Task 3: Implement idempotent recovery detection (AC: #6, #7)
  - [ ] Create `detectMigrationState(manifest)` in artifact-utils.js
  - [ ] Analyze manifest entries to determine current state:
    - If ALL entries are SKIP (fully-governed): return `'complete'` -- "Nothing to migrate"
    - If some entries are RENAME but files at newPath already exist (half-governed): return `'renames-done'` -- skip to commit 2
    - Otherwise: return `'fresh'` -- full migration needed
  - [ ] Wire into `--apply` flow: before executing, call `detectMigrationState`
    - If `'complete'`: print "Nothing to migrate -- all files governed" and exit 0
    - If `'renames-done'`: print "Detected partial migration (renames done, frontmatter pending). Resuming commit 2." and call `executeInjections` only
    - If `'fresh'`: proceed with full pipeline (executeRenames -> executeInjections)
  - [ ] Export function

- [ ] Task 4: Wire everything into --apply flow in migrate-artifacts.js (AC: #1, #2, #3, #8)
  - [ ] After manifest generation but BEFORE confirmation prompt: call `resolveAmbiguous` (unless `--force`)
  - [ ] Re-generate manifest summary after ambiguous resolution (counts change)
  - [ ] Before execution: call `detectMigrationState` for idempotent recovery
  - [ ] After execution: print full summary "Migration complete. X files renamed, Y frontmatter injected, Z links updated, W skipped."
  - [ ] Import `resolveAmbiguous`, `detectMigrationState`, `generateRenameMap` from artifact-utils

- [ ] Task 5: Write tests (AC: #3-#8)
  - [ ] Add to `tests/lib/migration-execution.test.js`
  - [ ] Test `resolveAmbiguous`:
    - Operator selects candidate -> entry updated to RENAME with correct newPath
    - Operator types "skip" -> entry marked SKIP
    - No ambiguous entries -> returns manifest unchanged
    - --force mode -> all ambiguous auto-skipped
  - [ ] Test `generateRenameMap`:
    - Produces markdown table with correct old/new paths
    - Empty entries -> empty table with header
  - [ ] Test `detectMigrationState`:
    - All SKIP -> returns 'complete'
    - Has RENAME entries -> returns 'fresh'
    - Tests for 'renames-done' state (files at new paths exist without frontmatter)
  - [ ] Integration test:
    - Full pipeline in temp git repo: resolve ambiguous -> execute renames -> execute injections -> verify rename map exists

- [ ] Task 6: Run convoke-check and regression suite
  - [ ] Run `node scripts/convoke-check.js --skip-coverage` -- all steps pass
  - [ ] Run `node scripts/migrate-artifacts.js` -- dry-run still works
  - [ ] Run `node scripts/archive.js --rename` -- regression check

## Dev Notes

### Previous Story (ag-3-2) Intelligence

- `executeInjections(manifest, projectRoot, scopeDirs)` handles commit 2: frontmatter injection + link updating. Returns `{ injectedCount, linkUpdates, conflictCount, commitSha }`.
- `executeRenames(manifest, projectRoot)` handles commit 1: sequential git mv with rollback. Returns `{ renamedCount, commitSha }`.
- The `--apply` flow in `migrate-artifacts.js` currently: generate manifest -> print -> confirm -> ensureCleanTree -> executeRenames -> verifyHistoryChain -> executeInjections -> print summary.
- `confirmApply()` is an exported async function using readline -- mockable pattern. Use same pattern for ambiguous resolution prompts.
- `ArtifactMigrationError` with `{ file, phase, recoverable }` drives rollback.
- 200 tests pass across 6 test files.
- `updateLinks` uses exact filename matching (fixed in code review -- no substring corruption).

### Architecture Compliance

**Interactive ambiguous resolution** (from architecture, lines 479-487): For each ambiguous file, show context clues (first 3 lines, git author, candidates) and prompt the operator to select an initiative or skip. In `--force` mode, skip all ambiguous automatically.

**artifact-rename-map.md**: Generated during commit 2 and included in the same commit. Simple markdown table: `| Old Path | New Path |`. Written to `_bmad-output/planning-artifacts/`.

**Idempotent recovery (FR46)**: Detection via governance state analysis:
- After successful full migration: all files are fully-governed (SKIP) -> "Nothing to migrate"
- After commit 1 success + commit 2 failure: renamed files exist at new paths but lack frontmatter (half-governed) -> resume from commit 2
- The detection uses `generateManifest()` which re-analyzes the current file state. After renames, the manifest will show different governance states than before.

**Important caveat for 'renames-done' detection**: After commit 1, the renamed files have governance-convention filenames (`gyre-prd.md`). But the inference engine expects type-first naming (`prd-gyre.md`) for initiative inference. Files at `gyre-prd.md` would be classified as `ungoverned` or `ambiguous` (initiative-first is not the old convention). The simpler detection approach: check if the last commit message is `chore: rename artifacts to governance convention` — if so, renames are done.

### Prompt Pattern for Ambiguous Resolution

```javascript
async function promptInitiative(filename, candidates) {
  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const options = [...candidates, 'skip'].join('/');
  return new Promise(resolve => {
    rl.on('close', () => resolve('skip'));
    rl.question(`Assign initiative for ${filename} [${options}]: `, answer => {
      rl.close();
      const trimmed = (answer || '').trim().toLowerCase();
      if (trimmed === 'skip' || candidates.includes(trimmed)) {
        resolve(trimmed);
      } else {
        resolve('skip'); // Invalid input = skip
      }
    });
  });
}
```

Export `promptInitiative` for mocking in tests (same as `confirmApply`).

### Anti-Patterns to AVOID

- Do NOT modify `executeRenames` or `executeInjections` logic from ag-3-1/3-2 (except adding generateRenameMap call to executeInjections)
- Do NOT prompt in `--force` mode -- auto-skip all ambiguous files
- Do NOT block tests with interactive prompts -- mock `promptInitiative`
- Do NOT use commit message parsing as the primary idempotent detection -- use governance state from manifest as primary, commit message as fallback
- Do NOT generate rename map for files that were skipped -- only include actually renamed files

### File Structure

```
scripts/
├── migrate-artifacts.js     # MODIFIED -- add ambiguous resolution, recovery detection, summary
└── lib/
    └── artifact-utils.js    # MODIFIED -- add resolveAmbiguous, generateRenameMap, detectMigrationState

tests/
└── lib/
    └── migration-execution.test.js  # MODIFIED -- add tests for new functions
```

### Testing Standards

- Jest test framework
- Extend `tests/lib/migration-execution.test.js`
- Mock `promptInitiative` for ambiguous resolution tests (same pattern as `confirmApply`)
- Integration test: full pipeline in temp git repo
- Run `convoke-check --skip-coverage` after all tests
- 200 existing + new must all pass

### References

- [Source: arch-artifact-governance-portfolio.md -- Interactive flow, FR46 idempotent recovery, artifact-rename-map.md]
- [Source: prd-artifact-governance-portfolio.md -- FR16, FR46, FR47]
- [Source: scripts/migrate-artifacts.js -- current --apply flow lines 230-300]
- [Source: scripts/lib/artifact-utils.js -- executeRenames, executeInjections, generateManifest]
- [Source: ag-3-2-frontmatter-injection-link-updating.md -- executeInjections wiring]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
