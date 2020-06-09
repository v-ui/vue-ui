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
import util from "@/components/util/index.js";

import tableSerialTd from "./../Td/table-serial-td";
import tableSelectTd from "./../Td/table-select-td";
import tableOperateTd from "./../Td/table-operate-td";
import tableHeadTh from "./../Td/table-head-th";

export default {
  name: "table-head-tr",
  components: { tableSerialTd, tableSelectTd, tableOperateTd, tableHeadTh },
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    row: util.props.list,
    sort: util.props.list,
    checked: Boolean,
    rowCount: Number,
    hideSerial: Boolean,
    hideSelect: Boolean,
    selectStatus: Number,
    sortObj: Object
  },
    data() {
    return {
      isChecked: this.checked
    };
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
