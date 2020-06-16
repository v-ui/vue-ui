import Vue from 'vue'

const initFuncSlotContainer = function (components) {
  for (let [key, value] of Object.entries(components)) {
    Vue.component(key, {
      functional: true,
      render: function (createElement, context) {
        if (!context.slots().default) return
        return createElement(
          value && value.el || 'div', // 节点名称
          {
            ...context.data,
            ...value,
          },
          context.slots().default // 子节点数组
        )
      },
    })
  }
}

export default {
  initFuncSlotContainer,
 }
