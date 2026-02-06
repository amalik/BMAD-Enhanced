# LLM-Agnostic Architecture Decision

**Date:** 2026-02-05
**Decision:** Make BMAD-Enhanced core architecture LLM-agnostic while optimizing for Claude experience

---

## Problem Statement

During brainstorming, patterns were described using "Skills" terminology, which is Claude Code-specific. This creates coupling to a single LLM platform.

**User Question:** "Does this mean our system is very tightly coupled to Claude or does it remain LLM agnostic?"

---

## Decision

**Core Architecture: LLM-Agnostic with LLM-Specific Adapters**

### Terminology Change

**Before:**
- "Skills" (Claude-specific term)
- "Skills + Steps Pattern"
- "Skill Discovery"

**After:**
- **"Capabilities"** (LLM-agnostic term for core architecture)
- **"Capabilities + Steps Pattern"**
- **"Capability Discovery"**
- **"Skills"** reserved for Claude-specific integration layer only

---

## Architecture

### Core Layer (LLM-Agnostic)

**Capabilities:** Framework functions exposed via markdown workflow files

```
_bmad-enhanced/
├── _quint/
│   ├── capabilities/              # LLM-agnostic workflows
│   │   ├── hypothesize.md         # Capability: Quint FPF hypothesize
│   │   ├── validate.md            # Capability: Quint FPF validate
│   │   └── decide.md              # Capability: Quint FPF decide
│   └── steps/                     # Implementation steps
│       ├── hypothesize-step-01.md
│       └── validate-step-01.md
├── _designos/
│   ├── capabilities/
│   │   ├── empathy-map.md         # Capability: Design thinking empathy map
│   │   ├── journey-map.md         # Capability: User journey mapping
│   │   └── persona.md             # Capability: Persona generation
│   └── steps/
│       └── empathy-map-step-01.md
└── _agentos/
    ├── capabilities/
    │   ├── quality-gate.md        # Capability: Quality gate validation
    │   └── standards-check.md     # Capability: Standards enforcement
    └── steps/
        └── quality-gate-step-01.md
```

**Key Points:**
- Capabilities are markdown files with workflow instructions
- Any LLM that can read markdown can execute them
- No Claude-specific syntax in capability definitions

---

### Integration Layer (LLM-Specific)

**Claude Integration:** Maps capabilities → Claude Code slash commands

```
.integrations/
├── claude/
│   └── skills/                    # Claude Code integration
│       ├── quint-hypothesize.md   # Slash command: /quint-hypothesize
│       │                          # → Loads ../../_quint/capabilities/hypothesize.md
│       ├── quint-validate.md      # Slash command: /quint-validate
│       ├── designos-empathy-map.md # Slash command: /designos-empathy-map
│       └── agentos-quality-gate.md # Slash command: /agentos-quality-gate
├── cursor/
│   └── commands/                  # Cursor IDE integration (future)
│       └── [capability-name].md
├── copilot/
│   └── extensions/                # GitHub Copilot integration (future)
│       └── [capability-name].json
└── api/
    ├── server.ts                  # REST API server
    └── endpoints/
        ├── quint.ts               # GET /api/quint/hypothesize
        ├── designos.ts            # GET /api/designos/empathy-map
        └── agentos.ts             # GET /api/agentos/quality-gate
```

**How Integration Works:**

#### Claude Integration (Primary)
```markdown
<!-- .integrations/claude/skills/quint-hypothesize.md -->
---
name: 'quint-hypothesize'
description: 'Generate hypothesis using Quint FPF methodology'
---

LOAD the capability file at: @{project-root}/_quint/capabilities/hypothesize.md
READ its entire contents and follow its directions exactly.
```

**User Experience:** Type `/quint-hypothesize` → Claude loads capability → Executes workflow

#### API Integration (LLM-Agnostic)
```typescript
// .integrations/api/endpoints/quint.ts
import { loadCapability } from '../loader';

export async function hypothesize(req, res) {
  const capability = await loadCapability('_quint/capabilities/hypothesize.md');
  // Execute capability logic
  return res.json({ result: capability.execute(req.body) });
}
```

**Access:** `POST /api/quint/hypothesize` with JSON payload

#### Future: Cursor, Copilot, etc.
Same pattern - adapters map to capabilities, capabilities remain LLM-agnostic.

---

## Pattern Terminology Updates

### Family B: ~~Skills~~ → **Capabilities**

**Pattern B1:** ~~Skill Registration API~~ → **Capability Registration API**
- Frameworks register capabilities via API
- LLM integrations map to capabilities

**Pattern B2:** ~~Convention-Based Skill Discovery~~ → **Convention-Based Capability Discovery**
- Capabilities discovered by file location: `_quint/capabilities/*.md`
- No explicit registration needed

**Pattern B3:** ~~Namespaced Skill Hierarchy~~ → **Namespaced Capability Hierarchy**
- Capabilities organized by framework: `quint:fpf:hypothesize`

**Pattern B4:** ~~Skill Composition Chains~~ → **Capability Composition Chains**
- Capabilities invoke other capabilities

**Pattern B5:** ~~Skill Parameter Templates~~ → **Capability Parameter Templates**
- Capabilities accept structured parameters

**Pattern B6:** ~~Agent-Specific Skill Bindings~~ → **Agent-Specific Capability Bindings**
- Different agents access different capabilities

**Pattern B7:** ~~Skill Hot-Reload & Versioning~~ → **Capability Hot-Reload & Versioning**
- Capabilities support versioning

**Pattern B8:** ~~Skill Marketplace & Discovery~~ → **Capability Marketplace & Discovery**
- Frameworks publish capabilities to registry

**Pattern B9:** ~~Skill Execution Contexts~~ → **Capability Execution Contexts**
- Capabilities execute in isolated contexts

---

### Family H: Hybrid Patterns

**Pattern H1:** ~~Skills That Load Steps~~ → **Capabilities That Load Steps**
- Capability invocation → Load framework step file → Execute

**Pattern H2:** Steps That Invoke Tools (unchanged)

**Pattern H3:** ~~Skills That Compose Tools~~ → **Capabilities That Compose Tools**
- Capability uses multiple tools internally

**Pattern H4:** ~~Skills With Embedded Tools & Steps~~ → **Capabilities With Embedded Tools & Steps**
- Multi-layer: Capability → Steps → Tools

**Pattern H5:** Conditional Framework Routing (unchanged)

**Pattern H6:** Framework Event Streaming (unchanged)

---

## Meta-Pattern Updates

### Dimension 1: INTERFACE MODEL

**Meta-Pattern 1A:** ~~Declarative Invocation (Skills)~~ → **Declarative Invocation (Capabilities)**
- Named, versioned, discoverable capabilities
- Example: `quint:hypothesize` (core), `/quint-hypothesize` (Claude integration)
- Philosophy: Frameworks publish capabilities, orchestrator discovers and invokes

**Meta-Pattern 1B:** Programmatic Invocation (Tools) - unchanged

**Meta-Pattern 1C:** Compositional Invocation (Steps) - unchanged

---

## Integration Philosophy

### Core Principle: **"Capabilities at the Core, Integrations at the Edge"**

```
┌─────────────────────────────────────────┐
│         LLM-Agnostic Core               │
│                                         │
│  Capabilities (markdown workflows)      │
│  Steps (implementation details)         │
│  State Management (markdown/SQLite)     │
│                                         │
└─────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
┌─────────────┐ ┌─────────┐ ┌─────────┐
│   Claude    │ │ Cursor  │ │   API   │
│ Integration │ │ (future)│ │         │
│             │ │         │ │         │
│ Maps to:    │ │ Maps to:│ │ Exposes:│
│ /quint-*    │ │ Cmds    │ │ REST    │
└─────────────┘ └─────────┘ └─────────┘
```

**Benefits:**
1. **Core is portable** - Capabilities work with any LLM or tool
2. **Claude optimized** - Best experience via skills, but not required
3. **Future-proof** - Easy to add Cursor, Copilot, custom tools
4. **API-first** - Non-LLM tools can access capabilities via REST

---

## Implementation Impact

### Phase 0 POC Changes

**Original Plan:**
- Implement "Skill Discovery" (B2)
- Implement "Skills That Load Steps" (H1)

**Updated Plan:**
- Implement **"Capability Discovery"** (B2)
- Implement **"Capabilities That Load Steps"** (H1)
- Add Claude integration layer (minimal, symlinks to capabilities)

**LOC Impact:**
- Core capability system: 200 LOC (unchanged, just terminology)
- Claude integration layer: +50 LOC (simple adapters)
- Total: 250 LOC (vs 200 LOC original estimate)

**File Structure:**
```
Phase 0 POC Implementation:
1. Create _quint/capabilities/hypothesize.md (capability)
2. Create _quint/steps/hypothesize-step-01.md (implementation)
3. Create .integrations/claude/skills/quint-hypothesize.md (adapter)
4. Symlink from .claude/commands/ → .integrations/claude/skills/
```

---

## Document Updates Required

### High Priority (Before Phase 0)

1. **[architectural-decision-record.md](../planning-artifacts/architectural-decision-record.md)**
   - ✅ Change "Skills + Steps" → "Capabilities + Steps"
   - ✅ Update file structure to show `_quint/capabilities/`
   - ✅ Add note about LLM-agnostic architecture with Claude integration

2. **[alignment-summary.md](./alignment-summary.md)**
   - ✅ Update pattern references (B2, H1) with new names
   - ✅ Clarify LLM-agnostic approach

3. **[orchestration-patterns-catalog.md](./orchestration-patterns-catalog.md)**
   - ✅ Update all pattern names (Family B, Family H)
   - ✅ Add note at beginning about LLM-agnostic terminology

### Medium Priority (During Phase 0)

4. **[brainstorming-session-2026-02-05.md](./brainstorming-session-2026-02-05.md)**
   - ✅ Update Meta-Pattern 1A description
   - ✅ Update Insight 1 terminology

5. **[architectural-decision-framework.md](./architectural-decision-framework.md)**
   - ✅ Update Dimension 1 choices
   - ✅ Update pattern references throughout

---

## User Communication

**When discussing with stakeholders:**

✅ **Correct:** "BMAD-Enhanced uses a capabilities architecture that's LLM-agnostic. For Claude users, capabilities are exposed as convenient slash commands (skills)."

❌ **Incorrect:** "BMAD-Enhanced is a Claude-only system."

**When discussing implementation:**

✅ **Correct:** "We're implementing capability discovery (B2 pattern) with a Claude integration layer for optimal UX."

❌ **Incorrect:** "We're implementing skill discovery for Claude."

---

## FAQ

**Q: Can BMAD-Enhanced work without Claude?**
A: Yes. Capabilities are markdown workflows that any LLM or tool can execute. Claude integration is one adapter, not a requirement.

**Q: Will switching from Claude to another LLM be expensive?**
A: No. Core capabilities are LLM-agnostic. Only the integration layer needs to be adapted (~50-100 LOC per LLM).

**Q: Why keep "Skills" terminology at all?**
A: Claude Code uses "skills" as a first-class concept. For Claude users, we want to use familiar language. Internally, we call them capabilities.

**Q: What about the REST API?**
A: The API exposes capabilities to any tool, not just LLMs. This enables CLI tools, CI/CD integrations, IDE plugins, etc.

**Q: Performance impact of abstraction?**
A: Negligible. Integration layer is a thin adapter (~10-20 lines) that loads capability files. No runtime overhead.

---

## Decision Approval

**Decision Date:** 2026-02-05
**Decision Status:** ✅ ACCEPTED
**Rationale:**
- Makes architecture LLM-agnostic without sacrificing Claude UX
- Minimal implementation overhead (+50 LOC)
- Future-proofs against LLM platform changes
- Enables non-LLM integrations (CLI, CI/CD, etc.)

**Implementation:** Begin with Phase 0 POC
**Review:** After Phase 0, evaluate if integration layer is sufficient

---

## Related Documents

- [architectural-decision-record.md](../planning-artifacts/architectural-decision-record.md) - Updated with Capabilities terminology
- [alignment-summary.md](./alignment-summary.md) - Pattern alignment with LLM-agnostic approach
- [orchestration-patterns-catalog.md](./orchestration-patterns-catalog.md) - Full pattern catalog with updated names
