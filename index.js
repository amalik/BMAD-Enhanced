#!/usr/bin/env node

/**
 * BMAD-Enhanced – Vortex Framework
 * Lean Startup validation through Contextualize and Externalize streams.
 *
 * This is a CLI-first package. Use the bin commands:
 *   npx bmad-install-agents   – Install all Vortex agents
 *   npx bmad-install-emma     – Install Emma (Contextualization Expert)
 *   npx bmad-install-wade     – Install Wade (Lean Experiments Specialist)
 *   npx bmad-update            – Check for and apply updates
 *   npx bmad-version           – Show installed vs latest version
 *   npx bmad-doctor            – Diagnose installation issues
 *
 * @license MIT
 */

const path = require('path');

function getPackageInfo() {
  const pkg = require(path.join(__dirname, 'package.json'));
  return {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description
  };
}

if (require.main === module) {
  const info = getPackageInfo();
  const BOLD = '\x1b[1m';
  const RESET = '\x1b[0m';
  const CYAN = '\x1b[36m';
  const GREEN = '\x1b[32m';

  console.log('');
  console.log(`${BOLD}${info.name}${RESET} v${info.version}`);
  console.log(info.description);
  console.log('');
  console.log(`${GREEN}Agents:${RESET}`);
  console.log(`  Emma ${CYAN}🎯${RESET} – Contextualization Expert`);
  console.log(`  Wade ${CYAN}🧪${RESET} – Lean Experiments Specialist`);
  console.log('');
  console.log(`${GREEN}Commands:${RESET}`);
  console.log(`  ${CYAN}npx bmad-install-agents${RESET}  Install all agents`);
  console.log(`  ${CYAN}npx bmad-install-emma${RESET}    Install Emma only`);
  console.log(`  ${CYAN}npx bmad-install-wade${RESET}    Install Wade only`);
  console.log(`  ${CYAN}npx bmad-update${RESET}          Check for updates`);
  console.log(`  ${CYAN}npx bmad-version${RESET}         Show version info`);
  console.log(`  ${CYAN}npx bmad-doctor${RESET}          Diagnose issues`);
  console.log('');
}

module.exports = { getPackageInfo };
