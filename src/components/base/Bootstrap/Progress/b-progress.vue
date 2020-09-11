<template>
  <div>
    <b-circle
      v-if="status === 'circle'"
      :width="width"
      :value="value"
      :strong="strong"
      :info="info"
    />
    <b-bar
      v-else
      :type="type"
      :color="color"
      :value="value"
      :strong="strong"
      :striped="striped"
      :animated="animated"
    />
    <b-info v-if="status !== 'circle'" :info="info" />
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
    type: String,
    color: [String, Array],
    info: util.props.String,
    striped: util.props.Boolean,
    animated: util.props.Boolean,
    size: util.props.size,
    value: {
      ...util.props.UNumber,
      validator: (value) => util.props.UNumber.validator(value) && value <= 100,
    },
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    // 粗细
    strong: function () {
      let strong = "10";
      if (this.size === "sm") strong = "5";
      else if (this.size === "lg") strong = "15";
      return strong;
    },
    width: function() {
      let width = 200
      if (this.size === "sm") width = "150";
      else if (this.size === "lg") width = "250";
      return width;
    },
  },
};
</script>
