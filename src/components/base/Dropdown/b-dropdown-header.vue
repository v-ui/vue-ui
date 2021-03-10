<template>
  <h6 class="dropdown-header mb-0">
    <slot>
      <b-label
        :label="label"
        :info="info"
        :icon="icon"
      />
    </slot>
  </h6>
</template>
<script>
import util from "@/components/util/index.js";

import BLabel from '@/components/basic/basic-label.vue'

export default {
  name: "BDropdownHeader",
  components: { BLabel },
  props: {
    label: util.props.String,
    icon: util.props.String,
    info: util.props.String,
  }
};
</script>
