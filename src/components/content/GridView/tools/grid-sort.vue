<template>
  <b-popover
    for="SortPopover"
    set="bottom"
    title="Sort plus"
    icon="arrow-down-up"
    style="min-width: 400px"
  >
    <b-data-sort
      v-model="dataSort"
      :column="column"
      hide-header
      primary-key="field"
    />
  </b-popover>
</template>

<script>
import util from "@/components/util/index.js";

import BDataSort from '@/components/content/Data/b-data-sort.vue'
import BPopover from '@/components/base/Popover/b-popover.vue'

export default {
  name: 'GridSort',
  components: { BDataSort, BPopover },
  model: {
    prop: 'sort',
    event: 'sort:changed'
  },
  props: {
    sort: util.props.Array,
    column: util.props.Array,
  },
  data() {
    return {
      dataSort: this.sort,
    }
  },
  watch: {
    sort: {
      handler: function(value) {
        this.dataSort = value
      },
      deep: true,
    },
    dataSort: function(value) {
      // v-model
      this.$emit('sort:changed', value)
    },
  },
  methods: {
    done: function() {
      this.$emit('sort:done', this.dataSort)
    },
  },
}
</script>
