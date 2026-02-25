---
step: 5
workflow: pivot-resynthesis
title: Synthesize & Route
---

# Step 5: Synthesize & Route

Time to bring everything together. We've validated artifacts, established pivot context, re-framed the JTBD, and revised pains and gains. Now we converge it all into a revised HC2 Problem Definition artifact. Across the original research and the pivot evidence, the revised problem should feel like a sharper, evidence-strengthened version of the original.

## Why This Matters

This revised problem definition is what Liam will use to generate new hypotheses. It needs to be clear about what changed, what held, and why — so Liam doesn't repeat the failed experiment direction. The data shows that the most effective pivots are ones where the revised problem definition makes the old direction's failure obvious in hindsight.

## Your Task

### 1. Revised Converged Problem Statement

Write a single, clear problem statement that synthesizes both the original research and the experiment evidence:

**Problem Statement:** One concise paragraph defining the revised core problem. This should feel like a sharper version of the original — not a different problem entirely.

**What Changed:** Explicitly note what shifted from the original problem definition and why.

**Confidence:** `High` / `Medium` / `Low`
- **High:** Original research confirmed by experiment evidence; revisions are evidence-backed
- **Medium:** Evidence points in this direction but the pivot introduced new uncertainties
- **Low:** Experiment contradicted significant original assumptions; the revised definition is best-effort

Note: Confidence may increase (we eliminated wrong directions) or decrease (experiment revealed we misunderstood key pains). Assess honestly based on total evidence.

**Scope:** What is explicitly in and out of scope for this revised problem.

### 2. Evidence Summary

Build the traceability record — how did we get here, and what's different?

| Field | Your Answer |
|-------|-------------|
| **Artifacts Analyzed** | Count and list both HC1 artifacts AND HC4 experiment evidence used |
| **Total Evidence Points** | Count discrete quotes, observations, and data points across all artifacts (original + experiment) |
| **Convergence Assessment** | How strongly does the revised evidence converge on a single problem? Is it stronger or weaker than the original? |
| **Contradictions** | Where did original research and experiment evidence conflict? How was this resolved? |
| **Evidence Gaps** | What's still missing that would strengthen this revised problem definition? |

**Provenance — What Changed and Why:**
For each major revision to pains and gains, note:
- Which HC4 experiment evidence triggered the revision
- Which HC1 original source the item came from
- Whether the item was retained, revised, removed, or newly added

### 3. Assumptions

Every problem definition embeds assumptions. After a pivot, some assumptions are validated, some invalidated, and some are new:

| Assumption | Basis | Risk if Wrong | Validation Status |
|------------|-------|---------------|-------------------|
| *What we're assuming is true* | *Why it seems reasonable given original + experiment evidence* | *What happens if this is incorrect* | `Validated` / `Partially Validated` / `Assumed` |

> **Pivot-resynthesis note:** For assumptions that were **invalidated by the experiment**, don't include them in this table — they've already been removed or revised in your pains/gains. This table captures what you're carrying forward. If you need to document what was invalidated, note it in the Evidence Summary's provenance section.

Note which assumptions were **validated by the experiment** (strongest basis), which were **invalidated** (removed or revised), and which are **new assumptions** that emerged from the pivot evidence.

### 4. Generate the HC2 Artifact

I'll produce the revised HC2 Problem Definition artifact with this structure:

```yaml
---
contract: HC2
type: artifact
source_agent: mila
source_workflow: pivot-resynthesis
target_agents: [liam]
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/{your-hc1-artifact-1}"
    contract: HC1
  - path: "_bmad-output/vortex-artifacts/{your-hc4-experiment}"
    contract: HC4
created: YYYY-MM-DD
---
```

**HC2 Required Body Sections:**
1. **Converged Problem Statement** — Revised Problem Statement, What Changed, Confidence, Scope
2. **Jobs-to-be-Done** — Revised JTBD (from Step 3) + Functional/Emotional/Social Jobs
3. **Pains** — Revised pain table with revision status (from Step 4)
4. **Gains** — Revised gain table with revision status (from Step 4)
5. **Evidence Summary** — Dual-source traceability record (from above)
6. **Assumptions** — Updated assumptions with validation status (from above)

**Save to:** `{output_folder}/vortex-artifacts/hc2-problem-definition-{date}.md`

I'll create this file with all the sections above once you confirm the content is ready.

### 5. Validation Questions

Before we finalize, let's validate:

**Evidence Check:**
- [ ] Is every revised pain and gain backed by at least one HC1 or HC4 artifact reference?
- [ ] Can we trace the revised JTBD back to specific original research AND experiment evidence?
- [ ] Did we document contradictions between original research and experiment evidence honestly?
- [ ] Is it clear which items were retained, revised, removed, or newly added?

**Convergence Check:**
- [ ] Does the revised problem statement follow naturally from the revised JTBD + Pains + Gains?
- [ ] Would someone reading only the revised problem statement understand what changed and why?
- [ ] Is the confidence level honest given both original and experiment evidence?

**Actionability Check:**
- [ ] Can Liam use this to generate NEW hypotheses that avoid the failed experiment direction?
- [ ] Are the assumptions specific enough to validate or invalidate?
- [ ] Is it clear what the experiment disproved so Liam doesn't repeat the same direction?

---

## Your Turn

Let's build the Revised Converged Problem Statement, Evidence Summary, and Assumptions table. Confirm when you're ready for me to generate the final HC2 artifact.

---

**[a]** Advanced Elicitation — Deep dive into synthesis with guided questioning
**[p]** Party Mode — Bring in other Vortex agents for collaborative discussion
**[c]** Continue — Generate the HC2 artifact and proceed to routing

---

## Vortex Compass

Based on what you just completed, here are your evidence-driven options:

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Revised problem definition is ready with strong evidence | hypothesis-engineering | Liam 💡 | Revised problem ready for new hypothesis generation (HC2) |
| Assumptions from pivot need validation before new hypotheses | user-interview | Isla 🔍 | New assumptions need real-user validation before proceeding |

> **Note:** These are evidence-based recommendations. You can navigate to any Vortex agent
> at any time based on your judgment.

**Or run Max's [VN] Vortex Navigation** for a full gap analysis across all streams.

### ⚠️ Insufficient Evidence for Routing

If the evidence gathered so far doesn't clearly point to a single next step:

| To route to... | You need... |
|----------------|-------------|
| Liam 💡 | Revised problem definition with clear JTBD, revised pains/gains, and evidence that avoids the failed direction |
| Isla 🔍 | Identified new assumptions from the pivot that are too risky to proceed without validation |

**Workflow-specific signals:**
- Revised problem statement is low-confidence → consider **Isla** for more evidence before proceeding
- Experiment evidence contradicts all original pains → more discovery needed; consider **Isla** for focused research
- JTBD itself is questioned (not just pains/gains) → the problem space may be wrong; consider **Emma** for re-scoping

**Recommended:** Revisit earlier steps to strengthen your evidence, or run **Max's [VN] Vortex Navigation** for a full gap analysis.
