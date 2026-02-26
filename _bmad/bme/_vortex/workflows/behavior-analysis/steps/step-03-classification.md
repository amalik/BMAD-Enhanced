---
step: 3
workflow: behavior-analysis
title: Behavior Pattern Classification
---

# Step 3: Behavior Pattern Classification

We have the experiment baselines and the observed behavior. Now we classify what the behavior means. This is the core of behavior analysis — converting raw observation into categorized intelligence that tells the decision-maker whether production is confirming, regressing, or revealing.

## Why This Matters

Classification converts raw observation into actionable intelligence. Without classification, a behavior pattern is just a data point. With classification, it becomes a signal with clear routing implications: expected variance means the experiment model is holding, regression means something validated is degrading, and novel behavior means users are telling you something the experiment didn't ask. Each classification carries different weight and routes to different next steps. The signal indicates different things depending on which category the behavior falls into.

## Your Task

### 1. Behavior Pattern Analysis

Compare the observed behavior to your experiment baselines. Analyze across multiple dimensions:

| Dimension | Your Analysis |
|-----------|-------------|
| **Metric Comparison** | How do the behavioral metrics compare to experiment-validated thresholds? Within tolerance or outside? |
| **Segment Behavior** | Are all user segments behaving consistently, or are specific segments diverging? |
| **Usage Patterns** | Do usage patterns match what the experiment predicted? Frequency, duration, feature paths? |
| **Timing** | Is the behavior consistent over time, or does it vary by time of day, week, or stage of adoption? |
| **Edge Cases** | Are edge cases or boundary conditions producing unexpected behavior? |
| **Feature Interaction** | Are users interacting with the feature in ways the experiment didn't measure? |

### 2. Classify Each Behavior Pattern

For each distinct behavior pattern observed, classify it into one of three categories:

#### Category 1: Expected Variance

Behavior falls within experiment-predicted tolerance. The experiment model is holding.

| Field | Your Classification |
|-------|-------------------|
| **Behavior** | What specific behavior falls within expected range |
| **Baseline Reference** | Which experiment baseline confirms this is expected |
| **Tolerance Range** | What variance was predicted? Where does the observed behavior fall? |
| **Confidence** | How certain is this classification? |

#### Category 2: Regression

Behavior diverges negatively from validated experiment performance. Something that was working is degrading.

| Field | Your Classification |
|-------|-------------------|
| **Behavior** | What specific behavior is degrading from validated performance |
| **Baseline Reference** | Which validated metric is being underperformed |
| **Deviation** | How far has behavior moved from the validated baseline? Quantify. |
| **Trajectory** | Is the regression accelerating, decelerating, or stable? |
| **Possible Factors** | What observable factors might be contributing? (factual only, not speculative strategy) |

#### Category 3: Novel Behavior

Behavior not covered by the original experiment hypothesis. Users are doing something the experiment didn't predict.

| Field | Your Classification |
|-------|-------------------|
| **Behavior** | What behavior was observed that the experiment didn't anticipate |
| **Why It's Novel** | How does this fall outside the experiment's prediction model? |
| **Scope** | How widespread is this behavior? Which users, how frequently? |
| **Behavioral Signal** | What might this behavior indicate about user intent? (observational, not prescriptive) |

### 3. Classification Summary

Summarize all classified behavior patterns:

| # | Behavior Pattern | Classification | Key Evidence | Confidence |
|---|-----------------|---------------|-------------|-----------|
| 1 | *describe* | Expected Variance / Regression / Novel | *key metric* | High / Medium / Low |
| 2 | *(if applicable)* | | | |
| 3 | *(if applicable)* | | | |

**Remember:** Noah classifies and reports. Strategic decisions about what to do with these classifications belong downstream with Max. The classification tells you what the behavior is — the decision about what it means for the product direction is not ours to make.

---

## Your Turn

Analyze the behavior patterns against experiment baselines, classify each into the appropriate category, and complete the classification summary. Share your analysis and I'll help refine the classifications before we move to evidence gathering.

---

**[a]** Advanced Elicitation — Deep dive into behavior classification with guided questioning
**[p]** Party Mode — Bring in other Vortex agents for collaborative behavior pattern analysis
**[c]** Continue — Proceed to evidence gathering and data quality assessment

---

## Next Step

When your behavior patterns are classified, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/behavior-analysis/steps/step-04-evidence.md
