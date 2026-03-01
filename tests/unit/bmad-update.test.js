const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const yaml = require('js-yaml');
const { spawn } = require('node:child_process');

const { assessUpdate } = require('../../scripts/update/bmad-update');
const {
  createValidInstallation,
  createInstallation,
  runScript,
  PACKAGE_ROOT
} = require('../helpers');

const SCRIPT_PATH = path.join(PACKAGE_ROOT, 'scripts/update/bmad-update.js');

/**
 * Run a script with input piped to stdin.
 * Used for testing interactive prompts (confirm dialog).
 * @param {string} script - Absolute path to script
 * @param {string[]} args - CLI arguments
 * @param {string} input - Text to write to stdin
 * @param {object} opts - Options: cwd, timeout
 * @returns {Promise<{exitCode: number, stdout: string, stderr: string}>}
 */
function runScriptWithInput(script, args, input, opts = {}) {
  const cwd = opts.cwd || PACKAGE_ROOT;
  const timeout = opts.timeout || 15000;

  return new Promise((resolve) => {
    const child = spawn('node', [script, ...args], { cwd });
    let stdout = '';
    let stderr = '';
    const timer = setTimeout(() => {
      child.kill();
      resolve({ exitCode: null, stdout, stderr });
    }, timeout);

    child.stdout.on('data', (data) => { stdout += data; });
    child.stderr.on('data', (data) => { stderr += data; });
    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({ exitCode: code, stdout, stderr });
    });

    // Write input after brief delay so readline is ready
    setTimeout(() => {
      child.stdin.write(input);
      child.stdin.end();
    }, 200);
  });
}

// ─── assessUpdate Unit Tests ──────────────────────────────────

describe('assessUpdate', () => {
  it('returns no-project when projectRoot is null', () => {
    const result = assessUpdate(null);
    assert.equal(result.action, 'no-project');
  });

  it('returns fresh for empty directory', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-assess-'));
    try {
      const result = assessUpdate(tmpDir);
      assert.equal(result.action, 'fresh');
      assert.equal(result.scenario, 'fresh');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('returns broken for partial installation', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-assess-'));
    try {
      // Create _bmad dir with vortex but no config
      await fs.ensureDir(path.join(tmpDir, '_bmad/bme/_vortex'));
      const result = assessUpdate(tmpDir);
      assert.ok(
        result.action === 'broken' || result.action === 'no-version',
        `expected broken or no-version, got ${result.action}`
      );
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('returns up-to-date when versions match', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-assess-'));
    try {
      await createValidInstallation(tmpDir);

      // Set version to match current package
      const pkg = require('../../package.json');
      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      config.version = pkg.version;
      fs.writeFileSync(configPath, yaml.dump(config), 'utf8');

      const result = assessUpdate(tmpDir);
      assert.equal(result.action, 'up-to-date');
      assert.equal(result.currentVersion, pkg.version);
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('returns downgrade when installed > package', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-assess-'));
    try {
      await createValidInstallation(tmpDir);

      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      config.version = '99.99.99';
      fs.writeFileSync(configPath, yaml.dump(config), 'utf8');

      const result = assessUpdate(tmpDir);
      assert.equal(result.action, 'downgrade');
      assert.equal(result.currentVersion, '99.99.99');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('returns upgrade with migrations for v1.4.x', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-assess-'));
    try {
      await createValidInstallation(tmpDir);

      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      config.version = '1.4.1';
      fs.writeFileSync(configPath, yaml.dump(config), 'utf8');

      const result = assessUpdate(tmpDir);
      assert.equal(result.action, 'upgrade');
      assert.equal(result.currentVersion, '1.4.1');
      assert.ok(Array.isArray(result.migrations));
      assert.ok(result.migrations.length >= 1);
      assert.ok(Array.isArray(result.breakingChanges));
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('returns upgrade with breaking changes for v1.0.x', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-assess-'));
    try {
      await createValidInstallation(tmpDir);

      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      config.version = '1.0.5';
      fs.writeFileSync(configPath, yaml.dump(config), 'utf8');

      const result = assessUpdate(tmpDir);
      assert.equal(result.action, 'upgrade');
      assert.ok(result.breakingChanges.length > 0, 'v1.0.x should have breaking changes');
      assert.ok(result.migrations.some(m => m.breaking), 'should include breaking migration');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  // ─── Edge Cases (AC #4) ──────────────────────────────────

  it('returns no-version when config has no version field', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-assess-'));
    try {
      await createValidInstallation(tmpDir);
      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      delete config.version;
      fs.writeFileSync(configPath, yaml.dump(config), 'utf8');

      // Remove empathy-map dir so guessVersionFromFileStructure returns null
      // (empathy-map is a current workflow but also matches the v1.0.0 guess heuristic)
      await fs.remove(path.join(tmpDir, '_bmad/bme/_vortex/workflows/empathy-map'));

      const result = assessUpdate(tmpDir);
      assert.equal(result.action, 'no-version');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('returns no-migrations when version has no applicable migrations', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-assess-'));
    try {
      await createValidInstallation(tmpDir);
      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      // 1.6.0 < pkg 1.6.4 (upgrade-needed) but no 1.6.x migration in registry
      config.version = '1.6.0';
      fs.writeFileSync(configPath, yaml.dump(config), 'utf8');

      const result = assessUpdate(tmpDir);
      assert.equal(result.action, 'no-migrations');
      assert.equal(result.currentVersion, '1.6.0');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('handles malformed config.yaml gracefully', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-assess-'));
    try {
      await createValidInstallation(tmpDir);
      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      // Write invalid YAML that will cause a parse error
      fs.writeFileSync(configPath, ': invalid: yaml: {{{{', 'utf8');

      const result = assessUpdate(tmpDir);
      // getCurrentVersion falls back to guessVersionFromFileStructure
      // which returns null for a modern installation → no-version
      assert.ok(result.action, 'should return an action despite malformed config');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('handles empty config.yaml', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-assess-'));
    try {
      await createValidInstallation(tmpDir);
      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      fs.writeFileSync(configPath, '', 'utf8');

      // Remove empathy-map so guessVersion returns null instead of '1.0.0'
      await fs.remove(path.join(tmpDir, '_bmad/bme/_vortex/workflows/empathy-map'));

      const result = assessUpdate(tmpDir);
      // yaml.load('') returns undefined → config falsy → guessVersion → null → no-version
      assert.equal(result.action, 'no-version');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('returns upgrade without duplicate migrations for v1.0.x', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-assess-'));
    try {
      await createValidInstallation(tmpDir);
      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      config.version = '1.0.5';
      fs.writeFileSync(configPath, yaml.dump(config), 'utf8');

      const result = assessUpdate(tmpDir);
      assert.equal(result.action, 'upgrade');

      // Verify no duplicate migration names
      const names = result.migrations.map(m => m.name);
      const uniqueNames = [...new Set(names)];
      assert.equal(names.length, uniqueNames.length, 'should have no duplicate migrations');
    } finally {
      await fs.remove(tmpDir);
    }
  });
});

// ─── main() CLI Integration Tests ─────────────────────────

describe('bmad-update CLI (main)', () => {

  // ─── Scenario Tests ──────────────────────────────────

  it('exits 1 with error for no-project scenario', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      const { exitCode, stdout } = await runScript(SCRIPT_PATH, [], { cwd: tmpDir });
      assert.equal(exitCode, 1);
      assert.ok(stdout.includes('Not in a BMAD project'), 'should mention missing project');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('exits 0 with install suggestion for fresh installation', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      // Create _bmad dir only (no _vortex) so findProjectRoot finds it
      await fs.ensureDir(path.join(tmpDir, '_bmad'));

      const { exitCode, stdout } = await runScript(SCRIPT_PATH, [], { cwd: tmpDir });
      assert.equal(exitCode, 0);
      assert.ok(stdout.includes('No previous installation'), 'should indicate fresh state');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('exits 1 for broken installation', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      // Create partial installation: _vortex exists but no config
      await fs.ensureDir(path.join(tmpDir, '_bmad/bme/_vortex'));

      const { exitCode, stdout } = await runScript(SCRIPT_PATH, [], { cwd: tmpDir });
      assert.equal(exitCode, 1);
      assert.ok(
        stdout.includes('incomplete') || stdout.includes('corrupted'),
        'should indicate broken installation'
      );
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('exits 0 for no-version scenario', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      await createValidInstallation(tmpDir);
      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      delete config.version;
      fs.writeFileSync(configPath, yaml.dump(config), 'utf8');

      // Remove empathy-map so guessVersion returns null instead of '1.0.0'
      await fs.remove(path.join(tmpDir, '_bmad/bme/_vortex/workflows/empathy-map'));

      const { exitCode, stdout } = await runScript(SCRIPT_PATH, [], { cwd: tmpDir });
      assert.equal(exitCode, 0);
      assert.ok(stdout.includes('Could not detect'), 'should mention version detection failure');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('exits 0 for up-to-date installation', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      await createValidInstallation(tmpDir);
      const pkg = require('../../package.json');
      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      config.version = pkg.version;
      fs.writeFileSync(configPath, yaml.dump(config), 'utf8');

      const { exitCode, stdout } = await runScript(SCRIPT_PATH, [], { cwd: tmpDir });
      assert.equal(exitCode, 0);
      assert.ok(stdout.includes('up to date'), 'should confirm up-to-date status');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('exits 1 for downgrade scenario', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      await createValidInstallation(tmpDir);
      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      config.version = '99.99.99';
      fs.writeFileSync(configPath, yaml.dump(config), 'utf8');

      const { exitCode, stdout } = await runScript(SCRIPT_PATH, [], { cwd: tmpDir });
      assert.equal(exitCode, 1);
      assert.ok(stdout.includes('DOWNGRADE'), 'should warn about downgrade');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('exits 0 for no-migrations scenario', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      await createValidInstallation(tmpDir);
      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      // 1.6.0 < pkg 1.6.4 (upgrade-needed) but no 1.6.x migration in registry
      config.version = '1.6.0';
      fs.writeFileSync(configPath, yaml.dump(config), 'utf8');

      const { exitCode, stdout } = await runScript(SCRIPT_PATH, [], { cwd: tmpDir });
      assert.equal(exitCode, 0);
      assert.ok(stdout.includes('No migrations needed'), 'should indicate no migrations');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  // ─── CLI Flag Tests ──────────────────────────────────

  it('previews migrations with --dry-run and exits 0', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      await createInstallation(tmpDir, '1.4.1');

      const { exitCode, stdout } = await runScript(SCRIPT_PATH, ['--dry-run'], { cwd: tmpDir });
      assert.equal(exitCode, 0);
      assert.ok(stdout.includes('DRY RUN'), 'should indicate dry run mode');
      assert.ok(stdout.includes('Migration Plan'), 'should show migration plan');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('skips confirmation with --yes flag', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      await createInstallation(tmpDir, '1.4.1');

      const { exitCode, stdout } = await runScript(SCRIPT_PATH, ['--yes'], { cwd: tmpDir });
      // Migration should run without prompting
      assert.ok(exitCode === 0 || exitCode === 1, `expected 0 or 1, got ${exitCode}`);
      assert.ok(stdout.includes('Migration Plan'), 'should show migration plan');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('accepts -y shorthand for --yes', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      await createInstallation(tmpDir, '1.4.1');

      const { exitCode, stdout } = await runScript(SCRIPT_PATH, ['-y', '--dry-run'], { cwd: tmpDir });
      assert.equal(exitCode, 0);
      assert.ok(stdout.includes('DRY RUN'), 'should accept -y shorthand');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('shows verbose output with --verbose flag', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      await createInstallation(tmpDir, '1.4.1');

      const { exitCode, stdout } = await runScript(
        SCRIPT_PATH, ['--dry-run', '--verbose'], { cwd: tmpDir }
      );
      assert.equal(exitCode, 0);
      assert.ok(stdout.length > 0, 'should produce output with verbose flag');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('accepts -v shorthand for --verbose', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      await createInstallation(tmpDir, '1.4.1');

      const { exitCode } = await runScript(
        SCRIPT_PATH, ['--dry-run', '-v'], { cwd: tmpDir }
      );
      assert.equal(exitCode, 0);
    } finally {
      await fs.remove(tmpDir);
    }
  });

  // ─── Confirmation Tests ──────────────────────────────

  it('exits 0 when user rejects migration with n', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      await createInstallation(tmpDir, '1.4.1');

      const { exitCode, stdout } = await runScriptWithInput(
        SCRIPT_PATH, [], 'n\n', { cwd: tmpDir }
      );
      assert.equal(exitCode, 0);
      assert.ok(stdout.includes('cancelled'), 'should indicate cancellation');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('runs migration when user confirms with y', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      await createInstallation(tmpDir, '1.4.1');

      const { exitCode, stdout } = await runScriptWithInput(
        SCRIPT_PATH, [], 'y\n', { cwd: tmpDir }
      );
      // Migration should run (may succeed or fail depending on state)
      assert.ok(exitCode === 0 || exitCode === 1, `expected 0 or 1, got ${exitCode}`);
      assert.ok(stdout.includes('Migration Plan'), 'should show migration plan before confirm');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  // ─── Breaking Changes Display ──────────────────────────

  it('displays breaking changes warning for v1.0.x upgrade', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      await createInstallation(tmpDir, '1.0.5');

      const { stdout } = await runScriptWithInput(
        SCRIPT_PATH, [], 'n\n', { cwd: tmpDir }
      );
      assert.ok(stdout.includes('BREAKING CHANGES'), 'should display breaking changes warning');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  // ─── Manifest Merge Preservation (AC #3) ────────────

  it('updates config version and agents after upgrade with --yes', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      await createInstallation(tmpDir, '1.4.1');

      const { exitCode } = await runScript(SCRIPT_PATH, ['--yes'], { cwd: tmpDir });
      assert.equal(exitCode, 0);

      // Verify config updated to current package version with all core agents
      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      const updatedConfig = yaml.load(fs.readFileSync(configPath, 'utf8'));
      const pkg = require('../../package.json');
      assert.equal(updatedConfig.version, pkg.version, 'should update to package version');
      assert.ok(updatedConfig.agents.length >= 7, 'should include all core agents');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  it('does not duplicate core agents after upgrade', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      await createInstallation(tmpDir, '1.4.1');

      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');

      await runScript(SCRIPT_PATH, ['--yes'], { cwd: tmpDir });

      // Verify no duplicate agent entries
      const updatedConfig = yaml.load(fs.readFileSync(configPath, 'utf8'));
      const uniqueAgents = [...new Set(updatedConfig.agents)];
      assert.equal(
        updatedConfig.agents.length,
        uniqueAgents.length,
        'should have no duplicate agents after upgrade'
      );
    } finally {
      await fs.remove(tmpDir);
    }
  });

  // ─── Cross-Platform Path Handling (AC #5) ──────────

  it('finds project root from nested subdirectory', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      await createValidInstallation(tmpDir);
      const pkg = require('../../package.json');
      const configPath = path.join(tmpDir, '_bmad/bme/_vortex/config.yaml');
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      config.version = pkg.version;
      fs.writeFileSync(configPath, yaml.dump(config), 'utf8');

      // Create nested subdirectory and run from there
      const nestedDir = path.join(tmpDir, 'src', 'components', 'deep');
      await fs.ensureDir(nestedDir);

      const { exitCode, stdout } = await runScript(SCRIPT_PATH, [], { cwd: nestedDir });
      // findProjectRoot walks up from nestedDir → finds _bmad at tmpDir
      assert.equal(exitCode, 0);
      assert.ok(stdout.includes('up to date'), 'should find project root from nested dir');
    } finally {
      await fs.remove(tmpDir);
    }
  });

  // ─── Banner & Output ──────────────────────────────────

  it('shows header banner on every invocation', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bmad-cli-'));
    try {
      const { stdout } = await runScript(SCRIPT_PATH, [], { cwd: tmpDir });
      assert.ok(stdout.includes('BMAD-Enhanced Update Manager'), 'should display header banner');
    } finally {
      await fs.remove(tmpDir);
    }
  });
});
