---
step: 6
workflow: user-discovery
title: Synthesize Discovery Findings
---

# Step 6: Synthesize Discovery Findings

This is where everything comes together. You'll distill your organized data into a clear, actionable discovery report that answers your research questions and reveals opportunity areas for your product.

## Why This Matters

Data without synthesis is just noise. Your stakeholders don't need 200 sticky notes -- they need 5 key themes, 3 opportunity areas, and a clear recommendation for what to do next. Synthesis is the intellectual work that transforms research into strategy.

## Your Task

### 1. Answer Your Research Questions

Go back to the research questions you defined in Step 1. For each one:

**State the answer clearly:**
- One paragraph summary of what you learned
- Confidence level: High (multiple sources, consistent pattern), Medium (some evidence, needs more validation), Low (limited data, emerging signal)
- Key evidence supporting the answer (cite specific sources)

**Example:**
> **Question:** "What does a typical day look like for a small-business owner managing finances?"
>
> **Answer:** Small-business owners manage finances in fragmented bursts, not dedicated sessions. Across 6 contextual inquiry sessions, we observed that financial tasks (invoicing, expense tracking, bank reconciliation) are interleaved with core business activities and rarely receive more than 10 minutes of focused attention. Owners rely on 3-5 different tools and maintain at least one "backup" spreadsheet. The primary trigger for financial tasks is anxiety (upcoming tax deadline, low account balance alert), not routine.
>
> **Confidence:** High -- consistent across all participants and supported by diary study entries showing average 4.2 financial micro-sessions per day.

### 2. Identify Key Themes (3-7)

Themes are the big patterns that cut across multiple research questions and data sources. A good theme is:

- Supported by evidence from multiple participants AND multiple methods
- Descriptive of a pattern, not just a topic
- Relevant to product decisions

**Theme format:**

**Theme: [Descriptive name]**
- **Pattern:** What you observed happening consistently
- **Evidence:** Sources and frequency (e.g., "6 of 8 participants, 68% of survey respondents, confirmed by analytics")
- **Implication:** What this means for your product or strategy
- **Quote:** One representative quote that brings the theme to life

**Example:**
> **Theme: Anxiety-driven financial management**
> - **Pattern:** Financial tasks are triggered by fear of consequences (missed deadlines, cash flow problems) rather than proactive planning. Users react rather than plan.
> - **Evidence:** Observed in 6/8 contextual sessions. Diary entries show 73% of financial tasks triggered by notifications or deadlines. Survey: 61% agree "I only look at my finances when something forces me to."
> - **Implication:** Our product should reduce anxiety by providing early, gentle alerts rather than assuming users will proactively check dashboards.
> - **Quote:** "I know I should look at this stuff more often, but honestly I only open it when I'm scared." -- P04

### 3. Map Opportunity Areas

Opportunity areas bridge research findings and product strategy. They answer: "Given what we learned, where should we invest?"

**For each opportunity area:**

- **Opportunity:** A clear statement of the unmet need or underserved job
- **User evidence:** What you saw or heard that reveals this opportunity
- **Size signal:** How many users are affected? How frequently? How severely?
- **Current alternatives:** How do users solve this today? (Workarounds, competitors, manual processes)
- **Strategic fit:** How does this align with your product vision and business goals?
- **Priority:** High / Medium / Low based on evidence strength, user impact, and strategic fit

**Example:**
> **Opportunity: Proactive cash flow forecasting**
> - **User evidence:** 7/8 participants expressed anxiety about cash flow surprises. 5 maintain manual spreadsheets to predict upcoming expenses.
> - **Size signal:** 61% of survey respondents (n=142) report cash flow uncertainty as their #1 financial stress.
> - **Current alternatives:** Manual spreadsheets (43%), gut feel (31%), accountant calls (15%), competitor tool (11%)
> - **Strategic fit:** Aligns with our mission to "remove financial anxiety from running a business."
> - **Priority:** High

### 4. Document What You Did NOT Learn

Intellectual honesty is a hallmark of rigorous research. State clearly:

- Which research questions remain partially answered
- What populations or contexts you did not study
- What biases may exist in your sample
- What follow-up research you recommend

This builds credibility and helps future researchers avoid duplicating work or inheriting your blind spots.

### 5. Create the Discovery Report

I'll use the template at `user-discovery.template.md` to generate your final artifact.

**Output File:** `{output_folder}/user-discovery-{topic}-{date}.md`

### 6. Validation Questions

Before we finalize, let's validate the synthesis:

**Evidence rigor:**
- [ ] Every theme is supported by evidence from at least 2 methods
- [ ] Every opportunity area cites specific participant data or metrics
- [ ] Confidence levels are honestly assessed
- [ ] Contradictions and limitations are documented

**Actionability:**
- [ ] A product manager could use this to prioritize the next quarter's roadmap
- [ ] A designer could use the themes to inform persona updates or journey maps
- [ ] Stakeholders can understand the key findings in under 5 minutes
- [ ] The report answers the original discovery goal from Step 1

**Completeness:**
- [ ] All research questions are addressed (even if partially)
- [ ] Key themes cover the breadth of what was discovered
- [ ] Opportunity areas include size signals and priority
- [ ] Limitations and next steps are documented

---

## Your Turn

Please provide:
1. Your answers to each research question (with confidence levels)
2. Your 3-7 key themes with evidence
3. Your opportunity areas ranked by priority
4. What you did NOT learn and what follow-up research you'd recommend

I'll review your synthesis and help refine it into the final discovery report.

## Output

Once you confirm, I'll create:

**File:** `{output_folder}/user-discovery-{topic}-{date}.md`

**Contents:**
- Executive Summary
- Discovery Scope (goal, questions, population)
- Research Methods Used
- Key Themes (with evidence)
- Opportunity Areas (prioritized)
- Research Question Answers
- Limitations and Next Steps
- Research Sources

---

## Vortex Compass

Based on what you just completed, here are your evidence-driven options:

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Discovery findings ready for convergence | research-convergence | Mila 🔬 | Converge discovery findings into problem definition (HC1) |
| Ready to test hypotheses | lean-experiment | Wade 🧪 | Design experiments from discovery insights |
| Need deeper empathy for key users | empathy-map | Isla 🔍 | Map the users you discovered in depth |

> **Note:** These are evidence-based recommendations. You can navigate to any Vortex agent
> at any time based on your judgment.

**Or run Max's [VN] Vortex Navigation** for a full gap analysis across all streams.
