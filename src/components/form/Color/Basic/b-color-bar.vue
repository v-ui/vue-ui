<template>
  <div
    :style="barStyle"
    style="width: 10px; height: 200px; background-position: initial initial; background-repeat: initial initial;"
    class="position-relative"
    :aria-disabled="disabled"
    @mousedown="barDown"
  >
    <span
      class="color-thumb"
      :style="`top: ${top}px`"
      :aria-disabled="disabled"
      @mousedown.left.exact.stop.prevent="thumbDown"
    />
  </div>
</template>
<script>
// linear-gradient - MDN
// https://developer.mozilla.org/zh-CN/docs/Web/CSS/linear-gradient
// background-image: linear-gradient(to bottom, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 16.666666666666668%, rgb(0, 255, 0) 33.333333333333336%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 66.66666666666667%, rgb(255, 0, 255) 83.33333333333334%, rgb(255, 0, 0) 100%);

import util from '@/components/util'

export default {
  name: 'b-color-bar',
  mixins: [ util.mixins.color.base, ],
  model: {
    props: 'value',
    event: 'bar:changed'
  },
  props: {
    value: {
      ...util.props.UNumber,
      validator: function(value) {
        return util.props.UNumber.validator(value) && value <= 360
      },
    },
    disabled: util.props.Boolean,
  },
  data() {
    return {
      top: 0,
      h: this.value,
    }
  },
  computed: {
    scaleArray: function() {
      let arr = []
      for (let i = 0; i < 360; i++) {
        arr.push(this.color(i, 1, .5, 'hsl'))
      }
      return arr
    },
    scale: function() {
      return this.color.scale(this.scaleArray).domain([0, 100])
    },
    barStyle: function() {
      let rgb = ''
      for(let i = 0; i < 100; i++) {
        rgb += `${this.scale(i).css()} ${i}% ${i < 99 ? ', ' : ''}`
      }
      return `background-image: linear-gradient(to bottom, ${rgb});`
    },
  },
  watch: {
    value: function(value) {
      this.h = value
      this.valueChange(this.h)
    },
    top: function(value) {
      this.topChange(value)
    },
    h: function(value) {
      // v-model
      this.$emit('bar:changed', value)
    },
  },
  mounted() {
    this.valueChange(this.h)
  },
  methods: {
    valueChange: function(value) {
      if (value >= 0 && value <= 360) {
        this.top = this.$el.clientHeight / 360 * value
      }
    },
    topChange: function(top) {
      if (this.h >= 0 && this.h <= 360) {
        this.h = top / this.$el.clientHeight * 360
      }
    },
    barDown: function(event) {
      if (this.disabled) return
      let { offsetY } = event
      this.top = offsetY
    },
    thumbDown: function(event) {
      if (this.disabled) return
      let t = event.pageY - this.top
      document.onmousemove = mouseEvent => {
        let { clientHeight } = this.$el
        let top = mouseEvent.pageY - t
        if (top < -5) top = -5
        if (top > clientHeight) top = clientHeight
        this.top = top
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
  },
}
</script>

<style scoped>
.color-thumb {
  position: absolute;
  left: -1px;
  width: 12px;
  height: 4px;
  border-radius: 1px;
  background: #fff;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
  box-shadow: 0 0 2px rgba(0, 0, 0, .6);
  cursor: pointer;
  z-index: 10;
}
</style>
