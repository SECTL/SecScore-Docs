---
title: Auto Scoring
createTime: 2026/03/29 16:45:00
---

> **Automate repetitive scoring with custom rules**
>
> Create conditional rules that apply points automatically based on triggers, with full control over enable/disable and rule priority.

## Overview

Auto Scoring lets you define rules that automatically add or subtract points when specific conditions are met. This saves time on repetitive classroom tasks like attendance tracking, participation rewards, or consistent penalty applications.

## Enable and Disable Auto Scoring

- **Global Toggle**: Enable or disable the entire Auto Scoring system from settings
- **Rule-Level Control**: Each rule can be enabled or disabled independently
- When disabled globally, no rules run even if individually enabled

## Rule Creation

### Rule Components

Each auto-scoring rule consists of:

- **Name**: A descriptive label for the rule (e.g., "Perfect Attendance Bonus")
- **Condition**: The trigger that activates the rule
- **Action**: Add or subtract points with a specified amount
- **Reason**: The note recorded in the score log (optional, uses rule name if empty)

### Condition Types

Rules can trigger based on various conditions:

- **Time-based**: Specific dates, times, or recurring schedules
- **Event-based**: Student actions or state changes
- **Threshold-based**: When scores reach certain values

### Action Configuration

- **Operation**: Add points (reward) or subtract points (penalty)
- **Points**: The amount to add or subtract
- **Target**: Apply to individual students, groups, or the entire class

## Rule Management

### Creating Rules

1. Open Auto Scoring settings
2. Click "Add Rule"
3. Configure the condition, action, and name
4. Save and enable the rule

### Editing Rules

- Select any existing rule to modify its parameters
- Changes take effect immediately for future triggers
- Historical auto-scored records remain unchanged

### Deleting Rules

- Removing a rule stops future automatic scoring
- Previously applied scores remain in the record history

## Rule Ordering and Priority

Rules execute in a specific order. When multiple rules match the same event:

- **Order Matters**: Rules run sequentially from top to bottom
- **Drag to Reorder**: Change priority by dragging rules in the list
- **First Match Wins**: Earlier rules may prevent later ones from triggering depending on configuration

### Best Practices for Ordering

- Place broad, general rules lower in the list
- Put specific, high-priority rules at the top
- Consider interactions between rules that might affect the same students

## Example Use Cases

### Daily Attendance Bonus

Reward students who are marked present every day of the week:

- Condition: All students marked present for 5 consecutive days
- Action: Add +5 points
- Reason: "Perfect attendance this week"

### Late Arrival Penalty

Apply a consistent deduction for late arrivals:

- Condition: Student marked as late
- Action: Subtract -1 point
- Reason: "Late arrival"

### Participation Streak

Encourage consistent participation:

- Condition: Student answers correctly 3 times in one session
- Action: Add +2 points
- Reason: "Participation streak bonus"

### Group Achievement

Reward collaborative work:

- Condition: All members of a group complete an assignment
- Action: Add +3 points to each group member
- Reason: "Group assignment completed"

## Tips

- Start with simple rules and add complexity as needed
- Test rules in a low-stakes environment before full deployment
- Monitor the scoring log to verify rules are working as expected
- Disable rules temporarily instead of deleting them if you might need them again
- Keep rule names descriptive so other teachers understand their purpose

## Related Modules

- Manual scoring: [Scoring](./pick.md)
- Set up reason presets: [Reasons](./link.md)
- View scoring history: [Settlement](./history.md)
- Export rankings: [Leaderboard](./notification.md)
