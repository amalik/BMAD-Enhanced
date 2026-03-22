# Story S3: Install BME Slash Commands with Vortex

Status: done

## Story

As a Claude Code user installing Convoke,
I want the Vortex agent slash commands to be created automatically during `convoke-install-vortex`,
so that I can activate any Vortex agent with `/bmad-agent-bme-*` without manual file creation.

## Acceptance Criteria

1. **AC1: Command files created during install** — Running `npx -p convoke-agents convoke-install-vortex` creates 7 `.claude/commands/bmad-agent-bme-*.md` files in the user's project root
2. **AC2: Command file content matches template** — Each generated file follows the exact pattern: frontmatter with name/description, activation block pointing to `{project-root}/_bmad/bme/_vortex/agents/{agent-id}.md`
3. **AC3: Idempotent on re-install** — Running the installer again overwrites command files cleanly without errors or duplicates
4. **AC4: Update path also creates commands** — `convoke-update` via `refreshInstallation()` also creates/refreshes the command files
5. **AC5: Verification step checks commands** — The `verifyInstallation()` step confirms all 7 command files exist
6. **AC6: Tests pass** — Existing tests continue to pass; new tests cover command file creation

## Tasks / Subtasks

- [x] Task 1: Add command file generation to `refreshInstallation()` (AC: 1, 2, 4)
  - [x] 1.1 Add section 6 in `refresh-installation.js` after user guides: generate `.claude/commands/bmad-agent-bme-{id}.md` for each agent in `AGENTS` array. Derive filename with `bmad-agent-bme-${agent.id}.md` — no new constant needed in agent-registry.
  - [x] 1.2 Always generate command files regardless of `isSameRoot` (unlike agents/workflows, `.claude/` is gitignored and won't exist even in dev after a fresh clone)
  - [x] 1.3 Template content: frontmatter (name, description) + activation block referencing agent path
  - [x] 1.4 Push to `changes` array for each file created (e.g., `changes.push('Created command: bmad-agent-bme-{id}.md')`)

- [x] Task 2: Update installer and verification (AC: 3, 5)
  - [x] 2.1 Add command file checks to `verifyInstallation()` in `install-vortex-agents.js`
  - [x] 2.2 Update `printSuccess()` to show slash commands as the primary activation method
  - [x] 2.3 No `convoke-doctor` change needed — verification at install time (AC5) is sufficient; doctor validates core module integrity, not IDE integration files

- [x] Task 3: Tests (AC: 6)
  - [x] 3.1 Add tests in `tests/integration/fresh-install.test.js` verifying 7 command files are created with correct content
  - [x] 3.2 Verify idempotency: running refresh twice produces same result

## Dev Notes

### Architecture Compliance

- **Single source of truth**: Use `AGENTS` array from `agent-registry.js` — do NOT hardcode agent IDs in the command generation code
- **Pattern**: Follow the existing refresh-installation pattern exactly (sections 1-5 are: agents, workflows, config, manifest, guides → add section 6: commands)
- **`isSameRoot` guard**: Command generation always runs regardless of `isSameRoot` (`.claude/` is gitignored and won't exist even in dev after a fresh clone)
- **No `process.cwd()`**: Use the `projectRoot` parameter passed to `refreshInstallation()`

### Command File Template

Each generated file must match this exact pattern:

```markdown
---
name: '{agent-id}'
description: '{agent-id} agent'
---

You must fully embody this agent's persona and follow all activation instructions exactly as specified. NEVER break character until given an exit command.

<agent-activation CRITICAL="TRUE">
1. LOAD the FULL agent file from {project-root}/_bmad/bme/_vortex/agents/{agent-id}.md
2. READ its entire contents - this contains the complete agent persona, menu, and instructions
3. FOLLOW every step in the <activation> section precisely
4. DISPLAY the welcome/greeting as instructed
5. PRESENT the numbered menu
6. WAIT for user input before proceeding
</agent-activation>
```

Where `{agent-id}` comes from `AGENTS[n].id` (e.g., `contextualization-expert`).

### File Paths

- **Command file destination**: `{projectRoot}/.claude/commands/bmad-agent-bme-{agent-id}.md`
- **Agent registry**: `scripts/update/lib/agent-registry.js`
- **Refresh installation**: `scripts/update/lib/refresh-installation.js`
- **Installer**: `scripts/install-vortex-agents.js`
- **Existing tests**: `tests/integration/fresh-install.test.js`

### Project Structure Notes

- `.claude/` directory is gitignored — command files are generated locally per-project, not tracked in git
- The `.claude/commands/` directory may not exist yet — use `fs.ensureDir()` before writing
- Other modules (BMM, CIS, BMB, TEA, Core) have their own command files managed by the BMAD Core installer — only create `bmad-agent-bme-*` files, never touch other modules' commands

### Key Constraints

- Do NOT add command files to `package.json` `files` field — they are generated, not shipped
- Do NOT modify `.gitignore` — `.claude/` is already ignored
- The 7 agents are defined in `AGENTS` array in agent-registry.js — iterate over that, don't hardcode

### References

- [Source: scripts/update/lib/refresh-installation.js] — existing refresh pattern (sections 1-5)
- [Source: scripts/update/lib/agent-registry.js] — AGENTS, AGENT_FILES, AGENT_IDS constants
- [Source: scripts/install-vortex-agents.js] — installer orchestration and verification
- [Source: .claude/commands/bmad-agent-bme-contextualization-expert.md] — reference command file pattern
- [Source: _bmad-output/planning-artifacts/initiatives-backlog.md#S3] — initiative definition

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Debug Log References
None

### Completion Notes List
- Section 6 added to `refreshInstallation()` — generates 7 `.claude/commands/bmad-agent-bme-*.md` files from AGENTS array
- Always generates regardless of `isSameRoot` since `.claude/` is gitignored
- `verifyInstallation()` now checks for all 7 command files
- `printSuccess()` shows slash commands as primary activation method, `cat` as fallback
- 4 new tests: all 7 created, correct frontmatter, correct agent path, idempotency (full content equality)
- All 42 integration tests pass (4 new + 38 existing)

### Code Review Fixes Applied
- Added stale command file cleanup (removes `bmad-agent-bme-*` files not in current AGENTS registry)
- Strengthened idempotency test to compare full content before/after (not just existence)
- Added changes array assertion for command entries in "returns a list of changes" test
- Consistent verb: `Refreshed command:` instead of `Created command:` (matches sections 1-5 pattern)
- Fixed contradictory Dev Notes re: isSameRoot behavior

### File List
- `scripts/update/lib/refresh-installation.js` — Added section 6: command file generation + stale cleanup
- `scripts/install-vortex-agents.js` — Updated `verifyInstallation()` and `printSuccess()`
- `tests/integration/fresh-install.test.js` — Added 4 tests for command file creation
