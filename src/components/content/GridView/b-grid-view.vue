<template>
  <div class="border border-dark rounded p-1">
    <template v-if="!hideData">
      <!-- toolbar -->
      <div
        ref="toolbar"
        class="d-flex d-print-none align-items-center justify-content-between"
      >
        <!-- toolbar left -->
        <div class="m-1 row">
          <slot name="toolbar" />
        </div>
        <!-- tiilbar right -->
        <div class="m-1 row">
          <b-button-toolbar>
            <b-button-group>
              <b-button
                v-tip="'Search'"
                color="secondary"
                size="sm"
              >
                <i :class="icon.search" />
              </b-button>
              <b-button
                v-tip="'Search Plus'"
                color="secondary"
                size="sm"
              >
                <i :class="icon.searchPlus" />
              </b-button>
              <b-button
                v-modal="'#sortmodal'"
                v-tip="'Sort Plus'"
                color="secondary"
                size="sm"
                @click="sortPlusObj = Object.create(sortObj)"
              >
                <i :class="icon.sort" />
              </b-button>
              <b-button
                v-tip="'Reset'"
                color="secondary"
                size="sm"
                @click="reset"
              >
                <i :class="icon.sync" />
              </b-button>
              <b-button
                v-tip="'Print'"
                color="secondary"
                size="sm"
                @click="print"
              >
                <i :class="icon.print" />
              </b-button>
            </b-button-group>
            <b-dropdown
              :list="downloadList"
              hide-toggle
              menu-align="right"
              @item:click="dataExport"
            >
              <template #trigger>
                <b-button
                  v-tip="'Export'"
                  color="secondary"
                  size="sm"
                >
                  <i :class="icon.fileExport" />
                  <i
                    :class="icon.caretDown"
                    class="pl-1"
                  />
                </b-button>
              </template>
            </b-dropdown>
            <!-- download dropdown -->
          </b-button-toolbar>
        </div>
      </div>
      <!-- tableContainer -->
      <div
        id="printWrap"
        class="border row m-0"
      >
        <b-table
          ref="fixedTable"
          v-model="selectedOptions"
          :class="fixedNum > 0 ? `col-${fixedSizeNum}` : ''"
          :list="fixedList"
          :sort-obj="sortObj"
          :table-theme="tableTheme"
          :table-sm="tableSm"
          :table-hover="tableHover"
          :table-striped="tableStriped"
          :table-bordered="tableBordered"
          :table-borderless="tableBorderless"
          :thead-theme="theadTheme"
          :hide-head="hideHead"
          :hide-data="hideData"
          :hide-foot="hideFoot"
          :hide-serial="hideSerial"
          :select-status="selectStatus"
          :primary-key="primaryKey"
          @table:sort="cell => tableSort(cell)"
          @table:scroll="(event, type) => scroll(event, type)"
        />
        <!-- fixedTableContainer -->
        <b-table
          v-if="fixedNum > 0"
          ref="activeTable"
          :list="activeList"
          is-active
          hide-serial
          hide-select
          :class="`col-${12 - fixedSizeNum}`"
          :sort-obj="sortObj"
          :table-theme="tableTheme"
          :table-sm="tableSm"
          :table-hover="tableHover"
          :table-striped="tableStriped"
          :table-bordered="tableBordered"
          :table-borderless="tableBorderless"
          :thead-theme="theadTheme"
          :hide-head="hideHead"
          :hide-data="hideData"
          :hide-foot="hideFoot"
          :selected="selectedOptions"
          :select-status="selectStatus"
          :primary-key="primaryKey"
          @table:sort="cell => tableSort(cell)"
          @table:scroll="(event, type) => scroll(event, type)"
        />
        <!-- activeTableContainer -->
      </div>
       <!-- pagination -->
      <grid-pagination ref="pagination" :dataCount="data.length" v-model="paginate" />
    </template>
    <grid-helper v-else :hide-data="hideData" :loading="loading" />
    <b-modal
      id="sortmodal"
      title="Sort Plus"
      :icon="icon.sort"
    >
      <template>
        <div
          v-for="item in sort"
          :key="item"
          class="row my-1"
        >
          <font class="col-3">
            {{ lastcolumns.filter(e => e.field == item)[0].title || item }}:
          </font>
          <div class="col-9">
            <b-select
              :list="['asc', 'desc']"
              size="sm"
              :value="sortPlusObj[item]"
              @change="sortPlusChanged($event, item)"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <b-button
          color="secondary"
          data-dismiss="modal"
        >
          Close
        </b-button>
        <b-button
          color="primary"
          data-dismiss="modal"
          @click="clearSort"
        >
          Clear Sort
        </b-button>
        <b-button
          color="primary"
          data-dismiss="modal"
          @click="sortPlus"
        >
          Sort
        </b-button>
      </template>
    </b-modal>
  </div>
  <!-- gridView -->
</template>

<script>
// 参考： https://printjs.crabbly.com/
import printJS from "print-js";

import tools from "@/tools/index.js";
import config from "@/config/index.js";
import util from "@/components/util/index.js";

import BTable from "@/components/content/Table/b-table.vue";

import BButton from "@/components/basic/Button/basic-button.vue";
import BButtonGroup from "@/components/base/ButtonGroup/b-button-group.vue";
import BButtonToolbar from "@/components/base/ButtonGroup/b-btn-toolbar.vue";
import BDropdown from "@/components/base/Dropdown/b-dropdown.vue";
import BSelect from "@/components/form/b-select.vue";

import GridHelper from './Basic/grid-helper'
import GridPagination from './Basic/grid-pagination'

import BModal from "@/components/base/Modal/b-modal.vue";

export default {
  name: "BGridView",
  components: {
    BTable,
    BButton,
    BSelect,
    BButtonGroup,
    BButtonToolbar,
    GridHelper,
    GridPagination,
    BDropdown,
    BModal
  },
  props: {
    list: util.props.Object,
    primaryKey: {
      ...util.props.String,
      default: "id",
    },
    fixed: util.props.UInt,
    fixedSize: util.props.size,
    tableTheme: util.props.theme,
    tableSm: util.props.Boolean,
    tableHover: util.props.Boolean,
    tableStriped: util.props.Boolean,
    tableBordered: util.props.Boolean,
    tableBorderless: util.props.Boolean,
    theadTheme: util.props.theme,
    theadSticky: util.props.Boolean,
    hideSerial: util.props.Boolean,
    selectStatus: {
      ...util.props.UInt,
      validator: value => !isNaN(value) && [0, 1, 2].includes(Number(value))
    },// 0: 默认, 1: 单选, 2: 多选
    selected: [Array, Object],
    printTitle: util.props.String
  },
  data() {
    return {
      loading: false, // 未使用
      selectedOptions: this.selected,
      downloadList: [
        { value: "XML", type: "xml" },
        { value: "CSV", type: "csv" },
        { value: "TXT", type: "txt" },
        // { value: 'SQL', type: 'sql', },
        // { value: 'PDF', type: 'pdf', },
        { value: "JSON", type: "json" }
        // { value: 'MS-EXCEL', type: 'ms-excel', },
      ],
      sortObj: {},
      sortPlusObj: {},
      // pagination
      paginate: 1,
    };
  },
  computed: {
    icon: function() {
      return config.ui.icon;
    },
    head: function() {
      return this.list && this.list.head || [];
    },
    sort: function() {
      return this.list && this.list.sort || [];
    },
    data: function() {
      return this.list && this.list.data || [];
    },
    fillData: function() {
      return this.data.slice(this.paginate.start, this.paginate.end);
    },
    foot: function() {
      return this.list && this.list.foot || [];
    },
    rowStyle: function() {
      return this.list && this.list.rowStyle || {};
    },
    lastcolumns: function() {
      return this.getLastColumns();
    },
    fixedNum: function() {
      return Number(this.fixed);
    },
    fixedSizeNum: function() {
      if (this.fixedNum <= 0) return 12;
      if (this.fixedSize == "sm") return 4;
      else if (this.fixedSize == "") return 6;
      else if (this.fixedSize == "lg") return 9;
      else return 12;
    },
    fixedList: function() {
      return {
        head: this.fixedNum > 0 ? this.head.slice(0, this.fixedNum) : this.head,
        operate: this.list.operate,
        sort: this.sort,
        data: this.fillData,
        foot: this.foot,
        rowStyle: this.rowStyle
      };
    },
    activeList: function() {
      if (this.fixedNum <= 0) return {};
      return {
        head: this.head.slice(this.fixedNum),
        sort: this.sort,
        data: this.fillData,
        foot: this.foot,
        rowStyle: this.rowStyle
      };
    },
    hideHead: function() {
      return !this.head || this.head.length == 0;
    },
    hideData: function() {
      return this.loading || this.hideHead || !this.data || this.data.length == 0
    },
    hideFoot: function() {
      return !this.foot || this.foot.length == 0;
    },
    fixedTable: function() {
      return this.$refs.fixedTable;
    },
    fixedTableTHead: function() {
      return this.fixedTable && this.fixedTable.$refs.Thead
    },
    fixedTableTBody: function() {
      return this.fixedTable && this.fixedTable.$refs.TBody
    },
    fixedTableTFoot: function() {
      return this.fixedTable && this.fixedTable.$refs.TFoot
    },
    activeTable: function() {
      return this.$refs.activeTable;
    },
    activeTableTHead: function() {
      return this.activeTable && this.activeTable.$refs.Thead
    },
    activeTableTBody: function() {
      return this.activeTable && this.activeTable.$refs.TBody
    },
    activeTableTFoot: function() {
      return this.activeTable && this.activeTable.$refs.TFoot
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init: async function() {
      if (this.fixed > 0) {
        await this.injectionHover(
          this.fixedTableTBody.children[0]?.children[1],
          this.activeTableTBody.children[0]?.children[1]
        );
        await this.injectionHover(
          this.activeTableTBody.children[0]?.children[1],
          this.fixedTableTBody.children[0]?.children[1]
        );
      }
      await this.$nextTick();
      await this.initHeight();
    },
    initHeight: async function() {
      if (!this.fixedTableTBody && !this.activeTableTBody) return;
      if (this.fixedTableTBody) this.fixedTableTBody.style.height = 0 + "px";
      if (this.activeTableTBody) this.activeTableTBody.style.height = 0 + "px";
      this.$el.style.height = this.$parent.$el.offsetHeight + "px";

      await this.$nextTick()

      if (this.fixedTable && this.activeTable) {
        this.initTrHeight(this.$refs.fixedTable.$refs.THead, this.$refs.activeTable.$refs.THead);
        this.initTrHeight(this.$refs.fixedTable.$refs.TBody, this.$refs.activeTable.$refs.TBody);
        this.initTrHeight(this.$refs.fixedTable.$refs.TFoot, this.$refs.activeTable.$refs.TFoot);
      }

      let ToolbarHeight = this.$refs.toolbar ? this.$refs.toolbar.offsetHeight : 0;
      let THeadHeight = this.$refs.fixedTable.$refs.THead ? this.$refs.fixedTable.$refs.THead.offsetHeight : 0;
      let TFootHeight = this.$refs.fixedTable.$refs.TFoot ? this.$refs.fixedTable.$refs.TFoot.offsetHeight : 0;
      let PaginationHeight = this.$refs.pagination ? this.$refs.pagination.$el.offsetHeight : 0;
      debugger
      let TBodyHeight = this.$parent.$el.offsetHeight - ToolbarHeight - THeadHeight - TFootHeight - PaginationHeight - 10;

      if (this.fixedTableTBody) this.fixedTableTBody.style.height = TBodyHeight < 0 ? 0 : TBodyHeight + "px";
      if (this.activeTableTBody) this.activeTableTBody.style.height = TBodyHeight < 0 ? 0 : TBodyHeight + "px";
    },
    initTrHeight: function(fixedTableTrList, activeTableTrList) {
      if (!fixedTableTrList && !activeTableTrList) return;

      let fixed = fixedTableTrList.children[0].children[1].children;
      let active = activeTableTrList.children[0].children[1].children;
      let min = Math.min(fixed.length, active.length);

      for (let i = 0; i < min; i++) {
        if (i == min - 1 &&
          fixedTableTrList.children[0].children[1].offsetHeight !=
            activeTableTrList.children[0].children[1].offsetHeight
        ) {
          fixedTableTrList.children[0].children[1].offsetHeight >
          activeTableTrList.children[0].children[1].offsetHeight
            ? active[active.length - 1].style.height =
                Array.from(fixed)
                  .slice(min - 1)
                  .reduce((acc, cur) => cur.offsetHeight + acc, 0) + "px"
            : fixed[fixed.length - 1].style.height =
                Array.from(active)
                  .slice(min - 1)
                  .reduce((acc, cur) => cur.offsetHeight + acc, 0) + "px"
          return;
        }

        if (!fixed[i] || !active[i]) continue;
        fixed[i].offsetHeight > active[i].offsetHeight
          ? (active[i].style.height = fixed[i].offsetHeight + "px")
          : (fixed[i].style.height = active[i].offsetHeight + "px");
      }
    },
    injectionHover: function(dom1, dom2) {
      for (let i = 0; i < dom1.children.length; i++) {
        dom1.childNodes[i].addEventListener("mouseover", () => tools.dom.addClass(dom2.children[i], "hover"), false);
        dom1.childNodes[i].addEventListener("mouseout", () => tools.dom.removeClass(dom2.children[i], "hover"), false);
      }
    },
    scroll: function(elment, type) {
      if (!elment.target) return;
      const e = elment.target;
      let xCoord,
        yCoord = 0;
      switch (type) {
        case "fixedTableBody":
          yCoord = e.scrollTop;
          break;
        case "activeTableHeader":
          xCoord = e.scrollLeft;
          break;
        case "activeTableBody":
          xCoord = e.scrollLeft;
          yCoord = e.scrollTop;
          break;
        case "activeTableFooter":
          xCoord = e.scrollLeft;
          break;
      }
      this.syncScroll(xCoord, yCoord);
    },
    syncScroll: function(xCoord, yCoord) {
      if (this.fixedTableTBody && Math.abs(yCoord) > 1)
        this.fixedTableTBody.scrollTop = yCoord;
      if (this.activeTableTHead && Math.abs(xCoord) > 1)
        this.activeTableTHead.scrollLeft = xCoord;
      if (this.activeTableTBody) {
        if (Math.abs(xCoord) > 1) this.activeTableTBody.scrollLeft = xCoord;
        if (Math.abs(yCoord) > 1) this.activeTableTBody.scrollTop = yCoord;
      }
      if (this.activeTableTFoot && Math.abs(xCoord) > 1)
        this.activeTableTFoot.scrollLeft = xCoord;
    },
    getLastColumns: function(head = this.head) {
      let arr = [];
      head.forEach(e => e.children ? arr.push(...this.getLastColumns(e.children)) : arr.push(e));
      return arr;
    },
    dataExport: function(item) {
      if (!item || !item.type) return;
      switch (item.type) {
        case "xml":
          tools.file.xml.writer(this.data);
          break;
        case "csv":
          tools.file.csv.writer(this.data);
          break;
        case "txt":
          tools.file.txt.writer(this.data);
          break;
        // case 'sql':

        //     break;
        // case 'pdf':

        //     break;
        case "json":
          tools.file.json.writer(this.data);
          break;
        case "ms-excel":
          tools.file.excel.writer(this.data);
          break;
        default:
          break;
      }
      return false;
    },
    tableSort: function(cell) {
      this.$set(
        this.sortObj,
        cell.field,
        this.sortObj && this.sortObj[cell.field] == "asc" ? "desc" : "asc"
      );
      this.$emit("table:sort", { sort: this.sortObj, cell: cell });
    },
    sortPlusChanged: function(value, field) {
      value
        ? this.$set(this.sortPlusObj, field, value)
        : this.$delete(this.sortPlusObj, field);
    },
    sortPlus: function() {
      this.sortObj = Object.create(this.sortPlusObj);
      this.$emit("table:sortPlus", this.sortObj);
    },
    clearSort: function() {
      this.sortObj = {};
      this.sortPlusObj = {};
      this.$emit("table:sortClear");
    },
    reset: function() {
      this.selectedOptions = this.selected;
      this.sortObj = {};
      this.paginate = 1
    },
    print: function() {
      printJS({
        type: "json",
        printable: this.data,
        repeatTableHeader: true,
        properties: this.lastcolumns.map(e => ({
          field: e.field,
          displayName: e.title
        })),
        header: this.printTitle
          ? '<h3 class="text-center">' + this.printTitle + "</h3>"
          : null
      });
      this.$emit("table:print");
    },
  }
};
</script>
