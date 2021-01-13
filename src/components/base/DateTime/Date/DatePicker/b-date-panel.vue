<template>
  <div class="d-flex justify-content-center">
    <date-panel-select
      v-model="selectedValueStart"
      class="flex-fill"
      :type="type"
      :min="min"
      :max="range ? rangeStartMax : max"
      :disabled="disabled"
      :range="range"
      :selected-start="selectedValueStart"
      :selected-end="selectedValueEnd"
      :hide-header="false"
    />
    <date-panel-select
      v-if="range"
      v-model="selectedValueEnd"
      class="flex-fill"
      :type="type"
      :min="range ? rangeEndMin : min"
      :max="max"
      :disabled="disabled"
      :range="range"
      :selected-start="selectedValueStart"
      :selected-end="selectedValueEnd"
      :hide-header="false"
    />
  </div>
</template>

<script>
import util from "@/components/util/index.js";
import datePanelSelect from './Basic/date-panel-select'

export default {
  name: 'BDatePanel',
  components: { datePanelSelect, },
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
    value: [String, Number, Date, Object],
    min: [Date, Object],
    max: [Date, Object],
    range: util.props.Boolean,
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
    rangeStartMax: function() {
      if (this.selectedValueEnd && this.selectedValueEnd.isValid && this.selectedValueEnd.isValid()) {
        let end = this.selectedValueEnd.clone()
        switch (this.type) {
          case this.enumTypeStatus.year:
          return end.subtract(1, 'years')
        case this.enumTypeStatus.month:
          return end.subtract(1, 'months')
        case this.enumTypeStatus.date:
          return end.subtract(1, 'days')
        default:
          return end
        }
      } else {
        return this.max
      }
    },
    rangeEndMin: function() {
      if (this.selectedValueStart && this.selectedValueStart.isValid && this.selectedValueStart.isValid()) {
        let start = this.selectedValueStart.clone()
        switch (this.type) {
          case this.enumTypeStatus.year:
          return start.add(1, 'years')
        case this.enumTypeStatus.month:
          return start.add(1, 'months')
        case this.enumTypeStatus.date:
          return start.add(1, 'days')
        default:
          return start
        }
      } else {
        return this.min
      }
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
      if (this.value.start) this.selectedValueStart = this.moment(this.value.start)
      if (this.value.end) this.selectedValueEnd = this.moment(this.value.end)
    } else {
      if (this.value) this.selectedValueStart = this.moment(this.value)
    }
  },
}
</script>
