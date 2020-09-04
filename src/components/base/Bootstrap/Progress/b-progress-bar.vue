<template>
  <div
    class="progress-bar"
    :class="obbjClass"
    role="progressbar"
    :style="`width: ${tweenedNumber}%`"
    :aria-valuenow="value"
    :aria-valuemin="min"
    :aria-valuemax="max"
  >
  <!-- {{ showValue ? `${value}%` : '' }} -->
  </div>
</template>

<script>
import TweenLite from "gsap";
import util from "@/components/util/index.js";

export default {
  name: "b-progress-bar",
  props: {
    value: {
      ...util.props.UNumber,
      validator: (value) => util.props.UNumber.validator(value) && value <= 100,
    },
    min: {
      ...util.props.UNumber,
      validator: (value) => util.props.UNumber.validator(value) && value <= 100,
    },
    max: {
      ...util.props.UNumber,
      default: 100,
      validator: (value) => util.props.UNumber.validator(value) && value <= 100,
    },
    color: util.props.color,
    striped: util.props.Boolean,
    animated: util.props.Boolean,
  },
  data() {
    return {
      tweenedNumber: 0,
    };
  },
  computed: {
    obbjClass: function () {
      let c = `bg-${this.color}`;
      if (this.striped) c += " progress-bar-striped ";
      if (this.animated) c += " progress-bar-animated ";

      return c;
    },
  },
  mounted() {
    this.showAnimat(this.value);
  },
  methods: {
    showAnimat: function (number, oldNumber) {
      this.tweenedNumber = oldNumber;
      TweenLite.to(this.$data, 0.5, { tweenedNumber: number });
    },
  },
  watch: {
    value: function (val, old) {
      this.showAnimat(val, old);
    },
    tweenedNumber: function () {
      this.$emit("animating");
    },
  },
};
</script>
