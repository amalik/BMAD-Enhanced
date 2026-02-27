---
step: 3
workflow: wireframe
title: Information Architecture
---

# Step 3: Information Architecture

Let's organize content and UI elements hierarchically.

## Your Task

### 1. Content Priority (Visual Hierarchy)
What's most important on this screen?

**Primary (above the fold, largest/boldest):**
- The ONE thing users came here to see/do

**Secondary (mid-screen, medium emphasis):**
- Supporting information and actions

**Tertiary (below fold or subtle):**
- Metadata, help text, less critical features

### 2. Grouping
How to organize related elements?

- **Visual grouping:** Cards? Sections? Accordions?
- **Logical grouping:** By task? By time? By category?
- **Separation:** Spacing? Dividers? Background colors?

### 3. Navigation
How do users move around?

- **Primary nav:** Top bar? Bottom tabs? Sidebar? Hamburger menu?
- **Secondary nav:** Breadcrumbs? Tabs? Segmented controls?
- **Back/Close:** Where do these buttons go?

### 4. Information Density
How much is too much?

- **Progressive disclosure:** Show essentials, hide details until needed
- **Lazy loading:** Load more on scroll?
- **Pagination vs. infinite scroll**

## Example

```
Dashboard Screen (Mobile - 375px)

[Visual Hierarchy]
Primary: Account balance ($$$) - Hero section, centered, large
Secondary: Quick actions (3 buttons) - Mid section
Tertiary: Recent transactions (list) - Bottom, scrollable

[Grouping]
Section 1: Hero (balance + last updated)
Section 2: Quick Actions (3 icon buttons, horizontal)
Section 3: Activity (transaction list with "Load More")

[Navigation]
Bottom Tab Bar: [Home] [Accounts] [Cards] [Profile]
Top Bar: [Menu ☰] [Notifications 🔔]
```

## Next Step

{project-root}/_bmad/bme/_designos/workflows/wireframe/steps/step-04-wireframe-sketch.md
