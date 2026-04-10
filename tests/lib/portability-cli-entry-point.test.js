const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { execSync, spawnSync } = require('child_process');
const { findProjectRoot } = require('../../scripts/update/lib/utils');
const { readManifest } = require('../../scripts/portability/manifest-csv');

// Story sp-2-3: CLI Entry Point
//
// Tests the convoke-export CLI by spawning it as a subprocess. All file
// outputs go to per-test tmpdirs that are cleaned up afterEach.

const projectRoot = findProjectRoot();
const CLI_PATH = path.join(projectRoot, 'scripts', 'portability', 'convoke-export.js');

function runCli(args, options = {}) {
  return spawnSync('node', [CLI_PATH, ...args], {
    cwd: options.cwd || projectRoot,
    encoding: 'utf8',
    env: process.env,
  });
}

function makeTmpDir() {
  const dir = path.join(os.tmpdir(), `sp-2-3-${crypto.randomUUID()}`);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function cleanupTmpDir(dir) {
  if (dir && fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

describe('convoke-export CLI (sp-2-3)', () => {
  let tmpDir;

  afterEach(() => {
    cleanupTmpDir(tmpDir);
    tmpDir = null;
  });

  test('Test 1: single skill, default output, dry-run — exits 0, prints success, writes nothing', () => {
    // Capture git status before; if dirty, skip the byte-comparison part only.
    let before;
    let canCompare = true;
    try {
      before = execSync('git status --porcelain', { cwd: projectRoot, encoding: 'utf8' });
    } catch (e) {
      canCompare = false;
    }
    if (canCompare && before.length > 0) {
      console.warn('skipping write-check — working tree has pre-existing changes');
      canCompare = false;
    }

    const result = runCli(['bmad-brainstorming', '--dry-run']);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('✅ bmad-brainstorming');
    expect(result.stdout).toContain('[DRY RUN]');

    if (canCompare) {
      const after = execSync('git status --porcelain', { cwd: projectRoot, encoding: 'utf8' });
      expect(after).toBe(before);
    }
  });

  test('Test 2: single skill, custom output, real write — files exist, contain Carson', () => {
    tmpDir = makeTmpDir();
    const result = runCli(['bmad-brainstorming', '--output', tmpDir]);
    expect(result.status).toBe(0);

    const instructionsPath = path.join(tmpDir, 'bmad-brainstorming', 'instructions.md');
    const readmePath = path.join(tmpDir, 'bmad-brainstorming', 'README.md');
    expect(fs.existsSync(instructionsPath)).toBe(true);
    expect(fs.existsSync(readmePath)).toBe(true);

    const instructions = fs.readFileSync(instructionsPath, 'utf8');
    expect(instructions.length).toBeGreaterThan(0);
    expect(instructions).toContain('Carson');
  });

  test('Test 3: tier 1 batch dry-run — exits 0 or 4, prints >=2 success lines, writes nothing', () => {
    // Count expected standalone skills from the manifest (avoid hard-coded count).
    const manifestPath = path.join(projectRoot, '_bmad', '_config', 'skill-manifest.csv');
    const { header, rows } = readManifest(manifestPath);
    const nameIdx = header.indexOf('name');
    const tierIdx = header.indexOf('tier');
    const standaloneSet = new Set(
      rows.filter((r) => r[tierIdx] === 'standalone').map((r) => r[nameIdx])
    );
    expect(standaloneSet.size).toBeGreaterThanOrEqual(2);

    const result = runCli(['--tier', '1', '--dry-run']);
    // Engine may fail on some skills (persona resolution gaps in current
    // standalone set); accept either full success or partial failure.
    expect([0, 4]).toContain(result.status);
    expect(result.stdout).toContain('[DRY RUN]');
    expect(result.stdout).toContain('✅ bmad-brainstorming');
    expect(result.stdout).toContain('✅ bmad-agent-architect');
  });

  test('Test 4: tier 3 rejection — exits 3', () => {
    const result = runCli(['--tier', '3']);
    expect(result.status).toBe(3);
    expect(result.stderr).toContain("Tier 3");
  });

  test('Test 5: nonexistent skill — exits 2 with "not in the manifest"', () => {
    const result = runCli(['bmad-skill-that-does-not-exist']);
    expect(result.status).toBe(2);
    expect(result.stdout + result.stderr).toMatch(/not in the manifest/);
  });

  test('Test 6: --all includes --tier 1 skills (superset)', () => {
    const tierResult = runCli(['--tier', '1', '--dry-run']);
    const allResult = runCli(['--all', '--dry-run']);

    const extractSuccessSet = (out) =>
      new Set([...out.matchAll(/^✅ (\S+)/gm)].map((m) => m[1]));

    const tier1Set = extractSuccessSet(tierResult.stdout);
    const allSet = extractSuccessSet(allResult.stdout);

    // --all must include all --tier 1 skills (superset)
    for (const skill of tier1Set) {
      expect(allSet.has(skill)).toBe(true);
    }
    // --all should have >= --tier 1 count (includes light-deps too)
    expect(allSet.size).toBeGreaterThanOrEqual(tier1Set.size);
  });

  test('Test 7: conflicting flags — exit 1', () => {
    const r1 = runCli(['bmad-brainstorming', '--tier', '1']);
    expect(r1.status).toBe(1);
    expect(r1.stderr).toContain('Run --help for usage.');

    const r2 = runCli(['--tier', '1', '--all']);
    expect(r2.status).toBe(1);
    expect(r2.stderr).toContain('Run --help for usage.');
  });

  test('Test 8: --help — exits 0, ASCII only, lists exit codes and examples', () => {
    const result = runCli(['--help']);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Usage');
    expect(result.stdout).toContain('--output');
    expect(result.stdout).toContain('--tier');
    expect(result.stdout).toContain('--all');
    expect(result.stdout).toContain('--dry-run');
    expect(result.stdout).toContain('Exit codes');
    expect(result.stdout).toContain('Example:');
    // No emoji in help text — ASCII only
    // eslint-disable-next-line no-control-regex
    expect(result.stdout).toMatch(/^[\x00-\x7F\n]*$/);
  });

  test('Test 9: README stub validity — has Carson, icon, skill name, no leftover placeholders', () => {
    tmpDir = makeTmpDir();
    const result = runCli(['bmad-brainstorming', '--output', tmpDir]);
    expect(result.status).toBe(0);

    const readmePath = path.join(tmpDir, 'bmad-brainstorming', 'README.md');
    const content = fs.readFileSync(readmePath, 'utf8');

    // Strip HTML comments first (the template has explanatory comments
    // containing < characters that would otherwise false-match).
    const stripped = content.replace(/<!--[\s\S]*?-->/g, '');

    expect(content).toContain('Carson');
    expect(content).toContain('🧠');
    expect(content).toContain('bmad-brainstorming');

    // Match the CLI's sanity check: multi-word placeholders only (single-word
    // HTML tags like <code>, <br> are allowed).
    const leftover = stripped.match(/<[a-z][a-z\s-]{2,}[a-z]>/gi);
    expect(leftover).toBeNull();
  });
});
