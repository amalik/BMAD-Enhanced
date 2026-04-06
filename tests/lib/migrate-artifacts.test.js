const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const yaml = require('js-yaml');
const {
  parseArgs,
  bootstrapTaxonomy,
  DEFAULT_INCLUDE_DIRS,
  PLATFORM_INITIATIVES,
  DEFAULT_ARTIFACT_TYPES,
  VALID_DIR_PATTERN
} = require('../../scripts/migrate-artifacts');
const { findProjectRoot } = require('../../scripts/update/lib/utils');
const { generateManifest, formatManifest } = require('../../scripts/lib/artifact-utils');

// --- parseArgs tests ---

describe('parseArgs', () => {
  test('default args -> correct defaults', () => {
    const result = parseArgs([]);
    expect(result.help).toBe(false);
    expect(result.apply).toBe(false);
    expect(result.force).toBe(false);
    expect(result.verbose).toBe(false);
    expect(result.includeDirs).toEqual(DEFAULT_INCLUDE_DIRS);
    expect(result.includeDirs).toHaveLength(3);
  });

  test('--help flag detected', () => {
    expect(parseArgs(['--help']).help).toBe(true);
    expect(parseArgs(['-h']).help).toBe(true);
  });

  test('--include a,b,c parsed correctly', () => {
    const result = parseArgs(['--include', 'a,b,c']);
    expect(result.includeDirs).toEqual(['a', 'b', 'c']);
  });

  test('--include trims whitespace', () => {
    const result = parseArgs(['--include', ' a , b , c ']);
    expect(result.includeDirs).toEqual(['a', 'b', 'c']);
  });

  test('--include replaces defaults', () => {
    const result = parseArgs(['--include', 'custom-dir']);
    expect(result.includeDirs).toEqual(['custom-dir']);
    expect(result.includeDirs).not.toEqual(DEFAULT_INCLUDE_DIRS);
  });

  test('--include without value uses defaults', () => {
    const result = parseArgs(['--include']);
    expect(result.includeDirs).toEqual([...DEFAULT_INCLUDE_DIRS]);
  });

  test('--include followed by another flag does not consume the flag', () => {
    const result = parseArgs(['--include', '--verbose']);
    expect(result.includeDirs).toEqual([...DEFAULT_INCLUDE_DIRS]);
    expect(result.verbose).toBe(true);
  });

  test('--include with path traversal rejects invalid names', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    const result = parseArgs(['--include', '../../../etc,planning-artifacts']);
    expect(result.includeDirs).toEqual(['planning-artifacts']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Invalid directory names'));
    spy.mockRestore();
  });

  test('--include returns copy of defaults (not same reference)', () => {
    const result1 = parseArgs([]);
    const result2 = parseArgs([]);
    expect(result1.includeDirs).not.toBe(result2.includeDirs);
    expect(result1.includeDirs).toEqual(result2.includeDirs);
  });

  test('--apply and --force flags detected', () => {
    const result = parseArgs(['--apply', '--force']);
    expect(result.apply).toBe(true);
    expect(result.force).toBe(true);
  });

  test('--verbose flag detected', () => {
    expect(parseArgs(['--verbose']).verbose).toBe(true);
  });

  test('unknown flags ignored (no error)', () => {
    const result = parseArgs(['--unknown', '--also-unknown', 'random']);
    expect(result.help).toBe(false);
    expect(result.includeDirs).toEqual(DEFAULT_INCLUDE_DIRS);
  });

  test('multiple flags combined', () => {
    const result = parseArgs(['--verbose', '--include', 'a,b', '--help']);
    expect(result.verbose).toBe(true);
    expect(result.help).toBe(true);
    expect(result.includeDirs).toEqual(['a', 'b']);
  });
});

// --- bootstrapTaxonomy tests ---

describe('bootstrapTaxonomy', () => {
  let tmpDir;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'convoke-test-'));
    await fs.ensureDir(path.join(tmpDir, '_bmad', '_config'));
  });

  afterEach(async () => {
    await fs.remove(tmpDir);
  });

  test('creates taxonomy.yaml when absent', () => {
    const created = bootstrapTaxonomy(tmpDir);
    expect(created).toBe(true);

    const configPath = path.join(tmpDir, '_bmad', '_config', 'taxonomy.yaml');
    expect(fs.existsSync(configPath)).toBe(true);

    const content = yaml.load(fs.readFileSync(configPath, 'utf8'));
    expect(content.initiatives.platform).toEqual(PLATFORM_INITIATIVES);
    expect(content.initiatives.user).toEqual([]);
    expect(content.artifact_types).toEqual(DEFAULT_ARTIFACT_TYPES);
    expect(content.aliases).toEqual({});
  });

  test('does not overwrite when present', () => {
    const configPath = path.join(tmpDir, '_bmad', '_config', 'taxonomy.yaml');
    fs.writeFileSync(configPath, 'existing: true\n', 'utf8');

    const created = bootstrapTaxonomy(tmpDir);
    expect(created).toBe(false);

    const content = fs.readFileSync(configPath, 'utf8');
    expect(content).toBe('existing: true\n');
  });

  test('bootstrap has empty aliases (not migration-specific ones)', () => {
    bootstrapTaxonomy(tmpDir);
    const configPath = path.join(tmpDir, '_bmad', '_config', 'taxonomy.yaml');
    const content = yaml.load(fs.readFileSync(configPath, 'utf8'));
    expect(content.aliases).toEqual({});
    expect(Object.keys(content.aliases)).toHaveLength(0);
  });

  test('creates _config directory if absent', async () => {
    const bareDir = await fs.mkdtemp(path.join(os.tmpdir(), 'convoke-bare-'));
    await fs.ensureDir(path.join(bareDir, '_bmad'));
    // _config does not exist yet

    const created = bootstrapTaxonomy(bareDir);
    expect(created).toBe(true);
    expect(fs.existsSync(path.join(bareDir, '_bmad', '_config', 'taxonomy.yaml'))).toBe(true);

    await fs.remove(bareDir);
  });
});

// --- Archive exclusion ---

describe('archive exclusion', () => {
  test('_archive in --include is parsed (filtering happens in main)', () => {
    // parseArgs passes through all valid dir names; main() does the _archive filtering
    const args = parseArgs(['--include', 'planning-artifacts,_archive,vortex-artifacts']);
    expect(args.includeDirs).toContain('_archive');
    expect(args.includeDirs).toContain('planning-artifacts');
  });

  test('_archive-only include would be caught by empty scope check in main', () => {
    const args = parseArgs(['--include', '_archive']);
    const filtered = args.includeDirs.filter(d => d !== '_archive');
    expect(filtered).toHaveLength(0);
  });
});

// --- NFR22 error handling ---

describe('NFR22 taxonomy error handling', () => {
  let tmpDir;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'convoke-nfr22-'));
    await fs.ensureDir(path.join(tmpDir, '_bmad', '_config'));
  });

  afterEach(async () => {
    await fs.remove(tmpDir);
  });

  test('malformed taxonomy produces actionable error from readTaxonomy', () => {
    const configPath = path.join(tmpDir, '_bmad', '_config', 'taxonomy.yaml');
    fs.writeFileSync(configPath, 'not: valid: yaml: [broken', 'utf8');

    const { readTaxonomy } = require('../../scripts/lib/artifact-utils');
    expect(() => readTaxonomy(tmpDir)).toThrow(/Invalid YAML/);
  });

  test('taxonomy with missing required fields produces clear error', () => {
    const configPath = path.join(tmpDir, '_bmad', '_config', 'taxonomy.yaml');
    fs.writeFileSync(configPath, yaml.dump({ initiatives: { platform: 'not-an-array' } }), 'utf8');

    const { readTaxonomy } = require('../../scripts/lib/artifact-utils');
    expect(() => readTaxonomy(tmpDir)).toThrow(/initiatives.platform.*must be an array/);
  });
});

// --- Dry-run integration ---

describe('dry-run integration', () => {
  let projectRoot;

  beforeAll(() => {
    projectRoot = findProjectRoot();
  });

  test('generateManifest + formatManifest produces non-empty output', async () => {
    const manifest = await generateManifest(projectRoot, {
      includeDirs: DEFAULT_INCLUDE_DIRS,
      excludeDirs: ['_archive']
    });
    const output = formatManifest(manifest);
    expect(output.length).toBeGreaterThan(0);
    expect(output).toContain('Manifest Summary');
    expect(manifest.summary.total).toBeGreaterThan(0);
  });

  test('--include with single dir restricts scope', async () => {
    const manifest = await generateManifest(projectRoot, {
      includeDirs: ['gyre-artifacts'],
      excludeDirs: ['_archive']
    });
    for (const entry of manifest.entries) {
      expect(entry.dir).toBe('gyre-artifacts');
    }
  });
});

// --- --apply stub ---

describe('--apply stub', () => {
  test('parseArgs recognizes --apply', () => {
    expect(parseArgs(['--apply']).apply).toBe(true);
  });

  test('parseArgs recognizes --force', () => {
    expect(parseArgs(['--force']).force).toBe(true);
  });

  test('--force without --apply is detected', () => {
    const args = parseArgs(['--force']);
    expect(args.force).toBe(true);
    expect(args.apply).toBe(false);
  });
});

// --- VALID_DIR_PATTERN ---

describe('VALID_DIR_PATTERN', () => {
  test('accepts valid directory names', () => {
    expect(VALID_DIR_PATTERN.test('planning-artifacts')).toBe(true);
    expect(VALID_DIR_PATTERN.test('vortex-artifacts')).toBe(true);
    expect(VALID_DIR_PATTERN.test('_archive')).toBe(true);
    expect(VALID_DIR_PATTERN.test('custom_dir')).toBe(true);
  });

  test('rejects path traversal and special characters', () => {
    expect(VALID_DIR_PATTERN.test('../../../etc')).toBe(false);
    expect(VALID_DIR_PATTERN.test('dir/subdir')).toBe(false);
    expect(VALID_DIR_PATTERN.test('dir name')).toBe(false);
    expect(VALID_DIR_PATTERN.test('$(cmd)')).toBe(false);
    expect(VALID_DIR_PATTERN.test('')).toBe(false);
  });
});
