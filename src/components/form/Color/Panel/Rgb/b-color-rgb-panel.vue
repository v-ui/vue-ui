<template>
  <div class="d-flex flex-column align-items-center p-1">
    <b-color-red-bar class="my-1" v-model="rgb.r" />
    <b-color-green-bar class="my-1" v-model="rgb.g" />
    <b-color-blue-bar class="my-1" v-model="rgb.b" />
    <b-color-alpha-bar class="my-1" :style="{ background: rgbCss }" v-model="alpha" />
  </div>
</template>

<script>
import util from "@/components/util";

import BColorRedBar from './b-color-red-bar'
import BColorGreenBar from './b-color-green-bar'
import BColorBlueBar from './b-color-blue-bar'
import BColorAlphaBar from '../Alpha/b-color-alpha-bar'

export default {
  name: 'b-color-rgb-panel',
  components: { BColorRedBar, BColorGreenBar, BColorBlueBar, BColorAlphaBar  },
  mixins: [ util.mixins.color.base, ],
  model: {
    prop: 'value',
    event: 'picker:change',
  },
  props: {
    value: [ Object, Number, String, Array, ],
    disabled: util.props.Boolean,
  },
  data() {
    return {
      rgb: { r: 255, g: 0, b: 0, },
      alpha: 1,
    };
  },
  computed: {
    dataValue: function() {
      return this.color.valid(this.value)
        ? this.color(this.value)
        : this.color(255, 0, 0, 'rgb')
    },
    dataRgb: function() {
      return {
        r: this.dataValue.get('rgb.r'),
        g: this.dataValue.get('rgb.g'),
        b: this.dataValue.get('rgb.b'),
      }
    },
    dataAlpha: function() {
      return this.dataValue.alpha() || 1
    },
    rgbCss: function() {
      return this.color(this.rgb).css()
    },
    rgba: function() {
      return this.color(this.rgb).alpha(this.alpha)
    },
  },
  watch: {
    dataAlpha: function(value) {
      this.alpha = value
    },
    rgba: function(value) {
      this.$emit('picker:change', value)
    },
  },
  mounted() {
    this.rgb = this.dataRgb
    this.alpha = this.dataAlpha
  },
}
</script>
