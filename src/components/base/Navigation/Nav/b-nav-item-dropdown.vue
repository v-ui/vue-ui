<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      data-toggle="dropdown"
      role="button"
      aria-haspopup="true"
      aria-expanded="false"
    >{{ label }}</a>
    <div class="dropdown-menu">
      <b-dropdown-menu hide-null :list="list" />
    </div>
  </li>
</template>

<script>
import util from "@/components/util/index.js";

import BDropdownMenu from "@/components/base/Dropdown/b-dropdown-menu.vue";

export default {
  name: "BNavItemDropdown",
  components: { BDropdownMenu },
  props: {
    list: util.props.Array,
    label: util.props.String
  }
}
</script>
