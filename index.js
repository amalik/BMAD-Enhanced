#!/usr/bin/env node

/**
 * Convoke – Vortex Pattern
 * Product discovery through Contextualize, Empathize, Externalize, and Systematize streams.
 *
 * This is a CLI-first package. Use the bin commands:
 *   npx convoke-install-vortex  – Install all Vortex agents (primary)
 *   npx convoke-install         – Install all agents (umbrella alias)
 *   npx convoke-update          – Check for and apply updates
 *   npx convoke-version         – Show installed vs latest version
 *   npx convoke-doctor          – Diagnose installation issues
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
  console.log(`  ${CYAN}npx convoke-install-vortex${RESET}  Install all Vortex agents`);
  console.log(`  ${CYAN}npx convoke-install${RESET}         Install all agents ${GRAY}(alias)${RESET}`);
  console.log(`  ${CYAN}npx convoke-update${RESET}          Check for updates`);
  console.log(`  ${CYAN}npx convoke-version${RESET}         Show version info`);
  console.log(`  ${CYAN}npx convoke-doctor${RESET}          Diagnose issues`);
  console.log('');
}

module.exports = { getPackageInfo };
