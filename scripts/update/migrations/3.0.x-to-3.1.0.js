const { mergeTaxonomy } = require('../lib/taxonomy-merger');

/**
 * Migration: 3.0.x → 3.1.0
 * Parallel entry for 3.0.x users (same logic as 2.0.x-to-3.1.0).
 * Introduces artifact governance taxonomy configuration.
 */

module.exports = {
  name: '3.0.x-to-3.1.0',
  fromVersion: '3.0.x',
  breaking: false,

  async preview() {
    return {
      actions: [
        'Create or merge _bmad/_config/taxonomy.yaml with platform defaults',
        'Add platform initiative IDs, artifact types, and aliases if missing'
      ]
    };
  },

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
