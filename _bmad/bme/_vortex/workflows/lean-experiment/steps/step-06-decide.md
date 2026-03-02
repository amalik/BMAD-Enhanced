---
step: 6
workflow: lean-experiment
title: Decide & Route
---

# Step 6: Decide & Route

You've run the experiment, analyzed the results, and captured the learning. Now make the decision: based on the evidence, what do you do next? And package everything as an HC4 experiment context artifact so the next agent in the Vortex has what they need.

## Why This Matters

The hardest part of lean experimentation isn't running experiments — it's acting on the results. Teams that invest effort in an experiment naturally want it to "work." But the discipline is in the decision: if the data says pivot, you pivot. If the data says the assumption was wrong, you accept it. The HC4 artifact preserves your learning so it's not lost when you move forward.

## Your Task

### 1. Make the Decision

Based on your analysis from Step 5:

| Signal | Decision | What It Means |
|--------|----------|---------------|
| Primary metric met success threshold | **Persevere** | The hypothesis held. Move to production monitoring or test the next assumption. |
| Primary metric in borderline zone | **Patch** | The direction is right but needs refinement. Iterate on the experiment design or scope. |
| Primary metric hit failure threshold | **Pivot** | The assumption was wrong. Re-examine the problem definition or hypothesis. |

**Your decision:** [Pivot / Patch / Persevere]

**Rationale:** [Why this decision follows from the evidence — not from hope]

### 2. Generate the HC4 Artifact

I'll produce the HC4 Experiment Context artifact with this structure:

```yaml
---
contract: HC4
type: artifact
source_agent: wade
source_workflow: lean-experiment
target_agents: [noah]
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/{your-hc3-artifact}"
    contract: HC3
created: YYYY-MM-DD
---
```

**HC4 Required Body Sections:**
1. **Experiment Summary** — Name, type, duration, graduation status
2. **Hypothesis Tested** — Original statement, riskiest assumption, expected outcomes
3. **Method** — Experiment type, sample, what was built, execution details
4. **Pre-Defined Success Criteria** — Metrics with targets and actual results
5. **Results** — Key findings, validated learning, assumption updates
6. **Expected Production Behavior** (if graduating) — What to expect at scale
7. **Signal Thresholds** (if graduating) — When to investigate anomalies

**Save to:** `{output_folder}/vortex-artifacts/hc4-experiment-results-{date}.md`

### 3. Validation Questions

Before finalizing:

- [ ] Does the decision honestly follow from the data?
- [ ] Is the HC4 artifact self-contained — could Noah interpret production signals without reading HC3?
- [ ] Are success criteria results documented with actual numbers, not vague assessments?
- [ ] Are new questions and next steps clearly identified?

---

## Your Turn

Confirm your decision (pivot/patch/persevere) and review the HC4 artifact. I'll generate the final file once you approve.

---

**[a]** Advanced Elicitation — Deep dive into decision rationale
**[p]** Party Mode — Bring in other Vortex agents for decision review
**[c]** Continue — Generate the HC4 artifact and proceed to routing

---

## Vortex Compass

Based on what you just completed, here are your evidence-driven options:

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Experiment succeeded, graduating to production | signal-interpretation | Noah 📡 | Monitor production signals against experiment predictions (HC4) |
| Experiment complete, need to capture learning | learning-card | Max 🧭 | Capture validated learning before it fades |
| User behavior was surprising or unexplained | empathy-map | Isla 🔍 | Understand why users behaved unexpectedly |
| Assumption invalidated, need new direction | pivot-resynthesis | Mila 🔬 | Re-synthesize problem definition with new evidence |
| Need to test next assumption in the risk map | lean-experiment | Wade 🧪 | Run the next experiment in the testing sequence |

> **Note:** These are evidence-based recommendations. You can navigate to any Vortex agent
> at any time based on your judgment.

**Or run Max's [VN] Vortex Navigation** for a full gap analysis across all streams.

### Insufficient Evidence for Routing

If the evidence doesn't clearly point to a single next step:

| To route to... | You need... |
|----------------|-------------|
| Noah 📡 | Graduated experiment with defined production behavior and signal thresholds |
| Max 🧭 | Completed experiment with documented learning and assumption updates |
| Isla 🔍 | Specific unexplained user behavior requiring qualitative investigation |
| Mila 🔬 | Invalidated assumption requiring problem re-definition |

**Recommended:** Run **Max's [VN] Vortex Navigation** for a full gap analysis across all streams.
