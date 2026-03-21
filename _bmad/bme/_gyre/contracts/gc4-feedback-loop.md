# GC4: Feedback Loop — Schema Definition

> **Contract:** GC4 | **Type:** Artifact | **Flow:** Coach → Atlas
>
> This schema defines the structure for the Feedback Loop produced by the model-review workflow. Contains two mechanisms: (1) amendment flags on capabilities in GC2, and (2) a standalone feedback file for missed-gap reports.

## Overview

GC4 is a dual-mechanism contract:

1. **Amendment Flags** — stored directly on capabilities in `.gyre/capabilities.yaml` (GC2). Capabilities marked `removed: true` or `amended: true` persist across regeneration. Atlas reads these flags and respects them.

2. **Feedback File** — stored in `.gyre/feedback.yaml`. Contains user-reported missed capabilities, missed gaps, and severity adjustments. Atlas uses these to inform future model generation.

## Mechanism 1: Amendment Flags (in GC2)

Amendments are stored as additional fields on capability entries in `.gyre/capabilities.yaml`:

```yaml
# Removed capability — excluded from future analysis
- id: "obs-custom-metrics"
  name: "Custom metrics collection"
  category: "observability"
  # ... standard fields ...
  removed: true
  removed_at: "2026-03-22"

# Edited capability — persists across regeneration
- id: "dep-rollback"
  name: "Automated rollback"           # updated by user
  category: "deployment"
  description: "Canary-based rollback"  # updated by user
  # ... standard fields ...
  amended: true
  amended_at: "2026-03-22"
  original_name: "Rollback strategy"
  original_description: "Mechanism to revert failed deployments"

# User-added capability
- id: "obs-custom-001"
  name: "SLO dashboard"
  category: "observability"
  description: "Service Level Objective tracking dashboard with burn rate alerts"
  source: "user-added"
  amended: true
  amended_at: "2026-03-22"
```

### Amendment Flag Reference

| Field | Type | When Present | Description |
|-------|------|-------------|-------------|
| `removed` | boolean | Capability removed by user | Always `true` when present |
| `removed_at` | date | With `removed` | ISO date of removal |
| `amended` | boolean | Capability edited or added by user | Always `true` when present |
| `amended_at` | date | With `amended` | ISO date of amendment |
| `original_name` | string | Name was changed | Previous name value |
| `original_description` | string | Description was changed | Previous description value |
| `original_category` | string | Category was changed | Previous category value |
| `source` | string | User-added capability | Set to `"user-added"` for new entries |

### Amendment Frontmatter Fields (in GC2)

When amendments are applied, the GC2 frontmatter is updated:

```yaml
---
contract: GC2
# ... standard GC2 fields ...
last_reviewed: "2026-03-22"      # date of most recent review
review_deferred: false            # true if user chose "later"
amendment_count: 3                # total amendments applied
---
```

---

## Mechanism 2: Feedback File

Feedback is stored in a standalone file at `.gyre/feedback.yaml`.

### Frontmatter Schema

```yaml
---
contract: GC4
type: artifact
source_agent: coach
target_agents: [atlas]
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

### Frontmatter Field Reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `contract` | Yes | string | Always `GC4` |
| `type` | Yes | string | Always `artifact` |
| `source_agent` | Yes | string | Always `coach` |
| `target_agents` | Yes | array | Agent IDs that consume this artifact: `[atlas]` |
| `created` | Yes | date | ISO date when first feedback entry was written |
| `updated` | Yes | date | ISO date of most recent feedback entry |

### Body Schema

```yaml
feedback:
  - timestamp: ISO-8601          # when the feedback was provided
    reporter: string             # user name from config
    type: string                 # "missed-capability" | "missed-gap" | "severity-adjustment" | "other"
    description: string          # user's feedback in their own words
    domain: string               # "observability" | "deployment" | "reliability" | "security" | "general"
```

### Feedback Entry Field Reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `timestamp` | Yes | string | ISO-8601 timestamp of when feedback was captured |
| `reporter` | Yes | string | User name (from config.yaml `user_name`) |
| `type` | Yes | string | One of: `missed-capability`, `missed-gap`, `severity-adjustment`, `other` |
| `description` | Yes | string | User's feedback in their own words |
| `domain` | Yes | string | One of: `observability`, `deployment`, `reliability`, `security`, `general` |

---

## Artifact Locations

| File | Purpose | Updated By |
|------|---------|------------|
| `.gyre/capabilities.yaml` | Amendment flags on capabilities | Coach (step-03-apply-amendments) |
| `.gyre/feedback.yaml` | Missed-gap reports and feedback | Coach (step-04-capture-feedback) |

---

## Downstream Consumption

| Consumer | Mechanism | Purpose |
|----------|-----------|---------|
| **Atlas** (model-curator) | Amendment flags in GC2 | Respect `removed`/`amended` flags on regeneration — never re-add removed capabilities, preserve edits |
| **Atlas** (model-curator) | Feedback file | Incorporate missed-capability and missed-gap feedback into future model generation |

### Atlas Regeneration Rules

When Atlas regenerates the model (model-generation workflow):

1. Load existing `.gyre/capabilities.yaml` if present
2. For each capability with `removed: true` — do NOT regenerate, preserve the removal entry
3. For each capability with `amended: true` — preserve user's edits, do not overwrite
4. For each `missed-capability` feedback entry — consider generating a matching capability
5. For each `missed-gap` feedback entry — consider adding a relevant capability
6. New capabilities from regeneration are added alongside preserved amendments

---

## Example

### Feedback File Example

```yaml
---
contract: GC4
type: artifact
source_agent: coach
target_agents: [atlas]
created: 2026-03-22
updated: 2026-03-22
---

feedback:
  - timestamp: "2026-03-22T15:30:00Z"
    reporter: "Alice"
    type: "missed-capability"
    description: "We use SLO-based alerting with burn rate windows — the model should include SLO tracking as a capability"
    domain: "observability"
  - timestamp: "2026-03-22T15:32:00Z"
    reporter: "Alice"
    type: "severity-adjustment"
    description: "OBS-003 (structured logging) should be a blocker, not recommended — we've had incidents from unstructured logs"
    domain: "observability"
  - timestamp: "2026-03-22T15:35:00Z"
    reporter: "Alice"
    type: "missed-gap"
    description: "No finding about database connection pooling — we don't have it and it's causing issues under load"
    domain: "reliability"
```

---

## Validation Rules

A valid GC4 feedback file must:

1. Have all required frontmatter fields present and correctly typed
2. Have every feedback entry with all required fields present and non-empty
3. Have `type` as one of: `missed-capability`, `missed-gap`, `severity-adjustment`, `other`
4. Have `domain` as one of: `observability`, `deployment`, `reliability`, `security`, `general`
5. Have `timestamp` in ISO-8601 format
6. Have `updated` date >= `created` date
7. Not contain source code, file contents, or secrets (NFR9)

Amendment flags in GC2 must:

1. Have `removed_at` present when `removed: true`
2. Have `amended_at` present when `amended: true`
3. Have at least one `original_*` field when `amended: true` (unless `source: "user-added"`)
4. Have unique capability IDs (user-added capabilities use `[category]-custom-NNN` pattern)
