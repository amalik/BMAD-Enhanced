#!/usr/bin/env node

/**
 * Migration: 1.7.x -> current version (v2.0.0)
 * No-op delta - all file updates handled by refreshInstallation().
 * Product rename: BMAD-Enhanced -> Convoke.
 * CLI commands renamed from bmad-* to convoke-*.
 * Internal _bmad/ directory structure preserved.
 */

module.exports = {
  name: '1.7.x-to-2.0.0',
  fromVersion: '1.7.x',
  breaking: true,

  async preview() {
    return {
      actions: [
        'Product renamed from BMAD-Enhanced to Convoke',
        'npm package: bmad-enhanced -> convoke-agents',
        'CLI commands renamed: bmad-install-vortex-agents -> convoke-install-vortex, bmad-install-agents -> convoke-install, bmad-update -> convoke-update, bmad-version -> convoke-version, bmad-migrate -> convoke-migrate, bmad-doctor -> convoke-doctor',
        'Internal _bmad/ directory structure preserved (no data loss)',
        'No version-specific changes needed (refresh handles all updates)'
      ]
    };
  },

  async apply(_projectRoot) {
    return ['No version-specific delta needed — refreshInstallation handles file updates'];
  }
};
