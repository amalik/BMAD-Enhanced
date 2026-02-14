# Emma User Guide - Empathy Mapping Specialist 🎨

**Agent:** Emma (empathy-mapper)
**Version:** 1.0.0
**Module:** BMAD Enhanced (bme)
**Last Updated:** 2026-02-14

---

## Quick Start

**What is Emma?**
Emma is a design thinking expert who guides you through creating comprehensive empathy maps for your target users. She helps you understand user needs, emotions, and pain points through a structured 6-step process.

**When to use Emma:**
- Starting a new product or feature design
- Trying to understand user pain points
- Creating user personas based on research
- Aligning your team on user needs
- Validating design decisions with user insights

**What you'll get:**
A professional empathy map document with user insights, pain points, desired gains, and design implications.

---

## How to Invoke Emma

### Method 1: Slash Command (Preferred)

If you're in a BMAD environment that supports slash commands:

```
/bmad-agent-bme-empathy-mapper
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
2. Read the file: `_bmad/bme/_designos/agents/empathy-mapper.md`
3. Emma will activate and greet you

**Example (Claude Code):**
```
Read the file at _bmad/bme/_designos/agents/empathy-mapper.md
```

**Example (Terminal):**
```bash
cat _bmad/bme/_designos/agents/empathy-mapper.md
```

This method has been fully tested and validated.

---

## Emma's Menu Options

Once Emma activates, you'll see 6 menu options:

```
1. [MH] Redisplay Menu Help
2. [CH] Chat with Emma about empathy mapping, user research, or design thinking
3. [EM] Create Empathy Map: Guided 6-step process to create comprehensive user empathy map
4. [VM] Validate Empathy Map: Review existing empathy map against research evidence
5. [PM] Start Party Mode
6. [DA] Dismiss Agent
```

### How to Select an Option

**Three ways to choose:**

1. **Number:** Type `3` to select option 3
2. **Command Code:** Type `EM` to create an empathy map
3. **Fuzzy Match:** Type `empathy` or `map` or `create` - Emma will match the command

---

## Creating an Empathy Map (EM)

### Overview

Emma guides you through 6 steps to create a comprehensive empathy map:

1. **Define Target User** - Who are you creating this for?
2. **Says & Thinks** - What do they say aloud? What do they think privately?
3. **Does & Feels** - What actions do they take? What emotions do they feel?
4. **Pain Points** - What frustrates or challenges them?
5. **Gains** - What do they want to achieve?
6. **Synthesize** - Create the final empathy map artifact

**Estimated Time:** 30-60 minutes (depending on research depth)

---

### Step 1: Define Target User

Emma will ask you to define:

- **Demographics:** Age, occupation, tech savviness, context
- **Job-to-be-done:** What are they trying to accomplish?
- **Context:** When and where are they using your product?
- **Research Sources:** What evidence informs this empathy map?

**Example:**
```
Target User: Sarah, 34-year-old marketing manager
Job-to-be-done: Manage personal finances through mobile banking
Context: Daily usage, 3-5 times per day, sessions under 2 minutes
Research: User interview (45 min), behavioral observation data
```

**Tip:** The more specific, the better. "Mobile app users" is too broad. "Busy parents managing kids' schedules on mobile" is specific and actionable.

---

### Step 2: Says & Thinks

Emma will ask for:

**What they SAY (3-5 direct quotes from research):**
- Pull actual quotes from interviews, surveys, or conversations
- Include both positive and negative statements
- Use their exact words when possible

**What they THINK (3-5 inferred thoughts):**
- Based on behavior, tone, and context
- What they're thinking but not saying
- Infer from evidence, don't speculate

**Example:**
```
SAYS:
- "I just want to check my balance quickly"
- "The app is pretty, but I can't find basic features"

THINKS:
- "If this takes more than 30 seconds, I'm giving up"
- "I'm constantly anxious about being logged out mid-transaction"
```

---

### Step 3: Does & Feels

Emma will ask for:

**What they DO (3-5 observable actions):**
- Specific behaviors and habits
- Include frequency/timing when relevant
- Note workarounds or "hacks" they've created

**What they FEEL (3-5 emotional states):**
- Use emotion words (frustrated, anxious, excited, relieved)
- Link emotions to specific moments or contexts
- Note intensity (mildly annoyed vs. deeply frustrated)

**Example:**
```
DOES:
- Opens mobile banking app 3-5 times per day
- Keeps sessions under 2 minutes (quick checks)
- Abandons transactions if auth takes >30 seconds

FEELS:
- Frustrated by multi-step authentication
- Anxious about being logged out mid-transaction
- Secure with biometric auth, insecure about session stability
```

---

### Step 4: Pain Points

Emma will ask you to identify 4-6 pain points with:

1. **The Pain** - What's the problem?
2. **The Impact** - How does it affect them?
3. **The Evidence** - What research supports this?

**Example:**
```
Pain #1: Multi-Step Authentication Friction
- Impact: Abandons transactions if auth takes >30 seconds
- Evidence: "I just want to check my balance quickly - why do I
  need to enter a password AND a code from my phone?"
```

**Tip:** Be specific. Not "Bad UX" but "Button to create campaign is hidden in nested menu."

---

### Step 5: Gains (Desired Outcomes)

Emma will ask you to identify 4-6 gains with:

1. **The Gain** - What do they want to achieve?
2. **The Value** - Why does this matter to them?
3. **Success Metric** - How would they know they achieved it?

**Example:**
```
Gain #1: One-Tap Balance Check
- Value: Enables quick financial decisions without friction
- Success Metric: Can check balance in <5 seconds vs. current 30+ seconds
```

**Tip:** Link gains to pain points. Pain: "Data scattered across 6 tools" → Gain: "See everything in one dashboard."

---

### Step 6: Synthesize

Emma will:
1. Review all insights you've gathered
2. Identify key patterns and surprises
3. Create the final empathy map artifact
4. Save it to your output folder

**Output Location:**
`{project-root}/_bmad-output/design-artifacts/empathy-map-{user-name}-{date}.md`

**Artifact Includes:**
- Executive Summary (key insights)
- Target User Profile
- Says & Thinks
- Does & Feels
- Pain Points (prioritized)
- Desired Gains (prioritized)
- Design Implications
- Feature Prioritization Matrix
- Next Steps

---

## Understanding Your Empathy Map Output

### Executive Summary

**Purpose:** High-level insights for stakeholders who need the "so what?"

**What to look for:**
- 3-5 key insights that emerged from the data
- Top 3 pain points (what's broken?)
- Top 3 desired gains (what do they want?)

**How to use it:**
- Share with executives for quick alignment
- Reference in pitch decks and presentations
- Guide feature prioritization discussions

---

### Design Implications

**Purpose:** Translate insights into actionable design decisions

**What you'll find:**
- **Prioritize:** What to focus on first
- **Avoid:** What NOT to do
- **Focus On:** Guiding principles for design

**How to use it:**
- Brief designers before wireframing
- Validate designs against these principles
- Use as criteria for design reviews

---

### Feature Prioritization Matrix

**Purpose:** Map pain points to gains to design opportunities

**How to read it:**

| Pain Point | Desired Gain | Design Opportunity | Priority |
|------------|--------------|-------------------|----------|
| Multi-step auth | Seamless biometric | Face ID-only login | HIGH |

**How to use it:**
- Prioritize HIGH items first
- Use to scope MVP features
- Track which pain points you've addressed

---

## Chatting with Emma (CH)

Select **[CH] Chat** to have a free-form conversation with Emma about:

- Empathy mapping best practices
- User research methodologies
- Design thinking principles
- Jobs-to-be-Done framework
- Interpreting user insights

**Example questions:**
- "How do I know if my pain points are specific enough?"
- "What's the difference between what users say and think?"
- "How do I prioritize pain points vs. gains?"

---

## Validating an Empathy Map (VM)

Select **[VM] Validate** to review an existing empathy map against research evidence.

**When to use this:**
- You created an empathy map and want peer review
- You inherited an empathy map from another team
- Your research has changed and you need to update the map
- You're preparing to present the map to stakeholders

**What Emma checks:**
- Are insights backed by research evidence?
- Is the target user specific enough?
- Are pain points concrete and actionable?
- Are gains measurable?
- Can designers use this to inform decisions?

---

## Party Mode (PM)

Select **[PM] Party Mode** to bring Emma into a multi-agent collaboration session.

**When to use this:**
- You need multiple BMAD agents working together
- Example: Emma (empathy mapping) + Wade (wireframes) + Quinn (quality review)

**How it works:**
- Emma joins a group discussion with other agents
- Each agent contributes their expertise
- Agents collaborate naturally on complex tasks

---

## Troubleshooting

### Error: "Configuration Error: Cannot load config file"

**What it means:**
Emma can't find or read the config file at `_bmad/bme/_designos/config.yaml`

**How to fix:**

1. **Check if file exists:**
   ```bash
   ls _bmad/bme/_designos/config.yaml
   ```

2. **If missing, create it:**
   ```yaml
   ---
   submodule_name: _designos
   description: Design-focused agents for user research and UX workflows
   module: bme
   version: 1.0.0

   # Output Configuration
   output_folder: "{project-root}/_bmad-output/design-artifacts"
   user_name: "{user}"
   communication_language: "en"

   # Agents in this submodule
   agents:
     - empathy-mapper

   # Workflows available
   workflows:
     - empathy-map

   # Integration
   party_mode_enabled: true
   core_module: bme
   ```

3. **Verify YAML syntax:**
   - No tabs (use spaces)
   - Proper indentation
   - Quotes around string values

4. **If you just installed Emma:**
   - Reinstall the bme module
   - Or contact support

---

### Error: "Missing required field(s) in config.yaml"

**What it means:**
The config file exists but is missing required fields.

**Required fields:**
- `user_name`
- `communication_language`
- `output_folder`

**How to fix:**

1. **Open the config file:**
   ```bash
   nano _bmad/bme/_designos/config.yaml
   ```

2. **Add missing fields:**
   ```yaml
   output_folder: "{project-root}/_bmad-output/design-artifacts"
   user_name: "{user}"
   communication_language: "en"
   ```

3. **Save and retry**

---

### Error: "Unknown skill: bmad-agent-bme-empathy-mapper"

**What it means:**
Slash commands aren't available in your environment.

**How to fix:**
Use Method 2 (Direct Agent File Reading) instead:

1. Read the file: `_bmad/bme/_designos/agents/empathy-mapper.md`
2. Emma will activate normally
3. This method is fully tested and works in all environments

**Note:** This is NOT an error with Emma - it's an environment limitation.

---

### Emma won't proceed to the next step

**What it means:**
Emma is waiting for specific input from you.

**How to fix:**

1. **Read Emma's last message carefully** - she's asking for something specific
2. **Provide the requested information** - don't skip steps
3. **Type "continue" if you've answered her question** and she's waiting for confirmation

**Tip:** Emma follows a strict sequential workflow. You can't skip Step 2 to go to Step 4.

---

### Empathy map artifact not created

**Possible causes:**

1. **Didn't complete Step 6 (Synthesize):**
   - Solution: Continue through all 6 steps

2. **Output folder doesn't exist:**
   - Check: `_bmad-output/design-artifacts/` exists
   - Solution: Create the folder if missing

3. **Permissions issue:**
   - Check: You have write access to the output folder
   - Solution: Fix folder permissions

---

## Best Practices

### Before You Start

1. **Gather your research:**
   - User interview transcripts
   - Survey responses
   - Observational study notes
   - Analytics data
   - Support tickets

2. **Define your specific user:**
   - Not "users" - pick ONE specific user type
   - Example: "Busy working parents managing kids' schedules" not "parents"

3. **Set aside 30-60 minutes:**
   - Don't rush - quality insights take time
   - Better to do it right once than iterate multiple times

---

### During the Process

1. **Use direct quotes:**
   - Not "Users said they want speed"
   - But "I just want to check my balance quickly"

2. **Be specific about pain points:**
   - Not "Bad UX"
   - But "Transfer button hidden 3 levels deep in menu"

3. **Quantify when possible:**
   - Not "Takes too long"
   - But "Abandons after 30 seconds"

4. **Ground everything in evidence:**
   - Link each insight to interview quotes, observations, or data
   - If you're guessing, you don't have enough research yet

---

### After You Create the Empathy Map

1. **Validate with users:**
   - Show the empathy map to 3-5 actual users
   - Ask: "Does this resonate with your experience?"

2. **Share with your team:**
   - Use Executive Summary for stakeholder buy-in
   - Use Design Implications to brief designers
   - Use Feature Matrix to prioritize backlog

3. **Keep it updated:**
   - Empathy maps are living documents
   - Update as you learn more through ongoing research

4. **Link to design decisions:**
   - Reference the empathy map in PRDs
   - Cite it in design reviews
   - Use it to resolve feature debates

---

## Tips from Emma

### "Design is about THEM, not us"

Every decision must be grounded in real user insights. If you catch yourself saying "I think users want X," stop and ask: "What evidence do I have?"

### "Emotions drive behavior"

Understanding the WHY (emotions) is more important than the WHAT (actions). A user who abandons your checkout isn't just "impatient" - they might be anxious about security, overwhelmed by options, or frustrated by hidden fees.

### "Pain points reveal opportunities"

Every frustration is a solution waiting to happen. Don't just document pain points - ask "What gain would eliminate this pain?"

### "Challenge assumptions ruthlessly"

Users say one thing and do another. Look for gaps between what they SAY and what they DO. Those gaps reveal unspoken needs.

### "Validate through research, never speculate"

If you don't have research evidence, you don't have an empathy map - you have a persona fiction. Go talk to users first.

---

## FAQs

### How is this different from a user persona?

**Empathy Map:**
- Focused on ONE specific user in ONE specific context
- Organized by Says/Thinks/Does/Feels (empathy framework)
- Grounded in direct research evidence (quotes, observations)
- Reveals emotional drivers and pain points
- Used to inform design decisions

**User Persona:**
- Represents a segment of users (broader)
- Organized by demographics, goals, behaviors
- Can be research-based or assumption-based
- Often includes fictional narrative details
- Used for general alignment and communication

**When to use Emma:** When you need to deeply understand user emotions and pain points to inform design decisions.

---

### Can I create multiple empathy maps?

**Yes!** You should create separate empathy maps for:
- Different user types (power users vs. casual users)
- Different contexts (desktop vs. mobile usage)
- Different jobs-to-be-done (research vs. purchasing)

**Tip:** Don't try to create one empathy map for everyone. Specificity is power.

---

### How do I know if my empathy map is good?

**Good empathy maps:**
- ✅ Every insight traceable to research evidence (quotes, observations, data)
- ✅ Target user specific enough (not "users" but "34-year-old marketing managers")
- ✅ Pain points concrete (not "bad UX" but "can't find transfer button in menu")
- ✅ Gains measurable (not "faster" but "check balance in <5 seconds")
- ✅ Designers can use it to inform wireframes
- ✅ Product managers can use it to prioritize features

**Bad empathy maps:**
- ❌ Generic insights that could apply to anyone
- ❌ Speculation without evidence ("I think users feel...")
- ❌ Vague pain points ("needs improvement")
- ❌ Unmeasurable gains ("better experience")

**Emma's validation (VM) can help check this!**

---

### What if I don't have user research yet?

**Don't create an empathy map yet.**

Empathy maps require research evidence. Without it, you're creating fiction.

**Instead:**
1. Conduct user interviews (3-5 users minimum)
2. Observe users interacting with your product
3. Review support tickets and feedback
4. Analyze usage analytics

**Then** come back to Emma with your research.

---

### How long should the process take?

**With Emma:** 30-60 minutes (for one empathy map)

**Time breakdown:**
- Step 1 (Define User): 5 min
- Step 2 (Says/Thinks): 10 min
- Step 3 (Does/Feels): 10 min
- Step 4 (Pain Points): 10 min
- Step 5 (Gains): 10 min
- Step 6 (Synthesize): 5 min

**Tip:** Don't rush. Quality insights take time to extract from research.

---

### Can I edit the empathy map after Emma creates it?

**Yes!** The output is a markdown file. You can:
- Edit it directly in any text editor
- Add new insights as you learn more
- Update priorities as business needs change
- Add screenshots or diagrams

**Best practice:** Track versions if you make major changes.

---

## Getting Help

### Need help using Emma?

1. **Chat with Emma (CH):** Ask her questions about empathy mapping
2. **Read this guide:** Most questions are answered here
3. **Check troubleshooting section:** Common errors and solutions

### Found a bug or issue?

1. **Check if it's an environment limitation:** Some features (like slash commands) may not work in all environments
2. **Report the issue:** Provide Emma's version (1.0.0), your environment, and steps to reproduce

### Want to learn more about empathy mapping?

**Emma's expertise includes:**
- Empathy mapping frameworks
- Jobs-to-be-Done methodology
- Emotional journey mapping
- Human-centered design principles
- User research best practices

**Ask Emma (CH) about any of these topics!**

---

## Version History

**v1.0.0 (2026-02-14)**
- Initial release
- 6-step empathy mapping workflow
- Config-driven personalization
- Comprehensive error handling
- Validation workflow (VM)
- Party mode integration (PM)

---

## Credits

**Agent:** Emma (empathy-mapper)
**Module:** BMAD Enhanced (bme)
**Submodule:** DesignOS (_designos)
**Framework:** BMAD Agent Architecture Framework v1.1.0
**Testing:** P0 test suite (18/18 passed - 100%)

---

**Questions?** Chat with Emma (CH) - she's here to help! 🎨
