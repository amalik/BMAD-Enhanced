#!/usr/bin/env node

/**
 * BMAD-Enhanced – Vortex Pattern
 * Product discovery through Contextualize, Empathize, Externalize, and Systematize streams.
 *
 * This is a CLI-first package. Use the bin commands:
 *   npx bmad-install-vortex-agents – Install all Vortex agents (primary)
 *   npx bmad-install-agents        – Install all agents (umbrella alias)
 *   npx bmad-update                – Check for and apply updates
 *   npx bmad-version               – Show installed vs latest version
 *   npx bmad-doctor                – Diagnose installation issues
 *
 * @license MIT
 */

const path = require('path');
const { AGENTS } = require('./scripts/update/lib/agent-registry');

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
  const GRAY = '\x1b[90m';

  console.log('');
  console.log(`${BOLD}${info.name}${RESET} v${info.version}`);
  console.log(info.description);
  console.log('');
  console.log(`${GREEN}Agents:${RESET}`);
  for (const agent of AGENTS) {
    const padded = agent.name.padEnd(5);
    console.log(`  ${padded}${CYAN}${agent.icon}${RESET} – ${agent.title}`);
  }
  console.log('');
  console.log(`${GREEN}Commands:${RESET}`);
  console.log(`  ${CYAN}npx bmad-install-vortex-agents${RESET}  Install all Vortex agents`);
  console.log(`  ${CYAN}npx bmad-install-agents${RESET}         Install all agents ${GRAY}(alias)${RESET}`);
  console.log(`  ${CYAN}npx bmad-update${RESET}                 Check for updates`);
  console.log(`  ${CYAN}npx bmad-version${RESET}                Show version info`);
  console.log(`  ${CYAN}npx bmad-doctor${RESET}                 Diagnose issues`);
  console.log('');
}

module.exports = { getPackageInfo };
