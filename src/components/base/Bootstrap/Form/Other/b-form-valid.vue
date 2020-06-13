<template functional>
  <div v-show="slots().default && props.state" :class="`${props.state}-${props.type}`">
    <slot />
  </div>
</template>
<script>
import config from "@/config/index";

export default {
  name: "b-form-valid",
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
