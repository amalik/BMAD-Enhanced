---
step: 4
workflow: signal-interpretation
title: Anomaly Detection & Data Quality
---

# Step 4: Anomaly Detection & Data Quality

We've described the signal and analyzed its trend. Now we look for what doesn't fit — unexpected behavior patterns not covered by the original hypothesis — and assess whether the data underlying our analysis is trustworthy.

## Why This Matters

Anomaly detection surfaces what dashboards hide. Dashboards show you what you asked to measure. Anomalies show you what you didn't think to measure — behavior patterns that fall outside the experiment's prediction model. These unexpected patterns are often the most valuable signals because they reveal user intent that the original hypothesis didn't anticipate. And before we package any of this as intelligence, we need to know how much we can trust the data.

## Your Task

### 1. Anomaly Detection

Look beyond the expected signal. Behavioral patterns reveal intent that surveys miss — and anomalies reveal what the experiment model didn't predict.

**Does the production data show unexpected behavior not covered by the original hypothesis?**

If unexpected patterns are present, document them:

| Field | Your Analysis |
|-------|-------------|
| **Anomaly Description** | What unexpected behavior was observed? Describe it factually. |
| **Deviation from Expected** | How does this differ from what the experiment predicted? What did the hypothesis expect vs. what actually happened? |
| **Potential Explanations** | Possible reasons for the anomaly — factual explanations only, not speculative strategy |
| **Discovery Needed** | Does this warrant routing to Isla for investigation? `Yes` / `No` |
| **Discovery Focus** | If yes: What specific questions should Isla investigate about this anomaly? |

**Guidance on anomaly identification:**
- Look for user segments behaving differently than predicted
- Check for usage patterns the experiment didn't measure
- Examine edge cases where the feature is being used in unexpected ways
- Compare actual user flows to the experiment's expected behavior model
- Look for timing patterns — are behaviors different at different times or stages?

**If no anomalies detected:** Document that production behavior aligns with experiment predictions within expected tolerance. This is a valid and valuable finding — it confirms the experiment's model.

### 2. HC10 Anomaly Routing Assessment

If you identified anomalies that warrant discovery research:

**HC10 Routing Flag:**
When unexpected behavior is detected that falls outside the experiment's hypothesis, this signals a potential routing to Isla for discovery research. The anomaly information passed to Isla includes:
- Anomaly description + how it deviates from experiment expectations
- Suggested discovery focus questions

This routing will be presented in the Vortex Compass during Step 5. For now, document whether an HC10 flag is appropriate based on your anomaly analysis.

| Assessment | Your Decision |
|-----------|--------------|
| **Anomalous behavior detected?** | Yes / No |
| **HC10 routing recommended?** | Yes / No |
| **Rationale** | Why or why not — what makes this anomaly significant enough (or not) for discovery research? |

### 3. Data Quality Assessment

Before we package this analysis as intelligence, let's assess the reliability of the data:

| Field | Your Assessment |
|-------|----------------|
| **Sample Size** | Volume of data underlying this signal — is it sufficient for the conclusions drawn? |
| **Data Completeness** | Was data collection complete, or were there gaps? (e.g., tracking failures, partial rollouts, missing segments) |
| **Known Biases** | Any sampling or measurement biases that may affect interpretation (e.g., self-selection, survivorship bias, time-of-day effects) |
| **Confidence Level** | `High` / `Medium` / `Low` — overall confidence in the signal analysis given data quality |

**Guidance on confidence:**
- **High:** Large sample, complete data, no known biases — conclusions are reliable
- **Medium:** Adequate sample but some gaps or potential biases — conclusions are directionally sound but should be interpreted with caveats
- **Low:** Small sample, significant gaps, or notable biases — conclusions are preliminary and should not drive major decisions without additional data

---

## Your Turn

Complete the anomaly detection analysis, assess whether HC10 routing to Isla is warranted, and evaluate data quality. If no anomalies were detected, document that finding — it's equally important.

---

**[a]** Advanced Elicitation — Deep dive into anomaly investigation with guided questioning
**[p]** Party Mode — Bring in other Vortex agents for collaborative anomaly assessment
**[c]** Continue — Proceed to synthesis and HC5 artifact generation

---

## Next Step

When your anomaly detection and data quality assessment are complete, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/signal-interpretation/steps/step-05-synthesize.md
