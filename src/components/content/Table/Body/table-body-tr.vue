<template>
  <tr
    :class="[rowStyle.class && rowStyle.class(row), {'table-active': isActive }]"
    :style="[rowStyle.style && rowStyle.style(row)]"
    :aria-selected="isActive"
  >
    <table-body-td
      v-for="(col, index) in columns"
      :key="index"
      :cell="row[col.field] || ''"
      :col="col"
    >
      <template #tBodyCell="{ cell, col, value }">
        <slot name="tBodyCell" :cell="cell" :col="col" :value="value" />
      </template>
    </table-body-td>
  </tr>
</template>

<script>
import util from "@/components/util/index.js";

import tableBodyTd from "./table-body-td";
export default {
  name: 'TableBodyTr',
  components: { tableBodyTd, },
  props: {
    row: util.props.Object,
    columns: util.props.Array,
    rowStyle: util.props.Object,
    isActive: util.props.Boolean,
  },
}
</script>

<style scoped>
.hover {
  background-color: rgba(0, 0, 0, 0.075);
}
</style>
