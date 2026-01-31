/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

const zhNavbar = defineNavbarConfig([
  {
    text: '文档',
    icon: 'mi:book',
    items: [
      { text: '概览', icon: 'material-symbols:overview-outline-rounded', link: '/doc/overview' },
      { text: '快速开始', icon: 'ep:guide', link: '/doc/guide/start' },
      { text: '系统设置', icon: 'garden:gear-stroke-16', link: '/doc/settings/basic' },
      { text: '开发与贡献', icon: 'carbon:document', link: '/doc/resources/contribute' },
    ],
  },
  { text: '下载', icon: 'lucide:download', link: 'https://stk.sectl.top/SecScore' },
  { text: 'GitHub', icon: 'fa-brands:github', link: 'https://github.com/SECTL/SecScore' },
])

const enNavbar = defineNavbarConfig([
  {
    text: 'Documentation',
    icon: 'mi:book',
    items: [
      { text: 'Overview', icon: 'material-symbols:overview-outline-rounded', link: '/en/doc/overview' },
      { text: 'Quick Start', icon: 'ep:guide', link: '/en/doc/guide/start' },
      { text: 'Settings', icon: 'garden:gear-stroke-16', link: '/en/doc/settings/basic' },
      { text: 'Development', icon: 'carbon:document', link: '/en/doc/resources/contribute' },
    ],
  },
  { text: 'Download', icon: 'lucide:download', link: 'https://stk.sectl.top/SecScore' },
  { text: 'GitHub', icon: 'fa-brands:github', link: 'https://github.com/SECTL/SecScore' },
])

export { zhNavbar, enNavbar }
