# Vortex Pattern Module

Technical inventory for the `_bmad/bme/_vortex` module — the complete 7-stream product discovery framework.

## Agents (7)

| # | Agent | ID | Icon | Stream | File |
|---|-------|----|------|--------|------|
| 1 | Emma | `contextualization-expert` | 🎯 | Contextualize | `agents/contextualization-expert.md` |
| 2 | Isla | `discovery-empathy-expert` | 🔍 | Empathize | `agents/discovery-empathy-expert.md` |
| 3 | Mila | `research-convergence-specialist` | 🔬 | Synthesize | `agents/research-convergence-specialist.md` |
| 4 | Liam | `hypothesis-engineer` | 💡 | Hypothesize | `agents/hypothesis-engineer.md` |
| 5 | Wade | `lean-experiments-specialist` | 🧪 | Externalize | `agents/lean-experiments-specialist.md` |
| 6 | Noah | `production-intelligence-specialist` | 📡 | Sensitize | `agents/production-intelligence-specialist.md` |
| 7 | Max | `learning-decision-expert` | 🧭 | Systematize | `agents/learning-decision-expert.md` |

**Registry:** `scripts/update/lib/agent-registry.js` (single source of truth)

## Workflows (22)

### Emma — Contextualize (3 workflows)
| Workflow | Directory |
|----------|-----------|
| `lean-persona` | `workflows/lean-persona/` |
| `product-vision` | `workflows/product-vision/` |
| `contextualize-scope` | `workflows/contextualize-scope/` |

### Isla — Empathize (3 workflows)
| Workflow | Directory |
|----------|-----------|
| `empathy-map` | `workflows/empathy-map/` |
| `user-interview` | `workflows/user-interview/` |
| `user-discovery` | `workflows/user-discovery/` |

### Mila — Synthesize (3 workflows)
| Workflow | Directory |
|----------|-----------|
| `research-convergence` | `workflows/research-convergence/` |
| `pivot-resynthesis` | `workflows/pivot-resynthesis/` |
| `pattern-mapping` | `workflows/pattern-mapping/` |

### Liam — Hypothesize (3 workflows)
| Workflow | Directory |
|----------|-----------|
| `hypothesis-engineering` | `workflows/hypothesis-engineering/` |
| `assumption-mapping` | `workflows/assumption-mapping/` |
| `experiment-design` | `workflows/experiment-design/` |

### Wade — Externalize (4 workflows)
| Workflow | Directory |
|----------|-----------|
| `mvp` | `workflows/mvp/` |
| `lean-experiment` | `workflows/lean-experiment/` |
| `proof-of-concept` | `workflows/proof-of-concept/` |
| `proof-of-value` | `workflows/proof-of-value/` |

### Noah — Sensitize (3 workflows)
| Workflow | Directory |
|----------|-----------|
| `signal-interpretation` | `workflows/signal-interpretation/` |
| `behavior-analysis` | `workflows/behavior-analysis/` |
| `production-monitoring` | `workflows/production-monitoring/` |

### Max — Systematize (3 workflows)
| Workflow | Directory |
|----------|-----------|
| `learning-card` | `workflows/learning-card/` |
| `pivot-patch-persevere` | `workflows/pivot-patch-persevere/` |
| `vortex-navigation` | `workflows/vortex-navigation/` |

## Handoff Contracts (10)

### Artifact Contracts (HC1-HC5) — schema files in `contracts/`
| Contract | Flow | Schema |
|----------|------|--------|
| HC1 | Isla → Mila | `contracts/hc1-empathy-artifacts.md` |
| HC2 | Mila → Liam | `contracts/hc2-problem-definition.md` |
| HC3 | Liam → Wade | `contracts/hc3-hypothesis-contract.md` |
| HC4 | Wade → Noah | `contracts/hc4-experiment-context.md` |
| HC5 | Noah → Max | `contracts/hc5-signal-report.md` |

### Routing Contracts (HC6-HC10) — no schema files, defined in compass-routing-reference
| Contract | Flow | Type |
|----------|------|------|
| HC6 | Max → Mila | Decision-driven (pivot resynthesis) |
| HC7 | Max → Isla | Decision-driven (evidence gap) |
| HC8 | Max → Emma | Decision-driven (recontextualization) |
| HC9 | Liam → Isla | Flag-driven (unvalidated assumption) |
| HC10 | Noah → Isla | Flag-driven (anomalous behavior) |

## File Structure

```
_bmad/bme/_vortex/
├── README.md                          # This file
├── config.yaml                        # Module configuration
├── compass-routing-reference.md       # Authoritative routing reference (P22)
├── agents/                            # 7 agent definition files
│   ├── contextualization-expert.md    # Emma
│   ├── discovery-empathy-expert.md    # Isla
│   ├── research-convergence-specialist.md  # Mila
│   ├── hypothesis-engineer.md         # Liam
│   ├── lean-experiments-specialist.md # Wade
│   ├── production-intelligence-specialist.md  # Noah
│   └── learning-decision-expert.md    # Max
├── contracts/                         # HC1-HC5 artifact schemas
│   ├── hc1-empathy-artifacts.md
│   ├── hc2-problem-definition.md
│   ├── hc3-hypothesis-contract.md
│   ├── hc4-experiment-context.md
│   └── hc5-signal-report.md
├── guides/                            # Wave 3 user guides
│   ├── MILA-USER-GUIDE.md
│   ├── LIAM-USER-GUIDE.md
│   └── NOAH-USER-GUIDE.md
└── workflows/                         # 22 workflow directories
    ├── lean-persona/                  # Emma
    ├── product-vision/                # Emma
    ├── contextualize-scope/           # Emma
    ├── empathy-map/                   # Isla
    ├── user-interview/                # Isla
    ├── user-discovery/                # Isla
    ├── research-convergence/          # Mila
    ├── pivot-resynthesis/             # Mila
    ├── pattern-mapping/               # Mila
    ├── hypothesis-engineering/        # Liam
    ├── assumption-mapping/            # Liam
    ├── experiment-design/             # Liam
    ├── mvp/                           # Wade
    ├── lean-experiment/               # Wade
    ├── proof-of-concept/              # Wade
    ├── proof-of-value/                # Wade
    ├── signal-interpretation/         # Noah
    ├── behavior-analysis/             # Noah
    ├── production-monitoring/         # Noah
    ├── learning-card/                 # Max
    ├── pivot-patch-persevere/         # Max
    └── vortex-navigation/             # Max
```

## Adding a New Agent

To extend the Vortex with a custom agent:

1. **Registry entry** — Add agent object to `AGENTS` array and workflow entries to `WORKFLOWS` array in `scripts/update/lib/agent-registry.js`
2. **Agent file** — Create `agents/<agent-id>.md` following the existing persona pattern (role, identity, communication style, menu)
3. **Workflows** — Create `workflows/<workflow-name>/` directories with 4-6 step files (`steps/step-01-setup.md` through `step-04/05/06-synthesize.md`). Final step must include a Compass routing table.
4. **User guide** — Create `guides/<AGENT-NAME>-USER-GUIDE.md` with usage examples and artifact templates

The installer (`postinstall.js`), validator, config-merger, and doctor all read from the registry — no additional wiring needed.
