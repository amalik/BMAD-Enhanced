# Story SP-5.2: Platform Adapter Generation

Status: done

## Story

As a consultant using GitHub Copilot or Cursor,
I want platform-specific wrappers for each exported skill,
so that I can use the skill in my preferred AI tool with the correct file format and location.

## Acceptance Criteria

1. An **adapter generator script** exists at `scripts/portability/generate-adapters.js` (CommonJS, executable) that reads an exported skill's `instructions.md` and produces per-platform adapter files in an `adapters/` subdirectory within each skill's export directory. The script is integrated into the export pipeline — it runs automatically when `convoke-export` writes a skill (not as a separate CLI).

2. **Claude Code adapter:** produces `adapters/claude-code/SKILL.md` containing:
   - YAML frontmatter with `name` (skill manifest name) and `description` (manifest description, first sentence)
   - A blank line after frontmatter
   - The full `instructions.md` content as the body
   - Total wrapper overhead: ~5 lines of frontmatter + the canonical content
   This is the format used by `.claude/skills/<name>/SKILL.md` files.

3. **GitHub Copilot adapter:** produces `adapters/copilot/copilot-instructions.md` containing:
   - A header comment: `<!-- Skill: <skill-display-name> — append to .github/copilot-instructions.md -->`
   - The full `instructions.md` content
   - Total wrapper: 1 line header + content
   Copilot reads `.github/copilot-instructions.md` as plain markdown with no frontmatter.

4. **Cursor adapter:** produces `adapters/cursor/<skill-name>.md` containing:
   - The full `instructions.md` content (no wrapper needed — Cursor reads `.cursor/rules/*.md` as plain markdown)
   - Total wrapper: 0 lines (just the content, renamed file)
   Cursor is the simplest adapter — just a copy with the right filename.

5. **Each adapter is under 20 lines of wrapper** around the canonical content. This is the "thin adapter principle" — adapters add platform-specific metadata/formatting but do NOT modify the instructional content.

6. **The per-skill README "How to use" section** is updated to link to the adapter directories with per-platform install instructions that reference the adapter files:
   - Claude Code: `cp adapters/claude-code/SKILL.md .claude/skills/<name>/SKILL.md`
   - Copilot: `cat adapters/copilot/copilot-instructions.md >> .github/copilot-instructions.md`
   - Cursor: `cp adapters/cursor/<name>.md .cursor/rules/<name>.md`
   This replaces the current generic copy instructions in the readme-template.md.

7. **The adapter generation is wired into `convoke-export.js`'s `runSingle()` function.** After writing `instructions.md` and `README.md`, the CLI calls `generateAdapters(skillName, skillRow, instructionsContent, outputDir)`. No separate CLI command — adapters are always generated alongside the export. `--dry-run` skips adapter generation (same as it skips file writes).

8. **A test file at `tests/lib/portability-adapters.test.js`** adds at least 5 tests:
   - **Test 1: Claude Code adapter has frontmatter.** Export Carson, assert `adapters/claude-code/SKILL.md` exists, starts with `---`, contains `name: bmad-brainstorming`.
   - **Test 2: Copilot adapter has header comment.** Assert `adapters/copilot/copilot-instructions.md` exists, first line is an HTML comment containing the skill name.
   - **Test 3: Cursor adapter is plain content.** Assert `adapters/cursor/bmad-brainstorming.md` exists, content matches `instructions.md` (byte-for-byte — no wrapper).
   - **Test 4: all adapters under 20 lines of wrapper.** For each adapter, count lines that differ from `instructions.md`. Assert diff <= 20 lines.
   - **Test 5: batch — all exported skills have adapters.** Run `--tier 1 --output <tmpdir>`, for each skill dir assert `adapters/claude-code/SKILL.md`, `adapters/copilot/copilot-instructions.md`, and `adapters/cursor/<name>.md` all exist.

9. **The README template** (`scripts/portability/templates/readme-template.md`) is updated: the "How to use it" section now references adapter files with explicit `cp`/`cat` commands pointing to `adapters/<platform>/` paths.

## Tasks / Subtasks

- [x] Task 1: Create adapter generator module (AC: #1, #2, #3, #4, #5)
  - [ ] Create `scripts/portability/generate-adapters.js` (CommonJS)
  - [ ] Export `generateAdapters(skillName, skillRow, instructionsContent, skillOutputDir)`
  - [ ] Claude Code: write `adapters/claude-code/SKILL.md` with YAML frontmatter
  - [ ] Copilot: write `adapters/copilot/copilot-instructions.md` with HTML comment header
  - [ ] Cursor: write `adapters/cursor/<skill-name>.md` (plain copy of instructions.md)
  - [ ] All adapters: `fs.mkdirSync` the adapter subdirs with `{ recursive: true }`

- [x] Task 2: Wire into convoke-export.js (AC: #7)
  - [ ] In `runSingle()`, after writing `instructions.md` and `README.md`, call `generateAdapters()`
  - [ ] Guard with `if (!dryRun)` — same guard as file writes
  - [ ] Import `generateAdapters` from `./generate-adapters`

- [x] Task 3: Update readme-template.md (AC: #6, #9)
  - [ ] Replace the current Claude Code / Copilot / Cursor sections with adapter-based instructions
  - [ ] Claude Code: `cp adapters/claude-code/SKILL.md .claude/skills/<skill-name>/SKILL.md`
  - [ ] Copilot: `cat adapters/copilot/copilot-instructions.md >> .github/copilot-instructions.md`
  - [ ] Cursor: `cp adapters/cursor/<skill-name>.md .cursor/rules/<skill-name>.md`

- [x] Task 4: Write tests (AC: #8)
  - [ ] Create `tests/lib/portability-adapters.test.js`
  - [ ] Tests 1-4: single-skill export (Carson) + adapter validation
  - [ ] Test 5: batch export with `beforeAll` pattern, verify all skills have adapters
  - [ ] Use tmpdir + afterAll cleanup

- [x] Task 5: Run regression suite + verify (AC: #1-9)
  - [ ] `npx jest tests/lib/portability` — all tests pass (77 existing + 5 new = 82 minimum)
  - [ ] Verify existing README tests still pass (sp-3-2's Test 3 checks for platform names — ensure the new adapter-based instructions still contain "Claude Code", "Copilot", "Cursor")
  - [ ] `node scripts/convoke-doctor.js` — same baseline

## Dev Notes

### Architecture Compliance (CRITICAL)

- **Adapter generation is a CLI concern, not an engine concern.** The engine produces `instructions.md` content. The CLI writes files. Adapters are file-writing operations — they belong in the CLI layer.
- **`generate-adapters.js` is a module, not a standalone CLI.** It exports a function, not a `main()`. It's called from `convoke-export.js`'s `runSingle()`. No `#!/usr/bin/env node`, no arg parsing.
- **CommonJS.** Match existing convention.
- **No new npm dependencies.**
- **Thin adapter principle.** Each adapter adds ONLY platform-specific metadata/formatting. The instructional content is identical across all platforms — it's the canonical `instructions.md` from the engine.

### Platform format reference

| Platform | File | Location | Format |
|---|---|---|---|
| Claude Code | `SKILL.md` | `.claude/skills/<name>/` | YAML frontmatter (`name`, `description`) + markdown body |
| GitHub Copilot | `copilot-instructions.md` | `.github/` | Plain markdown, no frontmatter, single file (appended) |
| Cursor | `<name>.md` | `.cursor/rules/` | Plain markdown, no frontmatter, one file per skill |

### Why the adapter is the canonical content + wrapper, not a separate format

The vision doc's "thin adapter principle" means adapters are NOT reformatted content. They're the same `instructions.md` with platform-specific packaging:
- Claude Code needs frontmatter so Claude Code's skill loader picks it up
- Copilot needs no wrapper — just the content in the right file
- Cursor needs no wrapper — just the content with the right filename

This makes adapters trivially maintainable. When the engine's output changes, adapters update automatically because they embed the same content.

### Description truncation for Claude Code frontmatter

The Claude Code SKILL.md `description` field should be the first sentence of the manifest description (same truncation logic as the catalog generator's `truncateDescription`). Import it from `catalog-generator.js` or duplicate the 5-line function — dev's judgment call.

### seed-catalog-repo.js needs sp-5-3 update

The seed script (`scripts/portability/seed-catalog-repo.js`) calls `exportSkill()` + `buildReadme()` + `writeFileSync()` directly — it does NOT go through `runSingle()`. So adapter generation won't happen in the seed pipeline unless `generateAdapters()` is explicitly called there too. **This is sp-5-3's responsibility**, not sp-5-2's. sp-5-2 only wires adapters into `convoke-export.js`'s `runSingle()`. Flag this in sp-5-3's story spec.

### Previous Story Intelligence

- sp-3-2 added Copilot + Cursor sections to the readme-template.md. Those currently say "Append instructions.md to..." and "Copy instructions.md into...". sp-5-2 upgrades them to reference the adapter files specifically.
- sp-2-3's `buildReadme()` strips HTML comments from the final README. Any HTML comments in the updated template sections will be stripped — that's fine.
- The `_templateCache` in convoke-export.js persists across calls. If the template changes during a session, the cache serves stale content. This is acceptable — same caveat as sp-3-2.

### References

- [Source: epics-skill-portability.md#Story 5.2](../planning-artifacts/epics-skill-portability.md) — original AC
- [Source: scripts/portability/convoke-export.js](../../scripts/portability/convoke-export.js) — `runSingle()`, `buildReadme()`
- [Source: scripts/portability/templates/readme-template.md](../../scripts/portability/templates/readme-template.md) — current platform sections
- [Source: .claude/skills/bmad-brainstorming/SKILL.md](../../.claude/skills/bmad-brainstorming/SKILL.md) — Claude Code wrapper format reference

## Out of Scope

- **Windsurf, Aider, or other platform adapters** — add when demand exists.
- **Rich adapter content** (per-platform instruction modifications) — adapters are thin wrappers only.
- **Adapter-specific testing** (actually running skills in Copilot/Cursor) — structural validation only.
- **`--platform` flag** — the epic AC mentions `--platform all` but sp-5-2 always generates all 3 adapters. A `--platform` filter flag is unnecessary complexity for 3 trivial adapters. Defer if ever needed.

## Dev Agent Record

### Agent Model Used

claude-opus-4-6[1m]

### Debug Log References

### Completion Notes List

- **Task 1 — Adapter generator module:** Created `scripts/portability/generate-adapters.js` (~80 lines). Three adapters: Claude Code (YAML frontmatter with `name` + `description`), Copilot (HTML comment header), Cursor (plain copy). Description truncated to first sentence for frontmatter. Single quotes escaped for YAML safety.
- **Task 2 — CLI wiring:** Added `generateAdapters()` call in `runSingle()` after `writeFileSync(readmePath)`, inside the existing try/catch + `!dryRun` guard. One line of code.
- **Task 3 — Template update:** Replaced generic copy instructions with adapter-path-based `cp`/`cat` commands. Simplified from ~20 lines to ~12 lines.
- **Smoke test:** Carson exports with all 3 adapter dirs. SKILL.md has frontmatter, copilot has HTML comment header, cursor matches instructions.md byte-for-byte.
- **Regression:** 82/82 portability tests pass (77 prior + 5 new). sp-3-2 Test 3 (platform names) still passes — headings survive in the new template.

### File List

**New:**
- `scripts/portability/generate-adapters.js` (~80 lines, module)
- `tests/lib/portability-adapters.test.js` (5 tests, ~120 lines)

**Modified:**
- `scripts/portability/convoke-export.js` — import `generateAdapters`, call in `runSingle()`
- `scripts/portability/templates/readme-template.md` — adapter-based install instructions
