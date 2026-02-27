---
step: 5
workflow: research-convergence
title: Synthesize & Route
---

# Step 5: Synthesize & Route

Time to bring everything together. We've validated artifacts, analyzed cross-artifact patterns, framed the JTBD, and mapped pains and gains. Now we converge it all into a single HC2 Problem Definition artifact.

## Why This Matters

Problem definition is the highest-leverage activity in product discovery. A clear, evidence-backed problem statement prevents teams from building solutions to the wrong problem. Across all our research, the core problem is what we're about to articulate — and everything downstream (hypotheses, experiments, production signals) depends on getting this right.

## Your Task

### 1. Converged Problem Statement

Write a single, clear problem statement that synthesizes everything:

**Problem Statement:** One concise paragraph defining the core problem. This should feel like the inevitable conclusion of all your research — not a surprise.

**Confidence:** `High` / `Medium` / `Low`
- **High:** Multiple artifacts converge on the same problem with strong evidence
- **Medium:** Evidence points in this direction but some gaps remain
- **Low:** Best interpretation of limited or conflicting evidence

**Scope:** What is explicitly in and out of scope for this problem.

### 2. Evidence Summary

Build the traceability record — how did we get here?

| Field | Your Answer |
|-------|-------------|
| **Artifacts Analyzed** | How many HC1 artifacts (or other inputs) did you use? List them. |
| **Total Evidence Points** | Count discrete quotes, observations, and data points across all artifacts. |
| **Convergence Assessment** | How strongly do the pain points converge on a root cause? Do gains point to the same desired outcome? |
| **Contradictions** | Where did artifacts disagree? How was this resolved? |
| **Evidence Gaps** | What's missing that would strengthen this problem definition? |

**Provenance:** For each major pain and gain, note which input artifact it originated from. This ensures traceability from problem definition back to raw research.

### 3. Assumptions

Every problem definition embeds assumptions. Make them explicit:

| Assumption | Basis | Risk if Wrong | Validation Status |
|------------|-------|---------------|-------------------|
| *What we're assuming is true* | *Why it seems reasonable given evidence* | *What happens if this is incorrect* | `Validated` / `Partially Validated` / `Assumed` |

### 4. Generate the HC2 Artifact

I'll produce the HC2 Problem Definition artifact with this structure:

```yaml
---
contract: HC2
type: artifact
source_agent: mila
source_workflow: research-convergence
target_agents: [liam]
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/{your-hc1-artifact-1}"
    contract: HC1
  - path: "_bmad-output/vortex-artifacts/{your-hc1-artifact-2}"
    contract: HC1
created: YYYY-MM-DD
---
```

**HC2 Required Body Sections:**
1. **Converged Problem Statement** — Problem Statement, Confidence, Scope
2. **Jobs-to-be-Done** — Primary JTBD (from Step 3) + Functional/Emotional/Social Jobs
3. **Pains** — Prioritized pain table (from Step 4)
4. **Gains** — Prioritized gain table (from Step 4)
5. **Evidence Summary** — Traceability record (from above)
6. **Assumptions** — Explicit assumptions table (from above)

**Save to:** `{output_folder}/vortex-artifacts/hc2-problem-definition-{date}.md`

I'll create this file with all the sections above once you confirm the content is ready.

### 5. Validation Questions

Before we finalize, let's validate:

**Evidence Check:**
- [ ] Is every pain and gain backed by at least one artifact reference?
- [ ] Can we trace the JTBD back to specific research evidence?
- [ ] Did we document contradictions honestly rather than hiding them?

**Convergence Check:**
- [ ] Does the problem statement follow naturally from the JTBD + Pains + Gains?
- [ ] Would someone reading only the problem statement understand the core issue?
- [ ] Is the confidence level honest given our evidence?

**Actionability Check:**
- [ ] Can Liam use this to generate testable hypotheses?
- [ ] Are the assumptions specific enough to validate or invalidate?
- [ ] Is the scope clear enough that Liam knows what's in and out of bounds?

---

## Your Turn

Let's build the Converged Problem Statement, Evidence Summary, and Assumptions table. Confirm when you're ready for me to generate the final HC2 artifact.

---

**[a]** Advanced Elicitation — Deep dive into synthesis with guided questioning
**[p]** Party Mode — Bring in other Vortex agents for collaborative discussion
**[c]** Continue — Generate the HC2 artifact and proceed to routing

---

## Vortex Compass

Based on what you just completed, here are your evidence-driven options:

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Problem is clearly defined with strong evidence | hypothesis-engineering | Liam 💡 | Converged problem ready for hypothesis generation (HC2) |
| Research gaps or unvalidated assumptions remain | user-discovery | Isla 🔍 | More discovery needed before convergence is reliable |
| The problem space itself seems wrong or too narrow | contextualize-scope | Emma 🎯 | Need to re-examine the broader problem context |

> **Note:** These are evidence-based recommendations. You can navigate to any Vortex agent
> at any time based on your judgment.

**Or run Max's [VN] Vortex Navigation** for a full gap analysis across all streams.

### ⚠️ Insufficient Evidence for Routing

If the evidence gathered so far doesn't clearly point to a single next step:

| To route to... | You need... |
|----------------|-------------|
| Liam 💡 | Converged problem definition with clear JTBD, pains, and gains |
| Isla 🔍 | Identified knowledge gap, unvalidated assumption, or anomalous behavior |
| Emma 🎯 | Clear signal that the problem space or scope needs fundamental change |

**Workflow-specific signals:**
- Cannot converge on a single JTBD from multiple artifacts → consider **Isla** for more discovery
- Pain points from different artifacts contradict irreconcilably → consider **Emma** for re-scoping
- Converged problem statement is vague or low-confidence → consider **Isla** for more evidence

**Recommended:** Revisit earlier steps to strengthen your evidence, or run **Max's [VN] Vortex Navigation** for a full gap analysis.
