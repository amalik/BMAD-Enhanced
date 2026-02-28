# Story p2-1.4: Validate Pass 1 Completeness & Document Inter-Pass Checkpoint

Status: ready-for-dev

## Story

As a maintainer,
I want to execute the inter-pass validation gate and document the two-pass process,
So that I have confidence Pass 1 is complete and a repeatable process for Pass 2 after all Phase 2 content changes.

## Acceptance Criteria

1. **Given** all Pass 1 fixes from Stories 1.2 and 1.3 have been applied, **When** the maintainer runs the docs audit tool as an inter-pass validation, **Then** the report confirms zero findings across all categories addressed in Pass 1 (stale-reference, broken-link, broken-path, missing-coverage)
2. **Given** the maintainer needs to understand the docs fix process, **When** they read the inter-pass checkpoint document, **Then** they find the two-pass process documented: what Pass 1 covers (stale references, broken links, extension guidance, forward-compatibility) and what Pass 2 will re-validate after Epics 2-5
3. **Given** Pass 2 will run in Epic 6 (Story 6.2), **When** the maintainer begins Pass 2, **Then** they can compare against the Pass 1 checkpoint baseline — a recorded snapshot of audit output, test count, file scope, and date
4. **Given** later epics will introduce new documentation content, **When** the maintainer reviews the checkpoint, **Then** they find explicit "deferred to Pass 2" items listing what content changes from Epics 2-5 will require re-validation

## Tasks / Subtasks

- [ ] Task 1: Execute inter-pass validation audit (AC: 1)
  - [ ] 1.1: Run `npm run docs:audit -- --json` — verify zero findings (empty array `[]`)
  - [ ] 1.2: Run `npm test` — verify all 248 tests pass with zero failures
  - [ ] 1.3: Run `npm run lint` — verify clean output
  - [ ] 1.4: Record baseline metrics: finding count (0), test count, files scanned, audit categories checked (stale-reference, broken-link, broken-path, missing-coverage)

- [ ] Task 2: Create inter-pass checkpoint document (AC: 2, 3)
  - [ ] 2.1: Create `_bmad-output/implementation-artifacts/p2-epic-1-inter-pass-checkpoint.md`
  - [ ] 2.2: Add header with date, project version (1.6.4), Pass 1 designation
  - [ ] 2.3: Add "Pass 1 Summary" section — scope of work across Stories 1.1-1.3: audit tool built, 18 findings resolved, extension guidance added, forward-compatibility documented
  - [ ] 2.4: Add "Baseline State" section — verbatim audit output (`[]`), test count (248), files scanned list (9 user-facing docs), categories checked (4)
  - [ ] 2.5: Add "Two-Pass Process" section — explains that Pass 1 establishes a clean baseline before content-heavy Epics 2-5, and Pass 2 (Epic 6, Story 6.2) re-validates after all content changes to catch regressions
  - [ ] 2.6: Add "Pass 2 Execution Guide" — commands to run, how to diff results against this checkpoint baseline

- [ ] Task 3: Document deferred findings for Pass 2 (AC: 4)
  - [ ] 3.1: Analyze Epics 2-5 for documentation impact — identify what new content each epic adds or modifies
  - [ ] 3.2: Add "Deferred to Pass 2" section listing expected documentation changes per epic:
    - Epic 2 (P0 Test Framework): test infrastructure docs, coverage thresholds, new test counts
    - Epic 3 (Full Agent Validation): P0 content tests, voice consistency, handoff contract validation, CI docs
    - Epic 4 (Journey Example): new `_bmad-output/journey-example/` content, handoff annotations, cross-references from faq.md
    - Epic 5 (CLI Reliability): README landing page rewrite, output previews, user feedback mechanism
  - [ ] 3.3: Note audit tool limitations discovered in Story 1.3 — semantic stale patterns not caught by numeric/word matching — recommend manual review alongside automated audit for Pass 2

- [ ] Task 4: Validation — verify story completeness (AC: all)
  - [ ] 4.1: Re-run `npm run docs:audit -- --json` — confirm zero findings still hold after checkpoint document creation
  - [ ] 4.2: Re-run `npm test` — confirm all tests pass
  - [ ] 4.3: Verify checkpoint document contains all required sections: Pass 1 Summary, Baseline State, Two-Pass Process, Deferred to Pass 2, Pass 2 Execution Guide

## Dev Notes

### This is a Documentation + Validation Story

The primary deliverable is the inter-pass checkpoint document — a new markdown file that records the current docs health baseline and defines the two-pass process. No JavaScript code changes are expected. The audit tool and tests should be run for validation but not modified.

### Inter-Pass Checkpoint Document Location

Create at: `_bmad-output/implementation-artifacts/p2-epic-1-inter-pass-checkpoint.md`

This location is in the implementation artifacts directory alongside story files. It will be referenced by Pass 2 (Epic 6, Story 6.2) which explicitly mentions "compared against the Pass 1 checkpoint baseline (Story 1.4)."

### What Pass 1 Covered (Stories 1.1-1.3)

**Story 1.1 — Built the audit tool:**
- `scripts/docs-audit.js` — 4 check functions: stale-reference, broken-link, broken-path, missing-coverage
- All values derived dynamically from `agent-registry.js` — zero hardcoded expectations
- JSON output (`--json` flag) and human-readable output
- Exit code 0 = clean, 1 = findings
- 40 tests in `tests/unit/docs-audit.test.js`
- Initial audit found 27 findings (reduced to 18 after code review fixes eliminated CHANGELOG noise)

**Story 1.2 — Fixed all 18 findings:**
- 4 broken-link (docs/agents.md user guide paths → `_bmad/bme/_vortex/guides/`)
- 12 stale-reference (agent counts "4 agents" → "7 agents", workflow counts "13 workflows" → "22 workflows" across 6 files)
- 2 broken-path (BMAD-METHOD-COMPATIBILITY.md — old `_bmad/_config/bmad.yaml` path → `_bmad/bmm/config.yaml`)
- BMAD-METHOD-COMPATIBILITY.md rewritten to match actual installer behavior, version bumped to v1.6.4
- 2 CLI test expectations updated (audit now returns zero findings, exit code 0)
- Post-fix: audit returns `[]`, 248 tests pass

**Story 1.3 — Added extension guidance + forward-compatibility:**
- UPDATE-GUIDE.md: Forward Compatibility section (what's backward-compatible, what's managed by update system)
- docs/faq.md: 2 new FAQs (extension guidance with BMB table, handoff failure diagnosis), 5 stale section fixes (agent table, handoff chain, independent use, recommended order, Wave 3)
- docs/agents.md: Journey 6 rewrite recommending BMB over manual approach
- Code review caught 4 issues (1H: wrong HC path `config.yaml` → `contracts/`, 3M), all fixed
- Post-fix: audit still returns `[]`, 248 tests pass

### Known Audit Tool Limitations (from Story 1.3 Learnings)

The audit tool does NOT catch all forms of stale content:
- "all four together" — no numeric match, no known stale-word pattern
- Wave 3 section used stream names (Synthesize, Hypothesize, Sensitize) not agent counts — invisible to numeric checks
- Table/list content with only 4 agents listed — audit checks for mentions, not completeness of agent lists
- Parenthetical internal names like "(Synthesize)" — not in stale terminology patterns

**Recommendation for Pass 2**: Run the automated audit AND perform a manual review for semantic stale patterns. Consider whether the audit tool should be enhanced with additional patterns (scope for a future story, not this one).

### Deferred Findings Analysis — Epics 2-5 Impact

Each subsequent epic introduces documentation content that Pass 2 must verify:

**Epic 2 (P0 Test Framework & Infrastructure Agent Validation):**
- New test infrastructure → docs/testing.md may reference new test patterns and counts
- P0 activation tests for Emma and Wade → test count will increase
- docs/agents.md may need Emma/Wade test validation references

**Epic 3 (Full Agent Validation & Content Correctness):**
- P0 content-only tests for remaining 5 agents → test count increases further
- Voice consistency validation → may add docs/testing.md content about voice checks
- Handoff contract validation tests → may reference `_bmad/bme/_vortex/contracts/` schema locations
- CI content correctness → docs/development.md CI section may need updates

**Epic 4 (Journey Example & Editorial Quality):**
- New `_bmad-output/journey-example/` directory with real artifacts → placeholder in docs/faq.md must resolve
- Handoff annotations → new documentation about contract verification at each handoff point
- docs/agents.md and docs/faq.md cross-references must validate against actual journey content
- Editorial review may restructure existing documentation sections

**Epic 5 (CLI Reliability, Discovery Experience & User Feedback):**
- README.md major rewrite — landing page, value proposition, visual overview
- Output previews and journey link in README
- Test coverage changes for `bmad-update.js` and `bmad-version.js` (85% target)
- docs/testing.md coverage thresholds may change
- Structured user feedback mechanism → may add docs/faq.md content

### Checkpoint Document Content Plan

The checkpoint document (`p2-epic-1-inter-pass-checkpoint.md`) should contain:

1. **Header** — Date, version, pass number, purpose
2. **Pass 1 Summary** — What was done across Stories 1.1-1.3, files modified, findings resolved
3. **Baseline State** — Verbatim audit JSON output, test count, file scope, audit categories
4. **Two-Pass Process** — Why two passes (content changes in Epics 2-5 will introduce new docs that may contain stale patterns), what each pass covers
5. **Deferred to Pass 2** — Itemized list per epic of expected documentation changes
6. **Pass 2 Execution Guide** — Exact commands, comparison procedure, manual review checklist

### Architecture Compliance

- **Language:** Markdown only — no JavaScript changes expected
- **Test framework:** If test expectations change: `node:test` + `node:assert/strict`
- **Linting:** Must pass `npm run lint` if any JS files are modified
- **No new dependencies**
- **Audit:** `npm run docs:audit -- --json` must return zero findings

### Current Reality (from registry)

- **7 agents:** Emma, Isla, Mila, Liam, Wade, Noah, Max
- **22 workflows:** lean-persona, product-vision, contextualize-scope, empathy-map, user-interview, user-discovery, research-convergence, pivot-resynthesis, pattern-mapping, hypothesis-engineering, assumption-mapping, experiment-design, mvp, lean-experiment, proof-of-concept, proof-of-value, signal-interpretation, behavior-analysis, production-monitoring, learning-card, pivot-patch-persevere, vortex-navigation
- **Package version:** 1.6.4
- **Test count:** 248 (40 docs-audit + 208 existing)
- **Audit findings:** 0 (verified in Stories 1.2 and 1.3)

### Previous Story Learnings (p2-1-3)

- Handoff contract schemas are in `_bmad/bme/_vortex/contracts/` (5 files: hc1-hc5), NOT in `config.yaml` — Story 1.3 Dev Notes incorrectly stated `config.yaml`, caught during code review
- Audit tool doesn't catch all stale content: "all four together", stream name parentheticals, incomplete agent lists in tables — manual review needed alongside automated checks
- Context-aware editing is critical: read full paragraph, understand context, update coherently
- `npm run docs:audit -- --json` gives machine-parseable output for verification
- BMB module at `_bmad/bmb/` with 3 builders (Bond, Morgan, Wendy) — extension guidance is now documented in docs/faq.md and docs/agents.md
- Forward-compatibility guidance now exists in UPDATE-GUIDE.md — artifacts in `_bmad-output/` survive updates
- Code review found 4 issues in Story 1.3: wrong HC path (H), redundant content (M), confusing versioning (M), legacy stream names (M) — all fixed

### Files to Create

- `_bmad-output/implementation-artifacts/p2-epic-1-inter-pass-checkpoint.md` (NEW — inter-pass checkpoint document)

### Files to Verify (read-only — run commands, check output)

- `scripts/docs-audit.js` (RUN — `npm run docs:audit -- --json`)
- `tests/unit/docs-audit.test.js` (RUN — `npm test`)

### Project Structure Notes

- Checkpoint document goes in implementation-artifacts alongside story files — standard location for sprint/epic artifacts
- No changes to source code, audit tool, or tests
- The checkpoint document is a new artifact, not a modification of existing user-facing docs
- Pass 2 (Epic 6, Story 6.2) will reference this checkpoint by path
- The audit tool scans `docs/` and root-level user-facing docs — `_bmad-output/` is NOT in scope, so the checkpoint document won't affect audit results

### References

- [Source: _bmad-output/planning-artifacts/epics-phase2.md — Epic 1, Story 1.4, lines 284-297]
- [Source: _bmad-output/planning-artifacts/prd-phase2.md — FR5 (two-pass docs fix process with validation between passes)]
- [Source: _bmad-output/planning-artifacts/prd-phase2.md — FR1-4 (audit tool capabilities and docs accuracy)]
- [Source: _bmad-output/planning-artifacts/epics-phase2.md — Epic 6, Story 6.2 (Pass 2 definition, references Pass 1 checkpoint baseline)]
- [Source: _bmad-output/implementation-artifacts/p2-1-1-build-programmatic-docs-audit-tool.md — Audit tool: 4 categories, registry-driven, 40 tests]
- [Source: _bmad-output/implementation-artifacts/p2-1-2-execute-docs-fix-pass-1-stale-references-broken-links.md — Pass 1 fixes: 18 findings resolved across 8 files]
- [Source: _bmad-output/implementation-artifacts/p2-1-3-add-forward-compatibility-extension-guidance.md — Extension guidance, forward-compat, audit limitations learned]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
