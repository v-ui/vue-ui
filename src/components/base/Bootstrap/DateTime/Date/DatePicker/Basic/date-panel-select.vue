<template>
  <div>
    <year-panel
      v-if="pickertType === enumTypeStatus.year"
      v-model="selectedValue"
      :class="{ 'date-panel-cannt-hide': type !== enumTypeStatus.year }"
      style="min-width: 18em"
      :min="min"
      :max="max"
      :disabled="disabled"
      :hide-header="false"
      @year:checked="yearChecked"
    />
    <month-panel
      v-if="pickertType === enumTypeStatus.month"
      v-model="selectedValue"
      :class="{ 'date-panel-cannt-hide': type !== enumTypeStatus.month }"
      style="min-width: 15em"
      :min="min"
      :max="max"
      :disabled="disabled"
      :hide-header="false"
      @month2Year="month2Year"
      @month:checked="monthChecked"
    />
    <date-panel
      v-if="pickertType === enumTypeStatus.date"
      v-model="selectedValue"
      :class="{ 'date-panel-cannt-hide': type !== enumTypeStatus.date }"
      style="min-width: 22em"
      :min="min"
      :max="max"
      :disabled="disabled"
      :hide-header="false"
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
  },
  data() {
    return {
      date: null,
      pickertType: "",
      selectedValue: null,
    };
  },
  computed: {
    canHide: function () {
      return this.type === this.pickertType;
    },
  },
  watch: {
    selectedValue: function (value) {
      // 配合 v-model 工作
      this.$emit("change", value);
    },
  },
  mounted() {
    this.pickertType = this.type;
    let date = this.moment(this.value);
    this.date = date.isValid() ? date : this.moment();
    this.selectedValue = this.date;
  },
  methods: {
    month2Year: function (value) {
      this.date.year(value.year());
      this.date.month(value.month());
      this.selectedValue = this.date;
      this.pickertType = this.enumTypeStatus.year;
    },
    yearChecked: function (value) {
      this.date.year(value.year());
      this.selectedValue = this.date;
      if (this.canHide) return;
      this.pickertType = this.enumTypeStatus.month;
    },
    date2Month: function (value) {
      this.date.year(value.year());
      this.date.month(value.month());
      this.date.date(value.date());
      this.selectedValue = this.date;
      this.pickertType = this.enumTypeStatus.month;
    },
    monthChecked: function (value) {
      this.date.year(value.year());
      this.date.month(value.month());
      this.selectedValue = this.date;
      if (this.canHide) return;
      this.pickertType = this.enumTypeStatus.date;
    },
    dateChecked: function (value) {
      this.selectedValue = value;
    },
  },
};
</script>
