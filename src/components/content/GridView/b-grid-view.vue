<template>
  <div class="p-1">
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
                v-tip="'Sort'"
                color="secondary"
                size="sm"
                :active="sortActive"
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
              <grid-print :data="list" :columns="lastcolumns" :title="'printTitle'" />
            </b-button-group>
             <!-- export dropdown -->
            <grid-export :data="list" />
          </b-button-toolbar>
        </div>
      </div>
      <!-- tableContainer -->
      <grid-sort id="sortmodal" :column="lastcolumns" v-model="dataSort" />
      <div
        id="printWrap"
        class="border row m-0"
      >
        <b-table
          ref="fixedTable"
          :multiple="isMultiple"
          v-model="selectedValue"
          :class="fixedNum > 0 ? `col-${fixedSizeNum}` : ''"
          :head="fixedData.head"
          :list="data"
          :foot="foot"
          :sort="dataSort"
          :operate="!hideCheck ? null : operate"
          :row-style="rowStyle"
          v-bind="$attrs"
          :hide-head="hideHead"
          :hide-data="hideData"
          :hide-foot="hideFoot"
          :hide-serial="hideSerial"
          :primary-key="primaryKey"
          @table:sort="tableSort"
          @table:scroll="(event, type) => scroll(event, type)"
        >
          <template #body-_serial="{ index }">
            <b-table-serial :index="index + paginate.start" />
          </template>
          <template #body-_check="{ row }">
            <div class="d-flex justify-content-center">
              <b-checkbox v-if="selectStatus === enumSelect.select" :checked="isSelected(row)" @input="input($event, row)" />
              <base-icon v-else-if="selectStatus === enumSelect.check" icon="check-circle-fill" class="text-primary" style="cursor: pointer" @click.native="itemClick(row)" />
            </div>
          </template>
          <template #body-_operate>
            <b-table-operate :operate="operate.value" />
          </template>
        </b-table>
        <!-- fixedTableContainer -->
        <b-table
          v-if="fixedNum > 0"
          ref="activeTable"
          :multiple="isMultiple"
          v-model="selectedValue"
          :head="activeData.head"
          :list="data"
          :foot="foot"
          :sort="dataSort"
          :row-style="rowStyle"
          v-bind="$attrs"
          is-active
          :class="`col-${12 - fixedSizeNum}`"
          :hide-head="hideHead"
          :hide-data="hideData"
          :hide-foot="hideFoot"
          :primary-key="primaryKey"
          @table:sort="tableSort"
          @table:scroll="(event, type) => scroll(event, type)"
        />
        <!-- activeTableContainer -->
      </div>
       <!-- pagination -->
      <grid-pagination ref="pagination" :dataCount="list.length" v-model="paginate" />
    </template>
    <grid-helper v-else :hide-data="hideData" :loading="loading" />
  </div>
  <!-- gridView -->
</template>

<script>

import tools from "@/tools/index.js";
import config from "@/config/index.js";
import util from "@/components/util/index.js";

import BTable from "@/components/content/Table/b-table.vue";
import BTableSerial from '@/components/content/Table/container/b-table-serial.vue'
import BTableOperate from '@/components/content/Table/container/b-table-operate.vue'

import BButtonGroup from "@/components/base/ButtonGroup/b-button-group.vue";
import BButtonToolbar from "@/components/base/ButtonGroup/b-btn-toolbar.vue";
import BButton from "@/components/basic/Button/basic-button.vue";

import GridSort from './tools/grid-sort'
import GridPrint from './tools/grid-print'
import GridExport from './tools/grid-export'
import GridHelper from './Basic/grid-helper'
import GridPagination from './Basic/grid-pagination'

import BaseIcon from "@/components/basic/basic-icon.vue"
import BCheckbox from "@/components/form/CheckBox/b-checkbox.vue";
export default {
  name: "BGridView",
  inheritAttrs: false,
  components: {
    BTable,
    BTableSerial,
    BTableOperate,
    BButton,
    BButtonGroup,
    BButtonToolbar,
    GridSort,
    GridPrint,
    GridExport,
    GridHelper,
    GridPagination,
    BaseIcon,
    BCheckbox,
  },
  mixins: [ util.mixins.grid.select, ],
  props: {
    list: util.props.Array,
    head: util.props.Array,
    foot: util.props.Array,
    sort: util.props.Array,
    operate: util.props.Object,
    rowStyle: util.props.Object,
    primaryKey: {
      ...util.props.String,
      default: "id",
    },
    fixed: util.props.UInt,
    fixedSize: util.props.size,
    hideSerial: util.props.Boolean,
    printTitle: util.props.String
  },
  data() {
    return {
      loading: false, // 未使用
      // pagination
      paginate: 1,
      dataSort: this.sort,
    };
  },
  computed: {
    icon: function() {
      return config.ui.icon;
    },
    data: function() {
      return this.list.slice(this.paginate.start, this.paginate.end);
    },
    lastcolumns: function() {
      return this.getLastColumns(this.head);
    },
    fixedNum: function() {
      return Number(this.fixed);
    },
    fixedSizeNum: function() {
      if (this.fixedNum <= 0 || this.fixedNum > this.head.length) return 12;
      if (this.fixedSize == "sm") return 4;
      else if (this.fixedSize == "") return 6;
      else if (this.fixedSize == "lg") return 9;
      else return 12;
    },
    fixedData: function() {
      let head = this.fixedNum > 0 ? this.head.slice(0, this.fixedNum) : this.head
      let serial = { field: "_serial", icon: "hash", colStyle: 'width: 35px;', canNotSort: true, }
      if (!this.hideSerial) head.unshift(serial)
      if (!this.hideCheck) head.splice(this.operate.index || 0, 0, this.check)
      return { head: head, };
    },
    activeData: function() {
      if (this.fixedNum <= 0) return {};
      return { head: this.head.slice(this.fixedNum), };
    },
    sortActive: function() {
      return this.dataSort && this.dataSort.length !== 0
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
  watch: {
    sort: {
      handler: function(value) {
        this.dataSort = value
      },
      deep: true,
    },
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
      head.forEach(e =>
        e.children
          ? arr.push(...this.getLastColumns(e.children))
          : e.field[0] !== '_' ? arr.push(e) : null
      );
      return arr;
    },
    tableSort: function(sort) {
      this.dataSort = sort
    },
    // 单选
    input: function(event, row) {
      this.multiSelect(event.target.checked, row)
    },
    // 多选
    itemClick: function(row) {
      this.unMultiSelect(row)
    },
    reset: function() {
      this.paginate = 1
      this.dataSort = []
    },
  }
};
</script>
