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
    <template #item="{ item }">
      <cal-panel-item
        :item="item"
        :year="year"
        :month="month"
        @dateChecked="dateChecked(year, month, item.value)"
      />
    </template>
  </date-panel-temp>
</template>

<script>
import util from "@/components/util/index.js";

import CalPanelItem from '../Basic/cal-panel-item'
import DatePanelTemp from "@/components/base/DateTime/Date/DatePicker/Basic/date-panel-temp.vue";

export default {
  name: 'cal-date-panel',
  components: { CalPanelItem, DatePanelTemp },
  mixins: [
    util.mixins.date.validator,
    util.mixins.date.date,
  ],
  computed: {
    total: function() {
      return 1
    },
    list: function() {
      if (!this.year || isNaN(this.year)) return
      if (isNaN(this.month) || this.month < 0 ) return

      let date = this.format()
      let arr = [{
        value: date.date(),
        label: date.format("DD"),
        status: this.validator && this.validator(date),
        disabled: this.disabledItem && this.disabledItem(date),
      }]

      return arr
    },
  },
  methods: {
    clickHeader: function() {
      this.$emit("date2Week", this.format(this.year, this.month, this.date))
    },
    forward: function() {
      this.initValue(this.format().subtract(1, 'day'))
    },
    backward: function() {
      this.initValue(this.format().add(1, 'day'))
    },
    dateChecked: function(year, month, date) {
      this.$$emit('date:checked', this.format(year, month, date))
    },
  },
}
</script>
