// v-modal
// 注册一个全局自定义指令 `v-modal`(用于模态弹窗， 与 v-model 不同)

import tools from '@/tools/index.js'

const name = 'modal'
const func = (el, binding) => {
  let target = binding.value.target || binding.value

  tools.dom.addAttrs(el, {
    'data-bs-toggle': 'modal',
  })
  el.tagName.toLowerCase() == 'a'
    ? tools.dom.addAttr(el, 'href', target)
    : tools.dom.addAttr(el, 'data-bs-target', target)
}

export default {
  name,
  func,
}
