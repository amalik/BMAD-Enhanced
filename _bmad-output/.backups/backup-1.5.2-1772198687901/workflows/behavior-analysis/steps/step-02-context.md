---
step: 2
workflow: behavior-analysis
title: Experiment Baselines & Behavior Observation
---

# Step 2: Experiment Baselines & Behavior Observation

Now that we have validated experiment context, let's extract the baselines that define what "expected behavior" looks like — and document the observed behavior we'll classify against those baselines.

## Why This Matters

Behavior only becomes meaningful when compared to what was expected. The experiment established baselines: success criteria were met (or not), specific metrics were validated, and production behavior was predicted. Those baselines are the ruler against which every observed behavior is measured. Without explicit baselines, classification is guesswork. With them, the signal indicates whether production is confirming the experiment, diverging from it, or revealing something the experiment never anticipated.

## Your Task

### 1. Extract Experiment Baselines

From the HC4 artifact (or equivalent), extract the validated baselines that behavior will be compared against:

| Field | Your Baseline |
|-------|-------------|
| **Validated Success Metrics** | Which metrics were confirmed in the experiment? What were the actual values? |
| **Expected Production Behavior** | What behavior did the experiment predict for production? (from HC4 Section 8) |
| **Signal Thresholds** | What thresholds were defined for acceptable vs. concerning behavior? (from HC4 Section 8) |
| **Target Behavior Change** | What specific user behavior change was the experiment designed to produce? (from HC4 Section 2) |
| **Confirmed Hypothesis Elements** | Which parts of the hypothesis were confirmed? These define what "expected" means. |

These baselines form the comparison frame for Step 3's classification. Every observed behavior will be measured against these specific, experiment-validated benchmarks.

### 2. Document the Behavior Observation

Now let's formalize the behavior observation from Step 1 into a structured description:

| Field | Your Observation |
|-------|-----------------|
| **Behavior Summary** | One-sentence factual description of the production behavior being analyzed |
| **Observation Period** | When the behavior was observed (date range) |
| **Affected Users/Segments** | Which users, segments, or features exhibit this behavior |
| **Detection Method** | How the behavior came to attention (monitoring, user report, manual analysis, routine review) |
| **Behavioral Metrics** | Specific metrics that capture this behavior (e.g., adoption rate, usage frequency, task completion) |
| **Comparison to Baseline** | Initial assessment — how does this behavior compare to the experiment baselines extracted above? |

### 3. Map the Vortex History

Production behavior doesn't exist in isolation within the Vortex journey. Let's connect to the broader context:

| Field | Your Input |
|-------|-----------|
| **Problem Definition** | Reference to the HC2 problem definition that started this Vortex journey (if available) |
| **Hypothesis Origin** | Reference to the HC3 hypothesis contract that this experiment tested (if available) |
| **Previous Signals** | References to any prior HC5 signal reports for this experiment or feature (if any) |
| **Related Experiments** | Other experiments that may be influencing the same production area |

Not all of these will be available — that's fine. Each connection adds depth to your behavior analysis. Even without formal Vortex artifacts, understanding the broader experiment history enriches the classification.

---

## Your Turn

Extract your experiment baselines, document the behavior observation, and map available Vortex history connections. The more precise the baselines, the more accurate the classification in the next step.

## Next Step

When your experiment baselines are extracted and behavior is documented, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/behavior-analysis/steps/step-03-classification.md
