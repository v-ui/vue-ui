import props from "../props.js";
import TweenLite from "gsap";

let base = {
  props: {
    target: props.Object,
    // duration: util.props.Number,
  },
  data() {
    return {
      opt: {delay: 0.3, ease: "expo"},
      tweenNumber: 0,
      targetNumber: 0,
    };
  },
  mounted() {
    this.showAnimate(this.targetNumber);
  },
  methods: {
    showAnimate: function (number, oldNumber) {
      this.tweenNumber = oldNumber;
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
