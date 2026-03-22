# Story 3.3: Update Historical Documentation in _bmad-output/

Status: done

## Story

As a maintainer,
I want all historical documentation in `_bmad-output/` updated to reference Convoke,
So that the entire project history consistently uses the current product name.

## Acceptance Criteria

1. **Given** ~13 root-level files in `_bmad-output/` (~39 refs)
   **When** the rename is applied
   **Then** all stale `bmad-enhanced`/`BMAD-Enhanced` and old CLI command references are replaced with Convoke equivalents
   **And** zero stale refs remain

2. **Given** ~25 files in `_bmad-output/planning-artifacts/` (~394 refs)
   **When** the rename is applied
   **Then** all stale product name and CLI command references are replaced
   **And** `_bmad/` path references are NOT affected
   **And** "BMAD Method" / "BMad Core" references are NOT affected
   **And** zero stale refs remain

3. **Given** ~8 files in `_bmad-output/project-documentation/` (~133 refs)
   **When** the rename is applied
   **Then** all stale product name and CLI command references are replaced
   **And** zero stale refs remain

4. **Given** ~19 files in `_bmad-output/implementation-artifacts/` (~85 refs, excluding p3-* and sprint-status.yaml)
   **When** the rename is applied
   **Then** all stale product name and CLI command references are replaced
   **And** Phase 3 story files (`p3-*`) are NOT modified (they document the rename itself)
   **And** `sprint-status.yaml` is NOT modified
   **And** zero stale refs remain in non-excluded files

5. **Given** remaining files in `brainstorming/` (~5 files), `test-artifacts/` (~6 files), `journey-examples/` (~1 file), `vortex-artifacts/` (~1 file)
   **When** the rename is applied
   **Then** all stale product name and CLI command references are replaced
   **And** zero stale refs remain

6. **Given** ~69 files in `_bmad-output/.backups/` (~69 refs)
   **When** the rename is applied
   **Then** all stale product name and CLI command references are replaced
   **And** zero stale refs remain

7. **Given** all changes
   **When** a `git diff` is reviewed (NFR3)
   **Then** the diff is manually inspected for false positives before the story is marked complete
   **And** `_bmad/` paths are confirmed untouched
   **And** "BMAD Method" / "BMad Core" references are confirmed untouched
   **And** URL contexts use lowercase `convoke`

8. **Given** all changes
   **When** a comprehensive grep is run
   **Then** zero instances of `bmad-enhanced`/`BMAD-Enhanced`/`BMAD Enhanced` remain in `_bmad-output/` (excluding `p3-*` story files and `sprint-status.yaml`)
   **And** zero instances of old CLI commands (`bmad-update`, `bmad-version`, `bmad-migrate`, `bmad-doctor`, `bmad-install`) remain (excluding `p3-*` story files, `sprint-status.yaml`, and CHANGELOG.md "was" column references quoted in story files)
   **And** `npm test` passes with zero failures

## Tasks / Subtasks

- [x] Task 1: Update `_bmad-output/` root-level files (AC: #1)
  - [x] 1.1: Apply sed replacement pipeline to 13 root-level files (39 refs + 8 `BMAD Enhanced` space-separated)
  - [x] 1.2: Grep verify — zero stale refs

- [x] Task 2: Update `planning-artifacts/` (AC: #2)
  - [x] 2.1: Apply sed replacement pipeline to 25 files (~394 refs)
  - [x] 2.2: Post-replace URL audit — zero uppercase URLs found
  - [x] 2.3: Grep verify — zero stale refs (1 partial-replace artifact in epics-phase3.md fixed manually)

- [x] Task 3: Update `project-documentation/` (AC: #3)
  - [x] 3.1: Apply sed replacement pipeline to 8 files (~133 refs)
  - [x] 3.2: Post-replace URL audit — zero issues
  - [x] 3.3: Grep verify — zero stale refs

- [x] Task 4: Update `implementation-artifacts/` non-p3 files (AC: #4)
  - [x] 4.1: Identified 19 files to update (excluded `p3-*`, `sprint-status.yaml`)
  - [x] 4.2: Apply sed replacement pipeline to 19 files (~85 refs)
  - [x] 4.3: Grep verify — zero stale refs in updated files

- [x] Task 5: Update remaining subdirectories (AC: #5)
  - [x] 5.1: Apply sed replacement pipeline to `brainstorming/` (5 files)
  - [x] 5.2: Apply sed replacement pipeline to `test-artifacts/` (6 files)
  - [x] 5.3: Apply sed replacement pipeline to `journey-examples/` (1 file)
  - [x] 5.4: Apply sed replacement pipeline to `vortex-artifacts/` (1 file)
  - [x] 5.5: Grep verify all — zero stale refs

- [x] Task 6: Update `.backups/` (AC: #6)
  - [x] 6.1: Apply sed replacement pipeline to 69 files (across .md, .json, .yaml, .csv)
  - [x] 6.2: Grep verify — zero stale refs

- [x] Task 7: Manual `git diff` review (AC: #7, NFR3)
  - [x] 7.1: Run `git diff` — 147 files modified, reviewed for false positives
  - [x] 7.2: Verify `_bmad/` paths untouched — confirmed
  - [x] 7.3: Verify "BMAD Method" / "BMad Core" references untouched — confirmed
  - [x] 7.4: Verify URL contexts use lowercase `convoke` — confirmed, zero uppercase URLs
  - [x] 7.5: Found and fixed 8 files with `_bmad-enhanced/` → `_convoke/` false positives (reverted)

- [x] Task 8: Final cross-directory verification (AC: #8)
  - [x] 8.1: Grep entire `_bmad-output/` — zero product name stale refs (excluding p3-*, sprint-status, `_bmad-enhanced/` path refs, and `.logs/` absolute paths)
  - [x] 8.2: Grep for old CLI commands — zero stale refs (same exclusions)
  - [x] 8.3: Run `npm test` — 315/315 pass, zero failures

## Dev Notes

### Critical Context

**This is the LARGEST story in Phase 3 by file count.** ~147 files with stale refs, ~748 total references across root-level, planning-artifacts, project-documentation, implementation-artifacts, brainstorming, test-artifacts, journey-examples, vortex-artifacts, and .backups subdirectories.

**NFR3 is non-negotiable for this story:** Manual `git diff` review before marking complete. This is a new discipline not exercised in Epics 1 or 2 — the Epic 2 retro team agreement says "no bulk commit without reading the diff."

**Ref distribution by subdirectory:**
| Subdirectory | Files | Approx Refs | Priority |
|---|---|---|---|
| planning-artifacts/ | ~25 | ~394 | HIGH — largest concentration |
| project-documentation/ | ~8 | ~133 | HIGH |
| implementation-artifacts/ (non-p3) | ~19 | ~85 | MEDIUM |
| .backups/ | ~69 | ~69 | LOW — bulk mechanical |
| root-level | ~13 | ~39 | MEDIUM |
| brainstorming/ | ~5 | ~13 | LOW |
| test-artifacts/ | ~6 | ~12 | LOW |
| journey-examples/ | ~1 | ~2 | LOW |
| vortex-artifacts/ | ~1 | ~1 | LOW |

**Key exclusions (NOT in scope):**
- `p3-*` story files in `implementation-artifacts/` — these document the rename and contain old names as specifications
- `sprint-status.yaml` — managed by workflow tooling
- `_bmad/` paths — never modified
- "BMAD Method" / "BMad Core" references — never modified

### Safe Replacement Patterns (NFR4)

**Product name replacements:**
- `BMAD-Enhanced` -> `Convoke`
- `bmad-enhanced` -> `convoke`
- `BMAD Enhanced` -> `Convoke` (no instances found in audit, but verify during execution)

**CLI command replacements:**
- `bmad-install-vortex-agents` -> `convoke-install-vortex`
- `bmad-install-agents` -> `convoke-install`
- `bmad-install-emma` -> `convoke-install-emma` (deprecated v1.0.x, included for completeness)
- `bmad-install-wade` -> `convoke-install-wade` (deprecated v1.0.x, included for completeness)
- `bmad-update` -> `convoke-update`
- `bmad-version` -> `convoke-version`
- `bmad-migrate` -> `convoke-migrate`
- `bmad-doctor` -> `convoke-doctor`

**DO NOT replace:**
- `_bmad` in any path
- `BMAD Method` or `BMad Core`
- Agent names or IDs
- `.claude/commands/bmad-*` skill refs
- Bare `bmad` (only hyphenated forms)

### Replacement Ordering (Standing Rule from Epic 2 Retro)

**CRITICAL:** Replace longer patterns FIRST to avoid partial matches. Apply URL-specific replacements before general display name replacements:
1. `github.com/amalik/BMAD-Enhanced` -> `github.com/amalik/convoke-agents` (URL, lowercase)
2. `npmjs.com/package/bmad-enhanced` -> `npmjs.com/package/convoke-agents` (URL)
3. `bmad-install-vortex-agents` -> `convoke-install-vortex`
4. `bmad-install-agents` -> `convoke-install`
5. `bmad-install-emma` -> `convoke-install-emma`
6. `bmad-install-wade` -> `convoke-install-wade`
7. `BMAD-Enhanced` -> `Convoke`
8. `bmad-enhanced` -> `convoke`
9. `bmad-update` -> `convoke-update`
10. `bmad-version` -> `convoke-version`
11. `bmad-migrate` -> `convoke-migrate`
12. `bmad-doctor` -> `convoke-doctor`

### Post-Replace Audit (from Epic 2 Retro Action Item #2)

After any `replace_all`, specifically audit:
- **URL contexts** — must be lowercase (`github.com/amalik/convoke-agents`, NOT `github.com/amalik/Convoke`)
- **Filesystem path contexts** — case-sensitive, verify correctness
- **"was" / comparison contexts** — do NOT replace old names that are being referenced as historical values (e.g., CHANGELOG.md "was" column pattern)

### Implementation Strategy

**Use sed pipeline (proven in Story 3.2).** Process files by subdirectory group:
1. Identify target files per subdirectory (excluding p3-* and sprint-status.yaml)
2. Apply the 12-pattern ordered sed pipeline to all files in the group
3. Grep verify zero stale refs per group
4. After ALL groups: run comprehensive cross-directory verification
5. Run `git diff` for NFR3 manual review — present summary to user

**For .backups/:** These include .md, .json, .yaml, and .csv files. The sed pipeline works on all text file types.

### Manual `git diff` Review Protocol (NFR3)

This is the first time this discipline is exercised. The review must check:
1. **No `_bmad` path modifications** — grep the diff for `_bmad` context changes
2. **No "BMAD Method" / "BMad Core" modifications** — verify these survive
3. **URL case correctness** — all GitHub/npm URLs use lowercase
4. **No false positives in quoted/comparison contexts** — "was `bmad-*`" patterns
5. **File count sanity check** — diff should show ~147 files modified, not more

Present a summary to the user showing: files modified count, sample replacements from each subdirectory, and any flagged concerns.

### Previous Story Intelligence

**From Story 3.2:**
- Single sed pipeline with 12 ordered patterns worked perfectly for 10 files
- `bmad-install-emma`/`bmad-install-wade` needed adding beyond the story mapping — include them upfront this time
- Post-replace URL audit found zero case issues — the URL-first ordering prevents the problem
- No `BMAD Enhanced` (space-separated) found in any file — likely won't appear here either

**From Story 3.2 Code Review:**
- L1 LOW: Historical artifact filenames renamed (e.g., `bmad-enhanced-*.tgz` -> `convoke-*.tgz` in deletion records). Accept as cosmetic — applies to historical docs too
- L2 LOW: Undocumented `bmad-install-emma/wade` replacements. Now documented in this story's patterns

**From Epic 2 Retrospective (Action Items):**
- Standing rule: replacement ordering (longer patterns first) — APPLIED
- Post-replace URL/path audit after any replace_all — APPLIED
- `BMAD Enhanced` (space-separated) requires per-instance context check — APPLIED (none expected based on audit)

**From Epic 2 Retrospective (Team Agreements):**
- Manual `git diff` review is non-negotiable for Story 3.3 — ENFORCED via Task 7
- `BMAD Enhanced` (space-separated) replacements require per-instance context check — APPLIED
- Carry-forward debt must be resolved within one epic — no debt expected from this story

**From Epic 1 Retrospective:**
- Grep verification as quality gate — 100% success rate. Continue pattern.

### What NOT to Change in This Story

- Do NOT update source code files — done in Epic 1
- Do NOT update test files — done in Epic 1
- Do NOT update docs/ files — done in Epic 2
- Do NOT update top-level misc files — done in Story 3.2
- Do NOT update `.github/` files — done in Story 3.1
- Do NOT modify `_bmad/` paths or agent definitions
- Do NOT modify `p3-*` story files in implementation-artifacts/
- Do NOT modify `sprint-status.yaml`

### References

- [Source: _bmad-output/planning-artifacts/epics-phase3.md#Story 3.3, lines 421-450]
- [Source: _bmad-output/implementation-artifacts/p3-3-2-update-miscellaneous-top-level-files.md — Previous story, completed]
- [Source: _bmad-output/implementation-artifacts/p3-epic-2-retro-2026-03-07.md — NFR3 team agreement, replacement ordering rule, URL audit rule]
- [Source: _bmad-output/implementation-artifacts/p3-epic-1-retro-2026-03-06.md — PSI pattern, grep verification]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None — all tasks completed without errors.

### Completion Notes List

- Applied 13-pattern ordered sed pipeline (URLs first, longest CLI commands, product names with `BMAD Enhanced` space-separated variant added, then shorter CLI commands) across 9 subdirectory groups + `.logs/` directory.
- 150 files modified total (147 in scope + 3 `.logs/` files).
- `BMAD Enhanced` (space-separated) found in 6 root-level files (8 instances) — not found in initial audit but discovered during Task 1 verification. Added to sed pipeline for all subsequent groups.
- `epics-phase3.md` had verification grep commands (lines 455-466) semantically inverted by sed — OLD stale-ref patterns were replaced with NEW names, changing "search for stale refs" into "search for current names." Code review caught this (M1) and reverted both grep commands to their original OLD patterns with clarifying comments. Also fixed cosmetic duplicate `Convoke\|Convoke` (from `BMAD-Enhanced` and `BMAD Enhanced` both mapping to `Convoke`).
- NFR3 `git diff` review caught 8 files with false positives: `_bmad-enhanced/` directory path references were converted to `_convoke/` and `_bmad/bmad-enhanced/` to `_bmad/convoke/`. These are historical directory names that never existed as `_convoke/`. All 8 files reverted with targeted sed: `_convoke/` → `_bmad-enhanced/`, `_bmad/convoke/` → `_bmad/bmad-enhanced/`. One additional instance without trailing slash (`cp -r _convoke _bmad/convoke`) fixed manually.
- `.logs/` directory (3 files) contained stale refs in headers, URLs, and CLI names — updated. Absolute filesystem paths in stack traces (`/Users/.../BMAD-Enhanced/...`) preserved as-is since the repo directory on disk is still named `BMAD-Enhanced`.
- Remaining `bmad-enhanced` in `_bmad-output/`: only `_bmad-enhanced/` directory path references in 8 files (historical directory name, correct) and absolute filesystem paths in 3 `.logs/` files (runtime state, correct).
- Verification: zero product name stale refs, zero CLI stale refs. `npm test` — 315/315 pass.

### File List

**Root-level (13 files):**
- `_bmad-output/BMAD-BUILDER-ANALYSIS.md`
- `_bmad-output/DISTRIBUTION-UPDATE-COMPLETE.md`
- `_bmad-output/DOCUMENT-ALIGNMENT-ANALYSIS.md`
- `_bmad-output/FLEXIBLE-DISTRIBUTION-UPDATE.md`
- `_bmad-output/GENERIC-AGENT-INTEGRATION-FRAMEWORK.md`
- `_bmad-output/PIVOT-SUMMARY-2026-02-07.md`
- `_bmad-output/PROJECT-STATUS-UPDATE.md`
- `_bmad-output/README-CONFLICT-RESOLUTION.md`
- `_bmad-output/README.md`
- `_bmad-output/ROADMAP-UPDATE-COMPLETE.md`
- `_bmad-output/WADE-COMPLETION-STATUS.md`
- `_bmad-output/WADE-DEVELOPMENT-PLAN.md`
- `_bmad-output/rayas-journey-acceptance-test.md`

**planning-artifacts/ (25 files):**
- `_bmad-output/planning-artifacts/product-brief-BMAD-Enhanced-2026-02-22.md`
- `_bmad-output/planning-artifacts/prd.md`
- `_bmad-output/planning-artifacts/architecture.md`
- `_bmad-output/planning-artifacts/technical-deep-dive-analysis.md`
- `_bmad-output/planning-artifacts/align-command-prototype.md`
- `_bmad-output/planning-artifacts/ORIGINAL-VISION-README.md`
- `_bmad-output/planning-artifacts/framework-deep-dive-analysis.md`
- `_bmad-output/planning-artifacts/phase-0-alternative-agent-integration.md`
- `_bmad-output/planning-artifacts/integration-roadmap.md`
- `_bmad-output/planning-artifacts/prd-phase2.md`
- `_bmad-output/planning-artifacts/phase-0-implementation-guide.md`
- `_bmad-output/planning-artifacts/architectural-decision-record.md`
- `_bmad-output/planning-artifacts/executive-summary-presentation.md`
- `_bmad-output/planning-artifacts/phase-0-workflow-map.md`
- `_bmad-output/planning-artifacts/epics.md`
- `_bmad-output/planning-artifacts/implementation-readiness-report-2026-02-23.md`
- `_bmad-output/planning-artifacts/distribution-strategy.md`
- `_bmad-output/planning-artifacts/epics-phase2.md`
- `_bmad-output/planning-artifacts/architectural-comparison-quint-vs-bmad-first.md`
- `_bmad-output/planning-artifacts/baseartifact-contract-spec.md`
- `_bmad-output/planning-artifacts/implementation-readiness-report-2026-02-28.md`
- `_bmad-output/planning-artifacts/epics-phase3.md`
- `_bmad-output/planning-artifacts/greenfield-architecture-analysis.md`
- `_bmad-output/planning-artifacts/product-brief-BMAD-Enhanced-2026-02-01.md`
- `_bmad-output/planning-artifacts/4-framework-comparison-matrix.md`

**project-documentation/ (8 files):**
- `_bmad-output/project-documentation/INSTALLATION-SYSTEM-SUMMARY.md`
- `_bmad-output/project-documentation/PUBLICATION-SUCCESS-v1.0.3-alpha.md`
- `_bmad-output/project-documentation/RELEASE-NOTES-v1.0.2-alpha.md`
- `_bmad-output/project-documentation/PREREQUISITE-CHECK-UPDATE.md`
- `_bmad-output/project-documentation/TEST-RESULTS-v1.0.3-alpha.md`
- `_bmad-output/project-documentation/NPX-INSTALLATION-UPDATE.md`
- `_bmad-output/project-documentation/CLEANUP-AUDIT.md`
- `_bmad-output/project-documentation/PUBLISHING-COMPLETE.md`

**implementation-artifacts/ (19 files, excluding p3-*):**
- `_bmad-output/implementation-artifacts/4-5-create-noah-user-guide-example-artifacts.md`
- `_bmad-output/implementation-artifacts/p2-1-2-execute-docs-fix-pass-1-stale-references-broken-links.md`
- `_bmad-output/implementation-artifacts/p2-1-4-validate-pass-1-completeness-document-inter-pass-checkpoint.md`
- `_bmad-output/implementation-artifacts/1-1-expand-agent-registry-to-7-agents.md`
- `_bmad-output/implementation-artifacts/epic-1-retro-2026-02-24.md`
- `_bmad-output/implementation-artifacts/p2-5-2-bmad-version-js-automated-tests-at-85-coverage.md`
- `_bmad-output/implementation-artifacts/p2-5-1-bmad-update-js-automated-tests-at-85-coverage.md`
- `_bmad-output/implementation-artifacts/epic-3-retro-2026-02-25.md`
- `_bmad-output/implementation-artifacts/p2-5-5-structured-user-feedback-mechanism.md`
- `_bmad-output/implementation-artifacts/epic-2-retro-2026-02-25.md`
- `_bmad-output/implementation-artifacts/1-2-update-validator-config-merger-doctor-for-7-agents.md`
- `_bmad-output/implementation-artifacts/p2-epic-4-retro-2026-03-01.md`
- `_bmad-output/implementation-artifacts/2-5-create-mila-user-guide-example-artifacts.md`
- `_bmad-output/implementation-artifacts/p2-epic-5-retro-2026-03-02.md`
- `_bmad-output/implementation-artifacts/p2-6-3-scripted-end-to-end-rayas-journey-acceptance-test.md`
- `_bmad-output/implementation-artifacts/1-3-create-migration-delta-installer-updates.md`
- `_bmad-output/implementation-artifacts/p2-5-3-readme-landing-page-value-proposition-visual-overview.md`
- `_bmad-output/implementation-artifacts/p2-1-1-build-programmatic-docs-audit-tool.md`
- `_bmad-output/implementation-artifacts/p2-epic-1-inter-pass-checkpoint.md`

**brainstorming/ (5 files):**
- `_bmad-output/brainstorming/orchestration-patterns-catalog.md`
- `_bmad-output/brainstorming/brainstorming-session-2026-02-05.md`
- `_bmad-output/brainstorming/alignment-summary.md`
- `_bmad-output/brainstorming/llm-agnostic-architecture.md`
- `_bmad-output/brainstorming/architectural-decision-framework.md`

**test-artifacts/ (6 files):**
- `_bmad-output/test-artifacts/wade-tests/WADE-STAKEHOLDER-SIGNOFF.md`
- `_bmad-output/test-artifacts/wade-tests/WADE-FINAL-SUMMARY.md`
- `_bmad-output/test-artifacts/wade-tests/wade-p0-test-execution.md`
- `_bmad-output/test-artifacts/emma-tests/STAKEHOLDER-SIGNOFF-REVIEW.md`
- `_bmad-output/test-artifacts/emma-tests/results/empathy-map-sarah-chen-2026-02-14.md`
- `_bmad-output/test-artifacts/test-design/emma-agent-verification-test-design.md`

**journey-examples/ (1 file):**
- `_bmad-output/journey-examples/busy-parents-7-agent-journey.md`

**vortex-artifacts/ (1 file):**
- `_bmad-output/vortex-artifacts/lean-persona-busy-parents-2026-03-01.md`

**.backups/ (69 files):**
- All 69 files with stale refs across `.md`, `.json`, `.yaml`, `.csv` formats

**.logs/ (3 files):**
- `_bmad-output/.logs/migration-1772198765807.log`
- `_bmad-output/.logs/migration-error-1772198614200.log`
- `_bmad-output/.logs/migration-error-1772198687988.log`

**Story/sprint tracking (updated):**
- `_bmad-output/implementation-artifacts/p3-3-3-update-historical-documentation-bmad-output.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
