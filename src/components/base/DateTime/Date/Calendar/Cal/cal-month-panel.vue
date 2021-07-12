<template>
  <date-panel-temp
    :list="list"
    border
    class="h-100"
    style="min-width: 66em;"
    show-week
    :col-count="colCount"
    :hide-header="hideHeader"
    :header-text="headerText"
    @panel:clickHeader="clickHeader"
    @panel:forward="forward"
    @panel:checknow="checknow"
    @panel:backward="backward"
    @panel:checked="checked"
  >
    <template #item="{ item }">
      <cal-panel-item
        :item="item"
        :year="year"
        :month="month"
        @item:click="monthChecked"
      />
    </template>
  </date-panel-temp>
</template>

<script>
import util from "@/components/util/index.js";

import CalPanelItem from '../Basic/cal-panel-item'
import DatePanelTemp from "@/components/base/DateTime/Date/DatePicker/Basic/date-panel-temp.vue";

export default {
  name: 'CalMonthPanel',
  components: { CalPanelItem, DatePanelTemp },
  mixins: [
    util.mixins.date.validator,
    util.mixins.date.date,
  ],
  methods: {
    clickHeader: function() {
      this.$emit("month2Year", this.format(this.year, this.month, this.date))
    },
    monthChecked(value) {
      this.$emit('month:checked', this.format(this.year, this.month, value))
    },
  },
}
</script>
