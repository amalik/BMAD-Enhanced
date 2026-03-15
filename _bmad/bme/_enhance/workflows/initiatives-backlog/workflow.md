---
workflow: initiatives-backlog
type: step-file
description: Tri-modal RICE initiatives backlog management — Triage review findings, Review existing items, or Create a new backlog from scratch
author: John PM (pm.md)
version: 1.0.0
---

# Initiatives Backlog Workflow

Manage a RICE-scored initiatives backlog through three complementary modes. This workflow transforms unstructured review findings, audit outputs, and team discussions into prioritized, scored backlog items — and keeps them calibrated over time.

## Workflow Structure

**Step-file architecture:**
- Just-in-time loading (each step loads only when needed)
- Sequential enforcement within each mode
- State tracking in frontmatter (progress preserved across sessions)
- Two-gate validation in Triage mode (extraction review, then scoring review)

## Modes Overview

### [T] Triage — Ingest Review Findings
Accepts text input (review transcripts, meeting notes, audit outputs), extracts actionable findings, proposes RICE scores with two-gate validation, and appends scored items to the existing backlog.
- **Steps:** Ingest > Extract & Gate 1 > Score & Gate 2 > Update backlog
- **When to use:** After a party-mode review, code review, retrospective, or any session that produces findings

### [R] Review — Rescore Existing Items
Loads the current backlog and walks through items for rescoring. Prevents score drift by prompting reassessment of Reach, Impact, Confidence, and Effort as project context evolves.
- **Steps:** Load backlog > Walkthrough & rescore > Update backlog
- **When to use:** Periodically (monthly or after major project milestones) to keep priorities calibrated

### [C] Create — Build New Backlog
Bootstraps a new RICE-scored backlog from scratch through guided interactive gathering and scoring.
- **Steps:** Initialize > Gather initiatives > Score > Generate prioritized view
- **When to use:** Starting a new project or creating a fresh backlog for a new domain

## Output

**Artifact:** `{planning_artifacts}/initiatives-backlog.md`
**Templates:** `templates/rice-scoring-guide.md`, `templates/backlog-format-spec.md`

---

## INITIALIZATION

Load config from `{project-root}/_bmad/bme/_enhance/config.yaml`

<!-- Mode dispatch: Story 1.3 will replace this section with the T/R/C menu and dispatch logic -->
<!-- For now, this is a placeholder entry point. The mode management shell (tri-modal menu, -->
<!-- "coming soon" placeholders, exit handling, and return-to-menu after mode completion) -->
<!-- will be authored as part of Story 1.3: Mode Management Shell. -->
