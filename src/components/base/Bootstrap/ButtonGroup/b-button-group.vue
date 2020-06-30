<template>
  <div v-if="$slots.default" class="btn-group" :class="objClass" role="group">
    <slot />
  </div>
</template>
<script>
import util from "@/components/util/index.js"

export default {
  name: "b-button-group",
  props: {
    size: util.props.size,
    vertical: util.props.Boolean
  },
  computed: {
    objClass: function() {
      let size = this.size ? `btn-group-${this.size}` : ""
      let vertical = this.vertical ? `btn-group-vertical` : ""
      return `${size} ${vertical}`
    }
  }
};
</script>
