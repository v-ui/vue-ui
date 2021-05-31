<template>
  <span class="dropdown-item-text px-2">
    <slot>
      <b-label
        :label="text"
        :info="info"
        :icon="icon"
      />
    </slot>
  </span>
</template>
<script>
import util from "@/components/util/index.js";

import BLabel from '@/components/basic/basic-label.vue'

export default {
  name: "BDropdownText",
  components: { BLabel },
  props: {
    text: util.props.String,
    icon: util.props.String,
    info: util.props.String
  }
};
</script>
