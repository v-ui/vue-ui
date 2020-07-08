<template>
  <div>
    <picker-header
      v-if="!hideHeader"
      :disabled="disabled"
      :hearder-text="hearderText"
      :now-disabled="nowDisabled"
      @clickHeader="clickHeader"
      @forward="forward"
      @checknow="checknow"
      @backward="backward"
    />
    <hr>
    <div class="text-center mx-3">
      <picker-row
        v-for="(items, index) in lists"
        :key="index"
        :items="items"
        :col-count="colCount"
        :disabled="disabled"
        @click="click"
      />
    </div>
  </div>
</template>

<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import pickerHeader from "./date-picker-header";
import pickerRow from "@/components/base/Bootstrap/DropdownPicker/b-dropdown-picker-row.vue";

export default {
  name: "date-month-picker",
  components: { pickerHeader, pickerRow },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: [String, Number, Date],
      default: () =>
        new Date(
          new Date().getFullYear() +
            "-" +
            tools.string.padStart(new Date().getMonth()),
          2
        )
    },
    min: Date,
    max: Date,
    hideHeader: util.props.Boolean,
    disabled: util.props.Boolean,
  },
  data() {
    return {
      total: 12,
      colCount: 3,
      selectValue: null,
      year: null,
      month: null
    };
  },
  computed: {
    now: () => new Date(),
    rowCount: function() {
      return Math.ceil(this.total / this.colCount);
    },
    hearderText: function() {
      return this.year;
    },
    nowDisabled: function() {
      return this.now < this.min || this.now > this.max;
    },
    lists: function() {
      if (!this.year || isNaN(this.year)) return;
      let arrs = [];
      for (let i = 0; i < this.rowCount; i++) {
        let arr = [];
        const max =
          this.total < this.colCount * (i + 1)
            ? this.total % this.colCount
            : this.colCount;
        const d = new Date(this.selectValue);
        const selectYeaer = d.getFullYear();
        const selectMonth = d.getMonth();
        for (let n = 0; n < max; n++) {
          let value = 0 + i * this.colCount + n;
          let date = new Date(this.formatMonth(this.year, value));
          arr.push({
            value: value,
            text: tools.string.padStart(value + 1, 2),
            select: value == selectMonth && selectYeaer == this.year,
            disabled: date < this.min || date > this.max
          });
        }
        arrs.push(arr);
      }

      return arrs;
    }
  },
  mounted() {
    this.year = this.value.getFullYear && this.value.getFullYear();
    this.month = this.value.getMonth && this.value.getMonth();
    this.selectValue = this.formatMonth(this.year, this.month);
  },
  methods: {
    clickHeader: function() {
      this.$emit("month2Year", this.selectValue);
    },
    click: function(value) {
      this.selectValue = this.formatMonth(this.year, value);
      this.$emit("month2Date", this.selectValue);
    },
    forward: function() {
      this.year -= 1;
    },
    checknow: function() {
      this.year = this.now.getFullYear();
      this.month = this.now.getMonth();
      this.selectValue = this.formatMonth(this.year, this.month);
      this.$emit("month2Date", this.selectValue);
    },
    backward: function() {
      this.year += 1;
    },
    formatMonth: function(year, month) {
      return new Date(year + "-" + tools.string.padStart(Number(month + 1), 2));
    }
  },
  watch: {
    selectValue: function(val) {
      // 配合 v-model 工作
      this.$emit("change", val);
    }
  }
};
</script>
