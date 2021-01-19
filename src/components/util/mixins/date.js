// import tools from "@/tools"
import config from '@/config'
import moment from './plugin/moment'
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
      validator: function(value, now = null, selected = null, start = null, end = null) {
        let isSelected = false, isStart = false, isEnd = false, isBetween = false

        let isNow = (now && this.validNow(value, now)) || false
        if (this.range) {
          isStart = (start && this.validStart(value, start)) || false
          isEnd = (end && this.validEnd(value, end)) || false
          isBetween = (start && end && this.validBetween(value, start, end)) || false
        } else {
          isSelected = (selected && this.validSelect(value, selected)) || false
        }
        return { now: isNow, selected: isSelected, start: isStart, end: isEnd, between: isBetween, }
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
    value: [String, Number, Date, Object],
    min: [String, Number, Date, Object],
    max: [String, Number, Date, Object],
    range: props.Boolean,
    selectedStart: [String, Number, Date, Object],
    selectedEnd: [String, Number, Date, Object],
    hideHeader: props.Boolean,
    disabled: props.Boolean,
  },
  data() {
    return {
      year: 0,
      month: 0,
      date: 1,
      now: null,
      colCount: 0,
      disabledNow: false,
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
    dateMin: function() {
      return this.moment(new Date(this.min))
    },
    dateMax: function() {
      return this.moment(new Date(this.max))
    },
    arrayMin: function() {
      return [this.dateMin.year(), this.dateMin.month(), this.dateMin.date()]
    },
    arrayMax: function() {
      return [this.dateMin.year(), this.dateMin.month(), this.dateMin.date()]
    },
    list: function() {
      return []
    },
  },
  watch: {
    value: function(value) {
      this.initValue && this.initValue(value)
    },
    selectedValues: function(value) {
      // 配合 v-model 工作
      this.$emit("selected:changed", value);
    }
  },
  methods: {
    format(year = this.year, month = this.month, date = this.date) {
      return this.moment([year, month, date])
    },
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
          status: this.validator(date, this.now, this.selectedValues, this.selectedStart, this.selectedEnd),
          disabled: this.disabledItem(date),
        });
      }
      return arr
    },
  },
  watch: {
    selectedValues: function() {
      this.start = this.formatStart(this.year)
    }
  },
  mounted() {
    this.now = this.moment([this.moment().year()])
    this.disabledNow = this.disabledItem(this.now)
    this.initValue && this.initValue(this.value)
    this.selectedValues = this.value && this.value.isValid && this.value.isValid() ? this.format() : null
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
      this.selectedValues = this.format()
      this.$emit('year:checked', this.selectedValues)
    },
    backward: function() {
      this.start += this.total;
    },
    checked: function(value) {
      // TODO: 解决 mixins-select 中遇到 0 的问题，
      // 待解决后改回： this.month = value
      this.year = value && value.value === 0 ? value.value : value
      this.selectedValues = this.format()
      this.$emit('year:checked', this.selectedValues)
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
            label: date.format("MMM"), // tools.string.padStart(i + 1, 2),
            status: this.validator(date, this.now , this.selectedValues, this.selectedStart, this.selectedEnd),
            disabled: this.disabledItem(date),
          });
       }
      return arr;
    }
  },
  mounted() {
    this.now = this.moment([this.moment().year(), this.moment().month()])
    this.disabledNow = this.disabledItem(this.now)
    this.initValue && this.initValue(this.value)
    this.selectedValues = this.value && this.value.isValid && this.value.isValid() ? this.format() : null
  },
  methods: {
    initValue: function(value) {
      let date = value && value.isValid && value.isValid() ? value : (this.disabledNow ? this.dateMin : this.moment())
      this.year = date.year()
      this.month = date.month()
    },
    clickHeader: function() {
      this.$emit("month2Year", this.selectedValues);
    },
    forward: function() {
      this.year -= 1;
    },
    checknow: function() {
      this.year = this.moment().year();
      this.month = this.moment().month();
      this.selectedValues = this.format()
      this.$emit('month:checked', this.selectedValues)
    },
    backward: function() {
      this.year += 1;
    },
    checked: function(value) {
      // TODO: 解决 mixins-select 中遇到 0 的问题，
      // 待解决后改回： this.month = value
      this.month = value && value.value === 0 ? value.value : value
      this.selectedValues = this.format()
      this.$emit('month:checked', this.selectedValues)
    },
  },
}

let date = {
  mixins: [ base, ],
  data() {
    return {
      // colCount: 7,
    }
  },
  computed: {
    total: function() {
      return this.moment([this.year, this.month]).daysInMonth()
    },
    headerText: function() {
      return this.moment([this.year, this.month]).format(config.ui.date.month)
    },
    weekList: function() {
      return this.moment.localeData().weekdaysMin()
    },
    list: function() {

      if (!this.year || isNaN(this.year)) return
      if (isNaN(this.month) || this.month < 0 ) return

      let arr = []
      let i = 0
      let value = 1
      let flag = false
      let day = this.moment([this.year, this.month, 1]).day()

      while (value <= this.total) {
        flag = i >= day
        if (!flag) {
          arr.push({ label: "  " });
        } else {
          let date = this.format(this.year, this.month, value)
          arr.push({
            value: value,
            label: date.format("DD"), // tools.string.padStart(value, 2),
            status: this.validator(date, this.now , this.selectedValues, this.selectedStart, this.selectedEnd),
            disabled: this.disabledItem(date),
          });
          value++
        }
        i++
      }
      return arr
    },
  },
  mounted() {
    this.now = this.moment([this.moment().year(), this.moment().month(), this.moment().date()])
    this.disabledNow = this.disabledItem(this.now)
    this.initValue && this.initValue(this.value)
    this.selectedValues = this.value && this.value.isValid && this.value.isValid() ? this.format() : null
  },
  methods: {
    initValue: function(value) {
      let date = value && value.isValid && value.isValid() ? value : (this.disabledNow ? this.dateMin : this.moment())
      this.year = date.year()
      this.month = date.month()
      this.date = date.date()
    },
    clickHeader: function() {
      this.$emit("date2Month", this.selectedValues)
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
      this.selectedValues = this.format()
      this.$emit('date:checked', this.selectedValues)
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
      this.selectedValues = this.format()
      this.$emit('date:checked', this.selectedValues)
    },
  },
}

export default {
  status,
  base,
  year,
  month,
  date,
}
