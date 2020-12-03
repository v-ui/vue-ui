import chroma from './plugin/chroma';
import props from '../props'

const base = chroma.base

const colorBar = {
  model: {
    prop: 'value',
    event: 'bar:changed',
  },
  props: {
    value: props.UNumber,
    disabled: props.Boolean,
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
      selectedValue: this.value,
    }
  },
  watch: {
    value: function(value) {
      this.selectedValue = value
    },
    selectedValue: function(value) {
      // v-model
      this.$emit('bar:changed', value)
    },
  },
}

const colorPanel = {
  model: {
    prop: 'value',
    event: 'panel:changed',
  },
  props: {
    value: Object,
    disabled: props.Boolean,
  },
  data() {
    return {
      selectedValue: this.value
    };
  },
  watch: {
    value: {
      handler: function(value) {
        this.selectedValue = value
      },
      deep: true,
    },
    selectedValue: {
      handler: function(value) {
        // v-model
        this.$emit('panel:changed', value)
      },
      deep: true,
    },
  },
}

export default {
  base,
  colorBar,
  colorPanel,
}
