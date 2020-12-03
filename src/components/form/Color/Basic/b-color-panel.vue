<template>
  <div
    class="panel-main border border-light"
    :aria-disabled="disabled"
    @mousedown.left.exact="panelDown"
  >
    <div v-if="filter" class="filter" :style="filter" />
    <span
      class="cursor"
      :aria-disabled="disabled"
      :style="`top: ${offset.top}px; left: ${offset.left}px; cursor: ${disabled ? 'default': 'pointer'};`"
      @mousedown.left.exact.stop.prevent="cursorDown"
    />
  </div>
</template>

<script>
import util from '@/components/util'

export default {
  name: 'b-color-panel',
  model: {
    prop: 'value',
    event: 'panel:changed',
  },
  props: {
    value: Object,
    max: {
      type: Object,
      default: () => ({
        l: 100,
        t: 100,
      }),
    },
    filter: util.props.String,
    disabled: util.props.Boolean,
  },
  data() {
    return {
      offset: {
        top: 0,
        left: 0,
      },
      selectedValue: { l: 0, t: 0, },
    };
  },
  watch: {
    value: {
      handler: function(value) {
        this.selectedValue = value
        this.valueChange(value)
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
  mounted() {
    this.selectedValue = this.value
    this.valueChange(this.selectedValue)
  },
  methods: {
    validatorSelectedValue: function(value) {
      return value && value.l >= 0 && value.l <= this.max.l && value.t >= 0 && value.t <= this.max.t
    },
    valueChange: function(value) {
      if (this.validatorSelectedValue(value)) {
        this.offset.left = this.$el.clientWidth * value.l
        this.offset.top = this.$el.clientHeight * (this.max.t - value.t)
      }
    },
    offsetChange: function(value) {
      if (this.validatorSelectedValue(this.selectedValue)) {
        this.selectedValue.l = value.left / this.$el.clientWidth
        this.selectedValue.t = this.max.t - value.top / this.$el.clientHeight
      }
    },
    panelDown: function (event) {
      if (this.disabled) return
      let { offsetX, offsetY } = event;
      this.offset.top = offsetY;
      this.offset.left = offsetX;
      this.offsetChange(this.offset)
    },
    cursorDown: function(event) {
      if (this.disabled) return
      let t = event.pageY - this.offset.top
      let l = event.pageX - this.offset.left
      document.onmousemove = mouseEvent => {
        let { clientWidth, clientHeight } = this.$el;
        this.offset.top = this.getDailt(mouseEvent.pageY, t, clientHeight)
        this.offset.left = this.getDailt(mouseEvent.pageX, l, clientWidth)
        this.offsetChange(this.offset)
      }
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      }
    },
    getDailt: function (newValue, oldValue, max) {
      let result = newValue - oldValue;
      if (result < 0) result = 0;
      if (result > max) result = max;
      return result
    },
  },
};
</script>

<style scoped>
.panel-main {
  width: 200px;
  height: 200px;
  position: relative;
  background-position: initial initial;
}

.filter {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.cursor {
  position: absolute;
  width: 5px;
  height: 5px;
  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, 0.3),
    0 0 1px 2px rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  transform: translate(-2px, -2px);
  z-index: 10;
}
</style>
