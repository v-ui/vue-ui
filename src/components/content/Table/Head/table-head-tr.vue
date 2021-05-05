<template>
  <tr>
    <table-head-th
      v-for="(cell, index) in row"
      :key="index"
      :cell="cell"
      :sort="sort"
      @cell:sort="$emit('tr:sort', cell)"
    >
      <template #tHeadCell="{ cell, value }">
        <slot
          name="tHeadCell"
          :cell="cell"
          :value="value"
        />
      </template>
    </table-head-th>
  </tr>
</template>

<script>
import util from "@/components/util/index.js";

import tableHeadTh from "./table-head-th";
export default {
  name: "TableHeadTr",
  components: { tableHeadTh, },
  props: {
    row: util.props.Array,
    sort: util.props.Array,
  },
}
</script>
