# Executive Summary

**Convoke 4.0 is the first release where Convoke acts on its identity as an ecosystem product — not a side project — with everything that implies for distribution, governance, and sustainability.** It is a coordinated platform alignment release adopting BMAD METHOD v6.3.0 upstream, formalized as the first instance of a named, reusable release class: `host_framework_sync`.

**Core insight powering this release:** Convoke is *content, not software* — LLM-interpreted prompts, skills, and workflow definitions rather than compiled code. This reframe drives every architectural and product decision in 4.0: upstream sync becomes ongoing content-distribution discipline (not emergency patching), validation becomes necessarily behavioral (not syntactic), and distribution becomes a strategic lever (not plumbing). v6.3 adoption is the first release where Convoke acts on this insight explicitly.

**Target users:** IT transformation consultants and small teams using Convoke on brownfield enterprise engagements. The release is optimized for *continuity of use* — existing users experience a healthy upgrade with auto-migration handling config layout changes, and their agents continue to behave equivalently on representative inputs.

**Problem being solved:** BMAD v6.3.0 introduces four structural changes that affect Convoke — elimination of the `bmad-init` skill, removal of the custom-content installation path in favor of marketplace-only distribution, upstream consolidation of the BMM developer/QA/SM agents into Amelia, and no compatibility version field in the marketplace schema. Without adoption, Convoke drifts into an unmaintained fork. With adoption, Convoke becomes an officially registered BMAD community module with a durable governance layer.

**Validation as a first-class deliverable:** Pre-release validation of agent behavioral equivalence on representative inputs is a new capability this release introduces — the validation protocol is an architecture deliverable, not an afterthought. Synthetic battery only; post-release drift monitoring is a separate future capability.

**Release scope — four workstreams, sequenced `(WS1/U10 ‖ WS3/A8) → WS4/A9 → WS2/P23`:**

- **WS1 / U10 — Direct-load migration** (highest blast radius): Retire `bmad-init`, sweep ~25 agent activation patterns across core/bmm/cis/tea/wds/bme modules, ship idempotent user migration script in `convoke-update`. ~14 stories, 2–3 weeks.
- **WS2 / P23 — Marketplace publication** (sequenced after WS1 and WS4): Register Convoke as community module in `bmad-plugins-marketplace`, add runtime compatibility preflight to protect against the missing `bmad_version` field, audit skill-dir conformance. 1–2 weeks.
- **WS3 / A8 — Adopt upstream Amelia consolidation** (parallel to WS1): Track upstream BMM agent removal (Bob/Quinn/Barry). Alignment is a deliberate product choice matching Convoke's target user reality — solo consultants and small teams do not benefit from separate SM/QA/Dev personas. 3–5 days.
- **WS4 / A9 — Convoke extensions compatibility governance** (finalizes before WS2): Build `bmm-dependencies.csv` registry, validate Convoke-owned skills that extend BMM agents, wire regression gate into `convoke-update`. **First validation target: the `bmad-enhance-initiatives-backlog` skill — the very skill used to track this release — must pass the WS4 gate before any other dependency inventory work.** Recursive tooling risk demands this ordering. 3–5 days.

**Sprint 1 pre-work — three pre-registered experiments (~4 days total) de-risking the release:**

- **EXP1 — Migration correctness dry-run** (~2 days): Manually migrate one agent (Emma or John) to v6.3 direct-load, run pre/post against 5 real inputs from `_bmad-output/vortex-artifacts/`, diff outputs semantically. Go/no-go: if equivalence holds, mass-apply template; if fails, rescope the sweep early.
- **EXP2 — Marketplace PR pathfinder** (~1 day): Submit a draft registry entry to `bmad-plugins-marketplace` asking for process feedback (not merge). Surfaces approval unknowns before committing to WS2.
- **EXP3 — Platform-agnostic exporter smoke test** (~1 day): Run the existing P18 exporter on one agent to generate Claude Code + Copilot + Cursor adapters, smoke-test each. **RESOLVED 2026-04-12: PASS — all 3 adapters generated correctly.** Bolder Move 3 (platform-agnostic publishing) absorbed into 4.0 framing. Convoke ships everywhere, starting with the BMAD marketplace.

**Lineage:** This release is the first to leverage the skill portability infrastructure shipped in P16–P20 — that prior work (canonical skill format, exporter CLI, catalog generator, platform adapters) makes platform-agnostic publishing a confirmed 4.0 capability. EXP3 validated this in a 1-day smoke test (2026-04-12): Carson (brainstorming coach) exported with usable Claude Code + Copilot + Cursor adapters, all self-contained, no framework leaks.

**Honesty constraints** (from pre-mortem): Release scope is constrained by maintainer bandwidth — each workstream is independently valuable and may be deferred if timeline pressure mounts. Pre-release validation confirms agent behavioral equivalence on a representative sample only; post-release drift monitoring is a separate capability not delivered in 4.0. The strategic bet on BMAD coupling is revalidated at each major upstream release.

## What Makes This Special

Convoke 4.0 lands three firsts for the Convoke product line:

- **First Convoke release as an officially registered BMAD community module.** Status tier starts at `unverified` with a promotion path to `community-reviewed` and eventually `bmad-certified`. Unlocks discoverability through the BMAD registry for consultants who already trust that channel.
- **First release of a named, reusable release class.** `host_framework_sync` is delivered with a concrete playbook artifact — reusable for v6.4, v7.0, and beyond. Future BMAD major revs will apply this template instead of reinventing from scratch.
- **First formal recognition of Convoke-as-downstream with durable governance.** The `bmm-dependencies.csv` registry and its validation sweep turn what was previously silent breakage into surfaced regressions.

**Strategic bet (explicit, revalidated each major upstream release):** Convoke's value grows by being the best opinionated downstream of BMAD, not by being an independent agent framework. This release leans INTO BMAD coupling — marketplace distribution, shared config conventions, upstream tracking — accepting the risk that if BMAD's trajectory falters, Convoke falters with it. The bet is revalidated at each major upstream release (v6.4, v7.0, ...).

**User-facing communication drafts:** A plain-language translation of this release is captured in the PRD frontmatter under `visionDraft.plainLanguage` and `mostHonestOneLineSummary`. Sophia's ship-ready release announcement draft is in `partyFindingsRound2.PR2-5`. These are the voices to reach for in CHANGELOG, migration guide, and external release communication — not the internal framing above.
