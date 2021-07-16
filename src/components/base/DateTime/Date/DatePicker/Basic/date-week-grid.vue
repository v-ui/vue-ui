<template>
  <b-grid-table
    class="border-bottom border-primary font-weight-bolder mb-1"
    :list="list"
    :col-count="colCount"
    :disabled="disabled"
  />
</template>

<script>
import util from "@/components/util/index.js";

import BGridTable from "@/components/base/Grid/b-grid-table.vue";

export default {
  name: 'DateWeekGrid',
  components: { BGridTable, },
  mixins: [ util.mixins.date.local, ],
  props: {
    colCount: {
      ...util.props.UInt,
      default: 7,
    },
    disabled: util.props.Boolean,
  },
}
</script>
