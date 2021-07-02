<template>
  <span
    class="badge"
    :class="objClass"
    :style="objStyle"
  >
    <slot />
    <sr-msg v-if="!this.$slots.default">{{ fillsrMsg }}</sr-msg>
  </span>
</template>

<script>
import util from "@/components/util/index.js";

import srMsg from "@/components/basic/basic-sr-msg.vue";

export default {
  name: "BBadge",
  components: { srMsg },
  props: {
    color: util.props.color,
    srMsg: util.props.String,
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
    fillsrMsg: function() {
      return this.srMsg || this.color;
    }
  }
};
</script>
