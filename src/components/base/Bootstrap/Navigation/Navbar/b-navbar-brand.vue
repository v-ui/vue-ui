<template>
  <a class="navbar-brand" :href="href">
    <slot>{{ text }}</slot>
  </a>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "b-navbar-brand",
  props: {
    href: util.props.href,
    text: util.props.String
  }
};
</script>
