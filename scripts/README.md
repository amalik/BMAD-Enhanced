# Convoke Installation Scripts

This directory contains npm-based installation scripts for Convoke agents.

## Available Scripts

### `install-emma.js`
Installs Emma (empathy-mapper) agent into your project.

**What it does:**
- Creates `_bmad/bme/_vortex/` directory structure
- Copies Emma agent file (`empathy-mapper.md`)
- Copies Emma workflow files (lean-persona, product-vision, contextualize-scope)
- Creates/updates `config.yaml`
- Updates `agent-manifest.csv`
- Creates output directory

**Usage:**
```bash
npm run install:emma
```

---

### `install-wade.js`
Installs Wade (wireframe-designer) agent into your project.

**What it does:**
- Creates `_bmad/bme/_vortex/` directory structure
- Copies Wade agent file (`wireframe-designer.md`)
- Copies Wade workflow files (mvp, lean-experiment, proof-of-concept, proof-of-value)
- Creates/updates `config.yaml`
- Updates `agent-manifest.csv`
- Creates output directory

**Usage:**
```bash
npm run install:wade
```

---

### `install-all-agents.js`
Installs both Emma and Wade agents at once.

**What it does:**
- All actions from `install-emma.js`
- All actions from `install-wade.js`
- Creates unified `config.yaml` with both agents
- Copies user guides for both agents

**Usage:**
```bash
npm run install:agents
```

---

### `postinstall.js`
Runs automatically after `npm install` to display installation instructions.

---

## Installation Flow

```
npm install convoke
       ↓
postinstall.js runs
       ↓
Displays available commands
       ↓
User runs: npm run install:agents (or individual agent)
       ↓
install-all-agents.js (or individual installer)
       ↓
Checks prerequisites
       ↓
Copies agent files to _bmad/bme/_designos/
       ↓
Creates/updates config.yaml
       ↓
Updates agent-manifest.csv
       ↓
Creates output directory
       ↓
Copies user guides
       ↓
Success! Agents ready to use
```

---

## File Structure Created

```
your-project/
├── _bmad/
│   ├── bme/
│   │   └── _vortex/
│   │       ├── agents/
│   │       │   ├── empathy-mapper.md
│   │       │   └── wireframe-designer.md
│   │       ├── workflows/
│   │       │   ├── lean-persona/
│   │       │   │   ├── workflow.md
│   │       │   │   └── validate.md
│   │       │   ├── product-vision/
│   │       │   │   ├── workflow.md
│   │       │   │   └── validate.md
│   │       │   ├── contextualize-scope/
│   │       │   │   ├── workflow.md
│   │       │   │   └── validate.md
│   │       │   ├── mvp/
│   │       │   │   ├── workflow.md
│   │       │   │   └── validate.md
│   │       │   ├── lean-experiment/
│   │       │   │   ├── workflow.md
│   │       │   │   └── validate.md
│   │       │   ├── proof-of-concept/
│   │       │   │   ├── workflow.md
│   │       │   │   └── validate.md
│   │       │   └── proof-of-value/
│   │       │       ├── workflow.md
│   │       │       └── validate.md
│   │       └── config.yaml
│   └── _config/
│       └── agent-manifest.csv
└── _bmad-output/
    └── vortex-artifacts/
        ├── EMMA-USER-GUIDE.md
        └── WADE-USER-GUIDE.md
```

---

## Configuration

### config.yaml
```yaml
---
submodule_name: _vortex
description: Contextualize and Externalize streams - Strategic framing and validated learning
module: bme
version: 1.1.0

# Output Configuration
output_folder: "{project-root}/_bmad-output/vortex-artifacts"
user_name: "{user}"
communication_language: "en"

# Agents in this submodule
agents:
  - empathy-mapper     # Emma - Contextualization Expert
  - wireframe-designer # Wade - Lean Experiments Specialist

# Workflows available
workflows:
  # Emma - Contextualize Stream
  - lean-persona           # Create lean user personas
  - product-vision         # Define product vision
  - contextualize-scope    # Decide which problem space to investigate

  # Wade - Externalize Stream
  - mvp                    # Design Minimum Viable Product
  - lean-experiment        # Run Build-Measure-Learn cycle
  - proof-of-concept       # Validate technical feasibility
  - proof-of-value         # Validate business value

# Integration
party_mode_enabled: true
core_module: bme
```

You can customize these values after installation.

---

## Troubleshooting

### "Cannot find module 'fs-extra'"
```bash
npm install fs-extra chalk
```

### "Permission denied"
```bash
chmod +x scripts/*.js
```

### "Config already exists"
The installers will update existing config files rather than overwriting them.

---

## Development

### Testing Installers Locally

```bash
# Test Emma installer
node scripts/install-emma.js

# Test Wade installer
node scripts/install-wade.js

# Test all-agents installer
node scripts/install-all-agents.js
```

### Adding New Agents

To add a new agent installer:

1. Copy `install-emma.js` as template
2. Update agent name, files, and workflows
3. Add to `package.json` scripts:
   ```json
   "install:new-agent": "node scripts/install-new-agent.js"
   ```
4. Update `install-all-agents.js` to include new agent

---

**Version:** 1.1.0
**Last Updated:** 2026-02-16
