<template>
  <div
    class="d-inline-flex position-relative rounded-sm border border-secondary align-content-center"
    style="width: 15px; height: 15px;"
    :style="objStyle"
    :aria-disabled="isDisabled"
    :aria-selected="isSelected"
  >
    <span
      v-show="isSelected"
      class="color-check rounded-circle w-75 h-75 m-auto"
    />
  </div>
</template>

<script>
import util from '@/components/util'

export default {
  name: 'BColorCheck',
  mixins: [ util.mixins.select.selectItem ],
  props: {
    disabled: util.props.Boolean,
  },
  computed: {
    isDisabled: function() {
      return this.disabled || this.item.disabled
    },
    objStyle: function() {
      const color = this.item.color === 'transparent'
        ? `background: linear-gradient(45deg, transparent 15%, #f00 15%, #ddd 25%, transparent 25%, transparent 45%, #f00 45%, #ddd 55%, transparent 55%, transparent 75%, #f00 75%, #ddd 85%, transparent 85% );`
        : `background: ${this.item.color};`
      const cursor = this.item.disabled
        ? 'cursor: not-allowed;'
        : 'cursor: pointer;'
      return `${color} ${cursor}`
    },
  },
}
</script>

<style scoped>
.color-check {
  width: 5px;
  height: 5px;
  background: linear-gradient(217deg, rgba(255,0,0,1), rgba(255,0,0,0) 70.71%),
              linear-gradient(127deg, rgba(0,255,0,1), rgba(0,255,0,0) 70.71%),
              linear-gradient(336deg, rgba(0,0,255,1), rgba(0,0,255,0) 70.71%);
}
</style>
