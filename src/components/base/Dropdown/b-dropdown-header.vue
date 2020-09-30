<template>
  <h6 class="dropdown-header mb-0">
    <slot>{{ label }}</slot>
    <b-info :info="info" />
  </h6>
</template>
<script>
import util from "@/components/util/index.js";

import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BDropdownHeader",
  components: { BInfo },
  props: {
    label: util.props.String,
    info: util.props.String,
  }
};
</script>
