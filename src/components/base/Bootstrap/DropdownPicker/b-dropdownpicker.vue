<template>
  <div :id="id">
    <div ref="dropdownpicker" :readonly="disabled" @click="isShow = disabled ? !disabled : !isShow">
      <div class="d-flex justify-content-between align-items-center" @click="click">
        <slot name="trigger">
          <font :class="fontClass">{{ text }}</font>
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
        :style="[menuStyle, {'max-height': this.menuHeight}]"
        style=" z-index: 1000;"
      >
        <slot />
        <footer v-show="showFooter" class="text-right">
          <hr>
          <base-button
            outline
            value="确 定"
            :disabled="disabled || !canHide"
            @click.stop="isShow = false"
          />
        </footer>
      </div>
    </tran-drop>
    <b-info :info="info" />
  </div>
</template>

<script>
import tools from "@/tools/index.js";
import config from "@/config/index.js";
import util from "@/components/util/index.js";

import tranDrop from "@/components/transition/tran-drop.vue";
import BaseButton from "@/components/base/Bootstrap/Button/b-button.vue";

import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-dropdownpicker",
  components: { tranDrop, BaseButton, BInfo },
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
    showFooter: util.props.Boolean,
    menuWidth: util.props.Boolean,
    menuHeight: util.props.String,
    canHide: {
      ...util.props.Boolean,
      default: true
    },
    scroll: util.props.Uint,
    info: util.props.String,
    value: [String, Number, Date]
  },
  data() {
    return {
      isShow: false,
      menuStyle: ""
    };
  },
  computed: {
    icon: function() {
      return config.ui.icon;
    },
    text: function() {
      return this.value ? this.value : this.placeholder;
    },
    fontClass: function() {
      return this.value ? "" : "text-muted";
    }
  },
  mounted() {
    this.menuStyle = this.menuWidth && {
      width: `${this.$refs.dropdownpicker.offsetWidth}px`
    };
  },
  methods: {
    hindeMenu: function(event) {
      const e = event.target;
      // 判断鼠标点击位置是否在菜单内，如果是则不隐藏，如果不是则隐藏
      this.isChild(e, this.id);
    },
    isChild: function(e, id) {
      if (this.disabled) return;
      if (
        !(e || e.nodeName) ||
        ["#document", "HTML", "BODY"].includes(e.nodeName)
      )
        return this.canHide ? (this.isShow = false) : null;
      e = e.parentNode;
      if (e.id && e.id == id) return;
      this.isChild(e, id);
    },
    click: function() {
      let { $refs, scroll } = this;
      // 使用延时以等待 menu 显示后设置 scrollTop ,否则无效
      setTimeout(() => ($refs.menu.scrollTop = scroll), 100);
    }
  },
  watch: {
    isShow: function(newValue) {
      newValue
        ? document.addEventListener("mousedown", this.hindeMenu)
        : this.canHide
        ? document.removeEventListener("mousedown", this.hindeMenu)
        : null;
      this.$emit("showOrHide", newValue);
    },
    show: function(value) {
      this.isShow = value;
    }
  }
};
</script>
