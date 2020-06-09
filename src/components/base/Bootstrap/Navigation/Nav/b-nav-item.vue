<template>
  <li class="nav-item">
    <base-a
      class="nav-link text-truncate"
      :class="objClass"
      hide-icon
      :href="href"
      :disabled="disabled"
      v-bind="$attrs"
    >
      <slot>{{ text }}</slot>
    </base-a>
  </li>
</template>

<script>
import util from "@/components/util/index.js";

import BaseA from "@/components/base/Content/A/c-a.vue";

export default {
  name: "b-nav-item",
  components: { BaseA },
  inheritAttrs: false,
  props: {
    href: {
      ...util.props.href,
      default: "#"
    },
    text: util.props.text,
    active: util.props.active,
    disabled: util.props.disabled
  },
  computed: {
    objClass: function() {
      let c = " ";
      c += this.active ? " active " : " ";
      c += this.disabled ? " disabled " : " ";
      return c;
    }
  }
};
</script>
