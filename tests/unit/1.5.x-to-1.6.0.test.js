const { describe, it, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const yaml = require('js-yaml');

const migration = require('../../scripts/update/migrations/1.5.x-to-1.6.0');

describe('1.5.x-to-1.6.0 migration', () => {
  describe('module shape', () => {
    it('exports required fields', () => {
      assert.equal(migration.name, '1.5.x-to-1.6.0');
      assert.equal(migration.fromVersion, '1.5.x');
      assert.equal(migration.breaking, false);
      assert.equal(typeof migration.preview, 'function');
      assert.equal(typeof migration.apply, 'function');
    });
  });

  describe('preview()', () => {
    it('returns action list without modifying filesystem', async () => {
      const result = await migration.preview();
      assert.ok(result.actions);
      assert.ok(Array.isArray(result.actions));
      assert.ok(result.actions.length > 0);
      // Should mention Wave 3 agents
      const joined = result.actions.join(' ');
      assert.ok(joined.includes('Mila') || joined.includes('research-convergence-specialist'));
      assert.ok(joined.includes('Liam') || joined.includes('hypothesis-engineer'));
      assert.ok(joined.includes('Noah') || joined.includes('production-intelligence-specialist'));
    });
  });

  describe('apply()', () => {
    const tmpDirs = [];
    let configPath;

    const createConfig = async (configObj) => {
      const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-mig-'));
      tmpDirs.push(dir);
      configPath = path.join(dir, '_bmad', 'bme', '_vortex', 'config.yaml');
      await fs.ensureDir(path.dirname(configPath));
      await fs.writeFile(configPath, yaml.dump(configObj), 'utf8');
      return dir;
    };

    after(async () => {
      await Promise.all(tmpDirs.map(d => fs.remove(d)));
    });

    it('appends 3 new agents to existing 4-agent config', async () => {
      const projectRoot = await createConfig({
        version: '1.5.1',
        submodule_name: '_vortex',
        description: 'test',
        module: 'bme',
        output_folder: '_bmad-output',
        agents: [
          'contextualization-expert',
          'discovery-empathy-expert',
          'lean-experiments-specialist',
          'learning-decision-expert'
        ],
        workflows: [
          'lean-persona', 'product-vision', 'contextualize-scope',
          'empathy-map', 'user-interview', 'user-discovery',
          'mvp', 'lean-experiment', 'proof-of-concept',
          'proof-of-value', 'learning-card', 'pivot-patch-persevere',
          'vortex-navigation'
        ],
        migration_history: []
      });

      const changes = await migration.apply(projectRoot);

      assert.ok(Array.isArray(changes), 'apply() should return an array of changes');
      assert.ok(changes.some(c => c.includes('Wave 3 agent')), 'changes should mention agents');
      assert.ok(changes.some(c => c.includes('Wave 3 workflow')), 'changes should mention workflows');

      const updated = yaml.load(await fs.readFile(configPath, 'utf8'));
      assert.equal(updated.agents.length, 7);
      assert.ok(updated.agents.includes('research-convergence-specialist'));
      assert.ok(updated.agents.includes('hypothesis-engineer'));
      assert.ok(updated.agents.includes('production-intelligence-specialist'));
    });

    it('appends 9 new workflows to existing 13-workflow config', async () => {
      const projectRoot = await createConfig({
        version: '1.5.1',
        submodule_name: '_vortex',
        description: 'test',
        module: 'bme',
        output_folder: '_bmad-output',
        agents: ['contextualization-expert', 'discovery-empathy-expert',
          'lean-experiments-specialist', 'learning-decision-expert'],
        workflows: [
          'lean-persona', 'product-vision', 'contextualize-scope',
          'empathy-map', 'user-interview', 'user-discovery',
          'mvp', 'lean-experiment', 'proof-of-concept',
          'proof-of-value', 'learning-card', 'pivot-patch-persevere',
          'vortex-navigation'
        ],
        migration_history: []
      });

      await migration.apply(projectRoot);

      const updated = yaml.load(await fs.readFile(configPath, 'utf8'));
      assert.equal(updated.workflows.length, 22);
      assert.ok(updated.workflows.includes('research-convergence'));
      assert.ok(updated.workflows.includes('pivot-resynthesis'));
      assert.ok(updated.workflows.includes('pattern-mapping'));
      assert.ok(updated.workflows.includes('hypothesis-engineering'));
      assert.ok(updated.workflows.includes('assumption-mapping'));
      assert.ok(updated.workflows.includes('experiment-design'));
      assert.ok(updated.workflows.includes('signal-interpretation'));
      assert.ok(updated.workflows.includes('behavior-analysis'));
      assert.ok(updated.workflows.includes('production-monitoring'));
    });

    it('preserves user customizations', async () => {
      const projectRoot = await createConfig({
        version: '1.5.1',
        submodule_name: '_vortex',
        description: 'test',
        module: 'bme',
        output_folder: '_bmad-output',
        user_name: 'Alice',
        communication_language: 'fr',
        party_mode_enabled: true,
        agents: ['contextualization-expert', 'discovery-empathy-expert',
          'lean-experiments-specialist', 'learning-decision-expert'],
        workflows: [
          'lean-persona', 'product-vision', 'contextualize-scope',
          'empathy-map', 'user-interview', 'user-discovery',
          'mvp', 'lean-experiment', 'proof-of-concept',
          'proof-of-value', 'learning-card', 'pivot-patch-persevere',
          'vortex-navigation'
        ],
        migration_history: []
      });

      await migration.apply(projectRoot);

      const updated = yaml.load(await fs.readFile(configPath, 'utf8'));
      assert.equal(updated.user_name, 'Alice');
      assert.equal(updated.communication_language, 'fr');
      assert.equal(updated.party_mode_enabled, true);
      assert.equal(updated.version, '1.5.1'); // Delta should NOT bump version
    });

    it('is idempotent — running twice produces same result', async () => {
      const projectRoot = await createConfig({
        version: '1.5.1',
        submodule_name: '_vortex',
        description: 'test',
        module: 'bme',
        output_folder: '_bmad-output',
        agents: ['contextualization-expert', 'discovery-empathy-expert',
          'lean-experiments-specialist', 'learning-decision-expert'],
        workflows: [
          'lean-persona', 'product-vision', 'contextualize-scope',
          'empathy-map', 'user-interview', 'user-discovery',
          'mvp', 'lean-experiment', 'proof-of-concept',
          'proof-of-value', 'learning-card', 'pivot-patch-persevere',
          'vortex-navigation'
        ],
        migration_history: []
      });

      await migration.apply(projectRoot);
      await migration.apply(projectRoot);

      const updated = yaml.load(await fs.readFile(configPath, 'utf8'));
      assert.equal(updated.agents.length, 7, 'should not duplicate agents');
      assert.equal(updated.workflows.length, 22, 'should not duplicate workflows');
    });

    it('handles config with no agents/workflows arrays', async () => {
      const projectRoot = await createConfig({
        version: '1.5.0',
        submodule_name: '_vortex',
        description: 'test',
        module: 'bme',
        output_folder: '_bmad-output',
        migration_history: []
      });

      await migration.apply(projectRoot);

      const updated = yaml.load(await fs.readFile(configPath, 'utf8'));
      // Should create arrays with only Wave 3 entries (no pre-existing)
      assert.ok(Array.isArray(updated.agents));
      assert.ok(Array.isArray(updated.workflows));
      assert.equal(updated.agents.length, 3, 'should have exactly 3 Wave 3 agents');
      assert.equal(updated.workflows.length, 9, 'should have exactly 9 Wave 3 workflows');
      assert.ok(updated.agents.includes('research-convergence-specialist'));
      assert.ok(updated.workflows.includes('research-convergence'));
    });
  });
});
