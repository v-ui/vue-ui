<template>
  <base-a
    v-if="href"
    class="dropdown-item px-2"
    :class="{active: active,}"
    :aria-selected="active"
    :disabled="disabled"
    :href="href"
    hide-icon
  >
    <slot>
      <b-label
        :icon="icon"
        :info="info"
        :label="label"
        :info-color="active ? 'light' : 'muted'"
      />
    </slot>
  </base-a>
  <button
    v-else
    class="dropdown-item px-2"
    :class="{active: active,}"
    :aria-selected="active"
    :disabled="disabled"
    :aria-disabled="disabled"
    type="button"
  >
    <slot>
      <b-label
        :icon="icon"
        :info="info"
        :label="label"
        :info-color="active ? 'light' : 'muted'"
      />
    </slot>
  </button>
</template>

<script>
import util from "@/components/util/index.js";

import BaseA from "@/components/basic/A/basic-a.vue";
import BLabel from '@/components/basic/basic-label.vue'

export default {
  name: "BDropdownItem",
  components: { BaseA, BLabel },
  props: {
    href: util.props.href,
    label: util.props.String,
    icon: util.props.String,
    info: util.props.String,
    active: util.props.Boolean,
    disabled: util.props.Boolean,
  }
};
</script>
