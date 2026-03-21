---
step: 1
workflow: model-review
title: Load Context
implements: Stories 4.4, 4.5
---

# Step 1: Load Context

Load artifacts, display existing feedback, and detect whether the user deferred a review previously.

## MANDATORY EXECUTION RULES

- Check for GC2 (capabilities.yaml) — REQUIRED for any review
- Check for GC3 (findings.yaml) — REQUIRED for findings review, optional for model-only review
- Check for existing feedback.yaml — display previous entries if present (FR53)
- Check for deferred review flag — remind user if review was deferred (FR55)

## EXECUTION

### 1. Load GC2 (Capabilities Manifest)

Read `.gyre/capabilities.yaml`. If missing:

```
❌ No capabilities manifest found at .gyre/capabilities.yaml

Coach needs a capabilities model to review. Please run model generation first:
- Activate Atlas (Model Curator) and run [GM] Generate Model
- Or run [FA] Full Analysis to generate everything from scratch
```

Then STOP — do not proceed.

### 2. Load GC3 (Findings Report) — Optional

Read `.gyre/findings.yaml`. If missing, note that findings review is unavailable but model review can proceed.

### 3. Display Existing Feedback (FR53)

Read `.gyre/feedback.yaml` if it exists. If it has entries, present them:

```
### Previous Feedback

Your team has previously reported:

| Date | Reporter | Type | Description |
|------|----------|------|-------------|
| [timestamp] | [reporter] | [type] | [description] |

These entries inform model improvement. You can add more during this review.
```

### 4. Check Deferred Review Flag (FR55)

Read `.gyre/capabilities.yaml` frontmatter. If `review_deferred: true` is present:

```
💡 You deferred reviewing your capabilities manifest last time — would you like to review now?
```

### 5. Ask Review Mode

Present the user with options:

```
What would you like to review?

1. **Review Model** — Walk through your capabilities one by one (keep/remove/edit/add)
2. **Review Findings** — See findings severity-first, then capture feedback
3. **Both** — Findings first, then model walkthrough, then feedback

Or type "skip" to go straight to feedback capture.
```

Wait for user input. Based on selection, proceed to the appropriate step.

---

## NEXT STEP

Based on user selection:
- Review Model or Both → Load step: {project-root}/_bmad/bme/_gyre/workflows/model-review/steps/step-02-walkthrough.md
- Review Findings → Present findings severity-first (use the format from gap-analysis step-05), then skip to step-04
- Skip → Load step: {project-root}/_bmad/bme/_gyre/workflows/model-review/steps/step-04-capture-feedback.md
