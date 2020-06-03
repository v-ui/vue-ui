<template>
  <tr>
    <table-serial-td :hideSerial="hideSerial" :rowspan="rowCount" :aria-rowspan="rowCount">No.</table-serial-td>
    <table-select-td
      v-model="isChecked"
      :hide-select="hideSelect || selectStatus != 2"
      :rowspan="rowCount"
      :aria-rowspan="rowCount"
    />
    <template v-for="(cell, cellIndex) in row">
      <table-operate-td
        v-if="cell.$operate"
        :key="cellIndex"
        :operate="cell.$operate"
        :rowspan="rowCount"
        :aria-rowspan="rowCount"
      >Operate</table-operate-td>
      <table-head-th
        v-else
        :key="cellIndex"
        :cell="cell"
        :sort="sort"
        :sort-obj="sortObj"
        @table:sort="cell => $emit('table:sort', cell)"
      />
    </template>
  </tr>
</template>

<script>
import utilities from "@/components/utilities/index.js";

import tableHeadTh from "./table-head-th";
import tableSerialTd from "./../Td/table-serial-td";
import tableSelectTd from "./../Td/table-select-td";
import tableOperateTd from "./../Td/table-operate-td";

export default {
  name: "table-head-tr",
  components: { tableHeadTh, tableSerialTd, tableSelectTd, tableOperateTd },
  model: {
    prop: "checked",
    event: "change"
  },
  data() {
    return {
      isChecked: this.checked
    };
  },
  props: {
    row: utilities.props.list,
    sort: utilities.props.list,
    checked: Boolean,
    rowCount: Number,
    hideSerial: Boolean,
    hideSelect: Boolean,
    selectStatus: Number,
    sortObj: Object
  },
  watch: {
    checked: function(value) {
      this.isChecked = value;
    },
    isChecked: function(value) {
      this.$emit("change", value);
    }
  }
};
</script>
