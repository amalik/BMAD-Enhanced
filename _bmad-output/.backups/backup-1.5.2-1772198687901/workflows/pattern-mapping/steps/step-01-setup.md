---
step: 1
workflow: pattern-mapping
title: Setup & Input Validation
---

# Step 1: Setup & Input Validation

Before we map any patterns, we need to know exactly what research we're working with and assess whether it's ready for cross-source analysis.

## Why This Matters

One data point is an anecdote, three are a pattern. Pattern mapping only works when you have multiple research streams to compare. This step ensures we have enough material to identify meaningful cross-artifact patterns — and that we understand what each artifact brings to the table.

## What Pattern Mapping Does

Pattern mapping identifies cross-cutting themes and convergent patterns across multiple research artifacts. It's the **reconnaissance before convergence** — you're surveying what's there before committing to a full problem definition.

**How it differs from Research Convergence:**
- **Pattern mapping** identifies patterns (reconnaissance) — "What are the artifacts telling us?"
- **Research convergence** produces a full HC2 problem definition (commitment) — "What is the problem?"

Pattern mapping is lighter-weight. It helps you see whether your research converges before investing in full JTBD framing and Pains & Gains analysis.

### When Pattern Mapping Helps

- **You have 2+ artifacts but haven't synthesized them yet** — you want to see what patterns emerge before committing to full synthesis
- **You suspect convergence but want to validate** — map patterns first to confirm your research streams agree
- **You're identifying gaps before committing** — discover what's missing before running research-convergence

Once patterns are clear, run Mila's **research-convergence** workflow as the next step to produce the full problem definition.

## Your Task

### 1. What Artifacts Do You Have?

Mila accepts two categories of input for pattern mapping:

**Primary: HC1 Empathy Artifacts from Isla**
- Empathy maps (from Isla's `empathy-map` workflow)
- Interview syntheses (from Isla's `user-interview` workflow)
- Observation reports (from Isla's `user-discovery` workflow)

**Also accepted: Any well-formed research input**
- Informal research notes, external reports, prior pattern analyses
- Non-Vortex research from other tools or methodologies
- Minimum **2 artifacts recommended** for meaningful cross-source pattern identification

### 2. List Your Input Artifacts

Please provide the file paths or describe the artifacts you want to analyze. For example:
- `_bmad-output/vortex-artifacts/hc1-empathy-map-busy-parents-2026-02-20.md`
- `_bmad-output/vortex-artifacts/hc1-interview-synthesis-2026-02-21.md`
- Or: "I have interview notes and survey results from an external tool"

### 3. Input Assessment

I'll assess each artifact using the appropriate mode:

**For HC1-conforming artifacts — schema validation:**

*Frontmatter check:*
- `contract: HC1`
- `type: artifact`
- `source_agent` (who produced it)
- `source_workflow` (which workflow)
- `target_agents` includes `mila`
- `input_artifacts` (upstream references)
- `created` (date)

*Body section check:*
- Executive Summary
- Research Context
- Synthesized Insights
- Key Themes
- Pain Points
- Desired Gains
- Recommendations

**For non-HC1 research — structural clarity assessment:**

I'll check for minimal structure without rejecting:
- **Source identification** — author, date, method if known
- **Scope/context** — who was researched, what was studied
- **Findings** — key discoveries
- **Evidence summary** — how strong is the data

**If artifacts are non-conforming:** That's okay — we don't reject research. I'll note which sections are present and which are missing, then ask clarification questions to fill gaps. The data shows that even partial research reveals patterns when we're explicit about what evidence we have and what we're working without.

> For the full HC1 schema reference, see `{project-root}/_bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md`

---

## Your Turn

Please list your input artifacts — file paths, descriptions, or both. I'll assess them and we'll proceed to loading and analysis.

## Next Step

When your artifacts are listed and assessed, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/pattern-mapping/steps/step-02-context.md
