---
title: 'Program Cannot Start'
createTime: 2025/12/13 10:56:49
---
# ❓ Program Cannot Start

## **Symptom 1**: Program cannot start after modifying settings

**Solution**:
- 1. Close the program (check Task Manager to ensure it is fully exited)
- 2. Back up and remove the app data/config folder (use the path shown in Settings, if available)
- 3. Restart the program and verify it can launch
- 4. If the issue reproduces, export logs/diagnostics and report via GitHub Issues

## **Symptom 2**: Crash on launch or no window appears

**Solution**:
- 1. Restart your computer and try again
- 2. If you see missing DLL/runtime errors, install [VC++ Runtime](https://aka.ms/vc14/vc_redist.x64.exe)
- 3. Reinstall the latest version (prefer the installer build)
- 4. If it persists, attach logs and version info in your report
