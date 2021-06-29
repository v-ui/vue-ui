// v-canvas
// 注册一个全局自定义指令

import tools from '@/tools/index.js'

const name = 'canvas'
const func = (el, binding) => {
  tools.dom.addAttrs(el, {
    'data-bs-toggle': 'offcanvas',
    'data-bs-target': binding.value,
    'aria-controls': binding.value.slice(1),
  })
}

export default {
  name,
  func,
}
