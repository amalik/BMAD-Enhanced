# Story 4.0: Update npm Package Name & Repo URL to convoke-agents

Status: done

## Story

As a maintainer,
I want the npm package name and GitHub repo URL updated from `convoke` to `convoke-agents` throughout the codebase,
So that the package can be published to npm under an available name.

## Acceptance Criteria

1. **Given** `package.json`
   **When** the name field is updated
   **Then** `name` is `convoke-agents`
   **And** the `convoke` keyword is replaced with `convoke-agents` (keep `bmad-enhanced` keyword for discoverability)
   **And** `repository.url` points to `github.com/amalik/convoke-agents`
   **And** `bugs.url` points to `github.com/amalik/convoke-agents/issues`
   **And** `homepage` is added pointing to `github.com/amalik/convoke-agents#readme`
   **And** `package-lock.json` is regenerated via `npm install --package-lock-only`

2. **Given** all documentation files outside `_bmad-output/`
   **When** the rename is applied
   **Then** all `npm install convoke` commands become `npm install convoke-agents`
   **And** all `npmjs.com/package/convoke` URLs become `npmjs.com/package/convoke-agents`
   **And** all `npx -p convoke@` become `npx -p convoke-agents@`
   **And** all `convoke@latest` / `convoke@alpha` / `convoke@1.x.x` become `convoke-agents@...`
   **And** all `github.com/amalik/convoke` URLs become `github.com/amalik/convoke-agents`
   **And** all `convoke.git` become `convoke-agents.git`
   **And** all badge URLs (`fury.io/js/convoke`, `npm/dm/convoke`) become `convoke-agents`
   **And** display name "Convoke" is NOT affected
   **And** CLI commands `convoke-*` are NOT affected

3. **Given** `scripts/update/lib/migration-runner.js`
   **When** the rename is applied
   **Then** the GitHub issues URL in the error message references `convoke-agents`

4. **Given** 7 workflow validate files in `_bmad/bme/_vortex/workflows/*/validate.md`
   **When** the rename is applied
   **Then** the GitHub issues URL references `convoke-agents`

5. **Given** all `_bmad-output/` historical documentation
   **When** the rename is applied
   **Then** all `install convoke`, `package/convoke`, `convoke@`, `github.com/amalik/convoke`, `convoke.git` patterns are updated to `convoke-agents`
   **And** display name "Convoke" is NOT affected
   **And** CLI commands `convoke-*` are NOT affected

6. **Given** `docs-audit.js`
   **When** the stale-ref comment is reviewed
   **Then** the comment at L407 is updated to reference `convoke-agents` as the expected package name

7. **Given** all changes
   **When** verification is run
   **Then** `npm test` passes with zero failures
   **And** `npm run docs:audit` returns zero findings
   **And** comprehensive grep for bare `convoke` in package/URL contexts returns zero matches (excluding display name "Convoke" and CLI `convoke-*` commands)

## Tasks / Subtasks

- [x] Task 1: Update `package.json` (AC: #1)
  - [x] 1.1: Change `name` from `"convoke"` to `"convoke-agents"`
  - [x] 1.2: Change keyword `"convoke"` to `"convoke-agents"` in keywords array
  - [x] 1.3: Update `repository.url` to `git+https://github.com/amalik/convoke-agents.git`
  - [x] 1.4: Update `bugs.url` to `https://github.com/amalik/convoke-agents/issues`
  - [x] 1.5: Add `homepage` field: `https://github.com/amalik/convoke-agents#readme`
  - [x] 1.6: Run `npm install --package-lock-only` to regenerate `package-lock.json`

- [x] Task 2: Update code files (AC: #3, #4, #6)
  - [x] 2.1: `scripts/update/lib/migration-runner.js` — update GitHub issues URL
  - [x] 2.2: 7 workflow `validate.md` files — update GitHub issues URLs
  - [x] 2.3: `scripts/docs-audit.js` L407 — update comment to reference `convoke-agents`
  - [x] 2.4: `scripts/update/convoke-update.js` — update 2 `npx -p convoke@` refs + 1 `install convoke@` ref (3 total)
  - [x] 2.5: `scripts/update/convoke-version.js` — update `npx -p convoke@` refs

- [x] Task 3: Update documentation files (AC: #2)
  - [x] 3.1: Apply sed pipeline to 14 documentation files (README, INSTALLATION, UPDATE-GUIDE, CHANGELOG, BMAD-METHOD-COMPATIBILITY, PUBLISHING-GUIDE, scripts/README, release notes ×4, CREATE-RELEASE-GUIDE, CREATE-v1.0.3-RELEASE, TEST-PLAN-REAL-INSTALL, CLEANUP-SUMMARY)
  - [x] 3.2: Update `create-github-release.sh` — repo URL
  - [x] 3.3: Grep verify all docs — zero bare `convoke` in package/URL contexts

- [x] Task 4: Update `_bmad-output/` historical docs (AC: #5)
  - [x] 4.1: Apply sed pipeline to ~23 non-backup files with stale refs
  - [x] 4.2: Apply sed pipeline to ~21 `.backups/` files with stale refs
  - [x] 4.3: Grep verify — zero bare `convoke` in package/URL contexts

- [x] Task 5: Verification (AC: #7)
  - [x] 5.1: Run `npm test` — all pass (315/315)
  - [x] 5.2: Run `npm run docs:audit` — zero findings
  - [x] 5.3: Grep audit for stale bare `convoke` in package/URL contexts — zero matches
  - [x] 5.4: Verify display name "Convoke" and CLI commands `convoke-*` are untouched

## Dev Notes

### Critical Context

**Course correction story.** The `convoke` npm package name was already taken. This story changes the npm package name and GitHub repo URL from `convoke` to `convoke-agents` throughout the codebase. The product display name "Convoke" and CLI commands `convoke-*` are NOT affected.

**Origin:** Sprint change proposal `_bmad-output/planning-artifacts/sprint-change-proposal-2026-03-07.md`

### Replacement Patterns

**CRITICAL: These replacements target PACKAGE NAME and URL contexts only.**

The sed pipeline must be carefully ordered to avoid colliding with CLI commands (`convoke-install`, `convoke-update`, etc.) which contain the substring `convoke`.

**Safe replacement approach — use FULL CONTEXT patterns:**

```
# GitHub URLs (most specific first)
s|github.com/amalik/convoke/|github.com/amalik/convoke-agents/|g
s|github.com/amalik/convoke\.git|github.com/amalik/convoke-agents.git|g
s|github.com/amalik/convoke"|github.com/amalik/convoke-agents"|g
s|github.com/amalik/convoke)|github.com/amalik/convoke-agents)|g
s|github.com/amalik/convoke$|github.com/amalik/convoke-agents|g

# npm package URLs
s|npmjs.com/package/convoke|npmjs.com/package/convoke-agents|g
s|fury.io/js/convoke|fury.io/js/convoke-agents|g
s|npm/dm/convoke|npm/dm/convoke-agents|g

# Install commands (followed by @ or space or end-of-line, NOT by -)
s|install convoke@|install convoke-agents@|g
s|install convoke |install convoke-agents |g
s|install convoke$|install convoke-agents|g
s|install convoke`|install convoke-agents`|g

# npx invocations
s|npx convoke@|npx convoke-agents@|g
s|-p convoke@|-p convoke-agents@|g

# .git suffix
s|convoke\.git|convoke-agents.git|g
```

**WARNING:** Do NOT use a bare `s|convoke|convoke-agents|g` — this would corrupt ALL CLI commands (`convoke-install-vortex` → `convoke-agents-install-vortex`).

### package.json — Manual Edit, Not Sed

The `package.json` changes should be done with the Edit tool, not sed:
- `"name": "convoke"` → `"name": "convoke-agents"`
- `"convoke"` keyword → `"convoke-agents"` keyword
- `repository.url`, `bugs.url`, `homepage` — full URL updates

### Files by Category

**Code files (5):**
- `scripts/update/lib/migration-runner.js` (1 GitHub issues URL)
- `scripts/update/convoke-update.js` (2 npx refs)
- `scripts/update/convoke-version.js` (2 npx refs)
- `scripts/docs-audit.js` (1 comment)
- 7 × `_bmad/bme/_vortex/workflows/*/validate.md` (1 GitHub issues URL each)

**Primary docs (6):**
- `README.md`, `INSTALLATION.md`, `UPDATE-GUIDE.md`, `CHANGELOG.md`, `BMAD-METHOD-COMPATIBILITY.md`, `PUBLISHING-GUIDE.md`

**Secondary/misc docs (9):**
- `scripts/README.md`, `create-github-release.sh`
- `RELEASE-NOTES-v1.0.3-alpha.md`, `release-notes-v1.1.1.md`, `release-notes-v1.1.2.md`, `release-notes-v1.6.0.md`
- `CREATE-RELEASE-GUIDE.md`, `CREATE-v1.0.3-RELEASE.md`, `TEST-PLAN-REAL-INSTALL.md`, `CLEANUP-SUMMARY.md`

**`_bmad-output/` (23 non-backup + ~21 backup):**
- See full file list from grep audit in sprint change proposal

### What Does NOT Change

- Display name "Convoke" (capital C, product name)
- CLI commands: `convoke-install-vortex`, `convoke-install`, `convoke-update`, `convoke-version`, `convoke-migrate`, `convoke-doctor`
- `_bmad/` directory paths
- Agent IDs
- "BMAD Method" / "BMad Core" references
- `.claude/commands/bmad-*` skill files
- Test files (0 bare package-name refs found)

### Previous Story Intelligence

**From Epic 3 (Stories 3.2, 3.3):**
- Sed pipeline with ordered patterns is proven for bulk replacement
- Replacement ordering rule: longer/more-specific patterns FIRST
- Post-replace URL audit after any replace
- `git diff` review for bulk changes (>10 files) — recommended per Epic 3 retro
- `_bmad-output/.backups/` contains duplicate copies — include in pipeline

**From Epic 3 Retrospective:**
- PSI compounding across 5 consecutive epics
- `_bmad-enhanced/` directory path false positive category — analogous risk here: `convoke-install` etc. could be corrupted by a naive `convoke` → `convoke-agents` replacement
- Grep verification as reliable quality gate — continue pattern

**CRITICAL PSI from Story 3.3:**
- Do NOT use bare substring replacement. The `convoke` substring appears in ALL CLI commands. Only replace in package/URL contexts where the full context pattern is unambiguous.

### References

- [Source: _bmad-output/planning-artifacts/epics-phase3.md#Story 4.0, lines 477-499]
- [Source: _bmad-output/planning-artifacts/sprint-change-proposal-2026-03-07.md — Full impact analysis]
- [Source: _bmad-output/implementation-artifacts/p3-epic-3-retro-2026-03-07.md — PSI, sed pipeline patterns]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None

### Completion Notes List

- Task 1: Updated package.json — name, keyword, repository.url, bugs.url, added homepage field. Regenerated package-lock.json.
- Task 2: Updated 12 code files — migration-runner.js (1 URL), 7 validate.md files (1 URL each), docs-audit.js (1 comment), convoke-update.js (3 refs), convoke-version.js (2 refs).
- Task 3: Applied context-aware sed pipeline to 15 documentation files. Two-pass approach needed: first pass for URL/install/npx patterns, second pass for version-qualified refs (convoke@alpha, convoke@latest). Fixed corrupted version strings where `convoke@[0-9]` sed pattern ate leading digit.
- Task 4: Applied sed pipeline to 41 _bmad-output files (20 non-backup + 21 backup validate.md files). Fixed double-replacement corruption in sprint-change-proposal and epics-phase3 where "before → after" mapping text had the "before" side wrongly replaced.
- Task 5: All verification passes — 315/315 tests, zero docs:audit findings, zero stale grep matches, display name "Convoke" intact (785 refs), all 6 CLI commands intact.

### Change Log

- 2026-03-07: Story 4.0 implemented — npm package name and repo URL updated from convoke to convoke-agents across entire codebase
- 2026-03-07: Code review fixes — H1: Fixed migration preview text in 1.7.x-to-2.0.0.js (convoke → convoke-agents). M2: Added sprint-status.yaml and migration file to File List.

### File List

**Modified:**
- package.json
- package-lock.json
- scripts/update/lib/migration-runner.js
- scripts/update/migrations/1.7.x-to-2.0.0.js
- scripts/docs-audit.js
- scripts/update/convoke-update.js
- scripts/update/convoke-version.js
- _bmad/bme/_vortex/workflows/proof-of-concept/validate.md
- _bmad/bme/_vortex/workflows/mvp/validate.md
- _bmad/bme/_vortex/workflows/proof-of-value/validate.md
- _bmad/bme/_vortex/workflows/lean-experiment/validate.md
- _bmad/bme/_vortex/workflows/product-vision/validate.md
- _bmad/bme/_vortex/workflows/lean-persona/validate.md
- _bmad/bme/_vortex/workflows/contextualize-scope/validate.md
- README.md
- INSTALLATION.md
- UPDATE-GUIDE.md
- CHANGELOG.md
- BMAD-METHOD-COMPATIBILITY.md
- PUBLISHING-GUIDE.md
- RELEASE-NOTES-v1.0.3-alpha.md
- release-notes-v1.1.1.md
- release-notes-v1.1.2.md
- release-notes-v1.6.0.md
- CREATE-RELEASE-GUIDE.md
- CREATE-v1.0.3-RELEASE.md
- TEST-PLAN-REAL-INSTALL.md
- CLEANUP-SUMMARY.md
- create-github-release.sh
- _bmad-output/rayas-journey-acceptance-test.md
- _bmad-output/planning-artifacts/prd-phase2.md
- _bmad-output/planning-artifacts/sprint-change-proposal-2026-03-07.md
- _bmad-output/planning-artifacts/epics-phase3.md
- _bmad-output/planning-artifacts/distribution-strategy.md
- _bmad-output/implementation-artifacts/p2-6-3-scripted-end-to-end-rayas-journey-acceptance-test.md
- _bmad-output/implementation-artifacts/p3-1-1-rename-package-identity-cli-commands.md
- _bmad-output/implementation-artifacts/p3-1-2-rename-script-files-update-internal-strings.md
- _bmad-output/implementation-artifacts/p3-1-3-update-entry-point-installer-scripts.md
- _bmad-output/implementation-artifacts/p3-1-4-update-library-modules.md
- _bmad-output/implementation-artifacts/p3-2-1-overhaul-readme.md
- _bmad-output/implementation-artifacts/p3-2-2-update-primary-documentation-files.md
- _bmad-output/implementation-artifacts/p3-2-3-update-secondary-docs-user-guides-shipped-content.md
- _bmad-output/implementation-artifacts/p3-3-2-update-miscellaneous-top-level-files.md
- _bmad-output/implementation-artifacts/p3-3-3-update-historical-documentation-bmad-output.md
- _bmad-output/implementation-artifacts/p3-epic-3-retro-2026-03-07.md
- _bmad-output/project-documentation/INSTALLATION-SYSTEM-SUMMARY.md
- _bmad-output/project-documentation/PUBLICATION-SUCCESS-v1.0.3-alpha.md
- _bmad-output/project-documentation/RELEASE-NOTES-v1.0.2-alpha.md
- _bmad-output/project-documentation/PREREQUISITE-CHECK-UPDATE.md
- _bmad-output/project-documentation/TEST-RESULTS-v1.0.3-alpha.md
- _bmad-output/project-documentation/PUBLISHING-COMPLETE.md
- _bmad-output/implementation-artifacts/sprint-status.yaml
- _bmad-output/.backups/backup-1.5.2-*/workflows/*/validate.md (21 files)
