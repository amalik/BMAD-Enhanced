---
workflow: lean-persona
type: step-file
description: Create lean user personas focused on jobs-to-be-done and problem contexts
author: Emma (contextualization-expert)
version: 1.2.0
---

# Create Lean Persona Workflow

This workflow guides you through creating a lean user persona using Lean Startup principles.

## What is a Lean Persona?

A lean persona is a hypothesis-driven representation of your target user that focuses on jobs-to-be-done and problem contexts rather than demographics. Unlike traditional personas, lean personas:

- **Focus on behavior, not demographics** - What they're trying to do, not who they are
- **Are hypothesis-driven** - Every insight is an assumption until validated
- **Link to validation** - Each assumption has a plan to test it
- **Stay lean** - Only capture what's needed to make decisions

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **Define Job-to-be-Done** - What is the user trying to accomplish?
2. **Current Solution Analysis** - How do they solve this today? What are the pain points?
3. **Problem Contexts** - When, where, and why does this problem occur?
4. **Forces & Anxieties** - What pushes them to change? What holds them back?
5. **Success Criteria** - What would a successful solution look like?
6. **Synthesize** - Create the final lean persona artifact

## Output

**Artifact:** Lean persona markdown file in `{output_folder}/lean-persona-{persona-name}-{date}.md`

**Template:** Uses [lean-persona.template.md](lean-persona.template.md)

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/lean-persona/steps/step-01-define-job.md
