const { mergeTaxonomy } = require('../lib/taxonomy-merger');

/**
 * Migration: 2.0.x → 3.1.0
 * Introduces artifact governance taxonomy configuration.
 * Creates or merges _bmad/_config/taxonomy.yaml with platform defaults.
 * Idempotent — safe to re-run.
 */

module.exports = {
  name: '2.0.x-to-3.1.0',
  fromVersion: '2.0.x',
  breaking: false,

  async preview() {
    return {
      actions: [
        'Create or merge _bmad/_config/taxonomy.yaml with platform defaults',
        'Add 8 platform initiative IDs (vortex, gyre, bmm, forge, helm, enhance, loom, convoke)',
        'Add 21 artifact type identifiers',
        'Add 6 historical name aliases for migration',
        'Promote any user initiative IDs that match new platform IDs'
      ]
    };
  },

  /**
   * Apply migration: create or merge taxonomy config.
   * @param {string} projectRoot - Absolute path to project root
   * @returns {Promise<Array<string>>} List of changes made
   */
  async apply(projectRoot) {
    const changes = [];
    const result = await mergeTaxonomy(projectRoot);

    if (result.created) {
      changes.push('Created _bmad/_config/taxonomy.yaml with platform defaults');
    } else if (result.merged) {
      changes.push('Merged platform entries into existing taxonomy.yaml');
    } else {
      changes.push('Taxonomy already up to date — no changes needed');
    }

    if (result.promoted.length > 0) {
      changes.push(`Promoted ${result.promoted.length} user initiative(s) to platform: ${result.promoted.join(', ')}`);
    }

    return changes;
  }
};
