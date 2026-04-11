# Project Scoping & Phased Development

*The MVP/Growth/Vision feature breakdown is documented in Success Criteria → Product Scope. This section adds the **strategic framing** for scoping decisions: MVP philosophy, resource requirements, and consolidated risk mitigation. Cross-references point to where specific feature/phase content lives.*

## MVP Strategy & Philosophy

**MVP Approach:** `host_framework_sync` release — a **new class of MVP** for Convoke, distinct from typical MVP philosophies:

| Typical MVP approach | What it targets | Why it doesn't fit 4.0 |
|----------------------|----------------|------------------------|
| Problem-solving MVP | Validate a user problem | Convoke already validated the user problem (3.x has live users); 4.0 solves *maintainer* problems, not new *user* problems |
| Experience MVP | Validate a user experience | User experience stays unchanged (continuity is the goal) |
| Platform MVP | Validate a distribution/growth channel | Partially fits (marketplace publication IS a new channel) but undersells |
| Revenue MVP | Validate willingness to pay | Not applicable — Convoke is open source / MIT |

**What 4.0 actually validates:** that Convoke can sustain itself as a downstream of BMAD through structured, honest, reusable release discipline. The MVP validates the **release process**, not the product.

**Chosen MVP philosophy: `host_framework_sync` as a reusable release class** (Innovation I1). The minimum thing that would make this release "validated" is:

1. The release ships with honest constraints named (S1)
2. The release class is documented as reusable (playbook artifact M13)
3. The recursive tooling test (the backlog skill must pass WS4 first) is satisfied
4. At least one non-maintainer user has validated the upgrade (M17)

These are the *load-bearing validation signals*. Everything else in the Success Criteria metrics is a correctness check, not a philosophy validation.

**Cross-reference:** MVP feature set (mandatory / deferrable / quality bar) is documented in Success Criteria → Product Scope → MVP. That enumeration is the authoritative list; not duplicated here.

## Resource Requirements

This release is resource-constrained by design. Operating Principle **OP-1 (maintainer bandwidth awareness)** is the primary constraint.

**Team size and composition:**
- **Primary author and executor:** Amalik (solo maintainer)
- **Agent-assisted drafting and design:** Winston (architecture), Amelia (dev), Bob consolidation via Amelia (sprint planning), John (PRD — this document)
- **External roles:** N=1 external validator for M17 (any non-maintainer person willing to run the upgrade and report back)
- **Total human FTE:** ~1 (Amalik himself, part-time allocation to this release)

**Skills required:**
- Node.js 18+ and Python 3.10+ proficiency for CLI tooling and scripts
- BMAD v6.3 convention knowledge (acquired during the release — Sprint 0 experiments include a pathfinder for this)
- Git workflow for repo management
- Markdown authoring for documentation
- **NOT required:** LLM prompt engineering beyond what's already in Convoke's existing skill library

**Time budget:**
- **Target:** ~4–5 focused weeks across 5 sprints
- **Hard ceiling:** If cumulative work materially exceeds expected effort, trigger workstream deferral review (OP-1 — honest principle, no automated enforcement)
- **Soft budget for architecture delivery:** N days from CA start to IR gate pass (OP-3 trip-wire M8 — enforced)

**Cross-reference:** PM2 (maintainer burnout pre-mortem) in the Executive Summary frontmatter captures the full honesty framing.

## Risk Mitigation Strategy

Risks consolidated from pre-mortem (PM1–PM5), shark tank (ST1–ST4), party round 1 (PF1–PF7), and party round 2 (PR2-1 through PR2-5). Organized by Technical / Market / Resource categories.

### Technical Risks

| Risk | Mitigation |
|------|------------|
| **No `bmad_version` field in marketplace schema** — pre-v6.3 users may install incompatible Convoke and fail at runtime | Runtime compatibility preflight check in Convoke (WS2) + file upstream issue |
| **Skill directory porting gap** — audit needed to confirm all skills comply with v6.3 `<skill-dir>/SKILL.md` convention | Automated skill-dir audit script (Technical Success WS2); surface in Sprint 1 pathfinder work |
| **User migration script idempotency failure** — script runs twice and produces different state | M4 (2x re-run test on ≥3 sandbox fixtures) + path safety analysis per Convoke memory feedback rule |
| **Agent behavioral drift not caught by PF1** — synthetic battery too narrow; live usage surfaces edge cases | PM3 honesty (pre-release battery is *necessary*, not *sufficient*); I5 drift snapshot as retrospective observation; future telemetry capability (deferred to Growth) |
| **Recursive tooling failure mid-release** — backlog skill breaks during the release that's using it | Release Process Checklist mandates backlog skill as first WS4 validation target (PF5) |

### Market Risks

| Risk | Mitigation |
|------|------------|
| **Marketplace adoption velocity disappoints** — install count stays low for 6+ months | PM1 honesty: success criteria explicitly excludes adoption velocity for 4.0; measured as 12–18 month observation |
| **Strategic bet on BMAD goes bad** — BMAD stagnates or a superior framework emerges | PM5: strategic bet documented as revalidatable hypothesis (ADR with revalidation trigger); reconsider at each major upstream release |
| **Enterprise buyers are confused by `unverified` trust tier** — ST2 finding | Honest disclosure in marketplace listing; buyer-facing positioning explicitly deferred to future release |
| **Convoke looks like a maintenance release with no user value** — existing users ask "why upgrade?" | Sophia's release announcement draft leads with "healthy enough to last" framing; CHANGELOG honesty per M16 |

### Resource Risks

| Risk | Mitigation |
|------|------------|
| **Maintainer burnout during release** (PM2) | OP-1: workstream deferral is the honest response; each workstream is independently valuable; M10 permits ≤1 deferral with ceremony |
| **WS4 scope is optimistic** — extensions inventory could double the effort (PF3) | Validate inventory size early in Sprint 1 (before WS4 full commitment); relax expected count if sweep reveals more extensions |
| **Marketplace PR approval timeline** — unknown BMAD org response speed (PF4) | M12 split into M12a (ship-blocking: PR open + validates) and M12b (aspirational: BMAD feedback); approval is not ship-blocking |
| **Architecture doc takes longer than expected** (blocks several metrics) | OP-3 trip-wire M8 — architecture budget N days from CA start to IR gate pass; overrun triggers deferral review |
| **Upstream BMAD moves to v6.3.1 or v6.4.0 mid-release** (PF4 / PR2-3) | Freeze target to v6.3.0 explicitly at release kickoff; upstream drift noted but not re-targeted mid-flight |

**Cross-cutting mitigation:** The state-of-the-art release quality commitments (decision records, risk register, versioned interface contracts, traceability, IR gate pre-dev, retrospective post-release) are themselves the primary mitigation for *release-quality* risks. PM2 honesty framing (bandwidth as constraint) is the primary mitigation for *execution* risks.

## Scope Decision Summary

**What we committed to:**
- Four workstreams (WS1/U10, WS2/P23, WS3/A8, WS4/A9) with explicit sequencing
- Three Sprint 1 pre-registered experiments (EXP1, EXP2, EXP3)
- Honesty constraints named in advance
- Behavioral equivalence validation as a shipping gate
- Recursive tooling validation as first WS4 target
- N=1 external user validation before release
- Documented playbook artifact for future reuse
- Retrospective scheduled in Sprint 0

**What we explicitly deferred (see Growth Features in Success Criteria):**
- Post-release drift monitoring
- Platform-agnostic publishing absorbing Bolder Move 3 (contingent on EXP3 — may be absorbed)
- Marketplace trust tier promotion
- Buyer-facing positioning
- Agent behavior telemetry
- Community contribution model

**What we did NOT consider and should acknowledge as blind spots:**
- Windows-native support (still out of scope)
- Internationalization of user-facing release docs (CHANGELOG, migration guide are English-only)
- Accessibility of any web-facing Convoke assets (none exist, but noted)
- Localization of agent personas (agents speak English; no multilingual support)

These are blind spots, not deferrals — we didn't weigh them in the scope discussion. Acknowledging them explicitly keeps the PRD honest about what wasn't considered.
