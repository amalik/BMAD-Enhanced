'use strict';

/**
 * tests/mock-cp.js
 *
 * Helper for mocking child_process.execFileSync in node:test suites.
 *
 * Why this exists
 * ---------------
 * Several test files in tests/lib/ exercise code paths that shell out to git
 * (rename, commit, reset --hard, log). They need to mock child_process.execFileSync
 * deterministically without ever invoking real git. The previous Jest-API
 * implementations of those tests used jest.spyOn + jest.resetModules; this
 * helper provides the equivalent surface on top of node:test/mock so the
 * conversion (Story B) is mechanical instead of bespoke per file.
 *
 * The single non-obvious thing the helper handles for you is the module cache
 * reset. The target module (e.g. scripts/lib/artifact-utils) captures
 * `require('child_process')` at load time. If you spy on cp.execFileSync after
 * the target module is already cached, the spy is invisible to the cached
 * copy. The helper unloads the target module before installing the spy, then
 * re-requires it so the fresh load sees the spied function.
 *
 * Public API
 * ----------
 * const mock = mockExecFileSync('../../scripts/lib/artifact-utils');
 *
 * mock.setImpl(fn)             // (cmd, args, opts) => returnValue | throw
 * mock.setReturnValue(value)   // shorthand for setImpl(() => value)
 * mock.module                  // fresh re-required target module (use this!)
 * mock.calls()                 // array of [cmd, args, opts] for every call
 * mock.callsMatching(pred)     // calls where pred(args) is truthy
 * mock.callCount()             // total call count
 * mock.restore()               // tear down — call from afterEach
 *
 * Typical usage in a converted test
 * ---------------------------------
 *   const { describe, it, beforeEach, afterEach } = require('node:test');
 *   const assert = require('node:assert/strict');
 *   const { mockExecFileSync } = require('../mock-cp');
 *
 *   describe('executeRenames', () => {
 *     let mock;
 *     beforeEach(() => {
 *       mock = mockExecFileSync('../../scripts/lib/artifact-utils');
 *     });
 *     afterEach(() => {
 *       mock.restore();
 *     });
 *
 *     it('returns count + sha when all renames succeed', () => {
 *       mock.setImpl((_cmd, args) => args[0] === 'rev-parse' ? 'abc123\n' : '');
 *       const { executeRenames } = mock.module;
 *       const result = executeRenames(makeManifest(...), '/fake/root');
 *       assert.equal(result.renamedCount, 2);
 *       assert.equal(result.commitSha, 'abc123');
 *     });
 *   });
 *
 * Scope: this helper is intentionally small. If a test needs to mock something
 * other than execFileSync, mock it directly with node:test/mock — don't extend
 * this file with one-off branches. If a second mock target shows up in 3+
 * places, factor it into a sibling helper (e.g. tests/mock-fs.js).
 */

const cp = require('node:child_process');
const path = require('path');
const { mock } = require('node:test');

/**
 * Create a managed execFileSync mock bound to a specific target module.
 *
 * @param {string} targetModulePath - Path to the module under test, relative
 *   to the calling test file's directory (same convention as require()).
 * @returns {{
 *   setImpl: (fn: (...args: any[]) => any) => void,
 *   setReturnValue: (value: any) => void,
 *   module: any,
 *   calls: () => Array<[string, string[], object | undefined]>,
 *   callsMatching: (predicate: (args: string[]) => boolean) =>
 *     Array<[string, string[], object | undefined]>,
 *   callCount: () => number,
 *   restore: () => void,
 * }}
 */
function mockExecFileSync(targetModulePath) {
  // Resolve the target module path against the *caller's* directory, not this
  // helper's directory. We use require.resolve from the caller's perspective
  // by walking back up via require's lookup. Simplest reliable approach:
  // accept that callers pass paths relative to tests/<subdir>/<file>.test.js
  // by including the relative prefix (e.g. '../../scripts/lib/foo'), then
  // resolve from this file's location upward.
  //
  // tests/mock-cp.js sits at tests/, so '../scripts/lib/foo' from a caller in
  // tests/lib/<file>.test.js becomes 'scripts/lib/foo' from project root. The
  // simplest robust approach: resolve from PACKAGE_ROOT (one level above this
  // file) using the path the caller provided, after stripping leading '../'.
  //
  // We avoid that fragility by requiring callers to use a path that resolves
  // correctly via require.resolve from THIS file. Concretely: callers in
  // tests/lib/ should pass '../../scripts/lib/foo' which resolves the same
  // way from tests/mock-cp.js as it would from tests/lib/anything.
  //
  // This works because tests/mock-cp.js and tests/lib/* are siblings under
  // tests/, so '../../<x>' from either file points to the same '<x>'.
  const resolved = require.resolve(targetModulePath, {
    paths: [path.join(__dirname, 'lib')],
  });

  // Step 1: drop any cached copy so the next require() re-evaluates the
  // target module against our (about-to-be-installed) spy.
  delete require.cache[resolved];

  // Step 2: install the spy on cp.execFileSync. Default impl returns '' so
  // calls without an explicit setImpl don't crash. Tests almost always call
  // setImpl/setReturnValue immediately, but the default keeps unset paths
  // safe rather than throwing TypeError.
  let currentImpl = () => '';
  mock.method(cp, 'execFileSync', (...args) => currentImpl(...args));

  // Step 3: load the target module fresh — it will capture the spied
  // execFileSync at require-time.
  const targetModule = require(resolved);

  // The MockFunctionContext for our spy is exposed via cp.execFileSync.mock
  // because mock.method replaces the property in place.
  const spy = cp.execFileSync;

  return {
    setImpl(fn) {
      currentImpl = fn;
    },

    setReturnValue(value) {
      currentImpl = () => value;
    },

    get module() {
      return targetModule;
    },

    calls() {
      // node:test mock.calls() returns array of { arguments, result, ... }
      // entries; we project to [cmd, args, opts] tuples to match the shape
      // the legacy tests expected from jest.mock.calls.
      return spy.mock.calls.map((call) => call.arguments);
    },

    callsMatching(predicate) {
      return this.calls().filter((tuple) => {
        const args = tuple[1];
        return Array.isArray(args) && predicate(args);
      });
    },

    callCount() {
      return spy.mock.callCount();
    },

    restore() {
      // node:test mock.restoreAll() reverts all installed mocks. Since this
      // helper installs exactly one spy per call, restoreAll is the right
      // tool. Callers using multiple helpers in one test should still be
      // safe because mock.restoreAll restores ALL mocks installed via
      // node:test/mock — that's the semantic we want for cleanup.
      mock.restoreAll();
      // Drop the cached target module so the next test that calls
      // mockExecFileSync re-loads it against a fresh spy. Without this, a
      // second beforeEach would re-spy cp but the cached target module
      // would still hold a reference to the *previous* spy (which has been
      // restored), leading to confusing "spy not called" failures.
      delete require.cache[resolved];
    },
  };
}

module.exports = {
  mockExecFileSync,
};
