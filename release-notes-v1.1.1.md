# v1.1.1: Agent Naming Consistency + Vortex Pattern

This patch release fixes agent file naming consistency and builds on v1.1.0's **major repositioning** from design-focused agents to the **Vortex Pattern** for Lean Startup validation.

## 🎯 What's New in v1.1.x

### Major Repositioning (v1.1.0)
BMAD-Enhanced has evolved from design-focused tooling to a **Lean Startup validation framework**:

**Emma 🎯 - Contextualization Expert** (formerly Empathy Mapping Specialist)
- **New focus:** Strategic framing, lean personas, product vision, problem space navigation
- **Role:** Guides teams through the "Contextualize" stream - answering WHO, WHY, and WHICH problem
- **New workflows:** lean-persona, product-vision, contextualize-scope

**Wade 🧪 - Lean Experiments Specialist** (formerly Wireframe Design Specialist)
- **New focus:** Build-Measure-Learn cycles, MVPs, validated learning
- **Role:** Guides teams through the "Externalize" stream - creating experiments for validated learning
- **New workflows:** mvp, lean-experiment, proof-of-concept, proof-of-value

**Module renamed:** `_designos` → `_vortex` (Vortex Pattern)

## 🔧 Fixed in v1.1.1

Agent file naming now matches the BMM module naming convention, ensuring consistency across the BMAD-Enhanced framework.

### Agent File Renames
- `empathy-mapper.md` → `contextualization-expert.md` (Emma 🎯)
- `wireframe-designer.md` → `lean-experiments-specialist.md` (Wade 🧪)

### Documentation Updates
- ✅ Updated all workflow references to use new agent file names
- ✅ Updated `config.yaml` agent list with new names
- ✅ Fixed migration guide in v1.1.0 CHANGELOG to reference correct agent paths
- ✅ Updated README.md with correct agent activation paths

### Impact
This is a **non-breaking change** for users - the agents themselves remain the same (Emma and Wade), only the internal file structure has been standardized. Existing installations will continue to work.

---

## 🔄 Upgrading from v1.0.x

If you're upgrading from v1.0.x, note these **breaking changes** from v1.1.0:

### Module Path Changed
- **Old:** `_bmad/bme/_designos/`
- **New:** `_bmad/bme/_vortex/`

### Agent Activation Paths
- **Emma:** `cat _bmad/bme/_vortex/agents/contextualization-expert.md`
- **Wade:** `cat _bmad/bme/_vortex/agents/lean-experiments-specialist.md`

### Output Folder Changed
- **Old:** `_bmad-output/design-artifacts/`
- **New:** `_bmad-output/vortex-artifacts/`

### Recommended
Clean reinstall recommended when upgrading from v1.0.x:
```bash
# Backup any custom configs first
npm install bmad-enhanced@latest
npx bmad-install-agents
```

---

## 📦 Installation

```bash
npm install bmad-enhanced
```

Or install specific agents:
```bash
npx bmad-install-emma    # Install Emma (Contextualization Expert)
npx bmad-install-wade    # Install Wade (Lean Experiments Specialist)
npx bmad-install-agents  # Install all agents
```

## 📝 Full Changelog

See [CHANGELOG.md](https://github.com/amalik/BMAD-Enhanced/blob/main/CHANGELOG.md) for complete details.

## 🔗 Links

- **npm package:** https://www.npmjs.com/package/bmad-enhanced
- **Version:** 1.1.1
- **Previous release:** [v1.1.0](https://github.com/amalik/BMAD-Enhanced/releases/tag/v1.1.0)
