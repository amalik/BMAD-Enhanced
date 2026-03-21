---
step: 3
workflow: model-review
title: Apply Amendments
implements: Story 4.2 (FR25, FR26, FR27), Story 4.3
---

# Step 3: Apply Amendments

Write amendments directly to capabilities.yaml. This is the GC4 (Feedback Loop) mechanism — amendments are stored as flags on the capabilities themselves, not in a separate file.

## MANDATORY EXECUTION RULES

- Read current `.gyre/capabilities.yaml` before writing
- Apply amendments directly to the capabilities array
- Set `removed: true` on removed capabilities (FR27 — model subtraction)
- Set `amended: true` on edited capabilities, preserving original values as `original_*` fields
- Add new capabilities with `source: "user-added"` and `amended: true`
- Update the frontmatter: set `last_reviewed: [ISO date]`, `review_deferred: false`
- Amended artifacts must NOT contain source code, file contents, or secrets (NFR9)
- Write the file atomically — do not leave partial state

## EXECUTION

### 1. Read Current Manifest

Load `.gyre/capabilities.yaml` and parse the capabilities array.

### 2. Apply Removals

For each capability marked for removal:
- Add `removed: true` to the capability entry
- Add `removed_at: [ISO date]` for audit trail
- Do NOT delete the entry — keep it for amendment persistence (FR26)

### 3. Apply Edits

For each capability marked for edit:
- Set `amended: true`
- Set `amended_at: [ISO date]`
- Store original values: `original_description`, `original_name`, `original_category` (only the fields that changed)
- Apply the new values

### 4. Add New Capabilities

For each new capability from the walkthrough:
- Generate a unique ID following the pattern: `[category-prefix]-[NNN]` (e.g., `obs-custom-001`)
- Set `source: "user-added"`
- Set `amended: true`
- Set `amended_at: [ISO date]`

### 5. Update Frontmatter

Update the capabilities.yaml frontmatter:
- Set `last_reviewed: [ISO date]`
- Set `review_deferred: false`
- Increment `amendment_count` (or set to 1 if first review)

### 6. Write Updated Manifest

Write the complete updated manifest back to `.gyre/capabilities.yaml`.

Confirm to user:

```
✅ Amendments applied to .gyre/capabilities.yaml

- [N] capabilities removed (will be excluded from future analysis)
- [N] capabilities edited
- [N] new capabilities added
- Amendment count: [N]

These amendments will persist when Atlas regenerates the model.
```

## ERROR RECOVERY

If write fails:
```
❌ Could not write amendments to .gyre/capabilities.yaml

Your amendments have been captured but not saved. Options:
a) Retry writing
b) Display amendments as YAML so you can apply manually
c) Exit without saving
```

---

## NEXT STEP

Load step: {project-root}/_bmad/bme/_gyre/workflows/model-review/steps/step-04-capture-feedback.md
