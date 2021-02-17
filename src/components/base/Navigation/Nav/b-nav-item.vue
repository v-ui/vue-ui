<template>
  <li class="nav-item" @click="click">
    <base-a
      class="nav-link text-truncate"
      :class="objClass"
      hide-icon
      :href="href"
      :disabled="disabled"
      v-bind="$attrs"
    >
      <slot>{{ label }}</slot>
    </base-a>
  </li>
</template>

<script>
import util from "@/components/util/index.js";

import BaseA from "@/components/basic/A/basic-a.vue";

export default {
  name: "BNavItem",
  components: { BaseA },
  inheritAttrs: false,
  props: {
    href: {
      ...util.props.href,
      default: "#"
    },
    label: util.props.String,
    active: util.props.Boolean,
    disabled: util.props.Boolean
  },
  computed: {
    objClass: function() {
      let c = " ";
      c += this.active ? " active " : " ";
      c += this.disabled ? " disabled " : " ";
      return c;
    }
  },
  methods: {
    click: function() {
      if (this.disabled) return
      this.$emit('item:click')
    },
  },
};
</script>
