---
step: 2
workflow: production-monitoring
title: Portfolio Assembly & Baseline Mapping
---

# Step 2: Portfolio Assembly & Baseline Mapping

Now that we've validated the experiment contexts, let's assemble the portfolio view. Each experiment has its own baselines — validated metrics, expected production behavior, signal thresholds. Assembling these into a single portfolio gives us the monitoring frame that tells us where to look and what to look for.

## Why This Matters

Individual experiment baselines tell you what "expected" looks like for that experiment. A portfolio view tells you what "expected" looks like across all active experiments simultaneously. When you monitor signals without this portfolio frame, you're watching each experiment in isolation — and missing the cross-experiment context that reveals which experiments share production surface area, which baselines might interact, and where a signal in one experiment could affect another. The portfolio is the monitoring instrument.

## Your Task

### 1. Extract Baselines Per Experiment

For each validated experiment, extract the baselines that production signals will be compared against:

**Repeat this table for each experiment in the portfolio:**

| Field | Experiment: *[name]* |
|-------|---------------------|
| **Validated Success Metrics** | Which metrics were confirmed in the experiment? What were the actual values? |
| **Expected Production Behavior** | What behavior did the experiment predict for production? (from HC4 Section 8) |
| **Signal Thresholds** | What thresholds were defined for acceptable vs. concerning behavior? (from HC4 Section 8) |
| **Metrics to Monitor** | Which specific production metrics should be tracked? (from HC4 Section 8) |
| **Target Behavior Change** | What specific user behavior change was the experiment designed to produce? (from HC4 Section 2) |

### 2. Assemble the Portfolio Summary

Now let's bring all experiments into a single portfolio view:

| # | Experiment | Hypothesis | Key Metrics | Expected Behavior | Monitoring Scope |
|---|-----------|-----------|-------------|-------------------|-----------------|
| 1 | *name* | *one-sentence hypothesis* | *primary metrics* | *expected production behavior* | *users/segments/features* |
| 2 | *name* | *one-sentence hypothesis* | *primary metrics* | *expected production behavior* | *users/segments/features* |
| 3 | *(if applicable)* | | | | |

This portfolio summary becomes the monitoring dashboard — each row is an experiment you'll assess in Step 3.

### 3. Map Vortex History Per Experiment

For each experiment, connect to the broader Vortex journey where available:

| Field | Your Input |
|-------|-----------|
| **Problem Definition** | Reference to the HC2 problem definition (if available) |
| **Hypothesis Origin** | Reference to the HC3 hypothesis contract (if available) |
| **Previous Signals** | References to any prior HC5 signal reports for this experiment (if any) |
| **Related Experiments** | Other experiments in the portfolio that share production surface area |

Not all of these will be available for every experiment — that's fine. Each connection adds depth to your portfolio monitoring. The "Related Experiments" field is particularly valuable at portfolio scale because it surfaces experiments that may be influencing each other's production signals.

---

## Your Turn

Extract baselines for each experiment, assemble the portfolio summary, and map available Vortex history connections. The portfolio summary table is your monitoring instrument for the next step.

## Next Step

When your portfolio is assembled with baselines mapped, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/production-monitoring/steps/step-03-monitoring.md
