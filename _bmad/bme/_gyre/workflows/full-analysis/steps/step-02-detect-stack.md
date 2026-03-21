---
step: 2
workflow: full-analysis
title: Detect Stack
---

# Step 2: Detect Stack

Run the stack-detection workflow inline. This step delegates to the stack-detection workflow steps for the actual scanning, classification, and guard questions.

## MANDATORY EXECUTION RULES

- Execute the stack-detection workflow steps sequentially (scan → classify → guard questions)
- Write GC1 (Stack Profile) to `.gyre/stack-profile.yaml` on completion
- If GC1 already exists and mode is **Anticipation**, ask the user: "Your stack was detected previously. Re-detect or keep existing? (re-detect / keep)"

## EXECUTION

### If Crisis or Regeneration Mode

Execute the stack-detection workflow steps in sequence:

1. Load and execute: `{project-root}/_bmad/bme/_gyre/workflows/stack-detection/steps/step-01-scan-filesystem.md`
2. Load and execute: `{project-root}/_bmad/bme/_gyre/workflows/stack-detection/steps/step-02-classify-stack.md`
3. Load and execute: `{project-root}/_bmad/bme/_gyre/workflows/stack-detection/steps/step-03-guard-questions.md`

After user confirms the classification, write GC1 to `.gyre/stack-profile.yaml`.

### If Anticipation Mode (GC1 exists)

Present the existing stack profile summary and ask:

```
Your stack was previously detected as: [archetype summary from GC1]

Would you like to:
a) Keep this detection and continue to model generation
b) Re-detect (your project may have changed)
```

If user chooses (b), run the detection steps above.

---

## NEXT STEP

With GC1 written, proceed to model generation:

Load step: {project-root}/_bmad/bme/_gyre/workflows/full-analysis/steps/step-03-generate-model.md
