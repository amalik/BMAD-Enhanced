---
step: 2
workflow: pivot-patch-persevere
title: Hypothesis Assessment
---

# Step 2: Hypothesis Assessment

Now we assess your original hypotheses against the collected evidence. Which parts of your thesis are holding up, which are crumbling, and which are still uncertain?

## Why This Matters

Your product strategy is built on a stack of hypotheses. Some are foundational (if wrong, everything falls apart). Others are adjustable (if wrong, you can change approach without changing direction). Understanding which hypotheses are confirmed, partially confirmed, or invalidated determines whether you need a pivot, patch, or persevere.

## Your Task

### 1. Map Your Hypothesis Stack

List every major hypothesis your current strategy depends on, organized by layer:

**Problem Hypotheses (foundation layer):**
- Does the problem exist?
- Is it painful enough to motivate action?
- Is it frequent enough to sustain engagement?

**Solution Hypotheses (middle layer):**
- Does our approach solve the problem?
- Is it better than current alternatives?
- Can users actually use it?

**Business Hypotheses (top layer):**
- Will people pay for this?
- Can we acquire customers cost-effectively?
- Can we retain them?
- Can we scale the business?

### 2. Assess Each Hypothesis

For every hypothesis, provide:

| Hypothesis | Status | Evidence | Confidence |
|-----------|--------|----------|------------|
| {hypothesis} | {Confirmed / Partially confirmed / Invalidated / Untested} | {key evidence} | {High / Medium / Low} |

**Assessment guidelines:**

- **Confirmed:** Multiple data points support it. You'd bet money on it.
- **Partially confirmed:** True in some conditions but not others. The hypothesis needs refinement, not rejection.
- **Invalidated:** Evidence contradicts it. Continuing to assume this is true would be ignoring data.
- **Untested:** You haven't gathered evidence yet. This is a risk, not a finding.

### 3. Identify the Critical Failure Points

Which invalidated or partially confirmed hypotheses are FOUNDATIONAL?

**The Foundation Test:** If this hypothesis is wrong, does the rest of the strategy still make sense?

- If a PROBLEM hypothesis is invalidated: you likely need a pivot (the problem you're solving isn't real or isn't painful enough)
- If a SOLUTION hypothesis is invalidated: you likely need a patch (the problem is real but your approach is wrong)
- If a BUSINESS hypothesis is invalidated: you might need a patch (adjust pricing, channels, or positioning) or a pivot (the economics don't work)

### 4. Calculate Your Hypothesis Health Score

Count your hypotheses by status:

| Status | Count | Percentage |
|--------|-------|------------|
| Confirmed | {n} | {%} |
| Partially confirmed | {n} | {%} |
| Invalidated | {n} | {%} |
| Untested | {n} | {%} |

**Interpretation guide:**
- 70%+ confirmed/partially confirmed with 0 foundational invalidations: STRONG position (persevere likely)
- Mixed results with foundational hypotheses partially confirmed: MODERATE position (patch likely)
- Foundational hypotheses invalidated: WEAK position (pivot likely)
- Many untested hypotheses: INSUFFICIENT DATA (more experiments needed before deciding)

## Example

**Hypothesis Stack:**

**Problem Layer:**
| Hypothesis | Status | Evidence | Confidence |
|-----------|--------|----------|------------|
| Remote managers spend 5+ hrs/week on status | Confirmed | Time-log study: 78% logged 5+ hours | High |
| Status meetings are the primary time-waster | Partially confirmed | #1 for distributed teams, #3 for co-located | Medium |
| This problem is getting worse (remote trend) | Confirmed | Industry data + inbound inquiries | High |

**Solution Layer:**
| Hypothesis | Status | Evidence | Confidence |
|-----------|--------|----------|------------|
| Async video replaces standups effectively | Partially confirmed | Works with champions, fails without | Medium |
| Users will adopt without training | Invalidated | Only champion-led teams sustained adoption | Medium |
| Screen-sharing adds value over text | Confirmed | Unprompted adoption + blocker discovery | Medium |

**Business Layer:**
| Hypothesis | Status | Evidence | Confidence |
|-----------|--------|----------|------------|
| Teams will pay $15-20/seat/month | Confirmed | Pricing survey with distributed teams | Medium |
| Co-located teams are also our market | Invalidated | No measurable value for co-located teams | Medium |
| We can acquire via product-led growth | Untested | No data | N/A |

**Critical Failure Points:**
- Problem layer is STRONG: the problem is real and growing
- Solution layer has a PARTIAL failure: adoption requires champions (this is patchable, not fatal)
- Business layer has a SIGNIFICANT invalidation: co-located teams are not a market (reduces TAM by ~60%, but remaining market is viable)

**Hypothesis Health Score:**

| Status | Count | Percentage |
|--------|-------|------------|
| Confirmed | 4 | 44% |
| Partially confirmed | 2 | 22% |
| Invalidated | 2 | 22% |
| Untested | 1 | 11% |

**Interpretation:** MODERATE position. No foundational invalidations. Solution needs patching (champion model). Market is narrower than assumed. Patch is the likely direction.

---

## Your Turn

Please assess your hypothesis stack using the structure above.

**Key principle:** Be brutally honest. The point of this exercise is to see reality clearly, not to justify the decision you've already made emotionally. If a beloved hypothesis is invalidated, that's the most valuable thing you can learn.

## Next Step

When you've completed the hypothesis assessment, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/pivot-patch-persevere/steps/step-03-option-analysis.md
