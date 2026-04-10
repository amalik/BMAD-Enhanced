# Story SP-3.2: Per-Skill README Generation

Status: done

## Story

As a consultant browsing the catalog,
I want each skill folder to have a clean, polished README explaining what it does and how to install it across platforms,
so that I can evaluate and adopt a skill without reading the full instructions file.

## Acceptance Criteria

1. The per-skill `README.md` produced by `convoke-export` is upgraded from the current sp-2-3 stub to a polished, end-user-facing document. The upgrade is implemented by modifying `buildReadmeStub()` in `scripts/portability/convoke-export.js` (rename to `buildReadme()` — it's no longer a stub). The readme-template.md in `scripts/portability/templates/` is updated to match.

2. **HTML comments are stripped** from the final README output. The template file retains HTML comments as developer documentation (they explain what each section is for), but the `buildReadme()` function strips all `<!-- ... -->` blocks before writing. This removes ~15 lines of development noise and brings the README under 60 lines for most skills. The template remains the source-of-truth for the README structure; the output is the clean user-facing version.

3. **Per-platform install instructions** are included in the "How to use it" section. For sp-3-2, three platforms are documented (Claude Code was already present from sp-2-3; Copilot and Cursor are new):

   **Claude Code** (existing, no change):
   ```
   Copy this directory into your project's `.claude/skills/<skill-name>/` folder:
   ```bash
   cp -r <skill-name>/ .claude/skills/<skill-name>/
   ```

   **GitHub Copilot** (new):
   ```
   Append the contents of `instructions.md` to your project's `.github/copilot-instructions.md` file.
   ```

   **Cursor** (new):
   ```
   Copy `instructions.md` into your project's `.cursor/rules/` directory as `<skill-name>.md`.
   ```

   Each platform section is 2-3 lines (heading + one instruction line + optional command). The Copilot and Cursor instructions are minimal — sp-5-2 (Platform Adapter Generation) will add richer adapter wrappers later. sp-3-2 only documents the copy-paste path.

4. **The README is under 80 lines** (concise, not exhaustive). With HTML comments stripped and the 3-platform install section, the target is 50-65 lines for a typical standalone skill. The 80-line cap is a hard constraint verified by Test 3.

5. **The "What it produces" section** is cleaned up: any `[your output folder]` or `[your context]` placeholders that leaked from the engine's Phase 6 catch-all are replaced with the more readable `your-output-folder` (no brackets, no "your context" generic). This is a post-processing step in `buildReadme()` applied after the engine's section text is extracted.

6. **The "Who is <persona name>?" section** includes a communication style summary. For named personas (Strategies 1-2b), this comes from `persona.communicationStyle`. For workflow-derived personas (Strategy 5), the fallback chain `communicationStyle → identity → 'See instructions.md for details.'` already handles this (implemented in sp-2-3). No change needed — just verify it works for all 44 exported skills.

7. **The template file** (`scripts/portability/templates/readme-template.md`) is updated to include the Copilot and Cursor sections (with HTML comments explaining they're minimal for sp-3-2). The `<!-- TODO sp-5-2: ... -->` comments are replaced with the actual minimal content.

8. **A test file at `tests/lib/portability-per-skill-readme.test.js`** adds at least 5 tests:
   - **Test 1: README under 80 lines for Carson.** Export `bmad-brainstorming`, count lines in README.md. Assert <= 80.
   - **Test 2: no HTML comments in output.** Assert README contains zero `<!--` strings.
   - **Test 3: all 3 platform sections present.** Assert README contains `Claude Code`, `Copilot`, and `Cursor` (or `cursor`).
   - **Test 4: no `[your output folder]` or `[your context]` placeholders.** Assert README does NOT contain `[your output folder]` or `[your context]`.
   - **Test 5: batch README validity across all exports.** Run `--tier 1 --output <tmpdir>`, for each README assert: under 80 lines, zero `<!--`, contains all 3 platform names. Use the shared `beforeAll` batch pattern from sp-2-4.

9. **The `buildReadme()` function remains in `convoke-export.js`** (not moved to `export-engine.js`). The engine is pure-transform on instructions.md; the README is a CLI concern. This preserves the sp-2-2/sp-2-3 architecture boundary.

## Tasks / Subtasks

- [x] Task 1: Update readme-template.md with Copilot + Cursor sections (AC: #3, #7)
  - [ ] Replace the `<!-- TODO sp-5-2: GitHub Copilot install instructions go here -->` comment with actual Copilot instructions (2-3 lines)
  - [ ] Replace the `<!-- TODO sp-5-2: Cursor install instructions go here -->` comment with actual Cursor instructions (2-3 lines)
  - [ ] Remove the `<!-- TODO sp-5-2: Windsurf, Aider, etc. go here -->` comment (defer to sp-5-2)
  - [ ] Keep HTML comments that document the template structure (they'll be stripped by buildReadme)

- [x] Task 2: Upgrade `buildReadmeStub()` → `buildReadme()` in convoke-export.js (AC: #1, #2, #4, #5)
  - [ ] Rename `buildReadmeStub` → `buildReadme` (update all call sites — there's only one in `runSingle`)
  - [ ] After all placeholder substitutions, strip HTML comments: `out = out.replace(/<!--[\s\S]*?-->/g, '')`
  - [ ] After HTML comment stripping, clean up `[your output folder]` → `your-output-folder` and `[your context]` → `your-project-context` (simple replaceAll)
  - [ ] After cleanup, collapse multiple blank lines: `out = out.replace(/\n{3,}/g, '\n\n').trim() + '\n'`
  - [ ] Update the placeholder sanity check to run BEFORE HTML comment stripping (it needs to see all placeholders), then strip comments after

- [x] Task 3: Verify all 44 exported READMEs are under 80 lines (AC: #4, #6)
  - [ ] Run `convoke-export --tier 1 --output <tmpdir>` and count lines per README
  - [ ] Any README over 80 lines needs investigation (likely a skill with an unusually long description or persona section)
  - [ ] Verify "Who is X?" section is populated for all 44 skills

- [x] Task 4: Write tests (AC: #8)
  - [ ] Create `tests/lib/portability-per-skill-readme.test.js`
  - [ ] Use `child_process.spawnSync` for single-skill tests (Tests 1-4)
  - [ ] Use `beforeAll` batch pattern for Test 5 (shared with sp-2-4)
  - [ ] All 5 tests from AC #8 implemented

- [x] Task 5: Run regression suite + verify (AC: #1-9)
  - [ ] `npx jest tests/lib/portability` — all portability tests pass (58 existing + 5 new = 63 minimum)
  - [ ] Verify existing sp-2-3 Test 9 (README stub validity) still passes — the placeholder regex was tightened in sp-2-3's P5 patch; confirm it doesn't false-match the new Copilot/Cursor content
  - [ ] `node scripts/convoke-doctor.js` — same baseline

## Dev Notes

### Architecture Compliance (CRITICAL)

- **`buildReadme()` stays in `convoke-export.js`** — the engine produces instructions.md; the CLI produces README.md. This is the sp-2-2/sp-2-3 boundary.
- **The template file is the structure source-of-truth.** `buildReadme()` reads it, substitutes placeholders, strips comments. Do NOT inline the template structure in the function.
- **No new npm dependencies.** Only string operations on the existing template output.
- **CommonJS.** Match existing convention.

### What changes vs. the sp-2-3 stub

| Aspect | sp-2-3 stub | sp-3-2 full |
|---|---|---|
| HTML comments | Present (15+ lines of dev docs) | Stripped |
| Platform installs | Claude Code only | Claude Code + Copilot + Cursor |
| `[your output folder]` | Leaked from engine Phase 6 | Cleaned to `your-output-folder` |
| Line count | ~70 lines (with comments) | ~50-60 lines (without) |
| Naming | `buildReadmeStub()` | `buildReadme()` |

### Why minimal Copilot + Cursor instructions

The epic AC says "per-platform install instructions (Claude Code: copy to `.claude/skills/`, Copilot: copy to `.github/`, Cursor: copy to `.cursor/rules/`)". These are copy-paste instructions — one line each. sp-5-2 (Platform Adapter Generation) will generate actual adapter wrappers with proper frontmatter/format per platform. sp-3-2 only documents the simplest path: "copy the file to this location."

### `[your output folder]` cleanup

The engine's Phase 6 catch-all replaces unmapped `{var}` with `[your context]`. Some vars like `{output_folder}` are mapped to `[your output folder]`. Both of these leak into the "What it produces" section because the engine processes the full instructions.md content, and the README extracts the `whatYouProduce` section from it. The cleanup in `buildReadme()` is a simple post-processing step — not an engine change.

### Previous Story Intelligence (sp-3-1)

- sp-3-1 catalog links assume `./skill-name/` directory structure with README.md inside. sp-3-2's output must produce a valid README at that path.
- The catalog's description truncation (first sentence) is independent of the README's full description. The README keeps the full manifest description.
- `resolvePersonaSummary()` extracted in sp-3-1 is not needed here — `buildReadme()` already receives the full `result.persona` from `exportSkill()`.

### Handling READMEs that exceed 80 lines

Some workflow-derived skills may have long descriptions or multi-paragraph identity text from `## Overview` that push the README over 80 lines after all substitutions. If this happens during Task 3 verification, truncate the offending field in `buildReadme()` — cap the description at first sentence (reuse the `truncateDescription` pattern from sp-3-1's catalog generator: truncate at `. ` or 120 chars). Do NOT fail the batch or remove content wholesale. Test 5 should log which skill(s) exceed the cap and by how many lines to make diagnosis easy.

### Test 5 batch performance

Test 5 runs the full `--tier 1` batch. Use `beforeAll` + `afterAll` (not `afterEach`) to avoid running 44 exports 5 times. This is the same pattern sp-2-4 established.

### References

- [Source: epics-skill-portability.md#Story 3.2](../planning-artifacts/epics-skill-portability.md) — original AC
- [Source: scripts/portability/convoke-export.js](../../scripts/portability/convoke-export.js) — `buildReadmeStub()`, `runSingle()`, `loadReadmeTemplate()`
- [Source: scripts/portability/templates/readme-template.md](../../scripts/portability/templates/readme-template.md) — current template with TODO comments
- [Source: sp-2-3-cli-entry-point.md](sp-2-3-cli-entry-point.md) — stub README design, placeholder sanity check
- [Source: sp-2-4-export-all-tier-1-skills.md](sp-2-4-export-all-tier-1-skills.md) — batch test pattern, 44 skill verification

## Out of Scope

- **Platform adapter wrappers** (frontmatter, format conversion) — sp-5-2's job. sp-3-2 only documents the copy-paste path.
- **Rich per-skill README content** (screenshots, examples, FAQ) — out of scope for all current epics.
- **Automatic README regeneration** — sp-4-2 or CI story.
- **Windsurf, Aider, or other platform instructions** — defer to sp-5-2.
- **Changing the engine's Phase 6 catch-all behavior** — sp-3-2 cleans up the output in `buildReadme()`, not in the engine. The engine is not touched.

## Dev Agent Record

### Agent Model Used

claude-opus-4-6[1m]

### Debug Log References

### Completion Notes List

- **Task 1 — Template update:** Replaced 3 `<!-- TODO sp-5-2 -->` comments with actual Copilot + Cursor install sections (2-3 lines each). Kept structural HTML comments for dev documentation (stripped by `buildReadme()`).
- **Task 2 — `buildReadme()` upgrade:** Renamed from `buildReadmeStub`. Added 3 post-processing steps after placeholder substitution: (1) sanity check on placeholders BEFORE stripping comments, (2) strip all `<!-- ... -->` HTML comments, (3) clean `[your output folder]` → `your-output-folder` and `[your context]` → `your-project-context`, (4) collapse whitespace.
- **Task 3 — Batch verification:** All 44 READMEs are 48 lines (well under 80-line cap). Zero HTML comments in any output. All 3 platform sections present in every README.
- **Regression:** 63/63 portability tests pass (58 prior + 5 new). sp-2-3 Test 9 (README placeholder check) still passes — the Copilot/Cursor content doesn't trigger the multi-word placeholder regex. Doctor: 2 pre-existing issues.

### File List

**Modified:**
- `scripts/portability/templates/readme-template.md` — Copilot + Cursor sections replace TODO comments
- `scripts/portability/convoke-export.js` — `buildReadmeStub()` → `buildReadme()`, HTML comment stripping, placeholder cleanup, whitespace collapse

**New:**
- `tests/lib/portability-per-skill-readme.test.js` — 5 tests (single-skill + batch validation)
