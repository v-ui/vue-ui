<template functional>
  <button
    v-show="props.icon && props.icon.length > 0"
    class="btn btn-outline-primary rounded-circle text-center ml-1"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <i :class="props.icon" />
  </button>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "CControllerButton",
  props: {
    icon: util.props.String,
  }
};
</script>
