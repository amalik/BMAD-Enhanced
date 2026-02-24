---
workflow: research-convergence
type: step-file
description: Synthesize divergent research into a single JTBD-grounded problem definition
author: Mila (research-convergence-specialist)
version: 1.6.0
---

# Research Convergence Workflow

This workflow guides you through synthesizing divergent research findings into a single, actionable problem definition grounded in Jobs-to-be-Done framing and Pains & Gains analysis.

## What is Research Convergence?

Research convergence is the process of taking multiple streams of research — empathy maps, interview syntheses, observation reports — and distilling them into one clear problem statement. Instead of scattered insights, you get a single, evidence-backed definition of what problem to solve and why it matters.

Here's what the research is telling us: divergent findings are not a sign of confusion. They're the raw material for a strong problem definition. This workflow helps you connect the dots.

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **Setup & Input Validation** - Validate and list your input artifacts (HC1 empathy artifacts or other research)
2. **Context Loading & Analysis** - Load artifacts and identify themes, patterns, and contradictions
3. **Jobs-to-be-Done Framing** - Frame the core job using JTBD structure: When [situation], I want to [motivation], so I can [outcome]
4. **Pains & Gains Analysis** - Map pains and gains grounded in artifact evidence
5. **Synthesize & Route** - Converge into a single HC2 problem definition and route via Compass

## Output

**Artifact:** HC2 Problem Definition markdown file in `{output_folder}/vortex-artifacts/hc2-problem-definition-{date}.md`

**Template:** None (HC2 artifact is generated inline during Step 5)

**Schema:** Conforms to HC2 contract (`_bmad/bme/_vortex/contracts/hc2-problem-definition.md`)

**Consumer:** Liam (hypothesis-engineering) uses this to ground hypothesis generation in a validated problem.

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/research-convergence/steps/step-01-setup.md
