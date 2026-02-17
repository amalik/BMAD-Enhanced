---
workflow: product-vision
type: step-file
description: Define product vision and strategic alignment before building
author: Emma (contextualization-expert)
version: 1.2.0
---

# Create Product Vision Workflow

This workflow guides you through defining a clear, compelling product vision that aligns your team around the "why" before you build the "what."

## What is a Product Vision?

A product vision is a strategic statement that articulates:
- **Why this product should exist** - The problem it solves and impact it creates
- **Who it's for** - The specific users/market it serves
- **What makes it different** - The unique approach or advantage
- **Where it's headed** - The long-term direction (3-5 years)

A good product vision:
- **Inspires** - Gets people excited to build it
- **Focuses** - Helps say "no" to distractions
- **Aligns** - Ensures everyone is rowing in the same direction
- **Guides decisions** - When in doubt, does this serve the vision?

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **Define the Problem** - What problem are we solving? Why does it matter?
2. **Identify Target Market** - Who specifically are we serving?
3. **Articulate Unique Approach** - What makes our solution different/better?
4. **Envision Future State** - What does success look like in 3-5 years?
5. **Align on Principles** - What won't we compromise on?
6. **Synthesize** - Create the final product vision document

## Output

**Artifact:** Product vision document in `{output_folder}/product-vision-{product-name}-{date}.md`

**Template:** Uses [product-vision.template.md](product-vision.template.md)

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/product-vision/steps/step-01-define-problem.md
