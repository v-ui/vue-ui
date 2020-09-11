<template>
  <svg
    version="1.1"
    :width="width"
    :height="width"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
  >
    <!-- style="border: 1px solid #aaa; display:block;" -->
    <path
      :d="BgPd"
      fill="none"
      class="progress-bg"
      :stroke-width="strong"
      stroke-linecap="round"
    />
    <path
      :d="Pd"
      fill="none"
      :class="`stroke-${color}`"
      :stroke-width="strong"
      stroke-linecap="round"
    />
    <text x="0%" :y="info ? '-4%' : '0%'" text-anchor="middle" dominant-baseline="central">{{ parseInt(tweenNumber) || 0 }}%</text>
    <text x="0%" y="4%" text-anchor="middle" dominant-baseline="central">{{ info }}</text>
  </svg>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: 'b-progress-circle',
  mixins: [ util.mixins.animate.progress, ],
  props: {
    width: util.props.UInt,
    value: {
      ...util.props.UNumber,
      validator: (value) => util.props.UNumber.validator(value) && value <= 100,
    },
    color: [String, Array,],
    strong: util.props.UNumber,
    info: util.props.String,
  },
  data() {
    return {
      // 比例
      p: 0.9,
      targetNumber: this.value,
    }
  },
  computed: {
    viewBox: function() {
      let length = Math.floor(this.width * (this.p + 0.2))
      return `-${Math.floor(length / 2)} -${Math.floor(length / 2)} ${length} ${length}`
    },
    // A - r 圆的半径
    r: function() {
      return this.width / 2 * this.p
    },
    // M 起始点
    M: function() {
      return {
        x: 0,
        y: -this.r,
      }
    },
    // M string
    Ms: function() {
      return `M${this.M.x} ${this.M.y}`
    },
    // background A
    // A - rx,ry xAxisRotate LargeArcFlag,SweepFlag x,y
    BgA: function() {
      return {
        rx: this.r,
        ry: this.r,
        xAxisRotate: 0,
        LargeArcFlag: 1,
        SweepFlag: 1,
        x: -1,
        y: -this.r
      }
    },
    // background A string
    BgAs: function() {
      return this.A2As(this.BgA)
    },
    // background path d
    BgPd: function() {
      return `${this.Ms} ${this.BgAs}`
    },
    // deg 弧度
    deg: function() {
      debugger
      return 360 / 100 * Math.PI / 180 * this.tweenNumber || 0
    },
    // A - rx,ry xAxisRotate LargeArcFlag,SweepFlag x,y
    A: function() {
      debugger
      let x = Math.sin(this.deg) * this.r
      let y = -Math.cos(this.deg) * this.r
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
      return this.A2As(this.A)
    },
    // path d
    Pd: function() {
      return `${this.Ms} ${this.As}`
    },
  },
  watch: {
    value: function(value) {
      this.targetNumber = value
    },
  },
  methods: {
    A2As: function(A) {
      return `A${A.rx || 0},${A.ry || 0}
              ${A.xAxisRotate || 0}
              ${A.LargeArcFlag || 0},${A.SweepFlag || 0}
              ${A.x || 0},${A.y || 0}`
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
