---
step: 3
workflow: full-analysis
title: Generate Model
---

# Step 3: Generate Model

Run the model-generation workflow inline. Atlas generates a capabilities manifest contextual to the detected stack.

## MANDATORY EXECUTION RULES

- GC1 (Stack Profile) must have been written in step 2 — if missing, STOP
- If cached model exists and mode is **Anticipation**, load cached and skip generation
- If mode is **Regeneration** or **Crisis**, run full model generation
- Execute the model-generation workflow steps sequentially

## EXECUTION

### If Anticipation Mode (capabilities.yaml exists)

Present the existing model summary:

```
Your capabilities model was previously generated: [N] capabilities for [stack summary].

Would you like to:
a) Keep this model and continue to gap analysis
b) Regenerate (fresh model even with existing amendments)
```

If user chooses (a), skip to next step.
If user chooses (b), proceed with generation below.

### If Crisis or Regeneration Mode

Execute the model-generation workflow steps in sequence:

1. Load and execute: `{project-root}/_bmad/bme/_gyre/workflows/model-generation/steps/step-01-load-profile.md`
2. Load and execute: `{project-root}/_bmad/bme/_gyre/workflows/model-generation/steps/step-02-generate-capabilities.md`
3. Load and execute: `{project-root}/_bmad/bme/_gyre/workflows/model-generation/steps/step-03-web-enrichment.md`
4. Load and execute: `{project-root}/_bmad/bme/_gyre/workflows/model-generation/steps/step-04-write-manifest.md`

After completion, GC2 is written to `.gyre/capabilities.yaml`.

---

## NEXT STEP

With GC2 written, proceed to gap analysis:

Load step: {project-root}/_bmad/bme/_gyre/workflows/full-analysis/steps/step-04-analyze-gaps.md
