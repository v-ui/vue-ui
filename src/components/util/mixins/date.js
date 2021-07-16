// import tools from "@/tools"
import config from '@/config'
import moment from './plugin/moment'
import props from '@/components/util/props.js'

let type = {
  props: {
    type: {
      type: String,
      default: "date",
      validator: (value) => ["year", "quarter", "month", "week", "date"].includes(value),
    },
  },
  data() {
    return {
      pickerType: this.type,
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
  mounted() {
    this.pickerType = this.type;
  },
}

let validator = {
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
    validator: function(
      value,
      now = this.now || null,
      selected = this.selectedValue || null,
      start = this.selectedStart || null,
      end = this.selectedEnd || null
    ) {
      let isSelected = false, isStart = false, isEnd = false, isBetween = false

      let isNow = (now && this.validNow(value, now)) || false
      if (this.range) {
        isStart = (start && this.validStart(value, start)) || false
        isEnd = (end && this.validEnd(value, end)) || false
        isBetween = (start && end && this.validBetween(value, start, end)) || false
      } else {
        isSelected = (selected && this.validSelect(value, selected)) || false
      }
      let isWeekend = this.validWeekend(value)
      return { now: isNow, selected: isSelected, start: isStart, end: isEnd, between: isBetween, weekend: isWeekend }
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
    validWeekend: function() {
      return false
    },
  },
}

let base = {
  mixins: [ moment.base, ],
  model: {
    prop: "value",
    event: "selected:changed"
  },
  props: {
    value: [String, Number, Date, Object],
    hideHeader: props.Boolean,
    disabled: props.Boolean,
    calendar: props.Boolean,
  },
  data() {
    return {
      year: 0,
      month: 0,
      date: 1,
      now: null,
      colCount: 0,
      selectedValue: null,
      disabledNow: false,
    }
  },
  computed: {
    rowCount: function() {
      return Math.ceil(this.total / this.colCount);
    },
    headerText: function() {
      return null
    },
    list: function() {
      return []
    },
  },
  watch: {
    value: function(value) {
      this.initValue && this.initValue(value)
      if (!this.calendar) this.selectedValue = value
    },
    selectedValue: function(value) {
      // 配合 v-model 工作
      this.$emit("selected:changed", value);
    }
  },
  methods: {
    format(year = this.year, month = this.month, date = this.date) {
      return this.moment([year, month, date])
    },
  },
}

let select = {
  props: {
    min: [String, Number, Date, Object],
    max: [String, Number, Date, Object],
    range: props.Boolean,
    selectedStart: [String, Number, Date, Object],
    selectedEnd: [String, Number, Date, Object],
  },
  computed: {
    dateMin: function() {
      return this.moment(new Date(this.min))
    },
    dateMax: function() {
      return this.moment(new Date(this.max))
    },
  },
  methods: {
    isBetween: function(value, start, end) {
      return (start.isValid() && (value.isBefore(start))) ||
            (end.isValid() && (value.isAfter(end)))
    },
    disabledItem: function(value, min = this.dateMin, max = this.dateMax) {
      return this.isBetween(value, this.moment(min), this.moment(max))
    },
  },
}

let year = {
  mixins: [ base, ],
  data() {
    return {
      total: 20,
      colCount: 4,
      start: 0,
    }
  },
  computed: {
    headerText: function() {
      return `${this.start} - ${this.start + this.total - 1}`
    },
    list: function() {
      if (!this.start || isNaN(this.start)) return
      let arr = [];
      for (let i = 0; i < this.total; i++) {
        let value = this.start + i
        let date = this.format(value)

        arr.push({
          value: value,
          label: date.format("YYYY"), //`${value} `,
          status: this.validator && this.validator(date),
          disabled: this.disabledItem && this.disabledItem(date),
        });
      }
      return arr
    },
  },
  watch: {
    selectedValue: function() {
      this.start = this.formatStart(this.year)
    }
  },
  mounted() {
    this.now = this.moment([this.moment().year()])
    this.disabledNow = this.disabledItem && this.disabledItem(this.now)
    this.initValue && this.initValue(this.value)
    this.selectedValue = this.value && this.value.isValid && this.value.isValid() ? this.format() : null
    this.start = this.formatStart(this.year)
  },
  methods: {
    initValue: function(value) {
      let date = value && value.isValid && value.isValid() ? value : (this.disabledNow ? this.dateMin : this.moment())
      this.year = date.year()
    },
    formatStart: function(val) {
      return val % this.total == 0
        ? Math.floor(val / this.total) * this.total - (this.total - 1)
        : Math.floor(val / this.total) * this.total + 1
    },
    forward: function() {
      this.start -= this.total;
    },
    checknow: function() {
      this.year = this.moment().year();
      this.selectedValue = this.format()
      this.$emit('year:checked', this.selectedValue)
    },
    backward: function() {
      this.start += this.total;
    },
    checked: function(value) {
      this.year = value
      this.selectedValue = this.format()
      this.$emit('year:checked', this.selectedValue)
    },
  },
}

let quarter = {
  mixins: [ base, ],
  data() {
    return {
      total: 4,
      quarter: 1,
    }
  },
  computed: {
    headerText: function() {
      return this.year;
    },
    list: function() {
      if (!this.year || isNaN(this.year)) return;
      let arr = [];
       for (let i = 0; i < this.total; i++) {
          let value = i + 1
          let date = this.format(this.year).quarter(value)
          let start = date.startOf('quarter')
          let end = date.clone().endOf('quarter')

          arr.push({
            value: value,
            label: date.format("Qo"),
            info: `${start.format("ll")}-${end.format("ll")}`,
            status: this.validator && this.validator(start, this.now.startOf('quarter'), this.selectedValue?.startOf('quarter')),
            disabled: this.disabledItem && this.disabledItem(date),
          });
       }
      return arr;
    }
  },
  mounted() {
    this.now = this.moment([this.moment().year(), this.moment().month(), 1])
    this.disabledNow = this.disabledItem && this.disabledItem(this.now)
    this.initValue && this.initValue(this.value)
    this.selectedValue = this.value && this.value.isValid && this.value.isValid() ? this.format().quarter(this.quarter) : null
  },
  methods: {
    initValue: function(value) {
      let date = value && value.isValid && value.isValid() ? value : (this.disabledNow ? this.dateMin : this.moment())
      this.year = date.year()
      this.quarter = date.quarter()
    },
    clickHeader: function() {
      this.$emit("quarter2Year", this.selectedValue);
    },
    forward: function() {
      this.year -= 1;
    },
    checknow: function() {
      this.year = this.moment().year();
      this.quarter = this.moment().quarter();
      this.selectedValue = this.format().quarter(this.quarter)
      this.$emit('quarter:checked', this.selectedValue)
    },
    backward: function() {
      this.year += 1;
    },
    checked: function(value) {
      this.quarter = value.value
      this.selectedValue = this.format().quarter(this.quarter)
      this.$emit('quarter:checked', this.selectedValue)
    },
  },
}

let month = {
  mixins: [ base, ],
  data() {
    return {
      total: 12,
      colCount: 3,
    }
  },
  computed: {
    headerText: function() {
      return this.year;
    },
    list: function() {
      if (!this.year || isNaN(this.year)) return;
      let arr = [];
       for (let i = 0; i < this.total; i++) {
          let date = this.format(this.year, i)

          arr.push({
            value: i,
            label: date.format("MMMM"), // tools.string.padStart(i + 1, 2),
            status: this.validator && this.validator(date),
            disabled: this.disabledItem && this.disabledItem(date),
          });
       }
      return arr;
    }
  },
  mounted() {
    this.now = this.moment([this.moment().year(), this.moment().month()])
    this.disabledNow = this.disabledItem && this.disabledItem(this.now)
    this.initValue && this.initValue(this.value)
    this.selectedValue = this.value && this.value.isValid && this.value.isValid() ? this.format() : null
  },
  methods: {
    initValue: function(value) {
      let date = value && value.isValid && value.isValid() ? value : (this.disabledNow ? this.dateMin : this.moment())
      this.year = date.year()
      this.month = date.month()
    },
    clickHeader: function() {
      this.$emit("month2Year", this.selectedValue);
    },
    forward: function() {
      this.year -= 1;
    },
    checknow: function() {
      this.year = this.moment().year();
      this.month = this.moment().month();
      this.selectedValue = this.format()
      this.$emit('month:checked', this.selectedValue)
    },
    backward: function() {
      this.year += 1;
    },
    checked: function(value) {
      this.month = value
      this.selectedValue = this.format()
      this.$emit('month:checked', this.selectedValue)
    },
  },
}

let week = {
  mixins: [ base, ],
  data() {
    return {
      week: 0,
    }
  },
  computed: {
    headerText: function() {
      return this.moment([this.year, this.month]).format(config.ui.date.month)
    },
    list: function() {
      if (!this.year || isNaN(this.year)) return;
      if (isNaN(this.month) || this.month < 0 ) return
      let arr = [];
      let date = this.format(this.year, this.month).startOf('month')
      let breakDate = date.clone().endOf('month')

      while(date.isSameOrBefore(breakDate)) {
        let start = date.startOf('week')
        let end = date.clone().endOf('week')
        arr.push({
          value: date.week(),
          label: date.format("wo"),
          info: `${start.format("ll")}-${end.format("ll")}`,
          status: this.validator && this.validator(start, this.now.startOf('week'), this.selectedValue?.startOf('week')),
          disabled: this.disabledItem && this.disabledItem(date),
        });
        date.add(1, 'week')
      }
      return arr;
    }
  },
  mounted() {
    this.now = this.moment([this.moment().year(), this.moment().month(), this.moment().date()])
    this.disabledNow = this.disabledItem && this.disabledItem(this.now)
    this.initValue && this.initValue(this.value)
    this.selectedValue = this.value && this.value.isValid && this.value.isValid() ? this.format().week(this.week) : null
  },
  methods: {
    initValue: function(value) {

      let date = value && value.isValid && value.isValid() ? value : (this.disabledNow ? this.dateMin : this.moment())
      this.year = date.year()
      this.month = date.month()
      this.week = date.week()
    },
    clickHeader: function() {
      this.$emit("week2Month", this.selectedValue);
    },
    forward: function() {
      if (this.month === 0) {
        this.year -= 1
        this.month = 11
      } else {
        this.month -= 1
      }
    },
    checknow: function() {
      this.year = this.moment().year();
      this.week = this.moment().week();
      this.selectedValue = this.format().week(this.week)
      this.month = this.selectedValue.month();
      this.$emit('week:checked', this.selectedValue)
    },
    backward: function() {
      if (this.month === 11) {
        this.year += 1
        this.month = 0
      } else {
        this.month += 1
      }
    },
    checked: function(value) {
      this.week = value.value
      this.selectedValue = this.format().week(this.week)
      this.$emit('week:checked', this.selectedValue)
    },
  },
}

let date = {
  mixins: [ base, ],
  data() {
    return {
      colCount: 7,
      start: 1,
    }
  },
  computed: {
    total: function() {
      return this.moment([this.year, this.month]).daysInMonth()
    },
    headerText: function() {
      return this.moment([this.year, this.month]).format(config.ui.date.month)
    },
    list: function() {

      if (!this.year || isNaN(this.year)) return
      if (isNaN(this.month) || this.month < 0 ) return

      let day = this.moment([this.year, this.month, 1]).day()
      let arr = Array(day).fill({ label: null });

      for (let i = 0; i < this.total; i++) {
        let value = i + this.start
        let date = this.format(this.year, this.month, value)

        arr.push({
          value: value,
          label: date.format("DD"), // tools.string.padStart(value, 2),
          status: this.validator && this.validator(date),
          disabled: this.disabledItem && this.disabledItem(date),
        });
      }
      return arr
    },
  },
  mounted() {
    this.now = this.moment([this.moment().year(), this.moment().month(), this.moment().date()])
    this.disabledNow = this.disabledItem && this.disabledItem(this.now)
    this.initValue && this.initValue(this.value)
    this.selectedValue = this.calendar
      ? this.now
      : this.value && this.value.isValid && this.value.isValid() ? this.format() : null
  },
  methods: {
    initValue: function(value) {
      let date = value && value.isValid && value.isValid() ? value : (this.disabledNow ? this.dateMin : this.moment())
      this.year = date.year()
      this.month = date.month()
      this.date = date.date()
    },
    clickHeader: function() {
      this.$emit("date2Month", this.selectedValue)
    },
    forward: function() {
      if (this.month === 0) {
        this.year -= 1
        this.month = 11
      } else {
        this.month -= 1
      }
    },
    checknow: function() {
      this.year = this.moment().year();
      this.month = this.moment().month();
      this.date = this.moment().date()
      this.selectedValue = this.format()
      this.$emit('date:checked', this.selectedValue)
    },
    backward: function() {
      if (this.month === 11) {
        this.year += 1
        this.month = 0
      } else {
        this.month += 1
      }
    },
    checked: function(value) {
      this.date = value
      this.selectedValue = this.format()
      this.$emit('date:checked', this.selectedValue)
    },
    validWeekend: function(value) {
      return [7, 6].includes(value.isoWeekday())
    },
  },
}

const localBase = {
  mixins: [ moment.base, ],
  props: {
    type: {
      type: String,
      default: 'weekdaysMin',
      validator: value => ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin', 'hour', 'minute', 'second'].includes(value)
    },
    min: props.UInt,
    max: {
      ...props.UInt,
      default: 59,
    }
  },
}

const localType = {
  mixins: [ localBase, ],
  props: {
    step: {
      ...props.UInt,
      default: 5,
    },
  },
}

const local = {
  mixins: [ localBase, ],
  props: {
    type: {
      type: String,
      default: 'weekdaysMin',
      validator: value => ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'].includes(value)
    },
  },
  computed: {
    list: function() {
      return this.moment[this.type]()
        .filter((e, index) => index >= this.min && index <= this.max)
        .map((e, index) => ({
        value: 0 + index,
        label: e,
      }))
    },
  },
}

import tools from "@/tools/index.js"
let time = {
  mixins: [ localBase, ],
  props: {
    type: {
      type: String,
      default: 'hour',
      validator: value => ['hour', 'minute', 'second'].includes(value)
    },
    step: {
      ...props.UInt,
      default: 1,
    },
  },
  computed: {
    end: function() {
      let num = this.type === 'hour' ? 23 : 59
      return Math.min(num, this.max)
    },
    list: function() {
      return tools.number.range(this.min, this.end, this.step).map(e => ({
        value: e,
        label: e,
      }))
    },
  },
}

export default {
  type,
  validator,
  base,
  select,
  year,
  quarter,
  month,
  week,
  date,
  localType,
  local,
  time,
}
