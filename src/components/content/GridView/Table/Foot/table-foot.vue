<template>
  <tfoot>
    <tr
      v-for="(row, rowIndex) in foot"
      :key="rowIndex"
    >
      <th
        v-for="(col, colIndex) in row.cols"
        :key="colIndex"
        class="text-center align-middle text-truncate"
        :rowspan="col.rowspan || 1"
        :colspan="col.colspan || 1"
        :scope="(col.rowspan > 1 || col.colspan > 1) ? 'colgroup' : 'col'"
      >
        {{ col.title }}
      </th>
    </tr>
  </tfoot>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "TableFoot",
  props: {
    foot: util.props.Array,
  }
};
</script>
