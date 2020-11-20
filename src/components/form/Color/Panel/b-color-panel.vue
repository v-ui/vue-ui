<template>
  <div
    class="color-panel-main border border-light"
    :aria-disabled="disabled"
    @mousedown="panelDown"
  >
    <!-- <div class="color-white-panel" />
    <div class="color-block-panel" /> -->
    <div class="color-hsl-panel" />
    <span
      class="color-cursor"
      :aria-disabled="disabled"
      :style="`top: ${offset.top}px; left: ${offset.left}px`"
      @mousedown.left.exact.stop.prevent="cursorDown"
    />
  </div>
</template>

<script>
import util from "@/components/util";

export default {
  name: "b-color-panel",
  mixins: [util.mixins.color.base],
  model: {
    prop: 'value',
    event: 'panel:changed',
  },
  props: {
    value: [Object,],
    disabled: util.props.Boolean,
  },
  data() {
    return {
      offset: {
        top: 0,
        left: 0,
      },
      sl: this.value,
    };
  },
  watch: {
    value: {
      handler: function(value) {
        this.sl = value
      },
      deep: true,
    },
    offset: {
      handler: function(value) {
        this.offsetChange(value)
      },
      deep: true,
    },
    sl: {
      handler: function(value) {
        // v-model
        this.$emit('panel:changed', value)
      },
      deep: true,
    },
  },
  mounted() {
    this.valueChange(this.sl)
  },
  methods: {
    valueChange: function(value) {
      if (value && value.s >= 0 && value.s <= 1 && value.l >= 0 && value.l <= 1) {
        this.offset.left = this.$el.clientWidth * value.s
        this.offset.top = this.$el.clientHeight * value.l
      }
    },
    offsetChange: function(value) {
      if (this.sl && this.sl.s >= 0 && this.sl.s <= 1 && this.sl.l >= 0 && this.sl.l <= 1) {
        this.sl.s = value.left / this.$el.clientWidth
        this.sl.l = 1 - value.top / this.$el.clientHeight
      }
    },
    panelDown: function (event) {
      if (this.disabled) return
      let { offsetX, offsetY } = event;
      this.offset.top = offsetY;
      this.offset.left = offsetX;
    },
    cursorDown: function(event) {
      if (this.disabled) return
      let t = event.pageY - this.offset.top
      let l = event.pageX - this.offset.left
      document.onmousemove = mouseEvent => {
        let { clientWidth, clientHeight } = this.$el;
        this.offset.top = this.getDailt(mouseEvent.pageY, t, clientHeight)
        this.offset.left = this.getDailt(mouseEvent.pageX, l, clientWidth)
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
.color-panel-main {
  width: 200px;
  height: 200px;
  position: relative;
  background-position: initial initial;
}

.color-white-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
}

.color-block-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(0deg, #000, hsla(0, 100%, 0%, 0));
}

.color-hsl-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(top, hsl(0, 0%, 100%) 0%, hsla(0, 0%, 100%, 0) 50%, hsla(0, 0%, 0%, 0) 50%, hsl(0, 0%, 0%) 100%),
              linear-gradient(left, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);
}

.color-cursor {
  position: absolute;
  width: 5px;
  height: 5px;
  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, 0.3),
    0 0 1px 2px rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  transform: translate(-2px, -2px);
  cursor: pointer;
  z-index: 10;
}
</style>
