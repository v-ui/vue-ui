<template>
  <base-a
    :href="href"
    class="alert-link"
  >
    <slot />
  </base-a>
</template>
<script>
import util from "@/components/util/index.js";

import BaseA from "@/components/base/Content/A/c-a.vue";
export default {
  name: "BAlertLink",
  components: { BaseA },
  props: {
    href: {
      ...util.props.href,
      default: '#',
    },
  }
};
</script>
