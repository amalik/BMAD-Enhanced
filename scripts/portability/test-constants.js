/**
 * test-constants.js — Shared constants for portability tests and scripts.
 *
 * Single source of truth for the forbidden-string list used across the
 * portability suite. Import this instead of duplicating the list.
 *
 * History: flagged in Epic 2 retro A4, Epic 3 retro A1, Epic 4 retro A1
 * as the #1 test-reliability debt item. Extracted here to close that debt.
 */

'use strict';

/**
 * Strings that must NEVER appear in exported instructions.md files.
 * These are Claude-specific tool names, framework calls, config paths,
 * and micro-file directives that the export engine should have stripped.
 */
const FORBIDDEN_STRINGS = [
  // Claude tool names
  'Read tool',
  'Edit tool',
  'Write tool',
  'Bash tool',
  'Glob tool',
  'Grep tool',
  'Skill tool',
  // Framework calls
  'bmad-init',
  'bmad-help',
  'bmad-speak',
  // Framework paths
  '_bmad/',
  '.claude/hooks',
  '{project-root}',
  // Micro-file directives
  'Load step:',
  'read fully and follow',
  'Read fully and execute:',
  'Load fully and follow:',
];

module.exports = { FORBIDDEN_STRINGS };
