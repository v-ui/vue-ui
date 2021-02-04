
<template>
  <div :class="{ 'cannt-hide': range }">
    <date-year-panel
      v-if="pickerType === enumTypeStatus.year"
      v-model="selectedValues"
      :class="{ 'cannt-hide': type !== enumTypeStatus.year }"
      :min="min"
      :max="max"
      :disabled="disabled"
      :hide-header="hideHeader"
      :range="type === enumTypeStatus.year && range"
      :selected-start="selectedStart"
      :selected-end="selectedEnd"
      @year:checked="yearChecked"
    />
    <date-quarter-panel
      v-if="pickerType === enumTypeStatus.quarter"
      v-model="selectedValues"
      :class="{ 'cannt-hide': type !== enumTypeStatus.quarter }"
      :min="min"
      :max="max"
      :disabled="disabled"
      :hide-header="hideHeader"
      :range="type === enumTypeStatus.quarter && range"
      :selected-start="selectedStart"
      :selected-end="selectedEnd"
      @quarter2Year="quarter2Year"
      @quarter:checked="quarterChecked"
    />
    <date-month-panel
      v-if="pickerType === enumTypeStatus.month"
      v-model="selectedValues"
      :class="{ 'cannt-hide': type !== enumTypeStatus.month }"
      :min="min"
      :max="max"
      :disabled="disabled"
      :hide-header="hideHeader"
      :range="type === enumTypeStatus.month && range"
      :selected-start="selectedStart"
      :selected-end="selectedEnd"
      @month2Year="month2Year"
      @month:checked="monthChecked"
    />
    <date-week-panel
      v-if="pickerType === enumTypeStatus.week"
      v-model="selectedValues"
      :class="{ 'cannt-hide': type !== enumTypeStatus.week }"
      :min="min"
      :max="max"
      :disabled="disabled"
      :hide-header="hideHeader"
      :range="type === enumTypeStatus.week && range"
      :selected-start="selectedStart"
      :selected-end="selectedEnd"
      @week2Month="week2Month"
      @week:checked="weekChecked"
    />
    <date-date-panel
      v-if="pickerType === enumTypeStatus.date"
      v-model="selectedValues"
      :class="{ 'cannt-hide': type !== enumTypeStatus.date }"
      :min="min"
      :max="max"
      :disabled="disabled"
      :hide-header="hideHeader"
      :range="type === enumTypeStatus.date && range"
      :selected-start="selectedStart"
      :selected-end="selectedEnd"
      @date2Month="date2Month"
      @date:checked="dateChecked"
    />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import DateYearPanel from "./Panel/date-year-panel";
import DateMonthPanel from "./Panel/date-month-panel";
import DateDatePanel from "./Panel/date-date-panel";

import DateQuarterPanel from './Panel/date-quarter-panel'
import DateWeekPanel from './Panel/date-week-panel'

export default {
  name: "DatePanelPanel",
  components: { DateYearPanel, DateMonthPanel, DateDatePanel, DateQuarterPanel, DateWeekPanel },
  mixins: [
    util.mixins.date.type,
    util.mixins.date.base,
    util.mixins.date.select,
    util.mixins.form.readonly,
  ],
  computed: {
    canHide: function () {
      return this.type === this.pickerType;
    },
    selectedValuesIsValid: function () {
      return this.selectedValues && this.selectedValues.isValid && this.selectedValues.isValid()
    },
  },
  mounted() {
    if (this.value) this.selectedValues = this.moment(this.value)
  },
  methods: {
    formatDate: function(
      year = this.selectedValuesIsValid ? this.selectedValues.year() : 0,
      month = this.selectedValuesIsValid ? this.selectedValues.month() : 0,
      date = this.selectedValuesIsValid ? this.selectedValues.date() : 1
    ) {
      return this.moment([year, month, date])
    },
    // year
    yearChecked: function (value) {
      this.selectedValues = this.formatDate(value.year())
      if (this.canHide) return;
      this.pickerType = this.type === this.enumTypeStatus.quarter ? this.enumTypeStatus.quarter : this.enumTypeStatus.month;
    },
    // quarter
    quarter2Year: function(value) {
      if (value) this.selectedValues = this.formatDate(value.year(), value.month(), 1)
      this.pickerType = this.enumTypeStatus.year;
    },
    quarterChecked: function(value) {
      this.selectedValues = this.formatDate(value.year(), value.month(), 1)
      if (this.canHide) return
      this.pickerType = this.enumTypeStatus.quarter
    },
    // month
    month2Year: function (value) {
      if (value) this.selectedValues = this.formatDate(value.year())
      this.pickerType = this.enumTypeStatus.year;
    },
    monthChecked: function (value) {
      this.selectedValues = this.formatDate(value.year(), value.month())
      if (this.canHide) return;
      this.pickerType = this.type === this.enumTypeStatus.week ? this.enumTypeStatus.week : this.enumTypeStatus.date;
    },
    // week
    week2Month: function(value) {
      if (value) this.selectedValues = this.formatDate(value.year(), value.month(), 1)
      this.pickerType = this.enumTypeStatus.month;
    },
    weekChecked: function(value) {
      this.selectedValues = this.formatDate(value.year(), value.month(), 1)
      if (this.canHide) return
      this.pickerType = this.enumTypeStatus.week
    },
    // date
    date2Month: function (value) {
      if (value) this.selectedValues = this.formatDate(value.year(), value.month(), value.date())
      this.pickerType = this.enumTypeStatus.month;
    },
    dateChecked: function (value) {
      if (value) this.selectedValues = this.formatDate(value.year(), value.month(), value.date())
    },
  },
};
</script>
