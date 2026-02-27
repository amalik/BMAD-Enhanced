---
step: 2
workflow: learning-card
title: Raw Results
---

# Step 2: Raw Results

Now we capture the raw data and observations -- exactly what happened, without interpretation. This step is deliberately separated from analysis to prevent confirmation bias.

## Why This Matters

The most common mistake in experiment analysis is jumping straight to conclusions. Separating raw data from interpretation:
- **Prevents cherry-picking** - You record ALL results, not just ones that support your hypothesis
- **Enables re-analysis** - Others can draw different conclusions from the same data
- **Catches surprises** - The most valuable learnings are often the unexpected ones
- **Builds credibility** - Stakeholders trust conclusions grounded in visible data

## Your Task

Capture the raw results without analysis or interpretation. Just the facts.

### 1. Quantitative Results

Report the numbers against each success criterion:

| Metric | Target | Actual | Met? |
|--------|--------|--------|------|
| {metric-1} | {target-1} | {actual-1} | Yes/No |
| {metric-2} | {target-2} | {actual-2} | Yes/No |

Include ALL metrics you tracked, even ones that seem irrelevant now.

### 2. Qualitative Observations

Capture direct quotes, observed behaviors, and notable moments:

**Direct Quotes (verbatim where possible):**
- "..." - Participant 1, context
- "..." - Participant 2, context

**Observed Behaviors:**
- What did participants actually do (vs. what they said they'd do)?
- Where did they get stuck, confused, or frustrated?
- What surprised you?

**Notable Moments:**
- Any "aha" moments?
- Any emotional reactions?
- Any participants who used the product/solution in unexpected ways?

### 3. Unexpected Findings

What happened that you DIDN'T expect? These are often the most valuable data points.

- Anything participants mentioned that wasn't in your hypothesis?
- Any patterns you didn't anticipate?
- Any metrics that moved in surprising directions?
- Any segments that behaved differently from others?

### 4. Data Quality Assessment

Be honest about the limitations:

- **Sample bias:** Were participants representative of your target user?
- **Duration:** Was the experiment long enough to see real behavior?
- **Confounding factors:** What else was happening that might have affected results?
- **Missing data:** What couldn't you measure that you wish you had?
- **Hawthorne effect:** Did participants behave differently because they knew they were being observed?

## Example

**Quantitative Results:**

| Metric | Target | Actual | Met? |
|--------|--------|--------|------|
| Daily participation rate | 80%+ | 73% overall (Team A: 91%, Team B: 68%, Team C: 62%) | No |
| Alignment score (1-5) | Maintain at 3.8+ | Week 1: 3.2, Week 2: 3.9 | Partially (Week 2 only) |
| Average video length | Under 3 min | 2 min 14 sec | Yes |
| Manager time on status | Reduce by 30%+ | Manager A: -45%, Manager B: -20%, Manager C: +10% | Mixed |

**Qualitative Observations:**

Direct quotes:
- "I actually liked knowing I could watch updates on MY schedule, not theirs" - Manager A
- "By day 4 I forgot to record. It's just not in my routine yet." - Dev, Team C
- "The videos were better than standups because people showed their screens instead of just talking" - Tech Lead, Team A
- "I don't want to be on camera. Can I just do audio?" - Dev, Team B

Observed behaviors:
- Team A adopted a pattern of recording first thing in morning (habit-stacking with coffee)
- Team B participation dropped steadily over 2 weeks
- Team C had one champion who recorded every day; others were inconsistent
- 4 participants started watching videos at 2x speed by day 3

Notable moments:
- Manager A discovered a blocker through a video that had existed for 3 days unreported
- Team B tried to game it by recording 15-second "nothing to report" videos

**Unexpected Findings:**
- Screen-sharing in videos was MORE informative than verbal standup updates
- Async worked better for cross-timezone teams (Team A) than co-located teams (Team C)
- Junior developers participated more consistently than senior developers
- Two participants started using videos for non-status purposes (design reviews, bug reports)

**Data Quality:**
- Sample bias: All volunteer teams who already disliked standups (positive selection bias)
- Duration: 2 weeks may not show long-term habit formation
- Confounding: Team A was starting a new sprint (high motivation), Team C was in maintenance mode (low energy)
- Missing: No customer impact data, no quality metrics
- Hawthorne: Likely -- teams knew managers were tracking participation

---

## Your Turn

Please share the raw results of your experiment. Resist the urge to interpret -- just give me the data. We'll make sense of it in the next step.

**Reminder:** Include results that contradict your hypothesis too. Those are the most valuable learning opportunities.

## Next Step

When you've captured the raw results, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/learning-card/steps/step-03-analysis.md
