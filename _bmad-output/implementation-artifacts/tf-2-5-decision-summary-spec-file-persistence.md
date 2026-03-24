# Story 2.5: Decision Summary & Spec File Persistence

Status: review

## Story

As a framework contributor,
I want to see all my decisions summarized for approval and have them persisted as a spec file,
So that I can review everything before generation begins and resume later if interrupted.

## Acceptance Criteria

1. **Given** all decision steps (Route, Scope, Connect) are complete
   **When** Step 3 (Review) is reached
   **Then** a decision summary checkpoint presents all decisions for approval before generation begins (TF-FR19)
   **And** the contributor explicitly approves or requests changes

2. **Given** the contributor approves the decision summary
   **When** decisions are persisted
   **Then** all decisions are saved as a team spec file (YAML) that serves as audit trail, resume point, and express mode input (TF-FR21)
   **And** the spec file includes per-decision rationale with `default_accepted` flags
   **And** the spec file is written atomically — `.tmp` → validate → rename

3. **Given** the factory is interrupted mid-flow
   **When** the contributor returns later
   **Then** they can resume by loading the team spec file — resume presents the decision summary and continues from the last step whose output is absent (TF-NFR9)

## Tasks / Subtasks

- [x] Task 1: Create step-03-review.md with Decision Summary (AC: #1)
  - [x] 1.1 Create `.claude/skills/bmad-team-factory/step-03-review.md` following the step-file structure: PURPOSE, RULES, content sections, STEP VALIDATION, Visibility Checklist, CHECKPOINT, NEXT.
  - [x] 1.2 Add `## PURPOSE` — Step 3 gathers all decisions from Steps 0–2 and presents a comprehensive decision summary for the contributor to review and approve before generation begins. Dual profile: Guided mode presents LLM-formatted summary; Express mode will run full validation gate (Express validation is deferred to later stories — this story covers Guided mode only).
  - [x] 1.3 Add `## RULES` — communicate in `{communication_language}`, present at most 3 new concepts in visibility checklist (TF-NFR2), do NOT generate any artifact files (generation is Step 4), do NOT create JS modules (those are Stories 2.6–2.9), spec file YAML output only.
  - [x] 1.4 Add `## PART 1: COLLECT DECISIONS` — Load all decision context from conversation (Steps 0–2). List all context variables that must be present: from Step 1 (`composition_pattern`, `contracts_required`, `compass_routing_required`, `orchestration_required`, `validation_check_count`, `default_accepted`, `override_rationale`, `agents` array, `agent_count`, `pipeline_sequence`) and from Step 2 (`contracts` array, `contract_count`, `contract_prefix`, `output_directory`, `compass_routing_decision`, `feedback_contracts`). If any required variable is missing, flag and halt — do not proceed with incomplete decisions.
  - [x] 1.5 Add `## PART 2: DECISION SUMMARY PRESENTATION` — Present all decisions in a structured, scannable format. Organized by step: (A) Composition Pattern section showing pattern, defaults accepted/overridden, rationale; (B) Agent Inventory section showing agent table (id, role, capabilities, pipeline position), overlap acknowledgments; (C) Contract Design section showing contract table (id, flow, artifact, file name), feedback contracts if any, chain coverage status; (D) Integration Decisions section showing output directory, compass routing decision. Include a diff-style highlight for any non-default decisions (overrides).

- [x] Task 2: Implement Approval Flow (AC: #1)
  - [x] 2.1 After presenting the summary, ask for explicit approval: "Does everything look right? You can: (a) Approve and proceed to spec file persistence, (b) Change specific decisions — tell me which section to revisit, (c) Start over from Step 1."
  - [x] 2.2 If the contributor wants changes: identify which step's decisions need revision. For Step 1 changes (pattern, agents), note that this invalidates Step 2 decisions (contracts depend on agents). For Step 2 changes (contracts, integration), allow in-place edits without invalidating Step 1.
  - [x] 2.3 If approved, proceed to PART 3 (Spec File Persistence).

- [x] Task 3: Implement Spec File Persistence (AC: #2)
  - [x] 3.1 Add `## PART 3: SPEC FILE PERSISTENCE` — Define the spec file format. The spec file is YAML written to `{output_directory}/{team-name}-team-spec.yaml`. Include schema version, metadata, and all decisions structured per D-S2 architecture.
  - [x] 3.2 Define the spec file structure with these top-level sections:
    ```yaml
    schema_version: "1.0"
    team_name: {team_name}
    composition_pattern: {Sequential|Independent}
    created: {ISO date}
    factory_version: "1.0"

    decisions:
      - step: scope
        decision: "{pattern} — {agent_count} agents{pipeline description}"
        default_accepted: {boolean}
        rationale: "{override_rationale or 'Default accepted'}"
      # ... one entry per key decision

    agents:
      - id: {agent_id}
        role: "{role description}"
        capabilities: [...]
        pipeline_position: {N}  # Sequential only
        overlap_acknowledgments: [...]

    contracts:
      - id: "{PREFIX}{N}"
        source_agent: {agent_id}
        target_agents: [{agent_ids}]
        artifact_title: "{title}"
        artifact_description: "{description}"
        key_sections: [...]
        file_name: "{file_name}"
        input_artifacts: [...]
        optional: {boolean}

    feedback_contracts: [...]  # empty array if none

    integration:
      output_directory: "{path}"
      compass_routing: "{required|per-agent|shared-reference}"
      contract_prefix: "{PREFIX}"

    progress:
      route: complete
      scope: complete
      connect: complete
      review: complete
      generate: pending
      validate: pending
    ```
  - [x] 3.3 Implement atomic write instruction: write to `{file_name}.tmp` first, validate the YAML parses correctly, then rename `.tmp` to final file name. If validation fails, keep `.tmp` for debugging and flag error.
  - [x] 3.4 After successful write, confirm to the contributor: show file path, file size summary, and note that this spec file can be used for resume and express mode.

- [x] Task 4: Implement Resume Detection (AC: #3)
  - [x] 4.1 Add `## PART 4: RESUME DETECTION` — At the start of Step 3, before collecting decisions from conversation context, check if a spec file already exists at the expected path. If it exists, offer: "(a) Resume from spec file — I'll load your previous decisions and continue from where you left off, (b) Start fresh — ignore existing spec file and use current conversation decisions."
  - [x] 4.2 If resuming: load the spec file, parse the `progress` section, identify the last completed step, present the decision summary from spec file data, and continue from the first step marked `pending`.
  - [x] 4.3 If the spec file has `review: complete` but `generate: pending`, skip the summary and proceed directly to Step 4 (Generate).

- [x] Task 5: Add Visibility Checklist, STEP VALIDATION, CHECKPOINT, NEXT (AC: #1, #2, #3)
  - [x] 5.1 Add `## STEP VALIDATION` — Validate before CHECKPOINT:
    | Check | Status | Details |
    |-------|--------|---------|
    | All decision variables present | [PASS/FAIL] | {count} variables loaded |
    | Decision summary presented | [PASS/FAIL] | Contributor reviewed all sections |
    | Contributor approval received | [PASS/FAIL] | Explicit approval |
    | Spec file written | [PASS/FAIL] | `{spec_file_path}` |
    | Spec file validates | [PASS/FAIL] | YAML parses, all required fields present |
  - [x] 5.2 Add `## Visibility Checklist — Step 3` per D-VB:
    Colleague sees:
      - [x] Complete decision summary organized by step
      - [x] Approval prompt with change/proceed options
      - [x] Spec file write confirmation with file path
    Runs silently:
      - [x] Context variable collection from Steps 0–2
      - [x] Atomic write safety (.tmp → validate → rename)
    Concept count: 3/3
    Approval prompt: "Approve your decisions and persist as spec file."
  - [x] 5.3 Add `## CHECKPOINT` — Summary confirmation showing spec file path, progress state, and next step.
  - [x] 5.4 Add `## NEXT` — "Proceed to Step 4: Generate (BMB delegation and artifact generation)." With fallback: "Step 4 is being implemented in Story 2.6 and is not yet available. Your decisions have been persisted as a spec file. Point to the Architecture Reference for manual guidance."
  - [x] 5.5 Record spec file context for downstream steps: `spec_file_path`, `spec_file_written` (boolean), `resume_point` (step name).

- [x] Task 6: Update workflow.md (AC: all)
  - [x] 6.1 Update status line from "Steps 0–2 available" to "Steps 0–3 available" and update "Stories 2.5–2.9" to "Stories 2.6–2.9".
  - [x] 6.2 Add Step 3 routing: "If returning from step-02-connect.md (Step 2 confirmed), read fully and follow: `./step-03-review.md` to proceed to Step 3 (Review)."
  - [x] 6.3 Update the fallback note to reference Stories 2.6–2.9.

- [x] Task 7: Update step-02-connect.md NEXT section (AC: all)
  - [x] 7.1 Remove the "not yet available" fallback from step-02-connect.md's NEXT section. Replace with clean handoff: "Proceed to Step 3: Review (decision summary and spec file persistence)." No fallback needed — Step 3 is now available.

- [x] Task 8: Verification (AC: #1, #2, #3)
  - [x] 8.1 Verify step-03-review.md follows step-file structure: PURPOSE, RULES, content sections, STEP VALIDATION, Visibility Checklist, CHECKPOINT, NEXT.
  - [x] 8.2 Verify decision summary covers all context variables from Steps 1 and 2.
  - [x] 8.3 Verify spec file structure matches D-S2 architecture (schema_version, decisions with default_accepted, progress tracking, atomic write).
  - [x] 8.4 Verify resume detection checks for existing spec file before collecting decisions.
  - [x] 8.5 Verify concept count ≤ 3 in visibility checklist.
  - [x] 8.6 Verify NEXT section points to Step 4 with appropriate fallback.
  - [x] 8.7 Verify workflow.md status and routing are updated.
  - [x] 8.8 Verify step-02-connect.md NEXT fallback is removed.

## Dev Notes

### Story 2.5 creates Step 3 (Review) — new step file

This story creates `step-03-review.md`, the third new step file in the factory workflow. It follows the same step-file architecture pattern established by step-00-route.md, step-01-scope.md, and step-02-connect.md.

### Architecture Decisions

1. **No JS modules in this story**: The architecture defines `spec-parser.js`, `spec-writer.js`, `spec-differ.js` (D-S2). Those JS modules are for Stories 2.6–2.9. This story creates LLM-side instructions only — the LLM writes the YAML spec file directly.
2. **Guided mode only**: Step 3 has a dual profile (Guided = LLM summary, Express = full validation gate). This story implements Guided mode only. Express mode validation is deferred to later stories when JS modules exist.
3. **Spec file is LLM-written YAML**: The LLM can write YAML directly. No JS serialization needed for Guided mode. The atomic write pattern (.tmp → validate parse → rename) is instructed as LLM behavior.
4. **NFR2 — ≤3 concepts for Step 3**: The 3 concepts are: (1) decision summary organized by step, (2) approval with change options, (3) spec file write confirmation.
5. **Resume detection is LLM-driven**: The LLM checks if a spec file exists, reads it if so, and offers resume. No JS module needed for this — it's file existence check + YAML parse, both within LLM capability.
6. **Decision invalidation cascade**: Changing Step 1 decisions (pattern, agents) invalidates Step 2 (contracts). The step file must instruct the LLM to warn about this. Changing Step 2 only does not invalidate Step 1.
7. **Spec file location**: Written to `{output_directory}/{team-name}-team-spec.yaml`. The `output_directory` comes from Step 2 context (e.g., `_bmad-output/{team-name}-artifacts/`). The team name is derived from the contributor's team naming in Step 1.
8. **Per-decision rationale**: Each entry in the `decisions` array includes `default_accepted` (boolean) and `rationale` (string). This supports the self-instrumentation described in the architecture (concern #9) — default override rates reveal bad defaults.
9. **Progress tracking is step-level**: For this story, progress tracks at step granularity (route/scope/connect/review/generate/validate). Per-agent progress within `generate` is deferred to Story 2.6.

### Spec File Structure Reference (D-S2)

From architecture-team-factory.md (lines 393–434):
- **Schema approach**: Per-pattern JSON Schema files (`team-spec-v1-independent.schema.json`, `team-spec-v1-sequential.schema.json`). Parser reads `composition_pattern`, selects matching schema. For this story, the LLM writes the YAML directly — schema validation comes in later stories.
- **Rationale as structured data**: Each decision includes `step`, `decision`, `default_accepted`, `rationale`.
- **Progress tracking**: Step-level with per-agent breakdown for `generate`. Only write `complete` after full cycle.
- **Write safety**: Atomic — `.tmp` → validate parse + schema → rename.
- **Express Mode template**: `templates/team-spec-template.yaml` — deferred to later stories.

### Context Variables Consumed by Step 3

**From Step 1 (Scope):**
- `composition_pattern`: "Sequential" or "Independent"
- `contracts_required`: boolean
- `compass_routing_required`: boolean
- `orchestration_required`: boolean (always false for now)
- `validation_check_count`: number
- `default_accepted`: boolean (whether default cascade was accepted)
- `override_rationale`: string or null
- `agents`: array of `{id, role, capabilities, pipeline_position, overlap_acknowledgments}`
- `agent_count`: number
- `pipeline_sequence`: ordered array of agent IDs (Sequential only)

**From Step 2 (Connect):**
- `contracts`: array of `{id, source_agent, target_agents, artifact_title, artifact_description, key_sections, file_name, input_artifacts, optional}`
- `contract_count`: number
- `contract_prefix`: string (e.g., "TC")
- `output_directory`: string (e.g., `_bmad-output/team-name-artifacts/`)
- `compass_routing_decision`: "required", "per-agent", or "shared-reference"
- `feedback_contracts`: array (empty if none)

### File Locations and Patterns

**Files to CREATE:**
- `.claude/skills/bmad-team-factory/step-03-review.md` — decision summary + spec file persistence

**Files to MODIFY:**
- `.claude/skills/bmad-team-factory/workflow.md` — update status line and routing
- `.claude/skills/bmad-team-factory/step-02-connect.md` — remove NEXT fallback note

**Reference files (read, do NOT modify):**
- `_bmad-output/planning-artifacts/architecture-team-factory.md` — D-S2 spec file architecture (lines 393–434), Step 3 dual profile (lines 382–391), LLM/JS boundary (line 766), FR19, FR21
- `_bmad-output/planning-artifacts/architecture-reference-teams.md` — YAML conventions
- `.claude/skills/bmad-team-factory/step-02-connect.md` — Step 2 context variables (Record Contract Design Decisions section), NEXT section to update
- `.claude/skills/bmad-team-factory/step-01-scope.md` — Step 1 context variables for reference

### What NOT to Do

- **Do NOT create JS modules** (`spec-parser.js`, `spec-writer.js`, `spec-differ.js`) — those are for Stories 2.6–2.9. This story creates LLM-side instructions only.
- **Do NOT create JSON Schema files** (`schema-independent.json`, `schema-sequential.json`) — those are for Stories 2.8.
- **Do NOT create Express Mode template** (`team-spec-template.yaml`) — deferred to later stories.
- **Do NOT implement Express Mode validation** — Step 3's Express path (full validation gate) requires JS modules that don't exist yet. This story implements Guided mode only.
- **Do NOT generate artifact files** (agent definitions, workflows, contracts) — that's Step 4 (Story 2.6).
- **Do NOT modify step-01-scope.md** — Step 1 is complete and unchanged.
- **Do NOT exceed 3 concepts** in the visibility checklist.
- **Do NOT hardcode team names or agent lists** — use context variables from previous steps.
- **Do NOT modify existing team files** (Vortex, Gyre, Enhance) — additive only.

### Previous Story Intelligence

From Story 2.4 (Contract Design Step & Validation):
- step-02-connect.md created as new step file with pattern-aware branching (Sequential vs Independent). Step 3 should follow same structural pattern.
- NEXT section in step-02-connect.md has fallback: "Step 3 is being implemented in Story 2.5 and is not yet available." — must be replaced.
- Context variables from Step 2 are documented in "Record Contract Design Decisions" section (lines 301–319).
- Code review applied 7 patches: prefix validation with regex + collision check, kebab-case conversion algorithm, template variable consistency, optional field defaults, feedback contract exclusion from chain coverage, target agent cross-reference. Step 3 should anticipate similar review thoroughness.
- Communication in `{communication_language}` is mandatory.
- Visibility Checklist at 3/3 concept budget is per-step.

From Story 2.3 (Agent Scope Definition & Overlap Detection):
- Step 1 context variables fully documented: `composition_pattern`, `contracts_required`, `compass_routing_required`, `orchestration_required`, `validation_check_count`, `default_accepted`, `override_rationale`, `agents` array, `agent_count`, `pipeline_sequence`.

From Story 2.2 (Composition Pattern Selection & Decision Cascade):
- Step-file structure: PURPOSE, RULES, content sections, CHECKPOINT, NEXT.
- Code review has 75% hit rate — keep for this story.

From Story 2.1 (Factory Discoverability & Entry Points):
- Config loaded from `{project-root}/_bmad/bmm/config.yaml`.

### Known Considerations

- **Team name is not explicitly collected**: Steps 0–2 don't have a dedicated "team name" prompt. The team name may need to be derived from the output_directory or asked explicitly in Step 3 before writing the spec file. Check if Step 1 or Step 0 captures a team name — if not, Step 3 should ask for it.
- **Spec file directory may not exist**: The `output_directory` from Step 2 may not exist yet. Step 3 should create the directory if needed before writing the spec file.
- **YAML indentation**: Architecture specifies 2-space indent as BMAD standard (line 586 of architecture-team-factory.md).
- **All `.claude/` files are gitignored**: The step files won't show in `git diff` — use `git diff --no-index /dev/null` approach for diff construction during code review.
- **No pure Independent team exists yet**: When showing examples in the decision summary for Independent teams, note this gap (same caveat as previous stories).

### Project Structure Notes

- Team Factory skill: `.claude/skills/bmad-team-factory/`
- Architecture Reference: `_bmad-output/planning-artifacts/architecture-reference-teams.md`
- Architecture doc: `_bmad-output/planning-artifacts/architecture-team-factory.md`
- Epic file: `_bmad-output/planning-artifacts/epic-team-factory.md`

### References

- [Source: _bmad-output/planning-artifacts/epic-team-factory.md — Story 2.5 ACs (lines 362–384), FR19, FR21, NFR9]
- [Source: _bmad-output/planning-artifacts/architecture-team-factory.md — D-S2 spec file architecture (lines 393–434), Step 3 dual profile (lines 382–391), LLM/JS boundary (line 766), D-VB visibility (lines 468–472, 883–895), self-instrumentation (line 141), YAML conventions (line 586)]
- [Source: _bmad-output/implementation-artifacts/tf-2-4-contract-design-step-validation.md — Step 2 context variables, step-file pattern, NEXT fallback, code review patches]
- [Source: _bmad-output/implementation-artifacts/tf-2-3-agent-scope-definition-overlap-detection.md — Step 1 context variables, step-file structure]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

N/A

### Completion Notes List

All 30 subtasks across 8 tasks completed. Created step-03-review.md implementing the full Step 3 (Review) workflow with: PART 1 (Resume Detection — checks for existing spec file, offers resume/fresh-start choice, handles progress-based routing), PART 2 (Collect Decisions — enumerates all required context variables from Steps 0–2, includes missing variable halt, team name collection), PART 3 (Decision Summary Presentation — structured sections A–E covering team identity, agent inventory, contract design, integration decisions, non-default highlights), approval flow with decision invalidation cascade warning (Step 1 changes invalidate Step 2), PART 4 (Spec File Persistence — YAML format per D-S2 architecture with schema_version, decisions with default_accepted/rationale, agents, contracts, feedback_contracts, integration, progress tracking, atomic write .tmp → validate → rename), STEP VALIDATION with 5 checks, D-VB visibility checklist at 3/3 concept budget, CHECKPOINT with progress state, and NEXT pointing to Step 4 with fallback. Updated workflow.md status line and routing. Removed step-02-connect.md NEXT fallback.

### Change Log

| Change | File | Description |
|--------|------|-------------|
| CREATE | `.claude/skills/bmad-team-factory/step-03-review.md` | Step 3 (Review) — decision summary, approval flow, spec file persistence, resume detection, per-step validation, visibility checklist |
| MODIFY | `.claude/skills/bmad-team-factory/workflow.md` | Updated status line to "Steps 0–3 available", added Step 3 routing, updated fallback note to reference Stories 2.6–2.9 |
| MODIFY | `.claude/skills/bmad-team-factory/step-02-connect.md` | Removed NEXT fallback note — clean handoff to Step 3 |

### File List

- `.claude/skills/bmad-team-factory/step-03-review.md` (created)
- `.claude/skills/bmad-team-factory/workflow.md` (modified)
- `.claude/skills/bmad-team-factory/step-02-connect.md` (modified)
