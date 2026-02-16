---
workflow: wireframe
type: step-file
description: Create wireframes through structured 6-step process
author: Wade (wireframe-designer)
---

# Create Wireframe Workflow

This workflow guides you through creating comprehensive wireframes for web or mobile applications.

## What is a Wireframe?

A wireframe is a low-fidelity visual representation of a user interface. It defines the structure, layout, and functionality of screens without focusing on visual design details like colors or fonts. Wireframes answer: Where am I? What can I do? Where can I go?

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **Define Requirements** - What screen, platform, user, functionality?
2. **User Flows** - How do users navigate? Entry → Goal → Exit
3. **Information Architecture** - How is content organized and prioritized?
4. **Wireframe Sketch** - Create layout using ASCII art and grids
5. **Components & Interactions** - Specify UI components, states, behaviors
6. **Synthesize** - Create the final wireframe artifact

## Output

**Artifact:** Wireframe markdown file in `{output_folder}/wireframe-{screen-name}-{date}.md`

**Template:** Uses [wireframe.template.md](wireframe.template.md)

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_designos/config.yaml

Load step: {project-root}/_bmad/bme/_designos/workflows/wireframe/steps/step-01-define-requirements.md
