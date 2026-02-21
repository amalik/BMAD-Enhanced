# Vortex Framework - Agent Guide

Detailed reference for all four Vortex agents, their workflows, positioning, and how they work together.

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
| EM | **Empathy Map** | 5 | Empathy map artifact with says/thinks/does/feels quadrants and pain/gain analysis |
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

The recommended flow follows the streams, but it's not strictly linear:

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   Emma ──> Isla ──> Wade ──> Max ──┐                    │
│     ^                               │                    │
│     └───────────────────────────────┘                    │
│                                                          │
│   Max's Vortex Navigation identifies gaps and            │
│   routes you back to the right stream.                   │
│                                                          │
│   Every workflow ends with a Vortex Compass —            │
│   "If you learned X → go to Y" — creating               │
│   evidence-driven loops across all streams.              │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

You can start with any agent. Max's **Vortex Navigation** workflow is the compass that helps you decide where to go based on what evidence you have and what gaps remain.

---

## All Artifacts

All generated artifacts are saved to `_bmad-output/vortex-artifacts/`.

Each agent also has a user guide installed alongside the artifacts:

- [Emma User Guide](../_bmad-output/vortex-artifacts/EMMA-USER-GUIDE.md)
- [Isla User Guide](../_bmad-output/vortex-artifacts/ISLA-USER-GUIDE.md)
- [Wade User Guide](../_bmad-output/vortex-artifacts/WADE-USER-GUIDE.md)
- [Max User Guide](../_bmad-output/vortex-artifacts/MAX-USER-GUIDE.md)

---

## Using Agents Independently

Each agent works standalone — you don't need all four:

- **Just Emma** for strategic framing and problem-solution fit
- **Just Isla** for user research and empathy mapping
- **Just Wade** for experiment design and validation
- **Just Max** for learning capture and decision-making

Use all four together for the complete Vortex flow.

---

[Back to README](../README.md) | [Testing](testing.md) | [Development](development.md) | [FAQ](faq.md)
