<template>
  <h6 class="dropdown-header mb-0">
    <slot>{{ text }}</slot>
    <b-info :info="info" />
  </h6>
</template>
<script>
import util from "@/components/util/index.js";

import BInfo from "@/components/base/Bootstrap/Form/Other/b-form-info.vue";

export default {
  name: "b-dropdown-header",
  components: { BInfo },
  props: {
    text: util.props.text,
    info: util.props.text
  }
};
</script>
