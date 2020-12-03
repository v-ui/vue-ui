<template>
  <div
    :style="barStyle"
    class="position-relative"
    :aria-disabled="disabled"
    @mousedown.left.exact="barDown"
  >
    <div v-if="filter" class="filter" :style="filter" />
    <span
      class="thumb"
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
    max: {
      ...util.props.UNumber,
      default: 100,
    },
    disabled: util.props.Boolean,
  },
  data() {
    return {
      disp: 0, // 位移
      selectedValue: 0,
      enumStatus: {
        row: 'row',
        column: 'column',
      },
    }
  },
  computed: {
    barStyle: function() {
      return this.status === this.enumStatus.column
        ? 'width: 10px; height: 260px;'
        : 'width: 260px; height: 10px;'
    },
    thumbStyle: function() {
      let s = this.status === this.enumStatus.column
        ? `left: -1px; width: 12px; height: 4px; top: ${this.disp}px;`
        : `top: -1px; width: 4px; height: 12px; left: ${this.disp}px;`
      let d = `cursor: ${this.disabled ? 'default': 'pointer'};`
      return `${s} ${d}`
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
  mounted() {
    this.selectedValue = this.value
    this.valueChange(this.selectedValue)
  },
  methods: {
    validatorSelectedValue: function(value) {
      return value >= 0 && value <= this.max || isNaN(value)
    },
    valueChange: function(value) {
      if (this.validatorSelectedValue(value)) {
        this.disp = this.ruler / this.max * (value || 0)
      }
    },
    dispChange: function(disp) {
      if (this.validatorSelectedValue(this.selectedValue)) {
        this.selectedValue = (disp || 0) / this.ruler * this.max
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
.thumb {
  position: absolute;
  border-radius: 1px;
  background: #fff;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
  box-shadow: 0 0 2px rgba(0, 0, 0, .6);
  z-index: 10;
}

.filter {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
