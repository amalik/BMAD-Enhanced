# Story 1.2: Taxonomy Configuration

Status: ready-for-dev

## Story

As a Convoke operator,
I want a taxonomy config file that defines initiative IDs and artifact types,
so that all governance tools share a single source of truth for naming.

## Acceptance Criteria

1. `_bmad/_config/taxonomy.yaml` contains `initiatives.platform` with 8 IDs (vortex, gyre, bmm, forge, helm, enhance, loom, convoke)
2. `_bmad/_config/taxonomy.yaml` contains `initiatives.user` as an empty array
3. `_bmad/_config/taxonomy.yaml` contains an `aliases` section (strategy-perimeter → helm, strategy → helm, team-factory → loom)
4. `_bmad/_config/taxonomy.yaml` contains `artifact_types` with ~20 type IDs matching the PRD taxonomy
5. `readTaxonomy()` in `artifact-utils.js` successfully loads and parses the file, returning a valid `TaxonomyConfig` object
6. Taxonomy validation rejects entries with spaces, uppercase, or special characters
7. Taxonomy validation detects duplicates between platform and user sections

## Tasks / Subtasks

- [ ] Task 1: Create `_bmad/_config/taxonomy.yaml` (AC: #1, #2, #3, #4)
  - [ ] Create the file at `_bmad/_config/taxonomy.yaml`
  - [ ] Add `initiatives.platform` array with exactly: vortex, gyre, bmm, forge, helm, enhance, loom, convoke
  - [ ] Add `initiatives.user` as empty array `[]`
  - [ ] Add `aliases` section with: `strategy-perimeter: helm`, `strategy: helm`, `team-factory: loom`
  - [ ] Add `artifact_types` array with all ~20 types: prd, epic, arch, adr, persona, lean-persona, empathy-map, problem-def, hypothesis, experiment, signal, decision, scope, pre-reg, sprint, brief, vision, report, research, story, spec
  - [ ] Add YAML comments documenting each section's purpose and rules (platform = read-only by Convoke releases, user = operator-managed, aliases = migration-only)

- [ ] Task 2: Integration test — `readTaxonomy()` loads the real file (AC: #5)
  - [ ] Create `tests/lib/taxonomy.test.js`
  - [ ] Test that `readTaxonomy(projectRoot)` successfully loads and parses `_bmad/_config/taxonomy.yaml`
  - [ ] Verify returned object has `initiatives.platform` with 8 entries
  - [ ] Verify returned object has `initiatives.user` as empty array
  - [ ] Verify returned object has `aliases` with 3 entries
  - [ ] Verify returned object has `artifact_types` with ~20 entries
  - [ ] Verify all initiative IDs pass the `/^[a-z][a-z0-9-]*$/` validation pattern

- [ ] Task 3: Validation tests — rejection cases (AC: #6, #7)
  - [ ] Test that a taxonomy file with uppercase ID (e.g., `Helm`) throws with clear error
  - [ ] Test that a taxonomy file with spaces (e.g., `my project`) throws with clear error
  - [ ] Test that a taxonomy file with special characters (e.g., `helm@v2`) throws with clear error
  - [ ] Test that a taxonomy file with duplicate IDs across platform and user sections throws with clear error
  - [ ] Use temp directories for each test case — create `{tmpDir}/_bmad/_config/taxonomy.yaml` with invalid content and pass `tmpDir` as `projectRoot` to `readTaxonomy()`. Don't mock — use the real function with a fake project root.

## Dev Notes

### Previous Story Learnings (ag-1-1)

- `readTaxonomy()` already exists in `scripts/lib/artifact-utils.js` (built in Story 1.1) — **do NOT recreate it**
- It expects the file at `path.join(projectRoot, '_bmad', '_config', 'taxonomy.yaml')`
- It validates: structure (initiatives.platform array, artifact_types array), entry format (`/^[a-z][a-z0-9-]*$/`), and duplicates between platform and user sections
- `aliases` section is optional — defaults to `{}` if absent
- `initiatives.user` is optional — defaults to `[]` if absent
- Uses `js-yaml` for YAML parsing (already a dependency)
- Uses `findProjectRoot()` from `scripts/update/lib/utils.js`

### Architecture Compliance

- **This story creates a DATA FILE, not code.** The only code is test files.
- The taxonomy.yaml schema is defined in the architecture doc (Decision 4: Frontmatter Schema v1, Configuration Schema section)
- `readTaxonomy()` validation is already implemented — this story validates that the real config file passes it
- Aliases are consumed by the migration script only (Story 2.1) — portfolio doesn't use them

### Exact Taxonomy Content (from PRD + Architecture)

**Platform initiatives (8):**
`vortex`, `gyre`, `bmm`, `forge`, `helm`, `enhance`, `loom`, `convoke`

**Artifact types (~21):**
`prd`, `epic`, `arch`, `adr`, `persona`, `lean-persona`, `empathy-map`, `problem-def`, `hypothesis`, `experiment`, `signal`, `decision`, `scope`, `pre-reg`, `sprint`, `brief`, `vision`, `report`, `research`, `story`, `spec`

**Aliases (3):**
- `strategy-perimeter` → `helm` (historical name in vortex artifacts)
- `strategy` → `helm` (shorter variant)
- `team-factory` → `loom` (Team Factory agent is "Loom Master")

### Anti-Patterns to AVOID

- ❌ Do NOT modify `scripts/lib/artifact-utils.js` — `readTaxonomy()` is already complete
- ❌ Do NOT add new dependencies — this story is pure YAML + tests
- ❌ Do NOT hardcode the file path in tests — use `findProjectRoot()` to locate it
- ❌ Do NOT put test taxonomy fixtures in the real `_bmad/_config/` directory — use temp dirs for rejection tests

### Project Structure Notes

```
_bmad/
└── _config/
    ├── agent-manifest.csv     # EXISTING
    ├── manifest.yaml          # EXISTING
    └── taxonomy.yaml          # NEW — this story creates this file

tests/
└── lib/
    ├── artifact-utils.test.js # EXISTING (Story 1.1)
    └── taxonomy.test.js       # NEW — integration + validation tests
```

### Testing Standards

- Jest test framework
- File: `tests/lib/taxonomy.test.js`
- Integration test: loads the real `taxonomy.yaml` via `readTaxonomy()`
- Validation tests: create temp taxonomy files with invalid content, verify `readTaxonomy()` throws with clear error messages
- Use `fs-extra` and `os.tmpdir()` for temp file creation in validation tests
- Clean up temp files in `afterEach`

### References

- [Source: arch-artifact-governance-portfolio.md — Configuration Schema]
- [Source: arch-artifact-governance-portfolio.md — Decision 4: Frontmatter Schema v1]
- [Source: prd-artifact-governance-portfolio.md — FR1, FR2, FR3, FR5, FR6]
- [Source: scripts/lib/artifact-utils.js — readTaxonomy() implementation]
- [Source: scripts/lib/types.js — TaxonomyConfig typedef]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
