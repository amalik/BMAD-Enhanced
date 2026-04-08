# Astonishment Report — Convoke Test Architecture

**Author:** Murat (Test Architect)
**Date:** 2026-04-08
**Scope:** Test suite, CI pipeline, quality gates, risk surface
**Format:** Strong opinions, weakly held — calibrated to evidence I read in the repo today

> An "astonishment report" catalogs what surprised me — both what's better than expected and what's worse. I'm not here to grade. I'm here to surface the things you'd want to know **before** they bite you.

---

## TL;DR — The headline number

You have **61 test files** totaling ~14,000 LOC. **Roughly 4,400 lines of those tests cannot be executed by anything in this repo.** Not by `npm test`, not in CI, not by `node --test`, not by `npm run test:all`. They are written in a test framework that is not installed. They are the tests for the most actively-changing code in the project right now (Epic 6 — artifact governance & portfolio).

If that sentence didn't raise your pulse, read it again.

---

## 🔴 CRITICAL — Things I would fix today

### C1. `tests/lib/*` — 8 files, 4,412 LOC — written in a runner you don't have

**Evidence:**

- Project test runner (per `package.json`): `node --test`
- Standard imports across `tests/unit/*.test.js`: `const { describe, it } = require('node:test'); const assert = require('node:assert/strict');`
- Every file in `tests/lib/` instead uses **Jest API**:
  - `expect(...).toBe(...)`, `.toContain(...)`, `.toBeInstanceOf(...)`, `.toBeGreaterThan(...)`
  - `jest.spyOn`, `jest.resetModules`, `jest.fn()`, `jest.restoreAllMocks`
- **None** of `tests/lib/*.test.js` imports `node:test` or `node:assert`
- **Jest is not in `devDependencies`** (only `c8` and `eslint`)
- No `jest.config.*`, no `babel.config.*`, no `expect` shim

**Files affected:**

| File | LOC | What it claims to test |
|---|---:|---|
| [tests/lib/migration-execution.test.js](tests/lib/migration-execution.test.js) | 1,307 | The destructive `git mv` migration path — your highest-risk code |
| [tests/lib/manifest.test.js](tests/lib/manifest.test.js) | 661 | Manifest generation |
| [tests/lib/portfolio-rules.test.js](tests/lib/portfolio-rules.test.js) | 578 | Portfolio rule resolution |
| [tests/lib/inference.test.js](tests/lib/inference.test.js) | 456 | Artifact inference |
| [tests/lib/portfolio-engine.test.js](tests/lib/portfolio-engine.test.js) | 453 | Portfolio engine end-to-end |
| [tests/lib/artifact-utils.test.js](tests/lib/artifact-utils.test.js) | 431 | Artifact utility surface |
| [tests/lib/migrate-artifacts.test.js](tests/lib/migrate-artifacts.test.js) | 337 | Migration CLI orchestration |
| [tests/lib/taxonomy.test.js](tests/lib/taxonomy.test.js) | 189 | Taxonomy schema |

**What this means in plain language:**

> Every test you have written for the artifact governance and portfolio engine is **decorative**. It documents intent. It does not protect production. The agents writing these tests are producing code that *looks* like it ran — `describe`, `test`, `expect` — but in this repo, it would crash on the first `expect is not defined`. Nothing has been catching the regression you'd hope it catches.

**Risk impact:** This is the code that **mutates user files via `git mv`** and rolls back on failure. Your MEMORY.md proudly says "103 tests" for the Artifact Governance initiative. I cannot find evidence those tests have ever executed in this repo's runner.

**Severity:** P0. This is the kind of finding I would walk into a steering committee with.

**Fix options (pick ONE — don't half-do this):**

1. **Convert to `node --test` + `node:assert/strict`.** Cost: real, but mechanical. Benefit: stays consistent with the rest of the suite. Mocking `child_process` becomes `mock.method(cp, 'execFileSync', ...)` from `node:test/mock`. This is my recommendation.
2. **Adopt Jest as a second runner for `tests/lib/`.** Cost: another devDep, another CI job, two mental models. Benefit: less rewrite. I'd push back on this — two runners is a smell.

**Whichever you pick, also do step C2 below.**

---

### C2. CI does not run `tests/lib/` OR `tests/team-factory/` — even if they worked

**Evidence — `package.json` scripts:**

```json
"test":             "node --test tests/unit/*.test.js",
"test:integration": "node --test tests/integration/*.test.js",
"test:p0":          "node --test tests/p0/*.test.js",
"test:p0:gate":     "node --test tests/p0/*.test.js",
"test:all":         "node --test tests/**/*.test.js",
"test:coverage":    "c8 node --test tests/unit/*.test.js tests/integration/*.test.js tests/p0/*.test.js"
```

**Evidence — `.github/workflows/ci.yml`:**

The `test` job runs `npm test` (unit only) and `npm run test:integration`. **No CI job runs `npm run test:all` or otherwise touches `tests/lib/` or `tests/team-factory/`.**

**Net effect for `tests/team-factory/` (13 files, valid `node:test` style):**

These tests are *runnable* — but no one runs them. You shipped a Team Factory subsystem with a real test suite that the merge gate ignores. The team-factory tests pass on your laptop and that is the only place they will ever be evaluated.

**Net effect for `tests/lib/`:** double-failure mode — broken framework AND not invoked. Either failure alone would have been enough.

**Severity:** P0.

**Fix:** Add a guardrail script that enumerates `tests/**/*.test.js` and asserts every file is reachable by at least one `npm` script glob. Wire it into the `lint` job. Five lines of bash. This prevents the bug class permanently.

---

### C3. `test:p0` and `test:p0:gate` are byte-identical

```json
"test:p0":      "node --task tests/p0/*.test.js",
"test:p0:gate": "node --test tests/p0/*.test.js"
```

Two scripts, same command, no separation between "developer pre-flight" and "merge gate." The naming implies a meaningful distinction (`gate` should be stricter — fail-fast, more verbose, perhaps blocking on warnings). It isn't. Future you will write code assuming the distinction exists, and there will be no enforcement.

**Severity:** P2. **Fix:** Either delete one, or actually differentiate (`gate` should add `--test-reporter=tap` and be the only one wired into the CI gate job).

---

## 🟡 NOTABLE — Things that will hurt you within a quarter

### N1. The coverage job measures, but enforces nothing

```yaml
- name: Run tests with coverage
  run: npm run test:coverage
```

`c8` runs. A report is produced. The job passes regardless of the number. There is **no `c8 check-coverage --lines XX --branches YY --functions ZZ`** anywhere.

This is why MEMORY.md tracks "test debt": `convoke-update.js at 29%`, `convoke-version.js at 56%`, `1.0.x-to-1.3.0.js at 37%`. These would not be silent backlog items if the gate refused to merge below threshold. They'd be either fixed or explicitly waived per-file with `/* c8 ignore */`.

**Recommendation:** Set thresholds at the *current* numbers minus 2% (a "no regression" floor), then ratchet up by 5% per quarter. Don't try to backfill in one push.

### N2. Coverage globs differ from the unit-test glob

`npm test` covers `tests/unit/*`.
`npm run test:coverage` covers `tests/unit/*` + `tests/integration/*` + `tests/p0/*`.

So coverage measures execution paths your normal unit-test invocation never touches. If a developer runs `npm test` locally and sees green, that's a weaker green than the CI coverage report's green. These should be the same set, expressed once, included by both.

### N3. The portfolio perf assertion is a future flake

[tests/lib/portfolio-engine.test.js:59-64](tests/lib/portfolio-engine.test.js#L59-L64):

```js
test('performance: under 5 seconds for full scan (NFR1)', async () => {
  const start = Date.now();
  await generatePortfolio(projectRoot);
  const duration = Date.now() - start;
  expect(duration).toBeLessThan(5000);
});
```

This is asserting wall-clock against the **live `_bmad-output` of the actual repo**. Three things wrong:

1. Performance assertions tied to **live state** are flake bombs. As `_bmad-output` grows, this fails. The fail mode is intermittent (CI runner load) before it becomes permanent.
2. Performance assertions belong in a **dedicated perf job** (or marked `--test-only`), not interleaved with correctness tests. A perf failure should not block a refactor PR.
3. The `5000ms` number has no justification — no comment, no link to NFR1, no explanation of which workload it represents. NFRs need fixed-size fixtures: "5,000 artifacts in <2s," not "the current state of my laptop in <5s."

(And of course — see C1 — this test never runs anyway. So the flake is currently theoretical. It will become real the moment you fix C1.)

### N4. `artifact-utils.js` is a 2,182-line god module

[scripts/lib/artifact-utils.js](scripts/lib/artifact-utils.js) is 2,182 lines. The accompanying [tests/lib/artifact-utils.test.js](tests/lib/artifact-utils.test.js) is 431 lines — a **5:1 source-to-test ratio**, the wrong direction for code that mutates user files.

A module this size cannot be tested at the unit level cleanly — too many internal seams hidden. It needs to be split:

- `parsing/` — taxonomy & frontmatter parsing (pure, easy to unit test)
- `manifest/` — manifest building (pure, easy to unit test)
- `git-execution/` — `execFileSync` calls (the dangerous part — isolate it, mock it at the boundary)
- `errors.js` — `ArtifactMigrationError` (already its own thing — extract it)

Once split, each piece becomes testable in isolation, and the destructive boundary becomes a single seam you can mock once and trust everywhere.

### N5. Burn-in is good, but it's burning in the wrong code

The 5x burn-in loop on PRs is a quality move I rarely see and genuinely respect. But it iterates `npm test` + `npm run test:integration` — i.e., the **stable, slow-changing parts** of your codebase. The Epic 6 artifact-governance work — your **highest-velocity, highest-risk** code right now — has **zero** runs in burn-in (because of C1 + C2).

After you fix C1 and C2, burn-in becomes immediately more valuable.

### N6. No mutation testing on the destructive paths

For a tool that does `git mv`, deletes files, and modifies on-disk content, **mutation testing** (Stryker for Node) on `artifact-utils.js` and `migrate-artifacts.js` would be high-ROI. Mutation testing tells you "if I flipped this `>` to `>=`, would any test catch it?" — and for migration code, the answer needs to be yes.

You don't need it everywhere. Two files. ~30 minutes to set up. The first run will be humbling.

---

## 🟢 GOOD — Things I want to highlight before the bad swamps the picture

These are non-trivial. Plenty of projects don't have any of these.

1. **`tests/p0/` is a deliberate pattern.** Per-agent P0 files (`p0-emma`, `p0-isla`, ...), framework-level P0 (`p0-framework`, `p0-handoff-contracts`, `p0-voice-consistency`). That's mature thinking — you've separated "must hold for the framework to be coherent" from regular unit tests.
2. **`tests/p0/p0-handoff-contracts.test.js` exists.** Testing the contracts between agents is exactly the kind of integration safety net that prevents an agent change from silently breaking a downstream agent. This is unusual and good.
3. **`tests/p0/p0-voice-consistency.test.js` exists.** I have never seen another project test that agent voice/persona stays consistent. Whether it works well or not, the *intent* is excellent.
4. **Node matrix `[18, 20, 22]` for `test`.** Catches version-specific regressions in `node:test` and `fs-extra` behavior. Good defensive choice.
5. **Burn-in loop on PRs (5x).** Catches the bottom decile of flake before it lands. Rare to see this in OSS CLI tools.
6. **`fail-fast: false` on the matrix.** Lets you see failures across all Node versions instead of dying on the first one. Subtle but correct.
7. **`concurrency` group with cancel-in-progress.** Saves CI minutes on rapid pushes. Nothing to fix; just noticing it's right.
8. **`security`, `package-check`, `publish` jobs are separate.** Good separation of concerns. The publish job is correctly gated on `[lint, test, coverage, security, package-check]`. No coverage threshold means the gate is softer than it looks (see N1), but the *shape* is right.
9. **`team-factory` test files use `node:test` correctly.** Even though CI doesn't run them (C2), they were authored with the right runner and would pass once wired in.
10. **Active investment in test-architect-grade infrastructure.** The fact that you have `_bmad/tea/testarch/` knowledge fragments at all says you take this seriously. This report exists *because* you take it seriously.

---

## Surprise findings (not necessarily bad)

### S1. `tests/lib/migrate-artifacts.test.js` has `--apply stub` tests

[tests/lib/migrate-artifacts.test.js:304](tests/lib/migrate-artifacts.test.js#L304) — there's a `describe('--apply stub', ...)` block. If `--apply` is the destructive flag, having it stubbed in tests is exactly right. **But** because of C1, these stub tests have never run, so I can't verify the stub matches reality. After you fix C1, **double-check** that the stub's behavior matches the live `--apply` code path. Stubs that haven't been validated against reality drift into fiction.

### S2. The MEMORY.md "103 tests" claim

> "Artifact Governance & Portfolio (I14+P15): Epic 2 in progress, 4/18 stories done, **103 tests**"

Pre-C1 fix, the load-bearing word in that sentence is "tests" — and tests in this directory are not actually tests in the runtime sense. After C1, this number should be revalidated and a fraction will likely turn red. **Plan for that.** It's better to know.

### S3. The `--no-verify` rule is followed

I checked the recent commit log mentally against the published rule "never `--no-verify`." Nothing recent looks like a hook bypass. Good discipline.

---

## Risk-prioritized fix sequence

I'd attack this in **exactly this order** — anything else lets the worst defect persist longer than necessary:

| # | Action | Effort | Risk reduced |
|---:|---|---|---|
| 1 | **Fix C2** — add a guardrail script that fails CI if any `tests/**/*.test.js` file isn't covered by an npm script. ~10 LOC of bash, ~30 min. | XS | Prevents regression of C1 forever |
| 2 | **Fix C1** — convert `tests/lib/*` to `node:test` + `node:assert/strict`. Mechanical, repetitive, large diff. Do it in one PR per file so reviews are tractable. | L | Recovers your headline test investment |
| 3 | **Wire `tests/team-factory/` and `tests/lib/` into CI** — extend `npm test` glob OR add a `test:lib` + `test:team-factory` script and add jobs. | XS | Closes the silent gap |
| 4 | **Fix C3** — collapse or differentiate `test:p0` / `test:p0:gate`. | XS | Removes naming-implies-behavior trap |
| 5 | **Fix N1** — set `c8 check-coverage` thresholds at "current minus 2%". | S | Stops debt growth |
| 6 | **Fix N3** — move the perf assertion to a fixed fixture, add comment linking NFR1, add a perf-only job. | S | Prevents future flake |
| 7 | **Fix N4** — split `artifact-utils.js`. Big refactor, do it after C1 so the converted tests catch regressions. | L | Lowers blast radius of every future migration change |
| 8 | **Add Stryker mutation testing** to `artifact-utils.js` and `migrate-artifacts.js`. | S | Validates that the destructive-path tests are actually adversarial |

Items 1–4 are achievable in a single afternoon. They are the highest-leverage moves on the board.

---

## What I'm *not* worried about

- Lint and security jobs — straightforward, working.
- Burn-in design — the design is right; it just needs the right code under it (post-C1).
- The general shape of the test taxonomy (`unit`, `integration`, `p0`, `lib`, `team-factory`) — that's a defensible split. It's not the *categorization* that's broken; it's the wiring.
- The overall test discipline trajectory — the *intent* is everywhere. The execution gap is mostly a one-time wire-up problem, not a cultural one.

---

## Calibration note

I am writing this as a **point-in-time** snapshot. Several findings (C1 in particular) are easy to misunderstand — "tests exist, they have assertions, surely they run." That's the kind of assumption that survives a long time before reality catches up. The whole point of this report is to say: **assume nothing about test execution; verify with the runner.**

If I'm wrong about C1 — if there's a Jest config or a custom runner I missed somewhere — I'd be relieved. But I read the relevant files, I checked devDependencies, I checked the npm scripts, and I checked the imports in every `tests/lib/*.test.js` file. I do not see how those tests could be running. I'd love to be shown the thing I missed.

— Murat
