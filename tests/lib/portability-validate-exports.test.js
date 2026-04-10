const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const { findProjectRoot } = require('../../scripts/update/lib/utils');

// Story sp-4-2: End-to-End Validation
//
// Tests the validate-exports.js script against both a real seed output
// and planted-violation fixtures.

const projectRoot = findProjectRoot();
const SEED_PATH = path.join(projectRoot, 'scripts', 'portability', 'seed-catalog-repo.js');
const VALIDATOR_PATH = path.join(projectRoot, 'scripts', 'portability', 'validate-exports.js');

function makeTmpDir() {
  const dir = path.join(os.tmpdir(), `sp-4-2-${crypto.randomUUID()}`);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

describe('Validate Exports (sp-4-2)', () => {
  // Test 1: Full pipeline — seed then validate
  describe('Full pipeline validation', () => {
    let stagingDir, seedResult, validateResult;

    beforeAll(() => {
      stagingDir = makeTmpDir();
      seedResult = spawnSync('node', [SEED_PATH, '--output', stagingDir], {
        cwd: projectRoot,
        encoding: 'utf8',
        env: process.env,
        timeout: 60000,
      });
      validateResult = spawnSync(
        'node',
        [VALIDATOR_PATH, '--input', stagingDir, '--report', path.join(stagingDir, 'VALIDATION-REPORT.md')],
        { cwd: projectRoot, encoding: 'utf8', env: process.env, timeout: 30000 }
      );
    }, 60000);

    afterAll(() => {
      if (stagingDir && fs.existsSync(stagingDir)) {
        fs.rmSync(stagingDir, { recursive: true, force: true });
      }
    });

    test('Test 1: validation passes on seed-generated staging dir', () => {
      expect(seedResult.status).toBe(0);
      expect(validateResult.status).toBe(0);
      expect(validateResult.stdout).toContain('All checks passed');
    });

    test('Test 4: VALIDATION-REPORT.md generated with PENDING markers', () => {
      const reportPath = path.join(stagingDir, 'VALIDATION-REPORT.md');
      expect(fs.existsSync(reportPath)).toBe(true);
      const content = fs.readFileSync(reportPath, 'utf8');
      expect(content).toContain('# Export Validation Report');
      expect(content).toContain('[PENDING]');
      expect(content).toContain('Carson');
      expect(content).toContain('Winston');
      expect(content).toContain('Murat');
    });
  });

  // Tests 2-3: Planted violations with minimal fixtures
  describe('Planted violation detection', () => {
    let fixtureDir;

    afterEach(() => {
      if (fixtureDir && fs.existsSync(fixtureDir)) {
        fs.rmSync(fixtureDir, { recursive: true, force: true });
      }
      fixtureDir = null;
    });

    test('Test 2: catches planted forbidden string', () => {
      fixtureDir = makeTmpDir();
      // Create minimal root files
      fs.writeFileSync(path.join(fixtureDir, 'README.md'), '# Convoke Skills Catalog\n');
      fs.writeFileSync(path.join(fixtureDir, 'LICENSE'), 'MIT License\n');
      fs.writeFileSync(path.join(fixtureDir, 'CONTRIBUTING.md'), 'auto-generated\n');
      // Create a skill with a forbidden string
      const skillDir = path.join(fixtureDir, 'bad-skill');
      fs.mkdirSync(skillDir);
      fs.writeFileSync(
        path.join(skillDir, 'instructions.md'),
        '# Bad Skill\n\n## You are BadBot\n\n## How to proceed\n\nUse the Read tool to check.\n'
      );
      fs.writeFileSync(
        path.join(skillDir, 'README.md'),
        '# Bad\n\n## How to use it\n\n### Claude Code\nCopy.\n\n### GitHub Copilot\nAppend.\n\n### Cursor\nCopy.\n'
      );

      const result = spawnSync('node', [VALIDATOR_PATH, '--input', fixtureDir], {
        cwd: projectRoot,
        encoding: 'utf8',
        env: process.env,
      });
      expect(result.status).toBe(1);
      expect(result.stdout).toContain('Read tool');
    });

    test('Test 3: catches missing persona section', () => {
      fixtureDir = makeTmpDir();
      fs.writeFileSync(path.join(fixtureDir, 'README.md'), '# Convoke Skills Catalog\n');
      fs.writeFileSync(path.join(fixtureDir, 'LICENSE'), 'MIT License\n');
      fs.writeFileSync(path.join(fixtureDir, 'CONTRIBUTING.md'), 'auto-generated\n');
      const skillDir = path.join(fixtureDir, 'no-persona');
      fs.mkdirSync(skillDir);
      fs.writeFileSync(
        path.join(skillDir, 'instructions.md'),
        '# No Persona Skill\n\n## How to proceed\n\nDo stuff.\n'
      );
      fs.writeFileSync(
        path.join(skillDir, 'README.md'),
        '# No Persona\n\n## How to use it\n\n### Claude Code\nCopy.\n\n### GitHub Copilot\nAppend.\n\n### Cursor\nCopy.\n'
      );

      const result = spawnSync('node', [VALIDATOR_PATH, '--input', fixtureDir], {
        cwd: projectRoot,
        encoding: 'utf8',
        env: process.env,
      });
      expect(result.status).toBe(1);
      expect(result.stdout).toContain('## You are');
    });
  });
});
