<template>
  <input
    type="reset"
    class="btn"
    :class="objClass"
    data-toggle="reset"
    :disabled="disabled"
    :aria-disabled="disabled"
    :value="value | worldUpperCase | firstUpperCase"
  >
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "b-reset",
  mixins: [util.mixins.form.btn],
  props: {
    value: {
      ...util.props.String,
      default: `Reset`
    }
  }
};
</script>
