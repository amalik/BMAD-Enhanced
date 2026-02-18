#!/usr/bin/env node

/**
 * Migration: 1.2.x → current version
 * No-op delta - all file updates handled by refreshInstallation().
 * No version-specific changes needed for 1.2.x users.
 */

module.exports = {
  name: '1.2.x-to-1.3.0',
  fromVersion: '1.2.x',
  breaking: false,

  async preview() {
    return {
      actions: [
        'No version-specific changes needed (refresh handles all updates)'
      ]
    };
  },

  /**
   * @param {string} projectRoot - Absolute path to project root
   * @returns {Promise<Array<string>>} List of changes made
   */
  async apply(projectRoot) {
    return ['No version-specific delta needed'];
  }
};
