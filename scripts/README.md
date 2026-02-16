# BMAD-Enhanced Installation Scripts

This directory contains npm-based installation scripts for BMAD-Enhanced agents.

## Available Scripts

### `install-emma.js`
Installs Emma (empathy-mapper) agent into your project.

**What it does:**
- Creates `_bmad/bme/_designos/` directory structure
- Copies Emma agent file (`empathy-mapper.md`)
- Copies empathy-map workflow files (6 steps + template)
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
- Creates `_bmad/bme/_designos/` directory structure
- Copies Wade agent file (`wireframe-designer.md`)
- Copies wireframe workflow files (6 steps + template)
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
npm install bmad-enhanced@alpha
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
│   │   └── _designos/
│   │       ├── agents/
│   │       │   ├── empathy-mapper.md
│   │       │   └── wireframe-designer.md
│   │       ├── workflows/
│   │       │   ├── empathy-map/
│   │       │   │   ├── workflow.md
│   │       │   │   ├── empathy-map.template.md
│   │       │   │   └── steps/
│   │       │   │       └── step-01 through step-06.md
│   │       │   └── wireframe/
│   │       │       ├── workflow.md
│   │       │       ├── wireframe.template.md
│   │       │       └── steps/
│   │       │           └── step-01 through step-06.md
│   │       └── config.yaml
│   └── _config/
│       └── agent-manifest.csv
└── _bmad-output/
    └── design-artifacts/
        ├── EMMA-USER-GUIDE.md
        └── WADE-USER-GUIDE.md
```

---

## Configuration

### config.yaml
```yaml
user_name: "User"
communication_language: "English"
output_folder: "_bmad-output/design-artifacts"

agents:
  - empathy-mapper     # Emma
  - wireframe-designer # Wade

workflows:
  - empathy-map        # Create empathy maps
  - wireframe          # Create wireframes
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

**Version:** 1.0.3-alpha
**Last Updated:** 2026-02-16
