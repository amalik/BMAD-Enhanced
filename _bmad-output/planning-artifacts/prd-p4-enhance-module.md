---
stepsCompleted: [step-01-init, step-02-discovery, step-02b-vision, step-02c-executive-summary, step-03-success, step-04-journeys, step-05-domain-skipped, step-06-innovation]
inputDocuments:
  - _bmad-output/planning-artifacts/P4-enhance-module-architecture.md
  - _bmad-output/planning-artifacts/initiatives-backlog.md
workflowType: 'prd'
documentCounts:
  briefs: 0
  research: 0
  projectDocs: 2
classification:
  projectType: "Content Platform + Workflow System"
  domain: "Product Discovery / Innovation Methodology"
  complexity: "medium (v1 scope), with architectural note that the Enhance pattern establishes cross-module extension precedent"
  projectContext: brownfield
elicitation:
  methods_applied: [architecture-decision-records, stakeholder-round-table, first-principles-analysis, 5-whys-deep-dive]
  core_framing: "Closing the review-to-backlog feedback loop"
  success_metric: "80% reduction in time-to-backlog-update (currently 20-40 minutes manual)"
  incubation_angle: "Prove the Enhance pattern in Convoke, then propose upstream to BMAD core as dynamic extensions tag"
  adrs:
    - "ADR-1: Single install via convoke-install-vortex — no new CLI command"
    - "ADR-2: Verify workflow entry point in installer — additive-only patch, fail-fast on missing"
    - "ADR-3: Explicit user menu for mode selection (T/R/C) — no auto-detection"
    - "ADR-4: No mode switching — modes run independently, backlog file is shared state"
    - "ADR-5: Shared RICE scoring guide as reference doc in templates/"
  stakeholder_concerns:
    - "John PM: Triage mode is the highest-value deliverable"
    - "Winston: Cross-module coupling boundaries and failure isolation"
    - "Morgan: Installation path and package distribution for _enhance/"
    - "Wendy: Tri-modal workflow complexity and shared state"
    - "Emma: RICE scoring must feel like strategic conversation, not calculator"
    - "Max: Input format flexibility for diverse review transcript types"
  first_principles: "Core deliverable is RICE backlog workflow for John PM. The _enhance/ structure is an architectural investment. Option C chosen — full v1 with pattern establishment."
  vision:
    statement: "Convoke's Enhance module makes existing BMAD agents more capable. First enhancement — RICE backlog management for John PM — closes the feedback loop between review sessions and strategic prioritization."
    differentiator: "Going from chaos (a review transcript) to clarity (a scored, prioritized list) in one step. Not a new tool — a capability upgrade to an agent you already use."
    core_insight: "The bottleneck isn't generating findings, it's turning findings into prioritized action."
    interaction_model: "Agent proposes, human validates. Batch validation — John extracts all, scores all, presents in one shot, user validates in one pass."
    proof_of_concept_bar: "Zero lost findings + calibrated scoring = success"
  party_mode_refinements:
    - "Batch over individual — one interaction per phase, not one per finding"
    - "Success metric reframed to 80% reduction rather than absolute minutes"
    - "Deprecation question acknowledged but deferred to post-v1"
---

# Product Requirements Document - Convoke P4: Enhance Module

**Author:** Amalik
**Date:** 2026-03-14

## Executive Summary

Convoke P4 introduces the Enhance module (`_bmad/bme/_enhance/`) — a new submodule that upgrades existing BMAD agents with capabilities they don't have today. While Vortex adds new agent teams, Enhance makes agents you already use more powerful. The first enhancement is a RICE Initiatives Backlog workflow for John PM, closing the feedback loop between review sessions and strategic prioritization.

Today, after every multi-agent review cycle (party mode, adversarial review, retrospective), findings must be manually extracted, RICE-scored, and formatted into the initiatives backlog. This takes an estimated 20-40 minutes, produces inconsistent scoring, and risks losing findings. P4 automates this: John PM ingests a review transcript, extracts all findings, proposes RICE scores in batch, and presents them for human validation in a single pass. Agent proposes, human validates.

The workflow is tri-modal — Triage (ingest review findings), Review (rescore existing backlog), Create (build backlog from scratch) — with Triage as the critical path. All three modes reference a shared RICE scoring guide template for consistent calibration and write to the same backlog file. The workflow attaches to John PM via a single `<item>` tag added to `pm.md` — if removed, John works exactly as before. The Enhance module ships via the existing `convoke-install-vortex` installer with no new CLI commands.

P4 is deliberately scoped as Option C (full pattern establishment) rather than a minimal workflow addition, because the Enhance pattern — one module upgrading another module's agent — is the architectural proof-of-concept for a proposed BMAD core `<extensions>` mechanism. The v1 investment in directory structure, config, guide, and extension documentation serves that upstream goal. If the pattern proves valuable, it becomes the basis for declarative agent extensibility across the BMAD ecosystem.

**v1 scope:** Workflow content (11 step files, 3 modes), installer integration, menu patch, config, and guide. **Deferred:** Workflow manifests, skill manifests, BMAD external module registration, dynamic extensions mechanism, individual initiative files.

### What Makes This Special

The differentiation moment: a user finishes a 16-agent party mode session with pages of findings, tells John to triage them, and sees every finding extracted, scored, and formatted in one shot. Chaos to clarity in one step — with zero lost findings and calibrated scoring as the measurable proof. Not a new tool to learn — a capability upgrade to an agent they already trust.

Success metric: 80% reduction in time-to-backlog-update.

## Project Classification

- **Project Type:** Content Platform + Workflow System — the deliverable is markdown workflow step files and YAML config, shipped via npm
- **Domain:** Product Discovery / Innovation Methodology
- **Complexity:** Medium (v1 scope). Architectural note: this establishes the cross-module extension pattern — one module modifying another module's agent menu — which has higher complexity implications for future versions
- **Project Context:** Brownfield — extending Convoke v2.2.0, adding second submodule alongside Vortex

## Success Criteria

### User Success

- **Triage completes without lost actionable findings** — every actionable item (proposes a change, identifies a gap, or flags a risk) in a review transcript appears in the proposed batch. Observations and commentary excluded unless user escalates during validation.
- **Scoring requires minimal correction** — user accepts 80%+ of proposed RICE scores without modification. Guard: no more than 3 items with identical scores in the top 10 of the prioritized view.
- **Backlog update is fast** — under 10 minutes for a 12-finding transcript (baseline: estimated 20-40 minutes manual).
- **The interaction feels like strategic conversation** — RICE scoring questions prompt genuine reflection, not rubber-stamping.

### Business Success

- **The Enhance pattern works** — one module successfully extends another module's agent without breakage, coupling issues, or user confusion. Ready for upstream proposal to BMAD core as `<extensions>` mechanism.
- **Convoke positioning expands** — Enhance establishes Convoke as "Vortex + upgrades to existing agents," not just "Vortex."

### Technical Success

- **Zero test regressions** — existing John PM test suite passes unchanged after menu patch applied.
- **Installer integration clean** — `convoke-install-vortex` installs Enhance files alongside Vortex. `verifyInstallation()` confirms workflow entry point exists.
- **Idempotent** — running the installer twice produces identical results.
- **Update-resilient** — BMAD upstream updates to `pm.md` do not break the Enhance workflow (the `exec` path is stable).

### Measurable Outcomes

| Metric | Target | How Measured |
|--------|--------|-------------|
| Actionable findings extraction | 100% | Compare transcript findings to proposed batch |
| Score acceptance rate | 80%+ without modification | Count approved vs. adjusted scores |
| Score distribution health | No more than 3 identical scores in top 10 | Inspect prioritized view |
| Time-to-backlog-update | Under 10 min (12-finding transcript) | Stopwatch on real session |
| Installer success | Pass on first run | `verifyInstallation()` all checks green |
| Test regression | Zero failures | Existing PM test suite |

## Product Scope

### MVP — Minimum Viable Product

- **Triage mode** (4 step files) — ingest review transcript, extract actionable findings, propose RICE scores in batch, update backlog with user approval
- **Review mode** (3 step files) — load existing backlog, walk through items for rescoring, regenerate prioritized view
- **Create mode** (4 step files) — initialize new backlog, gather initiatives, score, generate prioritized view
- **Workflow entry point** — mode selection menu (T/R/C), shared RICE scoring guide template
- **Installer integration** — section 8 in `refreshInstallation()`, verification check, `package.json` files array. **Highest-risk MVP item** — only part that touches existing codebase.
- **Menu patch** — single `<item>` tag added to John PM's `pm.md`
- **Directory structure** — `_bmad/bme/_enhance/` with config.yaml, extensions/, workflows/, guides/, templates/
- **Lean guide** — half-page `ENHANCE-GUIDE.md` (30-minute writing budget). Audience: end users + future module authors.

### Growth Features (Post-MVP)

- **Individual initiative files** (v2) — per-item markdown files with RICE frontmatter, auto-generated summary view
- **Cross-agent routing** — "next actions by agent" section in backlog output
- **Additional enhancement workflows** — second and third workflows for other BMAD agents (candidates TBD based on usage)

### Vision (Future)

- **Dynamic `<extensions>` tag** (v3) — proposed BMAD core mechanism for declarative agent extensibility
- **Enhance ecosystem** — multiple modules contributing enhancements to shared agents
- **BMAD external module registration** — Convoke listed in `external-official-modules.yaml`

### Architecture Constraints (from ADRs)

- **ADR-1:** Single install via `convoke-install-vortex` — no new CLI command
- **ADR-2:** Verify workflow entry point in installer — additive-only patch (`<item>` tag removable, John works without it), fail-fast on missing files
- **ADR-3:** Explicit user menu for mode selection (T/R/C) — no auto-detection
- **ADR-4:** No mode switching — modes run independently, backlog file is shared state
- **ADR-5:** Shared RICE scoring guide as reference document in templates/

## User Journeys

### Journey 1: Product Owner — Triage After Review (Happy Path)

**Amalik** just wrapped a 45-minute adversarial review of the Vortex handoff contracts. The transcript is 3 pages — a mix of sharp findings, tangential observations, and a few "nice to have" suggestions buried in the noise. Normally, he'd copy-paste findings into the backlog, wrestle with RICE scores for each one, and try to slot them into the prioritized view. It takes 30 minutes and the scoring is inconsistent.

**Opening Scene:** Amalik closes the review session. He invokes `/bmad-pm`, John PM loads, and Amalik tells him to triage the review. He pastes the transcript — raw, unformatted, as-is.

**Rising Action:** John parses the transcript and extracts 9 actionable findings, discarding 4 observations and 2 compliments. He presents the extraction batch first: "Here are the 9 findings I pulled. Review them before we score — did I miss anything? Should any be removed?" He also flags 2 potential overlaps: "Finding #3 looks similar to existing item P2 in the backlog, and finding #7 may overlap with D5. For each: merge into existing, skip, or add as new?" Amalik confirms 8 findings, flags 1 as noise, adds 1 John missed, merges finding #3 into P2, and keeps #7 as a separate item.

Then John proposes RICE scores for all 9 confirmed findings in batch. The scoring questions feel like a strategic conversation — "This one scores high on Reach because it affects all 7 Vortex agents — does that match your sense of blast radius?"

**Climax:** Amalik scans the 9 score proposals. He adjusts 1 (Confidence was too high on a speculative item), accepts the other 8 as-is. One pass. Done.

**Resolution:** John appends 8 new items and updates 1 existing item (P2 merge) in the initiatives backlog with provenance tags ("Added from adversarial review, 2026-03-14"), regenerates the prioritized view, and the changelog entry reads today's date. Amalik sees the new items ranked against existing work. Total time: 7 minutes.

### Journey 2: Product Owner — Triage from Non-BMAD Source

**Amalik** took notes during a planning call about Convoke's positioning. The notes are in a markdown file — bullet points, half-sentences, a few questions. Not a BMAD review transcript at all.

**Opening Scene:** Amalik invokes `/bmad-pm`, John PM loads, and Amalik tells him to triage his planning notes. He pastes the markdown.

**Rising Action:** John parses the unstructured input and presents his extraction: 5 actionable items (feature ideas, a gap to address, a risk to mitigate) and 3 ambiguous items flagged separately — "These look like questions rather than findings. Should I treat them as exploration candidates or skip them?" He also checks for overlaps against the existing backlog — none found. Amalik reviews the extraction, confirms all 5 actionable items, and says "exploration candidates for 2 of the ambiguous ones, skip the third."

John then scores the 7 items (5 actionable + 2 exploration candidates) in batch, presenting them with adjusted categories.

**Climax:** Amalik validates all 7 scores in one pass.

**Resolution:** 7 items added to the backlog with provenance ("Added from planning call notes, 2026-03-14"). The format flexibility means John works with whatever input Amalik has — not just BMAD transcripts.

### Journey 3: Product Owner — Zero Actionable Findings (Edge Case)

**Amalik** runs a code review on a well-built feature. The transcript is mostly confirmations and minor style preferences — nothing actionable.

**Opening Scene:** Amalik invokes `/bmad-pm`, John PM loads, and Amalik tells him to triage the review transcript.

**Rising Action:** John parses the transcript and finds 0 actionable findings. No proposed changes, no gaps, no risks — just affirmations.

**Climax:** John reports: "I found 0 actionable findings in this transcript. 6 items were observations or confirmations. Nothing to add to the backlog." Then offers the escape hatch: "Did I miss something? If you believe there are findings I didn't catch, highlight specific passages and I'll re-examine them."

**Resolution:** Amalik either moves on (nothing missed) or highlights a passage John re-examines. The workflow handled the edge case gracefully — no wasted time, no noise in the backlog, no silent misses.

### Journey 4: BMM Team Consumer — Reading the Backlog

**Winston** (the architect) needs to frame the next epic. He opens `initiatives-backlog.md` and scans the prioritized view.

**Opening Scene:** Winston sees the ranked list — RICE scores, categories, status. The top 3 items are infrastructure work he's been expecting.

**Rising Action:** He reads the item descriptions. Each has enough context — title, category, and provenance tags showing source and date ("Added from adversarial review, 2026-03-14"). Items that were rescored show the change: "Rescored 4.2→6.1, Review mode, 2026-03-12" — so he understands not just the current ranking but how it evolved. He doesn't need to ask Amalik what "D7" means — the backlog is self-documenting.

Winston's trust in the ranking grows over cycles. The first time, he cross-checks a few scores against his own intuition. By the third triage cycle, provenance and consistent scoring have built confidence — the ranking reflects strategic priority, not arbitrary numbers.

**Resolution:** Winston frames the epic around the top-ranked item. He never touched John PM, never ran the workflow. The backlog output — with its provenance, rescore history, and scoring context — was his interface.

### Journey 5: Module Author — Adding a Second Enhancement

**A developer** wants to add a "Sprint Health Check" enhancement for the SM agent. They've seen the RICE backlog workflow and want to follow the pattern.

**Opening Scene:** They read `ENHANCE-GUIDE.md` — half a page. It explains the directory structure, how to create a workflow, how to patch an agent menu, and the discoverability contract: every new workflow must be registered in `config.yaml` — the installer reads config to discover what to deploy.

**Rising Action:** They create `_bmad/bme/_enhance/workflows/sprint-health/` with step files following the same structure as the backlog workflow. They add an `<item>` tag to `sm.md`. They register the new workflow in `config.yaml`.

Before first use, they run the validation command. It confirms: "Workflow has 4 steps, entry point resolves correctly, menu patch for sm.md is valid, config.yaml registration found." If they'd forgotten the config registration, validation would have caught it: "Workflow directory found but not registered in config.yaml."

**Climax:** They run `convoke-install-vortex`. The installer reads `config.yaml`, discovers the new enhancement workflow, and deploys it alongside the existing backlog workflow.

**Resolution:** SM now has a "Sprint Health Check" menu item. The Enhance pattern worked — no framework changes, no installer modifications, just content files, a config entry, a menu patch, and a passing validation.

### Journey Requirements Summary

| Journey | Key Capabilities Revealed |
|---------|--------------------------|
| J1: Triage happy path | Transcript parsing, finding extraction, deduplication detection against existing backlog (merge/skip/add), two-gate validation (extraction then scoring), batch RICE scoring, backlog append with provenance, prioritized view regeneration |
| J2: Non-BMAD input | Flexible input parsing, ambiguity detection, exploration candidate handling, overlap checking, provenance tagging by source type |
| J3: Zero findings | Graceful empty-result handling, no manufactured findings, escape hatch for user-directed re-examination |
| J4: BMM consumer | Self-documenting backlog output, provenance tags (source + date), rescore provenance (old→new score with mode and date), readable prioritized view, trust builds over cycles |
| J5: Module author | Guide documentation, discoverability contract (config.yaml registration required), workflow validation command (structure, entry point, menu patch, config), installer error on missing registration, pattern replicability |

## Innovation & Design Patterns

### Primary Innovation: Two-Gate Batch Validation Model

Most agentic workflows offer binary validation (accept/reject) or per-item confirmation. The Enhance backlog workflow introduces a third pattern: batch presentation with two distinct validation gates — extraction review (pattern recognition) then scoring review (calibration). This separates "did the agent find the right things?" from "did the agent quantify them correctly?" — matching how human cognition actually works. Gate 1 shows findings + categories + overlap flags only (no scores). Gate 2 shows findings + RICE scores + rationale only (extraction settled). Three touchpoints total: review findings, review scores, confirm output.

### Application Domain: Closed Review-to-Backlog Feedback Loop

Review sessions produce unstructured findings. The backlog requires structured, scored, ranked items. The gap between these formats is where findings get lost. The RICE backlog workflow closes this loop in one step — unstructured input to structured, scored output — with provenance tracking that connects every backlog item back to its source.

### Delivery Mechanism: Cross-Module Agent Extension

The Enhance pattern brings the extension/plugin model to BMAD's agent ecosystem, where agents have been closed systems. Novel in context, not in concept. This is a strategic infrastructure investment, not a user-facing innovation. Its value is measured by whether it unlocks the `<extensions>` mechanism, not by user experience impact. The v1 implementation serves as an incubation proof for a proposed upstream mechanism.

### UX Design Principles

*Note: These principles generate specific functional requirements in the Functional Requirements section.*

- **Information separation between gates** — no scores at Gate 1, no extraction re-decisions at Gate 2
- **Gate 2 removal allowance** — users can drop items during scoring without returning to Gate 1
- **Completion summary** — after backlog update, show what was added/merged/changed + new top 3 positions. Serves dual purpose: UX closure and trust-building mechanism.
- **Rationale visibility** — every RICE score includes a one-line rationale, not just the number

### Innovation Hypotheses

*Note: These are observational metrics for the product owner to assess over multiple sessions, not instrumented telemetry in the workflow.*

- **H1 (Gate effectiveness):** Extraction modification rate >2x scoring modification rate — confirming the gates focus attention on distinct cognitive tasks
- **H2 (Batch efficiency):** Time-per-item validation decreases as batch size increases — confirming cognitive warm-up effect. If time-per-item *increases*, batch model breaks down and pagination is needed.
- **H3 (Trust building):** Completion summary increases user confidence that nothing was lost — measured by whether users re-check the backlog after triage (lower re-check rate = higher trust)

### Risk Mitigation

- **Two-gate overhead:** If users find two gates tedious, the extraction gate can be made optional (auto-confirm if confidence is high). Start with both gates to validate the model.
- **Gate rigidity:** Strict separation may feel rigid if users want to annotate during extraction. v1 starts strict to validate; if users consistently try to score during extraction, consider lightweight annotation in v2.
- **Batch size limits:** Large transcripts (30+ findings) may make batch review overwhelming. Consider pagination or grouping by category if batch exceeds 15 items. H2 will signal when this threshold is hit.
- **Extension pattern coupling:** If BMAD upstream changes `pm.md` structure, the `<item>` patch may break. Mitigated by ADR-2 (fail-fast verification on install).
