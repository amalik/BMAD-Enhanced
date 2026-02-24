# HC5: Signal Report — Schema Definition

> **Contract:** HC5 | **Type:** Artifact | **Flow:** Noah → Max
>
> This schema defines the structure for production signal reports that interpret production data through experiment lineage. The report produces **intelligence, not strategy** — no strategic recommendations are included. Any agent or user can produce a compliant artifact — the schema is not coupled to a specific producer.

## Frontmatter Schema

```yaml
---
contract: HC5
type: artifact
source_agent: noah                          # or any producing agent/user
source_workflow: signal-interpretation       # workflow that produced this artifact
target_agents: [max]                         # primary consumer(s)
input_artifacts:                             # references to upstream HC4 artifact consumed
  - path: "_bmad-output/vortex-artifacts/hc4-example.md"
    contract: HC4
created: YYYY-MM-DD
---
```

### Frontmatter Field Reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `contract` | Yes | string | Always `HC5` |
| `type` | Yes | string | Always `artifact` |
| `source_agent` | Yes | string | Agent ID that produced this artifact (e.g., `noah`) |
| `source_workflow` | Yes | string | Workflow name (e.g., `signal-interpretation`, `behavior-analysis`, `production-monitoring`) |
| `target_agents` | Yes | array | Agent IDs that consume this artifact (e.g., `[max]`) |
| `input_artifacts` | Yes | array | References to HC4 experiment context or other source material used |
| `created` | Yes | date | ISO date when artifact was created |

---

## Body Structure

### 1. Signal Description *(required)*

Clear, factual description of the production signal observed. No interpretation yet — just what happened.

| Field | Required | Description |
|-------|----------|-------------|
| Signal Summary | Yes | One-sentence factual description of what was observed in production |
| Signal Type | Yes | `Metric Deviation` / `Behavior Pattern` / `Anomaly` / `Trend Shift` / `Threshold Breach` |
| Severity | Yes | `Critical` / `Warning` / `Informational` |
| Detection Method | Yes | How the signal was detected (monitoring, user report, metric analysis, etc.) |
| Time Window | Yes | When the signal was observed (date range) |
| Affected Scope | Yes | Which users, segments, or features are affected |

### 2. Context *(required)*

Connection between the production signal and its experiment lineage through the Vortex.

#### Experiment Lineage

| Field | Required | Description |
|-------|----------|-------------|
| Originating Experiment | Yes | Name and reference to the HC4 experiment that led to this production state |
| Original Hypothesis | Yes | The hypothesis that was tested |
| Experiment Outcome | Yes | Whether the hypothesis was confirmed, rejected, or partially confirmed |
| Expected Production Behavior | Yes | What was expected to happen in production based on experiment results |
| Actual vs Expected | Yes | How the observed signal compares to experiment expectations |

#### Vortex History

| Field | Required | Description |
|-------|----------|-------------|
| Problem Definition | No | Reference to the HC2 problem definition in the Vortex journey |
| Hypothesis Origin | No | Reference to the HC3 hypothesis contract |
| Previous Signals | No | References to prior HC5 signal reports for this experiment/feature |
| Related Experiments | No | Other experiments that may be influencing the same production area |

### 3. Trend Analysis *(required)*

Data-driven analysis of the signal's trajectory.

| Field | Required | Description |
|-------|----------|-------------|
| Trend Direction | Yes | `Improving` / `Degrading` / `Stable` / `Oscillating` / `Insufficient Data` |
| Trend Duration | Yes | How long the trend has been observed |
| Rate of Change | Yes | How quickly the signal is moving (e.g., "5% week-over-week decline") |
| Baseline Comparison | Yes | Comparison to pre-experiment or validated baseline |
| Confidence | Yes | `High` / `Medium` / `Low` — based on data quality and sample size |

### 4. Anomaly Detection *(optional, required when unexpected patterns detected)*

Unexpected user behavior patterns not covered by the original experiment hypothesis (FR15).

| Field | Required | Description |
|-------|----------|-------------|
| Anomaly Description | Yes | What unexpected behavior was observed |
| Deviation from Expected | Yes | How this differs from what the experiment predicted |
| Potential Explanations | Yes | Possible reasons for the anomaly (factual, not speculative strategy) |
| Discovery Needed | Yes | Whether this warrants routing to Isla for investigation (`Yes` / `No`) |
| Discovery Focus | No | If yes, what specific questions should Isla investigate |

### 5. Data Quality *(required)*

| Field | Required | Description |
|-------|----------|-------------|
| Sample Size | Yes | Volume of data underlying this signal |
| Data Completeness | Yes | Whether data collection was complete or had gaps |
| Known Biases | No | Any sampling or measurement biases that may affect interpretation |
| Confidence Level | Yes | `High` / `Medium` / `Low` |

---

## Constraints

**This artifact explicitly does NOT include:**
- Strategic recommendations (that is Max's domain)
- Pivot/patch/persevere decisions (that is Max's domain)
- Experiment design suggestions (that is Liam/Wade's domain)
- Resource allocation recommendations (that is Max's domain)

Noah produces **intelligence** — contextual, evidence-based signal interpretation. Max produces **decisions**.

---

## Downstream Consumption

**Max** (primary consumer) uses this artifact to:
- Feed into `learning-card` workflow: the signal report provides experiment context (name, hypothesis, method, success criteria, strategic context) that step-01 requires
- Feed into `pivot-patch-persevere` workflow: signals organized as STAY/CHANGE/UNCLEAR evidence
- Feed into `vortex-navigation` workflow: signal contributes to 7-stream status assessment
- Make evidence-based decisions grounded in production reality

**Other consumers:** Isla (when anomaly detection triggers discovery routing via HC10 Compass guidance).
