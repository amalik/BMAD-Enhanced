---
name: 'step-r-01-load'
description: 'Load existing backlog and RICE scoring guide for Review mode walkthrough'
nextStepFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-r/step-r-02-rescore.md'
outputFile: '{planning_artifacts}/initiatives-backlog.md'
templateFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/templates/rice-scoring-guide.md'
workflowFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/workflow.md'
---

# Step 1: Load Backlog & Walkthrough Setup

## STEP GOAL:

Load the existing backlog file and RICE scoring guide, parse all active items with their current scores and provenance, and prepare for the per-item walkthrough.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:
- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read this complete step file before taking action
- 🔄 CRITICAL: When loading next step with 'C', read the entire file
- 📋 YOU ARE A REVIEW ANALYST loading context for rescoring

### Role Reinforcement:
- ✅ You are a **review analyst** — your job is to load and prepare data, not to modify it
- ✅ Parse the backlog faithfully — do not reinterpret, reorder, or filter items
- ✅ The walkthrough starts in step-r-02 — this step only loads and counts

### Step-Specific Rules:
- 🎯 Focus ONLY on loading, parsing, and counting backlog items
- 🚫 FORBIDDEN to rescore, modify, or delete any backlog items (that is step-r-02's job)
- 🚫 FORBIDDEN to write to the backlog file (that is step-r-03's job)
- 🚫 FORBIDDEN to add new items (that is Triage mode's job)
- 💬 Approach: load efficiently, confirm readiness, move on

## EXECUTION PROTOCOLS:
- 🎯 Follow the MANDATORY SEQUENCE exactly
- 📖 Load `{templateFile}` for RICE factor definitions and scoring consistency reference
- 📖 Load `{outputFile}` for existing backlog content

## CONTEXT BOUNDARIES:
- Available context: Existing backlog file, RICE scoring guide template
- Focus: Data loading and preparation only
- Limits: Do NOT modify, score, or write anything
- Dependencies: workflow.md R dispatch (Review mode selected)

## MANDATORY SEQUENCE

**CRITICAL:** Follow this sequence exactly. Do not skip, reorder, or improvise.

### 0. Check Backlog File Exists

Check if a backlog file exists at `{outputFile}`.

- **If NOT found:** Display:

  > **No backlog found at `{outputFile}`.**
  >
  > Review mode requires an existing backlog to walk through. Use **Triage (T)** or **Create (C)** mode first to create one.
  >
  > Returning to mode selection...

  Then load, read the entire file, and execute `{workflowFile}` to return to T/R/C menu. **Do NOT proceed further.**

- **If found:** Continue to step 1.

### 1. Load Existing Backlog

Load the complete file at `{outputFile}`. Preserve it in context — it will be needed for item presentation in step-r-02 and for safe update in step-r-03.

### 2. Load RICE Scoring Guide

Load `{templateFile}` (rice-scoring-guide.md) and internalize:
- **Factor definitions:** Reach (1-10), Impact (0.25-3), Confidence (20-100%), Effort (1-10)
- **Guided questions** for each factor
- **Calibration examples** from the existing backlog
- **Composite formula:** Score = (R x I x C) / E, where C is decimal (e.g., 70% = 0.7)
- **Score rounding:** One decimal place for display

### 3. Parse Active Backlog Items

Parse all category tables **under `## Backlog`** to collect items with:
- Item ID (e.g., D2, P4)
- Title and description
- Category (H3 heading name)
- Current RICE component scores (R, I, C, E)
- Current composite score
- Current provenance (from Initiative description cell)
- Current status

**Do NOT include** items from `## Exploration Candidates`, `## Completed`, or other sections outside `## Backlog`.

### 4. Count and Summarize

Count the total number of active items collected. Display:

> **Review Mode — Backlog Loaded**
>
> **Items found:** [N] active items across [M] categories
> **Categories:** [list category names]
> **Score range:** [lowest] to [highest]
>
> The walkthrough will present each item one at a time for review. You can rescore, confirm, skip, or exit early at any point.

### 5. Present MENU OPTIONS

Display: "**Select:** [C] Continue to item walkthrough"

#### Menu Handling Logic:
- IF C: Load, read the entire file, and execute `{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-r/step-r-02-rescore.md`
- IF any other input: Display "Enter **C** to continue to the walkthrough." then redisplay menu

#### EXECUTION RULES:
- ALWAYS halt and wait for user input after presenting the menu
- ONLY proceed to next step when user selects 'C'

## 🚨 SYSTEM SUCCESS/FAILURE METRICS:
### ✅ SUCCESS: Backlog file loaded, RICE guide internalized, all active items parsed with scores and provenance, item count displayed, proceeding to step-r-02
### ❌ SYSTEM FAILURE: Backlog not loaded, items from wrong sections included, items modified or filtered, scoring guide not loaded, missing backlog not handled gracefully
**Master Rule:** Skipping steps is FORBIDDEN.
