# Story 5.3: Workflow Frontmatter Adoption

Status: done

## Story

As a Convoke operator creating new PRDs or epics,
I want the creation workflows to automatically include governance frontmatter,
so that new artifacts are governed from birth without manual metadata entry.

## Acceptance Criteria

1. **Given** taxonomy.yaml exists and operator runs `bmad-create-prd`, **When** the workflow creates a new PRD, **Then** frontmatter includes: initiative, artifact_type: `prd`, status: `draft`, created: current date, schema_version: 1 (FR44)
2. `bmad-create-epics-and-stories` emits frontmatter with: initiative, artifact_type: `epic`, status: `draft`, created, schema_version: 1 (FR45)
3. If taxonomy.yaml not found, workflow proceeds normally without frontmatter (graceful degradation)
4. If initiative cannot be inferred, workflow prompts: `Which initiative is this for? [{list}]: `
5. Emitted frontmatter follows schema v1 exactly
6. Existing workflow functionality unaffected — frontmatter is additive

## Tasks / Subtasks

- [x] Task 1: Add governance frontmatter fields to PRD template (AC: #1, #5, #6)
  - [x] Edit `.claude/skills/bmad-create-prd/templates/prd-template.md`
  - [x] Add to existing frontmatter block: `initiative: ''`, `artifact_type: prd`, `status: draft`, `created: ''`, `schema_version: 1`
  - [x] Empty `initiative` and `created` will be filled at creation time by the workflow step

- [x] Task 2: Add governance frontmatter fields to epics template (AC: #2, #5, #6)
  - [x] Edit `.claude/skills/bmad-create-epics-and-stories/templates/epics-template.md`
  - [x] Add same governance fields: `initiative: ''`, `artifact_type: epic`, `status: draft`, `created: ''`, `schema_version: 1`

- [x] Task 3: Add initiative resolution instructions to PRD workflow step 1 (AC: #1, #3, #4)
  - [x] Edit `.claude/skills/bmad-create-prd/steps-c/step-01-init.md`
  - [x] In the "Create Initial Document" section, add instructions:
    - Check if `_bmad/_config/taxonomy.yaml` exists
    - If yes: read initiative list, set `created` to current date
    - If initiative is inferrable from project context: set it automatically
    - If not: prompt operator to select from taxonomy list
    - If taxonomy not found: leave governance fields empty (graceful degradation)

- [x] Task 4: Add initiative resolution instructions to epics workflow step 1 (AC: #2, #3, #4)
  - [x] Edit `.claude/skills/bmad-create-epics-and-stories/steps/step-01-validate-prerequisites.md`
  - [x] Same instructions as Task 3 for the epic creation step

- [x] Task 5: Verify existing workflow functionality (AC: #6)
  - [x] Run `bmad-create-prd` mentally trace — existing steps unaffected by new frontmatter fields
  - [x] Run `bmad-create-epics-and-stories` mentally trace — same verification
  - [x] No code tests needed — these are workflow instruction files (markdown), not executable code

- [x] Task 6: Run convoke-check and regression suite
  - [x] Run `node scripts/convoke-check.js --skip-coverage` -- all steps pass

## Dev Notes

### Implementation Approach

This story modifies **workflow instruction files** (markdown), NOT executable JavaScript. The workflows are LLM-executed skill definitions — they tell the agent what to do. The "implementation" is adding instructions and template fields.

**No new tests needed** — these are markdown files consumed by LLMs, not testable code. The convoke-check verifies existing code still passes (no regressions from template changes).

### Template Frontmatter Merge

The templates already have frontmatter (`stepsCompleted`, `inputDocuments`, etc.). The governance fields are ADDED alongside existing fields — they coexist. gray-matter handles multi-field frontmatter naturally.

### Graceful Degradation Pattern

The workflow instructions should say:
```
If `_bmad/_config/taxonomy.yaml` exists:
  - Read initiatives list
  - Set `initiative` field (infer from context or prompt)
  - Set `created` to current date (YYYY-MM-DD)
If taxonomy.yaml does NOT exist:
  - Leave initiative and created fields empty
  - Workflow proceeds normally
```

### Anti-Patterns to AVOID

- Do NOT modify any JavaScript files for this story
- Do NOT break existing workflow step structure
- Do NOT make frontmatter mandatory — graceful degradation required
- Do NOT modify the workflow.md files — only templates and step files

### File Structure

```
.claude/
└── skills/
    ├── bmad-create-prd/
    │   ├── templates/
    │   │   └── prd-template.md              # MODIFIED — add governance frontmatter fields
    │   └── steps-c/
    │       └── step-01-init.md              # MODIFIED — add initiative resolution instructions
    └── bmad-create-epics-and-stories/
        ├── templates/
        │   └── epics-template.md            # MODIFIED — add governance frontmatter fields
        └── steps/
            └── step-01-validate-prerequisites.md  # MODIFIED — add initiative resolution instructions
```

### References

- [Source: prd-artifact-governance-portfolio.md -- FR44, FR45]
- [Source: scripts/lib/artifact-utils.js -- buildSchemaFields for schema v1 reference]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- convoke-check: all 5 steps pass
- No code tests needed (workflow instruction files only)
- Zero regressions

### Completion Notes List

- Added governance frontmatter fields to PRD template: initiative, artifact_type: prd, status: draft, created, schema_version: 1
- Added governance frontmatter fields to epics template: same fields with artifact_type: epic
- Added initiative resolution instructions to PRD step-01-init.md: check taxonomy, infer or prompt, graceful degradation
- Added initiative resolution instructions to epics step-01-validate-prerequisites.md: same pattern
- Templates coexist with existing workflow frontmatter (stepsCompleted, inputDocuments)

### File List

- `.claude/skills/bmad-create-prd/templates/prd-template.md` — MODIFIED (governance frontmatter fields)
- `.claude/skills/bmad-create-prd/steps-c/step-01-init.md` — MODIFIED (initiative resolution instructions)
- `.claude/skills/bmad-create-epics-and-stories/templates/epics-template.md` — MODIFIED (governance frontmatter fields)
- `.claude/skills/bmad-create-epics-and-stories/steps/step-01-validate-prerequisites.md` — MODIFIED (initiative resolution instructions)
