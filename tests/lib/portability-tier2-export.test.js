const path = require('path');
const { spawnSync } = require('child_process');
const { findProjectRoot } = require('../../scripts/update/lib/utils');
const { exportSkill } = require('../../scripts/portability/export-engine');
const { readManifest } = require('../../scripts/portability/manifest-csv');

// Story sp-5-1: Template Inlining for Tier 2 Export
//
// Tests that light-deps skills export successfully with inlined templates,
// companion-skill notes, and sidecar notes.

const projectRoot = findProjectRoot();
const CLI_PATH = path.join(projectRoot, 'scripts', 'portability', 'convoke-export.js');

describe('Tier 2 Export (sp-5-1)', () => {
  test('Test 1: bmad-create-prd exports successfully with Template section', () => {
    const result = exportSkill('bmad-create-prd', projectRoot);
    expect(result).toBeDefined();
    expect(result.instructions).toContain('## Template:');
    expect(result.instructions).toContain('Prd Template');
  });

  test('Test 2: template content is inlined, {{vars}} preserved, no _bmad/', () => {
    const result = exportSkill('bmad-create-prd', projectRoot);
    expect(result.instructions).toContain('Product Requirements Document');
    expect(result.instructions).toContain('{{project_name}}');
    expect(result.instructions).not.toContain('_bmad/');
  });

  test('Test 3: skill-ref dependencies documented as companion skills', () => {
    const result = exportSkill('bmad-create-prd', projectRoot);
    expect(result.instructions).toContain('Companion skill:');
    expect(result.instructions).toContain('Advanced Elicitation');
  });

  test('Test 4: bmad-cis-agent-storyteller exports with sidecar notes', () => {
    const result = exportSkill('bmad-cis-agent-storyteller', projectRoot);
    expect(result.instructions).toContain('Persistent data:');
  });

  test('Test 5: CLI --tier 2 batch works', () => {
    const result = spawnSync('node', [CLI_PATH, '--tier', '2', '--dry-run'], {
      cwd: projectRoot,
      encoding: 'utf8',
      env: process.env,
      timeout: 30000,
    });
    // Accept 0 (all pass) or 4 (some fail) — both are valid
    expect([0, 4]).toContain(result.status);
    expect(result.stdout).toContain('✅ bmad-create-prd');
  });

  test('Test 6: --all includes both tier 1 and tier 2 skills', () => {
    const allResult = spawnSync('node', [CLI_PATH, '--all', '--dry-run'], {
      cwd: projectRoot,
      encoding: 'utf8',
      env: process.env,
      timeout: 30000,
    });

    // Count standalone and light-deps from manifest
    const manifestPath = path.join(projectRoot, '_bmad', '_config', 'skill-manifest.csv');
    const { header, rows } = readManifest(manifestPath);
    const nameIdx = header.indexOf('name');
    const tierIdx = header.indexOf('tier');
    const standaloneCount = [...new Set(rows.filter((r) => r[tierIdx] === 'standalone').map((r) => r[nameIdx]))].length;
    const lightDepsCount = [...new Set(rows.filter((r) => r[tierIdx] === 'light-deps').map((r) => r[nameIdx]))].length;

    const successLines = [...allResult.stdout.matchAll(/^✅ (\S+)/gm)];
    expect(successLines.length).toBeGreaterThanOrEqual(standaloneCount);
    // Should also include some light-deps
    expect(allResult.stdout).toContain('bmad-create-prd');
  });
});
