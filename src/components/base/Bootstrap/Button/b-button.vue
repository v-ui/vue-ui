<template>
  <base-a
    v-if="target == 'a'"
    class="btn"
    :class="objClass"
    :href="href"
    :name="fillName"
    :aria-pressed="active"
    :disabled="disabled"
    :aria-disabled="disabled"
    :tabindex="objTabindex"
    :autocomplete="autocomplete"
    data-toggle="button"
    role="button"
    @v-on="$listeners"
  >
    <slot>{{ value }}</slot>
    <sr-msg>{{ fillsrMsg }}</sr-msg>
  </base-a>
  <input
    v-else-if="target == 'input'"
    class="btn"
    :class="objClass"
    :type="type"
    :value="value"
    :name="fillName"
    :aria-pressed="active"
    :disabled="disabled"
    :aria-disabled="disabled"
    :tabindex="objTabindex"
    :autocomplete="autocomplete"
    v-on="$listeners"
  >
  <button
    v-else
    class="btn"
    :class="objClass"
    :type="type"
    :name="fillName"
    :aria-pressed="active"
    :disabled="disabled"
    :aria-disabled="disabled"
    :tabindex="objTabindex"
    :autocomplete="autocomplete"
    v-on="$listeners"
  >
    <slot>{{ value }}</slot>
    <sr-msg>{{ fillsrMsg }}</sr-msg>
  </button>
</template>
<script>
import util from "@/components/util/index.js";

import srMsg from "@/components/Basic/basic-sr-msg.vue";
import BaseA from "@/components/base/Content/A/c-a.vue";

export default {
  name: "b-button",
  components: { BaseA, srMsg },
  props: {
    color: util.props.color,
    href: util.props.href,
    size: util.props.size,
    name: util.props.String,
    active: util.props.Boolean,
    disabled: util.props.Boolean,
    srMsg: util.props.String,
    outline: util.props.Boolean,
    target: {
      type: String,
      default: "button",
      validator: value => ["button", "a", "input"].includes(value)
    },
    type: {
      type: String,
      default: "button",
      validator: value => ["button", "reset", "submit"].includes(value)
    },
    value: {
      ...util.props.String,
      default: ''
    },
    block: util.props.Boolean,
    tabindex: util.props.Int,
    autocomplete: {
      type: String,
      default: "off"
    }
  },
  computed: {
    objClass: function() {
      return `btn-${this.outline ? "outline-" : ""}${this.color}
                ${this.size ? `btn-${this.size}` : ""}
                ${this.block ? "btn-block" : ""}
                ${this.active ? "active" : ""}`;
    },
    objTabindex: function() {
      return this.disabled ? -1 : this.tabindex;
    },
    fillName: function() {
      return this.name || this.type;
    },
    fillsrMsg: function() {
      if (this.srMsg) {
        return this.variant;
      }
      return this.srMsg;
    }
  }
};
</script>
