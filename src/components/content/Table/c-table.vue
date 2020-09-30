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
        class="table table-sm m-0"
        :class="tableClass"
        style="table-layout: fixed"
      >
        <table-colgroup :colgroup="colgroup" />
        <table-head
          v-model="theadSelected"
          :head="theadData"
          :sort="sort"
          :sort-obj="sortObj"
          :class="theadClass"
          :thead-row-count="theadRowCount"
          :hide-serial="hideSerial"
          :hide-select="hideSelect"
          :select-status="status"
          @table:sort="cell => $emit('table:sort', cell)"
        />
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
            :primary-key="primaryKey"
            :operate="operate.value"
            :hide-serial="hideSerial"
            :hide-select="hideSelect"
            :select-status="status"
            :thead-selected="theadSelected"
            @tr:click="row => $emit('tr:click', row)"
            @tr:dbclick="row => $emit('tr:dbclick', row)"
          />
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
  name: "CTable",
  components: { tableColgroup, tableHead, tableBody },
  mixins: [util.mixins.grid.thead],
  model: {
    prop: "selected",
    event: "table:selected"
  },
  props: {
    list: util.props.Object,
    primaryKey: util.props.String,
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
    sortObj: util.props.Object
  },
  data() {
    return {
      colgroup: [],
      fieldcolumns: [],
      theadSelected: false,
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
    operate: function() {
      if (this.isActive || this.status == 2 || !this.list || !this.list.operate)
        return {};
      let index =
        this.list.operate.index >= 0
          ? this.list.operate.index
          : this.list.head.length;
      let value =
        (this.list.operate.value &&
          this.list.operate.value.forEach &&
          this.list.operate.value.filter(e =>
            config.ui.table.operate[e].permissions(this.status)
          )) ||
        [];
      let n = Math.min(
        ...this.list.head.map((e, index) => {
          return e.children ? index : Infinity;
        })
      );
      if (index > n) index = n;
      return { index: index, value: value };
    },
    head: function() {
      let arr = Array.from((this.list && this.list.head) || []);
      if (
        !this.isActive &&
        this.status != 2 &&
        this.operate &&
        this.operate.index >= 0 &&
        this.operate.value
      ) {
        arr.splice(this.operate.index, 0, { $operate: this.operate.value });
      }
      return arr;
    },
    data: function() {
      return (this.list && this.list.data) || [];
    },
    foot: function() {
      return (this.list && this.list.foot) || [];
    },
    sort: function() {
      return (this.list && this.list.sort) || [];
    },
    hideHead: function() {
      return !this.head || this.head.length == 0;
    },
    hideData: function() {
      return !this.data || this.data.length == 0 || this.hideHead;
    },
    hideFoot: function() {
      return !this.foot || this.foot.length == 0;
    },
    rowStyle: function() {
      return (this.list && this.list.rowStyle) || {};
    }
  },
  watch: {
    selected: function(value) {
      this.selectedOptions = value;
    },
    selectedOptions: function(value) {
      this.$emit("table:selected", value);
    }
  },
  async mounted() {
    await this.InitColgroupAndcolumns();
    await this.initHead();
  },
  methods: {
    // head and colgroup
    InitColgroupAndcolumns: function() {
      if (this.hideHead) return;
      (this.colgroup = []), (this.fieldcolumns = []);
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
              2 * this.operate.value.length < 5
                ? 5
                : 1.8 * this.operate.value.length + 1
            }em;`
          });
          this.fieldcolumns.push({ $operate: this.operate.index });
        } else {
          this.colgroup.push({ class: e.colClass, style: e.colStyle });
          this.fieldcolumns.push({
            field: e.field,
            format: e.format,
            cellStyle: e.cellStyle
          });
        }
      });
    }
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
