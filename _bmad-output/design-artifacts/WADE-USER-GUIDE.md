# Wade User Guide

**Agent:** Wade (wireframe-designer)
**Version:** 1.0.0
**Module:** BME (_designos)
**Created:** 2026-02-14
**Last Updated:** 2026-02-14

---

## Table of Contents

1. [Introduction](#introduction)
2. [What Wade Does](#what-wade-does)
3. [Quick Start](#quick-start)
4. [Commands Reference](#commands-reference)
5. [Workflow Deep Dive](#workflow-deep-dive)
6. [Sample Wireframes](#sample-wireframes)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)
9. [FAQs](#faqs)
10. [Advanced Usage](#advanced-usage)

---

## Introduction

Meet Wade - your wireframe design specialist. Wade helps you create comprehensive wireframes for web and mobile applications through a structured 6-step process.

**Who is Wade?**

Wade is a domain-specialized AI agent built on the BMAD Agent Architecture Framework v1.1.0. He brings 10+ years of UX design expertise, specializing in:
- Low-fidelity wireframe creation
- Information architecture
- Responsive design patterns
- Accessibility (WCAG 2.1 Level AA)
- ASCII art visualization

**Communication Style:**

Wade speaks visually and spatially, like an architect sketching blueprints. He thinks in layouts, grids, and flows. Expect phrases like:
- "Picture this layout..."
- "What's the primary user action on this screen?"
- "Let's establish visual hierarchy..."

---

## What Wade Does

### Core Capability: Create Wireframes

Wade guides you through creating wireframes that answer three critical questions:

1. **Where am I?** (Screen purpose and navigation context)
2. **What can I do?** (Primary and secondary actions)
3. **Where can I go?** (Exit points and navigation)

### Wireframe Artifacts

Wade generates comprehensive wireframe documents including:

- **Requirements** - Screen purpose, target user, constraints
- **User Flows** - Entry points, happy path, alternative flows, exit points
- **Information Architecture** - Visual hierarchy, content grouping, navigation patterns
- **ASCII Wireframes** - Low-fidelity layout sketches (mobile + desktop)
- **Component Specifications** - UI components, states, interactions
- **Responsive Design** - Breakpoints (Mobile 375px, Tablet 768px, Desktop 1024px+)
- **Accessibility Notes** - WCAG 2.1 compliance, keyboard navigation, screen readers
- **Design Rationale** - Why these decisions? Trade-offs considered
- **Next Steps** - Handoff to high-fidelity design, prototyping, development

---

## Quick Start

### Step 1: Activate Wade

```bash
# From your project directory
cd /path/to/your/project

# Activate Wade using one of these methods:
# Method 1: Direct agent file read
Read the file: _bmad/bme/_designos/agents/wireframe-designer.md

# Method 2: Party Mode (if other BMAD agents active)
# Wade will join the discussion automatically
```

### Step 2: See Wade's Menu

Wade will greet you and display menu options:

```
Hey there! Wade here - your wireframe design specialist. 🎨

Ready to turn ideas into structured layouts? I'll help you create wireframes that answer the three critical questions: Where am I? What can I do? Where can I go?

Here's what I can do for you:

1. [MH] Redisplay Menu Help
2. [CH] Chat with Wade about wireframe design, UI patterns, or information architecture
3. [WM] Create Wireframe: Guided 6-step process to create comprehensive wireframe artifacts
4. [VM] Validate Wireframe: Review existing wireframe against usability principles
5. [PM] Start Party Mode
6. [DA] Dismiss Agent

💡 Tip: Type `/bmad-help I want to create wireframes for my mobile app` anytime for guidance.

What would you like to do?
```

### Step 3: Create Your First Wireframe

**Option A: Use exact command**
```
WM
```

**Option B: Use fuzzy command**
```
create wireframe
```

**Option C: Use menu number**
```
3
```

### Step 4: Follow the 6-Step Process

Wade will guide you through:

1. **Define Requirements** (2-3 minutes)
   - What are we wireframing? (screen name, platform, viewport)
   - Who is this for? (target user, goals)
   - What's the core functionality? (primary action, secondary actions)
   - Design constraints? (design system, brand guidelines, accessibility)

2. **User Flows** (3-5 minutes)
   - Entry points (how do users arrive?)
   - Happy path (ideal user journey)
   - Alternative flows (edge cases)
   - Exit points (where do users go next?)

3. **Information Architecture** (3-5 minutes)
   - Visual hierarchy (primary, secondary, tertiary content)
   - Content grouping (logical sections)
   - Navigation patterns (tabs, bottom nav, sidebar)
   - Information density (mobile vs desktop)

4. **Wireframe Sketch** (5-10 minutes)
   - ASCII art layout creation
   - Grid system (8pt mobile, 12-column desktop)
   - Component placement (header, content, navigation)
   - Size annotations (56px header, 48px buttons, etc.)

5. **Components & Interactions** (5-7 minutes)
   - Component identification (buttons, cards, lists, inputs)
   - Interaction specifications (states: default, pressed, disabled)
   - Responsive behavior (how components adapt)

6. **Synthesize** (1-2 minutes)
   - Generate final artifact using template
   - All sections populated
   - Output saved to `{output_folder}/wireframe-{screen-name}-{date}.md`

**Total Time:** 20-30 minutes for a comprehensive wireframe

---

## Commands Reference

### Primary Commands

#### [WM] Create Wireframe
**Trigger:** `WM` or `create wireframe`

**Purpose:** Start the 6-step wireframe creation workflow

**Use When:**
- Designing a new screen
- Planning UI layout before visual design
- Communicating structure to developers
- Documenting design decisions

**Output:** Complete wireframe artifact (markdown file with ASCII art)

---

#### [VM] Validate Wireframe
**Trigger:** `VM` or `validate wireframe`

**Purpose:** Review an existing wireframe against usability principles

**Use When:**
- You've created a wireframe and want expert review
- Checking WCAG accessibility compliance
- Verifying responsive design approach
- Getting feedback before moving to high-fidelity design

**What Wade Checks:**
- Visual hierarchy clarity
- Component size standards (touch targets ≥ 44px)
- Navigation patterns consistency
- Accessibility compliance (WCAG 2.1 Level AA)
- Responsive breakpoint logic

---

#### [CH] Chat with Wade
**Trigger:** `CH` or `chat`

**Purpose:** Free-form conversation about wireframe design, UI patterns, or information architecture

**Ask Wade About:**
- "What's the best navigation pattern for mobile e-commerce?"
- "How should I organize a dashboard with 6 KPIs?"
- "What's the difference between wireframes and mockups?"
- "How do I design for accessibility from the wireframe stage?"
- "Best practices for responsive grid systems?"

---

### Utility Commands

#### [MH] Redisplay Menu
**Trigger:** `MH` or `menu` or `help`

**Purpose:** See all menu options again

---

#### [PM] Party Mode
**Trigger:** `PM` or `party mode`

**Purpose:** Bring other BMAD agents into the conversation

**Example:** Invite Emma (empathy-mapper) to provide user research insights that inform your wireframe

---

#### [DA] Dismiss Agent
**Trigger:** `DA` or `exit` or `goodbye`

**Purpose:** End Wade session and return to normal Claude Code mode

---

## Workflow Deep Dive

### Complete 6-Step Wireframe Workflow

#### Step 1: Define Requirements

**What Wade Needs:**

1. **Scope**
   - Single screen? User flow (multiple screens)? Full app?
   - Example: "Single screen - Dashboard Home"

2. **Screen Name**
   - What do you call this screen?
   - Example: "Dashboard Home", "Checkout Flow", "Product Detail Page"

3. **Platform**
   - Web (desktop)? Web (mobile)? Mobile app (iOS/Android)? Responsive (all)?
   - Example: "Mobile app (iOS/Android)"

4. **Viewport Size**
   - Mobile: 375px width (iPhone standard)
   - Tablet: 768px width
   - Desktop: 1024px+ width
   - Responsive: All of the above?

5. **Target User**
   - Who will use this screen?
   - Reference an empathy map if available (e.g., "Sarah Chen from empathy-map-sarah-chen-2026-02-14.md")
   - Example: "Banking app user checking account balance"

6. **User's Primary Goal**
   - What is the ONE thing users come here to do?
   - Example: "Check account balance quickly"

7. **Core Functionality**
   - Primary action (main purpose)
   - Secondary actions (supporting tasks)
   - Information displayed (what data is shown)
   - Example: "Primary: Check balance | Secondary: View transactions, Transfer money"

8. **Design Constraints**
   - Existing design system? (Material Design, iOS HIG, custom)
   - Brand guidelines? (logo placement, color scheme - high level)
   - Technical constraints? (API limitations, performance requirements)
   - Accessibility requirements? (WCAG 2.1 Level AA)

**Wade's Example:**

```
Screen: Dashboard Home (Mobile Banking App)
Platform: Mobile app (iOS/Android)
Viewport: 375px width (mobile-first)

User: Sarah Chen (see empathy-map-sarah-chen-2026-02-14.md)
Primary Goal: Check account balance quickly
Technical Proficiency: Medium-high
Context: Rushed, 3-5 daily check-ins, sessions < 2 minutes

Primary Action: Check account balance
Secondary Actions: View recent transactions, quick transfer, pay bills
Information: Balance, last updated timestamp, 5 recent transactions, quick action buttons
Data Sources: Banking API (balance, transactions)

Constraints:
- Must support Face ID for authentication
- Follow iOS/Android platform patterns
- WCAG 2.1 Level AA (minimum 44px touch targets)
- Performance: Load balance in < 1 second
```

---

#### Step 2: User Flows

**What Wade Needs:**

1. **Entry Points** - How do users arrive at this screen?
   - App launch (default screen)
   - Navigation tap (bottom nav, sidebar)
   - Deep link (notification, email)
   - Search result click

2. **Happy Path** - Ideal user journey (step-by-step)
   - User arrives → performs primary action → achieves goal → exits
   - Example:
     1. User opens app
     2. Dashboard loads with balance
     3. User sees recent transactions
     4. User taps transaction → detail view

3. **Alternative Flows** - Edge cases and secondary paths
   - What if data fails to load?
   - What if user is first-time visitor?
   - What if user wants to filter/search?
   - Example: User pulls to refresh → reload data

4. **Exit Points** - Where do users go next?
   - Navigate to another section (tap nav)
   - Drill down to detail (tap list item)
   - Complete task and leave app (background app)
   - Example: Tap "Transfer" → transfer flow

**Wade's Tip:** Draw a simple flowchart if helpful:
```
[Entry: App Launch] → [Dashboard Loads] → [User Views Balance] →
  ↓ (Taps Transaction)
[Transaction Detail] → [Exit]
```

---

#### Step 3: Information Architecture

**What Wade Needs:**

1. **Visual Hierarchy** - What's most important?
   - **Primary (Hero):** The MAIN thing users look for (large, high contrast)
     - Example: Account balance ($12,458.32 in large text)
   - **Secondary (Supporting):** Important but not the main focus
     - Example: Quick action buttons (Transfer, Pay Bills, Deposit)
   - **Tertiary (Metadata):** Nice to have, low prominence
     - Example: Last updated timestamp, help links

2. **Content Grouping** - How is content organized?
   - Logical sections (header, hero, actions, list, footer)
   - Visual separators (divider lines, white space, cards)
   - Example:
     ```
     [Header: Menu + Notifications]
     [Hero: Balance]
     [Quick Actions: 3 buttons]
     [Recent Transactions: List]
     [Bottom Nav: 4 tabs]
     ```

3. **Navigation Patterns** - How do users move around?
   - Bottom tabs (mobile standard for primary nav)
   - Hamburger menu (secondary nav, settings)
   - Sidebar (desktop, persistent nav)
   - Breadcrumbs (desktop, deep hierarchy)
   - Example: Bottom tabs (Home, Cards, Reports, Profile)

4. **Information Density** - How much content per screen?
   - **Mobile:** Minimal - show only essentials (balance + 3 quick actions + 3 transactions)
   - **Desktop:** Expanded - show more context (balance + 6 quick actions + 10 transactions)

---

#### Step 4: Wireframe Sketch (ASCII Art)

**Wade's ASCII Syntax:**

```
┌─────────────────────────────────┐  ← Top border (box-drawing characters)
│ ☰ Menu    Page Title       🔔   │  ← Header bar (56-72px height)
├─────────────────────────────────┤  ← Section divider
│                                 │
│        Main Content Area        │  ← Content section
│                                 │
│  ┌─────┐  ┌─────┐  ┌─────┐    │  ← Button row (internal boxes)
│  │ Btn1│  │ Btn2│  │ Btn3│    │
│  └─────┘  └─────┘  └─────┘    │
├─────────────────────────────────┤
│ [Home] [Search] [Profile]      │  ← Bottom nav (48-72px)
└─────────────────────────────────┘  ← Bottom border
```

**Grid System:**
- **Mobile:** 8pt grid, 16px margins
- **Desktop:** 12-column grid, 24px gutters
- **Alignment:** Everything snaps to grid

**Component Placement:**

1. **Header** (56-72px height)
   - Logo/back button (left)
   - Page title (center)
   - Actions/notifications (right)

2. **Content Area**
   - Primary content (hero, main action)
   - Secondary content (supporting info)
   - Tertiary content (metadata, help)

3. **Navigation** (48-72px height)
   - Bottom tabs (mobile)
   - Sidebar (desktop)

**Typography Hierarchy:**
- **H1:** Screen title (24-32px)
- **H2:** Section headers (20-24px)
- **Body:** Content text (16px)
- **Caption:** Metadata (12-14px)

**Wade's Mobile Dashboard Example:**

```
┌─────────────────────────────────┐
│ ☰                          🔔   │ ← Header (56px)
├─────────────────────────────────┤
│                                 │
│     Account Balance             │ ← H1 (Hero section)
│      $12,458.32                 │ ← Large text (32px)
│   Last updated: 2 min ago       │ ← Caption (12px)
│                                 │
├─────────────────────────────────┤
│  ┌─────┐  ┌─────┐  ┌─────┐    │ ← Quick Actions
│  │Trans│  │ Pay │  │Depo │    │   (3 buttons,
│  │ fer │  │Bills│  │sit  │    │    100×48px each)
│  └─────┘  └─────┘  └─────┘    │
├─────────────────────────────────┤
│ Recent Transactions         ↗   │ ← H2 + "See All"
│ ┌───────────────────────────┐  │
│ │ 🏪 Starbucks   -$5.42  →  │  │ ← Transaction item
│ └───────────────────────────┘  │   (64px height)
│ ┌───────────────────────────┐  │
│ │ 💰 Salary    +$4,200   →  │  │
│ └───────────────────────────┘  │
│ ┌───────────────────────────┐  │
│ │ 🍕 Pizza Hut   -$18.50 →  │  │
│ └───────────────────────────┘  │
│                                 │
│ [Load More Transactions]        │ ← Button (48px)
├─────────────────────────────────┤
│ [🏠] [💳] [📊] [👤]            │ ← Bottom tabs (72px)
└─────────────────────────────────┘
```

**Wade's Annotations:**
- Header: 56px fixed height, menu left, notifications right
- Hero section: 120px tall, centered, high contrast
- Quick actions: 16px margin between buttons, equal width
- Transaction list: 64px per item, icon + text + amount + chevron
- Bottom nav: 72px fixed, 4 equal-width tabs

---

#### Step 5: Components & Interactions

**What Wade Needs:**

1. **Component Identification** - List all UI components
   - AppHeader
   - BalanceCard
   - QuickActionButton
   - TransactionListItem
   - BottomNavigation

2. **Component Specifications** - For each component:

   **Example: QuickActionButton**
   - **Type:** Interactive button
   - **Location:** Below hero, horizontal row
   - **Size:** 100×48px each (mobile), expands on desktop
   - **States:**
     - Default (gray background, black text)
     - Pressed (darker gray, slightly smaller)
     - Disabled (light gray, 50% opacity, no interaction)
   - **Behavior:** Tap → navigate to respective flow (Transfer, Pay Bills, Deposit)

3. **Interactions** - How users interact
   - Tap (mobile) / Click (desktop)
   - Swipe (mobile gestures)
   - Hover (desktop states)
   - Long-press (mobile context menus)
   - Pull-to-refresh (mobile data reload)

4. **Responsive Breakpoints** - How layout adapts
   - **Mobile (375px):** Single column, 3 quick actions
   - **Tablet (768px):** 2 columns, 4 quick actions
   - **Desktop (1024px+):** 3 columns, 6 quick actions

---

#### Step 6: Synthesize

**Wade's Final Step:**

1. **Review Checklist** - Wade shows what you've defined:
   - [x] Screen name and platform defined
   - [x] Target user identified
   - [x] Primary action clear
   - [x] User flows mapped
   - [x] Visual hierarchy established
   - [x] ASCII wireframe created
   - [x] Components specified
   - [x] Responsive behavior defined

2. **Generate Artifact** - Wade creates complete wireframe document:
   - Filename: `wireframe-{screen-name}-{date}.md`
   - Location: `{output_folder}/` (default: `_bmad-output/design-artifacts/`)
   - Template: All sections populated using `wireframe.template.md`

3. **Next Steps** - Wade suggests:
   - Validate with users (show wireframe, get feedback)
   - Share with team (stakeholder alignment)
   - Create high-fidelity designs (use wireframe as foundation)
   - Prototype (build interactive prototype)
   - Develop (hand off to developers)

---

## Sample Wireframes

### Example 1: Mobile Banking Dashboard

See complete wireframe in Step 4 above.

**Key Features:**
- Hero balance display (primary focus)
- Quick action buttons (secondary actions)
- Recent transactions list (tertiary info)
- Bottom tab navigation (standard mobile pattern)

**Use This When:**
- Designing financial dashboards
- Creating mobile-first experiences
- Prioritizing one key metric (balance)

---

### Example 2: E-commerce Product Detail (Desktop)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Logo]  [Search.....................]  [Cart(2)]  [Account]  [Help]        │ ← Header (72px)
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────┐  ┌───────────────────────────────────────────┐  │
│  │                      │  │ Wireless Noise-Canceling Headphones        │  │
│  │                      │  │                                             │  │
│  │   Primary Product    │  │ ⭐⭐⭐⭐⭐ 4.7 (1,234 reviews)             │  │
│  │       Image          │  │                                             │  │
│  │     (500×500px)      │  │ Price: $299.99  [Was: $399.99] -25% OFF   │  │
│  │                      │  │                                             │  │
│  │                      │  │ Color: [●Black] [○Silver] [○Blue]         │  │
│  └──────────────────────┘  │                                             │  │
│  [◄] [Image 2] [Image 3]   │ Quantity: [-] [1] [+]                      │  │
│      [Image 4] [▶]         │                                             │  │
│                            │ [Add to Cart]  [♥ Save for Later]          │  │
│                            └───────────────────────────────────────────┘  │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  [Description]  [Specifications]  [Reviews (1,234)]  [Q&A]                 │ ← Tabs
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Experience premium sound quality with active noise cancellation...        │
│  [Full product description content]                                        │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Customers Also Viewed                                                      │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐              │
│  │ Image  │  │ Image  │  │ Image  │  │ Image  │  │ Image  │              │
│  │ $49.99 │  │ $89.99 │  │$129.99 │  │ $39.99 │  │ $199.99│              │
│  └────────┘  └────────┘  └────────┘  └────────┘  └────────┘              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Key Features:**
- 2-column layout (image gallery + product details)
- Tabbed content (description, specs, reviews)
- Related products (cross-sell opportunities)
- Clear CTAs (Add to Cart, Save for Later)

**Use This When:**
- Designing e-commerce product pages
- Creating desktop-first experiences
- Supporting rich media (image galleries)

---

### Example 3: SaaS Onboarding Form (Mobile)

```
┌─────────────────────────────────┐
│ [← Back]     Sign Up            │ ← Header (56px)
├─────────────────────────────────┤
│                                 │
│  Create your account            │ ← H1
│  Start your 14-day free trial   │ ← Subheading
│                                 │
│  ┌───────────────────────────┐ │
│  │ [G] Sign up with Google   │ │ ← Social button
│  └───────────────────────────┘ │
│  ┌───────────────────────────┐ │
│  │ [M] Sign up with Microsoft│ │
│  └───────────────────────────┘ │
│                                 │
│  ────────── OR ──────────       │ ← Divider
│                                 │
│  Full Name                      │ ← Label
│  ┌───────────────────────────┐ │
│  │ John Doe                  │ │ ← Input (48px)
│  └───────────────────────────┘ │
│                                 │
│  Email Address                  │
│  ┌───────────────────────────┐ │
│  │ john@example.com          │ │
│  └───────────────────────────┘ │
│                                 │
│  Password                       │
│  ┌───────────────────────────┐ │
│  │ ••••••••••            👁  │ │ ← Password input
│  └───────────────────────────┘ │
│  [████████░░] Strong            │ ← Strength indicator
│                                 │
│  ☑ I agree to Terms & Privacy  │ ← Checkbox (44×44)
│                                 │
│  ┌───────────────────────────┐ │
│  │   Create Account          │ │ ← Primary CTA (48px)
│  └───────────────────────────┘ │
│                                 │
│  Already have an account?       │
│  [Log In]                       │ ← Link
│                                 │
└─────────────────────────────────┘
```

**Key Features:**
- Social sign-up options (reduce friction)
- Password strength indicator (progressive disclosure)
- Clear CTA (Create Account)
- Alternative path (Log In)

**Use This When:**
- Designing sign-up flows
- Creating form-heavy screens
- Prioritizing conversion (reduce form fields)

---

## Best Practices

### 1. Start with Requirements (Don't Skip Step 1)

**Why:** Generic wireframes waste time. Specific wireframes (for a specific screen, user, and goal) accelerate design and development.

**Do This:**
- Define screen name, platform, viewport size
- Identify target user (reference empathy map if available)
- Clarify primary action (the ONE thing users do)
- Document constraints (design system, accessibility, performance)

**Don't Do This:**
- Start sketching without requirements
- Assume you know what users need
- Skip user research

---

### 2. Wireframes Are Thinking Tools, Not Art

**Why:** Wireframes focus on structure and flow, not aesthetics. Visual design comes later.

**Do This:**
- Use ASCII art (low-fidelity, fast)
- Focus on layout, hierarchy, and component placement
- Iterate quickly (create 3 versions in the time it takes to make 1 high-fidelity mockup)

**Don't Do This:**
- Add colors, fonts, or images to wireframes
- Spend hours perfecting pixel alignment
- Create high-fidelity mockups when structure isn't validated

---

### 3. Every Screen Answers Three Questions

**The Three Questions:**
1. **Where am I?** (Screen title, breadcrumbs, visual context)
2. **What can I do?** (Primary CTA, secondary actions)
3. **Where can I go?** (Navigation, exit points)

**Example: Dashboard Home**
- Where am I? "Dashboard Home" (H1 title)
- What can I do? "Check balance, Transfer money, Pay bills" (quick actions)
- Where can I go? "Home, Cards, Reports, Profile" (bottom nav)

---

### 4. Iterate Quickly, Refine Deliberately

**Process:**
1. **Sketch 3 versions** (15 minutes each) - explore different layouts
2. **Review with user** (5 minutes) - which resonates?
3. **Refine chosen version** (20 minutes) - add detail
4. **Validate again** (5 minutes) - confirm structure works
5. **Move to high-fidelity** (only when wireframe validated)

**Don't Do This:**
- Create one wireframe and declare it perfect
- Refine before exploring alternatives
- Skip user validation

---

### 5. Design for Accessibility from the Wireframe Stage

**WCAG 2.1 Level AA Requirements:**
- Touch targets ≥ 44×44px (mobile)
- Click targets ≥ 24×24px (desktop)
- Color contrast ≥ 4.5:1 (normal text), ≥ 3:1 (large text)
- Keyboard navigation (all actions accessible without mouse)
- Screen reader support (semantic HTML, ARIA labels)

**Wade's Accessibility Checklist:**
- [ ] All buttons ≥ 44px tall (mobile)
- [ ] Sufficient spacing between tappable elements (≥ 8px)
- [ ] Clear visual hierarchy (headings, sections, lists)
- [ ] Keyboard navigation order logical (top → bottom, left → right)
- [ ] Form labels always visible (not just placeholder text)
- [ ] Focus states defined (keyboard users can see where they are)

---

### 6. Mobile-First Wireframing

**Why:** Starting with mobile forces prioritization. If it works on 375px, it'll work on 1440px. The reverse isn't true.

**Process:**
1. **Design for mobile (375px) first** - What's essential?
2. **Expand to tablet (768px)** - What supporting content can we add?
3. **Expand to desktop (1024px+)** - How can we leverage more space?

**Example: Dashboard Home**
- **Mobile (375px):** Balance + 3 quick actions + 3 transactions
- **Tablet (768px):** Balance + 4 quick actions + 5 transactions + chart
- **Desktop (1024px+):** Balance + 6 quick actions + 10 transactions + 2 charts + sidebar

---

## Troubleshooting

### Issue 1: Wade Won't Activate

**Symptoms:**
- Error: "Configuration Error: Cannot load config file"
- Wade doesn't display menu

**Cause:** config.yaml missing or malformed

**Solution:**
1. Verify config file exists: `_bmad/bme/_designos/config.yaml`
2. Check file contains required fields:
   - `user_name: "{user}"`
   - `communication_language: "en"`
   - `output_folder: "{project-root}/_bmad-output/design-artifacts"`
3. Verify YAML syntax valid (no tabs, proper indentation)

**Still Not Working?**
- Reinstall bme module
- Contact support with error message

---

### Issue 2: Workflow File Not Found

**Symptoms:**
- Error: "Workflow Error: Cannot load wireframe workflow"
- Expected file path shown

**Cause:** Workflow files missing from installation

**Solution:**
1. Verify workflow files exist:
   - `_bmad/bme/_designos/workflows/wireframe/workflow.md`
   - `_bmad/bme/_designos/workflows/wireframe/steps/step-01-define-requirements.md` (through step-06)
2. Check file permissions (readable)
3. Reinstall bme module if files missing

---

### Issue 3: ASCII Wireframe Formatting Broken

**Symptoms:**
- Box-drawing characters render incorrectly (� or ?)
- Alignment off (jagged edges)

**Cause:** Non-monospace font used

**Solution:**
1. View wireframe artifact in monospace font editor:
   - VSCode (default: Menlo, Monaco, Courier New)
   - Terminal (default monospace)
   - Markdown preview (set to monospace font)
2. Do NOT view in proportional font (Word, Google Docs, most web browsers)

**Best Practice:** Export wireframe as PDF with monospace font for sharing

---

### Issue 4: Fuzzy Command Ambiguity

**Symptoms:**
- Wade asks "Did you mean [WM] or [VM]?"
- Multiple commands match your input

**Cause:** "wireframe" matches both "Create Wireframe" and "Validate Wireframe"

**Solution:**
- Use more specific keywords:
  - "create wireframe" → [WM]
  - "validate wireframe" → [VM]
- OR use exact commands:
  - `WM` → Create Wireframe
  - `VM` → Validate Wireframe
- OR use menu numbers:
  - `3` → Create Wireframe
  - `4` → Validate Wireframe

---

## FAQs

### Q1: How is Wade different from Emma?

**A:** Wade (wireframe-designer) and Emma (empathy-mapper) are complementary agents:

| Feature | Emma | Wade |
|---------|------|------|
| **Purpose** | User research (empathy mapping) | UI design (wireframe creation) |
| **Output** | Empathy map (user insights) | Wireframe (UI structure) |
| **When to Use** | Before design (understand users) | During design (plan UI layout) |
| **Workflow** | 5 steps (Says/Thinks/Does/Feels/Synthesize) | 6 steps (Requirements/Flows/IA/Sketch/Components/Synthesize) |
| **Typical User** | UX researchers, PMs | UX designers, architects |

**Best Practice:** Use Emma FIRST to understand users, then use Wade to design solutions that meet those user needs.

**Example Workflow:**
1. Emma creates empathy map for "Sarah Chen, busy professional"
2. Wade references Sarah's empathy map when defining wireframe requirements
3. Wade designs dashboard optimized for Sarah's goals (quick balance check, ≤ 2 min sessions)

---

### Q2: What's the difference between wireframes and mockups?

**A:**

| Aspect | Wireframe (Wade's Output) | Mockup (High-Fidelity Design) |
|--------|---------------------------|-------------------------------|
| **Fidelity** | Low (ASCII art, grayscale) | High (colors, fonts, images) |
| **Focus** | Structure, layout, hierarchy | Visual design, branding |
| **Tools** | Text editor (markdown) | Figma, Sketch, Adobe XD |
| **Time** | 20-30 min per screen | 2-4 hours per screen |
| **Purpose** | Validate structure before visual design | Showcase final visual design |
| **Audience** | Internal team (designers, developers) | Stakeholders, clients, users |

**When to Use Each:**
- **Wireframes (Wade):** Early design phase, exploring layouts, validating structure
- **Mockups (Design tools):** After wireframe validated, creating final visual design

---

### Q3: Can Wade create high-fidelity mockups?

**A:** No. Wade creates low-fidelity wireframes using ASCII art.

**Why Low-Fidelity?**
- Faster iteration (3 wireframes in the time it takes to make 1 mockup)
- Focuses on structure, not aesthetics
- Easier to change (no emotional attachment to "beautiful" designs)
- Clear signal that this is a draft (stakeholders won't fixate on colors)

**For High-Fidelity Designs:**
- Use Wade's wireframe as a blueprint
- Import into Figma/Sketch/Adobe XD
- Add colors, fonts, images, spacing
- Create interactive prototype

---

### Q4: Does Wade integrate with Figma/Sketch/Adobe XD?

**A:** Not directly. Wade generates markdown files with ASCII wireframes.

**Export Workflow:**
1. Wade generates wireframe (markdown + ASCII art)
2. Designer reviews wireframe
3. Designer manually recreates layout in Figma/Sketch/XD
4. Designer adds visual design (colors, fonts, images)

**Future Enhancement:** Export to design tool formats (FigJam, Excalidraw) - under consideration

---

### Q5: Can Wade validate existing wireframes created in other tools?

**A:** Yes! Use the [VM] Validate Wireframe command.

**Process:**
1. Export your wireframe (screenshot or markdown)
2. Activate Wade
3. Run `VM` command
4. Provide wireframe file or description
5. Wade reviews against:
   - Visual hierarchy
   - WCAG accessibility (touch targets, contrast)
   - Component size standards
   - Navigation patterns
   - Responsive design logic

**Wade's Validation Checklist:**
- [ ] Visual hierarchy clear (primary → secondary → tertiary)
- [ ] Touch targets ≥ 44×44px (mobile)
- [ ] Component sizes follow platform standards (iOS HIG, Material Design)
- [ ] Navigation consistent (tab order, back buttons)
- [ ] Responsive breakpoints logical (mobile → tablet → desktop)
- [ ] Accessibility compliance (WCAG 2.1 Level AA)

---

### Q6: How long does Wade's workflow take?

**A:** 20-30 minutes for a comprehensive wireframe.

**Time Breakdown:**
- Step 1 (Requirements): 2-3 min
- Step 2 (User Flows): 3-5 min
- Step 3 (Information Architecture): 3-5 min
- Step 4 (Wireframe Sketch): 5-10 min ← longest step
- Step 5 (Components): 5-7 min
- Step 6 (Synthesize): 1-2 min

**Variables:**
- **Screen complexity:** Simple (1 CTA, minimal components) = 15 min | Complex (forms, tables, charts) = 45 min
- **Your preparation:** Have requirements ready = faster | Figuring out requirements during workflow = slower
- **Platform:** Single platform (mobile) = faster | Multi-platform (responsive) = slower

**Best Practice:** Prepare requirements before starting (screen name, target user, primary action, constraints). This cuts workflow time in half.

---

### Q7: Can Wade wireframe entire apps (not just single screens)?

**A:** Wade wireframes one screen at a time. For multi-screen flows:

**Option 1: Run Wade Multiple Times**
- Create wireframe for Screen 1 (Dashboard Home)
- Create wireframe for Screen 2 (Transaction Detail)
- Create wireframe for Screen 3 (Transfer Flow)
- Reference previous wireframes for consistency

**Option 2: Document User Flow First (Step 2)**
- Define multi-screen flow: Dashboard → Tap Transaction → Transaction Detail → Tap Transfer → Transfer Flow
- Create wireframes for each screen in the flow
- Link wireframes together in documentation

**Best Practice:** Start with the "golden path" (most critical user journey). Wireframe those screens first. Then fill in edge cases.

---

### Q8: Does Wade support dark mode wireframes?

**A:** Wade creates grayscale ASCII wireframes (no color).

**For Dark Mode Design:**
1. Use Wade to create structure (same layout works for light and dark)
2. Note in "Design Rationale" section: "Supports dark mode variant"
3. In high-fidelity design (Figma), create both light and dark versions

**Wade's Accessibility Note:** Dark mode not just aesthetics - WCAG requires sufficient contrast in ALL color schemes (light and dark). Verify contrast ratios in both modes.

---

### Q9: Can I customize Wade's template?

**A:** Yes. Template located at:
`_bmad/bme/_designos/workflows/wireframe/wireframe.template.md`

**Customization Options:**
- Add sections (e.g., "Performance Requirements", "Analytics Tracking")
- Remove sections (e.g., "Design Rationale" if not needed)
- Change headings (e.g., "Components" → "UI Elements")
- Add company branding (logo in header, footer with company info)

**Caution:** Don't remove {variable} placeholders - Wade uses these to populate content.

**Best Practice:** Save custom template as `wireframe.template-company.md` and update workflow.md to reference it.

---

### Q10: What if I get stuck during the workflow?

**A:** Use the [CH] Chat command to ask Wade questions.

**Common Questions:**
- "What's the difference between primary and secondary content?"
- "How do I design for 375px vs 1440px?"
- "What's a good touch target size?"
- "How should I organize a form with 10 fields?"

**Alternative:** Type `/bmad-help I'm stuck on Step 4 ASCII wireframe` anytime for context-aware guidance.

---

## Advanced Usage

### Technique 1: Reference Emma's Empathy Maps

**Workflow:**
1. Run Emma first: Create empathy map for "Sarah Chen, busy professional"
2. Emma generates: `empathy-map-sarah-chen-2026-02-14.md`
3. Run Wade: Create wireframe for "Dashboard Home"
4. In Step 1 (Requirements), reference Sarah's empathy map:
   ```
   Target User: Sarah Chen (see empathy-map-sarah-chen-2026-02-14.md)
   Primary Goal: Check balance quickly (from empathy map: "Needs fast access to balance")
   Context: Rushed, 3-5 daily check-ins (from empathy map: Pain points - "No time for complex navigation")
   ```
5. Wade designs wireframe optimized for Sarah's needs (hero balance, minimal clicks, ≤ 2 min sessions)

**Why This Works:** Empathy maps inform wireframe requirements. You're designing for real user needs, not assumptions.

---

### Technique 2: Multi-Platform Wireframes (Responsive Design)

**Workflow:**
1. Define requirements for ALL platforms:
   ```
   Platform: Responsive (Mobile 375px, Tablet 768px, Desktop 1024px+)
   ```
2. Create ASCII wireframes for each breakpoint:
   - **Step 4a:** Mobile wireframe (375px width, single column)
   - **Step 4b:** Tablet wireframe (768px width, 2 columns)
   - **Step 4c:** Desktop wireframe (1024px+ width, 3 columns)
3. Document responsive behavior in Step 5:
   ```
   Responsive Breakpoints:
   - Mobile (375px): Balance + 3 quick actions + 3 transactions (single column)
   - Tablet (768px): Balance + 4 quick actions + 5 transactions (2-column grid)
   - Desktop (1024px+): Balance + 6 quick actions + 10 transactions + sidebar (3-column grid)
   ```

**Time Impact:** +10-15 minutes (additional wireframes for tablet/desktop)

**When to Use:** Designing responsive web apps, complex dashboards, data-heavy screens

---

### Technique 3: Component Library Wireframes

**Workflow:**
1. Create wireframes for reusable components first:
   - Button component (default, pressed, disabled states)
   - Input field component (empty, filled, error states)
   - Card component (default, hover, expanded states)
2. Document component specs (size, states, behavior)
3. Reference components in screen wireframes:
   ```
   [Use Button Component: Primary CTA variant, 100% width]
   ```

**Benefits:**
- Design consistency (same button everywhere)
- Faster wireframing (reference components, don't redesign)
- Easier developer handoff (components map to code components)

**When to Use:** Design systems, component libraries, large apps with many screens

---

### Technique 4: Wireframe Validation Sessions

**Workflow:**
1. Create wireframe using Wade
2. Run validation session:
   - Activate Wade
   - Run `VM` command
   - Provide wireframe file
3. Wade reviews and provides feedback:
   - Visual hierarchy issues ("Primary CTA not prominent enough")
   - Accessibility violations ("Touch targets < 44px")
   - Navigation inconsistencies ("Back button location varies")
4. Iterate: Fix issues, re-run validation
5. Repeat until Wade approves wireframe

**Best Practice:** Validate wireframes before moving to high-fidelity design. Cheaper to fix structure issues in wireframes than in mockups.

---

### Technique 5: Party Mode Collaboration (Emma + Wade)

**Workflow:**
1. Activate Emma: Create empathy map for target user
2. Keep Emma active
3. Activate Wade: Create wireframe
4. Run `PM` (Party Mode) to enable collaboration
5. Ask questions that require both agents:
   - "Emma, what does Sarah need from this dashboard?"
   - "Wade, how can we design for Sarah's need for speed?"
6. Emma provides user insights, Wade designs solutions

**Benefits:**
- User-centered design (Wade references Emma's research)
- Faster iteration (don't switch contexts)
- Richer artifacts (wireframe grounded in empathy map)

**When to Use:** Complex design problems, user-centered design projects, design sprints

---

## Conclusion

Wade helps you create comprehensive wireframes through a structured 6-step process:

1. **Define Requirements** - What, who, why?
2. **User Flows** - Entry → Goal → Exit
3. **Information Architecture** - Visual hierarchy, content grouping
4. **Wireframe Sketch** - ASCII art layouts
5. **Components & Interactions** - UI specs, states, behaviors
6. **Synthesize** - Generate final artifact

**Key Principles:**
- Wireframes are thinking tools, not art
- Every screen answers: Where am I? What can I do? Where can I go?
- Iterate quickly, refine deliberately
- Design for accessibility from the wireframe stage
- Mobile-first wireframing

**Get Started:**
1. Activate Wade (read `_bmad/bme/_designos/agents/wireframe-designer.md`)
2. Run `WM` command
3. Follow the 6-step workflow (20-30 minutes)
4. Get comprehensive wireframe artifact

**Questions?**
- [CH] Chat with Wade about wireframe design
- `/bmad-help I need wireframe guidance`

Great work! Wade looks forward to turning your ideas into structured layouts. 🎨

---

**Document Version:** 1.0.0
**Created:** 2026-02-14
**Last Updated:** 2026-02-14
**Agent:** Wade (wireframe-designer) v1.0.0
**Status:** Production Ready
