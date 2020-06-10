<template>
  <button
    v-show="icon && icon.length > 0"
    class="btn btn-outline-primary rounded-circle text-center ml-1"
  >
    <i :class="icon" />
  </button>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "c-controller-button",
  props: {
    icon: util.props.String,
  }
};
</script>
