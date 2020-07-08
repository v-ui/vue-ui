<template>
  <div class="form-group">
    <b-dropdown-picker
      ref="dropdownlist"
      :class="[readonlyClass]"
      menu-width
      :show="show"
      :label="label"
      :disabled="disabled"
      :menu-height="menuHeight"
      :placeholder="placeholder"
      @showOrHide="showOrHide"
    >
      <b-dropdown-header v-if="search" @click.native="headerClick">
        <b-text v-model="searchText" hide-icon type="search" size="sm" :border="false" />
      </b-dropdown-header>
      <b-dropdown-divider v-if="search" />
      <b-dropdown-item
        v-if="!searchText && !hideNull"
        :label="placeholder"
        :disabled="disabled"
        @click.native="menuClick"
      />
      <b-dropdown-item
        v-for="item in searchList"
        :key="item.value"
        :info="item.info"
        :label="item.label"
        :active="item.value == selectValue"
        :disabled="item.disabled || disabled"
        @click.native="menuClick(item)"
      />
    </b-dropdown-picker>
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
import util from "@/components/util/index.js";

import BDropdownPicker from "@/components/base/Bootstrap/DropdownPicker/b-dropdown-picker.vue";
import BDropdownHeader from "@/components/base/Bootstrap/Dropdown/b-dropdown-header.vue";
import BDropdownDivider from '@/components/base/Bootstrap/Dropdown/b-dropdown-divider.vue'
import BDropdownItem from "@/components/base/Bootstrap/Dropdown/b-dropdown-item.vue";
import BText from "@/components/base/Bootstrap/Form/b-text.vue";

import BValid from "@/components/base/Bootstrap/Form/Other/b-form-valid.vue";
import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-dropdown-list",
  components: {
    BDropdownPicker,
    BDropdownHeader,
    BDropdownDivider,
    BDropdownItem,
    BText,
    BValid,
    BInfo
  },
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
    list: util.props.Array,
    value: util.props.String,
    info: util.props.String,
    search: util.props.Boolean,
    hideNull: util.props.Boolean,
    row: {
      ...util.props.UInt,
      default: 10
    }
  },
  data() {
    return {
      show: null,
      label: null,
      searchText: null,
      menuHeight: "0px",
      selectValue: this.value,
      placeholder: '<Pleace select...>',
    };
  },
  computed: {
    searchList: function() {
      return this.searchText
        ? this.list.filter(e => e.value && (e.value.includes(this.searchText) || e.label.includes(this.searchText)))
        : this.list
    }
  },
  mounted: function() {
    this.menuHeight = this.row * 32 + 10 + "px"
    this.setTrigger(this.value)
  },
  methods: {
    setTrigger: function(value) {
      let obj =
        this.list &&
        this.list.find &&
        this.list.find(e => { if (e.value == value) return e })
      this.label = (obj && obj.label) || null
    },
    headerClick: function() {
      this.show = true
    },
    menuClick: function(item) {
      this.show = false
      this.selectValue = item.value
      this.searchText = null // 清空查询字段
      this.setTrigger(this.selectValue)
      this.$emit("change", this.selectValue)
      this.validator(this.$refs.dropdownlist.$el, this.selectValue)
    },
    showOrHide: function(value) {
      this.show = value
    }
  }
};
</script>

