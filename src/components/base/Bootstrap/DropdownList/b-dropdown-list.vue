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
    >
      <template v-if="isMultiple" #trigger>
        <div class="d-flex align-content-between flex-wrap">
          <b-badge v-for="(item, key) in checkedValues" :key="key" class="m-1" color="primary">
            {{ item[primaryKey] || item.label || item.value || item }}
            <i v-if="!disabled" class="fas fa-times-circle text-muted pl-1" style="cursor: pointer" @click.stop="deleteItem(item)"/>
          </b-badge>
          <label v-show="!checkedValues || checkedValues.length === 0">{{ placeholder }}</label>
        </div>
      </template>
      <b-dropdown-header v-if="search" @click.native="headerClick">
        <b-text v-model="searchText" hide-icon type="search" size="sm" />
      </b-dropdown-header>
      <b-dropdown-divider v-if="search" />
      <b-dropdown-item
        v-if="!searchText && !hideNull"
        :label="placeholder"
        :disabled="disabled"
        @click.native="menuClick(null)"
      />
      <b-dropdown-item
        v-for="item in searchList"
        :key="item.value"
        :info="item.info"
        :label="item.label"
        :active="isChecked(item)"
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

import BBadge from '@/components/base/Bootstrap/Badge/b-badge.vue'
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
    BBadge,
    BText,
    BValid,
    BInfo
  },
  mixins: [
    util.mixins.form.base,
    util.mixins.form.readonly,
    util.mixins.form.validator,
    util.mixins.select.check,
  ],
  props: {
    multiple: {
      ...util.props.Boolean,
      default: false,
    },
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
      isMultiple: this.multiple,
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
    this.setTrigger(this.checkedValues)
  },
  methods: {
    setTrigger: function(value) {
      let obj =
        this.list &&
        this.list.find &&
        this.list.find(e => { if (e.value === value) return e })
      this.label = (obj && obj.label) || null
    },
    headerClick: function() {
      this.show = true
    },
    menuClick: function(item) {
      this.show = false
      if (!item) return
      let value = this.primaryKey ? item : item && item.value || item
      if (this.isMultiple) {
        let index = this.checkedMap.indexOf(value)
        if (index >= 0) this.checkedValues.splice(index, 1)
        else this.checkedValues.push(value)
      } else {
        this.checkedValues = value
        this.setTrigger(this.checkedValues)
      }
      this.searchText = null // 清空查询字段
      this.validator(this.$refs.dropdownlist.$el, this.checkedValues)
    },
    deleteItem: function(item) {
      let value = this.primaryKey ? item : item && item.value || item
      let index = this.checkedMap.indexOf(value)
      if (index >= 0) this.checkedValues.splice(index, 1)
    },
    // 验证集合 通过返回 true，不通过返回 false
    validating: function (value) {
      // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
      if (!this.validateRequired(value)) return false
      // 验证成功
      return true
    },
  }
};
</script>
