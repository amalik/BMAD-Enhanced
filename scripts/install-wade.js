#!/usr/bin/env node

/**
 * bmad-install-wade — Deprecated. Use bmad-install-vortex-agents instead.
 */
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

console.log('');
console.log(`${YELLOW}⚠  bmad-install-wade is deprecated as of v1.5.0.${RESET}`);
console.log(`${YELLOW}   Use: npx bmad-install-vortex-agents${RESET}`);
console.log('');

require('./install-vortex-agents.js');
