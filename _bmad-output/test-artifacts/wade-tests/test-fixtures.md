# Wade (wireframe-designer) Test Fixtures

**Purpose:** Sample data and expected outputs for Wade P0 test suite
**Created:** 2026-02-14
**Agent:** Wade (wireframe-designer)

---

## Fixture 1: Mobile Dashboard Screen

### Input Requirements

**Screen:** Dashboard Home
**Platform:** Mobile (iOS/Android)
**Target User:** Banking app user checking account balance
**Primary Action:** View account balance and recent transactions

**Constraints:**
- Must work on screens as small as 375px wide
- Bottom navigation required (app standard)
- Maximum 3 quick actions above fold

**Success Criteria:**
- Balance visible without scrolling
- Recent transactions load in <2s
- All touch targets minimum 44×44px

---

### Expected User Flows

**Entry Points:**
- App launch (default screen)
- Bottom nav "Home" tap
- Deep link from notification

**Happy Path:**
1. User opens app
2. Dashboard loads with balance
3. User sees recent transactions
4. User taps transaction → detail view

**Alternative Flows:**
- User taps "Transfer" quick action → transfer flow
- User taps "See All" → full transaction history
- User pulls to refresh → reload data

**Exit Points:**
- Tap bottom nav icon (switch to another section)
- Tap transaction (navigate to detail)
- Background app (save state)

---

### Expected Information Architecture

**Visual Hierarchy:**
1. **Primary:** Account balance (hero section, large text)
2. **Secondary:** Quick actions (Transfer, Pay Bills, Deposit)
3. **Tertiary:** Recent transactions list (3-5 items)

**Content Grouping:**
- Header: Menu button, notifications
- Hero: Balance + last updated timestamp
- Quick Actions: 3 buttons in horizontal row
- Transactions: List with "See All" link

**Navigation:** Bottom tabs (Home, Cards, Reports, Profile)

**Information Density:**
- **Mobile:** Minimal - balance + 3 quick actions + 3 transactions
- **Desktop:** Expanded - balance + 6 quick actions + 10 transactions

---

### Expected Mobile Wireframe (ASCII)

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

**Annotations:**
- Header: 56px fixed height, menu left, notifications right
- Hero section: 120px tall, centered, high contrast
- Quick actions: 16px margin between buttons, equal width
- Transaction list: 64px per item, icon + text + amount + chevron
- Bottom nav: 72px fixed, 4 equal-width tabs

---

### Expected Components

**Components Identified:**
1. **AppHeader** - Menu button, title, notification icon
2. **BalanceCard** - Hero display with amount and timestamp
3. **QuickActionButton** - Icon + label, 100×48px
4. **TransactionListItem** - Icon + description + amount + chevron
5. **BottomNavigation** - 4 tabs with icons

**Component Specifications:**

#### BalanceCard
- **Type:** Hero card
- **Location:** Top of content area (below header)
- **Size:** Full width × 120px height
- **States:** Default, Loading, Error
- **Behavior:** Pull-to-refresh updates balance

#### QuickActionButton
- **Type:** Interactive button
- **Location:** Below hero, horizontal row
- **Size:** 100×48px each (mobile), expands on desktop
- **States:** Default, Pressed, Disabled
- **Behavior:** Tap → navigate to respective flow

#### TransactionListItem
- **Type:** Interactive list item
- **Location:** Scrollable list below quick actions
- **Size:** Full width × 64px height
- **States:** Default, Pressed, Unread (bold text)
- **Behavior:** Tap → transaction detail screen

---

### Expected Accessibility Notes

**WCAG 2.1 Level AA:**
- All touch targets minimum 44×44px (buttons meet this)
- Balance text contrast ratio ≥ 7:1 (large text AAA)
- Screen reader announces "Account Balance: $12,458.32"
- Keyboard navigation: Tab through quick actions → transactions → bottom nav

**Screen Reader:**
- Header: "Menu button, Dashboard, Notifications"
- Balance: "Account Balance: twelve thousand four hundred fifty-eight dollars and thirty-two cents, last updated 2 minutes ago"
- Quick Actions: "Transfer button, Pay Bills button, Deposit button"
- Transactions: "Recent Transactions, 3 items. Starbucks, debit five dollars forty-two cents, [timestamp]"

---

## Fixture 2: E-commerce Product Detail (Desktop)

### Input Requirements

**Screen:** Product Detail Page
**Platform:** Web (Desktop)
**Target User:** Online shopper researching product before purchase
**Primary Action:** View product details and add to cart

**Constraints:**
- Must support screen widths 1024px to 2560px
- Product images must be zoomable
- Related products section required

**Success Criteria:**
- Primary product image and details above fold at 1024px
- Add to cart button always visible (sticky)
- Minimum 4 related products shown

---

### Expected Desktop Wireframe (ASCII)

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

---

## Fixture 3: SaaS Onboarding Form (Mobile)

### Input Requirements

**Screen:** Create Account
**Platform:** Mobile Web (Responsive)
**Target User:** New SaaS user signing up for trial
**Primary Action:** Complete account creation form

**Constraints:**
- Single-column form layout on mobile
- Password strength indicator required
- Social sign-up options (Google, Microsoft)
- Must validate email format before submit

**Success Criteria:**
- All form fields accessible via keyboard
- Validation errors appear inline (not modal)
- Submit button disabled until form valid

---

### Expected Mobile Wireframe (ASCII)

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

---

## Fixture 4: Dashboard Analytics (Desktop)

### Input Requirements

**Screen:** Analytics Dashboard
**Platform:** Web (Desktop)
**Target User:** Business analyst reviewing KPIs
**Primary Action:** Monitor key metrics and trends

**Constraints:**
- Must display 6 KPI cards above fold
- Chart visualizations required (placeholder boxes in wireframe)
- Data refresh timestamp visible
- Export to CSV/PDF functionality

**Success Criteria:**
- All metrics load within 3 seconds
- Responsive grid (2 columns at 1024px, 3 columns at 1440px)
- Accessible data tables for screen readers

---

### Expected Desktop Wireframe (ASCII)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [☰ Menu]  Analytics Dashboard                    🔄 Last updated: 2:34 PM  │
├─────────────────────────────────────────────────────────────────────────────┤
│ [This Month ▼]  [Compare to: Last Month ▼]  [Export ▼]  [•••]             │ ← Filters
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                     │
│  │ Total Revenue│  │ New Customers│  │ Conversion   │                     │
│  │              │  │              │  │     Rate     │                     │
│  │  $127,458    │  │     432      │  │    3.2%      │                     │ ← KPI Cards
│  │  +12.5% ↗    │  │  +8.3% ↗     │  │  -0.4% ↘     │                     │
│  └──────────────┘  └──────────────┘  └──────────────┘                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                     │
│  │ Avg Order    │  │ Active Users │  │   Churn      │                     │
│  │    Value     │  │              │  │              │                     │
│  │   $295       │  │   12,847     │  │    2.1%      │                     │
│  │  +3.2% ↗     │  │  +15.7% ↗    │  │  -0.8% ↗     │                     │
│  └──────────────┘  └──────────────┘  └──────────────┘                     │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Revenue Trend (Last 12 Months)                                [See All ▶] │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                                                                       │ │
│  │  [Line chart visualization placeholder]                              │ │
│  │  Y-axis: Revenue ($0 - $150K)                                        │ │
│  │  X-axis: Jan - Dec 2026                                              │ │ ← Chart
│  │                                                                       │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Top Products                       │  Traffic Sources                     │
│  ┌─────────────────────────────────┐│ ┌────────────────────────────────┐  │
│  │ Product          Units   Revenue││ │ [Pie chart placeholder]        │  │
│  │ Headphones       1,234  $123K   ││ │                                │  │ ← Split view
│  │ Laptop Stand       987   $89K   ││ │ Organic: 45%                   │  │
│  │ USB-C Cable        2,341  $67K  ││ │ Paid Ads: 30%                  │  │
│  │ ...                             ││ │ Social: 15%                    │  │
│  └─────────────────────────────────┘│ │ Referral: 10%                  │  │
│                                      │ └────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Usage in P0 Tests

These fixtures are used in the following P0 test scenarios:

### T-WF-01 to T-WF-06: Workflow Execution
- **Fixture 1 (Mobile Dashboard):** Primary test case for complete workflow
- Use this fixture to test all 6 workflow steps loading correctly

### T-ACT-01 to T-ACT-04: Activation Tests
- **Fixture:** Any (focuses on config loading, not wireframe content)
- Tests agent initialization and error handling

### T-CMD-01 to T-CMD-03: Command Tests
- **Fixture 2 (E-commerce Product Detail):** Test exact command match "WM"
- **Fixture 3 (SaaS Onboarding):** Test fuzzy match "create wireframe"
- **Fixture 4 (Dashboard Analytics):** Test "VM" validation command

### T-OUT-01 to T-OUT-03: Output Quality Tests
- **Fixture 1:** Test complete artifact generation
- Verify all template sections populated
- Check ASCII wireframe formatting
- Validate component specifications

### T-REG-01 to T-REG-03: Registration Tests
- **Fixture:** Any (focuses on agent registration, not content)
- Tests agent presence in manifest and config

---

## Validation Criteria

### ASCII Wireframe Quality
- [ ] Uses box-drawing characters consistently (┌─┐│├┤└┘)
- [ ] Maintains alignment (monospace formatting)
- [ ] Includes size annotations (56px, 72px, etc.)
- [ ] Component boundaries clear
- [ ] Hierarchy visible (header → content → nav)

### Template Population
- [ ] All {variables} replaced with actual content
- [ ] No empty sections (or marked as "N/A" if not applicable)
- [ ] Frontmatter contains valid YAML
- [ ] Date format consistent (YYYY-MM-DD)
- [ ] Markdown formatting valid

### Component Specifications
- [ ] All interactive elements identified
- [ ] States documented (Default, Pressed, Disabled, etc.)
- [ ] Sizes specified (px for mobile, responsive for desktop)
- [ ] Accessibility notes present (ARIA labels, keyboard nav)

---

**Document Version:** 1.0.0
**Created:** 2026-02-14
**Last Updated:** 2026-02-14
**Status:** Ready for Testing
