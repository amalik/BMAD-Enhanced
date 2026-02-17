#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

// Check if update system is available
const versionDetectorPath = path.join(__dirname, 'update/lib/version-detector.js');
const registryPath = path.join(__dirname, 'update/migrations/registry.js');

const hasUpdateSystem = fs.existsSync(versionDetectorPath) && fs.existsSync(registryPath);

// ANSI color codes
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';

async function main() {
  console.log('');
  console.log(`${BOLD}BMAD-Enhanced installed!${RESET}`);
  console.log('');

  // If update system available, check for upgrades
  if (hasUpdateSystem) {
    const versionDetector = require('./update/lib/version-detector');
    const registry = require('./update/migrations/registry');

    const currentVersion = versionDetector.getCurrentVersion();
    const targetVersion = versionDetector.getTargetVersion();
    const scenario = versionDetector.detectInstallationScenario();

    // Fresh install
    if (scenario === 'fresh' || !currentVersion) {
      console.log('To install agents into your project, run:');
      console.log('');
      console.log(`  ${CYAN}npx bmad-install-agents${RESET}  - Install all agents (Emma + Wade)`);
      console.log('');
      console.log('Or install individually:');
      console.log(`  ${CYAN}npx bmad-install-emma${RESET}    - Install Emma (contextualization-expert)`);
      console.log(`  ${CYAN}npx bmad-install-wade${RESET}    - Install Wade (lean-experiments-specialist)`);
      console.log('');
      return;
    }

    // Already up to date
    if (currentVersion === targetVersion) {
      console.log(`${GREEN}✓ BMAD-Enhanced is up to date! (v${currentVersion})${RESET}`);
      console.log('');
      return;
    }

    // Upgrade detected
    if (versionDetector.compareVersions(currentVersion, targetVersion) < 0) {
      console.log(`${YELLOW}${BOLD}⚠ UPGRADE DETECTED${RESET}`);
      console.log('');
      console.log(`  Current version: ${RED}${currentVersion}${RESET}`);
      console.log(`  New version:     ${GREEN}${targetVersion}${RESET}`);
      console.log('');

      // Check for breaking changes
      const breakingChanges = registry.getBreakingChanges(currentVersion, targetVersion);
      if (breakingChanges.length > 0) {
        console.log(`${RED}${BOLD}  ⚠ Breaking changes detected!${RESET}`);
        console.log('');
        console.log('  Breaking changes:');
        breakingChanges.forEach(change => {
          console.log(`${YELLOW}    - ${change}${RESET}`);
        });
        console.log('');
      }

      console.log('To preview changes without applying:');
      console.log(`  ${CYAN}npx bmad-update --dry-run${RESET}`);
      console.log('');
      console.log('To apply the update:');
      console.log(`  ${CYAN}npx bmad-update${RESET}`);
      console.log('');
      console.log(`${BOLD}Your data will be backed up automatically before any changes.${RESET}`);
      console.log('');
      return;
    }

    // Downgrade (shouldn't happen normally)
    if (versionDetector.compareVersions(currentVersion, targetVersion) > 0) {
      console.log(`${YELLOW}Note: Package version (${targetVersion}) is older than installed version (${currentVersion})${RESET}`);
      console.log('');
      return;
    }
  } else {
    // Fallback to original message if update system not available
    console.log('To install agents into your project, run:');
    console.log('');
    console.log(`  ${CYAN}npx bmad-install-agents${RESET}  - Install all agents (Emma + Wade)`);
    console.log('');
    console.log('Or install individually:');
    console.log(`  ${CYAN}npx bmad-install-emma${RESET}    - Install Emma (empathy-mapper)`);
    console.log(`  ${CYAN}npx bmad-install-wade${RESET}    - Install Wade (wireframe-designer)`);
    console.log('');
  }
}

main().catch(error => {
  console.error('Error in postinstall:', error.message);
});
