<template>
  <b-color-bar
    v-model="g"
    :max="255"
    :style="barStyle"
    :status="status"
    :disabled="disabled"
  />
</template>

<script>
import util from '@/components/util'

import BColorBar from '../../Basic/b-color-bar'

export default {
  name: 'b-color-green-bar',
  components: { BColorBar, },
  model: {
    prop: 'value',
    event: 'bar:changed',
  },
  props: {
    value: {
      ...util.props.UNumber,
      validator: function(value) {
        return util.props.UNumber.validator(value) && value <= 255
      },
    },
    disabled: util.props.Boolean,
    status: {
      type: String,
      default: 'row',
      validator: function(value) {
        return [ 'row', 'column' ].includes(value)
      },
    },
  },
  data() {
    return {
      g: this.value,
    }
  },
  computed: {
    barStyle: function() {
      return `background-image: linear-gradient(to ${this.status === 'row' ? 'right': 'bottom'}, rgb(0, 0, 0), rgb(0, 255, 0));`
    },
  },
  watch: {
    value: function(value) {
      this.g = value
    },
    g: function(value) {
      // v-model
      this.$emit('bar:changed', value)
    },
  },
}
</script>
