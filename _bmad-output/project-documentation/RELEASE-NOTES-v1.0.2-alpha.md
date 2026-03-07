# Convoke v1.0.2-alpha

**Bug fix release** - Fixes critical installation issues found during npm deployment testing.

## 🐛 Bug Fixes

### Fixed Wade Step File Installation (v1.0.1-alpha)
- **Issue:** Installer was trying to copy `step-05-components-interactions.md` but actual file was `step-05-components.md`
- **Impact:** Installation failed when copying Wade workflow files
- **Fix:** Corrected filename in `scripts/install-all-agents.js` and `scripts/install-wade.js`

### Fixed Missing User Guides (v1.0.2-alpha)
- **Issue:** User guides excluded from npm package due to `.npmignore` pattern ordering
- **Impact:** EMMA-USER-GUIDE.md and WADE-USER-GUIDE.md were not included in the published package
- **Fix:** Reordered `.npmignore` patterns so specific inclusions take precedence over general exclusions

## 📦 What's Included

### Agents (2)
- **Emma (empathy-mapper)** - Empathy Mapping Specialist 🎨
- **Wade (wireframe-designer)** - Wireframe Design Expert 🎨

### Package Contents
- Emma: agent + 6 workflow steps + template + 19KB user guide
- Wade: agent + 6 workflow steps + template + 43KB user guide
- Installation scripts (4 files)
- Documentation (README, INSTALLATION, LICENSE)
- **Total:** 55.6 KB (33 files)

## 📥 Installation

**Prerequisite:** Install BMAD Method first
```bash
npx bmad-method@alpha install
```

**Install Convoke:**
```bash
npm install convoke@alpha
npm run install:agents
```

**Or install specific version:**
```bash
npm install convoke@1.0.2-alpha
```

## ✅ Verification

All installation tests passing:
- ✅ Emma agent file (7.0 KB)
- ✅ Wade agent file (7.7 KB)
- ✅ Emma workflow (6 step files)
- ✅ Wade workflow (6 step files)
- ✅ Emma user guide (19 KB)
- ✅ Wade user guide (43 KB)
- ✅ Config files created
- ✅ Output directory structure

## 📚 Documentation

- [README.md](README.md) - Project overview
- [INSTALLATION.md](INSTALLATION.md) - Installation guide
- [EMMA-USER-GUIDE.md](_bmad-output/design-artifacts/EMMA-USER-GUIDE.md) - Emma documentation
- [WADE-USER-GUIDE.md](_bmad-output/design-artifacts/WADE-USER-GUIDE.md) - Wade documentation

## 🧪 Test Results

**Emma:**
- P0 Tests: 18/18 (100%)
- Live Tests: 5/5 (100%)

**Wade:**
- P0 Tests: 18/18 (100%)
- Live Tests: 5/5 (100%)

## 🔗 Links

**npm package:** https://www.npmjs.com/package/convoke
**GitHub:** https://github.com/amalik/convoke

## 📝 Changelog

### v1.0.2-alpha (2026-02-15)
- Fixed: User guides now included in npm package
- Fixed: Reordered .npmignore patterns for correct file inclusion

### v1.0.1-alpha (2026-02-15)
- Fixed: Wade step-05 filename in installer scripts
- Fixed: Installation no longer fails when copying Wade workflow files

### v1.0.0-alpha (2026-02-15)
- Initial release
- Emma (empathy-mapper) agent
- Wade (wireframe-designer) agent
- Complete installation system
- Comprehensive documentation

---

**Full Changelog:** https://github.com/amalik/convoke/compare/v1.0.0-alpha...v1.0.2-alpha
