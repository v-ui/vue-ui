<template>
  <base-a :href="href" class="card-link">
    <slot>{{ text }}</slot>
  </base-a>
</template>
<script>
import util from "@/components/util/index.js";

import BaseA from "@/components/base/Content/A/c-a.vue";

export default {
  name: "b-card-link",
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
