# Story 1.1: Build Programmatic Docs Audit Tool

Status: ready-for-dev

## Story

As a maintainer,
I want to run a single zero-config command that scans all user-facing docs for stale references, missing content, and broken internal links,
So that I get an actionable report identifying every drift item with file location, current value, and expected value — without manual inspection.

## Acceptance Criteria

1. **Given** the maintainer is in the project root with no prior configuration, **When** they run `node scripts/docs-audit.js`, **Then** the tool scans all markdown files under `docs/` and root-level user-facing docs (README.md, UPDATE-GUIDE.md, INSTALLATION.md, CHANGELOG.md, FAQ)
2. **Given** the tool is scanning, **When** it encounters numeric references, **Then** it detects stale numeric values (e.g., "four agents" vs actual 7, incorrect workflow/test counts) by deriving expected values dynamically from the agent registry and workflow manifest
3. **Given** the tool is scanning, **When** it encounters file path references, **Then** it detects stale path references (deleted files, renamed paths) by checking filesystem existence
4. **Given** the tool is scanning, **When** it encounters word-pattern variants, **Then** it detects contradictory terminology (e.g., "original agents", "four agents", "original workflows") that contradicts current 7-agent, 22-workflow reality
5. **Given** the tool is scanning, **When** it checks docs coverage completeness, **Then** it verifies every agent in the registry has documentation coverage and every workflow in the manifest has a doc reference
6. **Given** the tool is scanning, **When** it encounters internal markdown links, **Then** it validates all `[text](path)` links for target file existence (NFR18)
7. **Given** findings exist, **When** the report is generated, **Then** each finding includes: file path, line number, current value, expected value, and finding category
8. **Given** findings exist, **When** the report is generated, **Then** the output is structured for both human reading (formatted text) and programmatic consumption (parseable structure for CI)
9. **Given** the tool runs, **When** it completes with findings, **Then** it exits with a non-zero exit code (enabling CI gate integration)
10. **Given** the tool runs, **When** it completes with zero findings, **Then** it exits with code 0 and prints a success summary
11. **Given** the tool's expected values, **When** the registry or manifest changes (new agents/workflows added), **Then** the audit expectations auto-update without code changes — all expected values are derived dynamically from `agent-registry.js`
12. **Given** the tool is invoked, **When** no arguments or configuration are provided, **Then** it still produces the full report (zero-config per NFR6)

## Tasks / Subtasks

- [ ] Task 1: Create `scripts/docs-audit.js` — main entry point (AC: 1, 12)
  - [ ] 1.1: Import agent-registry.js to derive expected agent count (7), names, workflow count (22), and workflow names dynamically
  - [ ] 1.2: Define user-facing doc scope — `docs/*.md` + root-level: README.md, UPDATE-GUIDE.md, INSTALLATION.md, CHANGELOG.md, BMAD-METHOD-COMPATIBILITY.md
  - [ ] 1.3: Implement CLI entry with zero-config — no arguments, auto-discovers project root using existing `utils.js` `findProjectRoot()` pattern
  - [ ] 1.4: Wire up finding collectors, run all check categories, output report, set exit code

- [ ] Task 2: Implement stale numeric reference detection (AC: 2, 4)
  - [ ] 2.1: Build regex patterns for numeric agent/workflow/test count references (digits and written-out numbers: "four", "seven", "13", "22", etc.)
  - [ ] 2.2: Build word-pattern detection for contradictory terminology ("original agents", "original four", "initial agents", etc.)
  - [ ] 2.3: Scan each doc file line-by-line, match patterns, compare against registry-derived expected values
  - [ ] 2.4: Generate finding objects with: `{file, line, category: 'stale-reference', current, expected}`

- [ ] Task 3: Implement stale path reference detection (AC: 3)
  - [ ] 3.1: Extract all file path references from markdown content (relative paths in links, code blocks, inline references)
  - [ ] 3.2: Resolve each path relative to the document's location
  - [ ] 3.3: Check filesystem existence via `fs.existsSync()`
  - [ ] 3.4: Generate finding objects with: `{file, line, category: 'broken-path', current, expected: 'file should exist'}`

- [ ] Task 4: Implement internal link validation (AC: 6)
  - [ ] 4.1: Parse all markdown links `[text](target)` — exclude external URLs (http/https)
  - [ ] 4.2: Resolve relative link targets against document location
  - [ ] 4.3: Handle anchor links (`#section`) by verifying file existence (anchor validation optional)
  - [ ] 4.4: Generate finding objects with: `{file, line, category: 'broken-link', current, expected: 'target should exist'}`

- [ ] Task 5: Implement docs coverage completeness check (AC: 5, 11)
  - [ ] 5.1: For each agent in `AGENTS` array from registry: search docs for agent name references (e.g., "Emma", "Mila", agent ID)
  - [ ] 5.2: For each workflow in `WORKFLOWS` array from registry: search docs for workflow name references
  - [ ] 5.3: Report agents/workflows with zero docs coverage as findings: `{category: 'missing-coverage', current: 'no references found', expected: 'at least one doc reference'}`

- [ ] Task 6: Implement report generation and exit codes (AC: 7, 8, 9, 10)
  - [ ] 6.1: Group findings by category and file
  - [ ] 6.2: Format human-readable report with chalk-colored output (use existing chalk dependency)
  - [ ] 6.3: Print summary line: `Found {n} findings across {f} files ({categories})`
  - [ ] 6.4: Exit with code 1 if findings > 0, code 0 if clean
  - [ ] 6.5: Support `--json` flag for machine-readable output (JSON array of finding objects)

- [ ] Task 7: Write tests — `tests/unit/docs-audit.test.js` (all ACs)
  - [ ] 7.1: Test stale numeric detection with mock docs containing "four agents" vs expected 7
  - [ ] 7.2: Test broken path detection with mock docs referencing non-existent files
  - [ ] 7.3: Test internal link validation with mock docs containing broken `[text](path)` links
  - [ ] 7.4: Test docs coverage check with mock registry and docs
  - [ ] 7.5: Test report output format (human-readable and JSON)
  - [ ] 7.6: Test exit codes (0 for clean, 1 for findings)
  - [ ] 7.7: Test zero-config behavior (no arguments needed)

- [ ] Task 8: Add npm script and verify CI integration (AC: 9, 12)
  - [ ] 8.1: Add `"docs:audit": "node scripts/docs-audit.js"` to package.json scripts
  - [ ] 8.2: Verify script runs successfully from project root
  - [ ] 8.3: Verify non-zero exit code when findings exist (CI gate compatible)

## Dev Notes

### Architecture Compliance

- **Language:** JavaScript ES2020+ — NO TypeScript
- **Test framework:** `node:test` + `node:assert/strict` — NOT Jest
- **Coverage:** c8 (`npm run test:coverage`)
- **No new dependencies:** Use only existing deps: `chalk@^4.1.2`, `fs-extra@^11.3.3`, `js-yaml@^4.1.0`
- **Linting:** Must pass `npm run lint` (ESLint)
- **File naming:** kebab-case for JS files, camelCase for variables

### Critical: Registry-Driven Dynamic Discovery

The audit tool MUST derive ALL expected values from `scripts/update/lib/agent-registry.js`:
- `AGENTS` array (7 entries) — agent count, names, IDs, streams
- `WORKFLOWS` array (22 entries) — workflow count, names, agent mappings
- `AGENT_FILES` — expected agent filenames
- `USER_GUIDES` — expected user guide filenames
- `WORKFLOW_NAMES` — all workflow name strings

**DO NOT hardcode** agent count, workflow count, agent names, or any registry-derived values. Import from registry.

### Existing Patterns to Follow

**Validator.js pattern** ([scripts/update/lib/validator.js](scripts/update/lib/validator.js)):
- Each check function returns `{name, passed, error, info, fix, warning}`
- Orchestrator calls all checks, aggregates results
- Uses `AGENTS`, `WORKFLOWS` etc. from registry imports

**bmad-doctor.js pattern** ([scripts/bmad-doctor.js](scripts/bmad-doctor.js)):
- User-facing CLI with colored chalk output
- Runs checks sequentially, prints pass/fail per check
- Reports summary at end

**utils.js** ([scripts/update/lib/utils.js](scripts/update/lib/utils.js)):
- `findProjectRoot()` — use this for project root detection, do NOT reinvent
- `compareVersions()`, `countMdFiles()` — existing utility patterns

**Test helpers** ([tests/helpers.js](tests/helpers.js)):
- `createTempDir()` — isolated temp directory for tests
- `silenceConsole()` / `restoreConsole()` — suppress output in tests
- `runScript()` — execute CLI scripts as child processes (useful for exit code testing)

### User-Facing Docs Scope

Files the audit tool must scan:
```
docs/agents.md          — Agent reference (check agent count, names, workflow references)
docs/development.md     — Contributor reference (check agent/workflow counts)
docs/testing.md         — Testing reference (check test count, coverage thresholds)
docs/faq.md             — FAQ (check counts, extension guidance)
README.md               — Landing page (check stale numbers, links)
UPDATE-GUIDE.md         — Upgrade instructions (check compatibility info)
INSTALLATION.md         — Install guide (check references)
CHANGELOG.md            — Version history (verify link targets)
BMAD-METHOD-COMPATIBILITY.md — Method compatibility (check agent references)
```

Root-level docs that are NOT user-facing (exclude from audit): `CREATE-RELEASE-GUIDE.md`, `CREATE-v1.0.3-RELEASE.md`, `PUBLISHING-GUIDE.md`, `TEST-PLAN-REAL-INSTALL.md`, `WARP.md`, `CLEANUP-SUMMARY.md`, release-notes-*.md

### Stale Pattern Examples

Known stale patterns to detect (derive dynamically, not hardcode):
- Numeric: "four agents", "4 agents" → expected 7
- Numeric: "13 workflows" → expected 22
- Word: "original agents", "original four", "initial agents"
- Path: links to deleted/moved files
- Coverage: agent or workflow with zero doc references

### Current Reality (from registry)

- **7 agents:** Emma, Isla, Mila, Liam, Wade, Noah, Max
- **22 workflows:** lean-persona, product-vision, contextualize-scope, empathy-map, user-interview, user-discovery, research-convergence, pivot-resynthesis, pattern-mapping, hypothesis-engineering, assumption-mapping, experiment-design, mvp, lean-experiment, proof-of-concept, proof-of-value, signal-interpretation, behavior-analysis, production-monitoring, learning-card, pivot-patch-persevere, vortex-navigation
- **Package version:** 1.6.4
- **7 user guides:** EMMA-USER-GUIDE.md, ISLA-USER-GUIDE.md, MILA-USER-GUIDE.md, LIAM-USER-GUIDE.md, WADE-USER-GUIDE.md, NOAH-USER-GUIDE.md, MAX-USER-GUIDE.md

### File Location

New file: `scripts/docs-audit.js` (follows existing scripts/ convention)
New test: `tests/unit/docs-audit.test.js` (follows existing test location)
Modified: `package.json` (add `docs:audit` script entry)

### Project Structure Notes

- Alignment with existing `scripts/` directory for CLI tools
- Follows `scripts/bmad-doctor.js` precedent for user-facing diagnostic tool
- Test file follows `tests/unit/*.test.js` naming convention
- Imports from `scripts/update/lib/agent-registry.js` — same pattern as validator.js and bmad-doctor.js

### Testing Standards

- Use `node:test` — `describe()`, `it()`, `beforeEach()`, `afterEach()`
- Use `node:assert/strict` — `assert.strictEqual()`, `assert.deepStrictEqual()`
- Use `tests/helpers.js` — `createTempDir()` for isolated file fixtures, `runScript()` for CLI exit code tests
- Test both unit functions (individual check functions) and integration (full CLI execution with exit codes)
- c8 coverage target: aim for 85%+ on new code

### References

- [Source: _bmad-output/planning-artifacts/epics-phase2.md — Epic 1, Story 1.1]
- [Source: _bmad-output/planning-artifacts/prd-phase2.md — FR1, FR2, NFR6, NFR7, NFR18]
- [Source: _bmad-output/planning-artifacts/architecture.md — Technical Stack, Code Structure, Testing Standards]
- [Source: scripts/update/lib/agent-registry.js — Single source of truth for agents/workflows]
- [Source: scripts/update/lib/validator.js — Check function pattern: {name, passed, error, info, fix, warning}]
- [Source: scripts/bmad-doctor.js — CLI output pattern with chalk]
- [Source: scripts/update/lib/utils.js — findProjectRoot() utility]
- [Source: tests/helpers.js — createTempDir(), runScript(), silenceConsole()]
- [Source: package.json — existing deps: chalk@^4.1.2, fs-extra@^11.3.3, js-yaml@^4.1.0]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
