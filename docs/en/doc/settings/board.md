---
title: Boards
createTime: 2026/03/28 16:20:00
---

> **Build classroom dashboards with SQL**
>
> Boards support multiple dashboards, multiple lists, and split layouts. You can write SQL and present results as cards, grids, or tables.

## Entry and Permission

- Entry: sidebar `Boards`
- Permission:
  - `View / Points / Admin` can open and view board data
  - Only `Admin` can edit board configs (add/remove/rename, SQL, layout)

## Board Structure

A board has three layers:

- **Board**: scenario container (for example, "Live Class", "Weekly Review")
- **List**: each list runs one SQL query
- **Layout**: split left/right or top/bottom, then drag divider to resize

At least one list is always kept in each board.

## SQL Rules

Current execution rules:

- Only one read-only `SELECT` / `WITH` query is allowed
- `;`, comments (`--` / `/* */`), and write-like keywords are blocked
- Result rows are capped at 500 per run (UI requests 500)

## Time Template Variables

These placeholders are replaced with ISO timestamps at runtime:

- `{{today_start}}`
- `{{this_week_start}}`
- `{{last_week_start}}`
- `{{since_7d}}`
- `{{since_30d}}`
- `{{now}}`

## Rendering and Field Mapping

### Student Card Detection

If result rows contain a student name field, the board renders student cards:

- Supported name keys: `student_name` / `name` / `studentName`

If no name key is found, results are shown as a generic table.

### Common Metric Keys

Boards try to detect and render these metrics:

- Total score: `score`
- Added score: `add_score` / `addScore` / `plus_score` / `plusScore`
- Deducted score: `deduct_score` / `deductScore` / `minus_score` / `minusScore`
- Reward points: `reward_points` / `rewardPoints`
- 7-day change: `week_change` / `range_change` / `change`
- 7-day deductions: `week_deducted` / `deducted`
- Today's answers: `answered_count` / `answer_count`

View mode supports `List / Card / Grid`. Score display supports `Total` or `Add + Deduct`.

## Built-in Presets

Three SQL presets are built in:

- **Low Deduction (7d)**: rank students with low deductions in the last 7 days
- **Today's Activity**: sort by today's answer count and score change
- **Reward Ranking**: sort by reward points and total score

## Refresh Behavior

- Switching board or editing SQL triggers query rerun
- Board auto-refreshes when students/events/reasons data changes
- You can also click `Refresh` in the top-right area to reload configs

## Related Modules

- Daily operations: [Scoring](./pick.md)
- Time-range ranking export: [Leaderboard](./notification.md)
- Stage archive: [Settlement](./history.md)
