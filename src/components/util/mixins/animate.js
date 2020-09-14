import props from "../props.js";
import TweenLite from "gsap";

let base = {
  props: {
    target: props.Object,
    value: props.Number,
    // duration: util.props.Number,
  },
  data() {
    return {
      opt: {delay: 0.5,},
      tweenNumber: 0,
      targetNumber: this.value || 0,
    };
  },
  watch: {
    value: function(value) {
      this.targetNumber = value
    },
    targetNumber: function (value) {
      this.showAnimate(value);
    },
  },
  mounted() {
    this.showAnimate(this.targetNumber);
  },
  methods: {
    showAnimate: function (number) {
      TweenLite.to(this.target && this.target.keys && this.target.keys().length > 0 ? this.target : this.$data, { tweenNumber: number, ...this.opt });
    },
  },
}

let progress = {
  mixins: [ base, ],
}

export default {
  base,
  progress,
}
