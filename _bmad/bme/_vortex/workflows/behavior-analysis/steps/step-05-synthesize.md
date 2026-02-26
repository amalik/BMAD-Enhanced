---
step: 5
workflow: behavior-analysis
title: Synthesize & Route
---

# Step 5: Synthesize & Route

Time to bring everything together. We've validated the experiment context, extracted baselines, classified behavior patterns, and gathered supporting evidence. Now we produce the HC5 Behavioral Signal Report artifact and route to the next step in the Vortex.

## Why This Matters

Production data is the most honest user feedback — it can't lie. But raw behavior data isn't intelligence. Intelligence is behavior classified through experiment baselines, supported by evidence, and packaged for the decision-maker. The HC5 artifact gives Max everything needed to make evidence-based decisions: what behavior was observed, how it compares to experiment baselines, whether it's variance, regression, or discovery, and how strong the evidence is. No recommendations. No strategy. Just classified behavioral intelligence.

## Your Task

### 1. Review Your Behavioral Signal Report

Before we package everything, let's do a final quality pass on each section:

**Signal Description:**

| Field | Check |
|-------|-------|
| **Signal Summary** | Is it factual and one sentence? Does it capture the behavioral pattern, not just a metric? |
| **Signal Type** | Is the classification accurate? For behavior analysis, type will typically be `Behavior Pattern`. |
| **Severity** | Is the severity justified by the classification? Regressions typically warrant `Warning` or `Critical`; variance is typically `Informational`. |
| **Detection Method** | Is it clear how this behavior came to attention? |
| **Time Window** | Is the observation period precisely defined? |
| **Affected Scope** | Are the affected users/segments/features clearly identified? |

**Context (Experiment Lineage + Vortex History):**

| Field | Check |
|-------|-------|
| **Experiment Lineage** | Can the behavior be traced back to its originating experiment? Are the baselines explicit? |
| **Vortex History** | Are available upstream references (HC2, HC3, previous HC5) documented? |

**Trend Analysis:**

| Field | Check |
|-------|-------|
| **Trend Direction** | Does the classification map to a clear trend? Regression = `Degrading`, Variance = `Stable`, Novel = context-dependent. |
| **Rate of Change** | Is it quantified with specific metrics, not vague descriptions? |
| **Baseline Comparison** | Is the experiment baseline explicitly stated and the comparison clear? |
| **Confidence** | Does the confidence level reflect both data quality and classification certainty? |

**Anomaly Detection (for Novel Behavior classifications):**

| Field | Check |
|-------|-------|
| **Anomaly Description** | Is the novel behavior described factually, without speculative strategy? |
| **Discovery Needed** | Is the HC10 routing decision documented with rationale? |

**Data Quality:**

| Field | Check |
|-------|-------|
| **Sample Size** | Is it sufficient for the classifications made? |
| **Confidence Level** | Does it honestly reflect data reliability for this behavioral analysis? |

### 2. Generate the HC5 Artifact

I'll produce the HC5 Behavioral Signal Report artifact with this structure:

```yaml
---
contract: HC5
type: artifact
source_agent: noah
source_workflow: behavior-analysis
target_agents: [max]
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/{your-hc4-artifact}"
    contract: HC4
created: YYYY-MM-DD
---
```

**HC5 Required Body Sections:**
1. **Signal Description** — Signal Summary, Signal Type (`Behavior Pattern`), Severity, Detection Method, Time Window, Affected Scope
2. **Context** — Experiment Lineage (Originating Experiment, Original Hypothesis, Experiment Outcome, Expected Production Behavior, Actual vs Expected) + Vortex History (Problem Definition, Hypothesis Origin, Previous Signals, Related Experiments)
3. **Trend Analysis** — Trend Direction, Trend Duration, Rate of Change, Baseline Comparison, Confidence
4. **Anomaly Detection** (when novel behavior detected) — Anomaly Description, Deviation from Expected, Potential Explanations, Discovery Needed, Discovery Focus
5. **Data Quality** — Sample Size, Data Completeness, Known Biases, Confidence Level

**Behavior Classification Addendum:**
In addition to the standard HC5 sections, include a Behavior Classification Summary showing each classified pattern with its category (Expected Variance / Regression / Novel Behavior), supporting evidence, and confidence level. This gives Max the behavioral context that distinguishes this report from a standard signal report.

**This artifact explicitly does NOT include:**
- Strategic recommendations (that is Max's domain)
- Pivot/patch/persevere decisions (that is Max's domain)
- Experiment design suggestions (that is Liam/Wade's domain)
- Resource allocation recommendations (that is Max's domain)

Noah produces intelligence — contextual, evidence-based behavioral classification. Max produces decisions.

**Save to:** `{output_folder}/vortex-artifacts/hc5-behavior-report-{date}.md`

I'll create this file with all the sections above once you confirm the content is ready.

### 3. Validation Questions

Before we finalize, let's validate:

**Evidence Check:**
- [ ] Is every classification grounded in observed behavior compared to experiment baselines?
- [ ] Can we trace the behavior back to its originating experiment through the Experiment Lineage section?
- [ ] Is the evidence for each classification quantified with specific metrics?

**Classification Check:**
- [ ] Does every classified behavior fit clearly into one category (Expected Variance, Regression, or Novel)?
- [ ] Is the classification supported by the baseline comparison, not by assumption?
- [ ] Are borderline cases acknowledged with appropriate confidence levels?

**Completeness Check:**
- [ ] Does the Signal Description include all 6 required fields?
- [ ] Does the Context section include Experiment Lineage with all 5 required fields?
- [ ] Does the Trend Analysis include all 5 required fields?
- [ ] Does the Data Quality section include all required fields?
- [ ] If novel behavior was detected, does Anomaly Detection include all required fields?

**Intelligence-Not-Strategy Check:**
- [ ] Does the report contain zero strategic recommendations?
- [ ] Does it avoid prescribing what to do about the classified behavior?
- [ ] Does it present findings in classification + evidence + trend format, leaving decisions to Max?
- [ ] Would Max have everything needed to make an informed decision from this report?

---

## Your Turn

Review the behavioral signal report sections. Confirm when you're ready for me to generate the final HC5 artifact.

---

**[a]** Advanced Elicitation — Deep dive into HC5 refinement with guided questioning
**[p]** Party Mode — Bring in other Vortex agents for collaborative artifact critique
**[c]** Continue — Generate the HC5 artifact and proceed to routing

---

## Vortex Compass

Based on what you just completed, here are your evidence-driven options:

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Behavioral signal report complete with classified patterns and evidence | pivot-patch-persevere | Max 🧭 | Behavioral signal report triggers decision (HC5) |
| ⚡ Novel behavior detected not covered by original hypothesis | user-discovery | Isla 🔍 | Novel behavior warrants discovery research (HC10) |
| Specific signal within behavior patterns warrants deeper analysis | signal-interpretation | Noah 📡 | Deeper signal analysis needed |

> **Note:** These are evidence-based recommendations. You can navigate to any Vortex agent
> at any time based on your judgment.

**Or run Max's [VN] Vortex Navigation** for a full gap analysis across all streams.

### ⚠️ Insufficient Evidence for Routing

If the evidence gathered so far doesn't clearly point to a single next step:

| To route to... | You need... |
|----------------|-------------|
| Max 🧭 | Complete HC5 behavioral signal report with classified behavior patterns and sufficient evidence |
| Isla 🔍 | Specific novel behavior identified with clear deviation from experiment expectations |
| Noah 📡 | Specific signal identified within behavior patterns that warrants focused signal-interpretation analysis |

**Workflow-specific signals:**
- Classification unclear → consider revisiting **step-03** for sharper analysis against baselines
- Cannot establish experiment baselines → consider revisiting **step-02** for deeper baseline extraction
- Evidence insufficient for classification → gather more production behavior data before proceeding
- Behavior observed but cannot connect to any experiment → consider whether this should be a signal-interpretation workflow instead

**Recommended:** Revisit earlier steps to strengthen your behavioral analysis, or run **Max's [VN] Vortex Navigation** for a full gap analysis.
