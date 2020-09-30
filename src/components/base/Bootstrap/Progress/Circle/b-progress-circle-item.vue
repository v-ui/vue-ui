<template>
  <path
    :d="Pd"
    fill="none"
    :class="`stroke-${color}`"
    :stroke-width="strong"
    stroke-linecap="round"
  />
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: 'BProgressCircleItem',
  props: {
    r: util.props.UNumber,
    value: util.props.UNumber,
    start: util.props.UNumber,
    color: [String, Array,],
    strong: util.props.UNumber,
  },
  computed: {
    // deg 弧度
    deg: function() {
      return 360 / 100 * Math.PI / 180 * this.value || 0
    },
    // M 起始点
    M: function() {
      return this.start && !isNaN(this.start)
          ? { x: Math.sin(this.start) * this.r, y: -Math.cos(this.start) * this.r }
          : { x: 0, y: -this.r }
    },
    // M string
    Ms: function() {
      return `M${this.M.x} ${this.M.y}`
    },
    // A - rx,ry xAxisRotate LargeArcFlag,SweepFlag x,y
    A: function() {
      let x = Math.sin(this.start + this.deg) * this.r
      let y = -Math.cos(this.start + this.deg) * this.r
      return {
        rx: this.r,
        ry: this.r,
        xAxisRotate: 0,
        LargeArcFlag: this.deg > Math.PI ? 1 : 0,
        SweepFlag: 1,
        x: Math.abs(this.deg - 2 * Math.PI) <= 0.00001 ? -1 : x,
        y: y,
      }
    },
    // A string
    As: function() {
      const A = this.A
      return `A${A.rx || 0},${A.ry || 0}
      ${A.xAxisRotate || 0}
      ${A.LargeArcFlag || 0},${A.SweepFlag || 0}
      ${A.x || 0},${A.y || 0}`
    },
    // path d
    Pd: function() {
      return `${this.Ms} ${this.As}`
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../../../../../node_modules/bootstrap/scss/functions";
@import "../../../../../../node_modules/bootstrap/scss/variables";
@import "../../../../../../node_modules/bootstrap/scss/mixins";

.progress-bg {
  stroke: $progress-bg;
}

// Generate `.fill-*` color utilities
@each $color, $value in $theme-colors {
  .fill-#{$color} {
    fill: $value;
  }
}

// Generate `.stroke-*` color utilities
@each $color, $value in $theme-colors {
  .stroke-#{$color} {
    stroke: $value;
  }
}

// Optional
@import "../../../../../../node_modules/bootstrap/scss/root";
@import "../../../../../../node_modules/bootstrap/scss/reboot";
@import "../../../../../../node_modules/bootstrap/scss/type";
</style>
