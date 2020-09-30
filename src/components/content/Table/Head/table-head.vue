<template>
  <thead>
    <template v-for="(headRow, index) in head">
      <table-head-tr
        v-if="index == 0"
        :key="index"
        v-model="selected"
        :row="headRow"
        :sort="sort"
        :row-count="rowCount"
        :hide-serial="hideSerial"
        :hide-select="hideSelect"
        :select-status="selectStatus"
        :sort-obj="sortObj"
        @table:sort="cell => $emit('table:sort', cell)"
      />
      <table-head-tr
        v-else
        :key="index"
        :row="headRow"
        hide-serial
        hide-select
        :sort="sort"
        :sort-obj="sortObj"
        @table:sort="cell => $emit('table:sort', cell)"
      />
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
    rowCount: Number,
    hideSerial: util.props.Boolean,
    hideSelect: util.props.Boolean,
    selectStatus: Number,
    sortObj: util.props.Object,
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
