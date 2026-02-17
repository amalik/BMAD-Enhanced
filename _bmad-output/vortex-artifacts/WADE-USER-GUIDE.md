# Wade User Guide - Lean Experiments Specialist 🧪

**Agent:** Wade (lean-experiments-specialist)
**Version:** 1.2.0
**Module:** BMAD Enhanced (bme) - Vortex Framework
**Last Updated:** 2026-02-17

---

## Quick Start

**Who is Wade?**
Wade is a Lean Startup practitioner specialized in running rapid experiments to validate product hypotheses. He helps teams move from assumptions to evidence through Build-Measure-Learn cycles. Wade guides teams through the "Externalize" stream of the Vortex framework - taking ideas into the real world to test with actual users.

**When to use Wade:**
- Designing Minimum Viable Products (MVPs)
- Running Build-Measure-Learn experiments
- Validating technical feasibility (proof-of-concept)
- Validating business value (proof-of-value)
- Testing assumptions before full buildout
- Rapid iteration and validated learning

**What you'll get:**
Lean experiment artifacts using Build-Measure-Learn methodology - MVP specifications, experiment designs, proof-of-concept results, proof-of-value validations, and validated learning documentation.

---

## How to Invoke Wade

### Method 1: Slash Command (Preferred)

If you're in a BMAD environment that supports slash commands:

```
/bmad-agent-bme-lean-experiments-specialist
```

**When this works:**
- Native BMAD CLI environment
- BMAD-enabled IDEs
- Production BMAD installations

**If you see "Unknown skill":**
This means slash commands aren't available in your environment. Use Method 2 instead.

---

### Method 2: Direct Agent File Reading (Always Works)

In any environment (including Claude Code), you can invoke Wade by reading his agent file:

1. Navigate to your BMAD project root
2. Read the file: `_bmad/bme/_vortex/agents/lean-experiments-specialist.md`
3. Wade will activate and greet you

**Example (Claude Code):**
```
Read the file at _bmad/bme/_vortex/agents/lean-experiments-specialist.md
```

**Example (Terminal):**
```bash
cat _bmad/bme/_vortex/agents/lean-experiments-specialist.md
```

This method has been fully tested and validated.

---

## Wade's Menu Options

Once Wade activates, you'll see menu options for his available workflows:

```
1. [MH] Redisplay Menu Help
2. [CH] Chat with Wade about Lean Startup, experimentation, or validated learning
3. [WM] Wireframe (Legacy): Create UI wireframes (v1.0 workflow - still functional)
4. [VM] Validate Artifact: Review existing artifacts against Lean Startup principles
5. [PM] Start Party Mode
6. [DA] Dismiss Agent
```

### How to Select an Option

**Three ways to choose:**

1. **Number:** Type `3` to select option 3
2. **Command Code:** Type `WM` to create a wireframe
3. **Fuzzy Match:** Type `wireframe` or `create` - Wade will match the command

---

## Wade's Philosophy: Externalization over Speculation

### What is Externalization?

Externalization means taking ideas into the real world to test with actual users. It's about:

1. **Build-Measure-Learn** (Not Plan-Build-Launch)
2. **Test assumptions, don't validate them** (Seek to disprove, not confirm)
3. **Speed-to-insight over perfection** (Fast feedback beats polished guesses)
4. **Actionable metrics, not vanity metrics** (What drives decisions?)
5. **Proof-of-concept before proof-of-value** (Technical feasibility before business case)

### The Externalize Stream (Vortex Framework)

Wade guides teams through the "Externalize" stream:
- **Build the smallest thing that tests the riskiest assumption**
- **Measure what matters** - focus on actionable metrics
- **Learn fast, pivot faster** - every experiment teaches something
- **MVPs are learning tools** - not feature-light products
- **Fail fast is good, learn fast is better**

---

## Current Workflows (v1.2.0)

### [WM] Wireframe (Legacy - v1.0 Workflow)

**Status:** Functional but deprecated. Maintained for backwards compatibility.

**What it does:**
Wade guides you through creating comprehensive wireframes for web and mobile applications using a structured 6-step process.

**When to use:**
- You need quick UI layout planning using familiar wireframe methodology
- You're designing interfaces before high-fidelity design
- You're waiting for v1.4.0+ workflows (mvp, lean-experiment, proof-of-concept, proof-of-value)

**Process:** 6 steps
1. Define Requirements
2. User Flows
3. Information Architecture
4. Wireframe Sketch (ASCII art)
5. Components & Interactions
6. Synthesize

**Output Location:**
`{project-root}/_bmad-output/vortex-artifacts/wireframe-{screen-name}-{date}.md`

**Time:** 20-30 minutes

**Important:** This workflow uses traditional wireframe design methodology. For Lean Startup-focused workflows aligned with the Vortex framework, see "Coming in v1.4.0+" section below.

---

## Coming in v1.4.0+

Wade's new Externalize stream workflows are planned for v1.4.0:

### [MVP] Minimum Viable Product
Design MVP specifications using Build-Measure-Learn methodology.

**Output:** MVP specification document
**Focus:** Smallest testable version, hypothesis validation, success metrics
**Principle:** Build only what's needed to test the riskiest assumption

### [LE] Lean Experiment
Execute Build-Measure-Learn cycles with structured hypothesis testing.

**Output:** Experiment results document
**Focus:** Hypothesis → Experiment → Measure → Learn → Decide (pivot/persevere)
**Principle:** Every experiment must have a falsifiable hypothesis

### [POC] Proof-of-Concept
Validate technical feasibility before investing in business case.

**Output:** PoC results document
**Focus:** Can we build this? Technical validation, risk assessment
**Principle:** Prove technical viability before proving business value

### [POV] Proof-of-Value
Validate business value and market demand.

**Output:** PoV results document
**Focus:** Should we build this? Business case validation, market validation
**Principle:** Technical feasibility doesn't guarantee business success

**Note:** These workflows are being designed to fully align with Lean Startup methodologies and the Vortex framework's Externalize stream.

---

## Understanding the Legacy Wireframe Workflow

*This section describes the current v1.0 wireframe workflow. For the full detailed guide, see the v1.0 documentation.*

### Quick Overview

1. **Define Requirements** (2-3 min)
   - Screen scope, platform, target user, core functionality, constraints

2. **User Flows** (3-5 min)
   - Entry points, happy path, alternative flows, exit points

3. **Information Architecture** (3-5 min)
   - Visual hierarchy, content grouping, navigation patterns, information density

4. **Wireframe Sketch** (5-10 min)
   - ASCII art layout, grid system, component placement, typography hierarchy

5. **Components & Interactions** (5-7 min)
   - Component identification, specifications, interactions, responsive breakpoints

6. **Synthesize** (1-2 min)
   - Generate final wireframe artifact
   - Save to output folder

**Key Principles:**
- Wireframes answer three questions: Where am I? What can I do? Where can I go?
- Low-fidelity (ASCII art) for fast iteration
- Mobile-first design approach
- WCAG 2.1 Level AA accessibility compliance

---

## Chatting with Wade (CH)

Select **[CH] Chat** to have a free-form conversation with Wade about:

- Lean Startup methodologies
- Build-Measure-Learn cycles
- Hypothesis testing and experimentation
- MVP design and validation
- Validated learning
- Proof-of-concept vs proof-of-value
- Rapid prototyping
- Actionable metrics

**Example questions:**
- "How do I design an MVP that tests my riskiest assumption?"
- "What's the difference between proof-of-concept and proof-of-value?"
- "How do I write a falsifiable hypothesis?"
- "What metrics should I track in a lean experiment?"
- "When should I pivot vs. persevere?"

---

## Validating Artifacts (VM)

Select **[VM] Validate** to review existing artifacts against Lean Startup principles.

**When to use this:**
- You created an artifact and want expert review
- You inherited artifacts from another team
- Your experimental results changed and you need to update
- You're preparing to present to stakeholders

**What Wade checks:**
- Are hypotheses falsifiable and specific?
- Are success metrics actionable (not vanity metrics)?
- Is the MVP truly minimal (smallest testable version)?
- Are experimental results clearly documented?
- Can this guide decision-making (pivot or persevere)?

---

## Party Mode (PM)

Select **[PM] Party Mode** to bring Wade into a multi-agent collaboration session.

**When to use this:**
- You need multiple BMAD agents working together
- Example: Emma (contextualization) + Wade (experiments) + Quinn (quality review)

**How it works:**
- Wade joins a group discussion with other agents
- Each agent contributes their expertise
- Agents collaborate naturally on complex tasks

**Powerful Combo: Emma + Wade**
- Emma contextualizes the problem space (Who? What? Why?)
- Wade designs experiments to validate assumptions
- Together they ensure you're building the right thing, not just building things right

---

## Troubleshooting

### Error: "Configuration Error: Cannot load config file"

**What it means:**
Wade can't find or read the config file at `_bmad/bme/_vortex/config.yaml`

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

### Error: "Unknown skill: bmad-agent-bme-lean-experiments-specialist"

**What it means:**
Slash commands aren't available in your environment.

**How to fix:**
Use Method 2 (Direct Agent File Reading) instead:

1. Read the file: `_bmad/bme/_vortex/agents/lean-experiments-specialist.md`
2. Wade will activate normally
3. This method is fully tested and works in all environments

**Note:** This is NOT an error with Wade - it's an environment limitation.

---

## Tips from Wade

### "Build the smallest thing that tests the riskiest assumption"

Don't build a full product to test if users want it. Build the smallest experiment that answers your biggest question. Sometimes that's a landing page, not an app.

### "Measure what matters"

Vanity metrics look good but don't drive decisions. Actionable metrics tell you what to do next. Instead of "page views," track "% who signed up after viewing pricing."

### "Learn fast, pivot faster"

Every experiment teaches something, even failures. The goal isn't to validate your idea - it's to learn what's true. Be willing to pivot when evidence contradicts assumptions.

### "Proof-of-concept before proof-of-value"

Can you build it? Doesn't mean should you build it. Validate technical feasibility first, then validate business case. Don't waste money proving market demand for something you can't deliver.

### "Fail fast is good, learn fast is better"

Failure is only valuable if you learn from it. Document what you learned, why experiments failed, and what that means for your next move. Failure without learning is just waste.

---

## Migration Guide (v1.0 → v1.2.0)

### What Changed

**v1.0.0 (DesignOS):**
- Agent: wireframe-designer
- Module: `_bmad/bme/_designos/`
- Focus: Wireframe design, UX, information architecture
- Output: `_bmad-output/design-artifacts/`

**v1.2.0 (Vortex Framework):**
- Agent: lean-experiments-specialist
- Module: `_bmad/bme/_vortex/`
- Focus: Lean Startup, experimentation, validated learning
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
   - Old: `_bmad/bme/_designos/agents/wireframe-designer.md`
   - New: `_bmad/bme/_vortex/agents/lean-experiments-specialist.md`

4. **Update output references:**
   - Old: `_bmad-output/design-artifacts/`
   - New: `_bmad-output/vortex-artifacts/`

### Backwards Compatibility

- Legacy wireframe workflow still functional in v1.2.0
- Old artifacts remain valid and accessible
- New Lean Startup workflows coming in v1.4.0+

---

## Roadmap

**v1.2.0 (Current):**
- ✅ Agent repositioned as Lean Experiments Specialist
- ✅ Module renamed to _vortex (Vortex Framework)
- ✅ Legacy wireframe workflow maintained
- ✅ User guide updated

**v1.3.0 (Planned):**
- Update/migration tooling
- Automated update scripts

**v1.4.0+ (Planned):**
- New Externalize stream workflows:
  - [MVP] Minimum Viable Product
  - [LE] Lean Experiment
  - [POC] Proof-of-Concept
  - [POV] Proof-of-Value
- Full Vortex Framework implementation

---

## Getting Help

### Need help using Wade?

1. **Chat with Wade (CH):** Ask him questions about Lean Startup and experimentation
2. **Read this guide:** Most questions are answered here
3. **Check troubleshooting section:** Common errors and solutions

### Found a bug or issue?

1. **Check if it's an environment limitation:** Some features (like slash commands) may not work in all environments
2. **Report the issue:** Provide Wade's version (1.2.0), your environment, and steps to reproduce

### Want to learn more?

**Wade's expertise includes:**
- Lean Startup methodology
- Build-Measure-Learn cycles
- Hypothesis testing
- MVP design and validation
- Rapid experimentation
- Proof-of-concept and proof-of-value
- Validated learning
- Pivot or persevere decisions

**Ask Wade (CH) about any of these topics!**

---

## Version History

**v1.2.0 (2026-02-17)**
- Agent repositioned as Lean Experiments Specialist (Lean Startup focus)
- Module renamed from _designos to _vortex (Vortex Framework)
- Output folder moved to vortex-artifacts
- Updated documentation to reflect experimentation and validated learning
- Legacy wireframe workflow maintained for backwards compatibility
- Roadmap added for v1.4.0+ Externalize stream workflows

**v1.0.0 (2026-02-14)**
- Initial release as Wireframe Designer
- 6-step wireframe creation workflow
- ASCII art visualization
- WCAG 2.1 Level AA accessibility
- Responsive design patterns
- Config-driven personalization
- Validation workflow (VM)
- Party mode integration (PM)

---

## Credits

**Agent:** Wade (lean-experiments-specialist)
**Module:** BMAD Enhanced (bme)
**Submodule:** Vortex Framework (_vortex)
**Framework:** BMAD Agent Architecture Framework v1.1.0
**Methodology:** Lean Startup, Build-Measure-Learn

---

**Questions?** Chat with Wade (CH) - he's here to help you run lean experiments and validate your assumptions! 🧪
