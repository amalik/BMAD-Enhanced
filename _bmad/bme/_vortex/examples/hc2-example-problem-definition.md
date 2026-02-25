---
contract: HC2
type: artifact
source_agent: mila
source_workflow: research-convergence
target_agents: [liam]
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/hc1-empathy-map-busy-parents-2026-02-20.md"
    contract: HC1
  - path: "_bmad-output/vortex-artifacts/hc1-interview-synthesis-working-parents-2026-02-21.md"
    contract: HC1
  - path: "_bmad-output/vortex-artifacts/hc1-discovery-report-meal-planning-2026-02-22.md"
    contract: HC1
created: 2026-02-23
---

# HC2 Problem Definition: Busy Parents Meal Planning

> **This is an example artifact** demonstrating the HC2 schema format. It shows what a real output from Mila's research-convergence workflow looks like.

## 1. Converged Problem Statement

**Problem Statement:** Busy dual-income parents spend more time deciding what to feed their families than actually preparing meals, leading to daily decision fatigue that cascades into guilt, nutritional compromise, and reliance on expensive convenience options. Existing meal planning tools assume users have 30-60 minutes to plan weekly — a luxury these parents don't have — creating a gap between available solutions and the reality of time-constrained family feeding.

**Confidence:** High

Multiple artifacts converge on the same core problem with strong, consistent evidence from 28 participants across 3 research methods. All 3 artifacts independently surface time-as-constraint and decision-fatigue as primary themes.

**Scope:**
- **In scope:** Weeknight dinner planning and preparation for families with children ages 2-12, dual-income households, urban/suburban settings
- **Out of scope:** Meal prep for special dietary needs (medical), restaurant/takeout optimization, grocery delivery logistics, weekend/holiday meal planning

## 2. Jobs-to-be-Done

### Primary JTBD

> **When** I'm standing in the kitchen at 5:30 PM after a full workday with hungry children asking "what's for dinner?",
> **I want to** know exactly what to make with what I already have — without thinking,
> **so I can** feed my family something decent in under 30 minutes and reclaim that mental energy for bedtime routines and connection.

### Job Types

**Functional Job:** Produce a nutritionally acceptable weeknight dinner using available ingredients within 30 minutes of arriving home, with minimal decision-making required.
- Evidence: 22 of 28 participants described the "5:30 PM panic" moment. 6 of 8 interview subjects mentioned the specific time constraint of 30 minutes. Observation data showed average decision-to-plate time of 47 minutes, of which 18 minutes was decision-making.

**Emotional Job:** Feel like a competent parent who feeds their family well, without the guilt of choosing convenience over nutrition.
- Evidence: Empathy map "Feels" quadrant showed guilt as the #1 emotion (mentioned by 9 of 12 empathy map participants). Interview quote: "I know I should be doing better. My mom made everything from scratch and I can barely manage a box of mac and cheese some nights."

**Social Job:** Not be judged by partner, in-laws, or other parents for feeding children "poorly" — maintain the appearance of having family meals under control.
- Evidence: 4 of 8 interview subjects mentioned partner judgment or comparison to other families. Observation report noted 3 instances of participants minimizing their convenience food use when describing meals to others.

## 3. Pains

| Pain Description | Priority | Frequency | Intensity | Evidence Sources | Current Coping |
|-----------------|----------|-----------|-----------|-----------------|----------------|
| Decision fatigue at 5:30 PM — too many options, too little energy to choose | High | Daily (weeknights) | Blocks all other evening activities for 15-20 minutes | Empathy map (9/12 participants), Interviews (6/8 subjects), Observations (all 8 sessions) | Default to 3-4 "rotation meals" that require no thought |
| Existing tools require upfront planning time parents don't have | High | Weekly (when attempting to plan) | 2 of 8 interview subjects abandoned meal planning apps within a week | Interviews (6/8 mentioned tool abandonment), Discovery report (4 app reviews analyzed) | Stop using tools, revert to mental lists or nothing |
| Guilt about nutritional quality of convenience choices | Medium | 3-4 times/week | Emotional toll described as "constant low-grade guilt" | Empathy map (9/12 "guilt" in Feels), Interviews (5/8 unprompted guilt mentions) | Compensate with weekend "healthy meals" that take 2+ hours |
| Partner coordination on meals creates hidden overhead | Medium | Daily | 15-20 minutes of texting/calling about dinner plans | Interviews (4/8 mentioned coordination), Observations (3/8 observed texting about meals) | One partner defaults to "just handle it" role |

## 4. Gains

| Gain Description | Priority | Expected Impact | Evidence Sources |
|-----------------|----------|----------------|-----------------|
| Know what's for dinner before 5:30 PM without spending time planning | High | Eliminates daily decision fatigue, saves 15-20 min/day of mental load | Interviews (6/8 described ideal as "someone just tells me what to make"), Empathy map ("I just want someone to tell me it's okay to not do everything") |
| Feel confident that meals are "good enough" nutritionally | High | Reduces guilt, improves emotional well-being around family feeding | Empathy map (Feels/Thinks quadrants), Interviews (5/8 want "nutritional reassurance") |
| Meals that use what's already in the kitchen — no special shopping trips | Medium | Saves 2-3 unplanned grocery stops per week (avg. 20 min each) | Observations (5/8 sessions showed unplanned grocery stops), Interviews (3/8 mentioned "ingredient gap" as meal plan breaker) |

## 5. Evidence Summary

| Field | Details |
|-------|---------|
| **Artifacts Analyzed** | 3 HC1 artifacts: Empathy Map (12 participants), Interview Synthesis (8 semi-structured interviews, 45 min each), Discovery Report (8 observation sessions, 2 hours each) |
| **Total Evidence Points** | 47 discrete evidence points across all 3 artifacts (22 direct quotes, 14 behavioral observations, 11 survey/count data points) |
| **Convergence Assessment** | High — all 3 artifacts independently converge on the same core problem (time-as-constraint + decision-fatigue). No artifact contradicts the primary finding. Theme strength: Universal (3/3 artifacts). |
| **Contradictions** | Minor: Empathy map suggests users want "more meal options" while interviews reveal they feel "overwhelmed by choice." Resolved: users want more *appropriate* options (filtered for their constraints), not more options in general. The desire is for curation, not volume. |
| **Evidence Gaps** | (1) No data on willingness to pay for a solution — all research focused on problem, not solution. (2) Limited data on single-parent households (only 2 of 28 participants). (3) No longitudinal data on whether decision fatigue worsens seasonally. |

## 6. Assumptions

| Assumption | Basis | Risk if Wrong | Validation Status |
|-----------|-------|---------------|-------------------|
| The 5:30 PM decision point is the critical intervention moment | 22 of 28 participants described this timing; observation data confirms peak stress at this time | If the real bottleneck is earlier (e.g., grocery shopping), solving at 5:30 PM won't help | Partially Validated — strong evidence for the timing, but no data on whether earlier intervention would be more effective |
| "Good enough" nutritional quality is an acceptable bar for these users | 5 of 8 interview subjects used this phrase or equivalent; guilt evidence suggests aspiration exceeds current behavior | If users actually want gourmet/perfect nutrition, a "good enough" solution will feel like failure | Partially Validated — consistent language across interviews, but sample may not represent health-conscious segment |
| Partner coordination overhead is a real pain, not just a complaint | 4 of 8 interviews + 3 observations showed coordination behavior | If coordination is actually working fine and users are just venting, solving this adds no value | Assumed — behavioral evidence is moderate but not universal (4 of 8) |
