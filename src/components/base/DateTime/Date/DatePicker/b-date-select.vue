<template>
  <div class="d-flex justify-content-center">
    <b-date-panel
      v-model="selectedValueStart"
      class="flex-fill"
      :type="type"
      :min="min"
      :max="range ? rangeStartMax : max"
      :disabled="disabled"
      :range="range"
      :selected-start="selectedValueStart"
      :selected-end="selectedValueEnd"
      :hide-header="hideHeader"
    />
    <b-date-panel
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
      :hide-header="hideHeader"
    />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BDatePanel from './b-date-panel'
export default {
  name: 'BDateSelect',
  components: { BDatePanel, },
  mixins: [
    util.mixins.date.type,
    util.mixins.date.base,
    util.mixins.date.select,
  ],
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    type: {
      type: String,
      default: "date",
      validator: value => ["year", "month", "date"].includes(value),
    },
  },
  data() {
    return {
      // 默认使用 selectedValueStart，
      // 当 range 为 True 时才使用 selectedValueEnd，
      // 此时 selectedValueStart 相当于 start，selectedValueEnd 相当于 end
      selectedValueStart: null,
      selectedValueEnd: null,
      selectedValue: this.range ? {start: null, end: null} : null,
    };
  },
  computed: {
    rangeStartMax: function() {
      if (this.range && this.selectedValueEnd && this.selectedValueEnd.isValid && this.selectedValueEnd.isValid()) {
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
      if (this.range && this.selectedValueStart && this.selectedValueStart.isValid && this.selectedValueStart.isValid()) {
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
        ? this.selectedValue.start = value
        : this.selectedValue = value
    },
    selectedValueEnd: function (value) {
      this.selectedValue.end = value
    },
    selectedValue: {
      handler: function (value) {
        // 配合 v-model 工作
        this.$emit("change", value);
      },
      deep: true,
    },
  },
  mounted() {
    if (this.range) {
      if (this.value.start) this.selectedValueStart = this.moment(this.value.start)
      if (this.value.end) this.selectedValueEnd = this.moment(this.value.end)
    } else {
      if (this.value) this.selectedValueStart = this.moment(this.value)
    }
  },
}
</script>
