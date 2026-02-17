---
step: 5
workflow: wireframe
title: Components & Interactions
---

# Step 5: Components & Interactions

Let's specify UI components, their states, and interactive behaviors.

## Component Library

Document which components are used:

**Buttons:**
- Primary CTA (main action)
- Secondary (supporting action)
- Tertiary/Text (less emphasis)

**Input Controls:**
- Text fields, dropdowns, checkboxes, radio buttons, toggles

**Data Display:**
- Cards, lists, tables, grids

**Feedback:**
- Toasts, alerts, modals, bottom sheets

**Progress:**
- Spinners, progress bars, skeleton screens

## Interaction Specifications

### Tap/Click Interactions
```
Element X → Action Y
Example:
- Tap "Transfer" button → Navigate to Transfer screen
- Tap transaction item → Show transaction details modal
- Pull to refresh → Reload balance and transactions
```

### Gestures (Mobile)
```
- Swipe left on transaction → Delete (with confirmation)
- Swipe right on transaction → Mark as reviewed
- Long press → Show context menu
- Pinch to zoom → (if applicable)
```

### Keyboard (Desktop)
```
- Tab → Navigate between fields
- Enter → Submit/Next
- Esc → Cancel/Close modal
```

## Component States

For each interactive component, define:

**Button States:**
- Default (idle)
- Hover (desktop)
- Pressed/Active
- Disabled (greyed out)
- Loading (spinner)

**Input Field States:**
- Empty (placeholder visible)
- Focused (cursor visible, border highlighted)
- Filled (user input present)
- Error (validation failed, show error message)
- Disabled

**Screen States:**
- Loading (skeleton/spinner)
- Empty (no data, show empty state illustration)
- Error (failed to load, show retry button)
- Success (data loaded, normal display)

## Responsive Breakpoints

### Mobile (320px - 767px)
- Single column layout
- Stack buttons vertically
- Bottom navigation

### Tablet (768px - 1023px)
- Two-column layout possible
- Buttons side-by-side
- Bottom or side navigation

### Desktop (1024px+)
- Multi-column layouts
- Sidebar navigation
- Hover states visible

## Example

```
[Components Used]
1. Button (Primary)
   - Elements: "Transfer", "Pay Bills", "Deposit"
   - Size: 100×48px, Border radius: 8px
   - States: Default, Pressed, Disabled, Loading

2. Transaction List Item
   - Layout: [Icon 32×32] [Name + Amount] [Arrow →]
   - Height: 64px
   - Tap → Transaction detail screen
   - Swipe left → Delete with confirmation

[Interactions]
- Tap balance → Account details screen
- Tap quick action → Respective flow
- Pull to refresh → Reload (with spinner)
- Swipe transaction → Delete/Archive

[Responsive]
- Mobile (375px): Single column, stacked
- Tablet (768px): Two columns for quick actions
- Desktop (1024px+): Sidebar + main content
```

## Next Step

{project-root}/_bmad/bme/_designos/workflows/wireframe/steps/step-06-synthesize.md
