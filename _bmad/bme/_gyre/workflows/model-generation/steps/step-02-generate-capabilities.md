---
step: 2
workflow: model-generation
title: Generate Capabilities
---

# Step 2: Generate Capabilities

Generate capabilities relevant to the detected stack using industry standards and stack-specific reasoning.

## MANDATORY EXECUTION RULES

- Every capability MUST be relevant to THIS stack — do not generate generic checklists
- Each capability must explain WHY it matters for this specific stack/deployment/cloud combination
- Generate ≥20 capabilities for supported archetypes; fewer triggers limited_coverage warning
- Respect GC4 amendments: removed capabilities stay removed, amended capabilities persist unchanged
- Source every capability: "standard" (industry framework), "practice" (common pattern), or "reasoning" (derived from stack analysis)

## CAPABILITY SCHEMA

Each capability must have:

```yaml
- id: string              # kebab-case, e.g., "health-check-liveness"
  category: string        # "observability" | "deployment" | "reliability" | "security"
  name: string            # human-readable, e.g., "Liveness Health Check"
  description: string     # 1-3 sentences: what it is + why it matters for THIS stack
  source: string          # "standard" | "practice" | "reasoning"
  relevance: string       # why this matters for THIS stack specifically
  amended: false          # set by Coach during review
  removed: false          # set by Coach during review
```

## GENERATION APPROACH

### Domain Coverage

Generate capabilities across these domains, weighted by stack relevance:

**Observability** (typically 6-10 capabilities):
- Structured logging (format, correlation IDs, log levels)
- Distributed tracing (instrumentation, propagation, sampling)
- Metrics collection (application, runtime, business)
- Health checks (liveness, readiness, startup probes)
- Alerting and dashboards
- Error tracking and reporting

**Deployment** (typically 5-8 capabilities):
- Container configuration (multi-stage builds, security, resource limits)
- CI/CD pipeline (build, test, deploy stages)
- Rollback strategy
- Environment configuration management
- Infrastructure as code
- Deployment strategy (blue-green, canary, rolling)

**Reliability** (typically 4-6 capabilities):
- Graceful shutdown and connection draining
- Circuit breakers and retry policies
- Rate limiting
- Dependency health monitoring
- Chaos engineering / fault injection readiness

**Security** (typically 3-5 capabilities):
- Secrets management (not hardcoded)
- Dependency vulnerability scanning
- Network policies / service mesh
- Authentication and authorization patterns
- Container image scanning

### Stack-Specific Adjustments

Adjust capabilities based on the Stack Profile:

| Stack Signal | Adjustment |
|-------------|------------|
| **Kubernetes** | Add: liveness/readiness/startup probes, pod disruption budgets, resource requests/limits, network policies |
| **Serverless** | Add: cold start optimization, function timeout config, concurrency limits. Remove: container-specific items |
| **gRPC** | Add: gRPC health checking protocol, reflection API, deadline propagation. Adjust: HTTP health → gRPC health |
| **Docker Compose only** | Reduce orchestration capabilities. Focus: service dependencies, volume persistence, compose health checks |
| **GitHub Actions** | Add: workflow caching, matrix builds, environment protection rules |
| **OpenTelemetry detected** | Adjust: tracing capabilities reference OTel SDK. Add: collector configuration, OTLP export |
| **No observability detected** | Weight observability capabilities higher — these are likely the biggest gaps |
| **AWS** | Add: CloudWatch integration, IAM roles, Security Groups. Adjust: IaC references to Terraform/CDK/CloudFormation |
| **GCP** | Add: Cloud Logging, Cloud Monitoring, Workload Identity. Adjust: IaC references |

### Amendment Handling (GC4 Regeneration)

If previous amendments exist:

1. **Removed capabilities** (`removed: true`): Do NOT regenerate these — the user explicitly removed them
2. **Amended capabilities** (`amended: true`): Keep the user's version unchanged — do not overwrite with regenerated version
3. **New capabilities**: Add alongside preserved amendments
4. **Unchanged capabilities**: Regenerate fresh (may pick up updated descriptions or new web search results)

## OUTPUT

Store the generated capabilities list in working memory for the next step (web enrichment).

Present a brief progress update:

```
Generated [N] capabilities for your [language]/[framework] stack:
- Observability: [n] capabilities
- Deployment: [n] capabilities
- Reliability: [n] capabilities
- Security: [n] capabilities
[If amendments preserved]: Preserved [M] user amendments from previous review.

Enriching with current best practices...
```

---

## NEXT STEP

Load step: {project-root}/_bmad/bme/_gyre/workflows/model-generation/steps/step-03-web-enrichment.md
