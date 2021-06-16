<template>
  <span class="form-text">
    <slot>{{ info }}</slot>
  </span>
</template>

<script>
import util from "@/components/util/index.js";
export default {
  name: "b-form-text",
  props: {
    info: util.props.String,
  },
}
</script>
