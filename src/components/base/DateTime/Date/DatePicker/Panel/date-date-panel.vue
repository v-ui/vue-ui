<template>
  <date-panel-temp
    :list="list"
    style="width: 18em;"
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
      <panel-tabel
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
import panelTabel from "@/components/base/DateTime/Date/DatePicker/Basic/date-panel-tabel.vue";

export default {
  name: "DateDatePanel",
  components: { DatePanelTemp, panelTabel },
  mixins: [
    util.mixins.date.select,
    util.mixins.date.validator,
    util.mixins.date.date,
  ],
};
</script>
