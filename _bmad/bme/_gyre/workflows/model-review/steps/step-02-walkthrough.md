---
step: 2
workflow: model-review
title: Capabilities Walkthrough
implements: Story 4.2 (FR24, FR25, FR27)
---

# Step 2: Capabilities Walkthrough

Walk through each capability in the manifest. The user decides what stays, what goes, and what changes.

## MANDATORY EXECUTION RULES

- Present capabilities grouped by category (observability, deployment, reliability, security)
- For each capability: show name, description, category, source, relevance
- Accept conversational responses: "keep", "remove", "edit", "skip remaining"
- Track all amendments in memory for step 3
- Never push opinions — present and let the user decide (FR24)
- User can add new capabilities by describing them conversationally (FR25)

## EXECUTION

### 1. Present Category Overview

Before walking through, show a summary:

```
### Your Capabilities Model

| Category | Count |
|----------|:-----:|
| Observability | [N] |
| Deployment | [N] |
| Reliability | [N] |
| Security | [N] |
| **Total** | **[N]** |

I'll walk through each capability. For each one, you can:
- **Keep** — no changes (just press Enter or say "keep")
- **Remove** — exclude from future analysis
- **Edit** — change the description or category
- **Add** — describe a new capability to add
- **Skip remaining** — keep everything else as-is

Let's start with [first category].
```

### 2. Per-Capability Presentation

For each capability (grouped by category):

```
**[N of total] [capability-name]** ([category])
[description]
_Source: [static-analysis|contextual-model] | Relevance: [relevance explanation]_

Keep / Remove / Edit?
```

### 3. Handle Responses

**Keep:** Mark as unchanged, move to next.

**Remove:** Record `removed: true` amendment. Confirm:
```
✓ Marked [capability-name] for removal. It won't appear in future analyses.
```

**Edit:** Ask what to change. Accept conversational edits:
- "Change the description to..." → record new description with `amended: true`
- "Move to [category]" → record category change with `amended: true`
- "Change the name to..." → record name change with `amended: true`

Confirm each edit:
```
✓ Updated [capability-name]: [what changed]
```

**Add:** User describes a new capability conversationally. Coach creates the entry:
```
I'll add that. Here's what I have:

**[new-capability-name]** ([category])
[description based on user input]
_Source: user-added_

Does that look right?
```

**Skip remaining:** Confirm count remaining, mark all as kept:
```
✓ Keeping the remaining [N] capabilities as-is.
```

### 4. Walkthrough Summary

After all capabilities reviewed:

```
### Review Summary

- ✅ Kept: [N] capabilities
- ❌ Removed: [N] capabilities
- ✏️ Edited: [N] capabilities
- ➕ Added: [N] capabilities

Ready to apply these changes?
```

Wait for confirmation before proceeding.

---

## NEXT STEP

Load step: {project-root}/_bmad/bme/_gyre/workflows/model-review/steps/step-03-apply-amendments.md
