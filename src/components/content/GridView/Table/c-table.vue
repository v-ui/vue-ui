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
          v-model="theadCheckboxChecked"
          :head="head"
          :sort="sort"
          :sort-obj="sortObj"
          :class="theadClass"
          :hide-serial="hideSerial"
          :hide-select="hideSelect"
          :select-status="Number(selectStatus)"
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
            :select-status="Number(selectStatus)"
            :thead-checkbox-checked="theadCheckboxChecked"
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
        <table-foot :foot="foot" />
      </table>
    </div>
  </div>
</template>

<script>
import config from "@/config/index.js";
import util from "@/components/util/index.js";

import TableColgroup from "./Colgroup/table-colgroup";
import TableHead from "./Head/table-head";
import TableBody from "./Body/table-body";
import TableFoot from "./Foot/table-foot";

export default {
  name: "CTable",
  components: { TableColgroup, TableHead, TableBody, TableFoot },
  model: {
    prop: "selected",
    event: "table:selected"
  },
  props: {
    list: util.props.Object,
    primaryKey: {
      ...util.props.String,
      default: "id",
    },
    sortObj: util.props.Object,
    tableClass: util.props.String,
    theadClass: util.props.String,
    isActive: util.props.Boolean,
    hideHead: util.props.Boolean,
    hideData: util.props.Boolean,
    hideFoot: util.props.Boolean,
    hideSerial: util.props.Boolean,
    hideSelect: util.props.Boolean,
    selectStatus: {
      ...util.props.UInt,
      validator: value => !isNaN(value) && [0, 1, 2].includes(Number(value)),
    },// 0: 默认, 1: 单选, 2: 多选
    selected: [Array, Object]
  },
  data() {
    return {
      colgroup: [],
      fieldcolumns: [],
      theadRowCount: 1,
      theadCheckboxChecked: false,
      selectedOptions: this.selected
    };
  },
  computed: {
    status: function() {
      return !this.isActive && Number(this.selectStatus) != 0
        ? Number(this.selectStatus)
        : "default";
    },
    operate: function() {
      if (
        this.isActive ||
        this.selectStatus == 2 ||
        !this.list ||
        !this.list.operate
      )
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
        this.selectStatus != 2 &&
        this.operate &&
        this.operate.index >= 0 &&
        this.operate.value
      ) {
        arr.splice(this.operate.index, 0, { $operate: this.operate.value });
      }
      return arr;
    },
    sort: function() {
      return (this.list && this.list.sort) || [];
    },
    data: function() {
      return (this.list && this.list.data) || [];
    },
    foot: function() {
      return (this.list && this.list.foot) || [];
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
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      this.InitColgroupAndcolumns();
    },
    InitColgroupAndcolumns: function() {
      if (this.hideHead) return;
      (this.colgroup = []), (this.fieldcolumns = []);
      if (!this.hideSerial)
        this.colgroup.push({ class: "text-center", style: "width: 58px;" });
      if (this.selectStatus == 2 && !this.hideSelect)
        this.colgroup.push({ class: "text-center", style: "width: 35px;" });

      // let lastcolumns = this.getLastColumns().filter(e => this.columns.includes(e.field))
      // if (this.operate && this.operate.value && this.operate.value.length > 0) lastcolumns.splice(this.operate.index, 0, { $operate: this.operate.value, })
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
    },
    getLastColumns: function(head = this.head) {
      let arr = [];
      head.forEach(e => {
        e.children ? arr.push(...this.getLastColumns(e.children)) : arr.push(e);
      });
      return arr;
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
