---
step: 4
workflow: learning-card
title: Validated Learning
---

# Step 4: Validated Learning

Now we extract the validated learnings -- the actual knowledge gained from this experiment. What assumptions were confirmed? What was invalidated? What new questions emerged?

## Why This Matters

Validated learning is the currency of Lean Startup. It's the difference between "we tried stuff" and "we know something we didn't know before." Validated learnings:
- Convert experiment effort into permanent organizational knowledge
- Reduce uncertainty for future decisions
- Prevent repeating the same experiments
- Build confidence (or appropriate caution) for next steps

## Your Task

### 1. Classify Each Original Assumption

For every assumption that was tested, categorize it:

**VALIDATED** - Evidence strongly supports this assumption
- What specific evidence validates it?
- How confident are you? (High / Medium / Low)
- What conditions are required for this to hold?

**INVALIDATED** - Evidence contradicts this assumption
- What specific evidence invalidates it?
- Was it completely wrong or just partially wrong?
- What's the corrected understanding?

**PARTIALLY VALIDATED** - Evidence supports it in some contexts but not others
- Under what conditions does it hold?
- Under what conditions does it fail?
- What's the refined hypothesis?

**UNRESOLVED** - The experiment didn't generate enough evidence to decide
- Why couldn't you resolve it? (Sample too small? Wrong method? Confounding factors?)
- What would you need to resolve it?

### 2. Extract the Core Learnings

Distill your findings into clear learning statements. A good learning statement:
- Is specific and actionable
- States what you now KNOW (not what you hope)
- Includes the conditions under which it's true
- Is falsifiable by future experiments

**Format:** "We learned that [specific finding] when [conditions], based on [evidence]."

**Examples of strong learning statements:**
- "We learned that cross-timezone teams adopt async video updates at 90%+ participation rates when a team champion models the behavior daily, based on Team A's 91% participation vs. Team C's 62% without a champion."
- "We learned that novelty drives initial adoption but doesn't sustain it, based on participation dropping from 80% (Week 1) to 67% (Week 2) across all teams."
- "We learned that we CANNOT conclude whether async updates improve team alignment, because our sample size (n=3 teams) and duration (2 weeks) were insufficient."

**Examples of weak learning statements (avoid these):**
- "Users like async updates" (too vague, no conditions, no evidence cited)
- "Our product is better than standups" (not tested, opinion masquerading as learning)
- "The experiment was successful" (binary thinking, misses nuance)

### 3. Identify New Questions

Every good experiment generates more questions than it answers. What new questions emerged?

**Format for each:**
- **Question:** What do you now need to know?
- **Why it matters:** What decision does this inform?
- **How to test:** What experiment would answer this?
- **Priority:** How urgently do you need this answer?

### 4. Rate the Overall Learning Quality

Honestly assess the quality of evidence behind your learnings:

**STRONG EVIDENCE:**
- Adequate sample size
- Pre-defined success criteria
- Controlled for major biases
- Results are replicable

**MODERATE EVIDENCE:**
- Directional but not definitive
- Some bias concerns
- Small sample but consistent patterns
- Would benefit from replication

**WEAK EVIDENCE:**
- Very small sample
- Post-hoc criteria
- Significant bias concerns
- Contradictory signals

**ANECDOTAL:**
- Based on individual stories, not patterns
- No quantitative support
- High risk of confirmation bias

## Example

**Assumption Classification:**

| Assumption | Status | Confidence | Evidence |
|-----------|--------|------------|----------|
| Teams will do async updates consistently | PARTIALLY VALIDATED | Medium | Works with champions (91%) but fails without (62-68%) |
| Async maintains team alignment | UNRESOLVED | Low | Alignment improved Week 2 but sample too small |
| Managers will save time | PARTIALLY VALIDATED | Low | 1 of 3 saved significant time; 1 actually spent more |
| Screen-sharing adds value | VALIDATED | Medium | Unprompted adoption + blocker discovery incident |

**Core Learnings:**

1. "We learned that async video updates CAN achieve 90%+ adoption when a team champion records daily and the team is distributed across time zones, based on Team A's results. However, without a champion and with co-located teams, adoption drops below 70%."

2. "We learned that video screen-sharing is more information-dense than verbal standup reports, based on the unprompted adoption by 12/19 participants and the discovery of a 3-day-old blocker that verbal standups had missed."

3. "We learned that initial enthusiasm does NOT predict sustained usage, based on the 13-point drop in participation between Week 1 and Week 2, despite positive survey responses throughout."

**New Questions:**
- Can we design a habit-forming mechanism to sustain participation beyond the novelty period? (HIGH PRIORITY -- blocks MVP decision)
- Does async work for teams larger than 8 people? (MEDIUM -- scoping question)
- Would audio-only options increase participation for camera-shy team members? (MEDIUM -- 2 participants raised this)

**Overall Evidence Quality:** MODERATE - Directional findings with clear patterns, but sample too small for definitive conclusions. Should replicate with 8-10 teams over 4+ weeks before committing to building.

---

## Your Turn

Please extract your validated learnings using the structure above. Remember: acknowledging what you DON'T know is as valuable as stating what you do know.

**Key principle:** A validated learning is not "we were right." It's "we now understand this specific thing about how our users behave under these conditions, and here's the evidence."

## Next Step

When you've extracted your validated learnings, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/learning-card/steps/step-05-implications.md
