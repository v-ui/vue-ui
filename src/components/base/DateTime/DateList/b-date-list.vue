<template>
  <date-time-list
    v-if="['hour', 'minute', 'second'].includes(this.local)"
    :local="local"
    :step="step"
    :min="min"
    :max="max"
  />
  <date-local-list
    v-else
    :local="local"
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
  mixins: [ util.mixins.date.localType ],

}
</script>
