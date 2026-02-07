---
title: "BMAD-Enhanced Distribution Strategy: Installation & Upgrade Mechanism"
date: 2026-02-07
version: 1.0.0
status: STRATEGIC DECISION REQUIRED
---

# BMAD-Enhanced Distribution Strategy

**Critical Question:** How do users add the 4 new agents (Emma, Wade, Quinn, Stan) to their existing BMAD Method installation?

**User's Insight:** BMAD-Enhanced might just be **a command to upgrade a BMAD Method installation** rather than a separate product.

---

## Current BMAD Method Installation

### How BMAD Method Works Today

**File Structure:**
```
project-root/
├── _bmad/
│   ├── core/
│   ├── bmm/
│   ├── cis/
│   ├── tea/
│   ├── bmb/
│   └── _config/
│       └── agent-manifest.csv
```

**Modules:**
- **core** - Base system (party mode, brainstorming, help)
- **bmm** - Business Method Module (analyst, architect, PM, dev, etc.)
- **cis** - Creative & Innovation Suite (design thinking, brainstorming, storytelling)
- **tea** - Test & Engineering Automation (test architect, quality workflows)
- **bmb** - BMAD Builder (agent-builder, module-builder, workflow-builder)

**21 Agents Registered in `agent-manifest.csv`**

### How Users Currently Add Modules/Agents

**From web research & codebase analysis:**

BMAD Method appears to use a **module-based installation system** where users can add/remove modules.

**Evidence:**
- Modules are self-contained directories (`_bmad/bmm/`, `_bmad/cis/`, etc.)
- Each module has its own `config.yaml`
- Agents reference their module: `module: "bmm"`, `module: "cis"`, etc.
- Agent manifest CSV has `module` column

**Implication:** BMAD Method likely supports adding new modules dynamically.

---

## Distribution Options for BMAD-Enhanced

### Option 1: BMAD-Enhanced as New Module (RECOMMENDED)

**Approach:** BMAD-Enhanced is a **module** that users install into existing BMAD Method.

**Installation Command:**
```bash
bmad install bmad-enhanced
# or
bmad-enhanced install
```

**File Structure After Installation:**
```
project-root/
├── _bmad/
│   ├── core/
│   ├── bmm/
│   ├── cis/
│   ├── tea/
│   ├── bmb/
│   └── bmad-enhanced/        # NEW MODULE
│       ├── config.yaml
│       ├── _designos/
│       │   ├── agents/
│       │   │   ├── empathy-mapper.md
│       │   │   └── wireframe-designer.md
│       │   └── workflows/
│       │       ├── empathy-map/
│       │       └── wireframe/
│       └── _agentos/
│           ├── agents/
│           │   ├── quality-gatekeeper.md
│           │   └── standards-auditor.md
│           └── workflows/
│               ├── quality-gate/
│               └── audit-standards/
└── _bmad/_config/
    └── agent-manifest.csv      # Updated with 4 new agents
```

**Agent Registration:**
```csv
# Added to agent-manifest.csv during installation
"empathy-mapper","Emma","Empathy Mapping Specialist","🎨","...","bmad-enhanced","_bmad/bmad-enhanced/_designos/agents/empathy-mapper.md"
"wireframe-designer","Wade","Wireframe Specialist","📐","...","bmad-enhanced","_bmad/bmad-enhanced/_designos/agents/wireframe-designer.md"
"quality-gatekeeper","Quinn","Quality Gate Specialist","🚦","...","bmad-enhanced","_bmad/bmad-enhanced/_agentos/agents/quality-gatekeeper.md"
"standards-auditor","Stan","Standards Compliance Auditor","📋","...","bmad-enhanced","_bmad/bmad-enhanced/_agentos/agents/standards-auditor.md"
```

**Pros:**
- ✅ Clean separation: BMAD-Enhanced is a plugin/module
- ✅ Users can install/uninstall independently
- ✅ Follows BMAD Method's modular architecture
- ✅ No conflicts with core BMAD Method
- ✅ Easy versioning (bmad-enhanced v1.0.0, v1.1.0, etc.)
- ✅ Users opt-in (not forced upgrade)

**Cons:**
- ⚠️ Requires BMAD Method to support module installation (verify this capability exists)
- ⚠️ Another module to maintain separately

---

### Option 2: BMAD-Enhanced as Upgrade to Existing Modules

**Approach:** BMAD-Enhanced **adds agents to existing CIS and TEA modules** instead of creating new module.

**Installation Command:**
```bash
bmad upgrade --add-enhanced-agents
# or
bmad-enhanced upgrade
```

**File Structure After Upgrade:**
```
project-root/
├── _bmad/
│   ├── cis/                    # EXISTING MODULE - ENHANCED
│   │   ├── agents/
│   │   │   ├── design-thinking-coach.md (existing)
│   │   │   ├── empathy-mapper.md        (NEW)
│   │   │   └── wireframe-designer.md    (NEW)
│   │   └── workflows/
│   │       ├── design-thinking/ (existing)
│   │       ├── empathy-map/     (NEW)
│   │       └── wireframe/       (NEW)
│   └── tea/                    # EXISTING MODULE - ENHANCED
│       ├── agents/
│       │   ├── tea.md                    (existing)
│       │   ├── quality-gatekeeper.md     (NEW)
│       │   └── standards-auditor.md      (NEW)
│       └── workflows/
│           ├── testarch/ (existing)
│           ├── quality-gate/     (NEW)
│           └── audit-standards/  (NEW)
```

**Agent Registration:**
```csv
# Added to agent-manifest.csv during upgrade
"empathy-mapper","Emma","Empathy Mapping Specialist","🎨","...","cis","_bmad/cis/agents/empathy-mapper.md"
"wireframe-designer","Wade","Wireframe Specialist","📐","...","cis","_bmad/cis/agents/wireframe-designer.md"
"quality-gatekeeper","Quinn","Quality Gate Specialist","🚦","...","tea","_bmad/tea/agents/quality-gatekeeper.md"
"standards-auditor","Stan","Standards Compliance Auditor","📋","...","tea","_bmad/tea/agents/standards-auditor.md"
```

**Pros:**
- ✅ Feels like a natural extension of existing modules
- ✅ Emma + Wade belong in CIS (Creative & Innovation Suite)
- ✅ Quinn + Stan belong in TEA (Test & Engineering Automation)
- ✅ No new module namespace (simpler conceptually)
- ✅ "Enhanced" versions of CIS and TEA modules

**Cons:**
- ❌ Modifies existing modules (potential conflicts)
- ❌ Harder to uninstall (can't remove without affecting CIS/TEA)
- ❌ Versioning complexity (is this CIS v2.0 or CIS v1.5-enhanced?)
- ❌ Users might not want ALL enhanced agents

---

### Option 3: BMAD-Enhanced as Separate Installation (Standalone)

**Approach:** BMAD-Enhanced is a **complete separate installation** with its own directory structure.

**Installation:**
```bash
git clone https://github.com/bmad-enhanced/bmad-enhanced.git
cd bmad-enhanced
./install.sh
```

**File Structure:**
```
project-root/
├── _bmad/                      # Original BMAD Method
│   └── ... (unchanged)
└── _bmad-enhanced/             # Completely separate
    ├── _config/
    │   └── agent-manifest.csv  # 4 new agents only
    ├── _designos/
    │   ├── agents/
    │   └── workflows/
    └── _agentos/
        ├── agents/
        └── workflows/
```

**Agent Registration:**
- BMAD-Enhanced has its own `_bmad-enhanced/_config/agent-manifest.csv`
- OR: Installation script merges into `_bmad/_config/agent-manifest.csv`

**Pros:**
- ✅ Complete independence from BMAD Method
- ✅ Can evolve separately
- ✅ No risk of conflicts with core BMAD

**Cons:**
- ❌ Duplicate infrastructure (two agent systems)
- ❌ Confusing for users (which system am I using?)
- ❌ Doesn't leverage BMAD Method's 21 existing agents
- ❌ Breaks party mode integration (agents in two separate systems)

---

### Option 4: BMAD-Enhanced as Quint-Style Integration (MCP Server)

**Approach:** Similar to how Quint integrates (MCP server + commands), BMAD-Enhanced could be an **external service**.

**Architecture:**
```
BMAD Method (host)
    ↓ (calls via MCP protocol)
BMAD-Enhanced Server
    ↓ (provides)
4 Agent Capabilities
```

**Installation:**
```bash
bmad-enhanced start-server
# Server runs on localhost:3000
# BMAD Method connects via MCP
```

**Pros:**
- ✅ Similar to Quint integration pattern
- ✅ Could work with multiple BMAD installations
- ✅ Agents could have complex backends (Node.js, Python, etc.)

**Cons:**
- ❌ Massive complexity increase (need server infrastructure)
- ❌ Doesn't fit "just markdown agents" approach
- ❌ Overkill for 4 simple agents
- ❌ Breaks simplicity of BMAD Method

---

## Recommended Approach: Option 1 (BMAD-Enhanced as Module)

### Why Option 1 is Best

**Aligns with BMAD Method Architecture:**
- BMAD Method is already modular (core, bmm, cis, tea, bmb)
- BMAD-Enhanced becomes the 6th module
- Module: `bmad-enhanced` or `bme`

**Clean User Experience:**
```bash
# User starts with BMAD Method (21 agents)
bmad --version
# BMAD Method v6.0.0

# User installs BMAD-Enhanced module
bmad install bmad-enhanced
# or if BMAD-Enhanced provides its own installer:
npm install -g bmad-enhanced-cli
bmad-enhanced install

# Now user has 25 agents (21 + 4)
# Slash commands work immediately:
/bmad-agent-bmad-enhanced-empathy-mapper
/bmad-agent-bmad-enhanced-wireframe-designer
/bmad-agent-bmad-enhanced-quality-gatekeeper
/bmad-agent-bmad-enhanced-standards-auditor
```

**Versioning:**
- BMAD Method: v6.0.0
- BMAD-Enhanced Module: v1.0.0
- Independent release cycles

**Uninstallation:**
```bash
bmad uninstall bmad-enhanced
# Back to 21 agents
```

---

## Implementation: Module Installation Mechanism

### Required: Install Script

**File:** `_bmad-enhanced/install.sh` (or `install.js`)

**What It Does:**
1. Detects BMAD Method installation directory
2. Copies `_bmad-enhanced/` module to `_bmad/bmad-enhanced/`
3. Updates `_bmad/_config/agent-manifest.csv` with 4 new agent entries
4. Creates module config: `_bmad/bmad-enhanced/config.yaml`
5. Runs validation checks

**Install Script Example:**
```bash
#!/bin/bash
# BMAD-Enhanced Module Installer

# Detect BMAD Method installation
if [ ! -d "_bmad" ]; then
  echo "Error: BMAD Method not found. Please install BMAD Method first."
  exit 1
fi

# Check BMAD Method version
BMAD_VERSION=$(cat _bmad/core/config.yaml | grep version | awk '{print $2}')
echo "Detected BMAD Method v$BMAD_VERSION"

# Copy module
echo "Installing BMAD-Enhanced module..."
cp -r _bmad-enhanced _bmad/bmad-enhanced

# Update agent manifest
echo "Registering 4 new agents..."
cat >> _bmad/_config/agent-manifest.csv <<EOF
"empathy-mapper","Emma","Empathy Mapping Specialist","🎨","User Empathy Expert","Design thinking expert...","Empathetic, curious...","Design is about THEM...","bmad-enhanced","_bmad/bmad-enhanced/_designos/agents/empathy-mapper.md"
"wireframe-designer","Wade","Wireframe Specialist","📐","UI/UX Wireframe Expert","Expert in rapid wireframe...","Visual thinker...","Simple first...","bmad-enhanced","_bmad/bmad-enhanced/_designos/agents/wireframe-designer.md"
"quality-gatekeeper","Quinn","Quality Gate Specialist","🚦","Quality Assurance Expert","Risk-based quality...","Data-driven...","Quality gates must be objective...","bmad-enhanced","_bmad/bmad-enhanced/_agentos/agents/quality-gatekeeper.md"
"standards-auditor","Stan","Standards Compliance Auditor","📋","Code Standards Expert","Meticulous standards...","Detail-oriented...","Consistency is maintainability...","bmad-enhanced","_bmad/bmad-enhanced/_agentos/agents/standards-auditor.md"
EOF

# Create module config
cat > _bmad/bmad-enhanced/config.yaml <<EOF
# BMAD-Enhanced Module Configuration
module_name: bmad-enhanced
version: 1.0.0
description: "Enhanced design and quality agents inspired by DesignOS and AgentOS"
author: "BMAD-Enhanced Core Team"

# Inherit from core config
config_source: "{project-root}/_bmad/core/config.yaml"
user_name: "{config_source}:user_name"
communication_language: "{config_source}:communication_language"
output_folder: "{config_source}:output_folder"
EOF

echo "✅ BMAD-Enhanced v1.0.0 installed successfully!"
echo ""
echo "New agents available:"
echo "  /bmad-agent-bmad-enhanced-empathy-mapper      (Emma)"
echo "  /bmad-agent-bmad-enhanced-wireframe-designer  (Wade)"
echo "  /bmad-agent-bmad-enhanced-quality-gatekeeper  (Quinn)"
echo "  /bmad-agent-bmad-enhanced-standards-auditor   (Stan)"
echo ""
echo "Run '/bmad-party-mode' to see all 25 agents!"
```

---

## Slash Command Naming

### Option A: Long Form (Explicit Module)
```
/bmad-agent-bmad-enhanced-empathy-mapper
/bmad-agent-bmad-enhanced-wireframe-designer
/bmad-agent-bmad-enhanced-quality-gatekeeper
/bmad-agent-bmad-enhanced-standards-auditor
```

**Pros:** Clear which module agents belong to
**Cons:** Verbose

---

### Option B: Short Form (Assume bmad-enhanced)
```
/bmad-agent-empathy-mapper
/bmad-agent-wireframe-designer
/bmad-agent-quality-gatekeeper
/bmad-agent-standards-auditor
```

**Pros:** Shorter, cleaner
**Cons:** Possible naming conflicts with other modules

---

### Option C: Module Alias (bme)
```
/bmad-agent-bme-empathy-mapper
/bmad-agent-bme-wireframe-designer
/bmad-agent-bme-quality-gatekeeper
/bmad-agent-bme-standards-auditor
```

**Pros:** Short but clear
**Cons:** Users need to learn "bme" = BMAD-Enhanced

---

### Recommendation: Option B with Fallback to A

**Primary:** Short form (Option B) - `/bmad-agent-empathy-mapper`
**If conflict:** Add module prefix - `/bmad-agent-bmad-enhanced-empathy-mapper`

Agent naming in manifest CSV uses short form:
```csv
"empathy-mapper","Emma",...
```

Slash command generation strips module prefix if no conflicts.

---

## Alternative Agent Names (Shorter)

### Current Naming
- `empathy-mapper` → `/bmad-agent-empathy-mapper`
- `wireframe-designer` → `/bmad-agent-wireframe-designer`
- `quality-gatekeeper` → `/bmad-agent-quality-gatekeeper`
- `standards-auditor` → `/bmad-agent-standards-auditor`

### Alternative: Design/Quality Prefixes
- `design-empathy` → `/bmad-agent-design-empathy`
- `design-wireframe` → `/bmad-agent-design-wireframe`
- `quality-gate` → `/bmad-agent-quality-gate`
- `quality-standards` → `/bmad-agent-quality-standards`

**Benefit:** Groups agents by domain (design-*, quality-*)

### Alternative: Single-Word Names
- `empathy` → `/bmad-agent-empathy` (might conflict with CIS agents)
- `wireframe` → `/bmad-agent-wireframe`
- `qualitygate` → `/bmad-agent-qualitygate`
- `standards` → `/bmad-agent-standards`

**Benefit:** Very short
**Risk:** Naming conflicts

---

## User Journey: Installing BMAD-Enhanced

### Scenario: Developer Upgrades BMAD Method

**Step 1: User Has BMAD Method**
```bash
cd my-project
# BMAD Method v6.0.0 installed
# 21 agents available
```

**Step 2: User Installs BMAD-Enhanced**
```bash
# Option A: Via BMAD CLI (if supported)
bmad install bmad-enhanced

# Option B: Via npm (if published)
npm install -g bmad-enhanced-cli
bmad-enhanced install

# Option C: Manual installation
git clone https://github.com/bmad-enhanced/bmad-enhanced.git
cd bmad-enhanced
./install.sh
```

**Step 3: BMAD-Enhanced Installed**
```
✅ BMAD-Enhanced v1.0.0 installed successfully!

New agents available:
  /bmad-agent-empathy-mapper      (Emma - Empathy Mapping Specialist)
  /bmad-agent-wireframe-designer  (Wade - Wireframe Specialist)
  /bmad-agent-quality-gatekeeper  (Quinn - Quality Gate Specialist)
  /bmad-agent-standards-auditor   (Stan - Standards Compliance Auditor)

Run '/bmad-party-mode' to see all 25 agents!
```

**Step 4: User Invokes New Agent**
```
User: /bmad-agent-empathy-mapper

Emma: Hi! 🎨 I'm Emma, your Empathy Mapping Specialist. I help teams deeply understand users through structured empathy mapping.

[MH] Redisplay Menu
[CH] Chat with Emma
[EM] Create Empathy Map
[VM] Validate Existing Empathy Map
[PM] Start Party Mode
[DA] Dismiss Agent

What would you like to do?
```

**Step 5: User Uses Party Mode**
```
User: /bmad-party-mode

Party Mode: 🎉 PARTY MODE ACTIVATED! 🎉

Welcome Amalik! All 25 BMAD agents are here and ready for a dynamic group discussion.

**Agents available:**
- BMM: Mary (Analyst), Winston (Architect), John (PM), Amelia (Dev), ...
- CIS: Maya (Design Thinking), Carson (Brainstorming), ...
- TEA: Murat (Test Architect)
- BMAD-Enhanced: Emma (Empathy Mapper), Wade (Wireframe), Quinn (Quality Gate), Stan (Standards)

What would you like to discuss with the team?

User: How do we ensure our new authentication feature is well-designed and high-quality?

Party Mode selects: Emma, Winston, Quinn, Murat

Emma: Let's start by understanding the user's perspective. Who is the primary user trying to authenticate?

Winston: From an architectural perspective, we need to decide between session-based and token-based auth...

Quinn: Before we build anything, I need clear quality criteria. What are the must-have security properties?

Murat: I'll need acceptance tests defined upfront. Let's use ATDD...
```

---

## Distribution Packaging

### GitHub Repository Structure

**Repository:** `bmad-enhanced/bmad-enhanced`

```
bmad-enhanced/
├── README.md
├── LICENSE
├── package.json (if npm distribution)
├── install.sh (installation script)
├── uninstall.sh
├── _bmad-enhanced/          # Module files
│   ├── config.yaml
│   ├── _designos/
│   │   ├── agents/
│   │   │   ├── empathy-mapper.md
│   │   │   └── wireframe-designer.md
│   │   └── workflows/
│   │       ├── empathy-map/
│   │       └── wireframe/
│   └── _agentos/
│       ├── agents/
│       │   ├── quality-gatekeeper.md
│       │   └── standards-auditor.md
│       └── workflows/
│           ├── quality-gate/
│           └── audit-standards/
└── docs/
    ├── installation.md
    └── usage-guide.md
```

### Installation Methods

**Method 1: Direct Git Clone + Install Script**
```bash
git clone https://github.com/bmad-enhanced/bmad-enhanced.git
cd bmad-enhanced
./install.sh
```

**Method 2: npm Package (if published)**
```bash
npm install -g bmad-enhanced-cli
bmad-enhanced install
```

**Method 3: BMAD CLI Extension (if supported)**
```bash
bmad install bmad-enhanced
```

---

## Recommendation Summary

### Recommended Distribution Strategy

**BMAD-Enhanced as Module (Option 1)**

**What This Means:**
1. BMAD-Enhanced is a **module** that plugs into BMAD Method
2. Users install via `./install.sh` script
3. Script copies `_bmad-enhanced/` into `_bmad/bmad-enhanced/`
4. Script updates `agent-manifest.csv` with 4 new agents
5. Agents immediately available via slash commands

**User Experience:**
- Install: `git clone` + `./install.sh`
- Invoke: `/bmad-agent-empathy-mapper`
- Party mode: Automatically includes all 25 agents (21 + 4)
- Uninstall: `./uninstall.sh`

**Project Positioning:**
- **BMAD Method:** Core product (21 agents, proven workflows)
- **BMAD-Enhanced:** Optional module (4 additional agents inspired by DesignOS/AgentOS)
- **Tagline:** "Enhance your BMAD Method installation with advanced design and quality agents"

**Versioning:**
- BMAD Method: v6.0.0 (independent)
- BMAD-Enhanced: v1.0.0 (independent)

---

## Action Items

### Phase 0 Updates Needed

**Implementation Guide:**
- [ ] Add "Installation" section explaining module approach
- [ ] Update file paths to use `_bmad/bmad-enhanced/` structure
- [ ] Add install.sh script to deliverables

**Agent Files:**
- [ ] Update agent paths in CSV registration examples
- [ ] Use `module: "bmad-enhanced"` in all agent files
- [ ] Update config paths to reference core config

**Testing:**
- [ ] Add installation testing to Phase 0
- [ ] Test agent registration in manifest CSV
- [ ] Test slash command generation
- [ ] Test party mode with 25 agents

### Phase 1: Create Distribution Package

**Deliverables:**
- [ ] Install script (`install.sh`)
- [ ] Uninstall script (`uninstall.sh`)
- [ ] README.md with installation instructions
- [ ] LICENSE file
- [ ] GitHub repository setup
- [ ] (Optional) npm package for CLI distribution

---

## Questions for User

1. **Module Name:** Use `bmad-enhanced` or shorter alias like `bme`?

2. **Installation Method:** Git clone + script (simple) or npm package (polished)?

3. **Slash Command Naming:** Long form (`/bmad-agent-bmad-enhanced-empathy-mapper`) or short form (`/bmad-agent-empathy-mapper`)?

4. **Directory Structure:** Keep `_bmad-enhanced/_designos/` and `_bmad-enhanced/_agentos/` OR flatten to `_bmad-enhanced/agents/` and `_bmad-enhanced/workflows/`?

5. **BMAD Method Dependency:** Should BMAD-Enhanced check for minimum BMAD Method version (e.g., v6.0.0+)?

---

**End of Distribution Strategy Analysis**
