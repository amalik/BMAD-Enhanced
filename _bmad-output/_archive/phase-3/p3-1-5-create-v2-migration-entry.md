# Story 1.5: Create v2.0.0 Migration Entry

Status: done

## Story

As a user upgrading from bmad-enhanced 1.7.x,
I want the migration system to recognize the 1.7.x to 2.0.0 upgrade path,
So that `convoke-update` correctly processes my upgrade with a breaking change notice.

## Acceptance Criteria

1. **Given** the migration registry at `scripts/update/migrations/registry.js`
   **When** a user on version 1.7.x runs the update
   **Then** a `1.7.x-to-2.0.0` migration entry exists with `breaking: true`

2. **Given** the migration entry
   **When** the migration description is displayed
   **Then** it explains the product rename from BMAD-Enhanced to Convoke

3. **Given** the migration delta file
   **When** it exists at `scripts/update/migrations/1.7.x-to-2.0.0.js`
   **Then** the file follows the established migration delta pattern

4. **Given** the delta file's `preview()` method
   **When** invoked
   **Then** it lists the key changes: product name rename, CLI command renames, preserved `_bmad/` directory structure

5. **Given** the delta file's `apply()` method
   **When** invoked
   **Then** it is a no-op (returns change description only) because all file updates are handled by `refreshInstallation()`

6. **Given** the registry's JSDoc header
   **When** the rename is applied
   **Then** it references "Convoke" instead of "BMAD-Enhanced"

## Tasks / Subtasks

- [x] Task 1: Update `scripts/update/migrations/registry.js` JSDoc header (AC: #6)
  - [x] 1.1: Change JSDoc header from `Migration Registry for BMAD-Enhanced` to `Migration Registry for Convoke` (line 8)
  - [x] 1.2: Grep verify zero stale refs in registry.js

- [x] Task 2: Add `1.7.x-to-2.0.0` migration entry to registry (AC: #1, #2)
  - [x] 2.1: Append new entry to MIGRATIONS array (before the "Future migrations" comment) with `name: '1.7.x-to-2.0.0'`, `fromVersion: '1.7.x'`, `breaking: true`, `description` explaining the product rename, `module: null`
  - [x] 2.2: Verify entry appears after `1.6.x-to-1.7.0` and before the comment

- [x] Task 3: Create `scripts/update/migrations/1.7.x-to-2.0.0.js` delta file (AC: #3, #4, #5)
  - [x] 3.1: Create file following the established pattern (see `1.6.x-to-1.7.0.js` for no-op delta pattern)
  - [x] 3.2: Implement `preview()` returning actions array listing: product rename, 6 CLI command renames, `_bmad/` directory preserved
  - [x] 3.3: Implement `apply()` as no-op returning `['No version-specific delta needed — refreshInstallation handles file updates']`
  - [x] 3.4: Set `name`, `fromVersion`, `breaking: true` properties on the module export

- [x] Task 4: Verify migration detection works (AC: #1)
  - [x] 4.1: Manually verify `getMigrationsFor('1.7.0')` would match the new entry by checking `matchesVersionRange('1.7.0', '1.7.x')` logic
  - [x] 4.2: Verify `getMigrationsFor('1.7.1')` would also match (current published version)

## Dev Notes

### Critical Context

**Atomic commit rule (NFR2):** Same as Stories 1.1-1.4 — do NOT commit after this story. All Epic 1 stories (1.1-1.7) are committed as a SINGLE atomic commit.

**What NOT to change in this story:**
- Do NOT update test files — that's Story 1.6
- Do NOT change any other migration deltas
- Do NOT modify `migration-runner.js` (already updated in Story 1.4)

### Architecture Rules

- **APPEND-ONLY registry:** New entries go at the bottom of the MIGRATIONS array, never edit existing entries
- **No toVersion:** Migration entries have NO `toVersion` field — target is always the current package version at runtime (read from `package.json`)
- **Lazy loading:** Migration modules are loaded via `require('./${migration.name}')` — the filename MUST match the `name` field exactly
- **Delta = only delta logic:** The migration file should only contain version-specific changes. File copying is handled by `refreshInstallation()`. For a rename-only release, this is a no-op.
- **module: null in registry:** The registry entry sets `module: null` — the module is lazy-loaded by `getMigrationsFor()` when needed

### Migration Delta Pattern

Follow `1.6.x-to-1.7.0.js` (no-op pattern) as the template:

```javascript
#!/usr/bin/env node

/**
 * Migration: 1.7.x -> current version (v2.0.0)
 * No-op delta - all file updates handled by refreshInstallation().
 * Product rename: BMAD-Enhanced -> Convoke.
 * CLI commands renamed from bmad-* to convoke-*.
 * Internal _bmad/ directory structure preserved.
 */

module.exports = {
  name: '1.7.x-to-2.0.0',
  fromVersion: '1.7.x',
  breaking: true,

  async preview() {
    return {
      actions: [
        // List key changes visible to user
      ]
    };
  },

  async apply(_projectRoot) {
    return ['No version-specific delta needed — refreshInstallation handles file updates'];
  }
};
```

### Registry Entry Pattern

```javascript
{
  name: '1.7.x-to-2.0.0',
  fromVersion: '1.7.x',
  breaking: true,
  description: 'Product rename: BMAD-Enhanced -> Convoke. CLI commands renamed from bmad-* to convoke-*. _bmad/ directory preserved.',
  module: null
}
```

### String Replacement Reference

**registry.js (1 replacement + 1 new entry):**

| Line | Old String | New String |
|------|-----------|------------|
| 8 | `Migration Registry for BMAD-Enhanced` | `Migration Registry for Convoke` |
| 64 | (before comment) | New migration entry appended |

**1.7.x-to-2.0.0.js (new file):**

New file — no replacements, created from scratch.

### Preserved References (DO NOT CHANGE)

| File | Line | String | Reason to keep |
|------|------|--------|---------------|
| `registry.js` | 19 | `1.0.x-to-1.3.0` description | Historical migration entry — APPEND-ONLY rule |
| `registry.js` | all existing entries | All `name`, `fromVersion`, `description` values | Never edit old entries per architecture rules |

### Previous Story Learnings

**From Story 1.4:**
- Grep verification after each file is essential — catches missed refs
- Zero issues found in code review — pattern is working well
- `checkStaleBrandReferences` function added to docs-audit.js — new function detects stale brand refs
- 2 CLI integration tests in docs-audit.test.js now fail (expected, deferred to Story 1.6)

**From Stories 1.1-1.3:**
- Code review added `bugs` field to package.json (quality catch)
- "BMAD project" -> "Convoke project" pattern: update user-facing messages, keep `_bmad/` path references
- Preserved BMAD Method/directory refs verified

### Version Matching Behavior

The `matchesVersionRange` function (registry.js line 155-170) matches:
- `matchesVersionRange('1.7.0', '1.7.x')` → `true` (major.minor match)
- `matchesVersionRange('1.7.1', '1.7.x')` → `true` (major.minor match)
- `matchesVersionRange('1.6.5', '1.7.x')` → `false` (minor mismatch)
- `matchesVersionRange('2.0.0', '1.7.x')` → `false` (major mismatch)

This means users on any `1.7.x` version will pick up the new migration entry.

### References

- [Source: _bmad-output/planning-artifacts/epics-phase3.md#Story 1.5]
- [Source: scripts/update/migrations/registry.js - 188 lines, 1 stale ref in JSDoc]
- [Source: scripts/update/migrations/1.6.x-to-1.7.0.js - 29 lines, no-op delta pattern]
- [Source: scripts/update/migrations/1.5.x-to-1.6.0.js - 95 lines, active delta pattern with config changes]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None — all tasks completed without errors.

### Completion Notes List

- registry.js: 1 JSDoc replacement (`BMAD-Enhanced` -> `Convoke`). Zero stale refs.
- registry.js: New migration entry appended — `1.7.x-to-2.0.0`, `breaking: true`, describes product rename. 8th entry in MIGRATIONS array. Existing entries untouched (append-only rule).
- 1.7.x-to-2.0.0.js: New no-op delta file created. `preview()` returns 5 actions describing rename scope. `apply()` returns no-op message.
- Version matching verified programmatically: `getMigrationsFor('1.7.0')` and `getMigrationsFor('1.7.1')` both return the new entry. `getBreakingChanges('1.7.1')` correctly flags it. Lazy module loading works.
- Pre-existing test failures (bmad-version.test.js, docs-audit.test.js CLI tests) unchanged — deferred to Story 1.6.

### File List

- `scripts/update/migrations/registry.js` (1 JSDoc replacement + 1 new migration entry)
- `scripts/update/migrations/1.7.x-to-2.0.0.js` (new file — no-op delta)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (status updated)

## Code Review Record

### Review Date
2026-03-06

### Reviewer
Claude Opus 4.6 (adversarial code review)

### Verdict: PASS

### Findings Summary
- 0 HIGH, 0 MEDIUM, 3 LOW

### Findings

1. **LOW: Trailing comma style** — Last entry has no trailing comma before closing `]`. Consistent with pre-existing style (previous last entry also had none). Not an issue.

2. **LOW: BMAD-Enhanced in migration description/preview** — Intentional — the migration's purpose is to describe the rename. Not a stale ref.

3. **LOW: Long preview action line** — CLI rename line is ~200 chars. Consistent with existing delta file style (`1.5.x-to-1.6.0.js`).

### AC Verification
All 6 ACs verified against source code. Append-only rule confirmed via git diff (only JSDoc + new entry, all 7 existing entries byte-identical). Migration detection verified programmatically.
