#!/usr/bin/env node

/**
 * convoke-install — Umbrella installer (delegates to Vortex installer).
 *
 * Future: When additional frameworks are added, this script will install
 * all frameworks. For now it delegates to convoke-install-vortex.
 */
require('./install-vortex-agents.js');
