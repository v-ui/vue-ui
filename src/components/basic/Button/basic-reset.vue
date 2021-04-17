<template>
  <input
    type="reset"
    class="btn"
    :class="objClass"
    data-toggle="reset"
    :disabled="disabled"
    :aria-disabled="disabled"
    :value="value"
  >
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "BasicReset",
  mixins: [util.mixins.form.btn],
  props: {
    value: {
      ...util.props.String,
      default: `Reset`
    }
  }
};
</script>
