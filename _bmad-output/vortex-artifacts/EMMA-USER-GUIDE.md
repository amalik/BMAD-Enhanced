# Emma User Guide - Contextualization Expert 🎯

**Agent:** Emma (contextualization-expert)
**Version:** 1.2.0
**Module:** BMAD Enhanced (bme) - Vortex Framework
**Last Updated:** 2026-02-17

---

## Quick Start

**Who is Emma?**
Emma is a Lean Startup expert who helps teams contextualize their product strategy by defining clear problem spaces and validating assumptions. She guides you through strategic framing, problem-product space navigation, and the critical "Contextualize" stream of the Vortex framework.

**When to use Emma:**
- Defining product vision and strategy
- Creating lean user personas (jobs-to-be-done focused)
- Clarifying which problem space to investigate
- Challenging assumptions before building
- Aligning teams around the "why" before the "what"
- Validating problem-solution fit

**What you'll get:**
Strategic framing artifacts using Lean Startup methodologies - personas focused on jobs-to-be-done, product vision documents, problem scope definitions, and validation frameworks.

---

## How to Invoke Emma

### Method 1: Slash Command (Preferred)

If you're in a BMAD environment that supports slash commands:

```
/bmad-agent-bme-contextualization-expert
```

**When this works:**
- Native BMAD CLI environment
- BMAD-enabled IDEs
- Production BMAD installations

**If you see "Unknown skill":**
This means slash commands aren't available in your environment. Use Method 2 instead.

---

### Method 2: Direct Agent File Reading (Always Works)

In any environment (including Claude Code), you can invoke Emma by reading her agent file:

1. Navigate to your BMAD project root
2. Read the file: `_bmad/bme/_vortex/agents/contextualization-expert.md`
3. Emma will activate and greet you

**Example (Claude Code):**
```
Read the file at _bmad/bme/_vortex/agents/contextualization-expert.md
```

**Example (Terminal):**
```bash
cat _bmad/bme/_vortex/agents/contextualization-expert.md
```

This method has been fully tested and validated.

---

## Emma's Menu Options

Once Emma activates, you'll see menu options for her available workflows:

```
1. [MH] Redisplay Menu Help
2. [CH] Chat with Emma about Lean Startup, strategic framing, or problem-product space navigation
3. [EM] Empathy Map (Legacy): Create user empathy maps (v1.0 workflow - still functional)
4. [VM] Validate Artifact: Review existing artifacts against Lean Startup principles
5. [PM] Start Party Mode
6. [DA] Dismiss Agent
```

### How to Select an Option

**Three ways to choose:**

1. **Number:** Type `3` to select option 3
2. **Command Code:** Type `EM` to create an empathy map
3. **Fuzzy Match:** Type `empathy` or `map` or `create` - Emma will match the command

---

## Emma's Philosophy: Contextualization over Assumptions

### What is Contextualization?

Contextualization means defining clear problem and product spaces before building solutions. It's about:

1. **Who is this truly for?** (Not demographics - jobs-to-be-done and problem contexts)
2. **What are we really solving?** (Problem space boundaries and scope)
3. **Why does this matter?** (Strategic vision and alignment)
4. **What assumptions need validation?** (Every belief is a hypothesis until tested)

### The Contextualize Stream (Vortex Framework)

Emma guides teams through the "Contextualize" stream:
- **Problem-solution fit before product-market fit**
- **Vision before features** - align on the "why" before the "what"
- **Challenge assumptions ruthlessly** - unvalidated beliefs are risks
- **Personas over demographics** - focus on jobs-to-be-done, not age/gender
- **Clarity before action** - strategic framing prevents wasted effort

---

## Current Workflows (v1.2.0)

### [EM] Empathy Map (Legacy - v1.0 Workflow)

**Status:** Functional but deprecated. Maintained for backwards compatibility.

**What it does:**
Emma guides you through creating comprehensive empathy maps for target users using a structured 6-step process.

**When to use:**
- You need quick user insights using familiar empathy mapping framework
- You have user research data to synthesize
- You're waiting for v1.4.0+ workflows (lean-persona, product-vision, contextualize-scope)

**Process:** 6 steps
1. Define Target User
2. Says & Thinks
3. Does & Feels
4. Pain Points
5. Gains
6. Synthesize

**Output Location:**
`{project-root}/_bmad-output/vortex-artifacts/empathy-map-{user-name}-{date}.md`

**Time:** 30-60 minutes

**Important:** This workflow uses traditional empathy mapping methodology. For Lean Startup-focused workflows aligned with the Vortex framework, see "Coming in v1.4.0+" section below.

---

## Coming in v1.4.0+

Emma's new Contextualize stream workflows are planned for v1.4.0:

### [LP] Lean Persona
Create lean user personas focused on jobs-to-be-done and problem contexts (not demographics).

**Output:** Lean persona document
**Focus:** Jobs-to-be-done, context, problems (vs. age, gender, fictional details)

### [PV] Product Vision
Define product vision and scope with strategic clarity.

**Output:** Product vision document
**Focus:** Strategic vision, alignment, the "why" before the "what"

### [CS] Contextualize Scope
Decide which problem space to investigate and define boundaries.

**Output:** Problem scope document
**Focus:** Problem space boundaries, scope definition, assumption identification

**Note:** These workflows are being designed to fully align with Lean Startup methodologies and the Vortex framework's Contextualize stream.

---

## Understanding the Legacy Empathy Map Workflow

*This section describes the current v1.0 empathy-map workflow. For the full detailed guide, see the v1.0 documentation.*

### Quick Overview

1. **Define Target User** (5 min)
   - Demographics, job-to-be-done, context, research sources

2. **Says & Thinks** (10 min)
   - What they SAY (direct quotes)
   - What they THINK (inferred thoughts)

3. **Does & Feels** (10 min)
   - What they DO (observable actions)
   - What they FEEL (emotional states)

4. **Pain Points** (10 min)
   - 4-6 pain points with impact and evidence

5. **Gains** (10 min)
   - 4-6 desired outcomes with value and success metrics

6. **Synthesize** (5 min)
   - Generate final empathy map artifact
   - Save to output folder

**Best Practices:**
- Ground every insight in research evidence (quotes, observations, data)
- Be specific (not "users" but "34-year-old marketing managers")
- Make pain points concrete (not "bad UX" but "can't find transfer button")
- Make gains measurable (not "faster" but "check balance in <5 seconds")

---

## Chatting with Emma (CH)

Select **[CH] Chat** to have a free-form conversation with Emma about:

- Lean Startup methodologies
- Strategic framing and product vision
- Problem-product space navigation
- Jobs-to-be-Done framework
- Assumption validation
- Contextualization strategies
- User research best practices

**Example questions:**
- "How do I validate assumptions before building?"
- "What's the difference between problem-solution fit and product-market fit?"
- "How do I define a problem space?"
- "What makes a good lean persona vs. a traditional persona?"

---

## Validating Artifacts (VM)

Select **[VM] Validate** to review existing artifacts against Lean Startup principles.

**When to use this:**
- You created an artifact and want expert review
- You inherited artifacts from another team
- Your understanding has changed and you need to update
- You're preparing to present to stakeholders

**What Emma checks:**
- Are insights backed by research evidence?
- Are assumptions clearly identified?
- Are hypotheses testable?
- Is the target user/problem specific enough?
- Can this guide decision-making?

---

## Party Mode (PM)

Select **[PM] Party Mode** to bring Emma into a multi-agent collaboration session.

**When to use this:**
- You need multiple BMAD agents working together
- Example: Emma (contextualization) + Wade (experiments) + Quinn (quality review)

**How it works:**
- Emma joins a group discussion with other agents
- Each agent contributes their expertise
- Agents collaborate naturally on complex tasks

---

## Troubleshooting

### Error: "Configuration Error: Cannot load config file"

**What it means:**
Emma can't find or read the config file at `_bmad/bme/_vortex/config.yaml`

**How to fix:**

1. **Check if file exists:**
   ```bash
   ls _bmad/bme/_vortex/config.yaml
   ```

2. **If missing, reinstall:**
   ```bash
   npm install bmad-enhanced@latest
   npx bmad-install-agents
   ```

3. **Verify YAML syntax:**
   - No tabs (use spaces)
   - Proper indentation
   - Quotes around string values

---

### Error: "Unknown skill: bmad-agent-bme-contextualization-expert"

**What it means:**
Slash commands aren't available in your environment.

**How to fix:**
Use Method 2 (Direct Agent File Reading) instead:

1. Read the file: `_bmad/bme/_vortex/agents/contextualization-expert.md`
2. Emma will activate normally
3. This method is fully tested and works in all environments

**Note:** This is NOT an error with Emma - it's an environment limitation.

---

## Tips from Emma

### "Challenge assumptions ruthlessly"

Every belief about your product, users, or market is an assumption until validated. Before you build, ask: "What evidence do we have?" If the answer is "we think" or "we believe," you have a hypothesis that needs testing.

### "Personas over demographics"

Age, gender, and income don't drive behavior - jobs-to-be-done and context do. Instead of "millennials," ask "what job are they hiring your product to do?"

### "Vision before features"

Align your team around the "why" before you debate the "what." A clear product vision prevents feature bloat and scope creep.

### "Problem-solution fit comes first"

Before you find product-market fit, validate problem-solution fit. Are you solving a real problem? For the right people? In the right context?

### "Clarity is kindness"

Unclear product strategy wastes everyone's time. Be specific about problem spaces, target users, and success criteria. Clarity accelerates execution.

---

## Migration Guide (v1.0 → v1.2.0)

### What Changed

**v1.0.0 (DesignOS):**
- Agent: empathy-mapper
- Module: `_bmad/bme/_designos/`
- Focus: Empathy mapping, design thinking
- Output: `_bmad-output/design-artifacts/`

**v1.2.0 (Vortex Framework):**
- Agent: contextualization-expert
- Module: `_bmad/bme/_vortex/`
- Focus: Lean Startup, strategic framing, contextualization
- Output: `_bmad-output/vortex-artifacts/`

### How to Update

1. **Update package:**
   ```bash
   npm install bmad-enhanced@latest
   ```

2. **Reinstall agents:**
   ```bash
   npx bmad-install-agents
   ```

3. **Update activation path:**
   - Old: `_bmad/bme/_designos/agents/empathy-mapper.md`
   - New: `_bmad/bme/_vortex/agents/contextualization-expert.md`

4. **Update output references:**
   - Old: `_bmad-output/design-artifacts/`
   - New: `_bmad-output/vortex-artifacts/`

### Backwards Compatibility

- Legacy empathy-map workflow still functional in v1.2.0
- Old artifacts remain valid and accessible
- New Lean Startup workflows coming in v1.4.0+

---

## Roadmap

**v1.2.0 (Current):**
- ✅ Agent repositioned as Contextualization Expert
- ✅ Module renamed to _vortex (Vortex Framework)
- ✅ Legacy empathy-map workflow maintained
- ✅ User guide updated

**v1.3.0 (Planned):**
- Update/migration tooling
- Automated update scripts

**v1.4.0+ (Planned):**
- New Contextualize stream workflows:
  - [LP] Lean Persona
  - [PV] Product Vision
  - [CS] Contextualize Scope
- Full Vortex Framework implementation

---

## Getting Help

### Need help using Emma?

1. **Chat with Emma (CH):** Ask her questions about Lean Startup and contextualization
2. **Read this guide:** Most questions are answered here
3. **Check troubleshooting section:** Common errors and solutions

### Found a bug or issue?

1. **Check if it's an environment limitation:** Some features (like slash commands) may not work in all environments
2. **Report the issue:** Provide Emma's version (1.2.0), your environment, and steps to reproduce

### Want to learn more?

**Emma's expertise includes:**
- Lean Startup methodology
- Jobs-to-be-Done framework
- Strategic framing and product vision
- Problem-product space navigation
- Assumption validation
- Contextualization strategies

**Ask Emma (CH) about any of these topics!**

---

## Version History

**v1.2.0 (2026-02-17)**
- Agent repositioned as Contextualization Expert (Lean Startup focus)
- Module renamed from _designos to _vortex (Vortex Framework)
- Output folder moved to vortex-artifacts
- Updated documentation to reflect strategic framing and contextualization
- Legacy empathy-map workflow maintained for backwards compatibility
- Roadmap added for v1.4.0+ Contextualize stream workflows

**v1.0.0 (2026-02-14)**
- Initial release as Empathy Mapping Specialist
- 6-step empathy mapping workflow
- Config-driven personalization
- Comprehensive error handling
- Validation workflow (VM)
- Party mode integration (PM)

---

## Credits

**Agent:** Emma (contextualization-expert)
**Module:** BMAD Enhanced (bme)
**Submodule:** Vortex Framework (_vortex)
**Framework:** BMAD Agent Architecture Framework v1.1.0
**Methodology:** Lean Startup, Jobs-to-be-Done

---

**Questions?** Chat with Emma (CH) - she's here to help you contextualize your product strategy! 🎯
