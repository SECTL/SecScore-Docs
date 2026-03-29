# VUEPRESS CONFIG KNOWLEDGE BASE

**Scope:** VuePress configuration and theme customization

---

## OVERVIEW

VuePress 2.0 documentation site configuration using vuepress-theme-plume. Documents the Electron + React desktop app and contains 7 TypeScript configuration files managing theme, navigation, collections, and client enhancements.

---

## FILE ROLES

| File | Purpose | Key Exports |
|------|---------|-------------|
| `config.ts` | Main VuePress config | `defineUserConfig()` - bundler, locales, head, theme |
| `plume.config.ts` | Theme configuration | `defineThemeConfig()` - navbar, collections, footer, social |
| `navbar.ts` | Navigation bar | `zhNavbar`, `enNavbar` arrays |
| `collections.ts` | Sidebar collections | `zhcollections`, `encollections` - doc/post types |
| `bulletin.ts` | Announcement config | Bulletin board content and settings |
| `client.ts` | Client enhancements | Client-side scripts/components |
| `theme/shim.d.ts` | Type declarations | Theme type definitions |

---

## CONVENTIONS

### Configuration Pattern
```typescript
// Always use theme's define functions
import { defineUserConfig } from 'vuepress'
import { defineThemeConfig } from 'vuepress-theme-plume'
import { defineCollection } from 'vuepress-theme-plume'
```

### Locale Structure
```typescript
locales: {
  '/': { /* Chinese */ }
  '/en/': { /* English */ }
}
```

### Collection Types
- **doc**: Documentation pages with sidebar
- **post**: Blog-style pages (FAQ, bulletins)

### Icon Format in Config
```typescript
icon: 'provider:name'  // e.g., 'lucide:download', 'fa-brands:github'
```

---

## ANTI-PATTERNS

- ❌ **Don't modify theme files directly** - Use configuration overrides
- ❌ **Don't hardcode paths** - Use `linkPrefix` in collections
- ❌ **Don't forget locale prefixes** - English links need `/en/` prefix
- ❌ **Don't enable all markdown features** - Only enable what's used

---

## NOTES

- **Tech stack:** Electron + React + TypeScript
- **Theme**: vuepress-theme-plume v1.0.0-rc.187
- **Cache**: Filesystem cache enabled
- **Search**: Local provider (Algolia ready but commented)
- **Comments**: Giscus provider configured, disabled
- **Auto-frontmatter**: Enabled but `permalink: false`
