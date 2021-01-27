
<template>
  <div :class="{ 'cannt-hide': range }">
    <year-panel
      v-if="pickerType === enumTypeStatus.year"
      :value="selectedValues"
      :class="{ 'cannt-hide': type !== enumTypeStatus.year }"
      :min="min"
      :max="max"
      :disabled="disabled"
      :hide-header="false"
      :range="type === enumTypeStatus.year && range"
      :selected-start="selectedStart"
      :selected-end="selectedEnd"
      @year:checked="yearChecked"
    />
    <quarter-panel
      v-if="pickerType === enumTypeStatus.quarter"
      v-model="selectedValues"
      :class="{ 'cannt-hide': type !== enumTypeStatus.quarter }"
      :min="min"
      :max="max"
      :disabled="disabled"
      :hide-header="false"
      :range="type === enumTypeStatus.quarter && range"
      :selected-start="selectedStart"
      :selected-end="selectedEnd"
      @quarter2Year="quarter2Year"
      @quarter:checked="quarterChecked"
    />
    <month-panel
      v-if="pickerType === enumTypeStatus.month"
      :value="selectedValues"
      :class="{ 'cannt-hide': type !== enumTypeStatus.month }"
      :min="min"
      :max="max"
      :disabled="disabled"
      :hide-header="false"
      :range="type === enumTypeStatus.month && range"
      :selected-start="selectedStart"
      :selected-end="selectedEnd"
      @month2Year="month2Year"
      @month:checked="monthChecked"
    />
    <week-panel
      v-if="pickerType === enumTypeStatus.week"
      v-model="selectedValues"
      :class="{ 'cannt-hide': type !== enumTypeStatus.week }"
      :min="min"
      :max="max"
      :disabled="disabled"
      :hide-header="false"
      :range="type === enumTypeStatus.week && range"
      :selected-start="selectedStart"
      :selected-end="selectedEnd"
      @week2Month="week2Month"
      @week:checked="weekChecked"
    />
    <date-panel
      v-if="pickerType === enumTypeStatus.date"
      :value="selectedValues"
      :class="{ 'cannt-hide': type !== enumTypeStatus.date }"
      :min="min"
      :max="max"
      :disabled="disabled"
      :hide-header="false"
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

import yearPanel from "./Panel/date-year-panel";
import monthPanel from "./Panel/date-month-panel";
import datePanel from "./Panel/date-date-panel";

import quarterPanel from './Panel/date-quarter-panel'
import weekPanel from './Panel/date-week-panel'

export default {
  name: "DatePanelSelect",
  components: { yearPanel, monthPanel, datePanel, quarterPanel, weekPanel },
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
    this.selectedValues = this.value
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
    month2Year: function (value) {
      if (value) this.selectedValues = this.formatDate(value && value.year())
      this.pickerType = this.enumTypeStatus.year;
    },
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
    date2Month: function (value) {
      if (value) this.selectedValues = this.formatDate(value.year(), value.month(), value.date())
      this.pickerType = this.enumTypeStatus.month;
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
    dateChecked: function (value) {
      if (value) this.selectedValues = this.formatDate(value.year(), value.month(), value.date())
    },
  },
};
</script>
