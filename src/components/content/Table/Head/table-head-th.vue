<template>
  <th
    class="text-center align-middle"
    :style="style"
    :rowspan="cell.rowSpan"
    :aria-rowspan="cell.rowSpan"
    :colspan="cell.colSpan"
    :aria-colspan="cell.colSpan"
    :data-field="cell.field"
    @click="cellSort"
  >
    <div class="d-flex justify-content-center align-items-center h-100">
      <slot name="tHeadCell" :cell="cell" :value="value">
        <font class="px-1">
          {{ value }}
        </font>
      </slot>
      <i
        v-if="cell.field && !cell.children && sort.find(e => e && e.field === cell.field)"
        :class="iconClass"
      />
    </div>
  </th>
</template>

<script>
import config from "@/config/index.js";
import util from "@/components/util/index.js";

export default {
  name: "TableHeadTh",
  props: {
    cell: util.props.Object,
    sort: util.props.Array,
  },
  computed: {
    icon: function() {
      return config.ui.icon;
    },
    iconClass: function() {
      let index = this.sort.findIndex(e => e && e.field === this.cell.field)
      if (this.sort[index].value === "asc") return this.icon.sortUp;
      if (this.sort[index].value === "desc") return this.icon.sortDown;
      else return "";
    },
    lastColumnCell: function() {
      debugger
      return !this.cell.colSpan
    },
    style: function() {
      return this.lastColumnCell ? 'cursor: pointer' : ''
    },
    value: function() {
      return this.cell.title || this.cell
    },
  },
  methods: {
    cellSort: function(cell) {
      // 只允许最后一层的 cell 返回 sort 事件
      if (!this.lastColumnCell) return
      this.$emit('cell:sort', cell)
    },
  },
};
</script>
