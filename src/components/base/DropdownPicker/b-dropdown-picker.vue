<template>
  <div
    :id="id"
    class="align-items-center h-auto px-0"
    :class="{'bg-light': disabled}"
    style="min-width: 150px"
    :disabled="disabled"
    :aria-disabled="disabled"
  >
    <div
      ref="dropdownPicker"
      class="h-100"
      aria-describedby="tooltip"
      @click="clickTrigger"
    >
      <div
        ref="dropdownTrigger"
        class="d-flex justify-content-between align-items-center h-100 px-1"
      >
        <slot name="trigger">
          <div
            v-if="multiple && label.length > 0"
            class="d-flex align-content-between flex-wrap"
          >
            <b-badge
              v-for="(item, key) in label"
              :key="key"
              class="m-1"
              color="primary"
            >
              {{ item }}
              <i
                v-if="!disabled"
                class="fas fa-times-circle text-muted pl-1"
                style="cursor: pointer"
                @click.stop="$emit('delete:item', key)"
              />
            </b-badge>
          </div>
          <font
            v-else
            :class="fontClass"
          >
            {{ label && label.length === 0 && multiple ? placeholder : (label || placeholder) }}
          </font>
        </slot>
        <slot
          v-if="!hideToggle"
          name="icon"
        >
          <i :class="icon.caretDown" />
        </slot>
      </div>
    </div>
    <tran-drop>
      <!-- TODO: edit max-height -->
      <div
        v-show="isShow"
        ref="dropdownMenu"
        class="card overflow-auto rounded shadow-sm"
        :style="[menuStyle, { 'min-width': '15em', 'max-height': '50em'}]"
        style="z-index: 1090"
      >
        <div
          v-if="isShow"
          class="m-0 y-0"
        >
          <slot />
        </div>
      </div>
    </tran-drop>
  </div>
</template>

<script>
import tools from "@/tools/index.js"
import config from "@/config/index.js"
import util from "@/components/util/index.js"

import BBadge from '@/components/base/Badge/b-badge.vue'
import tranDrop from "@/components/transition/tran-drop.vue"

export default {
  name: "BDropdownPicker",
  components: { BBadge, tranDrop, },
  mixins: [ util.mixins.popper.base ],
  props: {
    id: {
      type: String,
      default: function() {
        return "drop-picker-" + tools.random.getRandomString();
      }
    },
    placeholder: {
      ...util.props.String,
      default: '<Place select...>',
    },
    show: util.props.Boolean,
    canHide: {
      ...util.props.Boolean,
      default: true,
    },
    multiple: util.props.Boolean,
    disabled: util.props.Boolean,
    hideToggle: util.props.Boolean,
    menuWidth: util.props.Boolean,
    label: [ Array, String, Number, Object, Date, ],
  },
  data() {
    return {
      menuStyle: "",
      isShow: this.show,
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
      // 初始化 popper
      this.popOpts = { placement: 'bottom-start', strategy: 'fixed', }
      this.popRef = this.$refs.dropdownPicker
      this.popEle = this.$refs.dropdownMenu
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
      // 判断鼠标点击的位置是否在含有 control class 的元素内，是则返回
      let i = 0
      let doms = document.getElementsByClassName('cannt-hide')
      while (doms[i]) {
        if (tools.dom.isElementIm(doms[i], event.target)) return
        i++
      }
      // 判断鼠标点击位置是否在菜单内，如果是则返回
      if (tools.dom.isElementIm(this.$refs.dropdownTrigger, event.target)) return
      // 临时解决方法，如不采用延时会影响 menu 中的事件
      setTimeout(() => {
        if (this.canHide) {
          this.isShow = !this.isShow
          return
        }
        this.isShow = tools.dom.isElementIm(this.$refs.dropdownMenu, event.target)
      }, 200)

    },
  },
};
</script>
