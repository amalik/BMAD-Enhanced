'use strict';

/**
 * RFC 4180-aware CSV row parser for team factory validation.
 * Handles quoted fields containing commas and escaped quotes ("").
 */

/**
 * Parse a single CSV row into an array of field values.
 * Handles double-quoted fields per RFC 4180:
 * - Fields containing commas, quotes, or newlines are enclosed in double quotes
 * - Double quotes inside quoted fields are escaped as ""
 *
 * @param {string} line - A single CSV row string
 * @returns {string[]} Array of field values
 */
function parseCsvRow(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const ch = line[i];

    if (inQuotes) {
      if (ch === '"') {
        // Check for escaped quote ""
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i += 2;
        } else {
          // End of quoted field
          inQuotes = false;
          i++;
        }
      } else {
        current += ch;
        i++;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
      } else if (ch === ',') {
        fields.push(current);
        current = '';
        i++;
      } else {
        current += ch;
        i++;
      }
    }
  }

  // Push the last field
  fields.push(current);

  return fields;
}

module.exports = { parseCsvRow };
