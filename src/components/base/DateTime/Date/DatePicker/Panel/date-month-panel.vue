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
  </date-panel-temp>
</template>

<script>
import util from "@/components/util/index.js";

import DatePanelTemp from "../Basic/date-panel-temp.vue";

export default {
  name: "DateMonthPanel",
  components: { DatePanelTemp },
  mixins: [
    util.mixins.date.select,
    util.mixins.date.validator,
    util.mixins.date.month,
  ],
};
</script>
