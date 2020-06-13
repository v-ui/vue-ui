import Vue from 'vue'
import tool from '@/tool/index.js'

Vue.directive('coll', {
  inserted: function (el, binding) {
    let target = binding.value

    if (!target) return
    tool.dom.addAttrs(el, {
      'data-toggle': 'collapse',
      'aria-controls': binding.arg || 'Collapse Controller',
      'aria-expanded': binding.modifiers.show || false,
    })

    el.tagName.toLowerCase() == 'a'
      ? tool.dom.addAttr(el, 'href', target)
      : tool.dom.addAttr(el, 'data-target', target)
  }
})
