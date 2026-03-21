---
step: 3
workflow: delta-report
title: Present Delta
implements: Story 4.6 (FR41)
---

# Step 3: Present Delta

Present the delta report and save current findings as history for next run.

## MANDATORY EXECUTION RULES

- Present delta with [NEW], [CARRIED] tags (FR41)
- List resolved findings briefly
- Note severity changes on carried-forward findings
- Save current findings as history after presentation
- Output must be copy-pasteable into Slack/Jira/docs (FR49)

## CONVERSATIONAL PRESENTATION

### 1. Delta Header

```
## Delta Report — [Crisis Mode / Anticipation Mode]

**Comparing:** [current analyzed_at] vs [previous analyzed_at]
```

If first run:
```
## Delta Report — First Run (Baseline)

**Baseline established:** [current analyzed_at]
All findings are new — this report establishes your baseline for future comparison.
```

### 2. Delta Summary

```
| Status | Count |
|--------|:-----:|
| 🆕 New findings | [N] |
| ➡️ Carried forward | [N] |
| ✅ Resolved | [N] |
| **Net change** | **[+/-N]** |
```

### 3. New Findings [NEW]

```
### 🆕 New Findings

| # | [NEW] Finding | Severity | Confidence |
|---|--------------|----------|:----------:|
| [ID] | [description] | [severity] | [confidence] |
```

If no new findings:
```
### 🆕 New Findings

No new findings since last analysis. ✅
```

### 4. Carried Forward [CARRIED]

```
### ➡️ Carried Forward

| # | [CARRIED] Finding | Severity | Change |
|---|-------------------|----------|--------|
| [ID] | [description] | [severity] | [unchanged / was: old severity] |
```

If no carried-forward:
```
### ➡️ Carried Forward

No carried-forward findings — all previous findings are resolved! 🎉
```

### 5. Resolved Findings

```
### ✅ Resolved

These findings from your previous analysis were not found this time:

| # | Finding | Was Severity |
|---|---------|-------------|
| [ID] | [description] | [severity] |
```

If no resolved:
```
### ✅ Resolved

No findings were resolved since last analysis.
```

### 6. Compound Finding Changes

If there are new or resolved compounds:
```
### ⚡ Compound Finding Changes

**New compounds:**
- [COMPOUND-NNN]: [description] (combines [ID] + [ID])

**Resolved compounds:**
- [COMPOUND-NNN]: [description] — no longer applies
```

### 7. Save History

After presenting, save current findings as history:

1. Copy `.gyre/findings.yaml` content to `.gyre/history.yaml`
2. Confirm:

```
---

Current findings saved as history for next delta comparison.
Written to `.gyre/history.yaml`
```

### 8. Gyre Compass

```
## What's Next?

| If you want to... | Consider next... | Agent | Why |
|---|---|---|---|
| Review and customize findings | model-review | Coach 🏋️ | Walk through findings, amend capabilities |
| Re-run analysis to check progress | gap-analysis | Lens 🔬 | See if fixes resolved findings |
| Regenerate the model | model-generation | Atlas 📐 | Model may need adjustment |
| Run the full pipeline | full-analysis | Scout 🔎 | Complete end-to-end analysis |
| Share progress with your team | — | — | Commit .gyre/ directory to your repository |

> **Note:** These are recommendations. You can run any Gyre workflow at any time.
```
