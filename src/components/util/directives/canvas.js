// v-canvas
// 注册一个全局自定义指令

import tools from '@/tools/index.js'

const name = 'canvas'
const func = (el, binding) => {
  tools.dom.addAttrs(el, {
    'data-bs-toggle': 'offcanvas',
    'aria-controls': binding.value.slice(1),
  })
  el.tagName.toLowerCase() == 'a'
    ? tools.dom.addAttr(el, 'href', binding.value)
    : tools.dom.addAttr(el, 'data-bs-target', binding.value)
}

export default {
  name,
  func,
}
