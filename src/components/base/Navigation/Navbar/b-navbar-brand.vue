<template>
  <a
    class="navbar-brand"
    :href="href"
  >
    <slot>{{ brand }}</slot>
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
