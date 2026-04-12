# Product Scope

## MVP — Minimum Viable Product

Per OP-1 and OP-2, each workstream is independently valuable. Per M10, partial MVP is acceptable IF deferrals are explicit, named, and have follow-up plans.

**Mandatory for 4.0 MVP:**
- **WS1 / U10** — foundation; deferring means Convoke breaks on BMAD v6.3+
- **WS4 / A9** — at minimum its first validation target (Release Process Checklist item: recursive tooling check for `bmad-enhance-initiatives-backlog`). Full registry can be minimal but must exist.
- **All Sprint 1 experiments** (EXP1, EXP2, EXP3) — they inform every downstream decision (M5)
- **Architecture doc passing IR gate before dev starts** — M6, M7, M8

**Deferrable if maintainer bandwidth requires:**
- **WS3 / A8** (Amelia consolidation) — deferrable if upstream Amelia is unstable or if skill-dir sweep overruns
- **WS2 / P23** (marketplace publication) — highest-profile workstream but not a correctness blocker. Standalone 4.0 is a valid release even if marketplace approval is pending

**Minimum-viable quality bar:**
- IR gate run before dev starts (M7)
- PF1 validation battery run before release (M9)
- Sprint 1 experiments run in week 1 (M5)
- Retrospective scheduled in Sprint 0 (Release Process Checklist)
- CHANGELOG per Sophia's voice (M16)
- N=1 external user validation (M17)

## Growth Features (Post-MVP, 4.1+)

- **Post-release drift monitoring** — explicitly deferred per PM3. Addresses the gap between pre-release synthetic validation and production behavior.
- ~~**Bolder Move 3 — platform-agnostic publishing**~~ — **ABSORBED into 4.0** (EXP3 passed 2026-04-12). WS2 scope now includes validation that exported Tier 1 skills produce usable adapters across Claude Code, Copilot, and Cursor. Moved from Growth to MVP capability.
- **Marketplace promotion to `community-reviewed`** — requires BMAD org review; out of scope for 4.0; 4.1+ follow-up.
- **Buyer-facing positioning** — per shark tank ST2, enterprise buyer concerns out of scope for 4.0.
- **Agent behavior telemetry + user feedback infrastructure** — would make `unknown_until_validated` measurable and replace structural proxies with direct user-reality measurements. Separate N1-telemetry initiative.

## Vision (Future)

- **Multi-platform publishing at scale** — Convoke skills available through BMAD marketplace + Claude Code native + Copilot + Cursor + Windsurf simultaneously.
- **Community contribution model** — per ST4, opening Convoke to external contributions with defined review bar.
- **`host_framework_sync` as a standard release pattern** — every major BMAD rev applies the 4.0 playbook with minimal re-reasoning. v6.4, v7.0, v8.0 all follow the template.
- **`bmad-certified` trust tier** — earned through sustained stability, community review, and upstream partnership.
- **Unblocks Convoke ecosystem expansion** — Forge, Helm, Loom teams shipped via marketplace as they mature.
