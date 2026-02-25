---
workflow: hypothesis-engineering
type: step-file
description: Engineer testable hypotheses from validated problem definitions using structured brainwriting and 4-field contracts
author: Liam (hypothesis-engineer)
version: 1.6.0
---

# Hypothesis Engineering Workflow

This workflow guides you through turning a validated problem definition into 1-3 rigorous, testable hypothesis contracts — each with explicit assumptions, expected outcomes, and a clear riskiest assumption to test first.

## What is Hypothesis Engineering?

Hypothesis engineering is the craft of turning a validated problem into testable bets. Not vague ideas. Not wishful thinking. Structured, falsifiable hypotheses with explicit assumptions you can prove wrong.

That's a safe bet — what's the bold version? Most teams skip this step and jump straight to building. They treat hypotheses as afterthoughts, not engineering artifacts. The result? They build experiments that test nothing, measure the wrong things, and learn nothing useful.

This workflow forces clarity: for each hypothesis, you'll define what you expect to happen, what behavior will change, why you believe it, and — most importantly — the single assumption that could kill the whole idea. If you can't prove it wrong, it's not a hypothesis.

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **Setup & Input Validation** - Validate your problem definition (HC2 artifact or equivalent input)
2. **Problem Context & Opportunity Mapping** - Unpack JTBD, pains, gains, and identify the hypothesis landscape
3. **Structured Brainwriting & Hypothesis Drafting** - Engineer 1-3 hypothesis contracts using the 4-field format
4. **Assumption Extraction & Risk Mapping** - Map all assumptions by lethality × uncertainty and prioritize testing order
5. **Synthesize & Route** - Produce HC3 hypothesis contract artifact and route via Compass

## Output

**Artifact:** HC3 Hypothesis Contract markdown file in `{output_folder}/vortex-artifacts/hc3-hypothesis-contract-{date}.md`

**Template:** None (HC3 artifact is generated inline during Step 5)

**Schema:** Conforms to HC3 contract (`_bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md`)

**Consumer:** Wade (lean-experiment) uses this to design experiments targeting the riskiest assumptions first.

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/hypothesis-engineering/steps/step-01-setup.md
