# Golden Fixtures — Team Factory

Files in this directory are **byte-exact expected outputs** captured from the
corresponding generators in `_bmad/bme/_team-factory/lib/`. They are read
verbatim by `tests/team-factory/*.test.js` and compared via `assert.equal()`,
so even whitespace, comments, and trailing newlines must match the generator
output exactly.

## Do NOT edit by hand

If you change a generator and a golden test starts failing, **do not edit the
golden file to satisfy lint or to "clean it up."** That breaks the byte-exact
contract — and was the root cause of the [tests/team-factory/registry-writer.test.js](../registry-writer.test.js)
regression discovered on 2026-04-08 (golden was hand-edited to add `_` prefix
to satisfy `no-unused-vars`, but the source generator still emitted bare names).

## Updating a golden

The intended workflow when a generator changes intentionally:

1. Confirm the generator output is what you want.
2. Re-capture the golden by logging the generator's actual output and writing
   it verbatim to the corresponding `.js` / `.yaml` / `.json` / `.csv` file.
3. Run the tests to confirm the byte-exact comparison passes.

## Why this directory is excluded from lint

`eslint.config.mjs` lists `tests/**/golden/` in its `ignores` array because
byte-exact fixtures must not be reformatted to satisfy lint rules. If a real
generator emits an unused variable, that's the generator's choice — the golden
must mirror it exactly, or the test stops being a faithful regression check.

## Files

| File | Generator |
|---|---|
| `golden-registry-block.js` | `buildModuleBlock()` in `registry-writer.js` |
| `golden-config.yaml` | `buildConfigYaml()` (or equivalent) |
| `golden-manifest.json` | manifest writer |
| `golden-help-csv.csv` | help-csv writer |
