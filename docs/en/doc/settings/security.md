---
title: Security Settings
createTime: 2026/01/11 12:42:47
---

> **Protect key operations with permissions and passwords**
>
> SecScore uses “permission status + passwords” to protect student management, reason presets, settlement, and data import/export, preventing mistakes or unauthorized modifications.

## Permissions & Passwords

Common permission statuses:

- Admin: full access (students, reasons, settlement, data management, etc.)
- Scoring: only scoring-related operations (add/subtract, undo, etc.)
- Read-only: view leaderboard and history only

Depending on the app version, passwords may be split into:

- Admin password: unlock to Admin
- Scoring password: unlock to Scoring

## Unlock & Lock

- The top-right corner shows your current permission status
- If you are in Read-only/Scoring, click “Enter password” to unlock to a higher level
- Click “Lock” to switch back to Read-only
- If no password is configured, the app is usually treated as Admin by default

## Recovery String

After enabling passwords, the app provides a recovery string / recovery info for restoring access if you forget the password:

- Save it immediately after setting a password
- If it’s lost, password recovery becomes difficult

## Recommended Setup

- Use a strong Admin password to protect structural operations
- If multiple people score together, set a separate Scoring password to reduce risk
- Export a JSON backup before importing or settling: see [Data Import & Export](./other.md)

For more details, see [Permissions & Unlock](../guide/software-guide.md).
