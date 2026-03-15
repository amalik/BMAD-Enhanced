# Installation Guide

Complete guide to installing Convoke Vortex agents into your project.

---

## Prerequisites

- Node.js 18+ or Bun
- Git
- Claude Code or Claude.ai

Convoke works **standalone** or as an extension to [BMAD Method](https://github.com/bmadhub/bmad). No prior BMAD installation required.

---

## Quick Install

```bash
npm install convoke-agents && npx -p convoke-agents convoke-install-vortex
```

All 7 Vortex agents (Emma, Isla, Mila, Liam, Wade, Noah, Max) with 22 workflows are installed and ready to use.

---

## Installation Options

### Option 1: Install from npm (Recommended)

```bash
# Install into your project
npm install convoke-agents

# Install all Vortex agents and workflows
npx -p convoke-agents convoke-install-vortex
```

### Option 2: Clone from Source (Contributors Only)

For contributors or developers who want to modify agents or contribute to the project. This sets up a development environment — not an end-user installation.

```bash
git clone https://github.com/amalik/convoke-agents.git
cd convoke-agents
npm install
```

Agents are pre-installed in the repository for development. Note that this does not create the same output directory structure as the npm install path — use Option 1 for project installations.

---

## What Gets Installed

### Directory Structure

```
your-project/
├── _bmad/
│   ├── bme/
│   │   └── _vortex/
│   │       ├── agents/
│   │       │   ├── contextualization-expert.md      # Emma
│   │       │   ├── discovery-empathy-expert.md       # Isla
│   │       │   ├── research-convergence-specialist.md # Mila
│   │       │   ├── hypothesis-engineer.md             # Liam
│   │       │   ├── lean-experiments-specialist.md     # Wade
│   │       │   ├── production-intelligence-specialist.md # Noah
│   │       │   └── learning-decision-expert.md        # Max
│   │       ├── workflows/
│   │       │   ├── lean-persona/                     # Emma workflows
│   │       │   ├── product-vision/
│   │       │   ├── contextualize-scope/
│   │       │   ├── empathy-map/                      # Isla workflows
│   │       │   ├── user-interview/
│   │       │   ├── user-discovery/
│   │       │   ├── research-convergence/             # Mila workflows
│   │       │   ├── pivot-resynthesis/
│   │       │   ├── pattern-mapping/
│   │       │   ├── hypothesis-engineering/           # Liam workflows
│   │       │   ├── assumption-mapping/
│   │       │   ├── experiment-design/
│   │       │   ├── mvp/                              # Wade workflows
│   │       │   ├── lean-experiment/
│   │       │   ├── proof-of-concept/
│   │       │   ├── proof-of-value/
│   │       │   ├── signal-interpretation/            # Noah workflows
│   │       │   ├── behavior-analysis/
│   │       │   ├── production-monitoring/
│   │       │   ├── learning-card/                    # Max workflows
│   │       │   ├── pivot-patch-persevere/
│   │       │   └── vortex-navigation/
│   │       └── config.yaml
│   └── _config/
│       └── agent-manifest.csv
└── _bmad-output/
    └── vortex-artifacts/
        ├── EMMA-USER-GUIDE.md
        ├── ISLA-USER-GUIDE.md
        ├── MILA-USER-GUIDE.md
        ├── LIAM-USER-GUIDE.md
        ├── WADE-USER-GUIDE.md
        ├── NOAH-USER-GUIDE.md
        ├── MAX-USER-GUIDE.md
        └── (your generated artifacts)
```

### Summary

- **7 agent definitions** in `_bmad/bme/_vortex/agents/`
- **22 workflows** (169 files) — each with steps, templates, and validation
- **Configuration** in `_bmad/bme/_vortex/config.yaml`
- **7 user guides** in `_bmad/bme/_vortex/guides/`

---

## Configuration

The installer creates `_bmad/bme/_vortex/config.yaml`. The key fields you'll want to customize:

```yaml
# User-facing settings
user_name: "{user}"                # Your name (used in agent greetings)
communication_language: "en"       # Language for agent communication
output_folder: "{project-root}/_bmad-output/vortex-artifacts"  # Where artifacts are saved
```

The config also includes auto-generated fields (`submodule_name`, `module`, `version`, `agents`, `workflows`) that you typically don't need to edit — the installer and update system manage those.

---

## Verification

After installation, verify agents are working by activating one:

```bash
cat _bmad/bme/_vortex/agents/contextualization-expert.md    # Emma
```

**Expected result:** Emma should greet you by name and display a numbered menu like this:

```
Hey Amalik! I'm Emma — your Contextualization Expert...

1. [MH] Redisplay Menu Help
2. [CH] Chat with Emma
3. [LP] Lean Persona
4. [PV] Product Vision
5. [CS] Contextualize Scope
...
```

If the agent doesn't activate or you see raw markdown instead, run diagnostics:

```bash
npx -p convoke-agents convoke-doctor
```

This checks project root, config validity, agent files, workflows, output directory, and version consistency — with actionable fix suggestions for each issue.

---

## Troubleshooting

Start with diagnostics — it catches most issues:

```bash
npx -p convoke-agents convoke-doctor
```

### Permission denied errors

```bash
chmod +x scripts/*.js
npx -p convoke-agents convoke-install-vortex
```

### Config file already exists

The installer preserves your custom settings and only adds missing entries. To force a clean installation:

```bash
rm -rf _bmad/bme/_vortex/
npx -p convoke-agents convoke-install-vortex
```

### Installation succeeds but agents don't activate

Check that files are in place:

```bash
ls -la _bmad/bme/_vortex/agents/
ls -la _bmad/bme/_vortex/workflows/
npx -p convoke-agents convoke-doctor
```

---

## Next Steps

1. **Read the user guides** in `_bmad-output/vortex-artifacts/`
2. **Activate an agent** — start with Emma for strategic framing or Isla for user research
3. **Follow a workflow** — each agent presents a menu of guided workflows
4. **Check updates** — run `npx -p convoke-agents convoke-version` periodically

See the [Agent Guide](docs/agents.md) for detailed workflow descriptions and the recommended Vortex flow.

---

## Uninstallation

Back up any artifacts you want to keep before removing:

```bash
# 1. Back up your generated artifacts first
cp -r _bmad-output/vortex-artifacts/ ~/my-vortex-backup/

# 2. Remove agent files and workflows
rm -rf _bmad/bme/_vortex/

# 3. Remove generated artifacts (this deletes all your empathy maps, personas, etc.)
rm -rf _bmad-output/vortex-artifacts/

# 4. Uninstall npm package
npm uninstall convoke-agents
```

---

[Back to README](README.md) | [Update Guide](UPDATE-GUIDE.md) | [Agent Guide](docs/agents.md)
