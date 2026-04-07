# Story 6.5: Portfolio Skill Wrapper

Status: ready-for-dev

## Story

As a Convoke operator,
I want to view the portfolio through a guided skill conversation,
So that I get contextual explanations and can interactively explore my initiatives instead of just dumping a static table.

## Acceptance Criteria

1. **Given** the existing skill at `.claude/skills/bmad-portfolio-status/` (currently a 5-line thin wrapper) **When** the upgrade is complete **Then** it has full BMAD workflow skill anatomy: `SKILL.md` (frontmatter only), `workflow.md` (orchestration), and `steps/` directory with 3 step files. The source-of-truth lives at `_bmad/bmm/4-implementation/bmad-portfolio-status/`.

2. **Given** the operator invokes the skill via slash command or fuzzy match (e.g. "show portfolio", "portfolio status") **When** Step 1 (Scan & Present) executes **Then** the agent shells out to `node scripts/lib/portfolio/portfolio-engine.js --markdown`, captures the markdown table, and presents it to the operator with two leading sentences explaining what the table shows (initiative, phase, status, next action).

3. **Given** Step 1 produced output **When** the agent renders it **Then** it includes ALL of: the initiative table, the WIP radar line (if present), the governance health score, the `attributableButUngoverned` line (if present), and the `unattributed files` summary line. Story 6.3 added the last three — the skill MUST surface them.

4. **Given** Step 1 completes **When** Step 2 (Explain & Explore) executes **Then** the agent presents a numbered menu of exploration options and HALTs:
   - `[1]` Explain a specific initiative's status (the agent then runs the engine with `--verbose` and presents the inference trace for the chosen initiative)
   - `[2]` Filter to a single initiative prefix (re-runs with `--filter`)
   - `[3]` Sort by last-activity instead of alpha (re-runs with `--sort last-activity`)
   - `[4]` Show details for each unattributed file (re-runs with `--show-unattributed`)
   - `[5]` Done — exit the workflow

5. **Given** the operator picks an option in Step 2 **When** the agent re-invokes the engine **Then** the agent presents the new output and **loops back to the menu** so the operator can chain multiple explorations. The loop only exits on `[5] Done` or an explicit exit phrase.

6. **Given** Step 2 ends (operator picks Done) **When** Step 3 (Recommend) executes **Then** the agent presents 1–3 actionable recommendations based on the portfolio state:
   - If WIP radar triggered → recommend retiring the oldest stale initiative
   - If governance health < 50% → recommend running `bmad-migrate-artifacts`
   - If `attributableButUngoverned > 0` → recommend running migration to govern the fallback-attributed files
   - If any initiative shows `Unknown phase: ...` → suggest reviewing those initiatives
   - If everything is healthy → confirm "Portfolio looks healthy. No action needed."

7. **Given** the engine fails (non-zero exit, missing taxonomy.yaml, etc.) **When** the error surfaces **Then** the agent presents the raw error to the operator and exits gracefully. The portfolio engine already produces clear errors (e.g. "taxonomy.yaml not found — run convoke-migrate-artifacts or convoke-update to create"); the skill should NOT swallow them.

8. **Given** the new skill needs to be discoverable **When** registration is complete **Then** the existing entry in `_bmad/_config/skill-manifest.csv` for `bmad-portfolio-status` is **updated** to point at the new source path `_bmad/bmm/4-implementation/bmad-portfolio-status/SKILL.md` (currently the manifest may not have an entry; if not, add one with `module: bmm` and `install_to_bmad: "true"`).

9. **Given** the implementation is complete **When** `npm run check` runs **Then** all 5 stages pass (Lint, Unit, Integration, Jest lib, Coverage). No new tests are required for the skill itself (markdown only).

10. **Given** the workflow ends **When** the agent prints its final message **Then** it includes a one-line reminder: "Run `bmad-portfolio-status` anytime to refresh this view."

## Tasks / Subtasks

- [ ] **Task 1: Create skill source directory** (AC: #1)
  - [ ] 1.1 Create `_bmad/bmm/4-implementation/bmad-portfolio-status/` (the source-of-truth location).
  - [ ] 1.2 Create `_bmad/bmm/4-implementation/bmad-portfolio-status/SKILL.md` (see **SKILL.md Template** in Dev Notes).
  - [ ] 1.3 Create `_bmad/bmm/4-implementation/bmad-portfolio-status/workflow.md` (see **workflow.md Template**).
  - [ ] 1.4 Create `_bmad/bmm/4-implementation/bmad-portfolio-status/steps/` directory.
  - [ ] 1.5 Create the three step files: `step-01-scan.md`, `step-02-explore.md`, `step-03-recommend.md`.
  - [ ] 1.6 The existing `.claude/skills/bmad-portfolio-status/workflow.md` will be replaced by Story 6.6's refresh-installation logic when it copies the new source files. **Do NOT delete the existing `.claude/skills/` file in this story** — Story 6.6 owns the cleanup.

- [ ] **Task 2: Author Step 1 — Scan & Present** (AC: #2, #3, #7)
  - [ ] 2.1 Step file structure: same anatomy as Story 6.4 (H1, Progress, STEP GOAL, MANDATORY EXECUTION RULES, EXECUTION PROTOCOLS, CONTEXT BOUNDARIES, Sequence of Instructions).
  - [ ] 2.2 Instructions: shell out to `node scripts/lib/portfolio/portfolio-engine.js --markdown`, capture stdout. Present the output to the operator with a 2-sentence intro explaining the table columns.
  - [ ] 2.3 If the engine exits non-zero, present the stderr to the operator and exit the workflow gracefully (do NOT proceed to Step 2).
  - [ ] 2.4 The output already contains all the lines required by AC #3 (Story 6.3 added them) — the skill just needs to forward them. Do NOT filter or reformat — the operator should see the exact engine output.
  - [ ] 2.5 At the end of Step 1, transition to Step 2 automatically (no HALT here — the menu is in Step 2).

- [ ] **Task 3: Author Step 2 — Explore Loop** (AC: #4, #5)
  - [ ] 3.1 Instructions: present a numbered menu of 5 options (see AC #4 for the exact list). HALT for input.
  - [ ] 3.2 On `[1]` (explain initiative): ask the operator for the initiative ID, then shell out to `node scripts/lib/portfolio/portfolio-engine.js --markdown --verbose` and present the verbose trace filtered to that initiative. Loop back to the menu.
  - [ ] 3.3 On `[2]` (filter by prefix): ask the operator for the prefix, shell out with `--filter <prefix>`, present, loop back.
  - [ ] 3.4 On `[3]` (sort by last-activity): shell out with `--sort last-activity`, present, loop back.
  - [ ] 3.5 On `[4]` (show unattributed): shell out with `--show-unattributed`, present, loop back. Note: this flag was added in Story 6.3 — the engine prints a `--- Unattributed Files ---` block followed by per-file lines.
  - [ ] 3.6 On `[5]` or any exit phrase ("done", "exit", "quit"): proceed to Step 3.
  - [ ] 3.7 The loop is **explicit, not bounded**. Operators can chain as many explorations as they want. Document this in the step instructions.

- [ ] **Task 4: Author Step 3 — Recommend** (AC: #6, #10)
  - [ ] 4.1 Instructions: re-read the Step 1 output from working memory (the original scan, not any of the filtered re-runs). Apply the recommendation rules from AC #6 in order:
    - WIP radar present → "Consider retiring the oldest stale initiative ({name}). WIP threshold is X."
    - Governance health < 50% → "Run `bmad-migrate-artifacts` to govern your artifacts and improve health from {current}% to ~100%."
    - `attributableButUngoverned > 0` → "{count} files are attributable but ungoverned. Run `bmad-migrate-artifacts` to govern them."
    - Any initiative with `Unknown phase: ...` → list those initiatives and suggest reviewing them.
    - All clear → "Portfolio looks healthy. No action needed."
  - [ ] 4.2 Present 1–3 recommendations max (rank by impact: WIP radar > governance < 50% > attributable-but-ungoverned > unknown phase).
  - [ ] 4.3 End with the AC #10 reminder line.
  - [ ] 4.4 The recommendation engine is **simple string matching** on the Step 1 output, not a separate analysis. The output already contains all the signals (WIP radar text, "Governance: X%", "X files attributable...", "Unknown phase: ..." rows).

- [ ] **Task 5: Workflow.md orchestration** (AC: #1)
  - [ ] 5.1 Write `workflow.md` per the **workflow.md Template** in Dev Notes.
  - [ ] 5.2 No `outputFile:` frontmatter (this skill produces no artifact, same as Story 6.4).
  - [ ] 5.3 Include WORKFLOW ARCHITECTURE and INITIALIZATION SEQUENCE sections, ending with "Read fully and follow `./steps/step-01-scan.md` to begin".

- [ ] **Task 6: Manifest registration** (AC: #8)
  - [ ] 6.1 Open `_bmad/_config/skill-manifest.csv` and check for an existing `bmad-portfolio-status` row.
  - [ ] 6.2 If a row exists: update its `path` column to `_bmad/bmm/4-implementation/bmad-portfolio-status/SKILL.md`.
  - [ ] 6.3 If no row exists: add this new row at the end of the file:
    ```csv
    "bmad-portfolio-status","bmad-portfolio-status","Show a portfolio view of all initiatives with phase, status, and next actions. Use when the user says ""show portfolio"" or ""portfolio status""","bmm","_bmad/bmm/4-implementation/bmad-portfolio-status/SKILL.md","true"
    ```
  - [ ] 6.4 Verify the row parses cleanly and has 6 columns.

- [ ] **Task 7: Verification** (AC: #9)
  - [ ] 7.1 Verify all source files exist at `_bmad/bmm/4-implementation/bmad-portfolio-status/`.
  - [ ] 7.2 Run `npm run check` and confirm all 5 stages pass.
  - [ ] 7.3 Manually invoke the new skill in a fresh Claude Code session and walk through the 3-step flow (scan, explore at least 2 menu options, get recommendations). Confirm the conversational UX is materially better than the existing 5-line thin wrapper.

## Dev Notes

### Context

The current `bmad-portfolio-status` skill is a 5-line workflow.md that just shells out to `convoke-portfolio --markdown` and dumps the output. Story 6.5 replaces this with a proper guided experience: the operator gets context about what they're seeing, can drill into specific initiatives, can re-run with different filters, and gets actionable recommendations at the end.

**Story 6.3 already populated the engine with rich output**: governance health, WIP radar, evidence-based unknown phases, attributable-but-ungoverned guidance, unattributed-files summary. Story 6.5 surfaces all of these conversationally instead of expecting the operator to parse them from a static dump.

### Critical Architectural Decisions

**Decision 1: Same shell-out pattern as Story 6.4.**
The skill calls `node scripts/lib/portfolio/portfolio-engine.js` rather than `require()`-ing it. Same reasoning as 6.4 — the CLI absorbs engine API changes, the skill stays as pure markdown. The portfolio engine's CLI is well-defined: `--markdown`, `--verbose`, `--filter <prefix>`, `--sort <mode>`, `--show-unattributed`.

**Decision 2: No output artifact, no template.**
Same as Story 6.4. The skill is a viewer + recommender, not a builder.

**Decision 3: Explore loop is conversational, not bounded.**
The operator can chain explorations as many times as they want. This is a deliberate UX choice — portfolio review is exploratory, not linear. Step 2 only exits when the operator picks `[5] Done`.

**Decision 4: Recommendations are based on the ORIGINAL Step 1 output, not the filtered re-runs.**
If the operator filters to one initiative in Step 2, that filtered view shouldn't drive the final recommendations — the recommendations should reflect the full portfolio state. The agent must remember the Step 1 output across the loop.

**Decision 5: Replace, don't extend.**
The existing `.claude/skills/bmad-portfolio-status/workflow.md` (5 lines) is the wrong shape for what we need. The new source at `_bmad/bmm/4-implementation/bmad-portfolio-status/` is a clean rewrite. Story 6.6 will handle the cleanup of the old file via `refresh-installation.js`.

### Engine Output Reference

The portfolio engine's `--markdown` output contains (in order):
1. The markdown table: `| Initiative | Phase | Status | Next Action / Context |`
2. (If WIP radar triggered) `\nWIP: X active (threshold: Y) -- sorted by last activity\n  initiative1, initiative2, ...`
3. `\nTotal: N artifacts | Governed: G | Ungoverned: U | Unattributed: X`
4. `Governance: G/T artifacts governed (P%)`
5. (Story 6.3) `N files attributable to existing initiatives but ungoverned — run convoke-migrate-artifacts to govern them` (only if N > 0)
6. (Story 6.3) `\nN unattributed files (run with --show-unattributed to see details)` (only if N > 0)
7. (If `--show-unattributed`) `\n--- Unattributed Files (N) ---\n  dir/file.md: reason\n  ...`
8. (If `--verbose`) `\n--- Inference Trace ---\n  [initiative] phase: ... | status: ...`

The skill's parser only needs to recognize these patterns to drive the recommendations in Step 3.

### SKILL.md Template

Create `_bmad/bmm/4-implementation/bmad-portfolio-status/SKILL.md` with this exact content:

```markdown
---
name: bmad-portfolio-status
description: Show a portfolio view of all initiatives with phase, status, and next actions. Use when the user says "show portfolio" or "portfolio status".
---

Follow the instructions in ./workflow.md.
```

### workflow.md Template

Same structural pattern as Story 6.4. Reference `_bmad/bmm/3-solutioning/bmad-create-epics-and-stories/workflow.md` for the WORKFLOW ARCHITECTURE and INITIALIZATION SEQUENCE sections.

Frontmatter (no `outputFile:`):
```yaml
---
main_config: '{project-root}/_bmad/bmm/config.yaml'
---
```

### Step File Anatomy Reference

Same as Story 6.4 — see that story's "Step File Anatomy Reference" section. Each step file MUST have the standard sections (H1, Progress, STEP GOAL, MANDATORY EXECUTION RULES, EXECUTION PROTOCOLS, CONTEXT BOUNDARIES, Sequence of Instructions) plus a routing instruction at the end.

### Files to Touch

| File | Action | Purpose |
|------|--------|---------|
| `_bmad/bmm/4-implementation/bmad-portfolio-status/SKILL.md` | Create | Skill entry point |
| `_bmad/bmm/4-implementation/bmad-portfolio-status/workflow.md` | Create | Workflow orchestration |
| `_bmad/bmm/4-implementation/bmad-portfolio-status/steps/step-01-scan.md` | Create | Scan & present |
| `_bmad/bmm/4-implementation/bmad-portfolio-status/steps/step-02-explore.md` | Create | Explore loop |
| `_bmad/bmm/4-implementation/bmad-portfolio-status/steps/step-03-recommend.md` | Create | Recommendations |
| [_bmad/_config/skill-manifest.csv](_bmad/_config/skill-manifest.csv) | Edit | Add or update bmad-portfolio-status row |

**Do NOT modify:**
- `scripts/lib/portfolio/portfolio-engine.js` — engine stays untouched
- Any test files
- `.claude/skills/bmad-portfolio-status/workflow.md` — Story 6.6 will replace it via refresh-installation
- `refresh-installation.js` or `validator.js` — Story 6.6 owns those changes

### Architecture Compliance

- ✅ No hardcoded version strings
- ✅ No `process.cwd()`
- ✅ Append-only — new files only, one CSV row updated/added
- ✅ `_bmad/` paths preserved
- ✅ Skill is markdown — no test debt introduced
- ✅ Engine API unchanged
- ✅ Follows the 3-step pattern (lighter than 6.4's 4 steps because portfolio is read-only)

### Previous Story Intelligence

- **Story 6.3** populated the engine output with everything this skill needs. Verify the exact output format by running `node scripts/lib/portfolio/portfolio-engine.js --markdown` and inspecting the result before writing the parser logic in Step 3.
- **Story 6.4** is the sibling skill for migration. Both should feel consistent — same step file anatomy, same routing pattern, same error handling. Look at 6.4 for reference but DO NOT copy step content; the workflows are different.

### Testing Standards

Same as Story 6.4 — markdown-only skill, no JS to unit-test. Verification is via `npm run check` (no regression) and manual invocation.

### Risk Notes

1. **Engine output drift** — same as 6.4. Recommendation parser uses substring matching, not regex.

2. **Recommendation overload** — if every signal triggers, the operator gets 4+ recommendations. AC #6 caps at 3 with priority order. Document the priority in the step file.

3. **Loop fatigue** — operators may forget to exit Step 2's loop. Mitigation: every iteration of the loop ends with the menu being re-displayed prominently, including the `[5] Done` option.

4. **Filtered view confusion** — if the operator filters to `gyre` in Step 2, then asks for recommendations, they might expect recommendations about `gyre` only. Decision 4 above clarifies: recommendations are based on the ORIGINAL Step 1 output, not the filtered view. The step file MUST state this explicitly so the agent doesn't get confused.

### References

- [scripts/lib/portfolio/portfolio-engine.js](scripts/lib/portfolio/portfolio-engine.js) — The engine this skill wraps; CLI flags documented in `printHelp()`
- [.claude/skills/bmad-portfolio-status/workflow.md](.claude/skills/bmad-portfolio-status/workflow.md) — The 5-line thin wrapper being replaced
- [_bmad/bmm/3-solutioning/bmad-create-epics-and-stories/](_bmad/bmm/3-solutioning/bmad-create-epics-and-stories/) — Reference linear workflow skill
- [_bmad/_config/skill-manifest.csv](_bmad/_config/skill-manifest.csv) — Registration target
- [ag-6-3-portfolio-attribution-improvements.md](_bmad-output/implementation-artifacts/ag-6-3-portfolio-attribution-improvements.md) — The dependency that produces all the signals this skill surfaces
- [ag-6-4-migration-skill-wrapper.md](_bmad-output/implementation-artifacts/ag-6-4-migration-skill-wrapper.md) — Sibling skill for consistent UX
- Story 6.6 (`ag-6-6-skill-registration-wiring`) will handle `refresh-installation.js`, `validator.js`, and the cleanup of `.claude/skills/bmad-portfolio-status/workflow.md` — out of scope here

## Dev Agent Record

### Agent Model Used

(to be filled in by dev agent)

### Debug Log References

### Completion Notes List

### File List
