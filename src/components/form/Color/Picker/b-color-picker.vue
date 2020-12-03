<template>
  <div style="width: 240px">
    <div class="d-flex align-items-center px-2 py-1">
      <strong class="text-center w-100" v-if="setting">Set color model</strong>
      <b-color-label v-else class="w-100" :color="rgba" />
      <basic-icon v-if="!disabled" :icon="setting ? 'x' : 'gear'" style="cursor:pointer" @click.native="setting = !setting" />
    </div>
    <template v-if="!disabled && selectValue">
      <hr class="my-1">
      <!-- set-panel -->
      <b-color-set v-if="setting" :list="modes" v-model="selectedMode" />
      <!-- color-panel -->
      <template v-else>
        <b-color-hsl v-if="selectedMode === 'hsl'" v-model="selectValue" />
        <b-color-rgb v-if="selectedMode === 'rgb'" v-model="selectValue" />
        <b-color-cmyk v-if="selectedMode === 'cmyk'" v-model="selectValue" />
      </template>
    </template>
  </div>
</template>

<script>
import util from "@/components/util";

import BColorSet from './b-color-set'
import BColorLabel from '../Basic/b-color-label'

import BColorHsl from '../Panel/Hsl/b-color-hsl'
import BColorRgb from '../Panel/Rgb/b-color-rgb'
import BColorCmyk from '../Panel/Cmyk/b-color-cmyk'

import BasicIcon from '@/components/basic/basic-icon.vue'

const modes = [ 'hsl', 'rgb', 'cmyk', ]

export default {
  name: 'b-color-picker',
  components: { BColorSet, BColorLabel, BColorHsl, BColorRgb, BColorCmyk, BasicIcon, },
  mixins: [ util.mixins.color.base, ],
  model: {
    prop: 'value',
    event: 'picker:change',
  },
  props: {
    value: [ Object, Number, String, Array, ],
    mode: {
      type: String,
      default: 'hsl',
      validator: function(value) {
        return modes.includes(value)
      },
    },
    disabled: util.props.Boolean,
  },
  data() {
    return {
      selectValue: null,
      setting: false,
      modes: modes,
      selectedMode: this.mode,
    }
  },
  computed: {
    dataColor: function() {
      return this.color.valid(this.selectValue)
        ? this.color(this.selectValue)
        : this.color(0, 1, .5, 'hsl')
    },
    rgb: function() {
      return this.dataColor.rgb()
    },
    rgbCss: function() {
      return this.dataColor.css()
    },
    rgba: function() {
      return this.dataColor.hex()
    },
  },
  watch: {
    mode: function(value) {
      this.selectedMode = value
    },
    selectedMode: function() {
      this.setting = false
    },
    value: function(value) {
      this.selectValue = value
    },
    rgba: function(value) {
      this.$emit('picker:change', value)
    },
  },
  mounted() {
    this.selectValue = this.value || this.color(0, 1, .5, 'hsl')
  },
}
</script>
