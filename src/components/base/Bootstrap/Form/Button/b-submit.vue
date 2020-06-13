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
import util from "@/components/util/index.js";

export default {
  name: "b-submit",
  mixins: [util.mixins.form.btn],
  props: {
    value: {
      ...util.props.String,
      default: `Submit`
    }
  }
};
</script>
