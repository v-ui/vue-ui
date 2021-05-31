<template>
  <div class="d-flex flex-column align-items-center p-1">
    <div
      v-if="!hideInput"
      class="d-flex align-items-center justify-content-around"
    >
      C: <b-number
        v-model="cmyk.c"
        class="mx-1"
        max="1"
        step="0.01"
        size="sm"
        length="4"
        hide-button
      />
      M: <b-number
        v-model="cmyk.m"
        class="mx-1"
        max="1"
        step="0.01"
        size="sm"
        length="4"
        hide-button
      />
      Y: <b-number
        v-model="cmyk.y"
        class="mx-1"
        max="1"
        step="0.01"
        size="sm"
        length="4"
        hide-button
      />
      K: <b-number
        v-model="cmyk.k"
        class="mx-1"
        max="1"
        step="0.01"
        size="sm"
        length="4"
        hide-button
      />
    </div>
    <b-color-cyan-bar
      v-model="cmyk.c"
      class="my-1"
    />
    <b-color-magenta-bar
      v-model="cmyk.m"
      class="my-1"
    />
    <b-color-yellow-bar
      v-model="cmyk.y"
      class="my-1"
    />
    <b-color-key-bar
      v-model="cmyk.k"
      class="my-1"
    />
    <!-- <b-color-alpha-bar class="my-1" :style="{ background: rgbCss }" v-model="alpha" /> -->
  </div>
</template>

<script>
import util from "@/components/util";

import BNumber from '@/components/form/b-number.vue'

import BColorCyanBar from './b-color-cyan-bar'
import BColorMagentaBar from './b-color-magenta-bar'
import BColorYellowBar from './b-color-yellow-bar'
import BColorKeyBar from './b-color-key-bar'
// import BColorAlphaBar from '../Alpha/b-color-alpha-bar'

export default {
  name: 'BColorCmyk',
  components: { BNumber, BColorCyanBar, BColorMagentaBar, BColorYellowBar, BColorKeyBar },
  mixins: [ util.mixins.color.base, ],
  model: {
    prop: 'value',
    event: 'picker:change',
  },
  props: {
    value: [ Object, Number, String, Array, ],
    hideInput: util.props.Boolean,
    disabled: util.props.Boolean,
  },
  data() {
    return {
      cmyk: { c: 0, m: 1, y: 1, k: 0, },
      // alpha: 1,
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
    // dataAlpha: function() {
    //   return this.dataValue.alpha() || 1
    // },
    rgbCss: function() {
      return this.color(this.cmyk).css()
    },
    rgb: function() {
      return this.color(this.cmyk)
    },
  },
  watch: {
    // dataAlpha: function(value) {
    //   this.alpha = value
    // },
    rgb: function(value) {
      this.$emit('picker:change', value)
    },
  },
  mounted() {
    this.cmyk = this.dataCmyk
    // this.alpha = this.dataAlpha
  },
}
</script>
