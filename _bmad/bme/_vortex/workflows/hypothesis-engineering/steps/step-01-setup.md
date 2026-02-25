---
step: 1
workflow: hypothesis-engineering
title: Setup & Input Validation
---

# Step 1: Setup & Input Validation

Before we engineer any hypotheses, we need to know exactly what problem we're working from and verify the foundation is solid enough to build on.

## Why This Matters

Good hypotheses are falsifiable — if you can't prove it wrong, it's not a hypothesis. But falsifiability starts with a clear problem definition. If the problem is vague, the hypotheses will be vague. If the evidence is weak, the assumptions will be invisible. This step ensures we start with a validated problem definition so every hypothesis we engineer is grounded in real evidence, not guesswork.

## Your Task

### 1. What Problem Definition Do You Have?

Liam expects a problem definition — ideally produced by Mila's research-convergence workflow as an HC2-compliant artifact:
- **HC2 Problem Definition** (from Mila's `research-convergence` workflow)
- **HC2 Revised Problem Definition** (from Mila's `pivot-resynthesis` workflow)

You can also bring **any well-formed problem definition** — Liam accepts input from outside the Vortex framework. It doesn't have to be HC2-compliant, but having a structured problem definition with explicit JTBD and Pains & Gains makes hypothesis engineering dramatically stronger.

### 2. Provide Your Input

Please provide the file path or describe the problem definition you want to engineer hypotheses from. For example:
- `_bmad-output/vortex-artifacts/hc2-problem-definition-2026-02-25.md`
- Or: "I have a problem statement and some user research findings I'd like to use"

### 3. Input Validation

I'll check your artifact against the HC2 schema to assess readiness:

**HC2 Frontmatter Check:**
- `contract: HC2`
- `type: artifact`
- `source_agent` (who produced it)
- `source_workflow` (which workflow)
- `target_agents: [liam]`
- `input_artifacts` (upstream references)
- `created` (date)

**HC2 Body Section Check:**
- Converged Problem Statement (Problem Statement, Confidence, Scope)
- Jobs-to-be-Done (Primary JTBD + Functional/Emotional/Social Jobs)
- Pains (prioritized list with evidence sources)
- Gains (prioritized list with evidence sources)
- Evidence Summary (artifacts analyzed, convergence assessment, gaps)
- Assumptions (with basis and risk if wrong)

**If your input is non-conforming:** That's okay — we don't reject problem definitions. I'll guide you to identify which elements are present and which gaps we need to work around during hypothesis engineering. But let's stress-test what we have: the stronger the problem definition, the sharper the hypotheses.

> For the full HC2 schema reference, see `{project-root}/_bmad/bme/_vortex/contracts/hc2-problem-definition.md`

---

## Your Turn

Please provide your problem definition — file path, description, or both. I'll validate it and we'll proceed to unpacking the opportunity space.

## Next Step

When your problem definition is provided and validated, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-02-context.md
