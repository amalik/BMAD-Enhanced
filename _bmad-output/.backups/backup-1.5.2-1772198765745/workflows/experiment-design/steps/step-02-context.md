---
step: 2
workflow: experiment-design
title: Hypothesis Context & Experiment Targets
---

# Step 2: Hypothesis Context & Experiment Targets

Now let's load your hypothesis contract, review the risk map, and figure out exactly what this experiment needs to test. The riskiest assumption gets tested first — not the easiest one.

## Why This Matters

Most teams design experiments that test the wrong thing. They pick the assumption they can validate cheaply, not the one that could kill the hypothesis. Or they design an experiment so broad that it tests everything and proves nothing. This step forces clarity: what specific assumption are we targeting, and what question will the experiment answer?

## Your Task

### 1. Load and Review the Hypothesis Contract

Review the complete hypothesis contract from Step 1. For each hypothesis, examine:

| Field | What to extract |
|-------|----------------|
| **Expected Outcome** | What measurable result do we expect? |
| **Target Behavior Change** | What specific user behavior should change? |
| **Rationale** | What evidence supports this hypothesis? |
| **Riskiest Assumption** | What single assumption could invalidate everything? |
| **Hypothesis Statement** | "We believe that [target users] will [expected behavior] because [rationale]" |

### 2. Review the Assumption Risk Map

From the hypothesis contract (or from the assumption-mapping workflow if you ran it):

| Priority | Assumption | Lethality | Uncertainty | Status |
|----------|-----------|-----------|-------------|--------|
| 1 (Test First) | *The assumption this experiment should target* | High | High/Med | Unvalidated |
| 2 (Test Soon) | *Next priority* | Med/High | High/Med | Unvalidated |

**Focus on "Test First" assumptions.** These are the ones with high lethality and high uncertainty — if they're wrong, the hypothesis collapses, and we don't have evidence either way.

### 3. Select the Experiment Target

Choose the specific assumption this experiment will test:

| Element | Your answer |
|---------|------------|
| **Target Assumption** | *Which assumption from the risk map?* |
| **Why This One?** | *Why is this the right assumption to test first?* |
| **What Hypothesis Does It Belong To?** | *H1, H2, or H3?* |
| **Testable Question** | *"If we do [intervention], will we observe [expected behavior]?"* |
| **What Would Prove It Wrong?** | *What result would invalidate this assumption?* |

**Challenge:** If you can't articulate what would prove the assumption wrong, it's not testable. Go back and sharpen the hypothesis.

### 4. Scope the Experiment

Before designing methodology, establish boundaries:

| Constraint | Consideration |
|-----------|--------------|
| **Available Resources** | What can you realistically deploy? (users, budget, time, tools) |
| **Access to Users** | Can you reach the target users? How many? |
| **Measurement Capability** | Can you actually measure the expected behavior change? |
| **Timeline Pressure** | How quickly do you need signal? |

These constraints will guide methodology selection in the next step. Don't design a 6-week A/B test if you need signal in 2 weeks. Don't plan for 1,000 users if you can reach 20.

---

## Your Turn

Load your hypothesis contract, review the risk map, select the experiment target, and articulate the testable question. Share your analysis and I'll help you challenge anything that feels too comfortable.

## Next Step

When your experiment target is clear and the testable question is articulated, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/experiment-design/steps/step-03-design.md
