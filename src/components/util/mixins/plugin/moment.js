import moment from 'dayjs'
import arraySupport from "dayjs/plugin/arraySupport"
import localeData from 'dayjs/plugin/localeData'
import isoWeek from 'dayjs/plugin/isoWeek'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

export default {
  base: {
    data () {
      return {
        moment,
      }
    },
    async created () {
      this.moment.extend(arraySupport);
      this.moment.extend(localeData);
      this.moment.extend(isoWeek);
      this.moment.extend(isBetween);
      this.moment.extend(isSameOrBefore);

      require('dayjs/locale/zh-cn')
      this.moment.locale('zh-cn' || this.$i18n.locale || 'en-US')
    },
    watch: {
      '$i18n.locale': function(value) {
        this.moment.locale(value)
      },
    },
  },
}
