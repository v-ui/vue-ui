<template>
  <div :class="{ 'date-panel-cannt-hide': range }">
    <year-panel
      v-if="pickertType === enumTypeStatus.year"
      :value="selectedValues"
      :class="{ 'date-panel-cannt-hide': type !== enumTypeStatus.year }"
      style="min-width: 18em"
      :min="min"
      :max="max"
      :disabled="disabled"
      :hide-header="false"
      :range="type === enumTypeStatus.year && range"
      :selectedStart="selectedStart"
      :selectedEnd="selectedEnd"
      @year:checked="yearChecked"
    />
    <month-panel
      v-if="pickertType === enumTypeStatus.month"
      :value="selectedValues"
      :class="{ 'date-panel-cannt-hide': type !== enumTypeStatus.month }"
      style="min-width: 15em"
      :min="min"
      :max="max"
      :disabled="disabled"
      :hide-header="false"
      :range="type === enumTypeStatus.month && range"
      :selectedStart="selectedStart"
      :selectedEnd="selectedEnd"
      @month2Year="month2Year"
      @month:checked="monthChecked"
    />
    <date-panel
      v-if="pickertType === enumTypeStatus.date"
      :value="selectedValues"
      :class="{ 'date-panel-cannt-hide': type !== enumTypeStatus.date }"
      style="min-width: 22em"
      :min="min"
      :max="max"
      :disabled="disabled"
      :hide-header="false"
      :range="type === enumTypeStatus.date && range"
      :selectedStart="selectedStart"
      :selectedEnd="selectedEnd"
      @date2Month="date2Month"
      @date:checked="dateChecked"
    />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import yearPanel from "../Panel/date-year-panel";
import monthPanel from "../Panel/date-month-panel";
import datePanel from "../Panel/date-date-panel";

export default {
  name: "date-panel-select",
  components: { yearPanel, monthPanel, datePanel },
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
      validator: (value) => ["year", "month", "date"].includes(value),
    },
    value: {
      type: [String, Number, Date, Object],
      default: () => new Date(),
    },
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
    formatDate: function(year = this.selectedValues.year(), month = this.selectedValues.month(), date = this.selectedValues.date()) {
      return this.moment([year, month, date])
    },
    month2Year: function (value) {
      this.selectedValues = this.formatDate(value.year(), value.month())
      this.pickertType = this.enumTypeStatus.year;
    },
    yearChecked: function (value) {
      this.selectedValues = this.formatDate(value.year())
      if (this.canHide) return;
      this.pickertType = this.enumTypeStatus.month;
    },
    date2Month: function (value) {
      this.selectedValues = this.formatDate(value.year(), value.month(), value.date())
      this.pickertType = this.enumTypeStatus.month;
    },
    monthChecked: function (value) {
      this.selectedValues = this.formatDate(value.year(), value.month())
      if (this.canHide) return;
      this.pickertType = this.enumTypeStatus.date;
    },
    dateChecked: function (value) {
      this.selectedValues = this.formatDate(value.year(), value.month(), value.date())
    },
  },
};
</script>
