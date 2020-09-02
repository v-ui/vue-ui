<template>
  <div class="d-flex">
    <date-panel-select
      v-model="selectedValueStart"
      class="flex-fill"
      :type="type"
      :min="min"
      :max="range ? rangeStartMax : max"
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
      :min="range ? rangeEndMin : min"
      :max="max"
      :disabled="disabled"
      :range="range"
      :selectedStart="selectedValueStart"
      :selectedEnd="selectedValueEnd"
      :hide-header="false"
    />
  </div>
</template>

<script>
import util from "@/components/util/index.js";
import datePanelSelect from './Basic/date-panel-select'

export default {
  name: 'b-date-panel',
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
    value: {
      type: [String, Number, Date, Object],
      default: () => new Date(),
    },
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
    this.init()
  },
  methods: {
    init: function(value = this.value) {
      if (this.range) {
        let date = {}
        date.start = this.moment(value.start);
        date.end = this.moment(value.end);
        date.start = date.start.isValid() ? date.start : this.moment();
        date.end = date.end.isValid() ? date.end : this.moment();
        this.selectedValueStart = date.start
        this.selectedValueEnd = date.end
      } else {
        let date = this.moment(value);
        date = date.isValid() ? date : this.moment();
        this.selectedValueStart = date
      }
    },
  },
}
</script>
