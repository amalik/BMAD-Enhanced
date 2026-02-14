---
title: "Empathy Map: Sarah Chen"
date: 2026-02-14
created-by: TestUser with Emma (empathy-mapper)
research-sources: User Interview (2026-02-10), Behavioral Observation
status: DRAFT
---

# Empathy Map: Sarah Chen

## Executive Summary

**Key Insights:**

1. **Speed vs. Security Tension** - Sarah trusts the app with her money but resents authentication friction. She doesn't reject security - she rejects unnecessary security steps. Face ID proves security can be fast.

2. **Frequency Drives Design Needs** - Opening the app 3-5 times daily with <2 min sessions reveals a "glance and go" mental model, yet the current design treats every interaction like a full session.

3. **Anxiety as Core Driver** - The strongest emotional pattern is anxiety (about timeouts, finding features, slow auth). Every pain point feeds this underlying emotional state. Solutions must address confidence, not just efficiency.

4. **Trust is Conditional** - "I trust the app with my money, but I don't trust it won't log me out" reveals split trust: she trusts the security but not the reliability. Session stability is as critical as data protection.

5. **Hidden Features = Cognitive Load** - Even when the app is "pretty," beauty without usability creates frustration. Sarah doesn't want to learn - she wants to do.

**Primary Pain Points:**

1. Multi-step authentication friction (password + SMS code)
2. Session timeouts during transactions
3. Hidden core features in nested menus

**Top Desired Gains:**

1. One-tap balance check (no authentication required)
2. Reliable session stability during transactions
3. Seamless biometric-only authentication

---

## Target User Profile

**Who:** Sarah Chen, 34-year-old Marketing Manager with medium-high tech savviness, iPhone 13 user

**Job-to-be-done:** Manage personal finances through mobile banking (check balances, transfer money, pay bills) efficiently throughout the day

**Context:** Daily usage with focus on speed and efficiency - most sessions under 2 minutes, 3-5 times per day

**Research Sources:**
- User interview (2026-02-10, 45 minutes, UX Researcher)
- Behavioral observation data
- Direct user quotes

---

## Says & Thinks

### What They SAY (Direct Quotes)

1. "I just want to check my balance quickly - why do I need to enter a password AND a code from my phone?"
2. "The app is pretty, but sometimes I can't find basic features like 'transfer money' - it's buried in menus."
3. "I trust the app with my money, but I don't trust it won't log me out halfway through paying a bill."

### What They THINK (Inferred Thoughts)

1. "If this takes more than 30 seconds, I'm giving up" (abandons transactions after 30s)
2. "I shouldn't have to hunt for basic features - this should be intuitive" (frustration with hidden features)
3. "Face ID is the only authentication that doesn't slow me down" (preference for biometric over passwords)
4. "I'm constantly anxious about being logged out mid-transaction" (trust issue with session timeouts)

---

## Does & Feels

### What They DO (Observable Actions)

1. Opens mobile banking app 3-5 times per day
2. Keeps most sessions under 2 minutes (quick balance checks)
3. Abandons transactions if authentication takes more than 30 seconds
4. Uses Face ID for login (avoids password entry)
5. Frequently checks balance before making financial decisions

### What They FEEL (Emotional States)

1. **Frustrated** by multi-step authentication flows (password + SMS code)
2. **Anxious** about being logged out mid-transaction
3. **Annoyed** when basic features are hidden in nested menus
4. **Impatient** when processes take too long (values speed)
5. **Secure** with biometric authentication but **insecure** about session stability

---

## Pain Points

**Priority:** High = Critical | Medium = Important | Low = Nice-to-fix

### HIGH PRIORITY

**Pain #1: Multi-Step Authentication Friction**
- **The Pain:** Requires password AND SMS code to access account
- **Impact:** Abandons transactions if authentication takes >30 seconds; prevents quick balance checks
- **Evidence:** "I just want to check my balance quickly - why do I need to enter a password AND a code from my phone?"
- **Priority:** HIGH

**Pain #2: Session Timeouts During Transactions**
- **The Pain:** App logs users out mid-transaction
- **Impact:** Creates anxiety, forces users to restart transactions, erodes trust
- **Evidence:** "I trust the app with my money, but I don't trust it won't log me out halfway through paying a bill."
- **Priority:** HIGH

**Pain #3: Hidden Core Features**
- **The Pain:** Basic features like "transfer money" are buried in nested menus
- **Impact:** Wastes time hunting for frequently-used features; reduces app efficiency
- **Evidence:** "The app is pretty, but sometimes I can't find basic features like 'transfer money' - it's buried in menus."
- **Priority:** HIGH

### MEDIUM PRIORITY

**Pain #4: Unclear Error Messages**
- **The Pain:** When transfers fail, error messages don't explain why
- **Impact:** Users don't know if issue is temporary, fixable, or critical
- **Evidence:** Listed in persona's documented pain points
- **Priority:** MEDIUM

**Pain #5: No Quick-Access Balance View**
- **The Pain:** Can't check balance without full authentication
- **Impact:** Opens app 3-5 times daily but forced through login each time
- **Evidence:** Behavioral data shows high-frequency, short-duration sessions (<2 min)
- **Priority:** MEDIUM

**Summary:**
- **High Priority:** 3 pain points
- **Medium Priority:** 2 pain points
- **Low Priority:** 0 pain points

---

## Desired Gains

**Priority:** High = Must-have | Medium = Important | Low = Nice-to-have

### HIGH PRIORITY

**Gain #1: One-Tap Balance Check**
- **The Gain:** Check account balance without full authentication
- **Value:** Enables quick financial decisions throughout the day without friction
- **Success Metric:** Can check balance in <5 seconds vs. current 30+ seconds with auth
- **Priority:** HIGH

**Gain #2: Reliable Session Stability**
- **The Gain:** Confidence that transactions won't time out mid-process
- **Value:** Reduces anxiety, builds trust in the app for critical financial operations
- **Success Metric:** Zero session timeouts during active transactions; can complete bill payment without interruption
- **Priority:** HIGH

**Gain #3: Seamless Biometric Authentication**
- **The Gain:** Use Face ID for all authentication (no passwords or SMS codes)
- **Value:** Maintains security while eliminating friction from multiple auth steps
- **Success Metric:** Single biometric check grants access vs. current password + SMS code
- **Priority:** HIGH

### MEDIUM PRIORITY

**Gain #4: Quick Access to Frequent Actions**
- **The Gain:** Transfer money and pay bills from main screen (no menu hunting)
- **Value:** Completes routine transactions efficiently during short app sessions
- **Success Metric:** 90% of transactions completed within 2-minute sessions vs. current abandonment after 30s
- **Priority:** MEDIUM

**Gain #5: Clear Error Communication**
- **The Gain:** When transfers fail, receive specific explanations with next steps
- **Value:** User can resolve issues independently instead of guessing or calling support
- **Success Metric:** Error messages include reason + action (e.g., "Insufficient funds. Add $50 to complete transfer")
- **Priority:** MEDIUM

**Summary:**
- **High Priority:** 3 must-have gains
- **Medium Priority:** 2 important gains
- **Low Priority:** 0 nice-to-have gains

---

## Design Implications

### What This Means for Design

**Based on this empathy map, we should:**

1. **Prioritize:**
   - Biometric-first authentication (eliminate password + SMS code flow)
   - Widget or quick-view for balance checking (no login required for read-only data)
   - Session persistence during active transactions (timeout only after inactivity)
   - Main screen shortcuts for top 3 actions (transfer, pay bills, check balance)

2. **Avoid:**
   - Adding more security steps without eliminating existing ones
   - Hiding frequently-used features in nested menus
   - Assuming users want feature-rich experiences (they want fast, focused experiences)
   - Session timeouts that don't distinguish between idle browsing and active transactions

3. **Focus On:**
   - Speed over aesthetics (though Sarah appreciates "pretty," it's secondary to function)
   - Confidence-building (reliability signals, clear progress indicators, no unexpected logouts)
   - Zero-learning-curve UX (intuitive, not clever)
   - Error messaging that educates and empowers (not just reports failure)

### Feature Prioritization Matrix

| Pain Point | Desired Gain | Design Opportunity | Priority |
|------------|--------------|-------------------|----------|
| Multi-step authentication friction | Seamless biometric authentication | Face ID-only login flow | HIGH |
| No quick-access balance view | One-tap balance check | Home screen widget or quick-view | HIGH |
| Session timeouts during transactions | Reliable session stability | Smart timeout (only after inactivity, never during active transaction) | HIGH |
| Hidden core features | Quick access to frequent actions | Main screen shortcuts for top 3 actions | MEDIUM |
| Unclear error messages | Clear error communication | Redesign error messaging (reason + action + recovery path) | MEDIUM |

---

## Validation Checklist

- [ ] Empathy map reviewed by users (shows it resonates)
- [ ] Team alignment achieved (stakeholders understand user perspective)
- [ ] Design decisions informed by insights (wireframes, features)
- [ ] Success metrics defined (based on user gains)
- [ ] Research sources documented (traceable insights)

---

## Next Steps

**Recommended Actions:**

1. **Validate:** Show this empathy map to 3-5 mobile banking users and ask if it resonates
2. **Share:** Present to product team for alignment on user needs and priorities
3. **Design:** Use insights to inform wireframes (focus on main screen shortcuts, biometric flow, session management)
4. **Measure:** Track success using gain metrics (balance check time, transaction completion rate, session timeout incidents)
5. **Iterate:** Update empathy map as new research emerges from usability testing

---

## Research Sources

**Primary Sources:**

1. **User Interview** - Sarah Chen (2026-02-10)
   - Duration: 45 minutes
   - Conducted by: UX Researcher
   - Format: Semi-structured interview
   - Key outputs: Direct quotes, pain points, desired gains

2. **Behavioral Observation**
   - App usage frequency: 3-5 times per day
   - Session duration: <2 minutes (most sessions)
   - Abandonment threshold: 30 seconds for authentication
   - Authentication preference: Face ID over password

3. **Documented Pain Points**
   - Authentication friction
   - Feature discoverability
   - Session timeouts
   - Error messaging

---

**Created by:** TestUser
**Created with:** Emma (empathy-mapper) - BMAD Enhanced
**Date:** 2026-02-14
**Version:** 1.0
**Status:** DRAFT

---

*This empathy map is a living document. Update it as you learn more about your users through ongoing research.*
