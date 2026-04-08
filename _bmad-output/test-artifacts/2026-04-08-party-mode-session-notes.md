# Party Mode Session Notes — Astonishment Report Triage

**Date:** 2026-04-08
**Convened by:** Amalik
**Participants:** Murat (Test Architect), Winston (Architect), Bob (Scrum Master)
**Source document:** [2026-04-08-astonishment-report.md](2026-04-08-astonishment-report.md)
**Outcome:** Topic 1 fully discussed and decided. Questions 1 & 2 answered. Topics 2/3/4 deferred to a follow-up session.

---

## Decisions Locked This Session (Topic 1 + Q1/Q2)

### Topic 1 — Test Runner Decision

| # | Decision | Rationale |
|---|---|---|
| 1.1 | **Convert `tests/lib/*` from Jest API to `node:test` + `node:assert/strict`. Reject Jest as a second runner.** | One mental model > two. `node:test` is boring tech, ships with Node, no transpiler, no extra devDeps. Adopting Jest would reward AI defaults over project standards. |
| 1.2 | **Staged conversion, file-by-file, one PR per file.** | Reduces review burden, enables learning curve on `node:test/mock`, allows pivot if approach proves painful. |
| 1.3 | **Sequencing: smallest-with-mocking first as pilot, [migration-execution.test.js](../../tests/lib/migration-execution.test.js) LAST.** | Counter-intuitive but correct: build `node:test/mock` muscle memory before touching the destructive-path tests. Don't learn the runner *and* validate `git mv` tests at the same time. |
| 1.4 | **Pilot file must include at least one `child_process` mock.** | Mocking is the hardest part of the conversion. Validate the translation on the pilot, not on the dangerous file. |
| 1.5 | **Explicit go/no-go gate after pilot.** | Off-ramp = NOT Jest adoption. Off-ramp = extract `child_process` calls behind a thin injectable interface (no mocking framework needed). |
| 1.6 | **Topic 4 CI guardrail must land FIRST as the forcing function.** | Wires `tests/lib/` into CI, makes existing failures visible, creates the pain that triggers the conversion work. |
| 1.7 | **ADR-001 to lock the decision in writing.** | Lightweight architecture decision record. Future contributors / agents will hit the standard and ask "why?" — the *why* must survive the *what*. |

### Q1 — Why didn't Gyre catch this?

**Verdict:** Gyre didn't fail. **Gyre is a stack profiler**, not a runtime QA agent. It answers "what is here?" — Murat answers "does what is here actually run?" Different question, different team. The hole is in the **CI + Definition of Done layer**, not in Gyre.

**Root cause:** This is a new class of bug that Winston named **"phantom test risk"** — tests that exist in source but never execute. Almost exclusively an AI-assisted-development failure mode (a human writing tests by hand notices immediately when they don't run; an agent writes them, declares done, moves on). Countermeasure = structural (CI runner-coverage check), not aspirational.

### Q2 — Will we audit the existing codebase or only enforce going forward?

**Verdict:** Going-forward-only is insufficient. **One-time sweep required**, scoped tightly so it doesn't kill Epic 6 momentum. Three mechanical sweeps + one destructive-op audit. ~1 hour total.

---

## Stories Captured (11) — Bob's Clipboard

These are the canonical outputs of the session. To be created formally via [bmad-create-story](../../.claude/skills/bmad-create-story/) in a follow-up.

| ID | Title | Topic | Size | Depends on | Notes |
|---|---|---|---|---|---|
| **A** | Build `node:test/mock` helper for `child_process.execFileSync` (e.g., `tests/helpers/mock-cp.js`) | T1 | S | — | Pattern-establishing helper. Enables all conversion work. |
| **B** | Convert `tests/lib/*` from Jest API to `node:test`. **8 sub-stories, sequenced.** | T1 | L | A, F, I | Parent epic. See sequencing below. |
| **C** | Sweep & remove any Jest dead config post-conversion | T1 | XS | B complete | Cleanup. |
| **D** | Document test taxonomy in `tests/README.md` | T2 (deferred) | XS | — | One-paragraph taxonomy + "subsystem with >5 test files gets its own dir + npm script" rule. |
| **E** | Split [scripts/lib/artifact-utils.js](../../scripts/lib/artifact-utils.js) into `scripts/lib/artifact/{errors,taxonomy,frontmatter,manifest,git-execution,index}.js` with `runGit` wrapper | T3 (deferred) | L | B.1–B.3 merged | **Critical:** must come AFTER test conversion, not before. `runGit` wrapper is the architectural keystone — single mockable seam for all `git` calls. |
| **E.1** | Audit `migrate-artifacts.js` post-split, refactor only if needed | T3 (deferred) | XS | E | Probably no-op, but checked. |
| **F** | CI guardrail: orphan test detector wired into `lint` job | T4 (deferred) | XS | D (soft) | Pure Node, no deps, ~50 LOC max. **Highest leverage / lowest cost item in the entire backlog.** Failure messages must be actionable (name file + tell user what to do). |
| **G** | Update Definition of Done: "if a story adds tests, the executed test count must increase commensurate with the added test files" | Process | XS | — | Permanent process fix, costs nothing. |
| **H** | Add "phantom test risk" entry to test taxonomy doc | Process | XS | D | Names the failure mode for future contributors. |
| **I** | **One-time baseline sweep** (3 sweeps): runner-coverage, framework-consistency grep, current `node --test` execution baseline | Audit | S | — | Output: `_bmad-output/test-artifacts/2026-04-08-baseline-sweep.md`. **Blocks Story B.** Must run before any conversion to establish floor. |
| **J** | Destructive-op audit: grep `scripts/` for `execFileSync`, `execSync`, `spawn.*git`, `fs.unlink`, `fs.rm`, `fs.move`, `fs.rename`. If <20 sites, fold into Story E. If ≥20, becomes its own follow-up initiative. | Audit | XS→TBD | — | Cheap discovery, decision-shaping. |
| **K** | Correct [MEMORY.md](../../../.claude/projects/-Users-amalikamriou-BMAD-Enhanced/memory/MEMORY.md) test counts (currently claims "103 tests" for Artifact Governance — almost certainly false post-baseline) and any sprint-status / retro docs that cite test counts | Audit | XS | B complete + I complete | **Sequenced last.** Don't propagate the lie any further. |

### Sub-story Sequencing for Story B (binding, per Murat)

Conversion order — smallest-with-mocking first as pilot, then by ascending risk, with destructive-path file LAST:

| Order | File | LOC | Why |
|---:|---|---:|---|
| 1 (pilot) | TBD — smallest file with `child_process` mock (likely [tests/lib/migrate-artifacts.test.js](../../tests/lib/migrate-artifacts.test.js) at 337 LOC, **needs verification**) | ~337 | Validates the hardest part of the conversion (mocking translation) on a small surface. Has go/no-go gate. |
| 2 | [tests/lib/taxonomy.test.js](../../tests/lib/taxonomy.test.js) | 189 | Smallest, no destructive paths. Confidence builder. |
| 3 | [tests/lib/inference.test.js](../../tests/lib/inference.test.js) | 456 | Pure inference, low risk. |
| 4 | [tests/lib/portfolio-rules.test.js](../../tests/lib/portfolio-rules.test.js) | 578 | Pure rules, low risk. |
| 5 | [tests/lib/portfolio-engine.test.js](../../tests/lib/portfolio-engine.test.js) | 453 | Conversion is also the moment to fix N3 (perf-flake assertion). |
| 6 | [tests/lib/manifest.test.js](../../tests/lib/manifest.test.js) | 661 | Pure logic, no destructive paths. |
| 7 | [tests/lib/artifact-utils.test.js](../../tests/lib/artifact-utils.test.js) | 431 | Underlies the destructive paths. Penultimate. |
| 8 (last) | [tests/lib/migration-execution.test.js](../../tests/lib/migration-execution.test.js) | 1,307 | **Highest blast radius — `git mv` + rollback paths.** Convert last when team is competent in `node:test/mock`. |

### Hard Sequencing Constraints (binding)

```
F (CI guardrail) → I (baseline sweep) → A (mock helper) → B (conversions, in order above) → E (artifact-utils split) → K (memory correction)
                                                              ↑
                                                  Epic 6 forward progress UNBLOCKED
                                                  after B.1–B.3 land
```

- **D (taxonomy doc)** is a soft prerequisite for **F** (so F's failure messages can point to documented rules) and for **H** (phantom-test entry needs the doc to exist).
- **G (DoD update)** can land any time — it's pure process, zero dependencies.
- **J (destructive-op grep)** can run in parallel, informs Story E scope.

---

## Topics DEFERRED to Follow-Up Session

These were on the agenda but **not discussed in depth** today. Capturing here so they don't get lost.

### Topic 2 — Test Taxonomy

**Question:** Should `tests/lib/` exist as its own directory, or fold into `tests/unit/`? More broadly: is the current 5-way split (`unit` / `integration` / `p0` / `lib` / `team-factory`) the right shape?

**Status:** Implicitly addressed in Question 1 / Topic 4 framing — Winston's view is **"keep `tests/lib/` as-is, the convention is defensible (per-subsystem dir mirroring `scripts/`), fix the wiring not the location."** Murat agreed but added the requirement to **document the convention explicitly** (Story D), otherwise it'll rot.

**Outstanding items for follow-up:**

- Should `tests/team-factory/` be the canonical example of "subsystem test directory" in the taxonomy doc?
- Is the threshold "**>5 test files** triggers its own subdirectory" the right rule, or should it be different (e.g., based on tested-source LOC, or coupling)?
- Should `tests/p0/` be renamed to something more self-explanatory (e.g., `tests/contracts/` or `tests/framework-invariants/`)? P0 is a priority label, not a category — it doesn't tell a new contributor *what kind of test it is*.
- Are there other subsystems in `scripts/` that *should* have their own test directory but currently sprawl into `tests/unit/` (e.g., `scripts/update/migrations/*` has 6 migration files — does that warrant `tests/migrations/`)?

### Topic 3 — `artifact-utils.js` Split

**Question:** How exactly do we split the 2,182 LOC god module into seam-able pieces?

**Status:** Skeleton design proposed by Winston, accepted with one amendment from Murat (`runGit` wrapper as the single mock seam). Captured as Story E.

**Outstanding items for follow-up — to discuss in detail BEFORE writing Story E's full acceptance criteria:**

- **Exact file boundaries.** The proposed split (`errors / taxonomy / frontmatter / manifest / git-execution / index`) is conjectural — Winston hasn't actually read all 2,182 lines. A 30-minute walk-through of the file is needed to confirm the seams are real, not imagined.
- **`runGit` wrapper API surface.** Should it be a single function `runGit(args, opts)` or a typed object with named methods (`gitMv`, `gitCommit`, `gitResetHard`, `gitRevParse`)? Trade-off: single function is simpler to mock; typed object is more discoverable and self-documenting.
- **Backwards compatibility scope.** The plan is for `index.js` to re-export everything `artifact-utils.js` currently exports. But what about *internal* helpers that aren't exported but are reached via `require('../../scripts/lib/artifact-utils').privateThing`? Does anything in tests do that? Needs a grep.
- **Whether `migrate-artifacts.js` (439 LOC) is also a candidate for splitting.** It's the CLI layer; might also benefit from a refactor. Not a blocker for Story E but worth a thought.
- **Mutation testing decision.** Murat raised in original report (N6) — should Stryker be added to the destructive-path code as part of Story E, or as a separate follow-up? Context-sensitive cost/benefit not yet discussed.

### Topic 4 — CI Guardrail

**Question:** What does the orphan-test detector look like in detail?

**Status:** Approved in principle, captured as Story F. **Decided in Topic 1 discussion that it must land FIRST as the forcing function.**

**Outstanding items for follow-up — minor design questions before Story F is implemented:**

- **Final script name.** `check-test-runner-coverage.js`? `verify-test-wiring.js`? `lint-orphan-tests.js`? Name affects discoverability.
- **Where in `lint` job, exactly?** Run before or after `eslint`? Probably before (faster fail).
- **Should it also detect the *inverse* — npm script globs that match no test files?** That's a smaller-priority cleanliness check ("dead glob detection") but useful.
- **Allow-list mechanism.** What if a test file is *intentionally* not wired into CI (e.g., a dev-only smoke test, a manual perf test)? Need a way to mark it allowed without disabling the check entirely. Probably a `.test-runner-coverage-ignore` file at repo root, similar to `.gitignore`.
- **Failure message format.** Winston's principle: "errors that tell you the next action are 10x more valuable." Story F acceptance must include: orphan file path, suggested npm script to add it under, and link to `tests/README.md`.

---

## Items From Original Astonishment Report NOT Yet Addressed

For completeness, listing the report findings that were **not** discussed in this session and remain on the table:

| Report ID | Finding | Severity | Status |
|---|---|---|---|
| N1 | Coverage measured but not enforced (no `c8 check-coverage` thresholds) | Notable | **Open — discuss in follow-up.** Cheap fix (15 min). Recommendation: set thresholds at "current minus 2%" then ratchet quarterly. |
| N2 | Coverage globs differ from unit-test glob (developer green ≠ CI green) | Notable | **Open.** Smaller scope item; bundle with N1. |
| N3 | Portfolio perf assertion is a future flake (live state, magic 5000ms, no NFR link) | Notable | **Partially handled** — to be fixed during Story B.5 conversion of `portfolio-engine.test.js`. |
| N5 | Burn-in loop iterates the *stable* code, not the *high-velocity* code | Notable | **Open.** Becomes valuable automatically once Story B + F land (the high-velocity code becomes burn-in-eligible). |
| N6 | No mutation testing on destructive paths (`artifact-utils.js`, `migrate-artifacts.js`) | Notable | **Open.** Linked to Story E discussion. ~30 min Stryker setup. |
| C3 | `test:p0` and `test:p0:gate` are byte-identical | Critical-but-low | **Open.** XS fix. Either delete one or actually differentiate. |

**Recommendation for follow-up session ordering:** N1 + N2 first (highest ROI / lowest cost), then C3 (trivial cleanup), then N5/N6/N3 in any order.

---

## How to Resume

When you're ready to pick this back up:

1. **Re-read this doc + the original astonishment report.** Two files, ~30 min reading.
2. **Confirm or re-prioritize the 11 captured stories.** Use `bmad-create-story` to formalize the ones you want to commit to.
3. **Reconvene party mode** with Murat + Winston + Bob and tackle Topics 2 / 3 / 4 in detail. Recommended order: **4 → 2 → 3** (CI guardrail first because it's the keystone, taxonomy second because it informs Story E's acceptance criteria, artifact-utils split last because it's the largest and most discussion-heavy).
4. **Don't reopen Topic 1 unless something has changed.** That decision is locked.

---

## Closing Notes

**Murat:** "Strong opinion, weakly held — if you only do one story this week, do **Story F**. CI guardrail. XS, permanent, prevents the next bug-of-this-class from ever existing."

**Winston:** "Recovery work feels like not shipping. **It is shipping.** You're shipping confidence in the code that's already there. Every Epic 6 story written on top of an unverified foundation is risk you don't know you're carrying."

**Bob:** "11 stories captured, 3 hard sequencing constraints, 6 deferred report findings, 1 follow-up session needed. Clipboard is clean. Ready to convert to formal stories on your word."

---

## ADDENDUM — 2026-04-08 (post-baseline-sweep + Story L execution)

After the party mode session ended, two follow-up actions were executed:

### Story I — Baseline sweep (DONE)

See [2026-04-08-baseline-sweep.md](2026-04-08-baseline-sweep.md) for the full report. Key outputs:

- Verified-passing baseline: **1,283 tests** under `node --test` across the four runnable directories
- Confirmed `tests/lib/*` is exit-code-1 broken (8 file load failures, 0 tests executed)
- **NEW finding:** silent regression in [tests/team-factory/registry-writer.test.js:179](../../tests/team-factory/registry-writer.test.js#L179) — 1 test failing on `main`, hidden because CI doesn't run `tests/team-factory/`
- **Story F simplified:** the orphan detector becomes a one-character glob change in [package.json:33](../../package.json#L33) (`tests/unit/*` → `tests/**/*`), not a 50-LOC bespoke script

### Story L — Fix team-factory regression (DONE)

**Forensic verdict:** Source `buildModuleBlock` is authoritative (must emit bare names because real generated registries are consumed by installer code expecting `AGENT_FILES`, not `_AGENT_FILES`). Golden file was hand-edited on 2026-04-05 (commit `0bb8320`) and 2026-04-06 (commit `b6a42ba`) to add `_` prefix and comment, in order to satisfy the eslint `no-unused-vars` rule. The structural error is that the golden fixture was being linted at all.

**Fix applied:**
1. [eslint.config.mjs:73](../../eslint.config.mjs#L73) — added `tests/team-factory/golden/` to the `ignores` array
2. [tests/team-factory/golden/golden-registry-block.js](../../tests/team-factory/golden/golden-registry-block.js) — reverted to bare names + original comment to match source output

**Verification:**
- `tests/team-factory/`: 155→**156 pass** / 1→**0 fail** ✅
- Combined floor (unit + integration + p0 + team-factory): **1,305 pass / 0 fail** ✅ (above the 1,283 floor)
- `npm run lint`: 0 errors, 1 unrelated pre-existing warning ✅

### NEW Story M — Surfaced during Story L execution

While reading [eslint.config.mjs:59-71](../../eslint.config.mjs#L59-L71), discovered that `expect`, `jest`, `beforeEach`, `afterEach`, `beforeAll`, `afterAll` are explicitly declared as `tests/**/*.js` globals. **This is the upstream root cause of the C1 phantom test bug** — eslint was configured to lie about Jest being installed, so the Jest test files in `tests/lib/` lint cleanly even though they crash at runtime. Without these globals, lint would have flagged every `expect()` call as `no-undef` and caught C1 the moment a Jest test landed.

**Story M (NEW):** Remove the Jest globals from [eslint.config.mjs:62-69](../../eslint.config.mjs#L62-L69). After this change, lint will fail loudly on every Jest test file in `tests/lib/` — the structural pressure that's been missing all along. **Sequencing:** must land AFTER Story B (conversion) is complete, otherwise lint becomes the bottleneck during conversion work. Estimated XS. **This is the structural fix to the entire phantom test bug class.**

### NEW Story N — Test count delta investigation

When running the combined test command after Story L, the total came to 1,305 tests instead of the expected 1,283 from the baseline. The +22 delta strongly suggests at least one new test file exists that wasn't in my Sweep 1 file enumeration. The lint output mentions [tests/unit/refresh-installation-artifacts.test.js](../../tests/unit/refresh-installation-artifacts.test.js) which was not in my original `find` listing — likely the source.

**Story N (NEW):** Reconcile the test file count. Run `find tests -type f -name "*.test.js" | wc -l` and compare to the original baseline of 61 files. Identify any files added since 2026-04-08, log them in the new floor (~1,305+), and update the baseline sweep doc. Estimated XS. Not blocking anything, but the floor number needs to be authoritative.

### Updated story manifest (post-2026-04-08)

| ID | Title | Status |
|---|---|---|
| A | Build `node:test/mock` helper for `child_process` | TODO |
| B | Convert `tests/lib/*` from Jest to `node:test` (8 sub-stories) | TODO |
| C | Sweep dead Jest config post-conversion | TODO |
| D | Document test taxonomy in `tests/README.md` | TODO |
| E | Split `artifact-utils.js` with `runGit` wrapper | TODO |
| E.1 | Audit `migrate-artifacts.js` post-split | TODO |
| F | CI guardrail (now: one-char glob fix in package.json) | TODO |
| G | Update DoD: "test count must increase commensurate with test files" | TODO |
| H | Add "phantom test risk" entry to taxonomy doc | TODO |
| **I** | **One-time baseline sweep** | **✅ DONE 2026-04-08** |
| J | Destructive-op audit across `scripts/` | TODO |
| K | Correct MEMORY.md test counts | TODO |
| **L** | **Fix team-factory regression** | **✅ DONE 2026-04-08** |
| **M** | **Remove Jest globals from eslint.config.mjs** (NEW) | TODO |
| **N** | **Reconcile test file count delta (~1,283 → 1,305)** (NEW) | TODO |

### Updated sequencing (binding, post-2026-04-08)

```
✅ I (baseline sweep)
✅ L (team-factory regression fix)
   ↓
F (one-char glob fix in package.json)
   ↓
N (reconcile floor count — can be parallel with F)
   ↓
A (mock helper)
   ↓
B (lib conversions in order — pilot first, migration-execution last)
   ↓ Epic 6 unblocks at B.1–B.3
M (remove Jest globals from eslint config — structural fix to bug class)
   ↓
E (artifact-utils split with runGit wrapper)
   ↓
K (MEMORY.md correction)
```

**Story M is the structural keystone** — when it lands, the entire phantom-test bug class becomes impossible. Story F prevents orphan files; Story M prevents orphan-framework imports. Belt and suspenders.
