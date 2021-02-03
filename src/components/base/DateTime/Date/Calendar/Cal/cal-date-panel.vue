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
    <template #item="{ item }">
      <cal-panel-item
        :item="item"
        :year="year"
        :month="month"
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
  mounted() {
    this.selectedValues = this.format()
  },
  methods: {
    clickHeader: function() {
      this.$emit("date2Month", this.selectedValues)
    },
    forward: function() {
      this.initValue(this.format().subtract(1, 'day'))
    },
    backward: function() {
      this.initValue(this.format().add(1, 'day'))
    },
  },
}
</script>
