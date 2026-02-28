---
stepsCompleted: [step-01-init, step-02-discovery, step-03-success, step-04-journeys, step-05-domain, step-06-innovation, step-07-project-type, step-08-scoping, step-09-functional, step-10-nonfunctional, step-11-polish, step-12-complete]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/product-brief-BMAD-Enhanced-2026-02-22.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/epics.md
  - _bmad-output/implementation-artifacts/epic-1-retro-2026-02-24.md
  - _bmad-output/implementation-artifacts/epic-2-retro-2026-02-25.md
  - _bmad-output/implementation-artifacts/epic-3-retro-2026-02-25.md
  - _bmad-output/implementation-artifacts/epic-4-retro-2026-02-26.md
  - _bmad-output/implementation-artifacts/epic-5-retro-2026-02-26.md
  - docs/agents.md
  - docs/testing.md
  - docs/development.md
  - docs/faq.md
workflowType: 'prd'
documentCounts:
  briefs: 1
  research: 0
  projectDocs: 4
  existingPRD: 1
  architecture: 1
  epics: 1
  retrospectives: 5
classification:
  projectType: "Developer Tool + Content Platform (hybrid)"
  domain: "Product Discovery / Innovation Methodology"
  complexity: medium
  projectContext: brownfield
  phase2Shape: "Stabilize + Targeted Growth (Shape B)"
  guidingPrinciple: "Quality and usability before speculative features"
elicitation:
  methods_applied:
    - "First Principles Analysis — stripped speculative features, rebuilt from truths"
    - "Stakeholder Round Table — 5 perspectives converged on trust and usability"
    - "What If Scenarios — validated P0+journey combo, deferred Liam workflows"
    - "Pre-mortem Analysis — 6 failure modes with preventions"
  key_insights:
    - "Phase 2 feature list was written before the product existed — speculative"
    - "5 of 7 agents have no P0 validation — quality gap is the real risk"
    - "Docs are stale with live 404s — first thing new users hit"
    - "P0 testing process produces the journey example — two deliverables, one process"
    - "Test handoff chain compatibility, not just individual agents"
    - "Content correctness tests must validate semantics, not syntax"
    - "Scope freeze rule prevents creep back to full Phase 2"
    - "Phase 2 is quality, not growth. Growth is Phase 3."
  failure_preventions:
    - "FM1: Programmatic audit before docs fix (grep stale numbers, deleted paths)"
    - "FM2: Handoff compatibility tests in every P0 suite"
    - "FM3: Journey example captured from real run, not authored"
    - "FM4: Content tests validate semantics not syntax"
    - "FM5: Scope freeze rule — additions require explicit decision"
    - "FM6: PRD acknowledges Phase 2 ≠ growth"
version: "2.0.0"
---

# Product Requirements Document - BMAD-Enhanced Phase 2

**Author:** Amalik
**Date:** 2026-02-28

## Project Discovery

BMAD-Enhanced is an AI-powered product discovery framework that shipped its v1.6.0 "Innovation Vortex" — 7 specialized agents guiding teams from contextualization through validated learning. Phase 1 built the product. Phase 2 makes it trustworthy: fixing stale documentation, validating every agent's output, proving the chain works end-to-end, and giving new users a compelling first impression. Without Phase 2, growth efforts in Phase 3 would drive users to a product that contradicts its own documentation and ships untested agent chains.

*Document navigation for implementation planning: Functional Requirements (§8), Non-Functional Requirements (§9), Execution Order (§5.2), Developer Tool Requirements (§6).*

### Classification

| Field | Value |
|-------|-------|
| **Project Type** | Developer Tool + Content Platform (hybrid) |
| **Domain** | Product Discovery / Innovation Methodology |
| **Complexity** | Medium |
| **Project Context** | Brownfield (extending v1.6.0) |
| **Phase 2 Shape** | Stabilize + Targeted Growth (Shape B) |

### Phase 2 Guiding Principles

1. **Quality and usability before speculative features.** The Vortex shipped 2 days ago with zero user feedback. Phase 2 makes what we shipped trustworthy and usable.
2. **Phase 2 is quality, not growth.** Growth (marketing, community, discoverability) is Phase 3. Phase 2 makes the product *ready* for growth.
3. **Scope freeze rule.** Deliverable list is fixed at PRD approval. Any addition requires explicit scope change decision. Deferred items are commitments, not suggestions.

### Priority Stack

*Priorities reflect dependency order: each deliverable unblocks the next. See [Execution Order](#execution-order) for the full dependency-driven implementation sequence.*

| # | Priority | Type | Prevention |
|---|----------|------|------------|
| 1 | **Fix stale docs** | Hygiene (URGENT) | Programmatic audit first — grep for stale numbers and deleted paths |
| 2 | **P0 test suites + journey example** | Quality + Usability | Run all 7 agents on busy parents domain. Validate handoff chain compatibility. Capture real artifacts as journey example. |
| 3 | **Expand content correctness testing** | Quality | Test semantics not syntax. Follow dead-end detection pattern. |
| 4 | **Close CLI coverage gaps** | Tech debt | bmad-update.js (29%), bmad-version.js (56%), legacy migration (37%) |

### Explicitly Deferred (until user demand proven)

- Agent enable/disable toggle
- Workflow template variants (quick/deep)
- Cross-agent orchestration ("full Vortex run")
- HC9/HC10 mid-workflow interrupt pattern
- Dedicated SCAMPER / worst-possible-idea workflows for Liam
- Deeper signal interpretation workflows for Noah

*Elicitation methods applied during discovery are documented in [Elicitation History](#elicitation-history).*

## Success Criteria

### User Trust

| Gate | Criteria | Measurement | FR Coverage |
|------|----------|-------------|-------------|
| **Zero stale references** | Every user-facing doc reflects 7-agent, 22-workflow, 268-test reality | Programmatic grep audit returns zero hits for stale patterns | FR1-2, FR4-5 |
| **Zero broken links** | All internal links in docs/ resolve to existing files | Link checker pass — zero 404s | FR3, NFR18 |
| **Accurate first impression** | New user from install to first agent invocation encounters no contradictions | Manual walkthrough captured during P0 | FR6, FR26-29, FR34 |

### Product Correctness

| Gate | Criteria | Measurement | FR Coverage |
|------|----------|-------------|-------------|
| **7/7 P0 validated** | Every agent has a P0 suite. Content-only agents (Mila, Liam, Noah, Isla, Max): activation, workflow execution, output quality, voice consistency. Infrastructure agents (Emma, Wade): same + integration checks. | P0 suite exists and passes for all 7 | FR7-12 |
| **Handoff chain validated** | Each artifact contract (HC1-HC5) tested: Agent A's output contains all fields Agent B's step-02 requires | At least one handoff compatibility test per artifact contract | FR13-15 |
| **Journey example captured + reviewed** | Complete 7-agent run on busy parents domain. Artifacts captured at every handoff. Editorial review confirms pedagogical quality. | Journey document exists with real artifacts + editorial sign-off | FR16-19 |

### Engineering Confidence

| Gate | Criteria | Measurement | FR Coverage |
|------|----------|-------------|-------------|
| **Content correctness validation in CI** | Agent definitions, workflow references, and handoff schemas validated for stale cross-references, mismatched fields, and structural inconsistencies | Content correctness tests pass in CI, following dead-end detection pattern | FR20 |
| **CLI coverage matches project standard** | bmad-update.js and bmad-version.js coverage at 85%+ lines. Legacy migration coverage documented but not targeted for 85%. | Coverage report per module | FR21-22 |
| **Zero bugs the test suite should have caught** | Post-release: no patches required for issues that existing or new tests should have detected. Patches for genuinely novel issues are acceptable. | Post-release review at 7 days | FR33 |

### Measurable Outcomes (Aggregate Targets)

*Gate tables above define per-criterion pass/fail. These aggregate targets provide the release-readiness dashboard view:*

- **P0 pass rate:** 100% across all 7 agents (gates: Product Correctness)
- **Docs accuracy:** Zero grep hits for stale patterns post-fix (gate: User Trust)
- **Handoff coverage:** 5/5 artifact contracts (HC1-HC5) validated (gate: Product Correctness)
- **Content correctness:** Validation tests operational in CI (gate: Engineering Confidence)
- **CLI coverage:** 85%+ for bmad-update.js and bmad-version.js (gate: Engineering Confidence)
- **Feedback mechanism:** Structured feedback prompt operational — users can submit in under 30 seconds without leaving IDE (FR30, NFR17)
- **Release gate:** All 9 gate criteria pass before `npm publish`

## Product Scope

*Detailed scope with execution order, risk mitigation, and phased roadmap is in [Project Scoping & Phased Development](#project-scoping--phased-development). This section provides the strategic summary.*

### Phase 2 Deliverables (7)

1. **Docs fix (two-pass)** — All user-facing pages reflect 7-agent reality. Zero stale references, zero broken links.
2. **P0 test suites for all 7 agents** — Two templates: infrastructure (Emma/Wade) and content-only (Mila/Liam/Noah/Isla/Max). No pivot — all 7 automated.
3. **End-to-end journey example** — Captured from real runs on busy parents domain. Editorially reviewed.
4. **Content correctness testing** — Agent definitions, workflow references, handoff schemas validated in CI.
5. **CLI coverage gaps** — bmad-update.js and bmad-version.js at 85%+.
6. **README as landing page** — Discovery experience with example output showcase and visual chain overview.
7. **Structured feedback prompt** — Low-friction mechanism for users to submit quality issues, missing capabilities, or general comments. Repo-only (GitHub issue template or local file). Under 30 seconds, no IDE exit.

### Post-Phase-2 Growth

*Phase 3 shifts from quality to growth. These items become relevant only after Phase 2 proves the product is trustworthy and usable:*

- Multi-domain journey examples
- Agent compatibility validation for custom agents
- Full automated regression beyond P0

## User Journeys

*Raya (Journey 1) is the primary persona for Phase 2 — her experience drives the most FRs (FR1-6, FR16, FR26-29, FR34) and validates the most deliverables (D1, D3, D6). If Phase 2 works for Raya, the quality and documentation improvements cascade to all other personas.*

### Journey 1: The New Adopter — "Is this real?"

**Raya**, a solo founder building a B2B SaaS for freelancer invoicing. A colleague sends her a GitHub link to BMAD-Enhanced. She's been using Claude in her IDE but feels scattered — research in one chat, brainstorming in another, no structure connecting them.

**Opening Scene:** Raya reads the README. She sees "7 Innovation Vortex streams" and a visual showing how agents connect. She's intrigued but skeptical — she's seen frameworks that promise structure and deliver templates. She clicks into the docs to see what agents actually do.

**Rising Action:** She runs `npx bmad-enhanced` to install. She invokes Emma to contextualize her invoicing product. The conversation feels like working with a sharp colleague, not filling out a form. Emma produces a Contextualize Brief. Then she sees the Vortex Compass suggesting Isla next. She follows the thread — Isla takes Emma's output and runs empathy research. The handoff is seamless; Isla already knows what Emma established.

**Climax:** She clicks the journey example link from the README — one click from where she landed. She sees a complete 7-agent run on the busy parents domain with real artifacts at every handoff. She sees the chain working: Emma → Isla → Synthesize → Hypothesize → Wade → Sensitize → Max. She thinks: "This is what my scattered Claude sessions are missing."

**Failure Branch:** Raya tries to invoke Synthesize without running Isla first. The Vortex Compass provides clear prerequisite guidance — she needs empathy artifacts as input. She learns the chain has structure, not just suggestions. She runs `/bmad-help` and finds the FAQ explaining the agent sequence.

**Resolution:** Raya finishes her first session with a Contextualize Brief and an Empathy Map. She keeps going the next day — running Synthesize to converge her research. BMAD-Enhanced becomes her product discovery backbone.

**Phase 2 dependency:** Stale docs → she bounces at the README. Broken links → she loses trust. No journey example → she never sees the chain. Inconsistent agent output → handoff feels broken. Journey example not linked from README → she never finds it.

---

### Journey 2: The Returning User — "Did the update break anything?"

**Tomás**, a PM at a small startup. He installed BMAD-Enhanced three weeks ago at v1.5.2 and has been using Emma and Wade regularly. He has custom TEA agents in his manifest. He sees on GitHub that v1.6.4 is out with 7 agents instead of 4. This journey validates fixes already shipped in v1.6.4.

**Opening Scene:** Tomás runs `npx bmad-update`. It says "Already up to date" — but he knows 1.6.4 exists. The output prints a cache hint automatically: "If you expected a newer version, npx may be serving a cached copy." He runs the suggested command.

**Rising Action:** The update pulls v1.6.4. His manifest regenerates — his custom TEA agents survive the merge. He checks his `/tea` slash command. It works. He checks whether his existing `_bmad-output/` artifacts from v1.5 are still compatible with updated agents — the UPDATE-GUIDE includes a forward-compatibility note confirming they are.

**Climax:** He looks at the README to understand what changed. The docs accurately reflect 7 agents, 22 workflows, 268 tests. Links work. He finds the journey example showing how the three new agents (Synthesize, Hypothesize, Sensitize) fit between the four he already knows.

**Resolution:** Tomás upgrades with confidence. His custom agents survive, the docs orient him to what's new, and the journey example shows him exactly where Synthesize and Hypothesize fit in his existing Emma → Isla → Wade flow.

**Phase 2 dependency:** npx cache hint in output (done in v1.6.4). Manifest merge (done in v1.6.4). Docs accuracy and journey example are Phase 2 deliverables. Forward-compatibility note in UPDATE-GUIDE is a docs fix item.

---

### Journey 3: The Journey Follower — "Oh, that's how it all connects"

**Priya**, a head of product at a 12-person startup. She ran Emma once, got a solid Contextualize Brief, but stared at the Vortex Compass thinking: "Where do I actually go from here?"

**Opening Scene:** Priya finds the journey example — a complete 7-agent run on the busy parents domain. She starts reading. Each section is self-contained enough to understand individually, but the full narrative rewards linear reading.

**Rising Action:** She follows the chain. Each section shows the real artifact that was produced. Emma's brief flows into Isla's empathy maps. Isla's research feeds Synthesize, who converges three personas into a single JTBD problem definition. She sees what Synthesize does that Isla doesn't — convergence vs divergence clicks for the first time. At each handoff, an annotation calls out: "Synthesize consumed the JTBD field from Isla's output — this is artifact contract HC2."

Hypothesize takes the definition and runs brainwriting. The 4-field hypothesis contract lands on Wade's desk. Wade designs an experiment around the riskiest assumption. Sensitize picks up the graduated experiment and shows what to monitor in production. Max receives interpreted signals and makes a Persevere decision.

**Climax:** She sees the annotated artifacts with handoff callouts showing which fields each agent consumed and which artifact contract applies (HC1-HC5). The chain is concrete, not abstract. Every transition is explained.

**Resolution:** Priya goes back to her own project knowing exactly which agent to invoke next and why. The journey example didn't teach theory — it showed a real run she can pattern-match against. When she gets stuck, she runs `/bmad-help` for guidance.

**Phase 2 dependency:** No journey example → she uses Emma standalone and never sees the chain. Authored/fake artifacts → she spots inconsistency. Missing handoff annotations → she doesn't understand what flows between agents. Poor editorial quality → narrative confuses instead of clarifies.

---

### Journey 4: The Module Extender — "I want to make this my own"

**Kai**, a technical PM who's been using BMAD-Enhanced for a month. He wants domain-specific agents — a compliance reviewer for his fintech product.

**Opening Scene:** Kai copies an existing agent row in `agent-manifest.csv`, changes the name, and creates a markdown file. His new agent works — but it's a shallow wrapper with no persona depth. He adds three more hand-rolled agents.

**Rising Action:** His manifest grows to 11 agents. Slash commands are cluttered. His custom agents give generic advice because they lack identity structure — no communication style, no principles, no activation sequence. Then the real trigger: his hand-rolled compliance agent fails to produce output that Synthesize can consume. The handoff breaks silently.

**Climax:** Agent bloat plus broken handoffs. More agents doesn't mean better discovery. Each addition dilutes the Vortex's signal. The failure drives him to investigate — he compares his agent's output to the journey example and sees the missing fields. The journey example is the implicit format reference showing what a well-formed agent produces.

**Resolution:** Kai discovers BMB (the module builder) as the fix. He uses BMB to rebuild his compliance agent with proper persona depth — communication style, principles, activation sequence, output format matching the BME standard. His rebuilt agent produces outputs that slot into the Vortex chain. He removes the three shallow agents. The extension works because it follows the format the journey example demonstrated. *(Note: Kai's resolution uses existing BMB capabilities. Phase 2 contributes the journey example as implicit format reference and the extension guidance docs — not BMB improvements.)*

**Phase 2 dependency:** No extension guidance → agents proliferate without structure. No bloat warning → UX degrades silently. P0 suites serve as implicit quality reference. Journey example as living schema documentation reduces the custom agent compatibility gap. Docs should explain BMB and forking as proper extension paths.

---

### Journey 5: The Maintainer — "Will this update break someone's setup?"

**Amalik** ships BMAD-Enhanced. Sole maintainer — every release goes through him. No QA team, no staging with real user setups.

**Opening Scene:** Tests pass. CI is green. 268 tests, 83%+ coverage. He opens a terminal to publish. He pauses.

**Rising Action:** Did `refreshInstallation` handle the manifest correctly? Will someone with custom agents lose their rows? Will guides copy to the right place? Will someone on v1.5.2 with the npx cache issue even get this version? Each fix in v1.6.x was reactive — a user hit the problem, he patched it. The test suite validates code paths but doesn't validate what a real user experiences during upgrade.

**Climax:** He can't simulate "Tomás with a 3-week-old install and custom agents runs bmad-update." Integration tests mock the filesystem. They prove functions work. They don't prove the experience works. The gap between "tests pass" and "safe to ship" is filled by his memory of past bugs.

**Resolution (Phase 2):** P0 suites validate every agent's output — not just that code runs, but that artifacts contain fields downstream agents need. Handoff tests prove the chain works. Content correctness tests catch stale references before users do. CLI coverage closes the under-tested modules (bmad-update at 29%, bmad-version at 56%). He still pauses before `npm publish` — but the pause is shorter. The test suite catches the bug categories that burned him in v1.5 through v1.6.4.

**Phase 2 dependency:** No P0 suites → agent changes go out unvalidated. No handoff tests → field renames silently break chains. No content tests → stale text ships. Low CLI coverage → update bugs found by users, not CI.

---

### Journey Requirements Summary

| Requirement | Revealed By | Phase 2 Deliverable |
|-------------|-------------|-------------------|
| Accurate docs with zero stale references and zero broken links | Raya (J1), Tomás (J2) | Docs fix (D1) |
| Journey example linked from README (one click) | Raya (J1), Priya (J3) | Docs fix (D1) + README (D6) |
| Journey example with real captured artifacts and handoff annotations | Raya (J1), Priya (J3), Tomás (J2) | Journey example (D3) |
| Journey sections self-contained + editorially reviewed | Priya (J3) | Journey example (D3) |
| Agent voice consistency and handoff chain compatibility (HC1-HC5) | Raya (J1), Amalik (J5) | P0 suites (D2) |
| Agent prerequisite guidance via Vortex Compass | Raya (J1) | P0 suites (D2) |
| Extension path guidance with bloat warning + BMB recovery path | Kai (J4) | Docs fix (D1) |
| Journey example as implicit agent format reference | Kai (J4), Priya (J3), Amalik (J5) | Journey example (D3) |
| Forward-compatibility note in UPDATE-GUIDE + npx cache hint | Tomás (J2) | Docs fix (D1) + CLI (D5) |
| P0 suites as pre-publish confidence gate | Amalik (J5) | P0 suites (D2) |
| Content correctness tests in CI | Amalik (J5) | Content correctness (D4) |
| CLI coverage at 85%+ for update modules | Amalik (J5) | CLI coverage (D5) |
| `/bmad-help` and FAQ as "stuck" escape hatch | All journeys | Docs fix (D1) |

### Journey Dependencies (Machine-Readable)

| Journey | Blocks On | Deliverable | FR Coverage |
|---------|-----------|-------------|-------------|
| Raya | Stale docs, broken links, no journey example, no README landing page | D1, D3, D6 | FR1-6, FR16, FR26-29 |
| Tomás | Stale docs, broken manifest merge, no forward-compat note | D1, D2 | FR3-6, FR11 |
| Priya | No journey example, no handoff annotations, poor editorial quality | D3 | FR16-19 |
| Kai | No extension guidance, no bloat warning, no format reference | D1, D4 | FR23-25 |
| Amalik | No P0 suites, no handoff tests, no content tests, low CLI coverage | D2, D4, D5 | FR7-15, FR20-22 |

### Cross-Cutting Notes

- **Phase 2 ensures quality, not retention.** If a user arrives, has a correct and trustworthy experience, and still leaves — that's a product-market fit question for Phase 3, not a quality gap for Phase 2.
- **Organic discovery is Phase 3's problem.** Phase 2 users arrive via recommendation or direct link, not organic search. Phase 2 includes README-as-landing-page (FR26-29) to make the first impression compelling, but marketing, SEO, and community outreach are Phase 3.
- **Journey example serves triple duty:** pedagogical document for Priya, implicit format reference for Kai, and living proof of chain integrity for Amalik.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-Solving MVP — deliver the minimum that makes existing users say "this works reliably now" before adding anything new. Phase 2 validates *product reliability*, not product-market fit. Reliability is the prerequisite; fit is Phase 3.

**Resource Requirements:** Solo maintainer (you), ~5-7 weeks of focused effort across 7 deliverables.

### Execution Order

Solo maintainer means sequential work — the order *is* the strategy. Dependencies dictate sequence:

1. **Docs Fix Pass 1** — Zero dependencies. Fix stale content + broken links. Ship immediately.
2. **P0 Suites: Emma + Wade** — Infrastructure agents first (JS + content tests). Establishes P0 template.
3. **P0 Suites: Content-Only Agents** — Apply content-only template to Mila, Liam, Noah, Isla, Max. No pivot — commit to automated P0 for all 7.
4. **Content Correctness / Handoff Tests** — HC1-HC5 contract validation. Overlaps with P0 work.
5. **Journey Example** — Benefits from everything before it being stable. Cherry-picked captures from real runs on busy parents domain.
6. **CLI Coverage** — Independent. bmad-update.js, bmad-version.js. Legacy migration gets documented exception.
7. **README as Landing Page + Example Output Showcase** — Transform README into a discovery experience: clear value proposition, example output previews, visual chain overview. Depends on journey example existing.
8. **Docs Fix Pass 2** — Add journey example link + discovery elements. Ships only after journey and README landing page exist. Re-scan fixed docs before this pass to catch inconsistencies introduced by Pass 1 edits.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**

| Journey | MVP Coverage | Key Deliverable |
|---------|-------------|-----------------|
| Raya (New Adopter) | Full — README as landing page, example output showcase, accurate docs | Docs Fix + README Landing Page |
| Tomás (Returning User) | Full — upgrade path works, no stale content | Docs Fix + P0 Suites |
| Priya (Journey Follower) | Full — annotated walkthrough exists | Journey Example |
| Kai (Module Extender) | Deliberately Deferred — handoff contracts documented, but custom agent compatibility tooling is Phase 3 | Content Correctness |
| Amalik (Maintainer) | Full — confidence in releases | P0 + CLI Coverage |

**Must-Have Capabilities (7 Deliverables):**

1. **Docs Fix (Two-Pass)** — Pass 1: fix stale content + broken links (ship immediately). Pass 2: add journey example link (ship only after journey exists). Validate between passes: re-run audit on fixed docs before starting Pass 2 to catch inconsistencies from Pass 1 edits. Audit includes word-pattern variants ("four agents", "original agents"), not just numeric grep. Triage: user-facing first, internal content second, code comments only if time permits.

2. **P0 Test Suites (All 7 Agents)** — Data-driven from agent registry (not 7 hardcoded files). Two templates: infrastructure (JS + content) for Emma/Wade, content-only for Mila/Liam/Noah/Isla/Max. No pivot — commit to automated P0 for all 7 agents. Content-only template must be lean enough to be sustainable, but every agent gets automated validation.

3. **End-to-End Journey Example** — Cherry-picked captures from multiple runs on one domain (busy parents). Handoff annotations as callout boxes/footnotes. Editorial review via checklist + `/bmad-editorial-review-prose`. One domain rule: don't fragment the narrative across multiple examples.

4. **Content Correctness Testing** — Handoff contract tests (HC1-HC5) run independently, not as a linear chain. Validate that Agent A's output contains fields Agent B needs. Test semantics not syntax: check presence and non-empty, not exact string matching. Word-pattern audit included.

5. **CLI Coverage Gaps** — Focus on bmad-update.js and bmad-version.js. Legacy migration gets documented exception, not automated test coverage.

6. **README as Landing Page** — Transform README from technical reference into discovery experience: clear value proposition, example output previews showing what agents produce, visual chain overview. First thing Raya sees.

7. **Structured Feedback Prompt** — Low-friction mechanism for users to submit quality issues, missing capabilities, or general comments identifying which agent/workflow triggered the feedback. Repo-only (GitHub issue template or local file, no external services). Under 30 seconds, no IDE exit required.

### Post-MVP Features

*See [Product Scope](#product-scope) for Post-Phase-2 Growth and [Explicitly Deferred](#explicitly-deferred-until-user-demand-proven) for Phase 3 items.*

### Risk Mitigation Strategy

**Technical Risks:**
- *P0 complexity for content-only agents* — Mitigated by two P0 templates: infrastructure (Emma/Wade) and content-only (Mila/Liam/Noah/Isla/Max). Content-only template must be lean and sustainable — test activation, workflow execution, output quality, voice consistency. No pivot; if content-only P0 takes longer than expected, simplify the template rather than abandon automation.
- *Docs fix introduces new broken links* — Mitigated by two-pass approach with validation between passes: Pass 1 fixes existing problems, re-scan catches regressions, Pass 2 adds new links only when targets exist.

**Market Risks:**
- *No users yet to validate changes* — Mitigated by dogfooding: you are Tomás (upgrader) and Amalik (maintainer). Journey example serves as Priya validation.
- *Mediocre journey output* — Mitigated by one-domain rule and editorial checklist. Better to have one excellent example than three mediocre ones.

**Resource Risks:**
- *Solo maintainer bottleneck* — Mitigated by scope freeze (applies to features, not bugs) and clear pivot points. Each deliverable is independently shippable.
- *Mid-Phase-2 critical bug* — Scope freeze clarification: bugs bypass the freeze, features don't. Fix the bug, then resume Phase 2 deliverables.
- *Scope-adjacent improvements discovered during work* — Phase 2.5 backlog: improvements discovered during Phase 2 (docs that need rewriting not just fixing, agent interfaces that should change for testability) go into a Phase 2.5 backlog. The only exception is if the improvement is a prerequisite for completing a Phase 2 deliverable.

*Elicitation methods applied during scoping are documented in [Elicitation History](#elicitation-history).*

## Developer Tool Requirements

*The scoping section defines when and in what order deliverables ship. This section defines the technical landscape they operate in — the documentation architecture, installation paths, and implementation constraints that shape how the work gets done.*

### Project-Type Overview

BMAD-Enhanced is an npm-distributed developer tool that installs into a user's project via `npx bmad-enhanced`. It operates through AI IDE integrations (VSCode, Cursor, Claude Code) using `.claude/settings.json` for slash command registration. Phase 2 does not change the technical architecture — it improves the quality of documentation, examples, and test coverage.

### Documentation Architecture

Current structure (unchanged by Phase 2). All files: verify all internal links resolve.

| File | Purpose | Phase 2 Action |
|------|---------|---------------|
| `README.md` | Landing page, first impression | Fix stale numbers, add journey example link, transform into landing page |
| `docs/agents.md` | Agent reference | Fix agent count, fix broken user guide links |
| `docs/testing.md` | Testing reference | Update test count and coverage thresholds |
| `docs/development.md` | Contributor reference | Update agent/workflow counts |
| `docs/faq.md` | Common questions | Update counts, add extension guidance with bloat warning |
| `UPDATE-GUIDE.md` | Upgrade instructions | Add forward-compatibility paragraph, verify npx cache tip |

### Forward Compatibility

Existing artifacts from Emma, Isla, Wade, and Max remain usable as inputs to updated and new agents. New agents (Synthesize, Hypothesize, Sensitize) accept inputs from existing agents without requiring artifact regeneration. Note: v1.5.x artifacts were not designed *for* new agents, but the handoff contracts are backward-compatible by design.

### Installation & Update Path

| Method | Command | Status |
|--------|---------|--------|
| Fresh install | `npx bmad-enhanced` | Working |
| Update | `npx bmad-update` | Working (cache hint added in v1.6.4) |
| Force latest | `npx -p bmad-enhanced@latest bmad-update` | Working (added in v1.6.4) |

### Implementation Considerations

- **Minimal code changes** — Phase 2 is primarily content fixes, test additions, and documentation updates. Vortex Compass prerequisite guidance may require agent content adjustments.
- **Agent content is the product** — Quality of markdown agent files, workflow steps, and persona definitions matters more than code architecture
- **Test strategy is the deliverable** — P0 suites, handoff tests, content correctness tests, and CLI coverage are the technical output of Phase 2
- **Journey example is documentation, not code** — Captured artifacts from real agent runs, editorially reviewed, linked from README

## Functional Requirements

*Phase 2 is primarily an internal quality investment with targeted user-facing improvements. FRs are marked [U] for user-facing or [I] for internal quality capabilities.*

### Documentation Accuracy

- **FR1** [I]: Maintainer can run a programmatic audit that detects all stale references (numbers, deleted paths, word-pattern variants like "four agents" or "original agents") *and* missing content (every agent in registry has docs coverage, every workflow in manifest has a doc reference) across user-facing docs
- **FR2** [I]: Maintainer can receive an actionable audit report listing each stale or missing reference with file location, current value, and expected value
- **FR3** [U]: New user can navigate all internal links in docs/ without encountering broken references
- **FR4** [U]: Returning user can read docs that accurately reflect the current 7-agent, 22-workflow, 268-test reality
- **FR5** [I]: Maintainer can execute a two-pass docs fix process with validation between passes to catch regressions introduced by edits
- **FR6** [U]: New user can find forward-compatibility guidance in the UPDATE-GUIDE explaining that existing artifacts work with updated agents

### Agent Quality Validation

*Note: Handoff contract validation (FR13-15) is executed within P0 suites, not as a separate test framework. FRs are listed separately because they test different capabilities.*

*Implementation note: FR7-9 represent three test types with fundamentally different confidence levels. Activation (FR7) = high-confidence automated, deterministic. Workflow execution (FR8) = medium-confidence automated, schema validation + field presence. Voice consistency (FR9) = low-confidence automated, should include human spot-check component — keyword/tone heuristics catch regressions but don't replace editorial judgment.*

- **FR7** [I]: Maintainer can validate every agent's activation sequence through automated P0 tests
- **FR8** [I]: Maintainer can validate every agent's workflow execution produces well-formed output through automated P0 tests
- **FR9** [I]: Maintainer can validate every agent's output uses terminology, framing, and tone markers consistent with the agent's documented communication_style and principles
- **FR10** [I]: Maintainer can run infrastructure-level integration checks for Emma and Wade beyond content validation
- **FR11** [I]: Maintainer can run the complete P0 suite for all 7 agents as a pre-publish confidence gate
- **FR12** [I]: P0 test framework can discover agents dynamically from the agent registry rather than hardcoded file lists

### Handoff Chain Integrity

*Note: These tests run within the P0 suite infrastructure (FR7-12), not as a separate system.*

- **FR13** [I]: Maintainer can validate each handoff contract (HC1-HC5) independently — confirming Agent A's output contains all fields Agent B requires
- **FR14** [I]: Content correctness tests can check field presence and non-emptiness without requiring exact string matching
- **FR15** [I]: Maintainer can detect handoff contract violations before users encounter silent chain breaks

### Journey Documentation

- **FR16** [U]: New user can follow a complete 7-agent journey example on the busy parents domain with real captured artifacts at every handoff
- **FR17** [U]: Journey follower can see handoff annotations (callout boxes/footnotes) explaining which fields each agent consumed and which artifact contract applies
- **FR18** [U]: Journey example sections each declare their own context and avoid undefined terms from previous sections, enabling non-linear reading *(editorial scope, not automated)*
- **FR19** [I]: Maintainer can verify journey example quality through editorial checklist + `/bmad-editorial-review-prose`

### Content Correctness Automation

- **FR20** [I]: CI can validate content correctness across agent definitions, workflow references, and handoff schemas — catching stale cross-references, mismatched fields, and structural inconsistencies

### CLI Reliability

- **FR21** [I]: Maintainer can verify bmad-update.js behavior through automated tests at 85%+ line coverage
- **FR22** [I]: Maintainer can verify bmad-version.js behavior through automated tests at 85%+ line coverage

### Extension Guidance

- **FR23** [U]: Module extender can find clear guidance that custom agents should be built through BMB or a fork, not hand-rolled manifest entries
- **FR24** [U]: Module extender can see a bloat warning explaining that adding agents without proper structure degrades the Vortex signal
- **FR25** [U]: Module extender encountering a handoff failure can use the journey example as an implicit format reference to diagnose missing fields

### Discovery Experience

*Note: FR26-29 require a design spike before epic breakdown — copy, format, and visual approach need decisions. README copy requires editorial review scope (`/bmad-editorial-review-prose`), not just the journey example.*

- **FR26** [U]: New user arriving at the README can understand BMAD-Enhanced's value proposition within the first scroll
- **FR27** [U]: New user can see example output previews showing what agents actually produce before installing
- **FR28** [U]: New user can see a visual overview of how the 7-agent chain connects
- **FR29** [U]: New user can reach the journey example in one click from the README

### User Feedback

- **FR30** [U]: User can submit structured feedback identifying which agent or workflow triggered the feedback and categorizing it as a quality issue, missing capability, or general comment *(architectural constraint: repo-only mechanism — GitHub issue template or local file, no external services)*

### Vortex Navigation

- **FR31** [U]: User can receive prerequisite guidance from the Vortex Compass when attempting to invoke an agent without required input artifacts *(scope note: existing Compass behavior validation, not new feature development — if Compass doesn't currently provide prerequisite guidance, this FR becomes a code change requiring re-scoping)*

### Operational Process

- **FR32** [I]: Maintainer can capture scope-adjacent improvements discovered during Phase 2 work into a tracked backlog without interrupting current deliverable progress *(intentionally lightweight — a markdown file with a convention, not a tracking system)*
- **FR33** [I]: Maintainer can conduct a structured post-release review using a checklist template that compares reported issues against existing test coverage to identify validation gaps
- **FR34** [I]: Maintainer can execute a scripted end-to-end walkthrough simulating Raya's journey (install → first agent → handoff → journey example) and record friction points encountered — Phase 2 acceptance test

### FR Summary

| Category | Count | User-Facing | Internal | Deliverable |
|----------|-------|-------------|----------|-------------|
| Documentation Accuracy | 6 | 3 | 3 | D1 (Docs Fix) |
| Agent Quality Validation | 6 | 0 | 6 | D2 (P0 Suites) |
| Handoff Chain Integrity | 3 | 0 | 3 | D4 (Content Correctness) |
| Journey Documentation | 4 | 3 | 1 | D3 (Journey Example) |
| Content Correctness | 1 | 0 | 1 | D4 (Content Correctness) |
| CLI Reliability | 2 | 0 | 2 | D5 (CLI Coverage) |
| Extension Guidance | 3 | 3 | 0 | D1 (Docs Fix) |
| Discovery Experience | 4 | 4 | 0 | D6 (README Landing Page) |
| User Feedback | 1 | 1 | 0 | D7 (Feedback Prompt) |
| Vortex Navigation | 1 | 1 | 0 | D2 (P0 Suites) |
| Operational Process | 3 | 0 | 3 | Cross-cutting |
| **Total** | **34** | **15** | **19** | — |

*Elicitation methods applied during FR synthesis are documented in [Elicitation History](#elicitation-history).*

## Non-Functional Requirements

### Test Suite Reliability

- **NFR1:** P0 test suites produce consistent results — zero flaky tests. A test that passes once must pass on every subsequent run without code changes.
- **NFR2:** Test failures surface actionable diagnostics — failure messages identify the specific agent, artifact, or field that failed, not generic assertion errors.
- **NFR3:** Full P0 suite for all 7 agents completes in under 5 minutes. Slow test suites get skipped before publish. *(Baseline TBD during implementation — validate whether 5 minutes provides meaningful headroom over actual runtime before treating this as a hard constraint.)*
- **NFR4:** Content correctness tests (FR20) tolerate cosmetic changes (whitespace, formatting) without false failures. Tests validate semantics, not syntax.

### Maintainability

- **NFR5:** Adding a new agent to the registry automatically includes it in P0 discovery (FR12) and content correctness validation (FR20) without modifying test code.
- **NFR6:** Docs audit tool (FR1-2) requires zero manual configuration to run — a single command with no arguments produces the full report.
- **NFR7:** Phase 2 deliverables introduce no new dependencies beyond what's already in `package.json`. Test tooling uses existing frameworks (Jest).
- **NFR8:** Every test file is self-documenting — a new contributor can understand what a test validates by reading the test file alone, without consulting external docs.

### Content Quality

- **NFR9:** Journey example reads as a coherent narrative, not a collection of artifacts. Editorial review confirms narrative flow across all 7 agent sections.
- **NFR10:** All user-facing documentation uses consistent terminology — agent names, workflow names, artifact names match the registry and manifest exactly. Zero synonyms or abbreviations. *(Scope includes README landing page content.)*
- **NFR11:** README landing page (FR26-29) communicates value to a non-technical PM audience, not just developers. Language avoids implementation jargon.
- **NFR12:** Extension guidance (FR23-25) is actionable within 10 minutes — a module extender can find and follow the BMB path without reading the full docs.

### Compatibility

- **NFR13:** `npx bmad-enhanced` and `npx bmad-update` work on macOS, Linux, and Windows (PowerShell + CMD) without platform-specific instructions.
- **NFR14:** Existing `_bmad-output/` artifacts from v1.5.x remain usable as inputs to v1.6.x+ agents without regeneration. Handoff contracts are backward-compatible.
- **NFR15:** Manifest merge during update preserves all user-added rows (custom agents, TEA agents) without duplication or reordering. *(Regression guardrail — existing behavior, covered implicitly by CLI coverage FR21-22.)*
- **NFR16:** Package installs cleanly on Node.js LTS versions (18, 20, 22) without peer dependency warnings. *(Regression guardrail — verify CI tests on multiple Node versions.)*
- **NFR17:** User can submit structured feedback (FR30) in under 30 seconds without leaving the IDE.
- **NFR18:** Docs audit (FR1-2) includes automated internal link validation — every markdown link reference is checked for target file existence.

*Elicitation methods applied during NFR synthesis are documented in [Elicitation History](#elicitation-history).*

## Elicitation History

*15 elicitation methods were applied across 5 PRD sections. This appendix preserves decision provenance — why each choice was made and what alternatives were considered.*

### Discovery (4 methods)

1. **First Principles Analysis** — Stripped speculative features. Identified that the Phase 2 list was written before Wave 3 existed. Rebuilt scope from 6 fundamental truths. Selected Shape B over Shape C.
2. **Stakeholder Round Table** — 5 stakeholders (Solo Founder, New Adopter, Quinn, Murat, Max) independently converged on: make what we shipped trustworthy and usable. Nobody asked for toggles or orchestration.
3. **What If Scenarios** — 5 scenarios tested the plan. Key insight: P0 testing process produces the journey example (two deliverables, one process). SCAMPER works inside existing Liam workflow — no dedicated workflow needed.
4. **Pre-mortem Analysis** — 6 failure modes identified with specific preventions. Strongest: handoff compatibility tests in P0 suites prevent silently broken agent chains.

### Scoping (3 methods)

5. **Failure Mode Analysis** — Analyzed all deliverables for failure modes. Key adjustments: data-driven P0 from registry, two P0 templates (infrastructure vs content-only), cherry-picked captures for journey, contract-independent handoff tests, word-pattern audit scope, editorial via checklist.
6. **Chaos Monkey Scenarios** — 5 break scenarios tested: 80+ stale refs, P0 3x slower than expected, mediocre journey output, docs fix introduces broken links, mid-Phase-2 bug. Key adjustments: triage rule, one domain rule, two-pass docs fix with validation between passes, scope freeze clarification. *(Note: pivot decision point proposed here was subsequently removed — committed to full automated P0 for all 7.)*
7. **Party Mode (Emma + Wade + Max)** — Three BME agents reviewed scoping. Key adjustments: reframed Raya/Kai coverage, added explicit execution order, added Phase 2.5 backlog rule for scope-adjacent improvements. *(Note: pivot-related adjustments were subsequently removed.)*

### Functional Requirements (4 methods)

8. **Critique and Refine** — 5 strengths preserved, 5 weaknesses fixed. Key changes: cross-reference between P0 and handoff FRs, removed non-requirement FR25 (documented exception), added audit report FR, consolidated content correctness FRs, added feedback prompt FR.
9. **Self-Consistency Validation** — 3-pass traceability check (deliverable→FR, journey→FR, success criteria→FR). Found: missing Vortex Compass FR, `/bmad-help` not needing FR, success criteria alignment gaps resolved during polish.
10. **Party Mode — BMM agents (Quinn + Winston + Bob)** — QA sharpened testability (voice consistency, non-linear reading). Architect identified infrastructure hierarchy (FR12 + FR20 are the two systems). SM flagged discovery FRs need design spike, sharpened FR33 output.
11. **Party Mode — All modules (Emma/BME + Paige/BMM + Victor/CIS + Murat/TEA)** — Added Raya walkthrough as acceptance test (FR34). Expanded audit to detect missing content, not just stale. Added user-facing vs internal framing. Added test confidence level notes for P0 types.

### Non-Functional Requirements (1 method)

12. **Self-Consistency Validation** — 3-pass traceability check (NFR→FR, FR→NFR coverage, success criteria→NFR alignment). Found: feedback friction gap (added NFR17), link validation gap (added NFR18), noted NFR15/16 as regression guardrails, confirmed NFR10 scope includes README.

### Document Polish (3 methods)

13. **Critique and Refine** — Reviewed against PRD purpose guide. Fixed: outdated pivot references in elicitation history, feedback prompt contradiction (moved to deliverable #7), consolidated elicitation sections into appendix, de-duplicated docs table, added structured journey dependencies.
14. **Party Mode — BMM agents (Max + Emma + Mila)** — Decision flow review, strategic coherence, pattern convergence. Fixed: elicitation count (12→13), added FR Coverage column to success criteria gates, added executive lead and counterfactual, explicit Raya as primary persona, deliverable column in FR Summary, section transitions.
15. **Party Mode — All modules (Paige/BMM + Isla/BME + Victor/CIS + Murat/TEA)** — Document structure, persona quality, strategic positioning, test coherence. Fixed: differentiated Measurable Outcomes as aggregate dashboard, added document navigation for LLM consumers, aligned Kai journey with coverage table, consolidated Journey Requirements Summary (17→13 rows), added dependency rationale to Priority Stack, added counterfactual risk statement, added NFR3 baseline acknowledgment.
