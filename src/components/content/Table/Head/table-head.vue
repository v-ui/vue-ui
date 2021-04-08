<template>
  <thead>
    <table-head-tr
      v-for="(row, index) in head"
      :key="index"
      :row="row"
      :sort="sort"
      @tr:sort="cell => $emit('th:sort', cell)"
    >
      <template #tHeadCell="{ cell, value }">
        <slot name="tHeadCell" :cell="cell" :value="value" />
      </template>
    </table-head-tr>
  </thead>
</template>

<script>
import util from "@/components/util/index.js";

import TableHeadTr from "./table-head-tr";
export default {
  name: 'TableHead',
  components: { TableHeadTr },
  props: {
    head: util.props.Array,
    sort: util.props.Array,
  },
}
</script>
