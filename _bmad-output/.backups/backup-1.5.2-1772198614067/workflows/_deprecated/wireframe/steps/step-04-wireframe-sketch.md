---
step: 4
workflow: wireframe
title: Wireframe Sketch
---

# Step 4: Wireframe Sketch

Time to create the low-fidelity wireframe layout using ASCII art.

## Grid System

- **Mobile:** 8pt grid, 16px margins
- **Desktop:** 12-column grid, 24px gutters
- **Alignment:** Everything snaps to grid

## ASCII Wireframe Syntax

```
┌─────────────────────────────────┐  ← Top border
│ ☰ Menu    Page Title       🔔   │  ← Header bar
├─────────────────────────────────┤  ← Section divider
│                                 │
│        Main Content Area        │  ← Content section
│                                 │
│  ┌─────┐  ┌─────┐  ┌─────┐    │  ← Button row
│  │ Btn1│  │ Btn2│  │ Btn3│    │
│  └─────┘  └─────┘  └─────┘    │
├─────────────────────────────────┤
│ [Home] [Search] [Profile]      │  ← Bottom nav
└─────────────────────────────────┘  ← Bottom border
```

## Component Placement

1. **Header** (56-72px height)
   - Logo/back button (left)
   - Page title (center)
   - Actions/notifications (right)

2. **Content area**
   - Primary content (hero, main action)
   - Secondary content (supporting info)
   - Tertiary content (metadata, help)

3. **Navigation** (48-72px height)
   - Bottom tabs (mobile)
   - Sidebar (desktop)

## Typography Hierarchy

- **H1:** Screen title (24-32px)
- **H2:** Section headers (20-24px)
- **Body:** Content text (16px)
- **Caption:** Metadata (12-14px)

## Example: Mobile Dashboard

```
┌─────────────────────────────────┐
│ ☰                          🔔   │ ← Header (56px)
├─────────────────────────────────┤
│                                 │
│     Account Balance             │ ← H1 (Hero section)
│      $12,458.32                 │ ← Large text
│   Last updated: 2 min ago       │ ← Caption
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
│ ... (3 more items)              │
│ [Load More Transactions]        │ ← Button
├─────────────────────────────────┤
│ [🏠] [💳] [📊] [👤]            │ ← Bottom tabs (72px)
└─────────────────────────────────┘
```

## Your Turn

Create your wireframe sketch using ASCII art. Include:
- Header, content area, navigation
- Component placements
- Size annotations (px)

## Next Step

{project-root}/_bmad/bme/_designos/workflows/wireframe/steps/step-05-components.md
