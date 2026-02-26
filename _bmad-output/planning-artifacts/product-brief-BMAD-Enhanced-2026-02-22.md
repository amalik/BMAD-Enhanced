---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments:
  - docs/agents.md
  - scripts/update/lib/agent-registry.js
date: 2026-02-22
author: Amalik
scope: "Wave 3 — Synthesize, Hypothesize, Sensitize agents"
---

# Product Brief: BMAD-Enhanced — Wave 3 Agents

<!-- Content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

**The Gap:**
The Vortex Pattern covers 4 of 7 Innovation Vortex streams. Teams can frame problems (Emma), understand users (Isla), test assumptions (Wade), and make strategic decisions (Max). But three critical capabilities are missing: no convergence step to distill divergent research into a single actionable problem definition, no hypothesis engineering to produce testable solution concepts from defined problems, and no Vortex-aware production intelligence to connect what happens at scale back to the experiments that validated the direction. Teams make cognitive leaps between understanding users and testing solutions, and they lose the thread once experiments graduate to real usage.

**The Solution:**
Wave 3 completes the Vortex by adding three agents that fill the gaps between the existing four — following the double diamond model where Emma + Isla own the problem space (Diamond 1) and Synthesize + Hypothesize own the solution space (Diamond 2), with Wade externalizing, Sensitize monitoring, and Max deciding:

- **Synthesize Agent** — The convergence point of Diamond 1. Takes Isla's divergent empathy research — multiple personas, multiple interviews, multiple empathy maps — and converges them into a single, evidence-grounded problem definition using Jobs-to-be-Done and Pains & Gains. Requires empathy artifacts as input. Also serves as the landing point for Max's pivot decisions (reframing within a known problem space, vs. Emma for entering a new one or zooming out to question the problem space itself). Where Emma diverges into problem spaces, Synthesize converges research into definitions.
- **Hypothesize Agent** — A hypothesis engineer. Takes defined problems and produces investment-grade testable hypotheses through structured ideation techniques (brainstorming, brainwriting, value proposition design). The brainstorming is the method; the product is a 4-field hypothesis contract for Wade: expected outcome, target behavior change, rationale, and riskiest assumption — so Wade can immediately design experiments around the assumption that, if wrong, kills the whole thing. Routes teams back to Isla when ideation surfaces unvalidated user assumptions.
- **Sensitize Agent** — Vortex-aware production intelligence. Picks up where Wade's experiments leave off, inheriting experiment context (results, success criteria, metrics that mattered, confirmed hypotheses) to know exactly what to monitor at production scale. The unique value: connecting production signals back to experiment history and hypothesis lineage. No analytics tool has this context. Feeds Max with interpreted signals in a strict format: signal + context + trend — no strategic recommendations, just actionable intelligence grounded in Vortex history. Routes unexpected user behavior discoveries back to Isla for fresh empathy research.

**The Result:**
A complete 7-stream Innovation Vortex where every phase of product discovery has guided AI support. The double diamond is intact — with explicit convergence (Synthesize) and hypothesis engineering (Hypothesize) at its core. Handoff contracts between agents are explicit, and bidirectional Vortex Compass routing ensures teams can backtrack and hop-skip-jump between streams as the Shiftup method intends. No blind spots. No cognitive leaps. No unmonitored launches.

---

## Core Vision

### Problem Statement

Product teams using the Vortex Pattern hit three walls:

1. **The Convergence Gap** — Emma diverges into problem spaces. Isla diverges into user research. But nobody converges. Teams accumulate empathy maps, interview transcripts, and persona cards with no structured process to synthesize them into a single, actionable problem definition. Diamond 1 has all divergence and no convergence. When Max's Pivot/Patch/Persevere results in a pivot, teams need tactical problem redefinition within a known space — but there's no agent for that. They're sent back to Emma (strategic framing) when they actually need evidence-grounded re-synthesis.

2. **The Hypothesis Engineering Gap** — Once problems are defined, teams jump straight to Wade's experiments without structured ideation. Wade spends half his time helping teams figure out *what* to test before designing the experiment. Teams don't naturally formulate testable hypotheses — they say "let's try gamification" instead of "we believe X will cause Y because Z, and the riskiest assumption is W." The ideation techniques exist (brainstorming, brainwriting, SCAMPER, value proposition design) but nobody engineers the output into an investment-grade hypothesis contract. Worse, ideation sessions surface unvalidated user assumptions that nobody checks before proceeding to experiments.

3. **The Production Intelligence Gap** — After Wade's experiments validate a solution direction, teams have no way to connect production reality back to experiment history. Test-condition behavior differs from real-usage behavior, but no tool links "onboarding completion dropped 12%" to "this was the metric Wade validated in experiment #7." Analytics dashboards show data; nobody interprets it through the lens of which hypotheses were confirmed, which assumptions were tested, and what the original rationale was. Max makes decisions in a vacuum — with experiment results from months ago and dashboard numbers with no Vortex context.

### Problem Impact

Without these three streams, the Vortex is incomplete. Diamond 1 is all divergence and no convergence. Diamond 2 is skipped entirely — teams leap from problem understanding to experiment design. The experiment-to-production transition severs the thread of hypothesis lineage. Teams default to linear thinking (research → build → launch) instead of the iterative, multi-stream vortex approach. Pivots lack a landing zone. Hypotheses are informal. Production signals are disconnected from the experiments that created them.

### Why Existing Solutions Fall Short

- Emma diverges into problem spaces — she doesn't converge multiple research streams into a single definition
- Isla diverges into user understanding — she's the researcher, not the synthesizer
- Wade tests hypotheses but doesn't engineer them — he needs a 4-field contract with the riskiest assumption already identified
- Max decides but depends on Vortex-contextualized intelligence, not raw dashboards — he needs signals linked to experiment history and hypothesis lineage
- No existing agent covers research convergence, hypothesis engineering, or experiment-aware production monitoring

### Proposed Solution

Three new Vortex agents, each with 2-3 workflows following established patterns (step-file architecture, Vortex Compass integration, user guides):

| Agent | Stream | Role | Key Practices | Primary Input From | Primary Output To |
|-------|--------|------|---------------|-------------------|------------------|
| TBD | Synthesize | Research Convergence Specialist | JTBD, Pains & Gains | Isla's empathy artifacts | Hypothesize agent |
| TBD | Hypothesize | Hypothesis Engineer | Brainstorming, Brainwriting, Value Prop Wheel | Synthesize's problem definitions | Wade (hypothesis contract) |
| TBD | Sensitize | Vortex-Aware Production Intelligence | Monitoring, Analytics, Signal Interpretation | Wade's graduated experiments | Max (interpreted signals) |

### Handoff Contracts

| From → To | What's Handed Off | Format |
|-----------|-------------------|--------|
| Isla → Synthesize | Raw empathy artifacts (maps, interviews, observations) | Synthesize requires these as input — no assumptions-only mode |
| Synthesize → Hypothesize | Converged problem definition with JTBD, pains, gains | Single actionable definition synthesized from multiple research streams |
| Hypothesize → Wade | Solution hypothesis | 4 fields: expected outcome + target behavior + rationale + riskiest assumption |
| Hypothesize → Isla | Unvalidated user assumption surfaced during ideation | Lightweight assumption-check: quick interview or observation to validate before proceeding to Wade |
| Wade → Sensitize | Validated solution graduating to production | Experiment context: results, success criteria met, metrics that mattered, confirmed hypotheses |
| Sensitize → Max | Production intelligence | Signal + context + trend format, linked to experiment history and hypothesis lineage. No strategic recommendations — Max decides |
| Sensitize → Isla | Unexpected user behavior detected in production | Discovery research trigger: users doing things nobody anticipated |
| Max → Synthesize | Pivot decision requiring problem redefinition | Reframing within known space (vs. Emma for new problem space) |
| Max → Emma | Zoom-out decision questioning the problem space itself | Contextualize Scope: "are we in the right forest?" |

### Key Differentiators

- **Completes the Vortex** — First framework to offer AI-guided support across all 7 Innovation Vortex streams
- **Double Diamond with convergence** — Diamond 1 finally has its convergence point (Synthesize). Emma and Isla diverge; Synthesize converges. Clean architecture, not a research pile
- **Hypothesis engineering, not brainstorming** — Hypothesize doesn't just facilitate ideation; it engineers investment-grade testable hypotheses with a 4-field contract. The brainstorming techniques are methods; the scoped, testable hypothesis is the product
- **Vortex-aware production intelligence** — Sensitize connects production signals to experiment history and hypothesis lineage. No analytics tool has this context. This is the connective tissue between "what we validated" and "what's actually happening"
- **Explicit agent contracts with defined formats** — Every handoff declares input requirements, output format, and routing triggers. No cognitive leaps, no ambiguous handoffs
- **Bidirectional routing with three-way distinction** — Vortex Compass triggers distinguish: new problem space (Emma), reframe within known space (Synthesize), zoom out to question the space (Emma's Contextualize Scope). Pivots, assumption gaps, and unexpected behaviors each route to the right agent
- **No blind spots by design** — Every gap between existing agents is explicitly filled: research convergence (Synthesize), hypothesis engineering (Hypothesize), experiment-to-production intelligence (Sensitize)

---

## Target Users

### Primary Users

**The Product Builder — "Anyone responsible for making product decisions"**

BMAD-Enhanced serves a single, broad user archetype: the product builder working with an AI assistant to navigate product discovery. This ranges from solo founders using the Vortex as a virtual expert team to CPOs and product managers at large organizations struggling with the "why" behind their products. Wave 3 does not create new user segments — it fills blind spots for everyone already using (or adopting) the framework.

**Profile:**
- **Role:** Solo founder, product manager, head of product, CPO, or any practitioner responsible for product decisions
- **Environment:** Works with an AI coding assistant (Claude, GPT, etc.) in their IDE or terminal. BMAD-Enhanced is installed as an npm package in their project
- **Skill level:** Treated as a practitioner regardless of seniority. The agents speak *with* them, not *down to* them
- **Key characteristic:** The AI agent is their collaborator — not a tool they delegate to, but a thinking partner they work alongside. For solo founders, the AI *is* the team. For larger orgs, the AI augments the team's process

**Problem experience by lifecycle stage:**

| Stage | What they have | What they're missing (Wave 3 fills) |
|-------|---------------|--------------------------------------|
| Early discovery | Empathy maps, interview findings, personas (via Isla + Emma) | No way to converge research into a single problem definition → **Synthesize** |
| Solution design | A defined problem space | No structured ideation or hypothesis engineering → **Hypothesize** |
| Validation | Experiment results from Wade | Already covered — Wade + Max handle this |
| Post-launch / scaling | A validated product in production | No Vortex-aware monitoring or growth intelligence → **Sensitize** |

**The AI as brainstorming partner:**
A critical design principle for Wave 3: the AI agent *is* the brainstorming partner. When Hypothesize runs brainwriting or worst-possible-idea exercises, it's not facilitating a room of humans — it's generating and challenging ideas alongside the user in a 1-on-1 session. This must feel like collaborating with a creative peer, not running a solo exercise against a template.

### Secondary Users

N/A — No buyer/user distinction exists currently. The person who installs BMAD-Enhanced is the person who uses it.

### User Journey

The user journey for Wave 3 is an extension of the existing Vortex journey, not a separate path:

**Discovery:** Users already familiar with Emma, Isla, Wade, or Max encounter the gaps naturally. "I finished Isla's empathy map — now what?" leads them to Synthesize. "I have a problem definition but no solution ideas" leads them to Hypothesize. "My product launched but I don't know what's happening" leads them to Sensitize. New users adopting the full framework get all 7 agents from day one.

**Onboarding:** Same as existing agents — `npx bmad-install-agents` installs everything. Each agent has a user guide. The Vortex Compass at the end of every workflow naturally routes users to Wave 3 agents when appropriate.

**Core Usage by agent:**
- **Synthesize:** User brings Isla's artifacts → agent guides JTBD and Pains & Gains convergence → outputs a single problem definition. Typical session: 30-60 minutes.
- **Hypothesize:** User brings a problem definition → agent runs structured ideation as a creative peer → outputs a 4-field hypothesis contract. Typical session: 45-90 minutes (ideation benefits from longer creative exploration).
- **Sensitize:** User brings Wade's experiment context from a graduated solution → agent helps set up monitoring, interpret signals, run optimization cycles. Ongoing — this is the agent that gets *more* useful over time as production data accumulates.

**Success moment:**
- Synthesize: "I went from 5 research artifacts to one clear problem statement — I know exactly what to solve."
- Hypothesize: "I have 3 testable hypotheses with riskiest assumptions identified — I can hand these straight to Wade."
- Sensitize: "I can see that the metric Wade validated is trending differently in production, and I know exactly which experiment to reference."

**Long-term:** Sensitize becomes the most-used Wave 3 agent over time. Synthesize and Hypothesize are used in bursts during discovery/ideation cycles. Sensitize runs continuously as a production intelligence partner. Max's decisions get sharper because Sensitize feeds him Vortex-contextualized signals instead of raw dashboard numbers.

---

## Success Metrics

### Release Quality Gates (Measurable — must pass before publish)

| Gate | Criteria | Measurement |
|------|----------|-------------|
| **Agent file integrity** | All 7 agent .md files present with valid frontmatter (name, title, icon, stream) | `bmad-doctor` validation — binary pass/fail |
| **Workflow completeness** | Each Wave 3 agent ships with 2-3 workflows following step-file architecture | File count + structure validation in `bmad-doctor` |
| **Vortex Compass integration** | Every workflow ends with Compass routing that includes all 7 agents | Manual review checklist — every workflow file checked |
| **Handoff contract coverage** | All 9 declared handoff contracts from the product brief have corresponding Compass triggers | Contract-to-trigger mapping — each contract verified |
| **Registry consistency** | `agent-registry.js` contains all 7 agents with complete persona data; manifest CSV generation produces valid output | Unit test + integration test coverage |
| **Test suite** | All existing tests pass; new agents covered by validator; no regression | `npm test` — zero failures |
| **Install flow** | `npx bmad-install-agents` installs all 7 agents, generates correct manifest, config validates | Installer E2E test |
| **User guides** | Each Wave 3 agent has a user guide following existing naming convention | File presence check |

### Adoption Signals (Directional — tracked post-release, no specific targets)

| Signal | What it tells us | How we'll see it |
|--------|-----------------|------------------|
| **npm downloads trend** | Whether Wave 3 release changes the download trajectory | npm stats — compare weekly downloads before/after v1.6.0 |
| **GitHub stars** | General interest and visibility | GitHub repo metrics |
| **GitHub Discussions activity** | Whether users are engaging with the new agents | Discussion volume and topic analysis |
| **Vortex completion usage** | Whether users progress through all 7 streams vs. stopping at 4 | Community feedback, issue reports, discussion threads |
| **Agent-specific mentions** | Which Wave 3 agents get traction first | GitHub issues, discussions, and community channels |

### What We're NOT Measuring

- No per-agent adoption targets — Wave 3 is a completeness play, not a growth play
- No time-based milestones — the Vortex is complete when it ships, adoption follows naturally
- No quality comparison between agents — all agents meet the same release quality gates
- No A/B testing of agent designs — ship the vision, iterate based on feedback

### Business Objectives

Wave 3's business objective is singular: **complete the Vortex**. The framework's value proposition depends on covering all 7 Innovation Vortex streams. Four of seven is a framework with gaps. Seven of seven is the product. Adoption parity with existing agents is the long-term bar — Wave 3 agents should eventually see comparable usage to Emma, Isla, Wade, and Max within their respective lifecycle stages.

---

## MVP Scope

### Core Features

**v1.6.0 ships the complete Vortex — no phasing, no cuts.**

#### 3 New Agents (Full Scope)

| Agent | Name | Stream | Workflows | Key Deliverables |
|-------|------|--------|-----------|-----------------|
| Synthesize | Mila | Synthesize | 2-3 workflows | JTBD convergence, Pains & Gains, problem definition output |
| Hypothesize | Liam | Hypothesize | 2-3 workflows | Structured ideation, 4-field hypothesis contract output |
| Sensitize | Noah | Sensitize | 2-3 workflows | Signal interpretation, experiment-aware monitoring, growth optimization |

Each agent includes:
- Agent .md file with full frontmatter (name, title, icon, stream, persona)
- 2-3 workflows following step-file architecture
- Vortex Compass integration routing to all 7 agents
- User guide (MILA-USER-GUIDE.md, LIAM-USER-GUIDE.md, NOAH-USER-GUIDE.md)
- Registry entry in `agent-registry.js` with complete persona data

#### All 9 Handoff Contracts Implemented

Every handoff contract declared in the product brief has corresponding Compass triggers:
- Isla → Mila (empathy artifacts → convergence)
- Mila → Liam (problem definition → hypothesis engineering)
- Liam → Wade (4-field hypothesis contract)
- Liam → Isla (unvalidated assumption backflow)
- Wade → Noah (graduated experiment context)
- Noah → Max (signal + context + trend)
- Noah → Isla (unexpected behavior discovery)
- Max → Mila (pivot → problem redefinition)
- Max → Emma (zoom-out → recontextualize)

#### Existing Agent Compass Updates

Emma, Isla, Wade, and Max receive Compass updates to route to Wave 3 agents:
- **Isla** gains routing to Mila ("ready to converge research")
- **Wade** gains routing to Noah ("experiment graduating to production")
- **Max** gains routing to Mila ("pivot — redefine within known space") — distinct from existing Emma routing
- **Emma** — no new outbound routes needed (existing routes sufficient)

#### Party Mode Integration

All 3 new agents (Mila, Liam, Noah) appear in Party Mode from day one, with full personality data from the agent manifest.

#### Infrastructure Updates

- `agent-registry.js` expanded to 7 agents with complete persona data
- `validator.js` updated to check all 7 agents and expanded workflow count
- `bmad-doctor` validates the full 7-agent Vortex
- Manifest CSV generation produces all 7 agents
- Config updated with new workflow entries

### Out of Scope for MVP

- **Cross-agent orchestration workflows** — A guided "full Vortex run" that chains all 7 agents sequentially is a future design exercise, not part of v1.6.0. Each agent operates independently with Compass routing between them.
- **New framework development** — v1.6.0 completes the Vortex. The next horizon is a new framework entirely; Vortex may receive minor updates but no major additions.
- **Workflow template variations** — Each agent ships with its core 2-3 workflows. Additional workflow variants (e.g., "quick synthesis" or "deep ideation") are post-v1.6.0 iterations.
- **Analytics integration** — Noah (Sensitize) helps users interpret signals and set up monitoring frameworks, but does not integrate directly with analytics platforms (Mixpanel, Amplitude, etc.). The agent works with whatever data the user brings.
- **Automated artifact passing** — Handoff contracts define what's passed between agents, but the user manually initiates each agent with the appropriate input. Automated pipeline execution is future scope.

### MVP Success Criteria

MVP success = all Release Quality Gates from the Success Metrics section pass:
1. All 7 agent files present with valid frontmatter — `bmad-doctor` passes
2. All Wave 3 workflows follow step-file architecture — structure validated
3. All 9 handoff contracts have Compass triggers — contract-to-trigger mapping complete
4. All existing tests pass + new agents covered — `npm test` zero failures
5. Install flow works end-to-end — 7 agents installed, manifest valid, config validates
6. User guides present for Mila, Liam, Noah

The go/no-go decision is binary: all gates pass → publish v1.6.0. Any gate fails → fix before release.

### Future Vision

**v1.6.0 completes the Vortex. What comes next is a new framework.**

The Vortex may receive minor post-v1.6.0 updates — workflow refinements, Compass routing improvements based on user feedback, additional ideation techniques for Liam, deeper signal interpretation patterns for Noah. But the 7-stream architecture is final.

The next major horizon is beyond the Vortex: a new framework that builds on the foundation of 7 complete streams of guided product discovery. The Vortex becomes the stable base that future innovation builds upon.
