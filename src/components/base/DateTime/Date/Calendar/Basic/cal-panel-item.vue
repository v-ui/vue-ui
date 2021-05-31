<template>
  <div
    class="d-flex flex-column h-100"
    style="min-width: 9em"
  >
    <div
      v-if="item.value"
      class="d-flex align-middle p-1 w-100 h5"
    >
      <div
        v-if="item.value === 1"
        class="my-1"
      >
        {{ moment([year, month, item.value]).format("MMMM") }}
      </div>
      <date-panel-item
        :item="item"
        class="ml-1 mr-auto"
        @item:click="$emit('item:click', item.value)"
      />
      <div class="my-1" />
    </div>
    <div
      v-if="item.value"
      class="h-100"
    >
      <slot
        name="list"
        :year="year"
        :month="month"
        :date="item.value"
      />
    </div>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import DatePanelItem from "@/components/base/DateTime/Date/DatePicker/Basic/date-panel-item.vue"
export default {
  name: 'CalPanelItem',
  components: { DatePanelItem },
  mixins: [ util.mixins.moment.base, ],
  props: {
    item: util.props.Object,
    year: util.props.UInt,
    month: util.props.UInt,
  },
}
</script>
