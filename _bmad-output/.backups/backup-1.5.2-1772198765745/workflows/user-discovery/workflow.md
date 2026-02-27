---
workflow: user-discovery
type: step-file
description: Plan and execute user discovery research to understand users, contexts, and needs
author: Isla (discovery-empathy-expert)
version: 1.5.0
---

# User Discovery Research Workflow

This workflow guides you through planning and executing broader discovery research to understand your users, their contexts, and their unmet needs. Unlike a single empathy map session, user discovery spans multiple research methods and produces a comprehensive synthesis of what you learn.

## What is User Discovery?

User discovery is the practice of systematically learning about the people you aim to serve before committing to solutions. It goes beyond interviews to include contextual inquiry, observation, diary studies, surveys, and analytics review. The goal is to build deep, evidence-based understanding of user behaviors, motivations, and environments so that every product decision is grounded in reality.

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement (must complete step N before step N+1)
- State tracking in frontmatter (progress preserved)

## Steps Overview

1. **Define Discovery Scope** - What do we need to learn and why? Formulate research questions.
2. **Choose Research Methods** - Select appropriate methods (contextual inquiry, diary studies, ethnographic observation, surveys, analytics review).
3. **Plan Research Activities** - Timeline, participants, logistics, and ethical considerations.
4. **Execute Research** - Guidance for conducting fieldwork (observation techniques, note-taking, staying open).
5. **Organize Raw Data** - Affinity mapping, tagging, and categorization of research data.
6. **Synthesize Discovery Findings** - Distill key themes, insights, and opportunity areas into an actionable artifact.

## Output

**Artifact:** User discovery report in `{output_folder}/user-discovery-{topic}-{date}.md`

**Template:** Uses [user-discovery.template.md](user-discovery.template.md)

---

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_vortex/config.yaml

Load step: {project-root}/_bmad/bme/_vortex/workflows/user-discovery/steps/step-01-discovery-scope.md
