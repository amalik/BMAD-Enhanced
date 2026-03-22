# Story 1.2: Rename Script Files & Update Internal Strings

Status: done

## Story

As a maintainer,
I want all CLI-backing script files renamed from `bmad-*` to `convoke-*` with their internal strings updated,
So that the renamed `bin` entries in package.json resolve to correctly-branded scripts.

## Acceptance Criteria

1. **Given** `scripts/update/bmad-update.js`
   **When** the rename is applied
   **Then** the file is renamed to `scripts/update/convoke-update.js` with all internal product name strings and CLI command references updated

2. **Given** `scripts/update/bmad-version.js`
   **When** the rename is applied
   **Then** the file is renamed to `scripts/update/convoke-version.js` with all internal product name strings and CLI command references updated

3. **Given** `scripts/update/bmad-migrate.js`
   **When** the rename is applied
   **Then** the file is renamed to `scripts/update/convoke-migrate.js` with all internal product name strings and CLI command references updated

4. **Given** `scripts/bmad-doctor.js`
   **When** the rename is applied
   **Then** the file is renamed to `scripts/convoke-doctor.js` with all internal product name strings and CLI command references updated

5. **Given** the `bin` field in `package.json` (from Story 1.1)
   **When** the file renames are complete
   **Then** all 4 bin values are updated to point to the new file paths

6. **Given** any user-facing console output in these 4 files
   **When** the rename is applied
   **Then** all output references "Convoke" (not "BMAD-Enhanced") and `convoke-*` commands (not `bmad-*`)

7. **Given** JSDoc headers in each of the 4 files
   **When** the rename is applied
   **Then** all JSDoc headers reference "Convoke" instead of "BMAD-Enhanced"

8. **Given** the `package-lock.json` file
   **When** the bin path updates are complete
   **Then** `package-lock.json` is regenerated via `npm install --package-lock-only`

## Tasks / Subtasks

- [x] Task 1: Rename and update `bmad-update.js` → `convoke-update.js` (AC: #1, #6, #7)
  - [x] 1.1: Rename file `scripts/update/bmad-update.js` → `scripts/update/convoke-update.js`
  - [x] 1.2: Update JSDoc header: `BMAD-Enhanced Update CLI` → `Convoke Update CLI`
  - [x] 1.3: Update console banner: `BMAD-Enhanced Update Manager` → `Convoke Update Manager`
  - [x] 1.4: Update CLI command refs: `npx bmad-install-agents` → `npx convoke-install` (4 occurrences, lines 89, 97, 105, 113)
  - [x] 1.5: Update cached package refs: `npx -p bmad-enhanced@latest bmad-update` → `npx -p convoke-agents@latest convoke-update` (2 occurrences, lines 122, 134)
  - [x] 1.6: Update install ref: `npm install bmad-enhanced@latest` → `npm install convoke-agents@latest` (line 137)
- [x] Task 2: Rename and update `bmad-version.js` → `convoke-version.js` (AC: #2, #6, #7)
  - [x] 2.1: Rename file `scripts/update/bmad-version.js` → `scripts/update/convoke-version.js`
  - [x] 2.2: Update JSDoc header: `BMAD-Enhanced Version CLI` → `Convoke Version CLI`
  - [x] 2.3: Update console banner: `BMAD-Enhanced Version Information` → `Convoke Version Information`
  - [x] 2.4: Update CLI command refs: `npx bmad-install-agents` → `npx convoke-install` (4 occurrences, lines 28, 41, 53, 67)
  - [x] 2.5: Update cached package refs: `npx -p bmad-enhanced@latest bmad-update` → `npx -p convoke-agents@latest convoke-update` (2 occurrences, line 83-84)
- [x] Task 3: Rename and update `bmad-migrate.js` → `convoke-migrate.js` (AC: #3, #6, #7)
  - [x] 3.1: Rename file `scripts/update/bmad-migrate.js` → `scripts/update/convoke-migrate.js`
  - [x] 3.2: Update JSDoc header: `BMAD-Enhanced Migrate CLI` → `Convoke Migrate CLI`
  - [x] 3.3: Update CLI command refs: `npx bmad-migrate` → `npx convoke-migrate` (2 occurrences, lines 42, 155)
  - [x] 3.4: Update CLI command ref: `npx bmad-update` → `npx convoke-update` (1 occurrence, line 158)
- [x] Task 4: Rename and update `bmad-doctor.js` → `convoke-doctor.js` (AC: #4, #6, #7)
  - [x] 4.1: Rename file `scripts/bmad-doctor.js` → `scripts/convoke-doctor.js`
  - [x] 4.2: Update JSDoc header: `bmad-doctor — Diagnose common BMAD-Enhanced installation issues` → `convoke-doctor — Diagnose common Convoke installation issues`
  - [x] 4.3: Update console banner: `BMAD-Enhanced Doctor` → `Convoke Doctor`
  - [x] 4.4: Update CLI command refs: `npx bmad-install-agents` → `npx convoke-install` (6 occurrences, lines 69, 81, 94, 113, 153, 169)
  - [x] 4.5: Update CLI command refs: `npx bmad-install-vortex-agents` → `npx convoke-install-vortex` (2 occurrences, lines 127, 138)
  - [x] 4.6: Update CLI command refs: `npx bmad-update` → `npx convoke-update` (3 occurrences, lines 103, 182, 284)
  - [x] 4.7: Update "BMAD project" ref: `inside a BMAD project` → `inside a Convoke project` (line 69)
- [x] Task 5: Update package.json bin values to new file paths (AC: #5)
  - [x] 5.1: `convoke-update` value: `scripts/update/bmad-update.js` → `scripts/update/convoke-update.js`
  - [x] 5.2: `convoke-version` value: `scripts/update/bmad-version.js` → `scripts/update/convoke-version.js`
  - [x] 5.3: `convoke-migrate` value: `scripts/update/bmad-migrate.js` → `scripts/update/convoke-migrate.js`
  - [x] 5.4: `convoke-doctor` value: `scripts/bmad-doctor.js` → `scripts/convoke-doctor.js`
- [x] Task 6: Regenerate package-lock.json (AC: #8)
  - [x] 6.1: Run `npm install --package-lock-only` to regenerate
  - [x] 6.2: Verify bin paths in package-lock.json match new file paths

## Dev Notes

### Critical Context

**Atomic commit rule (NFR2):** Same as Story 1.1 — do NOT commit after this story. All Epic 1 stories (1.1–1.7) are committed as a SINGLE atomic commit.

**File rename strategy:** Use `git mv` for the 4 file renames so git tracks the rename history. This preserves blame and makes the rename visible in git log.

**"BMAD project" vs "Convoke project":** Several scripts have the message `"Not in a BMAD project. Could not find _bmad/ directory."` The `_bmad/` directory is kept for BMAD Method compatibility, but the user installed `convoke`, not `bmad-enhanced`. Update these user-facing messages to reference "Convoke" (e.g., `"Not in a Convoke project. Could not find _bmad/ directory."`). The `_bmad/` path reference stays because that's the actual directory name.

**What NOT to change in this story:**
- Do NOT update installer scripts (`install-vortex-agents.js`, `install-all-agents.js`, `postinstall.js`) — that's Story 1.3
- Do NOT update library modules in `scripts/update/lib/` — that's Story 1.4
- Do NOT update `scripts/docs-audit.js` — that's Story 1.4
- Do NOT change `require()` paths in other files that import these scripts — there are no direct imports of these 4 CLI scripts from other modules (they're entry points)
- Do NOT touch `_bmad/` directory paths or agent definitions

### Dependency Check — No Cross-File Imports

These 4 scripts are CLI entry points (`bin` commands). They are NOT imported by other modules. Verified:
- `bmad-update.js` — imports FROM `./lib/*` and `./migrations/*`, but nothing imports it
- `bmad-version.js` — imports FROM `./lib/*`, but nothing imports it
- `bmad-migrate.js` — imports FROM `./lib/*` and `./migrations/*`, but nothing imports it
- `bmad-doctor.js` — imports FROM `./update/lib/*`, but nothing imports it

The renames are safe — no `require()` paths in other files will break.

### String Replacement Reference

**Product name replacements (JSDoc + banners):**

| File | Line | Old String | New String |
|------|------|-----------|------------|
| bmad-update.js | 11 | `BMAD-Enhanced Update CLI` | `Convoke Update CLI` |
| bmad-update.js | 78 | `BMAD-Enhanced Update Manager` | `Convoke Update Manager` |
| bmad-version.js | 11 | `BMAD-Enhanced Version CLI` | `Convoke Version CLI` |
| bmad-version.js | 20 | `BMAD-Enhanced Version Information` | `Convoke Version Information` |
| bmad-migrate.js | 10 | `BMAD-Enhanced Migrate CLI` | `Convoke Migrate CLI` |
| bmad-doctor.js | 11 | `bmad-doctor — Diagnose common BMAD-Enhanced installation issues` | `convoke-doctor — Diagnose common Convoke installation issues` |
| bmad-doctor.js | 17 | `BMAD-Enhanced Doctor` | `Convoke Doctor` |

**CLI command replacements:**

| Old Command | New Command | Occurrences |
|-------------|-------------|-------------|
| `npx bmad-install-agents` | `npx convoke-install` | 14 total across 4 files |
| `npx bmad-install-vortex-agents` | `npx convoke-install-vortex` | 2 in bmad-doctor.js |
| `npx bmad-update` | `npx convoke-update` | 4 across bmad-doctor.js + bmad-migrate.js |
| `npx bmad-migrate` | `npx convoke-migrate` | 2 in bmad-migrate.js |
| `npx -p bmad-enhanced@latest bmad-update` | `npx -p convoke-agents@latest convoke-update` | 4 across bmad-update.js + bmad-version.js |
| `npm install bmad-enhanced@latest` | `npm install convoke-agents@latest` | 1 in bmad-update.js |

**"BMAD project" user-facing message replacements:**

| File | Line | Old String | New String |
|------|------|-----------|------------|
| bmad-update.js | 87 | `Not in a BMAD project` | `Not in a Convoke project` |
| bmad-version.js | 25 | `Not in a BMAD project` | `Not in a Convoke project` |
| bmad-migrate.js | 21 | `Not in a BMAD project` | `Not in a Convoke project` |
| bmad-doctor.js | 69 | `inside a BMAD project` | `inside a Convoke project` |

Note: `bmad-doctor.js` line 68 says `Could not find _bmad/ directory` without "BMAD project" — keep as-is.

### Previous Story Learnings (Story 1.1)

- Story 1.1 code review added `bugs` field to package.json (wasn't in scope but was a quality catch)
- `npm install --package-lock-only` triggers postinstall — the output will show old branding from `postinstall.js` until Story 1.3 updates it. Expected behavior.

### References

- [Source: _bmad-output/planning-artifacts/epics-phase3.md#Story 1.2]
- [Source: .claude/plans/curried-jumping-thunder.md#Phase 1.2]
- [Source: scripts/update/bmad-update.js — 272 lines, 7 product name refs + CLI refs]
- [Source: scripts/update/bmad-version.js — 134 lines, 2 product name refs + CLI refs]
- [Source: scripts/update/bmad-migrate.js — 169 lines, 1 product name ref + CLI refs]
- [Source: scripts/bmad-doctor.js — 322 lines, 2 product name refs + CLI refs]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None — all tasks completed without errors.

### Completion Notes List

- All 4 script files renamed via `git mv` to preserve blame history
- All internal strings updated: JSDoc headers, console banners, CLI command refs, "BMAD project" → "Convoke project"
- Grep verification confirmed zero stale refs across all 4 renamed files
- package.json bin values updated to point to new file paths
- package-lock.json regenerated; postinstall output shows old branding (expected — Story 1.3 scope)
- No cross-file import breakage (these are CLI entry points, not imported by other modules)

### File List

- `scripts/update/convoke-update.js` (renamed from `bmad-update.js`, strings updated)
- `scripts/update/convoke-version.js` (renamed from `bmad-version.js`, strings updated)
- `scripts/update/convoke-migrate.js` (renamed from `bmad-migrate.js`, strings updated)
- `scripts/convoke-doctor.js` (renamed from `bmad-doctor.js`, strings updated)
- `package.json` (bin values updated to new file paths)
- `package-lock.json` (regenerated)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (status updated)

### Code Review Record

**Reviewer:** Claude Opus 4.6 (adversarial code review)
**Date:** 2026-03-06
**Verdict:** All 8 ACs IMPLEMENTED. No blocking issues.

**Findings:**

1. **[HIGH — Expected] Test suite broken:** 5 test files reference old `bmad-*` script paths (47 stale refs total). Tests crash with MODULE_NOT_FOUND or fail on assertion mismatches (e.g., `"Not in a BMAD project"` vs new `"Not in a Convoke project"`). **This is expected per NFR2 (atomic commit rule)** — Story 1.6 will update all test files before the single Epic 1 commit.
2. **[MEDIUM — Fixed] Story File List incomplete:** Missing `sprint-status.yaml`. Fixed in this review.
3. **[LOW — No action] Banner box padding:** `convoke-update.js:78` has asymmetric padding (3 leading, 15 trailing) — inherited from original, renders correctly.

**Story 1.6 test debt (47 stale references across 5 files):**
- `tests/unit/bmad-update.test.js` — 7 refs (require path + descriptions)
- `tests/unit/bmad-version.test.js` — 13 refs (require path + assertion strings + descriptions)
- `tests/integration/bmad-doctor.test.js` — 9 refs (script path + assertions)
- `tests/integration/cli-entry-points.test.js` — 14 refs (script paths for doctor/version/update)
- `tests/integration/postinstall.test.js` — 4 refs (branding assertions)
