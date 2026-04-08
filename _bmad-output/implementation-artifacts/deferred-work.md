# Deferred Work — Code Review Findings

This file collects code-review findings that were classified as `defer` —
real issues, but pre-existing or out of scope for the story under review.

---

## 🚨 URGENT — phantom test recurrence detected (2026-04-09)

**This is the C1 pattern from the original [astonishment report](../test-artifacts/2026-04-08-astonishment-report.md)
recurring DURING the recovery initiative that exists to prevent it.** Surfacing
loudly so the next person reading this file cannot miss it.

### Symptom

Two test files in `tests/lib/` are exit-code-1 broken under standalone
`node --test` invocation:

| File | Standalone result | Wired into `npm test`? |
|---|---|---|
| [tests/lib/portability-classification.test.js](../../tests/lib/portability-classification.test.js) | `tests 1, pass 0, fail 1` (file-load failure) | **NO** |
| [tests/lib/portability-schema.test.js](../../tests/lib/portability-schema.test.js) | `tests 1, pass 0, fail 1` (file-load failure) | **NO** |

Both report exactly 1 "test" — that's `node --test` counting the file itself
as a single failed test because it errored during `require()` before any
`it()` callback ran. **Identical failure mode to the 8 original Jest phantom
tests in `tests/lib/*` discovered on 2026-04-08.**

### Diagnosis (best guess, not verified)

Both files import `../../scripts/portability/manifest-csv` (lines 3 of
each). The `scripts/portability/` directory exists in the working tree but
is **untracked** (not yet committed) and may not export the symbols the
tests require:
- `portability-classification.test.js` imports `{ readManifest }`
- `portability-schema.test.js` imports `{ parseCsvRow, countCsvColumns }`

If `manifest-csv.js` doesn't exist or doesn't export these names, the
test files crash on require. The tests use plain `node:test` style (not
Jest), so the failure mode is "production code missing", not "test
framework missing" — a different flavour of the same bug class.

### Why this matters

The recovery initiative (Stories I, L, F.1, F.3, A, B.1-B.4 + polish)
exists *specifically* to prevent the C1 phantom-test bug class. Allowing
phantom tests to be reintroduced in `tests/lib/` while the recovery is
in flight is **the same failure mode the recovery exists to prevent**.

The original failure was: tests existed, looked correct, were never
executed. **The new failure is: tests exist, look correct, are not wired
into `npm test`, and crash on standalone invocation anyway.** Worse than
the original — these are double-broken.

### What I (Murat) deliberately did NOT do

- **Did NOT wire the files into `npm test`**. Doing so would break the
  CI gate (exit 1 from file-load failures) and block every subsequent PR
  including B.5+.
- **Did NOT fix the failure mode**. The `scripts/portability/` work is
  in-progress in a parallel session that I do not own. Fixing the imports
  here could conflict with the parallel session's next save.
- **Did NOT delete the files**. They are someone's intentional in-progress
  work; deleting them silently would be hostile.

### What needs to happen (action items for the portability work owner)

1. **Verify `scripts/portability/manifest-csv.js` exists** and exports
   `readManifest`, `parseCsvRow`, and `countCsvColumns`. If not, either
   write the module or remove the imports until it exists.
2. **Run `node --test tests/lib/portability-classification.test.js`** and
   `node --test tests/lib/portability-schema.test.js` standalone before
   each save. Both should report `pass > 0, fail 0` before being wired
   into the gate.
3. **Wire both files into `npm test`** (literal paths, same pattern as
   `tests/lib/migrate-artifacts.test.js`, `taxonomy.test.js`,
   `inference.test.js`, `portfolio-rules.test.js`) **only after they pass
   standalone**.
4. **Folding into the `tests/lib/*` glob** happens at Story F.2 (after
   Story B.8), not piecewise.

### Why this lives in `deferred-work.md` and not in a story file

The portability work owner is a parallel session, not the recovery
initiative. The recovery initiative's job is to *surface* the recurrence,
not to *fix* it (which would step on parallel work). Documenting it here
makes the issue findable by anyone running a future `bmad-code-review` or
astonishment-report sweep on this repo.

---

## Deferred from: code review of Story B.4 portfolio-rules conversion (2026-04-08)

- **Glob expansion in npm test scripts assumes POSIX shell** — `package.json` `test` and `test:coverage` scripts use shell glob expansion (`tests/unit/*.test.js`). On Windows `cmd.exe` this won't expand and `node --test` will receive literal patterns. Pre-existing pattern across all 5 npm test scripts; B.4 added a literal path, no new glob. **Real issue.** Belongs in a cross-platform compatibility story.
- **Lifecycle defensive call: `cpMock?.restore()` instead of `cpMock.restore()`** — In `tests/lib/portfolio-rules.test.js` `afterEach`, if `beforeEach` throws (e.g. helper resolution fails), the `afterEach` will secondary-throw on `undefined` and mask the root cause. Pre-existing pattern across every other converted test file in `tests/lib/*` and `tests/unit/*`. **Marginal improvement** — would be applied uniformly across the suite, not piecewise. Worth folding into a Story B cleanup pass after B.8 lands.
- **Time-dependent test in `git-recency-rule`** — `'recent activity -> status: ongoing'` and `'multiple artifacts -> picks latest date'` use `new Date().toISOString().split('T')[0]` as the mock return value. At UTC midnight boundary the `daysSince` math could flake by ±1 day. Pre-existing pattern from the original Jest file. **Real flake risk** but inherited by B.4, not introduced. Hardening fix: use a fixed date that's `staleDays - 1` ago instead of `today`. Worth a future story.
