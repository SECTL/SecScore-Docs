---
title: Data Import & Export
createTime: 2026/01/17 22:59:36
---

> **Backup, migrate, and restore your data**
>
> Use import/export to back up data and move it across devices. It’s strongly recommended to export a JSON backup regularly to avoid data loss caused by mistakes or device failure.

## Export JSON (Backup)

- Recommended times to export a backup:
  - Before/after large scoring sessions
  - After adjusting many reason presets
  - Before settlement
  - Before switching computers or reinstalling the system
- The exported file can restore the data to the time it was exported

## Import JSON (Restore/Migrate)

Import is used to restore a backup or migrate to another device. Please note:

- Import overwrites existing data (students, reasons, scoring records, settlement history, etc.)
- Export your current data before importing to avoid irreversible overwrites
- Security-related settings (e.g., passwords) are usually not imported (depending on the app version)

## Settlement & Data

- Settlement archives a phase and resets current points: see [Settlement](./history.md)
- Export a JSON backup before settlement so you can roll back after mistakes

## Recommended Workflow

1. Export JSON weekly or at the end of each phase
2. Export JSON before settlement, then settle the phase
3. When restoring, confirm the target device/class data first, then import
