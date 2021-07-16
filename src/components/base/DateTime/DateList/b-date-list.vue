<template>
  <date-time-list
    v-if="['hour', 'minute', 'second'].includes(this.type)"
    v-model="selectedValue"
    :type="type"
    :step="step"
    :min="min"
    :max="max"
  />
  <date-local-list
    v-else
    v-model="selectedValue"
    :type="type"
    :min="min"
    :max="max"
  />
</template>

<script>
import util from "@/components/util/index.js";

import DateLocalList from './List/date-local-list.vue'
import DateTimeList from './List/date-time-list.vue'
export default {
  name: 'BDateList',
  components: { DateLocalList, DateTimeList, },
  mixins: [
    util.mixins.date.localType,
    util.mixins.select.select,
  ],

}
</script>
