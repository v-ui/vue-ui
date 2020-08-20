<template>
  <date-panel
    :list="list"
    :col-count="colCount"
    :disabled="disabled"
    :disabled-now="disabledNow"
    :hide-header="hideHeader"
    :header-text="headerText"
    @panel:forward="forward"
    @panel:checknow="checknow"
    @panel:backward="backward"
    @panel:checked="checked"
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
