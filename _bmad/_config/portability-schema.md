# Skill Portability Schema

Defines the metadata schema used by the skill exporter and catalog generator for the Skill Portability initiative. Source: [vision-skill-portability.md](../../_bmad-output/planning-artifacts/vision-skill-portability.md).

This schema extends `_bmad/_config/skill-manifest.csv` with three columns: `tier`, `intent`, and `dependencies`. Together they describe how a skill can be exported as a portable, LLM-agnostic artifact for use in any AI coding tool (Claude Code, GitHub Copilot, Cursor, Windsurf, Aider).

---

## Tier

The `tier` column declares the export complexity required to make a skill portable.

| Value | Meaning | Export behavior |
|-------|---------|-----------------|
| `standalone` | Agent persona + instructions, no external file deps. | Copy + strip framework refs (Claude tool names, `bmad-init` calls, `Load step:` directives). Outputs a self-contained `instructions.md`. |
| `light-deps` | Needs templates or config defaults to function. | Copy + inline referenced template content into `instructions.md`. Replace config references with inline placeholders. |
| `pipeline` | Depends on prior artifacts (e.g., a story file from SM) or chained skills. | **NOT force-exported standalone.** The `dependencies` column documents prerequisites; the catalog notes the skill requires a full Convoke installation. |

### Tier classification rules

- **Tier 1 (standalone):** No external file dependencies beyond the skill's own `SKILL.md` and any sibling files in the same directory. Pure agent personas (CIS), reviews, and elicitation typically qualify.
- **Tier 2 (light-deps):** Depends on templates (e.g., PRD template), config values (e.g., `output_folder`), or sidecar memory files. Self-contained after template inlining.
- **Tier 3 (pipeline):** Requires either a prior artifact (e.g., story file from SM, epic file) OR another skill in a chain. Examples: `bmad-dev-story` needs a story file, `bmad-sprint-planning` needs epics, WDS phases run sequentially.

**Decision rule for borderline cases:** If a skill could function with EMPTY input and produce useful output, it's Tier 1 or Tier 2. If it errors or produces nonsense without specific prior artifacts, it's Tier 3.

---

## Intent

The `intent` column groups skills by user intent — the question a consumer asks when looking for a skill ("I need to..."). The catalog generator uses this to produce an intent-based decision tree.

There are 9 valid intent categories:

| Category | Description | Example skills |
|----------|-------------|---------------|
| `think-through-problem` | Facilitated thinking, ideation, and problem-solving | `bmad-brainstorming`, `bmad-cis-problem-solving`, `bmad-cis-design-thinking` |
| `define-what-to-build` | Requirements, briefs, specs, architecture | `bmad-create-prd`, `bmad-product-brief`, `bmad-create-ux-design`, `bmad-create-architecture` |
| `review-something` | Quality reviews of code, prose, or artifacts | `bmad-code-review`, `bmad-review-adversarial-general`, `bmad-editorial-review-prose` |
| `write-documentation` | Project docs, knowledge capture, indexes | `bmad-document-project`, `bmad-generate-project-context`, `bmad-index-docs` |
| `plan-your-work` | Stories, epics, sprints, retrospectives | `bmad-create-story`, `bmad-create-epics-and-stories`, `bmad-sprint-planning` |
| `test-your-code` | Test design, ATDD, automation, NFR | `bmad-testarch-test-design`, `bmad-testarch-atdd`, `bmad-qa-generate-e2e-tests` |
| `discover-product-fit` | Vortex stream agents (Lean Startup discovery) | `bmad-agent-bme-contextualization-expert`, `bmad-agent-bme-hypothesis-engineer` |
| `assess-readiness` | Gyre agents and readiness checks | `bmad-agent-bme-stack-detective`, `bmad-check-implementation-readiness` |
| `meta-platform` | Platform-level utilities, init, help, party mode | `bmad-init`, `bmad-help`, `bmad-party-mode`, `bmad-builder-setup` |

These category strings are stable and **MUST** match exactly between the manifest, the exporter, and the catalog generator. Renames cascade.

---

## Dependencies

The `dependencies` column is a semicolon-delimited list of dependency identifiers. **Empty string is the canonical value for skills with no dependencies** (always the case for `standalone` tier; possible for `light-deps` and `pipeline` if they truly need none, though uncommon). Story 1.3's validator treats empty `dependencies` as valid in all cases — it does not require a non-empty value.

### Notation conventions

| Form | Format | Example |
|------|--------|---------|
| **File path** | Path relative to project root | `_bmad/bmm/templates/prd-template.md` |
| **Config key** | `config:` prefix + key name | `config:output_folder` |
| **Skill name** | Bare skill name (canonicalId) | `bmad-create-story` |

Multiple values are joined with semicolons (no spaces around the semicolon):

```
_bmad/bmm/templates/prd-template.md;config:output_folder;bmad-init
```

The exporter uses this list to:
- Inline template content (file paths) into the canonical `instructions.md`
- Replace config references with inline placeholders (config keys)
- Document chain prerequisites (skill names) in the per-skill README

---

## Examples

### Tier 1 example: `bmad-brainstorming` (Carson)

```csv
"bmad-brainstorming","bmad-brainstorming","Facilitate interactive brainstorming sessions...","core","_bmad/core/bmad-brainstorming/SKILL.md","true",standalone,think-through-problem,
```

- **tier:** `standalone` — Carson's persona is fully contained in the skill files; no external templates or config required.
- **intent:** `think-through-problem` — the skill exists to help users think through ideas via facilitated brainstorming techniques.
- **dependencies:** empty — nothing to inline.
- **Export behavior:** Strip Claude tool refs and framework calls, write a single `instructions.md` containing Carson's full persona and brainstorming workflow.

### Tier 2 example: `bmad-create-prd` (John)

```csv
"bmad-create-prd","bmad-create-prd","Create a PRD from scratch...","bmm","_bmad/bmm/2-plan-workflows/bmad-create-prd/SKILL.md","true",light-deps,define-what-to-build,_bmad/bmm/templates/prd-template.md;config:output_folder
```

- **tier:** `light-deps` — depends on the PRD template file and the user's `output_folder` config value.
- **intent:** `define-what-to-build` — produces a PRD, which is a "what to build" artifact.
- **dependencies:** the PRD template (inlined into `instructions.md`) and the `output_folder` config key (replaced with a placeholder users fill in).
- **Export behavior:** Inline the template content under a "## Template" section; replace `{output_folder}` with `[your output folder, e.g., docs/]`.

### Tier 3 example: `bmad-dev-story` (Amelia)

```csv
"bmad-dev-story","bmad-dev-story","Execute story implementation...","bmm","_bmad/bmm/4-implementation/bmad-dev-story/SKILL.md","true",pipeline,plan-your-work,bmad-create-story;config:implementation_artifacts
```

- **tier:** `pipeline` — Amelia needs a story file produced by `bmad-create-story` to function. With no story file, the skill cannot proceed.
- **intent:** `plan-your-work` — implements planned work (executing a story is a planning-driven activity).
- **dependencies:** `bmad-create-story` (the upstream skill that produces the input artifact) and `config:implementation_artifacts` (where story files live).
- **Export behavior:** **Not exported as standalone.** The catalog entry shows a "Requires full Convoke installation" badge and lists the prerequisite chain.

---

## Schema validation

Story 1.3 (`sp-1-3-validate-classification-completeness`) will add a script that:
- Verifies every row has non-empty values in `tier` and `intent` (the `dependencies` column may be empty)
- Validates dependency file paths resolve to existing files
- Validates config keys exist in the relevant module config
- Validates skill name dependencies exist in the manifest

Until then, this schema document is the authoritative reference.
