import Vue from 'vue'
import tools from '@/tools/index.js'

Vue.directive('coll', {
  inserted: function (el, binding) {
    let target = binding.value

    if (!target) return
    tools.dom.addAttrs(el, {
      'data-bs-toggle': 'collapse',
      'aria-controls': binding.arg || 'Collapse Controller',
      'aria-expanded': binding.modifiers.show || false,
    })

    el.tagName.toLowerCase() == 'a'
      ? tools.dom.addAttr(el, 'href', target)
      : tools.dom.addAttr(el, 'data-bs-target', target)
  }
})
