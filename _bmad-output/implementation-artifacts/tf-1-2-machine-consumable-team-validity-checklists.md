# Story 1.2: Machine-Consumable Team Validity Checklists

Status: done

## Story

As a framework contributor (and as the factory at runtime),
I want machine-extractable checklists of what constitutes a valid team for each composition pattern,
So that both humans and automated tools can verify team compliance against the same source of truth.

## Acceptance Criteria

1. **Given** the Architecture Reference document
   **When** checklist sections are authored
   **Then** each section contains fenced YAML data blocks with structured checks — each check has id, rule, target_file, and validation fields (TF-FR1)
   **And** checklists are per quality property × composition pattern (~8 sections, e.g., "Discoverable — Independent", "Discoverable — Sequential")
   **And** YAML blocks are self-describing — identified by presence of `quality_property`, `composition_pattern`, and `checks` top-level keys (D-Q1)

2. **Given** the checklists cover integration surfaces
   **When** all 8 surfaces are enumerated
   **Then** the reference covers: agent-registry.js, refresh-installation.js, validator.js, contracts, config.yaml, module-help.csv, activation XML, and naming conventions (TF-FR7)
   **And** each integration surface has at least one check with a target_file and validation criteria

3. **Given** the reference is the single source of truth (TF-NFR5)
   **When** the factory or validator needs team rules
   **Then** rules are extracted from the YAML data blocks at runtime — zero hardcoded values in workflow step files or validator code

## Tasks / Subtasks

- [x] Task 1: Author Discoverable — Independent checklist (AC: #1, #2)
  - [x] 1.1 Replace stub in `architecture-reference-teams.md` section "## Discoverable — Independent" with YAML data block
  - [x] 1.2 Include checks for: module-help.csv row exists (if applicable — see dev notes on module-help.csv gap), README/documentation mentions team, agent-manifest.csv entries exist
  - [x] 1.3 Ensure ≥3 checks with id (DISC-I-xx), rule, target_file, validation fields
  - [x] 1.4 Verify YAML block has `quality_property: discoverable`, `composition_pattern: independent`, `checks` top-level keys

- [x] Task 2: Author Discoverable — Sequential checklist (AC: #1, #2)
  - [x] 2.1 Replace stub with self-contained YAML data block — duplicate applicable Independent rules with S-prefixed IDs (each section must stand alone for JIT loading), PLUS Sequential-specific checks: compass-routing-reference.md exists, activation XML menus reference all workflows
  - [x] 2.2 Ensure ≥3 checks with id (DISC-S-xx)
  - [x] 2.3 Verify YAML block has correct top-level keys

- [x] Task 3: Author Installable — Independent checklist (AC: #1, #2)
  - [x] 3.1 Replace stub with YAML data block: agent-registry.js module block exists (AGENTS array, WORKFLOWS array, derived lists, exports), refresh-installation.js copies module files, config.yaml exists and parses
  - [x] 3.2 Ensure ≥3 checks with id (INST-I-xx)
  - [x] 3.3 Verify YAML block has correct top-level keys

- [x] Task 4: Author Installable — Sequential checklist (AC: #1, #2)
  - [x] 4.1 Replace stub with self-contained YAML data block — duplicate applicable Independent rules with S-prefixed IDs, PLUS Sequential-specific checks: contracts directory copied, workflow step files copied
  - [x] 4.2 Ensure ≥3 checks with id (INST-S-xx)
  - [x] 4.3 Verify YAML block has correct top-level keys

- [x] Task 5: Author Configurable — Independent checklist (AC: #1, #2)
  - [x] 5.1 Replace stub with YAML data block: config.yaml has required fields (submodule_name, module, agents, workflows, version, user_name, communication_language, output_folder), activation XML loads config.yaml, naming conventions follow patterns
  - [x] 5.2 Ensure ≥3 checks with id (CONF-I-xx)
  - [x] 5.3 Verify YAML block has correct top-level keys

- [x] Task 6: Author Configurable — Sequential checklist (AC: #1, #2)
  - [x] 6.1 Replace stub with self-contained YAML data block — duplicate applicable Independent rules with S-prefixed IDs, PLUS Sequential-specific checks: contract frontmatter references correct agent IDs from config
  - [x] 6.2 Ensure ≥3 checks with id (CONF-S-xx)
  - [x] 6.3 Verify YAML block has correct top-level keys

- [x] Task 7: Author Composable — Independent checklist (AC: #1, #2)
  - [x] 7.1 Replace stub with YAML data block: agent-manifest.csv entries exist (for overlap detection), no contract requirements (Independent pattern), README/docs describe agent capabilities for cross-team awareness, canonical skill IDs follow `bmad-agent-bme-{agent-id}` pattern (enables inter-module routing)
  - [x] 7.2 Ensure ≥3 checks with id (COMP-I-xx) — composability for Independent means agents are individually addressable and their capabilities are visible to other modules, not that they have contracts
  - [x] 7.3 Verify YAML block has correct top-level keys

- [x] Task 8: Author Composable — Sequential checklist (AC: #1, #2)
  - [x] 8.1 Replace stub with YAML data block including: contracts directory with handoff contract files, contract frontmatter has required fields (contract, type, source_agent, target_agents), compass routing reference exists with inter-module routing
  - [x] 8.2 Ensure ≥3 checks with id (COMP-S-xx)
  - [x] 8.3 Verify YAML block has correct top-level keys

- [x] Task 9: Validate all 8 sections meet Phase 1 exit criteria (AC: #1, #2, #3)
  - [x] 9.1 Verify each section has ≥3 checks (Phase 1 exit criterion)
  - [x] 9.2 Verify all 8 integration surfaces appear across the checklists (TF-FR7)
  - [x] 9.3 Verify every YAML block has the 3 required top-level keys (quality_property, composition_pattern, checks)
  - [x] 9.4 Verify every check has id, rule, target_file, validation fields
  - [x] 9.5 Verify no hardcoded factory rules — all rules are in the YAML blocks, not in prose (TF-NFR5)
  - [x] 9.6 Verify check IDs follow pattern: {PROP}-{I|S}-{NN} (e.g., DISC-I-01, INST-S-03)

## Dev Notes

### This is a CREATION story — populating existing stubs

Story 1.1 created the Architecture Reference document with 8 stub sections. This story replaces each stub with a fenced YAML data block containing structured checks. The file already exists at `_bmad-output/planning-artifacts/architecture-reference-teams.md`.

### YAML Data Block Format (D-Q1 — Option B)

Each section gets exactly one fenced YAML block with this structure:

```yaml
quality_property: discoverable
composition_pattern: independent
checks:
  - id: DISC-I-01
    rule: "Agent appears in agent-manifest.csv"
    target_file: "_bmad/_config/agent-manifest.csv"
    validation: "row exists with module=bme, path=_bmad/bme/{submodule}/agents/{agent_id}.md"
  - id: DISC-I-02
    rule: "..."
    target_file: "..."
    validation: "..."
```

**Detection keys:** Factory identifies extractable blocks by presence of all three: `quality_property`, `composition_pattern`, `checks`. Non-checklist YAML blocks (code examples in dev notes) will lack these keys.

**Check ID convention:** `{PROPERTY_PREFIX}-{PATTERN_LETTER}-{NN}`
- Property prefixes: DISC (Discoverable), INST (Installable), CONF (Configurable), COMP (Composable)
- Pattern letters: I (Independent), S (Sequential)
- Example: DISC-I-01, INST-S-03, COMP-S-02

### Integration Surfaces — What Checks Cover (TF-FR7)

The 8 integration surfaces must be covered across all checklists. Here is where each surface maps:

| # | Surface | Primary Quality Property | Key Check |
|---|---------|------------------------|-----------|
| 1 | agent-registry.js | Installable | Module block with AGENTS, WORKFLOWS, derived lists, exports |
| 2 | refresh-installation.js | Installable | Module paths in copy logic |
| 3 | validator.js | Installable | Module validation checks exist |
| 4 | contracts | Composable (Sequential only) | Contract files in contracts/ directory |
| 5 | config.yaml | Configurable | Required fields present and valid |
| 6 | module-help.csv | Discoverable | Row exists with module entry |
| 7 | activation XML | Configurable + Discoverable | Loads config.yaml, menu items reference workflows |
| 8 | naming conventions | Configurable | kebab-case IDs, underscore-prefix modules, snake_case config fields — naming checks are distributed across sections, each referencing the specific file being validated (e.g., agent files → `agents/{id}.md`, config → `config.yaml` submodule_name field) |

### Real Integration Surface Details (from codebase analysis)

**agent-registry.js** (`scripts/update/lib/agent-registry.js`):
- Per-module const blocks: `{PREFIX}_AGENTS` array, `{PREFIX}_WORKFLOWS` array
- Each agent: `{ id, name, icon, title, stream, persona: { role, identity, communication_style, expertise } }`
- Each workflow: `{ name, agent }` (agent = agent ID reference)
- Derived lists: `{PREFIX}_AGENT_FILES`, `{PREFIX}_AGENT_IDS`, `{PREFIX}_WORKFLOW_NAMES`
- Exports: all arrays in `module.exports`
- Vortex uses unprefixed names (AGENTS, WORKFLOWS); Gyre uses GYRE_ prefix

**refresh-installation.js** (`scripts/update/lib/refresh-installation.js`):
- Source: `{packageRoot}/_bmad/bme/{_submodule}/`
- Target: `{projectRoot}/_bmad/bme/{_submodule}/`
- Copies: agents/, workflows/, contracts/, guides/, config.yaml
- Uses agent-registry arrays to iterate files
- Generates agent-manifest.csv rows via `buildAgentRow610()`

**validator.js** (`scripts/update/lib/validator.js`):
- Validates: config.yaml parse, agent files exist, workflow.md files exist, agent-manifest.csv entries
- Uses agent-registry arrays for file lists
- Checks workflow step structure (step files in steps/ subdirectory)

**config.yaml** — Required fields from existing modules:
- `submodule_name` (string, underscore-prefixed)
- `module` (string, always "bme" for bme submodules)
- `agents` (array of agent IDs, kebab-case)
- `workflows` (array of workflow names, kebab-case)
- `version` (semver string)
- `user_name` (string, typically `'{user}'`)
- `communication_language` (string, e.g., "en")
- `output_folder` (string, e.g., `'{project-root}/_bmad-output/{name}-artifacts'`)
- Optional: `party_mode_enabled` (boolean), `core_module` (string), `migration_history` (array)

**contracts** — Naming: `{prefix}{N}-{kebab-case-title}.md` (e.g., `hc1-empathy-artifacts.md`, `gc1-stack-profile.md`)
- Required frontmatter: `contract`, `type`, `source_agent`, `source_workflow`, `target_agents`, `input_artifacts`, `created`
- Sequential pattern only — Independent pattern has no contracts

**activation XML** — Structure in agent `.md` files:
- `<agent id="..." name="..." title="..." icon="...">`
- `<activation critical="MANDATORY">` with numbered `<step>` elements
- Step 2 MUST load module config.yaml: `{project-root}/_bmad/bme/{_submodule}/config.yaml`
- `<menu-handlers>` with `<handler type="exec|data|workflow">`
- `<menu>` with `<item cmd="..." exec="...">` entries referencing workflow paths
- `<persona>` with `<role>`, `<identity>`, `<communication_style>`, `<principles>`

**agent-manifest.csv** — v6.1.0 schema columns:
`name, displayName, title, icon, capabilities, role, identity, communicationStyle, principles, module, path, canonicalId`

**module-help.csv** — IMPORTANT: Vortex and Gyre do NOT have their own module-help.csv files. This file exists in core/, bmm/, tea/, cis/, wds/, bmb/ modules but NOT in bme submodules. The Discoverable checks should note this: either new bme teams should create one, or discovery happens through agent-registry + agent-manifest instead. Write the check to reflect what a *new* team SHOULD have, noting the gap.

**naming conventions:**
- Module directories: underscore prefix (`_vortex`, `_gyre`, `_enhance`)
- Agent files: `{agent-id}.md` (kebab-case, matches registry id)
- Agent IDs in registry: kebab-case (e.g., `contextualization-expert`)
- Agent display names: first-name only (e.g., `Emma`, `Scout`)
- Workflow directories: kebab-case (e.g., `stack-detection/`, `lean-persona/`)
- Workflow entry: `workflow.md` inside each workflow directory
- Config fields: snake_case (e.g., `submodule_name`, `output_folder`)
- Contract files: `{prefix}{N}-{kebab-case-title}.md`
- User guides: `{AGENT_NAME}-USER-GUIDE.md` (uppercase)
- Canonical skill IDs: `bmad-agent-bme-{agent-id}`
- Customize files: `bme-{agent-first-name-lowercase}.customize.yaml`

### Independent vs Sequential — What Differs

**JIT self-containment rule:** Each section must stand alone. The factory loads only one section (e.g., "Installable — Sequential"). Sequential sections must contain ALL checks for that quality+pattern combo — they are a superset of Independent, not a delta. Duplicate the applicable rules with S-prefixed IDs (e.g., INST-I-01 "registry block exists" becomes INST-S-01 with the same rule), then add Sequential-specific checks after.

When authoring checks, some are shared across both patterns, some are pattern-specific:

**Shared (appear in both Independent and Sequential):**
- agent-registry.js module block
- config.yaml required fields
- agent file existence and naming
- activation XML structure
- agent-manifest.csv entries
- refresh-installation.js copy paths

**Sequential only:**
- contracts/ directory with handoff contract files
- Contract frontmatter with source_agent, target_agents
- compass-routing-reference.md
- Workflow orchestration (multi-step pipelines)

**Independent only:**
- No contract requirements (explicitly absent)
- No compass routing requirement (optional)

### What NOT to Create (Out of Scope)

- **Do NOT create human-readable "why" prose per check** — Story 1.3 scope
- **Do NOT create Gyre validation** — Story 1.4 scope
- **Do NOT create any JS utilities or workflow files** — Epic 2 scope
- **Do NOT modify the Introduction, Composition Patterns, or Quality Properties sections** — Story 1.1 already delivered those

### Phase 1 Exit Criteria (Story 1.2 contribution)

From architecture: "All 8 property×pattern sections complete with ≥3 checks each"
- Story 1.1 created the document structure and defined properties/patterns ✅
- **Story 1.2 populates the YAML checklists (≥3 checks per section)** ← THIS STORY
- Story 1.3 adds per-check "why" prose

### Previous Story Intelligence

From Story 1.1 completion notes:
- Created `architecture-reference-teams.md` (~206 lines) with 8 stub sections
- Each stub has HTML comments for Stories 1.2/1.3 and placeholder text `_Checklist pending — see Stories 1.2 and 1.3._`
- Sections separated by `---` for independent addressability
- Code review found: Vortex has 22 workflows (not 21), module-help.csv absent from bme submodules, HC6-HC10 are inline not standalone files
- Document layout: Introduction → Composition Patterns → Quality Properties → 8 checklist stubs

### Project Structure Notes

- Architecture Reference: `_bmad-output/planning-artifacts/architecture-reference-teams.md`
- agent-registry.js: `scripts/update/lib/agent-registry.js`
- refresh-installation.js: `scripts/update/lib/refresh-installation.js`
- validator.js: `scripts/update/lib/validator.js`
- Vortex module: `_bmad/bme/_vortex/`
- Gyre module: `_bmad/bme/_gyre/`
- Enhance module: `_bmad/bme/_enhance/`
- Agent manifest: `_bmad/_config/agent-manifest.csv`

### References

- [Source: _bmad-output/planning-artifacts/epic-team-factory.md — Story 1.2 ACs]
- [Source: _bmad-output/planning-artifacts/architecture-team-factory.md — D-Q1 format, check ID structure, Phase 1 exit criteria]
- [Source: _bmad-output/planning-artifacts/architecture-reference-teams.md — Target file with 8 stub sections]
- [Source: _bmad-output/implementation-artifacts/tf-1-1-quality-properties-composition-patterns.md — Story 1.1 completion notes]
- [Source: scripts/update/lib/agent-registry.js — Real registry structure]
- [Source: scripts/update/lib/refresh-installation.js — Real installation logic]
- [Source: scripts/update/lib/validator.js — Real validation checks]
- [Source: _bmad/bme/_vortex/config.yaml — Real config schema]
- [Source: _bmad/bme/_gyre/config.yaml — Real config schema]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None — no errors encountered.

### Completion Notes List

- All 30 subtasks passed across 9 tasks — 8 YAML checklist sections authored + validation
- Task 1 (DISC-I): 5 checks — agent-manifest.csv, README, activation XML menus, canonical skill IDs, module-help.csv (with gap note)
- Task 2 (DISC-S): 7 checks — duplicated DISC-I checks with S-prefixed IDs + compass routing reference, agent menu/workflow coverage
- Task 3 (INST-I): 6 checks — agent-registry.js block, refresh-installation.js copy, config.yaml parse, validator.js checks, agent files, workflow.md entry points
- Task 4 (INST-S): 8 checks — duplicated INST-I with S-prefixed IDs + contracts directory exists, refresh copies contracts
- Task 5 (CONF-I): 6 checks — config.yaml required fields, activation XML loads config, agent file naming, module dir naming, workflow dir naming, config field snake_case
- Task 6 (CONF-S): 8 checks — duplicated CONF-I with S-prefixed IDs + contract frontmatter agent ID consistency, contract file naming convention
- Task 7 (COMP-I): 4 checks — agent-manifest.csv cross-module visibility, no-contracts assertion, canonical skill IDs, README capabilities
- Task 8 (COMP-S): 6 checks — agent-manifest.csv, handoff contracts exist, contract frontmatter fields, compass inter-module routing, canonical skill IDs, pipeline contract coverage
- Task 9 (validation): All 6 criteria passed — ≥3 checks per section (min 4), all 8 integration surfaces covered (module-help.csv added during validation), correct YAML keys, correct check fields, no hardcoded rules, correct ID patterns
- Total: 50 checks across 8 sections (vs 24 minimum required by Phase 1 exit criteria)
- JIT self-containment rule honored: every Sequential section is a superset of its Independent counterpart with S-prefixed IDs
- module-help.csv gap documented in DISC-I-05/DISC-S-05 validation fields with NOTE about existing bme submodules lacking this file

### Change Log

- 2026-03-24: Populated all 8 YAML checklist sections in `architecture-reference-teams.md` — 50 structured checks covering all 8 integration surfaces

### File List

- `_bmad-output/planning-artifacts/architecture-reference-teams.md` (modified — 8 stub sections replaced with YAML data blocks)
