#!/usr/bin/env node

const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
const CYAN = '\x1b[36m';

console.log('');
console.log(`${BOLD}BMAD-Enhanced installed!${RESET}`);
console.log('');
console.log('To install agents into your project:');
console.log('');
console.log(`  ${CYAN}npm run install:emma${RESET}   - Install Emma (empathy-mapper)`);
console.log(`  ${CYAN}npm run install:wade${RESET}   - Install Wade (wireframe-designer)`);
console.log(`  ${CYAN}npm run install:agents${RESET} - Install all agents at once`);
console.log('');
