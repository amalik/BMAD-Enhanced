# Story 2.3: Update Secondary Docs, User Guides & Shipped Content

Status: done

## Story

As a user reading agent guides, workflow templates, or reference docs,
I want consistent Convoke branding throughout all shipped content,
So that every touchpoint within the product reflects the correct identity.

## Acceptance Criteria

1. **Given** `docs/agents.md`, `docs/development.md`, `docs/faq.md`, `docs/testing.md`
   **When** the rename is applied
   **Then** all product name references are updated to Convoke
   **And** zero instances of `bmad-enhanced`/`BMAD-Enhanced` remain

2. **Given** all 7 user guides in `_bmad/bme/_vortex/guides/`
   **When** the rename is applied
   **Then** the module line (`BMAD Enhanced (bme)`) is updated to `Convoke (bme)` in each guide
   **And** the credits module line is similarly updated
   **And** all CLI refs (`bmad-install-vortex-agents`, `bmad-doctor`) are updated to `convoke-*` equivalents
   **And** zero instances of `bmad-enhanced`/`BMAD-Enhanced`/`BMAD Enhanced` remain

3. **Given** all ~14 workflow template files under `_bmad/bme/_vortex/workflows/`
   **When** the rename is applied
   **Then** all "Created with" footers are updated from `BMAD-Enhanced` or `BMAD Enhanced` to `Convoke v2.0.0`
   **And** zero instances of `bmad-enhanced`/`BMAD-Enhanced`/`BMAD Enhanced` remain

4. **Given** all ~8 workflow validate files under `_bmad/bme/_vortex/workflows/`
   **When** the rename is applied
   **Then** all GitHub issue URLs (`github.com/amalik/BMAD-Enhanced`) are updated to `github.com/amalik/convoke-agents`
   **And** any "Created with" footers in validate files are also updated
   **And** zero instances of `bmad-enhanced`/`BMAD-Enhanced` remain

5. **Given** `_bmad/bmm/config.yaml`
   **When** the rename is applied
   **Then** `project_name` is set to `Convoke`

6. **Given** all files from ACs 1-5
   **When** scanned
   **Then** zero instances of `bmad-enhanced`, `BMAD-Enhanced`, or `BMAD Enhanced` remain in any shipped content file
   **And** `node scripts/docs-audit.js` returns zero `stale-brand-reference` findings

## Tasks / Subtasks

- [x] Task 1: Update `docs/` directory files (AC: #1)
  - [x] 1.1: Update `docs/development.md` — title L3 + project structure L87 (2 product name instances)
  - [x] 1.2: Update `docs/faq.md` — title L3 + 2 prose refs L9, L103 (3 product name instances). Preserve `/bmad-bmb-agent`, `/bmad-bmb-module`, `/bmad-bmb-workflow` at L107-109 — these are `.claude/commands/bmad-*` framework skill refs, NOT product refs
  - [x] 1.3: Update `docs/testing.md` — title L3 + 4 CLI refs: `bmad-version`/`bmad-update`/`bmad-doctor` at L33, `bmad-doctor` at L35, `bmad-update.js` at L126, `bmad-version.js` at L127 (5 total instances)
  - [x] 1.4: Verify `docs/agents.md` has zero stale product refs — found 1 additional product ref at L346 ("extend BMAD-Enhanced") and updated it. `/bmad-bmb-*` framework refs preserved.
  - [x] 1.5: Grep verify zero stale product refs in `docs/` (framework refs like `/bmad-bmb-*` are preserved)

- [x] Task 2: Update user guides (AC: #2)
  - [x] 2.1: For each of the 7 guides (EMMA, WADE, ISLA, MAX, MILA, LIAM, NOAH), replace module line `BMAD Enhanced (bme)` → `Convoke (bme)` and credits module line
  - [x] 2.2: For each guide, replace CLI refs: `bmad-install-vortex-agents` → `convoke-install-vortex`, `bmad-doctor` → `convoke-doctor`
  - [x] 2.3: Grep verify zero stale refs across all 7 guides

- [x] Task 3: Update workflow template files (AC: #3)
  - [x] 3.1: Update 10 templates with "Created with: BMAD-Enhanced vX.X.X" footer → "Created with: Convoke v2.0.0" (contextualize-scope, lean-experiment, lean-persona, learning-card, mvp, pivot-patch-persevere, proof-of-concept, proof-of-value, product-vision, user-interview)
  - [x] 3.2: Update 4 templates with "BMAD Enhanced" (space-separated) footer → "Convoke v2.0.0" (empathy-map active, empathy-map deprecated, user-discovery, vortex-navigation)
  - [x] 3.3: Grep verify zero stale refs across all template files

- [x] Task 4: Update workflow validate files (AC: #4)
  - [x] 4.1: Update GitHub issue URLs in 7 validate files: `github.com/amalik/BMAD-Enhanced` → `github.com/amalik/convoke-agents` (lowercase!) — contextualize-scope, lean-experiment, lean-persona, mvp, proof-of-concept, proof-of-value, product-vision
  - [x] 4.2: Update "Created with" footer in `user-interview/validate.md` L140 (only validate file with this footer)
  - [x] 4.3: Grep verify zero stale refs across all validate files

- [x] Task 5: Update config file (AC: #5)
  - [x] 5.1: Update `_bmad/bmm/config.yaml` `project_name: BMAD-Enhanced` → `project_name: Convoke`

- [x] Task 6: Cross-file verification (AC: #6)
  - [x] 6.1: Grep all target files for `bmad-enhanced` (case-insensitive) — zero matches confirmed
  - [x] 6.2: Grep all target files for `BMAD Enhanced` — zero matches confirmed (space-separated variant)
  - [x] 6.3: Grep all target files for stale CLI refs (`bmad-install|bmad-update|bmad-version|bmad-doctor|bmad-migrate`) — zero matches confirmed
  - [x] 6.4: Run `node scripts/docs-audit.js` — zero findings (was 21 before this story)

## Dev Notes

### Critical Context

**Scale:** ~62 stale product refs across ~33 files. Medium complexity — most replacements are mechanical with a few semantic review points.

**This is the final story in Epic 2.** After this story, `docs-audit` should return zero findings. All shipped content will consistently use Convoke branding.

### Safe Replacement Patterns (NFR4)

**DO replace:**
- `BMAD-Enhanced` → `Convoke` (display name)
- `BMAD Enhanced` → `Convoke` (prose/module line variant)
- `bmad-enhanced` → `convoke` (package name)
- `bmad-install-vortex-agents` → `convoke-install-vortex`
- `bmad-doctor` → `convoke-doctor`
- `bmad-update` → `convoke-update`
- `bmad-version` → `convoke-version`
- `github.com/amalik/BMAD-Enhanced` → `github.com/amalik/convoke-agents` (lowercase in URLs!)

**DO NOT replace:**
- `_bmad` in any path reference
- `BMAD Method` or `BMad Core` (framework names)
- `BMAD directory` or `BMAD dir` (refers to `_bmad/`)
- Bare `bmad` alone
- `.claude/commands/bmad-*` (BMAD framework, not product)
- `BMB` or `BMAD Module Builder` — framework reference, not product
- `/bmad-bmb-agent`, `/bmad-bmb-module`, `/bmad-bmb-workflow` — `.claude/commands/` skill refs (framework)

### Previous Story Intelligence (from Stories 2.1 & 2.2)

**Lesson 1 — URL case sensitivity:** `replace_all` for `BMAD-Enhanced` → `Convoke` produces uppercase `C` in URL contexts. GitHub URLs need lowercase: `github.com/amalik/convoke-agents`. Always post-check URLs after bulk replace.

**Lesson 2 — Docs-audit false positives:** Avoid exact `BMAD-Enhanced` string in new content. Describe the rename narratively: "Product renamed to Convoke" rather than repeating the old brand.

**Lesson 3 — Bulk replace ordering:** When adding new content that references old names, add it AFTER bulk replacements. In this story, there's no new content being added, so this is less of a concern.

**Lesson 4 — Per-instance review:** `BMAD Enhanced` (space-separated) needs per-instance review. In user guides, it appears as a module identifier `BMAD Enhanced (bme)` — safe to replace. In other contexts, "Enhanced" may be a verb.

### File-Specific Guidance

**docs/ (4 files, 10 product refs):**
- `agents.md`: Zero stale product refs (confirmed). `/bmad-bmb-*` refs at L107-109 are framework skill refs — preserve.
- `development.md`: Title L3 + project structure L87 — 2 product name refs, straightforward
- `faq.md`: Title L3 + 2 prose refs L9, L103 — 3 product name refs. Preserve `/bmad-bmb-agent`, `/bmad-bmb-module`, `/bmad-bmb-workflow` at L107-109.
- `testing.md`: Title L3 + CLI refs at L33 (`bmad-version`, `bmad-update`, `bmad-doctor`), L35 (`bmad-doctor`), L126 (`bmad-update.js`), L127 (`bmad-version.js`) — 5 total refs (1 product name + 4 CLI)

**User guides (7 files, 33 refs):**
- Consistent pattern: module line L5 (`BMAD Enhanced (bme)`), credits module line (varies), CLI refs (1-3 per guide)
- Emma has 3 refs (1 CLI ref: `bmad-install-vortex-agents`). All others have 5 refs (2 module + 2 `bmad-install-vortex-agents` + 1 `bmad-doctor`)
- CLI patterns: `npx bmad-install-vortex-agents` → `npx convoke-install-vortex`, `npx bmad-doctor` → `npx convoke-doctor`

**Workflow templates (14 files, 14 refs):**
- 10 files have "Created with: BMAD-Enhanced vX.X.X" — update to "Created with: Convoke v2.0.0"
- 4 files have "BMAD Enhanced" (no hyphen, agent-style footer) — update to "Convoke v2.0.0"
- Includes 1 deprecated template (`_deprecated/empathy-map/empathy-map.template.md`)

**Workflow validates (8 files, 8 refs):**
- 7 validate files have GitHub issue URL: `https://github.com/amalik/BMAD-Enhanced/issues` → `https://github.com/amalik/convoke-agents/issues`
- 1 validate file (`user-interview/validate.md` L140) also has a "Created with: BMAD-Enhanced v1.5.0" footer
- **URL case critical:** Must be lowercase `convoke` in URLs

**Config (1 file, 1 ref):**
- `_bmad/bmm/config.yaml` L6: `project_name: BMAD-Enhanced` → `project_name: Convoke`

### Recommended Execution Order

1. `_bmad/bmm/config.yaml` (1 ref — quickest)
2. `docs/` directory (10 refs — `agents.md` has zero product refs, `testing.md` has CLI refs)
3. User guides (33 refs — mechanical, use `replace_all` per pattern)
4. Workflow templates (14 refs — "Created with" footers)
5. Workflow validates (8 refs — GitHub URLs, case-sensitive)
6. Cross-file verification

### What NOT to Change in This Story

- Do NOT update README.md — done in Story 2.1
- Do NOT update primary docs (INSTALLATION, UPDATE-GUIDE, CHANGELOG, etc.) — done in Story 2.2
- Do NOT change source code files — done in Epic 1
- Do NOT change test files — done in Epic 1
- Do NOT modify `_bmad/` directory paths or agent definitions
- Do NOT rename "BMAD Method", "BMAD Core", or agent IDs
- Do NOT update `_bmad-output/` historical docs — that's Epic 3, Story 3.3

### References

- [Source: _bmad-output/planning-artifacts/epics-phase3.md#Story 2.3, lines 356-373]
- [Source: docs/agents.md — 0 product refs (framework refs preserved)]
- [Source: docs/development.md — 2 refs]
- [Source: docs/faq.md — 3 product refs (3 framework refs preserved)]
- [Source: docs/testing.md — 5 refs (1 product name + 4 CLI)]
- [Source: 7 user guides in _bmad/bme/_vortex/guides/ — 33 refs total]
- [Source: 14 workflow template files — 14 refs]
- [Source: 8 workflow validate files — 8 refs]
- [Source: _bmad/bmm/config.yaml — 1 ref]
- [Source: _bmad-output/implementation-artifacts/p3-2-2-update-primary-documentation-files.md — Story 2.2 learnings]
- [Source: _bmad-output/implementation-artifacts/p3-2-1-overhaul-readme.md — Story 2.1 learnings]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None — all tasks completed without errors.

### Completion Notes List

- `_bmad/bmm/config.yaml`: `project_name` updated from `BMAD-Enhanced` to `Convoke`.
- `docs/development.md`: 2 product name refs updated (title, project structure diagram).
- `docs/faq.md`: 3 product name refs updated (title, 2 prose). `/bmad-bmb-*` framework skill refs preserved.
- `docs/testing.md`: 1 product name + 4 CLI refs updated (title, `bmad-version`→`convoke-version`, `bmad-update`→`convoke-update`, `bmad-doctor`→`convoke-doctor`, `bmad-update.js`→`convoke-update.js`, `bmad-version.js`→`convoke-version.js`).
- `docs/agents.md`: 1 additional product ref found at L346 ("extend BMAD-Enhanced") and updated. Initial audit missed it. Framework refs preserved.
- 7 user guides: `BMAD Enhanced (bme)` → `Convoke (bme)` (14 module line replacements), `bmad-install-vortex-agents` → `convoke-install-vortex` (12 instances), `bmad-doctor` → `convoke-doctor` (6 instances). Total 33 replacements.
- 14 workflow templates: "Created with" footers updated to `Convoke v2.0.0`. 10 with `BMAD-Enhanced vX.X.X` pattern, 4 with `BMAD Enhanced` pattern.
- 8 workflow validate files: 7 GitHub issue URLs updated to `github.com/amalik/convoke-agents` (lowercase). 1 "Created with" footer updated.
- Cross-file verification: Zero stale brand refs, zero stale CLI refs. `docs-audit` returns zero findings (was 21 before this story).

### File List

- `_bmad/bmm/config.yaml` (1 replacement)
- `docs/agents.md` (1 replacement)
- `docs/development.md` (2 replacements)
- `docs/faq.md` (3 replacements)
- `docs/testing.md` (5 replacements)
- `_bmad/bme/_vortex/guides/EMMA-USER-GUIDE.md` (3 replacements)
- `_bmad/bme/_vortex/guides/ISLA-USER-GUIDE.md` (5 replacements)
- `_bmad/bme/_vortex/guides/MILA-USER-GUIDE.md` (5 replacements)
- `_bmad/bme/_vortex/guides/LIAM-USER-GUIDE.md` (5 replacements)
- `_bmad/bme/_vortex/guides/WADE-USER-GUIDE.md` (5 replacements)
- `_bmad/bme/_vortex/guides/NOAH-USER-GUIDE.md` (5 replacements)
- `_bmad/bme/_vortex/guides/MAX-USER-GUIDE.md` (5 replacements)
- `_bmad/bme/_vortex/workflows/contextualize-scope/contextualize-scope.template.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/contextualize-scope/validate.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/empathy-map/empathy-map.template.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/lean-experiment/lean-experiment.template.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/lean-experiment/validate.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/lean-persona/lean-persona.template.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/lean-persona/validate.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/learning-card/learning-card.template.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/mvp/mvp.template.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/mvp/validate.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/pivot-patch-persevere/pivot-patch-persevere.template.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/product-vision/product-vision.template.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/product-vision/validate.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/proof-of-concept/proof-of-concept.template.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/proof-of-concept/validate.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/proof-of-value/proof-of-value.template.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/proof-of-value/validate.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/user-discovery/user-discovery.template.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/user-interview/user-interview.template.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/user-interview/validate.md` (2 replacements)
- `_bmad/bme/_vortex/workflows/vortex-navigation/vortex-navigation.template.md` (1 replacement)
- `_bmad/bme/_vortex/workflows/_deprecated/empathy-map/empathy-map.template.md` (1 replacement)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (status updated)
- `_bmad-output/implementation-artifacts/p3-2-3-update-secondary-docs-user-guides-shipped-content.md` (story file updated)

## Code Review Record

### Review Date
2026-03-07

### Reviewer
Claude Opus 4.6 (adversarial code review)

### Verdict
PASS

### Findings Summary

**0 HIGH, 0 MEDIUM, 3 LOW**

| # | Severity | Description | Status |
|---|----------|-------------|--------|
| L1 | LOW | Dev Notes L120 says "agents.md: Zero stale product refs" but dev agent found and fixed 1 at L346 — minor doc inconsistency | NOTED |
| L2 | LOW | `docs/testing.md` references outdated test suite versions (v1.5.0) — pre-existing, not in scope | NOTED |
| L3 | LOW | User guide agent version fields (e.g., "Version: 1.6.4") don't match product v2.0.0 — technically correct (agent vs product version) | NOTED |

### AC Verification

| AC | Status | Evidence |
|----|--------|----------|
| #1 docs/ files | PASS | 4 files updated, zero stale refs via grep |
| #2 User guides | PASS | 7 files updated, zero stale refs via grep |
| #3 Workflow templates | PASS | 14 files updated, no double-replacements |
| #4 Workflow validates | PASS | 8 files updated, GitHub URLs lowercase |
| #5 Config | PASS | `project_name: Convoke` confirmed |
| #6 Cross-file verification | PASS | `docs-audit` returns zero findings |
