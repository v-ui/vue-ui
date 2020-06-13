<template>
  <base-a
    v-if="href"
    class="list-group-item list-group-item-action"
    hide-icon
    :href="href"
    :class="objClass"
    :disabled="disabled"
  >
    <slot>{{ text }}</slot>
    <sr-msg>{{ srMsg || color }}</sr-msg>
  </base-a>
  <li v-else class="list-group-item text-truncate" :class="objClass" :aria-disabled="disabled">
    <slot>{{ text }}</slot>
    <sr-msg>{{ srMsg }}</sr-msg>
  </li>
</template>

<script>
import util from "@/components/util/index.js";

import BaseA from "@/components/base/Content/A/c-a.vue";
import srMsg from "@/components/Basic/basic-sr-msg.vue";

export default {
  name: "b-list-item",
  components: { BaseA, srMsg },
  props: {
    href: util.props.href,
    text: util.props.String,
    color: {
      ...util.props.color,
      default: "white"
    },
    active: util.props.Boolean,
    disabled: util.props.Boolean,
    srMsg: util.props.String
  },
  computed: {
    objClass: function() {
      let c = " ";
      c += this.color ? ` list-group-item-${this.color} ` : " ";
      c += this.active ? " active " : " ";
      return c;
    }
  }
};
</script>

