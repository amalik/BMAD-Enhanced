---
workflow: learning-card
type: step-file
description: Capture validated learnings from experiments as structured learning cards
author: Max (learning-decision-expert)
version: 1.5.0
---

# Create Learning Card Workflow

This workflow guides you through creating a learning card -- a structured record of what was tested, what was learned, and what it means for your product.

## What is a Learning Card?

A learning card is a structured lab report for Lean Startup experiments. It captures the full lifecycle of a learning: from the experiment that generated it, through the raw data, to the validated insight and its strategic implications. Learning cards:

- **Preserve institutional knowledge** - Learnings survive team changes, pivots, and time
- **Force rigorous analysis** - Separating raw data from interpretation prevents confirmation bias
- **Create a decision trail** - Future you can trace WHY decisions were made
- **Enable compounding learning** - Each card builds on previous ones, accelerating discovery
- **Feed decision frameworks** - Learning cards are the input for pivot/patch/persevere decisions

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **Experiment Context** - What experiment was run, why, and what hypothesis was tested?
2. **Raw Results** - Capture raw data and observations without interpretation
3. **Analysis** - Analyze what the data actually says: patterns, significance, surprises
4. **Validated Learning** - Extract validated learnings: what assumptions were confirmed or invalidated?
5. **Implications** - What does this mean for the product and what decisions does it inform?
6. **Synthesize** - Create the final learning card artifact

## Output

**Artifact:** Learning card markdown file in `{output_folder}/learning-card-{experiment-name}-{date}.md`

**Template:** Uses [learning-card.template.md](learning-card.template.md)

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/learning-card/steps/step-01-experiment-context.md
