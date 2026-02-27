---
workflow: mvp
type: step-file
description: Design Minimum Viable Product specifications using Build-Measure-Learn
author: Wade (lean-experiments-specialist)
version: 1.2.0
---

# Design MVP Workflow

This workflow guides you through designing a Minimum Viable Product that tests your riskiest assumptions.

## What is an MVP?

An MVP is NOT a feature-light product. It's the smallest thing that tests your riskiest assumption and enables validated learning.

## Steps Overview

1. **Identify Riskiest Assumption** - What could kill this idea?
2. **Define Success Criteria** - How will you know if it worked?
3. **Design Smallest Test** - What's the minimum to test the assumption?
4. **Scope MVP Features** - What's absolutely necessary?
5. **Plan Build-Measure-Learn** - How will you learn?
6. **Synthesize** - Create MVP specification document

## Output

**Artifact:** MVP spec in `{output_folder}/mvp-spec-{mvp-name}-{date}.md`

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/mvp/steps/step-01-riskiest-assumption.md
