---
title: "Learning Card: 4 PM Decision Eliminator — Production Signal Analysis"
date: 2026-03-01
created-by: Amalik with Max (learning-decision-expert)
type: learning-card
source_workflow: learning-card
status: DECISION-READY
version: 1.0
---

#### Learning Card: Busy Parents Decision Eliminator — Post-Graduation Analysis

**What We Set Out to Learn**

Whether busy dual-income parents would trust and act on an automated dinner suggestion delivered before the anxiety spiral peaks, validating the core mechanism for a decision-elimination product.

**What We Actually Learned**

1. **The decision-elimination mechanism works.** 76% action rate at production scale (520 users, 3 weeks) confirms the concierge experiment finding. Parents will trust and act on a single suggestion without alternatives. This is not a novelty effect — action rate is stable at 3 weeks.

2. **Our timing was close but not optimal.** Users want the decision resolved 30-45 minutes earlier than our 4:00 PM design. 58% of interactions occur at 3:15-3:55 PM, suggesting the "decision resolution window" is during the afternoon work transition, not the commute. The concierge test couldn't surface this because timing was fixed.

3. **Coordination elimination is a powerful secondary effect.** Partner coordination messages dropped 80% in the concierge test — a result we didn't design for but that confirms HC3 H3. Both partners seeing the same suggestion eliminates the "what do you want?" negotiation.

4. **Early signal that guilt reduction may follow naturally.** 6 of 18 concierge participants stopped Sunday batch cooking by week 2, suggesting that confidence in weeknight meals reduces the compensatory weekend pattern. HC3 H2 (guilt circuit breaker) may not need a separate nutritional signal — the act of having a plan may be the reassurance mechanism.

**Key Assumptions Updated**

| Assumption | Previous Status | New Status | Evidence |
|-----------|----------------|------------|----------|
| A1: Trust in automated suggestion | Unvalidated | **Validated** | 76-83% action rate across experiment + production |
| A4: 4:00 PM optimal timing | Unvalidated | **Partially Validated — Refine** | 4:00 PM is better than 5:30 PM, but 3:15-3:55 PM may be better still |
| A2: Nutritional confidence signal | Unvalidated | Unvalidated (deprioritized) | Early signal suggests confidence comes from having a plan, not from a nutrition score |
| A7: Willingness to pay | Unvalidated | **Unvalidated — Test Next** | Core mechanism works, but commercial viability unknown |

**Strategic Decision**

**Recommendation: PATCH** (iterate on timing, don't pivot direction)

The core hypothesis is validated. The product direction (decision elimination via single suggestion) is correct. The timing mechanism needs refinement — shift from fixed 4:00 PM delivery to adaptive delivery based on each user's observed engagement pattern (3:15-4:15 PM range). This is an optimization, not a direction change.

**Three Actions:**

1. **Implement adaptive timing** — shift the push notification to match each user's observed engagement window. Engineering effort: 1-2 sprints. Expected impact: 5-10% action rate increase.

2. **Route to Isla for timing investigation** — qualitative research on why users engage at 3:15 PM. Is it anxiety relief, logistical planning, or habit? Understanding the "why" prevents optimizing for the wrong variable.

3. **Test willingness to pay (A7) immediately** — the mechanism works, but we have no commercial validation. Run a landing page test with pricing before further product investment. If A7 fails, the product direction is validated but the business model needs pivoting.

**What We Would NOT Recommend:**
- Building the nutritional confidence signal (H2) yet — early evidence suggests the plan itself provides the reassurance, making a separate feature potentially unnecessary
- Investing in partner-engagement features (HC3 H3/A3) before willingness-to-pay is validated — dual-partner UX adds complexity that may not be needed for core value delivery (many households operate with a sole dinner decider)

**Vortex Routing Decision**

Based on the evidence, Max routes the Vortex forward on three paths:

| Route | Contract | Agent | Action |
|-------|----------|-------|--------|
| Timing investigation | HC8 (decision-driven) | Isla 🔍 | Qualitative research on 3:15 PM engagement — understand user intent behind timing shift |
| Willingness to pay validation | HC7 (decision-driven) | Wade 🧪 via Liam 💡 | Design and run a pricing experiment (landing page smoke test) |
| Adaptive timing implementation | HC6 (decision-driven) | Emma 🎯 | Recontextualize the product scope to include adaptive timing as core feature |
