<template>
  <date-panel
    v-model="month"
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
  />
</template>

<script>
// import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import DatePanel from '@/components/base/Bootstrap/DateTime/Date/DatePicker/date-panel.vue'

export default {
  name: "date-month-picker",
  components: { DatePanel },
  mixins: [ util.mixins.date.month, ],
  // model: {
  //   prop: "value",
  //   event: "change"
  // },
  // props: {
  //   value: {
  //     type: [String, Number, Date],
  //     default: () =>
  //       new Date(
  //         new Date().getFullYear() +
  //           "-" +
  //           tools.string.padStart(new Date().getMonth()),
  //         2
  //       )
  //   },
  //   min: Date,
  //   max: Date,
  //   hideHeader: util.props.Boolean,
  //   disabled: util.props.Boolean,
  // },
  // data() {
  //   return {
  //     total: 12,
  //     colCount: 3,
  //     selectValue: null,
  //     year: null,
  //     month: null
  //   };
  // },
  // computed: {
  //   now: () => new Date(),
  //   headerText: function() {
  //     return this.year;
  //   },
  //   lists: function() {
  //     if (!this.year || isNaN(this.year)) return;
  //     let arrs = [];
  //      for (let i = 0; i < this.total; i++) {
  //         let value = 0 + i
  //       const d = new Date(this.selectValue);
  //       const selectYeaer = d.getFullYear();
  //       const selectMonth = d.getMonth();
  //         let date = new Date(this.formatMonth(this.year, value));
  //         arrs.push({
  //           value: value,
  //           label: tools.string.padStart(value + 1, 2),
  //           selected: value == selectMonth && selectYeaer == this.year,
  //           disabled: date < this.min || date > this.max
  //         });
  //      }
  //     return arrs;
  //   }
  // },
  // mounted() {
  //   this.year = this.value.getFullYear && this.value.getFullYear();
  //   this.month = this.value.getMonth && this.value.getMonth();
  //   this.selectValue = this.formatMonth(this.year, this.month);
  // },
  // methods: {
  //   clickHeader: function() {
  //     this.$emit("month2Year", this.date);
  //   },
  //   forward: function() {
  //     this.year -= 1;
  //   },
  //   checknow: function() {
  //     this.year = this.now.getFullYear();
  //     this.month = this.now.getMonth();
  //     this.selectValue = this.formatMonth(this.year, this.month);
  //   },
  //   backward: function() {
  //     this.year += 1;
  //   },
  //   formatMonth: function(year, month) {
  //     return new Date(year + "-" + tools.string.padStart(Number(month + 1), 2));
  //   }
  // },
  // watch: {
  //   selectValue: function(value) {
  //     // 配合 v-model 工作
  //     this.$emit("change", value);
  //   }
  // }
};
</script>
