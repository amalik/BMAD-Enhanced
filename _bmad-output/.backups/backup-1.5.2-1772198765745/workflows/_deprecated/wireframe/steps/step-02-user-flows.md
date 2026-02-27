---
step: 2
workflow: wireframe
title: User Flows
---

# Step 2: User Flows

Let's map how users navigate through your wireframe(s).

## Why This Matters

Understanding user flows prevents designing dead-end screens or confusing navigation. Every screen needs clear entry points and exit points.

## Your Task

### 1. Entry Points
How do users arrive at this screen?
- From home screen? From search? From notification?
- Deep link? QR code? Email link?
- What's their mental state? (rushing, exploring, completing task)

### 2. Primary Flow (Happy Path)
Map the ideal journey from entry to goal completion:

```
Entry → Action → Response → Goal Achieved
```

Example:
```
Home Screen
    ↓ (Tap "Balance")
Face ID Authentication
    ↓ (Success)
Balance Display
    ↓ (Goal: See balance)
[Done] or Continue to Secondary Action
```

### 3. Alternative Flows
What if...?
- User makes an error?
- Data is unavailable?
- Authentication fails?
- User wants to go back?
- User abandons the flow?

### 4. Exit Points
How do users leave?
- Goal completed → where next?
- Task abandoned → how to recover?
- Navigation to related features?

## Next Step

When you've mapped user flows, I'll load:

{project-root}/_bmad/bme/_designos/workflows/wireframe/steps/step-03-information-architecture.md
