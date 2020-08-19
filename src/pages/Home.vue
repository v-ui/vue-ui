<template>
  <div>
    YYYY年MM月DD: {{ moment().format('YYYY年MM月DD') }}<br>
    L: {{ moment().format('L') }}<br>
    LL: {{ moment().format('LL') }}<br>
    LLL: {{ moment().format('LLL') }}<br>
    LLLL: {{ moment().format('LLLL') }}<br>
    LT: {{ moment().format('LT') }}<br>
    LTS: {{ moment().format('LTS') }}<br>
    utc<br>
    {{ moment().utc() }}<br>
    {{ moment().unix() }}<br>
    取值<br>
    millisecond: {{ moment().millisecond() }}<br>
    second: {{ moment().second() }}<br>
    minute: {{ moment().minute() }}<br>
    hour: {{ moment().hour() }}<br>
    date: {{ moment().date() }}<br>
    day: {{ moment().day() }}<br>
    weekday: {{ moment().weekday() }}<br>
    dayOfYear: {{ moment().dayOfYear() }}<br>
    week: {{ moment().week() }}<br>
    month: {{ moment().month() }}<br>
    quarter: {{ moment().quarter() }}<br>
    year: {{ moment().year() }}<br>
    weekYear: {{ moment().weekYear() }}<br>
    d: {{ moment().format('d') }}<br>
    do: {{ moment().format('do') }}<br>
    dd: {{ moment().format('dd') }}<br>
    ddd: {{ moment().format('ddd') }}<br>
    dddd: {{ moment().format('dddd') }}<br>
    get<br>
    {{ moment().get('year') }}<br>
    {{ moment().get('month') }}<br>
    {{ moment().get('date') }}<br>
    {{ moment().get('hour') }}<br>
    {{ moment().get('minute') }}<br>
    {{ moment().get('second') }}<br>
    {{ moment().get('millisecond') }}<br>
    操作<br>
    daysInMonth: {{ moment().daysInMonth() }}<br>
    weeksInYear: {{ moment().weeksInYear() }}<br>
    {{ $i18n.locale }}
  </div>
</template>

<script>
// @ is an alias to /src
import util from '@/components/util'
export default {
  name: 'HomePage',
  mixins: [ util.mixins.moment.base, ],
  components: {

  },
  data () {
    return {
    }
  },
  computed: {

  },
  created () {

  },
  methods: {

  },
  watch: {

  },
}
</script>

<style scoped>

</style>
