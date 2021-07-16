<template>
  <base-a
    v-if="href"
    class="list-group-item list-group-item-action"
    hide-icon
    :href="href"
    :class="objClass"
    :aria-current="active"
    :disabled="disabled"
  >
    <div class="d-flex" :class="numbered ? 'align-items-start' : 'align-items-center'">
      <span v-if="numbered" class="me-1">{{ index }}.</span>
      <slot>
        <base-label
          :icon="icon"
          :info="info"
          :label="label"
        />
      </slot>
    </div>
  </base-a>
  <li
    v-else
    class="list-group-item text-truncate"
    :class="objClass"
    :aria-current="active"
    :aria-disabled="disabled"
  >
    <div class="d-flex" :class="numbered ? 'align-items-start' : 'align-items-center'">
      <span v-if="numbered" class="me-1">{{ index }}.</span>
      <slot>
        <base-label
          :icon="icon"
          :info="info"
          :label="label"
        />
      </slot>
    </div>
  </li>
</template>

<script>
import util from "@/components/util/index.js";

import BaseA from "@/components/basic/A/basic-a.vue";
import BaseLabel from "@/components/basic/basic-label.vue"
export default {
  name: "BListItem",
  components: { BaseA, BaseLabel, },
  props: {
    href: util.props.href,
    icon: util.props.String,
    info: util.props.String,
    label: util.props.String,
    color: {
      ...util.props.color,
      default: "white"
    },
    index: util.props.UInt,
    numbered: util.props.Boolean,
    active: util.props.Boolean,
    disabled: util.props.Boolean,
  },
  computed: {
    objClass: function() {
      let color = this.color ? ` list-group-item-${this.color} ` : " ";
      let active = this.active ? "active " : " ";
      let disabled = this.disabled ? 'disabled' : ''
      return `${color} ${active} ${disabled}`
    },
  }
};
</script>

