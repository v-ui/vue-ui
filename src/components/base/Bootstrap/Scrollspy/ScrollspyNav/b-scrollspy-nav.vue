<template>
  <div class="bg-light overflow-auto rounded p-0">
    <b-navbar
      v-if="set == 'top'"
      class="navbar-expand-lg navbar-light"
      :brand="brand"
      :list="list"
    />
    <b-navbar v-else class="navbar-light bg-light" :brand="brand" hideToggler>
      <b-scrollspy-nav-item :list="list" column />
    </b-navbar>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BNavbar from "@/components/base/Bootstrap/Navigation/Navbar/b-navbar.vue";

export default {
  name: "b-scrollspy-nav",
  components: {
    BScrollspyNavItem: () => import("./b-scrollspy-nav-item"),
    BNavbar
  },
  props: {
    column: Boolean,
    list: util.props.list,
    brand: {
      ...util.props.value,
      default: "Contents"
    },
    set: {
      type: String,
      default: "top",
      validator: function(val) {
        return ["top", "left", "right"].includes(val);
      }
    }
  }
};
</script>
