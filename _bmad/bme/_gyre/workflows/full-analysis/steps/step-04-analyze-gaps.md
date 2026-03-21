---
step: 4
workflow: full-analysis
title: Analyze Gaps
---

# Step 4: Analyze Gaps

Run the gap-analysis workflow inline. Lens compares each capability against filesystem evidence.

## MANDATORY EXECUTION RULES

- GC2 (Capabilities Manifest) must have been written in step 3 — if missing, STOP
- Execute the gap-analysis workflow steps sequentially
- Time target: first finding presented <2 minutes from workflow start (NFR1)

## EXECUTION

Execute the gap-analysis workflow steps in sequence:

1. Load and execute: `{project-root}/_bmad/bme/_gyre/workflows/gap-analysis/steps/step-01-load-manifest.md`
2. Load and execute: `{project-root}/_bmad/bme/_gyre/workflows/gap-analysis/steps/step-02-observability-analysis.md`
3. Load and execute: `{project-root}/_bmad/bme/_gyre/workflows/gap-analysis/steps/step-03-deployment-analysis.md`
4. Load and execute: `{project-root}/_bmad/bme/_gyre/workflows/gap-analysis/steps/step-04-cross-domain-correlation.md`
5. Load and execute: `{project-root}/_bmad/bme/_gyre/workflows/gap-analysis/steps/step-05-present-findings.md`

After completion, GC3 is written to `.gyre/findings.yaml`.

## ERROR RECOVERY

If a domain analysis fails:
- GC2 (capabilities.yaml) is already safe — it was written in step 3
- Report what was found so far
- Offer to retry the failed domain or continue with partial results

---

## NEXT STEP

With GC3 written, proceed to findings review:

Load step: {project-root}/_bmad/bme/_gyre/workflows/full-analysis/steps/step-05-review-findings.md
