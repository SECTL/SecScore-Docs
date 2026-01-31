---
title: URL Protocol
createTime: 2025/11/29 13:02:57
---

# SecScore URL Protocol

## 1. Overview

SecScore provides a custom URL protocol so you can trigger actions from a browser, command line, or other apps.

- Scheme: `secscore`
- Basic format:

  ```text
  secscore://<command>[/<subcommand>]
  ```

- Case rules:
  - The scheme and command are case-insensitive (`SecScore://settings` equals `secscore://SETTINGS`)
  - Recommended: use lowercase consistently

- Behavior:
  - If SecScore is not running: start the app and execute the URL action
  - If SecScore is already running: forward the URL to the existing instance (no second instance)

---

## 2. Navigation URLs

Open the main window and navigate to a specific page.

### 2.1 Home

- URLs:

  ```text
  secscore://
  secscore://home
  ```

- Behavior:
  - Open the main window and navigate to `/` (home)

### 2.2 Students

- URL:

  ```text
  secscore://students
  ```

- Behavior:
  - Open the main window and navigate to `/students`

### 2.3 Scoring

- URL:

  ```text
  secscore://score
  ```

- Behavior:
  - Open the main window and navigate to `/score`

### 2.4 Leaderboard

- URL:

  ```text
  secscore://leaderboard
  ```

- Behavior:
  - Open the main window and navigate to `/leaderboard`

### 2.5 Settlements

- URL:

  ```text
  secscore://settlements
  ```

- Behavior:
  - Open the main window and navigate to `/settlements`

### 2.6 Reasons

- URL:

  ```text
  secscore://reasons
  ```

- Behavior:
  - Open the main window and navigate to `/reasons`

### 2.7 Settings

- URL:

  ```text
  secscore://settings
  ```

- Behavior:
  - Open the main window and navigate to `/settings`

---

## 3. Floating Sidebar Control

Control the global floating sidebar window (`global-sidebar`).

### 3.1 Show sidebar

- URL:

  ```text
  secscore://sidebar/show
  ```

- Behavior:
  - If it exists: call `show()` + `focus()`
  - Otherwise: create the `global-sidebar` window and show it

### 3.2 Hide sidebar

- URL:

  ```text
  secscore://sidebar/hide
  ```

- Behavior:
  - If it exists: call `hide()`
  - Otherwise: do nothing

### 3.3 Toggle

- URLs:

  ```text
  secscore://sidebar/toggle
  secscore://sidebar
  ```

- Behavior:
  - If it exists:
    - Visible → hide
    - Hidden → show and `focus()`
  - Otherwise: create and show the `global-sidebar` window

---

## 4. Examples (Windows)

### 4.1 Run dialog (Win + R)

Input:

```text
secscore://settings
secscore://sidebar/toggle
```

### 4.2 Browser address bar

Input:

```text
secscore://score
```

### 4.3 Command line

```bash
start "" "secscore://leaderboard"
```

---

## 5. Install & Registration (Packaged Builds)

> This section targets packaged installers. In dev mode (`pnpm dev`), the protocol may not be registered automatically.

- The registration config is in `electron-builder.yml`:
  - `scheme`: `secscore`
  - `name`: `SecScore URL Protocol`
- After installation, the OS will dispatch `secscore://` URLs to SecScore.

---

## 6. Errors & Compatibility

- All URLs are local triggers; no network transmission.
- The current protocol only supports page-level navigation and floating sidebar control, with no parameters (e.g. student ID).
- Unknown commands (for example):

  ```text
  secscore://unknown
  ```

  are ignored without showing an error dialog.

---

## 7. Future Extensions

You can extend the protocol while keeping backward compatibility, for example:

- Open scoring for a specific student:

  ```text
  secscore://score/12345
  ```

- Filtered leaderboard view:

  ```text
  secscore://leaderboard/today
  ```

This only requires adding new branches in the main-process URL parsing logic.
