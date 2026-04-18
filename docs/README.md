# Convoke Documentation

Contributor-facing documentation for Convoke. This directory holds reference material — theoretical foundations, development guides, test infrastructure, compatibility notes, and FAQs. Operator-facing docs (the Covenant, per-agent guides shipped inside `_bmad/bme/`) live alongside their code.

> **Authoring a new Convoke skill, workflow, or agent?** Required reading first: [The Convoke Operator Covenant](../_bmad-output/planning-artifacts/convoke-covenant-operator.md) — one axiom ("the operator is the resolver") and seven Operator Rights every Convoke skill must honor. Self-check against the [Covenant Compliance Checklist](../_bmad-output/planning-artifacts/convoke-spec-covenant-compliance-checklist.md) before marking the story ready-for-review. The Covenant is what makes a `_bmad/bme/` skill a *Convoke* skill rather than a generic one.

## Contents

| File | What's inside |
|------|---------------|
| [agents.md](agents.md) | Detailed reference for the Convoke team agents — Vortex (7 streams), Gyre (4 agents), and supporting BME specialists — with workflows, positioning, and how they compose. |
| [development.md](development.md) | Architecture overview, agent/workflow/skill development patterns, and contribution guidelines. Start here if you're changing the codebase. |
| [testing.md](testing.md) | Test suite layout, CI pipeline, and agent validation conventions. Read before adding tests so they land in the right tier. |
| [BMAD-METHOD-COMPATIBILITY.md](BMAD-METHOD-COMPATIBILITY.md) | How Convoke relates to the upstream BMAD Method — namespace boundaries, update strategy, standalone vs extension modes. |
| [references.md](references.md) | Theoretical foundations and bibliography — the Shiftup Innovation Vortex, Lean Startup, JTBD, and the research grounding each stream. |
| [faq.md](faq.md) | Common questions about Convoke, Vortex, Gyre, and adoption decisions. |

## Other entry points

- **[Repository README](../README.md)** — project overview and install instructions for operators.
- **[`_bmad/bme/` README](../_bmad/bme/README.md)** — namespace-level orientation for skill/workflow/agent authors.
- **[`project-context.md`](../project-context.md)** — rules and conventions that BMAD dev agents must follow when working in this repository.
