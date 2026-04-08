/**
 * RFC-4180-aware CSV parser for skill-manifest.csv and friends.
 *
 * This is the manifest *parser* used by tests and the classification script.
 * It is intentionally separate from `scripts/lib/csv-utils.js` (Team Factory's
 * CSV writer utility) — different concerns, different consumers.
 *
 * Handles:
 * - Quoted fields containing commas
 * - Escaped quotes (`""` inside a quoted field → literal `"`)
 * - Unquoted fields
 * - Trailing CR (CRLF line endings)
 * - UTF-8 BOM stripping
 * - Whitespace-only line filtering
 *
 * Story: sp-1-1 (introduced parser inline in test), sp-1-2 (extracted to shared module).
 */

'use strict';

const fs = require('fs');

/**
 * Parse a single CSV row into an array of fields.
 *
 * Fields are trimmed of leading/trailing whitespace AFTER quote handling.
 * This protects idempotency: hand-edited CSVs commonly accumulate stray
 * spaces around values, and untrimmed comparisons would mark every such
 * row as a manual-override conflict on every classifier run.
 *
 * @param {string} line
 * @returns {string[]}
 */
function parseCsvRow(line) {
  // Strip trailing CR for CRLF tolerance
  if (line.endsWith('\r')) line = line.slice(0, -1);

  const fields = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      // RFC-4180: doubled quote inside a quoted field is a literal "
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current);
  // P2 (sp-1-2 review): trim whitespace from every field. Fields that were
  // originally quoted are unaffected by this since the quotes are already
  // stripped during parse and any internal padding is preserved unless it
  // was actually outside the quotes.
  return fields.map((f) => f.trim());
}

/**
 * Count the number of CSV columns in a row (RFC-4180-aware).
 *
 * @param {string} line
 * @returns {number}
 */
function countCsvColumns(line) {
  return parseCsvRow(line).length;
}

/**
 * Format a single field for CSV output. Quotes the field if it contains
 * a comma, double-quote, or newline. Escapes embedded quotes by doubling.
 *
 * @param {string} field
 * @returns {string}
 */
function formatCsvField(field) {
  if (field == null) return '';
  const s = String(field);
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

/**
 * Format an array of fields as a CSV row (no trailing newline).
 *
 * @param {string[]} fields
 * @returns {string}
 */
function formatCsvRow(fields) {
  return fields.map(formatCsvField).join(',');
}

/**
 * Read a CSV file from disk and return its parsed contents.
 * Strips UTF-8 BOM and ignores blank/whitespace-only lines.
 *
 * @param {string} filePath
 * @returns {{ header: string[], rows: string[][], rawLines: string[] }}
 *   - `header`: array of column names
 *   - `rows`: array of data rows (each an array of fields)
 *   - `rawLines`: original (post-BOM-strip, post-filter) line strings — useful
 *     when callers need to preserve exact whitespace/quoting on rows they
 *     don't intend to modify
 */
function readManifest(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Strip UTF-8 BOM if present
  if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);

  const rawLines = content.split('\n').filter((l) => /\S/.test(l));
  if (rawLines.length === 0) {
    return { header: [], rows: [], rawLines: [] };
  }
  const header = parseCsvRow(rawLines[0]);
  const rows = rawLines.slice(1).map(parseCsvRow);
  return { header, rows, rawLines };
}

/**
 * Write a manifest back to disk. Joins rows with `\n` and adds a trailing newline.
 *
 * @param {string} filePath
 * @param {string[]} header
 * @param {string[][]} rows
 */
function writeManifest(filePath, header, rows) {
  const lines = [formatCsvRow(header), ...rows.map(formatCsvRow)];
  fs.writeFileSync(filePath, lines.join('\n') + '\n', 'utf8');
}

module.exports = {
  parseCsvRow,
  countCsvColumns,
  formatCsvField,
  formatCsvRow,
  readManifest,
  writeManifest,
};
