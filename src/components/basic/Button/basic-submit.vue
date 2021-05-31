<template>
  <input
    type="submit"
    class="btn"
    :class="objClass"
    data-toggle="submit"
    :disabled="disabled"
    :aria-disabled="disabled"
    :value="value"
  >
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "BasicSubmit",
  mixins: [util.mixins.form.btn],
  props: {
    value: {
      ...util.props.String,
      default: `Submit`
    }
  }
};
</script>
