---
workflow: pattern-mapping
type: step-file
description: Map cross-source patterns across research artifacts to identify convergent themes before full synthesis
author: Mila (research-convergence-specialist)
version: 1.6.0
---

# Pattern Mapping Workflow

This workflow guides you through mapping cross-source patterns across multiple research artifacts to identify convergent themes, contradictions, and evidence gaps — before committing to a full problem definition.

## What is Pattern Mapping?

Pattern mapping is the reconnaissance before convergence. Where research-convergence produces a full HC2 problem definition (commitment), pattern mapping identifies cross-cutting patterns and themes across your research artifacts (reconnaissance). It answers: "What are the artifacts collectively telling us?" without yet committing to a formal problem statement.

Here's what the research is telling us: you don't always need to jump straight to problem definition. Sometimes the most valuable step is laying your research side by side and seeing what patterns emerge. That's what this workflow does.

**When Pattern Mapping Helps:**
- You have 2+ artifacts but haven't synthesized them yet — you want to see what's there before committing
- You suspect convergence but want to map patterns before investing in a full problem definition
- You want to validate that research streams agree before running research-convergence
- You're identifying gaps that need more Isla research before synthesis is worthwhile

Once patterns are clear, run **research-convergence** to produce the full HC2 problem definition.

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **Setup & Input Validation** — Validate your input artifacts (HC1 empathy artifacts or any well-formed research)
2. **Context Loading & Analysis** — Load artifacts and analyze what each one individually reveals
3. **Pattern Identification** — Identify cross-artifact patterns: recurring themes, convergent behaviors, contradictions, evidence gaps
4. **Theme Clustering** — Group related patterns into coherent themes with confidence levels
5. **Synthesize & Route** — Produce a pattern analysis output and route via Compass

## Output

**Artifact:** Pattern analysis markdown file in `{output_folder}/vortex-artifacts/pattern-analysis-{date}.md`

**Template:** None

**Schema:** This is a working document — NOT an HC2 problem definition. No handoff contract applies. The output can feed into research-convergence for full synthesis or stand alone as a pattern analysis reference.

**Consumers:** Mila (research-convergence), Liam (hypothesis-engineering), Isla (user-discovery) — depending on Compass routing.

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/pattern-mapping/steps/step-01-setup.md
