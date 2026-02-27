---
workflow: vortex-navigation
type: step-file
description: Navigate between Vortex streams based on current evidence and learning
author: Max (learning-decision-expert)
version: 1.5.0
---

# Vortex Navigation Workflow

This workflow helps you decide which Vortex stream to focus on next based on your current progress, evidence, and learning gaps.

## What is Vortex Navigation?

The Innovation Vortex has 7 streams that teams can move between non-linearly. Rather than following a fixed sequence, teams should navigate based on what they've learned and what gaps remain. This workflow assesses your current state and recommends where to focus next.

**The 7 Vortex Streams:**
1. **Contextualize** (Emma) - Define problem space, vision, personas
2. **Empathize** (Isla) - Understand users through research and empathy mapping
3. **Synthesize** - Combine insights into actionable patterns
4. **Hypothesize** - Generate testable hypotheses from insights
5. **Externalize** (Wade) - Test hypotheses through experiments
6. **Sensitize** - Measure impact and gather feedback
7. **Systematize** (Max) - Capture learnings and make strategic decisions

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **Current State Assessment** - Where are you now? Which streams have you completed?
2. **Evidence Inventory** - What artifacts, learning cards, and evidence exist?
3. **Gap Analysis** - What's missing? What assumptions remain untested?
4. **Stream Evaluation** - Which streams would provide the most value right now?
5. **Recommendation** - Prioritized recommendation with rationale
6. **Navigation Plan** - Concrete plan for the next stream with success criteria

## Output

**Artifact:** Navigation recommendation in `{output_folder}/vortex-navigation-{date}.md`

**Template:** Uses [vortex-navigation.template.md](vortex-navigation.template.md)

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/vortex-navigation/steps/step-01-current-state.md
