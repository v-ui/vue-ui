<template>
  <date-panel
    v-model="date"
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
      <picker-row
        class="border-bottom border-primary mb-1"
        :list="weekList"
        :col-count="colCount"
        disabled
      />
    </template>
  </date-panel>
</template>

<script>
import util from "@/components/util/index.js";

import DatePanel from "../Basic/date-panel";
import pickerRow from "@/components/base/Bootstrap/DropdownPanel/b-dropdown-panel-row.vue";

export default {
  name: "date-date-panel",
  components: { DatePanel, pickerRow },
  mixins: [util.mixins.date.date],
};
</script>
