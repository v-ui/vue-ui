
<template>
  <div :class="{ 'cannt-hide': range }">
    <year-panel
      v-if="pickertType === enumTypeStatus.year"
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
      v-if="pickertType === enumTypeStatus.quarter"
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
      v-if="pickertType === enumTypeStatus.month"
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
      v-if="pickertType === enumTypeStatus.week"
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
      v-if="pickertType === enumTypeStatus.date"
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
    util.mixins.moment.base,
    util.mixins.form.readonly,
    util.mixins.date.status.type,
  ],
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    type: {
      type: String,
      default: "date",
      validator: (value) => ["year", "quarter", "month", "week", "date"].includes(value),
    },
    value: [String, Number, Date, Object],
    min: [String, Date, Object],
    max: [String, Date, Object],
    range: util.props.Boolean,
    selectedStart: [String, Number, Date, Object],
    selectedEnd: [String, Number, Date, Object],
  },
  data() {
    return {
      pickertType: "",
      selectedValues: null,
    };
  },
  computed: {
    canHide: function () {
      return this.type === this.pickertType;
    },
    selectedValuesIsValid: function () {
      return this.selectedValues && this.selectedValues.isValid && this.selectedValues.isValid()
    },
  },
  watch: {
    value: function (value) {
      this.selectedValues = value
    },
    selectedValues: function (value) {
      // 配合 v-model 工作
      this.$emit("change", value);
    },
  },
  mounted() {
    this.pickertType = this.type;
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
      this.selectedValues = this.formatDate(value.year(), value.month())
      this.pickertType = this.enumTypeStatus.year;
    },
    yearChecked: function (value) {
      this.selectedValues = this.formatDate(value.year())
      if (this.canHide) return;
      this.pickertType = this.type === this.enumTypeStatus.quarter ? this.enumTypeStatus.quarter : this.enumTypeStatus.month;
    },
    // quarter
    quarter2Year: function(value) {
      if (value) this.selectedValues = this.formatDate(value.year(), value.month(), 1)
      this.pickertType = this.enumTypeStatus.year;
    },
    quarterChecked: function(value) {
      this.selectedValues = this.formatDate(value.year(), value.month(), 1)
      if (this.canHide) return
      this.pickertType = this.enumTypeStatus.quarter
    },
    // month
    date2Month: function (value) {
      this.selectedValues = this.formatDate(value.year(), value.month(), value.date())
      this.pickertType = this.enumTypeStatus.month;
    },
    monthChecked: function (value) {
      this.selectedValues = this.formatDate(value.year(), value.month())
      if (this.canHide) return;
      this.pickertType = this.type === this.enumTypeStatus.week ? this.enumTypeStatus.week : this.enumTypeStatus.date;
    },
    // week
    week2Month: function(value) {
      if (value) this.selectedValues = this.formatDate(value.year(), value.month(), 1)
      this.pickertType = this.enumTypeStatus.month;
    },
    weekChecked: function(value) {
      this.selectedValues = this.formatDate(value.year(), value.month(), 1)
      if (this.canHide) return
      this.pickertType = this.enumTypeStatus.week
    },
    // date
    dateChecked: function (value) {
      this.selectedValues = this.formatDate(value.year(), value.month(), value.date())
    },
  },
};
</script>