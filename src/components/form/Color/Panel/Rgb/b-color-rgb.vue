<template>
  <div class="d-flex flex-column align-items-center p-1">
    <div
      v-if="!hideInput"
      class="d-flex align-items-center justify-content-around"
    >
      R: <b-number
        v-model="rgb.r"
        class="mx-1"
        max="255"
        size="sm"
        length="3"
        hide-button
      />
      G: <b-number
        v-model="rgb.g"
        class="mx-1"
        max="255"
        size="sm"
        length="3"
        hide-button
      />
      B: <b-number
        v-model="rgb.b"
        class="mx-1"
        max="255"
        size="sm"
        length="3"
        hide-button
      />
      A: <b-number
        v-model="alpha"
        class="mx-1"
        max="1"
        step="0.01"
        size="sm"
        length="4"
        hide-button
      />
    </div>
    <b-color-red-bar
      v-model="rgb.r"
      class="my-1"
    />
    <b-color-green-bar
      v-model="rgb.g"
      class="my-1"
    />
    <b-color-blue-bar
      v-model="rgb.b"
      class="my-1"
    />
    <b-color-alpha-bar
      v-model="alpha"
      class="my-1"
      :style="{ background: rgbCss }"
    />
  </div>
</template>

<script>
import util from "@/components/util";

import BNumber from '@/components/form/b-number.vue'

import BColorRedBar from './b-color-red-bar'
import BColorGreenBar from './b-color-green-bar'
import BColorBlueBar from './b-color-blue-bar'
import BColorAlphaBar from '../Alpha/b-color-alpha-bar'

export default {
  name: 'BColorRgb',
  components: { BNumber, BColorRedBar, BColorGreenBar, BColorBlueBar, BColorAlphaBar  },
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
