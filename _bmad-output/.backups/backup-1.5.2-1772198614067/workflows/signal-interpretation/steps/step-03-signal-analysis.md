---
step: 3
workflow: signal-interpretation
title: Signal Description & Trend Analysis
---

# Step 3: Signal Description & Trend Analysis

Now we move from context to analysis. We have the experiment lineage, the Vortex history, and a production signal to investigate. This step produces two core components of the HC5 signal report: a factual signal description and a data-driven trend analysis.

## Why This Matters

Signal + context + trend — that's the interpretation frame. Without all three, you're guessing. The signal description tells you what happened. The context (from Step 2) tells you why it matters. The trend analysis tells you where it's heading. Together, they produce intelligence that a dashboard cannot — because dashboards show numbers, not narratives grounded in experiment history.

## Your Task

### 1. Signal Description

Describe the production signal factually. No interpretation yet — just what happened.

| Field | Your Analysis |
|-------|-------------|
| **Signal Summary** | One-sentence factual description of what was observed in production |
| **Signal Type** | `Metric Deviation` / `Behavior Pattern` / `Anomaly` / `Trend Shift` / `Threshold Breach` |
| **Severity** | `Critical` / `Warning` / `Informational` |
| **Detection Method** | How the signal was detected (monitoring alert, user report, metric analysis, routine review) |
| **Time Window** | When the signal was observed (date range) |
| **Affected Scope** | Which users, segments, or features are affected |

**Guidance on severity:**
- **Critical:** Signal indicates production behavior that contradicts experiment predictions or poses immediate risk
- **Warning:** Signal shows meaningful deviation from expected behavior that warrants investigation
- **Informational:** Signal shows minor deviation or confirms expected behavior — worth documenting but not alarming

### 2. Trend Analysis

Now let's analyze the signal's trajectory. The signal indicates a direction — let's quantify it:

| Field | Your Analysis |
|-------|-------------|
| **Trend Direction** | `Improving` / `Degrading` / `Stable` / `Oscillating` / `Insufficient Data` |
| **Trend Duration** | How long the trend has been observed (e.g., "2 weeks", "since launch") |
| **Rate of Change** | How quickly the signal is moving (e.g., "5% week-over-week decline", "steady 2% monthly growth") |
| **Baseline Comparison** | Comparison to pre-experiment or validated baseline — how does the current state compare to what existed before the experiment? |
| **Confidence** | `High` / `Medium` / `Low` — based on data quality and sample size |

**Guidance on trend direction:**
- **Improving:** Signal is moving toward expected/desired behavior
- **Degrading:** Signal is moving away from expected behavior — divergence increasing
- **Stable:** Signal is holding steady — no significant change
- **Oscillating:** Signal is fluctuating without a clear direction
- **Insufficient Data:** Not enough data points to determine a trend reliably

### 3. Connect Signal to Experiment Expectations

This is where signal interpretation lives — connecting what you're seeing to what was predicted:

| Question | Your Assessment |
|----------|----------------|
| **Does the signal align with experiment predictions?** | Does production behavior match what the experiment predicted in its Production Readiness section? |
| **Where does it diverge?** | What specific aspects of the signal differ from experiment expectations? |
| **Is the divergence within tolerance?** | Is the gap between actual and expected within acceptable ranges, or does it warrant deeper investigation? |
| **What does the trend suggest?** | Is the divergence growing, shrinking, or stable over time? |

**Remember:** Noah observes and reports. Strategic decisions about what to do with this intelligence belong downstream with Max. The signal indicates what's happening — the decision about what it means for the product direction is not ours to make.

---

## Your Turn

Complete the signal description and trend analysis tables. Connect the signal to experiment expectations and assess where actual behavior diverges from predicted behavior.

---

**[a]** Advanced Elicitation — Deep dive into signal patterns with guided questioning
**[p]** Party Mode — Bring in other Vortex agents for collaborative signal interpretation
**[c]** Continue — Proceed to anomaly detection and data quality assessment

---

## Next Step

When your signal description and trend analysis are complete, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/signal-interpretation/steps/step-04-anomaly-detection.md
