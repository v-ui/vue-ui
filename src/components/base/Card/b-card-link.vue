<template>
  <base-a
    :href="href"
    class="card-link"
  >
    <slot>{{ text }}</slot>
  </base-a>
</template>
<script>
import util from "@/components/util/index.js";

import BaseA from "@/components/basic/A/c-a.vue";

export default {
  name: "BCardLink",
  components: { BaseA },
  props: {
    href: {
      ...util.props.href,
      default: "#"
    },
    text: util.props.String
  }
};
</script>
