---
workflow: pivot-patch-persevere
type: step-file
description: Make strategic pivot, patch, or persevere decisions based on experiment evidence
author: Max (learning-decision-expert)
version: 1.5.0
---

# Pivot / Patch / Persevere Decision Workflow

This workflow guides you through making a rigorous strategic decision after experiments: should you change direction (Pivot), adjust your approach (Patch), or stay the course (Persevere)?

## What is Pivot / Patch / Persevere?

Based on Eric Ries' Lean Startup methodology, this is a structured decision framework for what to do after experiments. Instead of relying on gut feelings or sunk-cost reasoning, you systematically evaluate evidence and make a defensible choice:

- **Pivot** - Fundamentally change direction. Your core hypothesis is wrong, and incremental adjustments won't fix it. You need a different approach, market, value proposition, or business model.
- **Patch** - Adjust your approach while keeping the core direction. The hypothesis is partially right but your execution, targeting, or specific solution needs modification.
- **Persevere** - Stay the course. Evidence supports your direction, and you should double down with more resources, broader experiments, or next-stage development.

**Why these three, not just "pivot or persevere"?** Most real decisions aren't binary. The most common outcome is "we're directionally right but need to adjust." Patch captures this middle ground and prevents both premature pivots (throwing away good ideas) and false perseverance (refusing to adapt).

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **Evidence Review** - Gather all relevant learning cards, experiment results, and evidence
2. **Hypothesis Assessment** - Assess original hypotheses: confirmed, partially confirmed, or invalidated?
3. **Option Analysis** - Analyze all three options with pros, cons, and risks
4. **Stakeholder Input** - Capture team perspectives, concerns, and preferences
5. **Decision** - Make and document the decision with clear rationale
6. **Action Plan** - Create a concrete action plan for the chosen direction

## Output

**Artifact:** Decision record in `{output_folder}/ppp-decision-{topic}-{date}.md`

**Template:** Uses [pivot-patch-persevere.template.md](pivot-patch-persevere.template.md)

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/pivot-patch-persevere/steps/step-01-evidence-review.md
