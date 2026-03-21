---
step: 4
workflow: model-review
title: Capture Feedback
implements: Story 4.4 (FR28, FR29, FR30)
---

# Step 4: Capture Feedback

Prompt the user for missed-gap feedback and persist it for team-wide model improvement.

## MANDATORY EXECUTION RULES

- Always prompt: "Did Gyre miss anything you know about?" (FR28)
- Persist feedback to `.gyre/feedback.yaml` with timestamp (FR29)
- Explain commit workflow for team sharing (FR30)
- Feedback entries: timestamp, reporter, type, description, domain
- Append to existing feedback — never overwrite previous entries

## EXECUTION

### 1. Prompt for Feedback

```
### Feedback

Did Gyre miss anything you know about? For example:
- A capability your stack has that wasn't in the model
- A gap Gyre didn't detect that you know exists
- A severity that feels wrong based on your experience

Type your feedback, or "none" to skip.
```

### 2. Capture Feedback Entry

For each piece of feedback the user provides, create an entry:

```yaml
- timestamp: "[ISO-8601]"
  reporter: "{user_name}"
  type: "[missed-capability|missed-gap|severity-adjustment|other]"
  description: "[user's feedback in their words]"
  domain: "[observability|deployment|reliability|security|general]"
```

Classify the type based on the user's response:
- Mentions a capability not in the model → `missed-capability`
- Mentions a gap not in findings → `missed-gap`
- Disagrees with severity → `severity-adjustment`
- Everything else → `other`

Ask the user to classify the domain if unclear, or infer from context.

### 3. Ask for More

After each entry:
```
✓ Captured. Anything else? (or "done" to finish)
```

Continue until user says "done", "none", or similar.

### 4. Write Feedback File

If there are new feedback entries, append to `.gyre/feedback.yaml`:

```yaml
# If file doesn't exist yet, create with header:
---
contract: GC4
type: artifact
source_agent: coach
target_agents: [atlas]
created: [date of first entry]
updated: [today's date]
---

feedback:
  # [existing entries preserved]
  - timestamp: "..."
    reporter: "..."
    type: "..."
    description: "..."
    domain: "..."
```

If file exists, update the `updated` date in frontmatter and append new entries to the feedback array.

### 5. Explain Team Sharing (FR30)

```
✅ Feedback saved to .gyre/feedback.yaml

💡 **Tip:** Commit `feedback.yaml` to your repository so your team's knowledge improves the model for everyone. Atlas will incorporate this feedback when regenerating capabilities.
```

If no feedback was provided:
```
No feedback to save — you can always provide feedback later by running Coach again.
```

---

## NEXT STEP

Load step: {project-root}/_bmad/bme/_gyre/workflows/model-review/steps/step-05-summary.md
