---
step: 3
workflow: learning-card
title: Analysis
---

# Step 3: Analysis

Now we analyze the raw results. What does the data actually say? This is where we look for patterns, assess significance, and separate signal from noise.

## Why This Matters

Raw data doesn't speak for itself. Analysis transforms data into insight by:
- Distinguishing between statistically meaningful results and random variation
- Identifying patterns across different segments and metrics
- Spotting contradictions between quantitative and qualitative data
- Assessing whether results are strong enough to act on

## Your Task

Work through these analysis lenses systematically:

### 1. Success Criteria Assessment

For each pre-defined success criterion, assess the result:

**Use this framework:**
- **CLEAR PASS:** Met or exceeded the threshold with margin
- **MARGINAL PASS:** Met the threshold but barely -- could go either way with more data
- **MARGINAL FAIL:** Close to threshold but didn't reach it -- worth investigating why
- **CLEAR FAIL:** Clearly did not meet the threshold
- **INCONCLUSIVE:** Not enough data or too many confounding factors to judge

For each: explain WHY you're assigning that rating.

### 2. Pattern Analysis

Look for patterns in the data:

**Segment Differences:**
- Did different user segments behave differently?
- Was there a "best case" group vs. a "worst case" group?
- What distinguishes users who succeeded from those who didn't?

**Time-based Patterns:**
- Did behavior change over the experiment duration?
- Was there a learning curve? A novelty effect? A drop-off?
- At what point did behavior stabilize (or didn't it)?

**Correlation Patterns:**
- Do any metrics correlate with each other?
- Does high engagement in one area predict success in another?
- Are there leading indicators of success or failure?

### 3. Qualitative-Quantitative Alignment

Compare what people SAID with what they DID:

- Do the numbers match the quotes?
- Are there contradictions? (e.g., "I loved it" but usage dropped)
- Which should you trust more in this context -- the quantitative or qualitative data?

### 4. Statistical Rigor Check

Be honest about confidence levels:

- **Sample size:** Was it large enough to draw conclusions? (Rule of thumb: for surveys, 30+ responses; for A/B tests, use a significance calculator; for interviews, 5-8 per segment for qualitative patterns)
- **Confidence level:** If quantitative, what's the statistical significance? (p-value, confidence interval)
- **Effect size:** Even if statistically significant, is the effect large enough to matter practically?
- **Replication:** Would you expect the same results if you ran this again?

### 5. Alternative Explanations

For each finding, consider: is there another explanation?

**Common alternative explanations:**
- **Selection bias:** Did you only test with people predisposed to succeed?
- **Novelty effect:** Did they engage because it was new, not because it was better?
- **Hawthorne effect:** Did observation itself change behavior?
- **Regression to the mean:** Were your baseline measurements unusually high/low?
- **Confounding variables:** Was something else changing at the same time?

## Example

**Success Criteria Assessment:**

| Criterion | Result | Rating | Reasoning |
|-----------|--------|--------|-----------|
| 80%+ daily participation | 73% overall | MARGINAL FAIL | 7 points short, but Team A hit 91%. Suggests it's achievable with right conditions, not universally. |
| Alignment score 3.8+ | 3.2 -> 3.9 | MARGINAL PASS | Only met in Week 2. Learning curve effect likely. Need longer experiment to know if this holds. |
| Video under 3 min | 2:14 avg | CLEAR PASS | Well under threshold with no outliers above 4 min. |
| Manager time -30% | -45%, -20%, +10% | INCONCLUSIVE | Too small a sample (n=3) and too varied. Manager C's increase may be due to monitoring the new process. |

**Pattern Analysis:**
- Clear segment difference: Cross-timezone teams benefited most (Team A: +91% participation, highest alignment improvement). Co-located teams saw least benefit (Team C: 62% participation).
- Time pattern: Week 1 participation was 80%, Week 2 dropped to 67%. Novelty effect likely.
- Correlation: Teams with a "recording champion" (someone who recorded every day) had 25% higher overall participation.

**Qualitative-Quantitative Alignment:**
- CONTRADICTION: Team B members said they "liked" async updates in the mid-point survey, but their participation dropped from 78% (Week 1) to 58% (Week 2). Words didn't match behavior.
- ALIGNMENT: Manager A's quote about discovering blockers matched the quantitative finding that screen-sharing revealed issues faster.

**Statistical Rigor:**
- Sample: n=19 across 3 teams is too small for quantitative conclusions. Treat all findings as directional signals, not proof.
- Confidence: Cannot calculate meaningful p-values with this sample size.
- Effect size: Alignment score improvement (0.7 points on 5-point scale) is practically meaningful IF it holds.

**Alternative Explanations:**
- Volunteer bias is the biggest threat: teams who already hated standups were predisposed to prefer any alternative
- Novelty effect likely contributed to Week 1's higher participation
- Manager monitoring likely boosted participation (Hawthorne effect)

---

## Your Turn

Please analyze your raw results using the lenses above. Be rigorous and honest -- a learning card that says "inconclusive" is more valuable than one that pretends certainty.

**Key principle:** It's better to learn that you can't conclude anything than to draw false conclusions. Uncertainty is data too.

## Next Step

When you've completed the analysis, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/learning-card/steps/step-04-validated-learning.md
