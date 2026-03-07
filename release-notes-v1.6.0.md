# v1.6.0: Complete 7-Agent Vortex Pattern — Wave 3 Delivery

**The Innovation Vortex is now complete.** Convoke v1.6.0 delivers the full 7-stream [Innovation Vortex](https://unfix.com/innovation-vortex) pattern (from the [unFIX model](https://unfix.com/) by [Jurgen Appelo](https://jurgenappelo.com/)) — three new agents, nine new workflows, ten handoff contracts, and cross-agent routing that connects every stream into a non-linear product discovery system.

## What's New

### 3 New Agents

| Agent | Stream | Role |
|-------|--------|------|
| **Mila** 🔬 | Synthesize | Research Convergence Specialist — converges divergent research into actionable problem definitions using JTBD framing and Pains & Gains analysis |
| **Liam** 💡 | Hypothesize | Hypothesis Engineer — engineers testable hypotheses from validated problem definitions using structured brainwriting and assumption mapping |
| **Noah** 📡 | Sensitize | Production Intelligence Specialist — interprets production signals through experiment lineage context |

### 9 New Workflows (22 total)

**Mila's workflows:**
- `research-convergence` — Synthesize multiple research artifacts into a single problem definition
- `pivot-resynthesis` — Re-synthesize problem definition after failed experiments
- `pattern-mapping` — Surface convergent patterns across research sources

**Liam's workflows:**
- `hypothesis-engineering` — Produce testable hypotheses in 4-field contract format
- `assumption-mapping` — Classify hidden assumptions by risk level
- `experiment-design` — Design experiments targeting riskiest assumptions first

**Noah's workflows:**
- `signal-interpretation` — Contextual interpretation of production signals
- `behavior-analysis` — Behavioral pattern analysis against experiment baselines
- `production-monitoring` — Multi-signal monitoring across active experiments

### 10 Handoff Contracts (HC1–HC10)

Structured information flow between all 7 agents:

- **HC1–HC5**: Artifact contracts with schema definitions — ensure each agent receives exactly what it needs
- **HC6–HC8**: Decision-driven routing (Max → Mila/Isla/Emma)
- **HC9–HC10**: Flag-driven routing (Liam → Isla, Noah → Isla)

### Compass Routing

Every workflow's final step now includes an evidence-driven routing table ("Vortex Compass") with conditional agent recommendations:

> *"If you learned X → consider agent Y for workflow Z"*

A CI test (`dead-end-detection.test.js`) validates the complete routing graph — verifying every Compass route references valid agents and workflows, every agent has inbound and outbound routes, and no dead-end references exist.

### Cross-Agent Routing for Existing Agents

Emma, Isla, Wade, and Max now route to the three new agents where appropriate:
- Isla → Mila (HC1) for research synthesis
- Wade → Noah (HC4) for production signal interpretation
- Max → Mila (HC6) for pivot re-synthesis

### Extensibility Documentation

A documented 4-step pattern for adding new agents validates the framework's extensibility (NFR9/E4):
1. Add to `agent-registry.js`
2. Create agent definition file
3. Create 4–6 step workflows
4. Write user guide

## The Complete Vortex

```
                    VORTEX PATTERN — 7 Streams · 7 Agents

  ┌──────────┐  HC1  ┌──────────┐  HC2  ┌──────────┐  HC3  ┌──────────┐
  │  Isla 🔍  │─────▶│  Mila 🔬  │─────▶│  Liam 💡  │─────▶│  Wade 🧪  │
  │ Empathize │      │Synthesize│      │Hypothesiz│      │Externaliz│
  └──────────┘      └──────────┘      └──────────┘      └──────────┘
       ▲                  ▲                │                    │
       │                  │               HC3                  HC4
      HC9  ┌──────────┐  HC6  ┌──────────┐                    │
       │   │  Emma 🎯  │◀─────│  Max 🧭  │◀────HC5────────────▼
       │   │Contextual.│  HC7 │Systematiz│         ┌──────────┐
       └───│           │◀──HC8│          │◀───HC5──│  Noah 📡  │
           └──────────┘      └──────────┘         │ Sensitize │
                                                   └──────────┘
```

## Quality

- **268 tests** (208 unit + 60 integration) — all passing
- **88.45% line coverage** (threshold: 83%)
- **Lint clean** across all source files
- **0 regressions** across 5 epics of development

## Upgrading

```bash
npm install convoke-agents@1.6.0
```

The package includes an automatic migration from v1.5.x that adds the three new agents and nine new workflows to your existing configuration while preserving all user preferences.

## Attribution

The [Innovation Vortex](https://unfix.com/innovation-vortex) is a pattern from the [unFIX model](https://unfix.com/) created by [Jurgen Appelo](https://jurgenappelo.com/).

---

**Full changelog:** [CHANGELOG.md](https://github.com/amalik/convoke-agents/blob/main/CHANGELOG.md)
