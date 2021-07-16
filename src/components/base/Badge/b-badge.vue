<template>
  <span
    class="badge"
    :class="objClass"
    :style="objStyle"
  >
    <slot />
  </span>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "BBadge",
  props: {
    color: util.props.color,
    pill: util.props.Boolean,
  },
  computed: {
    objClass: function() {
      let color = this.color ? `bg-${this.color}` : ''
      let border = this.color ? `border border-${this.color}`: 'border border-dark'
      let pill = !this.$slots.default || this.pill ? 'rounded-pill' : ''
      return `${color} ${border} ${pill}`;
    },
    objStyle: function() {
      let height = !this.$slots.default ? "height: 16px" : null;
      return `${height}; `
    },
  }
};
</script>
