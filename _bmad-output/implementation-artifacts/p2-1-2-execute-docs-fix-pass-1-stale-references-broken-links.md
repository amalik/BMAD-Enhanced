# Story 1.2: Execute Docs Fix Pass 1 — Stale References & Broken Links

Status: ready-for-dev

## Story

As a new or returning user,
I want all documentation to accurately reflect the current 7-agent, 22-workflow reality with zero broken internal links,
So that I can trust what I read and navigate docs without hitting dead ends.

## Acceptance Criteria

1. **Given** the docs audit tool from Story 1.1 has produced a findings report, **When** the maintainer applies fixes to all identified stale references, **Then** all numeric references across docs match current reality (7 agents, 22 workflows)
2. **Given** the docs contain path references, **When** all fixes are applied, **Then** all path references point to existing files
3. **Given** the docs contain word-pattern variants, **When** all fixes are applied, **Then** all terminology reflects current state (no "original agents", "four agents", etc.) per NFR10
4. **Given** the docs contain internal markdown links, **When** all fixes are applied, **Then** all internal markdown links resolve to existing targets (FR3, NFR18)
5. **Given** all fixes are applied, **When** the maintainer re-runs `npm run docs:audit`, **Then** the tool produces zero findings for stale-reference, broken-link, and broken-path categories
6. **Given** all fixes are applied, **When** the full test suite is re-run, **Then** all 248 existing tests still pass (zero regressions)
7. **Given** the stale reference fixes, **When** context around each fix is reviewed, **Then** the surrounding paragraph remains coherent and accurate — not just the number substitution

## Tasks / Subtasks

- [ ] Task 1: Fix broken links in `docs/agents.md` (AC: 4)
  - [ ] 1.1: Update Emma user guide link L377: `../_bmad-output/vortex-artifacts/EMMA-USER-GUIDE.md` → `../_bmad/bme/_vortex/guides/EMMA-USER-GUIDE.md`
  - [ ] 1.2: Update Isla user guide link L378: `../_bmad-output/vortex-artifacts/ISLA-USER-GUIDE.md` → `../_bmad/bme/_vortex/guides/ISLA-USER-GUIDE.md`
  - [ ] 1.3: Update Wade user guide link L381: `../_bmad-output/vortex-artifacts/WADE-USER-GUIDE.md` → `../_bmad/bme/_vortex/guides/WADE-USER-GUIDE.md`
  - [ ] 1.4: Update Max user guide link L383: `../_bmad-output/vortex-artifacts/MAX-USER-GUIDE.md` → `../_bmad/bme/_vortex/guides/MAX-USER-GUIDE.md`

- [ ] Task 2: Fix stale references in `docs/development.md` (AC: 1, 3)
  - [ ] 2.1: L31 — update "4 agents" → "7 agents" and "13 workflows" → "22 workflows"; review surrounding paragraph for coherence
  - [ ] 2.2: L90 — update "13 workflows" → "22 workflows"; review surrounding paragraph for coherence

- [ ] Task 3: Fix stale references in `docs/testing.md` (AC: 1, 3)
  - [ ] 3.1: L31 — update "4 agents" → "7 agents"; review surrounding paragraph for coherence
  - [ ] 3.2: L102 — update "3 workflow" → "22 workflows"; review context (this may be a specific test count, not total — verify before changing)

- [ ] Task 4: Fix stale reference in `docs/faq.md` (AC: 1, 3)
  - [ ] 4.1: L79 — update "13 workflows" → "22 workflows"; review surrounding paragraph for coherence

- [ ] Task 5: Fix stale references in `README.md` (AC: 1, 3)
  - [ ] 5.1: L184 — update "4 agents" → "7 agents" and "13 workflows" → "22 workflows"; review surrounding paragraph for coherence

- [ ] Task 6: Fix stale reference in `UPDATE-GUIDE.md` (AC: 1, 3)
  - [ ] 6.1: L92 — update "4 agents" → "7 agents"; review surrounding paragraph for coherence

- [ ] Task 7: Fix stale references in `INSTALLATION.md` (AC: 1, 2, 3)
  - [ ] 7.1: L23 — update "13 workflows" → "22 workflows"
  - [ ] 7.2: L95 — update "4 agent" → "7 agent" (note: singular form, match the original grammar)
  - [ ] 7.3: L96 — update "13 workflows" → "22 workflows"

- [ ] Task 8: Fix broken paths in `BMAD-METHOD-COMPATIBILITY.md` (AC: 2)
  - [ ] 8.1: Read L88-110 to understand context — these reference `_bmad/_config/bmad.yaml` which was the old BMAD Method config location
  - [ ] 8.2: Determine correct fix: either update the path to the current config location (`_bmad/bmm/config.yaml` or `_bmad/bme/_vortex/config.yaml`) or annotate that this is describing the BMAD Method's structure (external dependency)
  - [ ] 8.3: Also update the outdated version reference "v1.0.4-alpha" on L91 if the document should reflect current state
  - [ ] 8.4: Apply fix that makes the audit pass while keeping the document accurate

- [ ] Task 9: Validation — re-run audit and verify zero findings (AC: 5)
  - [ ] 9.1: Run `npm run docs:audit -- --json` and verify zero findings for stale-reference, broken-link, broken-path categories
  - [ ] 9.2: If any findings remain, return to the relevant task and fix
  - [ ] 9.3: Capture final audit output showing zero non-coverage findings

- [ ] Task 10: Regression check — verify existing tests still pass (AC: 6)
  - [ ] 10.1: Run `npm test` — expect 248 tests passing
  - [ ] 10.2: Run `npm run lint` — expect clean
  - [ ] 10.3: If the CLI test "exits with code 1 when findings exist" now fails because audit passes, update test expectations

## Dev Notes

### This is a Documentation-Only Story

No JavaScript code changes are expected. All edits are to markdown files. The only possible code change is updating test expectations if the audit tool now produces zero findings on the real project (making the "exits with code 1" CLI test fail).

### Exact Finding List (from `npm run docs:audit -- --json`)

**18 findings across 8 files:**

| File | Line | Category | Current | Expected |
|------|------|----------|---------|----------|
| docs/agents.md | 377 | broken-link | `../_bmad-output/vortex-artifacts/EMMA-USER-GUIDE.md` | `../_bmad/bme/_vortex/guides/EMMA-USER-GUIDE.md` |
| docs/agents.md | 378 | broken-link | `../_bmad-output/vortex-artifacts/ISLA-USER-GUIDE.md` | `../_bmad/bme/_vortex/guides/ISLA-USER-GUIDE.md` |
| docs/agents.md | 381 | broken-link | `../_bmad-output/vortex-artifacts/WADE-USER-GUIDE.md` | `../_bmad/bme/_vortex/guides/WADE-USER-GUIDE.md` |
| docs/agents.md | 383 | broken-link | `../_bmad-output/vortex-artifacts/MAX-USER-GUIDE.md` | `../_bmad/bme/_vortex/guides/MAX-USER-GUIDE.md` |
| docs/development.md | 31 | stale-reference | "4 agents" | "7 agents" |
| docs/development.md | 31 | stale-reference | "13 workflows" | "22 workflows" |
| docs/development.md | 90 | stale-reference | "13 workflows" | "22 workflows" |
| docs/testing.md | 31 | stale-reference | "4 agents" | "7 agents" |
| docs/testing.md | 102 | stale-reference | "3 workflow" | "22 workflows" |
| docs/faq.md | 79 | stale-reference | "13 workflows" | "22 workflows" |
| README.md | 184 | stale-reference | "4 agents" | "7 agents" |
| README.md | 184 | stale-reference | "13 workflows" | "22 workflows" |
| UPDATE-GUIDE.md | 92 | stale-reference | "4 agents" | "7 agents" |
| INSTALLATION.md | 23 | stale-reference | "13 workflows" | "22 workflows" |
| INSTALLATION.md | 95 | stale-reference | "4 agent" | "7 agents" |
| INSTALLATION.md | 96 | stale-reference | "13 workflows" | "22 workflows" |
| BMAD-METHOD-COMPATIBILITY.md | 94 | broken-path | `_bmad/_config/bmad.yaml` | file should exist |
| BMAD-METHOD-COMPATIBILITY.md | 104 | broken-path | `_bmad/_config/bmad.yaml` | file should exist |

### Architecture Compliance

- **Language:** Markdown edits only — no JavaScript changes expected
- **Test framework:** If CLI test expectations need updating: `node:test` + `node:assert/strict`
- **Linting:** Must pass `npm run lint` if any JS files are modified
- **No new dependencies**

### Critical: Context-Aware Editing

DO NOT blindly search-and-replace numbers. For each stale reference:
1. Read the full paragraph containing the finding
2. Understand the context (is it describing the current state, a historical version, or a comparison?)
3. Update the number AND any surrounding text that needs adjustment
4. Verify the paragraph still reads coherently

Example: If a line says "The Vortex supports 4 agents: Emma and Wade plus two experimental agents" — you can't just change "4" to "7". You need to rewrite the sentence to accurately describe all 7 agents.

### User Guide Link Fix Pattern

The broken links in docs/agents.md follow a clear pattern. The old links reference `_bmad-output/vortex-artifacts/` (where artifacts are generated) but user guides live at `_bmad/bme/_vortex/guides/` (part of the installed package). Three guides (Mila, Liam, Noah — the newer agents) already have the correct path. Fix the four older agent guides to match:

```
WRONG: ../_bmad-output/vortex-artifacts/EMMA-USER-GUIDE.md
RIGHT: ../_bmad/bme/_vortex/guides/EMMA-USER-GUIDE.md
```

### BMAD-METHOD-COMPATIBILITY.md Investigation

This file references `_bmad/_config/bmad.yaml` which was the old BMAD Method config location. The document describes detection logic for BMAD Method compatibility. Options:
- **Option A:** Update paths to current config locations (`_bmad/bmm/config.yaml`)
- **Option B:** Mark paths as describing the BMAD Method structure (not BMAD-Enhanced)
- **Option C:** If the compatibility doc is outdated (references v1.0.4-alpha vs current 1.6.4), consider a broader rewrite

Investigate the actual installer code (`scripts/install-vortex-agents.js`) to see what it checks for, then update the doc to match reality.

### Test Expectation Risk

The CLI test in `tests/unit/docs-audit.test.js` line 334-338 expects exit code 1:
```javascript
it('exits with code 1 when findings exist (real project)', async () => {
  const result = await runScript(scriptPath);
  assert.equal(result.exitCode, 1);
});
```

If this story fixes ALL stale-reference and broken-link findings, the audit might still exit with code 1 due to `missing-coverage` findings. Check by running `npm run docs:audit -- --json | grep missing-coverage`. If missing-coverage findings exist, the test still passes. If ALL findings are fixed (including coverage), the test will need updating.

### Current Reality (from registry)

- **7 agents:** Emma, Isla, Mila, Liam, Wade, Noah, Max
- **22 workflows:** lean-persona, product-vision, contextualize-scope, empathy-map, user-interview, user-discovery, research-convergence, pivot-resynthesis, pattern-mapping, hypothesis-engineering, assumption-mapping, experiment-design, mvp, lean-experiment, proof-of-concept, proof-of-value, signal-interpretation, behavior-analysis, production-monitoring, learning-card, pivot-patch-persevere, vortex-navigation
- **Package version:** 1.6.4
- **User guide location:** `_bmad/bme/_vortex/guides/`

### Previous Story Learnings (p2-1-1)

- The audit tool was improved during code review: CHANGELOG exclusion, word-boundary matching, _bmad/ prefix support
- Finding `{file, line, category, current, expected}` format is precise — use line numbers as starting points but always read context
- `npm run docs:audit -- --json` gives machine-parseable output for verification
- Total test suite: 248 tests (40 docs-audit + 208 existing)

### Files to Edit

- docs/agents.md (MODIFY — fix 4 broken user guide links)
- docs/development.md (MODIFY — fix 3 stale references)
- docs/testing.md (MODIFY — fix 2 stale references)
- docs/faq.md (MODIFY — fix 1 stale reference)
- README.md (MODIFY — fix 2 stale references)
- UPDATE-GUIDE.md (MODIFY — fix 1 stale reference)
- INSTALLATION.md (MODIFY — fix 3 stale references)
- BMAD-METHOD-COMPATIBILITY.md (MODIFY — fix 2 broken paths)
- tests/unit/docs-audit.test.js (POSSIBLY MODIFY — if audit expectations change)

### Project Structure Notes

- All edits are to existing user-facing docs — no new files created
- The docs-audit tool itself is NOT modified in this story
- Test expectations may change if audit results change

### References

- [Source: _bmad-output/planning-artifacts/epics-phase2.md — Epic 1, Story 1.2]
- [Source: _bmad-output/planning-artifacts/prd-phase2.md — FR1-5, NFR6, NFR10, NFR18]
- [Source: _bmad-output/implementation-artifacts/p2-1-1-build-programmatic-docs-audit-tool.md — Previous story learnings]
- [Source: scripts/docs-audit.js — Audit tool producing findings list]
- [Source: scripts/update/lib/agent-registry.js — 7 agents, 22 workflows]
- [Source: _bmad/bme/_vortex/guides/ — Correct user guide location]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### Change Log

### File List
