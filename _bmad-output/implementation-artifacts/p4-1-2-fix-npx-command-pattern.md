# Story 1.2: Fix npx Command Pattern in All Script Files

Status: done

## Story

As a **Convoke user copying CLI commands from terminal output**,
I want all `npx convoke-*` commands displayed by scripts to use the correct `npx -p convoke-agents convoke-*` pattern,
so that I can copy-paste them without getting "package not found" errors.

## Acceptance Criteria

1. All `npx convoke-*` patterns in JS console output and fix-suggestion strings use `npx -p convoke-agents convoke-*`
2. No `npx convoke-*` patterns remain without the `-p convoke-agents` prefix in any JS file under `scripts/` or `index.js`
3. JSDoc comments in `index.js` (lines 8-12) also use the correct pattern for documentation consistency
4. Existing tests still pass — assertions match on substring `convoke-install` / `convoke-update` which is preserved

## Tasks / Subtasks

- [x] Task 1: Fix `scripts/postinstall.js` — 4 occurrences (AC: #1)
  - [x] 1.1: `npx convoke-install` in fresh install message (appears twice: main path and fallback path)
  - [x] 1.2: `npx convoke-update --dry-run` in upgrade preview message
  - [x] 1.3: `npx convoke-update` in upgrade apply message
- [x] Task 2: Fix `index.js` — 10 occurrences (AC: #1, #3)
  - [x] 2.1: 5 JSDoc comment lines (lines 8-12) listing CLI commands
  - [x] 2.2: 5 `console.log` lines (lines 48-52) displaying CLI usage
- [x] Task 3: Fix `scripts/convoke-doctor.js` — 11 occurrences (AC: #1)
  - [x] 3.1: All `fix:` string properties suggesting `npx convoke-install`, `npx convoke-install-vortex`, `npx convoke-update`
- [x] Task 4: Fix `scripts/update/convoke-update.js` — 4 occurrences (AC: #1)
  - [x] 4.1: All `console.log` lines suggesting `npx convoke-install`
- [x] Task 5: Fix `scripts/update/convoke-version.js` — 4 occurrences (AC: #1)
  - [x] 5.1: All `console.log` lines suggesting `npx convoke-install`
- [x] Task 6: Fix `scripts/update/convoke-migrate.js` — 3 occurrences (AC: #1)
  - [x] 6.1: Usage line, error message, and yellow hint text
- [x] Task 7: Fix `scripts/update/lib/migration-runner.js` — 1 occurrence (AC: #1)
  - [x] 7.1: `npx convoke-update` in dry-run preview output
- [x] Task 8: Final verification (AC: #2)
  - [x] 8.1: Grep confirmed zero stale `npx convoke-*` patterns without `-p convoke-agents` prefix across all JS files
  - [x] 8.2: Full test suite passed — 315 tests, 0 failures

## Dev Notes

- All occurrences are **display strings** (console.log, JSDoc comments, fix-suggestion objects) — not executable calls
- The replacement pattern is mechanical: `npx convoke-X` → `npx -p convoke-agents convoke-X` for all binaries: `convoke-install`, `convoke-install-vortex`, `convoke-update`, `convoke-version`, `convoke-doctor`, `convoke-migrate`
- The `-p convoke-agents` flag tells npx which package provides the binary, required because the npm package name (`convoke-agents`) differs from the binary names
- **Do NOT touch markdown files** — those are documentation references and out of scope for this story. A separate initiative can address those if needed.

### Occurrence inventory (37 total across 7 files)

| File | Count | Context |
|------|-------|---------|
| `scripts/postinstall.js` | 4 | console.log with ANSI colors |
| `index.js` | 10 | 5 JSDoc + 5 console.log with ANSI colors |
| `scripts/convoke-doctor.js` | 11 fixed (12 total, 1 pre-existing) | `fix:` string properties in check objects |
| `scripts/update/convoke-update.js` | 4 | console.log with chalk |
| `scripts/update/convoke-version.js` | 4 | console.log with chalk |
| `scripts/update/convoke-migrate.js` | 3 | console.log/console.error with chalk |
| `scripts/update/lib/migration-runner.js` | 1 | console.log with chalk |

### Test impact

- `tests/integration/postinstall.test.js` — asserts `stdout.includes('convoke-install')` and `stdout.includes('convoke-update')` — both still match as substrings after the fix
- `tests/integration/cli-entry-points.test.js` — may assert on index.js output, verify after changes
- `tests/integration/convoke-doctor.test.js` — may assert on fix suggestion strings, verify after changes

### Project Structure Notes

- 7 files modified, all under `scripts/` and root `index.js`
- No new files created
- Markdown documentation has ~150+ occurrences of the same pattern but is explicitly out of scope

### References

- [Source: _bmad-output/planning-artifacts/epics-top5.md — Story 1.2]
- [Source: _bmad-output/planning-artifacts/initiatives-backlog.md — Initiative U5 (score 4.0)]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Debug Log References
N/A — no debugging required; mechanical replacements applied cleanly.

### Completion Notes List
- All 37 occurrences across 7 files replaced with `npx -p convoke-agents convoke-*` pattern
- `index.js` line 49 required a targeted edit (no trailing space after binary name, so `replace_all` missed it)
- `scripts/convoke-doctor.js` line 318 was already correct (pre-existing `npx -p convoke-agents` pattern)
- Test assertions use substring matching (`stdout.includes('convoke-install')`) so all 315 tests pass unchanged

### File List
- `scripts/postinstall.js` — 4 occurrences fixed
- `index.js` — 10 occurrences fixed (5 JSDoc + 5 console.log)
- `scripts/convoke-doctor.js` — 11 occurrences fixed
- `scripts/update/convoke-update.js` — 4 occurrences fixed
- `scripts/update/convoke-version.js` — 4 occurrences fixed
- `scripts/update/convoke-migrate.js` — 3 occurrences fixed
- `scripts/update/lib/migration-runner.js` — 1 occurrence fixed
