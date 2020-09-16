// v-modal
// 注册一个全局自定义指令 `v-modal`(用于模态弹窗， 与 v-model 不同)

import tools from '@/tools/index.js'

const name = 'modal'
const func = (el, binding) => {
  tools.dom.addAttrs(el, {
    'data-toggle': 'modal',
    'data-target': binding.value
  })
}

export default {
  name,
  func,
}
