<template>
  <div class="d-flex flex-column align-items-center p-1">
    <div v-if="!hideInput" class="d-flex align-items-center justify-content-around">
      H: <b-number v-model="hsl.h" class="mx-1" max="360" size="sm" length="3" hideButton />
      S: <b-number v-model="lt.l" class="mx-1" max="1" step="0.01" size="sm" length="4" hideButton />
      L: <b-number v-model="lt.t" class="mx-1" max="1" step="0.01" size="sm" length="4" hideButton />
      A: <b-number v-model="alpha" class="mx-1" max="1" step="0.01" size="sm" length="4" hideButton />
    </div>
    <div class="d-flex p-1">
      <b-color-sl-panel class="m-1" :disabled="disabled" :style="{ background: color(hsl.h, 1, .5, 'hsl') }" v-model="lt"/>
      <b-color-hue-bar class="m-1" :disabled="disabled" status="column" v-model="hsl.h" />
    </div>
    <div class="p-1">
      <b-color-alpha-bar class="m-1" :disabled="disabled" :style="{ background: rgbCss }" v-model="alpha" />
    </div>
  </div>
</template>

<script>
import util from "@/components/util"

import BNumber from '@/components/form/b-number.vue'

import BColorHueBar from './b-color-hue-bar'
import BColorAlphaBar from '../Alpha/b-color-alpha-bar'
import BColorSlPanel from './b-color-sl-panel'

export default {
  name: 'b-color-hsl',
  components: { BNumber, BColorHueBar, BColorAlphaBar, BColorSlPanel },
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
      hsl: { h: 0, s: 1, l: .5, },
      alpha: 1,
      lt: { l:0, t: 0 },
    };
  },
  computed: {
    dataValue: function() {
      return this.color.valid(this.value)
        ? this.color(this.value)
        : this.color(0, 1, .5, 'hsl')
    },
    dataHsl: function() {
      return {
        h: this.dataValue.get('hsl.h'),
        s: this.dataValue.get('hsl.s'),
        l: this.dataValue.get('hsl.l'),
      }
    },
    dataAlpha: function() {
      return this.dataValue.alpha() || 1
    },
    rgbCss: function() {
      return this.color(this.hsl).css()
    },
    rgba: function() {
      return this.color(this.hsl).alpha(this.alpha)
    },
  },
  watch: {
    'hsl.h': function(newValue, oldValue) {
      if (isNaN(oldValue) && !isNaN(newValue)) {
        this.lt = { l: 1, t: .5 }
      }
    },
    lt: {
      handler: function() {
        debugger
        this.hsl.s = this.lt.l
        this.hsl.l = this.lt.t
      },
      deep: true,
    },
    dataHsl: {
      handler: function(value) {
        this.hsl.h = value.h
        this.lt = this.lt = { l: value.s, t: value.l }
      },
      deep: true,
    },
    dataAlpha: function(value) {
      this.alpha = value
    },
    rgba: function(value) {
      this.$emit('picker:change', value)
    },
  },
  mounted() {
    this.hsl = this.dataHsl
    this.alpha = this.dataAlpha
    this.lt = { l: this.dataHsl.s, t: this.dataHsl.l }
  },
}
</script>
