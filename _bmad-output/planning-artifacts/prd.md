---
stepsCompleted: [step-01-init, step-02-discovery, step-03-success, step-04-journeys, step-05-domain, step-06-innovation, step-07-project-type]
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

## User Journeys

### Journey 1: Mila — Converging Divergent Research

**Persona:** Kara, a product manager at a B2B SaaS company. She's been working with Isla for two weeks — three empathy maps, two interview syntheses, and an observation report. She has a pile of rich user insights but no single problem definition.

**Opening Scene:** Kara opens her IDE and looks at `_bmad-output/vortex-artifacts/`. Five files from Isla. Each tells a different story. She knows there's a pattern, but she can't articulate a single problem statement from all this divergence. She invokes Mila.

**Rising Action:** Mila asks for Isla's artifacts as input — this is non-negotiable. Kara points to the files. Mila guides her through Jobs-to-be-Done framing: "What job is the user hiring your product to do?" Then Pains & Gains analysis across all artifacts. Kara starts seeing the convergence — three interviews pointed at the same underlying frustration, but from different angles.

**Climax:** Mila produces a single problem definition that synthesizes all five artifacts. Kara reads it and realizes she couldn't have written this from any one artifact alone — it required the synthesis of all of them.

**Resolution:** The Vortex Compass offers routing: "Take this to Liam for hypothesis engineering, or back to Isla if you want to validate a specific assumption before proceeding." Kara chooses Liam.

---

### Journey 2: Liam — Engineering Testable Hypotheses

**Persona:** Marcus, a solo founder building a productivity tool. He's been working with Emma to frame the problem space and just finished a Synthesize session with Mila. He has a crisp problem definition but no idea what solution to test first. He invokes Liam directly.

**Opening Scene:** Marcus has "users waste 40 minutes daily context-switching between project tools" as his converged problem. He knows the problem. He doesn't know the solution. He says "let's try gamification" — a vague intuition, not a testable hypothesis.

**Rising Action:** Liam runs a structured brainwriting session — not facilitating a room, but generating and challenging ideas alongside Marcus as a creative peer. They explore five directions. Liam pushes: "What's the expected outcome? What behavior would change? Why do you believe this? And most importantly — what's the riskiest assumption that, if wrong, kills this idea?"

**Climax:** Marcus has three hypothesis contracts, each with four fields. The riskiest assumptions are different for each. He can see exactly which one to test first — the one where the assumption is most uncertain and most lethal.

**Resolution:** Compass routes to Wade with the hypothesis contract. But during ideation, Liam flagged an unvalidated user assumption ("users actually want fewer tools, not better integration"). Compass also offers routing back to Isla: "Before proceeding to Wade, consider validating this assumption with a quick user interview."

---

### Journey 3: Noah — Vortex-Aware Production Intelligence

**Persona:** Priya, a head of product at a startup that launched three months ago. Wade validated their onboarding flow through an experiment (success criteria: 60% completion within 7 days). It hit 72% during the experiment. Now in production, it's trending at 54% and dropping. Dashboard shows the number. Nobody remembers the experiment context.

**Opening Scene:** Priya sees the drop on her analytics dashboard but doesn't know if it's normal variance or a regression. She invokes Noah with Wade's original experiment context (results, success criteria, metrics, confirmed hypotheses).

**Rising Action:** Noah inherits the experiment lineage. It connects "54% onboarding completion" to "Wade's experiment #3: validated at 72% with success threshold 60%." Noah interprets: "This metric is 25% below its validated performance. The experiment confirmed that simplified onboarding drives completion. Production conditions differ — larger user base, less handholding, different demographics."

**Climax:** Noah produces a signal for Max in strict format: **Signal** (onboarding completion 54%, down from validated 72%) + **Context** (experiment #3, simplified flow, success threshold 60%) + **Trend** (declining 3% week-over-week for 4 weeks). No strategic recommendation — Max decides.

**Resolution:** Compass routes to Max with interpreted intelligence. But Noah also detected unexpected behavior: users are completing onboarding but immediately abandoning the core feature. Compass offers routing to Isla: "Unexpected user behavior detected — consider discovery research on post-onboarding drop-off."

---

### Journey 4: Non-Linear Vortex Entry — Starting with Max

**Persona:** Diego, a CPO who just joined a company with an existing product. He has no Vortex history — no experiments, no empathy maps, no problem definitions. But he has production data and intuition that something's wrong. He invokes Max directly.

**Opening Scene:** Diego doesn't follow a sequence. He starts at Systematize because that's where his evidence is — production metrics and customer churn data. Max's Vortex Navigation workflow analyzes his evidence gaps.

**Rising Action:** Max identifies: "You have production signals but no experiment history to contextualize them (Sensitize gap), no hypothesis contracts to trace back to (Hypothesize gap), and no converged problem definition (Synthesize gap). Your strongest evidence is in production behavior, but it's ungrounded."

**Climax:** Max routes Diego not to the "first" agent but to the agent that fills his most critical gap. In this case: "Your production signals suggest user behavior diverges from assumptions — start with Isla to build empathy for what's actually happening, then bring findings to Mila for convergence."

**Resolution:** Diego enters the Vortex at the point his evidence gaps are widest. There is no "step 1." The Vortex meets him where he is.

---

### Journey 5: Backflow — Pivot Routing to Mila (Not Emma)

**Persona:** Kara again, three months later. Her team ran Wade's experiments based on Liam's hypotheses. Max's Pivot/Patch/Persevere analysis says: **Pivot**. The solution direction is wrong, but the problem definition is right — users do waste 40 minutes on context-switching, just not in the way the team assumed.

**Opening Scene:** Max delivers the pivot decision. The old Vortex (4 agents) would have routed Kara back to Emma to reframe the entire problem space. But this isn't a new problem space — it's a reframe within a known one.

**Rising Action:** Max routes to Mila, not Emma. Mila takes Isla's original artifacts plus the new evidence from Wade's failed experiments. She re-synthesizes: the JTBD is the same, but the pains and gains need revision based on what the experiments revealed.

**Climax:** Mila produces an updated problem definition that incorporates the pivot evidence. Kara doesn't start over — she iterates within the known space.

**Resolution:** Back to Liam for new hypotheses grounded in the revised definition. The Vortex loops, not restarts.

---

### Journey 6: Module Developer — Building on the Framework

**Persona:** Alex, a developer who wants to create a custom agent for their company's specific domain (e.g., a compliance-focused agent for fintech). They have BMAD-Enhanced installed and want to extend it.

**Opening Scene:** Alex reads the development guide (`docs/development.md`). They see the agent architecture pattern: clone an existing agent, customize the persona, create workflow step files, register in manifest.

**Rising Action:** Alex clones Mila's agent definition as a template. They customize the persona for compliance expertise, create 2 workflows (regulatory scan, compliance checklist), and add step files following the established pattern. They register the agent in the manifest CSV.

**Climax:** `npx bmad-install-agents` picks up their custom agent. Party Mode includes it. The Compass routing in their custom workflows references existing Vortex agents where relevant.

**Resolution:** Alex's compliance agent works alongside the 7 Vortex agents. The framework is extensible without forking.

---

### Journey 7: Team Lead — Reviewing Vortex Artifacts

**Persona:** Samira, VP of Product. Her team of 3 PMs each use different Vortex agents. She doesn't use the agents directly — she reviews the artifacts they produce and makes portfolio decisions.

**Opening Scene:** Samira opens `_bmad-output/vortex-artifacts/` and sees structured artifacts from across the Vortex: problem definitions from Mila, hypothesis contracts from Liam, experiment results from Wade, production signals from Noah, and decision records from Max.

**Rising Action:** The artifacts are self-documenting — each references its input source and downstream destination. Samira can trace a hypothesis contract back to the problem definition it came from, and forward to the experiment that tested it.

**Resolution:** Samira doesn't need to use the agents. The artifact chain tells the story. She reviews, challenges, and approves at the artifact level.

---

### Journey Requirements Summary

| Journey | Key Capabilities Revealed |
|---------|--------------------------|
| Mila (Convergence) | Artifact input validation, JTBD facilitation, Pains & Gains analysis, single-definition output format |
| Liam (Hypothesis) | Brainwriting/ideation as creative peer, 4-field contract output, assumption flagging, Isla backflow routing |
| Noah (Intelligence) | Experiment context inheritance, signal-context-trend formatting, anomaly detection, Isla backflow for unexpected behavior |
| Non-linear entry | Vortex Navigation gap analysis, evidence-based routing to any agent, no assumed sequence |
| Backflow (Pivot) | Max→Mila routing, re-synthesis with new evidence, iteration within known space |
| Module developer | Agent cloning pattern, manifest registration, workflow step-file creation, framework extensibility |
| Team lead | Self-documenting artifacts, traceability chain (input→output→downstream), portfolio-level review |

## Developer Tool + Content Platform Requirements

### Project-Type Overview

BMAD-Enhanced is a hybrid: an npm-distributed developer tool (infrastructure layer) and a content platform (agent/workflow layer). Wave 3 is overwhelmingly a content platform expansion — 3 new agents, 6-9 workflows, 30+ step files, user guides — with targeted infrastructure updates (registry, validator, manifest, migration).

### Installation & Distribution

- **Package manager:** npm (unchanged) — `npx bmad-install-agents` installs all 7 agents
- **Node.js compatibility:** Node 18/20/22 (existing CI matrix, unchanged)
- **No new runtime dependencies** — Wave 3 adds content files (.md, .yaml), not code dependencies
- **Backward-compatible install** — Existing v1.5.x users upgrading to v1.6.0 get all 7 agents through the existing migration system

### Agent Content Architecture

Each Wave 3 agent follows the established pattern from Emma, Isla, Wade, Max:

| Component | Convention | Wave 3 Deliverables |
|-----------|-----------|-------------------|
| Agent definition | `_bmad/bme/_vortex/agents/{role-name}.md` | 3 new agent files (names TBD — role titles must be finalized before implementation) |
| Workflows | `_bmad/bme/_vortex/workflows/{workflow-name}/` | 6-9 new workflow directories |
| Step files | `workflows/{name}/steps/step-{nn}-{name}.md` | 30+ step files |
| Templates | `workflows/{name}/template/` | Output templates per workflow |
| User guide | `_bmad-output/vortex-artifacts/{NAME}-USER-GUIDE.md` | MILA, LIAM, NOAH guides |
| Example artifacts | Committed to repo in `_bmad-output/vortex-artifacts/` | Sample outputs per agent (repo-only, not installed) |

**File Naming Decision Required:** The agent file names derive from role titles. The product brief declares: "Research Convergence Specialist" (Mila), "Hypothesis Engineer" (Liam), "Vortex-Aware Production Intelligence" (Noah). These must be finalized into file names (e.g., `research-convergence-specialist.md`, `hypothesis-engineer.md`, `production-intelligence-specialist.md`) before implementation begins.

### Example Artifacts

Each Wave 3 agent ships with example artifacts committed to the repo (not installed by `npx bmad-install-agents`):

- **Mila:** Sample converged problem definition (showing JTBD + Pains & Gains output format)
- **Liam:** Sample 4-field hypothesis contract (showing expected outcome + behavior change + rationale + riskiest assumption)
- **Noah:** Sample signal report (showing signal + context + trend format linked to experiment history)

These serve as format references — downstream agents (and users) can see exactly what to expect from each handoff.

### Infrastructure Updates

| Component | Current State | Wave 3 Change |
|-----------|--------------|---------------|
| `agent-registry.js` | 4 agents with persona data | Expand to 7 agents |
| `validator.js` | Validates 4 agents, 13 workflows | Validate 7 agents, 19-22 workflows |
| `install-vortex-agents.js` | Installs 4 agents, generates manifest | Install 7 agents |
| `bmad-doctor` | Checks 4 agents | Check 7 agents |
| `config.yaml` | Lists 4 agents, 13 workflows | List 7 agents, 19-22 workflows |
| Manifest CSV | 4 agent rows | 7 agent rows |
| `config-merger.js` | `mergeConfig` seeds 4 agents; `CONFIG_SCHEMA` validates 4 agents | `mergeConfig` seeds 7 agents for fresh installs; schema accepts 7 agents |
| `migrations/registry.js` | Migrations up to v1.5.0 | New v1.6.0 migration entry |

### Migration Path (v1.5.x → v1.6.0)

A new migration registry entry is required:

1. **Delta logic:** Add 3 new agents to config's `agents` array; add 6-9 new workflows to config's `workflows` array
2. **Refresh:** `refreshInstallation()` copies new agent files, workflow directories, and user guides
3. **Validation:** `validateInstallation()` confirms all 7 agents, expanded workflow count, manifest integrity
4. **Fresh install defaults:** `mergeConfig` updated to seed all 7 agents and their workflows for new installs

The migration must handle the case where users have customized their config — new agents and workflows are appended, existing entries preserved.

### Content Testing Requirements

Beyond infrastructure tests, Wave 3 requires content validation:

| Test Type | What It Validates | Automation |
|-----------|------------------|------------|
| **Workflow structure** | Every step file has valid frontmatter (name, description, nextStepFile) | `bmad-doctor` or validator |
| **Compass routing completeness** | Every workflow's final step includes Compass routing referencing all declared handoff contracts for that agent | Grep-based validation |
| **Template presence** | Every workflow directory has a template subdirectory with at least one output template | File presence check |
| **Cross-reference validation** | All agents referenced in Compass routing exist in the registry | Registry cross-check |
| **Handoff format consistency** | Output templates match the input expectations declared in handoff contracts | Manual review + format schema check |

### Documentation Updates

| Document | Update Needed |
|----------|--------------|
| `docs/agents.md` | Add Mila, Liam, Noah sections with workflows, positioning, and when-to-use |
| `docs/faq.md` | Update "What's coming in Wave 3?" to reflect shipped state |
| `docs/development.md` | Update project structure (7 agents, expanded workflow count) |
| `docs/testing.md` | Update test counts and coverage after Wave 3 tests added |
| `CHANGELOG.md` | Add v1.6.0 entry |
| `README.md` | Update agent count and Vortex diagram |

### Implementation Considerations

- **No new npm dependencies** — Content-only expansion
- **Registry-driven** — All new agents registered in `agent-registry.js` as single source of truth (per v1.5.2 architecture)
- **Migration-tested** — v1.6.0 migration entry must be covered by integration tests (upgrade path from v1.5.x)
- **Config backward compatibility** — Existing 4-agent configs must be gracefully migrated, not rejected by validation
