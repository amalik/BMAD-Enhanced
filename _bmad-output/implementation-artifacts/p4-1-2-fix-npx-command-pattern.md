# Story 1.2: Fix npx Command Pattern in postinstall.js

Status: ready-for-dev

## Story

As a **Convoke user running npm install**,
I want the postinstall output to show correct `npx -p convoke-agents convoke-*` commands,
so that I can copy-paste them without getting "package not found" errors.

## Acceptance Criteria

1. All 4 npx references in `scripts/postinstall.js` use the `npx -p convoke-agents convoke-*` pattern
2. No `npx convoke-*` patterns remain without the `-p convoke-agents` prefix

## Tasks / Subtasks

- [ ] Task 1: Update all npx command strings in postinstall.js (AC: #1, #2)
  - [ ] 1.1: Line 43 — change `npx convoke-install` to `npx -p convoke-agents convoke-install`
  - [ ] 1.2: Line 76 — change `npx convoke-update --dry-run` to `npx -p convoke-agents convoke-update --dry-run`
  - [ ] 1.3: Line 79 — change `npx convoke-update` to `npx -p convoke-agents convoke-update`
  - [ ] 1.4: Line 97 — change `npx convoke-install` to `npx -p convoke-agents convoke-install`
- [ ] Task 2: Verify no stale patterns remain (AC: #2)
  - [ ] 2.1: Search `scripts/postinstall.js` for any remaining `npx convoke-` without `-p` prefix

## Dev Notes

- These are **console.log display strings only** — not executable calls. The change is purely cosmetic in terminal output.
- The file is `scripts/postinstall.js` (105 lines total)
- All 4 occurrences are inside template literals with ANSI color codes (`${CYAN}...${RESET}`)
- The `-p convoke-agents` flag tells npx which package provides the binary, required because the npm package name (`convoke-agents`) differs from the binary names (`convoke-install`, `convoke-update`)

### Exact strings to find and replace

```
Line 43:  `  ${CYAN}npx convoke-install${RESET}  - Install all agents (${agentNames})`
Line 76:  `  ${CYAN}npx convoke-update --dry-run${RESET}`
Line 79:  `  ${CYAN}npx convoke-update${RESET}`
Line 97:  `  ${CYAN}npx convoke-install${RESET}  - Install all agents (${agentNames})`
```

Replace with:
```
Line 43:  `  ${CYAN}npx -p convoke-agents convoke-install${RESET}  - Install all agents (${agentNames})`
Line 76:  `  ${CYAN}npx -p convoke-agents convoke-update --dry-run${RESET}`
Line 79:  `  ${CYAN}npx -p convoke-agents convoke-update${RESET}`
Line 97:  `  ${CYAN}npx -p convoke-agents convoke-install${RESET}  - Install all agents (${agentNames})`
```

### Project Structure Notes

- Single file change: `scripts/postinstall.js`
- No test file changes needed (existing postinstall tests assert on script execution, not output strings)
- No alignment issues with other modules

### References

- [Source: _bmad-output/planning-artifacts/epics-top5.md — Story 1.2]
- [Source: _bmad-output/planning-artifacts/initiatives-backlog.md — Initiative U5 (score 4.0)]
- [Source: scripts/postinstall.js lines 43, 76, 79, 97]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
