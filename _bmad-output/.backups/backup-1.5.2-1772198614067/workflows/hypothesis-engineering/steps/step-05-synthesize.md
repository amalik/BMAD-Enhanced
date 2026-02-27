---
step: 5
workflow: hypothesis-engineering
title: Synthesize & Route
---

# Step 5: Synthesize & Route

Time to bring everything together. We've validated the problem definition, mapped the opportunity space, engineered hypothesis contracts, and mapped assumptions by risk. Now we produce the HC3 Hypothesis Contract artifact and route to the next step in the Vortex.

## Why This Matters

Every hypothesis we've engineered is a testable bet — but bets are worthless if they're not packaged for action. The HC3 artifact gives Wade everything needed to design experiments: what to test, what to measure, what the riskiest assumptions are, and in what order to validate them. If you can't prove it wrong, it's not a hypothesis — and now we're about to hand these hypotheses to someone who will try to prove them wrong.

## Your Task

### 1. Review Your Hypothesis Contracts

Before we package everything, let's do a final quality pass on each hypothesis:

**For each hypothesis (1-3):**

| Field | Check |
|-------|-------|
| **Expected Outcome** | Is it specific and measurable? Would two people agree on what "success" looks like? |
| **Target Behavior Change** | Is the behavior observable? Can it be measured without subjective interpretation? |
| **Rationale** | Does it cite specific evidence from the problem definition? Or is it intuition? |
| **Riskiest Assumption** | Is it truly the most lethal assumption? Or the most comfortable one? |
| **Hypothesis Statement** | Does "We believe that [users] will [behavior] because [rationale]" feel falsifiable? |

### 2. Review Your Assumption Risk Map

Verify the risk classifications and testing order from Step 4:

- [ ] Every assumption has a lethality and uncertainty score
- [ ] Priorities are correctly derived (Test First / Test Soon / Monitor)
- [ ] Testing order prioritizes by lethality × uncertainty, not by convenience
- [ ] Flagged concerns (if any) identify specific routing to Isla

### 3. Generate the HC3 Artifact

I'll produce the HC3 Hypothesis Contract artifact with this structure:

```yaml
---
contract: HC3
type: artifact
source_agent: liam
source_workflow: hypothesis-engineering
target_agents: [wade]
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/{your-hc2-artifact}"
    contract: HC2
created: YYYY-MM-DD
---
```

**HC3 Required Body Sections:**
1. **Problem Context** — Problem Statement (from HC2), JTBD Reference, Key Pains Targeted
2. **Hypothesis Contracts** (1-3) — 4-field format for each: Expected Outcome, Target Behavior Change, Rationale, Riskiest Assumption + Hypothesis Statement
3. **Assumption Risk Map** — Full table: Assumption, Hypothesis, Lethality, Uncertainty, Priority, Validation Status
4. **Recommended Testing Order** — Prioritized sequence: Priority, Assumption, Suggested Method, Minimum Evidence
5. **Flagged Concerns** (optional) — Concern, Impact, Recommended Action

**Save to:** `{output_folder}/vortex-artifacts/hc3-hypothesis-contract-{date}.md`

I'll create this file with all the sections above once you confirm the content is ready.

### 4. Validation Questions

Before we finalize, let's validate:

**Evidence Check:**
- [ ] Is every hypothesis grounded in specific evidence from the problem definition?
- [ ] Can we trace each riskiest assumption back to an evidence gap or contradiction?
- [ ] Did we document the rationale honestly rather than post-hoc rationalizing?

**Falsifiability Check:**
- [ ] Can each hypothesis be proven wrong? What result would invalidate it?
- [ ] Are the expected outcomes specific enough to measure unambiguously?
- [ ] Would Wade know exactly what experiment to design from these contracts?

**Assumption Check:**
- [ ] Did we surface unstated assumptions, not just the obvious ones?
- [ ] Is the riskiest assumption truly the most lethal, not just the most visible?
- [ ] Does the testing order make strategic sense (riskiest first, not easiest first)?

---

## Your Turn

Review the hypothesis contracts and assumption risk map. Confirm when you're ready for me to generate the final HC3 artifact.

---

**[a]** Advanced Elicitation — Deep dive into hypothesis refinement with guided questioning
**[p]** Party Mode — Bring in other Vortex agents for collaborative hypothesis critique
**[c]** Continue — Generate the HC3 artifact and proceed to routing

---

## Vortex Compass

Based on what you just completed, here are your evidence-driven options:

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Hypotheses are solid with testable assumptions | lean-experiment | Wade 🧪 | Hypothesis contracts ready for testing (HC3) |
| ⚡ Critical assumption is unvalidated and too risky to test blind | user-interview | Isla 🔍 | Unvalidated assumption needs discovery before experimentation (HC9) |

> **Note:** These are evidence-based recommendations. You can navigate to any Vortex agent
> at any time based on your judgment.

**Or run Max's [VN] Vortex Navigation** for a full gap analysis across all streams.

### ⚠️ Insufficient Evidence for Routing

If the evidence gathered so far doesn't clearly point to a single next step:

| To route to... | You need... |
|----------------|-------------|
| Wade 🧪 | 1-3 hypothesis contracts with explicit riskiest assumptions and testing order |
| Isla 🔍 | Specific unvalidated assumption identified with clear research question |

**Workflow-specific signals:**
- Cannot identify a riskiest assumption → consider revisiting **step-04** for deeper mapping
- Hypotheses feel vague or unfalsifiable → consider revisiting **step-03** for sharper brainwriting
- Problem definition itself seems shaky → consider routing back to **Mila** for re-synthesis

**Recommended:** Revisit earlier steps to strengthen your hypotheses, or run **Max's [VN] Vortex Navigation** for a full gap analysis.
