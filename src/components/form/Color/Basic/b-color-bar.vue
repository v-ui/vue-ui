<template>
  <div :style="bgImage" style="cursor: pointer;" />
</template>
<script>
// linear-gradient - MDN
// https://developer.mozilla.org/zh-CN/docs/Web/CSS/linear-gradient
// background-image: linear-gradient(to bottom, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 16.666666666666668%, rgb(0, 255, 0) 33.333333333333336%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 66.66666666666667%, rgb(255, 0, 255) 83.33333333333334%, rgb(255, 0, 0) 100%);

import util from '@/components/util'

export default {
  name: 'b-color-bar',
  mixins: [ util.mixins.color.base, ],
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
    bgImage: function() {
      let rgb = ''
      for(let i = 0; i < 100; i++) {
        rgb += `${this.scale(i).css()} ${i}% ${i < 99 ? ', ' : ''}`
      }
      return `width: 10px; height: 200px; background-position: initial initial; background-repeat: initial initial; background-image: linear-gradient(to bottom, ${rgb});`
    },
  },
}
</script>
