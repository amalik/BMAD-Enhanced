# Story 1.1: Rename Package Identity & CLI Commands

Status: done

## Story

As a maintainer,
I want the npm package name, version, metadata, and all CLI binary definitions updated to the Convoke brand,
So that `npm install convoke-agents` works and all `convoke-*` commands are available.

## Acceptance Criteria

1. **Given** the current `package.json` with name `bmad-enhanced` and version `1.7.1`
   **When** the rename is applied
   **Then** `name` is `convoke` and `version` is `2.0.0`

2. **Given** the `description` field in `package.json`
   **When** the rename is applied
   **Then** description is `"Agent teams for complex systems, compatible with BMad Method"`

3. **Given** the `bin` field in `package.json`
   **When** the rename is applied
   **Then** `bin` contains these 6 entries with new command names:
   - `convoke-install-vortex` → `scripts/install-vortex-agents.js`
   - `convoke-install` → `scripts/install-all-agents.js`
   - `convoke-update` → `scripts/update/bmad-update.js` (file renamed in Story 1.2)
   - `convoke-version` → `scripts/update/bmad-version.js` (file renamed in Story 1.2)
   - `convoke-migrate` → `scripts/update/bmad-migrate.js` (file renamed in Story 1.2)
   - `convoke-doctor` → `scripts/bmad-doctor.js` (file renamed in Story 1.2)

4. **Given** the `keywords` array in `package.json`
   **When** the rename is applied
   **Then** keywords includes `convoke`, `bmad-enhanced`, and `bmad` (plus existing keywords)

5. **Given** the `author` field in `package.json`
   **When** the rename is applied
   **Then** `author` is `Convoke Contributors`

6. **Given** the `repository.url` field in `package.json`
   **When** the rename is applied
   **Then** `repository.url` is `git+https://github.com/amalik/convoke-agents.git`

7. **Given** the `package-lock.json` file
   **When** the identity rename is complete
   **Then** `package-lock.json` is regenerated via `npm install --package-lock-only`

8. **Given** the `LICENSE` file
   **When** the rename is applied
   **Then** the copyright holder reads `Convoke Contributors` instead of `BMAD-Enhanced Community`

## Tasks / Subtasks

- [x] Task 1: Update package.json identity fields (AC: #1, #2, #5, #6)
  - [x] 1.1: Change `name` from `bmad-enhanced` to `convoke`
  - [x] 1.2: Change `version` from `1.7.1` to `2.0.0`
  - [x] 1.3: Change `description` to `"Agent teams for complex systems, compatible with BMad Method"`
  - [x] 1.4: Change `author` from `BMAD-Enhanced Community` to `Convoke Contributors`
  - [x] 1.5: Change `repository.url` from `git+https://github.com/amalik/BMAD-Enhanced.git` to `git+https://github.com/amalik/convoke-agents.git`
- [x] Task 2: Update package.json bin entries (AC: #3)
  - [x] 2.1: Rename all 6 bin keys from `bmad-*` to `convoke-*` prefix
  - [x] 2.2: Keep bin values pointing to current script file paths (files renamed in Story 1.2)
  - [x] 2.3: Verify `convoke-install-vortex` (shortened from `bmad-install-vortex-agents`) and `convoke-install` (shortened from `bmad-install-agents`)
- [x] Task 3: Update package.json keywords (AC: #4)
  - [x] 3.1: Add `convoke` to keywords array
  - [x] 3.2: Add `bmad-enhanced` to keywords array (discoverability during transition — FR5, NFR6)
  - [x] 3.3: Keep existing `bmad` keyword
- [x] Task 4: Regenerate package-lock.json (AC: #7)
  - [x] 4.1: Run `npm install --package-lock-only` to regenerate
  - [x] 4.2: Verify package-lock.json has `name: "convoke"` and `version: "2.0.0"`
- [x] Task 5: Update LICENSE (AC: #8)
  - [x] 5.1: Change `BMAD-Enhanced Community` to `Convoke Contributors` on line 3

## Dev Notes

### Critical Context

**Atomic commit rule (NFR2):** This story is part of Epic 1 where stories 1.1–1.7 are developed incrementally but committed as a SINGLE atomic commit. Do NOT commit after this story alone. Work through all 7 stories, verify locally, then commit once all pass.

**Bin value paths — intentionally temporary:** After this story, the bin KEYS will be `convoke-*` but the VALUES will still point to `bmad-*.js` files. This is correct — Story 1.2 renames the actual script files. Between stories 1.1 and 1.2, `npm link` or `npx` won't work correctly. This is expected and resolved after Story 1.2.

**CLI name shortening:** Two commands are shortened (not just prefix-swapped):
- `bmad-install-vortex-agents` → `convoke-install-vortex` (drops `-agents`, scales to future team names like `convoke-install-architects`)
- `bmad-install-agents` → `convoke-install` (drops `-agents`)

The other 4 commands are simple prefix swaps: `bmad-update` → `convoke-update`, etc.

**What NOT to change in this story:**
- Do NOT rename any `.js` script files (that's Story 1.2)
- Do NOT update internal strings in scripts (that's Stories 1.2–1.4)
- Do NOT touch `_bmad/` paths or any agent definitions
- Do NOT modify the `scripts` field (npm scripts like `test`, `lint` etc. remain unchanged)
- Do NOT modify the `files` field — it references directory paths that aren't changing

### Current package.json State (Source of Truth)

```json
{
  "name": "bmad-enhanced",
  "version": "1.7.1",
  "description": "Vortex Pattern - Contextualize, Empathize, Synthesize, Hypothesize, Externalize, Sensitize, and Systematize streams for Lean Startup validation",
  "author": "BMAD-Enhanced Community",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/amalik/BMAD-Enhanced.git"
  },
  "bin": {
    "bmad-install-vortex-agents": "scripts/install-vortex-agents.js",
    "bmad-install-agents": "scripts/install-all-agents.js",
    "bmad-update": "scripts/update/bmad-update.js",
    "bmad-version": "scripts/update/bmad-version.js",
    "bmad-migrate": "scripts/update/bmad-migrate.js",
    "bmad-doctor": "scripts/bmad-doctor.js"
  },
  "keywords": ["bmad", "agents", "lean-startup", "validated-learning", "vortex", "contextualize", "externalize", "empathize", "systematize", "user-research", "decision-making", "mvp", "product-strategy", "ai-agents"]
}
```

### Target package.json State (After This Story)

```json
{
  "name": "convoke",
  "version": "2.0.0",
  "description": "Agent teams for complex systems, compatible with BMad Method",
  "author": "Convoke Contributors",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/amalik/convoke-agents.git"
  },
  "bin": {
    "convoke-install-vortex": "scripts/install-vortex-agents.js",
    "convoke-install": "scripts/install-all-agents.js",
    "convoke-update": "scripts/update/bmad-update.js",
    "convoke-version": "scripts/update/bmad-version.js",
    "convoke-migrate": "scripts/update/bmad-migrate.js",
    "convoke-doctor": "scripts/bmad-doctor.js"
  },
  "keywords": ["convoke", "bmad-enhanced", "bmad", "agents", "lean-startup", "validated-learning", "vortex", "contextualize", "externalize", "empathize", "systematize", "user-research", "decision-making", "mvp", "product-strategy", "ai-agents"]
}
```

### Current LICENSE State

```
MIT License

Copyright (c) 2026 BMAD-Enhanced Community
```

### Target LICENSE State

```
MIT License

Copyright (c) 2026 Convoke Contributors
```

### Project Structure Notes

- `package.json` is at project root: `/package.json`
- `package-lock.json` is at project root: `/package-lock.json`
- `LICENSE` is at project root: `/LICENSE`
- The `files` field in package.json (`scripts/`, `_bmad/bme/_vortex/`, etc.) references directories — these paths are NOT changing
- The `main` field (`index.js`) is NOT changing
- The `engines` field (`>=18.0.0`) is NOT changing
- The `dependencies` and `devDependencies` are NOT changing

### References

- [Source: _bmad-output/planning-artifacts/epics-phase3.md#Story 1.1]
- [Source: .claude/plans/curried-jumping-thunder.md#Phase 1.1]
- [Source: package.json — current state as of v1.7.1]
- [Source: LICENSE — current state]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None — all tasks completed without errors.

### Completion Notes List

- Updated package.json: name → `convoke`, version → `2.0.0`, description → new tagline, author → `Convoke Contributors`, repository → new URL
- Renamed all 6 bin keys to `convoke-*` prefix. Two commands shortened: `bmad-install-vortex-agents` → `convoke-install-vortex`, `bmad-install-agents` → `convoke-install`. Bin values still point to current script files (Story 1.2 handles file renames).
- Added `convoke` and `bmad-enhanced` to keywords for discoverability (NFR6/FR5)
- Regenerated package-lock.json via `npm install --package-lock-only` — verified `name: "convoke"` and `version: "2.0.0"`
- Updated LICENSE copyright holder from `BMAD-Enhanced Community` to `Convoke Contributors`
- Fields intentionally untouched: `main`, `files`, `scripts`, `engines`, `dependencies`, `devDependencies`
- NOTE: Per atomic commit rule (NFR2), do NOT commit this story alone. Wait for all Epic 1 stories (1.1–1.7) to complete.

### Change Log

- 2026-03-06: Story 1.1 implemented — package identity, bin keys, keywords, package-lock, and LICENSE updated to Convoke branding
- 2026-03-06: Code review — added `bugs` field to package.json (1 MEDIUM fix). 2 LOW keyword observations noted for future consideration.

### File List

- `package.json` (modified)
- `package-lock.json` (regenerated)
- `LICENSE` (modified)

## Senior Developer Review (AI)

**Review Date:** 2026-03-06
**Reviewer:** Claude Opus 4.6
**Outcome:** Approve (with 1 fix applied)

### AC Verification

All 8 Acceptance Criteria: IMPLEMENTED and verified against actual files.

### Action Items

- [x] [MEDIUM] Add `bugs` field to package.json with GitHub issues URL — FIXED
- [ ] [LOW] Consider adding brand-positioning keywords (`agentic`, `team-of-teams`, `complex-systems`) — DEFERRED
- [ ] [LOW] Consider adding missing stream keywords (`synthesize`, `hypothesize`, `sensitize`) — DEFERRED
