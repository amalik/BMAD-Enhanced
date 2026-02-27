---
step: 4
workflow: behavior-analysis
title: Evidence Gathering & Data Quality
---

# Step 4: Evidence Gathering & Data Quality

We've classified the behavior patterns. Now we build the evidence base that supports each classification and assess whether the data underlying our analysis is trustworthy. Evidence strength determines routing confidence — the stronger the evidence, the more decisive the Compass recommendation.

## Why This Matters

Classification without evidence is opinion. Evidence converts classification into intelligence. For each behavior pattern classified in Step 3, we need quantified metrics, specific comparisons to baselines, and honest assessment of data quality. And before we package any of this as intelligence, we need to know how much we can trust the data. Anomaly detection surfaces what dashboards hide — but only when the evidence is solid enough to support the finding.

## Your Task

### 1. Evidence Gathering by Classification

For each behavior pattern classified in Step 3, gather supporting evidence:

**For Expected Variance classifications:**

| Field | Your Evidence |
|-------|-------------|
| **Metric Match** | Specific metrics showing behavior within experiment-predicted tolerance |
| **Baseline Alignment** | How closely does observed behavior track the validated baseline? |
| **Duration** | How long has the behavior been within expected range? |
| **Consistency** | Is the variance consistent across segments, or concentrated in specific groups? |

**For Regression classifications:**

| Field | Your Evidence |
|-------|-------------|
| **Deviation Metrics** | Specific metrics showing divergence from validated performance, quantified |
| **Regression Timeline** | When did the regression start? How has it progressed? |
| **Rate of Change** | How quickly is the regression occurring? (e.g., "3% week-over-week decline") |
| **Scope Impact** | Which users/segments/features are affected and to what degree? |
| **Contributing Factors** | Observable factors that correlate with the regression (factual, not speculative) |

**For Novel Behavior classifications:**

| Field | Your Evidence |
|-------|-------------|
| **Behavior Metrics** | Specific metrics capturing the novel behavior pattern |
| **Experiment Gap** | What specifically was not measured or predicted by the experiment? |
| **Scope & Frequency** | How many users, how often, in what contexts? |
| **Behavioral Context** | What are users doing before and after the novel behavior? |
| **Discovery Questions** | What specific questions would need answers to understand this behavior? |

### 2. HC10 Novel Behavior Routing Assessment

If you identified Novel Behavior in Step 3, assess whether it warrants routing to Isla for discovery research:

| Assessment | Your Decision |
|-----------|--------------|
| **Novel behavior detected?** | Yes / No |
| **HC10 routing recommended?** | Yes / No |
| **Rationale** | Why or why not — what makes this novel behavior significant enough (or not) for discovery research? |
| **Discovery Focus** | If yes: What specific questions should Isla investigate about this behavior? |

**Guidance on HC10 routing:**
- Route to Isla when novel behavior reveals user intent the experiment didn't anticipate
- Route to Isla when the behavior pattern is widespread enough to warrant investigation
- Do NOT route if the novel behavior is isolated, transient, or easily explained by external factors

### 3. Data Quality Assessment

Before we package this analysis as intelligence, let's assess the reliability of the data:

| Field | Your Assessment |
|-------|----------------|
| **Sample Size** | Volume of data underlying the behavior analysis — is it sufficient for the classifications made? |
| **Data Completeness** | Was data collection complete, or were there gaps? (e.g., tracking failures, partial rollouts, missing segments) |
| **Known Biases** | Any sampling or measurement biases that may affect classification (e.g., self-selection, survivorship bias, time-of-day effects) |
| **Confidence Level** | `High` / `Medium` / `Low` — overall confidence in the behavior classifications given data quality |

**Guidance on confidence:**
- **High:** Large sample, complete data, no known biases — classifications are reliable
- **Medium:** Adequate sample but some gaps or potential biases — classifications are directionally sound but should be interpreted with caveats
- **Low:** Small sample, significant gaps, or notable biases — classifications are preliminary and should not drive major decisions without additional data

---

## Your Turn

Gather evidence for each classification, assess whether novel behavior warrants HC10 routing to Isla, and evaluate data quality. The strength of your evidence determines the confidence of the final behavioral signal report.

---

**[a]** Advanced Elicitation — Deep dive into evidence strengthening with guided questioning
**[p]** Party Mode — Bring in other Vortex agents for collaborative evidence assessment
**[c]** Continue — Proceed to synthesis and HC5 artifact generation

---

## Next Step

When your evidence gathering and data quality assessment are complete, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/behavior-analysis/steps/step-05-synthesize.md
