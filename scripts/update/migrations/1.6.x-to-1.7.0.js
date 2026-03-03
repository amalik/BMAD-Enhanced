#!/usr/bin/env node

/**
 * Migration: 1.6.x → current version (v1.7.0)
 * No-op delta - all file updates handled by refreshInstallation().
 * Wave 4: production-quality workflow steps, updated guides, config-merger
 * smart-merge, docs-audit tool. No schema or structural changes.
 */

module.exports = {
  name: '1.6.x-to-1.7.0',
  fromVersion: '1.6.x',
  breaking: false,

  async preview() {
    return {
      actions: [
        'No version-specific changes needed (refresh handles all updates)',
        'Updates: 18 workflow step files (lean-experiment, proof-of-concept, proof-of-value)',
        'Updates: 7 user guides with reordered invocation methods',
        'Updates: config-merger with smart-merge for user-added agents/workflows'
      ]
    };
  },

  async apply(_projectRoot) {
    return ['No version-specific delta needed'];
  }
};
