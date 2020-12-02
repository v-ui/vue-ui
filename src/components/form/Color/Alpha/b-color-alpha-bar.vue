<template>
  <b-color-bar
    v-model="a"
    :max="1"
    :filter="filterStyle"
    :status="status"
    :disabled="disabled"
  />
</template>

<script>
import util from '@/components/util'

import BColorBar from '../Basic/b-color-bar'

export default {
  name: 'b-color-alpha-bar',
  components: { BColorBar, },
  model: {
    prop: 'value',
    event: 'bar:changed',
  },
  props: {
    value: {
      ...util.props.UNumber,
      validator: function(value) {
        return util.props.UNumber.validator(value) && value <= 1
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
      a: this.value,
    }
  },
  computed: {
    filterStyle: function() {
      return `background-image: linear-gradient(to ${this.status === 'row' ? 'left': 'top'}, hsla(0, 0%, 100%, 0), #fff);`
    },
  },
  watch: {
    value: function(value) {
      this.a = value
    },
    a: function(value) {
      // v-model
      this.$emit('bar:changed', value)
    },
  },
}
</script>
