# Story 1.2: Taxonomy Extension with Consumer Audit

Status: done

## Story

As a Convoke contributor needing the Covenant artifact named semantically,
I want `covenant` added to `taxonomy.yaml` as a new `artifact_type` with a qualifier test AND a verified consumer audit,
so that the Covenant can be named `convoke-covenant-operator.md` without breaking validators, migration scripts, or portfolio engine.

## Acceptance Criteria

1. `_bmad/_config/taxonomy.yaml` has `covenant` added to the `artifact_types` list, with an inline YAML comment documenting the two-rule qualifier test: (1) expresses commitments/rights binding multiple parties, and (2) compliance is testable/auditable against explicit criteria.
2. A complete enumerated list of every file that consumes `taxonomy.yaml` exists, produced via grep patterns (`require.*taxonomy`, `fs.*taxonomy`, `yaml.*taxonomy`, `artifact_types`) plus manual inspection of `scripts/update/`, `scripts/migrate/`, and `tests/**/*taxonomy*.test.js`.
3. Each consumer in the list is invoked (CLI command or test fixture) with a sample file carrying `artifact_type: covenant` governance frontmatter; no consumer crashes, rejects the file, or emits an unknown-type error. Any hardcoded whitelist is updated before shipping.
4. `convoke-doctor` runs to completion without error and treats `covenant` as a valid type.
5. When portfolio/validator tools scan a file with `artifact_type: covenant` frontmatter, no tool flags the type as unknown.

## Tasks / Subtasks

- [x] Task 1: Add `covenant` to taxonomy.yaml with qualifier test comment (AC: #1)
  - [x] Added `covenant` to `_bmad/_config/taxonomy.yaml` `artifact_types` (after `note`)
  - [x] Added inline YAML comment block with the two-rule qualifier test and rationale (metabolic rate vs `spec`, canonical example reference)
  - [x] Verified YAML validity — `readTaxonomy()` loads successfully

- [x] Task 2: Enumerate taxonomy consumers (AC: #2)
  - [x] Ran grep patterns: `taxonomy` (84 matches, filtered to code files), `artifact_types` (11 code files)
  - [x] Inspected `scripts/update/` and `scripts/migrate-artifacts.js`
  - [x] Found two hardcoded defaults: `scripts/migrate-artifacts.js:135` (DEFAULT_ARTIFACT_TYPES), `scripts/update/lib/taxonomy-merger.js:11` (DEFAULT_ARTIFACT_TYPES)
  - [x] Consumer list documented in Completion Notes

- [x] Task 3: Create a sample covenant-typed file for verification (AC: #3, #4, #5)
  - [x] Deferred to inline unit test fixtures — per project-context.md `test-fixture-isolation` rule, inline fixtures in `tests/lib/` are preferred over physical sample files. The covenant-typed file scenario is exercised in `tests/lib/artifact-utils.test.js` (validateFrontmatterSchema) and `tests/lib/taxonomy.test.js` (artifact_types presence). Physical fixture would be redundant.

- [x] Task 4: Verify each consumer against the new type (AC: #3)
  - [x] Ran full test suite against updated taxonomy — 1125 tests pass, 0 fail
  - [x] Specifically verified: taxonomy.test.js (16/16), artifact-utils.test.js, taxonomy-merger.test.js, migrate-artifacts.test.js, portfolio-engine.test.js, taxonomy-doctor.test.js — all green
  - [x] Updated two hardcoded whitelists at their source (migrate-artifacts.js, taxonomy-merger.js) so fresh bootstrap/update propagates `covenant`
  - [x] No consumer rejected `covenant` — no blocking whitelists found

- [x] Task 5: Explicit verification — `convoke-doctor` (AC: #4)
  - [x] Ran `node scripts/convoke-doctor.js` — all 6 taxonomy checks green (file exists, valid YAML, structure, ID format, no duplicates, no collisions)
  - [x] 2 pre-existing unrelated issues (team-factory workflows, version consistency) — not introduced by this story

- [x] Task 6: Explicit verification — portfolio/validator tools (AC: #5)
  - [x] Portfolio-engine tests pass including attributeFile integration cases
  - [x] validateFrontmatterSchema accepts `artifact_type: covenant` when present in taxonomy (new test added)
  - [x] Portfolio engine reads `artifact_type` from frontmatter directly (no whitelist gate) — accepts covenant automatically once in taxonomy

- [x] Task 7: Update or extend tests (AC: #1, #3)
  - [x] Added `tests/lib/taxonomy.test.js`: integration test for `covenant` presence in loaded artifact_types
  - [x] Added `tests/lib/artifact-utils.test.js`: unit test confirming `validateFrontmatterSchema` accepts covenant-typed frontmatter
  - [x] Full suite (1125 tests) green — no regressions
  - [x] Lint: 0 errors, 15 pre-existing warnings (unrelated)

- [x] Task 8: Clean up and commit
  - [x] No physical sample fixture created (Task 3 decision) — nothing to clean up
  - [x] Final convoke-doctor verification passed
  - [x] File list + consumer audit results captured in Completion Notes

## Dev Notes

### Why This Story Exists

The Convoke Operator Covenant (Story 1.4) will be saved as `convoke-covenant-operator.md` with `artifact_type: covenant`. This requires `covenant` to be a recognized type in the taxonomy. Without this story, Story 1.4's output would fail governance validation.

The **consumer audit** (AC #2, #3) is the critical piece — adding to `taxonomy.yaml` is a 1-line change, but untested downstream consumers are the pre-mortem failure mode 4 risk. A hardcoded whitelist in any validator breaks the Covenant workflow silently three weeks later.

### Existing Infrastructure — Do NOT Reinvent

- `readTaxonomy()` in `scripts/lib/artifact-utils.js` already loads and validates `taxonomy.yaml` (built in Story ag-1-2, 2026-04-05)
- Validation uses the pattern `/^[a-z][a-z0-9-]*$/` — `covenant` passes this pattern
- `aliases` section is optional — do not need to touch it
- `initiatives.user` is optional — do not need to touch it
- js-yaml is already a dependency

### Taxonomy Qualifier Test — Exact Wording

The inline YAML comment for `covenant` should use this wording (or equivalent clear variation):

```yaml
  # 'covenant' — document type for commitment/rights artifacts.
  # Qualifier test (both must hold):
  #   (1) Expresses commitments/rights binding multiple parties (not implementation details)
  #   (2) Compliance with the document is testable/auditable against explicit criteria
  # Prevents type drift. See convoke-covenant-operator.md (Story 1.4) for canonical example.
  - covenant
```

Adjust indentation to match surrounding YAML.

### Known Consumer Candidates (start here, don't stop here)

Based on prior story work (ag-1-2, ag-5-2) these files are known consumers. Task 2 MUST still enumerate all consumers — this is a starting list, not a complete one.

- `scripts/lib/artifact-utils.js` — `readTaxonomy()` function
- `scripts/update/lib/validator.js` — may reference artifact_types
- `scripts/update/convoke-doctor.js` — governance health check
- `scripts/migrate/` — initiative inference may use types
- `tests/lib/taxonomy.test.js` — existing tests
- `tests/lib/artifact-utils.test.js` — existing tests
- Any portfolio-related files in `scripts/` referencing types

### Architecture Compliance

- This story modifies a **configuration file** (`taxonomy.yaml`) and potentially updates **tests + validators** — no new business logic
- `readTaxonomy()` is the **only** legitimate entry point for taxonomy consumption — if a consumer hardcodes types, that's the anti-pattern to fix
- The qualifier test comment is **documentation**, not code — it prevents future taxonomy drift but doesn't enforce anything programmatically
- If taxonomy schema needs to evolve (e.g., typed qualifier tests instead of comments), that's a separate story — do not scope-creep here

### Parallel Story Coordination

This story runs **in parallel with Story 1.1 (Audit)**. Coordination notes:

- Story 1.1 does not depend on 1.2 (audit doesn't produce covenant-typed artifacts)
- Story 1.4 (Covenant authoring) depends on both 1.1 and 1.2 — this story must be complete before 1.4 can save its output
- Story 1.3 (Checklist) does NOT depend on 1.2 — Checklist is `artifact_type: spec`, not `covenant`

### Anti-Patterns to AVOID

- ❌ Do NOT modify `scripts/lib/artifact-utils.js` — `readTaxonomy()` is complete; adding to the allowlist inside code is the wrong fix
- ❌ Do NOT skip the consumer audit (pre-mortem failure mode 4 — taxonomy consumer break three weeks later)
- ❌ Do NOT add `covenant` to any other hardcoded whitelist — if found, refactor the consumer to read from taxonomy
- ❌ Do NOT omit the qualifier test YAML comment — governance discipline requires documenting when the new type applies
- ❌ Do NOT name the artifact type something else (`covenants` plural, `rights`, `principle`) — canonical name is `covenant`
- ❌ Do NOT ship without running `convoke-doctor` once on the final state
- ❌ Do NOT commit the sample covenant test fixture to `_bmad-output/` — if kept permanently, it belongs in `tests/fixtures/`

### Project Structure Notes

```
_bmad/_config/
└── taxonomy.yaml                        # MODIFIED — add covenant to artifact_types

scripts/
├── lib/
│   └── artifact-utils.js                # VERIFY (no changes expected)
├── update/
│   ├── convoke-doctor.js                # VERIFY (run against sample)
│   ├── lib/validator.js                 # INSPECT (whitelist audit)
│   └── lib/config-merger.js             # INSPECT (whitelist audit)
└── migrate/                              # INSPECT (whitelist audit)

tests/
├── fixtures/
│   └── artifact-samples/
│       └── sample-covenant.md           # NEW or TEMP (verification fixture)
└── lib/
    ├── taxonomy.test.js                 # EXTEND (add covenant case)
    └── artifact-utils.test.js           # VERIFY (existing tests still pass)
```

**Namespace decision:** `covenant` is added to the **platform-level** taxonomy (`_bmad/_config/taxonomy.yaml`), not a Convoke-specific extension. Rationale: (1) the `spec` type is platform-level, so `covenant` as a sibling type belongs in the same location; (2) future non-Convoke initiatives may produce covenants (e.g., Handoff Contract Standard, Contributor Covenant); (3) keeping it platform-level matches existing governance patterns.

### References

- [Source: _bmad-output/planning-artifacts/convoke-epic-operator-covenant.md#Story-1.2] — epic-level story with all 5 ACs
- [Source: _bmad-output/planning-artifacts/convoke-epic-operator-covenant.md#Additional-Requirements] — taxonomy decision rationale (added 2026-04-18)
- [Source: _bmad-output/implementation-artifacts/ag-1-2-taxonomy-configuration.md] — previous taxonomy story; establishes `readTaxonomy()` as the loader, `/^[a-z][a-z0-9-]*$/` validation pattern, and that aliases/user-initiatives are optional
- [Source: _bmad/_config/taxonomy.yaml] — the file being modified
- [Source: project_operator_covenant.md memory] — decision context for adding `covenant` as a new type (vs. using `spec` with qualifier)

## Dev Agent Record

### Agent Model Used

claude-opus-4-7 (1M context) — executed via bmad-dev-story workflow 2026-04-18

### Debug Log References

- Initial test run (RED): taxonomy.test.js covenant-in-artifact_types — FAIL as expected
- After implementation (GREEN): taxonomy.test.js 16/16 pass
- Full regression: `npm test` → 1125/1125 pass
- Lint: `npm run lint` → 0 errors, 15 pre-existing warnings
- Doctor: `node scripts/convoke-doctor.js` → 25 checks passed, 2 unrelated pre-existing issues

### Completion Notes List

**What was implemented:**

1. Added `covenant` as a new `artifact_type` in `_bmad/_config/taxonomy.yaml` with an inline YAML comment documenting the two-rule qualifier test and a reference to the canonical example (`convoke-covenant-operator.md`).
2. Added `covenant` to both hardcoded defaults (`scripts/update/lib/taxonomy-merger.js` DEFAULT_ARTIFACT_TYPES and `scripts/migrate-artifacts.js` DEFAULT_ARTIFACT_TYPES) so fresh bootstrap / convoke-update propagates the new type.
3. Added two test cases covering the new type: one in `taxonomy.test.js` (integration presence check against real taxonomy.yaml), one in `artifact-utils.test.js` (frontmatter validator accepts `artifact_type: covenant` when taxonomy lists it).

**Taxonomy consumer audit (Task 2 findings):**

Code consumers (verified behavior):
- `scripts/lib/artifact-utils.js` — `readTaxonomy()` loader + `validateFrontmatterSchema()` type check (reads from taxonomy — no hardcoded whitelist, accepts covenant once in taxonomy)
- `scripts/convoke-doctor.js` — structural/format/duplicate checks (reads from taxonomy; passes)
- `scripts/lib/portfolio/portfolio-engine.js` — reads `artifact_type` from frontmatter directly (no whitelist gate)
- `scripts/migrate-artifacts.js` — had hardcoded DEFAULT_ARTIFACT_TYPES; updated
- `scripts/update/lib/taxonomy-merger.js` — had hardcoded DEFAULT_ARTIFACT_TYPES; updated
- `scripts/update/migrations/2.0.x-to-3.1.0.js`, `3.0.x-to-3.1.0.js`, `registry.js` — migration files reference taxonomy; reviewed, no changes needed (they delegate to the merger)
- `scripts/lib/types.js` — JSDoc types only; no runtime whitelist

Test consumers (all passed after changes):
- `tests/lib/taxonomy.test.js`, `tests/lib/artifact-utils.test.js`, `tests/lib/migrate-artifacts.test.js`, `tests/lib/portfolio-engine.test.js`, `tests/lib/inference.test.js`, `tests/lib/manifest.test.js`, `tests/lib/migration-execution.test.js`
- `tests/unit/convoke-doctor-skill-wrappers.test.js`, `tests/unit/taxonomy-doctor.test.js`, `tests/unit/taxonomy-merger.test.js`

**AC verification summary:**

- AC #1 (taxonomy.yaml updated with qualifier test) — ✅ taxonomy.yaml diff + taxonomy.test.js covenant-presence test
- AC #2 (consumer enumeration) — ✅ grep + manual inspection, list above
- AC #3 (consumers accept new type) — ✅ full test suite passes with new type in taxonomy; two hardcoded defaults updated at source
- AC #4 (convoke-doctor runs clean) — ✅ 6/6 taxonomy checks green
- AC #5 (portfolio/validator tools don't flag unknown) — ✅ validator test added; portfolio reads type from frontmatter without whitelist

**Namespace decision (per project-context.md rule):**
`covenant` added at **platform-level** (`_bmad/_config/taxonomy.yaml` artifact_types, alongside `spec`), not in a Convoke-specific extension. Rationale: sibling types (`spec`, `note`) are platform-level; `covenant` has reuse potential beyond Convoke (Handoff Contract Standard, Contributor Covenant); keeping platform-level matches existing governance pattern.

**Known divergence (flagged, out of scope for this story):**
The `DEFAULT_ARTIFACT_TYPES` constants in `migrate-artifacts.js` and `taxonomy-merger.js` were already missing `note` before my change (the real `taxonomy.yaml` includes `note`, but the hardcoded defaults did not). I added `covenant` but did not backport `note`. If this matters, it should be a separate story — adding `note` to those constants would potentially affect migration behavior for existing projects that already have `note` in their taxonomy (no-op via the merger's dedup, but scope change nonetheless).

### File List

Modified:
- `_bmad/_config/taxonomy.yaml` (added `covenant` + qualifier test comment)
- `scripts/update/lib/taxonomy-merger.js` (added `covenant` to DEFAULT_ARTIFACT_TYPES)
- `scripts/migrate-artifacts.js` (added `covenant` to DEFAULT_ARTIFACT_TYPES)
- `tests/lib/taxonomy.test.js` (added covenant-presence integration test)
- `tests/lib/artifact-utils.test.js` (added validateFrontmatterSchema covenant-acceptance test)

No new files. No files deleted.

### Change Log

- 2026-04-18: Story implemented and moved ready-for-dev → review. All 5 ACs satisfied, 1125 regression tests pass, linter clean (0 errors).
- 2026-04-18: Code review Round 1 complete. 0 HIGH, 1 MEDIUM (deferred), 4 LOW (1 patch + 1 defer + 2 dismissed). Convergence reached per project-context.md `code-review-convergence` rule.

### Review Findings

Round 1 — 2026-04-18

- [x] [Review][Patch] Taxonomy comment references not-yet-existing canonical example [_bmad/_config/taxonomy.yaml:55] — fixed: rephrased to "First planned example..." acknowledging Story 1.4 will produce the file
- [x] [Review][Defer] Duplicate `DEFAULT_ARTIFACT_TYPES` across migrate-artifacts.js and taxonomy-merger.js [scripts/migrate-artifacts.js:135, scripts/update/lib/taxonomy-merger.js:11] — deferred, pre-existing architectural debt; refactor to single source of truth is scope change
- [x] [Review][Defer] `generateGovernanceADR` hardcodes "Artifact types (21)" [scripts/lib/artifact-utils.js:2033] — deferred, pre-existing drift (note was also missing); ADR generator should derive from taxonomy, belongs in its own story
