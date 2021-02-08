<template>
  <table class="table table-sm text-center w-100 m-1" :class="border ? 'table-bordered' : 'table-borderless'">
    <tr v-for="index in rowCount" :key="'tr-'+index">
      <td v-for="(item, itemIndex) in getList(index)" :key="'td-'+itemIndex" class="p-0">
        <slot name="item" :item="item">
          <b-dropdown-panel-item
            :item="item"
            class="text-center"
            :multiple="isMultiple"
            :primary-key="primaryKey"
            :selected="selectedValues"
            :disabled="item.disabled || disabled"
            @item:click="itemClick"
          />
        </slot>
      </td>
    </tr>
  </table>
</template>

<script>
import util from "@/components/util/index.js";

import BDropdownPanelItem from "./b-dropdown-panel-item";

export default {
  name: 'BDropdownPanelTable',
  components: { BDropdownPanelItem, },
  mixins: [ util.mixins.select.select, ],
  props: {
    colCount: util.props.UInt,
    border: util.props.Boolean,
    disabled: util.props.Boolean,
  },
  computed: {
    rowCount: function() {
      return this.colCount
        ? Math.ceil(this.list.length / this.colCount)
        : 1
    },
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
    getList: function(index) {
      let colCount = this.colCount || this.list.length
      return this.list.slice((index-1)*colCount, index*colCount)
    },
  },
}
</script>
