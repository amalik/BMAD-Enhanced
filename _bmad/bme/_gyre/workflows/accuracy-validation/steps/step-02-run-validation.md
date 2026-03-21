---
step: 2
workflow: accuracy-validation
title: Run Validation
---

# Step 2: Run Validation

For each selected archetype, run stack detection + model generation and collect the capabilities manifest.

## MANDATORY EXECUTION RULES

- Process each archetype independently — do not carry context between runs
- Record the exact Stack Profile (GC1) used for each archetype
- Record the complete capabilities manifest (GC2) generated for each
- If using live repos, run Scout's scan sequence from step-01-scan-filesystem.md
- If using synthetic profiles, construct a GC1-compliant Stack Profile from the archetype description

## EXECUTION SEQUENCE

For each archetype:

### 1. Produce Stack Profile

**Live repo method:**
- Run Scout's filesystem scan (step-01-scan-filesystem.md) against the repo
- Classify the stack (step-02-classify-stack.md)
- Skip guard questions (assume high confidence for validation purposes)
- Record the resulting GC1 Stack Profile

**Synthetic profile method:**
- Construct a GC1-compliant stack profile from the archetype description:
  ```yaml
  stack_profile:
    primary_language: "[from archetype]"
    primary_framework: "[from archetype]"
    secondary_stacks: []
    container_orchestration: "[from archetype]"
    ci_cd_platform: "[from archetype]"
    observability_tooling: ["[from archetype]"]
    cloud_provider: "[from archetype]"
    communication_protocol: "[from archetype]"
    detection_confidence: "high"
    detection_summary: "[archetype description]"
  ```

### 2. Generate Capabilities Manifest

- Run Atlas's model generation workflow against the Stack Profile
- Record the complete capabilities list
- Note: web search enrichment should be performed if available, skipped if not (record which)

### 3. Record Results

For each archetype, record:

```
## Archetype [N]: [Name]

**Stack Profile:** [summary]
**Method:** [live scan / synthetic profile]
**Web search:** [performed / skipped]
**Capabilities generated:** [count]
**Limited coverage:** [yes/no]

### Capabilities List

| # | ID | Category | Name | Description |
|---|-----|----------|------|-------------|
| 1 | [id] | [category] | [name] | [description] |
| ... | | | | |
```

---

## NEXT STEP

Load step: {project-root}/_bmad/bme/_gyre/workflows/accuracy-validation/steps/step-03-score-results.md
