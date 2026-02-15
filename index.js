#!/usr/bin/env node

/**
 * BMAD-Enhanced
 * Domain-Specialized Agents for BMAD Method
 *
 * This package provides expert agents for design, quality, and standards workflows:
 * - Emma (empathy-mapper) - Empathy Mapping Specialist
 * - Wade (wireframe-designer) - Wireframe Design Expert
 *
 * Installation:
 *   npm install bmad-enhanced
 *   npm run install:agents
 *
 * Documentation:
 *   - Installation Guide: INSTALLATION.md
 *   - Emma User Guide: _bmad-output/design-artifacts/EMMA-USER-GUIDE.md
 *   - Wade User Guide: _bmad-output/design-artifacts/WADE-USER-GUIDE.md
 *
 * @version 1.0.0-alpha
 * @license MIT
 */

const fs = require('fs');
const path = require('path');

const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';

function main() {
  console.log('');
  console.log(`${BOLD}BMAD-Enhanced${RESET} - Domain-Specialized Agents`);
  console.log('');
  console.log('Available agents:');
  console.log(`  ${GREEN}✓${RESET} Emma (empathy-mapper) - Empathy Mapping Specialist`);
  console.log(`  ${GREEN}✓${RESET} Wade (wireframe-designer) - Wireframe Design Expert`);
  console.log('');
  console.log('To install agents:');
  console.log(`  ${CYAN}npm run install:agents${RESET} - Install all agents`);
  console.log(`  ${CYAN}npm run install:emma${RESET}   - Install Emma only`);
  console.log(`  ${CYAN}npm run install:wade${RESET}   - Install Wade only`);
  console.log('');
  console.log('Documentation:');
  console.log(`  ${CYAN}INSTALLATION.md${RESET} - Complete installation guide`);
  console.log(`  ${CYAN}README.md${RESET}       - Project overview`);
  console.log('');
}

// Export installation functions for programmatic use
module.exports = {
  version: '1.0.0-alpha',
  agents: {
    emma: {
      id: 'empathy-mapper',
      name: 'Emma',
      title: 'Empathy Mapping Specialist',
      icon: '🎨',
      path: '_bmad/bme/_designos/agents/empathy-mapper.md'
    },
    wade: {
      id: 'wireframe-designer',
      name: 'Wade',
      title: 'Wireframe Design Specialist',
      icon: '🎨',
      path: '_bmad/bme/_designos/agents/wireframe-designer.md'
    }
  }
};

// Run CLI if called directly
if (require.main === module) {
  main();
}
