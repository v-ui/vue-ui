// v-tip
// 注册一个全局自定义指令 `v-tip`(用于提示弹窗)

import jQuery from 'jquery'

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
    let obj = {
      toggle: arg,
      placement: modifiers,
      title: binding.value.content || binding.value,
      container: binding.value.container || 'body'
    }
    jQuery(el).tooltip(obj)
  } else {
    let obj = {
      toggle: arg,
      placement: modifiers,
      content: binding.value.content || binding.value,
      title: binding.value.title || '',
      container: binding.value.container || 'body',
    }
    if (binding.value.trigger) obj.trigger = binding.value.trigger
    jQuery(el).popover(obj)
  }
}

export default {
  name,
  func,
}
