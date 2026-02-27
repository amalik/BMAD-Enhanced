---
step: 1
workflow: pivot-patch-persevere
title: Evidence Review
---

# Step 1: Evidence Review

Before making a strategic decision, we need all the evidence on the table. This step gathers and organizes every relevant data point so the decision is grounded in reality, not opinion.

## Why This Matters

The most common failure in strategic decisions is incomplete evidence. Teams pivot based on one bad experiment while ignoring three positive signals. Teams persevere based on enthusiasm while ignoring warning signs. A complete evidence review prevents both traps.

## Your Task

### 1. List All Relevant Learning Cards

Gather every learning card related to this decision area:

For each learning card, capture:
- **Card name and date**
- **Core learning (one sentence)**
- **Confidence rating** (High / Medium / Low / Exploratory)
- **Outcome** (Validated / Invalidated / Partially validated / Inconclusive)

### 2. List Additional Evidence

Beyond formal learning cards, what other evidence is relevant?

**Customer signals:**
- Support tickets or complaints
- Feature requests
- Churn reasons
- NPS or satisfaction scores
- Usage analytics

**Market signals:**
- Competitor moves
- Industry trends
- Regulatory changes
- Technology shifts

**Internal signals:**
- Team morale and confidence
- Technical debt or feasibility concerns
- Resource constraints
- Opportunity costs (what else could you be doing?)

### 3. Organize by Signal Direction

Sort ALL evidence into three buckets:

**Evidence supporting current direction (STAY signals):**
- List each piece of evidence
- Rate its strength (Strong / Moderate / Weak)

**Evidence against current direction (CHANGE signals):**
- List each piece of evidence
- Rate its strength (Strong / Moderate / Weak)

**Ambiguous evidence (UNCLEAR signals):**
- List each piece of evidence
- Note why it's ambiguous

### 4. Identify Evidence Gaps

What DON'T you know that would matter for this decision?

- What experiments haven't you run yet?
- What user segments haven't you tested?
- What market conditions haven't you validated?
- How would you rate your overall evidence completeness? (Comprehensive / Adequate / Gaps exist / Insufficient)

## Example

**Learning Cards:**

| Card | Core Learning | Confidence | Outcome |
|------|--------------|------------|---------|
| LC-001: Async Adoption | Champions drive adoption; fails without them | Medium | Partially validated |
| LC-002: Remote Manager Pain | Status tracking is top time-waster for remote managers | High | Validated |
| LC-003: Pricing Survey | $15-20/seat/month acceptable for teams with 3+ timezones | Medium | Validated |
| LC-004: Co-located Test | Co-located teams see minimal value in async status | Medium | Invalidated (our original assumption) |

**Additional Evidence:**
- Customer signals: 12 inbound inquiries from distributed teams in past month; 0 from co-located teams
- Market: Competitor X launched an async standup tool last month targeting enterprise (validates market, increases urgency)
- Internal: Engineering team is excited about the video feature but concerned about scaling video processing costs

**Signal Direction:**

STAY signals (support current direction):
- Remote manager pain is validated (STRONG)
- Willingness to pay confirmed for distributed teams (MODERATE)
- Inbound interest from target segment (MODERATE)

CHANGE signals (against current direction):
- Adoption requires champions -- can we reliably create them? (MODERATE)
- Co-located teams don't see value -- market is smaller than assumed (STRONG)
- Competitor launched -- differentiation window may be closing (MODERATE)

UNCLEAR signals:
- Long-term retention unknown (only 2-week experiments)
- Video processing costs at scale untested (engineering concern)

**Evidence Gaps:**
- No data on teams larger than 8 people
- No data on non-engineering teams
- No retention data beyond 2 weeks
- Overall completeness: GAPS EXIST -- adequate for directional decision but not for major resource commitment

---

## Your Turn

Please compile your evidence using the structure above. Be thorough -- it's better to include weak evidence and label it as weak than to omit it and make a decision with blind spots.

**Important:** Resist the temptation to pre-judge the evidence. Just collect and organize it here. Analysis comes in the next steps.

## Next Step

When you've completed the evidence review, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/pivot-patch-persevere/steps/step-02-hypothesis-assessment.md
