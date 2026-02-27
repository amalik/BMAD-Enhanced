---
step: 2
workflow: assumption-mapping
title: Assumption Inventory & Extraction
---

# Step 2: Assumption Inventory & Extraction

Now let's crack open every hypothesis and drag every assumption into the light — the stated ones, the unstated ones, and especially the ones nobody wants to talk about.

## Why This Matters

The assumptions you don't surface are the ones that blindside you. Every hypothesis embeds assumptions in every field — assumptions about what users will do, about what "measurable" means, about why your rationale holds. Most teams only examine the riskiest assumption they already identified. That's a safe bet — what's the bold version? The bold version is surfacing the assumptions nobody even realized they were making.

## Your Task

### 1. Load and Review Hypothesis Contracts

For each hypothesis contract, review the complete 4-field structure:

| Field | What to look for |
|-------|-----------------|
| **Expected Outcome** | What are we assuming about the measurable result? Is "success" defined precisely enough? |
| **Target Behavior Change** | What are we assuming about how users will respond? About what's observable and measurable? |
| **Rationale** | What evidence-based claims could be wrong? Are we citing evidence or projecting? |
| **Riskiest Assumption** | Is this truly the riskiest, or is it the most obvious? Are there hidden ones we missed? |

### 2. Extract Stated Assumptions

For each hypothesis, extract every assumption that's explicitly or implicitly stated:

**Hypothesis {N}: {Title}**

| Source Field | Assumption | Type |
|-------------|-----------|------|
| Expected Outcome | *What we're assuming about the result* | Stated |
| Target Behavior Change | *What we're assuming about user response* | Stated |
| Rationale | *What evidence claims could be wrong* | Stated |
| Riskiest Assumption | *The assumption already identified* | Stated |

### 3. Surface Unstated Assumptions

This is where assumption mapping goes deeper than a single step. Challenge each hypothesis with these questions:

**Technology Assumptions:**
- Are we assuming a technical capability that hasn't been validated?
- Are we assuming integration points will work as expected?
- Are we assuming performance at scale based on prototype behavior?

**User Assumptions:**
- Are we assuming users have a specific level of motivation or ability?
- Are we assuming users will find/discover the feature?
- Are we assuming behavior in one context transfers to another?

**Market Assumptions:**
- Are we assuming competitive conditions will remain stable?
- Are we assuming timing — that the problem is urgent enough for users to act now?
- Are we assuming willingness to pay or change behavior?

**Measurement Assumptions:**
- Are we assuming we can actually measure the expected outcome?
- Are we assuming the metric is a valid proxy for the behavior change?
- Are we assuming sample size or timeframe is sufficient?

For each unstated assumption discovered, add it to the inventory:

| Source Field | Assumption | Type |
|-------------|-----------|------|
| *(cross-cutting)* | *The hidden assumption* | Unstated |

### 4. Produce the Full Assumption Inventory

Consolidate all assumptions across all hypotheses into a single inventory:

| # | Assumption | Hypothesis | Source Field | Type | Notes |
|---|-----------|-----------|-------------|------|-------|
| 1 | *Statement* | H1 | Expected Outcome | Stated | |
| 2 | *Statement* | H1 | *(cross-cutting)* | Unstated | *Why this matters* |
| 3 | *Statement* | H1, H2 | Rationale | Stated | *Shared across hypotheses* |

**Guidance:** Flag any assumption that appears across multiple hypotheses — if it's wrong, it could invalidate everything at once. Those are the ones that should make you nervous.

---

## Your Turn

Extract all assumptions from each hypothesis contract — stated and unstated. Use the question prompts above to surface hidden ones. Share your full assumption inventory and I'll help you challenge any assumptions that feel too comfortable.

## Next Step

When your assumption inventory is complete, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/assumption-mapping/steps/step-03-risk-mapping.md
