<template>
  <div class="d-flex flex-column align-items-center p-1">
    <b-color-cyan-bar class="my-1" v-model="cmyk.c" />
    <b-color-magenta-bar class="my-1" v-model="cmyk.m" />
    <b-color-yellow-bar class="my-1" v-model="cmyk.y" />
    <b-color-key-bar class="my-1" v-model="cmyk.k" />
    <b-color-alpha-bar class="my-1" :style="{ background: rgbCss }" v-model="alpha" />
  </div>
</template>

<script>
import util from "@/components/util";

import BColorCyanBar from './b-color-cyan-bar'
import BColorMagentaBar from './b-color-magenta-bar'
import BColorYellowBar from './b-color-yellow-bar'
import BColorKeyBar from './b-color-key-bar'
import BColorAlphaBar from '../Alpha/b-color-alpha-bar'

export default {
  name: 'b-color-cmyk',
  components: { BColorCyanBar, BColorMagentaBar, BColorYellowBar, BColorAlphaBar, BColorKeyBar },
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
      cmyk: { c: 0, m: 1, y: 1, k: 0, },
      alpha: 1,
    };
  },
  computed: {
    dataValue: function() {
      return this.color.valid(this.value)
        ? this.color(this.value)
        : this.color(0, 1, 1, 0, 'cmyk')
    },
    dataCmyk: function() {
      return {
        c: this.dataValue.get('cmyk.c'),
        m: this.dataValue.get('cmyk.m'),
        y: this.dataValue.get('cmyk.y'),
        k: this.dataValue.get('cmyk.k'),
      }
    },
    dataAlpha: function() {
      return this.dataValue.alpha() || 1
    },
    rgbCss: function() {
      return this.color(this.cmyk).css()
    },
    rgb: function() {
      return this.color(this.cmyk)
    },
  },
  watch: {
    dataAlpha: function(value) {
      this.alpha = value
    },
    rgb: function(value) {
      this.$emit('picker:change', value)
    },
  },
  mounted() {
    this.cmyk = this.dataCmyk
    this.alpha = this.dataAlpha
  },
}
</script>
