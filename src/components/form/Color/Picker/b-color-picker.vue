<template>
  <div style="width: 240px">
    <div class="d-flex align-items-center px-2 py-1">
      <div class="d-flex align-items-center justify-content-center w-100">
        <span class="d-inline-block border border-primary m-1" style="width: 20px; height: 20px;" :style="`background: ${rgba}`"  />
        <strong class="text-center">{{ rgba }}</strong>
      </div>
      cotroller
    </div>
    <hr class="my-1">
    <div class="d-flex p-1">
      <b-color-panel class="m-1" :style="{ background: color(hsl.h, 1, .5, 'hsl') }" v-model="sl"/>
      <b-color-hue-bar class="m-1" status="column" v-model="hsl.h" />
    </div>
    <div class="p-1">
      <b-color-alpha-bar class="m-1" :style="{ background: rgbCss }" v-model="alpha" />
    </div>
  </div>
</template>

<script>
import util from "@/components/util";

import BColorHueBar from '../Bar/b-color-hue-bar'
import BColorAlphaBar from '../Bar/b-color-alpha-bar'
import BColorPanel from '../Panel/b-color-panel'

export default {
  name: 'b-color-picker',
  components: { BColorHueBar, BColorAlphaBar, BColorPanel },
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
      sl: null,
    };
  },
  computed: {
    dataValue: function() {
      return this.color.valid(this.value)
        ? this.color(this.value)
        : this.color(100, 1, .5, 'hsl')
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
        this.sl = { s: value.s, l: value.l }
      },
      deep: true,
    },
    sl: {
      handler: function() {
        this.hsl.s = this.sl.s
        this.hsl.l = this.sl.l
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
    this.sl = { s: this.dataHsl.s, l: this.dataHsl.l }
  },
}
</script>
