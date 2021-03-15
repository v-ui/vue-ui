<template>
  <table class="table table-sm text-center w-100 m-1" :class="border ? 'table-bordered' : 'table-borderless'">
    <tr v-for="index in rowCount" :key="'tr-'+index">
      <td v-for="(item, itemIndex) in getList(index)" :key="'td-'+itemIndex" class="p-0">
        <slot name="item" :item="item">
          <b-grid-item
            :item="item"
            class="text-center"
            :multiple="isMultiple"
            :primary-key="key"
            :display-name="displayKey"
            :selected="selectedValue"
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

import BGridItem from "./b-grid-item";

export default {
  name: 'BGridTable',
  components: { BGridItem, },
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
        const value = this.getValue(item)
        let index = this.selectedMap.indexOf(value)
        index >= 0
          ? this.selectedValue.splice(index, 1)
          : this.selectedValue.push(item)
      } else {
        this.selectedValue = item
      }
      this.$emit('item:click', this.selectedValue)
    },
    getList: function(index) {
      let colCount = this.colCount || this.list.length
      return this.list.slice((index-1)*colCount, index*colCount)
    },
  },
}
</script>
