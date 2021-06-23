<template>
  <base-a
    v-if="href"
    class="list-group-item list-group-item-action"
    hide-icon
    :href="href"
    :class="objClass"
    :disabled="disabled"
  >
    <div class="d-flex align-items-center">
      <slot>{{ label }}</slot>
      <basic-icon
        v-if="drop"
        class="ms-auto h5 handle"
        icon="list"
        style="cursor: move"
      />
    </div>
    <sr-msg>{{ srMsg || color }}</sr-msg>
  </base-a>
  <li
    v-else
    class="list-group-item text-truncate"
    :class="objClass"
    :aria-disabled="disabled"
  >
    <div class="d-flex align-items-center">
      <slot>{{ label }}</slot>
      <base-icon
        v-if="drop && !hideHanlder"
        class="ms-auto h5 handle m-0"
        icon="list"
        style="cursor: move"
      />
    </div>
    <sr-msg>{{ srMsg }}</sr-msg>
  </li>
</template>

<script>
import util from "@/components/util/index.js";

import BaseA from "@/components/basic/A/basic-a.vue";
import BaseIcon from '@/components/basic/basic-icon.vue'
import srMsg from "@/components/basic/basic-sr-msg.vue";

export default {
  name: "BListItem",
  components: { BaseA, BaseIcon, srMsg },
  props: {
    href: util.props.href,
    label: util.props.String,
    color: {
      ...util.props.color,
      default: "white"
    },
    drop: util.props.Boolean,
    hideHanlder: util.props.Boolean,
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
    },
    iconStyle: function() {
      return this.disabled ? '' : 'cursor: move'
    },
  }
};
</script>

