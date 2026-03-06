# Story 1.3: Update Entry Point & Installer Scripts

Status: done

## Story

As a new user,
I want the post-install output and CLI help to show the Convoke brand and correct command names,
So that my first interaction with the package reflects the correct product identity.

## Acceptance Criteria

1. **Given** a user runs `npm install convoke`
   **When** the postinstall script executes
   **Then** the output says "Convoke installed!" (not "BMAD-Enhanced installed!")
   **And** all `npx` command suggestions use `convoke-*` names

2. **Given** a user runs `node index.js` or `npx convoke`
   **When** the help output is displayed
   **Then** the header references "Convoke"
   **And** all 5 command names use `convoke-*` prefix
   **And** the JSDoc comment block references "Convoke"

3. **Given** a user runs `npx convoke-install-vortex`
   **When** the installer completes
   **Then** the ASCII banner shows "CONVOKE" in block letters
   **And** the tagline reflects the new positioning
   **And** all CLI command suggestions use `convoke-*` names
   **And** "BMAD Method" references are preserved (not renamed)

4. **Given** `scripts/install-all-agents.js`
   **When** the rename is applied
   **Then** the JSDoc header references "Convoke" and `convoke-*` command names

5. **Given** any user-facing console output in these 4 files
   **When** the rename is applied
   **Then** all output references "Convoke" (not "BMAD-Enhanced") and `convoke-*` commands (not `bmad-*`)
   **And** `_bmad/` directory references are preserved (actual directory name)
   **And** "BMAD Method" references are preserved (framework name, not product name)

## Tasks / Subtasks

- [x] Task 1: Update `scripts/postinstall.js` (AC: #1, #5)
  - [x] 1.1: Update banner: `BMAD-Enhanced installed!` -> `Convoke installed!` (line 23)
  - [x] 1.2: Update CLI ref: `npx bmad-install-agents` -> `npx convoke-install` (2 occurrences, lines 43, 97)
  - [x] 1.3: Update status message: `BMAD-Enhanced is up to date!` -> `Convoke is up to date!` (line 50)
  - [x] 1.4: Update CLI ref: `npx bmad-update --dry-run` -> `npx convoke-update --dry-run` (line 76)
  - [x] 1.5: Update CLI ref: `npx bmad-update` -> `npx convoke-update` (line 79)
  - [x] 1.6: Grep verify zero stale refs

- [x] Task 2: Update `index.js` (AC: #2, #5)
  - [x] 2.1: Update JSDoc header: `BMAD-Enhanced - Vortex Pattern` -> `Convoke - Vortex Pattern` (line 4)
  - [x] 2.2: Update JSDoc CLI refs (5 lines, 8-12): all `bmad-*` -> `convoke-*` with shortened install names. Re-align column padding — command widths change (e.g., `bmad-install-vortex-agents` 29 chars -> `convoke-install-vortex` 22 chars)
  - [x] 2.3: Update console CLI refs (5 lines, 48-52): all `bmad-*` -> `convoke-*` with shortened install names. Re-align column padding to keep description column visually aligned
  - [x] 2.4: Grep verify zero stale refs

- [x] Task 3: Update `scripts/install-vortex-agents.js` (AC: #3, #5)
  - [x] 3.1: Design and replace ASCII banner — "BMAD" block letters -> "CONVOKE" block letters (lines 19-24). Must be 7-character layout. Generate using Unicode block characters matching existing style.
  - [x] 3.2: Replace tagline: `E N H A N C E D` -> new tagline reflecting "Agent teams for complex systems" positioning (line 25)
  - [x] 3.3: Update tagline message: `BMAD Method enhanced by domain-specialized agents` -> new positioning tagline (line 27). Note: DO NOT remove "BMAD Method" context — reframe the relationship.
  - [x] 3.4: Update message: `BMAD-Enhanced will install standalone` -> `Convoke will install standalone` (line 49)
  - [x] 3.5: Verify preserved refs: "BMAD directory detected" (line 41), "BMAD Method configuration found" (line 47), "BMAD Method not detected" (line 49 prefix) — these reference the `_bmad/` directory and BMAD Method framework, NOT the product. KEEP as-is.
  - [x] 3.6: Grep verify zero stale `BMAD-Enhanced` or `bmad-install` or `bmad-update` refs remain

- [x] Task 4: Update `scripts/install-all-agents.js` (AC: #4, #5)
  - [x] 4.1: Update JSDoc header: `bmad-install-agents` -> `convoke-install` (line 4)
  - [x] 4.2: Update JSDoc body: `bmad-install-vortex-agents` -> `convoke-install-vortex` (line 7)
  - [x] 4.3: Grep verify zero stale refs

## Dev Notes

### Critical Context

**Atomic commit rule (NFR2):** Same as Stories 1.1-1.2 — do NOT commit after this story. All Epic 1 stories (1.1-1.7) are committed as a SINGLE atomic commit.

**ASCII banner design (Task 3.1):** The current banner spells "BMAD" in Unicode block characters (lines 19-24 of `install-vortex-agents.js`). Replace with "CONVOKE" using the same Unicode block character style (`\u2588`, `\u2551`, `\u2554`, `\u2557`, `\u255a`, `\u255d`). The banner is 7 characters wide — "CONVOKE" is exactly 7 characters. Design the banner before implementing.

Current banner (4 chars):
```
 ██████╗ ███╗   ███╗ █████╗ ██████╗
 ██╔══██╗████╗ ████║██╔══██╗██╔══██╗
 ██████╔╝██╔████╔██║███████║██║  ██║
 ██╔══██╗██║╚██╔╝██║██╔══██║██║  ██║
 ██████╔╝██║ ╚═╝ ██║██║  ██║██████╔╝
 ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝
       E N H A N C E D
```

Target banner (7 chars — "CONVOKE"):
Generate using the same block character style. Each letter is ~6-7 chars wide with 1-char spacing.

**Tagline update (Task 3.3):** The current tagline `BMAD Method enhanced by domain-specialized agents` blends product name into the framework reference. Reframe to something like `Agent teams for complex systems | compatible with BMAD Method` — keep the BMAD Method reference but position Convoke as the product.

**What NOT to change in this story:**
- Do NOT update library modules in `scripts/update/lib/` — that's Story 1.4
- Do NOT update test files — that's Story 1.6
- Do NOT change `_bmad/` directory paths or agent definitions
- Do NOT rename "BMAD Method" or "BMAD directory" references — these refer to the framework/directory, not the product

### String Replacement Reference

**postinstall.js (6 replacements):**

| Line | Old String | New String |
|------|-----------|------------|
| 23 | `BMAD-Enhanced installed!` | `Convoke installed!` |
| 43 | `npx bmad-install-agents` | `npx convoke-install` |
| 50 | `BMAD-Enhanced is up to date!` | `Convoke is up to date!` |
| 76 | `npx bmad-update --dry-run` | `npx convoke-update --dry-run` |
| 79 | `npx bmad-update` | `npx convoke-update` |
| 97 | `npx bmad-install-agents` | `npx convoke-install` |

**index.js (11 replacements + column re-alignment):**

| Line | Old String | New String |
|------|-----------|------------|
| 4 | `BMAD-Enhanced - Vortex Pattern` | `Convoke - Vortex Pattern` |
| 8 | `npx bmad-install-vortex-agents` | `npx convoke-install-vortex` |
| 9 | `npx bmad-install-agents` | `npx convoke-install` |
| 10 | `npx bmad-update` | `npx convoke-update` |
| 11 | `npx bmad-version` | `npx convoke-version` |
| 12 | `npx bmad-doctor` | `npx convoke-doctor` |
| 48 | `npx bmad-install-vortex-agents` | `npx convoke-install-vortex` |
| 49 | `npx bmad-install-agents` | `npx convoke-install` |
| 50 | `npx bmad-update` | `npx convoke-update` |
| 51 | `npx bmad-version` | `npx convoke-version` |
| 52 | `npx bmad-doctor` | `npx convoke-doctor` |

**install-vortex-agents.js (3 product name replacements + banner redesign):**

| Line | Old String | New String |
|------|-----------|------------|
| 19-24 | ASCII "BMAD" banner | ASCII "CONVOKE" banner (design subtask) |
| 25 | `E N H A N C E D` | New tagline (design subtask) |
| 27 | `BMAD Method enhanced by domain-specialized agents` | New tagline with BMAD Method reference preserved |
| 49 | `BMAD-Enhanced will install standalone` | `Convoke will install standalone` |

**install-all-agents.js (2 replacements):**

| Line | Old String | New String |
|------|-----------|------------|
| 4 | `bmad-install-agents` | `convoke-install` |
| 7 | `bmad-install-vortex-agents` | `convoke-install-vortex` |

### Preserved References (DO NOT CHANGE)

These references in `install-vortex-agents.js` are about the `_bmad/` directory and BMAD Method framework, NOT the product:

| Line | String | Reason to keep |
|------|--------|---------------|
| 41 | `BMAD directory detected` | Refers to actual `_bmad/` directory |
| 44 | `BMAD Method configuration` (comment) | Framework reference |
| 47 | `BMAD Method configuration found` | Framework reference |
| 49 prefix | `BMAD Method not detected` | Framework reference (only the `BMAD-Enhanced` suffix changes) |

### Previous Story Learnings

**From Story 1.1:**
- Code review added `bugs` field to package.json (quality catch)
- `npm install --package-lock-only` triggers postinstall — old branding output is expected until this story

**From Story 1.2:**
- Grep verification after each file is essential — catches missed refs
- Banner box alignment needs careful character counting
- "BMAD project" -> "Convoke project" pattern: update user-facing messages, keep `_bmad/` path references
- 47 stale test refs documented for Story 1.6

### References

- [Source: _bmad-output/planning-artifacts/epics-phase3.md#Story 1.3]
- [Source: scripts/postinstall.js - 104 lines, 6 stale refs]
- [Source: index.js - 56 lines, 11 stale refs]
- [Source: scripts/install-vortex-agents.js - 208 lines, banner + 3 stale refs]
- [Source: scripts/install-all-agents.js - 9 lines, 2 stale refs]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None — all tasks completed without errors.

### Completion Notes List

- postinstall.js: 6 string replacements (banner, CLI refs, status message). Zero stale refs.
- index.js: 11 string replacements (JSDoc header + CLI refs, console CLI refs). Column padding re-aligned for new command widths. Zero stale refs.
- install-vortex-agents.js: ASCII banner redesigned from "BMAD" (4 chars) to "CONVOKE" (7 chars) using same Unicode block character style. Tagline updated to "Agent teams for complex systems". Sub-tagline reframed to "Domain-specialized agent teams | compatible with BMAD Method". BMAD Method/directory refs preserved (4 refs). Zero stale product/CLI refs.
- install-all-agents.js: 2 JSDoc replacements. Zero stale refs.

### File List

- `scripts/postinstall.js` (6 string replacements)
- `index.js` (11 string replacements + column re-alignment)
- `scripts/install-vortex-agents.js` (ASCII banner redesign + 3 string replacements)
- `scripts/install-all-agents.js` (2 JSDoc replacements)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (status updated)

## Code Review Record

### Reviewer Model
Claude Opus 4.6

### Review Type
Adversarial code review per workflow

### Findings

| # | Severity | File | Finding |
|---|----------|------|---------|
| 1 | ✅ Pass | `scripts/postinstall.js` | 6/6 replacements verified. Zero stale product/CLI refs. |
| 2 | ✅ Pass | `index.js` | 11/11 replacements verified. JSDoc col 28, console col 30 alignment correct. Zero stale refs. |
| 3 | ✅ Pass | `scripts/install-vortex-agents.js` | ASCII banner redesigned (BMAD→CONVOKE). Tagline updated. 4 preserved BMAD Method/directory refs intact. Zero stale product/CLI refs. |
| 4 | ✅ Pass | `scripts/install-all-agents.js` | 2/2 JSDoc replacements verified. Zero stale refs. |
| 5 | ℹ️ Info | Test files | 18 stale refs in `postinstall.test.js` (4) and `cli-entry-points.test.js` (14) — pre-existing test debt from Story 1.2, already documented for Story 1.6. |

### AC Verification

All 5 ACs verified: postinstall brand ✅, index.js help ✅, install-vortex banner ✅, install-all-agents JSDoc ✅, all user-facing output uses Convoke ✅.

### Verdict
**PASS** — No issues found. All replacements correct, preserved refs intact, column alignment verified.
