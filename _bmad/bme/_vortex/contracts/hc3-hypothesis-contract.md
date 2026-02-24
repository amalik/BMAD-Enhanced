# HC3: Hypothesis Contract — Schema Definition

> **Contract:** HC3 | **Type:** Artifact | **Flow:** Liam → Wade
>
> This schema defines the structure for hypothesis contracts produced during hypothesis engineering. Each artifact contains 1-3 investment-grade hypotheses with explicit riskiest assumptions, ready for experiment design. Any agent or user can produce a compliant artifact — the schema is not coupled to a specific producer.

## Frontmatter Schema

```yaml
---
contract: HC3
type: artifact
source_agent: liam                          # or any producing agent/user
source_workflow: hypothesis-engineering      # workflow that produced this artifact
target_agents: [wade]                        # primary consumer(s)
input_artifacts:                             # references to upstream HC2 artifact consumed
  - path: "_bmad-output/vortex-artifacts/hc2-example.md"
    contract: HC2
created: YYYY-MM-DD
---
```

### Frontmatter Field Reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `contract` | Yes | string | Always `HC3` |
| `type` | Yes | string | Always `artifact` |
| `source_agent` | Yes | string | Agent ID that produced this artifact (e.g., `liam`) |
| `source_workflow` | Yes | string | Workflow name (e.g., `hypothesis-engineering`, `experiment-design`) |
| `target_agents` | Yes | array | Agent IDs that consume this artifact (e.g., `[wade]`) |
| `input_artifacts` | Yes | array | References to HC2 problem definitions or other source material used |
| `created` | Yes | date | ISO date when artifact was created |

---

## Body Structure

### 1. Problem Context *(required)*

Brief summary of the problem definition this hypothesis set addresses.

| Field | Required | Description |
|-------|----------|-------------|
| Problem Statement | Yes | The converged problem statement from HC2 (or equivalent source) |
| JTBD Reference | Yes | The primary Job-to-be-Done being addressed |
| Key Pains Targeted | Yes | Which pains from the problem definition these hypotheses address |

### 2. Hypothesis Contracts *(required, 1-3 per artifact)*

Each hypothesis follows the 4-field format. Repeat this section for each hypothesis (minimum 1, maximum 3).

#### Hypothesis {N}: {Title}

**The 4-Field Contract:**

| Field | Required | Description |
|-------|----------|-------------|
| Expected Outcome | Yes | What we expect to happen if the hypothesis is correct. Specific, measurable result. |
| Target Behavior Change | Yes | What specific user behavior will change, and in what direction. Observable and measurable. |
| Rationale | Yes | Why we believe this will work — grounded in evidence from HC2 problem definition. |
| Riskiest Assumption | Yes | The single assumption that, if wrong, invalidates the entire hypothesis. This is what must be tested first. |

**Hypothesis Statement** *(required)*:

> We believe that [target users] will [expected behavior] because [rationale].

### 3. Assumption Risk Map *(required)*

All assumptions across all hypotheses, classified by risk.

| Field | Required | Description |
|-------|----------|-------------|
| Assumption | Yes | Statement of what is assumed |
| Hypothesis | Yes | Which hypothesis (1, 2, or 3) this assumption belongs to |
| Lethality | Yes | `High` (if wrong, kills the idea) / `Medium` (if wrong, requires pivot) / `Low` (if wrong, minor adjustment) |
| Uncertainty | Yes | `High` (no evidence) / `Medium` (some evidence) / `Low` (strong evidence) |
| Priority | Yes | Derived from lethality × uncertainty — `Test First` / `Test Soon` / `Monitor` |
| Validation Status | Yes | `Unvalidated` / `Partially Validated` / `Validated` |

### 4. Recommended Testing Order *(required)*

Prioritized sequence for validating assumptions through experiments.

| Field | Required | Description |
|-------|----------|-------------|
| Priority | Yes | Sequence number (1 = test first) |
| Assumption | Yes | Which assumption to test |
| Suggested Method | Yes | Recommended experiment approach |
| Minimum Evidence | Yes | What evidence would validate or invalidate this assumption |

### 5. Flagged Concerns *(optional)*

Assumptions or issues identified during hypothesis engineering that may require routing back to Isla for additional discovery.

| Field | Required | Description |
|-------|----------|-------------|
| Concern | Yes | Description of the unvalidated assumption or knowledge gap |
| Impact | Yes | How this affects the hypothesis quality |
| Recommended Action | Yes | Suggested next step (e.g., "Route to Isla for targeted user research") |

---

## Downstream Consumption

**Wade** (primary consumer) uses this artifact to:
- Design experiments targeting the riskiest assumptions first
- Use the hypothesis statement format directly as experiment hypothesis
- Reference expected outcomes when defining success criteria
- Use the 4-field contract as the experiment brief

**Other consumers:** Isla (for assumption validation routing), Max (for evidence tracking via learning cards).
