---
workflow: assumption-mapping
type: step-file
description: Deep-dive assumption analysis across hypothesis contracts — classify by lethality and uncertainty, prioritize testing order, and surface hidden risks
author: Liam (hypothesis-engineer)
version: 1.6.0
---

# Assumption Mapping Workflow

This workflow guides you through a deep analysis of the assumptions embedded in your hypothesis contracts — surfacing hidden risks, classifying each assumption by lethality and uncertainty, and producing a prioritized testing order so you validate the right things first.

## What is Assumption Mapping?

Every hypothesis is a bet — and every bet hides assumptions. Assumption mapping is the discipline of dragging those assumptions into the open, classifying how lethal they are, and figuring out which ones to test first.

What if your riskiest assumption isn't the one you think it is? Most teams test the comfortable assumptions — the ones they can validate cheaply — and ignore the lethal ones until it's too late. This workflow forces you to confront the assumptions that could kill your hypotheses before you invest in experiments.

If you can't prove it wrong, it's not a hypothesis. And if you haven't mapped what could prove it wrong, you're not ready to test it.

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **Setup & Input Validation** - Validate your hypothesis contracts (HC3 artifact or equivalent input)
2. **Assumption Inventory & Extraction** - Extract all assumptions — stated and unstated — from every hypothesis contract
3. **Classification & Risk Mapping** - Classify by lethality × uncertainty, build the risk map, produce testing order
4. **Synthesize & Route** - Review the risk map, validate completeness, and route via Compass

## Output

**Working Document:** Enriched assumption risk map with prioritized testing order. This workflow deepens your assumption analysis — the output informs your next move (back to hypothesis refinement, forward to experiments, or to Isla for discovery).

**Template:** None (assumption risk map is produced inline during Steps 3-4)

**Consumer:** Wade (lean-experiment) consumes the testing order when assumptions are acceptable. Isla (user-discovery) investigates high-risk assumptions that need validation. Liam (hypothesis-engineering) refines hypotheses when the risk map reveals structural weaknesses.

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/assumption-mapping/steps/step-01-setup.md
