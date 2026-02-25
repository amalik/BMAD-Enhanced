---
step: 4
workflow: hypothesis-engineering
title: Assumption Extraction & Risk Mapping
---

# Step 4: Assumption Extraction & Risk Mapping

You've drafted hypothesis contracts. Now let's surface every assumption hiding inside them and figure out which ones could kill us.

## Why This Matters

Assumption mapping separates what we know from what we think we know. Every hypothesis embeds assumptions — about users, about behavior, about the market, about technology. Most teams test the easy assumptions first and ignore the lethal ones. The riskiest assumption gets tested first, not the easiest one. This step ensures you know exactly which assumptions matter most and in what order to validate them.

## Your Task

### 1. Extract All Assumptions

For each hypothesis contract from Step 3, extract every assumption — stated and unstated:

**Hypothesis 1: {Title}**
- Assumption from Expected Outcome: *What are we assuming about the measurable result?*
- Assumption from Target Behavior Change: *What are we assuming about how users will respond?*
- Assumption from Rationale: *What evidence-based claims could be wrong?*
- Assumption from Riskiest Assumption: *Is this truly the riskiest, or are there hidden ones?*
- Unstated assumptions: *What are we taking for granted that we haven't examined?*

Repeat for each hypothesis. Be thorough — the assumptions you don't surface are the ones that blindside you.

### 2. Classify Each Assumption

For every extracted assumption, assess two dimensions:

**Lethality** — If this assumption is wrong, what happens?
- **High:** Kills the hypothesis entirely. The whole idea collapses.
- **Medium:** Requires a significant pivot. The direction changes.
- **Low:** Minor adjustment needed. The core idea survives.

**Uncertainty** — How much evidence do we have?
- **High:** No evidence. We're guessing.
- **Medium:** Some evidence, but indirect or incomplete.
- **Low:** Strong evidence from multiple sources.

### 3. Build the Assumption Risk Map

| Assumption | Hypothesis | Lethality | Uncertainty | Priority | Validation Status |
|------------|-----------|-----------|-------------|----------|-------------------|
| *What we're assuming* | 1, 2, or 3 | High/Med/Low | High/Med/Low | *Derived* | `Unvalidated` |

**Priority derivation (lethality × uncertainty):**

|  | High Uncertainty | Medium Uncertainty | Low Uncertainty |
|--|-----------------|-------------------|-----------------|
| **High Lethality** | **Test First** | **Test First** | Monitor |
| **Medium Lethality** | **Test Soon** | Test Soon | Monitor |
| **Low Lethality** | Test Soon | Monitor | Monitor |

- **Test First:** High lethality + High/Medium uncertainty = validate before any experiment
- **Test Soon:** Medium risk = validate early in the experiment cycle
- **Monitor:** Low risk = track but don't delay for validation

### 4. Recommended Testing Order

Based on the risk map, sequence your assumptions for validation:

| Priority | Assumption | Hypothesis | Suggested Method | Minimum Evidence |
|----------|-----------|-----------|-----------------|-----------------|
| 1 | *Riskiest assumption — test this first* | *Which hypothesis* | *How to test it* | *What would validate or invalidate* |
| 2 | *Next riskiest* | | | |
| 3 | *And so on* | | | |

**Guidance:** The testing order should follow the risk map priorities. If two assumptions have equal priority, test the one that affects the most hypotheses first. What if we're wrong about assumption #1? Does it invalidate just one hypothesis, or all of them?

### 5. Flag Concerns (Optional)

If any assumptions feel too risky to test without additional discovery, flag them for potential routing to Isla:

| Concern | Impact | Recommended Action |
|---------|--------|-------------------|
| *Unvalidated assumption or knowledge gap* | *How it affects hypothesis quality* | *e.g., "Route to Isla for targeted user research"* |

These flags may trigger HC9 routing in the Compass step — sending specific assumptions back to Isla for validation before proceeding to Wade's experiments.

---

## Your Turn

Extract assumptions from each hypothesis, classify them by lethality × uncertainty, build the risk map, and produce the recommended testing order. Share your analysis and I'll help you challenge any assumptions that feel too comfortable.

---

**[a]** Advanced Elicitation — Deep dive into assumption analysis with guided questioning
**[p]** Party Mode — Bring in other Vortex agents to challenge your assumptions
**[c]** Continue — Proceed to synthesis and HC3 artifact generation

---

## Next Step

When your assumption risk map and testing order are complete, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-05-synthesize.md
