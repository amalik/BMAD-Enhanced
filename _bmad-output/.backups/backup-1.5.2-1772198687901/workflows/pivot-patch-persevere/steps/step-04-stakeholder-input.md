---
step: 4
workflow: pivot-patch-persevere
title: Stakeholder Input
---

# Step 4: Stakeholder Input

Before making the decision, we capture perspectives from everyone who has a stake in the outcome. This prevents blind spots and builds buy-in for whatever direction you choose.

## Why This Matters

Strategic decisions fail for two reasons: bad analysis and bad buy-in. Steps 1-3 addressed analysis. This step addresses buy-in. Even a perfect decision fails if the team doesn't commit to it. Stakeholder input:
- Surfaces information you might have missed
- Identifies concerns that could sabotage execution
- Creates shared ownership of the decision
- Provides a record of diverse viewpoints for future reference

## Your Task

### 1. Identify Key Stakeholders

List everyone who should have input on this decision:

| Stakeholder | Role | Why Their Input Matters |
|------------|------|----------------------|
| {name/role} | {position} | {what unique perspective they bring} |

**Common stakeholders to include:**
- Product lead / founder
- Engineering lead (feasibility and technical debt perspective)
- Design lead (user experience perspective)
- Sales/marketing (market and customer perspective)
- Customer success (retention and satisfaction perspective)
- Finance (runway and unit economics perspective)
- Individual contributors who ran the experiments

### 2. Capture Each Perspective

For each stakeholder, capture:

**Their reading of the evidence:**
- What do they see as the most important data point?
- Do they agree with the analysis from Steps 2-3?
- What evidence do they weigh differently than others?

**Their preference:**
- Which option do they lean toward? (Pivot / Patch / Persevere)
- Why?
- How strongly do they feel? (Strong conviction / Moderate preference / Open to persuasion)

**Their concerns:**
- What worries them about each option?
- What would make them change their mind?
- What conditions would they need to support an option they don't prefer?

**Their blind spots (that others can see):**
- Is their preference influenced by their role? (e.g., engineers prefer building, sales prefers what's sellable)
- Are they anchored to sunk costs?
- Are they influenced by ego or emotional attachment?

### 3. Identify Points of Agreement

Where does everyone agree?
- Shared understanding of the problem
- Shared assessment of evidence quality
- Shared concerns or risks
- Shared non-negotiables (things that must be true regardless of direction)

### 4. Identify Points of Disagreement

Where do stakeholders disagree?
- Which evidence is most important
- How to interpret ambiguous results
- Risk tolerance (some prefer bold moves, others prefer safe bets)
- Time horizon (short-term vs. long-term thinking)

For each disagreement, note:
- What would resolve it? (More data? Different framing? Compromise?)
- Is this a factual disagreement (resolvable with evidence) or a values disagreement (requires alignment on priorities)?

### 5. Surface Unspoken Dynamics

Be honest about the human dynamics at play:

**Common decision biases to watch for:**
| Bias | Signs | Antidote |
|------|-------|----------|
| Sunk cost fallacy | "We've already invested X" | "Would we start this today if we hadn't already invested?" |
| Confirmation bias | Only citing evidence that supports preferred option | "What evidence contradicts your preference?" |
| Authority bias | Deferring to the loudest voice or highest rank | "Let's hear from everyone before the leader speaks" |
| Groupthink | Quick consensus without real debate | "Who can steelman the opposite position?" |
| Loss aversion | Fear of losing progress outweighs potential gains | "What's the cost of NOT changing?" |
| Status quo bias | Defaulting to "keep going" because change is uncomfortable | "If we were starting fresh, would we choose this path?" |

## Example

**Stakeholder Perspectives:**

**Alex (Product Lead):**
- Evidence reading: Sees champion dependency as the key finding; believes it's patchable
- Preference: PATCH (Strong conviction) -- "The problem is real, we just need to nail onboarding"
- Concerns: Worried that pivoting wastes 4 months of validated learning about the problem space
- Possible blind spot: Emotionally attached to the original vision

**Jordan (Engineering Lead):**
- Evidence reading: Concerned about video processing costs at scale; believes technical risks are underweighted
- Preference: PATCH (Moderate) -- "I agree on direction but want to prototype the champion feature before committing"
- Concerns: If we patch and it still doesn't work, we've lost another 6 weeks
- Possible blind spot: Over-indexing on technical risk vs. market risk

**Sam (Sales/Marketing):**
- Evidence reading: Most excited about the "distributed teams only" finding; sees it as a sharper positioning angle
- Preference: PATCH (Open to persuasion) -- "Narrowing the market is smart, but I need a clear pitch before I can sell it"
- Concerns: Worried the narrowed market (distributed teams with 3+ timezones) is too small
- Possible blind spot: Thinking about what's easy to sell vs. what users need

**Agreement Points:**
- The problem is real and validated
- Co-located teams are NOT the right market
- Some form of narrowing is needed
- We need longer experiments (4+ weeks)

**Disagreement Points:**
- How risky is the champion dependency? (Alex: manageable; Jordan: significant; Sam: doesn't know)
- Is the narrowed market large enough? (Alex: yes; Sam: uncertain)
- Resolution: Both are factual disagreements resolvable with data (TAM analysis + champion experiment)

---

## Your Turn

Please capture stakeholder input using the structure above. If you're the sole decision-maker, still work through this exercise by considering the perspective of each function (product, engineering, design, sales, finance).

**Key principle:** The best decisions come from teams where people feel heard even when they're outvoted. Document dissenting views -- they're insurance against blind spots.

## Next Step

When you've captured stakeholder input, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/pivot-patch-persevere/steps/step-05-decision.md
