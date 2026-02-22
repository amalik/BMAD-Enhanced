---
stepsCompleted: [step-01-init, step-02-discovery, step-03-success]
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-BMAD-Enhanced-2026-02-22.md
  - docs/agents.md
  - docs/testing.md
  - docs/development.md
  - docs/faq.md
workflowType: 'prd'
documentCounts:
  briefs: 1
  research: 0
  projectDocs: 4
classification:
  projectType: "Developer Tool + Content Platform (hybrid)"
  domain: "Product Discovery / Innovation Methodology"
  complexity: medium
  projectContext: brownfield
---

# Product Requirements Document - BMAD-Enhanced

**Author:** Amalik
**Date:** 2026-02-22

## Success Criteria

### User Success

- **Seamless handoff experience** — A user who completes a Synthesize workflow produces an artifact that Hypothesize can consume directly. No manual reshaping, no copy-paste gymnastics. The output format of each agent matches the input expectations of the next agent in the chain.
- **Synthesize convergence** — User brings multiple Isla artifacts (empathy maps, interviews, observations) and leaves with a single, actionable problem definition grounded in JTBD and Pains & Gains.
- **Hypothesize engineering** — User brings a problem definition and leaves with 1-3 investment-grade hypothesis contracts (expected outcome + target behavior + rationale + riskiest assumption) ready for Wade.
- **Sensitize intelligence** — User brings Wade's graduated experiment context and gets production signals interpreted through Vortex history — not raw dashboard numbers.
- **Compass routing clarity** — At the end of every workflow, users know exactly which agent to go to next and why. No dead ends, no confusion about "what now?"

### Business Success

- **Vortex completion** — All 7 Innovation Vortex streams have guided AI support. The framework's value proposition is whole.
- **Adoption parity (directional)** — Wave 3 agents eventually see comparable usage to Emma, Isla, Wade, and Max within their respective lifecycle stages. Tracked via npm downloads, GitHub stars, and discussions — no hard targets.
- **Framework credibility** — The complete 7-stream Vortex becomes a defensible market position. "First framework to offer AI-guided support across all 7 Innovation Vortex streams."

### Technical Success

- **Release quality gates** — All 8 gates from product brief pass before publish (agent integrity, workflow completeness, Compass integration, handoff coverage, registry consistency, test suite, install flow, user guides)
- **Runtime quality** — Agent responses stay in character and follow workflow step-file architecture. Workflows complete without dead ends or broken Compass routing. Handoff contracts produce artifacts in the declared format.
- **Artifact format consistency** — Each agent's output artifact matches the schema expected by downstream agents. Synthesize outputs what Hypothesize expects. Hypothesize outputs the 4-field contract Wade expects. Wade's graduation context matches what Sensitize expects.
- **Backward compatibility** — Existing Emma, Isla, Wade, Max workflows continue to function identically. Compass updates add routes without breaking existing ones.

### Measurable Outcomes

| Outcome | Measurement | Target |
|---------|-------------|--------|
| All 7 agents installed and functional | `bmad-doctor` validation | Pass |
| All 9 handoff contracts have Compass triggers | Contract-to-trigger audit | 9/9 |
| All existing tests pass + new coverage | `npm test` | Zero failures |
| Install flow end-to-end | Installer E2E test | Pass |
| Agent output → downstream input compatibility | Manual handoff walkthrough per contract | 9/9 seamless |
| Existing agent workflows unaffected | Regression test | Zero regressions |

## Product Scope

### MVP - Minimum Viable Product

**v1.6.0 ships the complete Vortex. No phasing, no cuts.**

**3 New Agents (Full Scope):**
- **Mila** (Synthesize) — 2-3 workflows: JTBD convergence, Pains & Gains, problem definition output
- **Liam** (Hypothesize) — 2-3 workflows: Structured ideation, 4-field hypothesis contract output
- **Noah** (Sensitize) — 2-3 workflows: Signal interpretation, experiment-aware monitoring, growth optimization

**All 9 Handoff Contracts** — Implemented as Compass triggers with declared input/output formats

**Existing Agent Updates** — Isla, Wade, Max gain new Compass routes to Wave 3 agents

**Infrastructure** — Registry expanded to 7 agents, validator updated, manifest generation, Party Mode integration

**User Guides** — MILA-USER-GUIDE.md, LIAM-USER-GUIDE.md, NOAH-USER-GUIDE.md

### Growth Features (Post-MVP)

- Workflow template variations (quick synthesis, deep ideation, lightweight monitoring)
- Cross-agent orchestration ("full Vortex run" chaining all 7 agents)
- Additional ideation techniques for Liam (SCAMPER, worst-possible-idea)
- Deeper signal interpretation patterns for Noah
- P0 test suites for all Wave 3 agents (formal agent-level testing)

### Vision (Future)

v1.6.0 completes the Vortex. The next major horizon is a new framework that stands beside Vortex — not a completion nor an extension. The next framework could have nothing to do with product management. The Vortex becomes a stable base — minor updates only (workflow refinements, Compass routing improvements from user feedback).
