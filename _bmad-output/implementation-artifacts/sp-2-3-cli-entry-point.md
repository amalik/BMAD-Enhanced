# Story SP-2.3: CLI Entry Point

Status: ready-for-dev

## Story

As a platform maintainer,
I want a `convoke-export` CLI command that wraps the sp-2-2 export engine and writes the canonical per-skill output directory to disk,
so that I (and the sp-2-4 batch run) can export Tier 1 skills from the command line with filtering, dry-run, and clear success/failure reporting — without hand-calling the engine from a script.

## Acceptance Criteria

1. A CLI script exists at `scripts/portability/convoke-export.js` (CommonJS, executable via `node` and via the `convoke-export` bin entry registered in `package.json`). The script has a `#!/usr/bin/env node` shebang, executable permission bit, and is registered in `package.json` `bin` as `"convoke-export": "scripts/portability/convoke-export.js"`. Running it with no arguments prints the same help text as `--help` and exits 0 (not 1 — no-args is help, not error).

2. **Positional argument: skill name.** `node scripts/portability/convoke-export.js bmad-brainstorming` exports the named skill via `exportSkill()` from sp-2-2's `scripts/portability/export-engine.js`. The skill name must match a row in `_bmad/_config/skill-manifest.csv` exactly. If the skill is not found, the CLI prints `❌ Skill "<name>" is not in the manifest` (or the engine's exact error string) to stderr and exits with code 2 (`EXIT_NOT_FOUND`).

3. **Default output path.** Without `--output`, the CLI writes to `./exported-skills/<skill-name>/` relative to the project root (resolved via `findProjectRoot()` from `scripts/update/lib/utils.js` — never `process.cwd()`). The directory is created if missing (`fs.mkdirSync(..., { recursive: true })`). If the directory already exists and contains files, the CLI overwrites `instructions.md` and `README.md` without prompting (idempotent runs are required for sp-2-4 batch usage). No other files in the target directory are touched.

4. **Per-skill output structure** matches the canonical layout from `scripts/portability/templates/canonical-format.md` (sp-2-1):
   - `<output>/<skill-name>/instructions.md` — the LLM-consumed canonical content from `result.instructions`
   - `<output>/<skill-name>/README.md` — a minimal catalog-facing README seeded from `scripts/portability/templates/readme-template.md` with placeholder substitutions (skill display name, persona name + icon, tier, description, persona communication style summary). **The full per-skill README generation is sp-3-2's job** — sp-2-3 only writes a stub README that satisfies the directory-structure invariant. The stub MUST contain valid markdown, no broken `<TODO>` tokens that would fail sp-2-4's grep checks, and the persona name + icon + skill name in their proper slots. Token replacements are done by simple `string.replaceAll('<placeholder>', value)` — no template engine.

5. **`--output <path>` flag** overrides the default output directory. Path may be relative (resolved against `process.cwd()`, NOT project root — this is the one place `process.cwd()` is acceptable, because `--output` is a user-facing path) or absolute. The CLI creates the directory recursively if missing. Tilde (`~`) expansion is NOT required (defer to shell). Trailing slash is tolerated.

6. **`--tier <N>` flag** batch-exports all skills in the manifest whose `tier` column matches. For sp-2-3 only `--tier 1` (alias for `standalone`) is supported; passing `--tier 2` or `--tier 3` exits with code 3 (`EXIT_TIER_NOT_SUPPORTED`) and prints `Tier 2 export is sp-5-1's job; Tier 3 skills are not exported per the portability schema.` This matches the engine's tier-refusal error from sp-2-2 AC #6 — the CLI just surfaces it earlier (before invoking the engine per skill). When `--tier 1` is passed, the CLI iterates every standalone-tier skill in alphabetical order, calls `exportSkill()` per skill, and writes the per-skill output. A single skill's failure does NOT abort the batch — log the failure and continue (see AC #9 for reporting).

7. **`--all` flag** is an alias for `--tier 1` for sp-2-3 (since Tiers 2 and 3 aren't supported yet). When sp-5-1 lands and Tier 2 export becomes possible, `--all` will expand to standalone + light-deps. For now, `--all` and `--tier 1` are functionally identical; both produce the same output set. Document this in `--help`.

8. **`--dry-run` flag** runs the export engine in-memory but writes nothing to disk. The CLI still prints the per-skill success/failure summary, includes a `[DRY RUN]` prefix on the summary line, and lists every file path it WOULD have written. Use this to preview a batch before committing. `--dry-run` works with all other flags (`--tier 1 --dry-run`, `--all --dry-run`, single-skill `bmad-brainstorming --dry-run`).

9. **Per-skill reporting** uses a stable line format that grep-friendly tooling can parse:
   - Success: `✅ <skill-name> → <relative-path-to-instructions.md> (<N> warnings)`
   - Failure: `❌ <skill-name> — <error message single-lined>`
   - Skipped (in batch mode, e.g., already-fresh exports if `--skip-existing` is added later): `⏭️  <skill-name> — <reason>` (sp-2-3 has no `--skip-existing` flag yet, but reserve the format)

   At the end of any run (single or batch), print a summary line: `Exported <N> skills (<S> success, <F> failed, <K> skipped) — <total-warnings> warnings total`. If any skill failed, exit with code 4 (`EXIT_PARTIAL_FAILURE`). If all succeeded, exit 0. If the batch was empty (no skills matched the filter), exit 0 with `Nothing to export — manifest matches found 0 skills`. Single-skill mode exits 0 on success, propagates the engine's error code on failure (2 or 3).

10. **`--help` / `-h` flag** prints usage text including: synopsis, all flags with descriptions, exit codes table, and 4 worked examples (single skill default output, single skill custom output, batch tier 1 dry-run, batch all). Exits 0. The help text must be plain ASCII (no emoji) so it renders cleanly in any terminal. The help text MUST list all 5 exit codes (`0=success`, `2=skill-not-found`, `3=tier-not-supported`, `4=partial-failure`, `1=usage-error`).

11. **Argument parsing** is done with a hand-rolled minimalist parser (no `commander`, no `yargs`, no new npm dependencies — match the existing `scripts/portability/classify-skills.js` pattern from sp-1-2). Unknown flags exit code 1 (`EXIT_USAGE`) with `Unknown flag: <flag>. Run --help for usage.` Conflicting flag combinations also exit 1: a positional skill name combined with `--tier` or `--all`, or `--tier` combined with `--all` (since `--all` is an alias). Document the conflict matrix in `--help`.

12. **A test file at `tests/lib/portability-cli-entry-point.test.js` adds at least 9 tests:**
    - **Test 1: single skill, default output, dry-run.** `convoke-export bmad-brainstorming --dry-run` exits 0, prints `✅ bmad-brainstorming` and `[DRY RUN]`, writes nothing (verify with `git status --porcelain` byte comparison from sp-2-2 Test 6 pattern).
    - **Test 2: single skill, custom output, real write.** Set up an `os.tmpdir()` directory, run `convoke-export bmad-brainstorming --output <tmpdir>`, assert `<tmpdir>/bmad-brainstorming/instructions.md` and `<tmpdir>/bmad-brainstorming/README.md` both exist, are non-empty, and `instructions.md` contains the persona name `Carson`. Clean up the tmpdir in `afterEach` (use `fs.rmSync(..., { recursive: true, force: true })`).
    - **Test 3: tier 1 batch dry-run.** `convoke-export --tier 1 --dry-run` exits 0, prints at least 2 success lines (Carson + Winston are both standalone), summary line shows non-zero exported count, writes nothing.
    - **Test 4: tier 2 rejection.** `convoke-export --tier 2` exits 3 with the documented error message.
    - **Test 5: nonexistent skill rejection.** `convoke-export bmad-skill-that-does-not-exist` exits 2 with `not in the manifest` in stderr.
    - **Test 6: --all is alias for --tier 1.** Run both with `--dry-run`, capture stdout, assert the success-line set is identical (sort + compare).
    - **Test 7: conflicting flags.** `convoke-export bmad-brainstorming --tier 1` exits 1. `convoke-export --tier 1 --all` exits 1. Both print `Run --help for usage.`
    - **Test 8: --help.** `convoke-export --help` exits 0, output contains `Usage`, `--output`, `--tier`, `--all`, `--dry-run`, `Exit codes`, and at least one `Example:` block. No emoji in help text.
    - **Test 9: README stub validity.** After `convoke-export bmad-brainstorming --output <tmpdir>`, the generated README contains the persona name `Carson`, the icon `🧠`, the skill name, and zero `<placeholder>` or `<TODO sp-3-1>` tokens (this is the sp-2-1 P3 fix carried forward to sp-2-3 — broken `<TODO>` tokens must NOT ship in stub READMEs).

    All tests use `child_process.execSync` or `child_process.spawnSync` to invoke the CLI as a subprocess (not by `require()`-ing the script — the script has side effects via `require.main === module`). Tests must NOT depend on the user's working directory; resolve paths via `findProjectRoot()` and tmpdirs.

13. **Read-only invariant on the source tree.** Running any CLI mode (single, batch, dry-run) must NOT modify any file under `_bmad/`, `scripts/`, `tests/`, or any other source directory. The only writes allowed are to the user-specified `--output` directory (or the default `./exported-skills/` directory). Test 1 (dry-run) and Test 2 (real write) jointly enforce this: Test 1 verifies zero writes via git, Test 2 verifies writes are confined to the tmpdir.

## Tasks / Subtasks

- [ ] Task 1: Scaffold the CLI script (AC: #1, #11)
  - [ ] Create `scripts/portability/convoke-export.js` with `#!/usr/bin/env node` shebang
  - [ ] Mark executable: `chmod +x scripts/portability/convoke-export.js`
  - [ ] CommonJS — `require('./export-engine')`, `require('./manifest-csv')`, `require('../update/lib/utils')`
  - [ ] Implement a hand-rolled arg parser (copy the pattern from `scripts/portability/classify-skills.js` — same `--flag value` and `--bool` handling)
  - [ ] Define exit code constants: `EXIT_SUCCESS = 0`, `EXIT_USAGE = 1`, `EXIT_NOT_FOUND = 2`, `EXIT_TIER_NOT_SUPPORTED = 3`, `EXIT_PARTIAL_FAILURE = 4`
  - [ ] When invoked with no args, call the help printer and exit 0 (not 1)
  - [ ] Wrap the main entry point in `if (require.main === module) { main(); }` so the file can be `require()`d in tests without executing

- [ ] Task 2: Implement the help printer (AC: #10)
  - [ ] Plain ASCII only — no emoji in help text (emoji is only in per-skill success/failure lines, not in `--help`)
  - [ ] Sections: Synopsis, Description, Flags, Exit codes, Examples
  - [ ] All 5 exit codes documented in a table
  - [ ] At least 4 worked examples covering single, custom output, tier batch dry-run, and `--all`
  - [ ] Conflict matrix mentioned in the Flags section

- [ ] Task 3: Implement single-skill mode (AC: #2, #3, #4, #5, #13)
  - [ ] `runSingle(skillName, outputBase, dryRun)` — calls `exportSkill(skillName, projectRoot)`
  - [ ] Catches engine errors: `not in the manifest` → exit 2; tier mismatch → exit 3; everything else → exit 4 with the error message
  - [ ] Resolves output path: `outputBase` if absolute; otherwise `path.resolve(process.cwd(), outputBase)` (the one and only place `process.cwd()` is allowed — see AC #5)
  - [ ] Default `outputBase` = `./exported-skills` resolved against `findProjectRoot()` (NOT cwd — see AC #3 for the asymmetry rationale: the default is project-relative for batch reproducibility, the user override is cwd-relative for typical CLI ergonomics)
  - [ ] If `dryRun === false`: `fs.mkdirSync(skillDir, { recursive: true })`, write `instructions.md`, write `README.md`
  - [ ] If `dryRun === true`: print the would-be paths; write nothing

- [ ] Task 4: Implement README stub generation (AC: #4)
  - [ ] Read `scripts/portability/templates/readme-template.md` once at startup
  - [ ] Define a placeholder map: `<Skill display name>` → humanized name (reuse `humanizeSkillName` from `export-engine.js` — it's already exported), `<persona name + icon>` → `${persona.name} ${persona.icon}`, `<persona name>` → `persona.name`, `<one-paragraph description...>` → `skillRow.description`, `<persona communication style summary>` → `persona.communicationStyle.slice(0, 240)` (cap to keep stub minimal), `<output artifact description>` → `result.sections.whatYouProduce` (strip the `## What you produce\n\n` heading), `<skill-name>` → the manifest name (kebab-case), `<tier>` → `skillRow.tier`, `<standalone | light-deps | pipeline>` → `skillRow.tier`
  - [ ] **Important:** the readme-template.md contains `<trigger 1>`, `<trigger 2>`, `<trigger 3>` placeholders. For the sp-2-3 stub, replace these with the bullets extracted from `result.sections.whenToUse` (parse out the `Use when:` bullets). If fewer than 3 bullets exist, replace the missing ones with empty strings and let the reader see only the populated bullets (the resulting blank lines are acceptable for a stub — sp-3-2 will polish this).
  - [ ] After substitution, run a final sanity pass: assert no `<placeholder>` or `<TODO sp-3-1>` tokens remain. If any do, throw — this is a CLI bug, not a runtime warning.
  - [ ] Use `string.replaceAll(token, value)` (Node 15+, project requires Node 18+ per `engines` in `package.json` — safe)

- [ ] Task 5: Implement batch mode (AC: #6, #7, #9)
  - [ ] `runBatch(tierFilter, outputBase, dryRun)` — reads the manifest, filters rows where `tier === 'standalone'` for `--tier 1` or `--all`
  - [ ] Sort skills alphabetically by name for stable output ordering
  - [ ] For each skill: try `runSingle()`; collect success/failure into a results array
  - [ ] A single failure does NOT abort the batch — `try/catch` per skill
  - [ ] After the loop, print the summary line
  - [ ] Return exit code: 0 if all succeeded, 4 if any failed, 0 if batch was empty
  - [ ] `--tier 2` and `--tier 3` exit early with code 3 BEFORE the loop runs

- [ ] Task 6: Implement reporting + summary (AC: #9)
  - [ ] Define a `Reporter` object with `success(skill, path, warnings)`, `failure(skill, error)`, `skip(skill, reason)`, `summary()`
  - [ ] Each method prints to stdout (emoji prefix per AC #9)
  - [ ] Failures' error messages are single-lined: `error.message.split('\n')[0]`
  - [ ] Summary line includes total warnings across all skills

- [ ] Task 7: Wire it into `main()` (AC: #1, #2, #6, #11)
  - [ ] Parse args
  - [ ] Validate flag combinations (conflict matrix)
  - [ ] Dispatch to `runSingle` or `runBatch`
  - [ ] `process.exit(returnCode)`

- [ ] Task 8: Register in package.json bin (AC: #1)
  - [ ] Add `"convoke-export": "scripts/portability/convoke-export.js"` under `bin`
  - [ ] Verify the existing bin entries' alphabetical or functional ordering — match the project convention
  - [ ] Run `npm install` locally to verify the bin link works (manual sanity check, not a checked-in test)

- [ ] Task 9: Write tests (AC: #12)
  - [ ] Create `tests/lib/portability-cli-entry-point.test.js`
  - [ ] Use `child_process.spawnSync('node', ['scripts/portability/convoke-export.js', ...args], { cwd: projectRoot })` for invocation
  - [ ] Use `os.tmpdir() + '/sp-2-3-' + crypto.randomUUID()` for output directories (avoid collisions across parallel test runs)
  - [ ] `afterEach` cleans up tmpdirs with `fs.rmSync(tmpDir, { recursive: true, force: true })`
  - [ ] Tests must NOT depend on the user's working directory — always pass `cwd: projectRoot`
  - [ ] All 9 tests from AC #12 implemented

- [ ] Task 10: Run regression suite + verify (AC: #1-13)
  - [ ] `npx jest tests/lib/portability` — all portability tests pass (38 existing + 9 new = 47 minimum)
  - [ ] `git status --porcelain` after the test run shows NO changes outside the tmpdirs (the engine + CLI are read-only on the source tree)
  - [ ] Manual smoke check: `node scripts/portability/convoke-export.js bmad-brainstorming --output /tmp/sp-2-3-smoke && ls /tmp/sp-2-3-smoke/bmad-brainstorming/` should show both files
  - [ ] Manual smoke check: `node scripts/portability/convoke-export.js --tier 1 --dry-run` should print 2+ success lines (Carson + Winston minimum)
  - [ ] `node scripts/convoke-doctor.js` — same baseline (2 pre-existing issues OK)

## Dev Notes

### Architecture Compliance (CRITICAL)

- **CLI is a thin wrapper around `exportSkill()`.** All transformation logic stays in `scripts/portability/export-engine.js` (sp-2-2). The CLI's job is: parse args, call the engine, write files, report results. Do NOT add transformation logic here.
- **CommonJS only.** Use `require()`. Match existing convention.
- **No new npm dependencies.** No `commander`, no `yargs`, no `chalk` (the project already has `chalk` but the existing CLI scripts use raw emoji + ANSI escapes — match that style).
- **`findProjectRoot()` from `scripts/update/lib/utils.js`** for the project root. The one and only acceptable use of `process.cwd()` is for resolving the user-supplied `--output` path (because `--output ./foo` should be cwd-relative per Unix CLI convention).
- **Default output path is project-root-relative** (`{projectRoot}/exported-skills/`), but `--output` is cwd-relative. This asymmetry is intentional: the default needs to be reproducible across any cwd (so sp-2-4 batch can run from anywhere), but the user override should follow standard CLI ergonomics.
- **Read-only on source tree.** The CLI must NOT touch `_bmad/`, `scripts/`, `tests/`, or any source dir. Only the `--output` directory (or the default `./exported-skills/`) is writable.
- **Idempotent runs.** Running the CLI twice with the same args produces the same output. Existing files in the output directory are overwritten without prompting (sp-2-4 batch needs this to refresh the export set without manual cleanup).

### Build on sp-2-1, sp-2-2, sp-1-2 foundation

- **Reuse `exportSkill` from `scripts/portability/export-engine.js`** (sp-2-2). Do not duplicate any of the engine's logic in the CLI.
- **Reuse `humanizeSkillName` from `scripts/portability/export-engine.js`** for the README stub (it's already exported).
- **Reuse `readManifest` from `scripts/portability/manifest-csv.js`** (sp-1-2) for batch-mode tier filtering.
- **Reuse `findProjectRoot` from `scripts/update/lib/utils.js`** for path resolution.
- **Match the arg-parser style of `scripts/portability/classify-skills.js`** (sp-1-2) — same hand-rolled minimalist pattern, same flag naming convention, same stderr/stdout discipline.
- **Read `scripts/portability/templates/readme-template.md`** for the stub README. Do NOT inline a copy in the CLI source — single source of truth.

### Exit code design

| Code | Constant | When |
|---|---|---|
| 0 | `EXIT_SUCCESS` | All requested skills exported successfully (or empty batch, or `--help`, or `--dry-run` with no failures) |
| 1 | `EXIT_USAGE` | Unknown flag, conflicting flags, malformed args |
| 2 | `EXIT_NOT_FOUND` | Single-skill mode and the skill name is not in the manifest |
| 3 | `EXIT_TIER_NOT_SUPPORTED` | `--tier 2` or `--tier 3` requested, OR a single-skill request hits the engine's tier-refusal error |
| 4 | `EXIT_PARTIAL_FAILURE` | Batch mode where at least one skill failed |

The five-code scheme is documented in `--help` and tested in AC #12. Do NOT add more codes — sp-2-4 may add `EXIT_VALIDATION_FAILED` if its grep checks fail, but that is sp-2-4's territory, not sp-2-3's.

### README stub vs. full README (the sp-2-3 / sp-3-2 boundary)

- **sp-2-3 produces a stub README** that satisfies the directory-structure invariant (`<skill>/README.md` must exist) and contains the bare minimum: skill name, persona name + icon, tier, description, when-to-use bullets, what-you-produce summary.
- **sp-3-2 will replace the stub** with a richer per-skill README that includes the catalog decision-tree links, full per-platform install instructions, and prose polish.
- **The boundary line:** if it requires curation, prose polish, or cross-skill awareness, it's sp-3-2's job. If it's a mechanical substitution from manifest data + engine output, it's sp-2-3's job.
- **Why a stub at all?** Because sp-2-4 (Export All Tier 1 Skills) needs to grep the exported READMEs to verify they contain the persona name. Without sp-2-3 emitting a README at all, sp-2-4's AC ("each exported `README.md` contains skill description, persona name, and 'How to use' section") would be unsatisfiable. The stub is the minimum that lets sp-2-4 ship.

### Skill tool handling

The CLI does NOT use Claude Code's Skill tool internally (it's a Node CLI script, not an LLM workflow). Skill tool stripping is handled inside `export-engine.js` already (sp-2-2 Phase 5 transformations). The CLI just consumes the engine's output verbatim.

### Test isolation

- **Use unique tmpdirs per test** to avoid cross-test pollution. `os.tmpdir() + '/sp-2-3-' + crypto.randomUUID()` is the recommended pattern.
- **Always clean up in `afterEach`** with `fs.rmSync(tmpDir, { recursive: true, force: true })`. The `force: true` flag prevents teardown failures if cleanup runs twice or the directory was already removed.
- **Do NOT use the project's `./exported-skills/` directory in tests** — it would pollute the working tree and break the `git status` invariant from AC #13.
- **All CLI invocations in tests use `spawnSync` with `cwd: projectRoot`** to make tests CWD-independent.

### Previous Story Intelligence (sp-2-2)

From sp-2-2's review patches just landed (P1 + P2):
- The engine's regex `\Z` bug is fixed → `extractSectionByHeading` and 5 other extractors now correctly anchor to end-of-string. The CLI's stub README generation depends on `result.sections.whatYouProduce` being populated; the fix makes that more reliable for skills whose output section runs to EOF.
- The engine now emits `unresolved-template-path` warnings when Phase 6 catch-all strips an unmapped `{var}`. The CLI's per-skill reporter (AC #9) prints `(<N> warnings)` next to each success line — these warnings will surface naturally and help spot config-var typos when sp-2-4 runs the full Tier 1 batch.
- sp-2-2 Test 6 (read-only invariant via `git status --porcelain`) was kept as a soft check (no-op on dirty trees). sp-2-3 inherits this pattern: Test 1 uses the same `git status` byte-comparison technique to verify dry-run writes nothing.
- The sp-2-2 review surfaced 6 deferred findings (meta-section `includes()` false-positives, `/bmad-init/i` prose stripping, CRLF frontmatter, etc.) — these are sp-2-4 batch hardening territory and do NOT affect sp-2-3.

### Project Structure Notes

**File locations:**
- CLI script: `scripts/portability/convoke-export.js` (new)
- Tests: `tests/lib/portability-cli-entry-point.test.js` (new)
- `package.json` `bin` entry: `"convoke-export": "scripts/portability/convoke-export.js"` (new line)
- Default output dir: `exported-skills/` at project root (will be added to `.gitignore` in sp-2-4 when the actual exports start being committed to a separate repo, but for sp-2-3 just leave it ungitignored — Test 1 + Test 13 ensure no real writes to it)

**Naming convention:** `convoke-export` (verb) matches the existing `convoke-update`, `convoke-version`, `convoke-doctor`, `convoke-portfolio` pattern. NOT `convoke-export-skill` or `convoke-skill-export` — single noun-verb pair only.

**Namespace decision:** This is a **Convoke** CLI command (`scripts/portability/`), not a BMAD upstream command. It lives under `scripts/portability/` because that's where sp-1-2 (`classify-skills.js`), sp-1-3 (`validate-classification.js`), sp-2-2 (`export-engine.js`), and the templates already live. Do NOT put it under `scripts/export/` (the epic doc uses that path, but the actual sp-1-2 onwards code uses `scripts/portability/` — match the existing code, not the epic doc).

### References

- [Source: epics-skill-portability.md#Story 2.3](../planning-artifacts/epics-skill-portability.md) — original AC list
- [Source: sp-2-2-export-engine.md](sp-2-2-export-engine.md) — engine API + Dev Notes
- [Source: scripts/portability/export-engine.js](../../scripts/portability/export-engine.js) — `exportSkill()` signature, `humanizeSkillName` export, `ALLOWED_WARNING_TYPES`
- [Source: scripts/portability/manifest-csv.js](../../scripts/portability/manifest-csv.js) — `readManifest()` for batch tier filtering
- [Source: scripts/portability/classify-skills.js](../../scripts/portability/classify-skills.js) — arg parser pattern to copy
- [Source: scripts/portability/templates/canonical-format.md](../../scripts/portability/templates/canonical-format.md) — per-skill output structure spec
- [Source: scripts/portability/templates/readme-template.md](../../scripts/portability/templates/readme-template.md) — stub README source of truth
- [Source: scripts/update/lib/utils.js](../../scripts/update/lib/utils.js) — `findProjectRoot()`
- [Source: package.json](../../package.json) — `bin` registry, Node 18+ engines requirement

## Out of Scope

- **Full per-skill README generation** — sp-3-2's job. sp-2-3 produces a stub only.
- **Catalog README generation** — sp-3-1's job (decision-tree by intent).
- **Tier 2 export** — sp-5-1's job. sp-2-3 explicitly rejects `--tier 2` with exit code 3.
- **Platform adapters** (Copilot, Cursor, Windsurf) — sp-5-2's job. sp-2-3 only writes the canonical Claude Code-compatible directory structure.
- **`--skip-existing` / incremental mode** — reserved for a future story if sp-2-4 needs it. The reporter format already includes a `⏭️` skip line for forward compatibility, but no flag triggers it in sp-2-3.
- **`--verbose` / `--quiet` flags** — single output verbosity level for sp-2-3. If sp-2-4 needs richer output (e.g., progress bars for long batches), add it then.
- **Running the actual full Tier 1 batch** — that's sp-2-4. sp-2-3 only proves the CLI works on Carson + Winston via tests; sp-2-4 will exercise it on all 60 standalone skills and grep-verify them.
- **Adding `exported-skills/` to `.gitignore`** — defer to sp-2-4 when actual exports start landing. sp-2-3's tests use tmpdirs, not the default path.

## Dev Agent Record

### Agent Model Used

claude-opus-4-6[1m]

### Debug Log References

### Completion Notes List

### File List
