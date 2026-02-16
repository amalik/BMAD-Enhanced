# BMAD-Enhanced v1.0.3-alpha

**Release Date:** 2026-02-15
**Type:** Feature Release (Alpha)
**Status:** Published on npm

---

## 🎉 What's New

### User-Friendly npx Installation Commands

The biggest improvement in this release is **user-friendly installation**. No more confusion about npm scripts!

**New Installation Flow:**
```bash
# Step 1: Install BMAD Method
npx bmad-method@alpha install

# Step 2: Install BMAD-Enhanced
npm install bmad-enhanced@alpha

# Step 3: Install agents (NEW - this now works!)
npx bmad-install-agents
```

**What Changed:**
- Previous versions incorrectly documented `npm run install:agents` (which didn't work in user projects)
- Now uses npx bin executables that work from any directory
- Clean, professional installation experience

---

## ✨ Features

### New npx Commands

Three new executable commands are now available after installing the package:

```bash
npx bmad-install-agents  # Install all agents (Emma + Wade)
npx bmad-install-emma    # Install Emma only
npx bmad-install-wade    # Install Wade only
```

### Updated Postinstall Message

After running `npm install bmad-enhanced@alpha`, you'll see:

```
BMAD-Enhanced installed!

To install agents into your project, run:

  npx bmad-install-agents  - Install all agents (Emma + Wade)

Or install individually:
  npx bmad-install-emma    - Install Emma (empathy-mapper)
  npx bmad-install-wade    - Install Wade (wireframe-designer)
```

---

## 📦 What's Included

### Agents (2)

**Emma (empathy-mapper)** - Empathy Mapping Specialist 🎨
- 6-step empathy map workflow
- Empathy map template
- Validation workflow
- 19KB comprehensive user guide
- 100% test pass rate (18 P0 + 5 live tests)

**Wade (wireframe-designer)** - Wireframe Design Expert 🎨
- 6-step wireframe workflow
- Wireframe template
- 43KB comprehensive user guide
- 100% test pass rate (18 P0 + 5 live tests)

### Package Stats

- **Size:** 55.6 KB (compressed)
- **Unpacked:** 192.7 KB
- **Files:** 33 total
- **Dependencies:** chalk, fs-extra

---

## 🔧 Technical Changes

### Added
- `bin` section in package.json with 3 executable scripts
- Executable shebang lines in all installer scripts (already present)
- Updated postinstall message with npx commands

### Changed
- **BREAKING:** Installation command changed from `npm run install:agents` to `npx bmad-install-agents`
- Updated all documentation to use npx commands:
  - README.md
  - INSTALLATION.md
  - BMAD-METHOD-COMPATIBILITY.md
  - PUBLISHING-GUIDE.md
  - All supporting documentation

### Fixed
- Installation now works correctly in user projects
- Users can install agents without modifying their package.json
- Clear, actionable installation instructions

---

## 📚 Documentation Updates

All documentation has been updated to reflect the new npx commands:

- ✅ README.md - Updated installation instructions
- ✅ INSTALLATION.md - Updated all examples
- ✅ BMAD-METHOD-COMPATIBILITY.md - Updated integration flow
- ✅ CHANGELOG.md - New comprehensive changelog
- ✅ Repository cleanup - Historical docs archived

---

## 🧪 Testing

### Comprehensive Testing Completed

**Local Testing:**
- ✅ npx commands work correctly
- ✅ All files install properly
- ✅ Error handling works (missing BMAD Method)
- ✅ User guides included

**Published Package Testing:**
- ✅ Installed from npm registry
- ✅ npx commands functional
- ✅ Emma installed (7.0 KB)
- ✅ Wade installed (7.7 KB)
- ✅ User guides present (19 KB + 43 KB)

**Test Results:**
- Emma: 18/18 P0 tests ✅, 5/5 live tests ✅
- Wade: 18/18 P0 tests ✅, 5/5 live tests ✅
- Installation: 100% success rate ✅

---

## 🚀 Upgrade Guide

### From v1.0.2-alpha to v1.0.3-alpha

**The installation command has changed:**

**Old (didn't work):**
```bash
npm install bmad-enhanced@alpha
npm run install:agents  # ❌ This never worked
```

**New (works!):**
```bash
npm install bmad-enhanced@alpha
npx bmad-install-agents  # ✅ This works!
```

**Note:** If you already have v1.0.2-alpha installed, simply upgrade:
```bash
npm install bmad-enhanced@alpha  # Upgrades to v1.0.3-alpha
npx bmad-install-agents           # Use new command
```

---

## 🐛 Known Issues

None. All tests passing.

---

## 📋 Changelog Summary

### v1.0.3-alpha (2026-02-15) - Current Release
- Added npx bin commands for installation
- Updated all documentation
- Comprehensive testing and verification

### v1.0.2-alpha (2026-02-15)
- Fixed: User guides now included in package
- Fixed: .npmignore pattern ordering

### v1.0.1-alpha (2026-02-15)
- Fixed: Wade step-05 filename mismatch
- Fixed: Installation failure for Wade workflow

### v1.0.0-alpha (2026-02-15)
- Initial release
- Emma and Wade agents
- Complete installation system

**Full Changelog:** [CHANGELOG.md](CHANGELOG.md)

---

## 🔗 Links

- **npm Package:** https://www.npmjs.com/package/bmad-enhanced
- **GitHub Repository:** https://github.com/amalik/BMAD-Enhanced
- **BMAD Method:** https://github.com/bmadhub/bmad
- **Issues:** https://github.com/amalik/BMAD-Enhanced/issues

---

## 📥 Installation

### Prerequisites

BMAD Method must be installed first:
```bash
npx bmad-method@alpha install
```

### Install BMAD-Enhanced

```bash
npm install bmad-enhanced@alpha
npx bmad-install-agents
```

That's it! Emma and Wade are now installed.

### Activate Agents

```bash
# Activate Emma
cat _bmad/bme/_designos/agents/empathy-mapper.md

# Activate Wade
cat _bmad/bme/_designos/agents/wireframe-designer.md
```

---

## 🎯 What's Next

### Upcoming Features
- Sage (quality-gatekeeper) - Quality Gates & Decision Workflows
- Stan (standards-auditor) - Standards Compliance & Audit

### Future Enhancements
- Video installation tutorial
- Interactive installation wizard
- Additional agent personalities

---

## 🙏 Acknowledgments

**Testing:** Comprehensive test plan executed with 100% pass rate

**Documentation:** Complete user guides, installation guides, and compatibility docs

**Quality:** Professional installation experience with clear error handling

---

## ✅ Verification

To verify your installation:

```bash
# Check installed version
npm list bmad-enhanced

# Verify agents installed
ls -lh _bmad/bme/_designos/agents/

# Verify user guides
ls -lh _bmad-output/design-artifacts/
```

Expected output:
- bmad-enhanced@1.0.3-alpha
- empathy-mapper.md (7.0 KB)
- wireframe-designer.md (7.7 KB)
- EMMA-USER-GUIDE.md (19 KB)
- WADE-USER-GUIDE.md (43 KB)

---

**Questions or Issues?**

- 📝 [Open an Issue](https://github.com/amalik/BMAD-Enhanced/issues)
- 📖 [Read the Docs](https://github.com/amalik/BMAD-Enhanced)
- 💬 Check existing issues for solutions

---

**Thank you for using BMAD-Enhanced!** 🎉
