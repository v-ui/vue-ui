<template>
  <div class="w-100">
    <b-nav
      v-for="(item, index) in list"
      :key="index"
      :column="column"
      v-bind="$attrs"
    >
      <b-nav-item
        class="w-100"
        :href="item.href"
        :label="item.label"
      />
      <li
        v-if="item.children && item.children.length && item.children.length > 0"
        class="nav-item w-100"
      >
        <b-scrollspy-nav-item
          class="ps-2"
          :list="item.children"
        />
      </li>
    </b-nav>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BNav from "@/components/base/Navigation/Nav/b-nav.vue";
import BNavItem from "@/components/base/Navigation/Nav/b-nav-item.vue";

export default {
  name: "BScrollspyNavItem",
  components: {
    BScrollspyNavItem: () => import("./b-scrollspy-nav-item"),
    BNav,
    BNavItem
  },
  props: {
    column: util.props.Boolean,
    list: util.props.Array
  },
};
</script>

<style>
.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
