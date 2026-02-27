---
step: 3
workflow: experiment-design
title: Experiment Methodology & Success Criteria
---

# Step 3: Experiment Methodology & Success Criteria

You know what assumption to test and what question the experiment needs to answer. Now let's design the experiment — methodology, metrics, success criteria, and duration. The key rule: define success before you see results.

## Why This Matters

The most dangerous moment in an experiment is after you see the data. That's when teams move the goalposts — "well, we didn't hit our target, but the qualitative feedback was positive!" Pre-defined success criteria prevent this. You commit to what success looks like before the experiment runs, and you hold yourself to it. No rationalizing. No reinterpreting. The data either supports the hypothesis or it doesn't.

## Your Task

### 1. Select Experiment Methodology

Choose the methodology that best fits your target assumption and constraints from Step 2:

| Methodology | Best For | Signal Strength | Cost/Effort |
|------------|---------|-----------------|-------------|
| **User Interview** | Validating user motivations, pain points, willingness | Qualitative (moderate) | Low |
| **Concierge Test** | Testing value proposition with manual delivery | Moderate | Medium |
| **Landing Page / Smoke Test** | Testing demand and willingness to act | Moderate | Low-Medium |
| **Prototype Test** | Testing usability and comprehension | Moderate-High | Medium |
| **A/B Test** | Testing behavior change at scale | High (quantitative) | High |
| **Wizard of Oz** | Testing experience without building | Moderate-High | Medium |

**Challenge:** Are you picking the right methodology, or the comfortable one? If the assumption is about user behavior at scale, a 5-person interview won't cut it. If the assumption is about willingness to pay, a landing page with no price won't test it. Match the methodology to the assumption, not to your budget.

### 2. Define Pre-Defined Success Criteria

**This is the most important part of experiment design.** Define success criteria BEFORE seeing any results:

| Criterion | Metric | Target Threshold | What It Means |
|-----------|--------|-----------------|---------------|
| **Primary** | *The key metric that determines pass/fail* | *Specific number or percentage* | *If we hit this, the assumption is supported* |
| **Secondary** | *Supporting metric* | *Specific threshold* | *Additional signal that strengthens or weakens the finding* |
| **Kill Criteria** | *What would definitively invalidate the assumption* | *Specific threshold* | *If we see this, the hypothesis is dead — no rationalizing* |

**Guidance:**
- Thresholds must be **specific and measurable** — not "significant improvement" but "15% increase in conversion"
- Define what **invalidation** looks like — what result would prove the assumption wrong?
- Commit to these BEFORE the experiment runs. Write them down. Don't change them.

### 3. Select Metrics

**Primary Metric** — The single metric that determines experiment outcome:

| Element | Your answer |
|---------|------------|
| **Metric Name** | *What are you measuring?* |
| **How Measured** | *Tool, method, or observation technique* |
| **Baseline** | *Current value or expected control value* |
| **Target** | *What value would support the assumption?* |
| **Minimum Detectable Effect** | *Smallest meaningful difference* |

**Secondary Metrics** — Additional signals to monitor (don't optimize for these):

| Metric | Purpose | How Measured |
|--------|---------|-------------|
| *Secondary metric 1* | *What additional signal does this provide?* | *Tool or method* |
| *Secondary metric 2* | *What additional signal does this provide?* | *Tool or method* |

### 4. Estimate Duration and Sample Size

| Element | Your estimate | Rationale |
|---------|--------------|-----------|
| **Duration** | *How long will the experiment run?* | *Why this timeframe?* |
| **Sample Size** | *How many participants/data points?* | *Minimum needed for signal* |
| **Recruitment** | *How will you find participants?* | *Channel, criteria, incentives* |
| **Controls** | *What's the baseline comparison?* | *Control group, historical data, or before/after* |

**Challenge:** Is your sample size big enough to detect the effect you're looking for? Is the duration long enough for the behavior change to manifest? Don't design a 1-week test for a behavior that takes 3 weeks to change.

### 5. Produce the Experiment Brief

Consolidate your design into a structured experiment brief:

| Field | Value |
|-------|-------|
| **Experiment Name** | *Descriptive name* |
| **Target Assumption** | *From Step 2* |
| **Methodology** | *Selected approach* |
| **Hypothesis Statement** | *"We believe that [target users] will [expected behavior] because [rationale]"* |
| **Primary Metric** | *Key indicator + target threshold* |
| **Secondary Metrics** | *Supporting indicators* |
| **Success Criteria** | *Pre-defined pass/fail thresholds* |
| **Kill Criteria** | *What would invalidate the assumption* |
| **Sample Size** | *Minimum participants/data points* |
| **Duration** | *Estimated timeframe* |
| **Recruitment** | *How participants are selected* |
| **Controls** | *Baseline comparison method* |

---

## Your Turn

Design the experiment: select methodology, define success criteria with specific thresholds, choose metrics, and estimate duration. Share your experiment brief and I'll help you stress-test it.

---

**[a]** Advanced Elicitation — Deep dive into experiment design with guided questioning
**[p]** Party Mode — Bring in other Vortex agents to challenge your experiment design
**[c]** Continue — Proceed to synthesis and routing

---

## Next Step

When your experiment brief is complete, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/experiment-design/steps/step-04-synthesize.md
