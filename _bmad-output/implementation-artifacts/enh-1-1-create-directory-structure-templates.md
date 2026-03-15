# Story 1.1: Create Enhance Module Directory Structure & Templates

Status: done

## Story

As a developer implementing the Enhance module,
I want the directory structure, config.yaml, and template files created,
So that the installer and workflow have the foundation they need to operate.

## Acceptance Criteria

1. **Given** the Convoke source repository **When** the Enhance module files are created **Then** the following structure exists:
   - `_bmad/bme/_enhance/config.yaml`
   - `_bmad/bme/_enhance/extensions/bmm-pm.yaml`
   - `_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md`
   - `_bmad/bme/_enhance/workflows/initiatives-backlog/templates/rice-scoring-guide.md`
   - `_bmad/bme/_enhance/workflows/initiatives-backlog/templates/backlog-format-spec.md`
   - `_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/` (empty dir — Triage steps authored in Story 1.4/1.5)
   - `_bmad/bme/_enhance/workflows/initiatives-backlog/steps-r/` (empty dir — Review steps authored in Epic 2)
   - `_bmad/bme/_enhance/workflows/initiatives-backlog/steps-c/` (empty dir — Create steps authored in Epic 3)
   - `_bmad/bme/_enhance/guides/` (empty dir — ENHANCE-GUIDE.md authored in Story 3.2)

2. **Given** `config.yaml` is created **Then** it contains:
   ```yaml
   name: enhance
   version: 1.0.0
   description: "Enhance module — capability upgrades for existing BMAD agents"
   workflows:
     - name: initiatives-backlog
       entry: workflows/initiatives-backlog/workflow.md
       target_agent: bmm/agents/pm.md
       menu_patch_name: "initiatives-backlog"
   ```

3. **Given** `rice-scoring-guide.md` is created **Then** it contains RICE factor definitions, scale ranges (R:1-10, I:0.25-3, C:20-100%, E:1-10), composite formula (R x I x C / E), calibration examples, and scoring guidance consistent with the existing backlog's scoring convention (FR16, FR17).

4. **Given** `backlog-format-spec.md` is created **Then** it documents exact heading structure, table columns for category and prioritized view tables, changelog entry format, insertion rules, provenance tag format, and RICE composite formula with sort/tiebreak order (FR45).

5. **Given** `workflow.md` is created **Then** it is a valid workflow entry point with frontmatter (workflow name, type, description, version) and initialization section loading config. Mode dispatch logic is a skeleton — actual T/R/C menu is authored in Story 1.3.

6. **Given** `extensions/bmm-pm.yaml` is created **Then** it documents the menu patch for pm.md per the v3 extension mechanism format from architecture.

## Tasks / Subtasks

- [x] Task 1: Create directory structure (AC: #1)
  - [x] Create `_bmad/bme/_enhance/` root directory
  - [x] Create `extensions/` subdirectory
  - [x] Create `workflows/initiatives-backlog/` with `templates/`, `steps-t/`, `steps-r/`, `steps-c/` subdirectories
  - [x] Create `guides/` subdirectory
  - [x] Add `.gitkeep` to each empty step directory so git tracks them

- [x] Task 2: Create `config.yaml` (AC: #2)
  - [x] Use exact schema from AC #2 — fields: `name`, `version`, `description`, `workflows[]`
  - [x] Each workflow entry: `name`, `entry`, `target_agent`, `menu_patch_name`
  - [x] Do NOT use _vortex's config schema (`submodule_name`/`agents`/flat arrays) — Enhance uses a different schema

- [x] Task 3: Create `rice-scoring-guide.md` (AC: #3)
  - [x] Include RICE factor table matching existing backlog format (see Dev Notes)
  - [x] Include composite formula: Score = (R x I x C) / E
  - [x] Include tiebreak rules: Confidence (higher first), then insertion order (newer first)
  - [x] Include calibration examples using real backlog items as anchors: low (~0.3, e.g. A4 "Fix temp dir prefix"), medium (~1.5, e.g. U4 "Test upgrade-path step file cleanup"), high (~3.0+, e.g. P4 "Enhance module" at 2.8 or S4 at 3.6)
  - [x] Include guided questions for each factor (from architecture doc)
  - [x] Include Impact scale detail: 3=massive, 2=high, 1=medium, 0.5=low, 0.25=minimal
  - [x] Include Confidence guidance: 100%=measured data, 50%=educated guess, 20%=speculation
  - [x] Include scoring health signal: no more than 3 items with identical scores in the top 10 of the prioritized view (PRD Success Criteria SC2 guard)
  - [x] Pure markdown only — no template variables, no runtime resolution
  - [x] Scores must land in the range currently used (~0.2–10.0) to stay consistent with existing backlog

- [x] Task 4: Create `backlog-format-spec.md` (AC: #4)
  - [x] Document heading hierarchy: H1 title, H2 "RICE Scoring Guide", H2 "Backlog", H3 per-category, H2 "Exploration Candidates", H2 "Epic Groupings", H2 "Prioritized View", H2 "Completed", H2 "Change Log"
  - [x] Document category table columns: `| # | Initiative | Source | R | I | C | E | Score | Track | Status |`
  - [x] Document prioritized view columns: `| Rank | # | Initiative | Score | Track | Category |`
  - [x] Document exploration candidates columns: `| # | Initiative | Source | Next Step |`
  - [x] Document changelog format — clarify canonical format: existing backlog uses `| Date | Change |` table under H2 "Change Log"; PRD specifies `### YYYY-MM-DD` with bullet items for per-session entries. Document both: table for the Change Log section, `### YYYY-MM-DD` headers for the Completed section's date groupings
  - [x] Document provenance tag formats with mode distinction:
    - Triage new items: "Added from [source], [date]" — the score recorded is the final score after Gate 2 adjustments
    - Review rescored items: "Rescored [old]->[new], Review, [date]" — only when score changes
    - Triage Gate 2 adjustments are NOT rescores — they are the initial score. No rescore provenance is generated
  - [x] Document insertion rules: append to correct category H3 section, regenerate prioritized view
  - [x] Document metadata header: title, Created date, Method, Last Updated date
  - [x] Document standard markdown constraint (NFR6): no proprietary extensions, HTML embeds, or tool-specific syntax
  - [x] Document that backlog output must match the exact current format of `initiatives-backlog.md`

- [x] Task 5: Create `workflow.md` entry point (AC: #5)
  - [x] Add frontmatter: workflow, type, description, author, version
  - [x] Add purpose section describing tri-modal workflow
  - [x] Add steps overview listing all 3 modes
  - [x] Add initialization section: load config from `{project-root}/_bmad/bme/_enhance/config.yaml`
  - [x] Add mode dispatch placeholder (skeleton for Story 1.3 to fill in)
  - [x] Reference output location: `{planning_artifacts}/initiatives-backlog.md`

- [x] Task 6: Create `extensions/bmm-pm.yaml` (AC: #6)
  - [x] Document target_agent, menu_items with cmd/exec/label fields
  - [x] Match v3 extension format from architecture doc lines 129-136

## Dev Notes

### Critical: Config Schema Difference

The Enhance module config.yaml uses a **different schema** from _vortex's config.yaml:

**Enhance (use this):**
```yaml
name: enhance
version: 1.0.0
description: "..."
workflows:
  - name: initiatives-backlog
    entry: workflows/initiatives-backlog/workflow.md
    target_agent: bmm/agents/pm.md
    menu_patch_name: "initiatives-backlog"
```

**_vortex (do NOT copy this pattern):**
```yaml
submodule_name: _vortex
module: bme
agents: [flat list]
workflows: [flat list]
```

The Enhance schema was designed specifically for the installer integration requirements (FR38, FR44) — each workflow entry tells the installer what to install, where, and which agent to patch.

### RICE Scoring Guide — Reference Format

The template must be consistent with the existing backlog's scoring guide. Existing format from `_bmad-output/planning-artifacts/initiatives-backlog.md` lines 9-17:

```markdown
## RICE Scoring Guide

| Factor | Scale | Description |
|--------|-------|-------------|
| **Reach** | 1-10 | How many users/quarter will this affect? (10 = all users, 1 = edge case) |
| **Impact** | 0.25 - 3 | Per-user impact (3 = massive, 2 = high, 1 = medium, 0.5 = low, 0.25 = minimal) |
| **Confidence** | 20-100% | How sure are we about reach and impact estimates? |
| **Effort** | 1-10 | Relative effort in story points (1 = trivial, 10 = multi-epic) |
| **Score** | calculated | (Reach x Impact x Confidence) / Effort |
```

The rice-scoring-guide.md template should include this table AND expand it with:
- Guided questions from the architecture doc (lines 170-177)
- Calibration examples using real backlog items as anchors at three tiers:
  - **Low (~0.2-0.5):** A4 "Fix temp dir prefix" R:1 I:0.25 C:100% E:1 = 0.3, A2 "Create .agent.yaml source files" R:2 I:0.5 C:60% E:4 = 0.2
  - **Medium (~1.0-2.0):** U4 "Test upgrade-path step file cleanup" R:3 I:1 C:90% E:2 = 1.4, I1 "NPM_TOKEN secret for CI publish" R:8 I:2 C:90% E:8 = 1.8
  - **High (~2.5+):** P4 "Enhance module" R:8 I:3 C:70% E:6 = 2.8, S4 "Skills migration" R:10 I:2 C:90% E:5 = 3.6
- Tiebreak rules: Confidence desc, then insertion order (newer first)
- Score distribution health check: no more than 3 identical composite scores in the top 10 of the prioritized view — if this occurs, refine distinguishing RICE components
- Scores must land in the existing range (~0.2-10.0) for consistency

**Template format constraint (PRD):** Pure markdown — no template variables, no runtime resolution. Templates are installer-managed content, overwritten on update. User customizations to calibration examples should be made in the target project's output folder, not in source template files.

**H4 (Strategic Conversation):** The guide's purpose is to prompt genuine reflection, not mechanical calculation. Calibration examples should illustrate *why* items scored as they did, not just the numbers. The 80%+ score acceptance rate target (PRD SC2) depends on this guide providing enough clarity for the agent to propose scores users actually agree with.

### Backlog Format Spec — Exact Structure

Document the exact markdown structure observed in the existing backlog:

**Heading hierarchy:**
```
# Convoke Initiatives Backlog                    (H1)
## RICE Scoring Guide                            (H2)
## Backlog                                       (H2)
### Documentation & Onboarding                   (H3 - category)
### Update & Migration System                    (H3 - category)
### Testing & CI                                 (H3 - category)
### Infrastructure                               (H3 - category)
### Agent Quality & Consistency                  (H3 - category)
### Platform & Product Vision                    (H3 - category)
## Exploration Candidates                        (H2)
## Epic Groupings                                (H2)
## Prioritized View (by RICE Score)              (H2)
## Completed                                     (H2)
## Change Log                                    (H2)
```

**Category table format:**
`| # | Initiative | Source | R | I | C | E | Score | Track | Status |`

Initiative cell format: `**[bold title]** — [description] | [source ref]`
Track values: "Keep the lights on" or "Move the needle"
Status values: Backlog, In Planning, In Progress, Done, Blocked

**Prioritized view format:**
`| Rank | # | Initiative | Score | Track | Category |`

**Changelog format (two patterns in the existing backlog):**
- **Change Log section:** `| Date | Change |` table under H2 "Change Log" — used for operational history
- **Completed section:** `### YYYY-MM-DD` date headers grouping completed items — used for milestone tracking
- The PRD specifies `### YYYY-MM-DD with bullet items` for session-level entries (FR23). The format spec should document both patterns and clarify when each applies

**Provenance rules (critical for downstream stories):**
- Triage new items: "Added from [source], [date]" — score recorded is the final score after Gate 2 adjustments
- Review rescored items: "Rescored [old]->[new], Review, [date]" — only when score actually changes
- Triage Gate 2 adjustments are NOT rescores — they are the initial score. No rescore provenance is generated

### Workflow Entry Point Pattern

Follow the pattern from existing Vortex workflows. Example structure from `_bmad/bme/_vortex/workflows/user-interview/workflow.md`:

```markdown
---
workflow: [name]
type: step-file
description: [purpose]
author: [agent name]
version: 1.0.0
---

# [Workflow Name]

[Purpose paragraph]

## Workflow Structure
[Step-file architecture description]

## Steps Overview
1. **[Step name]** — [brief]

## Output
**Artifact:** [output location]

---

## INITIALIZATION
Load config from {project-root}/_bmad/bme/_enhance/config.yaml
Load step: [first step path]
```

For this story, the workflow.md should describe all 3 modes in the overview but the INITIALIZATION section should have a placeholder comment indicating Story 1.3 will add the T/R/C dispatch menu.

### pm.md Menu Structure (for reference — Story 1.2 uses this)

The pm.md agent at `_bmad/bmm/agents/pm.md` has this menu structure:
```xml
<menu>
  <item cmd="MH or fuzzy match on menu or help">[MH] Redisplay Menu Help</item>
  ...
  <item cmd="DA or fuzzy match on exit, leave, goodbye or dismiss agent">[DA] Dismiss Agent</item>
</menu>
```

The Enhance `<item>` tag format (Story 1.2 handles insertion):
```xml
<item cmd="IB or fuzzy match on initiatives-backlog"
      exec="{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md">[IB] 📦 Initiatives Backlog (Convoke Enhance)</item>
```

### Extension File Format

`bmm-pm.yaml` should follow the v3 extension format from architecture doc:
```yaml
target_agent: bmm/pm
menu_items:
  - cmd: "IB or fuzzy match on initiatives-backlog"
    exec: "{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md"
    label: "[IB] 📦 Initiatives Backlog"
```

This file is documentation-only in v1 — it describes what the patch-based installer does. In v3, agents would read this file dynamically.

### Empty Step Directories

Create `.gitkeep` files in empty directories so git tracks them:
- `steps-t/.gitkeep`
- `steps-r/.gitkeep`
- `steps-c/.gitkeep`
- `guides/.gitkeep`

Step files will be authored in subsequent stories:
- `steps-t/`: Stories 1.3 (dispatch), 1.4 (extraction), 1.5 (scoring), 1.6 (backlog update)
- `steps-r/`: Story 2.1 (Review mode)
- `steps-c/`: Story 3.1 (Create mode)
- `guides/`: Story 3.2 (ENHANCE-GUIDE.md)

### Scope Boundaries & Constraints

**In scope (this story):**
- Directory structure, config.yaml, two templates, workflow.md skeleton, bmm-pm.yaml
- Pure markdown files only — no template variables, no runtime resolution
- All output must be standard markdown (NFR6)

**Out of scope (do NOT touch):**
- Step files — Stories 1.3-1.6, 2.1, 3.1
- pm.md agent file — Story 1.2 (installer integration)
- refreshInstallation() / validator.js — Story 1.2
- guides/ENHANCE-GUIDE.md content — Story 3.2
- agent-manifest.csv — Enhance is not an agent

**Architecture constraints:**
- Max 2-3 Enhance menu items per agent (prevent menu bloat)
- Enhance workflows must work if target agent is updated upstream (no tight coupling)
- Output goes to `_bmad-output/planning-artifacts/` (target module's existing output folder), NOT a new output folder
- Do NOT use _vortex's config.yaml schema — Enhance has its own schema
- Templates are installer-managed content — overwritten on update. User customizations belong in the target project's output folder

### Project Structure Notes

- Enhance module lives at `_bmad/bme/_enhance/` — parallel to `_bmad/bme/_vortex/`
- Both are Convoke BME (BMAD Method Extension) submodules
- The `_bmad/` directory path is NOT renamed (BMAD Method compatibility)
- Output goes to existing `_bmad-output/planning-artifacts/` folder

### References

- [Source: epics-p4-enhance-module.md — Story 1.1 acceptance criteria, lines 230-251]
- [Source: P4-enhance-module-architecture.md — Directory structure, lines 67-98]
- [Source: P4-enhance-module-architecture.md — Config schema, lines 149-161]
- [Source: P4-enhance-module-architecture.md — RICE scoring engine, lines 168-178]
- [Source: P4-enhance-module-architecture.md — Agent attachment format, lines 114-125]
- [Source: P4-enhance-module-architecture.md — Extension format, lines 127-143]
- [Source: initiatives-backlog.md — Existing RICE guide format, lines 9-17]
- [Source: initiatives-backlog.md — Backlog heading structure and table format, full file]
- [Source: prd-p4-enhance-module.md — FR16 (RICE guide loading), FR17 (score conformance), FR45 (format spec loading)]
- [Source: prd-p4-enhance-module.md — Template Requirements section, lines 302-314 (format constraints, provenance rules, update policy)]
- [Source: prd-p4-enhance-module.md — Success Criteria SC2 (80%+ score acceptance, top-10 distribution guard)]
- [Source: prd-p4-enhance-module.md — Innovation Hypothesis H4 (strategic conversation, scoring reflection)]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None — no errors or debugging required.

### Completion Notes List

- Created complete `_bmad/bme/_enhance/` directory tree with all required subdirectories
- config.yaml uses the Enhance-specific schema (name/version/description/workflows[]) — NOT the _vortex schema
- rice-scoring-guide.md includes: factor table matching existing backlog, guided questions per factor, 6 real calibration examples across 3 tiers with reasoning, score distribution health check, H4 strategic conversation guidance, consistency notes
- backlog-format-spec.md includes: full heading hierarchy, all 4 table formats (category, prioritized view, exploration candidates, completed), dual changelog format documentation, provenance rules with Triage/Review/Create distinctions, pre-write validation checklist, insertion rules
- workflow.md follows Vortex workflow entry point pattern with frontmatter, modes overview, and placeholder dispatch for Story 1.3
- bmm-pm.yaml documents the menu patch in v3 extension format
- .gitkeep files in 4 empty directories (steps-t, steps-r, steps-c, guides)
- All files are pure markdown — no template variables, no runtime resolution
- 328 existing tests pass, 0 regressions
- Code review: 2 MEDIUM issues found and fixed (score rounding convention note, legacy completed table format note)

### File List

- _bmad/bme/_enhance/config.yaml (new)
- _bmad/bme/_enhance/extensions/bmm-pm.yaml (new)
- _bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md (new)
- _bmad/bme/_enhance/workflows/initiatives-backlog/templates/rice-scoring-guide.md (new)
- _bmad/bme/_enhance/workflows/initiatives-backlog/templates/backlog-format-spec.md (new)
- _bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/.gitkeep (new)
- _bmad/bme/_enhance/workflows/initiatives-backlog/steps-r/.gitkeep (new)
- _bmad/bme/_enhance/workflows/initiatives-backlog/steps-c/.gitkeep (new)
- _bmad/bme/_enhance/guides/.gitkeep (new)
