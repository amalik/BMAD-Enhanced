---
step: 5
workflow: user-discovery
title: Organize Raw Data
---

# Step 5: Organize Raw Data

You've collected research data across multiple sessions and methods. Before you can synthesize insights, you need to organize this raw material into a structure that makes patterns visible.

## Why This Matters

Raw research data -- scattered notes, recordings, survey exports, analytics screenshots -- is overwhelming and unusable in its unprocessed form. Organization is the bridge between "we did research" and "we know something." Teams that skip this step end up with anecdotes instead of insights, and recency bias instead of patterns.

## Your Task

### 1. Consolidate All Data Sources

Gather everything into one accessible location:

- Expanded field notes from contextual inquiry sessions
- Diary study entries (exported and compiled)
- Observation field notes and environment sketches
- Survey responses (raw export + summary statistics)
- Analytics findings (screenshots, charts, key metrics)
- Audio/video recordings (timestamped for reference)
- Photos and artifacts collected during fieldwork

**Naming convention:** `[method]-[participant/source]-[date]`
- Example: `contextual-P03-2026-02-15.md`
- Example: `diary-entries-compiled-2026-02-20.md`
- Example: `analytics-onboarding-funnel-2026-02-18.md`

### 2. Extract Atomic Observations

Go through each data source and pull out individual observations. Each observation should be:

- **Atomic:** One idea, one behavior, one quote per item
- **Evidence-based:** Tied to a specific source (participant code, session date, data point)
- **Descriptive:** What happened, not what you think it means (interpretation comes later)

**Format each observation as:**
```
[Source: P03, contextual inquiry, 2026-02-15]
User keeps a separate spreadsheet to track which emails she's sent because
the CRM doesn't show sent-email status on the contact list view.
```

```
[Source: Survey Q7, n=142]
68% of respondents report checking their dashboard "several times a day"
but only 12% take action based on what they see.
```

```
[Source: Analytics, Jan 2026]
Average session duration for the reporting feature is 47 seconds.
Users who export reports spend 8 minutes. Most users view but don't act.
```

**Tip:** Aim for 100-300 atomic observations for a thorough discovery. This sounds like a lot, but 8 contextual inquiry sessions alone typically produce 150+.

### 3. Affinity Mapping

Affinity mapping is the core technique for finding patterns in qualitative data. Here is how to do it rigorously:

**Step A: Spread out all observations**
- If physical: write each observation on a sticky note or index card
- If digital: use a tool like Miro, FigJam, or a simple spreadsheet

**Step B: Group silently (if working with a team)**
- Each person moves observations into clusters based on similarity
- No talking during initial grouping -- this prevents one voice dominating
- It's okay to move someone else's placement (disagreement is data)
- Aim for 10-20 clusters initially

**Step C: Name the clusters**
- Once grouping stabilizes, give each cluster a descriptive name
- The name should describe the PATTERN, not just the topic
- Bad: "Onboarding" (topic label)
- Good: "Users skip onboarding steps and return later when stuck" (pattern)
- Good: "Workarounds reveal gaps in core workflow" (insight-oriented)

**Step D: Identify super-clusters**
- Look for clusters that relate to each other
- Group related clusters into 3-7 themes
- These themes become the backbone of your synthesis

### 4. Tagging System

Apply consistent tags to every observation for cross-cutting analysis:

**Recommended tag categories:**

| Category | Example Tags |
|----------|-------------|
| Method | `contextual`, `diary`, `observation`, `survey`, `analytics` |
| Participant segment | `power-user`, `new-user`, `churned`, `enterprise`, `smb` |
| Topic | `onboarding`, `collaboration`, `reporting`, `mobile` |
| Sentiment | `frustration`, `delight`, `confusion`, `confidence` |
| Behavior type | `workaround`, `habit`, `avoidance`, `exploration` |
| Evidence strength | `observed`, `self-reported`, `quantified`, `inferred` |

**Why tags matter:** They let you ask questions like "Show me all frustration moments from enterprise users during onboarding" -- slicing the data in ways that affinity clusters alone cannot.

### 5. Quantify Where Possible

Even in qualitative research, counting matters. It helps you distinguish between "one person said this" and "this came up in every single session."

**Track frequency:**
- How many participants mentioned or exhibited each pattern?
- How many data sources support each theme?
- What is the distribution of survey responses for key questions?

**Use a simple evidence matrix:**

| Theme / Pattern | P01 | P02 | P03 | P04 | P05 | Survey | Analytics | Count |
|----------------|-----|-----|-----|-----|-----|--------|-----------|-------|
| Workaround spreadsheets | X | | X | X | X | 34% | - | 4+survey |
| Skip onboarding | X | X | X | | X | 61% | 72% bounce | 4+both |
| Mobile frustration | | X | | X | | 28% | 45% mobile | 2+both |

### 6. Note Contradictions and Outliers

Do NOT discard data that doesn't fit the emerging patterns. Contradictions and outliers are often the most valuable findings.

**Record:**
- Observations that contradict a strong pattern (might reveal a segment difference)
- Participants who behaved very differently from others (might be early adopters or edge cases)
- Survey responses that conflict with qualitative findings (might indicate social desirability bias)
- Analytics data that contradicts self-reports (what people do vs. what they say)

---

## Your Turn

Please share:
1. What data sources you have collected (list them)
2. Your initial affinity clusters (even rough groupings are useful)
3. Any patterns that are already emerging
4. Any contradictions or surprises in the data

I'll help you refine your organization and prepare for synthesis.

## Next Step

When your data is organized and initial patterns are identified, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/user-discovery/steps/step-06-synthesize.md
