#!/usr/bin/env node

const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
const CYAN = '\x1b[36m';

console.log('');
console.log(`${BOLD}BMAD-Enhanced installed!${RESET}`);
console.log('');
console.log('To install agents into your project, run:');
console.log('');
console.log(`  ${CYAN}npx bmad-install-agents${RESET}  - Install all agents (Emma + Wade)`);
console.log('');
console.log('Or install individually:');
console.log(`  ${CYAN}npx bmad-install-emma${RESET}    - Install Emma (empathy-mapper)`);
console.log(`  ${CYAN}npx bmad-install-wade${RESET}    - Install Wade (wireframe-designer)`);
console.log('');
