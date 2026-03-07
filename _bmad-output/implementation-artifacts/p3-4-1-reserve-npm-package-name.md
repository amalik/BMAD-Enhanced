# Story 4.1: Reserve npm Package Name

Status: ready-for-dev

## Story

As a maintainer,
I want the `convoke` package name reserved on npm before any public deprecation notice,
So that users who see the deprecation can actually find the new package.

## Acceptance Criteria

1. **Given** the `convoke` name is available on npm
   **When** a placeholder package is published
   **Then** `convoke@0.0.1` exists on npm with a "Coming soon" README
   **And** this is done BEFORE any deprecation notice on `bmad-enhanced`

2. **Given** `convoke@0.0.1` is published
   **When** a user runs `npm info convoke`
   **Then** the package exists and shows version 0.0.1
   **And** the description indicates it's a placeholder for the upcoming Convoke release

3. **Given** the placeholder package
   **When** its contents are inspected
   **Then** it contains only a minimal `package.json` and a `README.md`
   **And** it does NOT contain any source code from the main repo
   **And** it does NOT set up any `bin` commands that could conflict with the future `convoke@2.0.0` release

## Tasks / Subtasks

- [ ] Task 1: Check npm name availability (AC: #1)
  - [ ] 1.1: Run `npm info convoke` — verify returns 404 / "not found" (name is available)
  - [ ] 1.2: If name is taken, HALT and escalate to user — the entire Phase 3 plan depends on this name

- [ ] Task 2: Create placeholder package (AC: #1, #3)
  - [ ] 2.1: Create a temporary directory (NOT in the main repo) for the placeholder
  - [ ] 2.2: Create minimal `package.json`:
    ```json
    {
      "name": "convoke",
      "version": "0.0.1",
      "description": "Agent teams for complex systems, compatible with BMad Method. Coming soon — v2.0.0 release in progress.",
      "keywords": ["convoke", "bmad", "agents", "agentic", "vortex"],
      "author": "Convoke Contributors",
      "license": "MIT",
      "repository": {
        "type": "git",
        "url": "git+https://github.com/amalik/convoke.git"
      }
    }
    ```
  - [ ] 2.3: Create minimal `README.md`:
    ```markdown
    # Convoke

    Agent teams for complex systems, compatible with BMad Method.

    **This is a placeholder package.** The full release (`convoke@2.0.0`) is coming soon.

    If you're looking for the current version, install `bmad-enhanced` (which will be renamed to `convoke` in v2.0.0).
    ```

- [ ] Task 3: Publish placeholder (AC: #1, #2)
  - [ ] 3.1: Verify npm login: `npm whoami` — confirm logged in as the correct user
  - [ ] 3.2: From the temp directory, run `npm publish` to publish `convoke@0.0.1`
  - [ ] 3.3: Verify publication: `npm info convoke` — confirm version 0.0.1 exists

- [ ] Task 4: Post-publish verification (AC: #2, #3)
  - [ ] 4.1: Run `npm info convoke version` — should return `0.0.1`
  - [ ] 4.2: Run `npm info convoke description` — should show the placeholder description
  - [ ] 4.3: Verify no `bin` field exists: `npm info convoke bin` — should return empty/undefined
  - [ ] 4.4: Clean up the temporary directory

## Dev Notes

### Critical Context

**This is a MANUAL/OPERATIONAL story, not a code change story.** No files in the main repo are modified (except this story file and sprint-status.yaml). The placeholder package is created in a temporary directory, published to npm, and then the temp directory is deleted.

**NFR5 is the driving constraint:** `convoke@0.0.1` MUST exist on npm BEFORE `bmad-enhanced@1.8.0` deprecation notice is published (Story 4.2). If we publish the deprecation first, users will see "Renamed to convoke" but `npm install convoke` will fail — terrible UX.

**Sequencing is critical:**
1. Story 4.1: Publish `convoke@0.0.1` placeholder (THIS STORY)
2. Story 4.2: Publish `bmad-enhanced@1.8.0` with deprecation banner
3. Story 4.3: Final verification and publish `convoke@2.0.0`

### npm Publish Requirements

- Must be logged into npm with an account that has publish permissions
- The `convoke` package name must not already be taken
- The placeholder must NOT include any `bin` entries — those come with v2.0.0
- The `repository.url` should point to `github.com/amalik/convoke` even though the repo hasn't been renamed yet (GitHub will redirect after rename)

### What This Story Does NOT Do

- Does NOT modify any files in the main repo (no code changes)
- Does NOT publish the actual Convoke v2.0.0 product (that's Story 4.3)
- Does NOT deprecate `bmad-enhanced` (that's Story 4.2)
- Does NOT rename the GitHub repository (that's Story 4.3)
- Does NOT require `npm test` or docs-audit — no repo files change

### Previous Story Intelligence

**From Epic 3 Retrospective:**
- All Phase 3 rename work is mechanically complete — Epic 4 is purely operational
- No tech debt carry-forward from Epic 3
- PSI compounding confirmed across 5 consecutive epics
- 100% previous retro follow-through

**From Story 3.3:**
- The largest and most complex story in Phase 3 is behind us
- All verification commands confirm zero stale references
- 315/315 tests pass

**From epics-phase3.md (Story 4.1 definition):**
- "Temporary placeholder package (not in main repo)" — files are ephemeral
- The placeholder secures the name, nothing more

### Risk Assessment

- **Name already taken:** If `convoke` is already on npm, the entire Phase 3 rename plan must be revisited. Check FIRST before creating any files.
- **Publish permissions:** Requires npm account with publish access. Verify with `npm whoami` before attempting.
- **Accidental bin entries:** The placeholder must NOT register any CLI commands — that would conflict with v2.0.0's `bin` entries during the transition period.

### References

- [Source: _bmad-output/planning-artifacts/epics-phase3.md#Story 4.1, lines 475-489]
- [Source: _bmad-output/planning-artifacts/epics-phase3.md#Epic 4 overview, lines 471-473]
- [Source: _bmad-output/planning-artifacts/epics-phase3.md#NFR5, line 89]
- [Source: _bmad-output/implementation-artifacts/p3-epic-3-retro-2026-03-07.md — Epic 3 retro, no blockers for Epic 4]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
