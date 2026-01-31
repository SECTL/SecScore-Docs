---
title: Settlement & History
createTime: 2026/01/17 22:40:45
---

> Settlement archives the current scoring phase, then starts a new phase.

## What is settlement

Settlement is a phase checkpoint:

- Archive the current phase as a historical phase
- Keep a leaderboard snapshot for that phase
- Reset all students' current points to 0 to start the next phase
- Keep your roster and reason presets unchanged

## When to settle

Typical scenarios:

- Weekly/monthly settlement for periodic reporting
- Settlement after an exam or class activity
- Start fresh scoring while keeping the previous phase results

## Before you settle

- Make sure you are in Admin permission mode (settlement is typically restricted)
- Export a JSON backup first in case you need to revert: see [Import & Export](./other.md)

## What data changes

- Changes:
  - Current points are reset to 0
  - Current phase records are marked as archived and excluded from the new phase statistics
- Does not change:
  - Student roster
  - Reason presets
  - Archived phases and their results

## Using settlement history

After settlement, you can use “Settlement History” to:

- View the leaderboard of each phase
- Compare performance across phases
- Review the final state of a phase

## FAQ

### Can I restore to pre-settlement state

If you need to revert, import the JSON backup exported before settlement: see [Import & Export](./other.md).
