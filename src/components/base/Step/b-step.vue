<template>
  <div
    class="d-flex justify-content-between"
    :class="objClass"
  >
    <template v-for="(item, key) in list">
      <b-step-item
        :key="'item' + key"
        :set="set"
        :size="size"
        :title="getDisplay(item)"
        :info="item.info"
        :status="item.status"
        :select="isSelected(item)"
      >
        <template #item="{ color, title, select, info }">
          <slot
            name="item"
            :color="color"
            :title="title"
            :select="select"
            :info="info"
          />
        </template>
      </b-step-item>
      <div
        v-if="list.length -1 != key"
        :key="'line' + key"
        class="align-self-center w-100 round rounded-pill"
        :class="lineClass"
        style="height: 2px"
      />
    </template>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BStepItem from './Basic/b-step-item'

export default {
  name: 'BStep',
  components: { BStepItem, },
  mixins: [ util.mixins.select.check, ],
  props: {
    list: util.props.array,
    size: util.props.size,
    set: {
      ...util.props.set,
      default: 'end'
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
