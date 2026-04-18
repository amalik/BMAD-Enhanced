---
title: "Product Brief: Initiative Lifecycle Engine (ILE-1)"
initiative: convoke
artifact_type: brief
qualifier: initiative-lifecycle-engine
status: complete
created: '2026-04-18'
updated: '2026-04-18'
schema_version: 1
inputs:
  - convoke-note-initiative-lifecycle-backlog.md (ILE-1 appendix)
  - convoke-note-capability-evaluation-framework.md
  - convoke-vision-ecosystem.md
  - Party mode session 2026-04-12 (John, Winston, Amalik)
  - PMI/MSP/SAFe LPM best practices research (user-provided)
  - SPM state-of-the-art research (user-provided)
  - Competitive landscape analysis (web research)
---

# Product Brief: Initiative Lifecycle Engine

## Executive Summary

Consulting team leads and solo practitioners managing concurrent initiatives face a constant cognitive tax: lateral switching between topics and vertical switching between strategic and operational altitude. Every context switch costs reconstruction time. Every altitude change risks losing either the big picture or the operational detail.

The Initiative Lifecycle Engine (ILE-1) is **Portfolio-as-Code** — an IDE-native navigation system for initiative management. It shows you where you stand on the map, what the expected routes are, and what move to make next — without leaving the conversation where your work happens. Three existing Convoke skills (initiatives-backlog, portfolio-status, migrate-artifacts) are reworked into views on a shared data model, enhanced with a kanban view and pipeline dashboard, and connected by a reactive behaviors layer that automates transitions and surfaces staleness.

This is **Portfolio-as-Code**. The system IS the AI agent conversation. Lifecycle state lives in git-native markdown with structured frontmatter — portable, diffable, version-controlled. Zero per-seat licensing, zero migration risk, zero data residency concerns. For regulated consulting (finance, health), no cloud dependency is a compliance advantage, not a limitation. The first Portfolio-as-Code capability, grounded in PMI, MSP, and SAFe LPM best practices, delivered through agent conversations and markdown contracts.

## The Problem

A consulting team lead runs 3–8 concurrent initiatives across engagements. Each initiative is at a different lifecycle stage — some are ideas in intake, some have PRDs, some are mid-sprint. Today, keeping track means:

- **Scrolling a flat backlog** that mixes point fixes with strategic initiatives, bugs with multi-quarter programs. No lanes, no stages, no signal about what's ready to execute vs. what needs planning.
- **Mentally reconstructing context** every time they switch topics. "Where was P9? Did we finish the architecture? What's blocking it?" The answer requires reading files, checking git log, scanning sprint status — 5+ minutes of archaeology per initiative.
- **Switching altitude constantly.** A portfolio health question ("are we overcommitted?") requires a completely different view than an operational question ("what's the next story in this epic?"). Today those views don't exist — the team lead holds the map in their head.
- **Missing connections.** A finding from a code review should become an intake. A shipped epic should unblock dependent initiatives. A created PRD should advance pipeline stage. None of this happens automatically — it's all manual triage and manual updates.

The cost: cognitive load compounds across initiatives. Decision quality degrades. Things fall through cracks not because they're hard but because nobody noticed they were waiting.

## The Solution

ILE-1 integrates three existing Convoke skills into a unified lifecycle management capability:

**Shared data model.** A single source of truth (the lifecycle backlog) that all three skills read from and write to. Every initiative has a lane (Bug / Fast / Initiative), a pipeline stage (Qualified → In Pipeline → Ready → In Sprint → Done), a portfolio attachment, RICE scores, dependency links, and an artifacts presence indicator.

**Write surface (initiatives-backlog v2.0.0).** Already reworked: Triage mode ingests findings → logs as intakes → runs the qualifying gate (lane + portfolio + RICE). Review mode rescores across lanes. Create mode bootstraps new lifecycle backlogs.

**Read surface (portfolio-status, reworked).** Lifecycle-aware dashboard: pipeline completeness across initiatives, kanban view with WIP limits by stage, health signals, context re-entry hints. Replaces the current governance-only attribution viewer.

**Reactive behaviors layer.** Automated transitions that remove manual triage overhead:
- New initiative logged → orphan intake scan suggests attachment
- Artifact created (PRD, Architecture, etc.) → pipeline stage auto-advances
- Sprint closes → staleness detector flags items with broken references or outdated scores
- Epic completed → absorbed items closed, dependent items unblocked

## What Makes This Different

**Portfolio-as-Code.** The lifecycle engine lives where the work happens — inside Claude Code (or any LLM coding agent). No tab switching, no altitude tax, no separate login. Context re-entry is a conversation, not a dashboard. If your team uses Infrastructure-as-Code, Portfolio-as-Code is the same pattern applied to how you manage work.

**Reactive behaviors are the moat.** Anyone can render a kanban in markdown. The novel mechanism is a feedback loop where artifact presence drives pipeline state: creating a PRD auto-advances stage, completing an epic unblocks dependents, sprint closure triggers staleness detection. The views are the visible layer; the automation underneath is what makes the system feel alive.

**Agent-native semantics.** RICE scores, qualifying gates, lane routing, and pipeline stages are machine-readable contracts that agents enforce — not UI fields humans fill in and forget. The process IS the tooling.

**Git-native state, zero lock-in.** Everything is markdown with structured frontmatter in a git repo. Portable across platforms. Diffable in PRs. Version-controlled with full history. Zero per-seat licensing. Zero migration risk. For regulated sectors, no cloud dependency is a compliance advantage.

**Standards-grounded.** The lifecycle model draws from PMI (Standard for Portfolio Management), MSP 5th Edition, and SAFe Lean Portfolio Management — not invented from scratch. Portfolio Kanban, RICE/WSJF prioritization, benefits-oriented thinking, adaptive governance — all informed by established best practices.

**Category-defining.** No existing tool offers Portfolio-as-Code. Linear, Notion, and Jira add AI to traditional databases. ILE-1 inverts the model: the AI agent IS the management system.

## Who This Serves

**Co-primary: the consulting team lead.** Manages 3–8 concurrent initiatives across client engagements. Needs to see portfolio health, qualify incoming work, track pipeline completeness, and re-enter any initiative's context in under a minute. Uses BMAD + Convoke as the team's operating system. Adjacent use: onboarding a new team member mid-engagement — the lifecycle view becomes a structured orientation tool ("show me everything in flight, where each stands, and what to touch first").

**Co-primary: the solo practitioner managing many concurrent initiatives.** Open source maintainer with 5+ active repos. Indie founder juggling product, marketing, and infrastructure initiatives. Internal platform team lead running parallel workstreams. Larger absolute population than consulting leads, same lifecycle discipline need, less governance overhead. Drives adoption volume; consulting team leads drive depth and validation.

**Tertiary use: client-facing transparency.** The same pipeline/kanban views can be shared with clients as status artifacts (exported markdown or rendered HTML). Turns an internal management tool into a client-trust differentiator with zero additional effort.

## Success Criteria

1. **Context re-entry under 60 seconds.** A team lead can re-enter any initiative — understand its stage, what's done, what's next, what's blocking — in under a minute, without leaving their current conversation.
2. **Portfolio health without altitude change.** Portfolio-level visibility (WIP, pipeline completeness, health signals) is available in the same environment where operational work happens. No separate tool, no tab switch.
3. **Findings auto-land in the right place.** New findings from code reviews, retrospectives, or party mode sessions flow through the qualifying gate and arrive in the correct lane with RICE scores — without manual triage overhead.

## Scope

**In v1:**
- Shared data model underpinning all three skills (markdown-as-source vs. structured backing store is an Architecture-phase decision — not a Brief-phase commitment)
- Portfolio-status rework: lifecycle-aware with stages, lanes, WIP signals, pipeline completeness
- Kanban view: columns = lifecycle stages, WIP limits, sortable by portfolio
- Reactive behaviors: intake orphan scan, artifact→stage auto-advance, staleness detection on sprint close
- Pipeline completeness dashboard: which artifacts exist per initiative, what's missing
- Integration between initiatives-backlog, portfolio-status, and migrate-artifacts

**Explicitly NOT in v1:**
- Benefits realization management (BRM lifecycle tracking)
- OKRs / strategy-execution linkage
- WSJF replacing RICE (evaluate after v1 adoption data)
- ESG / sustainability as portfolio criteria
- Multi-user dashboards or real-time collaboration
- Steering committee / governance board formalization
- Flow metrics computation (dependent on stage transition timestamps accumulating)

## Vision

If ILE-1 succeeds, it becomes the **first IDE-native Strategic Portfolio Management platform** — the operational backbone for any team using AI coding agents to manage complex work.

**Near-term (v2):** Benefits realization tracking (Identify → Analyze → Deliver → Sustain). OKR linkage to initiatives. Flow metrics computed from stage transitions. WSJF as an alternative prioritization model alongside RICE.

**Medium-term (v3):** Adaptive governance with rolling reforecasting and scenario planning. Stakeholder engagement as a managed theme. Cross-portfolio dependency visualization. Value stream funding models (Lean Portfolio Management).

**Long-term north star:** Autonomous portfolio management within human-set guardrails — AI agents continuously rebalancing investment across initiatives based on flow metrics, benefits signals, and strategic alignment. The portfolio manages itself; humans set the strategy and review the outcomes.

The reference standards guiding this evolution: PMI Standard for Portfolio Management (4th Ed), MSP 5th Edition, SAFe Lean Portfolio Management, ISO 21504:2022, and PMI's forthcoming Standard for AI in Portfolio, Program, and Project Management.
