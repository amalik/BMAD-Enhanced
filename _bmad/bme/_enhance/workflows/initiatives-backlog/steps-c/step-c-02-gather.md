---
name: 'step-c-02-gather'
description: 'Interactively gather initial intakes (unqualified findings) for the new lifecycle backlog'
nextStepFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-c/step-c-03-qualify.md'
outputFile: '{planning_artifacts}/convoke-note-initiative-lifecycle-backlog.md'
templateFile: '{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/templates/backlog-format-spec.md'
advancedElicitationTask: '{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.md'
partyModeWorkflow: '{project-root}/_bmad/core/workflows/bmad-party-mode/workflow.md'
---

# Step 2: Interactive Intake Gathering

## STEP GOAL:

Gather initial intakes from the user — each with a description and source — building a list that will pass through the qualifying gate in step-c-03. These items become Intake rows in §2.1 of the new lifecycle backlog; lane assignment happens only if the user runs qualification.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:
- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read this complete step file before taking action
- 🔄 CRITICAL: When loading next step with 'C', read the entire file
- 📋 YOU ARE A GATHERING FACILITATOR collecting intake descriptions

### Role Reinforcement:
- ✅ You are a **gathering facilitator** — collect and organize, do not qualify or score
- ✅ Accept the user's descriptions faithfully — do not rewrite, editorialize, or merge intakes
- ✅ Every gathered item becomes an Intake (§2.1) — lane assignment is step-c-03's job
- ✅ The user decides how many intakes to add — you prompt until they say done

### Step-Specific Rules:
- 🎯 Focus ONLY on gathering intake details (description, source)
- 🚫 FORBIDDEN to assign lane, portfolio, or RICE (step-c-03's job)
- 🚫 FORBIDDEN to write the backlog file (step-c-04's job)
- 🚫 FORBIDDEN to reorder, merge, or drop intakes without user instruction
- 💬 Approach: prompt for one intake at a time, confirm capture, ask for next or done

## EXECUTION PROTOCOLS:
- 🎯 Follow the MANDATORY SEQUENCE exactly
- 💾 Track all gathered intakes in a running list

## CONTEXT BOUNDARIES:
- Available context: Session state from step-c-01, loaded templates
- Focus: Intake gathering only
- Limits: Do NOT qualify, write, or analyze
- Dependencies: step-c-01-init.md (session initialized)

## MANDATORY SEQUENCE

**CRITICAL:** Follow this sequence exactly. Do not skip, reorder, or improvise.

### 1. Initialize Gathering State

Set up tracking:
- `gathered_intakes` = []
- `item_count` = 0

### 2. Prompt for Intake

Display:

> **Intake #[item_count + 1]**
>
> Describe this intake:
> - **Description:** A one-line summary of the problem, idea, observation, or improvement
> - **Source:** Where it came from (e.g., "code review 2026-04-15", "retrospective", "user feedback", "party mode session", "audit finding")
>
> *You can provide both fields in one message, or just describe the intake and I'll ask for the source.*

**ALWAYS halt and wait for user input.**

### 3. Capture and Confirm

Parse the user's input to extract:
- **Description** — one-line summary
- **Source** — origin reference (required for audit trail)

If Source is missing, prompt: "What's the source of this intake?" and wait.

Display the captured intake:

> **Captured:**
> - **Description:** [description]
> - **Source:** [source]
> - **Date:** [current session date YYYY-MM-DD]
> - **Raiser:** [user identity — default to John if invoked via PM agent, otherwise ask]

Add to `gathered_intakes` with all four fields. Increment `item_count`.

### 4. Present Per-Intake Menu

Display:

> **Intakes gathered so far: [item_count]**
>
> - **[N] Next** — Add another intake
> - **[D] Done** — Finish gathering and proceed to qualifying gate (step-c-03)
> - **[SKIP] Skip qualification** — Finish gathering and go directly to file generation (step-c-04); all intakes remain raw in §2.1
> - **[A] Advanced Elicitation** — Deeper analysis to surface more intakes
> - **[P] Party Mode** — Multi-perspective brainstorming

#### Menu Handling Logic:
- IF N: Go to step 2 (prompt for next intake).
- IF D:
  - **If `item_count` >= 1:** Display gathered intakes summary table, then advance to step-c-03.
  - **If `item_count` == 0:** Display "No intakes gathered. Either add at least one (**N**), skip to empty generation (**SKIP**), or return to the T/R/C menu via [X]." Redisplay this menu.
- IF SKIP:
  - **If `item_count` >= 1:** Pass `gathered_intakes` with no qualification (all remain raw) to step-c-04. Display summary, then load, read, and execute `{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-c/step-c-04-generate.md`.
  - **If `item_count` == 0:** Display "No intakes to skip qualification for. Either add at least one or use Empty create from step-c-01." Redisplay this menu.
- IF A: Execute `{advancedElicitationTask}`. When finished, redisplay menu.
- IF P: Execute `{partyModeWorkflow}`. When finished, redisplay menu.
- IF any other input: Display "Unknown command. Use **N**, **D**, **SKIP**, **A**, or **P**." then redisplay menu.

#### EXECUTION RULES:
- ALWAYS halt and wait for user input after presenting the menu
- After A or P execution, return to this menu (not to the prompt)
- The user may add as many intakes as they want — no upper limit
- Do NOT auto-continue — the user must explicitly select D, SKIP, or exit

### 5. Gathering Complete — Summary and Advance

Display the complete gathered list:

> **Gathering Complete — [item_count] intakes collected**
>
> | # | Description | Source |
> |---|-------------|--------|
> | 1 | [description] | [source] |
> | 2 | [description] | [source] |
> | ... | ... | ... |

Then advance based on the user's choice:
- **D (qualify):** Load, read the entire file, and execute `{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-c/step-c-03-qualify.md`, passing `gathered_intakes`.
- **SKIP (no qualify):** Load, read, and execute `{project-root}/_bmad/bme/_enhance/workflows/initiatives-backlog/steps-c/step-c-04-generate.md`, passing `gathered_intakes` and empty `qualified_items`.

## 🚨 SYSTEM SUCCESS/FAILURE METRICS:
### ✅ SUCCESS: Each intake captured with description and source, user offered qualify-now or skip paths, at least 1 intake gathered when D or SKIP chosen, complete list passed to next step
### ❌ SYSTEM FAILURE: Intakes qualified prematurely, descriptions rewritten without approval, source missing, zero intakes accepted for D/SKIP paths, gathered items lost
**Master Rule:** Skipping steps is FORBIDDEN.
