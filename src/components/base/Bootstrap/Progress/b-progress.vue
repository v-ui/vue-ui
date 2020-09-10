<template>
  <div>
    <b-circle
      v-if="status === 'circle'"
      width="200"
      :value="value"
      :strong="strong" />
    <b-bar
      v-else
      :list="list"
      :color="color"
      :value="value"
      :strong="strong"
      :striped="striped"
      :animated="animated" />
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BBar from "./Bar/b-progress-bar.vue";
import BCircle from "./Circle/b-progress-cicle.vue";

import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-progress",
  components: { BBar, BCircle, BInfo },
  props: {
    status: {
      ...util.props.String,
      default: "bar",
      validator: function (value) {
        return ["bar", "circle"].includes(value);
      },
    },
    list: util.props.Array,
    color: util.props.color,
    info: util.props.String,
    striped: util.props.Boolean,
    animated: util.props.Boolean,
    size: util.props.size,
    value: {
      ...util.props.UNumber,
      validator: (value) => util.props.UNumber.validator(value) && value <= 100,
    },
  },
  computed: {
    // 粗细
    strong: function () {
      let strong = "10";
      if (this.size === "sm") strong = "5";
      else if (this.size === "lg") strong = "15";
      return strong;
    },
  },
};
</script>
