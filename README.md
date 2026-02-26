# BMAD-Enhanced

**Vortex Pattern - Product Discovery through Lean Startup Validation**

[![Version](https://img.shields.io/badge/version-1.6.0-blue)](https://github.com/amalik/BMAD-Enhanced)
[![Agents](https://img.shields.io/badge/agents-7-brightgreen)](docs/agents.md)
[![Workflows](https://img.shields.io/badge/workflows-22-success)](docs/agents.md)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

BMAD-Enhanced extends the [BMAD Method](https://github.com/bmadhub/bmad) with domain-specialized agents. First batch of agents cover the [Innovation Vortex](https://unfix.com/innovation-vortex) pattern from [unFIX model](https://unfix.com/) by [Jurgen Appelo](https://jurgenappelo.com/). Seven specialized agents will guide teams through full product discovery validation before building anything.

```
                    VORTEX PATTERN — 7 Streams · 7 Agents

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

| Agent | Stream | What they do |
|-------|--------|-------------|
| **Emma** 🎯 | Contextualize | Frame the right problem — lean personas, product vision, scope decisions |
| **Isla** 🔍 | Empathize | Understand users — empathy maps, interviews, discovery research |
| **Mila** 🔬 | Synthesize | Converge research into problem definitions — JTBD, pains & gains analysis |
| **Liam** 💡 | Hypothesize | Engineer testable hypotheses — assumption mapping, experiment design |
| **Wade** 🧪 | Externalize | Test assumptions — MVPs, experiments, proof-of-concept/value |
| **Noah** 📡 | Sensitize | Interpret production signals — behavior analysis, monitoring |
| **Max** 🧭 | Systematize | Capture learnings — learning cards, pivot/persevere decisions, stream navigation |

Every workflow ends with a **Vortex Compass** — evidence-driven routing that creates non-linear loops across all streams. Ten handoff contracts (HC1-HC10) ensure structured information flows between agents.

---

## Quick Start

### Prerequisites

- Node.js 18+ or Bun
- Git
- Claude Code or Claude.ai

### Install

```bash
npm install bmad-enhanced && npx bmad-install-vortex-agents
```

All 7 agents with 22 workflows are installed and ready to use.

### Activate an Agent

```bash
# Read an agent file to activate it
cat _bmad/bme/_vortex/agents/contextualization-expert.md          # Emma  🎯
cat _bmad/bme/_vortex/agents/discovery-empathy-expert.md          # Isla  🔍
cat _bmad/bme/_vortex/agents/research-convergence-specialist.md   # Mila  🔬
cat _bmad/bme/_vortex/agents/hypothesis-engineer.md               # Liam  💡
cat _bmad/bme/_vortex/agents/lean-experiments-specialist.md       # Wade  🧪
cat _bmad/bme/_vortex/agents/production-intelligence-specialist.md # Noah  📡
cat _bmad/bme/_vortex/agents/learning-decision-expert.md          # Max   🧭
```

Each agent presents a menu-driven interface. Pick a workflow and follow the guided steps.

### What Gets Installed

```
your-project/
├── _bmad/bme/_vortex/
│   ├── agents/           # 7 agent definition files
│   ├── workflows/        # 22 workflows
│   ├── contracts/        # 5 artifact contract schemas (HC1-HC5)
│   ├── guides/           # User guides (Mila, Liam, Noah)
│   └── config.yaml       # Configuration
└── _bmad-output/
    └── vortex-artifacts/  # Generated artifacts + user guides (Emma, Isla, Wade, Max)
```

---

## Updating

```bash
npx bmad-version              # Check current version
npx bmad-update --dry-run     # Preview changes
npx bmad-update               # Apply update (auto-backup)
npx bmad-doctor               # Diagnose issues
```

Your data in `_bmad-output/` is never touched. Automatic backups are created before every update.

See [UPDATE-GUIDE.md](UPDATE-GUIDE.md) for migration paths and troubleshooting.

---

## Using the Agents

Each agent can be used independently or as part of the full Vortex flow:

1. **Emma (Contextualize)** — Start here when defining a new product or problem space
2. **Isla (Empathize)** — Start here when you need to understand users better
3. **Mila (Synthesize)** — Start here when you have research to converge into a problem definition
4. **Liam (Hypothesize)** — Start here when you have a problem definition and need testable hypotheses
5. **Wade (Externalize)** — Start here when you have hypotheses ready to test
6. **Noah (Sensitize)** — Start here when experiments have graduated to production
7. **Max (Systematize)** — Start here when you have results and need to decide next steps

Max's **Vortex Navigation** workflow helps identify which stream needs attention based on evidence gaps — you don't have to follow a linear path. Every workflow ends with a **Vortex Compass** that routes you to the right next agent based on what you learned.

For detailed workflow descriptions and usage examples, see the [Agent Guide](docs/agents.md) and the individual user guides:

- [Emma User Guide](_bmad-output/vortex-artifacts/EMMA-USER-GUIDE.md)
- [Isla User Guide](_bmad-output/vortex-artifacts/ISLA-USER-GUIDE.md)
- [Mila User Guide](_bmad/bme/_vortex/guides/MILA-USER-GUIDE.md)
- [Liam User Guide](_bmad/bme/_vortex/guides/LIAM-USER-GUIDE.md)
- [Wade User Guide](_bmad-output/vortex-artifacts/WADE-USER-GUIDE.md)
- [Noah User Guide](_bmad/bme/_vortex/guides/NOAH-USER-GUIDE.md)
- [Max User Guide](_bmad-output/vortex-artifacts/MAX-USER-GUIDE.md)

---

## How It Fits with BMAD Core

BMAD-Enhanced handles **pre-implementation validation**. BMAD Core handles **implementation**.

```
BMAD-Enhanced (Vortex)                          BMAD Core
┌──────────────────────────────────────┐       ┌──────────────────────┐
│ Isla → Mila → Liam → Wade → Noah    │ ───>  │ PM → Architect → Dev │
│   ↑                          ↓       │       │ "Let's build it"     │
│   └──── Max ◀── Noah    Max ↻        │       └──────────────────────┘
│ Emma provides context at any point   │
│ "Should we build this?"             │
└──────────────────────────────────────┘
```

BMAD-Enhanced works standalone or as an extension — no BMAD Method installation required.

---

## Documentation

| Document | Description |
|----------|-------------|
| [Agent Guide](docs/agents.md) | Detailed agent descriptions, workflows, and positioning |
| [Testing](docs/testing.md) | Automated test suite, CI pipeline, and agent test results |
| [Development Guide](docs/development.md) | Architecture, building agents, and contributing |
| [FAQ](docs/faq.md) | Common questions about the framework |
| [CHANGELOG](CHANGELOG.md) | Complete version history |
| [UPDATE-GUIDE](UPDATE-GUIDE.md) | Migration paths and update troubleshooting |

---

## Roadmap

- **v1.1.0–v1.5.x** — Waves 1-2: Foundation (Emma, Isla, Wade, Max — 4 agents, 13 workflows, update system, CI/CD)
- **v1.6.0** — Wave 3: Complete 7-stream Vortex (added Mila, Liam, Noah — 22 workflows, 10 handoff contracts, Compass routing)
- **v2.0.0+** — Multi-agent collaboration, cross-agent workflows, analytics

---

## Contributing

We welcome contributions in these areas:

- **Agents** — New domain-specialized agents, workflow improvements
- **Testing** — Edge cases, performance testing
- **Documentation** — Tutorials, translations, video walkthroughs
- **Integration** — IDE plugins, third-party tools

See the [Development Guide](docs/development.md) for architecture details and agent development patterns.

---

## License

MIT License — see [LICENSE](LICENSE)

## Acknowledgments

- [BMAD Method v6.0.0](https://github.com/bmadhub/bmad) — Foundation for agent architecture
- Claude (Anthropic) — AI reasoning and agent development
- Murat (tea agent) — Test architecture and validation
- BMAD Core Team — Framework and infrastructure

---

<div align="center">

**Vortex Pattern** — *Validate before you build*

[Get Started](#quick-start) | [Agents](docs/agents.md) | [Docs](#documentation) | [Roadmap](#roadmap)

</div>
