---
title: Basic Settings
createTime: 2025/11/24 23:43:05
---

# Basic Settings

This page describes commonly used settings in SecScore and recommended defaults for stable classroom use.

## Theme & Appearance

- Theme switching: light/dark themes
- Theme editor: visually adjust theme settings (e.g., CSS variables and colors) and save as a custom theme
- UI scaling: scale the whole UI (window + font) to fit different screens and projectors
- If UI elements look abnormal, try switching theme or restarting the app first

## Permissions & Passwords

SecScore provides three permission states:

- Admin: full access (students, reasons, settlement, data management)
- Score: scoring-related operations only
- Read-only: view only, no modifications

Recommendations:

- Set a strong password for Admin to prevent unintended changes
- If multiple people operate scoring, use a separate Score password to reduce risk
- Save the recovery string after enabling passwords: see [Permissions & Unlock](../guide/software-guide.md)

## Data Management (Import/Export)

- Export: back up JSON before major changes
- Import: use for migration or recovery; keep a copy of current data before importing
- Import overwrites data, so export once before importing: see [Data Import & Export](./other.md)

## Logs

- View logs: diagnose startup/crash or “operation not applied”
- Export logs: include logs + version when reporting issues
- Clear logs: optional cleanup after issues are resolved

## Tray & Close Behavior

- Closing the main window usually does not quit the app; it hides to the system tray
- Tray menu supports “Show main window / Quit”, and double-clicking the tray icon can bring the window back
- You can adjust “close behavior / minimize to tray” options depending on the app version

## URL Protocol (secscore://)

The installer version can register the `secscore://` protocol so external apps can open specific pages quickly.

For example:

```text
secscore://settings
secscore://leaderboard
```

For supported commands and behavior, see [Custom URL Protocol](./ipc_url.md).

## Suggested Workflow

1. Set passwords and permissions first
2. Import student roster and maintain groups
3. Maintain reason presets for faster scoring
4. Export JSON backups regularly
