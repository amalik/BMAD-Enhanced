---
contract: HC3
type: artifact
source_agent: liam
source_workflow: hypothesis-engineering
target_agents: [wade]
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/hc2-problem-definition-busy-parents-2026-02-23.md"
    contract: HC2
created: 2026-02-24
---

# HC3 Hypothesis Contract: Busy Parents Meal Planning

> **This is an example artifact** demonstrating the HC3 schema format. It shows what a real output from Liam's hypothesis-engineering workflow looks like — 3 hypothesis contracts in 4-field format with an assumption risk map and recommended testing order.

## 1. Problem Context

| Field | Details |
|-------|---------|
| **Problem Statement** | Busy dual-income parents spend more time deciding what to feed their families than actually preparing meals, leading to daily decision fatigue that cascades into guilt, nutritional compromise, and reliance on expensive convenience options. Existing meal planning tools assume users have 30-60 minutes to plan weekly — a luxury these parents don't have. |
| **JTBD Reference** | When I'm standing in the kitchen at 5:30 PM after a full workday with hungry children, I want to know exactly what to make with what I already have — without thinking — so I can feed my family something decent in under 30 minutes and reclaim that mental energy for bedtime routines and connection. |
| **Key Pains Targeted** | (1) Decision fatigue at 5:30 PM — too many options, too little energy to choose. (2) Existing tools require upfront planning time parents don't have. (3) Guilt about nutritional quality of convenience choices. |

## 2. Hypothesis Contracts

### Hypothesis 1: The 5:30 PM Decision Eliminator

**The 4-Field Contract:**

| Field | Details |
|-------|---------|
| **Expected Outcome** | Parents using a context-aware meal suggestion system will reduce weeknight dinner decision time from an average of 18 minutes to under 3 minutes, while maintaining or improving their self-reported nutritional satisfaction. |
| **Target Behavior Change** | Parents will stop the "stand in the kitchen and scroll recipes" behavior and instead act on a single push notification suggesting tonight's dinner based on what's in their kitchen, dietary patterns, and time available. The target behavior is immediate action on a suggestion rather than deliberation. |
| **Rationale** | The HC2 evidence shows decision fatigue is the core pain (22/28 participants describe the "5:30 PM panic"), and 6/8 interview subjects said their ideal is "someone just tells me what to make." The problem isn't lack of recipes — it's lack of a decision. A system that eliminates the decision entirely addresses the functional JTBD directly. |
| **Riskiest Assumption** | Parents will trust an automated suggestion enough to act on it without second-guessing. The decision fatigue evidence proves they want someone to decide — but "someone" may need to be a trusted person, not an algorithm. If users don't trust the suggestion, they'll still deliberate, and the 18-minute decision time won't decrease. |

**Hypothesis Statement:**
> We believe that busy dual-income parents will act on a context-aware dinner suggestion within 3 minutes of receiving it because they are desperate to eliminate the daily decision burden and will trade control for speed when the suggestion accounts for what's already in their kitchen.

---

### Hypothesis 2: The Guilt-Free Nutrition Signal

**The 4-Field Contract:**

| Field | Details |
|-------|---------|
| **Expected Outcome** | Parents who receive a simple "nutrition score" (green/yellow/red) with each meal suggestion will report a 40% reduction in meal-related guilt, measured by weekly self-assessment, compared to parents who receive suggestions without nutrition scoring. |
| **Target Behavior Change** | Parents will shift from compensatory behavior (weekend "healthy meals" that take 2+ hours to make up for weeknight shortcuts) to consistent "good enough" weeknight meals. The target is reducing weekend overcompensation by 50% as parents gain confidence in weeknight nutrition quality. |
| **Rationale** | The HC2 evidence shows guilt is the #1 emotion (9/12 empathy map participants), and 5/8 interview subjects want "nutritional reassurance." The emotional JTBD is about feeling competent, not achieving perfect nutrition. A simple signal that says "this is good enough" addresses the emotional need directly without requiring users to become nutrition experts. |
| **Riskiest Assumption** | A simplified nutrition score (green/yellow/red) will be perceived as credible and reassuring rather than judgmental or oversimplified. If parents see a "yellow" rating and feel judged, the feature increases guilt rather than reducing it. The scoring must feel like reassurance, not evaluation. |

**Hypothesis Statement:**
> We believe that busy parents will feel significantly less meal-related guilt when meals include a simple nutrition quality signal because the guilt stems from uncertainty about "am I doing enough?" rather than actual nutritional failure, and a credible signal resolves that uncertainty.

---

### Hypothesis 3: The Zero-Planning Pantry Match

**The 4-Field Contract:**

| Field | Details |
|-------|---------|
| **Expected Outcome** | Parents using ingredient-aware meal matching (based on pantry contents) will reduce unplanned grocery stops from an average of 2.5 per week to 1 or fewer, saving approximately 40-60 minutes per week of errand time. |
| **Target Behavior Change** | Parents will stop making "ingredient gap" grocery runs for single missing items. Instead, they'll use meals matched to what they already have, and consolidate remaining needs into a single planned weekly shop. The target is elimination of reactive, unplanned grocery behavior. |
| **Rationale** | The HC2 observations show 5/8 sessions included unplanned grocery stops, and 3/8 interview subjects cited "ingredient gap" as the reason meal plans fail. Existing meal planning tools fail because they prescribe meals that require specific ingredients parents don't have. Matching meals to available ingredients inverts the model — start from what's in the kitchen, not from what the recipe demands. |
| **Riskiest Assumption** | Parents can and will accurately report what's in their kitchen. The pantry-matching model depends on knowing pantry contents. If keeping an ingredient inventory is itself a burden (another planning task parents don't have time for), the solution creates the same overhead it's trying to eliminate. |

**Hypothesis Statement:**
> We believe that busy parents will reduce unplanned grocery trips by 60% when meal suggestions are matched to their current pantry contents because the primary cause of unplanned trips is ingredient gaps between planned meals and available ingredients, not general grocery needs.

---

## 3. Assumption Risk Map

| # | Assumption | Hypothesis | Lethality | Uncertainty | Priority | Validation Status |
|---|-----------|-----------|-----------|-------------|----------|-------------------|
| A1 | Parents will trust an automated suggestion enough to act without deliberating | H1 | High | High | Test First | Unvalidated |
| A2 | A simplified nutrition score will feel reassuring rather than judgmental | H2 | High | High | Test First | Unvalidated |
| A3 | Parents can accurately maintain a pantry inventory without it becoming a burden | H3 | High | Medium | Test Soon | Unvalidated |
| A4 | The 5:30 PM moment is the right intervention point (not earlier in the day) | H1 | Medium | Medium | Test Soon | Partially Validated |
| A5 | "Good enough" nutrition is an acceptable standard (not aspirational perfect nutrition) | H2 | Medium | Low | Monitor | Partially Validated |
| A6 | Decision fatigue — not lack of cooking skill — is the primary barrier | H1, H3 | High | Low | Monitor | Partially Validated |
| A7 | Reducing unplanned grocery trips will be perceived as a meaningful benefit | H3 | Medium | Medium | Test Soon | Unvalidated |
| A8 | Willingness to pay for this type of solution exists in this segment | H1, H2, H3 | High | High | Test First | Unvalidated |

## 4. Recommended Testing Order

| Priority | Assumption | Suggested Method | Minimum Evidence |
|----------|-----------|-----------------|-----------------|
| 1 | A1: Parents trust automated suggestions enough to act | Concierge test — manually send personalized dinner suggestions via text to 15-20 parents for 2 weeks, measure action rate | ≥60% act on suggestion without requesting alternatives within the first week; action rate stable or increasing in week 2 |
| 2 | A8: Willingness to pay exists | Landing page smoke test — "Join the waitlist for $X/month" with pricing tiers, measure sign-up conversion | ≥5% visitor-to-signup conversion with price commitment (not free tier) |
| 3 | A2: Nutrition score feels reassuring, not judgmental | Prototype test — show nutrition-scored meal cards to 10-12 parents in moderated sessions, measure emotional response | ≥8 of 12 describe feeling "reassured" or "relieved"; <2 of 12 describe feeling "judged" or "shamed" |
| 4 | A3: Pantry inventory maintenance is not burdensome | Wizard of Oz test — provide a simple pantry tracking tool to 10 parents for 1 week, measure sustained daily use | ≥7 of 10 maintain pantry updates for full 7 days; average daily update time <2 minutes |
| 5 | A7: Reduced grocery trips perceived as meaningful | User interview — post-concierge-test interview about perceived value of grocery trip reduction | ≥6 of 10 mention time savings from fewer trips unprompted when asked about benefits |

## 5. Flagged Concerns

| Concern | Impact | Recommended Action |
|---------|--------|-------------------|
| No data on willingness to pay (A8) — all HC2 research focused on problem, not solution viability | If there's no willingness to pay, all three hypotheses are academically interesting but commercially unviable. This could invalidate the entire hypothesis set regardless of behavioral validation. | Route to Isla 🔍 for targeted user interviews (HC9) — specifically probe willingness to pay and price sensitivity before investing in behavioral experiments. Include question: "What are you currently spending on meal planning shortcuts (apps, meal kits, takeout)?" to establish baseline spend. |
| Pantry tracking assumption (A3) may introduce a new burden that undermines the value proposition | If pantry tracking requires more than 2 minutes/day, H3 fails and H1's suggestion quality degrades (suggestions won't match available ingredients without accurate pantry data) | Consider testing A3 early — if pantry tracking is too burdensome, pivot H1 and H3 to ingredient-agnostic suggestions. This would weaken the value proposition but remove a dependency. |
