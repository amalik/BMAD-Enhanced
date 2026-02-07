# Architecture Decision Record: BMAD-Enhanced Integration Approach

**Status:** ✅ ACCEPTED
**Date:** 2026-02-05
**Decision Makers:** BMAD-Enhanced Core Team
**Supersedes:** N/A (Initial architectural decision)

---

## Context

BMAD-Enhanced integrates 4 powerful frameworks (BMAD Method, Quint FPF, DesignOS, AgentOS) into a unified platform with complete cross-framework traceability. The core architectural question was:

**"How should we technically integrate these 4 frameworks?"**

Each framework has different technical foundations:
- **BMAD Method:** Markdown-based workflows, YAML frontmatter, file-based state management (41 workflows, 22 agents)
- **Quint FPF:** SQLite database, Go implementation, FSM for ADI cycle (12 slash commands, 7,728 LOC)
- **DesignOS:** Planned (design specs, DDRs, Figma integration)
- **AgentOS:** Planned (quality gates, orchestration)

---

## Decision

**We will adopt Option 2: BMAD-First Architecture**

### Core Strategy

- **Foundation:** BMAD Method's proven markdown-based workflow engine
- **Phase 0 Focus:** Pure markdown orchestration (DesignOS + AgentOS) - 1,800 LOC
- **Quint Integration:** Deferred to Phase 2 - 500 LOC sync adapter connecting Quint's SQLite to markdown artifacts
- **DesignOS/AgentOS:** Native markdown modules following BMAD workflow patterns (Capabilities + Steps)
- **Synchronization:** BMAD Markdown as master → Quint SQLite cache (~200ms latency, validated in Phase 2)
- **Orchestration:** Capabilities + Steps pattern with convention-based discovery
- **LLM-Agnostic:** Core uses "capabilities" (portable), Claude integration exposes as "skills" (slash commands)

### Framework Integration Pattern (Refined 2026-02-05)

**Design Constraint:** All agents use BMAD Method architecture. Quint/DesignOS/AgentOS are capability providers.

**LLM-Agnostic Architecture:** Core capabilities work with any LLM or tool. Claude integration provides optimal UX via slash commands.

**File Structure:**
```
_bmad-enhanced/
├── _quint/
│   ├── capabilities/           # LLM-agnostic workflows
│   │   ├── hypothesize.md      # Core capability
│   │   └── validate.md         # Core capability
│   └── steps/                  # Implementation details
│       └── hypothesize-step-01.md
├── _designos/
│   ├── capabilities/
│   │   ├── empathy-map.md      # Core capability
│   │   └── journey-map.md      # Core capability
│   └── steps/
│       └── empathy-map-step-01.md
├── _agentos/
│   ├── capabilities/
│   │   └── quality-gate.md     # Core capability
│   └── steps/
│       └── quality-gate-step-01.md
└── .integrations/              # LLM-specific adapters
    ├── claude/                 # Claude Code integration
    │   └── skills/             # Slash commands
    │       ├── quint-hypothesize.md     # /quint-hypothesize → loads capability
    │       └── designos-empathy-map.md  # /designos-empathy-map → loads capability
    └── api/                    # REST API (non-LLM access)
        └── endpoints.ts
```

**How It Works:**
1. **Claude Users:** Type `/quint-hypothesize` → Claude loads capability → Executes workflow
2. **Other LLMs:** Directly load capability file from `_quint/capabilities/hypothesize.md`
3. **Non-LLM Tools:** Call REST API endpoint: `POST /api/quint/hypothesize`
4. Capabilities load framework steps: `load {quint}/steps/step-01.md`
5. Steps execute framework logic (Quint: sync to SQLite, DesignOS: generate markdown)
6. Results return to BMAD workflow

**State Management:** BMAD Markdown is source of truth, Quint SQLite is performance cache for FPF queries

**Portability:** Core architecture is LLM-agnostic. Claude integration is one adapter among many (Cursor, Copilot, API, CLI future options).

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│           BMAD-Enhanced Platform (BMAD-First)               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  BMAD Workflow Engine (Core)                │
│                  • Markdown + YAML frontmatter              │
│                  • Git version control                      │
│                  • Step-file architecture                   │
│                  • File-based state management              │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────────┐    ┌──────────────┐
│ BMAD Method  │    │  Quint Module    │    │  DesignOS    │
│  (Native)    │    │  (Sync Adapter)  │    │  (Planned)   │
│              │    │                  │    │              │
│ 41 workflows │◄───┤ Bidirectional    │    │ Native MD    │
│ 22 agents    │    │ Sync Adapter     │    │ Workflows    │
│ Markdown     │    │ 2,700 LOC        │    │              │
└──────────────┘    │                  │    └──────────────┘
                    │ SQLite ↔ MD      │
                    │ ~200ms sync      │    ┌──────────────┐
                    │ Real-time        │    │  AgentOS     │
                    └──────────────────┘    │  (Planned)   │
                              │             │              │
                              ▼             │ Native MD    │
                    ┌──────────────────┐    │ Workflows    │
                    │  Quint SQLite DB │    │              │
                    │  (quint.db)      │    └──────────────┘
                    │                  │
                    │ • holons table   │
                    │ • evidence table │
                    │ • relations      │
                    │ • waivers        │
                    │ • fpf_state      │
                    └──────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              BaseArtifact Contract v2.0.0                   │
│  • Shared schema across all 4 frameworks                    │
│  • Namespace isolation (bmm_data, quint_data, etc.)         │
│  • Cross-framework traceability                             │
└─────────────────────────────────────────────────────────────┘
```

### Phase 0 Pivot: Agent Enhancement Approach (2026-02-07)

**Critical Discovery:** Deep-dive analysis revealed DesignOS and AgentOS are NOT markdown workflow systems:
- **DesignOS:** TypeScript web application with browser UI (not markdown)
- **AgentOS:** Shell-based CLI tool for standards management (not markdown)
- **Cannot integrate by adding `_designos/` and `_agentos/` markdown directories as originally planned**

**Revised Decision:** Pivot from custom orchestration engine to agent enhancement approach.

**Rationale:**
- **Reality Check:** Original assumption that DesignOS/AgentOS use markdown workflows was incorrect
- **BMAD Overlap:** BMAD already provides 80%+ of DesignOS/AgentOS functionality via existing agents (CIS Design Thinking, TEA Test Architect)
- **Proven Infrastructure:** BMAD agent system has 21 agents in production with established patterns
- **Complexity Reduction:** Agent enhancement = 500 LOC vs custom orchestration = 1,800 LOC (72% reduction)
- **Immediate Value:** Working agents Week 1-2 vs backend-only POC
- **Lower Risk:** Leverages proven agent architecture vs building new orchestration engine

**Phase 0 POC (Weeks 1-3):** Agent Enhancement
- **Scope:** Create 4 new BMAD agents inspired by DesignOS/AgentOS capabilities
- **LOC Estimate:** ~500 LOC
  - **Week 1:** DesignOS-inspired agents (200 LOC)
    - `empathy-mapper.md` - User empathy mapping workflows (100 LOC)
    - `wireframe-designer.md` - Rapid wireframe generation (100 LOC)
  - **Week 2:** AgentOS-inspired agents (200 LOC)
    - `quality-gatekeeper.md` - Quality gate decision workflows (100 LOC)
    - `standards-auditor.md` - Code standards compliance checking (100 LOC)
  - **Week 3:** Integration & Testing (100 LOC)
    - Cross-agent workflow orchestration (50 LOC)
    - Party mode integration (25 LOC)
    - Agent registration (CSV entries - trivial)
    - Integration tests (25 LOC)
- **Deliverables:**
  - 4 working agents with slash commands (`/bmad-agent-designos-empathy-mapper`, etc.)
  - Cross-agent workflow example
  - Party mode integration
  - Documentation
  - Decision checkpoint: Proceed to Phase 1 or enhance agent capabilities

**Phase 2 (Weeks 8-9):** Quint SQLite Sync Adapter (UNCHANGED)
- **Scope:** Add Quint sync adapter (deferred from Phase 0)
- **LOC Estimate:** +500 LOC
  - Markdown → SQLite writer: 200 LOC
  - SQLite → Markdown reader: 150 LOC
  - Conflict resolution: 50 LOC
  - Retry logic: 100 LOC
- **Validation:** Measure sync latency (target: <200ms), test concurrent writes
- **Decision Gate:** If sync latency >500ms or conflicts unresolvable, re-evaluate architecture

**Total LOC (Phase 0 + Phase 2):** ~1,000 LOC (vs original 2,300 LOC estimate)

**Why This Reduces Risk:**
1. **Proven Foundation:** BMAD agent system already works (21 agents in production)
2. **No Custom Engine:** Avoids building/debugging new orchestration infrastructure
3. **Immediate Validation:** Working agents Week 1 prove integration approach
4. **Realistic Timeline:** 500 LOC in 3 weeks is conservative vs 1,800 LOC ambitious
5. **Clear Failure Modes:** Agent failure = enhance existing agents; Quint adapter failure = re-evaluate Phase 2

**What Changed:**
- ❌ Dropped: Capabilities + Steps pattern (hypothetical, doesn't match any framework)
- ❌ Dropped: Convention-based discovery (BMAD uses explicit registration)
- ❌ Dropped: Custom orchestration engine (1,800 LOC)
- ✅ Added: BMAD agent pattern (proven, 500 LOC)
- ✅ Added: Explicit agent registration (agent-manifest.csv)
- ✅ Added: Leverages existing workflow architectures (step-files, YAML+instructions)
- ⏸️ Deferred: Real DesignOS/AgentOS integration to Phase 6 (post-v1.0.0) if desired

---

## Options Considered

### Option 1: Quint-First Architecture

**Approach:** Convert BMAD Method, DesignOS, and AgentOS to adopt Quint's SQLite-based standards.

**Score:** 5.15/10

**Pros:**
- ✅ Single database (SQLite) - simpler queries
- ✅ ACID transactions
- ✅ Mature Quint FPF methodology preserved

**Cons:**
- ❌ Massive conversion effort (25-38 weeks)
- ❌ Loses BMAD's 41 workflows and 22 named agent personalities
- ❌ Poor Git collaboration (SQLite binary format)
- ❌ No markdown benefits (readability, diffs, PRs)
- ❌ 15,000-20,000 LOC of conversion code

**Verdict:** Rejected due to high conversion effort and loss of BMAD's key differentiators.

---

### Option 2: BMAD-First Architecture (SELECTED ✅)

**Approach:** Keep BMAD's markdown core, add bidirectional sync adapter for Quint's SQLite.

**Score:** 8.55/10

**Pros:**
- ✅ 100% code reuse (both systems production-tested)
- ✅ Fastest time-to-value (POC Week 3, launch Week 16)
- ✅ Preserves BMAD's 41 workflows and agent personalities
- ✅ Git-friendly (markdown diffs, code review, collaboration)
- ✅ Lowest risk (proven systems, phased rollout)
- ✅ Best effort/benefit ratio (2,700 LOC adapter vs 15K LOC conversion)
- ✅ Can migrate to Greenfield later if scale demands

**Cons:**
- ⚠️ Dual storage (markdown + SQLite for Quint)
- ⚠️ Sync latency (~200ms, acceptable)
- ⚠️ 2,700 LOC adapter complexity

**Verdict:** Selected as optimal balance of pragmatism, risk, and value delivery.

---

### Option 3: Greenfield Architecture

**Approach:** Rebuild from scratch with optimal architecture (PostgreSQL, Temporal.io, NATS, polyglot stack).

**Score:** 7.85/10

**Pros:**
- ✅ Optimal architecture (zero technical debt)
- ✅ Production-grade scalability (PostgreSQL, NATS)
- ✅ Advanced features (Temporal workflows, event sourcing)
- ✅ Horizontal scaling ready

**Cons:**
- ❌ 52,000 LOC to write (vs 2,700 LOC adapter)
- ❌ 48-64 weeks estimated (vs 16 weeks BMAD-First)
- ❌ 5-8 engineers required (vs 2-3)
- ❌ High timeline risk (+78% variance)
- ❌ All-or-nothing (no value until Week 20+)
- ❌ Over-engineering for current needs (<10K artifacts projected)
- ❌ Operational complexity (4 services vs 1 dashboard)

**Verdict:** Rejected as over-engineering. Can migrate to Greenfield later if scale demands (triggers: >10K artifacts, >20 team members, >500ms query latency).

---

## Decision Rationale

### Why BMAD-First Wins

**1. Time-to-Value (8/10 advantage)**
- POC at Week 3 vs Week 12 (Quint-First) vs Week 20 (Greenfield)
- Full launch at Week 16 vs Week 24 vs Week 48+
- Phased rollout: value delivery at Weeks 3, 8, 14, 22

**2. Risk Mitigation (9/10 advantage)**
- 100% code reuse (both BMAD and Quint production-tested)
- Timeline variance: +17% (vs +25% Quint-First, +78% Greenfield)
- Failure modes well-understood (no surprises)

**3. Effort Efficiency (10/10 advantage)**
- 2,700 LOC adapter (vs 15K LOC conversion, 52K LOC greenfield)
- 2-3 engineers (vs 2-3 for Quint-First, 5-8 for Greenfield)
- 16-21 weeks (vs 25-38 weeks, 28-36 weeks estimated)

**4. Preserves Core Value (10/10 advantage)**
- Keeps BMAD's 41 workflows and 22 agent personalities intact
- Maintains Quint's FPF methodology and SQLite performance
- Git collaboration benefits (markdown diffs, PRs, code review)

**5. Future-Proof (7/10 advantage)**
- Can migrate to Greenfield later with data-driven decision
- Adapter provides working reference for migration
- Scale triggers clearly defined (>10K artifacts, >20 engineers)

---

## Consequences

### Positive Consequences

1. **Rapid Value Delivery**
   - POC demonstrable at Week 3
   - Alpha release at Week 10
   - Full v1.0.0 launch at Week 16

2. **Low Risk**
   - Both codebases production-tested
   - Phased rollout with decision points
   - Can pause/pivot at any phase

3. **Team Efficiency**
   - 2-3 engineers sufficient
   - No specialized skills required (Temporal, NATS, etc.)
   - Familiar tools (TypeScript, Git, markdown)

4. **User Experience**
   - Git workflows developers already know
   - Markdown readability (human-friendly artifacts)
   - Code review integration (GitHub/GitLab PRs)

5. **Operational Simplicity**
   - Single dashboard ($50-100/month vs $650-1750 Greenfield)
   - Standard Node.js deployment
   - No multi-service orchestration

### Negative Consequences

1. **Dual Storage Complexity**
   - Quint data exists in both SQLite and markdown
   - Sync adapter adds 2,700 LOC maintenance burden
   - Potential for sync conflicts (mitigated by last-write-wins + warnings)

2. **Sync Latency**
   - ~200ms p95 latency (acceptable but not ideal)
   - Not suitable for real-time (<10ms) requirements (not needed)

3. **Scale Ceiling**
   - Markdown file I/O bottleneck at >10K artifacts (acceptable for v1.0)
   - Concurrent write conflicts at >20 engineers (future concern)
   - May require Greenfield migration later (acceptable trade-off)

### Migration Path to Greenfield (If Needed)

**Triggers:**
- Artifact count >10,000 (file I/O bottleneck)
- Team size >20 engineers (concurrent write conflicts)
- Query latency >500ms p99
- Multi-tenant SaaS launch

**Migration Effort:** 12-16 weeks (faster than greenfield from scratch)

**Advantage:** BMAD-First provides working reference implementation for data model, workflows, and integration patterns.

---

## Implementation Plan

### Phase 0: POC (Weeks 1-3)

**Goal:** Validate bidirectional sync is feasible

**Deliverables:**
- [ ] Build minimal sync adapter (Quint SQLite ↔ Markdown)
- [ ] Demo: Create hypothesis in Quint → auto-exported to markdown
- [ ] Demo: Edit markdown → synced to SQLite
- [ ] Measure sync latency (<200ms p95)

**Decision Point:** If sync latency >500ms or conflicts unresolvable → reconsider Greenfield

---

### Phase 1: Contract Foundation (Weeks 4-8)

**Goal:** Establish BaseArtifact v2.0.0 contract foundation

**Deliverables:**
- [ ] Finalize BaseArtifact v2.0.0 specification
- [ ] Implement artifact parser and validator
- [ ] Create type registry for all 4 frameworks
- [ ] Migration tooling (v1.x → v2.0.0)
- [ ] 100+ contract compliance tests

---

### Phase 2: Quint Integration (Weeks 9-14)

**Goal:** Complete bidirectional sync adapter and Quint workflows

**Deliverables:**
- [ ] Full bidirectional sync adapter (2,700 LOC)
- [ ] Wrap 12 Quint commands as BMAD workflows
- [ ] Quint DRR → BMAD Story workflow
- [ ] `/align` command (Quint ↔ BMAD)
- [ ] Traceability index (`.bmad/trace-index.json`)
- [ ] 150+ unit tests, 20+ integration tests

---

### Phase 3: DesignOS Module (Weeks 15-18)

**Goal:** Implement DesignOS as native markdown module

**Deliverables:**
- [ ] Design spec artifact type
- [ ] Design Decision Records (DDRs)
- [ ] Figma integration (asset sync)
- [ ] Hypothesis → Design → Story traceability

---

### Phase 4: AgentOS Module (Weeks 19-22)

**Goal:** Implement AgentOS quality orchestration

**Deliverables:**
- [ ] Quality gate framework
- [ ] Standards enforcement engine
- [ ] Multi-agent coordination
- [ ] Quality metrics dashboard

---

### Phase 5: Cross-Framework Traceability (Weeks 23-26)

**Goal:** Complete end-to-end traceability and launch v1.0.0

**Deliverables:**
- [ ] Full traceability: Hypothesis → Design → Story → Test → Quality Gate
- [ ] Advanced `/align` validation across all 4 frameworks
- [ ] Migration guides and documentation
- [ ] v1.0.0 release

---

## Comparison Matrix

| Criterion | Quint-First | BMAD-First ✅ | Greenfield |
|-----------|-------------|---------------|------------|
| **Timeline** | 20-24 weeks (realistic: 24-30) | 12-16 weeks (realistic: 14-18) | 28-36 weeks (realistic: 48-64) |
| **Effort (LOC)** | 15,000-20,000 | 3,000-5,000 (2,700 adapter) | 52,000 |
| **Team Size** | 2-3 FTEs | 2-3 FTEs | 5-8 FTEs |
| **Technical Feasibility** | 5/10 | 9/10 | 8/10 |
| **Code Reuse** | 30% | 100% | 0% |
| **Risk Level** | 4/10 | 8/10 | 3/10 |
| **User Experience** | 5/10 | 9/10 | 9/10 |
| **Git Collaboration** | 2/10 | 10/10 | 8/10 |
| **Performance** | 9/10 | 7/10 | 10/10 |
| **Operational Cost** | $100-300/mo | $50-100/mo | $650-1750/mo |
| **Maintainability** | 6/10 | 8/10 | 9/10 |
| **Extensibility** | 4/10 | 10/10 | 10/10 |
| **Scale Ceiling** | ~50K artifacts | ~10K artifacts | 1M+ artifacts |
| **Time to POC** | Week 12 | Week 3 ✅ | Week 20 |
| **Time to Launch** | Week 24 | Week 16 ✅ | Week 48+ |
| **Timeline Risk** | +25% variance | +17% variance ✅ | +78% variance |
| **Overall Score** | 5.15/10 | **8.55/10** ✅ | 7.85/10 |

---

## Success Metrics

### Technical Metrics

- **Sync Latency:** <200ms p95 (Quint SQLite ↔ Markdown)
- **Artifact Parsing:** <50ms p95 (markdown → BaseArtifact)
- **Alignment Validation:** <2s p95 (semantic similarity computation)
- **Traceability Query:** <100ms p95 (trace graph traversal)
- **Test Coverage:** >85% (unit + integration)

### Business Metrics

- **Time-to-Value:** POC at Week 3, launch at Week 16
- **Adoption:** 80%+ of teams enable git hooks by Month 6
- **Alignment:** 90%+ artifacts maintain >0.8 alignment scores
- **Rework Reduction:** 68% reduction in rework time (25% → 8%)
- **ROI:** $1.19M/year savings (50-person team @ $140K loaded cost)

---

## References

### Analysis Documents

1. **[Technical Deep-Dive Analysis](_bmad-output/planning-artifacts/technical-deep-dive-analysis.md)** - 50K+ word comprehensive analysis of all 4 frameworks
2. **[Architectural Comparison: Quint-First vs BMAD-First](_bmad-output/planning-artifacts/architectural-comparison-quint-vs-bmad-first.md)** - Detailed Options 1 & 2 comparison
3. **[Greenfield Architecture Analysis](_bmad-output/planning-artifacts/greenfield-architecture-analysis.md)** - Option 3 evaluation and 3-way comparison

### Planning Documents

4. **[Integration Roadmap](_bmad-output/planning-artifacts/integration-roadmap.md)** - 24-week implementation plan with 87 tasks
5. **[BaseArtifact Contract v2.0.0](_bmad-output/planning-artifacts/baseartifact-contract-spec.md)** - Technical foundation specification
6. **[Product Brief](_bmad-output/planning-artifacts/product-brief-BMAD-Enhanced-2026-02-01.md)** - Complete product vision with ADRs

### Orchestration Pattern Analysis (2026-02-05)

7. **[Brainstorming Session Results](_bmad-output/brainstorming/brainstorming-session-2026-02-05.md)** - Phase 0 POC orchestration pattern exploration
8. **[Orchestration Patterns Catalog](_bmad-output/brainstorming/orchestration-patterns-catalog.md)** - Complete reference of 100 patterns across 15 families
9. **[Architectural Decision Framework](_bmad-output/brainstorming/architectural-decision-framework.md)** - 7 foundational dimensions for orchestration decisions
10. **[Alignment Summary](_bmad-output/brainstorming/alignment-summary.md)** - How pattern analysis refines and validates BMAD-First Architecture
11. **[LLM-Agnostic Architecture](_bmad-output/brainstorming/llm-agnostic-architecture.md)** - How BMAD-Enhanced remains LLM-agnostic while optimizing for Claude

---

## Approval

**Decision Date:** 2026-02-05
**Decision Status:** ✅ ACCEPTED
**Approved By:** BMAD-Enhanced Core Team
**Implementation Start:** Phase 0 POC (Week 1)
**Review Date:** After Phase 0 POC (Week 3) - validate sync adapter feasibility

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-05 | BMAD-Enhanced Team | Initial ADR - selected BMAD-First architecture after 3-option analysis |
| 1.1.0 | 2026-02-05 | BMAD-Enhanced Team | Refined with orchestration patterns analysis (100 patterns evaluated), added Skills+Steps integration model, clarified markdown-as-master state management, updated LOC estimate to 3,100 |
| 1.2.0 | 2026-02-05 | BMAD-Enhanced Team | Made architecture LLM-agnostic: renamed Skills→Capabilities (core), Claude integration exposes capabilities as skills (slash commands), added .integrations/ layer for multi-LLM support |
| 1.3.0 | 2026-02-06 | BMAD-Enhanced Team | Phase 0 scope refinement: Deferred Quint SQLite integration to Phase 2, focus Phase 0 on pure markdown orchestration (DesignOS + AgentOS). Updated LOC estimates: Phase 0 = 1,800 LOC, Phase 2 = +500 LOC Quint adapter. Reduces Phase 0 complexity and validates orchestration pattern before database sync challenges. |
| 1.4.0 | 2026-02-07 | BMAD-Enhanced Team | **MAJOR PIVOT:** Deep-dive analysis revealed DesignOS/AgentOS are NOT markdown systems (TypeScript web app + CLI tool). Pivoted Phase 0 from custom orchestration engine (1,800 LOC) to agent enhancement approach (500 LOC) leveraging proven BMAD agent architecture. BMAD already provides 80%+ of DesignOS/AgentOS functionality. Creates 4 new agents inspired by DesignOS/AgentOS capabilities. Total LOC: Phase 0 = 500 LOC, Phase 2 = +500 LOC (1,000 LOC total vs 2,300 LOC previous). See framework-deep-dive-analysis.md for full analysis. |

---

## Notes

**Key Decision Factors:**
1. Pragmatism over perfection (ship value now, optimize later)
2. Risk mitigation (proven systems, phased rollout)
3. Developer experience (Git workflows, markdown readability)
4. Time-to-value (POC Week 3 vs Week 20 Greenfield)

**Future Considerations:**
- Monitor scale triggers (>10K artifacts, >20 engineers, >500ms query latency)
- Re-evaluate Greenfield migration if triggers hit
- Document migration path when needed (estimated 12-16 weeks from BMAD-First)

**Philosophy:**
> "Make it work, make it right, make it fast — in that order."
> — Kent Beck

BMAD-First gets it working (Week 16). We can make it right (optimize) and make it fast (Greenfield migration) later with data-driven decisions.
