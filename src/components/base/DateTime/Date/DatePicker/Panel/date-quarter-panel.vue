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
    <b-dropdown-menu
      :list="list"
      @item:click="checked"
    />
  </date-panel-temp>
</template>

<script>
import util from "@/components/util/index.js";

import DatePanelTemp from '../Basic/date-panel-temp.vue'
import BDropdownMenu from '@/components/base/Dropdown/b-dropdown-menu.vue'

export default {
  name: 'DateQuarterPanel',
  components: { DatePanelTemp, BDropdownMenu },
  mixins: [
    util.mixins.date.select,
    util.mixins.date.validator,
    util.mixins.date.quarter,
  ],
}
</script>
