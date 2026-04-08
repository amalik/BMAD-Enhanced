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
 * const mock = mockExecFileSync('../../scripts/lib/artifact-utils', __dirname);
 *
 * mock.setImpl(fn)             // (cmd, args, opts) => returnValue | throw
 * mock.setReturnValue(value)   // shorthand for setImpl(() => value)
 * mock.module                  // fresh re-required target module (use this!)
 * mock.calls()                 // array of [cmd, args, opts] for every call
 * mock.callsMatching(pred)     // calls where pred(args) is truthy
 * mock.callCount()             // total call count
 * mock.restore()               // tear down — call from afterEach
 *
 * The second argument (__dirname) is required so the helper can resolve
 * relative module paths from your test file's location, not from this file.
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
 *       mock = mockExecFileSync('../../scripts/lib/artifact-utils', __dirname);
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
const { mock } = require('node:test');

/**
 * Create a managed execFileSync mock bound to a specific target module.
 *
 * @param {string} targetModulePath - Path to the module under test. Either an
 *   absolute path, OR a relative path interpreted from `callerDirname`. Use
 *   the same relative path you'd use in a `require()` call from the test file.
 * @param {string} callerDirname - The calling test file's `__dirname`. Required
 *   so that the helper can resolve relative paths from the caller's location,
 *   not from `tests/mock-cp.js`. Pass `__dirname` from your test file.
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
function mockExecFileSync(targetModulePath, callerDirname) {
  if (typeof callerDirname !== 'string') {
    throw new TypeError(
      'mockExecFileSync requires callerDirname (pass __dirname from your test file)',
    );
  }

  // Resolve the target module path from the caller's directory. This makes
  // mockExecFileSync('../../scripts/lib/foo', __dirname) work the same way
  // as require('../../scripts/lib/foo') from the caller — independent of
  // where mock-cp.js itself lives. Without this explicit caller location,
  // any caller outside tests/lib/ would silently fail to resolve.
  const resolved = require.resolve(targetModulePath, {
    paths: [callerDirname],
  });

  // Step 1: drop any cached copy so the next require() re-evaluates the
  // target module against our (about-to-be-installed) spy.
  delete require.cache[resolved];

  // Step 2: install the spy on cp.execFileSync. Default impl returns '' so
  // calls without an explicit setImpl don't crash. Tests almost always call
  // setImpl/setReturnValue immediately, but the default keeps unset paths
  // safe rather than throwing TypeError. Capture the spy reference returned
  // by mock.method so we can restore ONLY this spy in restore() — using
  // mock.restoreAll() would destroy any sibling spies the test installed
  // (e.g. a console.warn spy alongside the cp spy).
  let currentImpl = () => '';
  const spy = mock.method(cp, 'execFileSync', (...args) => currentImpl(...args));

  // Step 3: load the target module fresh — it will capture the spied
  // execFileSync at require-time.
  const targetModule = require(resolved);

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
      // node:test mock.calls is an array of { arguments, result, ... }
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
      // Restore ONLY this spy, not all mocks installed in the test. Using
      // mock.restoreAll() here would destroy sibling spies the test set up
      // (e.g. console.warn) and produce confusing "spy not called" failures
      // in unrelated assertions.
      spy.mock.restore();
      // Drop the cached target module so the next test that calls
      // mockExecFileSync re-loads it against a fresh spy. Without this, a
      // second beforeEach would re-spy cp but the cached target module
      // would still hold a reference to the *previous* (now-restored) spy.
      delete require.cache[resolved];
    },
  };
}

module.exports = {
  mockExecFileSync,
};
