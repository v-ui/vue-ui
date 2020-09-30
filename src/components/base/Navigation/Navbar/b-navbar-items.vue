<template>
  <div class="collapse navbar-collapse">
    <b-nav
      class="navbar-nav"
      :list="list"
    />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BNav from "@/components/base/Navigation/Nav/b-nav.vue";
export default {
  name: "BNavbarItems",
  components: { BNav },
  props: {
    list: util.props.Array,
  }
};
</script>
