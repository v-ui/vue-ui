<template>
  <ul class="nav" :class="objClass">
    <slot v-if="$slots.default" />
    <template v-else v-for="(item, index) in list">
      <nav-item-dropdown v-if="item.dropdown" :key="index" :list="item.list" :text="item.text" />
      <nav-item
        v-else
        :key="index"
        :text="item.text"
        :href="item.href"
        :disabled="item.disabled"
        :active="select ? select == item.text || select == item.value : item.active"
        @click.native="$emit('click', item.value || item.text)"
      />
    </template>
  </ul>
</template>

<script>
import util from "@/components/util/index.js";

import NavItem from "./b-nav-item";
import NavItemDropdown from "./b-nav-item-dropdown";

export default {
  name: "b-nav",
  components: { NavItem, NavItemDropdown },
  model: {
    prop: "select",
    event: "click"
  },
  props: {
    list: util.props.Array,
    select: util.props.String,
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
  }
};
</script>
