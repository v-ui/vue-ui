<template>
  <div
    class="color-panel-main"
    style="cursor: pointer"
    :style="{ background: color(90, 1, 0.5, 'hsl') }"
    @mousedown="panelDown"
  >
    <div class="color-white-panel" />
    <div class="color-block-panel" />
    <span
      class="color-cursor"
      :style="`top: ${top}px; left: ${left}px`"
      @mousedown.left.exact.stop.prevent="cursorDown"
    />
  </div>
</template>

<script>
import util from "@/components/util";

export default {
  name: "b-color-panel",
  mixins: [util.mixins.color.base],
  data() {
    return {
      top: 0,
      left: 0,
    };
  },
  computed: {},
  methods: {
    panelDown: function (event) {
      let { offsetX, offsetY } = event;
      this.top = offsetY;
      this.left = offsetX;
    },
    cursorDown: function(event) {
      let l = event.pageX - this.left
      let t = event.pageY - this.top
      document.onmousemove = mouseEvent => {
        let { clientWidth, clientHeight } = this.$el;
        this.left = this.getDailt(mouseEvent.pageX, l, clientWidth)
        this.top = this.getDailt(mouseEvent.pageY, t, clientHeight)
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
  background: linear-gradient(0deg, #000, transparent);
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
