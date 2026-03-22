# Story 1.4: Define Handoff Contract Schemas (HC1-HC5)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a product discovery practitioner,
I want each artifact handoff contract to have a defined schema with exact fields and format,
so that every agent's output is guaranteed to be consumable by the next agent without reshaping.

## Acceptance Criteria

1. **AC1: Each schema defines YAML frontmatter + markdown body structure**
   - **Given** the 5 artifact contracts (HC1-HC5)
   - **When** schemas are created as reference files
   - **Then** each schema defines: YAML frontmatter fields (`contract`, `type`, `source_agent`, `source_workflow`, `target_agents`, `input_artifacts`, `created`) + markdown body structure
   - **And** each schema uses the D2 contract format from architecture

2. **AC2: HC1 (Isla→Mila) empathy artifacts schema**
   - **Given** HC1 contract schema
   - **When** created
   - **Then** it defines empathy artifact schema with required sections for empathy maps, interview syntheses, observation reports
   - **And** frontmatter sets `source_agent: isla`, `target_agents: [mila]`
   - **And** body sections match what Isla's discovery workflows produce

3. **AC3: HC2 (Mila→Liam) problem definition schema**
   - **Given** HC2 contract schema
   - **When** created
   - **Then** it defines problem definition schema in JTBD + Pains & Gains format
   - **And** frontmatter sets `source_agent: mila`, `target_agents: [liam]`
   - **And** body sections include: JTBD framing, pains list, gains list, converged problem statement

4. **AC4: HC3 (Liam→Wade) hypothesis contract schema**
   - **Given** HC3 contract schema
   - **When** created
   - **Then** it defines hypothesis contract in 4-field format: expected outcome + target behavior change + rationale + riskiest assumption
   - **And** frontmatter sets `source_agent: liam`, `target_agents: [wade]`
   - **And** body sections support 1-3 hypothesis contracts per artifact

5. **AC5: HC4 (Wade→Noah) graduated experiment context schema**
   - **Given** HC4 contract schema
   - **When** created
   - **Then** it defines experiment context schema with: results, success criteria, metrics, confirmed hypotheses
   - **And** frontmatter sets `source_agent: wade`, `target_agents: [noah]`
   - **And** body sections capture what Wade's experiment workflows produce

6. **AC6: HC5 (Noah→Max) signal report schema**
   - **Given** HC5 contract schema
   - **When** created
   - **Then** it defines signal report in strict format: signal + context + trend — no strategic recommendations
   - **And** frontmatter sets `source_agent: noah`, `target_agents: [max]`
   - **And** body sections produce intelligence Max can act on

7. **AC7: All schemas include sourceArtifact reference field (FR29)**
   - **Given** any HC1-HC5 schema
   - **When** an artifact is produced using the schema
   - **Then** frontmatter includes `input_artifacts` field referencing the input artifact(s) used
   - **And** this enables traceability across the Vortex

8. **AC8: Schemas define artifact types generically (FR28)**
   - **Given** any HC1-HC5 schema
   - **When** reviewed
   - **Then** the schema defines the artifact type generically (e.g., "problem definition", not "Mila's output")
   - **And** any producer (agent or user) can create schema-compliant input

9. **AC9: Schemas committed as reference files**
   - **Given** the 5 schema files
   - **When** committed
   - **Then** they are located in `_bmad/bme/_vortex/contracts/`
   - **And** each file follows naming convention `{contract-id}-{descriptor}.md`
   - **And** files are shipped in the npm package (not in `_bmad-output/`)

## Tasks / Subtasks

- [x] **Task 1: Create contracts directory and HC1 schema** (AC: 1, 2, 7, 8)
  - [x] 1.1 Create `_bmad/bme/_vortex/contracts/` directory
  - [x] 1.2 Create `hc1-empathy-artifacts.md` with D2 frontmatter schema: `contract: HC1`, `type: artifact`, `source_agent: isla`, `source_workflow: [discovery workflows]`, `target_agents: [mila]`, `input_artifacts: []`, `created: {{date}}`
  - [x] 1.3 Define markdown body sections: Discovery Summary, Empathy Map, Interview Synthesis, Observation Report, Key Themes
  - [x] 1.4 Mark each section as required or optional with field descriptions
  - [x] 1.5 Ensure generic artifact type — any producer can create compliant input (FR28)

- [x] **Task 2: Create HC2 problem definition schema** (AC: 1, 3, 7, 8)
  - [x] 2.1 Create `hc2-problem-definition.md` with D2 frontmatter
  - [x] 2.2 Define markdown body sections: JTBD Statement, Pains (prioritized list), Gains (prioritized list), Converged Problem Statement, Evidence Summary
  - [x] 2.3 Include JTBD framing template: "When [situation], I want to [motivation], so I can [expected outcome]"
  - [x] 2.4 Ensure `input_artifacts` references empathy artifacts or other source material

- [x] **Task 3: Create HC3 hypothesis contract schema** (AC: 1, 4, 7, 8)
  - [x] 3.1 Create `hc3-hypothesis-contract.md` with D2 frontmatter
  - [x] 3.2 Define 4-field hypothesis format: Expected Outcome, Target Behavior Change, Rationale, Riskiest Assumption
  - [x] 3.3 Support 1-3 hypothesis contracts per artifact (repeatable section)
  - [x] 3.4 Include assumption risk classification (lethality + uncertainty)

- [x] **Task 4: Create HC4 experiment context schema** (AC: 1, 5, 7, 8)
  - [x] 4.1 Create `hc4-experiment-context.md` with D2 frontmatter
  - [x] 4.2 Define markdown body sections: Experiment Design Summary, Success Criteria, Results Data, Metrics, Confirmed/Rejected Hypotheses, Graduation Status
  - [x] 4.3 Ensure sections capture Wade's lean experiment output format

- [x] **Task 5: Create HC5 signal report schema** (AC: 1, 6, 7, 8)
  - [x] 5.1 Create `hc5-signal-report.md` with D2 frontmatter
  - [x] 5.2 Define strict signal format body sections: Signal Description, Context (experiment lineage + Vortex history), Trend Analysis
  - [x] 5.3 Explicitly exclude strategic recommendations (Noah produces intelligence, not strategy)
  - [x] 5.4 Include anomaly detection section for unexpected behavior patterns (FR15)

- [x] **Task 6: Cross-validation and consistency check** (AC: 7, 8, 9)
  - [x] 6.1 Verify all 5 schemas share consistent frontmatter structure (D2 compliance)
  - [x] 6.2 Verify `input_artifacts` field is present and documented in all schemas (FR29)
  - [x] 6.3 Verify each schema's output sections align with the next agent's expected input (chain test: HC1 output → HC2 input → HC3 input → HC4 input → HC5 input → Max's learning-card step-01 expectations)
  - [x] 6.4 Verify all schemas use generic artifact type language (FR28)
  - [x] 6.5 Verify file naming follows `{contract-id}-{descriptor}.md` convention

## Dev Notes

### This is a Content-Only Story

**No JavaScript code changes.** This story creates 5 markdown reference documents defining the handoff contract schemas. These are content artifacts that agents will reference during workflow execution to ensure artifact compatibility.

### Contract Schema Format (Architecture D2)

All schemas follow the D2 decision from architecture:

```yaml
---
contract: HC{N}
type: artifact
source_agent: {agent_id}
source_workflow: {primary_workflow}
target_agents: [{target_agent_ids}]
input_artifacts: []  # populated when artifact is produced — lists source artifact references
created: {{date}}
---
```

**Routing contracts (HC6-HC10) are NOT part of this story.** They are documented in the Compass Routing Reference (Story 1.5) as table guidance entries, not artifact files.

### Contract Descriptions (from Architecture)

| Contract | Flow | Type | Description |
|----------|------|------|-------------|
| HC1 | Isla → Mila | Artifact | Empathy artifacts (maps, interviews, observations) |
| HC2 | Mila → Liam | Artifact | Problem definition (JTBD + Pains & Gains) |
| HC3 | Liam → Wade | Artifact | Hypothesis contracts (4-field format) |
| HC4 | Wade → Noah | Artifact | Graduated experiment context (results, criteria, metrics) |
| HC5 | Noah → Max | Artifact | Signal report (signal + context + trend) |

### File Location

Schema files go in `_bmad/bme/_vortex/contracts/` — a **new** directory that does not exist yet (current vortex root contains only `agents/`, `workflows/`, and `config.yaml`). This directory is shipped in the npm package as reference documentation, NOT in `_bmad-output/` (which is runtime user output).

**Important distinction:**
- `_bmad/bme/_vortex/contracts/` = schema definitions (shipped, immutable reference)
- `_bmad-output/vortex-artifacts/` = actual artifacts produced during workflow execution (user-generated)

### What Each Agent Produces and Consumes

Understanding the data flow is critical for schema design:

| Agent | Produces | Consumes |
|-------|----------|----------|
| Isla | Empathy artifacts (HC1 output) | User research, observations |
| Mila | Problem definitions (HC2 output) | HC1 empathy artifacts |
| Liam | Hypothesis contracts (HC3 output) | HC2 problem definitions |
| Wade | Experiment context (HC4 output) | HC3 hypothesis contracts |
| Noah | Signal reports (HC5 output) | HC4 experiment context |
| Max | Decisions (routing, no artifact) | HC5 signal reports |

### Existing Agent Workflow Output Patterns

**Actual workflow names and their output formats** (study these to align schemas):

#### Isla's Workflows (HC1 must capture these outputs)

- **`user-interview`** → `{output_folder}/user-interview-{topic}-{date}.md`
  - Template sections: Executive Summary, Research Goals, Interview Script, Participants table, Raw Findings per participant (behaviors, quotes, pain points, workarounds, emotional moments), **Synthesized Insights** (insight statement + strength Strong/Moderate/Emerging + N-of-total + evidence + counter-evidence + confidence H/M/L), Recommendations, Research Quality Assessment, Saturation Tracker
  - Insight formula: `[User segment] [behavior/belief] because [underlying motivation], which means [implication]`

- **`user-discovery`** → `{output_folder}/user-discovery-{topic}-{date}.md`
  - Template sections: Executive Summary, Discovery Scope, Research Methods Used table, **Key Themes** (pattern + evidence + implication + representative quote), **Opportunity Areas** (user evidence + size signal + current alternatives + strategic fit + priority), Research Question Answers, Evidence Matrix, Contradictions and Outliers, Limitations

- **`empathy-map`** → `{output_folder}/empathy-map-{user-name}-{date}.md`
  - Template sections: Executive Summary, Target User Profile (demographics, JTBD, context), **Says & Thinks** (direct quotes vs inferred thoughts), **Does & Feels** (observable actions vs emotional states), **Pain Points** (prioritized H/M/L), **Desired Gains** (prioritized H/M/L), Design Implications, Feature Prioritization Matrix

#### Wade's Workflows (HC4 must capture these outputs)

- **`lean-experiment`**, **`proof-of-concept`**, **`proof-of-value`**, **`mvp`**
- **Important:** Wade's step-06 synthesis files are stubs (placeholder content only). Use **templates** as the authoritative output format reference.
- `lean-experiment` template defines: hypothesis, experiment design, success criteria, results, learnings
- `mvp` template defines: riskiest assumption, success criteria, smallest test, scoped features, build-measure-learn cycle
- Wade's Compass routes experiment completion → Max's `learning-card` workflow

#### Max's Workflows (HC5 must produce what Max expects as input)

- **`learning-card`** → `{output_folder}/learning-card-{experiment-name}-{date}.md`
  - **Step-01 expects as input:** experiment name + one-sentence description, hypothesis in format `"We believe that [target users] will [expected behavior] because [rationale]"`, method (type, sample size, duration, recruitment), pre-defined success criteria (thresholds set before seeing results), strategic context (Vortex stream, assumption tested, decision it informs)
  - Template sections: One-Sentence Summary, Experiment Context (hypothesis + method table + success criteria table + strategic context), Raw Results (quantitative: metric/target/actual/met table; qualitative: quotes + observed behaviors; unexpected findings), Analysis (CLEAR PASS/MARGINAL PASS/MARGINAL FAIL/CLEAR FAIL/INCONCLUSIVE), Validated Learnings (assumption status table), Implications, Recommended Next Actions, Connections

- **`pivot-patch-persevere`** — expects a set of Learning Cards as input (name, core learning, confidence, outcome) plus additional evidence signals organized by STAY/CHANGE/UNCLEAR
- **`vortex-navigation`** — expects a 7-stream status map (not-started/in-progress/complete + confidence + artifacts per stream)

### Compass Routing Pattern (D4)

Every existing workflow's step-06 ends with a **Vortex Compass** table in uniform format:
```
| If you learned... | Consider next... | Agent | Why |
```
Schemas should be aware that the Compass routing at the end of each workflow references the handoff contract and declares what the next agent expects. The schemas defined in this story are the authoritative reference for those Compass declarations.

### Generic Artifact Types (FR28)

Each schema must define the artifact type generically. Example:
- HC2 is "problem definition" not "Mila's converged problem definition"
- Any agent or user can produce a schema-compliant problem definition
- This enables non-sequential Vortex entry (FR6, FR11)

### sourceArtifact Traceability (FR29)

The `input_artifacts` frontmatter field enables traceability:
```yaml
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/hc1-user-interview-onboarding-2026-02-24.md"
    contract: HC1
```

This links each artifact to its upstream source(s), creating an audit trail across the Vortex.

### Learnings from Previous Stories (1.1-1.3)

- **Data-driven patterns work:** Stories 1.1-1.2 proved that registry-driven architecture eliminates hardcoding. Apply same principle: schemas should be self-describing.
- **Consistency is king:** All existing agents follow Isla's canonical template. All schemas should follow the D2 template exactly.
- **Don't over-engineer:** Story 1.3 showed that simple patterns (array append, idempotent check) outperform complex ones. Keep schema definitions clean and minimal.

### Quality Gate Context

This story is part of Epic 1's quality gate (P18). All HC1-HC5 schemas must be complete before content epics (2-4) begin, because:
- Epic 2 (Mila) workflows need HC1 and HC2 schemas
- Epic 3 (Liam) workflows need HC2 and HC3 schemas
- Epic 4 (Noah) workflows need HC4 and HC5 schemas

### Project Structure Notes

- New directory: `_bmad/bme/_vortex/contracts/`
- Files follow architecture naming convention: `{contract-id}-{descriptor}.md`
- No changes to existing infrastructure code
- No changes to existing test files

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.4 ACs]
- [Source: _bmad-output/planning-artifacts/architecture.md — D2 Contract Schema Format]
- [Source: _bmad-output/planning-artifacts/architecture.md — Compass Routing Reference table]
- [Source: _bmad-output/planning-artifacts/architecture.md — FR25-FR29 coverage]
- [Source: _bmad-output/planning-artifacts/epics.md — FR Coverage Map]
- [Source: _bmad-output/implementation-artifacts/1-3-create-migration-delta-installer-updates.md — Previous story learnings]
- [Source: _bmad/bme/_vortex/workflows/user-interview/user-interview.template.md — Isla interview output format]
- [Source: _bmad/bme/_vortex/workflows/user-discovery/user-discovery.template.md — Isla discovery output format]
- [Source: _bmad/bme/_vortex/workflows/empathy-map/empathy-map.template.md — Isla empathy map output format]
- [Source: _bmad/bme/_vortex/workflows/learning-card/learning-card.template.md — Max learning card input expectations]
- [Source: _bmad/bme/_vortex/workflows/learning-card/steps/step-01-experiment-context.md — Max's expected input format]
- [Source: _bmad/bme/_vortex/workflows/pivot-patch-persevere/pivot-patch-persevere.template.md — Max PPP input format]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

### Completion Notes List

- All 9 ACs met: D2 frontmatter structure (AC1), HC1 empathy artifacts (AC2), HC2 problem definition with JTBD (AC3), HC3 hypothesis 4-field format (AC4), HC4 experiment context (AC5), HC5 signal report (AC6), sourceArtifact traceability (AC7), generic artifact types (AC8), committed in `contracts/` directory (AC9)
- Chain validation passed: HC1→HC2→HC3→HC4→HC5→Max's learning-card input format
- All schemas aligned with actual existing workflow template output formats (Isla's user-interview/user-discovery/empathy-map, Wade's lean-experiment/mvp, Max's learning-card/pivot-patch-persevere)
- HC5 explicitly excludes strategic recommendations per FR14 (Noah produces intelligence, Max produces decisions)
- Anomaly detection section in HC5 supports FR15 (unexpected behavior patterns) and HC10 routing to Isla
- 259 existing tests pass (199 unit + 60 integration) — zero regressions
- Content-only story — no JavaScript code changes

### Change Log
- 2026-02-24: Story created by create-story workflow. Status: ready-for-dev.
- 2026-02-24: Implementation complete. All 6 tasks done. 5 contract schemas created, cross-validated. Status: review.
- 2026-02-24: Code review complete. 3 fixes applied (M1: HC1 self-referencing input_artifacts example, M2: HC4 duplicate Duration disambiguated to Actual/Planned, M3: HC4 Section 5 clarified as supplementary to Section 4). Status: done.

### File List
- `_bmad/bme/_vortex/contracts/` — **NEW** directory for handoff contract schemas
- `_bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md` — **NEW** HC1 schema: Isla→Mila empathy artifacts
- `_bmad/bme/_vortex/contracts/hc2-problem-definition.md` — **NEW** HC2 schema: Mila→Liam problem definition (JTBD + Pains & Gains)
- `_bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md` — **NEW** HC3 schema: Liam→Wade hypothesis contracts (4-field format)
- `_bmad/bme/_vortex/contracts/hc4-experiment-context.md` — **NEW** HC4 schema: Wade→Noah graduated experiment context
- `_bmad/bme/_vortex/contracts/hc5-signal-report.md` — **NEW** HC5 schema: Noah→Max signal report (signal + context + trend)
