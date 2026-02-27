---
workflow: empathy-map
type: step-file
description: Create user empathy maps through structured 6-step process
author: Isla (discovery-empathy-expert)
version: 1.5.0
---

# Create Empathy Map Workflow

This workflow guides you through creating a comprehensive empathy map for a target user.

## What is an Empathy Map?

An empathy map is a collaborative visualization used to articulate what we know about a particular type of user. It externalizes knowledge about users to create a shared understanding and aid decision-making.

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **Define Target User** - Who are we creating this empathy map for?
2. **Says & Thinks** - What do they say aloud? What do they think?
3. **Does & Feels** - What actions do they take? What emotions do they feel?
4. **Pain Points** - What frustrates, blocks, or challenges them?
5. **Gains** - What do they want to achieve? What are their needs?
6. **Synthesize** - Create the final empathy map artifact

## Output

**Artifact:** Empathy map markdown file in `{output_folder}/empathy-map-{user-name}-{date}.md`

**Template:** Uses [empathy-map.template.md](empathy-map.template.md)

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/empathy-map/steps/step-01-define-user.md
