<template>
  <th
    class="text-center align-middle"
    style="cursor: pointer"
    :rowspan="cell.rowSpan"
    :aria-rowspan="cell.rowSpan"
    :colspan="cell.colSpan"
    :aria-colspan="cell.colSpan"
    :data-field="cell.field"
    @click="$emit('table:sort', cell)"
  >
    <div class="d-flex justify-content-center align-items-center h-100">
      <font class="px-1">
        {{ cell.title }}
      </font>
      <i
        v-if="cell.field && !cell.children && sort.includes(cell.field)"
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
      if (this.sort[this.cell.field] === "asc") return this.icon.sortUp;
      if (this.sort[this.cell.field] === "desc") return this.icon.sortDown;
      else return "";
    }
  }
};
</script>
