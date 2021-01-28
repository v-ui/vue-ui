<template>
  <date-panel-temp
    :list="list"
    style="width: 16em"
    :col-count="colCount"
    :disabled="disabled"
    :disabled-now="disabledNow"
    :hide-header="hideHeader"
    :header-text="headerText"
    :diesable-header-click="true"
    @panel:forward="forward"
    @panel:checknow="checknow"
    @panel:backward="backward"
    @panel:checked="checked"
  />
</template>

<script>
import util from "@/components/util/index.js";

import DatePanelTemp from "../Basic/date-panel-temp.vue";

export default {
  name: "DateYearPanel",
  components: { DatePanelTemp },
  mixins: [
    util.mixins.date.select,
    util.mixins.date.validator,
    util.mixins.date.year,
  ],
};
</script>
