'use strict';

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');

/** @typedef {import('../types/factory-types').CreatorResult} CreatorResult */

/**
 * Append a new agent ID to an existing team's config.yaml.
 * Enhanced Simple safety: read → validate → write (.tmp) → verify parse → rename.
 *
 * @param {string} newAgentId - Agent ID to add (e.g., "gamma-guardian")
 * @param {string} configPath - Absolute path to existing config.yaml
 * @returns {Promise<CreatorResult>}
 */
async function appendConfigAgent(newAgentId, configPath) {
  if (!newAgentId || !newAgentId.trim()) {
    return { success: false, filePath: configPath, errors: ['newAgentId is required'] };
  }

  // --- Read existing config ---
  if (!await fs.pathExists(configPath)) {
    return { success: false, filePath: configPath, errors: ['config.yaml does not exist at target path'] };
  }

  let content;
  try {
    content = await fs.readFile(configPath, 'utf8');
  } catch (err) {
    return { success: false, filePath: configPath, errors: [`Cannot read config: ${err.message}`] };
  }

  // --- Parse and validate ---
  let config;
  try {
    config = yaml.load(content);
  } catch (err) {
    return { success: false, filePath: configPath, errors: [`Cannot parse config YAML: ${err.message}`] };
  }

  if (!config || !Array.isArray(config.agents)) {
    return { success: false, filePath: configPath, errors: ['config.yaml missing agents array'] };
  }

  // --- Duplicate check (additive-only) ---
  if (config.agents.includes(newAgentId)) {
    return { success: true, filePath: configPath, errors: [], skipped: 'agent already in config' };
  }

  // --- Append ---
  config.agents.push(newAgentId);

  // --- Atomic write (.tmp → validate → rename) ---
  const tmpPath = configPath + '.tmp';
  try {
    const newContent = yaml.dump(config, { indent: 2, lineWidth: -1, noRefs: true });
    await fs.writeFile(tmpPath, newContent, 'utf8');

    // Verify parse of tmp file
    const readBack = yaml.load(await fs.readFile(tmpPath, 'utf8'));
    if (!readBack || !Array.isArray(readBack.agents) || !readBack.agents.includes(newAgentId)) {
      await fs.remove(tmpPath);
      return { success: false, filePath: configPath, errors: ['Post-write verification failed: new agent not found in parsed output'] };
    }

    // Rename tmp → target
    await fs.rename(tmpPath, configPath);
  } catch (err) {
    await fs.remove(tmpPath).catch(() => {});
    return { success: false, filePath: configPath, errors: [`Write failed: ${err.message}`] };
  }

  return { success: true, filePath: configPath, errors: [] };
}

module.exports = { appendConfigAgent };
