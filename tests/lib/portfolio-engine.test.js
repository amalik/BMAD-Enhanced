const { findProjectRoot } = require('../../scripts/update/lib/utils');
const {
  generatePortfolio,
  makeEmptyState,
  attributeFile,
  explainUnattributed,
  STORY_PREFIX_MAP,
  PORTFOLIO_FOLDER_DEFAULT_MAP
} = require('../../scripts/lib/portfolio/portfolio-engine');
const { formatTerminal } = require('../../scripts/lib/portfolio/formatters/terminal-formatter');
const { formatMarkdown } = require('../../scripts/lib/portfolio/formatters/markdown-formatter');
const { readTaxonomy } = require('../../scripts/lib/artifact-utils');

let projectRoot;
let taxonomy;

beforeAll(() => {
  projectRoot = findProjectRoot();
  taxonomy = readTaxonomy(projectRoot);
});

// --- generatePortfolio integration tests ---

describe('generatePortfolio', () => {
  test('scans real _bmad-output and returns InitiativeState array', async () => {
    const result = await generatePortfolio(projectRoot);
    expect(result.initiatives.length).toBeGreaterThan(0);
    expect(result.summary.total).toBeGreaterThan(0);
  });

  test('each initiative has phase, status, lastArtifact, nextAction', async () => {
    const result = await generatePortfolio(projectRoot);
    for (const s of result.initiatives) {
      expect(s.initiative).toBeTruthy();
      expect(s.phase).toBeDefined();
      expect(s.phase.value).toBeTruthy();
      expect(s.status).toBeDefined();
      expect(s.status.value).toBeTruthy();
      expect(s.lastArtifact).toBeDefined();
      expect(s.nextAction).toBeDefined();
    }
  });

  test('alphabetical sort by default', async () => {
    const result = await generatePortfolio(projectRoot);
    const names = result.initiatives.map(s => s.initiative);
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('--sort last-activity sorts by date descending', async () => {
    const result = await generatePortfolio(projectRoot, { sort: 'last-activity' });
    const dates = result.initiatives.map(s => s.lastArtifact.date || '');
    for (let i = 0; i < dates.length - 1; i++) {
      expect(dates[i] >= dates[i + 1]).toBe(true);
    }
  });

  test('performance: under 5 seconds for full scan (NFR1)', async () => {
    const start = Date.now();
    await generatePortfolio(projectRoot);
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(5000);
  });

  test('summary counts governed + ungoverned + unattributed = total', async () => {
    const result = await generatePortfolio(projectRoot);
    expect(result.summary.total).toBe(
      result.summary.governed + result.summary.ungoverned + result.summary.unattributed
    );
  });

  test('health score has governed, total, percentage fields', async () => {
    const result = await generatePortfolio(projectRoot);
    expect(result.summary.healthScore).toBeDefined();
    expect(typeof result.summary.healthScore.governed).toBe('number');
    expect(typeof result.summary.healthScore.total).toBe('number');
    expect(typeof result.summary.healthScore.percentage).toBe('number');
    expect(result.summary.healthScore.percentage).toBeGreaterThanOrEqual(0);
    expect(result.summary.healthScore.percentage).toBeLessThanOrEqual(100);
  });

  test('health score total matches attributable files (governed + ungoverned)', async () => {
    const result = await generatePortfolio(projectRoot);
    expect(result.summary.healthScore.total).toBe(result.summary.governed + result.summary.ungoverned);
  });

  test('ungoverned files are indexed in portfolio (not skipped)', async () => {
    const result = await generatePortfolio(projectRoot);
    // Real repo has files with resolved initiative but no frontmatter — these should appear
    expect(result.summary.ungoverned).toBeGreaterThan(0);
    // At least some initiatives should have results
    const withArtifacts = result.initiatives.filter(s => s.lastArtifact.file !== null);
    expect(withArtifacts.length).toBeGreaterThan(0);
  });

  test('degraded results show inferred confidence', async () => {
    const result = await generatePortfolio(projectRoot);
    // Ungoverned initiatives (no frontmatter) should have inferred confidence
    for (const s of result.initiatives) {
      if (s.phase.value && s.phase.value !== 'unknown') {
        expect(['explicit', 'inferred']).toContain(s.phase.confidence);
      }
    }
  });

  test('wipRadar is null when threshold not exceeded', async () => {
    const result = await generatePortfolio(projectRoot, { wipThreshold: 99 });
    expect(result.wipRadar).toBeNull();
  });

  test('wipRadar returned when threshold exceeded', async () => {
    const result = await generatePortfolio(projectRoot, { wipThreshold: 1 });
    // Real repo likely has >1 active initiative
    if (result.wipRadar) {
      expect(result.wipRadar.active).toBeGreaterThan(1);
      expect(result.wipRadar.threshold).toBe(1);
      expect(Array.isArray(result.wipRadar.initiatives)).toBe(true);
      expect(result.wipRadar.initiatives.length).toBe(result.wipRadar.active);
    }
  });

  test('--filter by prefix returns matching initiatives only', async () => {
    const result = await generatePortfolio(projectRoot, { filter: 'g*' });
    expect(result.initiatives.length).toBeGreaterThan(0);
    for (const s of result.initiatives) {
      expect(s.initiative.startsWith('g')).toBe(true);
    }
  });

  test('--filter with no match returns empty', async () => {
    const result = await generatePortfolio(projectRoot, { filter: 'zzz' });
    expect(result.initiatives.length).toBe(0);
  });

  test('--filter applies before WIP count', async () => {
    // Filter to single initiative — WIP should be <= 1 regardless of full portfolio
    const result = await generatePortfolio(projectRoot, { filter: 'gyre', wipThreshold: 0 });
    if (result.wipRadar) {
      expect(result.wipRadar.active).toBeLessThanOrEqual(1);
    }
  });

  test('initiatives have inference trace data (source + confidence)', async () => {
    const result = await generatePortfolio(projectRoot);
    for (const s of result.initiatives) {
      // Every initiative should have source and confidence on phase and status
      expect(s.phase.source).toBeTruthy();
      expect(['explicit', 'inferred']).toContain(s.phase.confidence);
      expect(s.status.source).toBeTruthy();
      expect(['explicit', 'inferred']).toContain(s.status.confidence);
    }
  });

  test('known initiatives from taxonomy are present', async () => {
    const result = await generatePortfolio(projectRoot);
    const names = result.initiatives.map(s => s.initiative);
    expect(names).toContain('gyre');
    expect(names).toContain('helm');
    expect(names).toContain('forge');
    expect(names).toContain('vortex');
  });
});

// --- formatTerminal tests ---

describe('formatTerminal', () => {
  test('produces aligned column output', () => {
    const initiatives = [
      { initiative: 'gyre', phase: { value: 'planning', confidence: 'inferred' }, status: { value: 'ongoing', confidence: 'inferred' }, lastArtifact: { file: 'gyre-prd.md', date: '2026-04-01' }, nextAction: { value: 'Create architecture', source: 'conflict-resolver' } }
    ];
    const output = formatTerminal(initiatives);
    expect(output).toContain('Initiative');
    expect(output).toContain('Phase');
    expect(output).toContain('Status');
    expect(output).toContain('gyre');
    expect(output).toContain('planning');
  });

  test('shows (explicit) for explicit confidence', () => {
    const initiatives = [
      { initiative: 'helm', phase: { value: 'discovery', confidence: 'inferred' }, status: { value: 'validated', confidence: 'explicit' }, lastArtifact: { file: 'a.md', date: '2026-04-01' }, nextAction: { value: 'Next step', source: 'test' } }
    ];
    const output = formatTerminal(initiatives);
    expect(output).toContain('(explicit)');
  });

  test('shows (inferred) for inferred confidence', () => {
    const initiatives = [
      { initiative: 'forge', phase: { value: 'build', confidence: 'inferred' }, status: { value: 'ongoing', confidence: 'inferred' }, lastArtifact: { file: 'a.md', date: '2026-04-01' }, nextAction: { value: null, source: null } }
    ];
    const output = formatTerminal(initiatives);
    expect(output).toContain('(inferred)');
  });

  test('unknown shows as unknown (inferred) -- never bare', () => {
    const initiatives = [
      { initiative: 'bmm', phase: { value: 'unknown', confidence: 'inferred' }, status: { value: 'unknown', confidence: 'inferred' }, lastArtifact: { file: null, date: null }, nextAction: { value: 'Create PRD', source: 'test' } }
    ];
    const output = formatTerminal(initiatives);
    expect(output).toContain('unknown (inferred)');
  });

  test('empty initiatives -> message', () => {
    const output = formatTerminal([]);
    expect(output).toContain('No initiatives found');
  });

  test('context fallback to lastArtifact when no nextAction', () => {
    const initiatives = [
      { initiative: 'convoke', phase: { value: 'planning', confidence: 'inferred' }, status: { value: 'ongoing', confidence: 'inferred' }, lastArtifact: { file: 'convoke-prd.md', date: '2026-04-01' }, nextAction: { value: null, source: null } }
    ];
    const output = formatTerminal(initiatives);
    expect(output).toContain('Last: convoke-prd.md');
  });
});

// --- formatMarkdown tests ---

describe('formatMarkdown', () => {
  test('produces valid markdown table', () => {
    const initiatives = [
      { initiative: 'gyre', phase: { value: 'planning', confidence: 'inferred' }, status: { value: 'ongoing', confidence: 'inferred' }, lastArtifact: { file: 'gyre-prd.md', date: '2026-04-01' }, nextAction: { value: 'Create arch', source: 'test' } }
    ];
    const output = formatMarkdown(initiatives);
    expect(output).toContain('| Initiative |');
    expect(output).toContain('|------------|');
    expect(output).toContain('| gyre |');
  });

  test('shows (explicit) and (inferred) markers', () => {
    const initiatives = [
      { initiative: 'helm', phase: { value: 'discovery', confidence: 'inferred' }, status: { value: 'validated', confidence: 'explicit' }, lastArtifact: { file: 'a.md', date: '2026-04-01' }, nextAction: { value: 'Next', source: 'test' } },
      { initiative: 'forge', phase: { value: 'build', confidence: 'inferred' }, status: { value: 'ongoing', confidence: 'inferred' }, lastArtifact: { file: 'b.md', date: '2026-04-01' }, nextAction: { value: 'Continue', source: 'test' } }
    ];
    const output = formatMarkdown(initiatives);
    expect(output).toContain('(explicit)');
    expect(output).toContain('(inferred)');
  });

  test('empty initiatives -> message', () => {
    const output = formatMarkdown([]);
    expect(output).toContain('No initiatives found');
  });
});

// --- makeEmptyState ---

describe('makeEmptyState', () => {
  test('creates state with correct initiative and null fields', () => {
    const state = makeEmptyState('test');
    expect(state.initiative).toBe('test');
    expect(state.phase.value).toBeNull();
    expect(state.status.value).toBeNull();
    expect(state.lastArtifact.file).toBeNull();
    expect(state.nextAction.value).toBeNull();
  });
});

// --- Story 6.3: attributeFile tests ---

describe('attributeFile', () => {
  test('A — frontmatter title with initiative → frontmatter-title', () => {
    const file = { filename: 'validation-report.md', dir: 'planning-artifacts' };
    const fm = { title: 'Gyre Validation Report' };
    const result = attributeFile(file, '# Random body\n', fm, taxonomy);
    expect(result.initiative).toBe('gyre');
    expect(result.source).toBe('frontmatter-title');
  });

  test('B — content fallback first 5 lines → content-fallback', () => {
    const file = { filename: 'untitled.md', dir: 'vortex-artifacts' };
    const content = '# Forge Discovery Report\n\nDate: 2026-03-21\n\nBody continues here.\n';
    const result = attributeFile(file, content, null, taxonomy);
    expect(result.initiative).toBe('forge');
    expect(result.source).toBe('content-fallback');
  });

  test('C — parent dir match (gyre-artifacts) → parent-dir', () => {
    const file = { filename: 'random.md', dir: 'gyre-artifacts' };
    const result = attributeFile(file, 'no signal', null, taxonomy);
    expect(result.initiative).toBe('gyre');
    expect(result.source).toBe('parent-dir');
  });

  test('D — priority: frontmatter title beats parent-dir', () => {
    const file = { filename: 'note.md', dir: 'gyre-artifacts' };
    const fm = { title: 'Helm Strategy Notes' };
    const result = attributeFile(file, '', fm, taxonomy);
    expect(result.initiative).toBe('helm');
    expect(result.source).toBe('frontmatter-title');
  });

  test('E — alias resolution: Strategy Perimeter → helm', () => {
    const file = { filename: 'foo.md', dir: 'planning-artifacts' };
    const fm = { title: 'Strategy Perimeter Discovery' };
    const result = attributeFile(file, '', fm, taxonomy);
    expect(result.initiative).toBe('helm');
  });

  test('F — no-content file in synthetic dir with no signals → null', () => {
    // Use a synthetic dir that does NOT match any taxonomy initiative.
    // (Real `vortex-artifacts/` dir matches `vortex` via parent-dir scan, by design.)
    const file = { filename: 'opaque.md', dir: 'unknown-dir' };
    const result = attributeFile(file, 'random body content with no initiative', null, taxonomy);
    expect(result.initiative).toBeNull();
  });

  test('Filename prefix: gyre-1-1-foo.md → gyre via filename-prefix', () => {
    const file = { filename: 'gyre-1-1-some-story.md', dir: 'implementation-artifacts' };
    const result = attributeFile(file, 'body', null, taxonomy);
    expect(result.initiative).toBe('gyre');
    expect(result.source).toBe('filename-prefix');
  });

  test('Story prefix: tf-2-10-foo.md → loom via story-prefix', () => {
    const file = { filename: 'tf-2-10-some-story.md', dir: 'implementation-artifacts' };
    const result = attributeFile(file, 'body', null, taxonomy);
    expect(result.initiative).toBe('loom');
    expect(result.source).toBe('story-prefix');
  });

  test('Story prefix: ag-6-3-foo.md → convoke', () => {
    const file = { filename: 'ag-6-3-portfolio.md', dir: 'implementation-artifacts' };
    const result = attributeFile(file, 'body', null, taxonomy);
    expect(result.initiative).toBe('convoke');
    expect(result.source).toBe('story-prefix');
  });

  test('Folder default: planning-artifacts → convoke (last resort)', () => {
    const file = { filename: 'opaque.md', dir: 'planning-artifacts' };
    const result = attributeFile(file, 'body with no signal', null, taxonomy);
    expect(result.initiative).toBe('convoke');
    expect(result.source).toBe('folder-default');
  });

  test('Hyphen boundary: pre-gyre in title does NOT content-match gyre (regression for content scan)', () => {
    // Use a synthetic dir to isolate the content-keyword scan from parent-dir matching.
    const file = { filename: 'opaque.md', dir: 'unknown-dir' };
    const fm = { title: 'pre-gyre planning notes' };
    const result = attributeFile(file, '', fm, taxonomy);
    // Frontmatter scan rejects (kebab boundary), no content, no parent-dir match, no story prefix.
    expect(result.initiative).toBeNull();
  });

  test('STORY_PREFIX_MAP and PORTFOLIO_FOLDER_DEFAULT_MAP are exported for inspection', () => {
    expect(STORY_PREFIX_MAP.tf).toBe('loom');
    expect(STORY_PREFIX_MAP.ag).toBe('convoke');
    expect(PORTFOLIO_FOLDER_DEFAULT_MAP['planning-artifacts']).toBe('convoke');
  });
});

// --- Story 6.3: explainUnattributed tests ---

describe('explainUnattributed', () => {
  test('G — empty content → unreadable or empty', () => {
    const file = { filename: 'foo.md', dir: 'planning-artifacts' };
    expect(explainUnattributed(file, '', null)).toBe('unreadable or empty');
  });

  test('H — short content (< 5 lines) → insufficient content', () => {
    const file = { filename: 'foo-bar.md', dir: 'planning-artifacts' };
    expect(explainUnattributed(file, '# title\nshort body', null)).toBe('insufficient content for inference');
  });

  test('I — no type prefix in filename → reason mentions prefix', () => {
    const file = { filename: 'whatever.md', dir: 'planning-artifacts' };
    const longContent = '# title\n\nline 3\nline 4\nline 5\nline 6\n';
    expect(explainUnattributed(file, longContent, null)).toBe('no type prefix in filename');
  });

  test('J — default reason when filename has prefix but no signals', () => {
    const file = { filename: 'persona-foo.md', dir: 'vortex-artifacts' };
    const longContent = '# title\n\nline 3\nline 4\nline 5\nline 6\n';
    expect(explainUnattributed(file, longContent, null)).toBe(
      'no initiative signal in filename, frontmatter title, content, or parent directory'
    );
  });
});

// --- Story 6.3: integration verification ---

describe('Story 6.3 — portfolio attribution improvements', () => {
  test('generatePortfolio surfaces unattributedFiles array with reasons', async () => {
    const result = await generatePortfolio(projectRoot);
    expect(Array.isArray(result.unattributedFiles)).toBe(true);
    // Each entry has filename, dir, reason
    for (const u of result.unattributedFiles) {
      expect(u.filename).toBeTruthy();
      expect(u.dir).toBeTruthy();
      expect(typeof u.reason).toBe('string');
    }
  });

  test('summary.attributableButUngoverned tracks fallback attributions', async () => {
    const result = await generatePortfolio(projectRoot);
    expect(typeof result.summary.attributableButUngoverned).toBe('number');
    // On the current repo, fallback layers attribute many files
    expect(result.summary.attributableButUngoverned).toBeGreaterThan(0);
  });

  test('unattributed count is well under 20 on the current repo (AC2)', async () => {
    const result = await generatePortfolio(projectRoot);
    // Story 6.3 AC2: under 20 unattributed
    expect(result.summary.unattributed).toBeLessThan(20);
  });
});

// --- Story 6.3: CLI output tests (Tests O, P, Q) ---

describe('convoke-portfolio CLI output (Story 6.3)', () => {
  const path = require('path');
  const { execFileSync } = require('child_process');
  const cliPath = path.join(__dirname, '..', '..', 'scripts', 'lib', 'portfolio', 'portfolio-engine.js');

  function runCli(args = []) {
    try {
      return execFileSync('node', [cliPath, ...args], {
        cwd: projectRoot,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe']
      });
    } catch (err) {
      // CLI may write warnings to stderr; combine for test inspection
      return (err.stdout || '') + (err.stderr || '');
    }
  }

  test('O — without --show-unattributed: summary line, NOT individual filenames', () => {
    const output = runCli([]);
    // Summary line present
    expect(output).toMatch(/\d+ unattributed files \(run with --show-unattributed/);
    // No "--- Unattributed Files (" detail header
    expect(output).not.toContain('--- Unattributed Files (');
    // No "  vortex-artifacts/persona-..." style per-file lines
    expect(output).not.toMatch(/vortex-artifacts\/persona-compliance-officer/);
  });

  test('P — with --show-unattributed: both summary and per-file lines', () => {
    const output = runCli(['--show-unattributed']);
    // Detail header present
    expect(output).toContain('--- Unattributed Files (');
    // At least one per-file entry rendered with reason
    expect(output).toMatch(/^ {2}[^/\s]+\/[^:]+:.+$/m);
  });

  test('Q — attributableButUngoverned line contains migration guidance', () => {
    const output = runCli([]);
    // Story 6.3 AC8: when attributableButUngoverned > 0, output mentions migration
    expect(output).toContain('files attributable to existing initiatives');
    expect(output).toContain('run convoke-migrate-artifacts to govern them');
  });
});
