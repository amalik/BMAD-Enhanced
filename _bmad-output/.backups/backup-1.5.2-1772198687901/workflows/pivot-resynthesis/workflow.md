---
workflow: pivot-resynthesis
type: step-file
description: Re-synthesize a problem definition after failed experiments using original research plus pivot evidence
author: Mila (research-convergence-specialist)
version: 1.6.0
---

# Pivot Resynthesis Workflow

This workflow guides you through re-synthesizing a problem definition after Max's pivot decision. You'll integrate your original Isla artifacts with new evidence from failed experiments to produce a revised, evidence-backed problem statement.

## What is Pivot Resynthesis?

The experiment told us something important: the solution direction was wrong, but the problem definition is sound. Pivot resynthesis is how we respond — not by starting over, but by sharpening what we already know.

Here's what the research is telling us: your original findings still hold. What changed is the evidence landscape. Failed experiments reveal which pains and gains were real and which were assumptions. This workflow helps you revise your problem definition using both the original research and the new experiment evidence.

The key distinction: research convergence creates a problem definition from scratch. Pivot resynthesis revises an existing one. We're not starting over — we're iterating within the known problem space.

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **Setup & Input Validation** - Validate dual inputs: original HC1 empathy artifacts plus experiment evidence (HC4 or informal)
2. **Context Loading & Analysis** - Load all artifacts, establish pivot context, assess "What Still Holds?"
3. **JTBD Re-Framing** - Revise the existing JTBD based on experiment evidence (preserve what's valid, revise what's disproved)
4. **Pains & Gains Revision** - Update pains and gains: retain validated, remove invalidated, add newly revealed
5. **Synthesize & Route** - Converge into a revised HC2 problem definition and route via Compass

## Output

**Artifact:** HC2 Problem Definition markdown file in `{output_folder}/vortex-artifacts/hc2-problem-definition-{date}.md`

**Template:** None (HC2 artifact is generated inline during Step 5)

**Schema:** Conforms to HC2 contract (`_bmad/bme/_vortex/contracts/hc2-problem-definition.md`)

**Consumer:** Liam (hypothesis-engineering) uses this to ground new hypothesis generation in a revised, evidence-strengthened problem.

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/pivot-resynthesis/steps/step-01-setup.md
