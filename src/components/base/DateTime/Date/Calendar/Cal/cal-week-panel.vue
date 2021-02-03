<template>
  <date-panel-temp
    :list="list"
    border
    style="min-width: 65em;"
    :col-count="colCount"
    :hide-header="hideHeader"
    :header-text="headerText"
    :diesable-header-click="true"
    @panel:forward="forward"
    @panel:checknow="checknow"
    @panel:backward="backward"
    @panel:checked="checked"
  >
    <template #week>
      <panel-table
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
        @click.native="click"
      />
    </template>
  </date-panel-temp>
</template>

<script>
import util from "@/components/util/index.js";

import CalPanelItem from '../Basic/'
import PanelTable from "@/components/base/DateTime/Date/DatePicker/Basic/date-panel-table.vue"
import DatePanelTemp from "@/components/base/DateTime/Date/DatePicker/Basic/date-panel-temp.vue";

export default {
  name: 'cal-week-panel',
  components: { CalPanelItem, PanelTable, DatePanelTemp },
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
  mounted() {
    this.selectedValues = this.format()
  },
  methods: {
    clickHeader: function() {
      this.$emit("date2Month", this.selectedValues)
    },
    forward: function() {
      this.initValue(this.format().subtract(1, 'week'))
    },
    backward: function() {
      this.initValue(this.format().add(1, 'week'))
    },
    click(value) {
      this.$emit('week2Date', value)
    },
  },
}
</script>
