---
workflow: experiment-design
type: step-file
description: Design experiments targeting riskiest assumptions first — methodology, success criteria, metrics, and duration before handing off to Wade
author: Liam (hypothesis-engineer)
version: 1.6.0
---

# Experiment Design Workflow

This workflow guides you through designing the experiment that will test your riskiest assumptions — selecting methodology, defining success criteria before you see results, choosing metrics, and producing an experiment brief that Wade can execute.

## What is Experiment Design?

Experiment design is the bridge between having a hypothesis and actually testing it. A hypothesis without an experiment is just an opinion. An experiment without design is just messing around.

What's the bold version of your experiment? Most teams default to the cheapest, safest test — a survey, a landing page, a "would you use this?" question. But cheap tests produce cheap answers. This workflow forces you to design an experiment that actually tests the riskiest assumption, with pre-defined success criteria you commit to before seeing any results. No moving the goalposts.

If you can't define what would prove your hypothesis wrong, you're not ready to test it.

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **Setup & Input Validation** - Validate your hypothesis contract (HC3 artifact or equivalent input)
2. **Hypothesis Context & Experiment Targets** - Load the hypothesis, review the risk map, identify what to test
3. **Experiment Methodology & Success Criteria** - Design the experiment: methodology, metrics, success thresholds, duration
4. **Synthesize & Route** - Produce enriched HC3 with experiment parameters and route via Compass

## Output

**Artifact:** Enriched HC3 Hypothesis Contract with experiment parameters appended, saved to `{output_folder}/vortex-artifacts/hc3-experiment-design-{date}.md`

**Template:** None (enriched HC3 artifact is generated inline during Step 4)

**Schema:** Conforms to HC3 contract (`_bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md`) with additional Experiment Design section

**Consumer:** Wade (lean-experiment) uses this enriched HC3 as the experiment brief — methodology, success criteria, and metrics are ready for execution.

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/experiment-design/steps/step-01-setup.md
