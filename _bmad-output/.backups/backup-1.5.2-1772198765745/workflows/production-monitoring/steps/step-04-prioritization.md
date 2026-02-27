---
step: 4
workflow: production-monitoring
title: Signal Prioritization & Anomaly Flagging
---

# Step 4: Signal Prioritization & Anomaly Flagging

We've assessed divergence for every experiment in the portfolio. Now we prioritize — ranking signals so Max knows which experiments need attention first — and flag anomalies that may warrant routing to Isla for discovery research. Prioritization converts portfolio monitoring into actionable intelligence.

## Why This Matters

Not all divergence is equal. A critical regression in a high-traffic experiment is more urgent than a slight variance in a small-scope test. Prioritization gives Max a ranked view of the portfolio — the signal indicates which experiments demand immediate attention and which can continue being monitored. And anomaly detection at portfolio scale surfaces unexpected patterns that single-experiment analysis might miss — cross-experiment anomalies often reveal systemic issues or emergent user behaviors.

## Your Task

### 1. Signal Prioritization

For each experiment's signal from Step 3, assign a priority level based on three factors:

**Prioritization Framework:**
- **Divergence Severity** — How far the signal has moved from the validated baseline (`Critical` / `Warning` / `Informational`)
- **Affected Scope** — How many users, segments, or features are impacted (`Wide` / `Moderate` / `Narrow`)
- **Data Confidence** — How reliable the underlying data is (`High` / `Medium` / `Low`)

**Priority Levels:**
- **P1 (Immediate)** — Critical divergence + wide scope + high confidence. This experiment needs Max's attention now.
- **P2 (Attention)** — Warning-level divergence OR wide scope with medium confidence. This experiment should be on Max's radar.
- **P3 (Monitor)** — Informational divergence OR narrow scope OR low confidence. Continue monitoring, no urgent action.

### 2. Prioritized Signal Summary

Compile the prioritized portfolio view:

| Priority | Experiment | Signal | Divergence Severity | Scope | Confidence | Trajectory |
|----------|-----------|--------|-------------------|-------|-----------|-----------|
| P1 | *name* | *one-sentence signal* | Critical / Warning / Info | Wide / Mod / Narrow | High / Med / Low | *direction* |
| P2 | *name* | *one-sentence signal* | Critical / Warning / Info | Wide / Mod / Narrow | High / Med / Low | *direction* |
| P3 | *name* | *one-sentence signal* | Critical / Warning / Info | Wide / Mod / Narrow | High / Med / Low | *direction* |

### 3. Anomaly Flagging & HC10 Routing Assessment

For each experiment, assess whether any signals represent anomalous behavior warranting routing to Isla for discovery research:

| Experiment | Anomaly Detected? | Description | HC10 Routing? | Rationale |
|-----------|-------------------|-------------|---------------|-----------|
| *name* | Yes / No | *what unexpected behavior was observed* | Yes / No | *why or why not* |
| *name* | Yes / No | | | |

**Guidance on anomaly flagging:**
- Flag when production behavior reveals user intent the experiment didn't anticipate
- Flag when cross-experiment patterns suggest systemic behavior shifts
- Do NOT flag if the divergence is explained by the experiment's own baseline predictions
- Do NOT flag if the anomaly is isolated, transient, or easily explained by external factors

### 4. Per-Experiment Data Quality Assessment

Before packaging portfolio intelligence, assess data quality for each experiment:

| Experiment | Sample Size | Data Completeness | Known Biases | Confidence |
|-----------|------------|-------------------|-------------|-----------|
| *name* | *volume* | Complete / Gaps | *any biases* | High / Med / Low |
| *name* | *volume* | Complete / Gaps | *any biases* | High / Med / Low |

### 5. Portfolio-Level Data Quality Summary

| Field | Your Assessment |
|-------|---------------|
| **Overall Portfolio Confidence** | `High` / `Medium` / `Low` — aggregate confidence across all experiments |
| **Experiments with Insufficient Data** | Which experiments (if any) have data quality too low for reliable prioritization? |
| **Cross-Experiment Data Consistency** | Are the observation periods and measurement methods consistent across experiments? |
| **Portfolio Coverage** | Does the portfolio include all active experiments, or are some missing? |

**Guidance on portfolio confidence:**
- **High:** All experiments have sufficient data, consistent measurement, and no significant gaps
- **Medium:** Most experiments have adequate data but some have gaps or potential biases
- **Low:** Multiple experiments have insufficient data or significant quality concerns

---

## Your Turn

Prioritize signals using the P1/P2/P3 framework, flag anomalies for HC10 routing, and assess data quality per experiment and at portfolio level. The prioritized signal summary is the core input for the portfolio signal report in the next step.

---

**[a]** Advanced Elicitation — Deep dive into signal prioritization with guided questioning
**[p]** Party Mode — Bring in other Vortex agents for collaborative prioritization review
**[c]** Continue — Proceed to synthesis and HC5 portfolio artifact generation

---

## Next Step

When your signal prioritization and anomaly flagging are complete, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/production-monitoring/steps/step-05-synthesize.md
