<template>
  <div class="py-0" :class="dropClass" ref="divDropdown">
    <div
      :id="guid"
      class="d-flex justify-content-between align-items-center px-1"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      @click="click"
    >
      <slot name="trigger">
        <font style="cursor: default;">{{ trigger }}</font>
      </slot>
      <slot name="icon" v-if="!hideToggle">
        <i :class="icon.caretDown" class="px-1" />
      </slot>
    </div>
    <div
      ref="menu"
      class="dropdown-menu overflow-auto shadow-sm"
      :class="menuClass"
      :style="{'max-height': menuHeight}"
      :aria-labelledby="guid"
    >
      <slot>
        <drop-menu
          :list="list"
          :select="select"
          :disabled="disabled"
          @click="item => $emit('menuClick', item)"
        />
      </slot>
    </div>
  </div>
</template>
<script>
import tools from "@/tools/index.js";
import config from "@/config/index.js";
import util from "@/components/util/index.js";

import DropMenu from "./b-dropdown-menu";

export default {
  name: "b-dropdown",
  components: { DropMenu },
  props: {
    list: util.props.Array,
    select: util.props.String,
    disabled: util.props.Boolean,
    set: util.props.set,
    trigger: {
      ...util.props.String,
      default: "<Pleace select...>"
    },
    hideToggle: util.props.Boolean,
    menuAlign: {
      type: String,
      default: "",
      validator: value => ["", "left", "right"].includes(value)
    },
    menWidth: util.props.Boolean,
    menuHeight: util.props.String,
    scroll: util.props.UInt
  },
  data() {
    return {
      menuStyle: 0
    };
  },
  computed: {
    guid: function() {
      return "dropdown-" + tools.random.getRandomString();
    },
    icon: function() {
      return config.ui.icon;
    },
    dropClass: function() {
      return this.set == "up" ? "drop" : "drop" + this.set;
    },
    menuClass: function() {
      return `${this.menuAlign ? `dropdown-menu-${this.menuAlign}` : ""}
                    ${this.menuWidth ? "w-100" : ""} `;
    }
  },
  mounted() {
    const el = this.$refs.divDropdown;
    if (!el) return;
    let node = el;
    if (!node) return;
    tools.dom.addAttrs(node, {
      id: this.guid,
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false"
    });
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
