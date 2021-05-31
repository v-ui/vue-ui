<template>
  <ul
    class="nav"
    :class="objClass"
  >
    <slot />
    <template v-for="(item, index) in list">
      <nav-item-dropdown
        v-if="item.dropdown"
        :key="index"
        :list="item.list"
        :label="getDisplay(item)"
      />
      <nav-item
        v-else
        :key="index"
        :label="getDisplay(item)"
        :href="item.href"
        :disabled="item.disabled"
        :active="isSelected(item) || item.active"
        @item:click="selectedValue = item"
      />
    </template>
  </ul>
</template>

<script>
import util from "@/components/util/index.js";

import NavItem from "./b-nav-item";
import NavItemDropdown from "./b-nav-item-dropdown";

export default {
  name: "BNav",
  components: { NavItem, NavItemDropdown },
  mixins: [ util.mixins.select.check, ],
  props: {
    set: util.props.justify,
    column: util.props.Boolean,
    tabs: util.props.Boolean,
    pills: util.props.Boolean,
    fill: util.props.Boolean,
    justified: util.props.Boolean
  },
  computed: {
    objClass: function() {
      let c = "";
      if (this.set) c += ` justify-content-${this.set} `;
      if (this.column) c += " flex-column ";
      if (this.tabs) c += " nav-tabs ";
      if (this.pills) c += " nav-pills ";
      if (this.fill) c += " nav-fill ";
      if (this.justified) c += " nav-justified ";
      return c;
    }
  },
};
</script>
