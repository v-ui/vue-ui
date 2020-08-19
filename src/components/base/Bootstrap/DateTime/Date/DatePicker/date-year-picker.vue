<template>
  <date-panel
    v-model="selected"
    :total="total"
    :col-count="colCount"
    :min="min"
    :max="max"
    :list="list"
    :disabled="disabled"
    :hide-header="hideHeader"
    :hearder-text="headerText"
    @panel:forward="forward"
    @panel:checknow="checknow"
    @panel:backward="backward"
  />
</template>

<script>
import util from "@/components/util/index.js"

import DatePanel from '@/components/base/Bootstrap/DateTime/Date/DatePicker/date-panel.vue'

export default {
  name: "date-year-picker",
  components: { DatePanel, },
  mixins: [ util.mixins.date.year, ],
};
</script>
