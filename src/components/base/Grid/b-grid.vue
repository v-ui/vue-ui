<template>
  <b-grid-row
    v-if="type === row"
  >
    <template #item={ item, disabled }>
      <slot name="item" :item="item" :disabled="disabled" />
    </template>
  </b-grid-row>
  <b-grid-row
    v-else
  >
    <template #item={ item, disabled }>
      <slot name="item" :item="item" :disabled="disabled" />
    </template>
  </b-grid-row>
</template>

<script>
import util from "@/components/util/index.js";

import BGridRow from './b-grid-row.vue'
import BGridTable from './b-grid-table.vue'
export default {
  name: 'b-grid',
  components: { BGridRow, BGridTable, },
  mixins: [ util.mixins.select.select, ],
  props: {
    type: {
      type: String,
      default: 'row',
      validator: value => ['row', 'table'].includes(value),
    },
    colCount: util.props.UInt,
    border: util.props.Boolean,
    disabled: util.props.Boolean,
  },
}
</script>
