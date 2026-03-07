# Story 4.0: Update npm Package Name & Repo URL to convoke-agents

Status: ready-for-dev

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
   **And** `homepage` points to `github.com/amalik/convoke-agents#readme`
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

- [ ] Task 1: Update `package.json` (AC: #1)
  - [ ] 1.1: Change `name` from `"convoke"` to `"convoke-agents"`
  - [ ] 1.2: Change keyword `"convoke"` to `"convoke-agents"` in keywords array
  - [ ] 1.3: Update `repository.url` to `git+https://github.com/amalik/convoke-agents.git`
  - [ ] 1.4: Update `bugs.url` to `https://github.com/amalik/convoke-agents/issues`
  - [ ] 1.5: Update `homepage` to `https://github.com/amalik/convoke-agents#readme`
  - [ ] 1.6: Run `npm install --package-lock-only` to regenerate `package-lock.json`

- [ ] Task 2: Update code files (AC: #3, #4, #6)
  - [ ] 2.1: `scripts/update/lib/migration-runner.js` — update GitHub issues URL
  - [ ] 2.2: 7 workflow `validate.md` files — update GitHub issues URLs
  - [ ] 2.3: `scripts/docs-audit.js` L407 — update comment to reference `convoke-agents`
  - [ ] 2.4: `scripts/update/convoke-update.js` — update `npx -p convoke@` refs
  - [ ] 2.5: `scripts/update/convoke-version.js` — update `npx -p convoke@` refs

- [ ] Task 3: Update documentation files (AC: #2)
  - [ ] 3.1: Apply sed pipeline to 14 documentation files (README, INSTALLATION, UPDATE-GUIDE, CHANGELOG, BMAD-METHOD-COMPATIBILITY, PUBLISHING-GUIDE, scripts/README, release notes ×4, CREATE-RELEASE-GUIDE, CREATE-v1.0.3-RELEASE, TEST-PLAN-REAL-INSTALL, CLEANUP-SUMMARY)
  - [ ] 3.2: Update `create-github-release.sh` — repo URL
  - [ ] 3.3: Grep verify all docs — zero bare `convoke` in package/URL contexts

- [ ] Task 4: Update `_bmad-output/` historical docs (AC: #5)
  - [ ] 4.1: Apply sed pipeline to ~23 non-backup files with stale refs
  - [ ] 4.2: Apply sed pipeline to ~21 `.backups/` files with stale refs
  - [ ] 4.3: Grep verify — zero bare `convoke` in package/URL contexts

- [ ] Task 5: Verification (AC: #7)
  - [ ] 5.1: Run `npm test` — all pass
  - [ ] 5.2: Run `npm run docs:audit` — zero findings
  - [ ] 5.3: Grep audit for stale bare `convoke` in package/URL contexts — zero matches
  - [ ] 5.4: Verify display name "Convoke" and CLI commands `convoke-*` are untouched

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

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
