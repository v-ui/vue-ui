<template>
  <input
    type="submit"
    class="btn"
    :class="objClass"
    data-toggle="submit"
    :disabled="disabled"
    :aria-disabled="disabled"
    :value="value | worldUpperCase | firstUpperCase"
  >
</template>

<script>
import utilities from "@/components/utilities/index.js";

export default {
  name: "b-submit",
  mixins: [utilities.mixins.form.btn],
  props: {
    value: {
      ...utilities.props.value,
      default: `Submit`
    }
  }
};
</script>
