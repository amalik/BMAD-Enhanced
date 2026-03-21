---
step: 5
workflow: full-analysis
title: Review Findings
status: stub
implements: Epic 4 (Story 4.1)
---

# Step 5: Review Findings (Stub)

> **This step will be implemented in Epic 4 — Review, Feedback & Delta.**
>
> Coach loads GC3 (Findings Report), presents findings severity-first, guides model review, captures feedback, and writes GC4 (Feedback Loop) to `.gyre/`.

## STUB BEHAVIOR

When this step is reached during full-analysis:

```
## Findings Review — Not Yet Implemented

This step requires the Coach agent (review-coach) workflows from Epic 4.

**What will happen here:**
1. Coach loads GC3 (Findings Report) from .gyre/findings.yaml
2. Presents severity-first summary with evidence
3. Walks through each finding interactively
4. Guides model review (keep/remove/edit capabilities)
5. Captures missed-gap feedback
6. Writes GC4 (Feedback Loop) — amendments for Atlas

**For now:** Your findings report has been written to `.gyre/findings.yaml`.
You can review it directly or activate Coach when Epic 4 is complete.

Run `/bmad-agent-bme-readiness-analyst` to use Lens's other workflows,
or activate any Gyre agent from the menu.
```

## Gyre Compass

Based on what you just completed, here are your options:

| If you want to... | Consider next... | Agent | Why |
|---|---|---|---|
| Detect or re-detect your stack | stack-detection | Scout 🔎 | New project or stack has changed |
| Generate or regenerate the model | model-generation | Atlas 📐 | First run or want fresh model |
| Review your capabilities manifest | model-review | Coach 🏋️ | Customize the model to your stack |
| Run gap analysis | gap-analysis | Lens 🔬 | Find what's missing |
| See what changed since last run | delta-report | Lens 🔬 | Track progress over time |
| Run the full pipeline | full-analysis | Scout 🔎 | Complete end-to-end analysis |
| Validate model accuracy | accuracy-validation | Atlas 📐 | Pre-pilot quality gate |

> **Note:** These are recommendations. You can run any Gyre workflow at any time.
