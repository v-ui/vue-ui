<template>
  <div
    class="progress-bar"
    :class="obbjClass"
    role="progressbar"
    :style="`width: ${value || 0}%`"
    :aria-valuenow="value"
    :aria-valuemin="min"
    :aria-valuemax="max"
  />
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "b-progress-bar-item",
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
  computed: {
    obbjClass: function () {
      let c = `bg-${this.color}`;
      if (this.striped) c += " progress-bar-striped ";
      if (this.animated) c += " progress-bar-animated ";

      return c;
    },
  },
};
</script>
