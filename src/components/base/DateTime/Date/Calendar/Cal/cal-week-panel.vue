<template>
  <date-panel-temp
    :list="list"
    border
    class="h-100"
    style="min-width: 66em;"
    :col-count="colCount"
    :hide-header="hideHeader"
    :header-text="headerText"
    @panel:clickHeader="clickHeader"
    @panel:forward="forward"
    @panel:checknow="checknow"
    @panel:backward="backward"
    @panel:checked="checked"
  >
    <template #week>
      <b-grid-table
        class="border-bottom border-primary font-weight-bolder mb-1"
        :list="weekList"
        :col-count="colCount"
        disabled
      />
    </template>
    <template #item="{ item }">
      <cal-panel-item
        :item="item"
        :year="year"
        :month="month"
        @item:click="weekChecked"
      />
    </template>
  </date-panel-temp>
</template>

<script>
import util from "@/components/util/index.js";

import CalPanelItem from '../Basic/cal-panel-item'
import DatePanelTemp from "@/components/base/DateTime/Date/DatePicker/Basic/date-panel-temp.vue";
import BGridTable from "@/components/base/Grid/b-grid-table.vue"

export default {
  name: 'CalWeekPanel',
  components: { CalPanelItem, BGridTable, DatePanelTemp },
  mixins: [
    util.mixins.date.validator,
    util.mixins.date.date,
    util.mixins.date.weekList,
  ],
  computed: {
    total: function() {
      return 7
    },
    list: function() {
      if (!this.year || isNaN(this.year)) return
      if (isNaN(this.month) || this.month < 0 ) return

      let arr = []
      let date = this.format().startOf('week').subtract(1, 'day')
      let end = this.format().endOf('week').subtract(1, 'day')

      while(date.isBefore(end)) {
        arr.push({
          value: date.date(),
          label: date.format("DD"),
          status: this.validator && this.validator(date),
          disabled: this.disabledItem && this.disabledItem(date),
        });
        date.add(1, 'day')
      }

      return arr
    },
  },
  methods: {
    clickHeader: function() {
      this.$emit("week2Month", this.format(this.year, this.month, this.date))
    },
    forward: function() {
      this.initValue(this.format().subtract(1, 'week'))
    },
    backward: function() {
      this.initValue(this.format().add(1, 'week'))
    },
    weekChecked(value) {
      this.$emit('week:checked', this.format(this.year, this.month, value))
    },
  },
}
</script>
