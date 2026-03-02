---
step: 2
workflow: lean-experiment
title: Design Experiment
---

# Step 2: Design Experiment

Now that we have a validated hypothesis, we need to design the leanest possible experiment to test it. Not the best experiment. Not the most thorough. The fastest, cheapest experiment that produces a clear signal.

## Why This Matters

The goal of a lean experiment is learning, not building. Every dollar and day spent on experiment infrastructure is a dollar and day not spent on the next experiment. The leanest experiment that produces a clear pass/fail signal wins — always. Overengineering an experiment is the same mistake as overengineering a product: you invested in confidence you didn't need yet.

## Your Task

### 1. Choose Your Experiment Type

Based on the hypothesis and its riskiest assumption, select the experiment type that produces a clear signal with the least investment:

| Type | When to Use | Example | Investment |
|------|-------------|---------|------------|
| **Concierge** | Manually deliver the product experience to a small group | Text dinner suggestions to 15 parents by hand | Days, minimal cost |
| **Wizard of Oz** | Simulate automation with manual behind-the-scenes work | Users see an "AI" recommendation; a human picks it | Days-weeks |
| **Smoke Test** | Test demand before building anything | Landing page with signup button, measure conversion | Hours-days |
| **A/B Test** | Compare two approaches with existing traffic | Show Feature A to 50%, Feature B to 50% | Requires existing traffic |
| **Prototype Test** | Test usability and comprehension | Clickable mockup with think-aloud observation | Days |

**Selection criteria:** Which type tests the **riskiest assumption** with the **least effort** and produces an **unambiguous signal**?

### 2. Define Your Experiment Design

| Field | Your Answer |
|-------|-------------|
| **Experiment Name** | A descriptive name for this experiment |
| **Type** | Selected from the table above |
| **Duration** | How long will the experiment run? |
| **Sample Size** | How many participants/users? (minimum viable for signal clarity) |
| **Target Population** | Who participates? How will you recruit them? |
| **What You'll Build** | The minimum artifact needed (landing page, script, prototype, etc.) |
| **What You Won't Build** | Explicitly list what's out of scope — this prevents scope creep |

### 3. Validate the Design

Before proceeding, stress-test your experiment design:

- [ ] **Does it test the riskiest assumption?** Not a secondary assumption. Not the easy one. The lethal one.
- [ ] **Is it truly minimal?** Could you make it cheaper, faster, or simpler and still get a clear signal?
- [ ] **Can it fail?** If every possible outcome looks like success, the experiment isn't testing anything.
- [ ] **Is the sample meaningful?** Too small = noise. Too large = wasted effort. What's the minimum for a clear signal?

---

## Your Turn

Define your experiment design using the fields above. Share your design and I'll help you trim it to the minimum viable experiment.

---

**[a]** Advanced Elicitation — Deep dive into experiment design trade-offs
**[p]** Party Mode — Bring in other Vortex agents for experiment critique
**[c]** Continue — Proceed to defining success metrics

## Next Step

When your experiment design is validated, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/lean-experiment/steps/step-03-metrics.md
