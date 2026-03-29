---
title: PostgreSQL Data Sync
createTime: 2025/03/29 14:00:00
---

> **Cross-device data synchronization with PostgreSQL**
>
> Connect SecScore to a PostgreSQL database to synchronize data across multiple devices. Preview changes before applying them to ensure data consistency in multi-computer classroom environments.

## What is PostgreSQL Sync

PostgreSQL sync lets SecScore connect to a PostgreSQL database server as a centralized data source. Instead of storing data locally on each computer, multiple devices can share the same database, keeping student records, scoring history, and settings consistent across all connected machines.

When to use PostgreSQL sync:

- You operate SecScore from multiple computers (classroom PC, laptop, teacher workstation)
- Multiple teachers need access to the same class data
- You want automatic backups handled by the database server
- Your school already runs a PostgreSQL server for other applications

## Prerequisites

Before setting up PostgreSQL sync, you need:

- A running PostgreSQL server (version 12 or newer recommended)
- Network access from your SecScore devices to the database server
- A database user account with appropriate permissions
- The connection details: host, port, database name, username, and password

## Connecting to PostgreSQL

To set up the connection:

1. Open SecScore settings and find the PostgreSQL sync section
2. Enter the connection details:
   - Host: the database server address (e.g., `192.168.1.100` or `db.school.edu`)
   - Port: usually `5432` (the default PostgreSQL port)
   - Database: the name of the database to use
   - Username: your database user
   - Password: your database password
3. Click Test Connection to verify the settings
4. Save the configuration

First-time setup:

- If the database is empty, SecScore can initialize it with your current local data
- If the database already contains SecScore data, you will see a sync preview first

## Sync Preview and Pre-check

Before any data changes are applied, SecScore shows a preview of what will happen. This preview helps you avoid conflicts and data loss.

The preview displays:

- Records that will be added to the database
- Records that will be updated
- Records that will be deleted
- Records with conflicts that need resolution
- A summary of changes by category (students, reasons, scoring records)

Reviewing the preview:

- Check the numbers match your expectations
- Look for unexpected deletions
- Note any conflicts that require manual resolution
- Cancel if anything looks wrong

The pre-check also validates:

- Database connection is stable
- Required tables and columns exist
- Data integrity constraints will not be violated
- No other device is currently syncing (if locking is enabled)

## Applying and Syncing Data

After reviewing the preview, you have two options:

**Apply Changes**: Writes the local changes to the PostgreSQL database. Other devices will see these changes when they next sync.

**Pull Changes**: Fetches the latest data from PostgreSQL to your local device, overwriting local data with the server version.

Typical workflow:

1. Make changes on one device (add students, record scores)
2. Open sync and review the preview
3. Apply changes to upload to PostgreSQL
4. On other devices, pull changes to get the latest data

Sync direction indicators:

- Up arrow: local changes will upload to the server
- Down arrow: server changes will download to local
- Bidirectional: changes exist on both sides (conflict resolution required)

## Multi-device Data Coordination

When multiple devices connect to the same PostgreSQL database, coordination prevents conflicts:

**Automatic coordination**:

- Timestamps determine which record is newer
- Last-write-wins for most data types
- Scoring records append rather than overwrite

**Manual coordination**:

- Student name changes may require choosing which version to keep
- Deletions on one device sync to others (deleted students disappear everywhere)
- Reason preset modifications apply globally

**Best practices for multi-device use**:

- Assign one device as primary for major changes (adding students, settlement)
- Sync before and after each scoring session
- Avoid simultaneous edits to the same student from multiple devices
- Export JSON backups periodically, even with PostgreSQL sync

## Conflict Resolution

When the same record changes on multiple devices between syncs, SecScore detects a conflict:

- The preview shows conflicting records highlighted
- Choose to keep the local version, server version, or merge manually
- Student records can often merge (keep both name and score changes)
- Scoring records typically do not conflict (each event is unique)

Resolving strategy:

1. For critical data, choose the version you know is correct
2. When unsure, export a JSON backup first
3. After resolving, sync again to confirm the resolution took effect

## Troubleshooting

**Connection failed errors**:

- Verify the host address and port are correct
- Check that the PostgreSQL server allows remote connections
- Confirm firewall rules permit traffic on port 5432
- Test connection from the same network segment

**Authentication failures**:

- Double-check username and password
- Verify the database user has connect permissions
- Ensure the user has read/write access to the SecScore tables

**Sync preview shows unexpected changes**:

- Another device may have synced recently
- Check if someone else modified data
- Export local data before syncing if you are unsure

**Data appears missing after sync**:

- Verify you pulled changes (not just applied)
- Check the other device actually applied its changes
- Look for error messages in the sync log

**Slow sync performance**:

- Large datasets sync faster on local networks
- Consider syncing only at start and end of sessions
- Check database server load and network latency

## Security Considerations

**Connection security**:

- Use SSL/TLS encryption for connections over public networks
- Prefer VPN or private networks for database access
- Never expose PostgreSQL directly to the internet without proper security

**Credential management**:

- Store passwords securely (SecScore encrypts saved credentials)
- Use database accounts with minimal required permissions
- Rotate passwords periodically
- Do not share database credentials between unrelated classes

**Data protection**:

- PostgreSQL sync transmits student names and scores over the network
- Ensure your database server follows your organization's data protection policies
- Regular database backups protect against server failure
- Audit database access logs periodically

**Access control**:

- Create separate database users for different teachers if needed
- Use PostgreSQL row-level security if sharing one database across multiple classes
- Restrict database network access to SecScore devices only

## Related Modules

- [Data Import & Export](./other.md): JSON backup and restore, useful alongside PostgreSQL sync
- [Security Settings](./security.md): Passwords and permissions within SecScore
- [Basic Settings](./basic.md): General app configuration including close behavior and logs
