<template>
  <tbody>
    <table-body-tr
      v-for="(row, index) in data"
      :key="index"
      :row="row"
      :columns="columns"
      :row-style="rowStyle"
      :is-active="isSelected(row)"
      @click.native="$emit('tr:click', row)"
      @dblclick.native="$emit('tr:dblclick', row)"
    >
      <template #tBodyCell="{ cell, col, value }">
        <slot
          name="tBodyCell"
          :row="row"
          :cell="cell"
          :col="col"
          :value="value"
          :index="index"
        />
      </template>
    </table-body-tr>
  </tbody>
</template>

<script>
import util from "@/components/util/index.js";

import tableBodyTr from "./table-body-tr";

export default {
  name: "TableBody",
  components: { tableBodyTr },
  mixins: [ util.mixins.select.check, ],
  props: {
    list: util.props.Array,
    data: util.props.Array,
    columns: util.props.Array,
    rowStyle: util.props.Object,
  },
  data() {
    return {
      key: 'id',
    }
  },
};
</script>
