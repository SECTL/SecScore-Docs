/* @see https://theme-plume.vuejs.press/guide/collection/ 查看文档了解配置详情。 */

import { defineCollection, defineCollections } from "vuepress-theme-plume";


// 中文文档
const Doc = defineCollection({
  type: "doc",
  dir: "doc",
  linkPrefix: "/doc",
  title: "文档",
  meta: { createTime: "long" },
  sidebar: [
    { text: '概览', icon: 'material-symbols:overview-outline-rounded', link: 'overview' },
    { text: '快速开始', icon: 'ep:guide', prefix: 'guide', items: [
      { text: '安装与运行', link: 'start' },
      { text: '权限与解锁', link: 'software-guide' },
      { text: '界面与导航', link: 'interface' },
    ] },
    { text: '功能模块', icon: 'lucide:blocks', prefix: 'settings', items: [
      { text: '学生管理', link: 'listmg' },
      { text: '积分管理', link: 'pick' },
      { text: '理由管理', link: 'link' },
      { text: '排行榜', link: 'notification' },
      { text: '结算与历史', link: 'history' },
    ] },
    { text: '系统与数据', icon: 'garden:gear-stroke-16', prefix: 'settings', items: [
      { text: '系统设置', link: 'basic' },
      { text: '安全与权限', link: 'security' },
      { text: '数据导入导出', link: 'other' },
      { text: '自定义 URL 协议', link: 'ipc_url' },
    ] },
    { text: '资源', icon: 'carbon:document', prefix: 'resources', items: [
      { text: '开发与贡献', link: 'contribute' },
    ] },
  ],
});

const Faq = defineCollection({
  type: "post",
  dir: "faq",
  title: "常见问题",
  link: "/faq/",
  //   linkPrefix: '/article/', // 相关文章的链接前缀
  //   postList: true, // 是否启用文章列表页
  tags: false, // 是否启用标签页
  archives: false, // 是否启用归档页
  categories: false, // 是否启用分类页
  //   postCover: 'right', // 文章封面位置
  //   pagination: 15, // 每页显示文章数量
  meta: { createTime: "long" },
});

const Bulletin = defineCollection({
  type: "post",
  dir: "bulletin",
  title: "公告板",
  link: "/bulletin/",
  tags: false,
  archives: false,
  categories: false,
  meta: { createTime: "long" },
});

// English docs
const EnDoc = defineCollection({
  type: "doc",
  dir: "doc",
  linkPrefix: "/doc",
  title: "Documentation",
  meta: { createTime: "long" },
  sidebar: [
    { text: 'Overview', icon: 'material-symbols:overview-outline-rounded', link: 'overview' },
    { text: 'Quick Start', icon: 'ep:guide', prefix: 'guide', items: [
      { text: 'Install & Run', link: 'start' },
      { text: 'Permissions', link: 'software-guide' },
      { text: 'UI & Navigation', link: 'interface' },
    ] },
    { text: 'Modules', icon: 'lucide:blocks', prefix: 'settings', items: [
      { text: 'Students', link: 'listmg' },
      { text: 'Scoring', link: 'pick' },
      { text: 'Reasons', link: 'link' },
      { text: 'Leaderboard', link: 'notification' },
      { text: 'Settlement', link: 'history' },
    ] },
    { text: 'System & Data', icon: 'garden:gear-stroke-16', prefix: 'settings', items: [
      { text: 'Settings', link: 'basic' },
      { text: 'Security', link: 'security' },
      { text: 'Import & Export', link: 'other' },
      { text: 'URL Protocol', link: 'ipc_url' },
    ] },
    { text: 'Resources', icon: 'carbon:document', prefix: 'resources', items: [
      { text: 'Contribute', link: 'contribute' },
    ] },
  ],
});

const EnFaq = defineCollection({
  type: "post",
  dir: "faq",
  title: "FAQ",
  link: "/faq/",
  tags: false,
  archives: false,
  categories: false,
  meta: { createTime: "long" },
});

const EnBulletin = defineCollection({
  type: "post",
  dir: "bulletin",
  title: "Bulletin",
  link: "/bulletin/",
  tags: false,
  archives: false,
  categories: false,
  meta: { createTime: "long" },
});

export const zhcollections = defineCollections([Doc, Faq, Bulletin]);
export const encollections = defineCollections([EnDoc, EnFaq, EnBulletin]);
