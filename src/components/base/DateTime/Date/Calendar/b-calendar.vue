<template>
  <div class="m-1 h-100">
    <div class="d-flex justify-content-center">
      <b-radio-button-group
        v-model="pickerType"
        class="d-flex justify-content-center w-25"
        name="picker-type"
        :list="typeList"
        size="sm"
      />
    </div>
    <cal-year-panel
      v-if="pickerType === enumTypeStatus.year"
      calendar
      :value="selectedValue"
      @year:checked="yearChecked"
    />
    <cal-month-panel
      v-if="pickerType === enumTypeStatus.month"
      calendar
      :value="selectedValue"
      @month2Year="month2Year"
      @month:checked="monthChecked"
    />
    <cal-week-panel
      v-if="pickerType === enumTypeStatus.week"
      calendar
      :value="selectedValue"
      @week2Month="week2Month"
      @week:checked="weekChecked"
    />
    <cal-date-panel
      v-if="pickerType === enumTypeStatus.date"
      calendar
      :value="selectedValue"
      @date2Week="date2Week"
      @date:checked="dateChecked"
    />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import CalYearPanel from './Cal/cal-year-panel'
import CalMonthPanel from './Cal/cal-month-panel'
import CalWeekPanel from './Cal/cal-week-panel'
import CalDatePanel from './Cal/cal-date-panel'
import BRadioButtonGroup from "@/components/form/Radio/b-radio-button-group.vue";
export default {
  name: 'BCalendar',
  components: { CalYearPanel, CalMonthPanel, CalWeekPanel, CalDatePanel, BRadioButtonGroup },
  mixins: [
    util.mixins.date.type,
    util.mixins.date.base,
    util.mixins.form.readonly,
  ],
  data() {
    return {
      typeList: [],
    }
  },
  mounted() {
    this.typeList = [
      { value: this.enumTypeStatus.year, label: '年', },
      { value: this.enumTypeStatus.month, label: '月', },
      { value: this.enumTypeStatus.week, label: '周', },
      { value: this.enumTypeStatus.date, label: '日', },
    ],
    this.selectedValue = this.moment(this.value)
  },
  watch: {
    pickerType: function() {

    },
  },
  methods: {
    // year
    yearChecked: function (value) {
      this.selectedValue = value
      if (this.canHide) return;
      this.pickerType = this.enumTypeStatus.month;
    },
    // month
    month2Year: function (value) {
      if (value) this.selectedValue = value
      this.pickerType = this.enumTypeStatus.year;
    },
    monthChecked: function (value) {
      this.selectedValue = value
      if (this.canHide) return;
      this.pickerType = this.enumTypeStatus.week;
    },
    // week
    week2Month: function (value) {
      if (value) this.selectedValue = value
      this.pickerType = this.enumTypeStatus.month;
    },
    weekChecked: function(value) {
      this.selectedValue = value
      if (this.canHide) return
      this.pickerType = this.enumTypeStatus.date
    },
    // date
    date2Week: function(value) {
      if (value) this.selectedValue = value
      this.pickerType = this.enumTypeStatus.week;
    },
    dateChecked: function (value) {
      if (value) this.selectedValue = value
    },
  },
}
</script>
