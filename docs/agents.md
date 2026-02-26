# Vortex Framework - Agent Guide

Detailed reference for all seven Vortex agents, their workflows, positioning, and how they work together in the complete 7-stream product discovery framework.

---

## Emma - Contextualization Expert

**Stream:** Contextualize | **Icon:** 🎯 | **File:** `_bmad/bme/_vortex/agents/contextualization-expert.md`

Emma helps teams frame the right problem before building solutions. She focuses on Lean Startup methodologies, validated assumptions, and strategic clarity.

### Workflows

| Cmd | Workflow | Steps | What it produces |
|-----|----------|-------|-----------------|
| LP | **Lean Persona** | 6 | Jobs-to-be-done focused persona with riskiest assumptions identified |
| PV | **Product Vision** | 6 | Vision statement, future state (3-5 years), guiding principles, validation plan |
| CS | **Contextualize Scope** | 6 | Scope decision with scoring matrix, clear boundaries, and rationale |

### When to Use Emma

- You're starting a new product or feature and need to define the problem space
- You want to create hypothesis-driven personas grounded in research
- You need strategic alignment before tactical execution

### Positioning

**Emma vs Maya (BMAD Core):**
- Emma contextualizes — "What problem should we solve?"
- Maya creates — "How should we solve it?"

Emma answers the strategic question before Maya answers the tactical one.

---

## Isla - Discovery & Empathy Expert

**Stream:** Empathize | **Icon:** 🔍 | **File:** `_bmad/bme/_vortex/agents/discovery-empathy-expert.md`

Isla helps teams deeply understand users before designing solutions. She focuses on evidence-based user insights over assumptions, bridging strategic framing and experimentation.

### Workflows

| Cmd | Workflow | Steps | What it produces |
|-----|----------|-------|-----------------|
| EM | **Empathy Map** | 6 | Empathy map artifact with says/thinks/does/feels quadrants and pain/gain analysis |
| UI | **User Interview** | 6 | Interview script with research goals, findings capture, and pattern synthesis |
| UD | **User Discovery** | 6 | Discovery research report with research planning, execution, and key findings |

### When to Use Isla

- You know the problem area but need to understand your users better
- You want evidence-based empathy maps instead of assumption-based ones
- You're planning user interviews and need structured research goals

### Positioning

**Isla vs Emma:**
- Isla empathizes — "Who are our users and what do they need?"
- Emma contextualizes — "What problem space are we in?"

Isla provides the user understanding that informs Emma's strategic framing.

---

## Mila - Research Convergence Specialist

**Stream:** Synthesize | **Icon:** 🔬 | **File:** `_bmad/bme/_vortex/agents/research-convergence-specialist.md`

Mila converges divergent research streams into actionable problem definitions. She transforms raw empathy data and contextual insights into clear, prioritized problem statements using Jobs-to-be-Done framing and Pains & Gains analysis.

### Workflows

| Cmd | Workflow | Steps | What it produces |
|-----|----------|-------|-----------------|
| RC | **Research Convergence** | 5 | Single problem definition synthesized from divergent research artifacts |
| PR | **Pivot Resynthesis** | 5 | Re-synthesized problem definition incorporating evidence from failed experiments |
| PA | **Pattern Mapping** | 5 | Cross-source pattern map surfacing convergent themes across research |

### When to Use Mila

- You have multiple research artifacts from Isla and need a single problem definition
- An experiment failed and you need to re-synthesize the problem with new evidence
- You have data from multiple sources and want to surface convergent patterns

### Positioning

**Mila vs Isla:**
- Isla empathizes — "Let me understand the users deeply"
- Mila synthesizes — "Here's what all that research means together"

Mila turns Isla's divergent research into a converged, actionable problem definition.

---

## Liam - Hypothesis Engineer

**Stream:** Hypothesize | **Icon:** 💡 | **File:** `_bmad/bme/_vortex/agents/hypothesis-engineer.md`

Liam engineers testable hypotheses from validated problem definitions. He ideates alongside the user as a creative peer, using structured brainwriting, 4-field hypothesis contracts, and assumption mapping to turn problems into experiments.

### Workflows

| Cmd | Workflow | Steps | What it produces |
|-----|----------|-------|-----------------|
| HE | **Hypothesis Engineering** | 5 | Testable hypotheses in 4-field contract format with riskiest assumptions identified |
| AM | **Assumption Mapping** | 4 | Classified assumptions by risk level (lethality x uncertainty) |
| ED | **Experiment Design** | 4 | Experiment designs targeting riskiest assumptions first |

### When to Use Liam

- You have a validated problem definition and need testable solution hypotheses
- You want to surface and classify hidden assumptions before building
- You need to design experiments that target the riskiest assumptions, not the easiest

### Positioning

**Liam vs Wade:**
- Liam hypothesizes — "What should we test and why?"
- Wade externalizes — "Let's run the test and measure"

Liam produces the hypothesis contracts that Wade executes as experiments.

---

## Wade - Lean Experiments Specialist

**Stream:** Externalize | **Icon:** 🧪 | **File:** `_bmad/bme/_vortex/agents/lean-experiments-specialist.md`

Wade helps teams test assumptions with real users through rapid experiments. He focuses on validated learning over perfection, guiding teams from hypotheses to evidence.

### Workflows

| Cmd | Workflow | Steps | What it produces |
|-----|----------|-------|-----------------|
| MVP | **Minimum Viable Product** | 6 | MVP specification — the smallest thing to test an assumption (not a feature-light product) |
| LE | **Lean Experiment** | 6 | Build-Measure-Learn cycle with hypothesis, metrics, and pivot-or-persevere criteria |
| POC | **Proof-of-Concept** | 6 | Technical feasibility evaluation — "Can we build it?" |
| POV | **Proof-of-Value** | 6 | Business value validation — willingness to pay, market demand, build/pivot/kill decision |

### When to Use Wade

- You have hypotheses ready to test with real users
- You need to validate technical feasibility before committing resources
- You want to test business value before building

### Positioning

**Wade vs Sally (BMAD Core):**
- Wade externalizes — "Should we build this?" (test with users)
- Sally internalizes — "Are we building it well?" (test with code)

Wade validates the product direction before Sally validates the implementation.

---

## Noah - Production Intelligence Specialist

**Stream:** Sensitize | **Icon:** 📡 | **File:** `_bmad/bme/_vortex/agents/production-intelligence-specialist.md`

Noah interprets production signals through the lens of experiment history. He connects real-world metrics to their original hypotheses, revealing what production usage actually means for product-market fit. Noah reports — he does not prescribe strategy.

### Workflows

| Cmd | Workflow | Steps | What it produces |
|-----|----------|-------|-----------------|
| SI | **Signal Interpretation** | 5 | Contextual interpretation of a production signal within its experiment lineage |
| BA | **Behavior Analysis** | 5 | Behavioral pattern analysis against validated experiment baselines |
| MO | **Production Monitoring** | 5 | Multi-signal monitoring dashboard across active experiments |

### When to Use Noah

- An experiment graduated to production and you need to interpret the signals
- You want to detect behavioral patterns that surveys and dashboards miss
- You're monitoring multiple experiments in production and need holistic intelligence

### Positioning

**Noah vs Max:**
- Noah sensitizes — "Here's what the data shows in context"
- Max systematizes — "Here's what we should do about it"

Noah provides the intelligence; Max makes the strategic decisions.

---

## Max - Learning & Decision Expert

**Stream:** Systematize | **Icon:** 🧭 | **File:** `_bmad/bme/_vortex/agents/learning-decision-expert.md`

Max helps teams systematize learnings and make evidence-based decisions. He captures validated learning as organizational knowledge and navigates between Vortex streams based on evidence gaps.

### Workflows

| Cmd | Workflow | Steps | What it produces |
|-----|----------|-------|-----------------|
| LC | **Learning Card** | 6 | Structured learning capture with experiment context, results, and implications |
| PPP | **Pivot, Patch, or Persevere** | 6 | Evidence-based decision with quantitative thresholds and rationale |
| VN | **Vortex Navigation** | 6 | Stream recommendation based on gap analysis across all Vortex streams |

### When to Use Max

- You've completed experiments and need to document what was learned
- You need to make a pivot/persevere decision based on evidence
- You're unsure which Vortex stream to focus on next

### Positioning

**Max vs Wade:**
- Max systematizes — "What did we learn? What's next?"
- Wade externalizes — "Let's test this assumption"

Max turns Wade's experiment results into organizational knowledge and strategic direction.

---

## The Vortex Flow

The Vortex is **non-linear by design**. While there's a natural forward flow (Isla → Mila → Liam → Wade → Noah → Max), agents route back to each other based on evidence. Ten handoff contracts ensure structured information flows at every transition.

```
                    VORTEX FRAMEWORK — 7 Streams · 7 Agents

  ┌──────────┐  HC1  ┌──────────┐  HC2  ┌──────────┐  HC3  ┌──────────┐
  │  Isla 🔍  │─────▶│  Mila 🔬  │─────▶│  Liam 💡  │─────▶│  Wade 🧪  │
  │ Empathize │      │Synthesize│      │Hypothesiz│      │Externaliz│
  └──────────┘      └──────────┘      └──────────┘      └──────────┘
       ▲                  ▲                │                    │
       │            HC6   │              HC9│                  HC4│
       │                  │                ▼                    ▼
  ┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
  │ Emma 🎯  │◀HC8─│  Max 🧭  │◀HC5─│  Noah 📡  │◀────────┘
  │Contextual│      │Systematiz│      │ Sensitize│
  └──────────┘      └──────────┘      └──────────┘
       │            HC7   │              HC10│
       └──────────────────┴──────────────────┘
                      ▼ to Isla 🔍
```

You can start with any agent. Max's **Vortex Navigation** workflow is the compass that helps you decide where to go based on what evidence you have and what gaps remain.

---

## Handoff Contract System

The Vortex uses 10 handoff contracts (HC1-HC10) to ensure agents pass structured information to each other. There are three contract types:

### Artifact Contracts (HC1-HC5)

These produce schema-compliant files that the next agent requires as input. Contract schemas are in `_bmad/bme/_vortex/contracts/`.

| Contract | Flow | What gets passed |
|----------|------|-----------------|
| **HC1** | Isla 🔍 → Mila 🔬 | Empathy artifacts (maps, interviews, observations) with synthesized insights |
| **HC2** | Mila 🔬 → Liam 💡 | Converged problem definition (JTBD + Pains & Gains) with evidence summary |
| **HC3** | Liam 💡 → Wade 🧪 | 1-3 hypothesis contracts in 4-field format with risk map |
| **HC4** | Wade 🧪 → Noah 📡 | Graduated experiment context (results, success criteria, metrics) |
| **HC5** | Noah 📡 → Max 🧭 | Signal report (signal + experiment lineage + trend analysis) |

### Decision-Driven Routing (HC6-HC8)

Max makes strategic routing decisions based on evidence. No artifact file — context is carried in conversation.

| Contract | Flow | When it triggers |
|----------|------|-----------------|
| **HC6** | Max 🧭 → Mila 🔬 | Pivot decision: problem correct, solution direction failed. Mila re-synthesizes. |
| **HC7** | Max 🧭 → Isla 🔍 | Evidence gap: critical knowledge gap needs discovery research |
| **HC8** | Max 🧭 → Emma 🎯 | Recontextualization: the fundamental problem space is wrong or scope too narrow |

### Flag-Driven Routing (HC9-HC10)

Mid-workflow flags that appear in the Compass when triggered.

| Contract | Flow | When it triggers |
|----------|------|-----------------|
| **HC9** | Liam 💡 → Isla 🔍 | Liam flags an unvalidated assumption too risky to test without prior validation |
| **HC10** | Noah 📡 → Isla 🔍 | Noah detects unexpected user behavior not covered by the original hypothesis |

---

## Vortex Compass

Every workflow's final step includes a **Vortex Compass** — a routing table that recommends what to do next based on what you just learned:

```
| If you learned...          | Consider next...     | Agent    | Why                        |
|----------------------------|----------------------|----------|----------------------------|
| [evidence/condition]       | [workflow-name]      | Agent 🔍 | [rationale + HC reference] |
```

The Compass is guidance, not a mandate. You can navigate to any Vortex agent at any time based on your judgment. When you're unsure, run **Max's Vortex Navigation** for a full gap analysis across all 7 streams.

---

## 7 User Journeys

These journeys show how practitioners move through the Vortex in practice.

### Journey 1: Research Convergence

*You have a pile of research artifacts from Isla but no single problem definition.*

1. **Isla** 🔍 conducts discovery — empathy maps, interviews, observations → produces multiple research artifacts
2. **Mila** 🔬 (HC1) receives all artifacts → guides JTBD framing and Pains & Gains analysis across sources → produces a single converged problem definition
3. **Compass** routes to **Liam** 💡 (HC2) for hypothesis engineering, or back to **Isla** 🔍 if assumptions need validation first

### Journey 2: Hypothesis Engineering

*You have a validated problem definition but no idea what solution to test first.*

1. **Mila** 🔬 produces a converged problem definition (e.g., "users waste 40 minutes daily context-switching")
2. **Liam** 💡 (HC2) receives the problem → runs structured brainwriting → produces 3 hypothesis contracts with 4-field format (belief, evidence needed, experiment, success criteria) → identifies riskiest assumptions
3. **Compass** routes to **Wade** 🧪 (HC3) with hypothesis contracts. If Liam flagged an unvalidated assumption → also offers **Isla** 🔍 (HC9) for quick validation

### Journey 3: Production Intelligence Loop

*Your experiment graduated to production but the metrics are diverging from experiment results.*

1. **Wade** 🧪 validates an experiment (72% onboarding completion vs 60% threshold) → experiment graduates to production
2. **Noah** 📡 (HC4) inherits experiment context → interprets production signals ("54% completion, down from validated 72%") → produces signal report in signal + context + trend format
3. **Max** 🧭 (HC5) receives intelligence → captures learning or triggers pivot/patch/persevere decision
4. If pivot → **Mila** 🔬 (HC6) re-synthesizes. If evidence gap → **Isla** 🔍 (HC7) investigates.

### Journey 4: Non-Linear Entry via Max

*You're new to the Vortex with production data but no experiment history.*

1. **Max** 🧭 runs **Vortex Navigation** → analyzes evidence across all 7 streams → identifies widest gaps
2. Max determines: "You have production signals but no experiment context (Sensitize gap), no hypothesis contracts (Hypothesize gap), and no converged problem definition (Synthesize gap)"
3. **Compass** routes to the agent that fills the most critical gap — there is no mandatory "step 1." The Vortex meets you where your evidence is.

### Journey 5: Pivot Backflow to Mila

*Max says "pivot" — the solution is wrong but the problem is right.*

1. **Max** 🧭 delivers pivot decision via Pivot/Patch/Persevere analysis
2. **Mila** 🔬 (HC6) receives Isla's original artifacts + new evidence from failed experiments → re-synthesizes pains and gains while preserving the JTBD
3. **Liam** 💡 (HC2) receives updated problem definition → engineers new hypotheses grounded in revised understanding
4. The Vortex loops within the known problem space — it doesn't restart from scratch

### Journey 6: Extending the Framework

*You want to add a custom agent to the Vortex.*

Adding a new agent follows a 4-step pattern:

1. **Registry entry** — Add agent to `scripts/update/lib/agent-registry.js` (single source of truth for all agents and workflows)
2. **Agent file** — Create agent definition in `_bmad/bme/_vortex/agents/` following existing patterns (persona, communication style, menu)
3. **Workflows** — Create workflow directories in `_bmad/bme/_vortex/workflows/` with step files (4-6 steps each, final step includes Compass routing)
4. **User guide** — Create guide in `_bmad/bme/_vortex/guides/` with examples and artifact templates

The installer, validator, and doctor all read from the registry automatically — no additional wiring needed.

### Journey 7: Reviewing Artifacts Across Streams

*You're a team lead reviewing your team's Vortex work.*

All generated artifacts are saved to `_bmad-output/vortex-artifacts/`. Each artifact is self-documenting:

- **Problem definitions** (Mila) reference their input Isla artifacts
- **Hypothesis contracts** (Liam) reference their source problem definition
- **Experiment results** (Wade) reference the hypothesis contract they tested
- **Signal reports** (Noah) reference the experiment that produced the production metrics
- **Decision records** (Max) reference the signals and learnings that drove the decision

You can trace any decision back to its evidence chain without using the agents directly.

---

## All Artifacts

All generated artifacts are saved to `_bmad-output/vortex-artifacts/`.

Each agent also has a user guide:

- [Emma User Guide](../_bmad-output/vortex-artifacts/EMMA-USER-GUIDE.md)
- [Isla User Guide](../_bmad-output/vortex-artifacts/ISLA-USER-GUIDE.md)
- [Mila User Guide](../_bmad/bme/_vortex/guides/MILA-USER-GUIDE.md)
- [Liam User Guide](../_bmad/bme/_vortex/guides/LIAM-USER-GUIDE.md)
- [Wade User Guide](../_bmad-output/vortex-artifacts/WADE-USER-GUIDE.md)
- [Noah User Guide](../_bmad/bme/_vortex/guides/NOAH-USER-GUIDE.md)
- [Max User Guide](../_bmad-output/vortex-artifacts/MAX-USER-GUIDE.md)

---

## Using Agents Independently

Each agent works standalone — you don't need all seven:

- **Just Emma** for strategic framing and problem-solution fit
- **Just Isla** for user research and empathy mapping
- **Just Mila** for converging research into problem definitions
- **Just Liam** for hypothesis engineering and assumption mapping
- **Just Wade** for experiment design and validation
- **Just Noah** for production signal interpretation
- **Just Max** for learning capture and decision-making

Use all seven together for the complete Vortex flow, or any subset that fits your needs.

---

[Back to README](../README.md) | [Testing](testing.md) | [Development](development.md) | [FAQ](faq.md)
