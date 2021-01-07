<template>
  <span class="dropdown-item-text">
    <slot>{{ text }}</slot>
    <b-info :info="info" />
  </span>
</template>
<script>
import util from "@/components/util/index.js";

import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BDropdownText",
  components: { BInfo },
  props: {
    text: util.props.String,
    info: util.props.String
  }
};
</script>
