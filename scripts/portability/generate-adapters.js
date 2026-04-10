/**
 * generate-adapters.js — Story sp-5-2
 *
 * Generates per-platform adapter files for exported skills.
 * Each adapter wraps the canonical instructions.md with platform-specific
 * metadata/formatting. Thin adapter principle: adapters add packaging,
 * NOT content modifications.
 *
 * This is a module (no CLI entry point). Called from convoke-export.js's
 * runSingle() after writing instructions.md and README.md.
 */

'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Truncate description to first sentence (period + space) or 120 chars.
 * Same logic as catalog-generator.js's truncateDescription.
 */
function truncateDescription(desc) {
  if (!desc) return '';
  const periodIdx = desc.indexOf('. ');
  if (periodIdx > 0 && periodIdx < 120) {
    return desc.slice(0, periodIdx + 1);
  }
  if (desc.length <= 120) return desc;
  return desc.slice(0, 120) + '...';
}

/**
 * Generate all platform adapters for a single exported skill.
 *
 * @param {string} skillName - manifest skill name (e.g., 'bmad-brainstorming')
 * @param {object} skillRow - manifest row as keyed object (.name, .description, etc.)
 * @param {string} instructionsContent - the canonical instructions.md content
 * @param {string} skillOutputDir - path to the skill's export directory (e.g., <output>/bmad-brainstorming/)
 */
function generateAdapters(skillName, skillRow, instructionsContent, skillOutputDir) {
  const adaptersDir = path.join(skillOutputDir, 'adapters');

  // Claude Code adapter
  const claudeDir = path.join(adaptersDir, 'claude-code');
  fs.mkdirSync(claudeDir, { recursive: true });
  const description = truncateDescription(skillRow.description || '');
  // Escape single quotes in description for YAML safety
  const safeDesc = description.replace(/'/g, "''");
  const claudeContent = [
    '---',
    `name: ${skillName}`,
    `description: '${safeDesc}'`,
    '---',
    '',
    instructionsContent,
  ].join('\n');
  fs.writeFileSync(path.join(claudeDir, 'SKILL.md'), claudeContent);

  // GitHub Copilot adapter
  const copilotDir = path.join(adaptersDir, 'copilot');
  fs.mkdirSync(copilotDir, { recursive: true });
  const displayName = (skillRow.name || skillName)
    .replace(/^bmad-cis-agent-/, '')
    .replace(/^bmad-agent-/, '')
    .replace(/^bmad-cis-/, '')
    .replace(/^bmad-/, '')
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
  const copilotContent = `<!-- Skill: ${displayName} — append to .github/copilot-instructions.md -->\n${instructionsContent}`;
  fs.writeFileSync(path.join(copilotDir, 'copilot-instructions.md'), copilotContent);

  // Cursor adapter
  const cursorDir = path.join(adaptersDir, 'cursor');
  fs.mkdirSync(cursorDir, { recursive: true });
  fs.writeFileSync(path.join(cursorDir, `${skillName}.md`), instructionsContent);
}

module.exports = { generateAdapters };
