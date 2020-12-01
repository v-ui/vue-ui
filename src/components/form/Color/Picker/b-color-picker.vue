<template>
  <div style="width: 240px">
    <div class="d-flex align-items-center px-2 py-1">
      <div class="d-flex align-items-center justify-content-center w-100">
        <span class="d-inline-block border border-primary m-1" style="width: 20px; height: 20px;" :style="`background: ${rgba}`"  />
        <strong class="text-center">{{ rgba }}</strong>
      </div>
      <basic-icon v-if="!disabled" icon="gear" style="cursor:pointer" />
    </div>
    <template v-if="!disabled">
      <hr class="my-1">
      <div class="d-flex p-1">
        <b-color-sl-panel class="m-1" :disabled="disabled" :style="{ background: color(hsl.h, 1, .5, 'hsl') }" v-model="lt"/>
        <b-color-hue-bar class="m-1" :disabled="disabled" status="column" v-model="hsl.h" />
      </div>
      <div class="p-1">
        <b-color-alpha-bar class="m-1" :disabled="disabled" :style="{ background: rgbCss }" v-model="alpha" />
      </div>
    </template>
  </div>
</template>

<script>
import util from "@/components/util";

import BColorHueBar from '../hsl/b-color-hue-bar'
import BColorAlphaBar from '../Alpha/b-color-alpha-bar'
import BColorSlPanel from '../hsl/b-color-sl-panel'

import BasicIcon from '@/components/basic/basic-icon.vue'

export default {
  name: 'b-color-picker',
  components: { BColorHueBar, BColorAlphaBar, BColorSlPanel, BasicIcon },
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
      hsl: { h: 0, s: 1, l: .5, },
      alpha: 1,
      lt: null,
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
    rgb: function() {
      return this.color(this.hsl).rgb()
    },
    rgbCss: function() {
      return this.color(this.hsl).css()
    },
    rgba: function() {
      return this.color(this.rgb).alpha(this.alpha)
    },
  },
  watch: {
    dataHsl: {
      handler: function(value) {
        this.hsl.h = value.h
        this.lt = { l: value.s, t: value.l }
      },
      deep: true,
    },
    lt: {
      handler: function() {
        this.hsl.s = this.lt.l
        this.hsl.l = this.lt.t
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
