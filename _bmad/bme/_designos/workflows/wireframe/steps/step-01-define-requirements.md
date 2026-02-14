---
step: 1
workflow: wireframe
title: Define Requirements
---

# Step 1: Define Requirements

Before we create a wireframe, we need to understand exactly what we're building and why.

## Why This Matters

A wireframe is only useful if it solves a real problem. Generic wireframes waste time. Specific wireframes (for a specific screen, user, and goal) accelerate design and development.

## Your Task

Answer these questions to define your wireframe requirements:

### 1. What are we wireframing?

- **Scope:** Single screen? User flow (multiple screens)? Full app?
- **Screen name:** What do you call this screen? (e.g., "Dashboard Home", "Checkout Flow", "Product Detail Page")
- **Platform:** Web (desktop)? Web (mobile)? Mobile app (iOS/Android)?
- **Viewport size:**
  - Mobile: 375px width (iPhone standard)
  - Tablet: 768px width
  - Desktop: 1024px+ width
  - Responsive: All of the above?

### 2. Who is this for?

- **Target user:** Who will use this screen? (Reference an empathy map if available, e.g., "Sarah Chen from empathy-map-sarah-chen-2026-02-14.md")
- **User's primary goal:** What is the ONE thing users come here to do?
- **User's technical proficiency:** Tech-savvy? Average? Non-technical?
- **User context:** Are they rushed? Exploring? Completing a specific task?

### 3. What's the core functionality?

- **Primary action:** The MAIN thing users do on this screen (e.g., "Check account balance")
- **Secondary actions:** Supporting tasks (e.g., "View recent transactions", "Transfer money")
- **Information displayed:** What data does the screen show? (e.g., "Balance, last 5 transactions, quick action buttons")
- **Data sources:** Where does the information come from? (APIs, databases, user input)

### 4. Design constraints?

- **Existing design system?** Are you using Material Design, iOS Human Interface Guidelines, custom component library?
- **Brand guidelines?** Any must-have elements (logo placement, color scheme - high level only)
- **Technical constraints?** Third-party integrations, API limitations, performance requirements?
- **Accessibility requirements?** WCAG 2.1 Level AA compliance? Screen reader support?

## Example

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

## Your Turn

Please define your wireframe requirements using the structure above.

## Next Step

When you've defined your requirements and I've confirmed they're specific enough, I'll load:

{project-root}/_bmad/bme/_designos/workflows/wireframe/steps/step-02-user-flows.md
