---
step: 1
workflow: learning-card
title: Experiment Context
---

# Step 1: Experiment Context

Before we analyze results, we need to clearly establish what was tested and why. This context ensures the learning card is useful months from now when you've forgotten the details.

## Why This Matters

A learning without context is just a random fact. Context establishes:
- The original hypothesis and its importance to your strategy
- The method chosen and why it was appropriate
- The timeline and conditions under which the experiment ran
- The success criteria that were defined BEFORE seeing results (this prevents moving goalposts)

## Your Task

Answer these questions to establish the experiment context:

### 1. What experiment did you run?

Give it a clear name and a one-sentence description.
- **Name:** (e.g., "Landing Page Smoke Test", "Concierge MVP Week 3", "Price Sensitivity Survey")
- **Description:** What did you do, in plain language?

### 2. What hypothesis were you testing?

Use the format: "We believe that [target users] will [expected behavior] because [rationale]."

Be specific:
- **Weak:** "We believe users will like our product"
- **Strong:** "We believe that remote engineering managers with 5+ direct reports will complete weekly status reviews 40% faster using async video updates because they currently spend 3+ hours/week in synchronous standup meetings"

### 3. What method did you use?

Describe the experiment type and setup:
- **Type:** (Interview, Survey, A/B test, Landing page, Concierge MVP, Wizard of Oz, Prototype test, etc.)
- **Sample size:** How many participants/users/responses?
- **Duration:** How long did the experiment run?
- **Recruitment:** How were participants selected? (This matters for bias assessment)

### 4. What were the pre-defined success criteria?

What thresholds did you set BEFORE running the experiment?

Examples:
- "At least 30% of visitors click the CTA"
- "7 out of 10 interview participants mention this pain point unprompted"
- "Completion time under 5 minutes for 80% of participants"
- "Net Promoter Score above 40"

### 5. What was the strategic context?

Why did this experiment matter? What decision was it supposed to inform?
- What stream of the Vortex was this part of?
- What assumption in your business model does this test?
- What would you do differently depending on the outcome?

## Example

**Experiment Name:** Async Status Update Smoke Test

**Description:** We created a simple Loom-based workflow where team members recorded 2-minute daily status videos instead of attending standup meetings. Ran with 3 pilot teams for 2 weeks.

**Hypothesis:** We believe that remote engineering teams (5-8 people) will maintain alignment without daily standup meetings if they record 2-minute async video updates, because team members report standups are disruptive and poorly timed across time zones.

**Method:**
- **Type:** Concierge MVP (manual process using Loom + Slack channel)
- **Sample size:** 3 teams, 19 total participants
- **Duration:** 2 weeks (10 business days)
- **Recruitment:** Volunteered from teams that had complained about standup meetings in last retrospective

**Success Criteria (pre-defined):**
- 80%+ daily participation rate (at least 8 of 10 days per person)
- Team alignment score maintained or improved (weekly survey, 1-5 scale)
- Average video length under 3 minutes
- Managers report spending less time on status tracking (time log comparison)

**Strategic Context:**
- Part of Externalize stream: testing our value proposition before building
- Tests core assumption: "Teams will actually do async updates consistently"
- If validated: proceed to build MVP with recording + dashboard features
- If invalidated: explore hybrid model (fewer meetings, not zero meetings)

---

## Your Turn

Please provide the experiment context using the structure above.

**Important:** If you didn't define success criteria before the experiment, acknowledge that. Post-hoc criteria are a red flag for confirmation bias -- we'll note that in the learning card so future readers know the evidence quality.

## Next Step

When you've provided complete experiment context, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/learning-card/steps/step-02-raw-results.md
