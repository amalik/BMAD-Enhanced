# v1.1.2: Critical Installer Fix

## 🚨 Critical Bug Fix

This patch release fixes **broken installer scripts** in v1.1.1 that prevented users from successfully installing agents.

### What Was Broken in v1.1.1
The v1.1.1 installer scripts referenced old agent file names (`empathy-mapper.md`, `wireframe-designer.md`) that no longer existed, causing installation failures when users ran:
```bash
npx bmad-install-agents
npx bmad-install-emma
npx bmad-install-wade
```

### What's Fixed in v1.1.2
✅ All 3 installer scripts now correctly reference new agent file names:
- `contextualization-expert.md` (Emma 🎯)
- `lean-experiments-specialist.md` (Wade 🧪)

✅ Fixed in all installers:
- Agent file copying
- Config.yaml generation
- Agent-manifest.csv generation
- Quick Start instructions in output

**Impact:** Users can now successfully install bmad-enhanced agents via npx commands.

---

## 📦 Installation

```bash
npm install bmad-enhanced
```

Then install agents:
```bash
npx bmad-install-agents  # Install both Emma + Wade
npx bmad-install-emma    # Install Emma only
npx bmad-install-wade    # Install Wade only
```

---

## 🎯 About BMAD-Enhanced v1.1.x

BMAD-Enhanced has evolved from design-focused tooling to the **Vortex Pattern** for Lean Startup validation:

**Emma 🎯 - Contextualization Expert**
- Strategic framing, lean personas, product vision
- Guides teams through the "Contextualize" stream

**Wade 🧪 - Lean Experiments Specialist**
- Build-Measure-Learn cycles, MVPs, validated learning
- Guides teams through the "Externalize" stream

See [v1.1.1 release notes](https://github.com/amalik/BMAD-Enhanced/releases/tag/v1.1.1) for full details on the Vortex Pattern repositioning.

---

## 📝 Full Changelog

See [CHANGELOG.md](https://github.com/amalik/BMAD-Enhanced/blob/main/CHANGELOG.md) for complete details.

## 🔗 Links

- **npm package:** https://www.npmjs.com/package/bmad-enhanced
- **Version:** 1.1.2
- **Previous release:** [v1.1.1](https://github.com/amalik/BMAD-Enhanced/releases/tag/v1.1.1)
