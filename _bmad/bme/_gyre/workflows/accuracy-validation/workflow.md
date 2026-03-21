---
name: accuracy-validation
agent: model-curator
title: Model Accuracy Validation
description: Pre-pilot validation of model accuracy against synthetic ground truth repos — NFR19 ≥70% gate
steps: 3
---

# Accuracy Validation Workflow

Validates that Atlas can generate capabilities manifests that are ≥70% relevant across diverse stack archetypes. This is the **go/no-go gate** for the entire Gyre product (NFR19).

## Purpose

Model generation is the critical path for Gyre. If Atlas produces irrelevant capabilities, Lens will flag false positives and Coach will waste the user's time reviewing noise. This workflow provides a repeatable methodology to measure and iterate model quality.

## Scoring Methodology

Each generated capability is scored:

| Score | Meaning | Criteria |
|-------|---------|----------|
| 1.0 | **Relevant** | Capability is appropriate for this stack archetype and would appear in a production readiness checklist written by an expert |
| 0.5 | **Partially relevant** | Capability is tangentially related but not specific to this stack, OR is relevant but poorly described |
| 0.0 | **Irrelevant** | Capability has no meaningful relationship to this stack archetype |

**Accuracy formula:** `accuracy = sum_of_scores / total_capabilities`

## Gate Criteria

- Run against ≥3 stack archetypes (different language/framework/deployment combos)
- ≥70% accuracy across ALL archetypes (not averaged)
- If any archetype scores <70%, iterate Atlas prompts before proceeding to Epic 3

## Instructions

Load the first step to begin:

```
Load step: {project-root}/_bmad/bme/_gyre/workflows/accuracy-validation/steps/step-01-select-repos.md
```
