/**
 * Markdown formatter — standard markdown table output with confidence markers.
 *
 * @module markdown-formatter
 */

/**
 * Format InitiativeState array as markdown table.
 *
 * @param {import('../../types').InitiativeState[]} initiatives
 * @returns {string}
 */
function formatMarkdown(initiatives) {
  if (initiatives.length === 0) {
    return 'No initiatives found.\n';
  }

  const lines = [];
  lines.push('| Initiative | Phase | Status | Next Action / Context |');
  lines.push('|------------|-------|--------|----------------------|');

  for (const s of initiatives) {
    const phase = s.phase.value || 'unknown';
    const statusVal = s.status.value || 'unknown';
    const conf = s.status.confidence === 'explicit' ? '(explicit)' : '(inferred)';
    const status = `${statusVal} ${conf}`;

    const context = s.nextAction.value
      ? s.nextAction.value
      : s.lastArtifact.file
        ? `Last: ${s.lastArtifact.file} (${s.lastArtifact.date || '?'})`
        : 'No artifacts';

    lines.push(`| ${s.initiative} | ${phase} | ${status} | ${context} |`);
  }

  return lines.join('\n') + '\n';
}

module.exports = { formatMarkdown };
