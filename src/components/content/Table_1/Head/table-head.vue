<template>
  <thead>
    <template v-for="(row, index) in head">
      <table-head-tr
        v-if="index == 0"
        :key="index"
        v-model="selected"
        :row="row"
        :sort="sort"
        :row-count="rowCount"
        :hide-serial="hideSerial"
        :hide-select="hideSelect"
        :select-status="selectStatus"
        @tr:sort="cell => $emit('th:sort', cell)"
      >
        <template #tHeadSerial>
          <slot name="tHeadSerial" />
        </template>
        <template #tHeadSelect="{ checked }">
          <slot name="tHeadSelect" :checked="checked" />
        </template>
        <template #tHeadOperate>
          <slot name="tHeadOperate" />
        </template>
        <template #tHeadCell="{ cell, value }">
          <slot name="tHeadCell" :cell="cell" :value="value" />
        </template>
      </table-head-tr>
      <table-head-tr
        v-else
        :key="index"
        :row="row"
        hide-serial
        hide-select
        :sort="sort"
        @tr:sort="cell => $emit('th:sort', cell)"
      >
        <template #tHeadCell="{ cell }">
          <slot name="tHeadCell" :cell="cell" />
        </template>
      </table-head-tr>
    </template>
  </thead>
</template>

<script>
import util from "@/components/util/index.js";

import TableHeadTr from "./table-head-tr";

export default {
  name: "TableHead",
  components: { TableHeadTr },
  model: {
    prop: "selected",
    event: "thead:selected"
  },
  props: {
    head: util.props.Array,
    sort: util.props.Array,
    rowCount: util.props.UNumber,
    hideSerial: util.props.Boolean,
    hideSelect: util.props.Boolean,
    selectStatus: util.props.UNumber,
  },
  data() {
    return {
      selected: false
    };
  },
  watch: {
    selected: function(value) {
      this.$emit("thead:selected", value);
    }
  }
};
</script>
