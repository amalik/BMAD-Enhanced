# Step 03: Review — Decision Summary & Approval

## Purpose
Present all decisions for contributor approval before generation begins. In Express Mode, this step is the full validation gate — all per-step and semantic checks run in batch.

## Prerequisites
- Step 02 (Connect) completed — all decisions made
- Spec file has progress.connect = "complete"

## Execution Sequence

### 1. Load Spec

Read the complete spec file. This is the ground truth for all decisions.

### 2. Decision Summary

Present a structured summary of all decisions made:

```
═══════════════════════════════════════════════════
  TEAM FACTORY — Decision Summary
═══════════════════════════════════════════════════

  Team:        {team_name} (_{team_name_kebab})
  Pattern:     {composition_pattern}
  Module:      _bmad/bme/_{team_name_kebab}/

  AGENTS ({count}):
  ┌─────┬──────────────────────┬──────┬─────────────────────────┐
  │ Pos │ ID                   │ Icon │ Role                    │
  ├─────┼──────────────────────┼──────┼─────────────────────────┤
  │  1  │ {agent_id}           │ {ic} │ {role}                  │
  └─────┴──────────────────────┴──────┴─────────────────────────┘

  CONTRACTS ({count}):            [Sequential only]
  {prefix}{N}: {source} → {target} — "{artifact_title}"

  FEEDBACK CONTRACTS ({count}):   [Sequential only]
  {prefix}{N}: {source} → {target} — "{artifact_title}"

  INTEGRATION:
  Output:     {output_directory}
  Routing:    {compass_routing}
  Prefix:     {contract_prefix}            [Sequential only]

  OVERLAP ACKNOWLEDGMENTS ({count}):
  {agent_id} ↔ {existing_id}: acknowledged

═══════════════════════════════════════════════════
```

### 3. Validation Gate (All Modes)

Run all per-step validations in batch against the spec file:

**Naming validation:**
- team_name_kebab matches `/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/`
- All agent IDs match `/^[a-z]+(-[a-z]+)*$/`

**Pattern validation:**
- Composition pattern is "Independent" or "Sequential"
- Sequential teams have contracts and contract_prefix
- Independent teams have no contracts

**Semantic validation (B-lite):**
- All contract source_agents exist in agents list
- All contract target_agents exist in agents list
- No duplicate contract IDs
- Pipeline positions are sequential (Sequential only)

**Collision re-check:**
- Run collision detector again (working tree may have changed since Step 01)

Display validation results:
- "✅ All {N} checks passed" or
- "❌ {N} issues found:" followed by each issue with explanation

### 4. Contributor Approval

Ask explicitly:
> "All decisions above will be used to generate your team. Would you like to:
> 1. **Approve** — proceed to generation
> 2. **Edit** — go back and change specific decisions
> 3. **Save & Exit** — save the spec file and resume later"

**If Edit:** Ask which section to change, update the spec file, re-display summary.
**If Save & Exit:** Ensure progress.review = "pending" (so re-entry returns here), display spec file path.
**If Approve:** Set progress.review = "complete", proceed.

### 5. Express Mode Behavior

In Express Mode (spec file loaded directly):
- Skip to this step with all decisions pre-loaded
- Run the full validation gate
- If all checks pass: display summary, ask for approval
- If checks fail: display errors, ask contributor to fix the spec file and re-run

### 6. Save Progress

Update spec file: progress.review = "complete"

Proceed to: `{project-root}/_bmad/bme/_team-factory/workflows/add-team/step-04-generate.md`

## Visibility Checklist — Step 3
Colleague sees:
  - [ ] Complete decision summary table
  - [ ] Validation results (pass/fail)
  - [ ] Approve/Edit/Save choice
Runs silently:
  - [ ] Naming validation batch
  - [ ] Pattern validation
  - [ ] Semantic validation (B-lite)
  - [ ] Collision re-check
Concept count: 1/3 (decision review — everything else is summary of prior decisions)
Approval prompt: "Approve these decisions and proceed to file generation?"
