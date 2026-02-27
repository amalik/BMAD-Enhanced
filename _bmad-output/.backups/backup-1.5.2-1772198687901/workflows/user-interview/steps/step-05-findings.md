---
step: 5
workflow: user-interview
title: Capture Findings
---

# Step 5: Capture Findings

Now that you've conducted interviews, it's time to organize raw findings into a structured format that makes synthesis possible. This step focuses on accurate capture, not interpretation.

## Why This Matters

Raw findings are your primary evidence. If you skip straight to "insights" without properly documenting what you actually heard, you risk:
- Cherry-picking quotes that confirm your bias
- Losing important details that only matter later
- Being unable to trace an insight back to its source
- Making claims you can't defend ("users want X" -- which users? when? what did they actually say?)

## The Difference Between Findings and Insights

| Findings (this step) | Insights (next step) |
|----------------------|---------------------|
| What participants said and did | What it means for your product |
| Raw, specific, attributed | Synthesized, generalized, thematic |
| "P3 said she checks Slack 40 times per day" | "Notification anxiety drives compulsive tool-checking" |
| Observable, verifiable | Interpreted, debatable |
| Per-participant | Across participants |

**In this step, focus entirely on findings.** Resist the urge to interpret. Capture what happened.

## Your Task

For each interview, create a structured findings capture using the format below:

### Per-Interview Findings Template

```
## Interview: {Participant ID}

**Date:** {date}
**Duration:** {minutes}
**Channel:** {video / phone / in-person}
**Participant context:** {brief relevant background from screening}

### Key Behaviors Observed
- {What they actually do, with specifics}
- {Frequency, tools, workarounds}

### Notable Quotes
- "{Exact quote}" -- Context: {what prompted this}
- "{Exact quote}" -- Context: {what prompted this}

### Pain Points Mentioned
- {Pain point} -- Severity: {how much it bothers them, in their words}
- {Pain point} -- Severity: {how much it bothers them, in their words}

### Current Workarounds
- {How they cope with the problem today}
- {Tools, hacks, manual processes}

### Emotional Moments
- [EMOTION: {type}] When discussing {topic}: {what happened}

### Contradictions
- [CONTRADICTION] Said {X} but earlier described doing {Y}

### Unexpected Findings
- {Anything you didn't anticipate hearing}

### Assumptions Affected
- CONFIRMED: {assumption} -- Evidence: {quote or behavior}
- CHALLENGED: {assumption} -- Evidence: {quote or behavior}
- NEW QUESTION: {something you now want to investigate}
```

### Quality Standards for Findings

**Each finding should be:**

1. **Specific** -- not "users are frustrated" but "P2 described spending 20 minutes every Monday morning reconciling data between Slack and their spreadsheet, calling it 'the most pointless part of my week'"

2. **Attributed** -- tied to a participant ID so you can trace it back

3. **Behavioral when possible** -- what they do matters more than what they say they'd do

4. **Contextualized** -- include the circumstances that make this finding meaningful

5. **Verbatim when quoting** -- use exact words, not paraphrases (paraphrasing introduces your bias)

### How to Handle Conflicting Findings

When participants contradict each other, capture both sides without resolving the conflict. Note the contradiction explicitly:

> **CONFLICT:** P1 says email notifications are essential for staying on top of tasks. P4 says email notifications are "pure noise" and turned them all off. Both manage teams of similar size.
>
> **Possible explanation to explore:** Different management styles? Different team cultures? Different email volumes?

Conflicting findings are not a problem -- they're a signal that your user base is not monolithic. This is valuable.

### Finding Saturation

Track whether you're still learning new things:

| Interview | New findings | Repeated findings | New themes |
|-----------|-------------|-------------------|------------|
| P1 | 8 | 0 | 5 |
| P2 | 6 | 3 | 2 |
| P3 | 4 | 5 | 1 |
| P4 | 2 | 7 | 0 |
| P5 | 1 | 8 | 0 |

When new findings approach zero and repeated findings dominate, you've likely reached saturation. This is a signal that you can move to synthesis.

If you're still hearing completely new things after 6-8 interviews, consider whether your participant criteria are too broad (you may be talking to fundamentally different user types).

## Example

**Interview: P3**

**Date:** 2026-02-15
**Duration:** 38 minutes
**Channel:** Video (Zoom)
**Participant context:** Marketing manager at 15-person agency, uses Trello + spreadsheets, evaluated Asana 3 months ago

### Key Behaviors Observed
- Checks Trello board 6-8 times per day but only updates cards twice per week
- Maintains a personal spreadsheet that mirrors the Trello board with additional columns for "real" deadlines vs. "Trello" deadlines
- Screenshots Trello board for weekly client updates instead of generating reports

### Notable Quotes
- "Trello is where work goes to look organized. My spreadsheet is where I actually manage things." -- Context: Explaining why she maintains both systems
- "I tried Asana for two weeks and it felt like I was learning a new language just to do what I already do in Excel." -- Context: When asked about her Asana evaluation
- "My team would riot if I changed tools again. We switched to Trello eight months ago and some people still complain." -- Context: When asked about barriers to switching

### Pain Points Mentioned
- Duplicate data entry between Trello and spreadsheet -- Severity: "It's annoying but I've accepted it"
- Cannot generate client-ready reports from Trello -- Severity: "This is the one that actually costs me time"
- Team members forget to update cards -- Severity: "I end up chasing people on Slack, which defeats the purpose"

### Emotional Moments
- [EMOTION: frustration] When describing the screenshot workflow for client reports: voice pitch rose, spoke faster, used the word "ridiculous" twice

### Contradictions
- [CONTRADICTION] Said "Trello works fine for us" but described 3 significant workarounds and a shadow spreadsheet system

### Assumptions Affected
- CHALLENGED: "Users find PM tools too complex" -- P3's issue was not complexity but migration cost (learning curve + team resistance)
- CONFIRMED: Spreadsheets serve needs that PM tools don't -- specifically custom reporting
- NEW QUESTION: How common are "shadow spreadsheets" alongside PM tools?

---

## Your Turn

Please capture your findings for each completed interview using the format above.

**Tip:** Do this as soon as possible after each interview. Memory fades fast. Findings captured 24 hours later are significantly less accurate than those captured within 30 minutes.

## Next Step

When you've captured findings from all interviews (or enough to see patterns), I'll load:

{project-root}/_bmad/bme/_vortex/workflows/user-interview/steps/step-06-synthesize.md
