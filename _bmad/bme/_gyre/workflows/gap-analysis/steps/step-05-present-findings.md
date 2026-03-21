---
step: 5
workflow: gap-analysis
title: Present Findings
---

# Step 5: Present Findings

Write findings to GC3 artifact and present a conversational severity-first summary.

## MANDATORY EXECUTION RULES

- Write GC3 to `.gyre/findings.yaml` before presenting to the user
- Present severity-first: blockers, then recommended, then nice-to-have (FR33)
- Include novelty ratio: how many findings are contextual vs what a static linter would catch (FR34)
- Include compound findings with reasoning chains (FR35)
- Output must be copy-pasteable into Slack/Jira/docs (FR49)
- If analysis failed partway, report what was found and offer to retry (NFR11)

## WRITE GC3 ARTIFACT

Write the following to `.gyre/findings.yaml`:

```yaml
---
contract: GC3
type: artifact
source_agent: lens
source_workflow: gap-analysis
target_agents: [coach]
input_artifacts: [GC2]
created: [today's date]
---

gyre_findings:
  version: "1.0"
  analyzed_at: "[ISO-8601 timestamp]"
  mode: "[crisis|anticipation]"
  stack_summary: "[from GC2]"
  summary:
    blockers: [count]
    recommended: [count]
    nice_to_have: [count]
    total: [count]
    novelty_ratio: "[X of Y contextual]"
  findings:
    [all OBS-NNN and DEP-NNN findings]
  compound_findings:
    [all COMPOUND-NNN findings]
  sanity_check:
    passed: [boolean]
    warnings: [list]
```

## CONVERSATIONAL PRESENTATION

Present findings in this order:

### 1. Mode Indicator (FR37)

```
## Gap Analysis — [Crisis Mode / Anticipation Mode]
```

### 2. Severity-First Summary (FR33)

```
**[stack_summary]**

| Severity | Count |
|----------|:-----:|
| 🔴 Blockers | [N] |
| 🟡 Recommended | [N] |
| 🟢 Nice-to-have | [N] |
| **Total findings** | **[N]** |

**Novelty ratio:** [X] of [Y] findings are contextual — gaps a generic linter would miss.
```

### 3. Blocker Findings (if any)

```
### 🔴 Blockers

**[OBS/DEP-NNN] [capability name]**
[description]
- **Evidence:** [evidence_summary]
- **Confidence:** [high/medium/low]
- **Why blocker:** [severity_rationale]
```

### 4. Compound Findings (if any, FR35)

```
### ⚡ Compound Findings

**[COMPOUND-NNN] [description headline]**
- Combines: [OBS-NNN] + [DEP-NNN]
- **Impact:** [combined_impact reasoning chain]
- **Confidence:** [compound confidence]
```

### 5. Recommended Findings

```
### 🟡 Recommended

| # | Finding | Capability | Confidence |
|---|---------|-----------|:----------:|
| [DEP-NNN] | [description] | [capability name] | [high/medium/low] |
```

### 6. Nice-to-Have Findings

```
### 🟢 Nice-to-have

| # | Finding | Capability | Confidence |
|---|---------|-----------|:----------:|
| [OBS-NNN] | [description] | [capability name] | [high/medium/low] |
```

### 7. Sanity Check Warnings (if any)

```
### ⚠️ Analysis Notes

[List any sanity_check.warnings]
```

### 8. Summary Footer

```
Written to `.gyre/findings.yaml`

---
```

## ERROR RECOVERY (NFR11, FR56)

If analysis failed after model generation:

```
## Analysis Partially Complete

[domain] analysis encountered an error: [brief description]

**What was completed:**
- ✅ [completed domain]: [N] findings
- ❌ [failed domain]: analysis did not complete

**Your capabilities manifest (.gyre/capabilities.yaml) is safe** — it was written before analysis started.

**Options:**
a) View findings from the completed domain
b) Retry the failed domain
c) Exit and investigate
```

---

## Gyre Compass

Based on what you just completed, here are your options:

| If you want to... | Consider next... | Agent | Why |
|---|---|---|---|
| Review findings and customize the model | model-review | Coach 🏋️ | Walk through findings, amend capabilities |
| Compare with previous analysis | delta-report | Lens 🔬 | Track progress since last run |
| Regenerate the model with different parameters | model-generation | Atlas 📐 | Model may need adjustment based on findings |

> **Note:** These are recommendations. You can run any Gyre workflow at any time.
