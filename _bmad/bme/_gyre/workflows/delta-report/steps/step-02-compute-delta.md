---
step: 2
workflow: delta-report
title: Compute Delta
implements: Story 4.6 (FR40)
---

# Step 2: Compute Delta

Compare current findings against previous findings to classify each as new, carried-forward, or resolved.

## MANDATORY EXECUTION RULES

- Match findings by `capability_ref` (primary key) and `domain` (secondary key)
- New = in current but not in previous
- Carried-forward = in both current and previous (same capability_ref)
- Resolved = in previous but not in current
- Also compute compound finding delta using `related_findings` arrays

## EXECUTION

### 1. Build Finding Maps

Create lookup maps from both finding sets:
- **Current map:** `{ capability_ref → finding }` for all current findings
- **Previous map:** `{ capability_ref → finding }` for all previous findings

### 2. Classify Findings

For each current finding:
- If `capability_ref` exists in previous map → **CARRIED** (carried-forward)
  - Note any severity changes: "was [old severity], now [new severity]"
  - Note any confidence changes
- If `capability_ref` NOT in previous map → **NEW**

For each previous finding:
- If `capability_ref` NOT in current map → **RESOLVED**

### 3. Classify Compound Findings

For each current compound:
- If both `related_findings` IDs have carried-forward counterparts → **CARRIED**
- Otherwise → **NEW**

For each previous compound:
- If either `related_findings` ID is resolved → **RESOLVED**

### 4. Compute Summary Statistics

```
delta_summary:
  new_findings: [count]
  carried_forward: [count]
  resolved: [count]
  severity_changes: [count]
  new_compounds: [count]
  resolved_compounds: [count]
  net_change: [current total - previous total] (positive = more findings)
```

### 5. First Run Handling

If `first_run = true`:
- All current findings are **NEW**
- No carried-forward or resolved findings
- No previous compounds

---

## NEXT STEP

Load step: {project-root}/_bmad/bme/_gyre/workflows/delta-report/steps/step-03-present-delta.md
