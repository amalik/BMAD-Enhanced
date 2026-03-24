# Story 1.3: Human-Readable Context & Extension Mechanism

Status: ready-for-dev

## Story

As a framework contributor,
I want to understand *why* each checklist item matters and how extension deployment works,
So that I can make informed decisions and understand the reasoning behind the rules, not just follow them blindly.

## Acceptance Criteria

1. **Given** the Architecture Reference document
   **When** a contributor reads a quality property section
   **Then** each YAML checklist is accompanied by human-readable prose explaining why each check matters (TF-FR2)
   **And** prose references check IDs inline (e.g., "**DISC-I-01** — agent-manifest.csv is the primary...") for traceability
   **And** the reference is readable and useful without needing to parse YAML blocks — prose stands alone

2. **Given** a contributor wants to understand deployment
   **When** they look for extension deployment documentation
   **Then** the extension deployment mechanism is documented separately from composition patterns (TF-FR5)
   **And** the documentation covers how new modules are copied, registered, and validated through the existing Convoke infrastructure

## Tasks / Subtasks

- [ ] Task 1: Author per-check "why" prose for Discoverable — Independent (AC: #1)
  - [ ] 1.1 Replace the HTML comment `<!-- Story 1.3 will add per-check "why" prose with inline check ID references -->` in the "## Discoverable — Independent" section with prose paragraphs
  - [ ] 1.2 Write prose for each check (DISC-I-01 through DISC-I-05) referencing check IDs inline in bold (e.g., "**DISC-I-01** — ...") — explain WHY each check matters, not just what it checks
  - [ ] 1.3 Ensure prose stands alone — a reader should understand the reasoning without parsing the YAML block

- [ ] Task 2: Author per-check "why" prose for Discoverable — Sequential (AC: #1)
  - [ ] 2.1 Replace the HTML comment with prose paragraphs covering DISC-S-01 through DISC-S-07
  - [ ] 2.2 For checks shared with Independent (DISC-S-01 through DISC-S-05), reuse the same reasoning but phrased for Sequential context — each section must stand alone (JIT rule)
  - [ ] 2.3 Add Sequential-specific reasoning for DISC-S-06 (compass routing) and DISC-S-07 (agent menu coverage)

- [ ] Task 3: Author per-check "why" prose for Installable — Independent (AC: #1)
  - [ ] 3.1 Replace the HTML comment with prose paragraphs covering INST-I-01 through INST-I-06
  - [ ] 3.2 Explain why each installation surface matters: registry enables CLI tooling, refresh ensures consistency, config enables parsing, validator catches drift, agent files are the runtime artifacts, workflow.md is the entry point

- [ ] Task 4: Author per-check "why" prose for Installable — Sequential (AC: #1)
  - [ ] 4.1 Replace the HTML comment with prose for INST-S-01 through INST-S-08
  - [ ] 4.2 For shared checks (INST-S-01 through INST-S-06), reuse reasoning in Sequential context — section must stand alone
  - [ ] 4.3 Add Sequential-specific reasoning for INST-S-07 (contracts directory) and INST-S-08 (contracts copy)

- [ ] Task 5: Author per-check "why" prose for Configurable — Independent (AC: #1)
  - [ ] 5.1 Replace the HTML comment with prose for CONF-I-01 through CONF-I-06
  - [ ] 5.2 Explain why config matters for portability, why activation XML must load config dynamically, and why naming conventions enable config-driven wiring

- [ ] Task 6: Author per-check "why" prose for Configurable — Sequential (AC: #1)
  - [ ] 6.1 Replace the HTML comment with prose for CONF-S-01 through CONF-S-08
  - [ ] 6.2 For shared checks (CONF-S-01 through CONF-S-06), reuse reasoning — section stands alone
  - [ ] 6.3 Add Sequential-specific reasoning for CONF-S-07 (contract frontmatter agent names) and CONF-S-08 (contract file naming)

- [ ] Task 7: Author per-check "why" prose for Composable — Independent (AC: #1)
  - [ ] 7.1 Replace the HTML comment with prose for COMP-I-01 through COMP-I-04
  - [ ] 7.2 Explain composability for Independent: agents are individually addressable (manifest, skill IDs), explicitly no contracts (pattern assertion), README enables cross-team awareness without coupling

- [ ] Task 8: Author per-check "why" prose for Composable — Sequential (AC: #1)
  - [ ] 8.1 Replace the HTML comment with prose for COMP-S-01 through COMP-S-06
  - [ ] 8.2 Explain composability for Sequential: contracts define formal interfaces, compass enables cross-module navigation, pipeline coverage ensures no gaps

- [ ] Task 9: Author Extension Deployment Mechanism section (AC: #2)
  - [ ] 9.1 Add a new `## Extension Deployment Mechanism` section AFTER the Quality Properties section and BEFORE the first checklist section — this is a separate concept from composition patterns per TF-FR5
  - [ ] 9.2 Document the deployment flow: how new modules are copied (refresh-installation.js), registered (agent-registry.js), configured (config.yaml), validated (validator.js), and made discoverable (agent-manifest.csv, module-help.csv)
  - [ ] 9.3 Reference the integration surfaces by name but do NOT duplicate the YAML checks — point to the checklist sections for specific rules
  - [ ] 9.4 Keep this section concise (target ~30-50 lines) — it is an overview of HOW deployment works, not a repeat of WHAT is validated

- [ ] Task 10: Validate all prose and extension mechanism (AC: #1, #2)
  - [ ] 10.1 Verify every check ID across all 8 sections is referenced in prose with bold formatting
  - [ ] 10.2 Verify prose explains "why" not just restates "what" from the YAML rule field
  - [ ] 10.3 Verify each section's prose stands alone without needing to read other sections
  - [ ] 10.4 Verify extension deployment section is positioned separately from composition patterns
  - [ ] 10.5 Verify no new YAML checks were added (out of scope — this story adds prose only)
  - [ ] 10.6 Verify no existing YAML blocks were modified (out of scope)

## Dev Notes

### This is a PROSE ADDITION story — not creation or YAML modification

Story 1.2 created the 8 YAML checklist sections with 50 structured checks. This story adds human-readable "why" prose to each section and a separate Extension Deployment Mechanism section. DO NOT modify any YAML blocks.

### Prose Format (TF-FR2 + D-Q1 drift prevention)

Each checklist section currently has an HTML comment placeholder:
```
<!-- Story 1.3 will add per-check "why" prose with inline check ID references -->
```

Replace each comment with prose paragraphs. Format:
- Reference check IDs inline in bold: `**DISC-I-01**`
- Explain WHY the check matters, not just what it does
- Group related checks into natural paragraphs rather than one paragraph per check
- Prose should make sense without reading the YAML — a contributor should understand the reasoning from prose alone

Example from architecture (D-Q1):
> **DISC-01** — module-help.csv is the primary discovery surface because...

### JIT Self-Containment Rule (from Story 1.2)

Each section must stand alone. Sequential sections have their own S-prefixed check IDs that mirror Independent checks. The prose for Sequential sections must ALSO stand alone — do not write "same as Independent" or "see above." Duplicate the reasoning with appropriate Sequential context.

### Extension Deployment Mechanism (TF-FR5)

AC#2 requires this be documented **separately from composition patterns**. Add it as a new section BETWEEN "Quality Properties" and the first checklist section. This covers the deployment pipeline (how files get from package to project), NOT the validation rules (which are in the checklists).

Key deployment surfaces to document:
1. `refresh-installation.js` — copies agents/, workflows/, contracts/, guides/, config.yaml from package to project
2. `agent-registry.js` — central registry mapping modules to agents/workflows
3. `config.yaml` — per-module configuration seeded by config-merger
4. `validator.js` — post-install validation ensures structural integrity
5. `agent-manifest.csv` — generated by buildAgentRow610() during refresh
6. `module-help.csv` — CLI discovery surface (note: gap for bme submodules)

### Check ID Inventory (what prose must cover)

| Section | Check IDs | Count |
|---------|-----------|-------|
| Discoverable — Independent | DISC-I-01 through DISC-I-05 | 5 |
| Discoverable — Sequential | DISC-S-01 through DISC-S-07 | 7 |
| Installable — Independent | INST-I-01 through INST-I-06 | 6 |
| Installable — Sequential | INST-S-01 through INST-S-08 | 8 |
| Configurable — Independent | CONF-I-01 through CONF-I-06 | 6 |
| Configurable — Sequential | CONF-S-01 through CONF-S-08 | 8 |
| Composable — Independent | COMP-I-01 through COMP-I-04 | 4 |
| Composable — Sequential | COMP-S-01 through COMP-S-06 | 6 |
| **Total** | | **50** |

### What NOT to Create (Out of Scope)

- **Do NOT modify any YAML data blocks** — Story 1.2 delivered those
- **Do NOT add new checks** — only prose for existing checks
- **Do NOT create Gyre validation** — Story 1.4 scope
- **Do NOT create any JS utilities or workflow files** — Epic 2 scope
- **Do NOT modify the Introduction, Composition Patterns, or Quality Properties sections** — Story 1.1 delivered those

### Previous Story Intelligence

From Story 1.2 completion:
- 50 checks across 8 sections (5, 7, 6, 8, 6, 8, 4, 6)
- module-help.csv gap documented in DISC-I-05/DISC-S-05 with NOTE in validation field
- Code review patches applied: contract frontmatter uses agent short names (not config.yaml IDs), COMP-S-02 simplified to "at least one handoff contract"
- JIT self-containment rule honored — every Sequential section is a superset of Independent
- All 8 integration surfaces covered across checklists

### Project Structure Notes

- Architecture Reference: `_bmad-output/planning-artifacts/architecture-reference-teams.md`
- The file currently has ~440 lines — prose additions will expand it significantly

### References

- [Source: _bmad-output/planning-artifacts/epic-team-factory.md — Story 1.3 ACs]
- [Source: _bmad-output/planning-artifacts/architecture-team-factory.md — D-Q1 prose format, TF-FR2, TF-FR5, drift prevention]
- [Source: _bmad-output/planning-artifacts/architecture-reference-teams.md — Target file with 8 YAML checklist sections]
- [Source: _bmad-output/implementation-artifacts/tf-1-2-machine-consumable-team-validity-checklists.md — Story 1.2 completion notes, check inventory]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### Change Log

### File List
