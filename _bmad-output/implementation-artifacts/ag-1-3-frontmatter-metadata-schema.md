# Story 1.3: Frontmatter Metadata Schema

Status: ready-for-dev

## Story

As a Convoke operator,
I want a defined frontmatter schema for artifact metadata,
so that governance tools can read and write consistent structured data in every artifact.

## Acceptance Criteria

1. Frontmatter schema v1 defines fields: `initiative` (required), `artifact_type` (required), `created` (required), `schema_version` (required, integer = 1), `status` (optional, enum: draft/validated/superseded/active)
2. `schema_version` is always set to `1`
3. `status` accepts only: `draft`, `validated`, `superseded`, `active` — rejects anything else
4. Existing frontmatter fields are preserved — new fields added, never overwritten (NFR20)
5. Content below frontmatter is preserved byte-for-byte
6. Field conflicts are detected and reported, not silently resolved
7. Files with no existing frontmatter receive a new frontmatter block
8. Metadata-only files (frontmatter with empty content) are handled safely
9. Unit tests validate all edge cases

## Tasks / Subtasks

- [ ] Task 1: Create schema validation helper (AC: #1, #2, #3)
  - [ ] Add `validateFrontmatterSchema(fields, taxonomy)` to `scripts/lib/artifact-utils.js` — accepts fields object AND a `TaxonomyConfig` for initiative/type validation
  - [ ] Validates required fields present: `initiative`, `artifact_type`, `created`, `schema_version`
  - [ ] Validates `created` is a string matching ISO 8601 date format (`/^\d{4}-\d{2}-\d{2}$/`)
  - [ ] Validates `schema_version` is integer >= 1
  - [ ] Validates `status` (if present) is one of: `draft`, `validated`, `superseded`, `active`
  - [ ] Validates `initiative` exists in taxonomy (platform or user section) — accepts a `TaxonomyConfig` parameter
  - [ ] Validates `artifact_type` exists in taxonomy `artifact_types` list
  - [ ] Returns `{ valid: true }` or `{ valid: false, errors: string[] }` with clear error messages
  - [ ] Export via `module.exports`

- [ ] Task 2: Create `buildSchemaFields()` convenience function (AC: #1, #2)
  - [ ] Add `buildSchemaFields(initiative, artifactType, options)` to `artifact-utils.js`
  - [ ] Returns a complete frontmatter object: `{ initiative, artifact_type, created: today's date, schema_version: 1, ...options }`
  - [ ] If `options.status` is provided, includes it; otherwise omits `status` (it's optional)
  - [ ] `created` defaults to current date in ISO 8601 format (YYYY-MM-DD) if not provided in options
  - [ ] Does NOT validate — that's `validateFrontmatterSchema()`'s job

- [ ] Task 3: Write schema validation tests (AC: #1, #2, #3, #9)
  - [ ] Create tests in `tests/lib/artifact-utils.test.js` (append to existing file)
  - [ ] Test valid schema with all required fields passes
  - [ ] Test valid schema with optional status passes
  - [ ] Test missing `initiative` field rejects
  - [ ] Test missing `artifact_type` field rejects
  - [ ] Test missing `schema_version` field rejects
  - [ ] Test missing `created` field rejects
  - [ ] Test invalid `status` value (e.g., `"active-ish"`) rejects
  - [ ] Test `schema_version: 0` rejects (must be >= 1)
  - [ ] Test `schema_version: "one"` rejects (must be integer)
  - [ ] Test initiative not in taxonomy rejects
  - [ ] Test artifact_type not in taxonomy rejects
  - [ ] Test invalid `created` format (e.g., `"yesterday"`) rejects

- [ ] Task 4: Write `buildSchemaFields()` tests (AC: #2)
  - [ ] Test returns all required fields with correct types
  - [ ] Test `schema_version` is always `1`
  - [ ] Test `created` defaults to today's date in YYYY-MM-DD format
  - [ ] Test `status` included only when provided in options
  - [ ] Test custom `created` date is respected when provided

- [ ] Task 5: Verify existing `injectFrontmatter()` tests still pass (AC: #4, #5, #6, #7, #8)
  - [ ] Run existing injectFrontmatter tests — they already cover: no frontmatter, existing frontmatter, metadata-only, field conflicts, content preservation
  - [ ] These ACs are already satisfied by Story 1.1 — this task is verification only
  - [ ] If any test fails, investigate and fix

## Dev Notes

### Previous Story Learnings (ag-1-1 and ag-1-2)

- `injectFrontmatter()` already exists in `scripts/lib/artifact-utils.js` and handles: field preservation (NFR20), conflict detection, content preservation, metadata-only files, no-frontmatter files
- **5 existing `injectFrontmatter` tests** already cover ACs #4-#8 — do NOT duplicate them
- `parseFrontmatter()` has input validation (type check) and error handling (try/catch around gray-matter)
- `readTaxonomy()` exists and returns `TaxonomyConfig` — use it for initiative/type validation
- `taxonomy.yaml` exists at `_bmad/_config/taxonomy.yaml` with 8 platform IDs and 21 artifact types

### What This Story Actually Adds

Story 1.1 built the low-level read/write functions. This story adds the **schema contract** — validation that the fields being injected conform to the governance schema. Specifically:

1. `validateFrontmatterSchema(fields)` — validates a set of fields against schema rules
2. `buildSchemaFields(initiative, artifactType, options)` — convenience to construct a valid field set

These are used by the migration script (Story 3.2) and workflow adoption (Story 5.3) when injecting frontmatter into artifacts. They ensure every injection produces schema-compliant metadata.

### Architecture Compliance

- **CommonJS only** — `require()`, not `import`
- **JSDoc type annotations** on new function signatures
- **No new dependencies** — uses existing taxonomy.yaml + readTaxonomy()
- **Status enum is a CONSTANT** — define `VALID_STATUSES = ['draft', 'validated', 'superseded', 'active']` and export it
- **schema_version is always 1** for this story. Future stories may increment it.

### Anti-Patterns to AVOID

- ❌ Do NOT modify `injectFrontmatter()` — it's a generic low-level function. Schema validation is a separate concern.
- ❌ Do NOT duplicate the existing 5 `injectFrontmatter` tests — they already pass. Just verify they still pass.
- ❌ Do NOT hardcode initiative IDs in the validation function — read from taxonomy via parameter
- ❌ Do NOT make `status` required — it's optional per the schema spec

### Project Structure Notes

```
scripts/
└── lib/
    ├── artifact-utils.js    # MODIFIED — add validateFrontmatterSchema(), buildSchemaFields(), VALID_STATUSES
    └── types.js             # EXISTING — FrontmatterSchema typedef already defined

tests/
└── lib/
    ├── artifact-utils.test.js  # MODIFIED — add schema validation + buildSchemaFields tests
    └── taxonomy.test.js        # EXISTING (Story 1.2) — not modified
```

### Testing Standards

- Jest test framework
- Append new `describe` blocks to existing `tests/lib/artifact-utils.test.js`
- `validateFrontmatterSchema` tests: ~11 cases (valid pass, missing fields reject, invalid values reject)
- `buildSchemaFields` tests: ~5 cases
- Run full `tests/lib/` suite after changes: 43 existing + new tests must all pass

### References

- [Source: arch-artifact-governance-portfolio.md — Decision 4: Frontmatter Schema v1]
- [Source: prd-artifact-governance-portfolio.md — FR4, NFR20]
- [Source: scripts/lib/artifact-utils.js — existing injectFrontmatter(), parseFrontmatter()]
- [Source: scripts/lib/types.js — FrontmatterSchema typedef]
- [Source: _bmad/_config/taxonomy.yaml — initiative + type lists for validation]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
