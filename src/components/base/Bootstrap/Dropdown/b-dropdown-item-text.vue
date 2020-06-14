<template>
  <span class="dropdown-item-text">
    <slot>{{ text }}</slot>
    <b-info :info="info" />
  </span>
</template>
<script>
import util from "@/components/util/index.js";

import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-dropdown-item-text",
  components: { BInfo },
  props: {
    text: util.props.String,
    info: util.props.String
  }
};
</script>
