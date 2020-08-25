<template>
  <dropdown-panel
    :placeholder="fillPlaceholder"
    :label="showValue"
    :info="message"
    :canHide="canHide"
    :disabled="disabled"
    @hiding="hiding"
  >
    <template #icon>
      <i class="far fa-calendar-alt" />
    </template>
    <template>
      <year-panel
        v-if="pickertType === enumTypeStatus.year"
        v-model="selectValue"
        style="min-width: 18em"
        :min="dateMin"
        :max="dateMax"
        :disabled="disabled"
        :hide-header="hideHeader"
        @year:checked="yearChecked"
      />
      <month-panel
        v-if="pickertType === enumTypeStatus.month"
        v-model="selectValue"
        style="min-width: 15em"
        :min="dateMin"
        :max="dateMax"
        :disabled="disabled"
        :hide-header="hideHeader"
        @month2Year="month2Year"
        @month:checked="monthChecked"
      />
      <date-panel
        v-if="pickertType === enumTypeStatus.date"
        v-model="selectValue"
        style="min-width: 22em"
        :min="dateMin"
        :max="dateMax"
        :disabled="disabled"
        :hide-header="hideHeader"
        @date2Month="date2Month"
        @date:checked="dateChecked"
      />
    </template>
  </dropdown-panel>
</template>

<script>
import util from "@/components/util/index.js";

import dropdownPanel from "@/components/base/Bootstrap/DropdownPanel/b-dropdown-panel.vue";
import yearPanel from "./Panel/date-year-panel";
import monthPanel from "./Panel/date-month-panel";
import datePanel from "./Panel/date-date-panel";

export default {
  name: "b-date-picker",
  components: { dropdownPanel, yearPanel, monthPanel, datePanel },
  mixins: [
    util.mixins.form.base,
    util.mixins.form.readonly,
    util.mixins.moment.base,
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
    status: {
      type: Number,
      default: 0,
      validator: (value) => [0, 1].includes(value),
    },
    min: [String, Date],
    max: [String, Date],
    info: util.props.String,
    placeholder: util.props.String,
  },
  data() {
    return {
      date: null,
      pickertType: "",
      selectValue: null,
    };
  },
  computed: {
    fillPlaceholder: function () {
      if (this.placeholder) return this.placeholder;
      else {
        switch (this.type) {
          case this.enumTypeStatus.year:
            return "yyyy";
          case this.enumTypeStatus.month:
            return "yyyy-MM";
          case this.enumTypeStatus.date:
            return "yyyy-MM-dd";
          default:
            return "error";
        }
      }
    },
    showValue: function () {
      return this.formatDate(this.selectValue);
    },
    canHide: function () {
      return this.type === this.pickertType;
    },
    hideHeader: function () {
      return this.status !== 0;
    },
    dateMin: function () {
      let time = this.min;
      if (this.status !== 0) {
        switch (this.type) {
          case "month":
            time = "1970-" + this.min;
            break;
          case "date":
            time = "1970-01-" + this.min;
            break;
        }
      }

      return this.moment(new Date(time));
    },
    dateMax: function () {
      let time = this.max;
      if (this.status !== 0) {
        switch (this.type) {
          case "month":
            time = "1970-" + this.max;
            break;
          case "date":
            time = "1970-01-" + this.max;
            break;
        }
      }
      return this.moment(new Date(time));
    },
    fillInfo: function () {
      let minIsValid = this.dateMin.isValid()
      let maxIsValid = this.dateMax.isValid()
      if (!minIsValid && !maxIsValid)
        return ``;
      else if (minIsValid && maxIsValid)
        return `${this.formatDate(this.dateMin)}~${this.formatDate(this.dateMax)}`;
      else if (!minIsValid)
        return `...~${this.formatDate(this.dateMax)}`;
      else if (!maxIsValid)
        return `${this.formatDate(this.dateMin)}~...`;
      return "";
    },
    message: function () {
      if (this.info && this.fillInfo) return `(${this.fillInfo}) ${this.info}`;
      else if (this.fillInfo) return this.fillInfo;
      else if (this.info) return this.info;
      return "";
    },
  },
  watch: {
    selectValue: function (value) {
      // 配合 v-model 工作
      this.$emit("change", this.formatDate(value));
    },
  },
  mounted() {
    this.pickertType = this.type;
    let date = this.moment(this.value)
    this.date = date.isValid() ? date : this.moment();
    this.selectValue = this.date;
  },
  methods: {
    formatDate: function (value) {
      if (!value) return;
      let date = value
      if (!date.isValid()) return;

      switch (this.type) {
        case this.enumTypeStatus.year:
          return value.year();
        case this.enumTypeStatus.month:
          return this.status === 0
            ? value.format('YYYY-MM')
            : value.format('MM')
        case this.enumTypeStatus.date:
          return this.status === 0
            ? value.format('YYYY-MM-DD')
            : value.format('DD')
      }
    },
    month2Year: function (value) {
      this.date.year(value.year());
      this.date.month(value.month());
      this.selectValue = this.date;
      this.pickertType = this.enumTypeStatus.year;
    },
    yearChecked: function (value) {
      this.date.year(value.year());
      this.selectValue = this.date;
      if (this.canHide) return
      this.pickertType = this.enumTypeStatus.month;
    },
    date2Month: function (value) {
      this.date.year(value.year());
      this.date.month(value.month());
      this.date.date(value.date());
      this.selectValue = this.date;
      this.pickertType = this.enumTypeStatus.month;
    },
    monthChecked: function (value) {
      this.date.year(value.year());
      this.date.month(value.month());
      this.selectValue = this.date;
      if (this.canHide) return
      this.pickertType = this.enumTypeStatus.date;
    },
    dateChecked: function (value) {
      this.selectValue = value;
    },
  },
};
</script>
