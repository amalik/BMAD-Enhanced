---
step: 2
workflow: stack-detection
title: Classify Stack
---

# Step 2: Classify Stack

Organize scan results into a structured stack classification. Identify ambiguities that require guard questions.

## MANDATORY EXECUTION RULES

- Classification is derived from Step 1 evidence — do NOT introduce new scans here
- If multiple stacks detected (monorepo), select primary and surface secondary as warning (FR1b)
- Identify ambiguities honestly — do not force classification where evidence is unclear
- Confidence levels must reflect actual evidence strength

## CLASSIFICATION PROCESS

### 1. Primary Stack Identification

From the scan results, determine the **primary stack archetype**. Common archetypes:

| Archetype | Indicators |
|-----------|------------|
| Node.js Web Service | package.json + Express/Fastify/Nest + REST endpoints |
| Node.js Frontend App | package.json + React/Vue/Angular/Next.js/Svelte |
| Go Microservice | go.mod + Gin/Echo/Chi + gRPC/REST + container |
| Python Data Pipeline | requirements.txt/pyproject.toml + pandas/spark/airflow |
| Python Web Service | requirements.txt + Django/Flask/FastAPI |
| JVM Enterprise | pom.xml/build.gradle + Spring Boot + container orchestration |
| Rust System Service | Cargo.toml + Actix/Axum/Tokio |
| Ruby Web App | Gemfile + Rails/Sinatra |
| .NET Service | *.csproj + ASP.NET + Azure indicators |
| Multi-language | Multiple primary manifests at different paths |

If the project doesn't fit a known archetype, classify it descriptively rather than forcing a fit.

### 2. Multi-Stack Detection (FR1b)

If multiple package manifests with deployment configs are found at different paths:

- This is a **monorepo or multi-service project**
- List each detected service root with its stack
- **Do NOT attempt implicit boundary detection** from directory naming
- Flag for user selection in Step 3 (or Story 1.5 monorepo handling)

### 3. Confidence Assessment

For each classification category, assign a confidence level:

| Level | Meaning | Criteria |
|-------|---------|----------|
| **high** | Strong evidence from multiple sources | ≥2 confirming indicators, no contradictions |
| **medium** | Evidence exists but could be interpreted differently | 1 strong indicator or multiple weak ones |
| **low** | Inferred from indirect evidence | No direct indicator, classification based on related patterns |
| **none** | No evidence found | Category left blank in profile |

### 4. Ambiguity Identification

Flag categories where guard questions would help:

- **Deployment model ambiguous:** Dockerfile exists but no orchestration detected — could be container-based, serverless-backed, or local-dev-only
- **Communication protocol ambiguous:** Both REST routes and gRPC protos detected — which is primary?
- **Cloud provider ambiguous:** Multiple provider SDKs imported, or IaC references multiple providers
- **Architecture intent unclear:** Evidence points multiple directions (e.g., monolith with microservice-style configs)

Record each ambiguity with: what was detected, why it's ambiguous, and what a guard question would clarify.

## CLASSIFICATION OUTPUT

Present the classification to the user:

```
## Stack Classification

**Primary Archetype:** [e.g., Node.js Web Service on AWS with Kubernetes]

| Category | Classification | Confidence |
|----------|---------------|:----------:|
| Language/Framework | [value] | high/medium/low |
| Container | [value] | high/medium/low |
| Orchestration | [value or "not detected"] | high/medium/low/none |
| CI/CD | [value] | high/medium/low |
| Observability | [value or "not detected"] | high/medium/low/none |
| Cloud Provider | [value] | high/medium/low |
| Communication | [value] | high/medium/low |

**Ambiguities found:** [count]
[List each ambiguity briefly]
```

If secondary stacks were detected, include:

```
⚠️ **Secondary stacks detected:**
- [path]: [stack description]
- [path]: [stack description]

Scout will analyze the primary stack. To analyze a secondary stack, select it explicitly.
```

---

## NEXT STEP

If ambiguities were identified → proceed to guard questions:

Load step: {project-root}/_bmad/bme/_gyre/workflows/stack-detection/steps/step-03-guard-questions.md

If classification is fully unambiguous (all categories high confidence, no contradictions) → skip guard questions and inform the user that detection is complete with high confidence. Proceed to GC1 contract writing (Story 1.4).
