---
step: 1
workflow: assumption-mapping
title: Setup & Input Validation
---

# Step 1: Setup & Input Validation

Before we map any assumptions, we need to know exactly what hypotheses we're working from and verify the foundation is solid enough to analyze.

## Why This Matters

Assumption mapping is only as good as the hypotheses it analyzes. If the hypothesis contracts are vague, the assumptions will be invisible. If the riskiest assumption is actually the wrong one, the entire testing order collapses. This step ensures we start with well-formed hypothesis contracts so every assumption we surface is grounded in real hypotheses, not guesswork.

## Your Task

### 1. What Hypothesis Contracts Do You Have?

Liam expects hypothesis contracts — ideally produced by the hypothesis-engineering workflow as HC3-compliant artifacts:
- **HC3 Hypothesis Contract** (from Liam's `hypothesis-engineering` workflow)
- **Multiple HC3 artifacts** (from different hypothesis engineering sessions)

You can also bring **any well-formed hypothesis set** — Liam accepts input from outside the Vortex pattern. It doesn't have to be HC3-compliant, but having structured hypotheses with explicit 4-field contracts (Expected Outcome, Target Behavior Change, Rationale, Riskiest Assumption) makes assumption mapping dramatically stronger.

### 2. Provide Your Input

Please provide the file path(s) or describe the hypothesis contracts you want to map assumptions for. For example:
- `_bmad-output/vortex-artifacts/hc3-hypothesis-contract-2026-02-25.md`
- Multiple paths if analyzing across hypothesis sets
- Or: "I have three hypotheses I'd like to analyze for hidden assumptions"

### 3. Input Validation

I'll check your artifact(s) against the HC3 schema to assess readiness:

**HC3 Frontmatter Check:**
- `contract: HC3`
- `type: artifact`
- `source_agent` (who produced it)
- `source_workflow` (which workflow)
- `target_agents: [wade]`
- `input_artifacts` (upstream references)
- `created` (date)

**HC3 Body Section Check:**
- Problem Context (Problem Statement, JTBD Reference, Key Pains Targeted)
- Hypothesis Contracts (1-3 in 4-field format: Expected Outcome, Target Behavior Change, Rationale, Riskiest Assumption)
- Assumption Risk Map (if already started — we'll deepen it)
- Recommended Testing Order (if already started — we'll refine it)
- Flagged Concerns (optional — we'll surface more)

**If your input is non-conforming:** That's okay — we don't reject hypotheses. I'll guide you to identify which elements are present and which gaps we need to work around during assumption mapping. But let's stress-test what we have: the stronger the hypothesis contracts, the sharper the assumption analysis.

> For the full HC3 schema reference, see `{project-root}/_bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md`

---

## Your Turn

Please provide your hypothesis contracts — file path(s), description, or both. I'll validate them and we'll proceed to extracting every assumption hiding inside.

## Next Step

When your hypothesis contracts are provided and validated, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/assumption-mapping/steps/step-02-context.md
