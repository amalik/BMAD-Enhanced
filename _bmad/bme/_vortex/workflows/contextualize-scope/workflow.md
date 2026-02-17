---
workflow: contextualize-scope
type: step-file
description: Decide which problem space to investigate using strategic evaluation
author: Emma (contextualization-expert)
version: 1.2.0
---

# Contextualize Scope Workflow

This workflow guides you through deciding which problem space to investigate by evaluating opportunities systematically.

## What is Scope Contextualization?

Scope contextualization is the strategic decision of where to focus your investigation. You likely have multiple problems you could solve - this workflow helps you choose wisely by:

- **Identifying all opportunities** - What problems are on the table?
- **Defining evaluation criteria** - What matters most (impact, feasibility, strategic fit)?
- **Scoring systematically** - Rate each opportunity against criteria
- **Deciding with rationale** - Choose one, document why
- **De-scoping intentionally** - Say "no" to others (for now)

## Why This Matters

Choosing the wrong problem space wastes months of effort. This workflow ensures:
- You're solving a problem worth solving
- You pick the problem you can actually solve
- You don't spread resources across too many problems
- You can defend your choice with evidence

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **List Problem Opportunities** - What problems could you solve?
2. **Define Evaluation Criteria** - How will you choose?
3. **Evaluate Each Opportunity** - Score against criteria
4. **Define Scope Boundaries** - What's in? What's out?
5. **Validate Strategic Fit** - Does this align with vision/resources?
6. **Synthesize** - Create scope decision document

## Output

**Artifact:** Scope decision document in `{output_folder}/scope-decision-{scope-name}-{date}.md`

**Template:** Uses [contextualize-scope.template.md](contextualize-scope.template.md)

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/contextualize-scope/steps/step-01-list-opportunities.md
