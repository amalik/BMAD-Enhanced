# Story 4.1: Reserve npm Package Name

Status: ready-for-dev

## Story

As a maintainer,
I want the `convoke-agents` package name reserved on npm before any public deprecation notice,
So that users who see the deprecation can actually find the new package.

## Acceptance Criteria

1. **Given** the `convoke-agents` name is available on npm
   **When** a placeholder package is published
   **Then** `convoke-agents@0.0.1` exists on npm
   **And** the package has a "Coming soon" description/README
   **And** this is done BEFORE any deprecation notice on `bmad-enhanced` (NFR5 sequencing)

2. **Given** the placeholder is published
   **When** a user runs `npm info convoke-agents`
   **Then** the package metadata shows the correct author, license (MIT), and repository URL (`github.com/amalik/convoke-agents`)

3. **Given** the placeholder is published
   **When** verified
   **Then** `npm view convoke-agents version` returns `0.0.1`
   **And** `npm view convoke-agents description` shows a transitional "coming soon" message

## Tasks / Subtasks

- [ ] Task 1: Verify npm name availability (AC: #1)
  - [ ] 1.1: Run `npm info convoke-agents` and confirm it returns a 404 / "not found"
  - [ ] 1.2: If already taken, HALT — course correction required

- [ ] Task 2: Create temporary placeholder directory (AC: #1, #2)
  - [ ] 2.1: Create a temporary directory outside the main repo (e.g., `/tmp/convoke-agents-placeholder`)
  - [ ] 2.2: Create `package.json` with:
    - `"name": "convoke-agents"`
    - `"version": "0.0.1"`
    - `"description": "Agent teams for complex systems — coming soon. Successor to bmad-enhanced."`
    - `"license": "MIT"`
    - `"author": "Convoke Contributors"`
    - `"repository": { "type": "git", "url": "git+https://github.com/amalik/convoke-agents.git" }`
    - `"bugs": { "url": "https://github.com/amalik/convoke-agents/issues" }`
    - `"homepage": "https://github.com/amalik/convoke-agents#readme"`
    - `"keywords": ["convoke-agents", "bmad-enhanced", "agents", "vortex"]`
  - [ ] 2.3: Create `README.md` with:
    - Package name and "Coming soon" header
    - Brief description: "Successor to `bmad-enhanced`. Full release coming as `convoke-agents@2.0.0`."
    - Link to the GitHub repository
    - Note: "If you're looking for the current stable package, install `bmad-enhanced`."

- [ ] Task 3: Publish placeholder to npm (AC: #1, #2)
  - [ ] 3.1: Verify npm login: `npm whoami` (must be logged in)
  - [ ] 3.2: From the placeholder directory, run `npm publish`
  - [ ] 3.3: Verify publication: `npm view convoke-agents version` returns `0.0.1`
  - [ ] 3.4: Verify metadata: `npm info convoke-agents` shows correct author, license, repository

- [ ] Task 4: Cleanup (AC: #1)
  - [ ] 4.1: Remove the temporary placeholder directory
  - [ ] 4.2: No changes to the main repository are needed for this story

## Dev Notes

### Critical Context

**NFR5 sequencing is paramount.** This story MUST be completed BEFORE Story 4.2 (publish deprecation version of bmad-enhanced). The deprecation notice on `bmad-enhanced` will tell users to `npm install convoke-agents` — if the package doesn't exist yet, users hit a dead end.

**This is an operational story, not a code change.** No files in the main repository are modified. The placeholder is created in a temporary directory, published to npm, and the temp directory is deleted.

**Package name context:** The original plan used `convoke` as the npm name, but it was already taken (`convoke@0.9.1` by `ahelmberger`). Course correction changed to `convoke-agents`. Story 4.0 already updated all codebase references.

### What Does NOT Change

- No files in the main BMAD-Enhanced/Convoke repository
- No version bump of the main package
- No git commits needed (the placeholder is ephemeral)

### Verification After Publication

```bash
# Confirm the package exists
npm view convoke-agents version
# Expected: 0.0.1

npm info convoke-agents
# Expected: correct metadata (author, license, repo)

# Confirm it's installable
npm pack convoke-agents
# Expected: downloads the tarball
```

### Previous Story Intelligence

**From Story 4.0:**
- Package name is confirmed as `convoke-agents` throughout the codebase
- `package.json` already has `"name": "convoke-agents"` for v2.0.0
- Repository URL confirmed as `github.com/amalik/convoke-agents`
- The placeholder package.json should mirror the main package's metadata (author, license, repo) for consistency

**From Sprint Change Proposal:**
- NFR5 explicitly requires the placeholder BEFORE deprecation
- The placeholder's `description` should signal that this is transitional

### References

- [Source: _bmad-output/planning-artifacts/epics-phase3.md#Story 4.1, lines 501-514]
- [Source: _bmad-output/planning-artifacts/epics-phase3.md#NFR5, line 89]
- [Source: _bmad-output/planning-artifacts/sprint-change-proposal-2026-03-07.md — Course correction context]
- [Source: _bmad-output/implementation-artifacts/p3-4-0-update-npm-package-name-repo-url-to-convoke-agents.md — Story 4.0 completion confirms package name]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
