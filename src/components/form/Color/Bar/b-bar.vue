<template>
  <div
    :style="barStyle"
    class="position-relative"
    :aria-disabled="disabled"
    @mousedown.left.exact="barDown"
  >
    <div v-if="filter" :style="filter" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;" />
    <span
      class="color-thumb"
      :style="thumbStyle"
      :aria-disabled="disabled"
      @mousedown.left.exact.stop.prevent="thumbDown"
    />
  </div>
</template>

<script>
import util from '@/components/util'

export default {
  name: 'b-color-bar',
  model: {
    props: 'value',
    event: 'bar:changed'
  },
  props: {
    value: util.props.UNumber,
    status: {
      type: String,
      default: 'row',
      validator: function(value) {
        return [ 'row', 'column' ].includes(value)
      },
    },
    filter: util.props.String,
    min: util.props.UNumber,
    max: {
      ...util.props.UNumber,
      default: 100,
    },
    disabled: util.props.Boolean,
  },
  data() {
    return {
      disp: 0, // 位移
      selectedValue: this.value,
      enumStatus: {
        row: 'row',
        column: 'column',
      },
    }
  },
  computed: {
    barStyle: function() {
      return this.status === this.enumStatus.column
        ? 'width: 10px; height: 200px;'
        : 'width: 200px; height: 10px;'
    },
    thumbStyle: function() {
      return this.status === this.enumStatus.column
        ? `left: -1px; width: 12px; height: 4px; top: ${this.disp}px`
        : `top: -1px; width: 4px; height: 12px; left: ${this.disp}px`
    },
    ruler: function() {
      return this.status === this.enumStatus.column
        ? this.$el.clientHeight
        : this.$el.clientWidth
    },
  },
  watch: {
    value: function(value) {
      this.selectedValue = value
      this.valueChange(value)
    },
    selectedValue: function(value) {
      // v-model
      this.$emit('bar:changed', value)
    },
  },
  methods: {
    validatorSelectedValue: function(value) {
      return value >= this.min && value <= this.max
    },
    valueChange: function(value) {
      if (this.validatorSelectedValue(value)) {
        this.disp = this.ruler / this.max * value
        this.dispChange(this.disp)
      }
    },
    dispChange: function(disp) {
      if (this.validatorSelectedValue(this.selectedValue)) {
        this.selectedValue = disp / this.ruler * this.max
      }
    },
    barDown: function(event) {
      if (this.disabled) return
      this.disp = this.status === this.enumStatus.column ? event.offsetY : event.offsetX
      this.dispChange(this.disp)
    },
    thumbDown: function(event) {
      if (this.disabled) return
      let d = (this.status === this.enumStatus.column ? event.pageY : event.pageX) - this.disp
      document.onmousemove = mouseEvent => {
        let disp = (this.status === this.enumStatus.column ? mouseEvent.pageY : mouseEvent.pageX) - d
        if (disp < 0) disp = 0
        if (disp > this.ruler) disp = this.ruler
        this.disp = disp
        this.dispChange(this.disp)
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
  },
}
</script>

<style scoped>
.color-thumb {
  position: absolute;
  border-radius: 1px;
  background: #fff;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
  box-shadow: 0 0 2px rgba(0, 0, 0, .6);
  cursor: pointer;
  z-index: 10;
}
</style>
