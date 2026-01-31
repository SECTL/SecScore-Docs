import { defineThemeConfig } from 'vuepress-theme-plume'
import { zhNavbar, enNavbar } from './navbar'
import { zhcollections, encollections } from './collections'

const currentYear = new Date().getFullYear()
export default defineThemeConfig({
  logo: '/SecScore.svg',

  appearance: true,

  social: [
    { icon: 'github', link: 'https://github.com/SECTL/SecScore' },
  ],
  navbarSocialInclude: ['github'],
  // aside: true, // 页内侧边栏， 默认显示在右侧
  // outline: [2, 3], // 页内大纲， 默认显示 h2, h3

  /**
   * 文章版权信息
   * @see https://theme-plume.vuejs.press/guide/features/copyright/
   */
  copyright: { 
    license: {
      name: 'CC BY-NC-SA 4.0',
      url: 'https://github.com/SECTL/SecScore-Docs/blob/main/LICENSE'
    },
    author: {
      name: 'SECTL',
      url: 'https://sectl.top'
    },
    creation: 'original'
  },

  // prevPage: true,   // 是否启用上一页链接
  // nextPage: true,   // 是否启用下一页链接
  // createTime: true, // 是否显示文章创建时间

  /**
   * 公告板
   * @see https://theme-plume.vuejs.press/guide/features/bulletin/
   */
  bulletin: {
    layout: 'bottom-right',
  },

  /* 过渡动画 @see https://theme-plume.vuejs.press/config/basic/#transition */
  transition: {
  //   page: true,        // 启用 页面间跳转过渡动画
  //   postList: true,    // 启用 博客文章列表过渡动画
    appearance: 'circle-clip',  // 配置深色模式切换过渡动画类型
  },

  locales: {
    '/': {
      navbar: zhNavbar,
      collections: zhcollections,
      footer: {
        message: '由 <a target="_blank" href="https://v2.vuepress.vuejs.org/">VuePress</a> & <a target="_blank" href="https://theme-plume.vuejs.press">vuepress-theme-plume</a> 驱动',
        copyright: `© 2025-${currentYear} 版权所有 <a href="https://sectl.top">SECTL</a> | 采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> 许可协议<img class="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"><img class="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/by.svg"><img class="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg"><img class="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg">`,
      },
    },
    '/en/': {
      navbar: enNavbar,
      collections: encollections,
      footer: {
        message: 'Powered by <a target="_blank" href="https://v2.vuepress.vuejs.org/">VuePress</a> & <a target="_blank" href="https://theme-plume.vuejs.press">vuepress-theme-plume</a>',
        copyright: `© 2025-${currentYear} by <a href="https://sectl.top">SECTL</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a><img class="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"><img class="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/by.svg"><img class="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg"><img class="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg">`,
      },
    },
  },
})
