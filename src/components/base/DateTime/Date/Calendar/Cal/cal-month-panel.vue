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
      <b-dropdown-panel-table
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
        @item:click="monthChecked"
      />
    </template>
  </date-panel-temp>
</template>

<script>
import util from "@/components/util/index.js";

import CalPanelItem from '../Basic/cal-panel-item'
import DatePanelTemp from "@/components/base/DateTime/Date/DatePicker/Basic/date-panel-temp.vue";
import BDropdownPanelTable from "@/components/base/DropdownPanel/Basic/b-dropdown-panel-table.vue"

export default {
  name: 'cal-month-panel',
  components: { CalPanelItem, BDropdownPanelTable, DatePanelTemp },
  mixins: [
    util.mixins.date.validator,
    util.mixins.date.date,
    util.mixins.date.weekList,
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
