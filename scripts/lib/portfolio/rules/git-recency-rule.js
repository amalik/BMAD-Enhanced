/**
 * Rule 3: Infer status from git recency (stale detection).
 *
 * Checks the most recent git commit date for the initiative's artifacts.
 * If within stale_days → ongoing. If beyond → stale.
 *
 * Known limitation: checks current branch only.
 *
 * @param {import('../../types').InitiativeState} state - Current initiative state
 * @param {Array<{filename: string, dir: string, fullPath: string}>} artifacts - Artifacts for this initiative
 * @param {Object} options
 * @param {number} [options.staleDays=30] - Days threshold for stale detection
 * @param {string} options.projectRoot - Absolute path to project root
 * @returns {import('../../types').InitiativeState} Enriched state
 */

const { execFileSync } = require('child_process');
const path = require('path');

function applyGitRecencyRule(state, artifacts, options = {}) {
  // Don't override explicit frontmatter status
  if (state.status.confidence === 'explicit') return state;

  const { staleDays = 30, projectRoot } = options;
  if (!projectRoot || artifacts.length === 0) return state;

  // Find most recent git activity across all artifacts for this initiative
  let latestDate = null;
  let latestFile = null;

  for (const artifact of artifacts) {
    try {
      const relativePath = path.relative(projectRoot, artifact.fullPath);
      const dateStr = execFileSync(
        'git', ['log', '-1', '--format=%as', '--', relativePath],
        { cwd: projectRoot, encoding: 'utf8', stdio: 'pipe' }
      ).trim();

      if (dateStr && (!latestDate || dateStr > latestDate)) {
        latestDate = dateStr;
        latestFile = artifact.filename;
      }
    } catch {
      // File not tracked or git unavailable — skip
    }
  }

  if (!latestDate) return state;

  // Update lastArtifact if git date is more recent than artifact-chain's date
  if (!state.lastArtifact.file || latestDate > (state.lastArtifact.date || '')) {
    state.lastArtifact = { file: latestFile, date: latestDate };
  }

  // Calculate days since last activity
  const lastActivity = new Date(latestDate);
  const now = new Date();
  const daysSince = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24));

  if (daysSince <= staleDays) {
    state.status = { value: 'ongoing', source: 'git-recency', confidence: 'inferred' };
  } else {
    state.status = { value: 'stale', source: 'git-recency', confidence: 'inferred' };
  }

  return state;
}

module.exports = { applyGitRecencyRule };
