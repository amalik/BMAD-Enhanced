'use strict';

const fs = require('fs');
const path = require('path');
const { compareVersions } = require('./utils');

const DEFAULT_CHANGELOG_PATH = path.join(__dirname, '..', '..', '..', 'CHANGELOG.md');

// Broad bracket-capture so pre-release headers ([1.0.4-alpha]) don't get skipped —
// a skipped header would leak its body into the preceding entry. Non-semver labels
// (Unreleased, TBD) are dropped later by SEMVER_RE. Date may use ASCII or en/em dash.
const HEADER_RE = /^##\s+\[([^\]]+)\](?:\s*[-–—]\s*(.+?))?\s*$/;
const SEMVER_RE = /^\d+\.\d+\.\d+(?:[-+][\w.-]+)?$/;
const FENCE_RE = /^(?:```|~~~)/;

/**
 * Parse a Keep-a-Changelog-formatted file and return entries for versions
 * strictly greater than `fromVersion` and less than or equal to `toVersion`.
 *
 * Returns entries newest-first. Unreleased sections, malformed headers, and
 * missing files are skipped silently — this is a decorative surface and must
 * never break the update flow.
 *
 * @param {string|null|undefined} fromVersion - Installed version (exclusive lower bound). Null treats all entries <= toVersion as new.
 * @param {string} toVersion - Target version (inclusive upper bound).
 * @param {string} [changelogPath] - Absolute path to CHANGELOG.md.
 * @returns {Array<{version: string, date: string|null, body: string}>}
 */
function readChangelogEntries(fromVersion, toVersion, changelogPath = DEFAULT_CHANGELOG_PATH) {
  if (!toVersion) return [];

  let raw;
  try {
    raw = fs.readFileSync(changelogPath, 'utf8');
  } catch {
    return [];
  }

  const entries = [];
  const lines = raw.split('\n');
  let current = null;
  let inFence = false;

  const flush = () => {
    if (!current) return;
    current.body = current.bodyLines.join('\n').replace(/\s+$/, '');
    delete current.bodyLines;
    entries.push(current);
    current = null;
  };

  for (const line of lines) {
    if (FENCE_RE.test(line)) {
      inFence = !inFence;
      if (current) current.bodyLines.push(line);
      continue;
    }
    if (!inFence) {
      const match = HEADER_RE.exec(line);
      if (match) {
        flush();
        current = {
          version: match[1].trim(),
          date: match[2] ? match[2].trim() : null,
          bodyLines: [],
        };
        continue;
      }
    }
    if (current) {
      if (!inFence && /^---\s*$/.test(line)) continue;
      current.bodyLines.push(line);
    }
  }
  flush();

  return entries
    .filter((e) => {
      if (!SEMVER_RE.test(e.version)) return false;
      const aboveFloor = fromVersion ? compareVersions(e.version, fromVersion) > 0 : true;
      const atOrBelowCeiling = compareVersions(e.version, toVersion) <= 0;
      return aboveFloor && atOrBelowCeiling;
    })
    .sort((a, b) => compareVersions(b.version, a.version));
}

module.exports = {
  readChangelogEntries,
  DEFAULT_CHANGELOG_PATH,
};
