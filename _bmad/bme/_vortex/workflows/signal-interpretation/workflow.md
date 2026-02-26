---
workflow: signal-interpretation
type: step-file
description: Interpret production signals through experiment lineage and Vortex history to produce contextualized intelligence reports
author: Noah (production-intelligence-specialist)
version: 1.6.0
---

# Signal Interpretation Workflow

This workflow guides you through interpreting a production signal by connecting it to its originating experiment context, analyzing trends, detecting anomalies, and producing an HC5 signal report for Max.

## What is Signal Interpretation?

Signal interpretation is the practice of reading production data through contextual lenses — not as isolated numbers on a dashboard, but as signals connected to the experiments that shaped them.

Raw metrics mean nothing without interpretation frames. A 15% drop in engagement could be catastrophic or expected, depending on what experiment produced the current state, what hypothesis was tested, and what production behavior was predicted. The signal indicates one thing when viewed in isolation and something entirely different when viewed through experiment lineage.

This workflow connects each production signal to its originating experiment, analyzes the trend in context, surfaces anomalies that dashboards hide, and packages everything as intelligence for the decision-maker — without prescribing what to do about it. Here's what we're seeing in context: that's the deliverable. Not strategy. Not recommendations. Contextualized intelligence.

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **Setup & Input Validation** - Validate experiment context input (HC4 artifact or equivalent)
2. **Experiment Context & Signal Connection** - Load experiment lineage and connect it to the production signal
3. **Signal Description & Trend Analysis** - Describe the signal factually and analyze its trajectory against baselines
4. **Anomaly Detection & Data Quality** - Surface unexpected behavior patterns and assess data reliability
5. **Synthesize & Route** - Produce HC5 signal report artifact and route via Compass

## Output

**Artifact:** HC5 Signal Report markdown file in `{output_folder}/vortex-artifacts/hc5-signal-report-{date}.md`

**Template:** None (HC5 artifact is generated inline during Step 5)

**Schema:** Conforms to HC5 contract (`_bmad/bme/_vortex/contracts/hc5-signal-report.md`)

**Consumer:** Max (learning-card) uses this to make evidence-based decisions grounded in production reality.

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/signal-interpretation/steps/step-01-setup.md
