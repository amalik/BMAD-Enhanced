---
step: 1
workflow: behavior-analysis
title: Setup & Input Validation
---

# Step 1: Setup & Input Validation

Before we analyze any production behavior, we need the experiment that established the baseline. Behavioral patterns reveal intent that surveys miss — but only when measured against what was predicted and validated. Without that baseline, observed behavior is just noise.

## Why This Matters

Production behavior viewed in isolation tells you what users are doing. Production behavior viewed against experiment baselines tells you what it means. A segment abandoning a feature could be alarming — or it could be exactly the variance the experiment predicted. The classification depends entirely on the experiment context: what was tested, what was confirmed, and what behavior was expected in production. Without those baselines, you cannot distinguish variance from regression from discovery.

## Your Task

### 1. What Experiment Context Do You Have?

Noah expects experiment context — ideally produced by Wade's experimentation workflow as an HC4-compliant artifact:
- **HC4 Experiment Context** (from Wade's `lean-experiment` workflow)
- **HC4 Experiment Context** (from Wade's `proof-of-concept`, `proof-of-value`, or `mvp` workflows)

You can also bring **any well-formed experiment summary** — Noah accepts input from outside the Vortex pattern. It doesn't have to be HC4-compliant, but having structured experiment results with explicit success criteria and confirmed/rejected hypotheses makes behavior analysis dramatically more precise.

### 2. Provide Your Input

Please provide the file path or describe the experiment context and the behavior you want to analyze. For example:
- `_bmad-output/vortex-artifacts/hc4-experiment-context-2026-02-25.md`
- Or: "I have experiment results and I'm seeing unexpected user behavior in production"

### 3. Input Validation

I'll check your artifact against the HC4 schema to assess readiness:

**HC4 Frontmatter Check:**
- `contract: HC4`
- `type: artifact`
- `source_agent` (who produced it)
- `source_workflow` (which workflow)
- `target_agents: [noah]`
- `input_artifacts` (upstream references)
- `created` (date)

**HC4 Body Section Check:**
- Experiment Summary (Name, Description, Type, Duration, Graduation Status)
- Hypothesis Tested (Statement, Riskiest Assumption, Expected Outcome, Target Behavior Change)
- Experiment Method (Method Type, Sample Size, Planned Duration)
- Pre-Defined Success Criteria (Metric, Target Threshold, Actual Result, Met?)
- Additional Results (optional — Quantitative Metrics, Qualitative Results)
- Confirmed/Rejected Hypotheses (Status, Assumption Status, Core Learning)
- Strategic Context (Vortex Stream, Assumption Tested, Decision It Informs, Implications)
- Production Readiness (Metrics to Monitor, Expected Production Behavior, Signal Thresholds)

**If your input is non-conforming:** That's fine — we don't reject experiment context. I'll guide you to identify which elements are present and which gaps we need to work around during behavior analysis. The more complete the experiment context, the sharper the baseline comparison. But even partial context is better than none — here's what we're seeing in context with whatever you can provide.

### 4. Describe the Behavior You're Observing

While I validate your experiment context, describe the production behavior that prompted this analysis:

| Field | Your Observation |
|-------|-----------------|
| **What behavior are you seeing?** | Describe the specific user behavior or pattern you've noticed |
| **How does it differ from what you expected?** | What did you expect users to do vs. what they're actually doing? |
| **When did you first notice it?** | Approximate time frame |
| **Which users or segments?** | Who is exhibiting this behavior? |

This gives us the raw observation that we'll compare against experiment baselines in Step 2.

> For the full HC4 schema reference, see `{project-root}/_bmad/bme/_vortex/contracts/hc4-experiment-context.md`

---

## Your Turn

Please provide your experiment context and describe the behavior you're observing. I'll validate the experiment input and we'll proceed to establishing baselines for comparison.

## Next Step

When your experiment context is provided and validated, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/behavior-analysis/steps/step-02-context.md
