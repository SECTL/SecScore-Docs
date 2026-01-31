---
home: true
config:
  - type: doc-hero
    background: tint-plate
    hero:
      name: SecScore
      text: Classroom Scoring
      tagline: A simple and elegant classroom personal scoring manager.
      image: /SecScore.svg
      actions:
        - theme: brand
          text: Download
          icon: lucide:download
          link: https://stk.sectl.top/SecScore
        - theme: brand
          text: Read Docs
          icon: lucide:list-start
          link: /en/doc/overview
        - theme: alt
          text: Github Repository
          icon: fa-brands:github
          link: https://github.com/SECTL/SecScore
        - theme: alt
          text: Sectl Official Site
          icon: fa-brands:github
          link: https://sectl.top/
          
  - type: features
    features:
      - title: Student Management
        icon: lucide:users
        details: Add/remove students, import roster from .xlsx with preview and name column selection
      - title: Scoring
        icon: lucide:plus-minus
        details: Add/subtract points with reasons, one-click fill using preset reasons
      - title: Undo
        icon: lucide:undo-2
        details: Undo the latest scoring record and rollback points
      - title: Reason Presets
        icon: lucide:tags
        details: Maintain preset reasons with categories and default values
      - title: Leaderboard & Export
        icon: lucide:trophy
        details: View changes by day/week/month and export leaderboard as XLSX
      - title: Settlement History
        icon: lucide:history
        details: Archive a phase and reset points, browse phase leaderboards later
      - title: Backup
        icon: lucide:database-backup
        details: Import/export JSON for backup; security settings are not imported
      - title: Permissions
        icon: lucide:lock
        details: Admin/scoring passwords with recovery string support
---
