<template>
  <tr
    :class="[row.$class, rowStyle.class && rowStyle.class(row), {'table-active': isSelected }]"
    :style="[row.$style, rowStyle.style && rowStyle.style(row)]"
    :aria-selected="isSelected"
  >
    <table-serial-td
      :hide-serial="hideSerial"
      :number="index"
    />
    <table-select-td
      v-model="isSelected"
      :hide-select="hideSelect || selectStatus != 2"
    />
    <template v-for="(col, colIndex) in columns">
      <table-operate-td
        v-if="col.$operate >= 0"
        :key="colIndex"
        :operate="operate"
        @tr:oper="type => $emit('tr:oper', {type: type, data: row})"
      />
      <table-body-td
        v-else
        :key="colIndex"
        :cell="row[col.field] || '-'"
        :col="col"
      />
    </template>
  </tr>
</template>

<script>
import util from "@/components/util/index.js";

import tableBodyTd from "./table-body-td";
import tableSerialTd from "./../Td/table-serial-td";
import tableSelectTd from "./../Td/table-select-td";
import tableOperateTd from "./../Td/table-operate-td";

export default {
  name: "TableBodyTr",
  components: { tableBodyTd, tableSerialTd, tableSelectTd, tableOperateTd },
  props: {
    primaryKey: util.props.String,
    row: util.props.Object,
    index: util.props.UNumber,
    columns: util.props.Array,
    rowStyle: util.props.Object,
    operate: util.props.Array,
    hideSerial: util.props.Boolean,
    hideSelect: util.props.Boolean,
    selectStatus: util.props.UNumber,
    selectedOptions: [Array, Object]
  },
  data() {
    return {
      isSelected: this.selected
    };
  },
  computed: {
    selected: function() {
      let value = this.row[this.primaryKey].value || this.row[this.primaryKey];
      if (!this.selectedOptions || this.selectStatus == 0) return false;
      if (this.selectStatus == 1)
        return this.selectedOptions[this.primaryKey] == value;
      else if (this.selectStatus == 2)
        return (
          this.selectedOptions.some &&
          this.selectedOptions.some(
            e => e[this.primaryKey] && e[this.primaryKey] == value
          )
        );
      else return false;
    }
  },
  watch: {
    selected: function(value) {
      this.isSelected = value;
    },
    isSelected: function(value) {
      this.$emit("tr:selected", value);
    }
  }
};
</script>

<style scoped>
.hover {
  background-color: rgba(0, 0, 0, 0.075);
}
</style>
