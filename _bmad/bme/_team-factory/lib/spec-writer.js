'use strict';

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');

/** @typedef {import('./types/factory-types').TeamSpec} TeamSpec */

/**
 * Write a team spec to a YAML file with atomic write safety.
 * Protocol: write to .tmp → validate parse → rename to target.
 *
 * @param {TeamSpec} spec - The team spec object to write
 * @param {string} targetPath - Absolute path to the output YAML file
 * @returns {Promise<{ success: boolean, errors: string[] }>}
 */
async function writeSpec(spec, targetPath) {
  if (!spec || typeof spec !== 'object') {
    return { success: false, errors: ['spec must be a non-null object'] };
  }
  if (!targetPath || !path.isAbsolute(targetPath)) {
    return { success: false, errors: ['targetPath must be an absolute path'] };
  }

  // Serialize to YAML
  let yamlContent;
  try {
    yamlContent = yaml.dump(spec, {
      indent: 2,
      lineWidth: 120,
      noRefs: true,
      sortKeys: false,
      quotingType: '"',
    });
  } catch (err) {
    return { success: false, errors: [`YAML serialization failed: ${err.message}`] };
  }

  // Atomic write: .tmp → validate → rename
  const tmpPath = targetPath + '.tmp';

  try {
    await fs.ensureDir(path.dirname(targetPath));
    await fs.writeFile(tmpPath, yamlContent, 'utf8');
  } catch (err) {
    return { success: false, errors: [`Failed to write temp file: ${err.message}`] };
  }

  // Validate: re-read and parse to confirm round-trip integrity
  try {
    const reRead = await fs.readFile(tmpPath, 'utf8');
    const parsed = yaml.load(reRead);
    if (!parsed || typeof parsed !== 'object') {
      await fs.remove(tmpPath);
      return { success: false, errors: ['Round-trip validation failed: parsed result is empty or not an object'] };
    }
    // Verify key fields survived serialization
    if (parsed.team_name_kebab !== spec.team_name_kebab) {
      await fs.remove(tmpPath);
      return { success: false, errors: [`Round-trip validation failed: team_name_kebab mismatch ("${parsed.team_name_kebab}" vs "${spec.team_name_kebab}")`] };
    }
  } catch (err) {
    await fs.remove(tmpPath).catch(() => {});
    return { success: false, errors: [`Round-trip validation failed: ${err.message}`] };
  }

  // Rename .tmp → target
  try {
    await fs.rename(tmpPath, targetPath);
  } catch (err) {
    await fs.remove(tmpPath).catch(() => {});
    return { success: false, errors: [`Failed to rename temp file to target: ${err.message}`] };
  }

  return { success: true, errors: [] };
}

/**
 * Update specific fields in an existing spec file.
 * Loads current spec, merges updates, writes back atomically.
 *
 * @param {string} specPath - Absolute path to existing spec file
 * @param {Object} updates - Fields to update (shallow merge at top level, deep merge for nested objects)
 * @returns {Promise<{ success: boolean, errors: string[] }>}
 */
async function updateSpec(specPath, updates) {
  let raw;
  try {
    raw = await fs.readFile(specPath, 'utf8');
  } catch (err) {
    return { success: false, errors: [`Cannot read spec file: ${err.message}`] };
  }

  let current;
  try {
    current = yaml.load(raw);
  } catch (err) {
    return { success: false, errors: [`Invalid YAML in existing spec: ${err.message}`] };
  }

  // Shallow merge with deep merge for known nested objects
  const merged = { ...current };
  for (const [key, value] of Object.entries(updates)) {
    if (key === 'progress' && typeof value === 'object' && typeof merged.progress === 'object') {
      merged.progress = { ...merged.progress, ...value };
    } else if (key === 'integration' && typeof value === 'object' && typeof merged.integration === 'object') {
      merged.integration = { ...merged.integration, ...value };
    } else if (key === 'metrics' && typeof value === 'object' && typeof merged.metrics === 'object') {
      merged.metrics = { ...merged.metrics, ...value };
    } else {
      merged[key] = value;
    }
  }

  return writeSpec(merged, specPath);
}

module.exports = {
  writeSpec,
  updateSpec,
};
