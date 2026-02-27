---
step: 1
workflow: pivot-resynthesis
title: Setup & Input Validation
---

# Step 1: Setup & Input Validation

You're here because Max analyzed the evidence and made a decision: **pivot**. The solution direction failed, but the problem definition is sound. The experiment told us something important — and now we use that knowledge to sharpen, not restart.

## Why This Matters

Pivot resynthesis is fundamentally different from fresh convergence. You already have a validated problem space. What you're doing now is integrating new evidence — from experiments that didn't go as expected — into a revised problem definition. We're not starting over. We're iterating within the known space.

## Your Task

### 1. Understand the Pivot Context

Max decided "pivot" based on the evidence. This means:
- **The problem is correct** — users do experience the pain your research identified
- **The solution direction failed** — the hypothesis about how to solve it was wrong
- **New evidence exists** — the failed experiment revealed what doesn't work and why

### 2. List Your Input Artifacts

You'll need two types of input:

**Original Research (HC1 Empathy Artifacts):**
Your original Isla artifacts — empathy maps, interview syntheses, observation reports. These provide the research foundation that remains valid.

**Experiment Evidence (HC4 or informal):**
Results from the failed experiment — what was tested, what happened, what was learned. This can be a formal HC4 artifact from Wade or informal experiment notes.

**Prior Problem Definition (optional):**
If you have the original HC2 problem definition from before the experiment, it provides the JTBD baseline for re-framing.

### 3. Validate Your Artifacts

**HC1 Empathy Artifacts — Frontmatter Check:**
- `contract: HC1`
- `type: artifact`
- `source_agent` (e.g., `isla`)
- `source_workflow` (e.g., `empathy-map`, `user-interview`, `user-discovery`)
- `target_agents` (should include `mila`)
- `input_artifacts`
- `created` (YYYY-MM-DD)

**HC1 Body Sections:**
- Executive Summary
- Research Context
- Synthesized Insights
- Key Themes
- Pain Points
- Desired Gains
- Recommendations

Reference: `{project-root}/_bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md`

**HC4 Experiment Context — Frontmatter Check:**
- `contract: HC4`
- `type: artifact`
- `source_agent` (e.g., `wade`)
- `source_workflow` (e.g., `lean-experiment`, `proof-of-concept`)
- `target_agents`
- `input_artifacts`
- `created` (YYYY-MM-DD)

**HC4 Body Sections:**
- Experiment Summary
- Hypothesis Tested
- Experiment Method
- Pre-Defined Success Criteria
- Confirmed/Rejected Hypotheses
- Strategic Context
- Production Readiness (if experiment graduated to production)

Reference: `{project-root}/_bmad/bme/_vortex/contracts/hc4-experiment-context.md`

### 4. Non-Conforming Input

If your artifacts don't perfectly match the HC1 or HC4 schemas, we don't reject them — the data shows that real-world research rarely arrives in perfect format. Instead, note which sections are present and which are missing. We'll work with what you have and guide you to fill gaps where needed.

The critical information for pivot resynthesis is:
- From HC1: What pains and gains did the original research identify?
- From HC4: What was tested? What failed? What did we learn?

---

## Your Turn

Walk me through your artifacts. What HC1 research do you have, and what experiment evidence are you bringing to the table? The data shows that the most effective pivots happen when we lay all the evidence side by side.

## Next Step

When we've validated your inputs, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/pivot-resynthesis/steps/step-02-context.md
