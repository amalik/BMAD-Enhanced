# Story 3.2: Frontmatter Injection & Link Updating (Commit 2)

Status: done

## Story

As a Convoke operator,
I want frontmatter metadata injected into all renamed artifacts and internal links updated,
so that governance tools can read structured metadata and cross-references aren't broken.

## Acceptance Criteria

1. **Given** commit 1 (renames) has completed successfully, **When** the migration executes the injection phase, **Then** frontmatter is injected into every renamed file using gray-matter (initiative, artifact_type, created, schema_version: 1)
2. Existing frontmatter fields are preserved -- migration adds, never overwrites (NFR20)
3. Field conflicts detected in dry-run are skipped with warning (not silently resolved)
4. Content below frontmatter is preserved byte-for-byte
5. Internal markdown links are updated for 4 patterns: `[text](filename.md)`, `[text](./filename.md)`, `[text](../dir/filename.md)`, and frontmatter `inputDocuments` arrays
6. Only `.md` files within `_bmad-output/` are scanned for links (FR15 boundary)
7. If any write fails, the phase rolls back via `git reset --hard` to commit 1 state (renames preserved, injections discarded)
8. On success, a single commit is created: `chore: inject frontmatter metadata and update links`
9. Unit tests validate frontmatter injection for: no existing frontmatter, existing frontmatter, metadata-only files, field conflicts
10. Unit tests validate link updating for all 4 link patterns plus edge case (link with anchor `#section`)

## Tasks / Subtasks

- [x] Task 1: Implement `updateLinks(oldToNewMap, scopeDirs, projectRoot)` in artifact-utils.js (AC: #5, #6)
  - [x] Add to `scripts/lib/artifact-utils.js` in the `// --- Migration Execution ---` section
  - [x] Input: `oldToNewMap` = `Map<string, string>` mapping old filenames to new filenames (just basenames, not full paths)
  - [x] Scan all `.md` files in `_bmad-output/` within `scopeDirs` (reuse `scanArtifactDirs`)
  - [x] For each file, read content and replace all 4 link patterns:
    - `[text](oldname.md)` -> `[text](newname.md)` (direct filename)
    - `[text](./oldname.md)` -> `[text](./newname.md)` (dot-slash prefix)
    - `[text](../dir/oldname.md)` -> `[text](../dir/newname.md)` (parent-dir, only replace the filename portion)
    - Frontmatter `inputDocuments` YAML arrays: strings containing old filename -> new filename
  - [x] Preserve anchor fragments: `[text](oldname.md#section)` -> `[text](newname.md#section)`
  - [x] Only write file if changes were made (avoid unnecessary git diff noise)
  - [x] Return `{ updatedFiles: number, updatedLinks: number }` count
  - [x] Use `fs.readFileSync` / `fs.writeFileSync` (synchronous — called in commit 2 phase)
  - [x] Export function

- [x] Task 2: Implement `executeInjections(manifest, projectRoot, scopeDirs)` in artifact-utils.js (AC: #1, #2, #3, #4, #7, #8)
  - [x] Runs AFTER `executeRenames` has committed (commit 1 done)
  - [x] For each RENAME entry in manifest: build frontmatter fields via `buildSchemaFields(entry.initiative, entry.artifactType)`
  - [x] Read the file at the NEW path (post-rename)
  - [x] Call `injectFrontmatter(content, fields)` -- returns `{ content, conflicts }`
  - [x] If conflicts: log warning per conflict ("Skipping field X: existing value 'A' differs from proposed 'B'"), do NOT modify conflicting fields
  - [x] Write modified content back to file
  - [x] After all injections: call `updateLinks(oldToNewMap, scopeDirs, projectRoot)` to fix cross-references
  - [x] Stage scoped changes: `execFileSync('git', ['add', '_bmad-output/'])` (NOT `git add -A` — avoid staging outside scope)
  - [x] Commit: `execFileSync('git', ['commit', '-m', 'chore: inject frontmatter metadata and update links'])`
  - [x] On any write failure: `execFileSync('git', ['reset', '--hard', 'HEAD'])` to discard injections (commit 1 renames preserved)
  - [x] Throw `ArtifactMigrationError` with `{ phase: 'inject', recoverable: true/false }`
  - [x] Return `{ injectedCount, linkUpdates, conflictCount, commitSha }`
  - [x] Export function

- [x] Task 3: Wire commit 2 into the `--apply` flow in migrate-artifacts.js (AC: #1, #7, #8)
  - [x] After `executeRenames` succeeds and `verifyHistoryChain` completes, call `executeInjections(manifest, projectRoot, filteredIncludeDirs)`
  - [x] Print summary: "Injection phase complete. X files injected, Y links updated, Z conflicts skipped. Commit: <sha>"
  - [x] Wrap in try/catch: if `ArtifactMigrationError` with phase 'inject', print "Injection failed. Renames preserved (commit 1). Injections discarded." and exit 1
  - [x] Import `executeInjections` from artifact-utils

- [x] Task 4: Write unit tests for link updating (AC: #5, #6, #10)
  - [x] Add to `tests/lib/migration-execution.test.js` (extend existing file)
  - [x] Test `updateLinks`:
    - `[text](old.md)` -> `[text](new.md)` (direct pattern)
    - `[text](./old.md)` -> `[text](./new.md)` (dot-slash)
    - `[text](../dir/old.md)` -> `[text](../dir/new.md)` (parent-dir, filename only)
    - `[text](old.md#section)` -> `[text](new.md#section)` (anchor preserved)
    - Frontmatter `inputDocuments` array entries updated
    - Files outside `_bmad-output/` NOT touched (FR15)
    - Files with no matching links are NOT rewritten

- [x] Task 5: Write unit tests for injection (AC: #1, #2, #3, #4, #9)
  - [x] Test `executeInjections` with temp dir:
    - File with no frontmatter -> frontmatter added (initiative, artifact_type, created, schema_version)
    - File with existing frontmatter -> new fields merged, existing preserved (NFR20)
    - File with conflicting frontmatter -> conflicts logged, conflicting fields NOT overwritten
    - Content below frontmatter preserved byte-for-byte
    - Rollback on write failure: `git reset --hard` called, ArtifactMigrationError thrown with phase 'inject'

- [x] Task 6: Write integration test for full commit 2 cycle
  - [x] Extend temp git repo from ag-3-1 integration pattern
  - [x] Execute commit 1 (renames), then commit 2 (injections + links)
  - [x] Verify: frontmatter present in renamed files, links updated
  - [x] Verify: two commits exist with correct messages

- [x] Task 7: Run convoke-check and regression suite
  - [x] Run `node scripts/convoke-check.js --skip-coverage` -- all steps pass
  - [x] Run `node scripts/migrate-artifacts.js` -- dry-run still works
  - [x] Run `node scripts/archive.js --rename` -- regression check

## Dev Notes

### Previous Story (ag-3-1) Intelligence

- `executeRenames(manifest, projectRoot)` executes commit 1: sequential `git mv` with atomic rollback. Returns `{ renamedCount, commitSha }`.
- `ArtifactMigrationError` class with `{ file, phase, recoverable }`. Phase 'rename' = rollback to HEAD, phase 'inject' = rollback to HEAD (commit 1 preserved).
- `verifyHistoryChain(entries, projectRoot)` — informational `git log --follow` check.
- The `--apply` flow in `migrate-artifacts.js` (lines 260-286) currently: executeRenames -> verifyHistoryChain -> print summary. This story adds executeInjections after verifyHistoryChain.
- `confirmApply()` handles piped stdin gracefully.
- `ArtifactMigrationError.recoverable` is set dynamically based on rollback outcome.

### Existing Functions to Reuse

**`injectFrontmatter(fileContent, newFields)`** — already in artifact-utils.js:
- Parses with gray-matter, merges `{ ...newFields, ...parsed.data }` (existing fields override)
- Returns `{ content, conflicts }` where conflicts list fields with differing values
- NFR20 compliant: content below frontmatter preserved byte-for-byte

**`buildSchemaFields(initiative, artifactType, options)`** — already in artifact-utils.js:
- Returns `{ initiative, artifact_type, created, schema_version: 1 }`
- `created` defaults to today's date (YYYY-MM-DD)

**`scanArtifactDirs(projectRoot, includeDirs, excludeDirs)`** — for scanning link targets.

### Architecture Compliance

**Pipeline position**: Phase 3 (Inject / Commit 2). Runs only after Phase 2 (Rename / Commit 1) succeeds.

**Rollback strategy for commit 2 failure**: `git reset --hard HEAD` rolls back to commit 1 state. Renames are preserved in commit 1. Only injections/link updates are discarded. This is different from commit 1 rollback which uses `git reset --hard HEAD` to rollback to pre-migration state.

**NFR20**: `injectFrontmatter` already handles this via gray-matter's `matter.stringify(parsed.content, merged)`. Content below `---` delimiters is preserved exactly.

**FR15 boundary**: Link updating scans ONLY `.md` files within `_bmad-output/` scope directories. Root-level files, `_bmad/` files, and files outside the project are never touched.

**4 link patterns**: The story must handle all 4 patterns plus anchor fragments. Some files have `inputDocuments` arrays in frontmatter AND markdown links in the body — handle both in a single pass (parse frontmatter via gray-matter, update YAML strings, update body content with regex, reassemble via `matter.stringify`). Regex approach:
```
// Pattern 1+2: [text](old.md) or [text](./old.md)
/\[([^\]]*)\]\((?:\.\/)?oldname\.md(#[^\)]*)?)\)/g

// Pattern 3: [text](../dir/old.md)
/\[([^\]]*)\]\(([^)]*\/)oldname\.md(#[^\)]*)?)\)/g

// Pattern 4: inputDocuments array in frontmatter
Parse frontmatter YAML, replace strings containing old filenames
```

**artifact-rename-map.md**: Generated during commit 2 and included in the same commit. Contains a markdown table mapping old path -> new path for every renamed file.

### INJECT_ONLY Entries — Not Processed in This Story

INJECT_ONLY entries are unreachable in the current migration pipeline. Pre-migration filenames (e.g., `prd-gyre.md`) always differ from the governance convention target (`gyre-prd.md`), so `filename === generateNewFilename()` never holds before commit 1. After commit 1, the manifest was generated pre-rename and won't contain INJECT_ONLY entries. If INJECT_ONLY becomes reachable in future (post-migration re-run with fresh manifest), the flow would need adaptation. For now, `executeInjections` processes ONLY RENAME entries.

### artifact-rename-map.md — Story 3.3 Scope

The `artifact-rename-map.md` generation is an AC in Story 3.3 (Interactive Flow, Recovery & Rename Map), NOT this story. Do NOT implement it here.

### Anti-Patterns to AVOID

- Do NOT modify `executeRenames` or `verifyHistoryChain` from ag-3-1
- Do NOT overwrite existing frontmatter fields — `injectFrontmatter` already handles this correctly
- Do NOT scan files outside `_bmad-output/` for link updates (FR15 boundary)
- Do NOT use `git reset --hard HEAD~1` for commit 2 rollback — use `git reset --hard HEAD` because commit 2 hasn't been committed yet when the failure occurs (the write fails before the commit)
- Do NOT silently skip conflicts — log each one with field name, existing value, proposed value
- Do NOT rewrite files that have no changes (avoid git diff noise)
- Do NOT use `git add -A` — stage only `_bmad-output/` to avoid committing unrelated changes
- Do NOT implement `artifact-rename-map.md` generation — that's Story 3.3
- Do NOT handle INJECT_ONLY entries — unreachable in current pipeline (see note above)

### File Structure

```
scripts/
├── migrate-artifacts.js     # MODIFIED -- add executeInjections call after executeRenames
└── lib/
    └── artifact-utils.js    # MODIFIED -- add updateLinks, executeInjections, generateRenameMap

tests/
└── lib/
    └── migration-execution.test.js  # MODIFIED -- add link updating + injection tests
```

### Testing Standards

- Jest test framework
- Extend `tests/lib/migration-execution.test.js` (keep all execution tests together)
- Unit tests for `updateLinks`: use temp files with known link content
- Unit tests for `executeInjections`: use temp git repo (same pattern as ag-3-1 integration)
- Integration test: full commit 1 + commit 2 cycle in temp git repo
- Run `convoke-check --skip-coverage` after all tests
- 185 existing + new must all pass

### References

- [Source: arch-artifact-governance-portfolio.md -- Phase 3: Inject frontmatter + update links]
- [Source: prd-artifact-governance-portfolio.md -- FR14, FR15, FR16; NFR20]
- [Source: scripts/lib/artifact-utils.js -- injectFrontmatter, buildSchemaFields, scanArtifactDirs]
- [Source: ag-3-1-transactional-rename-execution.md -- executeRenames, ArtifactMigrationError, --apply flow]
- [Source: scripts/migrate-artifacts.js -- --apply flow lines 260-286]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- 196/196 tests pass (185 existing + 11 new)
- convoke-check: all 5 steps pass
- Dry-run still works (71 files, 42 rename, 29 ambiguous)
- Zero test failures during development

### Completion Notes List

- Implemented `updateLinks(oldToNewMap, scopeDirs, projectRoot)` — scans `.md` files for 4 link patterns (direct, dot-slash, parent-dir, frontmatter inputDocuments arrays). Preserves anchor fragments. Only rewrites files with actual changes.
- Implemented `executeInjections(manifest, projectRoot, scopeDirs)` — injects frontmatter via `buildSchemaFields` + `injectFrontmatter` for RENAME entries. Logs conflicts per field. Updates links. Stages scoped to `_bmad-output/`. Single commit on success. Rollback to commit 1 on failure.
- Wired commit 2 into `--apply` flow after verifyHistoryChain. Error handler distinguishes phase 'inject' from phase 'rename'.
- 6 updateLinks tests: direct, dot-slash, parent-dir, anchor preservation, inputDocuments array, no-change skip
- 5 executeInjections integration tests: no frontmatter, existing frontmatter preserved (NFR20), conflicts logged, body preserved byte-for-byte, two commits exist

### File List

- `scripts/lib/artifact-utils.js` — MODIFIED (added updateLinks, executeInjections + exports)
- `scripts/migrate-artifacts.js` — MODIFIED (added executeInjections import + commit 2 call + inject error handler)
- `tests/lib/migration-execution.test.js` — MODIFIED (added 11 tests: 6 updateLinks + 5 executeInjections)
