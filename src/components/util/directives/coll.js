// v-coll
// 注册一个全局自定义指令

import tools from '@/tools/index.js'

const name = 'coll'
const func = function (el, binding) {
  let target = binding.value.target || binding.value

  if (!target) return
  tools.dom.addAttrs(el, {
    'data-bs-toggle': 'collapse',
    'aria-controls': binding.arg || 'Collapse Controller',
    'aria-expanded': binding.value.show || false,
  })

  el.tagName.toLowerCase() == 'a'
    ? tools.dom.addAttr(el, 'href', target)
    : tools.dom.addAttr(el, 'data-bs-target', target)
}

export default {
  name,
  func,
}
