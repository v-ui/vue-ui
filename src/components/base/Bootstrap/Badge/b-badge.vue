<template>
  <span v-if="!href" class="badge align-self-center" :class="objClass" :style="objStyle">
    <slot />
    <sr-msg>{{ fillsrMsg }}</sr-msg>
  </span>
  <base-a v-else class="badge align-self-center" :class="objClass" :href="href" :style="objStyle">
    <slot />
    <sr-msg>{{ fillsrMsg }}</sr-msg>
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
      default: "danger"
    },
    href: util.props.href,
    srMsg: util.props.srMsg,
    pill: Boolean
  },
  computed: {
    objClass: function() {
      return `badge-${this.color} ${
        !this.$slots.default || this.pill ? "badge-pill" : ""
      }`;
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
