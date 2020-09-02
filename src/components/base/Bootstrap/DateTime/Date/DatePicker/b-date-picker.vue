<template>
  <dropdown-panel
    :placeholder="fillPlaceholder"
    :label="showValue"
    :info="message"
    :canHide="canHide"
    :disabled="disabled"
  >
    <template #icon>
      <i class="far fa-calendar-alt" />
    </template>
    <template>
      <div class="d-flex">
        <date-panel-select
          v-model="selectedValueStart"
          class="flex-fill"
          :type="type"
          :min="dateMin"
          :max="range ? rangeStartMax : dateMax"
          :disabled="disabled"
          :range="range"
          :selectedStart="selectedValueStart"
          :selectedEnd="selectedValueEnd"
          :hide-header="false"
        />
        <date-panel-select
          v-if="range"
          v-model="selectedValueEnd"
          class="flex-fill"
          :type="type"
          :min="range ? rangeEndMin : dateMin"
          :max="dateMax"
          :disabled="disabled"
          :range="range"
          :selectedStart="selectedValueStart"
          :selectedEnd="selectedValueEnd"
          :hide-header="false"
        />
      </div>
    </template>
  </dropdown-panel>
</template>

<script>
import config from '@/config/index.js'
import util from "@/components/util/index.js";

import datePanelSelect from './Basic/date-panel-select'
import dropdownPanel from "@/components/base/Bootstrap/DropdownPanel/b-dropdown-panel.vue";

export default {
  name: "b-date-picker",
  components: { datePanelSelect, dropdownPanel, },
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
    value: {
      type: [String, Number, Date, Object],
      default: () => new Date(),
    },
    min: [String, Date],
    max: [String, Date],
    info: util.props.String,
    range: util.props.Boolean,
    placeholder: util.props.String,
  },
  data() {
    return {
      pickertType: "",
      // 默认使用 selectedValueStart，
      // 当 range 为 True 时才使用 selectedValueEnd，
      // 此时 selectedValueStart 相当于 start，selectedValueEnd 相当于 end
      selectedValueStart: null,
      selectedValueEnd: null,
      selectedValues: this.range ? {start: null, end: null} : null,

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
    rangeStartMax: function() {
      if (this.selectedValueEnd && this.selectedValueEnd.isValid && this.selectedValueEnd.isValid()) {
        let end = this.selectedValueEnd.clone()
        switch (this.type) {
          case this.enumTypeStatus.year:
          return end.subtract(1, 'y')
        case this.enumTypeStatus.month:
          return end.subtract(1, 'm')
        case this.enumTypeStatus.date:
          return end.subtract(1, 'd')
        default:
          return end
        }
      } else {
        return this.dateMax
      }
    },
    rangeEndMin: function() {
      if (this.selectedValueStart && this.selectedValueStart.isValid && this.selectedValueStart.isValid()) {
        let start = this.selectedValueStart.clone()
        switch (this.type) {
          case this.enumTypeStatus.year:
          return start.add(1, 'y')
        case this.enumTypeStatus.month:
          return start.add(1, 'm')
        case this.enumTypeStatus.date:
          return start.add(1, 'd')
        default:
          return start
        }
      } else {
        return this.dateMin
      }
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
    selectedValueStart: function (value) {
      this.range
        ? this.selectedValues.start = value
        : this.selectedValues = value
    },
    selectedValueEnd: function (value) {
      this.selectedValues.end = value
    },
    selectedValues: {
      handler: function (value) {
        // 配合 v-model 工作
        this.$emit("change", value);
      },
      deep: true,
    },
  },
  mounted() {
    this.pickertType = this.type;

    if (this.range) {
      let date = {}
      date.start = this.moment(this.value.start);
      date.end = this.moment(this.value.end);
      date.start = date.start.isValid() ? date.start : this.moment();
      date.end = date.end.isValid() ? date.end : this.moment();
      this.selectedValueStart = date.start
      this.selectedValueEnd = date.end
    } else {
      let date = this.moment(this.value);
      date = date.isValid() ? date : this.moment();
      this.selectedValueStart = date
    }

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
