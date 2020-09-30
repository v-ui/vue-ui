<template>
  <div class="rounded p-0">
    <b-navbar
      v-if="set == 'top'"
      class="navbar-expand-lg"
      :brand="brand"
      :list="list"
    />
    <b-navbar
      v-else
      :brand="brand"
      hide-toggler
    >
      <b-scrollspy-nav-item
        :list="list"
        column
      />
    </b-navbar>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BNavbar from "@/components/base/Navigation/Navbar/b-navbar.vue";

export default {
  name: "BScrollspyNav",
  components: {
    BScrollspyNavItem: () => import("./b-scrollspy-nav-item"),
    BNavbar
  },
  props: {
    column: util.props.Boolean,
    list: util.props.Array,
    brand: {
      ...util.props.String,
      default: "Contents"
    },
    set: {
      type: String,
      default: "top",
      validator: value => ["top", "left", "right"].includes(value),
    }
  }
};
</script>
