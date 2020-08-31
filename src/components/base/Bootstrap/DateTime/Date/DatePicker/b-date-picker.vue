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
      <di class="d-flex">
        <date-panel-select
          v-model="selectValue"
          class="flex-fill"
          :type="type"
          :min="dateMin"
          :max="dateMax"
          :disabled="disabled"
          :hide-header="false"
        />
      </di>
    </template>
  </dropdown-panel>
</template>

<script>
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
    selectValue: function (value) {
      // 配合 v-model 工作
      this.$emit("change", this.formatDate(value));
    },
  },
  mounted() {
    this.pickertType = this.type;
    let date = this.moment(this.value);
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
          return value.format('YYYY-MM')
        case this.enumTypeStatus.date:
          return value.format('YYYY-MM-DD')
      }
    },
  },
};
</script>
