# Update Guide

How to update your BMAD-Enhanced installation to the latest version.

---

## Quick Update

```bash
# Update the package
npm install bmad-enhanced@latest

# Preview changes (dry run)
npx bmad-update --dry-run

# Apply the update
npx bmad-update
```

Your data is backed up automatically before any changes.

---

## Update Commands

### `npx bmad-update`

Main update command — applies migrations and refreshes your installation.

| Flag | Description |
|------|-------------|
| `--dry-run` | Preview changes without applying |
| `--yes` or `-y` | Skip confirmation prompt |
| `--verbose` or `-v` | Show detailed output |

```bash
npx bmad-update --dry-run     # Preview
npx bmad-update               # Apply with confirmation
npx bmad-update --yes         # Apply without confirmation
```

### `npx bmad-version`

Show current version, latest available version, and migration history.

```bash
npx bmad-version
```

### `npx bmad-doctor`

Run diagnostics on your installation. Checks project root, config validity, agent files, workflows, output directory permissions, migration lock status, and version consistency — with actionable fix suggestions.

```bash
npx bmad-doctor
```

---

## Migration Paths

### From v1.4.x to v1.5.x

**Breaking changes:** None

What happens:
- Isla (Discovery & Empathy Expert) and Max (Learning & Decision Expert) agents added
- 6 new workflows installed (empathy-map resurrected for Isla)
- Installer updated to `bmad-install-vortex-agents`
- Legacy installers (`install-emma`, `install-wade`) show deprecation warnings

### From v1.3.x to v1.5.x

**Breaking changes:** None

What happens:
- Architecture refactor (internal — no user-facing changes)
- Agent files and workflows refreshed
- Isla + Max agents added with 6 new workflows

### From v1.0.x to v1.5.x

**Breaking changes:**
- Workflow renamed: `empathy-map` → `lean-persona` (for Emma)
- Agent roles updated: `empathy-mapper` → `contextualization-expert`, `wireframe-designer` → `lean-experiments-specialist`
- Module renamed: `_designos` → `_vortex`

What happens:
- Old workflows preserved in `_bmad/bme/_vortex/workflows/_deprecated/`
- All 13 Vortex workflows installed
- Config structure updated (preferences preserved)
- 4 agents installed (Emma, Isla, Wade, Max)

```bash
npm install bmad-enhanced@latest
npx bmad-update --dry-run  # Preview
npx bmad-update            # Apply
```

---

## Data Safety

### Automatic Backups

Every update creates a backup before making changes:

- **Location:** `_bmad-output/.backups/backup-{version}-{timestamp}/`
- **Includes:** config.yaml, agents, workflows, agent-manifest.csv
- **Retention:** Last 5 backups kept automatically
- **Rollback:** Automatic if migration fails

### What's Never Touched

- All user-generated files in `_bmad-output/`
- User preferences (name, language settings)
- Custom configuration values

### What Gets Updated

- Agent definition files
- Workflow files (steps, templates, validation)
- Vortex config.yaml (with preference preservation)
- User guides

---

## Troubleshooting

### "Migration already in progress"

A previous migration may have crashed. Remove the lock file:

```bash
rm _bmad-output/.migration-lock
npx bmad-update
```

Or run `npx bmad-doctor` to diagnose — it detects stale locks.

### Update fails and won't rollback

Restore from backup manually:

```bash
# Find your backup
ls -la _bmad-output/.backups/

# Restore (replace {backup-dir} with actual directory name)
cp -r _bmad-output/.backups/{backup-dir}/config.yaml _bmad/bme/_vortex/
cp -r _bmad-output/.backups/{backup-dir}/agents _bmad/bme/_vortex/
cp -r _bmad-output/.backups/{backup-dir}/workflows _bmad/bme/_vortex/
```

### "Installation appears corrupted"

Reinstall from scratch (preserves user data):

```bash
npx bmad-install-vortex-agents
```

### Check migration logs

```bash
ls -la _bmad-output/.logs/
cat _bmad-output/.logs/migration-*.log | tail -100
```

---

## Getting Help

If you encounter issues:

1. Run `npx bmad-doctor` for diagnostics
2. Check migration logs in `_bmad-output/.logs/`
3. Restore from backup in `_bmad-output/.backups/`
4. [Report an issue](https://github.com/amalik/BMAD-Enhanced/issues) — include your version (`npx bmad-version`) and error message

---

[Back to README](README.md) | [Installation Guide](INSTALLATION.md) | [Changelog](CHANGELOG.md)
