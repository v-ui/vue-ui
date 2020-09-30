<template>
  <dropdown-panel
    :placeholder="fillPlaceholder"
    :label="showValue"
    :info="message"
    :can-hide="canHide"
    :disabled="disabled"
  >
    <template #icon>
      <i class="far fa-calendar-alt" />
    </template>
    <template>
      <b-date-panel
        v-model="selectedValues"
        :type="pickertType"
        :min="dateMin"
        :max="dateMax"
        :range="range"
      />
    </template>
  </dropdown-panel>
</template>

<script>
import config from '@/config/index.js'
import util from "@/components/util/index.js";

import BDatePanel from '@/components/base/DateTime/Date/DatePicker/b-date-panel.vue'
import dropdownPanel from "@/components/base/DropdownPanel/b-dropdown-panel.vue";

export default {
  name: "BDatePicker",
  components: { BDatePanel, dropdownPanel, },
  mixins: [
    util.mixins.form.base,
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
    value: [String, Number, Date, Object],
    min: [String, Date],
    max: [String, Date],
    info: util.props.String,
    range: util.props.Boolean,
    placeholder: util.props.String,
  },
  data() {
    return {
      pickertType: this.type,
      selectedValues: this.value,
    };
  },
  computed: {
    fillPlaceholder: function () {
      if (this.placeholder) return this.placeholder;

      switch (this.type) {
        case this.enumTypeStatus.year:
          return this.range
            ? config.ui.date.year + " - " +  config.ui.date.year
            : config.ui.date.year
        case this.enumTypeStatus.month:
          return this.range
            ? config.ui.date.month + " - " +  config.ui.date.month
            : config.ui.date.month
        case this.enumTypeStatus.date:
          return this.range
            ? config.ui.date.date + " - " +  config.ui.date.date
            : config.ui.date.date
        default:
          return "error";
      }
    },
    showValue: function () {
      return this.range && this.selectedValues.start && this.selectedValues.end
        ? this.formatDate(this.selectedValues.start) + ' - ' + this.formatDate(this.selectedValues.end)
        : this.formatDate(this.selectedValues)
    },
    canHide: function () {
      return this.type === this.pickertType;
    },
    dateMin: function () {
      return this.moment(new Date(this.min));
    },
    dateMax: function () {
      return this.moment(new Date(this.max));
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
    value: {
      handler: function (value) {
        this.selectedValues = value
      },
      deep: true,
    },
    selectedValues: {
      handler: function (value) {
        // 配合 v-model 工作
        this.$emit("change", value);
      },
      deep: true,
    },
  },
  methods: {
    formatDate: function (value) {
      if (!value || !value.isValid || !value.isValid()) return;

      switch (this.type) {
        case this.enumTypeStatus.year:
          return value.format(config.ui.date.year)
        case this.enumTypeStatus.month:
          return value.format(config.ui.date.month)
        case this.enumTypeStatus.date:
          return value.format(config.ui.date.date)
      }
    },
  },
};
</script>
