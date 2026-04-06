#!/usr/bin/env node

/**
 * Convoke Portfolio Engine — scan → parse → infer → sort → format → output.
 * Read-only: no git writes, no file modifications.
 *
 * @module portfolio-engine
 */

const fs = require('fs-extra');
const path = require('path');
const {
  readTaxonomy,
  scanArtifactDirs,
  parseFrontmatter,
  inferArtifactType,
  inferInitiative
} = require('../artifact-utils');
const { findProjectRoot } = require('../../update/lib/utils');
const { applyFrontmatterRule } = require('./rules/frontmatter-rule');
const { applyArtifactChainRule } = require('./rules/artifact-chain-rule');
const { applyGitRecencyRule } = require('./rules/git-recency-rule');
const { applyConflictResolver } = require('./rules/conflict-resolver');
const { formatTerminal } = require('./formatters/terminal-formatter');
const { formatMarkdown } = require('./formatters/markdown-formatter');

/** Directories to exclude from portfolio scan */
const EXCLUDE_DIRS = ['_archive', 'brainstorming', 'design-artifacts', 'journey-examples', 'project-documentation', 'test-artifacts', 'drafts'];

/**
 * Create an empty InitiativeState for a given initiative.
 * @param {string} initiative - Initiative ID
 * @returns {import('../types').InitiativeState}
 */
function makeEmptyState(initiative) {
  return {
    initiative,
    phase: { value: null, source: null, confidence: null },
    status: { value: null, source: null, confidence: null },
    lastArtifact: { file: null, date: null },
    nextAction: { value: null, source: null }
  };
}

/**
 * Generate portfolio view of all initiatives.
 *
 * @param {string} projectRoot - Absolute path to project root
 * @param {Object} [options={}]
 * @param {string} [options.sort='alpha'] - Sort mode: 'alpha' or 'last-activity'
 * @param {number} [options.staleDays=30] - Days threshold for stale detection
 * @returns {Promise<{initiatives: import('../types').InitiativeState[], summary: {total: number, governed: number, ungoverned: number}}>}
 */
async function generatePortfolio(projectRoot, options = {}) {
  const { sort = 'alpha', staleDays = 30, wipThreshold = 4, filter = null } = options;

  // Pre-flight: read taxonomy (FR39 — error if absent)
  const taxonomy = readTaxonomy(projectRoot);

  // Scan: discover subdirectories dynamically
  const outputDir = path.join(projectRoot, '_bmad-output');
  if (!fs.existsSync(outputDir)) {
    console.warn('Warning: _bmad-output/ directory not found.');
    return { initiatives: [], summary: { total: 0, governed: 0, ungoverned: 0 } };
  }
  const allDirs = fs.readdirSync(outputDir, { withFileTypes: true })
    .filter(e => e.isDirectory() && !e.name.startsWith('.') && !EXCLUDE_DIRS.includes(e.name))
    .map(e => e.name);

  const allFiles = await scanArtifactDirs(projectRoot, allDirs, ['_archive']);

  // Parse: index files by initiative
  const registry = new Map();
  let governed = 0;
  let ungoverned = 0;
  let unattributed = 0;

  const mdFiles = allFiles.filter(f => f.filename.endsWith('.md'));

  for (const file of mdFiles) {

    // Read frontmatter FIRST — governed files have authoritative metadata
    let frontmatter = null;
    let content = '';
    try {
      content = fs.readFileSync(file.fullPath, 'utf8');
      frontmatter = parseFrontmatter(content).data;
    } catch {
      // Unreadable — treat as no frontmatter
    }

    // Strategy: frontmatter initiative is authoritative if present
    let initiative, artifactType, isGoverned, typeResult;

    if (frontmatter && frontmatter.initiative && frontmatter.artifact_type) {
      // Governed file — use frontmatter as source of truth
      initiative = frontmatter.initiative;
      artifactType = frontmatter.artifact_type;
      isGoverned = true;
      governed++;
      typeResult = { type: artifactType, hcPrefix: null, remainder: '', date: null, typeConfidence: 'high', typeSource: 'frontmatter' };
    } else {
      // Ungoverned file — fall back to filename inference
      typeResult = inferArtifactType(file.filename, taxonomy);
      const initResult = typeResult.type
        ? inferInitiative(typeResult.remainder, taxonomy)
        : { initiative: null, confidence: 'low', source: 'no-type', candidates: [] };

      if (!initResult.initiative) {
        unattributed++;
        continue;
      }

      initiative = initResult.initiative;
      artifactType = typeResult.type;
      isGoverned = false;
      ungoverned++;
    }

    const enriched = {
      filename: file.filename,
      dir: file.dir,
      fullPath: file.fullPath,
      type: artifactType,
      hcPrefix: typeResult.hcPrefix,
      date: typeResult.date,
      initiative,
      frontmatter,
      content,
      isGoverned,
      degradedMode: !isGoverned
    };

    if (!registry.has(initiative)) {
      registry.set(initiative, []);
    }
    registry.get(initiative).push(enriched);
  }

  // FR39: warn if no governed artifacts
  if (governed === 0 && mdFiles.length > 0) {
    console.warn('Warning: No governed artifacts found. Run migration to populate.');
  }

  // Infer: run rule chain for each initiative in taxonomy
  const allInitiatives = [...taxonomy.initiatives.platform, ...taxonomy.initiatives.user];
  let results = [];

  for (const initiative of allInitiatives) {
    const artifacts = registry.get(initiative) || [];
    let state = makeEmptyState(initiative);
    state = applyFrontmatterRule(state, artifacts, { projectRoot });
    state = applyArtifactChainRule(state, artifacts, { projectRoot });
    state = applyGitRecencyRule(state, artifacts, { projectRoot, staleDays });
    state = applyConflictResolver(state, artifacts, { projectRoot });
    results.push(state);
  }

  // Sort
  if (sort === 'last-activity') {
    results.sort((a, b) => (b.lastArtifact.date || '').localeCompare(a.lastArtifact.date || ''));
  } else {
    results.sort((a, b) => a.initiative.localeCompare(b.initiative));
  }

  // Filter by initiative prefix (before WIP count)
  if (filter) {
    const prefix = filter.replace(/\*$/, '');
    results = results.filter(s => s.initiative.startsWith(prefix));
  }

  // WIP radar: count active initiatives (ongoing, blocked, or stale)
  const activeStatuses = ['ongoing', 'stale', 'blocked'];
  const activeInitiatives = results.filter(s => activeStatuses.includes(s.status.value));
  const wipRadar = activeInitiatives.length > wipThreshold
    ? {
      active: activeInitiatives.length,
      threshold: wipThreshold,
      initiatives: activeInitiatives
        .sort((a, b) => (b.lastArtifact.date || '').localeCompare(a.lastArtifact.date || ''))
        .map(s => s.initiative)
    }
    : null;

  // Calculate governance health score (of attributable files only — excludes unattributed)
  const attributable = governed + ungoverned;
  const healthPercentage = attributable > 0 ? Math.round((governed / attributable) * 100) : 0;

  return {
    initiatives: results,
    wipRadar,
    summary: {
      total: mdFiles.length,
      governed,
      ungoverned,
      unattributed,
      healthScore: { governed, total: attributable, percentage: healthPercentage }
    }
  };
}

// --- CLI ---

function printHelp() {
  console.log(`
Usage: convoke-portfolio [options]

Generate a portfolio view of all initiatives from artifact analysis.

Options:
  --terminal        Terminal table output (default)
  --markdown        Markdown table output
  --sort <mode>     Sort: alpha (default), last-activity
  --filter <prefix> Filter initiatives by prefix (e.g., --filter gyre)
  --verbose         Show inference trace per initiative (source + confidence)
  --help, -h        Show this help

Examples:
  convoke-portfolio                      Default terminal view
  convoke-portfolio --markdown           Markdown output for chat/docs
  convoke-portfolio --sort last-activity Sort by most recent activity
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    return;
  }

  const projectRoot = findProjectRoot();
  if (!projectRoot) {
    console.error('Error: Not in a Convoke project. Could not find _bmad/ directory.');
    process.exit(1);
  }

  const useMarkdown = args.includes('--markdown');
  const useVerbose = args.includes('--verbose');
  const sortMode = args.includes('--sort') && args[args.indexOf('--sort') + 1] === 'last-activity'
    ? 'last-activity'
    : 'alpha';
  const filterIdx = args.indexOf('--filter');
  const filterPattern = (filterIdx !== -1 && args[filterIdx + 1] && !args[filterIdx + 1].startsWith('--'))
    ? args[filterIdx + 1]
    : null;

  // Read portfolio config from _bmad/bmm/config.yaml (optional)
  let wipThreshold = 4;
  let staleDays = 30;
  try {
    const yaml = require('js-yaml');
    const configPath = path.join(projectRoot, '_bmad', 'bmm', 'config.yaml');
    if (fs.existsSync(configPath)) {
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      if (config && config.portfolio) {
        const wt = Number(config.portfolio.wip_threshold);
        if (!isNaN(wt)) wipThreshold = wt;
        const sd = Number(config.portfolio.stale_days);
        if (!isNaN(sd)) staleDays = sd;
      }
    }
  } catch {
    // Config read failed — use defaults
  }

  try {
    const result = await generatePortfolio(projectRoot, {
      sort: sortMode,
      filter: filterPattern,
      wipThreshold,
      staleDays
    });

    const output = useMarkdown
      ? formatMarkdown(result.initiatives)
      : formatTerminal(result.initiatives);

    console.log(output);

    // WIP radar (only when threshold exceeded)
    if (result.wipRadar) {
      console.log(`\nWIP: ${result.wipRadar.active} active (threshold: ${result.wipRadar.threshold}) -- sorted by last activity`);
      console.log(`  ${result.wipRadar.initiatives.join(', ')}`);
    }

    console.log(`\nTotal: ${result.summary.total} artifacts | Governed: ${result.summary.governed} | Ungoverned: ${result.summary.ungoverned} | Unattributed: ${result.summary.unattributed}`);
    const hs = result.summary.healthScore;
    console.log(`Governance: ${hs.governed}/${hs.total} artifacts governed (${hs.percentage}%)`);

    // Verbose: inference trace per initiative
    if (useVerbose) {
      console.log('\n--- Inference Trace ---');
      for (const s of result.initiatives) {
        const p = s.phase;
        const st = s.status;
        console.log(`  [${s.initiative}] phase: ${p.value} (${p.source}, ${p.confidence}) | status: ${st.value} (${st.source}, ${st.confidence})`);
      }
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });
}

module.exports = { generatePortfolio, makeEmptyState, EXCLUDE_DIRS };
