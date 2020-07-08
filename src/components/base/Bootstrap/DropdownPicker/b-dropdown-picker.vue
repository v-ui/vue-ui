<template>
  <div :id="id" class="px-1 align-items-center">
    <div ref="dropdownpicker" :readonly="disabled" @click="isShow = disabled ? !disabled : !isShow">
      <div class="d-flex justify-content-between align-items-center" @click="click">
        <slot name="trigger">
          <font :class="fontClass">{{ label || placeholder }}</font>
        </slot>
        <slot name="icon" v-if="!hideToggle">
          <i :class="icon.caretDown" />
        </slot>
      </div>
    </div>
    <tran-drop>
      <div
        v-show="isShow"
        ref="menu"
        class="position-absolute bg-white overflow-auto border rounded shadow-sm my-1 p-1"
        :style="[menuStyle, {'max-height': menuHeight}]"
        style=" z-index: 1000;"
      >
        <slot />
      </div>
    </tran-drop>
  </div>
</template>

<script>
import tools from "@/tools/index.js"
import config from "@/config/index.js"
import util from "@/components/util/index.js"

import tranDrop from "@/components/transition/tran-drop.vue"

export default {
  name: "b-dropdown-picker",
  components: { tranDrop, },
  props: {
    id: {
      type: String,
      default: function() {
        return "drop-picker-" + tools.random.getRandomString();
      }
    },
    placeholder: util.props.String,
    show: util.props.Boolean,
    disabled: util.props.Boolean,
    hideToggle: util.props.Boolean,
    menuWidth: util.props.Boolean,
    menuHeight: util.props.String,
    scroll: util.props.Uint,
    label: [String, Number, Date]
  },
  data() {
    return {
      isShow: this.show,
      menuStyle: ""
    };
  },
  computed: {
    icon: function() {
      return config.ui.icon;
    },
    fontClass: function() {
      return this.label ? "" : "text-muted";
    }
  },
  watch: {
    isShow: function(newValue) {
      newValue
        ? document.addEventListener("mousedown", this.hindeMenu)
        : document.removeEventListener("mousedown", this.hindeMenu)
      this.$emit("showOrHide", newValue);
    },
    show: function(value) {
      this.isShow = value;
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init: function() {
      this.initMenuWidth()
    },
    initMenuWidth: function() {
       this.menuStyle = this.menuWidth && {
        width: `${this.$refs.dropdownpicker.offsetWidth}px`
      };
    },
    hindeMenu: function(event) {
      const e = event.target;
      // 判断鼠标点击位置是否在菜单内，如果是则不隐藏，如果不是则隐藏
      let isIn = tools.dom.isElementIm(this.$refs.menu, e)
      if (!isIn) this.isShow = false
    },
    click: function() {
      let { $refs, scroll } = this;
      // 使用延时以等待 menu 显示后设置 scrollTop ,否则无效
      setTimeout(() => ($refs.menu.scrollTop = scroll), 100);
    }
  },
};
</script>
