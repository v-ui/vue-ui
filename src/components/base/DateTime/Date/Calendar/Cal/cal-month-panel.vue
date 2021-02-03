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

import CalPanelItem from '../Basic/cal-panel-item'
import PanelTable from "@/components/base/DateTime/Date/DatePicker/Basic/date-panel-table.vue"
import DatePanelTemp from "@/components/base/DateTime/Date/DatePicker/Basic/date-panel-temp.vue";

export default {
  name: 'cal-month-panel',
  components: { CalPanelItem, PanelTable, DatePanelTemp },
  mixins: [
    util.mixins.date.validator,
    util.mixins.date.date,
    util.mixins.date.weekList,
  ],
  mounted() {
    this.selectedValues = this.format()
  },
  methods: {
    click(value) {
      this.$emit('month2Week', value)
    },
  },
}
</script>
