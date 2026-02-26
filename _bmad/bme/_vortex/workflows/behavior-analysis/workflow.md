---
workflow: behavior-analysis
type: step-file
description: Analyze production behavior patterns against validated experiment baselines to classify variance, regression, or novel behavior
author: Noah (production-intelligence-specialist)
version: 1.6.0
---

# Behavior Analysis Workflow

This workflow guides you through analyzing production behavior patterns by comparing them to validated experiment baselines, classifying what the behavior means, and producing an HC5 behavioral signal report for Max.

## What is Behavior Analysis?

Behavior analysis is the practice of reading production behavior through experiment baselines — not as isolated user actions, but as patterns measured against what was predicted and validated.

Behavioral patterns reveal intent that surveys miss. A user segment abandoning a feature could be a regression from validated performance, normal variance within expected tolerance, or novel behavior the experiment never anticipated. The classification depends entirely on the experiment baselines: what was tested, what was confirmed, and what behavior was expected in production.

This workflow compares observed production behavior to experiment baselines, classifies each pattern into one of three categories — expected variance, regression, or novel behavior — and packages the classification as intelligence for the decision-maker. Here's what we're seeing in context: that's the deliverable. Not strategy. Not recommendations. Classified behavioral intelligence.

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **Setup & Input Validation** - Validate experiment context input (HC4 artifact or equivalent) and behavior observation
2. **Experiment Baselines & Behavior Observation** - Extract validated baselines and document the observed behavior
3. **Behavior Pattern Classification** - Classify behavior as expected variance, regression, or novel behavior
4. **Evidence Gathering & Data Quality** - Build the evidence base for each classification and assess data reliability
5. **Synthesize & Route** - Produce HC5 behavioral signal report artifact and route via Compass

## Output

**Artifact:** HC5 Behavioral Signal Report markdown file in `{output_folder}/vortex-artifacts/hc5-behavior-report-{date}.md`

**Template:** None (HC5 artifact is generated inline during Step 5)

**Schema:** Conforms to HC5 contract (`_bmad/bme/_vortex/contracts/hc5-signal-report.md`)

**Consumer:** Max (pivot-patch-persevere) uses this to make evidence-based decisions about behavioral signals in production.

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/behavior-analysis/steps/step-01-setup.md
