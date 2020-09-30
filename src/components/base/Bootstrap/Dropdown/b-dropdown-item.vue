<template>
  <base-a
    v-if="href"
    class="dropdown-item"
    :class="{active: active,}"
    :aria-selected="active"
    :disabled="disabled"
    :href="href"
    hide-icon
  >
    <slot>{{ label }}</slot>
    <b-info
      :info="info"
      :text-color="active ? 'light' : 'muted'"
    />
  </base-a>
  <button
    v-else
    class="dropdown-item"
    :class="{active: active,}"
    :aria-selected="active"
    :disabled="disabled"
    :aria-disabled="disabled"
    type="button"
  >
    <slot>{{ label }}</slot>
    <b-info
      :info="info"
      :text-color="active ? 'light' : 'muted'"
    />
  </button>
</template>

<script>
import util from "@/components/util/index.js";

import BaseA from "@/components/base/Content/A/c-a.vue";
import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "BDropdownItem",
  components: { BaseA, BInfo },
  props: {
    href: util.props.href,
    label: util.props.String,
    info: util.props.String,
    active: util.props.Boolean,
    disabled: util.props.Boolean,
  }
};
</script>
