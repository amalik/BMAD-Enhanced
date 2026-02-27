---
step: 3
workflow: production-monitoring
title: Signal Monitoring & Divergence Assessment
---

# Step 3: Signal Monitoring & Divergence Assessment

We have the portfolio assembled with baselines mapped. Now we monitor — checking each experiment's production signals against its validated baselines and assessing how far reality has drifted from what the experiments predicted. Divergence is the signal. The degree of divergence tells you which experiments need attention.

## Why This Matters

Monitoring without divergence assessment is just looking at dashboards. Divergence assessment converts dashboard readings into portfolio intelligence. For each experiment, we need to know: is the production signal tracking the validated baseline, drifting slightly, or diverging significantly? The signal indicates something very different at each level of divergence. And at portfolio scale, patterns across experiments — correlated divergence, shared impacts, interaction effects — surface insights that single-experiment monitoring cannot reveal.

## Your Task

### 1. Per-Experiment Signal Assessment

For each experiment in the portfolio, assess the current production signals against baselines:

**Repeat this table for each experiment:**

| Field | Experiment: *[name]* |
|-------|---------------------|
| **Observed Signal** | What production signal are you seeing? Describe factually with specific metrics. |
| **Baseline Reference** | Which validated baseline is this signal being compared to? (from Step 2) |
| **Divergence** | How far has the observed signal moved from the baseline? Quantify the gap. |
| **Divergence Direction** | `Positive` (outperforming) / `Negative` (underperforming) / `Lateral` (different dimension) |
| **Signal Trajectory** | `Improving` / `Degrading` / `Stable` / `Oscillating` / `Insufficient Data` |
| **Observation Period** | When was this signal observed? (date range) |
| **Affected Scope** | Which users, segments, or features are affected? |

### 2. Per-Experiment Signal Summary

Compile the signal assessments into a monitoring summary:

| # | Experiment | Signal | Divergence | Direction | Trajectory | Scope |
|---|-----------|--------|-----------|-----------|-----------|-------|
| 1 | *name* | *one-sentence signal* | *quantified gap* | Pos / Neg / Lat | Improving / Degrading / Stable | *scope* |
| 2 | *name* | *one-sentence signal* | *quantified gap* | Pos / Neg / Lat | Improving / Degrading / Stable | *scope* |
| 3 | *(if applicable)* | | | | | |

### 3. Cross-Experiment Pattern Analysis

Now look across the portfolio for patterns that single-experiment monitoring misses:

| Pattern | Your Analysis |
|---------|-------------|
| **Correlated Divergence** | Are multiple experiments diverging in the same direction at the same time? What might they share? |
| **Shared Impact Areas** | Do any experiments affect the same users, segments, or features? Are their signals interacting? |
| **Timing Patterns** | Did divergence start at the same time across experiments? Are there external events that could explain coordinated movement? |
| **Contradictory Signals** | Are any experiments showing signals that contradict each other? (e.g., one improving while a related one degrades) |

**Remember:** Noah observes and reports patterns. Whether correlated divergence means something strategic is Max's determination. The signal indicates patterns — we don't prescribe responses.

---

## Your Turn

Assess production signals for each experiment against its baselines, compile the monitoring summary, and analyze cross-experiment patterns. The divergence assessments feed directly into prioritization in the next step.

---

**[a]** Advanced Elicitation — Deep dive into signal monitoring with guided questioning
**[p]** Party Mode — Bring in other Vortex agents for collaborative signal assessment
**[c]** Continue — Proceed to signal prioritization and anomaly flagging

---

## Next Step

When your signal monitoring and divergence assessments are complete, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/production-monitoring/steps/step-04-prioritization.md
