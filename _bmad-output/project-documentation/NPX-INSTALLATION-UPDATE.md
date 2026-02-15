# npx Installation Method Update

**Date:** 2026-02-15
**Issue:** Documentation showed git clone for BMAD Method instead of npx command
**Status:** ✅ RESOLVED

---

## Problem

User correctly identified that documentation recommended:
```bash
git clone https://github.com/bmadhub/bmad.git
cd bmad && npm install
```

But should recommend the simpler npx command:
```bash
npx bmad-method@alpha install
```

---

## Why npx is Better

### Benefits of npx

✅ **Simpler** - One command vs multiple steps
✅ **No repo cloning** - Installs directly from npm
✅ **Version control** - Easy to specify version (@alpha, @latest, @1.0.0)
✅ **Auto-cleanup** - npx doesn't leave packages in global scope
✅ **Standard npm practice** - Modern JavaScript ecosystem standard

### Comparison

**Old method (git clone):**
```bash
git clone https://github.com/bmadhub/bmad.git
cd bmad && npm install
```
- 2 commands
- Requires git
- Creates local clone
- Need to manage git updates

**New method (npx):**
```bash
npx bmad-method@alpha install
```
- 1 command
- No git required
- Installs from npm registry
- Easy version upgrades

---

## Files Updated

### 1. Installation Scripts (3 files)

**[scripts/install-all-agents.js](scripts/install-all-agents.js)**
**[scripts/install-emma.js](scripts/install-emma.js)**
**[scripts/install-wade.js](scripts/install-wade.js)**

**Before:**
```javascript
console.log('Please install BMAD Method:');
console.log(`  ${CYAN}git clone https://github.com/bmadhub/bmad.git${RESET}`);
console.log(`  ${CYAN}cd bmad && npm install${RESET}`);
console.log('');
console.log('Or if using Claude Code/Claude.ai:');
console.log(`  ${CYAN}Follow BMAD Method installation instructions${RESET}`);
```

**After:**
```javascript
console.log('Please install BMAD Method:');
console.log(`  ${CYAN}npx bmad-method@alpha install${RESET}`);
```

**Changes:**
- Replaced 2-step git clone with single npx command
- Removed Claude Code/Claude.ai conditional (npx works everywhere)
- Cleaner, simpler error message

---

### 2. Documentation Files (3 files)

**[README.md](README.md) - Prerequisites Section**

**Before:**
```markdown
```bash
# Install BMAD Method first
git clone https://github.com/bmadhub/bmad.git
cd bmad && npm install
```
```

**After:**
```markdown
```bash
# Install BMAD Method first
npx bmad-method@alpha install
```
```

---

**[INSTALLATION.md](INSTALLATION.md) - Step 1**

**Before:**
```markdown
### Step 1: Install BMAD Method

```bash
# Clone BMAD Method repository
git clone https://github.com/bmadhub/bmad.git
cd bmad

# Install BMAD Method
npm install

# Verify BMAD is installed
ls _bmad/  # Should show BMAD directory structure
```
```

**After:**
```markdown
### Step 1: Install BMAD Method

```bash
# Install BMAD Method using npx
npx bmad-method@alpha install

# Verify BMAD is installed
ls _bmad/  # Should show BMAD directory structure
```
```

---

**[BMAD-METHOD-COMPATIBILITY.md](BMAD-METHOD-COMPATIBILITY.md) - Installation Flow**

**Before:**
```markdown
```bash
# Step 1: Install BMAD Method (required)
git clone https://github.com/bmadhub/bmad.git
cd bmad && npm install

# Step 2: Install BMAD-Enhanced agents (extension)
npm install bmad-enhanced
npx bmad-install-agents
```
```

**After:**
```markdown
```bash
# Step 1: Install BMAD Method (required)
npx bmad-method@alpha install

# Step 2: Install BMAD-Enhanced agents (extension)
npm install bmad-enhanced
npx bmad-install-agents
```
```

---

**[PREREQUISITE-CHECK-UPDATE.md](PREREQUISITE-CHECK-UPDATE.md) - Multiple Locations**

Updated all 4 instances of git clone to npx command.

---

## Complete Installation Flow

### User Perspective

**Step 1: Install BMAD Method**
```bash
npx bmad-method@alpha install
```

What happens:
- npx downloads bmad-method@alpha from npm
- Executes the install command
- Creates `_bmad/` directory structure
- Sets up BMAD Method core

**Step 2: Install BMAD-Enhanced**
```bash
npm install bmad-enhanced
npx bmad-install-agents
```

What happens:
- npm installs bmad-enhanced package
- Checks for `_bmad/` directory (BMAD Method prerequisite)
- If found: Copies Emma + Wade agents to `_bmad/bme/_designos/`
- If not found: Error with instruction to run `npx bmad-method@alpha install`

**Step 3: Use Agents**
```bash
cat _bmad/bme/_designos/agents/empathy-mapper.md  # Activate Emma
cat _bmad/bme/_designos/agents/wireframe-designer.md  # Activate Wade
```

---

## Error Message

If user tries to install BMAD-Enhanced without BMAD Method:

**Before:**
```
✗ BMAD Method not found!

BMAD-Enhanced requires BMAD Method to be installed first.

Please install BMAD Method:
  git clone https://github.com/bmadhub/bmad.git
  cd bmad && npm install

Or if using Claude Code/Claude.ai:
  Follow BMAD Method installation instructions

Then run this installer again.
```

**After:**
```
✗ BMAD Method not found!

BMAD-Enhanced requires BMAD Method to be installed first.

Please install BMAD Method:
  npx bmad-method@alpha install

Then run this installer again.
```

**Improvements:**
- Simpler (1 command vs 2)
- Works everywhere (no special case for Claude Code)
- Easier to copy/paste
- Follows npm best practices

---

## Version Control

### Current Version
```bash
npx bmad-method@alpha install  # Alpha version
```

### Future Versions
```bash
npx bmad-method@latest install  # Latest stable
npx bmad-method@1.0.0 install   # Specific version
npx bmad-method install         # Default (latest)
```

### Compatibility
BMAD-Enhanced can recommend specific BMAD Method versions:
```bash
# For compatibility with BMAD-Enhanced v1.0.0-alpha
npx bmad-method@alpha install

# Future: Specific version requirement
npx bmad-method@1.2.0 install
```

---

## Benefits for Users

### Simplicity
- **1 command** instead of 2
- No need to understand git clone
- No directory navigation

### Version Management
```bash
# Upgrade BMAD Method
npx bmad-method@latest install

# Downgrade if needed
npx bmad-method@1.0.0 install

# Test alpha features
npx bmad-method@alpha install
```

### No Git Required
- Users without git can still install
- Especially important for:
  - Windows users (git not always installed)
  - CI/CD environments
  - Restricted environments

### Standard Practice
- Follows npm ecosystem conventions
- Familiar to JavaScript developers
- Same pattern as other CLI tools:
  ```bash
  npx create-react-app my-app
  npx degit user/repo
  npx @angular/cli new my-app
  ```

---

## Benefits for You (Maintainer)

### Clearer Dependency
- BMAD Method is on npm
- Version tracking is explicit
- Can specify compatible versions in docs

### Easier Support
- Single installation command
- Less chance of user error
- Consistent across all platforms

### Professional Distribution
- Industry standard approach
- Easier for enterprise adoption
- Better for tutorials/documentation

---

## Testing Recommendations

Before publishing, test the flow:

```bash
# Test 1: Clean install
rm -rf _bmad/
npx bmad-method@alpha install
ls _bmad/  # Verify directory created

# Test 2: BMAD-Enhanced install
npm install bmad-enhanced
npx bmad-install-agents
cat _bmad/bme/_designos/agents/empathy-mapper.md  # Verify Emma works

# Test 3: Error handling
rm -rf _bmad/
npx bmad-install-agents  # Should error with npx instruction
```

---

## Documentation Consistency

All documentation now consistently shows:

✅ **Installation Scripts** - npx command in error messages
✅ **README.md** - npx command in prerequisites
✅ **INSTALLATION.md** - npx command in Step 1
✅ **BMAD-METHOD-COMPATIBILITY.md** - npx command in installation flow
✅ **PREREQUISITE-CHECK-UPDATE.md** - npx command in examples

**Total files updated:** 7 files
**Total instances replaced:** ~10 instances

---

## Summary

**Problem:** Documentation showed git clone for BMAD Method
**Solution:** Updated to npx bmad-method@alpha install
**Impact:** Simpler, more professional, standard npm practice

**Changes:**
- 3 installation scripts updated
- 4 documentation files updated
- Error messages simplified
- Installation flow modernized

**Benefits:**
- 1 command vs 2 commands
- No git required
- Version control built-in
- Industry standard approach

---

**Status:** ✅ COMPLETE
**Date:** 2026-02-15
**Version:** BMAD-Enhanced v1.0.0-alpha

All documentation and code now uses `npx bmad-method@alpha install` for BMAD Method installation.
