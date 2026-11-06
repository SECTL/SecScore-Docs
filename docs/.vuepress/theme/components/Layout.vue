<script setup>
import { Layout } from 'vuepress-theme-plume/client'
import PageContextMenu from 'vuepress-theme-plume/features/PageContextMenu.vue'
import AsideNav from './AsideNav.vue'
import Bulletin from './Bulletin.vue'
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vuepress/client'

const STORE_KEY = 'secscore-wip-notice-dismissed'
const route = useRoute()
const showNotice = ref(false)
const noMore = ref(false)
let shownThisSession = false

function isDocPage(path) {
  return /\/doc\//.test(path)
}

function checkNotice() {
  if (shownThisSession || !isDocPage(route.path)) return
  try {
    if (localStorage.getItem(STORE_KEY) === '1') return
  } catch (e) {}
  shownThisSession = true
  showNotice.value = true
}

function closeNotice() {
  showNotice.value = false
  if (noMore.value) {
    try { localStorage.setItem(STORE_KEY, '1') } catch (e) {}
  }
}

watch(() => route.path, checkNotice)

const TIP = '因维护者 PANDA-JSR 自身经历和能力有限，这还是一个半成品，不建议食用！'
let tip = null
let current = null

function isTarget(a) {
  const href = a.getAttribute('href') || ''
  return /\/doc\/overview(\.html)?\/?$/.test(href) || href.includes('stk.sectl.cn/SecScore')
}

// 返回 { el, rect }：气泡对齐的元素及其应贴靠的底部矩形
function resolve(target) {
  const group = target.closest('.vp-navbar-menu-group')
  if (group && group.querySelector('a[href*="/doc/overview"]')) {
    const menu = group.querySelector('.vp-menu')
    const g = group.getBoundingClientRect()
    const m = menu ? menu.getBoundingClientRect() : g
    return { el: group, rect: { left: m.left, right: m.right, top: g.top, bottom: Math.max(m.bottom, g.bottom) } }
  }
  const a = target.closest('a')
  if (a && !a.closest('.vp-menu') && isTarget(a)) {
    return { el: a, rect: a.getBoundingClientRect() }
  }
  return null
}

function show(hit) {
  if (!tip) {
    tip = document.createElement('div')
    tip.className = 'wip-tooltip'
    tip.textContent = TIP
    document.body.appendChild(tip)
  }
  current = hit.el
  const r = hit.rect
  tip.classList.remove('show')
  tip.style.left = '0px'
  tip.style.top = '0px'
  const w = tip.offsetWidth
  const h = tip.offsetHeight
  const margin = 8
  let left = (r.left + r.right) / 2 - w / 2
  left = Math.max(margin, Math.min(left, window.innerWidth - w - margin))
  let top = r.bottom + 8
  if (top + h > window.innerHeight - margin) top = Math.max(margin, r.top - h - 8)
  tip.style.left = left + 'px'
  tip.style.top = top + 'px'
  tip.classList.add('show')
}

function hide() {
  current = null
  if (tip) tip.classList.remove('show')
}

function onOver(e) {
  const hit = resolve(e.target)
  if (hit && hit.el !== current) show(hit)
}

function onOut(e) {
  if (current && !(e.relatedTarget && current.contains(e.relatedTarget))) hide()
}

onMounted(() => {
  checkNotice()
  document.addEventListener('mouseover', onOver)
  document.addEventListener('mouseout', onOut)
  window.addEventListener('scroll', hide, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('mouseover', onOver)
  document.removeEventListener('mouseout', onOut)
  window.removeEventListener('scroll', hide, true)
  if (tip) tip.remove()
  tip = null
})
</script>

<template>
  <Layout>
    <template #aside-outline-after>
      <AsideNav />
    </template>
    <template #doc-title-after>
      <PageContextMenu />
    </template>
    <template #page-bottom>
      <Bulletin />
    </template>
  </Layout>
  <div v-if="showNotice" class="wip-modal-mask" @click.self="closeNotice">
    <div class="wip-modal" role="dialog" aria-modal="true">
      <h3>提示</h3>
      <p>{{ TIP }}</p>
      <label class="wip-modal-check">
        <input v-model="noMore" type="checkbox" /> 不再提示
      </label>
      <button class="wip-modal-btn" @click="closeNotice">我知道了</button>
    </div>
  </div>
</template>

<style>
</style>