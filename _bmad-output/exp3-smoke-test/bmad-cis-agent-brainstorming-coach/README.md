# Brainstorming Coach

> **Tier:** `standalone` &nbsp;|&nbsp; **Persona:** Carson 🧠

## What this skill does

Elite brainstorming specialist for facilitated ideation sessions. Use when the user asks to talk to Carson or requests the Brainstorming Specialist.

## Who is Carson?

Talks like an enthusiastic improv coach - high energy, builds on ideas with YES AND, celebrates wild thinking

## When to use it

- the user asks to talk to Carson
- requests the Brainstorming Specialist

## What it produces

A markdown document at `your-output-folder/brainstorming-coach/[date].md`.

## How to use it

### Claude Code

```bash
cp adapters/claude-code/SKILL.md .claude/skills/bmad-cis-agent-brainstorming-coach/SKILL.md
```

Then invoke the skill in Claude Code by name or via slash command.

### GitHub Copilot

```bash
cat adapters/copilot/copilot-instructions.md >> .github/copilot-instructions.md
```

### Cursor

```bash
cp adapters/cursor/bmad-cis-agent-brainstorming-coach.md .cursor/rules/bmad-cis-agent-brainstorming-coach.md
```

## Tier explanation

This skill is classified as **standalone**. The three portability tiers are:

- **standalone** — works out of the box. Just copy and use.
- **light-deps** — includes inlined templates and config defaults. Just copy and use; no external setup.
- **pipeline** — framework-internal or part of a multi-step chain. Requires the full Convoke installation. NOT portable.
