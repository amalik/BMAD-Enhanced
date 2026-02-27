---
step: 5
workflow: production-monitoring
title: Synthesize & Route
---

# Step 5: Synthesize & Route

Time to bring the portfolio together. We've validated experiment contexts, assembled the portfolio, monitored signals against baselines, and prioritized by divergence severity. Now we produce the HC5 Portfolio Signal Report artifact and route to the next step in the Vortex.

## Why This Matters

Production data is the most honest user feedback — it can't lie. At portfolio scale, that honest feedback tells Max which experiments are confirming their hypotheses, which are degrading, and which are revealing unexpected behavior. The HC5 portfolio signal report gives Max everything needed to make portfolio-level decisions: prioritized signals across all monitored experiments, divergence assessments, anomaly flags, and data quality — all grounded in experiment baselines. No recommendations. No strategy. Just prioritized portfolio intelligence.

## Your Task

### 1. Review Your Portfolio Signal Report

Before we package everything, let's do a final quality pass on each section:

**Signal Description (Portfolio-Level):**

| Field | Check |
|-------|-------|
| **Signal Summary** | Does it capture the portfolio-level picture? Is it factual and concise? |
| **Signal Type** | Is the classification appropriate for portfolio monitoring? |
| **Severity** | Is the severity justified by the highest-priority signal in the portfolio? |
| **Detection Method** | Is it clear this is a portfolio monitoring assessment? |
| **Time Window** | Is the observation period consistent across experiments? |
| **Affected Scope** | Are all monitored experiments and their affected areas identified? |

**Context (Per-Experiment Lineage + Vortex History):**

| Field | Check |
|-------|-------|
| **Per-Experiment Lineage** | Can each signal be traced back to its originating experiment? Are baselines explicit? |
| **Vortex History** | Are available upstream references (HC2, HC3, previous HC5) documented per experiment? |

**Trend Analysis (Per-Experiment):**

| Field | Check |
|-------|-------|
| **Trend Direction** | Is the trajectory accurately classified for each experiment? |
| **Rate of Change** | Is divergence quantified with specific metrics, not vague descriptions? |
| **Baseline Comparison** | Is each experiment's baseline explicitly stated and the comparison clear? |
| **Confidence** | Does the confidence level reflect both data quality and assessment certainty per experiment? |

**Anomaly Detection (if anomalies flagged):**

| Field | Check |
|-------|-------|
| **Anomaly Description** | Is the unexpected behavior described factually, without speculative strategy? |
| **Discovery Needed** | Is the HC10 routing decision documented with rationale per experiment? |

**Data Quality (Per-Experiment and Portfolio-Level):**

| Field | Check |
|-------|-------|
| **Per-Experiment Quality** | Is data quality assessed for each experiment individually? |
| **Portfolio Confidence** | Does the overall confidence honestly reflect portfolio-level reliability? |

### 2. Generate the HC5 Artifact

I'll produce the HC5 Portfolio Signal Report artifact with this structure:

```yaml
---
contract: HC5
type: artifact
source_agent: noah
source_workflow: production-monitoring
target_agents: [max]
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/{hc4-experiment-1}"
    contract: HC4
  - path: "_bmad-output/vortex-artifacts/{hc4-experiment-2}"
    contract: HC4
created: YYYY-MM-DD
---
```

**HC5 Required Body Sections:**
1. **Signal Description** — Portfolio-level signal summary, Signal Type, Severity (based on highest-priority signal), Detection Method, Time Window, Affected Scope (all monitored experiments)
2. **Context** — Per-experiment Experiment Lineage (Originating Experiment, Original Hypothesis, Experiment Outcome, Expected Production Behavior, Actual vs Expected) + Vortex History per experiment
3. **Trend Analysis** — Per-experiment trend direction, duration, rate of change, baseline comparison, confidence
4. **Anomaly Detection** (when anomalies flagged in any experiment) — Per-experiment anomaly description, deviation, explanations, discovery needed, discovery focus
5. **Data Quality** — Per-experiment quality assessment + portfolio-level confidence

**Portfolio Signal Summary Addendum:**
In addition to the standard HC5 sections, include a Portfolio Signal Summary showing each monitored experiment with its priority level, signal status, divergence assessment, and trajectory. This gives Max the portfolio-level view that distinguishes this report from a single-signal or behavioral report.

| Priority | Experiment | Signal Status | Divergence | Trajectory | Anomaly? |
|----------|-----------|--------------|-----------|-----------|----------|
| P1 | *name* | *one-sentence* | *quantified* | *direction* | Yes / No |
| P2 | *name* | *one-sentence* | *quantified* | *direction* | Yes / No |
| P3 | *name* | *one-sentence* | *quantified* | *direction* | Yes / No |

**This artifact explicitly does NOT include:**
- Strategic recommendations (that is Max's domain)
- Pivot/patch/persevere decisions (that is Max's domain)
- Experiment design suggestions (that is Liam/Wade's domain)
- Resource allocation recommendations (that is Max's domain)
- Portfolio prioritization decisions (Noah prioritizes signals by divergence; Max decides what to do about them)

Noah produces intelligence — prioritized, evidence-based portfolio monitoring. Max produces decisions.

**Save to:** `{output_folder}/vortex-artifacts/hc5-portfolio-report-{date}.md`

I'll create this file with all the sections above once you confirm the content is ready.

### 3. Validation Questions

Before we finalize, let's validate:

**Evidence Check:**
- [ ] Is every signal assessment grounded in observed production data compared to experiment baselines?
- [ ] Can we trace each signal back to its originating experiment through the Experiment Lineage section?
- [ ] Is divergence quantified with specific metrics for every experiment?

**Portfolio Completeness Check:**
- [ ] Are all monitored experiments included in the portfolio signal summary?
- [ ] Does the Signal Description capture the portfolio-level picture, not just individual experiments?
- [ ] Does each experiment have its own Context section with Experiment Lineage?
- [ ] Does each experiment have its own Trend Analysis with all 5 required fields?
- [ ] Does the Data Quality section include both per-experiment and portfolio-level assessment?

**Prioritization Check:**
- [ ] Is the P1/P2/P3 prioritization consistent with the prioritization framework (severity × scope × confidence)?
- [ ] Are the highest-priority signals clearly identified and quantified?
- [ ] Does the portfolio summary give Max a clear ranked view of which experiments need attention?

**Intelligence-Not-Strategy Check:**
- [ ] Does the report contain zero strategic recommendations?
- [ ] Does it avoid prescribing what to do about any signal or prioritization?
- [ ] Does it present findings in prioritized signal + context + trend format, leaving decisions to Max?
- [ ] Would Max have everything needed to make portfolio-level decisions from this report?

---

## Your Turn

Review the portfolio signal report sections. Confirm when you're ready for me to generate the final HC5 artifact.

---

**[a]** Advanced Elicitation — Deep dive into HC5 refinement with guided questioning
**[p]** Party Mode — Bring in other Vortex agents for collaborative artifact critique
**[c]** Continue — Generate the HC5 artifact and proceed to routing

---

## Vortex Compass

Based on what you just completed, here are your evidence-driven options:

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Portfolio signal report complete with prioritized signals across experiments | learning-card | Max 🧭 | Portfolio signal report ready (HC5) |
| ⚡ Anomalies detected across one or more experiments | user-discovery | Isla 🔍 | Anomalies across experiments (HC10) |
| Specific signal within the portfolio warrants deeper focused analysis | signal-interpretation | Noah 📡 | Deep dive on specific signal |

> **Note:** These are evidence-based recommendations. You can navigate to any Vortex agent
> at any time based on your judgment.

**Or run Max's [VN] Vortex Navigation** for a full gap analysis across all streams.

### ⚠️ Insufficient Evidence for Routing

If the evidence gathered so far doesn't clearly point to a single next step:

| To route to... | You need... |
|----------------|-------------|
| Max 🧭 | Complete HC5 portfolio signal report with per-experiment assessments and sufficient data quality confidence |
| Isla 🔍 | Specific anomaly identified across one or more experiments with clear deviation from experiment expectations |
| Noah 📡 | Specific signal identified during monitoring that warrants focused signal-interpretation analysis |

**Workflow-specific signals:**
- Portfolio assembly incomplete → consider revisiting **step-02** for complete baseline mapping
- Divergence assessment unclear → consider revisiting **step-03** for sharper signal monitoring
- Prioritization criteria insufficient → consider revisiting **step-04** for clearer severity/scope assessment
- Insufficient experiment contexts provided → gather more HC4 artifacts before proceeding

**Recommended:** Revisit earlier steps to strengthen your portfolio monitoring, or run **Max's [VN] Vortex Navigation** for a full gap analysis.
