---
step: 2
workflow: signal-interpretation
title: Experiment Context & Signal Connection
---

# Step 2: Experiment Context & Signal Connection

Now that we have validated experiment context, let's connect it to the production signal you're investigating. Raw metrics mean nothing without interpretation frames — this step builds those frames.

## Why This Matters

Every production signal has a lineage. The feature behavior you're seeing didn't appear from nowhere — it emerged from a specific experiment that tested a specific hypothesis about specific user behavior. When that lineage is explicit, the signal tells a story. When it's missing, the signal is just noise. Here's what we're seeing in context: that's the difference between intelligence and dashboards.

## Your Task

### 1. Extract Experiment Lineage

Let's trace the experiment that produced the current production state:

| Field | Your Input |
|-------|-----------|
| **Originating Experiment** | Name and reference to the HC4 experiment that led to this production state |
| **Original Hypothesis** | The hypothesis that was tested (from HC4 Section 2) |
| **Experiment Outcome** | Was the hypothesis confirmed, rejected, or partially confirmed? (from HC4 Section 6) |
| **Expected Production Behavior** | What was expected to happen in production based on experiment results (from HC4 Section 8) |
| **Actual vs Expected** | How does the observed production signal compare to what was predicted? |

This is the core of signal interpretation — connecting what you're seeing now to what was expected based on the experiment. If actual matches expected, the signal confirms the experiment. If it diverges, that divergence is the signal worth investigating.

### 2. Map the Vortex History

Production signals don't exist in isolation within the Vortex journey. Let's connect to the broader context:

| Field | Your Input |
|-------|-----------|
| **Problem Definition** | Reference to the HC2 problem definition that started this Vortex journey (if available) |
| **Hypothesis Origin** | Reference to the HC3 hypothesis contract that this experiment tested (if available) |
| **Previous Signals** | References to any prior HC5 signal reports for this experiment or feature (if any) |
| **Related Experiments** | Other experiments that may be influencing the same production area |

Not all of these will be available — that's fine. Each connection adds depth to your signal interpretation. Even without formal Vortex artifacts, understanding the broader experiment history enriches the analysis.

### 3. Describe the Production Signal

Now let's identify the specific production signal you want to interpret:

| Field | Your Input |
|-------|-----------|
| **What are you observing?** | Describe the production behavior or metric that prompted this analysis |
| **When did it start?** | Time window of the observation |
| **Who is affected?** | Which users, segments, or features show this signal |
| **How was it detected?** | Monitoring alert, user report, manual analysis, routine metric review |

This gives us the raw signal that we'll analyze in depth during Step 3.

---

## Your Turn

Extract your experiment lineage, map the Vortex history connections you have available, and describe the production signal you're investigating. The more context you provide here, the more precise the signal analysis will be in the next step.

## Next Step

When your experiment context is connected and the production signal is described, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/signal-interpretation/steps/step-03-signal-analysis.md
