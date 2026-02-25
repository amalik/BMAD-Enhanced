---
step: 4
workflow: experiment-design
title: Synthesize & Route
---

# Step 4: Synthesize & Route

You've identified the experiment target, designed the methodology, defined success criteria, and produced an experiment brief. Now let's produce the enriched HC3 artifact and figure out what happens next.

## Why This Matters

An experiment brief sitting in a document is useless. It needs to become an artifact that Wade can pick up and execute — with every detail he needs to run the experiment without coming back to ask questions. This step produces that artifact and routes you to the right next step.

## Your Task

### 1. Generate the Enriched HC3 Artifact

Produce the enriched HC3 by combining the original hypothesis contract with the experiment design from Step 3.

**HC3 Frontmatter:**

```yaml
---
contract: HC3
type: artifact
source_agent: liam
source_workflow: experiment-design
target_agents: [wade]
input_artifacts:
  - path: "{original_hc3_path}"
    contract: HC3
created: {date}
---
```

**HC3 Body — Original Sections (preserve from input):**
1. Problem Context
2. Hypothesis Contracts (1-3 in 4-field format)
3. Assumption Risk Map
4. Recommended Testing Order
5. Flagged Concerns (if any)

**HC3 Body — New Section 6: Experiment Design**

| Field | Value |
|-------|-------|
| Experiment Name | *From Step 3 experiment brief* |
| Target Assumption | *Which assumption this experiment tests* |
| Methodology | *Selected experiment approach* |
| Hypothesis Statement | *"We believe that [target users] will [expected behavior] because [rationale]"* |
| Primary Metric | *Key indicator + target threshold* |
| Secondary Metrics | *Supporting indicators (if any)* |
| Success Criteria | *Pre-defined pass/fail thresholds* |
| Kill Criteria | *What would invalidate the assumption* |
| Sample Size | *Minimum participants/data points* |
| Duration | *Estimated experiment timeframe* |
| Recruitment/Selection | *How participants are selected (if applicable)* |
| Controls | *Baseline comparison method* |

**Save to:** `{output_folder}/vortex-artifacts/hc3-experiment-design-{date}.md`

### 2. Validation Questions

Before routing, verify the experiment design is sound:

**Design Quality Check:**
- [ ] The experiment targets the riskiest assumption, not the easiest one to test
- [ ] Success criteria are pre-defined with specific, measurable thresholds
- [ ] Kill criteria are defined — you know what would prove the assumption wrong
- [ ] Methodology matches the type of assumption being tested
- [ ] Sample size and duration are realistic for the methodology chosen

**Completeness Check:**
- [ ] All experiment brief fields are filled with specific values, not placeholders
- [ ] Primary metric has a baseline and target threshold
- [ ] The experiment would survive scrutiny from a skeptic

**Handoff Check:**
- [ ] Wade could execute this experiment without asking clarifying questions
- [ ] The enriched HC3 contains everything needed: hypothesis, risk map, AND experiment design
- [ ] Success criteria are objective — two different people would agree on pass/fail

---

## Your Turn

Generate the enriched HC3 artifact and verify it passes the validation checks. Confirm when you're satisfied that the experiment design is complete and honest.

---

**[a]** Advanced Elicitation — Deep dive into experiment design validation with guided questioning
**[p]** Party Mode — Bring in other Vortex agents to challenge your experiment design
**[c]** Continue — Proceed to routing

---

## Vortex Compass

Based on what you just completed, here are your evidence-driven options:

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Experiment design is complete and ready for execution | lean-experiment | Wade 🧪 | Experiment design ready for execution (HC3) |
| Hypothesis needs revision — design constraints revealed structural weaknesses | hypothesis-engineering | Liam 💡 | Revise hypothesis based on design constraints |
| Pre-experiment validation needed — can't design experiment without more user data | user-interview | Isla 🔍 | Pre-experiment validation needed |

> **Note:** These are evidence-based recommendations. You can navigate to any Vortex agent
> at any time based on your judgment.

**Or run Max's [VN] Vortex Navigation** for a full gap analysis across all streams.

### ⚠️ Insufficient Evidence for Routing

If the evidence gathered so far doesn't clearly point to a single next step:

| To route to... | You need... |
|----------------|-------------|
| Wade 🧪 | Complete experiment brief with methodology, success criteria, metrics, and duration |
| Liam 💡 | Clear signal that hypothesis needs structural revision before experiment design |
| Isla 🔍 | Specific user knowledge gap that prevents experiment design |

**Workflow-specific signals:**
- Cannot define success criteria → hypothesis may be too vague; revisit **Liam's hypothesis-engineering**
- Cannot select methodology → assumption type unclear; revisit **Liam's assumption-mapping** to sharpen the risk map
- Need user behavior data before designing experiment → route to **Isla** for targeted interviews

**Recommended:** Revisit earlier steps to strengthen your experiment design, or run **Max's [VN] Vortex Navigation** for a full gap analysis.
