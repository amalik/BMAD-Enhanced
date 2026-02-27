---
workflow: production-monitoring
type: step-file
description: Monitor production signals across multiple active experiments simultaneously to prioritize divergence and produce portfolio-level intelligence reports
author: Noah (production-intelligence-specialist)
version: 1.6.0
---

# Production Monitoring Workflow

This workflow guides you through monitoring production signals across multiple active experiments simultaneously, prioritizing signals by divergence from validated baselines, and producing an HC5 portfolio signal report for Max.

## What is Production Monitoring?

Production monitoring is the practice of watching multiple graduated experiments in production at once — reading the portfolio of signals through their experiment baselines to identify which experiments need attention and which are performing as expected.

Signal + context + trend applies to every experiment in the portfolio. A single experiment's signal tells you about that experiment. Multiple experiments' signals tell you about the portfolio — which bets are paying off, which are degrading, and which are revealing behavior the experiments didn't anticipate. Anomaly detection surfaces what dashboards hide, but at portfolio scale, it also surfaces cross-experiment patterns that single-signal analysis misses.

This workflow assembles the experiment portfolio, monitors each experiment's production signals against its baselines, prioritizes by divergence severity, and packages the portfolio intelligence for the decision-maker. Here's what we're seeing in context across the portfolio: that's the deliverable. Not strategy. Not recommendations. Prioritized portfolio intelligence.

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **Setup & Multi-Experiment Input Validation** - Validate multiple experiment context inputs (HC4 artifacts or equivalent)
2. **Portfolio Assembly & Baseline Mapping** - Assemble the experiment portfolio and extract validated baselines per experiment
3. **Signal Monitoring & Divergence Assessment** - Monitor production signals for each experiment and assess divergence from baselines
4. **Signal Prioritization & Anomaly Flagging** - Prioritize signals by divergence severity and flag anomalies for routing
5. **Synthesize & Route** - Produce HC5 portfolio signal report artifact and route via Compass

## Output

**Artifact:** HC5 Portfolio Signal Report markdown file in `{output_folder}/vortex-artifacts/hc5-portfolio-report-{date}.md`

**Template:** None (HC5 artifact is generated inline during Step 5)

**Schema:** Conforms to HC5 contract (`_bmad/bme/_vortex/contracts/hc5-signal-report.md`)

**Consumer:** Max (learning-card) uses this to make portfolio-level decisions about which experiments need attention.

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/production-monitoring/steps/step-01-setup.md
