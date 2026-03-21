---
step: 3
workflow: accuracy-validation
title: Score Results
---

# Step 3: Score Results

Score each capability for relevance and compute accuracy per archetype.

## MANDATORY EXECUTION RULES

- Score EVERY capability — do not skip any
- Apply scoring criteria consistently across archetypes
- Be honest about borderline cases — use 0.5, not 1.0, when uncertain
- Document reasoning for any capability scored 0.0 (irrelevant)
- The user makes the final call on disputed scores

## SCORING CRITERIA

For each capability, assign a relevance score:

| Score | Label | Criteria |
|-------|-------|----------|
| **1.0** | Relevant | Would appear in a production readiness checklist for this stack, written by a domain expert. Clear, specific, and actionable. |
| **0.5** | Partially relevant | Related to the stack's concerns but either: (a) too generic to be actionable, (b) specific to a different deployment model, or (c) relevant but poorly described |
| **0.0** | Irrelevant | No meaningful relationship to this stack. Wrong technology, wrong domain, or nonsensical for the architecture. |

### Scoring Guidelines

**Score 1.0 when:**
- The capability references technology actually in the stack (e.g., "Kubernetes liveness probes" for a K8s-deployed service)
- The practice is industry-standard for this stack type (e.g., "structured logging" for any production service)
- The description explains WHY it matters for THIS stack (not a generic definition)

**Score 0.5 when:**
- The capability is correct but the description is too generic (e.g., "monitoring" without specifying what to monitor)
- The capability applies to a related but different deployment model (e.g., "ECS task health" for a K8s service)
- The capability is relevant but at a different maturity level than the stack suggests

**Score 0.0 when:**
- The capability references technology not in the stack at all
- The capability is a duplicate of another capability (higher-quality version gets the score)
- The capability is meaningless or contradictory (e.g., "serverless cold start optimization" for a bare-metal service)

## SCORING PROCESS

Present each archetype's capabilities for scoring:

```
## Scoring: Archetype [N] — [Name]

| # | Capability | Score | Reasoning |
|---|-----------|:-----:|-----------|
| 1 | [name]: [description summary] | [1.0/0.5/0.0] | [brief reasoning] |
| 2 | ... | | |

**Total capabilities:** [N]
**Sum of scores:** [X]
**Accuracy:** [X/N = Y%]
```

After scoring all archetypes, present the summary:

```
## Accuracy Validation Results

| Archetype | Capabilities | Sum | Accuracy | Pass? |
|-----------|:-----------:|:---:|:--------:|:-----:|
| [Archetype 1] | [N] | [X] | [Y%] | ✓/✗ |
| [Archetype 2] | [N] | [X] | [Y%] | ✓/✗ |
| [Archetype 3] | [N] | [X] | [Y%] | ✓/✗ |

**Overall:** [PASS / FAIL] — [lowest accuracy]% (gate: ≥70%)
```

## GATE DECISION

### If PASS (all archetypes ≥70%):

```
✅ Model accuracy validated. Atlas is ready for production use.

**Findings:**
- Strongest archetype: [name] at [X%]
- Weakest archetype: [name] at [X%]
- Common issues: [brief summary of 0.0 and 0.5 patterns]

**Recommendation:** Proceed to Epic 3 (Absence Detection).
```

### If FAIL (any archetype <70%):

```
❌ Model accuracy below threshold. Iteration required.

**Failing archetypes:**
- [name]: [X%] — [primary issue pattern]

**Iteration guidance:**
1. Review 0.0-scored capabilities — are they prompt issues or knowledge gaps?
2. Review 0.5-scored capabilities — can descriptions be improved?
3. Adjust Atlas's generation prompts (step-02-generate-capabilities.md)
4. Re-run this validation workflow

**BLOCKER:** Do not proceed to Epic 3 until ≥70% accuracy achieved across all archetypes.
```

## OUTPUT ARTIFACT

Write the validation results to `_bmad-output/gyre-artifacts/accuracy-validation-[date].md` for team reference:

```markdown
# Gyre Model Accuracy Validation — [date]

## Summary
- **Result:** [PASS/FAIL]
- **Archetypes tested:** [N]
- **Accuracy range:** [lowest%] — [highest%]
- **Gate threshold:** ≥70%

## Detailed Scores
[Full scoring tables from above]

## Methodology Notes
- [Live scan vs synthetic profiles used]
- [Web search performed vs skipped]
- [Any scoring disputes and resolutions]
```

---

## Gyre Compass

Based on what you just completed, here are your options:

| If you want to... | Consider next... | Agent | Why |
|---|---|---|---|
| Iterate model prompts | model-generation | Atlas 📐 | Improve accuracy for failing archetypes |
| Run full analysis pipeline | full-analysis | Scout 🔎 | Complete end-to-end with validated model |
| Re-detect a different stack | stack-detection | Scout 🔎 | Test against a new archetype |

> **Note:** These are recommendations. You can run any Gyre workflow at any time.
