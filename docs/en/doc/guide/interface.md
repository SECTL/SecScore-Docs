---
title: Interface Guide
createTime: 2025/11/29 12:58:02
---

# Interface Guide

## Overview

SecScore is a desktop classroom scoring manager. The interface is organized around a roster, scoring records, boards, and leaderboards, with a simple workflow for daily add/subtract operations and periodic settlement.

## Theme & Display

- Light/Dark theme switching
- Main views typically include: roster, scoring list, board workspace, leaderboard table, and settlement history

## Main Areas

- List Management: maintain student roster, import from xlsx with preview and name column selection
- Scoring: select a student, add/subtract points, and use reason presets for quick input
- Boards: build SQL-based student views with list/card/grid modes and split layouts
- Leaderboard: view changes by today / week / month, export to XLSX
- Settlement & History: archive the current stage and reset for a new stage
- Settings: theme, logs, data import/export (JSON), passwords and permissions

## Permissions

The top-right area shows current permission state (Admin / Score / Read-only). Restricted actions will be blocked and will prompt for unlock or higher permission when needed.
