<template>
  <button
    v-show="icon && icon.length > 0"
    class="btn btn-outline-primary rounded-circle text-center ms-1"
  >
    <i :class="icon" />
  </button>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "BControllerButton",
  props: {
    icon: util.props.String,
  }
};
</script>
