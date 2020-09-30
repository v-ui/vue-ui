<template functional>
  <a
    class="navbar-brand"
    :href="props.href"
  >
    <slot>{{ props.brand }}</slot>
  </a>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "BNavbarBrand",
  props: {
    href: {
      ...util.props.href,
      default: '#',
    },
    brand: util.props.String
  }
};
</script>
