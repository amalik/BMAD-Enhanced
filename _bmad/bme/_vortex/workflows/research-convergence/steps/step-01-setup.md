---
step: 1
workflow: research-convergence
title: Setup & Input Validation
---

# Step 1: Setup & Input Validation

Before we synthesize anything, we need to know exactly what research we're working with and verify it's ready for convergence.

## Why This Matters

Three patterns converge on this insight: the quality of your problem definition is directly tied to the quality and completeness of the research feeding it. Garbage in, garbage out. This step ensures we start with solid foundations by validating your input artifacts against the HC1 schema — or guiding you to provide what's needed if your research comes from outside the Vortex pattern.

## Your Task

### 1. What Artifacts Do You Have?

Mila expects research artifacts — ideally produced by Isla's workflows as HC1-compliant empathy artifacts:
- **Empathy maps** (from Isla's `empathy-map` workflow)
- **Interview syntheses** (from Isla's `user-interview` workflow)
- **Observation reports** (from Isla's `user-discovery` workflow)

You can also bring **any well-formed research input** — Mila accepts artifacts from outside the Vortex pattern. They don't have to be HC1-compliant, but having structured research makes convergence stronger.

### 2. List Your Input Artifacts

Please provide the file paths or describe the artifacts you want to synthesize. For example:
- `_bmad-output/vortex-artifacts/hc1-empathy-map-busy-parents-2026-02-20.md`
- `_bmad-output/vortex-artifacts/hc1-interview-synthesis-2026-02-21.md`
- Or: "I have interview notes in a Google Doc and survey results in a spreadsheet"

### 3. Input Validation

I'll check each artifact against the HC1 schema to assess readiness:

**HC1 Frontmatter Check:**
- `contract: HC1`
- `type: artifact`
- `source_agent` (who produced it)
- `source_workflow` (which workflow)
- `target_agents: [mila]`
- `input_artifacts` (upstream references)
- `created` (date)

**HC1 Body Section Check:**
- Executive Summary
- Research Context
- Synthesized Insights
- Key Themes
- Pain Points
- Desired Gains
- Recommendations

**If artifacts are non-conforming:** That's okay — we don't reject research. I'll guide you to identify which sections are present and which gaps we need to work around during synthesis. The data shows that even partial research can produce useful convergence when we're explicit about what evidence we have and what we're missing.

> For the full HC1 schema reference, see `{project-root}/_bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md`

---

## Your Turn

Please list your input artifacts — file paths, descriptions, or both. I'll validate them and we'll proceed to analysis.

## Next Step

When your artifacts are listed and validated, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/research-convergence/steps/step-02-context.md
