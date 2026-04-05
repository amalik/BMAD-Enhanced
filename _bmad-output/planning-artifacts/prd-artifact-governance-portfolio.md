---
stepsCompleted: [step-01-init, step-02-discovery, step-02b-vision, step-02c-executive-summary, step-03-success, step-04-journeys, step-05-domain, step-06-innovation, step-07-project-type]
inputDocuments:
  - _bmad-output/planning-artifacts/initiatives-backlog.md
  - docs/lifecycle-expansion-vision.md
  - _bmad-output/planning-artifacts/adr-repo-organization-conventions-2026-03-22.md
workflowType: 'prd'
documentCounts:
  briefs: 0
  research: 0
  projectDocs: 3
classification:
  projectType: 'Governance & Knowledge Management Infrastructure'
  domain: 'Agentic Workflow Governance'
  complexity: 'Medium-High'
  projectContext: 'brownfield'
  annotations:
    - 'Complexity concentrated in P15 (portfolio inference), not uniformly distributed'
    - 'Frontmatter schema is a cross-cutting contract — requires architect + tech writer co-design'
---

# Product Requirements Document - Artifact Governance & Portfolio

**Author:** Amalik
**Date:** 2026-04-05

## Executive Summary

As Convoke scales beyond single-initiative usage, operators lose coherence. Artifacts accumulate across `_bmad-output/` with inconsistent naming, no initiative tagging, and no cross-initiative visibility. An operator managing Vortex, Gyre, Forge, Helm, and Loom simultaneously cannot determine — at a glance — what belongs to what, where each initiative stands, or what to pick up next. The cognitive cost of context-switching between workstreams grows linearly with initiative count.

This PRD specifies two tightly coupled capabilities that address this gap:

1. **Artifact Governance (I14)** — A naming convention (`{initiative}-{artifact-type}[-{qualifier}]-{date}.md`), frontmatter metadata schema, controlled initiative taxonomy (8 IDs: vortex, gyre, bmm, forge, helm, enhance, loom, convoke), and artifact type taxonomy (~20 types). Includes a migration skill that retroactively applies the convention to ~160+ existing artifacts across all output directories (`planning-artifacts/`, `vortex-artifacts/`, `gyre-artifacts/`, `implementation-artifacts/`) with dry-run manifest, frontmatter injection, and git rename mapping. **Supersedes and extends** the existing repo organization ADR (`adr-repo-organization-conventions-2026-03-22.md`), which defined `{category}-{descriptor}[-{context}][-{date}].md` — I14 elevates initiative as the primary sort dimension and adds frontmatter metadata as a machine-readable layer.

2. **Portfolio Skill (P15)** — A BMM skill that scans planning artifacts across all initiatives and produces a portfolio view: initiative name, phase, health signal, next action, and context re-entry hint (last artifact touched, last open question). Includes a WIP radar that flags overload. Derives state from existing artifacts — zero manual tracking files. Operates in degraded mode on unstructured artifacts (filename inference, git recency) and at full capability on governed artifacts (frontmatter metadata). Inference sources: epic files (story completion %), sprint plans (current sprint state), backlog files (queued work depth), git history (activity recency), and frontmatter metadata (initiative, status).

These capabilities fill a gap already diagnosed in the Lifecycle Expansion Vision (Section 8: "Flow and WIP governance — not yet embedded") and represent the first concrete implementation of the governance cross-cutting axis from Convoke's three-axis architecture.

**Target users:** Solo operators, consultants managing multiple engagements, and team leads coordinating across Convoke modules. The primary persona is the platform operator managing 2+ concurrent initiatives.

**Design principle — graduation path:** If the portfolio skill's inference capabilities hit limits, the gaps become validated input for a Vortex discovery cycle on a full governance perimeter — ensuring investment follows evidence, not speculation.

### What Makes This Special

Zero-maintenance visibility. The portfolio skill does not require manual status updates — it infers state from the artifacts the platform already produces. The naming convention and frontmatter schema are not documentation bureaucracy; they are the machine-readable contract that enables automated portfolio intelligence. Convention is the automation layer.

The frontmatter schema is a cross-cutting contract that every future Convoke workflow must honor. Its design requires architect and tech writer co-design to balance structural rigor with practical adoptability.

The initiative taxonomy (8 IDs) is a **controlled vocabulary decision** — it commits the platform to a specific naming structure. The taxonomy must be extensible (new initiatives can be added) without breaking existing artifacts or the portfolio skill's parsing logic.

## Project Classification

| Attribute | Value |
|-----------|-------|
| **Project Type** | Governance & Knowledge Management Infrastructure |
| **Domain** | Agentic Workflow Governance |
| **Complexity** | Medium-High (concentrated in P15 portfolio inference; I14 is lower complexity but high consequence — the schema propagates platform-wide) |
| **Project Context** | Brownfield — extending existing Convoke platform |
| **Vision Traceability** | Lifecycle Expansion Vision, Section 8 — Flow & WIP governance + Value stream visibility |
| **Backlog Items** | I14 (Artifact Governance, RICE 3.2), P15 (Portfolio Skill, RICE 1.7) |
| **Dependency** | I14 must complete before P15 |

## Success Criteria

### User Success

- **Context re-entry in under 30 seconds:** An operator switching to any initiative can identify its current state, last artifact touched, and next action within 30 seconds of viewing the portfolio output
- **Initiative identification at a glance:** Opening any `_bmad-output/` directory, the operator can tell which initiative owns every file by reading filenames alone — initiative prefix as primary sort dimension
- **Emotional shift:** From "overwhelmed, where do I start" to "coherent, I see the full picture across all workstreams"
- **Zero manual upkeep:** The operator never creates or updates a tracking file — the portfolio skill derives everything from existing artifacts

### Business Success

- **Convention adoption rate:** 100% of artifacts produced by Convoke workflows after I14 ships follow the naming convention and include frontmatter metadata
- **Migration completeness:** 100% of existing artifacts renamed and frontmatter-injected — no manual cleanup remainder
- **Drift prevention:** No naming convention violations detected in artifacts created in the 3 months following I14 deployment
- **Force multiplier signal:** At least 2 subsequent initiatives (e.g., Helm discovery, Forge Gate 1) are managed using the portfolio skill within 1 month of P15 deployment

### Technical Success

- **Migration safety:** All renames executed via git mv — full history preserved with `git log --follow`. Rename mapping file included in migration commit
- **Portfolio inference accuracy:** Skill correctly identifies initiative phase (discovery, planning, build, blocked, complete) AND status (ongoing, blocked, paused) for all active initiatives
- **Frontmatter schema adoption:** At least 2 artifact-producing workflows updated to emit frontmatter on creation within the first sprint after I14
- **Degraded mode functional:** Portfolio skill produces usable (if lower-fidelity) output on pre-migration artifacts without frontmatter

### Measurable Outcomes

| Metric | Target | Measurement |
|--------|--------|-------------|
| Context re-entry time | < 30 seconds | Operator self-report on first 5 uses |
| Migration coverage | 100% | Count of renamed files vs total eligible files |
| Portfolio phase accuracy | Correct for all active initiatives | Manual verification against known initiative states |
| Convention drift | 0 violations in 3 months | Periodic scan of new artifacts |
| Workflow adoption | 2+ workflows emit frontmatter | Code inspection |

## Product Scope

### MVP - Minimum Viable Product

**I14 — Artifact Governance:**
- Naming convention specification document (the contract)
- Initiative taxonomy (8 IDs) and artifact type taxonomy (~20 types) as config
- Frontmatter metadata schema (initiative, artifact_type, status, created) — co-designed by architect + tech writer
- Migration skill: dry-run manifest → user review → execute rename + frontmatter injection + git rename mapping
- ADR supersession: existing `adr-repo-organization-conventions-2026-03-22.md` updated to SUPERSEDED status, new ADR produced

**P15 — Portfolio Skill:**
- Artifact registry: scan output folders, parse filenames + frontmatter, build index by initiative/type/date/status
- Portfolio view: initiative name, phase, status (ongoing/blocked/paused/complete), next action, context re-entry hint
- WIP radar: flag when active initiative count exceeds configurable threshold
- Degraded mode: functional on unstructured artifacts via filename inference + git recency

### Growth Features (Post-MVP)

- Workflow enforcement: update remaining artifact-producing workflows to emit frontmatter at creation time (Phase C from existing ADR)
- Portfolio trend: show initiative velocity over time (artifacts produced per week, phase transitions)
- Cross-initiative dependency view: visualize which initiatives block each other
- Archive integration: connect portfolio skill with the archive system from the existing ADR

### Vision (Future)

- Full governance perimeter: if portfolio skill hits inference limits, graduate to Vortex discovery for a dedicated governance team
- Value stream mapping: trace evidence signals through perimeter activations to outcomes (lifecycle vision Section 8)
- Multi-project support: extend taxonomy with project/client prefix for consultants managing multiple engagements
- Kaizen signals: portfolio skill emits improvement suggestions, not just status ("this initiative has stalled for 2 weeks")

## User Journeys

### Journey 1: Amalik the Solo Operator — "Where Was I?"

**Opening Scene:** It's Monday morning. Amalik has been running Convoke for months. Five initiatives are in flight — Vortex (stable), Gyre (built), Forge (waiting on Gate 1), Helm (mid-discovery), and Loom (first agent built, improvements pending). He opens `_bmad-output/planning-artifacts/` and sees 40+ files. `prd.md` — which initiative? `architecture.md` — the platform one or Gyre's? He spent 10 minutes last Thursday on Helm discovery and now can't remember where he left off. He opens three files before finding the right one. The cognitive tax compounds — by the time he's re-loaded Helm context, he's lost the energy to do the actual work.

**Rising Action:** Amalik runs the migration skill. A dry-run manifest appears — 163 files, each showing `old-name → new-name`. He reviews it, spots two files the skill couldn't classify (ambiguous `prd.md` and `architecture.md`), manually assigns them to `convoke-prd.md` and `convoke-arch.md`. He confirms. Git mv executes. Every file now starts with its initiative: `helm-problem-definition-hc2-2026-04-05.md`. He opens the folder — alphabetical sorting groups everything by initiative. Helm files are together. Forge files are together. He adds a new initiative ID — a single line in `_bmad/_config/taxonomy.yaml` under the `user` section — and starts creating artifacts immediately.

**Climax:** Two days later, he's been deep in Forge planning. He needs to switch to Helm. He runs the portfolio skill. In under 10 seconds, he sees:

```
helm    | Discovery | Ongoing (inferred) | Last: empathy-map (Apr 5) | Next: HC4 experiment design
forge   | Planning  | Blocked (explicit)  | Last: epic-phase-a (Mar 21) | Blocked: Gate 1 shadow engagement
gyre    | Complete  | Complete (explicit)  | Last: validation-report (Mar 23)
vortex  | Stable    | —                   | No recent activity
loom    | Build     | Ongoing (inferred)  | Last: team-factory agent (Apr 2) | Next: improvements from backlog
```

Thirty seconds. He knows exactly where Helm is, what he did last, and what's next. No folder diving. No re-reading. He picks up HC4 experiment design and starts working. The WIP radar flags: "5 active initiatives (threshold: 4)" and lists them by last-activity date. He decides Vortex (stable, no recent activity) can be deprioritized.

**Resolution:** Over the next month, Amalik stops dreading context switches. The portfolio view becomes his Monday morning ritual — scan, pick the highest-gravity initiative, dive in. The naming convention means he never opens the wrong file. The frontmatter means the portfolio skill gets smarter over time. He adds a 9th initiative and it slots in naturally — one line in the taxonomy config.

---

### Journey 2: Clara the Consulting Practitioner — "Which Client, Which Phase?"

**Opening Scene:** Clara is a mid-level consultant using Convoke across three client engagements. Each engagement has its own Vortex discovery cycle and Gyre readiness assessment. She context-switches between clients daily — sometimes hourly. Her `_bmad-output/` is a disaster: `persona-engineering-lead-2026-03-21.md` — is that Client A's or Client B's? She's accidentally presented Client A's empathy map in a Client B workshop. She maintains a personal spreadsheet to track which files belong to which engagement. It's always out of date.

**Rising Action:** After the I14 migration, every artifact carries its initiative in the filename and frontmatter. Clara discovers the taxonomy is extensible with a flat prefix convention: she adds `clienta-vortex`, `clientb-vortex`, `clientc-gyre` as initiative IDs in the `user` section of her taxonomy config. The naming convention adapts without breaking — no hierarchy needed, just prefix matching.

**Climax:** Clara runs the portfolio skill before her Thursday client sync. She filters by `clientb-*` and sees:

```
clientb-vortex | Discovery | Ongoing (inferred) | Last: hypothesis-hc3 (Apr 3) | Next: experiment design
clientb-gyre   | Not started | —                 | No artifacts yet
```

She knows exactly what to present and what's coming next. No spreadsheet. No wrong-client file panic. The flat taxonomy with glob filtering gives her the multi-client view without requiring structured hierarchy.

**Resolution:** Clara's efficiency improves visibly. Her engagement lead notices she's always prepared, always knows where things stand. She recommends Convoke to two other consultants on her team. The naming convention and portfolio skill become her competitive advantage — she manages more engagements with less overhead than colleagues using manual tracking.

---

### Journey 3: Dario the Platform Builder — "Is Helm Ready to Build?"

**Opening Scene:** Dario is building Convoke's next team module — Helm (Strategy). He needs to know: has discovery produced enough artifacts to start architecture? Are there open questions from the Vortex cycle? He opens `_bmad-output/vortex-artifacts/` and sees Helm files mixed with Forge files, Gyre files, and Strategy files. Some use `strategy-perimeter` in the name, some use `helm`. He's not sure if the scope decision and hypothesis contract are complete or still drafts.

**Rising Action:** Post-migration, every Helm artifact is prefixed `helm-` and carries frontmatter with an optional `status` field. The Vortex workflow that produced the scope decision set `status: validated` explicitly. The hypothesis contract, created before the migration, has no status field — the portfolio skill infers `validated` from the presence of a downstream HC4 experiment artifact. The portfolio output clearly marks which statuses are explicit and which are inferred.

**Climax:** He runs the portfolio skill:

```
helm | Discovery | Ongoing (inferred) | Last: hypothesis-hc3 (Apr 5) | Next: HC4 experiment — status: draft (inferred)
```

One glance: Helm isn't ready for architecture yet. The experiment needs to complete first. The `(inferred)` marker tells him this status comes from artifact chain analysis, not an explicit declaration — he trusts it because the chain logic is straightforward. He doesn't waste a sprint starting premature architecture work. He switches to Loom improvements instead — the portfolio shows those are unblocked.

**Resolution:** When Helm's experiment completes and the portfolio shows `helm | Discovery | Complete (explicit)`, Dario knows it's time. He pulls up all `helm-*` artifacts, reviews the validated chain (scope → problem → hypothesis → experiment → signal → decision), and starts architecture with full confidence that discovery is done.

---

### Journey Requirements Summary

| Capability | Revealed by Journey | Requirement |
|-----------|-------------------|-------------|
| Initiative-first filename sorting | All three | Naming convention with initiative as primary sort dimension |
| Frontmatter status field (optional) | Dario (draft/validated/superseded/active) | Closed enum, workflows set when they can, portfolio infers when absent |
| Two-tier status: explicit + inferred | Dario, Amalik | Portfolio output marks `(explicit)` vs `(inferred)` for transparency |
| Portfolio view with phase + status | All three | Core portfolio skill output |
| Context re-entry hint (last artifact + next action) | Amalik, Dario | Inference from git recency + artifact chain |
| WIP radar: flag + list | Amalik (5+ initiatives) | Flag overload, list initiatives by last-activity date. Operator decides response |
| Taxonomy as config file | Amalik (registration), Clara (client prefixes) | `_bmad/_config/taxonomy.yaml` with platform defaults + user extensions |
| Flat taxonomy with prefix matching | Clara (client filtering) | Portfolio skill supports prefix glob filtering, no hierarchy needed |
| Degraded mode | Clara (pre-migration on new engagements) | Filename inference when frontmatter absent |
| Dry-run manifest with human review | Amalik (ambiguous files) | Migration skill must surface unknowns for manual resolution |
| Artifact chain awareness | Dario (HC sequence completeness) | Portfolio infers discovery completeness from contract chain |

## Domain-Specific Requirements

### BMAD Method Compatibility

- Taxonomy file (`_bmad/_config/taxonomy.yaml`) must conform to BMAD config directory conventions
- Must not break existing BMAD installers (`convoke-install`), updaters (`convoke-update`), or validators (`convoke-doctor`)
- `_bmad/` directory paths are NOT renamed — only `_bmad-output/` artifacts are in scope
- `convoke-doctor` must validate taxonomy file structure and content

### Cross-Module Contract

- Frontmatter schema adoption must be incremental — modules adopt at their own pace
- Portfolio skill must produce consistent output regardless of which modules have adopted frontmatter
- No module should be *required* to emit frontmatter for its existing workflows to continue functioning
- **MVP adoption roadmap:** `bmad-create-prd` and `bmad-create-epics-and-stories` updated to emit frontmatter at creation time
- **Growth adoption:** `bmad-create-architecture`, `bmad-create-ux-design`, Vortex agent workflows
- Without a concrete adoption roadmap, "incremental" becomes "never" — the PRD commits to the MVP list above

### Git History Preservation

- All renames must use `git mv` to preserve rename detection
- **Hard requirement: two-commit migration strategy.** Commit 1 = renames only (git mv, no content changes — 100% similarity). Commit 2 = frontmatter injection (content changes to already-renamed files). This guarantees git sees pure renames and preserves full history via `git log --follow`
- The two commits must execute as an **atomic sequence** in the migration skill — no user pause between them
- Migration must verify `git log --follow` works for a sample of renamed files before completing

### Backward Compatibility

- `convoke-update` must not break on projects with pre-I14 artifacts (no frontmatter, old naming)
- `convoke-update` must include a migration that creates `taxonomy.yaml` with platform defaults for existing installations
- Portfolio skill's degraded mode is a backward compatibility requirement, not a convenience feature
- **P15 prerequisite check:** skill checks for `_bmad/_config/taxonomy.yaml` existence. If absent → clear error message. If present but no governed artifacts found → warning that degraded mode is active, suggest running migration
- Existing ADR archive structure (`_bmad-output/_archive/`) must be respected — migration does not touch archived files
- **Internal link updating:** migration must scan and update markdown links (`[text](filename.md)` patterns and frontmatter `inputDocuments` arrays) in `.md` files within `_bmad-output/`. Bounded to markdown files in `_bmad-output/` only — not code comments, not files outside the output directory. Dry-run manifest shows both renames AND link updates for operator review.

### Taxonomy Evolution

- `convoke-update` must merge new platform taxonomy entries without overwriting user extensions — same pattern as `config-merger.js` (seed defaults, preserve user additions)
- **Promotion logic:** if a user ID becomes a platform ID in a new release, auto-migrate from user to platform section
- **Taxonomy validation:** lowercase alphanumeric with optional dashes, no spaces, no special characters. Validated by `convoke-doctor`
- New initiative IDs shipped in Convoke releases appear automatically after update

## Innovation & Novel Patterns

### Detected Innovation Areas

1. **Convention-as-Automation** — The naming convention and frontmatter schema are not governance overhead — they are the machine-readable data layer that enables automated portfolio intelligence. This inverts the traditional relationship between standards and tooling: instead of "tooling enforces standards," here "standards enable tooling." The convention is the automation layer.

2. **Zero-Maintenance Portfolio Inference** — Portfolio status derived entirely from existing artifacts without requiring manual status updates. No tracking spreadsheet, no status field to maintain, no ceremony. The system observes what you produce and infers where you are. This is novel in the agentic AI tooling space where most project management requires explicit status tracking.

3. **Two-Tier Status Model** — Explicit status (set by workflows at creation) coexists with inferred status (derived from artifact chain analysis at read time). This solves the cold-start and adoption gap problem: the portfolio skill works immediately on legacy artifacts via inference, and improves as workflows adopt frontmatter emission. Degraded mode isn't a fallback — it's the adoption bridge.

4. **Governance Health Score** — Every portfolio output includes an adoption nudge: `Governance: 23/163 artifacts governed (14%) — run migration for full accuracy`. Not a gate, not nagging — a factual transparency signal that creates natural pull toward migration. Disappears when governance reaches 100%. Doubles as a trackable success metric.

### Status Enum Clarification

Two distinct status vocabularies serve two different purposes:

**Artifact-level status** (frontmatter field, optional, closed enum):
- `draft` — work in progress, not yet reviewed
- `validated` — reviewed and confirmed
- `superseded` — replaced by a newer artifact
- `active` — living document, currently maintained

**Initiative-level status** (portfolio output, derived by portfolio skill):
- `ongoing` — active work, recent artifacts or git activity
- `blocked` — explicit blocker identified (from frontmatter or artifact content)
- `paused` — operator has deprioritized (explicit)
- `complete` — all expected artifacts present and validated
- `stale` — technically ongoing but no git activity in 30+ days (inferred)
- `unknown` — insufficient signal to determine status

### Unknown Status Triggers

The portfolio skill produces `unknown` under specific, testable conditions:

1. **No artifacts match the initiative ID** — initiative exists in taxonomy but has zero files → phase: `unknown`, status: `unknown`
2. **Artifacts exist but no phase-determining artifacts** — no epic, no sprint plan, no discovery chain → phase: `unknown`, status inferred from git recency only
3. **Conflicting signals** — epic says "in-progress" but no git activity in 30+ days → phase: from epic, status: `stale (inferred)`

### Validation Approach

- **H1 (Convention-as-Automation):** Validate by measuring whether the portfolio skill produces accurate output *without* any manual status updates. Success: phase and status correct for all active initiatives using only artifact metadata and git history.
- **H2 (Zero-Maintenance):** Validate by tracking operator behavior — do they stop maintaining external tracking (spreadsheets, notes) within 2 weeks of P15 deployment?
- **H3 (Two-Tier Status):** Validate by comparing accuracy of inferred-only status vs explicit+inferred status. If inference accuracy is >80% on legacy artifacts, the two-tier model is justified.
- **H4 (Inference Failure):** When inference confidence is too low, the skill shows `unknown (inferred)` rather than guessing. Validate: zero false-confident inferences in first month of use.

### Risk Mitigation

- **Risk: Inference is wrong.** Mitigation: explicit `(inferred)` vs `(explicit)` markers in portfolio output. Operator always knows the confidence level.
- **Risk: Convention not adopted.** Mitigation: concrete MVP adoption roadmap (2 workflows) + convoke-doctor validation + governance health score in every portfolio output. Drift is detectable, not silent.
- **Risk: Schema locks in too early.** Mitigation: frontmatter `status` is optional. Schema can evolve by adding fields — existing artifacts remain valid.
- **Risk: Degraded mode "too good."** Mitigation: governance health score makes the quality gap visible. Every portfolio view shows governed vs total artifact count. The operator sees what they're missing, creating natural pull toward full adoption without enforcement.
- **Risk: Portfolio output at scale.** At 20+ initiative IDs, flat alphabetical view becomes unwieldy. Mitigation (Growth): grouped portfolio output by prefix (referencing Clara's persona — consultant with multiple client engagements). MVP acknowledges the limitation; filtered views (`clientb-*`) are the daily driver at scale.
