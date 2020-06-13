<template functional>
  <a class="navbar-brand" :href="props.href">
    <slot>{{ props.text }}</slot>
  </a>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "b-navbar-brand",
  props: {
    href: {
      ...util.props.href,
      default: '#',
    },
    text: util.props.String
  }
};
</script>
