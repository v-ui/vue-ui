<template>
  <div class="form-group">
    <dropdown-picker
      ref="dropdownlist"
      class="form-control p-0"
      :class="[objClass, readonlyClass]"
      menu-width
      :show="show"
      :value="trigger"
      :scroll="scroll"
      :disabled="disabled"
      :menu-height="menuHeight"
      @showOrHide="showOrHide"
    >
      <b-text
        v-if="search"
        v-model="searchText"
        hide-icon
        class="m-1"
        type="search"
        :border="false"
      />
      <drop-item
        v-if="!searchText && !hideNull"
        ref="item"
        value
        :disabled="disabled"
        text="<Pleace select...>"
        @click.native="menuClick"
      />
      <drop-item
        v-for="item in searchList"
        :key="item.value"
        :info="item.info"
        :text="item.value"
        :value="item.value"
        :active="item.value == selectValue"
        :disabled="item.disabled || disabled"
        @click.native="menuClick(item)"
      />
    </dropdown-picker>
    <b-valid v-if="validInfo || $slots.valid" state="valid">
      <slot name="valid">{{ validInfo }}</slot>
    </b-valid>
    <b-valid v-if="invalidInfo || $slots.invalid" state="invalid">
      <slot name="invalid">{{ invalidInfo }}</slot>
    </b-valid>
    <b-info :info="info" />
  </div>
</template>

<script>
import tool from "@/tool/index.js";
import util from "@/components/util/index.js";

import dropdownPicker from "@/components/base/Bootstrap/DropdownPicker/b-dropdownpicker.vue";
import dropItem from "@/components/base/Bootstrap/Dropdown/b-dropdown-item.vue";
import BText from "@/components/base/Bootstrap/Form/b-text.vue";

import BValid from "@/components/base/Bootstrap/Form/Other/b-form-valid.vue";
import BInfo from "@/components/base/Bootstrap/Form/Other/b-form-info.vue";

export default {
  name: "b-dropdownlist",
  components: { dropdownPicker, dropItem, BText, BValid, BInfo },
  mixins: [
    util.mixins.form.base,
    util.mixins.form.readonly,
    util.mixins.form.validator
  ],
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    list: util.props.list,
    value: util.props.value,
    info: util.props.value,
    search: Boolean,
    hideNull: Boolean,
    row: {
      type: [String, Number],
      default: 10,
      validator: val => !isNaN(val) && Number(val) > 0
    }
  },
  data() {
    return {
      show: null,
      scroll: 0,
      searchText: null,
      menuHeight: "0px",
      selectValue: this.value,
      trigger: "<Pleace select...>"
    };
  },
  computed: {
    searchList: function() {
      return this.searchText
        ? this.list.filter(
            e =>
              e.value &&
              (e.value.includes(this.searchText) ||
                e.text.includes(this.searchText))
          )
        : this.list;
    }
  },
  mounted: function() {
    this.menuHeight = this.row * 32 + 10 + "px";
    this.getScroll();
    this.setTrigger(this.value);
  },
  methods: {
    setTrigger: function(value) {
      if (this.list && this.list.length && this.list.find) {
        let obj = this.list.find(function(e) {
          if (e.value == value) return e;
        });
        this.trigger = obj && obj.text ? obj.text : "<Pleace select...>";
      } else {
        this.trigger = "<Pleace select...>";
      }
    },
    menuClick: function(item) {
      this.getScroll();
      this.selectValue = item.value;
      this.setTrigger(this.selectValue);
      this.$emit("change", this.selectValue);
      this.validator(this.selectValue);
      this.searchText = null; // 清空查询字段
      this.show = false;
    },
    showOrHide: function(value) {
      this.show = value;
    },
    getScroll: async function() {
      await this.$nextTick();
      let index = 0;
      const less = Number(this.row) / 2;
      this.$el.firstChild.children[1].childNodes.forEach(function(node, i) {
        if (
          (node.className || node.classList) &&
          tool.dom.hasClass(node, "active")
        )
          index = i < less ? 0 : i;
      });
      this.scroll = (index - less) * 32 + 10;
    },
    validator: function(value) {
      if (this.disabled) return; // disabled 时不校验
      let e = this.$refs.dropdownlist.$el;
      tool.dom.removeClass(e, "is-valid"); // 移除可能的 is-valid
      // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
      if (!this.validateRequired(value)) {
        tool.dom.addClass(e, "is-invalid");
        return;
      }
      tool.dom.removeClass(e, "is-invalid"); // 移除可能的 is-invalid
      // 当存在 valid slot 或 validInfo 时
      if (this.$slots.valid || this.validInfo) tool.dom.addClass(e, "is-valid");
      this.$emit("valid");
    }
  }
};
</script>

