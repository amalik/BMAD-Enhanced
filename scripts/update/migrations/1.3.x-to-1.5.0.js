#!/usr/bin/env node

/**
 * Migration: 1.3.x → current version (v1.5.0)
 * No-op delta - all file updates handled by refreshInstallation().
 * Wave 2 adds Isla, Max, and 6 new workflows via refresh.
 */

module.exports = {
  name: '1.3.x-to-1.5.0',
  fromVersion: '1.3.x',
  breaking: false,

  async preview() {
    return {
      actions: [
        'No version-specific changes needed (refresh handles all updates)',
        'Adds: Isla (discovery-empathy-expert) agent',
        'Adds: Max (learning-decision-expert) agent',
        'Adds: empathy-map, user-interview, user-discovery workflows (Isla)',
        'Adds: learning-card, pivot-patch-persevere, vortex-navigation workflows (Max)'
      ]
    };
  },

  async apply(_projectRoot) {
    return ['No version-specific delta needed'];
  }
};
