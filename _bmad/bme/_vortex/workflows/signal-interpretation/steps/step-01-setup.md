---
step: 1
workflow: signal-interpretation
title: Setup & Input Validation
---

# Step 1: Setup & Input Validation

Before we interpret any production signals, we need to understand the experiment that produced the current state. Production data is the most honest user feedback — it can't lie — but it means nothing without the experiment context that gives it meaning.

## Why This Matters

A production metric viewed in isolation is just a number. A 20% drop in feature adoption could be alarming or exactly what the experiment predicted. The signal indicates something very different depending on which experiment graduated to production, what hypothesis was tested, and what behavior was expected. Without that experiment context, you're reading tea leaves instead of intelligence.

## Your Task

### 1. What Experiment Context Do You Have?

Noah expects experiment context — ideally produced by Wade's experimentation workflow as an HC4-compliant artifact:
- **HC4 Experiment Context** (from Wade's `lean-experiment` workflow)
- **HC4 Experiment Context** (from Wade's `proof-of-concept`, `proof-of-value`, or `mvp` workflows)

You can also bring **any well-formed experiment summary** — Noah accepts input from outside the Vortex pattern. It doesn't have to be HC4-compliant, but having structured experiment results with explicit success criteria and confirmed/rejected hypotheses makes signal interpretation dramatically more precise.

### 2. Provide Your Input

Please provide the file path or describe the experiment context you want to interpret signals for. For example:
- `_bmad-output/vortex-artifacts/hc4-experiment-context-2026-02-25.md`
- Or: "I have experiment results and production metrics I'd like to analyze"

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

**If your input is non-conforming:** That's fine — we don't reject experiment context. I'll guide you to identify which elements are present and which gaps we need to work around during signal interpretation. The more complete the experiment context, the more precise the signal analysis. But even partial context is better than none — here's what we're seeing in context with whatever you can provide.

> For the full HC4 schema reference, see `{project-root}/_bmad/bme/_vortex/contracts/hc4-experiment-context.md`

---

## Your Turn

Please provide your experiment context — file path, description, or both. I'll validate it and we'll proceed to connecting it with your production signal.

## Next Step

When your experiment context is provided and validated, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/signal-interpretation/steps/step-02-context.md
