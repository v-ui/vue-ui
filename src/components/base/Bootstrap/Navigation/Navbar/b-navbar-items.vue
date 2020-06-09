<template>
  <div class="collapse navbar-collapse">
    <b-nav class="navbar-nav" :list="list" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BNav from "@/components/base/Bootstrap/Navigation/Nav/b-nav.vue";
export default {
  name: "b-navbar-items",
  components: { BNav },
  props: {
    list: util.props.list
  }
};
</script>
