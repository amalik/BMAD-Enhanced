# Retrospective — SP Epic 1: Skill Classification & Metadata

**Date:** 2026-04-09
**Epic:** sp-epic-1 (Skill Portability & Distribution Initiative, Epic 1)
**Stories:** sp-1-1, sp-1-2, sp-1-3 (3/3 done)
**Facilitator:** Bob (Scrum Master)
**Implementation:** Amelia (dev agent)
**Code review:** parallel adversarial layers (Blind Hunter, Edge Case Hunter, Acceptance Auditor)

---

## Epic outcome

**Result:** Foundation complete. Manifest verifiably clean. Epic 2 (exporter) unblocked.

| Metric | Value |
|---|---|
| Stories shipped | 3 / 3 |
| ACs satisfied | 27 / 27 (10 + 9 + 8) |
| Tests added | 21 (5 schema + 7 classification + 9 validation) |
| Files created | 6 (3 scripts + schema doc + 2 test files) — plus 2 generated reports |
| Files modified | 2 (refresh-installation.js writer, schema test refactor) |
| Skills classified | 101 (60 standalone, 36 pipeline, 5 light-deps) |
| Validator baseline | PASS / 0 errors / 15 expected warnings |
| Code-review patches applied | 13 across all 3 stories |
| Pre-existing test regressions | 0 |

---

## What went well

### 1. Story decomposition was tight and progressive

Each story had a clear, non-overlapping responsibility:
- **1.1:** schema (columns + reference doc)
- **1.2:** classification (heuristics + script + 101 row population)
- **1.3:** validation (read-only checker + 6 finding types)

No story drifted into another's territory. The "Out of Scope" sections in each story file actively prevented scope creep — Amelia hit them on every story and they paid off (e.g., sp-1-3 caught broken refs but didn't try to re-classify).

### 2. The story-review-before-dispatch cadence caught real issues early

For all 3 stories, the user requested a story file review **before** dispatching the dev agent. This caught:
- **sp-1-1:** identified the meta-platform set was overcommitted (5 vs 9), leading to a clean carve-out for standalone utilities before any code was written
- **sp-1-2:** caught the hand-waved `bmad-agent-*` mapping (would have produced borderline-mode noise) and the file-naming collision risk; both fixed before dev started
- **sp-1-3:** caught the `[BROKEN-DEP]` baseline gap (would have hit the dev agent during Task 7); the upgraded `[RELATIVE-DEP]` decision saved a story-review cycle later

**Pattern worth keeping:** "spec → user-review → dispatch" is a high-leverage gate. The marginal effort of the review prevented downstream churn every single time.

### 3. Adversarial code review surfaced material findings every time

3 stories × 3 review layers = 9 review passes. Findings caught:
- **sp-1-1 (5 patches):** RFC-4180 escape handling, CRLF/BOM tolerance, stale fixture header
- **sp-1-2 (5 patches):** path traversal containment, whitespace-driven idempotency break, silent meta-platform fallback for unknown skills, regex over-matching, test name typo
- **sp-1-3 (5 patches):** tmpdir leak, malformed-row crash, symlink blindness, JSDoc inaccuracy, dead import

**Hit rate of HIGH/MED severity findings:** 9 / 13 patches = 69%. This is a strong signal that the adversarial review layer is doing real work, not just rubber-stamping.

### 4. The validator caught a real sp-1-2 bug — the diagnostic value paid off immediately

The first sp-1-3 validator run on the real manifest produced 5 `[BROKEN-DEP]` errors from sp-1-2's lossy relative-template extraction. **This is exactly the failure mode the validator exists to catch.** The fix (subtree-search fallback in `findFileInSubtree`) recovered the data without modifying the classifier — a clean separation of concerns.

If the validator hadn't existed, those 5 broken refs would have surfaced during Epic 2 (exporter) implementation, where they'd be much harder to diagnose. **Story 1.3 paid for itself before Epic 2 even started.**

### 5. Shared utility extraction (manifest-csv.js) closed a Story 1.1 deferred item proactively

Sp-1-1 had a deferred concern (D3) about the parser being duplicated between test and would-be script. Sp-1-2 Task 8 explicitly extracted it. By sp-1-3, three consumers (validator + 2 test files) imported from the shared module. **Deferred items don't have to stay deferred** — slot them into the next story when there's a natural seam.

### 6. Conservative-bias policy worked

The decision (locked in sp-1-2's review) to bias borderline cases to lower tiers and route ambiguity to BORDERLINE.md prevented over-promotion. Final classification distribution (60 standalone / 5 light-deps / 36 pipeline) feels right for what your teammates will actually use — most things are standalone, a small number are template-bound, and the pipeline tier is appropriately constrained.

---

## What didn't go well

### 1. Task 7 of sp-1-3 was prescient — but the underlying issue is real

The validator surfaced 5 BROKEN-DEPs that weren't bugs in the data — they were a consequence of sp-1-2's classifier flattening multi-file content into one blob and losing the originating directory context. The fix worked (subtree search), but it's a workaround, not a true solution.

**What this means for future stories:** sp-1-2's `extractDependencies` produces relative paths that are correct in spirit but lossy in structure. If Epic 2 (exporter) needs to actually *resolve* these paths (e.g., to inline template content), it'll need the same subtree-search workaround. Worth noting in Epic 2's planning.

### 2. The 15 [MISSING-PREREQS] warnings represent real classifier blindness

sp-1-2's classifier doesn't extract artifact-consumption patterns. Pipeline skills like `bmad-create-story`, `bmad-dev-story`, and the WDS phases all have empty `dependencies` columns even though they clearly consume prior artifacts. The warning is correct — the classifier is missing a heuristic.

**Impact:** Epic 2's exporter won't know what artifacts these skills consume from the manifest alone. It'll either need to re-read the source files (the same lossy walk sp-1-2 did) or document the prerequisites by hand.

### 3. AC #7 in sp-1-2 had a factual error that I propagated

The story spec said "6 canonical meta-platform skills" including `bmad-agent-bme-team-factory` (Loom Master). That entry doesn't exist in skill-manifest.csv — it lives in agent-manifest.csv. I should have caught this during the story-review pass before dispatching Amelia. The dev agent caught it, documented the deviation, and adjusted the set to 5 — but it was a story-author bug, not a dev bug.

**Pattern to avoid:** when listing canonical sets in AC text, **verify each item exists** in the source-of-truth file before locking the AC.

### 4. The persona-only `bmad-agent-*` carve-out was discovered during dev, not spec

sp-1-2's first dry-run showed persona-only agents (Mary, John, Winston, Bob, etc.) being misclassified as Tier 3 pipeline because their menu listings looked like skill chains. The fix (early return in `classifyTier` for `PERSONA_AGENT_INTENTS`) was clean, but it should have been caught in the spec — the heuristic table didn't account for it.

**Pattern to apply:** when the spec lists heuristics, **enumerate the negative cases** too. "PERSONA_AGENT_INTENTS skills are NOT pipeline even if they reference other skills."

### 5. Working-tree state churn between sessions caused minor confusion

Several times during the implementation phase, system-reminders showed the sprint-status.yaml had been edited (often by the user adding Epic 7 work). Each time required a re-read before editing. Not a process issue per se — multi-stream development in the same workspace is just messy. **Mitigation:** keep edits to sprint-status.yaml minimal during dev sessions; batch updates at story boundaries.

---

## Action items (for Epic 2 and beyond)

| # | Action | Owner | When |
|---|---|---|---|
| **A1** | When writing Epic 2 stories, document expected artifact-consumption patterns for each pipeline skill (closes the [MISSING-PREREQS] gap by hand since the classifier won't catch it) | story author | Epic 2 spec phase |
| **A2** | Epic 2 exporter must handle relative-template paths the same way the validator does — subtree search by basename. Don't reinvent the workaround. | dev agent (Epic 2) | sp-2-x implementation |
| **A3** | Add a "verify referenced files exist" check to the story-review checklist when ACs name canonical sets (avoids the sp-1-2 AC #7 deviation pattern) | facilitator (me) | starting Epic 2 |
| **A4** | When writing classification heuristics in story specs, explicitly list **negative cases** (e.g., "X is NOT pipeline even if Y") | story author | Epic 2 spec phase |
| **A5** | Keep sprint-status.yaml edits minimal during dev sessions; batch at story boundaries | all | ongoing |
| **A6** | sp-1-3 deferred D1 (CRLF preservation in writeManifest) — revisit if Windows contributors hit it; not blocking Epic 2 | future story author | as needed |
| **A7** | sp-1-3 deferred D3 (basename collision in subtree search) — strengthen if Epic 2's exporter exposes the weakness | future story author | as needed |

**No carryover technical debt blocking Epic 2.** All deferred items are either out-of-scope hypotheticals or workarounds with documented escape hatches.

---

## Key lessons (carry into Epic 2)

1. **Story-review-before-dispatch is the highest-leverage process step.** Keep doing it.
2. **Adversarial review catches real issues 69% of the time.** Don't skip it even when stories feel "simple."
3. **Validators that fail loudly catch bugs upstream loved ones miss.** The 5 BROKEN-DEPs would have been an Epic 2 mystery if 1.3 hadn't existed.
4. **Conservative-bias on classification is correct.** Easier to upgrade a tier later than to discover broken exports in the wild.
5. **Defer cleanly, but pull deferred items into the next natural story** rather than letting them rot.
6. **When spec lists canonical sets, verify each item exists.** Type-check the spec, not just the code.
7. **Out-of-scope sections work.** They prevented scope creep on every story.

---

## Epic 2 readiness assessment

| Question | Answer |
|---|---|
| Is the manifest verifiably clean? | ✅ Yes (validator: PASS / 0 errors) |
| Can the exporter consume `tier`, `intent`, `dependencies` directly? | ✅ Yes — schema is locked, vocabulary is fixed |
| Are there known data quality issues that block Epic 2? | ⚠️ Two: relative-template paths (mitigation A2) + missing pipeline prereqs (mitigation A1) |
| Are there unaddressed architectural decisions? | ❌ No |
| Test coverage on the foundation? | ✅ 21 tests, all green |
| Sprint status accurate? | ✅ All 3 stories marked done |

**Verdict:** **Ready to start Epic 2.** The two known data quality issues are documented mitigations, not blockers.

---

## Notes for posterity

- **The ceremony of multi-agent retrospective dialogue was skipped this round** because I (Bob) had direct context on all 3 stories from this conversation. For larger epics or epics with handoffs to other dev agents, the dialogue format adds value.
- **Total story duration:** 3 stories implemented + reviewed + patched in a single working session. The bottleneck was code review thoughtfulness, not implementation throughput.
- **Code review found 13 issues across 3 stories.** None blocked story completion; all were patched in the same session. The review layer is doing real work.
