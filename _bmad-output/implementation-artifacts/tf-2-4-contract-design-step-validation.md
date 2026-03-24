# Story 2.4: Contract Design Step & Validation

Status: review

## Story

As a framework contributor,
I want the factory to guide me through designing handoff contracts between agents with per-step validation,
So that my agents have well-defined interfaces and each step is confirmed correct before moving on.

## Acceptance Criteria

1. **Given** the contributor is in Step 2 (Connect)
   **When** defining contracts for a Sequential team
   **Then** the factory presents a contract template based on the Sequential pattern and asks what each agent passes to the next (TF-FR8)
   **And** validation rules are applied per the composition pattern — contracts required for Sequential, optional for Independent (TF-FR16)

2. **Given** each step produces output
   **When** moving to the next step
   **Then** step output is validated and confirmed before proceeding (TF-FR9)
   **And** validation is stateless — takes the spec object as input, returns structured results (Mode Parity guarantee)

## Tasks / Subtasks

- [x] Task 1: Create step-02-connect.md — Contract Design for Sequential Teams (AC: #1)
  - [x] 1.1 Create `.claude/skills/bmad-team-factory/step-02-connect.md` following the established step-file structure: PURPOSE, RULES, content sections, CHECKPOINT, NEXT. This is Step 2 (Connect) — contract design and integration decisions.
  - [x] 1.2 In PURPOSE section: explain that Step 2 guides the contributor through designing handoff contracts (Sequential) or confirming no contracts are needed (Independent). Reference the composition pattern and agent inventory from Step 1 context.
  - [x] 1.3 In RULES section: include communication language rule (`{communication_language}`), concept budget (≤3 per visibility checklist per TF-NFR2), pattern-aware branching (Sequential vs Independent paths), and Architecture Reference as source of truth for contract conventions (TF-NFR5).
  - [x] 1.4 Implement **Independent path (abbreviated)**: If `composition_pattern` = "Independent" from Step 1 context, present a brief confirmation that no contracts are required. Offer optional contract creation ("Would you like to define any optional contracts between your agents?"). If declined, skip to CHECKPOINT. If accepted, follow the Sequential contract flow but mark all contracts as optional.
  - [x] 1.5 Implement **Sequential contract flow**: For each adjacent pair in the `pipeline_sequence` from Step 1, guide the contributor through defining a handoff contract. For each contract, collect: (a) contract ID — auto-suggest format `{team_prefix}{N}` based on pipeline position (e.g., first pair = prefix + "1"), (b) artifact description — what the source agent passes to the target, (c) key sections — what data fields the artifact contains (2-5 sections). Present existing contract examples from Vortex (HC1-HC5) and Gyre (GC1-GC4) for reference (TF-FR13).

- [x] Task 2: Contract Template Presentation & Validation (AC: #1, #2)
  - [x] 2.1 Present the contract frontmatter template based on existing HC/GC patterns. Show the required fields: `contract` (ID string), `type` (always "artifact"), `source_agent` (agent ID from pipeline), `source_workflow` (to be defined later — use placeholder), `target_agents` (array of downstream agent IDs), `input_artifacts` (upstream contract references or empty array for first-in-chain), `created` (ISO date). Reference COMP-S-03 for validation rules.
  - [x] 2.2 Auto-derive contract chain from pipeline: for each adjacent pair (agent[i] → agent[i+1]), pre-populate `source_agent` and `target_agents` from the `pipeline_sequence`. Show the contributor what's auto-derived and ask them to confirm or adjust. Allow multi-consumer contracts (one source → multiple targets) if the contributor specifies.
  - [x] 2.3 Validate contract naming convention: contract file names must follow `{prefix}{N}-{kebab-case-title}.md` pattern (per CONF-S-08). Validate the prefix is a short lowercase string and N is sequential. Show examples: `hc1-empathy-artifacts.md` (Vortex), `gc1-stack-profile.md` (Gyre).
  - [x] 2.4 Validate contract chain coverage: for Sequential teams, verify that every adjacent agent pair in the pipeline has a contract (per COMP-S-06). If a gap is found, flag it: "No contract defined between agent-X and agent-Y. Would you like to add one?"

- [x] Task 3: Integration Decisions (AC: #1)
  - [x] 3.1 After contracts are defined, present compass routing decisions. For Sequential teams: compass routing is required (per cascade from Step 1). Explain that the compass routing reference will be generated in a later step — for now, record that it's needed and confirm the pipeline flow is correct.
  - [x] 3.2 Present artifact output location decision: suggest the default output directory pattern `_bmad-output/{team-name}-artifacts/` (following Vortex pattern: `_bmad-output/vortex-artifacts/`). Ask contributor to confirm or customize the output path.
  - [x] 3.3 For Independent teams: confirm compass routing is optional (per cascade). Ask if the contributor wants per-agent entry points or a shared routing reference. Record the decision.

- [x] Task 4: Per-Step Validation & Visibility Checklist (AC: #2)
  - [x] 4.1 Add per-step validation logic: before proceeding to CHECKPOINT, validate all Step 2 decisions. For Sequential: verify all pipeline pairs have contracts defined, contract IDs follow naming convention, contract chain has no gaps. For Independent: verify contract decisions recorded (even if "none"). Present validation results to the contributor.
  - [x] 4.2 Add Visibility Checklist section for Step 2 per D-VB. Colleague-visible: (1) contract inventory with source/target agents and artifact descriptions, (2) contract naming validation results, (3) integration decisions (routing, output location). Silent: existing contract files loaded for reference examples. Concept count: 3/3. Approval prompt: "Confirm your contract design and integration decisions."
  - [x] 4.3 Implement CHECKPOINT: combined summary showing composition pattern (from Step 1), agent inventory (from Step 1), contract inventory (new), integration decisions (new). Include validation status for each contract. Ask for confirmation before proceeding.
  - [x] 4.4 Record contract design decisions in conversation context for downstream steps: `contracts` array with each contract's `id`, `source_agent`, `target_agents`, `artifact_description`, `key_sections`, `file_name`; `contract_count`; `output_directory`; `compass_routing_decision`.

- [x] Task 5: Update NEXT Section and workflow.md (AC: #1, #2)
  - [x] 5.1 Set NEXT to point to Step 3 (Review) with fallback note: "Step 3 is being implemented in Story 2.5 and is not yet available. Your contract design and integration decisions have been recorded. Point to the Architecture Reference for manual guidance on remaining steps."
  - [x] 5.2 Update workflow.md status line from "Steps 0–1 available" to "Steps 0–2 available" and update "Stories 2.4–2.9" to "Stories 2.5–2.9" in the remaining steps note.

- [x] Task 6: Verification (AC: #1, #2)
  - [x] 6.1 Verify step-02-connect.md follows the step-file structure: PURPOSE, RULES, content sections, Visibility Checklist, CHECKPOINT, NEXT.
  - [x] 6.2 Verify contract frontmatter template matches COMP-S-03: `contract`, `type`, `source_agent`, `source_workflow`, `target_agents`, `created` fields present.
  - [x] 6.3 Verify contract file naming follows CONF-S-08: `{prefix}{N}-{kebab-case-title}.md`.
  - [x] 6.4 Verify contract chain coverage validation references COMP-S-06.
  - [x] 6.5 Verify concept count ≤ 3 in visibility checklist.
  - [x] 6.6 Verify contextual examples reference Vortex HC contracts AND Gyre GC contracts (FR13).
  - [x] 6.7 Verify Independent path is abbreviated — brief confirmation, optional contract offer, then skip to CHECKPOINT.
  - [x] 6.8 Verify NEXT section points to Step 3 with fallback.
  - [x] 6.9 Verify workflow.md status line is updated.

## Dev Notes

### Story 2.4 creates Step 2 (Connect) — new step file

Unlike Stories 2.2/2.3 which shared step-01-scope.md, Story 2.4 creates a new file: `step-02-connect.md`. This is the first new step file since step-01-scope.md. Follow the same step-file structure pattern established by step-00-route.md and step-01-scope.md.

### Architecture Decisions

1. **No JS modules in this story**: The architecture maps contract validation to JS utilities (collision-detector.js, writers/). Those are for Stories 2.6-2.9. This story creates LLM-side instructions only — the step file instructs the LLM to guide contract design conversationally.
2. **Contract template is LLM-presented, not generated**: Step 2 collects contract design decisions. Actual contract file generation happens in Step 4 (Generate, Story 2.6) via BMB delegation. Step 2 records what contracts to create, not the contract files themselves.
3. **NFR5 — Architecture Reference is single source of truth**: Contract naming conventions and validation rules should reference the Architecture Reference checks (COMP-S-03, COMP-S-06, CONF-S-07, CONF-S-08), not hardcode rules. However, the contract frontmatter template is simple enough to include inline as presentation guidance (same approach as Step 1's naming regex).
4. **NFR2 — ≤3 concepts for Step 2**: The 3 concepts are: (1) contract inventory with source/target and descriptions, (2) contract naming validation, (3) integration decisions (routing + output location).
5. **Pattern-aware branching**: Step 2 behaves differently for Sequential vs Independent. Sequential: full contract design flow with chain coverage validation. Independent: abbreviated — confirm no contracts needed, offer optional contracts.
6. **Per-step validation (FR9)**: Validation runs at the end of Step 2, before CHECKPOINT. It verifies contract naming, chain coverage (Sequential), and integration decisions. Validation is presentational (LLM checks and reports) — deterministic validation comes in Stories 2.6-2.9.
7. **Contract frontmatter uses agent IDs, not display names**: Per CONF-S-07, `source_agent` and `target_agents` reference agent name values from the registry (short names like "isla", "mila" for Vortex; agent IDs for new teams). The contributor's agents use kebab-case IDs from Step 1, so these map directly.
8. **`source_workflow` is a placeholder**: Workflows aren't defined until Step 4 (Generate). In Step 2, use a placeholder value or ask the contributor for a descriptive workflow name. The actual workflow file creation happens later.
9. **`input_artifacts` chains automatically**: For the first contract in the pipeline, `input_artifacts` is `[]`. For subsequent contracts, it references the previous contract's ID (e.g., `[{prefix}1]` for the second contract). This can be auto-derived from the pipeline sequence.

### Contract Structure Reference

**Frontmatter schema (from HC1/GC1 patterns):**
```yaml
---
contract: {PREFIX}{N}          # e.g., HC1, GC1
type: artifact
source_agent: {agent_id}       # kebab-case agent ID
source_workflow: {workflow}     # workflow that produces this artifact
target_agents: [{agent_id}]    # array of consuming agent IDs
input_artifacts: []             # upstream contract references
created: YYYY-MM-DD
---
```

**Contract file naming (CONF-S-08):**
`{prefix}{N}-{kebab-case-title}.md` — e.g., `hc1-empathy-artifacts.md`, `gc1-stack-profile.md`

**Contract chain coverage (COMP-S-06):**
For each adjacent pair in the pipeline, a contract must exist where `source_agent` = upstream agent and `target_agents` includes the downstream agent.

### Existing Contract Examples

**Vortex (10 contracts, HC prefix):**
- `hc1-empathy-artifacts.md` — Flow: Isla → Mila
- `hc2-problem-definition.md` — Flow: Mila → Liam
- `hc3-hypothesis-contract.md` — Flow: Liam → Wade
- `hc4-experiment-context.md` — Flow: Wade → Noah
- `hc5-signal-report.md` — Flow: Noah → Max
- HC6-HC10 — Feedback routing (reverse flow contracts)

**Gyre (4 contracts, GC prefix):**
- `gc1-stack-profile.md` — Flow: Scout → Atlas, Lens
- `gc2-capabilities-manifest.md` — Flow: Atlas → Lens
- `gc3-findings-report.md` — Flow: Lens → Coach
- `gc4-feedback-loop.md` — Flow: Coach → (feedback)

### File Locations and Patterns

**Files to CREATE:**
- `.claude/skills/bmad-team-factory/step-02-connect.md` — contract design + integration decisions

**Files to MODIFY:**
- `.claude/skills/bmad-team-factory/workflow.md` — update status line only

**Reference files (read, do NOT modify):**
- `_bmad-output/planning-artifacts/architecture-reference-teams.md` — contract validation checks (COMP-S-02 through COMP-S-06, CONF-S-07, CONF-S-08), contract naming conventions
- `_bmad-output/planning-artifacts/architecture-team-factory.md` — FR8, FR9, FR16, D-Q3 validation layering, D-S2 spec architecture, LLM/JS boundary for Step 2
- `_bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md` — Vortex contract format reference
- `_bmad/bme/_gyre/contracts/gc1-stack-profile.md` — Gyre contract format reference
- `.claude/skills/bmad-team-factory/step-01-scope.md` — Step 1 structure pattern to follow + context variables produced

### What NOT to Do

- **Do NOT create contract files** — Step 2 designs contracts conversationally. Actual file generation is Step 4 (Story 2.6) via BMB delegation.
- **Do NOT create JS modules** (`collision-detector.js`, `naming-enforcer.js`, writers/) — those are Stories 2.6-2.9.
- **Do NOT create schema files** (`schema-independent.json`, `schema-sequential.json`) — those are Story 2.5/2.8.
- **Do NOT modify step-01-scope.md** — Step 1 is complete. Step 2 reads from its context output.
- **Do NOT hardcode contract examples** — reference existing contract files for examples, load from `_bmad/bme/_vortex/contracts/` and `_bmad/bme/_gyre/contracts/` at runtime.
- **Do NOT make contracts mandatory for Independent** — cascade from Step 1 sets `contracts_required = false` for Independent. Contracts are offered as optional.
- **Do NOT modify existing team files** (Vortex, Gyre, Enhance) — additive only.
- **Do NOT define workflows in Step 2** — workflow definition happens in Step 4 (Generate). Use placeholder workflow names.
- **Do NOT exceed 3 concepts** in the visibility checklist.

### Previous Story Intelligence

From Story 2.3 (Agent Scope Definition & Overlap Detection):
- step-01-scope.md now has 4 parts: PART 1 (pattern selection), PART 2 (cascade), PART 3 (agent scope), PART 4 (overlap detection). Step 2 will follow the same section-based structure but as a new file.
- Context variables produced by Step 1: `composition_pattern`, `contracts_required`, `compass_routing_required`, `orchestration_required`, `validation_check_count`, `default_accepted`, `override_rationale`, `agents` array (with `id`, `role`, `capabilities`, `pipeline_position`, `overlap_acknowledgments`), `agent_count`, `pipeline_sequence`.
- Naming regex `/^[a-z]+(-[a-z]+)*$/` established for agent IDs — contract IDs use different format (`{prefix}{N}`).
- Code review patches from 2.3: single-agent Sequential guard, case-insensitive Level 1 comparison, empty capabilities acknowledgment, display names in examples table. These patterns are Step-1-specific but the review thoroughness should be expected.
- Communication in `{communication_language}` is mandatory.
- Visibility Checklist at 3/3 concept budget is per-step (Step 2 gets fresh budget).

From Story 2.2 (Composition Pattern Selection & Decision Cascade):
- Step-file structure: PURPOSE, RULES, content sections, CHECKPOINT, NEXT.
- Cascade decisions determine Step 2 behavior: Sequential → full contract flow; Independent → abbreviated.
- Code review has 75% hit rate — keep for this story.

From Story 2.1 (Factory Discoverability & Entry Points):
- Config loaded from `{project-root}/_bmad/bmm/config.yaml`.
- step-00-route.md Route 1 → workflow.md → step-01-scope.md → (Step 2 when available). The wiring from Step 1's NEXT section points to Step 2 with a fallback that must be satisfied by this story.

### Key Validation Checks Referenced

From architecture-reference-teams.md:
- **COMP-S-02**: Handoff contracts exist defining inter-agent artifact schemas
- **COMP-S-03**: Each contract has required frontmatter fields (`contract`, `type`, `source_agent`, `source_workflow`, `target_agents`, `created`)
- **COMP-S-06**: Contract chain covers the full agent pipeline (each adjacent pair has a contract)
- **CONF-S-07**: Contract frontmatter references agent names consistent with agent-registry
- **CONF-S-08**: Contract file names follow `{prefix}{N}-{kebab-case-title}.md` convention
- **INST-S-07**: Contracts directory exists and contains handoff contract files

### Project Structure Notes

- Team Factory skill: `.claude/skills/bmad-team-factory/`
- Architecture Reference: `_bmad-output/planning-artifacts/architecture-reference-teams.md`
- Architecture doc: `_bmad-output/planning-artifacts/architecture-team-factory.md`
- Epic file: `_bmad-output/planning-artifacts/epic-team-factory.md`
- Vortex contracts: `_bmad/bme/_vortex/contracts/`
- Gyre contracts: `_bmad/bme/_gyre/contracts/`

### References

- [Source: _bmad-output/planning-artifacts/epic-team-factory.md — Story 2.4 ACs, FR8, FR9, FR16]
- [Source: _bmad-output/planning-artifacts/architecture-team-factory.md — D-Q3 validation layering, D-S2 spec file architecture, LLM/JS boundary (Step 2), FR10 Connect step, write safety protocol]
- [Source: _bmad-output/planning-artifacts/architecture-reference-teams.md — COMP-S-02/03/06 contract checks, CONF-S-07/08 naming checks, contract naming conventions, pattern comparison table]
- [Source: _bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md — Vortex contract frontmatter schema, field reference]
- [Source: _bmad/bme/_gyre/contracts/gc1-stack-profile.md — Gyre contract frontmatter schema, field reference]
- [Source: _bmad-output/implementation-artifacts/tf-2-3-agent-scope-definition-overlap-detection.md — Step 1 context variables, step-file structure, code review patterns]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

N/A

### Completion Notes List

All 25 subtasks across 6 tasks completed. Created step-02-connect.md implementing the full Step 2 (Connect) workflow with pattern-aware branching: Sequential teams get full contract design flow (prefix selection, per-pair contract iteration with auto-derived frontmatter, contract file naming validation, multi-consumer support, optional feedback contracts, chain coverage validation per COMP-S-06), while Independent teams get abbreviated path (brief confirmation, optional contract offer). Includes integration decisions (artifact output location with default pattern, compass routing per composition pattern), STEP VALIDATION section with table format for both patterns, D-VB visibility checklist at 3/3 concept budget, combined CHECKPOINT summary, and context variable recording for downstream steps. Updated workflow.md status line and routing to wire Step 2.

### Change Log

| Change | File | Description |
|--------|------|-------------|
| CREATE | `.claude/skills/bmad-team-factory/step-02-connect.md` | Step 2 (Connect) — contract design, integration decisions, per-step validation, visibility checklist |
| MODIFY | `.claude/skills/bmad-team-factory/workflow.md` | Updated status line to "Steps 0–2 available", added Step 2 routing, updated fallback note |

### File List

- `.claude/skills/bmad-team-factory/step-02-connect.md` (created)
- `.claude/skills/bmad-team-factory/workflow.md` (modified)
