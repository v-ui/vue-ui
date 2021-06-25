// v-tip
// 注册一个全局自定义指令 `v-tip`(用于提示弹窗)

import { Tooltip, Popover } from 'bootstrap'

const name = "tip"
const func = (element, binding) => {
  var el = binding.value && binding.value.element || element

  let arg = binding.arg || 'tooltip'
  if (!['tooltip', 'popover'].includes(arg)) return
  if (!binding.value) return

  let modifiers = 'top'
  if (binding.modifiers) {
    modifiers = binding.modifiers.top ? 'top'
      : binding.modifiers.bottom ? 'bottom'
        : binding.modifiers.left ? 'left'
          : binding.modifiers.right ? 'right' : 'top'
  }

  if (arg == 'tooltip') {
    let opt = {
      toggle: arg,
      placement: modifiers,
      title: binding.value.content || binding.value,
      container: binding.value.container || 'body'
    }
    new Tooltip(el, opt)
  } else {
    let opt = {
      toggle: arg,
      placement: modifiers,
      content: binding.value.content || binding.value,
      title: binding.value.title || '',
      container: binding.value.container || 'body',
    }
    if (binding.value.trigger) opt.trigger = binding.value.trigger
    new Popover(el, opt)
  }
}

export default {
  name,
  func,
}
