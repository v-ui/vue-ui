<template>
  <div>
    <b-circle v-if="status === 'circle'" />
    <b-bar
      v-else
      :list="list"
      :size="size"
      :color="color"
      :value="value"
    />
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
    size: util.props.size,
    value: {
      ...util.props.UNumber,
      validator: (value) => util.props.UNumber.validator(value) && value <= 100,
    },
  },
};
</script>
