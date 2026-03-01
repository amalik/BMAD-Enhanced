# Story 5.2: bmad-version.js Automated Tests at 85%+ Coverage

Status: done

## Story

As a maintainer,
I want automated tests for bmad-version.js achieving 85%+ line coverage,
So that I can confidently ship version CLI changes knowing regressions will be caught.

## Acceptance Criteria

1. Given bmad-version.js exists with its current functionality, when the maintainer runs the test suite with coverage reporting, then unit and integration tests cover bmad-version.js at **85%+ line coverage measured by c8** (FR22)
2. Tests validate core version behaviors: version reading, display formatting, comparison logic
3. Tests include **at least 3 edge case scenarios**: malformed version strings, missing version files, and unexpected format handling — **coverage target applies to branch coverage, not just line coverage**
4. Tests verify cross-platform path handling and OS-specific behaviors via mocked `process.platform` and filesystem abstractions — not actual multi-OS execution (NFR13)
5. Tests use `node:test` + c8 with no new dependencies (NFR7)
6. Test files are self-documenting (NFR8)

## Tasks / Subtasks

- [x] Task 1: Analyze current coverage baseline and identify gaps (AC: #1)
  - [x] 1.1 Baseline: 67.91% lines (91/134), 35.71% branches (5/14), 100% functions — from 3 integration tests in cli-entry-points.test.js
  - [x] 1.2 Uncovered main() branches: partial (lines 48-58), corrupted (61-70), up-to-date status (79), downgrade (86-87). Covered: not-in-project, fresh, update-available, migration history display
  - [x] 1.3 Uncovered getMigrationHistory(): config-not-found (117-118), YAML catch (126-127). Error handler (132-133)
  - [x] 1.4 All paths testable via CLI integration (runScript). getMigrationHistory not exported — test indirectly via stdout

- [x] Task 2: Create test file and test `main()` status branches via CLI integration (AC: #1, #2)
  - [x] 2.1 Created `tests/unit/bmad-version.test.js` with node:test, assert/strict, helpers imports
  - [x] 2.2 Test not-in-project branch — verified "Not in a BMAD project" + exit 0
  - [x] 2.3 Test fresh branch — verified "Not installed" + exit 0
  - [x] 2.4a Test partial branch (no config.yaml) — verified "Partial installation" + exit 0
  - [x] 2.4b Test partial branch (!currentVersion) — config with no version field, no guessVersion match → "Partial installation"
  - [x] 2.5 Test corrupted branch — removed contextualization-expert.md → "Corrupted installation" + exit 0
  - [x] 2.6 Test up-to-date branch — version set to PKG_VERSION → "Up to date" + exit 0
  - [x] 2.7 Test update-available branch — version "1.0.0" → "Update available" + bmad-update suggestion
  - [x] 2.8 Test downgrade branch — version "99.0.0" → "older than installed" + exit 0

- [x] Task 3: Test `getMigrationHistory()` indirectly via CLI output (AC: #2, #3)
  - [x] 3.1 Tested indirectly — getMigrationHistory not exported, all 3 scenarios covered via stdout assertions
  - [x] 3.2 Migration history with populated entries — verified "Migration History" header, from/to versions, migration names
  - [x] 3.3 No migration history key — verified no "Migration History" in output
  - [x] 3.4 Empty migration history array — verified no "Migration History" in output

- [x] Task 4: Add edge case scenarios (AC: #3)
  - [x] 4.1 Malformed version string ("not-a-version") — verified no crash
  - [x] 4.2 Config with no version field — verified graceful handling (falls through to guessVersion)
  - [x] 4.3 Invalid YAML in config.yaml — verified no crash (getCurrentVersion catches error)
  - [x] 4.4 Malformed migration history entries (missing fields) — verified no crash
  - [x] 4.5 Error handler (lines 132-133): Uncoverable — main() cannot throw uncaught since all sync calls are wrapped by version-detector's own error handling, and getMigrationHistory has try/catch. 6 uncovered lines (4.48%) — well within 85% threshold. Documented in Dev Agent Record.

- [x] Task 5: Add cross-platform path handling tests (AC: #4)
  - [x] 5.1 Static analysis: bmad-version.js uses path.join for all path construction, no raw string concatenation with separators
  - [x] 5.2 Static analysis: version-detector.js and utils.js both import and use path module
  - [x] 5.3 Skipped in-process test — getMigrationHistory not exported; static analysis sufficient

- [x] Task 6: Verify Node.js LTS compatibility (AC: #5)
  - [x] 6.1 All APIs compatible: node:test (Node 18+), fs-extra ^11.2.0 (Node 14+), js-yaml, chalk ^4.1.2 (CommonJS)
  - [x] 6.2 package.json engines: ">=18.0.0" — matches LTS range
  - [x] 6.3 Documented in Dev Agent Record

- [x] Task 7: Measure final coverage and verify target (AC: #1, #5, #6)
  - [x] 7.1 Final coverage: 95.52% lines (128/134), 92.59% branches (25/27), 100% functions (2/2)
  - [x] 7.2 c8 --check-coverage --lines 85 --branches 85 PASSES
  - [x] 7.3 Full suite: 997 tests pass (995 pass + 2 todo from story 5.1), 0 failures
  - [x] 7.4 Coverage: 95.52% lines, 92.59% branches, 100% functions
  - [x] 7.5 Uncovered: lines 117-118 (getMigrationHistory config-not-found — defensive, unreachable in normal flow), 126-127 (getMigrationHistory YAML catch — same), 132-133 (error handler — main() cannot throw uncaught)

## Dev Notes

### Target Script: `scripts/update/bmad-version.js` (134 lines)

**Architecture:** CLI script with two functions:
1. **`main()`** (lines 15-106) — Async CLI entry point. Calls `findProjectRoot()` and `versionDetector` methods, then enters a 7-branch conditional tree based on installation scenario. Displays version info and migration history. Does NOT use `process.exit()` for normal flow — returns early from each branch. Only `process.exit(1)` is in the `.catch()` error handler at line 131-133.
2. **`getMigrationHistory(projectRoot)`** (lines 113-128) — Async function. Reads `config.yaml`, returns `migration_history` array or `null`. Has its own try/catch for graceful error handling.

**Key difference from bmad-update.js (Story 5.1):** bmad-version.js has NO `process.exit()` calls in the normal branches — it uses `return` to exit early. This means all 7 branches can be tested via CLI `runScript` helper with exit code 0 (except the error handler which calls `process.exit(1)`). This simplifies testing significantly compared to 5.1.

**Neither function is exported.** The script only runs via `main().catch(...)`. All testing must go through CLI integration via `runScript` helper, or we can export `getMigrationHistory` for direct unit testing if needed for coverage.

**7 Status Branches in `main()`:**
| Branch | Condition | Output Contains | Exit |
|--------|-----------|-----------------|------|
| not-in-project | `!projectRoot` | "Not in a BMAD project" | return (0) |
| fresh | `scenario === 'fresh'` | "Not installed" | return (0) |
| partial | `scenario === 'partial' \|\| !currentVersion` | "Partial installation" | return (0) |
| corrupted | `scenario === 'corrupted'` | "Corrupted installation" | return (0) |
| up-to-date | `currentVersion === targetVersion` | "Up to date" | falls through (0) |
| update-available | `compareVersions(current, target) < 0` | "Update available" | falls through (0) |
| downgrade | else (current > target) | "older than installed" | falls through (0) |

**Dependencies:**
- `fs-extra` (^11.2.0 — async readFile, existsSync)
- `path` (Node.js built-in)
- `chalk` (^4.1.2 — CommonJS)
- `js-yaml` (^4.1.0 — yaml.load)
- `./lib/version-detector` — getCurrentVersion, getTargetVersion, detectInstallationScenario
- `./lib/utils` — findProjectRoot, compareVersions

### Testing Strategy (Learned from Story 5.1)

**Pattern: CLI integration via `runScript` helper.** Since neither function is exported, use the `runScript(scriptPath, args, { cwd })` helper from `tests/helpers.js` to run bmad-version.js as a child process. Each test:
1. Creates a temp directory with `createTempDir()`
2. Sets up the installation scenario (valid install, partial, corrupted, etc.)
3. Runs `runScript(SCRIPT_PATH, [], { cwd: tmpDir })`
4. Asserts on `stdout` content and `exitCode`
5. Cleans up temp directory in `finally` block

**Temp dir pattern:** Always use `createTempDir('bmad-ver-')` from helpers.js (not manual `fs.mkdtemp`). Clean up in `finally` blocks with `await fs.remove(tmpDir)`.

**Coverage measurement:** `npx c8 --include='scripts/update/bmad-version.js' node --test tests/unit/bmad-version.test.js`

**`findProjectRoot()` walk-up risk:** This function walks UP from `process.cwd()` looking for `_bmad/`. When using `runScript` with `{ cwd: tmpDir }`, the child process cwd is set to tmpDir. If tmpDir is under a directory that also contains `_bmad/`, `findProjectRoot` will find the REAL project. `createTempDir()` uses `os.tmpdir()` which is outside the project tree — safe. Never use a subdirectory of the project root as tmpDir.

**Key risks from Story 5.1:**
- `empathy-map` workflow name collides with `guessVersionFromFileStructure()` — creates false "partial" detection. Solution: use `createValidInstallation()` or `createInstallation()` helpers which set up complete installations.
- `process.platform` mocking: `path` module caches platform at load time, so mocking platform doesn't change path behavior in the child process. For CLI tests via `runScript`, platform mocking won't affect the child process. Primary approach: static source analysis asserting no hardcoded separators in bmad-version.js and its dependencies. Optional: if `getMigrationHistory` is exported, mock platform in-process for that function.
- Assertions: Use specific assertions (`assert.equal`, `assert.match`, `assert.ok(stdout.includes(...))`) — avoid weak `assert.ok(value)` without descriptive messages.

### Existing Coverage

3 integration tests exist in `tests/integration/cli-entry-points.test.js` — basic smoke tests for bmad-version CLI. Estimated current coverage: ~10-20% (only covers the happy path, not all 7 branches).

### Project Structure Notes

- Test file: `tests/unit/bmad-version.test.js` (new file)
- Target script: `scripts/update/bmad-version.js` (134 lines, read-only — no modifications needed unless exporting getMigrationHistory)
- Helpers: `tests/helpers.js` — createTempDir, createValidInstallation, createInstallation, runScript, PACKAGE_ROOT
- Dependencies under test: `scripts/update/lib/version-detector.js`, `scripts/update/lib/utils.js`

### References

- [Source: _bmad-output/planning-artifacts/epics-phase2.md#Story 5.2] — ACs and FR22
- [Source: _bmad-output/planning-artifacts/prd-phase2.md#FR22] — bmad-version.js tests at 85%+ coverage
- [Source: _bmad-output/planning-artifacts/prd-phase2.md#NFR7] — No new dependencies
- [Source: _bmad-output/planning-artifacts/prd-phase2.md#NFR8] — Self-documenting test files
- [Source: _bmad-output/planning-artifacts/prd-phase2.md#NFR13] — Cross-platform via mocking, not actual multi-OS
- [Source: _bmad-output/implementation-artifacts/p2-5-1-bmad-update-js-automated-tests-at-85-coverage.md] — Previous story learnings (testing patterns, empathy-map collision, process.platform approach)
- [Source: scripts/update/bmad-version.js] — Target script (134 lines)
- [Source: scripts/update/lib/version-detector.js] — Dependency (241 lines)
- [Source: scripts/update/lib/utils.js] — Dependency (96 lines, findProjectRoot + compareVersions)
- [Source: tests/helpers.js] — Test helpers (183 lines)
- [Source: tests/integration/cli-entry-points.test.js] — Existing 3 integration tests

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

### Completion Notes List

- Created `tests/unit/bmad-version.test.js` with 17 tests across 4 describe blocks
- All 7 main() status branches covered: not-in-project, fresh, partial (2 paths), corrupted, up-to-date, update-available, downgrade
- getMigrationHistory tested indirectly via CLI output (3 tests: populated history, no history, empty array)
- 4 edge case tests: malformed version strings, missing version field, invalid YAML, malformed migration history entries
- 2 static analysis tests for cross-platform path handling (bmad-version.js + dependencies)
- Coverage baseline: 67.91% lines / 35.71% branches → Final: 95.52% lines / 92.59% branches / 100% functions
- c8 --check-coverage --lines 85 --branches 85 PASSES
- Full suite: 997 tests, 0 failures (2 todo from story 5.1)
- Uncovered lines (6 total, 4.48%): lines 117-118 (getMigrationHistory defensive config-not-found check — unreachable since config was already verified by detectInstallationScenario), lines 126-127 (getMigrationHistory YAML catch — unreachable since config was already parsed by getCurrentVersion), lines 132-133 (error handler — main() cannot throw uncaught because all dependency calls have their own error handling)
- Node.js LTS compatibility verified: engines >=18.0.0, all APIs available on LTS 18/20/22
- No new dependencies added (NFR7)
- No modifications to bmad-version.js source code required

### Change Log

- 2026-03-01: Created bmad-version.test.js — 17 tests, 95.52% line / 92.59% branch coverage
- 2026-03-01: Code review fixes — fixed test 4.2 empathy-map collision (was hitting wrong branch), hardened 3 weak edge case assertions with specific branch verification, improved static analysis regex to catch template literal paths

### File List

- `tests/unit/bmad-version.test.js` (NEW) — 17 tests (~377 lines), 4 describe blocks covering all 7 status branches, migration history, edge cases, cross-platform validation
