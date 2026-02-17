# BMAD-Enhanced Update Guide

This guide explains how to update your BMAD-Enhanced installation from previous versions to v1.3.0.

## Quick Update

The easiest way to update:

```bash
# Update the package
npm install bmad-enhanced@latest

# Preview changes (dry run)
npx bmad-update --dry-run

# Apply the update
npx bmad-update
```

Your data will be backed up automatically before any changes.

---

## Update Commands

### `npx bmad-update`
Main update command - applies migrations and updates your installation.

**Flags:**
- `--dry-run` - Preview changes without applying
- `--yes` or `-y` - Skip confirmation prompt
- `--verbose` or `-v` - Show detailed output

**Examples:**
```bash
# Preview changes
npx bmad-update --dry-run

# Apply update with confirmation
npx bmad-update

# Apply update without confirmation
npx bmad-update --yes

# Verbose output
npx bmad-update --verbose
```

### `npx bmad-version`
Show current installed version and migration history.

**Example:**
```bash
npx bmad-version
```

**Output:**
```
BMAD-Enhanced Version Information

Installed version: 1.1.0
Package version:   1.3.0

Status: ⚠ Update available

Run: npx bmad-update --dry-run (to preview)
     npx bmad-update (to apply)

Migration History:
1. 1.0.0 → 1.1.0 (2/15/2026)
```

### `npx bmad-migrate`
Advanced: Run specific migrations manually.

**Warning:** This bypasses safety checks. Use `npx bmad-update` for normal updates.

**Examples:**
```bash
# List available migrations
npx bmad-migrate

# Run specific migration
npx bmad-migrate 1.1.x-to-1.2.0
```

---

## Migration Paths

### From v1.1.x to v1.3.0

**Breaking Changes:** None

**What gets updated:**
- Version number: 1.1.x → 1.3.0
- Agent files (bug fixes/improvements)
- User guides
- Config structure

**What gets preserved:**
- All user data in `_bmad-output/`
- User preferences (name, language settings)
- Deprecated workflows in `_deprecated/`

**Steps:**
```bash
npm install bmad-enhanced@1.3.0
npx bmad-update
```

### From v1.0.x to v1.3.0

**⚠ Breaking Changes:**
- Workflow renamed: `empathy-map` → `lean-persona`
- Agent roles updated (empathy-mapper → contextualization-expert)

**What gets updated:**
- empathy-map workflow moved to `_deprecated/`
- 7 new Vortex Framework workflows installed
- Config.yaml structure updated
- Agent files and manifest updated
- User guides updated

**What gets preserved:**
- All user data in `_bmad-output/`
- User preferences
- Old empathy-map workflow (in `_deprecated/` for reference)

**Steps:**
```bash
npm install bmad-enhanced@1.3.0
npx bmad-update --dry-run  # Preview changes
npx bmad-update            # Apply update
```

---

## Data Safety

### Automatic Backups

Every migration creates a backup **before** making changes:
- Location: `_bmad-output/.backups/backup-{version}-{timestamp}/`
- Includes: config.yaml, agents/, workflows/, agent-manifest.csv
- Automatic rollback if migration fails

### What's Never Touched

**Sacred user data:**
- All files in `_bmad-output/` (except documentation guides)
- User preferences in `_bmad/core/config.yaml`
- BMAD Method's `_config/manifest.yaml`
- Custom config settings

**Safe to update:**
- Agent definitions
- Workflow files
- Vortex config.yaml (with preference preservation)
- User guides (documentation)

### Manual Backup (Optional)

For extra safety, back up your entire `_bmad/` directory:

```bash
cp -r _bmad _bmad-backup-$(date +%Y%m%d)
```

---

## Troubleshooting

### Update fails with "Migration already in progress"

A previous migration may have crashed. Remove the lock file:

```bash
rm _bmad-output/.migration-lock
npx bmad-update
```

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

Reinstall from scratch:

```bash
npx bmad-install-agents
```

This will overwrite framework files but preserve your user data.

### Lost user data after update

User data should never be lost. Check:

1. **Original location:** `_bmad-output/` (user data preserved here)
2. **Backup location:** `_bmad-output/.backups/` (check most recent backup)

If data is missing, restore from the most recent backup.

### Check migration logs

Migration logs are stored in `_bmad-output/.logs/`:

```bash
# List logs
ls -la _bmad-output/.logs/

# View most recent log
cat _bmad-output/.logs/migration-*.log | tail -100
```

---

## Manual Migration (Advanced)

If automatic migration isn't working, you can migrate manually.

### v1.1.x → v1.3.0 Manual Steps

1. **Backup:**
   ```bash
   cp -r _bmad _bmad-backup
   ```

2. **Update package:**
   ```bash
   npm install bmad-enhanced@1.3.0
   ```

3. **Update version in config:**
   Edit `_bmad/bme/_vortex/config.yaml`:
   ```yaml
   version: 1.3.0
   ```

4. **Verify:**
   ```bash
   npx bmad-version
   ```

### v1.0.x → v1.3.0 Manual Steps

1. **Backup:**
   ```bash
   cp -r _bmad _bmad-backup
   ```

2. **Update package:**
   ```bash
   npm install bmad-enhanced@1.3.0
   ```

3. **Move deprecated workflows:**
   ```bash
   mkdir -p _bmad/bme/_vortex/workflows/_deprecated
   mv _bmad/bme/_vortex/workflows/empathy-map _bmad/bme/_vortex/workflows/_deprecated/
   ```

4. **Reinstall agents:**
   ```bash
   npx bmad-install-agents
   ```

5. **Verify:**
   ```bash
   npx bmad-version
   ```

---

## FAQs

### Will my user data be lost?

No. All user data in `_bmad-output/` is preserved during updates. The update system never touches user-generated files.

### Can I rollback if something goes wrong?

Yes. Every migration creates a backup automatically. If migration fails, it rolls back automatically. You can also manually restore from `_bmad-output/.backups/`.

### How do I know if update is needed?

After `npm install bmad-enhanced@latest`, run:

```bash
npx bmad-version
```

It will show if an update is available.

### Can I skip versions?

Yes. The update system handles version skipping automatically. For example, v1.0.5 → v1.3.0 works fine.

### What if I customized workflow files?

The update system detects customized files and asks what to do:
- Keep your customizations (backup new templates)
- Use new version (backup your changes)
- Abort migration

### How often should I update?

Update when:
- New features you need are released
- Security or bug fixes are available
- You see "Update available" in `npx bmad-version`

No need to update if current version works for you.

### Where are backups stored?

`_bmad-output/.backups/backup-{version}-{timestamp}/`

The system keeps the 5 most recent backups automatically.

---

## Getting Help

If you encounter issues:

1. **Check migration logs:** `_bmad-output/.logs/migration-*.log`
2. **Restore from backup:** `_bmad-output/.backups/`
3. **Report issue:** https://github.com/amalik/BMAD-Enhanced/issues

Include:
- Your version (`npx bmad-version`)
- Migration log file
- Error message

---

## Version History

### v1.3.0 (February 2026)
- **NEW:** Automatic update/migration system
- **NEW:** CLI commands: `bmad-update`, `bmad-version`, `bmad-migrate`
- **NEW:** Automatic backups before migrations
- **NEW:** Migration history tracking
- Improved postinstall experience with upgrade detection

### v1.2.0 (February 2026)
- Complete Vortex Framework implementation
- 7 workflows: lean-persona, product-vision, contextualize-scope, mvp, lean-experiment, proof-of-concept, proof-of-value
- Emma: Contextualization Expert
- Wade: Lean Experiments Specialist
- Deprecated: empathy-map, wireframe workflows

### v1.1.0 (January 2026)
- Framework repositioning
- User guides updated

### v1.0.0 (Initial Release)
- Emma: Empathy Mapping Specialist
- Wade: Wireframe Designer
- Basic workflows

---

**Last updated:** February 17, 2026
**Version:** 1.3.0
