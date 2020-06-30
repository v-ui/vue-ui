<template>
  <span v-if="!href" class="badge" :class="objClass" :style="objStyle">
    <slot />
    <sr-msg v-if="!this.$slots.default">{{ fillsrMsg }}</sr-msg>
  </span>
  <base-a v-else class="badge" :class="objClass" :href="href" :style="objStyle">
    <slot />
    <sr-msg v-if="!this.$slots.default">{{ fillsrMsg }}</sr-msg>
  </base-a>
</template>

<script>
import util from "@/components/util/index.js";

import BaseA from "@/components/base/Content/A/c-a.vue";

import srMsg from "@/components/Basic/basic-sr-msg.vue";

export default {
  name: "b-badge",
  components: { BaseA, srMsg },
  props: {
    color: {
      ...util.props.color,
      default: "info"
    },
    href: util.props.href,
    srMsg: util.props.String,
    pill: util.props.Boolean,
  },
  computed: {
    objClass: function() {
      let color = this.color ? `badge-${this.color}` : ''
      let pill = !this.$slots.default || this.pill ? 'badge-pill' : ''
      return `${color} ${pill}`;
    },
    objStyle: function() {
      return !this.$slots.default ? "height: 15px" : null;
    },
    fillsrMsg: function() {
      return this.srMsg || this.color;
    }
  }
};
</script>
