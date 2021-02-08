<template>
  <date-panel-temp
    :list="list"
    style="min-width: 16em;"
    :col-count="colCount"
    :disabled="disabled"
    :disabled-now="disabledNow"
    :hide-header="hideHeader"
    :header-text="headerText"
    :hide-controller="calendar"
    @panel:clickHeader="clickHeader"
    @panel:forward="forward"
    @panel:checknow="checknow"
    @panel:backward="backward"
    @panel:checked="checked"
  >
    <template #header>
      <slot name="header" />
    </template>
    <template #week>
      <b-dropdown-panel-table
        class="border-bottom border-primary font-weight-bolder mb-1"
        :list="weekList"
        :col-count="colCount"
        disabled
      />
    </template>
  </date-panel-temp>
</template>

<script>
import util from "@/components/util/index.js";

import DatePanelTemp from "../Basic/date-panel-temp";
import BDropdownPanelTable from "@/components/base/DropdownPanel/Basic/b-dropdown-panel-table.vue";


export default {
  name: "DateDatePanel",
  components: { DatePanelTemp, BDropdownPanelTable },
  mixins: [
    util.mixins.date.select,
    util.mixins.date.validator,
    util.mixins.date.date,
    util.mixins.date.weekList,
  ],
};
</script>
