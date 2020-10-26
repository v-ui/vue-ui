<template>
  <div class="d-flex justify-content-between" :class="objClass">
    <template v-for="(item, key) in list">
      <b-step-item
        :key="key"
        :set="set"
        :size="size"
        :title="item.title"
        :info="item.info"
        :status="item.status"
        :active="item.active"
      />
      <div v-if="list.length -1 != key" :key="key" class="align-self-center w-100 round rounded-pill" :class="lineClass" style="height: 1px" />
    </template>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BStepItem from './Basic/b-step-item'

export default {
  name: 'b-step',
  components: { BStepItem, },
  props: {
    list: util.props.array,
    size: util.props.size,
    set: {
      ...util.props.set,
      default: 'right'
    },
    column: util.props.Boolean,
  },
  computed: {
    objClass: function() {
      let column = ''
      if (this.column) column = 'flex-column'
      return `${column} `
    },
    lineClass: function() {
      if (this.column) {
        return 'bg-secondary'
      } else {
        return 'bg-primary'
      }
    },
  },
}
</script>
