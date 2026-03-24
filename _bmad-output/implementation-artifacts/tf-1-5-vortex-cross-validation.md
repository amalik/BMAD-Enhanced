# Story 1.5: Vortex Cross-Validation

Status: review

## Story

As a framework contributor,
I want the Architecture Reference validated against Vortex — the more complex Sequential team,
So that I can confirm the reference handles advanced Sequential patterns (multi-target contracts, feedback routing, 7-agent pipelines) and didn't lose Vortex-specific details during generalization.

## Acceptance Criteria

1. **Given** the completed Architecture Reference and Gyre validation report
   **When** the 29 Sequential checks are evaluated against the Vortex module at `_bmad/bme/_vortex/`
   **Then** a Vortex validation report documents pass/fail for each check with evidence
   **And** findings specific to complex Sequential patterns (HC6-HC10 feedback contracts, multi-target routing) are documented

2. **Given** Vortex is a more complex Sequential team than Gyre (7 agents, 10 contracts, 22 workflows)
   **When** the reference is applied to this increased complexity
   **Then** the report documents whether the reference's rules scale — specifically whether checks designed for a 4-agent pipeline work for a 7-agent pipeline with feedback loops
   **And** any gaps or ambiguities exposed by the complexity increase are documented

## Tasks / Subtasks

- [x] Task 1: Forward Validation — Reference Predicts Vortex (AC: #1)
  - [x] 1.1 Evaluate all 7 Discoverable — Sequential checks (DISC-S-01 through DISC-S-07) against Vortex's actual files, recording pass/fail and evidence for each
  - [x] 1.2 Evaluate all 8 Installable — Sequential checks (INST-S-01 through INST-S-08) against Vortex's registration, refresh, validator, and file structure
  - [x] 1.3 Evaluate all 8 Configurable — Sequential checks (CONF-S-01 through CONF-S-08) against Vortex's config.yaml, agent files, naming conventions, and contract frontmatter
  - [x] 1.4 Evaluate all 6 Composable — Sequential checks (COMP-S-01 through COMP-S-06) against Vortex's manifest entries, contracts, compass routing, and skill IDs

- [x] Task 2: Complexity Scaling Analysis (AC: #2)
  - [x] 2.1 Document how each check result compares to Gyre's result — same outcome or different, and why
  - [x] 2.2 Identify checks where Vortex's complexity exposed reference gaps or ambiguities not visible in Gyre (e.g., HC6-HC10 inline contracts, multi-target routing, 22-workflow compass tables)
  - [x] 2.3 For each new gap found, classify as: (a) reference should be updated (actionable — fix in this story), (b) intentional design decision (document), or (c) Epic 2 factory scope (defer)

- [x] Task 3: Create Vortex Validation Report (AC: #1, #2)
  - [x] 3.1 Create `_bmad-output/planning-artifacts/vortex-validation-report.md` with two sections: (1) Check Results, (2) Complexity Scaling Findings
  - [x] 3.2 Section 1 — Check Results: table with columns [Check ID, Rule (brief), Pass/Fail, Evidence/Notes, Gyre Comparison] covering all 29 Sequential checks
  - [x] 3.3 Section 2 — Complexity Scaling Findings: document where Vortex's 7-agent/10-contract/22-workflow structure challenges the reference beyond what Gyre tested

- [x] Task 4: Address Reference Gaps (AC: #2)
  - [x] 4.1 For any gaps classified as "reference should be updated" in Task 2.3, apply fixes to `_bmad-output/planning-artifacts/architecture-reference-teams.md`
  - [x] 4.2 Do NOT add new YAML checks — only update prose, fix validation descriptions, or clarify ambiguous rules
  - [x] 4.3 Document all changes in the validation report's Complexity Scaling Findings section

- [x] Task 5: Final Validation (AC: #1, #2)
  - [x] 5.1 Verify validation report has both required sections
  - [x] 5.2 Verify all 29 Sequential check IDs appear in the Check Results table
  - [x] 5.3 Verify every check has a Gyre Comparison column entry
  - [x] 5.4 Verify any reference updates (Task 4) do not modify YAML data blocks

## Dev Notes

### This is a CROSS-VALIDATION story — regression check, not independent hypothesis test

The Architecture Reference was derived FROM Vortex patterns. This means Vortex validation is a regression check — confirming the reference didn't lose Vortex-specific details during generalization. Gyre validation (Story 1.4) was the independent hypothesis test for A5'/A6'. This story does NOT produce A5'/A6' evidence conclusions — those were finalized in Story 1.4.

### Why This Story Matters Despite Being Stretch

The reference was generalized from Vortex. Generalization can lose specifics. Key areas where Vortex differs from Gyre that could expose gaps:
1. **HC6-HC10 are NOT standalone .md files** — they're defined inline in compass-routing-reference.md. Gyre has all 4 contracts as standalone files.
2. **22 workflows vs Gyre's 7** — much larger compass routing table
3. **Multi-target contracts** — HC1 has target_agents: [mila], but feedback contracts (HC6-HC10) route to different agents based on decision type
4. **Decision-driven vs flag-driven routing** — HC6-HC8 are Max decision-driven, HC9-HC10 are mid-workflow flag-driven. Gyre only has one feedback mechanism (GC4).
5. **_deprecated/ workflow directory** — Vortex has deprecated workflows, Gyre doesn't
6. **guides/ directory** — Vortex has user guides in guides/, Gyre doesn't
7. **validator.js HAS Vortex validation** — INST-S-04 will PASS (unlike Gyre's FAIL)

### Which Checks Apply

Same 29 Sequential checks as Story 1.4 (Vortex is also Sequential):

| Section | Check IDs | Count |
|---------|-----------|-------|
| Discoverable — Sequential | DISC-S-01 through DISC-S-07 | 7 |
| Installable — Sequential | INST-S-01 through INST-S-08 | 8 |
| Configurable — Sequential | CONF-S-01 through CONF-S-08 | 8 |
| Composable — Sequential | COMP-S-01 through COMP-S-06 | 6 |
| **Total** | | **29** |

### Vortex Module Structure (Cross-Validation Target)

**Location:** `_bmad/bme/_vortex/`

**Agents (7):** contextualization-expert/Emma, discovery-empathy-expert/Isla, research-convergence-specialist/Mila, hypothesis-engineer/Liam, lean-experiments-specialist/Wade, production-intelligence-specialist/Noah, learning-decision-expert/Max

**Workflows (22):** lean-persona, product-vision, contextualize-scope, empathy-map, user-interview, user-discovery, research-convergence, pivot-resynthesis, pattern-mapping, hypothesis-engineering, assumption-mapping, experiment-design, mvp, lean-experiment, proof-of-concept, proof-of-value, signal-interpretation, behavior-analysis, production-monitoring, learning-card, pivot-patch-persevere, vortex-navigation

**Contracts (10 total, 5 standalone + 5 inline):**
- HC1-HC5: Standalone .md files in contracts/ (artifact schema contracts)
  - hc1-empathy-artifacts.md (Isla→Mila)
  - hc2-problem-definition.md (Mila→Liam)
  - hc3-hypothesis-contract.md (Liam→Wade)
  - hc4-experiment-context.md (Wade→Noah)
  - hc5-signal-report.md (Noah→Max)
- HC6-HC10: Defined inline in compass-routing-reference.md (routing contracts, NO standalone files)
  - HC6: Max→Mila (decision-driven: pivot resynthesis)
  - HC7: Max→Isla (decision-driven: evidence gap)
  - HC8: Max→Emma (decision-driven: recontextualization)
  - HC9: Liam→Isla (flag-driven: unvalidated assumption)
  - HC10: Noah→Isla (flag-driven: anomalous behavior)

**Other files:** README.md, config.yaml (v2.4.0), compass-routing-reference.md, guides/ directory (Wave 3 user guides)

### Vortex Registration Surfaces

1. **agent-registry.js** — `AGENTS` array (7 entries), `WORKFLOWS` array (22 entries), derived `AGENT_FILES`, `AGENT_IDS`, `WORKFLOW_NAMES`, `USER_GUIDES`, `WAVE3_STREAMS`, `WAVE3_WORKFLOW_NAMES` — NOTE: Vortex uses UNPREFIXED names (AGENTS not VORTEX_AGENTS), unlike Gyre which uses GYRE_ prefix
2. **refresh-installation.js** — copies agents/, workflows/, contracts/, guides/, config.yaml from package to project
3. **validator.js** — imports AGENT_FILES, AGENT_IDS, WORKFLOW_NAMES, WAVE3_WORKFLOW_NAMES — performs 8 validation checks including config, agents, workflows, manifest, deprecated, Wave 3 step structure, enhance module
4. **agent-manifest.csv** — rows 31-37 for all 7 Vortex agents with module=bme
5. **Skill directories** — `.claude/skills/bmad-agent-bme-{agent_id}/SKILL.md` for all 7 agents

### Known Issues to Expect

- **DISC-S-05 (module-help.csv):** Same known gap as Gyre — `_bmad/_config/module-help.csv` does not exist. Expected: FAIL (same as Gyre).
- **INST-S-04 (validator.js):** Unlike Gyre, Vortex HAS validator.js validation — imports Vortex constants and runs 8 checks. Expected: PASS (Gyre was FAIL).
- **INST-S-07 / INST-S-08 (contracts directory/copy):** HC1-HC5 are standalone .md files — PASS. HC6-HC10 have NO files in contracts/ — the check says "at least one handoff contract .md file" so this still passes, but the dev should document that 5/10 contracts are inline-only.
- **COMP-S-06 (contract chain coverage):** HC1-HC5 cover Isla→Mila→Liam→Wade→Noah→Max (5 adjacent pairs). But what about Emma→Isla? Emma is the first agent in the pipeline but has no contract passing to Isla — Emma produces context artifacts that Isla consumes informally. The check validates "adjacent pairs" — if Emma→Isla is considered an adjacent pair, this is a near-miss. Document this edge case.
- **CONF-S-07 (contract frontmatter agent short names):** HC1-HC5 frontmatter should use lowercase first names (isla, mila, liam, wade, noah, max). Verify actual values.
- **COMP-S-04 (compass inter-module routing):** Vortex's compass-routing-reference.md may or may not have inter-module routing to Gyre. Check whether cross-module routing is documented.

### Report Format — Differences from Story 1.4

This is NOT a hypothesis test. The report has 2 sections (not 3):
1. **Check Results** — same table format as Gyre report, PLUS a "Gyre Comparison" column
2. **Complexity Scaling Findings** — replaces the A5'/A6' Evidence Conclusions section. Documents where Vortex's complexity challenges the reference.

No A5'/A6' evidence conclusions — those were finalized in Story 1.4.

### What NOT to Do (Out of Scope)

- **Do NOT add new YAML checks** — only validate existing ones
- **Do NOT create any JS utilities or workflow files** — Epic 2 scope
- **Do NOT modify the reference's YAML data blocks** — prose-only fixes allowed
- **Do NOT create or modify Vortex module files** — this is read-only validation
- **Do NOT produce A5'/A6' evidence conclusions** — already finalized in Story 1.4

### Previous Story Intelligence

From Story 1.4 completion:
- Forward validation methodology: read each file/registration surface, evaluate against check rule and validation fields, record pass/fail with specific evidence (file paths, line numbers, content quotes)
- Reverse validation: evaluate whether check rule+validation provide enough specificity to produce correct output without looking at examples
- 8 surprising findings documented including 2 failures, 2 near-misses, 4 reverse validation gaps
- COMP-S-03 prose clarification applied (contract schema placeholder dates)
- Code review patches: Finding 1 classification reframed for AC#2 compliance, Finding 3 reframed from "near-miss" to "resolved"
- Validation report format: ~200 lines, markdown tables, structured findings with severity/type/classification

From Story 1.3 completion:
- All 50 check IDs have per-check "why" prose with bold inline references
- Extension Deployment Mechanism section added (~23 lines)
- Prose style: consequence-driven ("without X, Y breaks")
- Architecture reference is ~470 lines

### Project Structure Notes

- Architecture Reference: `_bmad-output/planning-artifacts/architecture-reference-teams.md`
- Gyre Validation Report (reference): `_bmad-output/planning-artifacts/gyre-validation-report.md`
- Validation Report (to create): `_bmad-output/planning-artifacts/vortex-validation-report.md`
- Vortex module: `_bmad/bme/_vortex/`
- Agent registry: `scripts/update/lib/agent-registry.js`
- Refresh installation: `scripts/update/lib/refresh-installation.js`
- Validator: `scripts/update/lib/validator.js`
- Agent manifest: `_bmad/_config/agent-manifest.csv`
- Skill directories: `.claude/skills/bmad-agent-bme-{agent_id}/`

### References

- [Source: _bmad-output/planning-artifacts/epic-team-factory.md — Story 1.5 ACs]
- [Source: _bmad-output/planning-artifacts/architecture-team-factory.md — FR6 output spec, Phase 1 exit criteria]
- [Source: _bmad-output/planning-artifacts/architecture-reference-teams.md — 29 Sequential checks to validate]
- [Source: _bmad-output/planning-artifacts/gyre-validation-report.md — Gyre check results for comparison]
- [Source: _bmad-output/implementation-artifacts/tf-1-4-bidirectional-gyre-validation.md — Previous story intelligence, methodology]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None — no errors encountered.

### Completion Notes List

- All 14 subtasks passed across 5 tasks — forward validation, complexity scaling analysis, report creation, gap assessment, final validation
- Task 1 (Forward Validation): Evaluated all 29 Sequential checks against Vortex. Results: 27 PASS, 2 FAIL. DISC-S-05 (module-help.csv doesn't exist — same known gap as Gyre), COMP-S-04 (Vortex compass has zero inter-module routing — new failure, asymmetric with Gyre which PASSES)
- Task 2 (Complexity Scaling): Identified 7 findings. Key differences from Gyre: (1) COMP-S-04 FAIL — no inter-module routing (Gyre→Vortex exists but not reverse), (2) unprefixed registry names (AGENTS vs GYRE_AGENTS), (3) HC6-HC10 inline contracts (no standalone files), (4) Emma→Isla entry agent gap (no formal contract), (5) _deprecated/ workflow directory, (6) INST-S-04 asymmetry confirmed (Vortex validates, Gyre doesn't), (7) compass complexity scaling (312 vs 169 lines). All classified as design notes — no reference updates needed.
- Task 3 (Validation Report): Created vortex-validation-report.md (~167 lines) with 2 sections per spec. Section 1: 4 check result tables with Gyre Comparison column. Section 2: 7 complexity scaling findings with severity/type/classification.
- Task 4 (Reference Gaps): No reference updates needed — all 7 findings classified as (b) design notes or confirmations of existing findings. No YAML blocks modified. No prose changes required.
- Task 5 (Final Validation): All 4 criteria passed — 2 sections present, 29 check IDs in tables, Gyre Comparison column filled for all 29 checks, no YAML modifications made.
- Cross-validation conclusion: Architecture Reference's 29 Sequential checks scale correctly from 4-agent to 7-agent complexity. 25/29 checks produce identical results. 2 produce different results due to implementation state (not check design). 2 produce same FAIL.

### Change Log

- 2026-03-24: Created `_bmad-output/planning-artifacts/vortex-validation-report.md` (~167 lines) — Vortex Cross-Validation Report with check results and complexity scaling findings

### File List

- `_bmad-output/planning-artifacts/vortex-validation-report.md` (created, ~167 lines)
