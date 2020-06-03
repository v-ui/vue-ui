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
import utilities from "@/components/utilities/index.js";

export default {
  name: "b-reset",
  mixins: [utilities.mixins.form.btn],
  props: {
    value: {
      ...utilities.props.value,
      default: `Reset`
    }
  }
};
</script>
