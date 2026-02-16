# Changelog

All notable changes to BMAD-Enhanced will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
