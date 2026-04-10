# Epic 6: Skill Portability UX — Slash Command Wrappers

**Initiative:** Skill Portability & Distribution
**Prerequisite:** Epics 1-5 (complete — all scripts exist and work)
**Goal:** Wrap all portability CLI scripts as BMAD slash-command skills so users interact via the chatbox, not the terminal.

---

## Problem

Epics 1-5 delivered the portability engine, CLI, catalog generator, seed script, and validator — but all as `node scripts/portability/...` CLI commands. The BMAD experience is slash-command-driven: users type `/bmad-portfolio` or `/bmad-migrate-artifacts`, not `node scripts/...`. The portability tools break this pattern.

**Pattern to follow:** artifact governance's skill wrappers (`bmad-migrate-artifacts`, `bmad-portfolio-status`) — a thin `SKILL.md` with frontmatter + a `workflow.md` that calls the script and presents results conversationally.

---

## Stories

### Story 6.1: Export Skill Wrapper

As a user,
I want to type `/bmad-export-skill bmad-brainstorming` to export a skill,
so that I don't need to remember CLI flags or file paths.

**Acceptance Criteria:**

- A skill exists at `.claude/skills/bmad-export-skill/` with `SKILL.md` + `workflow.md`
- The workflow prompts for: skill name (required), output directory (default: `./exported-skills/`), dry-run (y/n)
- It calls `convoke-export.js` under the hood and presents results (success/failure, file paths, warnings count)
- Registered in `skill-manifest.csv` with tier=`pipeline`, intent=`meta-platform`
- The user never sees raw CLI output — the skill formats it conversationally

### Story 6.2: Catalog & Seed Skill Wrapper

As a user,
I want to type `/bmad-generate-catalog` to generate the catalog README, and `/bmad-seed-catalog` to seed the full repo staging directory,
so that I can produce the catalog repo content through guided conversation.

**Acceptance Criteria:**

- Two skills exist: `bmad-generate-catalog` and `bmad-seed-catalog`
- `bmad-generate-catalog` prompts for output path (default: stdout preview), runs `catalog-generator.js`, shows a preview of the first 30 lines, asks to confirm file write
- `bmad-seed-catalog` prompts for staging directory path (required — no default, per sp-4-1 safety), warns about expected duration, runs `seed-catalog-repo.js`, reports verification results, shows next-steps for git init + push
- Both registered in `skill-manifest.csv`

### Story 6.3: Validate Exports Skill Wrapper

As a user,
I want to type `/bmad-validate-exports` to validate an exported staging directory,
so that I can check export quality through the chatbox.

**Acceptance Criteria:**

- A skill exists at `.claude/skills/bmad-validate-exports/` with `SKILL.md` + `workflow.md`
- The workflow prompts for: staging directory path (required)
- It calls `validate-exports.js` and presents: pass/fail summary, issue count, per-skill issues (if any)
- Optionally generates `VALIDATION-REPORT.md` (asks user if they want it)
- Shows the manual smoke test checklist from the report for the user to fill in

### Story 6.4: Skill Registration & Discovery

As a user,
I want the new portability skills to appear in the help menu and be discoverable via `/bmad-help`,
so that I know they exist without reading documentation.

**Acceptance Criteria:**

- All 4 new skills registered in `skill-manifest.csv` with correct tier, intent, and dependencies
- All 4 skills have `.claude/skills/<name>/SKILL.md` with frontmatter (name, description with "Use when..." trigger phrases)
- Running `/bmad-help` or asking "what can I do?" lists the portability skills alongside existing ones
- Each skill's description is clear enough that a user can identify its purpose from the list

---

## Architecture Notes

### Skill wrapper pattern (from artifact governance)

```
.claude/skills/bmad-export-skill/
  SKILL.md          ← frontmatter (name, description) + load directive
  workflow.md       ← conversational workflow that calls the script

_bmad/bme/_portability/workflows/bmad-export-skill/
  SKILL.md          ← module-side copy (for convoke-install)
  workflow.md       ← same workflow
```

The `.claude/skills/` path is what Claude Code reads. The `_bmad/bme/` path is what `convoke-install` copies during setup. Both must exist.

### Namespace decision

These skills belong to the **portability module** (not core, not BMM). If a `_bmad/bme/_portability/` module directory doesn't exist yet, Story 6.4 creates it following the Enhance module pattern.

Alternatively, since the portability scripts already live at `scripts/portability/`, the workflow files can reference them directly without a module copy. The `.claude/skills/` SKILL.md uses the `LOAD workflow.md` directive pointing to the local workflow. This is simpler than creating a full module — dev's judgment call in Story 6.1.

### Script wrappers are thin

The workflow calls the script via `node scripts/portability/<script>.js <args>` and parses the output. It does NOT duplicate script logic. The workflow's job is:
1. Prompt for parameters
2. Confirm the action
3. Run the script
4. Format the output conversationally
5. Suggest next steps

### No new scripts

All engine work is done (Epics 1-5). This epic only creates SKILL.md + workflow.md files and manifest entries. Zero changes to the portability scripts themselves.
