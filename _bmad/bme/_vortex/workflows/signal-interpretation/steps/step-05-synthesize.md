---
step: 5
workflow: signal-interpretation
title: Synthesize & Route
---

# Step 5: Synthesize & Route

Time to bring everything together. We've validated the experiment context, connected it to the production signal, described and analyzed the signal, and assessed anomalies and data quality. Now we produce the HC5 Signal Report artifact and route to the next step in the Vortex.

## Why This Matters

Production data is the most honest user feedback — it can't lie. But raw data isn't intelligence. Intelligence is data interpreted through context, connected to its experiment lineage, and packaged for the decision-maker. The HC5 artifact gives Max everything needed to make evidence-based decisions: what the signal is, where it came from, where it's heading, and what doesn't fit the expected model. No recommendations. No strategy. Just contextualized intelligence.

## Your Task

### 1. Review Your Signal Report

Before we package everything, let's do a final quality pass on each section:

**Signal Description:**

| Field | Check |
|-------|-------|
| **Signal Summary** | Is it factual and one sentence? Could someone unfamiliar with the experiment understand what happened? |
| **Signal Type** | Is the classification accurate? Does it match what was actually observed? |
| **Severity** | Is the severity justified by the signal's deviation from experiment expectations? |
| **Detection Method** | Is it clear how this signal came to attention? |
| **Time Window** | Is the observation period precisely defined? |
| **Affected Scope** | Are the affected users/segments/features clearly identified? |

**Context (Experiment Lineage + Vortex History):**

| Field | Check |
|-------|-------|
| **Experiment Lineage** | Can the signal be traced back to its originating experiment? Is the actual-vs-expected comparison clear? |
| **Vortex History** | Are available upstream references (HC2, HC3, previous HC5) documented? |

**Trend Analysis:**

| Field | Check |
|-------|-------|
| **Trend Direction** | Does the classification reflect the data trajectory accurately? |
| **Rate of Change** | Is it quantified with specific metrics, not vague descriptions? |
| **Baseline Comparison** | Is the pre-experiment baseline explicitly stated? |
| **Confidence** | Does the confidence level accurately reflect data quality? |

**Anomaly Detection (if applicable):**

| Field | Check |
|-------|-------|
| **Anomaly Description** | Is the unexpected behavior described factually, without speculative strategy? |
| **Discovery Needed** | Is the HC10 routing decision documented with rationale? |

**Data Quality:**

| Field | Check |
|-------|-------|
| **Sample Size** | Is it sufficient for the conclusions drawn? |
| **Confidence Level** | Does it honestly reflect data reliability? |

### 2. Generate the HC5 Artifact

I'll produce the HC5 Signal Report artifact with this structure:

```yaml
---
contract: HC5
type: artifact
source_agent: noah
source_workflow: signal-interpretation
target_agents: [max]
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/{your-hc4-artifact}"
    contract: HC4
created: YYYY-MM-DD
---
```

**HC5 Required Body Sections:**
1. **Signal Description** — Signal Summary, Signal Type, Severity, Detection Method, Time Window, Affected Scope
2. **Context** — Experiment Lineage (Originating Experiment, Original Hypothesis, Experiment Outcome, Expected Production Behavior, Actual vs Expected) + Vortex History (Problem Definition, Hypothesis Origin, Previous Signals, Related Experiments)
3. **Trend Analysis** — Trend Direction, Trend Duration, Rate of Change, Baseline Comparison, Confidence
4. **Anomaly Detection** (when unexpected patterns detected) — Anomaly Description, Deviation from Expected, Potential Explanations, Discovery Needed, Discovery Focus
5. **Data Quality** — Sample Size, Data Completeness, Known Biases, Confidence Level

**This artifact explicitly does NOT include:**
- Strategic recommendations (that is Max's domain)
- Pivot/patch/persevere decisions (that is Max's domain)
- Experiment design suggestions (that is Liam/Wade's domain)
- Resource allocation recommendations (that is Max's domain)

Noah produces intelligence — contextual, evidence-based signal interpretation. Max produces decisions.

**Save to:** `{output_folder}/vortex-artifacts/hc5-signal-report-{date}.md`

I'll create this file with all the sections above once you confirm the content is ready.

### 3. Validation Questions

Before we finalize, let's validate:

**Evidence Check:**
- [ ] Is every signal description grounded in observed data, not assumptions?
- [ ] Can we trace the signal back to its originating experiment through the Experiment Lineage section?
- [ ] Is the trend analysis based on actual metrics with quantified rates of change?

**Completeness Check:**
- [ ] Does the Signal Description include all 6 required fields?
- [ ] Does the Context section include Experiment Lineage with all 5 required fields?
- [ ] Does the Trend Analysis include all 5 required fields?
- [ ] Does the Data Quality section include all required fields?
- [ ] If anomalies were detected, does Anomaly Detection include all required fields?

**Intelligence-Not-Strategy Check:**
- [ ] Does the report contain zero strategic recommendations?
- [ ] Does it avoid prescribing what to do about the signal?
- [ ] Does it present findings in signal + context + trend format, leaving decisions to Max?
- [ ] Would Max have everything needed to make an informed decision from this report?

---

## Your Turn

Review the signal report sections. Confirm when you're ready for me to generate the final HC5 artifact.

---

**[a]** Advanced Elicitation — Deep dive into HC5 refinement with guided questioning
**[p]** Party Mode — Bring in other Vortex agents for collaborative artifact critique
**[c]** Continue — Generate the HC5 artifact and proceed to routing

---

## Vortex Compass

Based on what you just completed, here are your evidence-driven options:

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Signal report complete with contextualized intelligence | learning-card | Max 🧭 | Signal report ready for decision (HC5) |
| ⚡ Anomalous behavior detected not covered by original hypothesis | user-discovery | Isla 🔍 | Unexpected behavior warrants discovery research (HC10) |

> **Note:** These are evidence-based recommendations. You can navigate to any Vortex agent
> at any time based on your judgment.

**Or run Max's [VN] Vortex Navigation** for a full gap analysis across all streams.

### ⚠️ Insufficient Evidence for Routing

If the evidence gathered so far doesn't clearly point to a single next step:

| To route to... | You need... |
|----------------|-------------|
| Max 🧭 | Complete HC5 signal report with all required sections and sufficient data quality confidence |
| Isla 🔍 | Specific anomalous behavior identified with clear deviation from experiment expectations |

**Workflow-specific signals:**
- Signal description too vague → consider revisiting **step-03** for sharper analysis
- Cannot connect signal to experiment context → consider revisiting **step-02** for deeper context loading
- Data quality insufficient for any conclusion → gather more production data before proceeding

**Recommended:** Revisit earlier steps to strengthen your signal report, or run **Max's [VN] Vortex Navigation** for a full gap analysis.
