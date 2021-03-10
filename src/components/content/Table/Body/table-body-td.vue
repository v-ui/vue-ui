<template>
  <td
    class="align-middle"
    :class="[cell.class, ObjStyle && ObjStyle.class]"
    :style="[cell.style, ObjStyle && ObjStyle.style]"
    style="min-width: 30px;"
    :colspan="cell.colSpan"
    :aria-colspan="cell.colSpan"
    :rowspan="cell.rowSpan"
    :aria-rowspan="cell.rowSpan"
  >
    {{ col.format ? col.format(value) : value || '-' }}
  </td>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "TableBodyTd",
  props: {
    cell: [Object, String, Number, Boolean],
    col: util.props.Object
  },
  computed: {
    value: function() {
      return this.cell.value || this.cell;
    },
    ObjStyle: function() {
      return this.col.cellStyle && typeof this.col.cellStyle == "function"
        ? this.col.cellStyle(this.value)
        : this.col.cellStyle;
    }
  }
};
</script>
