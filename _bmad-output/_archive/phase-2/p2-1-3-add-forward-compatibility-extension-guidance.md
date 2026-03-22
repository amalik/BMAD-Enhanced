# Story p2-1.3: Add Forward-Compatibility & Extension Guidance

Status: done

## Story

As a module extender or new user,
I want clear guidance on how to safely extend BMAD and confidence that existing artifacts remain compatible across updates,
So that I can extend the system through proper channels and upgrade without regenerating my work.

## Acceptance Criteria

1. **Given** a new user reading the UPDATE-GUIDE, **When** they look for forward-compatibility information, **Then** they find a section explaining that existing `_bmad-output/` artifacts work with updated agents without regeneration (FR6) **And** the guidance is specific about what is and isn't backward-compatible
2. **Given** a module extender looking to add a custom agent, **When** they search docs for extension guidance, **Then** they find clear direction that custom agents should be built through BMB (BMAD Module Builder) or a repository fork — not hand-rolled manifest entries (FR23) **And** they see a bloat warning explaining that adding agents without proper structure degrades the Vortex signal (FR24) **And** the guidance is actionable within 10 minutes — they can find and follow the BMB path without reading full docs (NFR12)
3. **Given** a module extender encountering a handoff failure, **When** they need to diagnose missing fields, **Then** they can find a note pointing to the journey example as an implicit format reference for correct handoff structure (FR25) **And** the reference includes a placeholder path to the journey example location (to be validated after Epic 4 completes the actual journey content)

## Tasks / Subtasks

- [x] Task 1: Add forward-compatibility section to UPDATE-GUIDE.md (AC: 1)
  - [x] 1.1: Add new "## Forward Compatibility" section after the "Data Safety" section (after L126, before "## Troubleshooting" at L128)
  - [x] 1.2: Explain that existing `_bmad-output/` artifacts (planning-artifacts, implementation-artifacts, vortex-artifacts) work with updated agents without regeneration
  - [x] 1.3: Be specific about what IS backward-compatible: artifact content, handoff contract fields, workflow outputs
  - [x] 1.4: Be specific about what ISN'T backward-compatible: internal file structure (`_bmad/bme/` layout), agent definition format, workflow step-file structure — these are managed by the update system
  - [x] 1.5: Reference the PRD language: "v1.5.x artifacts were not designed *for* new agents, but the handoff contracts are backward-compatible by design"

- [x] Task 2: Add extension guidance FAQ entry to docs/faq.md (AC: 2)
  - [x] 2.1: Add new FAQ section "### How do I add a custom agent or module?" after the "Are all workflows ready to use?" section (after L90)
  - [x] 2.2: Direct users to BMB (BMAD Module Builder) as the primary extension path — the installed BMB module (`_bmad/bmb/`) has three builder agents: Bond (Agent Builder), Morgan (Module Builder), Wendy (Workflow Builder)
  - [x] 2.3: List the BMB slash commands: `/bmad-bmb-agent` (create/edit/validate agents), `/bmad-bmb-module` (create modules), `/bmad-bmb-workflow` (create workflows)
  - [x] 2.4: Mention repository fork as the alternative for users who need full control (custom npm distribution, non-standard patterns)
  - [x] 2.5: Include bloat warning: adding agents without proper structure (no handoff contracts, no Compass routing, no P0 tests) degrades the Vortex's signal-to-noise ratio (FR24)
  - [x] 2.6: Explicitly discourage hand-editing the agent registry or manifest files directly

- [x] Task 3: Add handoff failure diagnosis FAQ entry to docs/faq.md (AC: 3)
  - [x] 3.1: Add new FAQ section "### What do I do when a handoff between agents fails?" after the extension guidance FAQ
  - [x] 3.2: Explain that handoff failures usually mean the upstream agent's output is missing fields the downstream agent expects
  - [x] 3.3: Point to the journey example as an implicit format reference — it shows what well-formed artifacts look like at every handoff point
  - [x] 3.4: Include placeholder path: `_bmad-output/journey-example/` (to be created in Epic 4, Story 4-1)
  - [x] 3.5: Reference handoff contract schemas in `_bmad/bme/_vortex/config.yaml` as the authoritative field list

- [x] Task 4: Fix stale "Wave 3" and 4-agent-only content in docs/faq.md (coherence)
  - [x] 4.1: Updated "### What's coming in Wave 3?" → "### What was added in Wave 3?" — changed to past tense, corrected stream names to agent names (Mila, Liam, Noah), added workflow lists and context about filling the gap between Isla and Wade
  - [x] 4.2: Updated agent table — added Mila, Liam, Noah to Pre-implementation (Vortex) row
  - [x] 4.3: Updated handoff chain — "Emma → Isla → Mila → Liam → Wade → Noah → Max → BMAD Core"
  - [x] 4.4: Updated "Can I use agents independently?" — added Mila, Liam, Noah with standalone descriptions; changed "all four together" to "all seven together"
  - [x] 4.5: Updated "What's the recommended order?" — added Mila, Liam, Noah with entry points in the Vortex flow

- [x] Task 5: Update docs/agents.md "Journey 6: Extending the Framework" to reference BMB (AC: 2)
  - [x] 5.1: Read the current Journey 6 section (L342-353) — confirmed manual 4-step pattern
  - [x] 5.2: Rewrote to recommend BMB as primary path with `/bmad-bmb-agent` and `/bmad-bmb-module` commands
  - [x] 5.3: Added BMB slash commands and link to FAQ extension guidance entry
  - [x] 5.4: Kept 4-step explanation as "Under the hood" reference showing what BMB generates

- [x] Task 6: Validation — re-run audit and tests to verify zero regressions (AC: all)
  - [x] 6.1: `npm run docs:audit -- --json` returns `[]` — zero findings across all categories
  - [x] 6.2: `npm test` — 248 tests passing, zero failures
  - [x] 6.3: No JS files modified — lint not required
  - [x] 6.4: NFR12 compliance verified — extension guidance FAQ provides BMB slash commands with table, reachable from FAQ and agents.md Journey 6

## Dev Notes

### This is a Documentation-Only Story

No JavaScript code changes are expected. All edits are to markdown files. The audit tool and tests should continue to pass since we're adding content, not removing or changing audited patterns.

### Forward-Compatibility Section Content (from PRD)

The PRD (prd-phase2.md L380-382) provides the authoritative forward-compatibility statement:

> Existing artifacts from Emma, Isla, Wade, and Max remain usable as inputs to updated and new agents. New agents (Synthesize, Hypothesize, Sensitize) accept inputs from existing agents without requiring artifact regeneration. Note: v1.5.x artifacts were not designed *for* new agents, but the handoff contracts are backward-compatible by design.

Adapt this into user-facing language for UPDATE-GUIDE.md. Note: "Synthesize, Hypothesize, Sensitize" are the stream names — the actual agent names are Mila, Liam, Noah.

### BMB (BMAD Module Builder) — What Already Exists

BMB is fully installed at `_bmad/bmb/` with three builder agents:

| Agent | Persona | Slash Command | Capability |
|-------|---------|---------------|------------|
| Bond | Agent Builder | `/bmad-bmb-agent` | Create, edit, validate agents (tri-modal) |
| Morgan | Module Builder | `/bmad-bmb-module` | Brief, create, edit, validate modules (quad-modal) |
| Wendy | Workflow Builder | `/bmad-bmb-workflow` | Create, edit, validate workflows (tri-modal) |

**Module types** (from `_bmad/bmb/workflows/module/data/module-standards.md`):
- **Standalone Module** — Independent functionality (e.g., CIS creative innovation suite)
- **Extension Module** — Extends existing module (same code field = override, different name = add)

**BMB config:** `_bmad/bmb/config.yaml` — outputs to `_bmad-output/bmb-creations/`

### Extension Anti-Pattern to Discourage

The docs/agents.md "Journey 6" currently tells users to:
1. Add agent to registry (`scripts/update/lib/agent-registry.js`)
2. Create agent file in `_bmad/bme/_vortex/agents/`
3. Create workflow directories in `_bmad/bme/_vortex/workflows/`
4. Create user guide in `_bmad/bme/_vortex/guides/`

This is the **manual, hand-rolled approach** that FR23 explicitly wants to discourage. The rewrite should redirect to BMB while keeping the 4-step explanation as "what BMB generates for you" context.

### Stale FAQ Content to Fix

The docs/faq.md has multiple sections that still reference only 4 agents:

| Section | Line | Issue |
|---------|------|-------|
| Agent table | L12-13 | Only lists Emma, Isla, Wade, Max in Pre-implementation row |
| Handoff chain | L16 | "Emma → Isla → Wade → Max" — missing 3 agents |
| Independent use | L22-28 | Only lists 4 agents with descriptions |
| Independent use | L29 | "Use all four together" → should be seven |
| Recommended order | L37-40 | Only lists 4 agents |
| Wave 3 | L65-73 | Describes Wave 3 as FUTURE ("v1.6.0 will add") — Wave 3 is COMPLETE. Stream names wrong. |

These were not caught by the audit tool in Story 1.2 because:
- "all four together" doesn't match the "four agents" word-pattern
- The Wave 3 section uses stream names not agent counts
- The table/list content doesn't match audit numeric patterns

Fixing these is necessary for coherence when adding extension guidance alongside stale 4-agent content.

### Journey Example Placeholder

Epic 4 (Story 4-1) will create the actual journey example with real artifacts. For this story, use a placeholder path: `_bmad-output/journey-example/` and note it's "coming in Phase 2, Epic 4". The reference should still be useful — it explains *what* the journey example provides (implicit format reference for handoff structure) even before the content exists.

### Handoff Contract Reference

The authoritative handoff contract schemas are defined in `_bmad/bme/_vortex/config.yaml`. The 5 artifact contracts (HC1-HC5) define which fields each agent produces and consumes. Users debugging handoff failures should check:
1. The journey example (when available) for what correct output looks like
2. The contract schemas in config.yaml for the required field list
3. The receiving agent's workflow step-1 for what it expects as input

### Architecture Compliance

- **Language:** Markdown edits only — no JavaScript changes expected
- **Test framework:** If test expectations change: `node:test` + `node:assert/strict`
- **Linting:** Must pass `npm run lint` if any JS files are modified
- **No new dependencies**
- **Audit:** `npm run docs:audit -- --json` must return zero findings

### Critical: Content Quality Standards

- All new content must be factually accurate — verify claims against actual codebase
- Forward-compatibility section must match actual update system behavior (from `scripts/update/` code)
- BMB references must point to actual installed paths (`_bmad/bmb/`)
- Bloat warning should be informative, not hostile — explain WHY unstructured additions degrade quality
- Journey example placeholder should be clearly marked as future content

### Current Reality (from registry)

- **7 agents:** Emma, Isla, Mila, Liam, Wade, Noah, Max
- **22 workflows:** lean-persona, product-vision, contextualize-scope, empathy-map, user-interview, user-discovery, research-convergence, pivot-resynthesis, pattern-mapping, hypothesis-engineering, assumption-mapping, experiment-design, mvp, lean-experiment, proof-of-concept, proof-of-value, signal-interpretation, behavior-analysis, production-monitoring, learning-card, pivot-patch-persevere, vortex-navigation
- **Package version:** 1.6.4
- **BMB location:** `_bmad/bmb/` with 3 builder agents
- **User guide location:** `_bmad/bme/_vortex/guides/`

### Previous Story Learnings (p2-1-2)

- Context-aware editing is critical: read full paragraph, understand context, update coherently
- `npm run docs:audit -- --json` gives machine-parseable output for verification
- Test count: 248 tests (40 docs-audit + 208 existing)
- BMAD-METHOD-COMPATIBILITY.md was rewritten to match actual installer behavior — verify claims against code
- docs/testing.md had a false positive ("3 workflow" was Isla's count) — verify context before changing numbers
- Code review found 5 issues in Story 1.2: section titles, historical context, file counts, wording specificity, test documentation

### Files to Edit

- UPDATE-GUIDE.md (MODIFY — add forward-compatibility section)
- docs/faq.md (MODIFY — add extension guidance FAQs, fix stale 4-agent content, fix stale Wave 3 section)
- docs/agents.md (MODIFY — update Journey 6 to recommend BMB over hand-rolled approach)

### Project Structure Notes

- All edits are to existing user-facing docs — no new files created
- BMB module is already installed at `_bmad/bmb/` — no changes to BMB itself
- The docs-audit tool is NOT modified in this story
- Journey example content is NOT created in this story — only a placeholder reference

### References

- [Source: _bmad-output/planning-artifacts/epics-phase2.md — Epic 1, Story 1.3, lines 260-283]
- [Source: _bmad-output/planning-artifacts/prd-phase2.md — FR6, FR23, FR24, FR25, NFR12]
- [Source: _bmad-output/planning-artifacts/prd-phase2.md — Forward Compatibility section, lines 380-382]
- [Source: _bmad-output/planning-artifacts/prd-phase2.md — Kai's Journey (J4), lines 224-235]
- [Source: _bmad-output/planning-artifacts/prd-phase2.md — Tomás's Journey (J2), lines 193-201]
- [Source: _bmad-output/planning-artifacts/prd-phase2.md — File scope table, lines 371-378]
- [Source: _bmad/bmb/config.yaml — BMB configuration]
- [Source: _bmad/bmb/agents/ — Bond, Morgan, Wendy agent definitions]
- [Source: _bmad/bmb/workflows/module/data/module-standards.md — Module types]
- [Source: docs/agents.md — Journey 6: Extending the Framework, lines 342-353]
- [Source: _bmad-output/implementation-artifacts/p2-1-2-execute-docs-fix-pass-1-stale-references-broken-links.md — Previous story learnings]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

### Completion Notes List

- Added "## Forward Compatibility" section to UPDATE-GUIDE.md with two subsections: "Your Artifacts Survive Updates" (what's backward-compatible) and "What Is Managed by the Update System" (what changes between versions). Adapted PRD forward-compat language into user-facing content.
- Added "How do I add a custom agent or module?" FAQ with BMB builder table (Bond/Morgan/Wendy + slash commands), fork alternative, and bloat warning explaining why unstructured additions degrade Vortex signal quality
- Added "What do I do when a handoff between agents fails?" FAQ with 3-step diagnosis approach, journey example placeholder path, and handoff contract schema reference
- Fixed 5 stale FAQ sections: agent table (4→7 agents), handoff chain (added Mila/Liam/Noah), independent use (added 3 agents, "four"→"seven"), recommended order (added 3 agents with entry points), Wave 3 section (future tense→past tense, stream names→agent names)
- Updated docs/agents.md Journey 6: reframed from manual 4-step pattern to BMB-first approach with manual steps as "under the hood" context
- Validation: `npm run docs:audit -- --json` returns `[]`, `npm test` 248/248 pass

### Change Log

- 2026-02-28: Story implementation complete — all 6 tasks, 3 files modified, zero regressions
- 2026-02-28: Code review — 4 issues found (1H, 3M), all fixed. Audit + tests still pass.

### File List

- UPDATE-GUIDE.md (MODIFIED — added Forward Compatibility section with 2 subsections)
- docs/faq.md (MODIFIED — added 2 new FAQ entries, fixed 5 stale sections referencing only 4 agents)
- docs/agents.md (MODIFIED — rewrote Journey 6 to recommend BMB over manual approach)
