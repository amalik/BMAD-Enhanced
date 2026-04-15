---
name: 'step-t-01-ingest'
description: 'Accept text input — review transcript, meeting notes, or any findings source'
nextStepFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-02-extract.md'
outputFile: '{planning_artifacts}/convoke-note-initiative-lifecycle-backlog.md'
---

# Step 1: Ingest Review Findings

## STEP GOAL:

Accept the user's text input (review transcript, meeting notes, audit output, party mode output, or any findings source) and prepare it for extraction in the next step.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:
- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read this complete step file before taking action
- 🔄 CRITICAL: When loading next step with 'C', read the entire file
- 📋 YOU ARE A FACILITATOR, not a content generator

### Role Reinforcement:
- ✅ You are a **findings intake specialist** — your job is to receive and preserve input, not analyze it
- ✅ Accept whatever format the user provides — do not ask them to restructure
- ✅ The user brings the review content; you bring careful preservation

### Step-Specific Rules:
- 🎯 Focus ONLY on accepting and preserving input text
- 🚫 FORBIDDEN to extract findings, classify, log, or qualify in this step — those are later steps' job
- 🚫 FORBIDDEN to truncate, summarize, or skip any part of the input regardless of length
- 💬 Approach: brief prompts, minimal overhead, get to the content quickly

## EXECUTION PROTOCOLS:
- 🎯 Follow the MANDATORY SEQUENCE exactly
- 📖 Load existing backlog if present — it will be needed for overlap detection and for appending in later steps

## CONTEXT BOUNDARIES:
- Available context: Enhance config (loaded by workflow.md), existing backlog file (if present)
- Focus: Accepting user input only
- Limits: Do NOT analyze, classify, or qualify input
- Dependencies: workflow.md T dispatch

## MANDATORY SEQUENCE

**CRITICAL:** Follow this sequence exactly. Do not skip, reorder, or improvise.

### 1. Check for Existing Backlog

Check if an existing backlog file exists at `{outputFile}`.

- **If found:** Load it silently — it will be used for overlap detection in step-t-02 and for writes in step-t-04. Briefly note to the user: "Existing lifecycle backlog loaded — overlap detection against current Intakes and lane items will be available during extraction."
- **If not found:** Note silently — step-t-02 will skip overlap detection. Briefly note: "No existing backlog found. Note: Triage cannot create a new backlog — use Create mode [C] for that. Triage will still extract findings but the final update step will require an existing file."

### 2. Prompt for Text Input

Display:

> **Triage Mode — Paste your findings below.**
>
> Accepted formats: review transcripts, meeting notes, audit outputs, party-mode outputs, code review findings, retrospective notes, or any text containing actionable observations.
>
> Paste your content and press Enter when done.

### 3. Accept and Preserve Input

- Accept the user's complete text input
- Preserve it exactly as provided — do not modify, reformat, or summarize
- Process the **entire** input regardless of length
- Confirm receipt: "Received [N] lines of input. Ready to extract findings."

### 4. Present MENU OPTIONS

Display: "**Select:** [C] Continue to finding extraction"

#### Menu Handling Logic:
- IF C: Load, read the entire file, and execute `{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-t/step-t-02-extract.md`
- IF any other input: Display "Enter **C** to continue to finding extraction." then redisplay menu

#### EXECUTION RULES:
- ALWAYS halt and wait for user input after presenting the menu
- ONLY proceed to next step when user selects 'C'

## 🚨 SYSTEM SUCCESS/FAILURE METRICS:
### ✅ SUCCESS: User's complete text input accepted and preserved, existing backlog loaded if present, proceeding to step-t-02
### ❌ SYSTEM FAILURE: Input truncated, content modified, findings extracted prematurely, or user forced to restructure input
**Master Rule:** Skipping steps is FORBIDDEN.
