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
          v-model="theadSelected"
          :head="theadData"
          :sort="dataSort"
          :class="theadClass"
          :row-count="theadRowCount"
          :hide-serial="hideSerial"
          :hide-select="hideSelect"
          :select-status="status"
          @th:sort="thSort"
        >
          <template #tHeadSerial>
            <slot name="tHeadSerial" />
          </template>
          <template #tHeadSelect="{ checked }">
            <slot name="tHeadSelect" :checked="checked" />
          </template>
          <template #tHeadOperate>
            <slot name="tHeadOperate" />
          </template>
          <template #tHeadCell="{ cell, value }">
          <slot name="tHeadCell" :cell="cell" :value="value" />
        </template>
        </table-head>
      </table>
    </div>
    <!-- body -->
    <div
      ref="TBody"
      class="p-0 overflow-auto"
      style="min-height: 98px"
      @scroll="$emit('table:scroll', $event, isActive ? 'activeTableBody' : 'fixedTableBody' )"
    >
      <template v-if="!hideData">
        <table
          class="table m-0"
          :class="tableClass"
          style="table-layout: fixed"
        >
          <table-colgroup :colgroup="colgroup" />
          <table-body
            v-model="selectedOptions"
            :data="data"
            :row-style="rowStyle"
            :columns="fieldcolumns"
            :operate="dataOperate.value"
            :primary-key="primaryKey"
            :hide-serial="hideSerial"
            :hide-select="hideSelect"
            :select-status="status"
            :thead-selected="theadSelected"
            @tr:click="row => $emit('tr:click', row)"
            @tr:dbclick="row => $emit('tr:dbclick', row)"
          >
            <template #tBodySerial>
              <slot name="tBodySerial" />
            </template>
            <template #tBodySelect="{ checked }">
              <slot name="tBodySelect" :checked="checked" />
            </template>
            <template #tBodyOperate="{ operate }">
              <slot name="tBodyOperate" :operate="operate" />
            </template>
            <template #tBodyCell="{ cell, col, value }">
              <slot name="tBodyCell" :cell="cell" :col="col" :value="value" />
            </template>
          </table-body>
        </table>
      </template>
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
import config from "@/config/index.js";
import util from "@/components/util/index.js";

import tableColgroup from "./Colgroup/table-colgroup";
import tableHead from "./Head/table-head";
import tableBody from "./Body/table-body";

export default {
  name: "BTable",
  components: { tableColgroup, tableHead, tableBody },
  mixins: [util.mixins.grid.thead],
  model: {
    prop: "selected",
    event: "table:selected"
  },
  props: {
    head: util.props.Array,
    list: util.props.Array,
    foot: util.props.Array,
    operate: util.props.Object,
    sort: util.props.Array,
    rowStyle: util.props.Object,
    primaryKey: {
      ...util.props.String,
      default: 'id',
    },
    isActive: util.props.Boolean,
    hideSerial: util.props.Boolean,
    hideSelect: util.props.Boolean,
    // class table
    tableTheme: util.props.theme,
    tableSm: util.props.Boolean,
    tableHover: util.props.Boolean,
    tableStriped: util.props.Boolean,
    tableBordered: util.props.Boolean,
    tableBorderless: util.props.Boolean,
    // class thead
    theadTheme: util.props.theme,
    selectStatus: {
      ...util.props.UInt,
      // 0: 默认, 1: 单选, 2: 多选
      validator: value => !isNaN(value) && [0, 1, 2].includes(Number(value))
    },
    selected: [Array, Object],
  },
  data() {
    return {
      colgroup: [],
      fieldcolumns: [],
      theadSelected: false,
      dataSort: this.sort || [],
      selectedOptions: this.selected
    };
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
    status: function() {
      return isNaN(this.selectStatus) ? 0 : Number(this.selectStatus);
    },
    data: function() {
      return this.list
    },
    dataOperate: function() {
      if (this.isActive || this.status == 2 || !this.operate) return {};
      let index = this.operate.index >= 0
          ? this.operate.index
          : this.head.length;
      let value = this.operate.value &&
        this.operate.value.forEach &&
        this.operate.value.filter(e => config.ui.table.operate[e].permissions(this.status)) ||
        []
      let n = Math.min(...this.head.map((e, index) => e.children ? index : Infinity))
      if (index > n) index = n;
      return { index: index, value: value };
    },
    dataHead: function() {
      let arr = Array.from(this.head || []);
      if (
        !this.isActive &&
        this.status != 2 &&
        this.dataOperate &&
        this.dataOperate.index >= 0 &&
        this.dataOperate.value
      ) {
        arr.splice(this.dataOperate.index, 0, { operate: this.dataOperate.value });
      }
      return arr;
    },
    dataFoot: function() {
      return this.foot || [];
    },
    hideHead: function() {
      return !this.dataHead || this.dataHead.length == 0;
    },
    hideData: function() {
      return !this.list || this.list.length == 0 || this.hideHead;
    },
    hideFoot: function() {
      return !this.dataFoot || this.dataFoot.length == 0;
    },
  },
  watch: {
    selected: function(value) {
      this.selectedOptions = value;
    },
    selectedOptions: function(value) {
      this.$emit("table:selected", value);
    },
    sort: {
      handler: function(value) {
        this.dataSort = value
      },
      deep: true,
    },
  },
  async mounted() {
    await this.InitColgroupAndcolumns();
    await this.initHead();
  },
  methods: {
    // head and colgroup
    InitColgroupAndcolumns: function() {
      if (this.hideHead) return;

      if (!this.hideSerial)
        this.colgroup.push({ class: "text-center", style: "width: 58px;" });
      if (this.status == 2 && !this.hideSelect)
        this.colgroup.push({ class: "text-center", style: "width: 35px;" });

      let columns = this.getLastColumns();
      columns.forEach(e => {
        if (e.$operate) {
          this.colgroup.push({
            class: "text-center",
            style: `width: ${
              2 * this.dataOperate.value.length < 5
                ? 5
                : 1.8 * this.dataOperate.value.length + 1
            }em;`
          });
          this.fieldcolumns.push({ $operate: this.dataOperate.index });
        } else {
          this.colgroup.push({ class: e.colClass, style: e.colStyle });
          this.fieldcolumns.push({
            field: e.field,
            format: e.format,
            cellStyle: e.cellStyle
          });
        }
      });
    },
    thSort: function(cell) {
      let field = cell.field
      let index = this.dataSort.findIndex && this.dataSort.findIndex(e => e && e.field === field)
      let sort = 'asc'
      if (index >= 0) {
        sort = this.dataSort[index].value === 'asc' ? 'desc' : 'asc'
        this.dataSort[index].value = sort
      } else {
        this.dataSort.push({field: field, value: sort})
      }
      this.data.sort((a, b) => {
        let sa = a && a[field]
        let sb = b && b[field]
        // TODO: 根据不同的数据类型进行排序，目前的方法不准确
        if (sort === 'asc') {
          return sa && sa.localeCompare && sb && sb.localeCompare
            ? sa.localeCompare(sb)
            : sa - sb
        } else {
          return sa && sa.localeCompare && sb && sb.localeCompare
            ? sb.localeCompare(sa)
            : sb - sa
        }
      })
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
