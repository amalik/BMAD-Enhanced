# BMAD-Enhanced Installation Guide

Complete guide to installing BMAD-Enhanced agents into your project.

---

## ⚠️ Prerequisites

**BMAD Method Required**

BMAD-Enhanced is an **extension package** for the [BMAD Method](https://github.com/bmadhub/bmad). You **must** install BMAD Method first.

### Step 1: Install BMAD Method

```bash
# Install BMAD Method using npx
npx bmad-method@alpha install

# Verify BMAD is installed
ls _bmad/  # Should show BMAD directory structure
```

### Step 2: Install BMAD-Enhanced Agents

Once BMAD Method is installed, proceed with BMAD-Enhanced installation below.

---

## Quick Install

**Install all agents at once:**

```bash
# From your project directory (where BMAD Method is installed)
npm install bmad-enhanced
npx bmad-install-agents
```

That's it! Emma and Wade are now added to your BMAD installation.

---

## Installation Options

### Option 1: Install All Agents (Recommended)

Install both Emma (empathy-mapper) and Wade (wireframe-designer) at once.

```bash
npm install bmad-enhanced
npx bmad-install-agents
```

**Output:**
```
╔════════════════════════════════════════════════════╗
║                                                    ║
║        BMAD-Enhanced Complete Installer 🚀        ║
║                                                    ║
║     Installing Emma + Wade Design Agents          ║
║                                                    ║
╚════════════════════════════════════════════════════╝

[1/5] Checking prerequisites...
  ✓ Prerequisites met
[2/5] Installing Emma + Wade agent files...
  → Installing Emma (empathy-mapper)...
  ✓ Emma installed
  → Installing Wade (wireframe-designer)...
  ✓ Wade installed
[3/5] Configuring agents...
  ✓ Created config.yaml
  ✓ Created agent-manifest.csv
[4/5] Setting up output directory...
  ✓ Output directory ready
[5/5] Installing user guides...
  ✓ User guides installed

╔════════════════════════════════════════════════════╗
║                                                    ║
║    ✓  All Agents Successfully Installed! 🎉       ║
║                                                    ║
╚════════════════════════════════════════════════════╝

Installed Agents:

  ✓ Emma (empathy-mapper) - Empathy Mapping Specialist 🎨
  ✓ Wade (wireframe-designer) - Wireframe Design Expert 🎨
```

---

### Option 2: Install Individual Agents

Install Emma or Wade separately.

**Install Emma only:**
```bash
npm install bmad-enhanced
npx bmad-install-emma
```

**Install Wade only:**
```bash
npm install bmad-enhanced
npx bmad-install-wade
```

---

### Option 3: Clone from Source

For contributors or advanced users who want to modify agents.

```bash
git clone https://github.com/yourusername/BMAD-Enhanced.git
cd BMAD-Enhanced
npm install
```

Agents are already installed in the repository. No additional steps needed.

---

## What Gets Installed

### Directory Structure

```
your-project/
├── _bmad/
│   ├── bme/
│   │   └── _designos/
│   │       ├── agents/
│   │       │   ├── empathy-mapper.md          # Emma agent definition
│   │       │   └── wireframe-designer.md       # Wade agent definition
│   │       ├── workflows/
│   │       │   ├── empathy-map/
│   │       │   │   ├── workflow.md             # Main empathy map workflow
│   │       │   │   ├── empathy-map.template.md # Output template
│   │       │   │   └── steps/
│   │       │   │       ├── step-01-define-user.md
│   │       │   │       ├── step-02-says-thinks.md
│   │       │   │       ├── step-03-does-feels.md
│   │       │   │       ├── step-04-pain-points.md
│   │       │   │       ├── step-05-gains.md
│   │       │   │       └── step-06-synthesize.md
│   │       │   └── wireframe/
│   │       │       ├── workflow.md             # Main wireframe workflow
│   │       │       ├── wireframe.template.md   # Output template
│   │       │       └── steps/
│   │       │           ├── step-01-define-requirements.md
│   │       │           ├── step-02-user-flows.md
│   │       │           ├── step-03-information-architecture.md
│   │       │           ├── step-04-wireframe-sketch.md
│   │       │           ├── step-05-components-interactions.md
│   │       │           └── step-06-synthesize.md
│   │       └── config.yaml                     # Agent configuration
│   └── _config/
│       └── agent-manifest.csv                  # Agent registry
└── _bmad-output/
    └── design-artifacts/
        ├── EMMA-USER-GUIDE.md                  # Complete Emma documentation
        ├── WADE-USER-GUIDE.md                  # Complete Wade documentation
        └── (your generated artifacts)           # Empathy maps, wireframes, etc.
```

### File Sizes

- **Emma Agent Files:** ~45KB (agent + 6 workflow steps + template)
- **Wade Agent Files:** ~52KB (agent + 6 workflow steps + template)
- **Emma User Guide:** 16KB
- **Wade User Guide:** 16KB
- **Total:** ~129KB

---

## Configuration

### config.yaml

Default configuration created during installation:

```yaml
# BMAD _designos Configuration
# Used by: Emma (empathy-mapper), Wade (wireframe-designer)

user_name: "User"
communication_language: "English"
output_folder: "_bmad-output/design-artifacts"

agents:
  - empathy-mapper     # Emma - Empathy Mapping Specialist
  - wireframe-designer # Wade - Wireframe Specialist

workflows:
  - empathy-map        # Create empathy maps
  - wireframe          # Create wireframes
```

**Customization:**
- `user_name`: Your name (used in agent greetings)
- `communication_language`: Language for agent communication
- `output_folder`: Where artifacts are saved

---

## Verification

After installation, verify agents are working:

### Test Emma

```bash
cat _bmad/bme/_designos/agents/empathy-mapper.md
```

**Expected output:**
```
Hey there! Emma here - your empathy mapping specialist. 🎨

I help teams build deep understanding of users through structured empathy mapping...

Here's what I can do for you:

1. [MH] Redisplay Menu Help
2. [CH] Chat with Emma about empathy mapping, user research, or Jobs-to-be-Done
3. [EM] Create Empathy Map: Guided 5-step process to create comprehensive empathy maps
4. [VM] Validate Empathy Map: Review existing empathy map against research best practices
5. [PM] Start Party Mode
6. [DA] Dismiss Agent

What would you like to do?
```

### Test Wade

```bash
cat _bmad/bme/_designos/agents/wireframe-designer.md
```

**Expected output:**
```
Hey there! Wade here - your wireframe design specialist. 🎨

Ready to turn ideas into structured layouts? I'll help you create wireframes...

Here's what I can do for you:

1. [MH] Redisplay Menu Help
2. [CH] Chat with Wade about wireframe design, UI patterns, or information architecture
3. [WM] Create Wireframe: Guided 6-step process to create comprehensive wireframe artifacts
4. [VM] Validate Wireframe: Review existing wireframe against usability principles
5. [PM] Start Party Mode
6. [DA] Dismiss Agent

What would you like to do?
```

---

## Troubleshooting

### Installation fails with "Cannot find module 'fs-extra'"

**Solution:**
```bash
npm install fs-extra chalk
npx bmad-install-agents
```

### Permission denied errors

**Solution:**
```bash
chmod +x scripts/*.js
npx bmad-install-agents
```

### Config file already exists

The installers are smart - they will:
- Update existing config files (not overwrite)
- Add missing agents to existing configuration
- Preserve your custom settings

To force a clean installation:
```bash
rm -rf _bmad/bme/_designos/
npx bmad-install-agents
```

### Installation succeeds but agents don't activate

**Check file paths:**
```bash
# Should list agent files
ls -la _bmad/bme/_designos/agents/

# Should list workflow files
ls -la _bmad/bme/_designos/workflows/empathy-map/
ls -la _bmad/bme/_designos/workflows/wireframe/
```

**Check config:**
```bash
cat _bmad/bme/_designos/config.yaml
```

---

## Next Steps

After successful installation:

1. **Read User Guides**
   - Emma: `_bmad-output/design-artifacts/EMMA-USER-GUIDE.md`
   - Wade: `_bmad-output/design-artifacts/WADE-USER-GUIDE.md`

2. **Create Your First Empathy Map**
   ```bash
   cat _bmad/bme/_designos/agents/empathy-mapper.md
   # Then type: EM
   ```

3. **Create Your First Wireframe**
   ```bash
   cat _bmad/bme/_designos/agents/wireframe-designer.md
   # Then type: WM
   ```

4. **Explore Advanced Features**
   - Party Mode: Collaborate with multiple agents
   - Validation workflows: Review and improve artifacts
   - Custom templates: Modify output templates for your needs

---

## Uninstallation

To remove BMAD-Enhanced agents:

```bash
# Remove all agent files
rm -rf _bmad/bme/_designos/

# Remove output directory (keeps your artifacts)
# WARNING: This deletes all empathy maps and wireframes!
rm -rf _bmad-output/design-artifacts/

# Uninstall npm package
npm uninstall bmad-enhanced
```

---

## Support

- **User Guides:** See `_bmad-output/design-artifacts/` after installation
- **Issues:** https://github.com/yourusername/BMAD-Enhanced/issues
- **Documentation:** [README.md](README.md)

---

**Version:** 1.0.3-alpha
**Last Updated:** 2026-02-15
**Status:** Production Ready (Emma ✅, Wade ✅)
