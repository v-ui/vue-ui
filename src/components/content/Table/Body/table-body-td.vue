<template>
  <td
    v-if="!cell.hide"
    class="align-middle"
    :class="[ObjStyle && ObjStyle.class]"
    :style="[ObjStyle && ObjStyle.style]"
    style="min-width: 30px;"
    :colspan="cell.colSpan"
    :aria-colspan="cell.colSpan"
    :rowspan="cell.rowSpan"
    :aria-rowspan="cell.rowSpan"
  >
    <slot
      name="tBodyCell"
      :cell="cell"
      :col="col"
      :value="value"
    >
      {{ value }}
    </slot>
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
      let value = this.cell.value || this.cell;
      return this.col.format ? this.col.format(value) : value
    },
    ObjStyle: function() {
      return this.col.cellStyle && typeof this.col.cellStyle == "function"
        ? this.col.cellStyle(this.value)
        : this.col.cellStyle
    }
  }
};
</script>
