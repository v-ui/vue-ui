<template>
  <span class="row mx-1">
    <item
      v-for="(item, index) in list"
      :key="index"
      class="text-center"
      :item="item"
      :col-count="colCount"
      :multiple="isMultiple"
      :primary-key="primaryKey"
      :selected="selectedValues"
      :disabled="item.disabled || disabled"
      @item:click="itemClick"
    />
  </span>
</template>

<script>
import util from "@/components/util/index.js";

import item from "./b-dropdown-panel-item";

export default {
  name: "BDropdownPanelRow",
  components: { item },
  mixins: [ util.mixins.select.select, ],
  props: {
    disabled: util.props.Boolean,
    colCount: util.props.UInt,
  },
  methods: {
    itemClick: function(item) {
      if (this.isMultiple) {
        let index = this.selectedValues.findIndex(e => (e && e[this.primaryKey || 'value'] || e) === (item && item[this.primaryKey || 'value'] || item))
        index >= 0
          ? this.selectedValues.splice(index, 1)
          : this.selectedValues.push(item)
      } else {
        this.selectedValues = item
      }
      this.$emit('item:click', this.selectedValues)
    },
  },
};
</script>
