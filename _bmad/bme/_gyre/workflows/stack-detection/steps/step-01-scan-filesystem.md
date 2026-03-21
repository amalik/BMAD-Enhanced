---
step: 1
workflow: stack-detection
title: Scan Filesystem
---

# Step 1: Scan Filesystem

Discover technology indicators by examining the project's files. All detection is static — no code execution, no dependency installation.

## MANDATORY EXECUTION RULES

- Use Claude Code tools (Glob, Grep, Read) — do NOT ask the user to provide this information
- Report findings with evidence — every detection must cite a specific file or pattern
- Do NOT read file contents into the Stack Profile — only record technology categories
- Scan breadth-first: discover what exists before diving deep into any single technology

## SCAN SEQUENCE

Execute the following scans. For each category, record what was found and what was NOT found.

### 1. Package Manifests (Primary Language/Framework)

**Glob** for these files at project root and one level deep:
- `package.json`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml` → Node.js ecosystem
- `go.mod`, `go.sum` → Go
- `requirements.txt`, `setup.py`, `pyproject.toml`, `Pipfile`, `poetry.lock` → Python
- `Cargo.toml`, `Cargo.lock` → Rust
- `pom.xml`, `build.gradle`, `build.gradle.kts` → Java/Kotlin (JVM)
- `Gemfile`, `Gemfile.lock` → Ruby
- `composer.json` → PHP
- `*.csproj`, `*.sln` → .NET/C#
- `mix.exs` → Elixir
- `pubspec.yaml` → Dart/Flutter

**Read** the primary manifest to identify:
- Framework (e.g., Express, Next.js, Django, Spring Boot, Rails, Gin, Actix)
- Key dependencies that indicate architecture choices

### 2. Container & Orchestration

**Glob** for:
- `Dockerfile`, `Dockerfile.*`, `*.dockerfile` → Container usage
- `docker-compose.yaml`, `docker-compose.yml`, `compose.yaml` → Docker Compose
- `k8s/`, `kubernetes/`, `manifests/`, `helm/`, `charts/` → Kubernetes
- `ecs-task-definition.json`, `apprunner.yaml` → AWS ECS/App Runner
- `fly.toml` → Fly.io
- `render.yaml` → Render
- `Procfile` → Heroku-style platforms

### 3. CI/CD Platform

**Glob** for:
- `.github/workflows/*.yml`, `.github/workflows/*.yaml` → GitHub Actions
- `.gitlab-ci.yml` → GitLab CI
- `Jenkinsfile` → Jenkins
- `.circleci/config.yml` → CircleCI
- `azure-pipelines.yml` → Azure DevOps
- `bitbucket-pipelines.yml` → Bitbucket Pipelines
- `.travis.yml` → Travis CI

### 4. Observability Tooling

**Grep** across the project for:
- `opentelemetry`, `@opentelemetry`, `otel` → OpenTelemetry
- `prometheus`, `prom-client` → Prometheus
- `datadog`, `dd-trace` → Datadog
- `newrelic` → New Relic
- `sentry` → Sentry (error tracking)
- `grafana` → Grafana
- `elastic`, `elasticsearch`, `kibana` → ELK Stack
- `winston`, `pino`, `bunyan`, `log4j`, `logback`, `zap`, `zerolog` → Structured logging

**Glob** for config files:
- `otel-collector-config.yaml` → OpenTelemetry Collector
- `prometheus.yml` → Prometheus config
- `datadog.yaml` → Datadog Agent config

### 5. Cloud Provider

**Glob** for:
- `terraform/`, `*.tf` → Terraform (then **Grep** for `provider "aws"`, `provider "google"`, `provider "azurerm"`)
- `cloudformation/`, `template.yaml`, `template.json` → AWS CloudFormation
- `pulumi/`, `Pulumi.yaml` → Pulumi
- `serverless.yml`, `serverless.yaml` → Serverless Framework
- `cdk.json` → AWS CDK
- `firebase.json` → Firebase/GCP
- `app.yaml` (with `runtime:`) → Google App Engine

**Grep** for provider SDK imports:
- `aws-sdk`, `@aws-sdk`, `boto3` → AWS
- `@google-cloud`, `google.cloud` → GCP
- `@azure`, `azure-` → Azure

### 6. Communication Protocol

**Grep** for:
- `*.proto` files, `grpc`, `@grpc` → gRPC
- `graphql`, `apollo`, `@apollo` → GraphQL
- `express`, `fastify`, `gin`, `flask`, `django.urls`, REST patterns → HTTP/REST
- `amqp`, `rabbitmq`, `@nestjs/microservices` → Message queues (AMQP)
- `kafka`, `kafkajs` → Apache Kafka
- `redis`, `ioredis`, `bull` → Redis (pub/sub or queues)
- `socket.io`, `ws`, `websocket` → WebSocket

### 7. Monorepo / Multi-Service Detection (FR1b, FR51)

After completing scans 1-6, check if the project contains multiple independent services:

**Detection criteria:** A service root is a directory that contains BOTH:
- Its own package manifest (package.json, go.mod, requirements.txt, etc.)
- Its own deployment config (Dockerfile, k8s manifest, serverless.yml, etc.)

**Glob** for package manifests at depth 1-2:
- `*/package.json`, `*/go.mod`, `*/requirements.txt`, `*/Cargo.toml`, `*/pom.xml`
- `*/*/package.json`, `*/*/go.mod`, etc. (for `services/api/`, `packages/worker/` patterns)

For each manifest found, check if a deployment config exists in the same directory or its parent.

**If ≥2 service roots detected:**

Present the services conversationally and ask the user to select one:

```
I detected multiple services in this project:

| # | Service Root | Language | Has Deployment Config |
|---|-------------|----------|----------------------|
| 1 | services/api/ | Node.js | Dockerfile |
| 2 | services/worker/ | Python | Dockerfile |
| 3 | services/gateway/ | Go | k8s manifest |

Which service would you like to analyze? (number or name)

Note: Each service gets its own `.gyre/` directory at its root.
```

**Rules:**
- Do NOT attempt implicit boundary detection from directory naming conventions (e.g., don't assume `packages/` means services)
- Only flag directories with BOTH a manifest AND deployment config
- The selected service root becomes the analysis scope — all subsequent steps target that root
- `.gyre/` directory is created at the selected service root, not the project root

**If single service (or monorepo with shared deployment):**
- Continue with the project root as analysis scope
- `.gyre/` directory at project root

## FINDINGS COMPILATION

After all scans complete (and service root selected, if monorepo), compile findings into a structured summary for the user:

```
## Stack Detection Results

| Category | Detected | Evidence |
|----------|----------|----------|
| Language/Framework | [e.g., Node.js / Next.js] | [e.g., package.json found] |
| Container | [e.g., Docker + Compose] | [e.g., Dockerfile, docker-compose.yaml] |
| Orchestration | [e.g., Kubernetes] | [e.g., k8s/ directory with manifests] |
| CI/CD | [e.g., GitHub Actions] | [e.g., .github/workflows/] |
| Observability | [e.g., OpenTelemetry + Prometheus] | [e.g., otel imports in deps] |
| Cloud Provider | [e.g., AWS] | [e.g., terraform provider "aws"] |
| Communication | [e.g., HTTP/REST + gRPC] | [e.g., express routes + .proto files] |

**Not detected:** [list categories with no evidence found]
```

Present these findings to the user conversationally, explaining what was found and what wasn't.

---

## NEXT STEP

Store scan results in working memory and proceed to:

Load step: {project-root}/_bmad/bme/_gyre/workflows/stack-detection/steps/step-02-classify-stack.md
