<template>
  <div
    v-if="$slots.default"
    class="input-group"
    :class="{[`input-group-${size}`]: size}"
  >
    <slot />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: 'BInputGroup',
  props: {
    size: util.props.size,
  },
}
</script>
