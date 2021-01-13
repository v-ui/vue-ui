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
    <slot>
      <b-icon :icon="icon" />
      <span class="d-inline-block pl-1 text-truncate">{{ label }}</span>
      <b-info
        :info="info"
        :text-color="active ? 'light' : 'muted'"
      />
    </slot>
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
    <slot>
      <b-icon :icon="icon" />
      <span class="d-inline-block pl-1 text-truncate">{{ label }}</span>
      <b-info
        :info="info"
        :text-color="active ? 'light' : 'muted'"
      />
    </slot>
  </button>
</template>

<script>
import util from "@/components/util/index.js";

import BaseA from "@/components/basic/A/basic-a.vue";
import BIcon from '@/components/basic/basic-icon.vue'
import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BDropdownItem",
  components: { BaseA, BIcon, BInfo },
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
