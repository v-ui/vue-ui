<template>
  <div class="p-0">
    <!-- headr -->
    <div
      v-if="!hideHead"
      ref="THead"
      class="p-0"
      :class="{'overflow-auto': isActive}"
      @scroll="isActive && $emit('table:scroll', $event, 'activeTableHeader')"
    >
      <table
        class="table table-sm table-bordered m-0"
        :class="tableClass"
        style="table-layout: fixed"
      >
        <table-colgroup :colgroup="colgroup" />
        <table-head
          :head="theadData"
          :sort="dataSort"
          :class="theadClass"
          @th:sort="thSort"
        >
          <template #tHeadCell="{ cell, value }">
            <slot :name="`head-${cell.field}`" :cell="cell" :value="value" />
          </template>
        </table-head>
      </table>
    </div>
    <!-- body -->
    <div
      v-if="!hideData"
      ref="TBody"
      class="p-0 overflow-auto"
      style="min-height: 98px"
      @scroll="$emit('table:scroll', $event, isActive ? 'activeTableBody' : 'fixedTableBody' )"
    >
      <table
        class="table m-0"
        :class="tableClass"
        style="table-layout: fixed"
      >
        <table-colgroup :colgroup="colgroup" />
        <table-body
          v-model="selectedValue"
          :data="list"
          :columns="columns"
          :row-style="rowStyle"
          :multiple="isMultiple"
          :primary-key="primaryKey"
          @tr:click="row => $emit('tr:click', row)"
          @tr:dbclick="row => $emit('tr:dbclick', row)"
        >
          <template #tBodyCell="{ row, cell, col, value, index }">
            <slot :name="`body-${col.field}`" :row="row" :cell="cell" :col="col" :value="value" :index="index" />
          </template>
        </table-body>
      </table>
    </div>
    <!-- footer -->
    <div
      v-if="!hideFoot"
      ref="TFoot"
      class="p-0"
      :class="{'overflow-auto': isActive}"
      @scroll="isActive && $emit('table:scroll', $event, 'activeTableFooter')"
    >
      <table
        class="table m-0"
        :class="tableClass"
        style="table-layout: fixed"
      >
        <table-colgroup :colgroup="colgroup" />
      </table>
    </div>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import tableColgroup from "./Colgroup/table-colgroup";
import tableHead from "./Head/table-head";
import tableBody from "./Body/table-body";

export default {
  name: "BTable",
  components: { tableColgroup, tableHead, tableBody },
  mixins: [
    util.mixins.grid.col,
    util.mixins.grid.thead,
    util.mixins.grid.operate,
    util.mixins.grid.sort,
    util.mixins.select.select,
  ],
  props: {
    foot: util.props.Array,
    rowStyle: util.props.Object,
    primaryKey: {
      ...util.props.String,
      default: 'id',
    },
    isActive: util.props.Boolean,
    // class table
    tableTheme: util.props.theme,
    tableSm: util.props.Boolean,
    tableHover: util.props.Boolean,
    tableStriped: util.props.Boolean,
    tableBordered: util.props.Boolean,
    tableBorderless: util.props.Boolean,
    // class thead
    theadTheme: util.props.theme,
  },
  computed: {
    // class table
    tableClass: function() {
      let theme = this.tableTheme ? `table-${this.tableTheme}` : "";
      let sm = this.tableSm ? "table-sm" : "";
      let hover = this.tableHover ? "table-hover" : "";
      let striped = this.tableStriped ? "table-striped" : "";
      let bordered = this.tableBordered ? "table-bordered" : "";
      let borderless = this.tableBorderless ? "table-borderless" : "";
      return `${theme} ${hover} ${striped} ${bordered} ${borderless} ${sm} `;
    },
    // class thead
    theadClass: function() {
      return this.theadTheme ? `thead-${this.theadTheme}` : "";
    },
    dataFoot: function() {
      return this.foot || [];
    },
    hideHead: function() {
      return !this.dataHead || this.dataHead.length == 0;
    },
    hideData: function() {
      return !this.list || this.list.length == 0
    },
    hideFoot: function() {
      return !this.dataFoot || this.dataFoot.length == 0;
    },
  },
  async mounted() {
    await this.initCol();
    await this.initHead();
  },
  methods: {
    thSort: function(cell) {
      this.cellSort(cell)
      this.$emit('table:sort', cell)
    },
  }
};
</script>

<style scoped>
div {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
div::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* table > tbody > tr {
    background-color: rgba(0, 0, 0, .075)
} */
</style>
