<template>
  <div
    v-show="$slots.default && state"
    :class="`${state}-${type}`"
  >
    <slot />
  </div>
</template>
<script>
import config from "@/config/index";

export default {
  name: "BFormValid",
  props: {
    state: {
      type: String,
      required: true,
      validator: value => ["valid", "invalid"].includes(value),
    },
    type: {
      type: String,
      default: config.ui.forms.validInfoType,
      validator: value => ["feedback", "tooltip"].includes(value),
    }
  }
};
</script>
