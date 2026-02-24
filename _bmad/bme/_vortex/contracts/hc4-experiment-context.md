# HC4: Experiment Context — Schema Definition

> **Contract:** HC4 | **Type:** Artifact | **Flow:** Wade → Noah
>
> This schema defines the structure for graduated experiment context produced after an experiment completes and is ready for production signal interpretation. Any agent or user can produce a compliant artifact — the schema is not coupled to a specific producer.

## Frontmatter Schema

```yaml
---
contract: HC4
type: artifact
source_agent: wade                          # or any producing agent/user
source_workflow: lean-experiment             # workflow that produced this artifact
target_agents: [noah]                        # primary consumer(s)
input_artifacts:                             # references to upstream HC3 artifact consumed
  - path: "_bmad-output/vortex-artifacts/hc3-example.md"
    contract: HC3
created: YYYY-MM-DD
---
```

### Frontmatter Field Reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `contract` | Yes | string | Always `HC4` |
| `type` | Yes | string | Always `artifact` |
| `source_agent` | Yes | string | Agent ID that produced this artifact (e.g., `wade`) |
| `source_workflow` | Yes | string | Workflow name (e.g., `lean-experiment`, `proof-of-concept`, `proof-of-value`, `mvp`) |
| `target_agents` | Yes | array | Agent IDs that consume this artifact (e.g., `[noah]`) |
| `input_artifacts` | Yes | array | References to HC3 hypothesis contracts or other source material used |
| `created` | Yes | date | ISO date when artifact was created |

---

## Body Structure

### 1. Experiment Summary *(required)*

| Field | Required | Description |
|-------|----------|-------------|
| Experiment Name | Yes | Descriptive name for the experiment |
| One-Sentence Description | Yes | What was tested and why, in one sentence |
| Experiment Type | Yes | `Lean Experiment` / `Proof of Concept` / `Proof of Value` / `MVP` |
| Actual Duration | Yes | How long the experiment actually ran (e.g., "3 weeks") |
| Graduation Status | Yes | `Graduated` (moving to production) / `Completed` (results captured, not graduating) / `Terminated` (stopped early) |

### 2. Hypothesis Tested *(required)*

The hypothesis from HC3 that was tested, in the standard format.

| Field | Required | Description |
|-------|----------|-------------|
| Hypothesis Statement | Yes | `"We believe that [target users] will [expected behavior] because [rationale]"` |
| Riskiest Assumption | Yes | The assumption this experiment targeted |
| Original Expected Outcome | Yes | What was expected to happen |
| Original Target Behavior Change | Yes | What behavior change was expected |

### 3. Experiment Method *(required)*

| Field | Required | Description |
|-------|----------|-------------|
| Method Type | Yes | Description of experiment methodology |
| Sample Size | Yes | Number of participants or data points |
| Planned Duration | Yes | Originally planned time period for the experiment |
| Recruitment/Selection | No | How participants were selected |
| Controls | No | Control group or baseline comparison |

### 4. Pre-Defined Success Criteria *(required)*

Success criteria as defined **before** seeing results. This is critical for honest evaluation.

| Field | Required | Description |
|-------|----------|-------------|
| Metric | Yes | What was measured |
| Target Threshold | Yes | The pre-defined success threshold |
| Actual Result | Yes | What was actually observed |
| Met? | Yes | `Yes` / `No` / `Partially` |

### 5. Additional Results *(optional)*

Results beyond the pre-defined success criteria in Section 4. Section 4 covers the primary metrics with pass/fail assessment. This section captures supplementary data.

#### Additional Quantitative Metrics

Metrics tracked during the experiment that were not part of the pre-defined success criteria.

| Field | Required | Description |
|-------|----------|-------------|
| Metric | Yes | What was measured (must NOT duplicate Section 4 metrics) |
| Value | Yes | Observed value |
| Relevance | Yes | Why this metric matters beyond the primary success criteria |

#### Qualitative Results

| Field | Required | Description |
|-------|----------|-------------|
| Key Quotes | No | Notable user quotes observed during experiment |
| Observed Behaviors | No | Significant behaviors not captured by metrics |
| Unexpected Findings | No | Anything surprising that wasn't part of the hypothesis |

### 6. Confirmed/Rejected Hypotheses *(required)*

| Field | Required | Description |
|-------|----------|-------------|
| Hypothesis Status | Yes | `Confirmed` / `Rejected` / `Partially Confirmed` / `Inconclusive` |
| Assumption Status | Yes | Per-assumption: `Validated` / `Invalidated` / `Partially Validated` / `Unresolved` |
| Core Learning | Yes | One-sentence summary: `"We [validated/invalidated] that [core hypothesis], discovering that [key insight]"` |
| Conditions | No | Under what conditions the hypothesis holds or fails |

### 7. Strategic Context *(required)*

| Field | Required | Description |
|-------|----------|-------------|
| Vortex Stream | Yes | Which stream this experiment belongs to |
| Assumption Tested | Yes | Which assumption from the Vortex journey was tested |
| Decision It Informs | Yes | What decision this experiment result enables |
| Implications | Yes | What this means for the product direction |

### 8. Production Readiness *(required for graduated experiments)*

| Field | Required | Description |
|-------|----------|-------------|
| Metrics to Monitor | Yes | Which production metrics should be tracked |
| Expected Production Behavior | Yes | What behavior is expected at scale |
| Signal Thresholds | Yes | When a production signal should trigger attention |
| Monitoring Duration | No | Recommended production monitoring period |

---

## Downstream Consumption

**Noah** (primary consumer) uses this artifact to:
- Connect production signals to their originating experiment context
- Interpret whether production behavior aligns with experiment expectations
- Detect unexpected behavior patterns not covered by the original hypothesis
- Produce HC5 signal reports grounded in experiment lineage

**Other consumers:** Max (via learning-card workflow for experiment-to-learning tracking).
