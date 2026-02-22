const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const { silenceConsole, restoreConsole } = require('../helpers');

const migration = require('../../scripts/update/migrations/1.0.x-to-1.3.0');

describe('1.0.x-to-1.3.0 migration apply', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-mig-1.0-'));

    // Set up a v1.0.x file structure
    const vortexDir = path.join(tmpDir, '_bmad/bme/_vortex');
    const workflowsDir = path.join(vortexDir, 'workflows');
    const agentsDir = path.join(vortexDir, 'agents');

    await fs.ensureDir(agentsDir);

    // Old workflows that should be archived
    await fs.ensureDir(path.join(workflowsDir, 'empathy-map'));
    await fs.writeFile(path.join(workflowsDir, 'empathy-map/workflow.md'), '# Old empathy map');
    await fs.ensureDir(path.join(workflowsDir, 'wireframe'));
    await fs.writeFile(path.join(workflowsDir, 'wireframe/workflow.md'), '# Old wireframe');

    // Legacy _designos directory
    await fs.ensureDir(path.join(tmpDir, '_bmad/bme/_designos'));
    await fs.writeFile(path.join(tmpDir, '_bmad/bme/_designos/old-file.md'), 'legacy');

    // Old agent manifest with deprecated IDs
    await fs.ensureDir(path.join(tmpDir, '_bmad/_config'));
    await fs.writeFile(
      path.join(tmpDir, '_bmad/_config/agent-manifest.csv'),
      '"agent_id","name","title"\n"empathy-mapper","Emma","Empathy Mapping Specialist"\n"wireframe-designer","Wade","Wireframe Designer"\n',
      'utf8'
    );
  });

  after(async () => {
    restoreConsole();
    await fs.remove(tmpDir);
  });

  it('has correct metadata', () => {
    assert.equal(migration.name, '1.0.x-to-1.3.0');
    assert.equal(migration.fromVersion, '1.0.x');
    assert.equal(migration.breaking, true);
  });

  it('preview lists breaking actions', async () => {
    const preview = await migration.preview();
    assert.ok(Array.isArray(preview.actions));
    assert.ok(preview.actions.length >= 3);
    assert.ok(preview.actions.some(a => a.includes('empathy-map')));
    assert.ok(preview.actions.some(a => a.includes('wireframe')));
    assert.ok(preview.actions.some(a => a.includes('_designos')));
  });

  it('archives empathy-map workflow to _deprecated', async () => {
    silenceConsole();
    const changes = await migration.apply(tmpDir);
    restoreConsole();

    const deprecated = path.join(tmpDir, '_bmad/bme/_vortex/workflows/_deprecated/empathy-map');
    assert.ok(fs.existsSync(deprecated), '_deprecated/empathy-map should exist');
    assert.ok(
      fs.existsSync(path.join(deprecated, 'workflow.md')),
      'workflow.md should be moved'
    );

    const original = path.join(tmpDir, '_bmad/bme/_vortex/workflows/empathy-map');
    assert.ok(!fs.existsSync(original), 'original empathy-map should be removed');

    assert.ok(changes.some(c => c.includes('empathy-map')));
  });

  it('archives wireframe workflow to _deprecated', () => {
    const deprecated = path.join(tmpDir, '_bmad/bme/_vortex/workflows/_deprecated/wireframe');
    assert.ok(fs.existsSync(deprecated), '_deprecated/wireframe should exist');

    const original = path.join(tmpDir, '_bmad/bme/_vortex/workflows/wireframe');
    assert.ok(!fs.existsSync(original), 'original wireframe should be removed');
  });

  it('removes legacy _designos directory', () => {
    const designos = path.join(tmpDir, '_bmad/bme/_designos');
    assert.ok(!fs.existsSync(designos), '_designos should be removed');
  });

  it('renames agent IDs in manifest', async () => {
    const manifestPath = path.join(tmpDir, '_bmad/_config/agent-manifest.csv');
    const content = await fs.readFile(manifestPath, 'utf8');

    assert.ok(!content.includes('empathy-mapper'), 'empathy-mapper should be renamed');
    assert.ok(!content.includes('wireframe-designer'), 'wireframe-designer should be renamed');
    assert.ok(content.includes('contextualization-expert'), 'should now have contextualization-expert');
    assert.ok(content.includes('lean-experiments-specialist'), 'should now have lean-experiments-specialist');
  });

  it('renames agent titles in manifest', async () => {
    const manifestPath = path.join(tmpDir, '_bmad/_config/agent-manifest.csv');
    const content = await fs.readFile(manifestPath, 'utf8');

    assert.ok(!content.includes('Empathy Mapping Specialist'), 'old title should be replaced');
    assert.ok(!content.includes('Wireframe Designer'), 'old title should be replaced');
    assert.ok(content.includes('Contextualization Expert'), 'new title should exist');
    assert.ok(content.includes('Lean Experiments Specialist'), 'new title should exist');
  });
});

describe('1.0.x-to-1.3.0 migration: missing files', () => {
  let tmpDir;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-mig-1.0-empty-'));
    // Minimal structure — no old workflows, no _designos, no manifest
    await fs.ensureDir(path.join(tmpDir, '_bmad/bme/_vortex/workflows'));
  });

  after(async () => {
    restoreConsole();
    await fs.remove(tmpDir);
  });

  it('handles missing workflows gracefully', async () => {
    silenceConsole();
    const changes = await migration.apply(tmpDir);
    restoreConsole();

    // Should still return changes (cleanup + manifest)
    assert.ok(Array.isArray(changes));
    assert.ok(changes.length >= 1, 'should report at least cleanup action');
  });

  it('handles missing manifest gracefully', async () => {
    // No manifest file exists
    const manifestPath = path.join(tmpDir, '_bmad/_config/agent-manifest.csv');
    assert.ok(!fs.existsSync(manifestPath));

    // Apply should not throw
    silenceConsole();
    const changes = await migration.apply(tmpDir);
    restoreConsole();
    assert.ok(Array.isArray(changes));
  });
});
