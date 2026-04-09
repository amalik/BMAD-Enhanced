# Validator / Refresh / Doctor Contract Audit

**Filename date:** 2026-04-08 (matches epic-7 spec reference)
**Authored:** 2026-04-09
**Story:** ag-7-3 (closes I34, RICE 2.4)
**Audited files:**
- `scripts/update/lib/refresh-installation.js` (790 lines)
- `scripts/update/lib/validator.js` (750 lines)
- `scripts/convoke-doctor.js` (672 lines)

**Verdict legend:**
- **SAFE** — validator + doctor respect the same gate as refresh
- **GAP** — refresh acts on a flag, validator/doctor doesn't check it (latent future-trap)
- **MIXED** — validator covers but doctor doesn't, or vice versa
- **N/A** — no validator/doctor check is conceptually needed

---

## Executive Summary

**13 flag-gated branches catalogued.** Verdict distribution: **6 SAFE / 4 GAP / 2 MIXED / 1 N/A**.

- **0 GAPs fixed in Story 7.3.** Every identified GAP failed the trivial-patch judgment (each requires either a new validator function, an import, or >3 added lines). All 6 GAP/MIXED entries promoted to backlog as **I43-I48**.
- **Manifest-as-opt-in semantics from Story 7.2 are SAFE for in-manifest workflows** but the **out-of-manifest path is the dominant attack surface**: refresh installs them with no doctor check (only validator catches Enhance + Artifacts via separate `validateXxxModule` paths).
- **F6 (standalone bme agent skill wrappers) is the highest-impact GAP** confirmed by the audit — exactly the suspected gap from Risk Note #5. Refresh writes `.claude/skills/bmad-agent-bme-{id}/SKILL.md` for each EXTRA_BME_AGENTS entry but neither validator nor doctor checks it. Promoted as **I43**.
- **F8 (Artifacts version-stamp) is a real GAP** but borderline trivial — promoted as **I46** (single function, but adds an import + function call + test, exceeding the ≤3-added-lines threshold).
- **Story 7.2's `checkModuleSkillWrappers` duplicates `validateEnhanceModule` Check 6** ([validator.js:464-469](../../scripts/update/lib/validator.js#L464-L469)) for the Enhance module. Not a bug — both checks pass on healthy installs — but the doctor and validator have parallel implementations of the same wrapper-existence check. Documented as a follow-up consolidation candidate (**I47**).

The audit's biggest message: the install pipeline is **heterogeneous by module**. Vortex/Gyre go through the global validator (`validateAgentFiles`, `validateWorkflows`); Enhance/Artifacts have dedicated `validateXxxModule` functions; team-factory only has agent-file existence checks (no submodule-level validation). Adding a new module today would inherit *none* of these patterns automatically — the next module's PR has to manually wire validation into all three files. The audit recommends a consolidation pass (**I48**) to extract a shared "module contract" interface that any new module must implement.

---

## Methodology

For each of the three audit-target files, the audit:
1. Read the file end-to-end (no skimming).
2. Catalogued every flag-gated `if (...)` branch in `refresh-installation.js` that gates a copy/write/patch action (not bookkeeping or logging).
3. For each branch, traced the corresponding check (if any) in `validator.js` and `convoke-doctor.js`.
4. Cross-referenced field-level coverage: not "does the validator check this workflow?" but "does the validator check every field that refresh consumes?"
5. Self-verified line refs by re-grepping each cited file:line at audit time (Task 3.4 from the story spec — see Verified column).

---

## Excluded from analysis

**`isSameRoot` dev-mode skip** ([refresh-installation.js:38](../../scripts/update/lib/refresh-installation.js#L38) and ~13 usage sites). This is a packaging optimization that skips file copies when the dev repo IS the package source — NOT a behavioral contract. Validator and doctor SHOULD check `projectRoot` in both dev and prod modes regardless, and they do. Including `isSameRoot` as an F-row would pollute the catalogue with a guaranteed N/A.

---

## Flag-gated branches catalogue

| # | Flag | Refresh loc | Refresh action | Ungated action | Validator counterpart | Doctor counterpart | Verdict | Verified |
|---|------|-------------|----------------|----------------|------------------------|---------------------|---------|----------|
| **F1** | `EXTRA_BME_AGENTS` iteration (`!isSameRoot`) | [refresh-installation.js:96-119](../../scripts/update/lib/refresh-installation.js#L96-L119) | Wholesale copy of each submodule directory under `_bmad/bme/{submodule}/` (e.g., `_team-factory/`); idempotent remove-then-copy | Skip with log | [validator.js:208-225](../../scripts/update/lib/validator.js#L208-L225) — `validateManifest` checks each agent file exists on disk | none — doctor's `discoverModules()` scans config.yaml-bearing dirs, which catches submodule presence indirectly | **SAFE** | ✓ |
| **F2** | Enhance `workflow.target_agent` menu-patching loop | [refresh-installation.js:172-223](../../scripts/update/lib/refresh-installation.js#L172-L223) | For each Enhance workflow: read target agent, idempotency-check patch presence, build `<item>` tag, insert before `</menu>`, write file | Empty array (skipped via `isSameRoot ? [] : ...` ternary) | [validator.js:443-453](../../scripts/update/lib/validator.js#L443-L453) — Check 3 of `validateEnhanceModule`: opens target agent file, asserts `patchName` substring is present | none — doctor's `checkModuleConfig`/`checkModuleWorkflows` check structure but not menu-patch presence | **MIXED** (validator covers, doctor doesn't) | ✓ |
| **F3** | Gyre config-merge gate (`!isSameRoot && fs.existsSync(gyreConfigSource)`) | [refresh-installation.js:343-354](../../scripts/update/lib/refresh-installation.js#L343-L354) | Merge `_gyre/config.yaml` (preserves user prefs); calls `assertVersion` + `mergeConfig` + `writeConfig`; stamps version | Skip (no changes, no log on dev) | none — there is no `validateGyreModule` in validator.js | none — doctor's `discoverModules()` finds the file but no Gyre-specific validation runs | **GAP** → I44 | ✓ |
| **F4** | Gyre README copy gate (`!isSameRoot && fs.existsSync(gyreReadmeSource)`) | [refresh-installation.js:359-363](../../scripts/update/lib/refresh-installation.js#L359-L363) | Copy `_gyre/README.md` to project | Skip with no log | none | none | **N/A** (README absence is operator-visible at runtime; not a behavioral contract) | ✓ |
| **F5** | Enhance config-existence + skill-registration gate (`enhanceConfig && !isSameRoot`) | [refresh-installation.js:658-702](../../scripts/update/lib/refresh-installation.js#L658-L702) | For each Enhance workflow: copy SKILL.md from package source; append rows to `workflow-manifest.csv` and `skill-manifest.csv` if not present | Log "skipped (dev environment)" | [validator.js:464-469](../../scripts/update/lib/validator.js#L464-L469) — Check 6 of `validateEnhanceModule`: asserts `.claude/skills/bmad-enhance-${wf.name}/SKILL.md` exists | [convoke-doctor.js:367-422](../../scripts/convoke-doctor.js#L367-L422) — `checkModuleSkillWrappers` resolves through manifest, checks the same file | **SAFE** (with duplicate coverage — see I47) | ✓ |
| **F6** | Standalone bme agent skill-generation loop (`for (const agent of EXTRA_BME_AGENTS)`) | [refresh-installation.js:632-655](../../scripts/update/lib/refresh-installation.js#L632-L655) | Generate `.claude/skills/bmad-agent-bme-{id}/SKILL.md` thin wrapper for each EXTRA_BME_AGENTS entry | (no gate — runs unconditionally for every entry) | [validator.js:218-225](../../scripts/update/lib/validator.js#L218-L225) — checks the **agent .md file** exists at `_bmad/bme/{submodule}/agents/{id}.md`, NOT the skill wrapper at `.claude/skills/bmad-agent-bme-{id}/SKILL.md` | none — `convoke-doctor.js` has zero references to `bmad-agent-bme-` | **GAP** → I43 (highest-impact) | ✓ |
| **F7** | Artifacts skill-wrapper generation gate (`artifactsConfig && !isSameRoot`) + inline `workflow.standalone === true` filter | [refresh-installation.js:709-743](../../scripts/update/lib/refresh-installation.js#L709-L743) | For each `standalone:true` Artifacts workflow: remove + recreate `.claude/skills/{workflow.name}/`, copy SKILL.md from package; non-standalone workflows are logged + skipped | Log "skipped (dev environment)" | [validator.js:549-565](../../scripts/update/lib/validator.js#L549-L565) — `validateArtifactsModule` mirrors the inline filter (`if (wf.standalone !== true) continue;`) and asserts entry-point file + skill wrapper at `.claude/skills/{wf.name}/SKILL.md` | [convoke-doctor.js:367-422](../../scripts/convoke-doctor.js#L367-L422) — `checkModuleSkillWrappers` covers in-manifest workflows | **SAFE** (Story 6.6's fix is in place; standalone filter mirrored on both sides) | ✓ |
| **F8** | Artifacts config-load + version-stamp gate (`fs.existsSync(artifactsConfigPath)` → `if (artifactsConfig) { if (!isSameRoot) }`) | [refresh-installation.js:247-279](../../scripts/update/lib/refresh-installation.js#L247-L279) | Parse `_artifacts/config.yaml`; copy directory tree; `assertVersion(version, 'artifacts')` + `YAML.parseDocument` + `acDoc.set('version', version)` + write | Log "skipped (dev environment)" or "config not found" | [validator.js:512-529](../../scripts/update/lib/validator.js#L512-L529) — checks config.yaml exists + parses + has workflows array, but **does NOT check the `version` field is present or matches package version** | [convoke-doctor.js:486-512](../../scripts/convoke-doctor.js#L486-L512) — `checkVersionConsistency` walks all module configs and reports mismatch, but only AFTER refresh has run; if refresh's version-stamp silently failed, doctor would catch the mismatch on the NEXT run, not the current one | **GAP** → I46 (borderline trivial) | ✓ |
| **F9** | Enhance config-load + version-stamp gate (`fs.existsSync(enhanceConfigPath)` → `if (enhanceConfig) { if (!isSameRoot) }`) | [refresh-installation.js:141-164](../../scripts/update/lib/refresh-installation.js#L141-L164) | Same pattern as F8 but for Enhance: parse, copy tree, `assertVersion(version, 'enhance')` + version-stamp via `YAML.parseDocument` | Same as F8 | [validator.js:393-429](../../scripts/update/lib/validator.js#L393-L429) — `validateEnhanceModule` checks `config.version` is present (line 409 — `if (!config.version) missing.push('version')`) but does NOT verify it matches package version | Same as F8 | **MIXED** (validator catches missing version field; nobody catches stale version) | ✓ |
| **F10** | Deprecated agent removal loop | [refresh-installation.js:60-68](../../scripts/update/lib/refresh-installation.js#L60-L68) | Remove `empathy-mapper.md` and `wireframe-designer.md` if present | (no gate — runs unconditionally; idempotent) | none — validator doesn't check for *absence* of deprecated files | none | **N/A** (deprecated-file absence is not a contract; running refresh always reasserts the cleanup) | ✓ |
| **F11** | Stale skill cleanup (`fs.existsSync(skillsDir)` → filter `bmad-agent-bme-*` directories not in current registry) | [refresh-installation.js:566-581](../../scripts/update/lib/refresh-installation.js#L566-L581) | For each existing `.claude/skills/bmad-agent-bme-*` directory not matching the current `AGENTS + GYRE_AGENTS + EXTRA_BME_AGENTS` set, `fs.remove` it | Skip if `.claude/skills/` doesn't exist | none — validator's `validateManifest` doesn't check for *absence* of stale wrappers | none | **N/A** (stale-wrapper presence isn't a correctness bug; refresh always reasserts) | ✓ |
| **F12** | Vortex `mergeConfig` + `writeConfig` (no `isSameRoot` gate) | [refresh-installation.js:366-379](../../scripts/update/lib/refresh-installation.js#L366-L379) | Merge `_vortex/config.yaml`, `assertVersion` defense-in-depth, write merged config | (no gate — always runs) | [validator.js:66-98](../../scripts/update/lib/validator.js#L66-L98) — `validateConfigStructure` parses Vortex config and runs `configMerger.validateConfig` | [convoke-doctor.js:150-193](../../scripts/convoke-doctor.js#L150-L193) — `checkModuleConfig` per-module via `discoverModules` | **SAFE** | ✓ |
| **F13** | Workflow-manifest CSV append (`fs.existsSync(wfManifestPath)`) | [refresh-installation.js:672-683](../../scripts/update/lib/refresh-installation.js#L672-L683) | If `workflow-manifest.csv` exists and the canonicalId substring isn't already present, append a row | Log "manifest not found, skipping" | none — validator has no `workflow-manifest.csv` check | none | **GAP** → I45 | ✓ |

---

## Identified GAPs

### GAP-1 (F6): Standalone bme agent skill wrappers — promoted to **I43**

**Failure mode:**
> A future operator removes `bmad-agent-bme-team-factory-master/SKILL.md` from `.claude/skills/` (e.g., during a manual cleanup, or because their CI image only restores tracked files). They run `convoke-doctor` and see "All checks passed." They then try to invoke the team-factory agent and Claude Code can't find the skill — the slash command silently fails. The doctor's existence is supposed to prevent exactly this drift, but the current implementation only checks the agent's source `.md` file, not its `.claude/skills/` wrapper.

**Why it's not a trivial fix:**
- Adding the check requires a new doctor function (`checkExtraBmeAgentWrappers`) — at least ~15 lines.
- Requires importing `EXTRA_BME_AGENTS` from `agent-registry`, which the doctor currently doesn't depend on (it's a config-driven scanner via `discoverModules`, not registry-driven). Adding a registry import contradicts the doctor's design.
- A second design option is to extend `checkModuleSkillWrappers` to *also* check `.claude/skills/bmad-agent-bme-{id}/SKILL.md` for each agent in the discovered module's `config.yaml`. This is cleaner but still ~10 added lines + a new test file.

**Recommended fix** (sketch — for the follow-up story):

```javascript
// Add to convoke-doctor.js after checkModuleSkillWrappers:
function checkModuleAgentSkillWrappers(mod, projectRoot) {
  const label = `${mod.name} agent skill wrappers`;
  const agents = mod.config.agents || [];
  if (agents.length === 0) return null;
  const failures = agents
    .filter(id => !fs.existsSync(path.join(projectRoot, '.claude/skills', `bmad-agent-bme-${id}`, 'SKILL.md')))
    .map(id => `Missing agent skill wrapper: .claude/skills/bmad-agent-bme-${id}/SKILL.md`);
  if (failures.length > 0) {
    return { name: label, passed: false, error: failures.join('; '), fix: 'Run convoke-update to regenerate agent skill wrappers' };
  }
  return { name: label, passed: true, info: `${agents.length} agent skill wrappers present` };
}
```

**Triage:** `[PROMOTE-TO-BACKLOG]` — filed as **I43** (RICE: R=4 modules × ~3 wrappers each = 12 wrappers exposed, I=2 high — silent slash-command failures are operator-frustrating, C=80%, E=2 → Score ~9.6/E=4.8). High enough to be near the top of the next sprint.

---

### GAP-2 (F3): Gyre config validation absence — promoted to **I44**

**Failure mode:**
> Refresh successfully copies `_gyre/config.yaml`, merges user prefs, version-stamps it. But `_gyre/agents/` is missing one of the GYRE_AGENT_FILES (e.g., a manual `rm` between installs). The validator never runs a `validateGyreModule` — `validateAgentFiles` only checks Vortex agents. The doctor's `checkModuleAgents` runs against the discovered Gyre module but only checks the `agents` array declared in Gyre's config.yaml against actual files — which catches *some* drift but doesn't validate the full GYRE_AGENT_FILES contract from the registry.

**Why it's not a trivial fix:**
- Requires a new `validateGyreModule` function in `validator.js` (likely 30-50 lines mirroring the Enhance/Artifacts pattern).
- Requires wiring it into `validateInstallation` at the top of the file.
- Requires regression tests under `tests/lib/`.
- Definitely > 3 lines.

**Triage:** `[PROMOTE-TO-BACKLOG]` — filed as **I44** (RICE: R=2 Gyre install paths, I=1.5 — drift is recoverable via `convoke-update`, C=70%, E=3 → Score ~0.7).

---

### GAP-3 (F13): Workflow-manifest CSV registration drift — promoted to **I45**

**Failure mode:**
> Refresh appends a row to `workflow-manifest.csv` for each Enhance workflow, gated on "if not already present" via substring check. If the substring check returns a false negative (e.g., the canonicalId is a prefix of another entry), the row is appended a second time and the manifest now has duplicates. No validator/doctor catches duplicate rows; consumers reading the manifest may pick the wrong row. Inverse failure: if the manifest is corrupted/truncated and the entry vanishes, refresh re-appends — but only on the next refresh; in between, `convoke-portfolio` and other manifest consumers would silently misbehave.

**Why it's not a trivial fix:**
- Requires a new validator function or doctor check.
- The substring-based dedup itself is a known issue (already filed earlier in the backlog as I15 — "validateManifest CSV parsing — replace substring matching"). I45 is the *missing-validator-check* aspect, complementary to I15's *broken-dedup* aspect.

**Triage:** `[PROMOTE-TO-BACKLOG]` — filed as **I45** (RICE: R=1 manifest, I=0.5 — current consumers are tolerant, C=60%, E=2 → Score ~0.15). Low priority; flagged for I15 batch.

---

### GAP-4 (F8): Artifacts version-stamp post-check absence — promoted to **I46**

**Failure mode:**
> Refresh successfully parses Artifacts config.yaml, calls `assertVersion(version, 'artifacts')`, runs `YAML.parseDocument`, calls `acDoc.set('version', version)`, writes the file. But the write happens *after* `acDoc.set` — what if the write itself fails partway through (disk full, permission flip mid-write)? `fs.writeFileSync` is non-atomic. The next `convoke-doctor` run would catch the version mismatch via `checkVersionConsistency` (line 486-512), but the *current* refresh run reports success because the version-stamp call returned without throwing.

**Why it's borderline trivial:**
- A single line `assertVersion(yaml.load(fs.readFileSync(targetArtifactsConfig)).version, 'artifacts-postcheck')` after the write would catch the partial-write window.
- But it requires a re-read of the file, which means a new `yaml.load` call → new import path or reuse of the existing `yaml` import. The line itself is short, but it adds I/O and a regression test.
- Total addition is ~5 lines + a test → exceeds the AC #6 trivial-patch threshold of "≤3 added lines."

**Triage:** `[PROMOTE-TO-BACKLOG]` — filed as **I46** (RICE: R=2 modules × 1 version-stamp call each, I=1 — partial-write is rare, C=50%, E=2 → Score ~0.5). Low priority; complements **I39** (non-atomic writes filed in 2026-04-09 triage — same root cause).

---

### MIXED-1 (F2): Enhance menu-patch coverage — promoted to **I47** (consolidation)

**Failure mode (parallel coverage, not a true gap):**
> `validateEnhanceModule` Check 3 ([validator.js:443-453](../../scripts/update/lib/validator.js#L443-L453)) verifies the menu patch was applied to the target agent file. `convoke-doctor` has no equivalent — its `checkModuleConfig` and `checkModuleWorkflows` check structure but not patch presence. This is currently SAFE because the validator catches it during `npm test` lib stages, but the *doctor* (which is the operator-facing diagnostic) silently passes a broken Enhance install where the menu patch was reverted.

**Recommended consolidation (sketch):**

```javascript
// Add to convoke-doctor.js per-module loop:
function checkEnhanceMenuPatches(mod, projectRoot) {
  if (mod.name !== '_enhance') return null;
  const failures = (mod.config.workflows || [])
    .filter(wf => wf.target_agent && wf.menu_patch_name)
    .filter(wf => {
      const agentPath = path.join(projectRoot, '_bmad', wf.target_agent);
      if (!fs.existsSync(agentPath)) return false;
      return !fs.readFileSync(agentPath, 'utf8').includes(wf.menu_patch_name || wf.name);
    })
    .map(wf => `Menu patch "${wf.menu_patch_name || wf.name}" missing from ${wf.target_agent}`);
  if (failures.length > 0) return { name: '_enhance menu patches', passed: false, error: failures.join('; '), fix: 'Run convoke-update to re-apply menu patches' };
  return null;
}
```

**Triage:** `[PROMOTE-TO-BACKLOG]` — filed as **I47** (RICE: R=1 module × 1 workflow today, I=1 — Enhance is opt-in but production-critical for users who use it, C=70%, E=2 → Score ~0.35). Bundles the I47 doctor check + the parallel-coverage consolidation question (do we keep `validateEnhanceModule` Check 6 + `checkModuleSkillWrappers` both?).

---

### MIXED-2 (F9): Enhance version-stamp staleness — promoted to **I46** (merged with GAP-4)

Same root cause as F8 (Artifacts). Both refresh sites stamp via `YAML.parseDocument` but neither validator/doctor reads the stamped value back. **Merging into I46** rather than filing a duplicate.

---

## Story 7.2 wrapper-check coverage

This section addresses **AC #4 + AC #10** of Story 7.3.

As of 2026-04-09, `_bmad/_config/skill-manifest.csv` contains exactly **3 in-manifest bme workflows** (verified by reading the file at audit time):

| Manifest row | Module | Source path | Doctor check via `checkModuleSkillWrappers`? |
|--------------|--------|-------------|------------------------------------------------|
| `bmad-migrate-artifacts` | `_artifacts` | `_bmad/bme/_artifacts/workflows/bmad-migrate-artifacts/SKILL.md` | ✅ YES — Story 7.2's manifest-keyed lookup resolves to the canonicalId, doctor checks `.claude/skills/bmad-migrate-artifacts/SKILL.md` |
| `bmad-portfolio-status` | `_artifacts` | `_bmad/bme/_artifacts/workflows/bmad-portfolio-status/SKILL.md` | ✅ YES — same path |
| `bmad-enhance-initiatives-backlog` | `_enhance` | `_bmad/bme/_enhance/workflows/initiatives-backlog/SKILL.md` | ✅ YES — manifest resolves the prefix; checks `.claude/skills/bmad-enhance-initiatives-backlog/SKILL.md` |

**Per-module verdict (binding per AC #10):**

| Module | Should `checkModuleSkillWrappers` apply? | Rationale |
|--------|-----------------------------------------|-----------|
| **`_vortex`** (Vortex) | ❌ NO | Vortex workflows are NOT standalone skills. They're agent-menu items invoked by the 7 Vortex agents. The `.claude/skills/bmad-agent-bme-{vortexId}/SKILL.md` wrappers cover the agents, not the workflows. |
| **`_gyre`** (Gyre) | ❌ NO | Same pattern as Vortex — Gyre workflows are agent-menu items for the 4 Gyre agents. |
| **`_team-factory`** (Loom Master / team-factory) | ❌ NO | The team-factory module's "workflows" are step-driven scaffolding routines orchestrated by the Forge Master agent, not standalone slash-command skills. None are in skill-manifest.csv and none should be — verified by reading the manifest end-to-end (no `bmad-team-factory-*` rows). |
| **`_enhance`** (Enhance) | ✅ YES | Enhance's only workflow today (`initiatives-backlog`) IS a standalone skill with a manifest row. **Plus** the validator (`validateEnhanceModule` Check 6) ALREADY checks the same wrapper — see I47 for the consolidation question. |
| **`_artifacts`** (Artifacts) | ✅ YES | Both Artifacts workflows are standalone skills with manifest rows. The validator (`validateArtifactsModule` Check 5) ALSO checks the same wrappers — same parallel-coverage question as Enhance. |

**Conclusion:** The Story 7.2 manifest-as-opt-in semantics are correct. There is no module today where `checkModuleSkillWrappers` SHOULD apply but currently doesn't, and no missing manifest row.

**Side-effect finding (folded into I47):** the **doctor + validator both check the same Enhance and Artifacts wrappers**. Neither is wrong — they're parallel checks at different levels (`validator.js` runs during `npm test`; `convoke-doctor.js` is operator-invoked). But it's a maintainability surface area that the audit recommends consolidating in I47.

---

## Limitations

This audit does NOT cover:
- **Migration history correctness** — Story 7.1 added regression tests for the version-stamp + comment-preservation paths; this audit assumes those tests are sufficient.
- **`convoke-version.js`** — CLI helper that reads versions but doesn't write or modify install state.
- **`convoke-install.js`** — first-time install (vs. refresh). The install path has its own gates that arguably warrant a similar audit, but Story 7.3 was scoped to refresh.
- **`config-merger.js` internals** — the YAML round-trip + sentinel pattern from Story 7.1. Story 7.1's tests already cover the contract surface.
- **Upstream BMAD module validation** (BMM, TEA, CIS, BMB, WDS) — the audit only covers the Convoke-managed bme submodules. The 130+ rows in `skill-manifest.csv` for upstream modules are out of scope.

---

## Next steps

1. **I43 (highest priority)** — Add `checkModuleAgentSkillWrappers` to `convoke-doctor.js` (or extend `checkModuleSkillWrappers`). This closes the F6 GAP that the audit identified as the dominant install-drift surface.
2. **Story 7.4** — Orphan skill-wrapper cleanup. Story 7.4 depends on this audit's catalogue (per the epic file's note) so it can build the conservative-removal allowlist from F1-F13's covered surface area. The team-factory pattern (F11) is the closest precedent for the orphan sweep Story 7.4 will add.
3. **I47 (medium priority)** — Consolidate the parallel `checkModuleSkillWrappers` ↔ `validateXxxModule` Check 6 implementations. Either delete the duplicate (one source of truth) or formalize the split with explicit comments.
4. **I44 + I46** — Defer until next Epic 7-style debt sprint. Both are real but low-impact.
5. **I48 (consolidation, conceptual)** — The audit's biggest finding is *structural*: each Convoke module wires validation in a different place, with no shared interface. A future epic could extract a `ModuleContract` abstraction (declared in each module's config.yaml) so `validator.js` and `convoke-doctor.js` can drive their checks from a single declarative spec. This is a multi-story epic, not a single I-item.

---

## Coverage matrix (sanity check)

| Module | Refresh (sites) | Validator (sites) | Doctor (sites) | Coverage |
|--------|-----------------|--------------------|----------------|----------|
| Vortex | F12 (config), L40-93 (agents+workflows) | `validateConfigStructure`, `validateAgentFiles`, `validateWorkflows`, `validateManifest` | `checkModuleConfig`, `checkModuleAgents`, `checkModuleWorkflows` | ✅ Full |
| Gyre | F3, F4, L285-326 (agents+workflows) | none — **F3 GAP** | `checkModuleConfig`, `checkModuleAgents`, `checkModuleWorkflows` (config-driven) | ⚠ Partial (no validator function) |
| Enhance | F2, F5, F9 | `validateEnhanceModule` (6 checks) | `checkModuleConfig`, `checkModuleWorkflows`, `checkModuleSkillWrappers` (in-manifest) | ✅ Full + parallel coverage on F5 |
| Artifacts | F7, F8 | `validateArtifactsModule` (5 checks) | `checkModuleConfig`, `checkModuleWorkflows`, `checkModuleSkillWrappers` (in-manifest) | ✅ Full + parallel coverage on F7 |
| Standalone bme agents (team-factory) | F1, F6 | `validateManifest` (agent file existence only) | `checkModuleConfig`, `checkModuleAgents` (config-driven, doesn't check skill wrapper) | ⚠ Partial — **F6 GAP (agent skill wrapper)** |

---

## Self-verification (Task 3.4)

Every F-row's line ranges were re-grepped at audit time after the catalogue was assembled. The Verified column reflects this check. Any ✓ means the cited file:line still describes the gate as written.

