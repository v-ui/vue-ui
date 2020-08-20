import tools from "@/tools"

import moment from './moment'
import props from '@/components/util/props.js'

let status = {
  select: {
    data() {
      return {
        enumSelectStatus: {
          now: 'now',
          selected: 'selected',
          start: 'start',
          between: 'between',
          end: 'end',
        },
      }
    },
    methods: {
      validator: function(value, now = null, selected = null,  start = null, end = null) {
        return {
          now: (now && this.validNow(value, now)) || false,
          selected: (selected && this.validSelect(value, selected)) || false,
          start: (start && this.validStart(value, start)) || false,
          end: (end && this.validEnd(value, end)) || false,
          between: (start && end && this.validBetween(value, start, end)) || false,
        }
      },
      validNow: function(value, now) {
        return value.isSame(now)
      },
      validSelect: function(value, selected) {
        return value.isSame(selected)
      },
      validStart: function(value, start) {
        return value.isSame(start)
      },
      validEnd: function(value, end) {
        return value.isSame(end)
      },
      validBetween: function(value, start, end) {
        return value.isBetween(start, end)
      },
    },
  },
  type: {
    data() {
      return {
        enumTypeStatus: {
          millisecond: 'millisecond',// 毫秒
          second: 'second',// 秒
          minute: 'minute',// 分钟
          hour: 'hour',// 小时
          date: 'date',// 日期
          day: 'day',// 星期
          weekday: 'weekday',// 根据语言环境的星期
          week: 'week',// 周
          month: 'month', // 月
          quarter: 'quarter',// 季度
          year: 'year',// 年
        },
      }
    },
  },
}

let base = {
  mixins: [ moment.base, status.select, ],
  model: {
    prop: "value",
    event: "selected:changed"
  },
  props: {
    value: {
      type: [String, Number, Date],
    },
    min: Date,
    max: Date,
    hideHeader: props.Boolean,
    disabled: props.Boolean,
  },
  data() {
    return {
      total: 0,
      colCount: 0,
      selectedValues: null,
    }
  },
  computed: {
    rowCount: function() {
      return Math.ceil(this.total / this.colCount);
    },
    headerText: function() {
      return null
    },
    disabledNow: function() {
      return false
    },
    list: function() {
      return []
    },
  },
  watch: {
    selectedValues: function(value) {
      this.start = this.formatStart(value)
      // 配合 v-model 工作
      this.$emit("selected:changed", value);
    }
  },
}

let year = {
  mixins: [ base, ],
  data() {
    return {
      total: 10,
      colCount: 4,
      start: 0,
    }
  },
  computed: {
    year: function() {
      return this.moment().year()
    },
    headerText: function() {
      return `${this.start} - ${this.start + this.total - 1}`
    },
    disabledNow: function() {
      return this.disabledItem(this.year)
    },
    list: function() {
      let arr = [];
      for (let i = 0; i < this.total; i++) {
        let value = this.start + i
        arr.push({
          value: value,
          label: value,
          status: this.validator(this.moment(value), this.moment(this.year), this.moment(this.selectedValues)),
          disabled: this.disabledItem(value),
        });
      }
      return arr
    },
  },
  watch: {
    selectedValues: function(value) {
      this.start = this.formatStart(value)
      this.$emit('year2Month', value)
    }
  },
  mounted() {
    this.selectedValues = this.moment(this.value).year() || this.year
  },
  methods: {
    formatStart: function(val) {
      // return val % this.total == 0
      //   ? Math.floor(val / this.total) * this.total - (this.total - 1)
      //   : Math.floor(val / this.total) * this.total + 1;
      return Math.floor(val / this.total) * this.total
    },
    disabledItem: function(value) {
      return value < this.moment(this.min).year() || value > this.moment(this.max).year()
    },
    forward: function() {
      this.start -= this.total;
    },
    checknow: function() {
      this.selectedValues = this.year;
    },
    backward: function() {
      this.start += this.total;
    },
  },
}

let month = {
  mixins: [ base, ],
  data() {
    return {
      total: 12,
      colCount: 3,
      year: null,
      month: null,
    }
  },
  computed: {
    now: () => new Date(),
    headerText: function() {
      return this.year;
    },
    list: function() {
      if (!this.year || isNaN(this.year)) return;
      let arr = [];
       for (let i = 0; i < this.total; i++) {
        let value = 0 + i;
          let date = this.formatMonth(this.year, value);
          arr.push({
            value: value,
            label: tools.string.padStart(value + 1, 2),
            status: this.validator(this.formatMonth(this.year, value), this.formatMonth(this.moment().year(), this.moment().month()) , this.selectedValues),
            disabled: date < this.min || date > this.max
          });
       }
      return arr;
    }
  },
  watch: {
    month: function(value) {
      this.selectedValues = this.formatMonth(this.year, value)
      this.$emit('month2Date', this.selectedValues)
    }
  },
  mounted() {
    let date = this.moment(this.value)
    this.year = date.year()
    this.month = date.month()
    this.selectedValues = this.formatMonth(this.year, this.month);
  },
  methods: {
    clickHeader: function() {
      this.$emit("month2Year", this.selectedValues);
    },
    forward: function() {
      this.year -= 1;
    },
    checknow: function() {
      this.year = this.moment().year();
      this.month = this.moment().month();
      this.selectedValues = this.formatMonth(this.year, this.month);
    },
    backward: function() {
      this.year += 1;
    },
    formatMonth: function(year, month) {
      return this.moment([year, month]);
    }
  },
}

export default {
  status,
  base,
  year,
  month,
}
