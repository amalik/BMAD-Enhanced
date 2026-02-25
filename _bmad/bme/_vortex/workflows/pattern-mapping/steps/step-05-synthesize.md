---
step: 5
workflow: pattern-mapping
title: Synthesize & Route
---

# Step 5: Synthesize & Route

Time to bring everything together. We've assessed artifacts, analyzed individual contributions, identified cross-artifact patterns, and clustered them into themes. Now we produce the pattern analysis output — a document that captures what the research collectively reveals.

## Why This Matters

This is reconnaissance — we're documenting what's there before committing to a problem definition. Here's what the research is telling us: across all your artifacts, the evidence clusters around certain themes. The pattern analysis output gives you (and your team) a clear picture of where your research converges, where it contradicts, and where the gaps are. One data point is an anecdote, three are a pattern — and this output captures which patterns have earned that distinction. It can feed into research-convergence for full synthesis, or stand alone as a valuable reference.

## Your Task

### 1. Pattern Analysis Summary

Summarize the key findings from your pattern mapping:

- **How many patterns did you identify?** (from Step 3)
- **How many theme clusters emerged?** (from Step 4)
- **What is the strongest signal?** — the theme with the highest confidence and most evidence
- **What is the most significant contradiction?** — where does the evidence pull in different directions
- **What is the biggest gap?** — what would change your conclusions if you had this data

### 2. Generate the Pattern Analysis Artifact

I'll produce the pattern analysis output with this structure:

```yaml
---
source_agent: mila
source_workflow: pattern-mapping
target_agents: [mila, liam, isla]
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/{your-artifact-1}"
    contract: HC1
  - path: "{path-to-your-artifact-2}"
    contract: null
created: YYYY-MM-DD
---
```

**Note:** This is NOT an HC2 problem definition. There is no `contract` field — this is a working document for internal Vortex use, not a handoff contract. It can feed into research-convergence for full problem definition or stand alone as a reference.

**Required Body Sections (6):**

1. **Pattern Summary** — Strongest cross-artifact patterns with evidence sources
   - List each pattern with: name, strength (Universal/Multi-source/Single), evidence count, and which artifacts support it

2. **Theme Clusters** — Grouped patterns with confidence levels
   - For each theme: name, contributing patterns, confidence (Strong/Moderate/Emerging), key insight

3. **Convergence Assessment** — How strongly patterns point toward a unified picture
   - Do patterns converge on a clear direction? How many themes are Strong vs. Emerging?
   - Overall convergence: High (most themes Strong) / Moderate (mix of Strong and Moderate) / Low (mostly Emerging or contradictory)

4. **Contradictions** — Conflicting evidence and possible explanations
   - List each contradiction with: what conflicts, which artifacts, possible reconciliation

5. **Evidence Gaps** — What's missing
   - List gaps that would change conclusions if filled
   - Note which gaps block confident routing vs. which are nice-to-have

6. **Recommendations** — Suggested next steps based on pattern strength
   - Which Compass route does the evidence support? Why?
   - What would strengthen the analysis?

**Save to:** `{output_folder}/vortex-artifacts/pattern-analysis-{date}.md`

I'll create this file with all sections once you confirm the content is ready.

### 3. Validation Questions

Before we finalize, let's validate:

**Evidence Check:**
- [ ] Is every pattern backed by at least one artifact reference?
- [ ] Are confidence levels honest given the evidence count?
- [ ] Did we document contradictions and gaps rather than hiding them?

**Completeness Check:**
- [ ] Does the pattern summary capture all significant cross-artifact patterns?
- [ ] Do theme clusters account for all identified patterns?
- [ ] Is the convergence assessment consistent with theme confidence levels?

---

## Your Turn

Let's build the Pattern Analysis Summary and confirm the content for each section. Once you're ready, I'll generate the artifact.

---

**[a]** Advanced Elicitation — Deep dive into synthesis with guided questioning
**[p]** Party Mode — Bring in other Vortex agents for collaborative discussion
**[c]** Continue — Generate the pattern analysis artifact and proceed to routing

---

## Vortex Compass

Based on what your pattern analysis reveals, here are your evidence-driven options:

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Patterns identified and ready for full synthesis | research-convergence | Mila 🔬 | Patterns provide strong foundation for full JTBD + Pains & Gains problem definition (HC2) |
| Patterns already point to a clear, well-evidenced problem | hypothesis-engineering | Liam 💡 | Sufficient evidence to skip synthesis and go directly to hypothesis generation |
| Patterns reveal significant knowledge gaps | user-discovery | Isla 🔍 | More discovery needed to fill gaps before synthesis is meaningful |

**Self-routing note:** Route 1 sends you back to Mila's own research-convergence workflow. This is the expected successful completion path — pattern mapping is reconnaissance, research-convergence is commitment. This is not a failure state.

> **Note:** These are evidence-based recommendations. You can navigate to any Vortex agent
> at any time based on your judgment.

**Or run Max's [VN] Vortex Navigation** for a full gap analysis across all streams.

### ⚠️ Insufficient Evidence for Routing

If the evidence gathered so far doesn't clearly point to a single next step:

| To route to... | You need... |
|----------------|-------------|
| Mila 🔬 research-convergence | Identified patterns with at least Moderate confidence themes that can ground JTBD framing |
| Liam 💡 hypothesis-engineering | Strong convergence across themes pointing to a clear, well-evidenced problem |
| Isla 🔍 user-discovery | Identified gaps or contradictions that block confident problem definition |

**Workflow-specific signals:**
- Patterns don't converge on any clear theme → more artifacts needed, consider **Isla** for focused research
- Contradictions dominate over convergence → **Isla** for focused investigation to resolve conflicting evidence
- Strong patterns but unclear which job they serve → proceed to **research-convergence** for JTBD framing
- Fewer than 2 artifacts with converging insights → patterns emerge from cross-artifact convergence. Consider collecting more artifacts or using **Isla's** workflows to deepen existing research before proceeding.

**Recommended:** If routing is unclear, revisit your theme clusters from Step 4 or run **Max's [VN] Vortex Navigation** for a full gap analysis.
