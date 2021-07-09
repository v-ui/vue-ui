<template>
  <div class=" p-0">
    <b-dropdown-picker
      ref="datepicekr"
      class="form-control"
      :selected="showValue"
      :can-hide="canHide"
      :disabled="disabled"
      :placeholder="fillPlaceholder"
      @picker:hide="pickerHide"
    >
      <template #trigger>
        <slot name="trigger" />
      </template>
      <template #icon>
        <i class="far fa-calendar-alt" />
      </template>
      <template>
        <b-date-select
          v-model="selectedValue"
          :hide-header="hideHeader"
          :type="pickerType"
          :min="dateMin"
          :max="dateMax"
          :range="range"
        />
      </template>
    </b-dropdown-picker>
    <b-valid
        v-if="validInfo || $slots.valid"
        state="valid"
      >
        <slot name="valid">
          {{ validInfo }}
        </slot>
      </b-valid>
      <b-valid
        v-if="invalidInfo || $slots.invalid"
        state="invalid"
      >
        <slot name="invalid">
          {{ invalidInfo }}
        </slot>
      </b-valid>
      <b-info :info="info" />
  </div>
</template>

<script>
import config from '@/config/index.js'
import util from "@/components/util/index.js";

import BDateSelect from '@/components/base/DateTime/Date/DatePicker/b-date-select.vue'
import BDropdownPicker from "@/components/base/DropdownPicker/b-dropdown-picker.vue";

import BValid from "@/components/form/Other/b-form-valid.vue";
import BInfo from "@/components/basic/basic-info.vue"
export default {
  name: "BDatePicker",
  components: {
    BDateSelect,
    BDropdownPicker,
    BValid,
    BInfo,
  },
  mixins: [
    util.mixins.moment.base,
    util.mixins.date.type,
    util.mixins.date.select,
    util.mixins.form.validator,
  ],
  model: {
    prop: "value",
    event: "selected:change",
  },
  props: {
    value: [String, Number, Date, Object],
    type: {
      type: String,
      default: "date",
      validator: value => ["year", "month", "date"].includes(value),
    },
    hideHeader: util.props.Boolean,
    disabled: util.props.Boolean,
    info: util.props.String,
    placeholder: util.props.String,
  },
  data() {
    return {
      selectedValue: this.value,
    };
  },
  computed: {
    fillPlaceholder: function () {
      if (this.placeholder) return this.placeholder;

      switch (this.type) {
        case this.enumTypeStatus.year:
        case this.enumTypeStatus.month:
        case this.enumTypeStatus.date:
          return this.range
            ? config.ui.date[this.type] + " - " +  config.ui.date[this.type]
            : config.ui.date[this.type]
        default:
          return "error";
      }
    },
    showValue: function () {
      return this.range && this.selectedValue.start && this.selectedValue.end
        ? this.formatDate(this.selectedValue.start) + ' - ' + this.formatDate(this.selectedValue.end)
        : this.formatDate(this.selectedValue)
    },
    canHide: function () {
      return this.type === this.pickerType;
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
        this.selectedValue = value
      },
      deep: true,
    },
    selectedValue: {
      handler: function (value) {
        // 配合 v-model 工作
        this.$emit("selected:change", value);
      },
      deep: true,
    },
  },
  methods: {
    formatDate: function (value) {
      if (!value || !value.isValid || !value.isValid()) return;
      switch (this.type) {
        case this.enumTypeStatus.year:
        case this.enumTypeStatus.month:
        case this.enumTypeStatus.date:
          return value.format(config.ui.date[this.type])
      }
    },
    pickerHide: function() {
      this.validator(this.$refs.datepicekr.$el, this.selectedValue)
    },
    // 验证集合 通过返回 true，不通过返回 false
    validating: function (value) {
      // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
      if (!this.validateRequired(value)) return false
      // 自定义验证（用户自定义验证函数，验证通过返回 true）
      if (!this.validateCustomize(value, this.valid)) return false
      // 验证成功
      return true
    },
  },
};
</script>
