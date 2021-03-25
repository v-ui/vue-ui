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
    }
  }
};
</script>
