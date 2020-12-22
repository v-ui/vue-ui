<template>
  <label
    v-if="$slots.default"
    class="col-form-label"
    :class="{[`col-form-label-${size}`]: size}"
  >
    <slot>{{ label }}</slot>
  </label>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: 'BFormLabel',
  props: {
    label: util.props.String,
    size: util.props.size,
  },
}
</script>
