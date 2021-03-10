<template>
  <date-panel-temp
    :list="list"
    class="h-100"
    style="min-width: 66em"
    :col-count="colCount"
    :hide-header="hideHeader"
    :header-text="headerText"
    :diesable-header-click="true"
    @panel:forward="forward"
    @panel:checknow="checknow"
    @panel:backward="backward"
    @panel:checked="checked"
  >
    <template #item="{ item }">
      <date-date-panel
        calendar
        class="h-100 p-3 m-1"
        :value="format(year, item.value)"
        @date:checked="dateChecked"
      >
        <template #header>
          <p class="h6 text-primary">{{ moment([year, item.value, 1]).format("MMMM") }}</p>
        </template>
      </date-date-panel>
    </template>
  </date-panel-temp>
</template>

<script>
import util from "@/components/util/index.js";

import DatePanelTemp from "@/components/base/DateTime/Date/DatePicker/Basic/date-panel-temp.vue";
import DateDatePanel from '@/components/base/DateTime/Date/DatePicker/Panel/date-date-panel.vue';

export default {
  name: 'CalYearPanel',
  components: { DatePanelTemp, DateDatePanel, },
  mixins: [
    util.mixins.date.validator,
    util.mixins.date.month,
  ],
  data() {
    return {
      colCount: 4,
    }
  },
  methods: {
    dateChecked(value) {
      this.$emit('year:checked', value)
    },
  },
}
</script>
