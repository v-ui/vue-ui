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
    <div class="text-center mx-3">
      <picker-row
        class="border-bottom border-primary"
        :items="[{text: '日'},{text: '一'}, {text: '二'}, {text: '三'}, {text: '四'}, {text: '五'}, {text: '六'}]"
        :col-count="colCount"
      />
      <picker-row
        v-for="(items, index) in lists"
        :key="index"
        :items="items"
        :disabled="disabled"
        :col-count="colCount"
        @click="click"
      />
    </div>
  </div>
</template>

<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import pickerHeader from "./date-picker-header";
import pickerRow from "@/components/base/Bootstrap/DropdownPicker/b-dropdownpicker-row.vue";

export default {
  name: "date-date-picker",
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
            tools.string.padStart(new Date().getMonth(), 2) +
            "-" +
            tools.string.padStart(new Date().getDate(), 2)
        )
    },
    min: Date,
    max: Date,
    hideHeader: util.props.Boolean,
    disabled: util.props.Boolean,
  },
  data() {
    return {
      colCount: 7,
      selectValue: null,
      year: null,
      month: null,
      date: null
    };
  },
  computed: {
    now: () => new Date(),
    hearderText: function() {
      return this.year + "-" + tools.string.padStart(Number(this.month + 1), 2);
    },
    total: function() {
      return new Date(this.year, this.month + 1, 0).getDate();
    },
    rowCount: function() {
      return Math.ceil(this.total / this.colCount);
    },
    nowDisabled: function() {
      return this.now < this.min || this.now > this.max;
    },
    lists: function() {
      if (!this.year || isNaN(this.year)) return;
      if (this.month < 0 || isNaN(this.month)) return;
      let arrs = [];
      let value = 1;
      let flag = false;
      let day = new Date(this.year, this.month, 1).getDay();
      const d = new Date(this.selectValue);
      const selectYear = d.getFullYear && d.getFullYear();
      const selectMonth = d.getMonth && d.getMonth();
      const selectDate = d.getDate && d.getDate();
      while (value <= this.total) {
        let arr = [];
        for (let i = 0; i < this.colCount; i++) {
          value > this.total ? (flag = false) : flag ? null : (flag = i == day);
          if (!flag) {
            arr.push({ text: "" });
          } else {
            let date = new Date(this.formatDate(this.year, this.month, value));
            arr.push({
              value: value,
              text: tools.string.padStart(value, 2),
              select:
                value == selectDate &&
                selectYear == this.year &&
                selectMonth == this.month,
              disabled: date < this.min || date > this.max
            });
            value++;
          }
        }
        arrs.push(arr);
      }
      return arrs;
    }
  },
  mounted() {
    this.year = this.value.getFullYear && this.value.getFullYear();
    this.month = this.value.getMonth && this.value.getMonth();
    this.date = this.value.getDate && this.value.getDate();
    this.selectValue = this.formatDate(this.year, this.month, this.date);
  },
  methods: {
    clickHeader: function() {
      this.$emit("date2Month", this.selectValue);
    },
    click: function(value) {
      this.selectValue = this.formatDate(this.year, this.month, value);
      this.$emit("dateChecked", this.selectValue);
    },
    forward: function() {
      if (this.month == 0) {
        this.year -= 1;
        this.month = 11;
      } else {
        this.month -= 1;
      }
    },
    checknow: function() {
      this.year = this.now.getFullYear();
      this.month = this.now.getMonth();
      this.date = this.now.getDate();
      this.selectValue = this.formatDate(this.year, this.month, this.date);
      this.$emit("dateChecked", this.selectValue);
    },
    backward: function() {
      if (this.month == 11) {
        this.year += 1;
        this.month = 0;
      } else {
        this.month += 1;
      }
    },
    formatDate: function(year, month, date) {
      return new Date(
        year +
          "-" +
          tools.string.padStart(Number(month + 1), 2) +
          "-" +
          tools.string.padStart(date, 2)
      );
    }
  },
  watch: {
    selectValue: function(value) {
      // 配合 v-model 工作
      this.$emit("change", value);
    }
  }
};
</script>
