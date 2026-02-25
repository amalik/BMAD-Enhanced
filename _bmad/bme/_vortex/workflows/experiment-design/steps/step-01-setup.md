---
step: 1
workflow: experiment-design
title: Setup & Input Validation
---

# Step 1: Setup & Input Validation

Before we design any experiment, we need to know exactly what hypothesis we're testing and verify the foundation is strong enough to build an experiment on.

## Why This Matters

A poorly designed experiment wastes more than time — it produces false confidence. If the hypothesis contract is vague, the experiment will test nothing meaningful. If the riskiest assumption isn't clearly identified, you'll test the wrong thing. This step ensures we start with a well-formed hypothesis contract so every experiment decision that follows is grounded in a real, testable bet.

## Your Task

### 1. What Hypothesis Contract Do You Have?

Liam expects a hypothesis contract — ideally produced by the hypothesis-engineering workflow as an HC3-compliant artifact:
- **HC3 Hypothesis Contract** (from Liam's `hypothesis-engineering` workflow)
- **Enriched HC3** (from Liam's `assumption-mapping` workflow, with deepened risk analysis)

You can also bring **any well-formed hypothesis** — Liam accepts input from outside the Vortex framework. It doesn't have to be HC3-compliant, but having a structured hypothesis with a clear riskiest assumption makes experiment design dramatically sharper.

### 2. Provide Your Input

Please provide the file path or describe the hypothesis contract you want to design an experiment for. For example:
- `_bmad-output/vortex-artifacts/hc3-hypothesis-contract-2026-02-25.md`
- `_bmad-output/vortex-artifacts/hc3-experiment-design-2026-02-25.md` (if re-designing)
- Or: "I have a hypothesis about user onboarding that I want to test"

### 3. Input Validation

I'll check your artifact against the HC3 schema to assess readiness:

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
- Assumption Risk Map (Lethality × Uncertainty classifications)
- Recommended Testing Order (prioritized assumptions)
- Flagged Concerns (optional — routing signals)

**If your input is non-conforming:** That's okay — we don't reject hypotheses. I'll guide you to identify which elements are present and which gaps we need to work around during experiment design. But the sharper your hypothesis contract, the better your experiment will be. If you can't prove it wrong, it's not a hypothesis — and if you can't describe what you're testing, you're not ready to design an experiment.

> For the full HC3 schema reference, see `{project-root}/_bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md`

---

## Your Turn

Please provide your hypothesis contract — file path, description, or both. I'll validate it and we'll proceed to identifying your experiment targets.

## Next Step

When your hypothesis contract is provided and validated, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/experiment-design/steps/step-02-context.md
