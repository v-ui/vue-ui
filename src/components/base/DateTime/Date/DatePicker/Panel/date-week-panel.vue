<template>
  <date-panel-temp
    :list="list"
    style="min-width: 16em;"
    :disabled="disabled"
    :disabled-now="disabledNow"
    :hide-header="hideHeader"
    :header-text="headerText"
    :hide-controller="calendar"
    @panel:clickHeader="clickHeader"
    @panel:forward="forward"
    @panel:checknow="checknow"
    @panel:backward="backward"
  >
    <template #header>
      <slot name="header" />
    </template>
    <date-list-item
      v-for="(item, index) in list"
      :key="index"
      :item="item"
      :disabled="disabled"
      @item:click="checked"
    />
  </date-panel-temp>
</template>

<script>
import util from "@/components/util/index.js";

import DatePanelTemp from '../Basic/date-panel-temp.vue'
import DateListItem from '../Basic/date-list-item.vue'

export default {
  name: 'DateWeekPanel',
  components: { DatePanelTemp, DateListItem, },
  mixins: [
    util.mixins.date.select,
    util.mixins.date.validator,
    util.mixins.date.week,
  ],
}
</script>
