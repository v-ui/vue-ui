<template>
  <date-panel-temp
    v-model="date"
    style="max-width: 16em"
    :list="list"
    :col-count="colCount"
    :disabled="disabled"
    :disabled-now="disabledNow"
    :hide-header="hideHeader"
    :header-text="headerText"
    @panel:clickHeader="clickHeader"
    @panel:forward="forward"
    @panel:checknow="checknow"
    @panel:backward="backward"
    @panel:checked="checked"
  >
    <template #week>
      <panel-row
        class="border-bottom border-primary mb-1"
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
import panelRow from "@/components/base/DropdownPanel/b-dropdown-panel-row.vue";

export default {
  name: "DateDatePanel",
  components: { DatePanelTemp, panelRow },
  mixins: [util.mixins.date.date],
};
</script>
