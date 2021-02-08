import Vue from 'vue'

const initFuncSlotContainer = function (components) {
  for (let [key, value] of Object.entries(components)) {
    newFuncSlotComponent(key, value)
  }
}

const newFuncSlotComponent = function (name, value) {
  Vue.component(name, {
    render: function (createElement) {
      if (!this.$slots.default) return
      return createElement(
        value && value.el || 'div',
        {
          ...this.$data,
          ...value,
        },
        this.$slots.default
      )
    },
  })
}

export default {
  newFuncSlotComponent,
  initFuncSlotContainer,
 }

