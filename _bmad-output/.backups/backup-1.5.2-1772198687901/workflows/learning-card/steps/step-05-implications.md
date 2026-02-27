---
step: 5
workflow: learning-card
title: Implications
---

# Step 5: Implications

Now we translate validated learnings into strategic implications. What does this mean for the product? What decisions does this inform? This is where learning becomes action.

## Why This Matters

A learning card without implications is like a lab report without a conclusion section. Implications:
- Connect experiments to product strategy
- Inform resource allocation and prioritization
- Trigger pivot/patch/persevere decisions
- Prevent the "interesting but so what?" problem

## Your Task

### 1. Product Implications

For each validated learning, answer: what does this mean for what we build?

**Framework for product implications:**
- **Build:** This learning tells us we SHOULD build X because Y
- **Don't build:** This learning tells us we should NOT build X because Y
- **Modify:** This learning tells us we should CHANGE our approach to X
- **Investigate further:** We can't decide yet; we need more evidence on X

Be specific. "We should improve the product" is not an implication. "We should add a team champion onboarding flow because adoption requires a daily role model" is.

### 2. Strategy Implications

Zoom out from the product to the business:

- **Value proposition:** Does this learning change how we describe our value?
- **Target market:** Does this learning narrow, expand, or shift our target user?
- **Business model:** Does this affect pricing, distribution, or revenue assumptions?
- **Competitive positioning:** Does this change how we differentiate?

### 3. Assumption Cascade

Every learning changes the assumption landscape. Map the ripple effects:

**Assumptions now STRONGER (more confident):**
- List assumptions that this learning reinforces
- Note why and how much more confident you are

**Assumptions now WEAKER (less confident):**
- List assumptions that this learning undermines
- Note what needs to happen to resolve them

**NEW assumptions to test:**
- What new assumptions emerged from this learning?
- How important are they to your strategy?
- What's the fastest way to test them?

### 4. Decision Trigger Assessment

Does this learning trigger a major decision?

**Use this decision readiness framework:**

| Signal | Meaning | Action |
|--------|---------|--------|
| Multiple learnings point the same direction | Pattern emerging | Consider acting on it |
| Key assumption invalidated | Strategy at risk | Trigger pivot/patch/persevere review |
| Core hypothesis validated | Green light | Proceed to next stage with confidence |
| Evidence is mixed | Insufficient clarity | Design follow-up experiment |
| Evidence contradicts team consensus | Conflict between belief and data | Facilitate evidence-based discussion |

### 5. Recommended Next Actions

Based on the implications, what should happen next? Be concrete:

- **Immediately:** What should change RIGHT NOW based on this learning?
- **This sprint:** What experiments or work items should be added?
- **This quarter:** What strategic adjustments should be considered?
- **Flag for review:** What should be raised with stakeholders?

## Example

**Product Implications:**

1. **BUILD:** Add a "team champion" onboarding path that designates one person per team as the daily role model. Learning shows champions drive 25%+ higher adoption.

2. **DON'T BUILD:** Don't invest in reminder/notification features as the primary adoption mechanism. Team C had reminders but still dropped to 62% without a champion. Habit formation is social, not mechanical.

3. **MODIFY:** Target cross-timezone teams first, not co-located teams. The value proposition is significantly stronger when synchronous meetings are painful (timezone friction) vs. merely inefficient (co-located).

4. **INVESTIGATE:** We need to understand whether 2-week novelty drop-off stabilizes or continues declining before committing to a full MVP build.

**Strategy Implications:**

- **Value proposition shift:** From "replace standups" to "enable effective async collaboration for distributed teams." The timezone angle is stronger than the meeting-hate angle.
- **Target market narrowed:** Focus on teams with 3+ time zones represented, not all remote teams. This is a smaller market but much higher-urgency problem.
- **Business model unchanged:** No impact on pricing assumptions yet -- need to test willingness to pay separately.

**Assumption Cascade:**

Stronger:
- "Distributed teams need async status tools" (HIGH confidence now)
- "Video is more information-rich than text status" (MEDIUM-HIGH)

Weaker:
- "All remote teams are our market" (now believe only cross-timezone teams are initial market)
- "Consistent daily updates will happen naturally" (requires social mechanism)

New:
- "Team champion role can be onboarded, not just organic" (need to test with non-volunteer champions)
- "4+ weeks needed for habit formation" (need longer experiment)

**Decision Trigger:** This learning triggers a SCOPE NARROWING decision, not a pivot. The core hypothesis is partially validated but the target market needs to be narrowed.

**Recommended Next Actions:**
- **Immediately:** Update our target persona to specify "cross-timezone teams"
- **This sprint:** Design a 4-week replication study with 8-10 teams, including assigned champions
- **This quarter:** Revisit co-located teams after nailing the distributed use case
- **Flag for review:** Share the market narrowing with founding team -- smaller initial TAM but higher conversion potential

---

## Your Turn

Please map the implications of your validated learnings using the structure above.

**Key principle:** Implications should be specific enough that someone could act on them without asking you for clarification. If your implication is "we should think about this more," push yourself to say WHAT you should think about and HOW.

## Next Step

When you've mapped the implications, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/learning-card/steps/step-06-synthesize.md
