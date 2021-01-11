<template>
  <span class="dropdown-item-text">
    <slot>
      {{ text }}
      <b-info :info="info" />
    </slot>
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
