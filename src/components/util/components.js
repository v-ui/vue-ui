import Vue from 'vue'

const initFuncSlotContainer = function (components) {
  for (let [key, value] of Object.entries(components)) {
    newFuncSlotCompoment(key, value)
  }
}

const newFuncSlotCompoment = function (name, value) {
  Vue.component(name, {
    functional: true,
    render: function (createElement, context) {
      if (!context.slots().default) return
      return createElement(
        value && value.el || 'div',
        {
          ...context.data,
          ...value,
        },
        context.slots().default
      )
    },
  })
}

export default {
  newFuncSlotCompoment,
  initFuncSlotContainer,
 }

