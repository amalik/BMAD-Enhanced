---
step: 3
workflow: assumption-mapping
title: Classification & Risk Mapping
---

# Step 3: Classification & Risk Mapping

You've surfaced every assumption hiding in your hypotheses. Now let's classify each one by how lethal it is and how little we actually know — and build a risk map that tells you exactly what to validate first.

## Why This Matters

Not all assumptions are created equal. Some are annoying if wrong — you adjust and move on. Others are lethal — the entire hypothesis collapses. The riskiest assumption gets tested first, not the easiest one. This step transforms your assumption inventory into an actionable risk map with a clear testing order. No more guessing about what to validate next.

## Your Task

### 1. Classify Each Assumption

For every assumption in your inventory from Step 2, assess two dimensions:

**Lethality** — If this assumption is wrong, what happens to the hypothesis?

| Level | Definition | Signal |
|-------|-----------|--------|
| **High** | Kills the hypothesis entirely. The whole idea collapses. | "If this is wrong, nothing else matters." |
| **Medium** | Requires a significant pivot. The direction changes but the core insight survives. | "If this is wrong, we'd need to rethink the approach." |
| **Low** | Minor adjustment needed. The core idea survives. | "If this is wrong, we tweak and continue." |

**Uncertainty** — How much evidence do we actually have?

| Level | Definition | Signal |
|-------|-----------|--------|
| **High** | No evidence. We're guessing. | "We believe this but have nothing to back it up." |
| **Medium** | Some evidence, but indirect or incomplete. | "We have signals, but they're not conclusive." |
| **Low** | Strong evidence from multiple sources. | "Multiple data points confirm this." |

**Challenge yourself:** If a classification feels comfortable, it's probably wrong. High-lethality assumptions often get downgraded to medium because the team doesn't want to face the risk. What if it's actually high?

### 2. Build the Assumption Risk Map

| # | Assumption | Hypothesis | Lethality | Uncertainty | Priority | Validation Status |
|---|-----------|-----------|-----------|-------------|----------|-------------------|
| 1 | *Statement* | H1 | High/Med/Low | High/Med/Low | *Derived* | `Unvalidated` |
| 2 | *Statement* | H1, H2 | High/Med/Low | High/Med/Low | *Derived* | `Unvalidated` |

**Priority derivation (lethality × uncertainty):**

|  | High Uncertainty | Medium Uncertainty | Low Uncertainty |
|--|-----------------|-------------------|-----------------|
| **High Lethality** | **Test First** | **Test First** | Monitor |
| **Medium Lethality** | **Test Soon** | Test Soon | Monitor |
| **Low Lethality** | Test Soon | Monitor | Monitor |

- **Test First:** High lethality + High/Medium uncertainty = validate before any experiment. These assumptions could destroy your hypothesis and you don't have evidence either way.
- **Test Soon:** Medium risk = validate early in the experiment cycle. Important but not immediately lethal.
- **Monitor:** Low risk = track but don't delay for validation. The hypothesis survives even if these are wrong.

### 3. Produce the Recommended Testing Order

Based on the risk map, sequence your assumptions for validation:

| Priority | Assumption | Hypothesis | Lethality × Uncertainty | Suggested Method | Minimum Evidence |
|----------|-----------|-----------|------------------------|-----------------|-----------------|
| 1 | *Riskiest — test this first* | H1 | High × High | *How to test it* | *What would validate or invalidate* |
| 2 | *Next riskiest* | H2 | High × Medium | | |
| 3 | *And so on* | H1, H3 | Medium × High | | |

**Tiebreaker rules:**
1. If two assumptions have equal priority, test the one that affects the **most hypotheses** first — if it's wrong, it invalidates more.
2. If still tied, test the one with the **highest lethality** first — a lethal assumption is worse than an uncertain one.
3. If still tied, test the one that's **cheapest to validate** — get quick signal before investing in expensive validation.

### 4. Flag Concerns for Routing

If any assumptions feel too risky to test through experiments alone — too uncertain, too lethal, or requiring user research before you can even design an experiment — flag them:

| Concern | Assumption # | Impact | Recommended Action |
|---------|-------------|--------|-------------------|
| *Unvalidated assumption or knowledge gap* | 1 | *How it affects hypothesis quality* | *e.g., "Route to Isla for targeted user discovery"* |

These flags may trigger routing to Isla in the Compass step — sending specific assumptions back for validation before proceeding to Wade's experiments.

**Guidance:** Don't flag everything. Flag the assumptions where you genuinely don't know enough to design an experiment. If you can design an experiment to test it, it belongs in the testing order, not the flagged concerns.

---

## Your Turn

Classify every assumption by lethality × uncertainty, build the risk map, produce the testing order, and flag any concerns. Share your analysis and I'll help you challenge any classifications that feel too comfortable.

---

**[a]** Advanced Elicitation — Deep dive into assumption classification with guided questioning
**[p]** Party Mode — Bring in other Vortex agents to challenge your risk assessments
**[c]** Continue — Proceed to synthesis and routing

---

## Next Step

When your assumption risk map and testing order are complete, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/assumption-mapping/steps/step-04-synthesize.md
