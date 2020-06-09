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
    vertical: Boolean
  },
  computed: {
    objClass: function() {
      return `${this.size ? `btn-group-${this.size}` : ""}
              ${this.vertical ? `btn-group-vertical` : ""}`
    }
  }
};
</script>
