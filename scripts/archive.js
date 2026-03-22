#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { findProjectRoot } = require('./update/lib/utils');

// --- Category registry from ADR ---
const VALID_CATEGORIES = [
  'prd', 'epic', 'arch', 'adr', 'brief', 'report', 'spec', 'vision',
  'hc', 'persona', 'experiment', 'learning', 'sprint', 'decision',
  'research'
];

const NAMING_PATTERN = /^[a-z][a-z0-9-]*\.(?:md|yaml)$/;

// Living documents that are exempt from the category prefix requirement
const EXEMPT_FILES = [
  'architecture.md', 'architecture-gyre.md',
  'prd.md', 'initiatives-backlog.md'
];

function isValidCategory(cat) {
  // Strip trailing digits for numbered categories (hc2 → hc, hc10 → hc)
  const base = cat.replace(/\d+$/, '');
  return VALID_CATEGORIES.includes(base) || VALID_CATEGORIES.includes(cat);
}
const DATED_PATTERN = /^(.+)-(\d{4}-\d{2}-\d{2})\.(md|yaml)$/;
const CATEGORIZED_PATTERN = /^([a-z]+\d*)-(.+)\.(md|yaml)$/;

// Directories to scan (relative to _bmad-output/)
const SCAN_DIRS = ['planning-artifacts', 'vortex-artifacts', 'implementation-artifacts'];

// --- Helpers ---

function parseFilename(filename) {
  const dated = filename.match(DATED_PATTERN);
  const categorized = filename.match(CATEGORIZED_PATTERN);

  return {
    filename,
    isDated: !!dated,
    date: dated ? dated[2] : null,
    baseName: dated ? dated[1] : filename.replace(/\.(md|yaml)$/, ''),
    category: categorized ? categorized[1] : null,
    hasValidCategory: categorized ? isValidCategory(categorized[1]) : false,
    matchesConvention: NAMING_PATTERN.test(filename) && categorized && isValidCategory(categorized[1])
  };
}

function groupByKey(files) {
  const groups = {};
  for (const f of files) {
    if (!f.isDated) continue;
    // Key = everything before the date
    const key = f.baseName;
    if (!groups[key]) groups[key] = [];
    groups[key].push(f);
  }
  return groups;
}

function appendToIndex(indexPath, entries) {
  const date = new Date().toISOString().split('T')[0];
  let content = '';

  if (!fs.existsSync(indexPath)) {
    content = '# Archive Index\n\n_Traceability log for archived artifacts. Append-only._\n\n';
  }

  content += `\n## Automated archive — ${date}\n\n`;
  content += '| File | Original Location | Archive Date | Reason |\n';
  content += '|------|-------------------|--------------|--------|\n';

  for (const entry of entries) {
    content += `| ${entry.filename} | ${entry.originalDir}/ | ${date} | ${entry.reason} |\n`;
  }

  fs.appendFileSync(indexPath, content);
}

// --- Main ---

async function run() {
  const args = process.argv.slice(2);
  const apply = args.includes('--apply');
  const rename = args.includes('--rename');
  const help = args.includes('--help') || args.includes('-h');

  if (help) {
    console.log(`
Usage: node scripts/archive.js [options]

Options:
  --apply    Execute archive moves (default: dry-run)
  --rename   Apply naming convention renames to active files
  --help     Show this help

Dry-run by default — shows what would happen without changing anything.
`);
    return;
  }

  const projectRoot = findProjectRoot();
  if (!projectRoot) {
    console.error('Error: Could not find project root (_bmad/ directory not found).');
    process.exit(1);
  }

  const outputDir = path.join(projectRoot, '_bmad-output');
  const archiveDir = path.join(outputDir, '_archive');
  const indexPath = path.join(archiveDir, 'INDEX.md');

  const actions = { archive: [], rename: [], warnings: [] };

  // 1. Scan for superseded dated files
  for (const dir of SCAN_DIRS) {
    const fullDir = path.join(outputDir, dir);
    if (!fs.existsSync(fullDir)) continue;

    const files = (await fs.readdir(fullDir))
      .filter(f => !f.startsWith('.'))
      .map(f => ({ ...parseFilename(f), dir }));

    // Find superseded versions
    const groups = groupByKey(files);
    for (const [, group] of Object.entries(groups)) {
      if (group.length <= 1) continue;

      // Sort by date descending — keep newest
      group.sort((a, b) => b.date.localeCompare(a.date));
      const [newest, ...older] = group;

      for (const old of older) {
        actions.archive.push({
          filename: old.filename,
          originalDir: dir,
          from: path.join(fullDir, old.filename),
          to: path.join(archiveDir, 'superseded', old.filename),
          reason: `Superseded by ${newest.filename}`
        });
      }
    }

    // 2. Flag naming convention violations
    if (rename) {
      for (const f of files) {
        if (f.matchesConvention) continue;
        if (EXEMPT_FILES.includes(f.filename)) continue;

        const issues = [];
        if (!NAMING_PATTERN.test(f.filename)) {
          issues.push('not lowercase kebab-case');
        }
        if (!f.hasValidCategory) {
          issues.push(`no valid category prefix (has: ${f.category || 'none'})`);
        }

        if (issues.length > 0) {
          actions.warnings.push({
            filename: f.filename,
            dir,
            issues
          });
        }
      }
    }
  }

  // --- Report ---

  const mode = apply ? 'APPLY' : 'DRY-RUN';
  console.log(`\n=== Convoke Archive (${mode}) ===\n`);

  if (actions.archive.length === 0 && actions.warnings.length === 0) {
    console.log('Everything looks clean. No actions needed.');
    return;
  }

  // Superseded files
  if (actions.archive.length > 0) {
    console.log(`📦 Superseded files to archive: ${actions.archive.length}\n`);
    for (const a of actions.archive) {
      console.log(`  ${a.originalDir}/${a.filename}`);
      console.log(`    → _archive/superseded/${a.filename}`);
      console.log(`    Reason: ${a.reason}\n`);
    }
  }

  // Convention warnings
  if (actions.warnings.length > 0) {
    console.log(`⚠️  Naming convention violations: ${actions.warnings.length}\n`);
    for (const w of actions.warnings) {
      console.log(`  ${w.dir}/${w.filename}`);
      console.log(`    Issues: ${w.issues.join(', ')}\n`);
    }
  }

  // Execute if --apply
  if (apply && actions.archive.length > 0) {
    console.log('Executing archive moves...\n');

    // Ensure superseded dir exists
    await fs.ensureDir(path.join(archiveDir, 'superseded'));

    const indexEntries = [];

    for (const a of actions.archive) {
      await fs.move(a.from, a.to, { overwrite: false });
      indexEntries.push(a);
      console.log(`  ✅ Archived: ${a.filename}`);
    }

    // Update INDEX.md
    appendToIndex(indexPath, indexEntries);
    console.log(`\n📋 Updated _archive/INDEX.md with ${indexEntries.length} entries.`);
  }

  // Summary
  console.log('\n--- Summary ---');
  console.log(`  Superseded files: ${actions.archive.length}`);
  console.log(`  Convention violations: ${actions.warnings.length}`);
  if (!apply && actions.archive.length > 0) {
    console.log('\n  Run with --apply to execute archive moves.');
  }
  console.log('');
}

run().catch(err => {
  console.error('Archive error:', err.message);
  process.exit(1);
});
