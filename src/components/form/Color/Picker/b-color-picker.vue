<template>
  <div style="width: 240px">
    <div class="d-flex align-items-center px-2 py-1">
      <b-color-label class="w-100" :color="rgba" />
      <basic-icon v-if="!disabled" icon="gear" style="cursor:pointer" />
    </div>
    <template v-if="!disabled">
      <hr class="my-1">
      <b-color-hsl-panel v-model="selectValue" />
    </template>
  </div>
</template>

<script>
import util from "@/components/util";

import BColorLabel from '../Basic/b-color-label'
// import BColorSet from './b-color-set'
import BColorHslPanel from '../hsl/b-color-hsl-panel'

import BasicIcon from '@/components/basic/basic-icon.vue'

export default {
  name: 'b-color-picker',
  components: { BColorLabel, BColorHslPanel, BasicIcon, },
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
      selectValue: null,
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
