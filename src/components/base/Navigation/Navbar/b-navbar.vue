<template>
  <nav class="navbar">
    <b-nav-brand
      v-if="$slots.brand || brand"
      :brand="brand"
    >
      <slot name="brand" />
    </b-nav-brand>
    <b-nav-toggler
      v-if="$slots.toggler || !hideToggler"
      :target="id"
    >
      <slot name="toggler" />
    </b-nav-toggler>
    <slot>
      <b-navbar-items
        :id="id"
        :list="list"
      />
    </slot>
  </nav>
</template>

<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import BNavBrand from "./b-navbar-brand";
import BNavToggler from "./b-navbar-toggler";
import BNavbarItems from "./b-navbar-items";

export default {
  name: "BNavbar",
  components: { BNavBrand, BNavToggler, BNavbarItems },
  props: {
    list: util.props.Array,
    brand: util.props.String,
    href: util.props.href,
    hideToggler: util.props.Boolean,
  },
  data() {
    return {
      id: "Navbar-" + tools.random.getRandomString()
    };
  },
};
</script>
