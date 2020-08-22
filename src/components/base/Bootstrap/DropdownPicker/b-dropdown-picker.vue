<template>
  <div :id="id" class="align-items-center h-auto px-0" :class="{'bg-light': disabled}" style="min-width: 320px" :disabled="disabled" :aria-disabled="disabled">
    <div ref="dropdownPicker" class="h-100" @click="clickTrigger">
      <div ref="dropdownTrigger" class="d-flex justify-content-between align-items-center h-100 px-1">
        <slot name="trigger">
          <font v-if="!multiple" :class="fontClass">{{ label || placeholder }}</font>
          <div v-else class="d-flex align-content-between flex-wrap">
            <b-badge v-for="(item, key) in label" :key="key" class="m-1" color="primary">
              {{ item }}
              <i v-if="!disabled" class="fas fa-times-circle text-muted pl-1" style="cursor: pointer" @click.stop="$emit('deleteItem', key)"/>
            </b-badge>
            <label v-show="!label || label.length === 0" class="m-0">{{ placeholder }}</label>
          </div>
        </slot>
        <slot name="icon" v-if="!hideToggle">
          <i :class="icon.caretDown" />
        </slot>
      </div>
    </div>
    <tran-drop>
      <div
        v-show="isShow"
        ref="dropdownMenu"
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

import BBadge from '@/components/base/Bootstrap/Badge/b-badge.vue'
import tranDrop from "@/components/transition/tran-drop.vue"

export default {
  name: "b-dropdown-picker",
  components: { BBadge, tranDrop, },
  props: {
    id: {
      type: String,
      default: function() {
        return "drop-picker-" + tools.random.getRandomString();
      }
    },
    placeholder: util.props.String,
    show: util.props.Boolean,
    canHide: {
      ...util.props.Boolean,
      default: true,
    },
    multiple: util.props.Boolean,
    disabled: util.props.Boolean,
    hideToggle: util.props.Boolean,
    menuWidth: util.props.Boolean,
    menuHeight: util.props.String,
    label: [ Array, String, Number, Object, Date, ],
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
    isShow: function(value) {
      value
        ? document.addEventListener("mousedown", this.hindeMenu)
        : document.removeEventListener("mousedown", this.hindeMenu)
    },
    show: function(value) {
      this.isShow = value;
    },
  },
  mounted() {
    this.init()
  },
  destroyed() {
    document.removeEventListener("mousedown", this.hindeMenu)
  },
  methods: {
    init: function() {
      this.initMenuWidth()
    },
    initMenuWidth: function() {
       this.menuStyle = this.menuWidth && {
        width: `${this.$refs.dropdownPicker.offsetWidth}px`
      };
    },
    clickTrigger: function() {
      if (this.disabled) return
      this.isShow = !this.isShow
    },
    hindeMenu: async function(event) {
      // 判断鼠标点击位置是否在菜单内，如果是则不隐藏，如果不是则隐藏
      if (tools.dom.isElementIm(this.$refs.dropdownTrigger, event.target)) return
      // if (this.canHide) {
      //   this.isShow = !this.isShow
      //   return
      // }
      this.isShow = this.canHide ? tools.dom.isElementIm(this.$refs.dropdownMenu, event.target) : true
    },
  },
};
</script>
