---
step: 1
workflow: full-analysis
title: Initialize Analysis
---

# Step 1: Initialize Analysis

Set up the `.gyre/` directory and detect the analysis mode.

## MANDATORY EXECUTION RULES

- Use Claude Code tools (Glob, Read) — do NOT ask the user for filesystem information
- Create `.gyre/` at the project root (or service root in monorepo) if it doesn't exist
- Detect mode automatically — only ask the user if regeneration intent is ambiguous

## INITIALIZATION SEQUENCE

### 1. Check for Existing `.gyre/` Directory

**Glob** for `.gyre/` at the project root:
- `.gyre/stack-profile.yaml` → GC1 exists (previous detection)
- `.gyre/capabilities.yaml` → GC2 exists (previous model generation)
- `.gyre/findings.yaml` → GC3 exists (previous analysis)
- `.gyre/.lock` → Concurrent analysis guard (NFR13)

### 2. Detect Analysis Mode

Based on what exists in `.gyre/`:

| Condition | Mode | Behavior |
|-----------|------|----------|
| `.gyre/` does not exist | **Crisis** | First run — create directory, run full pipeline |
| `.gyre/capabilities.yaml` exists | **Anticipation** | Re-run — skip model generation (step 3), use cached model |
| User explicitly says "regenerate" or "fresh" | **Regeneration** | Fresh model — ignore cache, run full pipeline |

### 3. Lock File Check (NFR13)

If `.gyre/.lock` exists:
- Read the lock file for timestamp and process info
- If older than 5 minutes: warn the user, suggest removing it
- If recent: inform the user another analysis may be in progress, ask to proceed or wait

### 4. Create `.gyre/` Directory

If `.gyre/` doesn't exist, create it.

### 5. Report Initialization

Present the initialization status conversationally:

```
## Analysis Initialized

**Mode:** [Crisis / Anticipation / Regeneration]
**Directory:** .gyre/ [created / already exists]
**Existing artifacts:** [list any found, or "none — first run"]

Starting stack detection...
```

---

## NEXT STEP

Proceed to stack detection:

Load step: {project-root}/_bmad/bme/_gyre/workflows/full-analysis/steps/step-02-detect-stack.md
