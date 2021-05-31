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
      <slot
        name="tHeadCell"
        :cell="cell"
        :value="value"
      >
        <basic-label
          :label="value"
          :icon="cell.icon"
        />
      </slot>
      <i
        v-if="canSort && iconClass"
        class="mx-1"
        :class="iconClass"
      />
    </div>
  </th>
</template>

<script>
import config from "@/config/index.js";
import util from "@/components/util/index.js";

import BasicLabel from '@/components/basic/basic-label.vue'
export default {
  name: "TableHeadTh",
  components: { BasicLabel, },
  props: {
    cell: util.props.Object,
    sort: util.props.Array,
  },
  computed: {
    icon: function() {
      return config.ui.icon;
    },
    iconClass: function() {
      let item = this.sort.find(e => e && (e.value.field || e.value) === this.cell.field)
      if (!item) return ''
      if ((item.data.value || item.data) === "asc") return this.icon.sortUp;
      else if ((item.data.value || item.data) === "desc") return this.icon.sortDown;
      else return "";
    },
    canSort: function() {
      // 默认只允许最后一层的 cell 返回 sort 事件
      // canNotSort 只应用于特殊的 th
      return !this.cell.colSpan && !this.cell.canNotSort
    },
    style: function() {
      return this.canSort ? 'cursor: pointer' : ''
    },
    value: function() {
      return this.cell.icon
        ? this.cell.label
        : this.cell.label || this.cell
    },
  },
  methods: {
    cellSort: function(cell) {
      if (!this.canSort) return
      this.$emit('cell:sort', cell)
    },
  },
};
</script>
