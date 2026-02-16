# Changelog

All notable changes to BMAD-Enhanced will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.2] - 2026-02-17

### Fixed
- **CRITICAL: Installer scripts now reference correct agent file names**
  - Updated `install-all-agents.js` to copy `contextualization-expert.md` and `lean-experiments-specialist.md`
  - Updated `install-emma.js` to copy `contextualization-expert.md`
  - Updated `install-wade.js` to copy `lean-experiments-specialist.md`
  - Fixed config.yaml generation in all installers to use new agent names
  - Fixed agent-manifest.csv generation to reference correct file paths
  - Fixed Quick Start instructions in installer output

**Impact:** v1.1.1 had broken installer scripts that would fail when users ran `npx bmad-install-agents`. This patch fixes the installation process.

### Known Issues
- User guides still reference v1.0.0 content and will be updated in v1.2.0

---

## [1.1.1] - 2026-02-17

### Fixed
- **Agent file naming consistency:** Renamed agent files to match BMM module naming convention
  - `empathy-mapper.md` → `contextualization-expert.md`
  - `wireframe-designer.md` → `lean-experiments-specialist.md`
- Updated all workflow references to use new agent file names
- Updated config.yaml agent list with new names
- Fixed migration guide in v1.1.0 to reference correct agent file names

---

## [1.1.0] - 2026-02-16

### MAJOR REPOSITIONING: From Design Agents to Vortex Framework

This release represents a fundamental repositioning of BMAD-Enhanced from design-focused agents (empathy mapping, wireframing) to a Lean Startup validation framework.

### Changed
- **BREAKING:** Renamed module from `_designos` to `_vortex`
- **BREAKING:** Emma repositioned from "Empathy Mapping Specialist" to "Contextualization Expert" (icon: 🎯)
  - Focus: Strategic framing, lean personas, product vision, problem space navigation
  - Role: Guides teams through the "Contextualize" stream
  - New workflows: lean-persona, product-vision, contextualize-scope (empathy-map deprecated)
- **BREAKING:** Wade repositioned from "Wireframe Design Specialist" to "Lean Experiments Specialist" (icon: 🧪)
  - Focus: Build-Measure-Learn cycles, MVPs, validated learning
  - Role: Guides teams through the "Externalize" stream
  - New workflows: mvp, lean-experiment, proof-of-concept, proof-of-value (wireframe deprecated)
- **BREAKING:** Output folder changed from `_bmad-output/design-artifacts` to `_bmad-output/vortex-artifacts`
- Updated all installer scripts to reflect new module name and agent descriptions
- Updated config.yaml structure to version 1.1.0 with Vortex framework metadata
- Updated agent-manifest.csv with new agent identities and expertise

### Added
- Vortex framework structure with Contextualize and Externalize streams
- 7 new workflow placeholders (v1.2.0):
  - Emma (Contextualize): lean-persona, product-vision, contextualize-scope
  - Wade (Externalize): mvp, lean-experiment, proof-of-concept, proof-of-value
- Version field in config.yaml for better version tracking

### Migration Guide

**For existing users upgrading from 1.0.x:**

1. **Module path changed:**
   - Old: `_bmad/bme/_designos/`
   - New: `_bmad/bme/_vortex/`

2. **Output folder changed:**
   - Old: `_bmad-output/design-artifacts/`
   - New: `_bmad-output/vortex-artifacts/`

3. **Agent activation paths updated:**
   - Emma: `cat _bmad/bme/_vortex/agents/contextualization-expert.md`
   - Wade: `cat _bmad/bme/_vortex/agents/lean-experiments-specialist.md`

4. **Workflows replaced:**
   - Emma's empathy-map workflow → lean-persona workflow (coming in v1.2.0)
   - Wade's wireframe workflow → lean-experiment workflow (coming in v1.2.0)

5. **Clean reinstall recommended:**
   ```bash
   # Backup any custom configs
   # Remove old installation
   rm -rf _bmad/bme/_designos
   rm -rf _bmad-output/design-artifacts

   # Install v1.1.0
   npm install bmad-enhanced@1.1.0
   npx bmad-install-agents
   ```

### Positioning Rationale

**Why this change?**

The repositioning aligns Emma and Wade with Lean Startup and validated learning principles:

- **Emma (Contextualize):** Helps teams frame the right problem before building solutions
  - Differentiation: Emma contextualizes (problem space), Maya creates (solution space)
- **Wade (Externalize):** Helps teams validate assumptions through rapid experimentation
  - Differentiation: Wade externalizes (test with users), Sally internalizes (test with code)

This creates a clear value proposition: Use Emma + Wade for Lean Startup validation, then hand off to BMAD core agents for implementation.

### Technical Details
- Module version: 1.1.0
- Config structure: Updated with submodule metadata
- Backward compatibility: NONE (breaking changes require migration)
- Package size: ~55KB (unchanged)

### Notes
- v1.0.x workflows (empathy-map, wireframe) are deprecated
- New workflows (lean-persona, mvp, etc.) will be fully implemented in v1.2.0
- User guides will be updated in v1.2.0 to reflect new positioning

---

## [1.0.4-alpha] - 2026-02-16

### Fixed
- **Documentation:** All installation commands now correctly use `npm install bmad-enhanced@alpha` instead of `npm install bmad-enhanced`
- Updated installation instructions across all documentation files:
  - README.md
  - INSTALLATION.md
  - BMAD-METHOD-COMPATIBILITY.md
  - PUBLISHING-GUIDE.md
  - scripts/README.md
  - index.js

### Changed
- Updated CLI output in index.js to show npx commands instead of npm run commands
- Updated version references from 1.0.3-alpha to 1.0.4-alpha

### Notes
- v1.0.3-alpha was unpublished due to incorrect installation documentation
- This release contains the same functionality as 1.0.3-alpha with corrected docs

---

## [1.0.3-alpha] - 2026-02-15 (Unpublished)

### Added
- **npx bin commands** for user-friendly installation
  - `npx bmad-install-agents` - Install all agents (Emma + Wade)
  - `npx bmad-install-emma` - Install Emma only
  - `npx bmad-install-wade` - Install Wade only
- bin section in package.json with executable scripts
- Updated postinstall message to show npx commands

### Changed
- **BREAKING:** Installation command changed from `npm run install:agents` to `npx bmad-install-agents`
- Updated all documentation to use npx commands:
  - README.md
  - INSTALLATION.md
  - BMAD-METHOD-COMPATIBILITY.md
  - PUBLISHING-GUIDE.md
  - All other documentation files

### Fixed
- Installation now works correctly in user projects (previous `npm run` commands didn't work)
- Users can now install agents without package.json modifications

### Technical Details
- Added bin executables that npm automatically links to node_modules/.bin/
- Maintained backward compatibility with npm scripts for development

---

## [1.0.2-alpha] - 2026-02-15

### Added
- User guides now included in npm package (19KB Emma guide + 43KB Wade guide)

### Fixed
- **Bug:** User guides were excluded from npm package due to .npmignore pattern ordering
- Reordered .npmignore patterns so specific inclusions take precedence over general exclusions

### Changed
- Package size increased from 40KB to 55.6KB (due to user guides inclusion)

---

## [1.0.1-alpha] - 2026-02-15

### Fixed
- **Critical Bug:** Wade workflow installation failed due to filename mismatch
  - Installer tried to copy `step-05-components-interactions.md`
  - Actual filename was `step-05-components.md`
- Fixed in:
  - scripts/install-all-agents.js (line 114)
  - scripts/install-wade.js (line 72)

---

## [1.0.0-alpha] - 2026-02-15

### Added
- Initial release of BMAD-Enhanced
- **Emma (empathy-mapper)** - Empathy Mapping Specialist
  - 6-step empathy map workflow
  - Empathy map template
  - Validation workflow
  - Complete user guide (19KB)
- **Wade (wireframe-designer)** - Wireframe Design Expert
  - 6-step wireframe workflow
  - Wireframe template
  - Complete user guide (43KB)
- Complete installation system
  - BMAD Method prerequisite checking
  - Automatic agent file copying
  - Configuration file generation
  - User-friendly installation messages
- Comprehensive documentation
  - README.md with project overview
  - INSTALLATION.md with detailed installation guide
  - BMAD-METHOD-COMPATIBILITY.md explaining integration
  - User guides for both agents
- Test coverage
  - Emma: 18 P0 tests + 5 live tests (100% pass rate)
  - Wade: 18 P0 tests + 5 live tests (100% pass rate)

### Technical Details
- Package size: 40KB (initial)
- 33 files in package
- Dependencies: chalk (4.1.2), fs-extra (11.3.3)
- Node.js requirement: >=14.0.0
- License: MIT

---

## Version History

| Version | Date | Type | Description |
|---------|------|------|-------------|
| 1.0.3-alpha | 2026-02-15 | Feature | npx bin commands |
| 1.0.2-alpha | 2026-02-15 | Bug Fix | User guides included |
| 1.0.1-alpha | 2026-02-15 | Bug Fix | Wade filename fix |
| 1.0.0-alpha | 2026-02-15 | Initial | First release |

---

## Upgrade Guide

### From 1.0.2-alpha to 1.0.3-alpha

**Installation command changed:**

**Old:**
```bash
npm install bmad-enhanced@alpha
npm run install:agents  # This doesn't work
```

**New:**
```bash
npm install bmad-enhanced@alpha
npx bmad-install-agents  # This works!
```

**Note:** The old `npm run install:agents` command never actually worked in user projects. The new npx command is the correct installation method.

### From 1.0.1-alpha to 1.0.2-alpha

No changes to installation flow. User guides are now automatically included.

### From 1.0.0-alpha to 1.0.1-alpha

No changes to installation flow. Reinstallation will fix the Wade workflow bug.

---

## Links

- **npm Package:** https://www.npmjs.com/package/bmad-enhanced
- **GitHub Repository:** https://github.com/amalik/BMAD-Enhanced
- **BMAD Method:** https://github.com/bmadhub/bmad
- **Issues:** https://github.com/amalik/BMAD-Enhanced/issues

---

**For detailed technical documentation, see:**
- [README.md](README.md) - Project overview
- [INSTALLATION.md](INSTALLATION.md) - Installation guide
- [BMAD-METHOD-COMPATIBILITY.md](BMAD-METHOD-COMPATIBILITY.md) - Integration details
- User guides in `_bmad-output/design-artifacts/`
