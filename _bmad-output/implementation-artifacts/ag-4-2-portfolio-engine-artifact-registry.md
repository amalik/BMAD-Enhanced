# Story 4.2: Portfolio Engine & Artifact Registry

Status: done

## Story

As a Convoke operator,
I want to generate a portfolio view of all my initiatives from a single command,
so that I can see where everything stands in under 30 seconds.

## Acceptance Criteria

1. **Given** taxonomy.yaml exists and artifacts are present in `_bmad-output/`, **When** the operator runs `convoke-portfolio`, **Then** the engine scans all output directories and builds an artifact registry indexed by initiative/type/date/status
2. For each initiative in taxonomy (platform + user), the inference rule chain executes and produces an InitiativeState
3. The portfolio view displays: initiative name, phase, status, next action, and context re-entry hint (last artifact touched + date)
4. Each status is marked `(explicit)` or `(inferred)` for transparency (FR23)
5. Initiatives with `unknown` phase or status show `unknown (inferred)` -- never a false-confident guess (NFR6)
6. Initiatives are sorted alphabetically by initiative ID by default (FR48)
7. `--sort last-activity` overrides to sort by most recently modified
8. The portfolio checks for taxonomy.yaml prerequisite -- clear error if absent, warning if no governed artifacts found (FR39)
9. Scan completes in under 5 seconds for up to 200 artifacts (NFR1)

## Tasks / Subtasks

- [x] Task 1: Implement `portfolio-engine.js` core pipeline (AC: #1, #2, #8, #9)
  - [x] Create `scripts/lib/portfolio/portfolio-engine.js`
  - [x] Implement `generatePortfolio(projectRoot, options)` as the main async function
  - [x] Pipeline stages:
    1. **Pre-flight**: `readTaxonomy(projectRoot)` — error if absent (FR39)
    2. **Scan**: Discover all subdirectories of `_bmad-output/` dynamically via `fs.readdirSync`. Exclude `_archive`, dot-prefixed dirs, and known non-artifact dirs (see Dev Notes). Call `scanArtifactDirs` per directory.
    3. **Parse**: For each file: call `inferArtifactType(filename, taxonomy)` to get `{ type, hcPrefix, remainder, date }`, then `inferInitiative(typeResult.remainder, taxonomy)` to get initiative. Only index files with a resolved initiative (confidence 'high') — silently skip files that can't be attributed to an initiative.
    4. **Enrich**: For each indexed file, read content + parse frontmatter via `parseFrontmatter`. Build artifact registry: `Map<initiative, artifact[]>` where each artifact has `{ filename, dir, fullPath, type, hcPrefix, date, initiative, frontmatter, content }`
    5. **Infer**: For each initiative in taxonomy (platform + user), run the 4-rule chain: frontmatter -> artifact-chain -> git-recency -> conflict-resolver
    6. **Sort**: Alphabetical by initiative ID (default) or by lastArtifact.date descending (--sort last-activity)
    7. **Return**: `{ initiatives: InitiativeState[], registry: Map, summary: { total, governed, ungoverned } }`
  - [x] Warn if no governed artifacts found (FR39)
  - [x] Export `generatePortfolio`

- [x] Task 2: Implement terminal formatter (AC: #3, #4, #5, #6, #7)
  - [x] Create `scripts/lib/portfolio/formatters/terminal-formatter.js`
  - [x] Input: `InitiativeState[]` array
  - [x] Output: formatted string with aligned columns using `padEnd()`
  - [x] Columns: Initiative | Phase | Status | Next Action / Last Artifact
  - [x] Status column shows `(exp.)` or `(inf.)` suffix for transparency (FR23)
  - [x] `unknown` shows as `unknown (inf.)` -- never a bare unknown (NFR6)
  - [x] Export `formatTerminal`

- [x] Task 3: Implement markdown formatter (AC: #3, #4, #5)
  - [x] Create `scripts/lib/portfolio/formatters/markdown-formatter.js`
  - [x] Input: `InitiativeState[]` array
  - [x] Output: standard markdown table with same columns as terminal
  - [x] Same `(exp.)` / `(inf.)` markers
  - [x] Export `formatMarkdown`

- [x] Task 4: Create CLI entry point and bin entry (AC: #1, #6, #7, #8)
  - [x] The engine module stays at `scripts/lib/portfolio/portfolio-engine.js` (library function)
  - [x] Add CLI runner block in `portfolio-engine.js` (when `require.main === module`): parse args, call `generatePortfolio`, format output
  - [x] Add `"convoke-portfolio": "scripts/lib/portfolio/portfolio-engine.js"` to package.json bin section (deeper path than usual — documented exception for shared lib organization)
  - [x] CLI args: `--terminal` (default), `--markdown`, `--sort last-activity`, `--verbose`, `--help`
  - [x] `--help` prints usage documentation
  - [x] Use `findProjectRoot()` for project root (never process.cwd)
  - [x] Make file executable (`chmod +x`)

- [x] Task 5: Write unit tests (AC: #1-#9)
  - [x] Create `tests/lib/portfolio-engine.test.js`
  - [x] Test `generatePortfolio`:
    - Scans real `_bmad-output/` directories and returns InitiativeState array
    - Each initiative has phase, status, lastArtifact, nextAction populated
    - Alphabetical sort by default
    - `--sort last-activity` sorts by date descending
    - Missing taxonomy -> throws error
    - Performance: < 5 seconds (NFR1)
  - [x] Test `formatTerminal`:
    - Produces aligned column output
    - Shows (exp.) and (inf.) markers
    - unknown shows as `unknown (inf.)`
  - [x] Test `formatMarkdown`:
    - Produces valid markdown table
    - Same markers as terminal

- [x] Task 6: Run convoke-check and regression suite
  - [x] Run `node scripts/convoke-check.js --skip-coverage` -- all steps pass
  - [x] Run `node scripts/lib/portfolio/portfolio-engine.js --help` -- prints usage
  - [x] Run `node scripts/lib/portfolio/portfolio-engine.js` -- produces portfolio output against real repo
  - [x] Run `node scripts/migrate-artifacts.js` -- dry-run still works

## Dev Notes

### Previous Story (ag-4-1) Intelligence

- 4 rule files in `scripts/lib/portfolio/rules/` — each exports an `apply*` function with signature `(state, artifacts, options) => state`
- Rule chain order: frontmatter -> artifact-chain -> git-recency -> conflict-resolver
- `isEpicDone` uses context-aware patterns (status/epic prefix required, not bare word match)
- `comparePhasePriority` exported from conflict-resolver for sorting
- 281 tests pass across 8 test files (including 58 portfolio-rules tests)

### Architecture Compliance

**Pipeline**: scan -> parse -> infer -> sort -> format -> output. All read-only. No git writes.

**Dynamic directory discovery**: Portfolio scans subdirectories of `_bmad-output/` dynamically via `fs.readdirSync`, filtered by `stat.isDirectory()`. Exclude: `_archive`, dot-prefixed, and known non-artifact dirs (`brainstorming`, `design-artifacts`, `journey-examples`, `project-documentation`, `test-artifacts`). Only files that produce a valid initiative inference (confidence 'high') are indexed into the registry. Files from non-artifact dirs that happen to match get silently skipped.

**`inferInitiative` call pattern**: Must call `inferArtifactType(filename, taxonomy)` FIRST to get `{ type, remainder }`, then `inferInitiative(typeResult.remainder, taxonomy)`. The remainder is the filename portion AFTER the type prefix is extracted. Do NOT pass the full filename to `inferInitiative`.

**`InferenceSignal.confidence` typedef**: Only 2 values: `'explicit'` (from frontmatter) and `'inferred'` (from heuristics). The architecture draft mentioned `'low'` but this was not carried into the implementation. Two levels are sufficient — keep typedef as-is.

**Artifact registry**: Map from initiative ID to array of enriched artifact objects. Each artifact has: `{ filename, dir, fullPath, type, hcPrefix, date, initiative, frontmatter, content }`. Built by combining `scanArtifactDirs` + `parseFrontmatter` + `inferArtifactType` + `inferInitiative`.

**Rule chain integration**:
```javascript
const { applyFrontmatterRule } = require('./rules/frontmatter-rule');
const { applyArtifactChainRule } = require('./rules/artifact-chain-rule');
const { applyGitRecencyRule } = require('./rules/git-recency-rule');
const { applyConflictResolver } = require('./rules/conflict-resolver');

for (const [initiative, artifacts] of registry) {
  let state = makeEmptyState(initiative);
  state = applyFrontmatterRule(state, artifacts, options);
  state = applyArtifactChainRule(state, artifacts, options);
  state = applyGitRecencyRule(state, artifacts, options);
  state = applyConflictResolver(state, artifacts, options);
  results.push(state);
}
```

**Terminal formatter**: No library. `padEnd()` for column alignment. Box-drawing optional (can use simple pipes). Columns: Initiative | Phase | Status | Next Action.

**Markdown formatter**: Standard `| col1 | col2 |` table syntax.

**Confidence display (FR23/NFR6)**:
- `(exp.)` for `confidence: 'explicit'`
- `(inf.)` for `confidence: 'inferred'`
- `unknown` always shows as `unknown (inf.)` — never bare

### Anti-Patterns to AVOID

- Do NOT hardcode the 3 migration default directories — discover subdirs dynamically, but exclude known non-artifact dirs
- Do NOT pass full filenames to `inferInitiative` — it takes the remainder from `inferArtifactType`, not the filename
- Do NOT add a 'low' confidence level to InferenceSignal — two values (explicit/inferred) are sufficient
- Do NOT modify the 4 rule files from ag-4-1
- Do NOT write any files or modify git state — portfolio is read-only
- Do NOT use a table library — use `padEnd()` for terminal alignment
- Do NOT import `ensureCleanTree` or any migration execution functions
- Do NOT implement degraded mode (ungoverned files) — that's story 4.3
- Do NOT implement WIP radar — that's story 4.4
- Do NOT implement `--filter` flag — that's story 4.4

### File Structure

```
scripts/
└── lib/
    └── portfolio/
        ├── portfolio-engine.js          # NEW — core pipeline + CLI
        ├── formatters/
        │   ├── terminal-formatter.js    # NEW
        │   └── markdown-formatter.js    # NEW
        └── rules/                       # EXISTING from ag-4-1
            ├── frontmatter-rule.js
            ├── artifact-chain-rule.js
            ├── git-recency-rule.js
            └── conflict-resolver.js

package.json                             # MODIFIED — add convoke-portfolio bin entry

tests/
└── lib/
    └── portfolio-engine.test.js         # NEW
```

### Testing Standards

- Jest test framework
- File: `tests/lib/portfolio-engine.test.js`
- Integration test: run against real `_bmad-output/` directories
- Unit tests: formatters with controlled InitiativeState inputs
- Performance assertion: `expect(duration).toBeLessThan(5000)` for full pipeline
- Run `convoke-check --skip-coverage` after all tests
- 281 existing + new must all pass

### References

- [Source: arch-artifact-governance-portfolio.md -- Portfolio engine structure, formatters, NFR1, NFR6, FR23, FR39, FR48]
- [Source: prd-artifact-governance-portfolio.md -- FR22-FR27, FR48; NFR1, NFR6]
- [Source: scripts/lib/portfolio/rules/ -- 4 rule files from ag-4-1]
- [Source: scripts/lib/artifact-utils.js -- readTaxonomy, scanArtifactDirs, parseFrontmatter, inferArtifactType, inferInitiative]
- [Source: scripts/lib/types.js -- InitiativeState, InferenceSignal typedefs]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- 298/298 tests pass (281 existing + 17 new portfolio engine tests)
- convoke-check: all 5 steps pass (1 lint error caught and fixed: no-useless-assignment on allDirs)
- Real repo portfolio output: 8 initiatives, 143 md artifacts, 43 governed, 100 ungoverned
- Performance: < 5 seconds for full scan (NFR1 met)
- 1 test failure during dev: total count included non-.md files — fixed by filtering to mdFiles before counting

### Completion Notes List

- Implemented `portfolio-engine.js` — core pipeline: pre-flight (taxonomy check) -> dynamic dir discovery -> parse (inferArtifactType + inferInitiative) -> registry build -> 4-rule chain inference -> sort -> return. Excludes non-artifact dirs and files without resolved initiative.
- Implemented `terminal-formatter.js` — aligned column output with `padEnd()`. Columns: Initiative | Phase | Status | Next Action. Shows `(exp.)` / `(inf.)` confidence markers. `unknown` always shows as `unknown (inf.)`.
- Implemented `markdown-formatter.js` — standard markdown table with same columns and markers.
- CLI in `portfolio-engine.js` (when `require.main === module`): `--terminal` (default), `--markdown`, `--sort last-activity`, `--help`. Uses `findProjectRoot()`.
- Added `convoke-portfolio` to package.json bin section.
- 17 new tests: generatePortfolio integration (7), formatTerminal (6), formatMarkdown (3), makeEmptyState (1).

### File List

- `scripts/lib/portfolio/portfolio-engine.js` — NEW (core pipeline + CLI)
- `scripts/lib/portfolio/formatters/terminal-formatter.js` — NEW
- `scripts/lib/portfolio/formatters/markdown-formatter.js` — NEW
- `package.json` — MODIFIED (added convoke-portfolio bin entry)
- `tests/lib/portfolio-engine.test.js` — NEW (17 tests)
