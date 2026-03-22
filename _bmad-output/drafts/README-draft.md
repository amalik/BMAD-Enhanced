<div align="center">

```
 ██████╗ ██████╗ ███╗   ██╗██╗   ██╗ ██████╗ ██╗  ██╗███████╗
 ██╔════╝██╔═══██╗████╗  ██║██║   ██║██╔═══██╗██║ ██╔╝██╔════╝
 ██║     ██║   ██║██╔██╗ ██║██║   ██║██║   ██║█████╔╝ █████╗
 ██║     ██║   ██║██║╚██╗██║╚██╗ ██╔╝██║   ██║██╔═██╗ ██╔══╝
 ╚██████╗╚██████╔╝██║ ╚████║ ╚████╔╝ ╚██████╔╝██║  ██╗███████╗
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝  ╚═══╝   ╚═════╝ ╚═╝  ╚═╝╚══════╝
                Agent teams for complex systems
```

[![Version](https://img.shields.io/badge/version-2.4.0-blue)](https://github.com/amalik/convoke-agents)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

</div>

## What is Convoke?

Convoke extends AI agents with installable modules. **Teams** bring new agents for a domain. **Skills** add new capabilities to existing agents. Both are independent — install them separately or combine them.

Each team is a self-contained group of conversational agents that guide you through a structured process. Each skill patches new workflows onto agents you already have, without modifying them.

| Module | Type | What it does | Status |
|--------|------|-------------|--------|
| [Vortex](#vortex--product-discovery-team) | Team | Product discovery — 7 agents, 22 workflows | Available |
| [Gyre](#gyre--operational-readiness-team) | Team | Operational readiness — 4 agents, 7 workflows | Coming soon |
| [Enhance](#enhance--agent-skills) | Skill | Agent capability upgrades — RICE backlog management | Available |

---

## Quick Start

### Prerequisites

- Node.js 18+ or Bun
- Git
- Claude Code or Claude.ai

### Install

```bash
npm install convoke-agents && npx -p convoke-agents convoke-install-vortex
```

All 7 Vortex agents with 22 workflows are installed and ready to use. Something not working? Run `npx -p convoke-agents convoke-doctor` or check the [FAQ](docs/faq.md).

### Personalize

Open `_bmad/bme/_vortex/config.yaml` and replace `{user}` with your name. Agents use this to personalize their interactions.

### Activate an Agent

**Claude Code (skills)**

```text
/bmad-agent-bme-contextualization-expert          # Emma  🎯
/bmad-agent-bme-discovery-empathy-expert          # Isla  🔍
/bmad-agent-bme-research-convergence-specialist   # Mila  🔬
/bmad-agent-bme-hypothesis-engineer               # Liam  💡
/bmad-agent-bme-lean-experiments-specialist        # Wade  🧪
/bmad-agent-bme-production-intelligence-specialist # Noah  📡
/bmad-agent-bme-learning-decision-expert           # Max   🧭
```

**Claude Code (terminal) / Other AI assistants**

```bash
cat _bmad/bme/_vortex/agents/contextualization-expert.md          # Emma  🎯
cat _bmad/bme/_vortex/agents/discovery-empathy-expert.md          # Isla  🔍
cat _bmad/bme/_vortex/agents/research-convergence-specialist.md   # Mila  🔬
cat _bmad/bme/_vortex/agents/hypothesis-engineer.md               # Liam  💡
cat _bmad/bme/_vortex/agents/lean-experiments-specialist.md       # Wade  🧪
cat _bmad/bme/_vortex/agents/production-intelligence-specialist.md # Noah  📡
cat _bmad/bme/_vortex/agents/learning-decision-expert.md          # Max   🧭
```

**Claude.ai**

Open any agent file from `_bmad/bme/_vortex/agents/` and paste its contents into your conversation.

**How activation works:** Each agent is a markdown file containing a full persona, menu system, and workflow instructions. When Claude reads the file, it adopts that agent's expertise and presents you with an interactive menu. Pick a workflow and follow the guided steps.

### Your First Session

1. **Personalize** — Edit `_bmad/bme/_vortex/config.yaml` and replace `{user}` with your name
2. **Activate Emma** — Use any activation method above
3. **See the menu** — Emma presents numbered options. Select **Lean Persona**
4. **Follow the steps** — Emma walks you through 6 guided steps, asking questions at each one
5. **Find your artifact** — Your lean persona is saved in `_bmad-output/vortex-artifacts/`
6. **Follow the Compass** — Emma's Vortex Compass suggests which agent to visit next based on what you learned

Each workflow ends with a Compass routing suggestion. You don't need to follow a linear path — the system guides you to whichever stream needs attention.

### What Gets Installed

```text
your-project/
├── _bmad/bme/
│   ├── _vortex/              # Team: Product Discovery
│   │   ├── agents/           # 7 agent definitions
│   │   ├── workflows/        # 22 workflows with step files
│   │   ├── contracts/        # Handoff contracts (HC1-HC10)
│   │   ├── guides/           # User guides (all 7 agents)
│   │   └── config.yaml       # Configuration
│   ├── _gyre/                # Team: Operational Readiness (coming soon)
│   └── _enhance/             # Skill: Agent Capability Upgrades
│       ├── workflows/        # Skill workflows (initiatives-backlog)
│       ├── extensions/       # Agent menu patch descriptors
│       ├── guides/           # Module author guide
│       └── config.yaml       # Configuration
└── _bmad-output/
    └── vortex-artifacts/     # Generated artifacts
```

---

## Vortex — Product Discovery Team

**7 agents guide you from insight to evidence and back again — a continuous discovery loop, not a one-shot checklist**

[![Agents](https://img.shields.io/badge/agents-7-brightgreen)](docs/agents.md)
[![Workflows](https://img.shields.io/badge/workflows-22-success)](docs/agents.md)

Most teams skip validation and build on assumptions. Vortex guides you through seven discovery streams — from understanding your users to interpreting production signals — so you make evidence-based decisions before, during, and after you build.

```text
                         7 Streams · 7 Agents

  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
  │     Isla    │──▶│     Mila    │──▶│     Liam    │──▶│     Wade    │
  │  Empathize  │   │ Synthesize  │   │ Hypothesize │   │ Externalize │
  └─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘
         ▲                                                       │
         │                                                       │
         │                                                       ▼
  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐            │
  │     Emma    │◀──│     Max     │◀──│     Noah    │◀───────────┘
  │Contextualize│   │ Systematize │   │  Sensitize  │
  └─────────────┘   └─────────────┘   └─────────────┘
         │                 │                 │
         └─────────────────┴─────────────────┘
          ▶ Start at Emma · back to any stream
```

*Each workflow ends with a Compass routing to whichever stream needs attention — you can start or return to any agent.*

| Agent | Stream | What they do |
|-------|--------|-------------|
| **Emma** 🎯 | Contextualize | Frame the right problem — personas, product vision, scope |
| **Isla** 🔍 | Empathize | Understand users — empathy maps, interviews, discovery research |
| **Mila** 🔬 | Synthesize | Converge research into clear problem definitions |
| **Liam** 💡 | Hypothesize | Turn problems into testable hypotheses and experiments |
| **Wade** 🧪 | Externalize | Test assumptions with MVPs, experiments, and prototypes |
| **Noah** 📡 | Sensitize | Interpret production signals, user behavior, and engagement patterns |
| **Max** 🧭 | Systematize | Capture learnings and decide: pivot, patch, or persevere |

<details>
<summary>22 Vortex Workflows</summary>

- Assumption Mapping
- Behavior Analysis
- Contextualize Scope
- Empathy Map
- Experiment Design
- Hypothesis Engineering
- Lean Experiment
- Lean Persona
- Learning Card
- MVP
- Pattern Mapping
- Pivot Patch Persevere
- Pivot Resynthesis
- Product Vision
- Production Monitoring
- Proof of Concept
- Proof of Value
- Research Convergence
- Signal Interpretation
- User Discovery
- User Interview
- Vortex Navigation

</details>

### What Agents Produce

Here's a sample from the [full 7-agent journey example](_bmad-output/journey-examples/busy-parents-7-agent-journey.md) — a busy parents meal planning project run through all seven streams:

> **Emma** frames the Job-to-be-Done: *"Eliminate the daily 5:30 PM dinner decision so I can feed my family well without the mental load of planning, shopping, and deciding under time pressure."*
>
> **Liam** turns that into a testable hypothesis: *"We believe busy parents will act on a single dinner suggestion delivered at 4:00 PM within 3 minutes because the decision burden — not cooking — is their primary barrier."*
>
> **Max** captures the learning and recommends: *PATCH — the core hypothesis is validated; iterate on timing, don't pivot direction.*

**[See the full 7-agent journey →](_bmad-output/journey-examples/busy-parents-7-agent-journey.md)**

### Using the Agents

Each agent can be used independently or as part of the full Vortex flow:

1. **Emma (Contextualize)** — Start here when defining a new product or problem space
2. **Isla (Empathize)** — Start here when you need to understand users better
3. **Mila (Synthesize)** — Start here when you have research to converge
4. **Liam (Hypothesize)** — Start here when you have a problem and need testable hypotheses
5. **Wade (Externalize)** — Start here when you have hypotheses ready to test
6. **Noah (Sensitize)** — Start here when experiments have graduated to production
7. **Max (Systematize)** — Start here when you have results and need to decide next steps

Max's **Vortex Navigation** workflow identifies which stream needs attention based on evidence gaps. Every workflow ends with a **Vortex Compass** that routes you to the right next agent. Ten handoff contracts (HC1-HC10) ensure structured information flows between agents — see the [contracts directory](_bmad/bme/_vortex/contracts/) for details.

For detailed workflow descriptions, see the [Agent Guide](docs/agents.md) and individual user guides:

- [Emma User Guide](_bmad/bme/_vortex/guides/EMMA-USER-GUIDE.md) | [Isla User Guide](_bmad/bme/_vortex/guides/ISLA-USER-GUIDE.md) | [Mila User Guide](_bmad/bme/_vortex/guides/MILA-USER-GUIDE.md) | [Liam User Guide](_bmad/bme/_vortex/guides/LIAM-USER-GUIDE.md)
- [Wade User Guide](_bmad/bme/_vortex/guides/WADE-USER-GUIDE.md) | [Noah User Guide](_bmad/bme/_vortex/guides/NOAH-USER-GUIDE.md) | [Max User Guide](_bmad/bme/_vortex/guides/MAX-USER-GUIDE.md)

---

## Gyre — Operational Readiness Team

**Coming soon** — 4 agents assess your project's operational readiness across observability, deployment, and compliance.

| Agent | Role | What they do |
|-------|------|-------------|
| **Scout** 🔎 | Stack Detective | Scan your project and detect the technology stack |
| **Atlas** 📐 | Model Curator | Generate contextual capability models for your stack |
| **Lens** 🔬 | Readiness Analyst | Analyze gaps across observability, deployment, and compliance |
| **Coach** 🏋️ | Review Coach | Walk through findings, capture feedback, and prioritize a readiness backlog |

Gyre produces a RICE-scored readiness backlog tailored to your actual stack — not a generic checklist. Four contracts (GC1-GC4) structure the flow from stack detection through actionable recommendations.

---

## Enhance — Agent Skills

**Add new capabilities to existing agents without modifying them**

[![Workflows](https://img.shields.io/badge/workflows-1-success)](_bmad/bme/_enhance/guides/ENHANCE-GUIDE.md)
[![Modes](https://img.shields.io/badge/modes-3-blue)](_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md)

Skills are the other half of Convoke's extensibility. While Teams bring new agents, Skills give existing agents new workflows — installed via menu patching, not agent modification.

### Initiatives Backlog (PM Agent)

The first Enhance skill adds RICE-scored backlog management to the PM agent. Three modes cover the full lifecycle:

```text
                    Initiatives Backlog

  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
  │  [T] Triage │   │  [R] Review │   │  [C] Create │
  │  Ingest new │   │   Rescore   │   │  Bootstrap   │
  │  findings   │   │  existing   │   │  from scratch│
  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘
         │                 │                 │
         ▼                 ▼                 ▼
  ┌──────────────────────────────────────────────────┐
  │          initiatives-backlog.md                   │
  │   RICE-scored · Categorized · Change-tracked     │
  └──────────────────────────────────────────────────┘
```

| Mode | What it does |
|------|-------------|
| **Triage** | Ingest review findings, extract actionable items, propose RICE scores with two-gate validation, append to existing backlog |
| **Review** | Walk through items one at a time, rescore where priorities have shifted, regenerate prioritized view |
| **Create** | Gather initiatives interactively, batch-score with RICE, generate a complete backlog from scratch |

#### Activate

The Enhance skill appears in the PM agent's menu after installation:

```text
[IB] Initiatives Backlog (Convoke Enhance)
```

Select it from the PM agent menu, or activate directly:

**Claude Code (skills)**

```text
/bmad-enhance-initiatives-backlog
```

**Claude Code (terminal) / Other AI assistants**

```bash
cat _bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md
```

### Building Your Own Skills

The [Enhance Guide](_bmad/bme/_enhance/guides/ENHANCE-GUIDE.md) documents the complete pattern for creating new skills: directory structure, step file architecture, agent menu patching, config registration, and verification integration.

---

## How It Fits with BMAD Core

Convoke handles **discovery and validation**. BMAD Core handles **implementation**. Each module feeds the next — validated findings flow into implementation, production signals flow back.

```text
Convoke Modules                            BMAD Core
┌──────────────────────────────┐          ┌──────────────────────┐
│ Teams                        │          │                      │
│   Vortex (Product Discovery) │ ──────>  │ PM → Architect → Dev │
│   Gyre (Operational Readiness│ ──────>  │ "Let's build it"     │
│   [Future teams]             │          │                      │
│                              │ <──────  │                      │
│ Skills                       │  signals │                      │
│   Enhance (Agent Upgrades)   │ ──────>  │                      │
│   [Future skills]            │          │                      │
└──────────────────────────────┘          └──────────────────────┘
```

Teams and Skills are peer module types — both installable, both independent. Convoke works standalone or as an extension — no BMAD Method installation required.

---

## Updating

```bash
npx -p convoke-agents convoke-version          # Check current version
npx -p convoke-agents convoke-update --dry-run  # Preview changes
npx -p convoke-agents convoke-update            # Apply update (auto-backup)
npx -p convoke-agents convoke-doctor            # Diagnose issues
```

Your data in `_bmad-output/` is never touched. Automatic backups are created before every update.

> **Tip:** If `npx convoke-update` reports "Already up to date" but you know a newer version exists, npx may be serving a cached copy. Force the latest with:
> ```bash
> npx -p convoke-agents@latest convoke-update --yes
> ```

See [UPDATE-GUIDE.md](UPDATE-GUIDE.md) for migration paths and troubleshooting.

---

## Roadmap

**Shipped**

- **Vortex** — 7-agent product discovery team (22 workflows, handoff contracts, Compass routing)
- **Enhance** — Skills architecture with RICE initiatives-backlog as first skill
- **Platform foundation** — CLI tools (`convoke-install`, `convoke-update`, `convoke-doctor`), migration system, CI/CD

**Next**

- **Gyre** — Operational readiness team (4 agents, 7 workflows, contextual stack models)
- **Enhance Framework** — Team Module Generator for creating new Convoke teams from templates
- **Vortex alignment** — Retroactive alignment to Enhance-codified patterns

**Exploring**

- Additional teams (domain knowledge extraction, ML/AI engineering)
- Cross-module collaboration workflows
- Governance and advisory skill sets

---

## Documentation

| Document | Description |
|----------|-------------|
| [Agent Guide](docs/agents.md) | Detailed agent descriptions, workflows, and positioning |
| [Enhance Guide](_bmad/bme/_enhance/guides/ENHANCE-GUIDE.md) | Building new skills: patterns, structure, and examples |
| [Testing](docs/testing.md) | Automated test suite, CI pipeline, and agent test results |
| [Development Guide](docs/development.md) | Architecture, building agents, and contributing |
| [FAQ](docs/faq.md) | Common questions about the framework |
| [CHANGELOG](CHANGELOG.md) | Complete version history |
| [UPDATE-GUIDE](UPDATE-GUIDE.md) | Migration paths and update troubleshooting |

---

## Contributing

We welcome contributions in these areas:

- **Agents** — New domain-specialized agents, workflow improvements
- **Skills** — New Enhance skills for existing agents
- **Testing** — Edge cases, performance testing
- **Documentation** — Tutorials, translations, video walkthroughs
- **Integration** — IDE plugins, third-party tools

**Have feedback?** Found a quality issue, want a missing capability, or have a general comment about an agent? Open an issue and select the **Agent/Workflow Feedback** template.

See the [Development Guide](docs/development.md) for architecture details and agent development patterns.

---

## License

MIT License — see [LICENSE](LICENSE)

## Acknowledgments

- [BMAD Method v6.0.0](https://github.com/bmadhub/bmad) — Foundation for agent architecture
- [Innovation Vortex](https://unfix.com/innovation-vortex) — Pattern from the [unFIX model](https://unfix.com/) by [Jurgen Appelo](https://jurgenappelo.com/)
- Claude (Anthropic) — AI reasoning and agent development

### Agents

Every agent below contributed to the design, implementation, testing, or documentation of this project.

**Core**
- BMad Master 🧙 — Orchestration and agent coordination

**BMM — BMAD Method Module**
- Mary 📊 Analyst — Requirements analysis and product briefs
- Winston 🏗️ Architect — Architecture decisions and technical design
- Amelia 💻 Dev — Implementation and code delivery
- John 📋 PM — Product management and PRD creation
- Barry 🚀 Quick Flow — Rapid solo development
- Quinn 🧪 QA — Quality assurance and test validation
- Bob 🏃 SM — Sprint management and retrospectives
- Paige 📚 Tech Writer — Documentation and editorial review
- Sally 🎨 UX Designer — User experience design

**BME — Vortex Pattern Agents**
- Emma 🎯 Contextualize — Problem framing and product vision
- Isla 🔍 Empathize — User research and empathy mapping
- Mila 🔬 Synthesize — Research convergence and problem definition
- Liam 💡 Hypothesize — Hypothesis engineering and assumption mapping
- Wade 🧪 Externalize — Lean experiments and MVP testing
- Noah 📡 Sensitize — Production intelligence and signal interpretation
- Max 🧭 Systematize — Learning capture and pivot/persevere decisions

**BME — Gyre Agents** *(coming soon)*
- Scout 🔎 Stack Detective — Technology stack detection and profiling
- Atlas 📐 Model Curator — Contextual capability model generation
- Lens 🔬 Readiness Analyst — Cross-domain operational readiness analysis
- Coach 🏋️ Review Coach — Findings review and readiness backlog curation

**CIS — Creative & Innovation Strategies**
- Carson 🧠 Brainstorming Coach — Creative ideation facilitation
- Dr. Quinn 🔬 Problem Solver — Systematic problem-solving
- Maya 🎨 Design Thinking Coach — Human-centered design
- Victor ⚡ Innovation Strategist — Business model innovation
- Caravaggio 🎨 Presentation Master — Visual communication
- Sophia 📖 Storyteller — Narrative and storytelling

**BMB — BMAD Builder Module**
- Bond 🤖 Agent Builder — Agent creation and configuration
- Morgan 🏗️ Module Builder — Module architecture
- Wendy 🔄 Workflow Builder — Workflow design and validation

**TEA — Test Engineering & Architecture**
- Murat 🧪 Test Architect — Test framework, CI pipeline, and quality gates

---

<div align="center">

**Innovation Vortex Pattern** — *Discover what has to be discovered, deliver what has to be delivered*

[Get Started](#quick-start) | [Agents](docs/agents.md) | [Docs](#documentation) | [Roadmap](#roadmap)

</div>
