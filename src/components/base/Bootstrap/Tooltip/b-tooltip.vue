<template>
  <div
    v-if="show"
    class="tooltip fade"
    :class="objClass"
    role="tooltip"
    :x-placement="set"
    style="position: absolute; top: 0px; left: 0px; will-change: transform;"
    :style="{transform: `translate3d(${left}px, ${top}px, 0px)`}"
  >
    <div class="arrow" :style="arrowStyle" />
    <div ref="body" class="tooltip-inner">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "b-tooltip",
  props: {
    show: util.props.Boolean,
    set: {
      type: String,
      default: "right",
      validator: value => ["top", "bottom", "left", "right"].includes(value),
    },
    top: util.props.Int,
    left: util.props.Int,
    content: util.props.String
  },
  data() {
    return {
      arrowStyle: []
    };
  },
  computed: {
    objClass: function() {
      let c = "";
      if (this.show) c += " show ";
      if (this.set) c += ` bs-tooltip-${this.set} `;
      return c;
    }
  },
  mounted: function() {
    let setX = !["top", "bottom"].includes(this.set);
    this.arrowStyle = setX
      ? { top: `${(this.$refs.body.offsetHeight) / 2 - 13}px` }
      : { left: `${this.$refs.body.offsetWidth / 2 - 13}px` };
  }
};
</script>
