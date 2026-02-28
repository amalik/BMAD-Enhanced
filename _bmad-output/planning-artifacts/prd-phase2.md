---
stepsCompleted: [step-01-init, step-02-discovery, step-03-success, step-04-journeys, step-05-domain, step-06-innovation, step-07-project-type]
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

### Elicitation Methods Applied

4 advanced elicitation methods were applied during discovery:

1. **First Principles Analysis** — Stripped speculative features. Identified that the Phase 2 list was written before Wave 3 existed. Rebuilt scope from 6 fundamental truths. Selected Shape B over Shape C.
2. **Stakeholder Round Table** — 5 stakeholders (Solo Founder, New Adopter, Quinn, Murat, Max) independently converged on: make what we shipped trustworthy and usable. Nobody asked for toggles or orchestration.
3. **What If Scenarios** — 5 scenarios tested the plan. Key insight: P0 testing process produces the journey example (two deliverables, one process). SCAMPER works inside existing Liam workflow — no dedicated workflow needed.
4. **Pre-mortem Analysis** — 6 failure modes identified with specific preventions. Strongest: handoff compatibility tests in P0 suites prevent silently broken agent chains.

## Success Criteria

### User Trust

| Gate | Criteria | Measurement |
|------|----------|-------------|
| **Zero stale references** | Every user-facing doc reflects 7-agent, 22-workflow, 268-test reality | Programmatic grep audit returns zero hits for stale patterns |
| **Zero broken links** | All internal links in docs/ resolve to existing files | Link checker pass — zero 404s |
| **Accurate first impression** | New user from install to first agent invocation encounters no contradictions | Manual walkthrough captured during P0 |

### Product Correctness

| Gate | Criteria | Measurement |
|------|----------|-------------|
| **7/7 P0 validated** | Every agent has a P0 suite. Content-only agents (Mila, Liam, Noah, Isla, Max): activation, workflow execution, output quality, voice consistency. Infrastructure agents (Emma, Wade): same + integration checks. | P0 suite exists and passes for all 7 |
| **Handoff chain validated** | Each artifact contract (HC1-HC5) tested: Agent A's output contains all fields Agent B's step-02 requires | At least one handoff compatibility test per artifact contract |
| **Journey example captured + reviewed** | Complete 7-agent run on busy parents domain. Artifacts captured at every handoff. Editorial review confirms pedagogical quality. | Journey document exists with real artifacts + editorial sign-off |

### Engineering Confidence

| Gate | Criteria | Measurement |
|------|----------|-------------|
| **4 content correctness test categories in CI** | Compass table agent references, persona field matches, step file counts, HC schema field presence — all validated programmatically | 4 test categories pass in CI, following dead-end detection pattern |
| **CLI coverage matches project standard** | bmad-update.js, bmad-version.js, legacy migration coverage at 85%+ lines, or documented exception explaining why | Coverage report per module |
| **Zero bugs the test suite should have caught** | Post-release: no patches required for issues that existing or new tests should have detected. Patches for genuinely novel issues are acceptable. | Post-release review at 7 days |

### Measurable Outcomes

- **P0 pass rate:** 100% across all 7 agents
- **Docs accuracy:** Zero grep hits for stale patterns post-fix
- **Handoff coverage:** 5/5 artifact contracts (HC1-HC5) have downstream compatibility checks
- **Content correctness:** 4 test categories operational in CI
- **CLI coverage:** 85%+ per module or documented exception

## Product Scope

### MVP — Phase 2 Minimum

1. **Docs fix** — All user-facing pages reflect 7-agent reality. Zero stale references, zero broken links.
2. **P0 test suites for all 7 agents** — Content-only agents: activation + workflow + output + voice. Infrastructure agents: same + integration. Handoff chain compatibility for HC1-HC5.
3. **End-to-end journey example** — Captured from real runs on busy parents domain. Editorially reviewed for pedagogical quality.

### Growth (Post-MVP, still Phase 2)

4. **Content correctness testing** — 4 categories: Compass references, persona matches, step counts, HC schema fields.
5. **CLI coverage gaps** — Target 85%+ or documented exception for each module.

### Vision (Phase 3 — Future)

Deferred until user demand is proven:
- Agent enable/disable toggle
- Workflow template variants
- Cross-agent orchestration
- HC9/HC10 mid-workflow interrupt pattern
- New Liam/Noah workflows
- Growth & discoverability (marketing, community, tutorials)
- Dynamic Vortex visualization (GIF/animation)

## User Journeys

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

**Resolution:** Kai discovers BMB (the module builder) as the fix. He uses BMB to rebuild his compliance agent with proper persona depth — communication style, principles, activation sequence, output format matching the BME standard. His rebuilt agent produces outputs that slot into the Vortex chain. His team uses it alongside the standard 7. He removes the three shallow agents. The extension works because it follows the format the journey example demonstrated.

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
| Accurate docs reflecting 7-agent reality | Raya (J1), Tomás (J2) | Docs fix |
| Zero broken links | Raya (J1), Tomás (J2) | Docs fix |
| Journey example linked from README (one click) | Raya (J1), Priya (J3) | Docs fix |
| Journey example with real captured artifacts | Raya (J1), Priya (J3), Tomás (J2) | P0 + Journey example |
| Handoff annotations in journey example (HC1-HC5) | Priya (J3) | Journey example |
| Journey sections self-contained for non-linear reading | Priya (J3) | Journey example (editorial) |
| Editorial review for pedagogical quality | Priya (J3) | Journey example |
| Agent voice and output consistency | Raya (J1) | P0 suites |
| Handoff chain compatibility (HC1-HC5) | Raya (J1), Amalik (J5) | P0 suites |
| Agent prerequisite guidance via Vortex Compass | Raya (J1) | P0 suites |
| Extension path guidance with bloat warning (BMB or fork) | Kai (J4) | Docs fix |
| Journey example as implicit agent format reference | Kai (J4), Priya (J3), Amalik (J5) | Journey example |
| Failure-to-BMB recovery path for custom agents | Kai (J4) | Docs fix |
| bmad-update prints cache hint in output | Tomás (J2), Raya (J1) | CLI coverage |
| Forward-compatibility note in UPDATE-GUIDE | Tomás (J2) | Docs fix |
| P0 suites as pre-publish confidence gate | Amalik (J5) | P0 suites |
| Content correctness tests in CI | Amalik (J5) | Content correctness testing |
| CLI coverage at 85%+ for update modules | Amalik (J5) | CLI coverage |
| `/bmad-help` and FAQ as "stuck" escape hatch | All journeys | Docs fix |

### Cross-Cutting Notes

- **Phase 2 ensures quality, not retention.** If a user arrives, has a correct and trustworthy experience, and still leaves — that's a product-market fit question for Phase 3, not a quality gap for Phase 2.
- **Discovery is Phase 3's problem.** Phase 2 users arrive via recommendation or direct link, not organic search. Phase 2's job is to make the experience trustworthy when they arrive.
- **Journey example serves triple duty:** pedagogical document for Priya, implicit format reference for Kai, and living proof of chain integrity for Amalik.

## Developer Tool Requirements

### Project-Type Overview

BMAD-Enhanced is an npm-distributed developer tool that installs into a user's project via `npx bmad-enhanced`. It operates through AI IDE integrations (VSCode, Cursor, Claude Code) using `.claude/settings.json` for slash command registration. Phase 2 does not change the technical architecture — it improves the quality of documentation, examples, and test coverage.

### Documentation Architecture

Current structure (unchanged by Phase 2):

| File | Purpose | Phase 2 Action |
|------|---------|---------------|
| `README.md` | Landing page, first impression | Fix stale numbers, add journey example link, verify all internal links resolve |
| `docs/agents.md` | Agent reference | Fix agent count, fix broken user guide links, verify all internal links resolve |
| `docs/testing.md` | Testing reference | Update test count and coverage thresholds, verify all internal links resolve |
| `docs/development.md` | Contributor reference | Update agent/workflow counts, verify all internal links resolve |
| `docs/faq.md` | Common questions | Update counts, add extension guidance with bloat warning, verify all internal links resolve |
| `UPDATE-GUIDE.md` | Upgrade instructions | Add forward-compatibility paragraph, verify npx cache tip, verify all internal links resolve |

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
