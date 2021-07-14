<template>
  <div :class="dropClass">
    <div
      :id="id"
      class="d-flex justify-content-between align-items-center px-1"
      :class="{'dropdown-toggle' : !$slots.icon, 'dropdown-toggle-split': toggleSplit}"
      data-bs-toggle="dropdown"
      :data-bs-offset="offset"
      :data-bs-auto-close="autoClose"
      aria-haspopup="true"
      aria-expanded="false"
      @click="click"
    >
      <span v-if="toggleSplit" class="visually-hidden">Toggle Dropdown</span>
      <slot v-else name="trigger">
        <font style="cursor: default;">
          {{ trigger || nullValue }}
        </font>
      </slot>
      <slot name="icon" />
    </div>
    <div
      ref="menu"
      class="dropdown-menu overflow-auto shadow-sm"
      :class="menuClass"
      :style="{'max-height': menuHeight}"
      :aria-labelledby="id"
    >
      <slot>
        <b-dropdown-menu
          v-model="selectedValue"
          :list="list"
          :disabled="disabled"
          :primary-key="key"
          :display-name="display"
          :hide-null="hideNull"
          @item:click="item => $emit('item:click', item)"
        />
      </slot>
    </div>
  </div>
</template>
<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import BDropdownMenu from "./b-dropdown-menu";

export default {
  name: "BDropdown",
  components: { BDropdownMenu },
  mixins: [ util.mixins.select.select, ],
  props: {
    list: util.props.Array,
    set: util.props.set,
    trigger: util.props.String,
    hideNull: util.props.Boolean,
    offset: [String, Number],
    autoClose: {
      ...util.props.String,
      default: 'true',
      validator: value => [ 'true', 'false', 'inside', 'outside' ].includes(value)
    },
    scroll: util.props.UInt,
    menuAlign: util.props.setX,
    menWidth: util.props.Boolean,
    menuThem: util.props.themes,
    menuHeight: util.props.String,
    toggleSplit: util.props.Boolean,
    disabled: util.props.Boolean,
    id: {
      type: String,
      default: "dropdown-" + tools.random.getRandomString()
    },
  },
  computed: {
    dropClass: function() {
      return "drop" + this.set;
    },
    menuClass: function() {
      let align = this.menuAlign ? `dropdown-menu-${this.menuAlign}` : ""
      let theme = this.menuThem ? `dropdown-menu-${this.menuThem}` : ""
      let width = this.menuWidth ? "w-100" : ""
      return `${align} ${width} ${theme}`;
    }
  },
  methods: {
    click: function() {
      let { $refs, scroll } = this;
      // 使用延时以等待 menu 显示后设置 scrollTop ,否则无效
      setTimeout(() => ($refs.menu.scrollTop = scroll), 100);
    }
  }
};
</script>
