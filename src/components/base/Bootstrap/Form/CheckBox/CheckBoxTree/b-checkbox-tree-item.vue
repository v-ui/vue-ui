<template>
  <div>
    <div class="d-table-row">
      <div class="d-table-cell" style="width: 15px" @click="open = !open">
        <i v-if="isFolder" class="fas" :class="open ? 'fa-caret-down' : 'fa-caret-right'" />
      </div>
      <b-checkbox
        v-model="chekboxIschecked"
        class="d-table-cell"
        :value="item.value"
        :label="item.label"
        :disabled="disabledCheckbox"
        :indeterminate="indeterminate"
      />
      <b-info v-if="isFolder" class="d-table-cell pl-1" :info="`(${item.children.length})`" />
    </div>
    <b-checkbox-tree
      v-if="open"
      v-model="selectedValues"
      :list="item.children"
      :primary-key="primaryKey"
      :disabled="disabledChildren"
      class="ml-4"
    />
  </div>
</template>

<script>
import util from "@/components/util/index.js";
import BCheckbox from "@/components/base/Bootstrap/Form/CheckBox/b-checkbox.vue";

import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-checkbox-tree-item",
  components: {
    BCheckbox,
    BCheckboxTree: () => import("./b-checkbox-tree.vue"),
    BInfo
  },
  props: {
    item: util.props.Object,
    disabled: util.props.Boolean,
    selected: util.props.Array,
    primaryKey: util.props.String,
    checkChildren: util.props.Boolean,
  },
  data() {
    return {
      open: false,
      chekboxIschecked: this.checkedCheckbox,
      selectedValues: this.selected,
    };
  },
  computed: {
    isFolder: function () {
      return this.item && this.item.children;
    },
    disabledCheckbox: function () {
      return this.disabled || this.item.disabled
    },
    disabledChildren: function () {
      return this.disabledCheckbox || this.item.children.disabled
    },
    selectedMap: function () {
      return this.selectedValues.map(e => e[this.primaryKey])
    },
    checkedCheckbox: function () {
      return this.item[this.primaryKey] && this.selectedMap.includes(this.item[this.primaryKey])
    },
    indeterminate: function () {
      if (!this.isFolder) {
        return this.checkedCheckbox ? 2 : 0
      } else {
        let count = this.item.children.filter(e => e[this.primaryKey] && this.selectedMap.includes(e[this.primaryKey])).length
        if (count === 0) return 0
        if (count === this.item.children.length) return 2
        return 1
      }
    }
  },
  watch: {
    checkedCheckbox: function (value) {
      this.chekboxIschecked = value
    }
  },
  selected: function (value) {
    this.selectedValues = value
  },
  chekboxIschecked: function (value) {
    if (!this.isFolder) {
      if (value) this.selectedValues.push(this.item)
      else value.splic(this.selectedMap.indexOf(this.item[this.primaryKey]), 1)
    }
  }
};
</script>
