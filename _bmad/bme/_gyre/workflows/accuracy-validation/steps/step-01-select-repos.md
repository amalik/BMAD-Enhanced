---
step: 1
workflow: accuracy-validation
title: Select Ground Truth Repos
---

# Step 1: Select Ground Truth Repos

Choose ≥3 synthetic ground truth repositories representing diverse stack archetypes.

## MANDATORY EXECUTION RULES

- Select repos that are well-known, publicly available, and representative of their archetype
- Each repo must have a DIFFERENT primary language AND deployment pattern
- Do NOT use toy projects — repos must have real production-grade structure

## RECOMMENDED ARCHETYPES

Select at least 3 from:

| # | Archetype | Example Repo | Stack Signature |
|---|-----------|-------------|-----------------|
| 1 | Go microservice on K8s | CNCF project (e.g., CoreDNS, Prometheus) | Go + gRPC/REST + Kubernetes + Prometheus |
| 2 | Node.js web service | Express/Fastify API with Docker | Node.js + REST + Docker + GitHub Actions |
| 3 | Python data pipeline | Airflow DAG or FastAPI service | Python + Celery/Airflow + Docker Compose |
| 4 | JVM enterprise service | Spring Boot with Gradle | Java + REST + Maven/Gradle + Jenkins |
| 5 | Rust system service | Actix/Axum with monitoring | Rust + REST + Docker + CI/CD |

## SELECTION PROCESS

1. Present the archetype options to the user
2. User selects ≥3 (or accepts the recommended set)
3. For each selected archetype, confirm the specific repo or let Atlas use a synthetic profile

**Synthetic profile option:** If specific repos are unavailable, Atlas can generate capabilities based on the archetype description alone (the Stack Profile simulates what Scout would produce). Note this in the results as "synthetic profile" vs "live repo".

## OUTPUT

Record selections as a table:

```
## Selected Archetypes

| # | Archetype | Repo/Profile | Method |
|---|-----------|-------------|--------|
| 1 | [archetype] | [repo URL or "synthetic"] | [live scan / synthetic profile] |
| 2 | [archetype] | [repo URL or "synthetic"] | [live scan / synthetic profile] |
| 3 | [archetype] | [repo URL or "synthetic"] | [live scan / synthetic profile] |
```

---

## NEXT STEP

Load step: {project-root}/_bmad/bme/_gyre/workflows/accuracy-validation/steps/step-02-run-validation.md
